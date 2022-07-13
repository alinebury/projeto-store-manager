const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

chai.use(chaiAsPromised);

const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');
const { makeRes } = require('./utils');

describe('Services', () => {
  beforeEach(sinon.restore);

  describe('get', () => {
    it('Retorno com erro', () => {
      sinon.stub(productsService, 'get').rejects();
      chai.expect(productsController.get({}, {})).to.be.eventually.be.rejected;
    });

    it('Retorno com sucesso', async () => {
      const res = makeRes();
      sinon.stub(productsService, 'get').resolves([{ id: 1 }]);
      await productsController.get({}, res);
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal([{ id: 1 }]);
    });
  });

  describe('getId', () => {
    it('Erro caso validateParamsId também retorne um erro', () => {
      sinon.stub(productsService, 'validateParamsId').rejects();
      chai.expect(productsController.getId({}, {})).to.be.eventually.rejected;
    });
    it('Erro caso checkExists também retorne um erro', () => {
      sinon.stub(productsService, 'validateParamsId').resolves({});
      sinon.stub(productsService, 'checkExists').rejects();
      chai.expect(productsController.getId({},{})).to.be.eventually.be.rejected;
    });

    it('Erro caso service.getId também retorne um erro', () => {
      sinon.stub(productsService, 'validateParamsId').resolves({});
      sinon.stub(productsService, 'checkExists').resolves();
      sinon.stub(productsService, 'getId').rejects
      chai.expect(productsController.getId({}, {})).to.be.eventually.be.rejected;
    });

    it('Retorno com sucesso', async () => {
      sinon.stub(productsService, 'validateParamsId').resolves({});
      sinon.stub(productsService, 'checkExists').resolves();
      sinon.stub(productsService, 'getId').resolves({ id: 1 });
      const res = makeRes();
      await productsController.getId({}, res);
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal({ id: 1 });
    });
  });

//   describe('checkExists', () => {
//     it('Retorno Erro', () => {
//       sinon.stub(productsService, 'exists').rejects();
//       chai.expect(productsController.checkExists(1)).to.eventually.be.rejected;
//     });

//     it('Retorno TRUE', () => {
//       sinon.stub(productsService, 'exists').resolves([[]]);
//       chai.expect(productsController.checkExists(1)).to.eventually.be.undefined;
//     });

//     it('Retorno FALSE', () => {
//       sinon.stub(productsService, 'exists').resolves([[{}]]);
//       chai.expect(productsController.checkExists(1)).to.eventually.deep.equal({});
//     });
//   });
});