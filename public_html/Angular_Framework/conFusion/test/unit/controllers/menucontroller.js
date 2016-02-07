describe('Controller: MenuController', function () {

  // load the controller's module
  beforeEach(module('confusionApp'));

  var MenuController, scope, $httpBackend;
  
   // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, _$httpBackend_,  $rootScope, menuFactory) {

          // place here mocked dependencies
      $httpBackend = _$httpBackend_;

      $httpBackend.expectGET("http://localhost:3000/dishes").respond([
        {
      "id": 0,
      "name": "Uthapizza",
      "image": "images/uthapizza.png",
      "category": "mains",
      "label": "Hot",
      "price": "4.99",
      "description": "A",
      "comments":[{}]
      },
      {
      "id": 1,
      "name": "Zucchipakoda",
      "image": "images/zucchipakoda.png",
      "category": "mains",
      "label": "New",
      "price": "4.99",
      "description": "A",
      "comments":[{}]
      }
      ]);

    scope = $rootScope.$new();
    MenuController = $controller('MenuController', {
      $scope: scope, menuFactory: menuFactory
    });
            $httpBackend.flush();

  }));
  
  //Tests
  it('should have showDetails as false', function () {
      //Shecking that showdetails starts as false
    expect(scope.showDetails).toBeFalsy();

  });

  it('should create "dishes" with 2 dishes fetched from xhr', function(){
      //show menu is now true, dished is defined, and 2 dishes are there
      expect(scope.showMenu).toBeTruthy();
      expect(scope.dishes).toBeDefined();
      expect(scope.dishes.length).toBe(2);

  });

  it('should have the correct data order in the dishes', function() {
      //Randomly pick some info to test. These test the name of dish 0 and the label of dish 1
      expect(scope.dishes[0].name).toBe("Uthapizza");
      expect(scope.dishes[1].label).toBe("New");

  });

  it('should change the tab selected based on tab clicked', function(){
      //Starts selected 1
      expect(scope.tab).toEqual(1);
      //Now selecting 3
      scope.select(3);
      //Checking the select worked and that it selected 'mains'
      expect(scope.tab).toEqual(3);
      expect(scope.filtText).toEqual('mains');

  });

});
