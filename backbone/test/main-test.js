describe('testing system', function() {
  beforeEach(function() {
  });
  it('has access to your code', function() {
    assert.isDefined(app.defined);
  });
  it('integrates dependencies', function() {
    var spy = sinon.spy();
    spy();
    assert.calledOnce(spy);
  });
});

