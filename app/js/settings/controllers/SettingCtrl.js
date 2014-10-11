var SettingsCtrl = function($scope, $http, User, languages, $translate) {
  	$scope.date = new Date();
  	$scope.User = User;
  	$scope.user = User.getUser();

    $scope.languages = languages;

    $scope.timezones;

    $http.get('/timezones.json').success(function(result){
        $scope.timezones = result;
    })

    $scope.save = function(elem){
        User.$save().then(function(res){
            if(res.response == "success"){
                $('.'+elem).addClass('note-success');
                $('.'+elem+' .fa').addClass('fa-check-circle-o');
                $translate('successfully_saved').then(function(val){
                    $scope.msg = val;
                    $('.'+elem).show();

                    $('.'+elem).fadeOut(1500, function(){
                        $('.'+elem).removeClass('note-success');
                        $('.'+elem+' .fa').removeClass('fa-check-circle-o');

                    });
                });


            }else{
                $('.'+elem).addClass('note-error');
                $('.'+elem+' .fa').addClass('fa-exclamation-triangle');
                $translate('error').then(function(val){
                    $scope.msg = val;
                    $('.'+elem).show();

                    $('.'+elem).fadeOut(1500, function(){
                        $('.'+elem).removeClass('note-error');
                        $('.'+elem+' .fa').removeClass('fa-exclamation-triangle');

                    });
                });
            }
        });

    };

    $scope.$watch('user.profile.language', function(lang){
        //console.log(lang);
        $translate.use(lang);
    });
}