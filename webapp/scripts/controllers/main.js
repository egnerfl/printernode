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

		$scope.delete = function(file){
			console.log('delete', file);
		}

		$scope.download = function(file) {
			console.log('/printer' + file);
			document.location = '/printer' + file;
		}

		$scope.parseFileType = function(file) {
			var type = file.replace('/', '');

			type = type.split('.')[type.split('.').length - 1];

			return type;
		}

		$scope.parseFileName = function(file) {
			var name = file.replace('/', '');

			if (name.length > 10) {
				name = name.substring(0, 8) + '..';
			}

			return name;
		}

	}]);