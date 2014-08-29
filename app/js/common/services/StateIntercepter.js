angular.module('app.common').service('StateInterceptor',['$state','$rootScope',function($state,$rootScope){
    var self = this;
    self.bootstrapped = false;
    self.changeStart = [];


    self.init = function(){
        if(!self.bootstrapped){
            $rootScope.$on('$stateChangeStart',
                function(event, toState, toParams, fromState, fromParams){
                    for(var interceptor in self.changeStart){
                        if(self.changeStart[interceptor].check_function(event, toState, toParams, fromState, fromParams)){
                            event.preventDefault();
                            self.changeStart[interceptor].execute_function(event, toState, toParams, fromState, fromParams).then(function(result){
                                $state.go(toState,toParams);
                            },function(err){

                            })
                        }
                    }
                })
        }
        self.bootstrapped = true;

    }
    self.addInterceptorStart = function(name,check,func,params){
        self.changeStart.push({
            name : name,
            check_function : check,
            execute_function: func,
            parameters : params
        })

    }
    self.removeInterceptorStart = function(name){
        self.changeStart = _.reject(self.changeStart,function(item){
            return item.name == name;
        })
    }

    self.init();
    return self;
}])