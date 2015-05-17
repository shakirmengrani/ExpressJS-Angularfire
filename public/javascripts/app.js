var app = angular.module('mean',['firebase']);
var url = "https://76dev.firebaseio.com/Users";
var ref = null;
app.factory("$FDB",function($firebaseArray) {
    // create a reference to the Firebase where we will store our data
    ref = new Firebase(url);
    return $firebaseArray(ref);
  });