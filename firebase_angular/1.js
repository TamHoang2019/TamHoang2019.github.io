var app = angular.module('app', ['firebase']); //Tạo 1 module của angular, inject module firebase vào
app.controller('chatCtrl', ['$scope', '$firebase',
    function($scope, $firebase) {
        var name = prompt("Enter your name: ", '');
        $scope.name = name; //Lấy tên của người dùng
        $scope.chatMessage = ""; //Tẩy trắng khung text
        //Kết nối tới service của firebase, url ở đây là url app của bạn ở bước trên nhé
        var ref = new Firebase(
            "https://chatting-sample.firebaseio.com/");
        var sync = $firebase(ref);
        $scope.chatMessages = sync.$asArray(); //Lấy toàn bộ dữ liệu trong database trên Firebase, biến nó thành 1 array các object trong javascript
        $scope.sendChat = function() {
            var chatMessage = {
                name: name,
                message: $scope.chatMes
            };
            $scope.chatMessages.$add(chatMessage); //Thêm 1 tin nhắn vào array
            $scope.chatMes = "";
        }
    }
]);