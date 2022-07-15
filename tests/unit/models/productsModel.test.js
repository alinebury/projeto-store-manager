const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

chai.use(chaiAsPromised);

const productsModel = require('../../../models/productsModel');
const db = require('../../../models/db');

describe('models/productsModel', () => { 
  beforeEach(sinon.restore);

  describe('get', () => {
    it('Retornar uma lista caso o db.query retorne com sucesso', () => {
      sinon.stub(db, 'query').resolves([]);
      chai.expect(productsModel.get()).to.be.eventually.deep.equal([]);
    });

    it('Disparar um erro caso o db.query retorne um erro', () => {
      sinon.stub(db, 'query').rejects();
      chai.expect(productsModel.get()).to.be.rejected;
    });
  });

  describe('getId', () => {
    it('Retornar um objeto caso db retorne um item da lista', () => {
      sinon.stub(db, 'query').resolves([[]]);
      chai.expect(productsModel.getId(0)).to.be.eventually.deep.equal([]);
    });

    it('Erro caso retorne uma lista vazia', () => {
      sinon.stub(db, 'query').resolves([[]]);
      chai.expect(productsModel.getId(0)).to.be.eventually.be.undefined;
    });

    it('Erro caso db retorne um erro', () => {
      sinon.stub(db, 'query').rejects();
      chai.expect(productsModel.getId(0)).to.be.eventually.be.rejected;
    });
  });

  describe('exists', () => {
    it('Erro caso db retorne um erro', () => {
      sinon.stub(db, 'query').rejects();
      chai.expect(productsModel.exists(0)).to.eventually.be.rejected;
    });

    it('Retornar falso caso db retorne uma lista vazia', () => {
      sinon.stub(db, 'query').resolves([[]]);
      chai.expect(productsModel.exists(0)).to.eventually.be.undefined;
    });

    it('Retornar true caso db retorne um item da lista', () => {
      sinon.stub(db, 'query').resolves([[{}]]);
      chai.expect(productsModel.exists(0)).to.eventually.deep.equal({});
    });
  });
});
