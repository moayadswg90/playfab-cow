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
		updateStatistics = server.UpdatePlayerStatistics
		({
		   	PlayFabId: currentPlayerId,
		    Statistics: 
		    [	
		    	{
			    	"StatisticName": "shares",
					"Value": 1
		       	}
			]
		});
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
		updateStatistics = server.UpdatePlayerStatistics
		({
		   	PlayFabId: args.friend,
		    Statistics: 
		    [	
		    	{
			    	"StatisticName": "invites",
					"Value": 1
		       	}
			]
		});
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
		server.WriteTitleEvent
	    (
		    {
		        EventName : "first_tutorial_completed",
		        Body: {playerID: currentPlayerId}
		    }
	    );
    	return result;
    }
    else
    {
	  var result = 	
		{
			reward:0
		};
		server.WriteTitleEvent
	    (
		    {
		        EventName : "tutorial_completed_again",
		        Body: {playerID: currentPlayerId}
		    }
	    );
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