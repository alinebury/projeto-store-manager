const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

chai.use(chaiAsPromised);

const salesService = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');
const { makeRes } = require('./utils');

describe('Controller/sales', () => {
  beforeEach(sinon.restore);

  describe('getSales', () => {
    it('Retorno com erro', () => {
      sinon.stub(salesService, 'getSales').rejects();
      chai.expect(salesController.getSales({}, {})).to.be.eventually.be.rejected;
    });

    it('Retorno com sucesso', async () => {
      const res = makeRes();
      sinon.stub(salesService, 'getSales').resolves([{ id: 1 }]);
      await salesController.getSales({}, res);
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal([{ id: 1 }]);
    });
  });

  describe('getSaleId', () => {
    it('Erro caso checkExists também retorne um erro', () => {
      sinon.stub(salesService, 'checkExists').rejects();
      chai.expect(salesController.getSaleId({}, {})).to.be.eventually.be.rejected;
    });

    it('Erro caso service.getSaleId também retorne um erro', () => {
      sinon.stub(salesService, 'checkExists').resolves();
      sinon.stub(salesService, 'getSaleId').rejects
      chai.expect(salesController.getSaleId({}, {})).to.be.eventually.be.rejected;
    });

    it('Retorno com sucesso', async () => {
      sinon.stub(salesService, 'checkExists').resolves();
      sinon.stub(salesService, 'getSaleId').resolves({ id: 1 });
      const res = makeRes();
      await salesController.getSaleId({ params: { id: 1 } }, res);
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal({ id: 1 });
    });
  });

  describe('deleteSale', () => {
    it('deve disparar um erro caso salesService.checkExists também dispare', () => {
      sinon.stub(salesService, 'checkExists').rejects();
      chai.expect(salesController.deleteSale({}, {})).to.eventually.be.rejected;
    });

    it('deve disparar um erro caso salesService.deleteSale também dispare', () => {
      sinon.stub(salesService, 'checkExists').resolves();
      sinon.stub(salesService, 'deleteSale').rejects();
      chai.expect(salesController.deleteSale({}, {})).to.eventually.be.rejected;
    });
  });

  describe('editSale', () => {
    it('deve disparar um erro caso salesService.checkExists também dispare', () => {
      sinon.stub(salesService, 'checkExists').rejects();
      chai.expect(salesController.editSale({}, {})).to.eventually.be.rejected;
    });

    it('deve disparar um erro caso salesService.checkExists também dispare', () => {

      sinon.stub(salesService, 'checkExists').resolves();
      sinon.stub(salesService, 'editSale').rejects();
      chai.expect(salesController.editSale({}, {})).to.eventually.be.rejected;
    });
  });
});