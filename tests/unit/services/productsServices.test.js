const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

chai.use(chaiAsPromised);

const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

describe('Services/products', () => {
  beforeEach(sinon.restore);

  describe('get', () => {
    it('Retorno com erro', () => {
      sinon.stub(productsModel, 'get').rejects();
      chai.expect(productsService.get()).to.be.eventually.be.rejected;
    });

    it('Retorno com sucesso', () => {
      sinon.stub(productsModel, 'get').resolves([]);
      chai.expect(productsService.get()).to.be.eventually.deep.equal([])
    });
  });

  describe('getId', () => {
    it('Retorna um item da lista', () => {
      sinon.stub(productsModel, 'getId').resolves([[]]);
      chai.expect(productsService.getId(1)).to.be.eventually.deep.equal([]);
    });
    it('Erro caso retorne uma lista vazia', () => {
      sinon.stub(productsModel, 'getId').resolves([[]]);
      chai.expect(productsService.getId(1)).to.be.eventually.be.undefined;
    });

    it('Erro caso db retorne um erro', () => {
      sinon.stub(productsModel, 'getId').rejects();
      chai.expect(productsService.getId(1)).to.be.eventually.be.rejected;
    });
  });

  describe('checkExists', () => {
    it('Retorno Erro', () => {
      sinon.stub(productsModel, 'exists').rejects();
      chai.expect(productsService.checkExists(1)).to.eventually.be.rejected;
    });

    it('Retorno TRUE', () => {
      sinon.stub(productsModel, 'exists').resolves([[]]);
      chai.expect(productsService.checkExists(1)).to.eventually.be.undefined;
    });

    it('Retorno FALSE', () => {
      sinon.stub(productsModel, 'exists').resolves([[{}]]);
      chai.expect(productsService.checkExists(1)).to.eventually.deep.equal({});
    });
  });

  describe('delete', () => {
    it('deve disparar um erro caso productsModel.delete dispare um erro', () => {
      sinon.stub(productsModel, 'delete').rejects();
      chai.expect(productsService.delete(1)).to.eventually.be.rejected;
    });

    it('deve retornar caso o productsModel.delete remova a serie', () => {
      sinon.stub(productsModel, 'delete').resolves();
      chai.expect(productsService.delete(1)).to.eventually.be.undefined;
    });
  });

  describe('edit', () => {
    it('deve disparar um erro caso productsModel.edit dispare um erro', () => {
      sinon.stub(productsModel, 'edit').rejects();
      chai.expect(productsService.edit(1, {})).to.eventually.be.rejected;
    });

    it('deve retornar caso o productsModel.edit altere a serie', () => {
      sinon.stub(productsModel, 'edit').resolves();
      chai.expect(productsService.edit(1, {})).to.eventually.be.undefined;
    });
  });
});
