handlers.newPlayer = function (args, context) 
{
  	var currentPlayerID = context.playerProfile.PlayerId;
  	glickoItems = [{Rating: offset}, {RD: factor}, {Vol: vol}];
  	var glickoItems = JSON.stringify(glickoItems);
  	var updatePlayerData = server.UpdateUserReadOnlyData
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