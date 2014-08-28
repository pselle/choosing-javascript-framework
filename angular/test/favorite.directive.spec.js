(function () {
  'use strict';

  describe('favorite Directive', function () {

    // Scope placeholder
    var scope,

    // property object.  full of nothing.
      property = {},

    // this is our HTML fixture.
      markup = '<favorite property="property"></favorite>',

    // placeholder for $compile service.  to use Directives, you must compile them.  AngularJS does this automatically,
    // but since we're in a test, we must do it ourselves.
      $compile;

    beforeEach(module('realtorsApp'));
    beforeEach(inject(function (_$rootScope_, _$compile_) {
      // this creates a child Scope object from the $rootScope.
      // to *link* a Directive, you must give it a Scope.  this is the Scope we'll give it.
      scope = _$rootScope_.$new();

      // we put property on the Scope, so our markup above will have some data.
      scope.property = property;

      $compile = _$compile_;
    }));

    it('should link', function () {
      // $compiling markup returns a linker function
      var linker = $compile(markup);
      expect(function() {
        // linker function needs a scope.  if this doesn't throw, we made it all the way through our link() function
        // without throwing an exception.  yay!
        linker(scope);
      }).not.toThrow();
    });

    it('should update', function () {
      var link = $compile(markup);
      link(scope);
      // if you examine the output of link(scope) above, you will basically have a dead jqLite object.
      // nothing really "happens" without a digest.
      expect(function() {

        // this is like scope.$apply() except only acts on the current Scope and its children.
        // scope.$apply() basically digests the entire app.  this is only useful in certain situations, one of them
        // being tests.
        scope.$digest();
        // after this, you have a working slice of AngularJS markup.
      }).not.toThrow();
    });

    describe('behavior', function() {

      var linked;

      // we know our compilation and linking works, so for these tests, let's do it automatically.
      beforeEach(function() {
        linked = $compile(markup)(scope);
        scope.$digest();
      });

      // now let's get our hands dirty in the DOM!
      it('should replace itself', function () {
        // linked is a jqLite object, so we get at the DOM node itself and ask it what it is.
        expect(linked[0].tagName).toEqual('BUTTON');
      });

      it('should toggle the pure-button-active class upon model change', function () {
        // "favorite" is false/undefined in our property object.
        expect(linked.hasClass('pure-button-active')).toBeFalsy();

        // let's update our model and see if our watch fired
        property.favorite = true;
        scope.$digest();

        expect(linked.hasClass('pure-button-active')).toBeTruthy();

        // and switch back
        property.favorite = false;
        scope.$digest();

        expect(linked.hasClass('pure-button-active')).toBeFalsy();
      });

      it('should toggle the pure-button-active class upon view change', function () {
        // note that we don't have to scope.$digest() here; the directive starts a digest for us.

        // simulate click
        linked.triggerHandler('click');
        expect(linked.hasClass('pure-button-active')).toBeTruthy();

        // and back again
        linked.triggerHandler('click');
        expect(linked.hasClass('pure-button-active')).toBeFalsy();
      });

      it('should update the model upon view change', function () {
        linked.triggerHandler('click');
        expect(scope.property.favorite).toBeTruthy();

        linked.triggerHandler('click');
        expect(scope.property.favorite).toBeFalsy();
      });
    });

  });
})();
