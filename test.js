'use strict';

import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import renderIfElse from './renderIfElse';

chai.use(sinonChai);

describe('renderIfElse', () => {
  it('should return a function', () => {
    expect(typeof renderIfElse()).to.be.eql('function');
  });
  describe('non-lazy', () => {
    it('should return the first element when the predicate passes', () => {
      expect(renderIfElse(true)('truebar','falsebar')).to.be.eql('truebar');
    });
    it('should return the second element when the predicate fails', () => {
      expect(renderIfElse(false)('truebar','falsebar')).to.be.eql('falsebar');
    });
    it('should return null element when the predicate fails and no second argument', () => {
      expect(renderIfElse(false)('foobar')).to.be.eql(null);
    });
  });
  describe('lazy', () => {
    it('should return the result of the thunk of first argument when the predicate passes', () => {
      expect(renderIfElse(true)(() => 'truebar',() => 'falsebar')).to.be.eql('truebar');
    });
    it('should return the result of the thunk of second argument when the predicate fails', () => {
      expect(renderIfElse(false)(() => 'truebar',() => 'falsebar')).to.be.eql('falsebar');
    });
    it('should return null if no second argument when the predicate fails', () => {
      expect(renderIfElse(false)(() => 'truebar')).to.be.eql(null);
    });
    it ('should call the first thunk when the predicate passes', () => {
      var spyTrue = sinon.spy();
      var spyFalse = sinon.spy();
      renderIfElse(true)(spyTrue,spyFalse);
      expect(spyTrue).to.have.been.called;
      expect(spyFalse).not.to.have.been.called;
    });
    it ('should call the second thunk when the predicate fails', () => {
      var spyTrue = sinon.spy();
      var spyFalse = sinon.spy();
      renderIfElse(false)(spyTrue,spyFalse);
      expect(spyFalse).to.have.been.called;
      expect(spyTrue).not.to.have.been.called;
    });
  });
});
