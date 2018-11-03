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
  	sharedToday = checkSharedToday(playerReadOnlyData);
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
		var result = 	
		{
			reward:
			{
				currency:
				{
					DM:
					{
						increment: shareReward
					}
				}
			}
		};
    	return result;
  	}
  	else
  		return {Reward:0} ;
  	
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
 
handlers.tutorialCompleted = function (args, context) 
{
	
	var playerReadOnlyData = server.GetUserReadOnlyData
    (
          {
              PlayFabId: currentPlayerId
          }
    );
    var tutorialCompleted = playerReadOnlyData.Data.tutorial.Value;  
    if (tutorialCompleted == 0)
    {   
	    server.AddUserVirtualCurrency
		({
        	PlayFabId: currentPlayerId,
			VirtualCurrency: "GL",
			Amount: tutorialGoldReward
    	}); 
    	server.AddUserVirtualCurrency
		({
        	PlayFabId: currentPlayerId,
			VirtualCurrency: "DM",
			Amount: tutorialDMReward
    	});
    	server.UpdateUserReadOnlyData
		(
	      {
	        PlayFabId: currentPlayerId,
	        Data: 
	        {
	                  tutorial : 1
	        }
	      }
		);
		var result = 	
		{
			reward:
			{
				currency:
				{
					GL: 
					{
						increment: tutorialGoldReward
					},
					DM:
					{
						increment: tutorialDMReward
					}
				}
			}
		};
    	return result;
    }
    else
    {
	  var result = 	
		{
			reward:
			{
				currency:
				{
					GL: 
					{
						increment: 0
					},
					DM:
					{
						increment: 0
					}
				}
			}
		};
		return result;
    }  	
 }
 function checkSharedToday(playerReadOnlyData)
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