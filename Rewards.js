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
	  	grantShareReward = server.GrantItemsToUser
	  	(
	   		{
	  			PlayFabId: currentPlayerId,
	  			ItemIds: 
	          	[
	    			"ShareReward"
	  			]
			}
		);
    	server.UpdateUserReadOnlyData
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
					items: ["ShareReward"]
			}
		};
    	return result;
  	}
  	else
  		return {reward:0} ;
  	
 }
 handlers.inviteFriend = function (args, context) 
{	
	var isFriend = false;
	var friendsList = server.GetFriendsList
	(
	    {
	        PlayFabId: currentPlayerId
	    }
	);
	friendsList = friendsList.Friends;
	for (i = 0; i < friendsList.length; i++)
	{
		if (friendsList[i]["FriendPlayFabId"] == args.friend)
			isFriend = true;
	}
	if (!isFriend)
	{
		server.AddFriend
		(
	          {
	              PlayFabId: currentPlayerId,
	              FriendPlayFabId: args.friend
	          }
		);
		server.GrantItemsToUser
	  	(
	   		{
	  			PlayFabId: currentPlayerId,
	  			ItemIds: ["InviteReward"]
			}
		);
	}
	isFriend = false;
	friendsList = server.GetFriendsList
	(
	    {
	        PlayFabId: args.friend
	    }
	);
	friendsList = friendsList.Friends;
	for (i = 0; i < friendsList.length; i++)
	{
		if (friendsList[i]["FriendPlayFabId"] == currentPlayerId)
			isFriend = true;
	}
	if (!isFriend)
	{
		server.AddFriend
		(
	          {
	              PlayFabId: args.friend,
	              FriendPlayFabId: currentPlayerId
	          }
		);
		server.GrantItemsToUser
	  	(
	   		{
	  			PlayFabId: args.friend,
	  			ItemIds: ["InviteReward"]
			}
		);
	}
	return {result: true};
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
	    server.GrantItemsToUser
	  	(
	   		{
	  			PlayFabId: currentPlayerId,
	  			ItemIds: 
	          	["TutorialCompleted"]
			}
		);
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
				items: ["TutorialCompleted"]
			}
		};
    	return result;
    }
    else
    {
	  var result = 	
		{
			reward:0
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