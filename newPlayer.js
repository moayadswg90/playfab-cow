handlers.newPlayer = function (args, context) 
{
  	var currentPlayerID = context.playerProfile.PlayerId;
  	glickoItems = [{Rating: offset}, {RD: factor}];
  	var glickoItems = JSON.stringify(glickoItems);
  	var updatePlayerData = server.UpdateUserReadOnlyData
	(
		{
			PlayFabId: currentPlayerId,
		  	Data: 
		  	{
                glicko : glickoItems
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