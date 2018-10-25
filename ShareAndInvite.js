handlers.shareGame = function (args, context) 
{
	
  	today = new Date();
  	sharedToday = false;
  	
	var playerReadOnlyData = server.GetUserReadOnlyData
    (
          {
              PlayFabId: currentPlayerId
          }
    );
      	
  	sharedToday = checkSharedToday(playerReadOnlyData, currentPlayerId);
  	if (sharedToday)
  	{
	  	var addGoldResult = server.AddUserVirtualCurrency
	  	({
        	PlayFabId: currentPlayerId,
			VirtualCurrency: "DM",
			Amount: shareReward
    	}); 
    	var updatePlayerData = server.UpdateUserReadOnlyData
		  	(
		  		{
		  			PlayFabId: currentPlayerId,
		  			Data: 
		  			{
	                  lastShare : today
	        		}
	      		}
		  	);
    	return {Reward:shareReward} ;
  	
  	}
  	else
  		return {Reward:0} ;
  	
 }
 function checkSharedToday(playerReadOnlyData, currentPlayerId)
{
  var sharedToday = false;
  var today = new Date();
  if (playerReadOnlyData.Data.lastShare)
    {
  		var lastShare = playerReadOnlyData.Data.lastShare.Value;
  		var lastShareDate = new Date(lastShare);
  		var differenceInDaysLastShare = Math.floor((Date.UTC(lastShareDate.getFullYear(), lastShareDate.getMonth(), lastShareDate.getDate()) - Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) ) /(1000 * 60 * 60 * 24));
  		if (differenceInDaysLastShare != 0)
        {
      		sharedToday =  true;
        }
    }
  	else
    {
      
        sharedToday = true;
    }
  return sharedToday;
}
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