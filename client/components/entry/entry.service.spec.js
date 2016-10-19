'use strict';

describe('Service: loc', function () {

  // load the service's module
  beforeEach(module('myproApp'));

  // instantiate service
  var loc;
  beforeEach(inject(function (_loc_) {
    loc = _loc_;
  }));

  it('should do something', function () {
    expect(!!loc).toBe(true);
  });

});
