const sinon = require('sinon');

/** 
 * @return {Record<keyof import('express').Response, sinon.SinonStub>}
 */
const makeRes = () => {
  const res = {
    status: sinon.stub().callsFake(() => res),
    json: sinon.stub().returns(),
    sendStatus: sinon.stub().returns(),
  };
  return res;
};

module.exports = {
  makeRes,
};