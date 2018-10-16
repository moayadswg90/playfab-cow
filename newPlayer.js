handlers.newPlayer = function (args, context) 
{
  	var currentPlayerID = context.playerProfile.PlayerId;
  	glickoItems = [{Rating: offset}, {RD: factor}, {Vol: vol}];
  	var glickoItems = JSON.stringify(glickoItems);
  	counters = [];
	counters.push({wins:0});
	counters.push({fields:0});
	counters.push({troops:0});
	counters.push({cards:0});
	counters.push({duels:0});
  	var updatePlayerData = server.UpdateUserReadOnlyData
	(
		{
			PlayFabId: currentPlayerId,
		  	Data: 
		  	{
                glicko : glickoItems,
                tutorial: 0,
                lastShare: "2018-01-15T11:30:29.527Z",
                PlayerCounters: counters
	        }
	     }
	); 
  	var grantItems = server.GrantItemsToUser
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