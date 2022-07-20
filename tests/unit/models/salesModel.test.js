const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

chai.use(chaiAsPromised);

const salesModel = require('../../../models/salesModel');
const db = require('../../../models/db');

describe('models/salesModel', () => {
  beforeEach(sinon.restore);

  describe('getSales', () => {
    it('Retornar uma lista caso o db.query retorne com sucesso', () => {
      sinon.stub(db, 'query').resolves([]);
      chai.expect(salesModel.getSales()).to.be.eventually.deep.equal([]);
    });

    it('Disparar um erro caso o db.query retorne um erro', () => {
      sinon.stub(db, 'query').rejects();
      chai.expect(salesModel.getSales()).to.be.rejected;
    });
  });

  describe('getSaleId', () => {
    it('Retornar um objeto caso db retorne um item da lista', () => {
      sinon.stub(db, 'query').resolves([[]]);
      chai.expect(salesModel.getSaleId(0)).to.be.eventually.deep.equal([]);
    });

    it('Erro caso retorne uma lista vazia', () => {
      sinon.stub(db, 'query').resolves([[]]);
      chai.expect(salesModel.getSaleId(0)).to.be.eventually.be.undefined;
    });

    it('Erro caso db retorne um erro', () => {
      sinon.stub(db, 'query').rejects();
      chai.expect(salesModel.getSaleId(0)).to.be.eventually.be.rejected;
    });
  });

  describe('exists', () => {
    it('Erro caso db retorne um erro', () => {
      sinon.stub(db, 'query').rejects();
      chai.expect(salesModel.checkExists(0)).to.eventually.be.rejected;
    });

    it('Retornar falso caso db retorne uma lista vazia', () => {
      sinon.stub(db, 'query').resolves([[]]);
      chai.expect(salesModel.checkExists(0)).to.eventually.be.undefined;
    });

    it('Retornar true caso db retorne um item da lista', () => {
      sinon.stub(db, 'query').resolves([[{}]]);
      chai.expect(salesModel.checkExists(0)).to.eventually.deep.equal({});
    });
  });

  describe('addSales', () => {
    it('deve disparar um erro caso o db.query dispare um erro', () => {
      sinon.stub(db, 'query').rejects();
      chai.expect(salesModel.addSales({})).to.eventually.be.rejected;
    });

    it('deve retornar o id inserido caso dê sucesso', () => {
      sinon.stub(db, 'query').resolves([{ insertId: 2 }]);
      chai.expect(salesModel.addSales({})).to.eventually.equal(1);
    });
  });

  describe('editSale', () => {
    it('deve disparar um erro caso o db.query dispare', () => {
      sinon.stub(db, 'query').rejects();
      return chai.expect(salesModel.editSale({}, 1)).to.eventually.be.rejected;
    });

    it('deve retornar nada caso sucesso', () => {
      sinon.stub(db, 'query').resolves();
      return chai.expect(salesModel.editSale({}, 1)).to.eventually.be.undefined;
    });
  });

  describe('deleteSale', () => {
    it('deve disparar um erro caso o db.query dispare', () => {
      sinon.stub(db, 'query').rejects();
      return chai.expect(salesModel.deleteSale(1)).to.eventually.be.rejected;
    });

    it('deve retornar nada caso sucesso', () => {
      sinon.stub(db, 'query').resolves();
      return chai.expect(salesModel.delete(1)).to.eventually.be.undefined;
    });
  });
});