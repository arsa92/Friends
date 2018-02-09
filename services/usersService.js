database = require("../database");
users = database.users;

function getAllUsers() {
    return users;
}

function findUserWithId(userId) {
    var result;

    users.forEach(currentUser => {
        if (currentUser.id == userId) {
            result = currentUser;
            return;
        }
    });

    return result;
}

function findUsersWithId(ids) {
    var result = [];

    users.forEach(currentUser => {
        if(ids.indexOf(currentUser.id) != -1) {
            result.push(currentUser);
        }
    });

    return result;
}

function getDirectFriendsOfUser(user) {
    var result = [];

    user.friends.forEach(friendId => {
        users.forEach(currentUser => {
            if (currentUser.id == friendId) {
                result.push(currentUser);
            }
        });
    });

    return result;
}

function getFriendsOfFriends(user) {
    var map = {};
    var directFriends = getDirectFriendsOfUser(user);

    directFriends.forEach(directFriend => {
        var friendsOfFriend = getDirectFriendsOfUser(directFriend); 

        friendsOfFriend.forEach(friendOfFriend => {
            console.log(friendOfFriend);
            if (user.friends.indexOf(friendOfFriend.id) == -1 &&
                user.id != friendOfFriend.id) {
                map[friendOfFriend.id] = friendOfFriend;
            }
        });
    });

    return Object.values(map);
}

function getSuggestedFriends(user) {
    var sharedFriendsCounter = {};
    var directFriends = getDirectFriendsOfUser(user);

    directFriends.forEach(directFriend => {
        directFriend.friends.forEach(friendId => {
            if (sharedFriendsCounter[friendId]) {
                sharedFriendsCounter[friendId]++;
            }
            else {
                sharedFriendsCounter[friendId] = 1;
            }
        });
    });

    var suggestedFriendsIds = [];
    for (var id in sharedFriendsCounter) {



        if (sharedFriendsCounter[id] >= 2 && 
            user.friends.indexOf(parseInt(id)) == -1 &&
            id != user.id) {
            
            console.log(id);
            suggestedFriendsIds.push(parseInt(id));
        }
    }
  
    return findUsersWithId(suggestedFriendsIds);
}



module.exports = {
    getAllUsers: getAllUsers,
    findUserWithId: findUserWithId,
    getDirectFriendsOfUser: getDirectFriendsOfUser,
    getFriendsOfFriends: getFriendsOfFriends,
    getSuggestedFriends: getSuggestedFriends
};