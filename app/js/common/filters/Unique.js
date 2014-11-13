angular.module('app.common').filter('unique', function() {
  return function (items, filterOn) {

    if (filterOn === false) {
      return items;
    }

    if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
      var hashCheck = {}, newItems = [];

      var extractValueToCompare = function (item) {
        if (angular.isObject(item) && angular.isString(filterOn)) {
          var filterArr = filterOn.split('.');
          /*if(filterArr.length > 1){
            if(filterArr.length == 2)
              return item[filterArr[0]][filterArr[[1]]];
            if(filterArr.length == 3)
              return item[filterArr[0]][filterArr[[1]]][filterArr[[2]]];
          }*/

          for(var i=0; i< filterArr.length; i++) {
            if(!item) return null;
            item = item[filterArr[i]];
          }

          return item;

        } else {
          return item;
        }
      };

      angular.forEach(items, function (item) {
        var valueToCheck, isDuplicate = false;

        for (var i = 0; i < newItems.length; i++) {

          if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
            isDuplicate = true;
            break;
          }
        }
        if (!isDuplicate) {
          newItems.push(item);
        }

      });
      items = newItems;
    }
    return items;
  };
});
