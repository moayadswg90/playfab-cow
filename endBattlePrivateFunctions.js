function checkFirstGame(playerReadOnlyData)
{
  var firstGameFlag = false;
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
function updatePlayerCounter(winsIncrement, fieldsIncrement, troopsIncrement, cardsIncrement, duelsIncrement, playerReadOnlyData)
{
	if (winsIncrement == null || fieldsIncrement == null || troopsIncrement == null || cardsIncrement == null || duelsIncrement == null)
	{
		var error = new Error("MissingParamaters");
		error.errorCode = 500;
		error.error = "missing paramaters";
		throw error;
	}
		 
	if (playerReadOnlyData.Data.PlayerCounters)
	{
	    var previousCounters = JSON.parse(playerReadOnlyData.Data.PlayerCounters.Value);
	  	var previousWins = parseInt(previousCounters[0].wins);
	  	var previousFields = parseInt(previousCounters[1].fields);
	  	var previousTroops = parseInt(previousCounters[2].troops);
	  	var previousCards = parseInt(previousCounters[3].cards);
	 	var previousDuels = parseInt(previousCounters[4].duels);
	 	  // increment counters
	 	itemsArray = [];
	 	itemsArray.push({wins:winsIncrement+previousWins});
	 	itemsArray.push({fields:fieldsIncrement+previousFields});
	 	itemsArray.push({troops:troopsIncrement+previousTroops});
	 	itemsArray.push({cards:cardsIncrement+previousCards});
	 	itemsArray.push({duels:duelsIncrement+previousDuels});
	  
	 	var itemsArray = JSON.stringify(itemsArray); 
	 	return itemsArray;
  	}
  	else
  	{
	  	var error = new Error("CountersReadError");
		error.errorCode = 500;
		error.error = "couldn't read previous counters";
		throw error;	
  	}
}
/*
function checkDoubleGold(currentPlayerId)
{
	var doubleGold = false;
  	var inventory = server.GetUserInventory
	(
		{
			PlayFabId: currentPlayerId
		}
	);
	var inventoryItems = inventory.Inventory;
	for(i = 0; i < inventoryItems.length; i++)
	{
		if (inventoryItems[i].ItemID == "DoubleGold2" || inventoryItems[i].ItemID == "DoubleGold6")
		{
			doubleGold = true;
			break;
		}
			
	}
	return doubleGold;
}
*/