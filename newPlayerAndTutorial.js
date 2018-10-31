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