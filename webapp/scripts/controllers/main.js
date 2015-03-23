'use strict';

/**
 * @ngdoc function
 * @name printernode.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the printernode
 */
angular.module('printernode')
	.controller('MainCtrl', ["$scope", "$rootScope", "socket", function($scope, $rootScope, socket) {

		var localData = {};

		$rootScope.$on('updateData', function(event, data) {
			localData[data.type] = data;

			$scope.$apply(function() {
				$scope.data = localData;
			});
		});

		$scope.download = function(file){
			console.log('/printer' + file);
			document.location = '/printer' + file;
		}
		
		$scope.parseFileName = function(file){
			return file.replace('/','');
		}

	}]);