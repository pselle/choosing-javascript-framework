(function () {
  'use strict';

  describe('Properties service', function () {

    // placeholder for our service
    var PropertiesService;

    // before every test case, ready our "realtorsApp" module
    beforeEach(module('realtorsApp'));

    // before every test case, get our service
    beforeEach(inject(function (Properties) {
      PropertiesService = Properties;
    }));

    it('should provide an object', function () {
      expect(PropertiesService).toEqual(jasmine.any(Object));
    });

    it('should provide a function "getProperties"', function () {
      expect(PropertiesService.getProperties).toEqual(jasmine.any(Function));
    });

    describe('getProperties', function () {

      // $http service placeholder
      var $http,
      // $httpBackend service placeholder
        $httpBackend;

      // surrounding underscores are syntactic sugar; you still get the $http service
      beforeEach(inject(function (_$http_, _$httpBackend_) {
        $http = _$http_;

        // $httpBackend is the lowest-level service provided by AngularJS for Ajax requests.
        // the ngMock module overrides it to ensure no actual requests are sent, and provides
        // some functionality for asserting usage.
        $httpBackend = _$httpBackend_;
      }));

      // inject $http into this test case so we can stub its "get()" function
      it('should call $http.get() with our URL', function () {
        // this stubs $http.get() with a "spy" function that will tell us about its usage
        spyOn($http, 'get');

        PropertiesService.getProperties();

        expect($http.get).toHaveBeenCalled();
        expect($http.get).toHaveBeenCalledWith('../shared/data.json');
      });

      it('should return a Promise', function () {
        var retval;

        // we won't stub $http.get() here; instead we'll allow $httpBackend to handle it.
        // we'll pretend to be the server and respond with a HTTP 200 OK and some dummy JSON.
        $httpBackend.expectGET('../shared/data.json').respond(200, '{"foo": "bar"}');

        retval = PropertiesService.getProperties();

        // flushing the request is necessary unless we want to write an asynchronous unit test.
        $httpBackend.flush();

        // a Promise will have a then() method
        expect(retval.then).toEqual(jasmine.any(Function));

      });
    });

  });

})();
