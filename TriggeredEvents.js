handlers.newPlayer = function (args, context) 
{
  	var currentPlayerID = context.playerProfile.PlayerId;
  	glickoItems = {Rating: offset, RD: factor, Vol: vol};
  	var glickoItems = JSON.stringify(glickoItems);
  	server.UpdateUserReadOnlyData
	(
		{
			PlayFabId: currentPlayerId,
		  	Data: 
		  	{
                glicko : glickoItems,
                tutorial: 0,
                lastShare: "2018-01-15T11:30:29.527Z",
	        }
	     }
	); 
  	server.GrantItemsToUser
  	(
   		{
  			PlayFabId: currentPlayerId,
  			Annotation: "Starter Cards",
  			ItemIds: 
          	[
    			"StarterBundle"
  			]
		}
  	);
}
handlers.setPOTW = function (args, context) 
{
	try
	{
		var rank = context.playStreamEvent.Rank;
		if (rank == 1)
		{
			server.SetTitleData
			(
			   {
			  		Key: "potw",
			  		Value: context.playerProfile.PlayerId
				}
			); 
			server.GrantItemsToUser
			(
				{
			  		PlayFabId: context.playerProfile.PlayerId,
			  		ItemIds: 
			        ["potwReward"]
				}
			);
			server.SendPushNotification
			({
			    Recipient: context.playerProfile.PlayerId,
			    Message: "Congratulations! you are Player Of the Week "
			});  
		}
		else
		{
			server.GrantItemsToUser
			(
				{
			  		PlayFabId: context.playerProfile.PlayerId,
			  		ItemIds: 
			        ["topTenWeeklyReward"]
				}
			);
			server.SendPushNotification
			({
			    Recipient: context.playerProfile.PlayerId,
			    Message: "Congratulations! you Ranked in Top 10 this week"
			});
		}  
	}
	catch(e)
	{
		return {code: e.apiErrorInfo.apiError.errorCode, error: e.apiErrorInfo.apiError.error};
	}
    
}
handlers.dailyLeaderboardReward = function (args, context) 
{
	try
	{
		server.GrantItemsToUser
		(
			{
			  PlayFabId: context.playerProfile.PlayerId,
			  ItemIds: 
			  ["topTenDailyReward"]
			}
		);
	    server.SendPushNotification
	    ({
	        Recipient: context.playerProfile.PlayerId,
	        Message: "Congratulations! you Ranked in Top 10 in daily leaderboard"
	    });
	}
  		
	catch(e)
	{
		return {code: e.apiErrorInfo.apiError.errorCode, error: e.apiErrorInfo.apiError.error};
	}   
}