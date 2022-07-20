const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

chai.use(chaiAsPromised);

const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');

describe('Services/sales', () => {
  beforeEach(sinon.restore);

  describe('getSales', () => {
    it('Retorno com erro', () => {
      sinon.stub(salesModel, 'getSales').rejects();
      chai.expect(salesService.getSales()).to.be.eventually.be.rejected;
    });

    it('Retorno com sucesso', () => {
      sinon.stub(salesModel, 'getSales').resolves([]);
      chai.expect(salesService.getSales()).to.be.eventually.deep.equal([])
    });
  });

  describe('getSaleId', () => {
    it('Retorna um item da lista', () => {
      sinon.stub(salesModel, 'getSaleId').resolves([[]]);
      chai.expect(salesService.getSaleId(1)).to.be.eventually.deep.equal([]);
    });
    it('Erro caso retorne uma lista vazia', () => {
      sinon.stub(salesModel, 'getSaleId').resolves([[]]);
      chai.expect(salesService.getSaleId(1)).to.be.eventually.be.undefined;
    });

    it('Erro caso db retorne um erro', () => {
      sinon.stub(salesModel, 'getSaleId').rejects();
      chai.expect(salesService.getSaleId(1)).to.be.eventually.be.rejected;
    });
  });

  describe('checkExists', () => {
    it('Retorno Erro', () => {
      sinon.stub(salesModel, 'checkExists').rejects();
      chai.expect(salesService.checkExists(1)).to.eventually.be.rejected;
    });

    it('Retorno TRUE', () => {
      sinon.stub(salesModel, 'checkExists').resolves([[]]);
      chai.expect(salesService.checkExists(1)).to.eventually.be.undefined;
    });

    it('Retorno FALSE', () => {
      sinon.stub(salesModel, 'checkExists').resolves([[{}]]);
      chai.expect(salesService.checkExists(1)).to.eventually.deep.equal({});
    });
  });

  describe('deleteSale', () => {
    it('deve disparar um erro caso salesModel.deleteSale dispare um erro', () => {
      sinon.stub(salesModel, 'deleteSale').rejects();
      chai.expect(salesService.deleteSale(1)).to.eventually.be.rejected;
    });

    it('deve retornar caso o salesModel.deleteSale remova a serie', () => {
      sinon.stub(salesModel, 'deleteSale').resolves();
      chai.expect(salesService.deleteSale(1)).to.eventually.be.undefined;
    });
  });

  describe('editSale', () => {
    it('deve disparar um erro caso salesModel.editSale dispare um erro', () => {
      sinon.stub(salesModel, 'editSale').rejects();
      chai.expect(salesService.editSale(1, {})).to.eventually.be.rejected;
    });

    it('deve retornar caso o salesModel.editSale altere a serie', () => {
      sinon.stub(salesModel, 'editSale').resolves();
      chai.expect(salesService.editSale(1, {})).to.eventually.be.undefined;
    });
  });
});
