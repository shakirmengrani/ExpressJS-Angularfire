app.controller('user.view',function($scope,$http,$FDB,$firebaseArray){
	$scope.Users = $FDB;
	var headError = $("#head-error");
	var headInfo = $("#head-info");
	$scope.addNew = function(){
		var valid = true;
		var username = $scope.txt_username;
		var name = $scope.txt_name;
		var email = $scope.txt_email;
		if (username === undefined){
			$("[ng-model='txt_username']").addClass("alert alert-danger");
			$("[ng-model='txt_username']").next().text("Please enter Username");
			valid  = false;			
		}else{
			$("[ng-model='txt_username']").removeClass("alert alert-danger");
			$("[ng-model='txt_username']").next().text("");
			valid = (valid == false ? false : true);
		}
		if (name === undefined){
			$("[ng-model='txt_name']").addClass("alert alert-danger");
			$("[ng-model='txt_name']").next().text("Please enter Name");
			valid = false;
		}else{
			$("[ng-model='txt_name']").removeClass("alert alert-danger");
			$("[ng-model='txt_name']").next().text("");
			valid  = (valid  == false ? false : true);
		}
		if (email === undefined){
			$("[ng-model='txt_email']").addClass("alert alert-danger");
			$("[ng-model='txt_email']").next().text("Please enter email address");
			valid = false;
		}else{
			$("[ng-model='txt_email']").removeClass("alert alert-danger");
			$("[ng-model='txt_email']").next().text("");
			valid  = (valid  == false ? false : true);
		}
		if (!valid ){
			headError.text("Please validate all fields");
			headError.show();
			headInfo.hide();
		}else{
			if ($FDB.$getRecord(username) !== null){
				headError.text("Username already exsist !");
				headError.show();
				headInfo.hide();
				return false;
			}else{
				headError.hide();
			}
			ref.path.o.push(username);						
			$FDB.$add({
				Name : name,
				EMail : email
			}).then(function(ref){
				var id = $FDB.$indexFor(ref.key());
				headError.hide();
				headInfo.text("The username = " + username + " is added");
				headInfo.show();
				ref.path.o.pop();
				$scope.txt_username = "";
				$scope.txt_name = "";
				$scope.txt_email = "";
			}),(function(error){
				headError.text(error);
				headError.show();
				headInfo.hide();
			});
		};
	};
	$scope.removeItem = function(key){
		$FDB.$remove($FDB.$getRecord(key)).then(function(ref){
			headError.hide();
			headInfo.text("The username = " + key + " is removed");
			headInfo.show();
		},function(error){
			headError.text(error);
			headError.show();
			headInfo.hide();
		});
	};
});