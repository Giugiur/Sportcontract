/**
 * Created by landervanbreda on 29/08/14.
 */
angular.module('app.admin.common').run(function($q,StateInterceptor,$modal){
    var adminVerified = false;
    StateInterceptor.addInterceptorStart(
        'admin_check',
        function(event, toState, toParams, fromState, fromParams){
            console.log(toState)
            if(toState.name.indexOf('admin') > -1 && !adminVerified){
                return true;
            }else{
                return false;
            }
        },
        function(event, toState, toParams, fromState, fromParams){
            var deferred = $q.defer();
            var modalInstance = $modal.open({
                templateUrl: 'admin_modules/common/views/loginmodal.html',
                controller: AdminLoginCtrl
            });
            modalInstance.result.then(function () {
                adminVerified=true;
                    deferred.resolve();
            }, function () {
                    deferred.reject();
            });
            return deferred.promise;
        },
        {}
    )
});

