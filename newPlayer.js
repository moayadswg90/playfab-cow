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
                tutorial: 0
	        }
	     }
	); 
  	var grantItems = server.GrantItemsToUser
  	(
   		{
  			PlayFabId: currentPlayerId,
  			Annotation: "Rerolled box",
  			ItemIds: 
          	[
    			"StarterBundle"
  			]
		}
  	);
}