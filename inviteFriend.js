handlers.inviteFriend = function (args, context) 
{
	var friendPlayFabID = args.friend
	
  	try
  	{
		  var addFriend = server.AddFriend
		  (
	          {
	              PlayFabId: currentPlayerId,
	              FriendPlayFabId: args.friend
	          }
		  );
	    var addPlayerToFriend = server.AddFriend
	    (
	          {
	              PlayFabId: args.friend,
	              FriendPlayFabId: currentPlayerId
	          }
	    );
	     var sendNotification = server.SendPushNotification
	    ({
	        Recipient: args.friend,
	        Message: "Your friend has joined the game"
	    });
	    var rewardFriend = server.AddUserVirtualCurrency
	    ({
	        PlayFabId: args.friend,
	        VirtualCurrency: "GL",
	        Amount: invitePlayerReward
	    });
	    return true; 
  	}
  	catch(e)
  	{
	  	return {code: e.apiErrorInfo.apiError.errorCode, error: e.apiErrorInfo.apiError.error};
  	}   	
 }