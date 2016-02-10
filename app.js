var app = angular.module('popPhilosophy', ['ui.router']);


app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider){

		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: '/home.html',
				controller: 'MainCtrl'
			})

		
			.state('posts', {
				url: '/posts/{id}',
				templateUrl: '/posts.html',
				controller: 'PostsCtrl'
			});

		$urlRouterProvider.otherwise('home');
	}]);


//creating a new object that has an array property called posts
app.factory('postFactory', [function(){
	var o = {
		posts: []
	};
	return o;
}]);



//Main Controller
app.controller('MainCtrl', [
	'$scope',
	'postFactory',
	function($scope, postFactory){
		$scope.posts = postFactory.posts;

		$scope.posts = [
			{title: 'post 1', upvotes: 5},
			{title: 'post 2', upvotes: 2},
			{title: 'post 3', upvotes: 15},
			{title: 'post 4', upvotes: 9},
			{title: 'post 5', upvotes: 4}
			];

		$scope.addPost = function(){
			if (!$scope.title || $scope.title === ''){ return; }
			$scope.posts.push({
				title: $scope.title, 
				link: $scope.link,
				upvotes: 0,
				comments: [
					{author: 'Joe', body: 'Cool Post!', upvotes: 0},
					{author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
				] 
			});

			$scope.title = '';
			$scope.link = '';
		};

		$scope.incrementUpvotes = function(post) {
			post.upvotes +=1;
		}


}]);


// Posts Controller
app.controller('PostsCtrl', [
	'$scope',
	'$stateParams',
	'postFactory',
	function ($scope, $stateParams, postFactory){
		$scope.post = postFactory.posts[$stateParams.id];



		// allow users to posts new comments
		$scope.addComment = function(){

			if ($scope.body === ''){return;}
			$scope.post.comments.push({
				body: $scope.body,
				author: 'user',
				upvotes: 0
			});
			$scope.body = '';
		};
}]);





