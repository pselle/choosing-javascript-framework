(function () {
  'use strict';

  describe('Properties service', function () {

    // placeholder for our service
    var Properties;

    // before every test case, ready our "realtorsApp" module
    beforeEach(module('realtorsApp'));

    // before every test case, get our service
    // surrounding underscores are syntactic sugar; you still get the services you want.
    beforeEach(inject(function (_Properties_) {
      Properties = _Properties_;
    }));

    it('should provide an object', function () {
      expect(Properties).toEqual(jasmine.any(Object));
    });

    it('should provide a function "getProperties"', function () {
      expect(Properties.getProperties).toEqual(jasmine.any(Function));
    });

    describe('methods', function () {

      // $timeout service placeholder
      var $timeout,

      // dummy response data
        dummy = [
          {
            id: 'foo',
            title: 'bar'
          }
        ];

      beforeEach(inject(function (_$timeout_) {

        // a flush() method is added by ngMock to the $timeout service, which allows us to
        // immediately resolve/reject Promises.
        $timeout = _$timeout_;

      }));

      describe('getProperty()', function () {

        var $q;

        beforeEach(inject(function (_$q_) {
          // for testing Promises, the $q service comes in very handy.
          $q = _$q_;

          // here's an example of a Jasmine spy.
          // this is a stub function which returns a Promise resolved with the value of "dummy",
          // just like getProperties() would if it had cached data already.
          spyOn(Properties, 'getProperties').and.returnValue($q.when(dummy));
        }));

        it('should call getProperties()', function () {

          Properties.getProperty('foo');

          // this is an assertion against a spy.  We don't care (yet) what happens after we call getProperty(),
          // only that getProperties() was called.  thus we do not need to make this test asynchronous.
          expect(Properties.getProperties).toHaveBeenCalled();
        });

        it('should reject if no property with ID found', function (done) {

          var spec = this;

          // why would this be rejected?  dummy has an ID foo.
          // this is because propertyCache is not populated, since we have stubbed getProperties().
          Properties.getProperty('foo')
            .then(function () {
              spec.fail('expected promise to be rejected');
            }, function (err) {
              expect(err).toEqual('No property with ID "foo" found!');
            })
            .finally(done);

          $timeout.flush();
        });

        it('should find a property', function (done) {

          var spec = this;

          // make Properties.propertyCache fixture, so our test will pass
          Properties.propertyCache = {
            foo: dummy[0]
          };

          Properties.getProperty('foo')
            .then(function (property) {
              expect(property).toEqual(dummy[0]);
            }, function () {
              spec.fail('expected promise to be fulfilled');
            })
            .finally(done);

          $timeout.flush();

        });

      });

      describe('getProperties()', function () {

        // $httpBackend service placeholder
        var $httpBackend;

        beforeEach(inject(function (_$httpBackend_) {

          // $httpBackend is the lowest-level service provided by AngularJS for Ajax requests.
          // the ngMock module overrides it to ensure no actual requests are sent, and provides
          // some functionality for asserting usage.
          $httpBackend = _$httpBackend_;

        }));

        it('should reject if no properties found', function (done) {
          var retval,
            spec = this;

          // let's leave out the properties in the response and see what happens
          $httpBackend.expectGET('/shared/data.json').respond(200, JSON.stringify({}));

          retval = Properties.getProperties();

          $httpBackend.flush();

          retval.then(function () {
            spec.fail('expected promise to be rejected');
          }, function (err) {
            expect(err).toEqual('Invalid data returned from server!');
          })
            .finally(done);

          $timeout.flush();

        });

        it('should store properties data', function (done) {
          var retval,
            spec = this;

          // let's leave out the properties in the response and see what happens
          $httpBackend.expectGET('/shared/data.json').respond(200, JSON.stringify(dummy));

          retval = Properties.getProperties();

          $httpBackend.flush();

          retval.then(function () {
            expect(Properties.properties).toEqual(dummy);
            expect(Properties.propertyCache.foo.title).toEqual('bar');
          }, function () {
            spec.fail('expected promise to be fulfilled');
          })
            .finally(done);

          $timeout.flush();
        });

        // since this is asynchronous, we need "done" here to tell Jasmine when we're through.
        it('should resolve with a properties array', function (done) {
          var retval,
            spec = this;

          // this sets up an expectation that $httpBackend will be called (via $http, because it is
          // low-level) with a certain URL.
          // using it, we can respond with a HTTP 200 OK and our dummy response.
          // note: this is not a Jasmine assertion; it's part of ngMock
          $httpBackend.expectGET('/shared/data.json').respond(200, JSON.stringify(dummy));

          retval = Properties.getProperties();

          // this will tell $httpBackend that it got a response.
          $httpBackend.flush();

          // a Promise will have a then() method
          expect(retval.then).toEqual(jasmine.any(Function));

          // once the Promise resolves, we test its output.
          retval.then(function (properties) {
            expect(properties).toEqual(dummy);
          }, function () {
            spec.fail('expected promise to resolve');
          })
            // this ensures done() will be called regardless of expectation failure above
            // it's crucial to call done() upon success or failure within an asynchronous test!
            .finally(done);

          // resolve all timeouts.
          $timeout.flush();

        });
      });

    });
  });
})();
