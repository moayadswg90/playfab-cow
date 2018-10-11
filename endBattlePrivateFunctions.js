function checkFirstGame(firstGameAndWin, currentPlayerId)
{
  var firstGameFlag = false;
  if (firstGameAndWin.Data.firstGame)
    {
  		var firstGame = firstGameAndWin.Data.firstGame.Value;
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
function checkFirstWin(firstGameAndWin, currentPlayerId)
{
  var firstWinFlag = false;
  if (firstGameAndWin.Data.firstWin)
    {
      	
  		var firstWin = firstGameAndWin.Data.firstWin.Value;
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
function updatePlayerCounter(winsIncrement, fieldsIncrement, troopsIncrement, cardsIncrement, duelsIncrement, currentPlayerId, playerReadOnlyData)
{

  var previousWins = 0;
  var previousFields = 0;
  var previousTroops = 0;
  var previousCards = 0;
  var previousDuels = 0;
  if (playerReadOnlyData.Data.PlayerCounters)
  {
    var previousCounters = JSON.parse(playerReadOnlyData.Data.PlayerCounters.Value);
  	previousWins = parseInt(previousCounters[0].wins);
  	previousFields = parseInt(previousCounters[1].fields);
  	previousTroops = parseInt(previousCounters[2].troops);
  	previousCards = parseInt(previousCounters[3].cards);
 	previousDuels = parseInt(previousCounters[4].duels);
  }
  
 
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