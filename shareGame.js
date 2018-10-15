handlers.shareGame = function (args, context) 
{
	
  	today = new Date();
  	sharedToday = false;
  	
	var playerReadOnlyData = server.GetUserReadOnlyData
    (
          {
              PlayFabId: currentPlayerId,
          }
    );
      	
  	sharedToday = checkSharedToday(playerReadOnlyData, currentPlayerId);
  	if (sharedToday)
  	{
	  	var addGoldResult = server.AddUserVirtualCurrency
	  	({
        	PlayFabId: currentPlayerId,
			VirtualCurrency: "DM",
			Amount: shareReward
    	}); 
    	return true;
  	
  	}
  	else
  		return false;
  	
 }
 function checkSharedToday(playerReadOnlyData, currentPlayerId)
{
  var sharedToday = false;
  if (playerReadOnlyData.Data.lastShare)
    {
  		var lastShare = playerReadOnlyData.Data.lastShare.Value;
  		var flastShareDate = new Date(lastShare);
  		var differenceInDaysFirstGame = Math.floor((Date.UTC(firstGameDate.getFullYear(), firstGameDate.getMonth(), firstGameDate.getDate()) - Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) ) /(1000 * 60 * 60 * 24));
  		if (differenceInDaysFirstGame != 0)
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