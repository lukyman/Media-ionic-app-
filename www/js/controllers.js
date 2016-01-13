angular.module('starter.controllers', ['ngSanitize'])


.service('mediaService', ['$http','$q', function($http,$q){

	var deffered = $q.defer();

	$http.get('js/channels.json').then(function(data){

		deffered.resolve(data);
	});

	this.getChannels=function(){
		return deffered.promise;
	}
	
}])

.controller('streamCtrl', function($scope,mediaService,$filter,$location,$window,$rootScope,$sce){

 //$scope.title="ktn";

var promise = mediaService.getChannels();


$scope.submit=function(val){
	
	console.log(val);
	promise.then(function(data){

	$scope.ch_info = data.data;
	console.log($scope.ch_info);

	channel =$filter('filter')($scope.ch_info,function(data){
		if (val===data.id) {
			
		 $rootScope.title=data.title;
		$rootScope.url=$sce.trustAsResourceUrl(data.url);
			console.log($rootScope.url);
			//return data;
		$location.path("/stream");

	}

	
	})[0];
	
	})

}



// $scope.submit=function(val){
 	
 	
// 	console.log(val);

// 	$http.get('js/channels.json')
// 	.success(function(data){

// 		$scope ch_info = [];

// 		angular.forEach(data.ch_info, function(value) {
//             $scope.ch_info.push(value);
//         });
    
// 		// // var ch_info = data.ch;
// 	 // console.log(ch_info.id);


		
// 		// // // console.log(ch_info.id);
// 		// if(val===ch_info.id) {
//   //         console.log(ch_info);
// 		// }

// 	})
// 	.error(function(data){

// 	});

// }
})
