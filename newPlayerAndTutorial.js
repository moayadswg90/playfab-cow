handlers.newPlayer = function (args, context) 
{
  	var currentPlayerID = context.playerProfile.PlayerId;
  	glickoItems = {{Rating: offset}, {RD: factor}, {Vol: vol}};
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
	    var addGold = server.AddUserVirtualCurrency
		({
        	PlayFabId: currentPlayerId,
			VirtualCurrency: "GL",
			Amount: tutorialGoldReward
    	}); 
    	var addDimonds = server.AddUserVirtualCurrency
		({
        	PlayFabId: currentPlayerId,
			VirtualCurrency: "DM",
			Amount: tutorialDMReward
    	});
    	var updateTutorialStatus = server.UpdateUserReadOnlyData
		(
	      {
	        PlayFabId: currentPlayerId,
	        Data: 
	        {
	                  tutorial : 1
	        }
	      }
		);
    	return {firstTutorial: true, goldReward: tutorialGoldReward, dimondReward: tutorialDMReward};
    }
    else
    {
	  return {firstTutorial: false, goldReward: 0, dimondReward: 0};  
    }  	
 }
