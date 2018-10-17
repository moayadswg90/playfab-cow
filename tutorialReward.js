handlers.tutorialCompleted = function (args, context) 
{
	
	var playerReadOnlyData = server.GetUserReadOnlyData
    (
          {
              PlayFabId: currentPlayerId
          }
    );
    var tutorialCompleted = playerReadOnlyData.Data.tutorial.Value;  
    if (tutorialCompleted == 1)
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
