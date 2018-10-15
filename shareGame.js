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
    	return {Reward:shareReward} ;
  	
  	}
  	else
  		return {Reward:0} ;
  	
 }
 function checkSharedToday(playerReadOnlyData, currentPlayerId)
{
  var sharedToday = false;
  if (playerReadOnlyData.Data.lastShare)
    {
  		var lastShare = playerReadOnlyData.Data.lastShare.Value;
  		var lastShareDate = new Date(lastShare);
  		var differenceInDaysFirstGame = Math.floor((Date.UTC(lastShareDate.getFullYear(), lastShareDate.getMonth(), lastShareDate.getDate()) - Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) ) /(1000 * 60 * 60 * 24));
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