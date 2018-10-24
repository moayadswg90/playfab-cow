function checkFirstGame(playerReadOnlyData)
{
  var firstGameFlag = false;
  var today = new Date();
  if (playerReadOnlyData.Data.firstGame)
    {
  		var firstGame = playerReadOnlyData.Data.firstGame.Value;
  		var firstGameDate = new Date(firstGame);
  		var differenceInDaysFirstGame = Math.floor((Date.UTC(firstGameDate.getFullYear(), firstGameDate.getMonth(), firstGameDate.getDate()) - Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) ) /(1000 * 60 * 60 * 24));
  		if (differenceInDaysFirstGame != 0)
        {
      		firstGameFlag =  true;
        }
    }
  	else
    {
      
        firstGameFlag = true;
    }
  return firstGameFlag;
}
function checkFirstWin(playerReadOnlyData)
{
  var firstWinFlag = false;
  var today = new Date();
  if (playerReadOnlyData.Data.firstWin)
    {
      	
  		var firstWin = playerReadOnlyData.Data.firstWin.Value;
  		var firstWinDate = new Date(firstWin);
  		var differenceInDaysFirstWin = Math.floor((Date.UTC(firstWinDate.getFullYear(), firstWinDate.getMonth(), firstWinDate.getDate()) - Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) ) /(1000 * 60 * 60 * 24));
  		if (differenceInDaysFirstWin != 0)
        {
      		firstWinFlag =  true;
        }
    }
  	else
    {
      
        firstWinFlag = true;
    }
  return firstWinFlag;
}
function doubleGoldCheck(currentPlayerId) 
{
  	var doubleGold = false;
  	var inventory = server.GetUserInventory
	(
		{
			PlayFabId: currentPlayerId
		}
	);
	inventoryItems = [];
	inventoryItems = inventory.Inventory;
	
	for(i = 0; i < inventoryItems.length; i++)
	{
		
		if (inventoryItems[i].ItemId == "DoubleGold2" || inventoryItems[i].ItemId == "DoubleGold6")
		{
			doubleGold = true;
		}		
	}
	
	return doubleGold;
}