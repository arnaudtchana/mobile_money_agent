/**
 * Created by user on 28/02/2018.
 */
app
  .controller('ListeKiosqueCtrl', function($scope,$state,Restangular,$cordovaGeolocation,$stateParams,$auth,$sessionStorage,$ionicLoading) {
    $scope.data = {};
    /*on doit recuperer la liste des kiosques de lutilisateur conneceter*/
    $scope.$on('$ionicView.enter', function () {
      $scope.aucun_kiosque = "";
      $scope.info_modif = "";
      $ionicLoading.show({
        template: 'Loading...',
      })
      var Kiosque = Restangular.one('kiosque');
      Kiosque.get({user_id:$sessionStorage.user_id}).then(function (data) {
        $ionicLoading.hide();
        if(data.total == 0){
          $scope.aucun_kiosque = "Aucun kiosque enregistré"
        }else{
          $scope.info_modif = "Sélectionner le kiosque dont vous souhaitez modifier les informations";
        }
        $scope.kiosques_user = data.data;
        console.log(data);
      },function (error) {
        $ionicLoading.hide();
      })

      $scope.delete_kiosque = function (id) {
        /*on supprime le kiosque dont on a l'id en parametre*/
        //alert("le supprime le kiosque"+id);
          $ionicLoading.show({
            template: 'Loading...',
          })
        var Supprime_kiosque = Restangular.one('kiosque',id);
        Supprime_kiosque.remove().then(function (response) {
          var Kiosque = Restangular.one('kiosque');
          Kiosque.get({user_id:$sessionStorage.user_id}).then(function (data) {
            $ionicLoading.hide();
            $scope.kiosques_user = data.data;
            console.log(data);
          },function (error) {
            $ionicLoading.hide();
          })
        },function (error) {
          $ionicLoading.hide();
          alert('Une erreur est survenue');
        })
      }
    });


  });
