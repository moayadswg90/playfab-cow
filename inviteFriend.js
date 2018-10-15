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
	        VirtualCurrency: "DM",
	        Amount: shareReward
	    }); 
  	}
  	catch(e)
  	{
	  	return e;
  	}   	
 }