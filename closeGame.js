handlers.closeGame = function (args, context) 
{
	var playerOne = [];
	playerOne.push({id: currentPlayerId});
	
	
	var playerOneReadOnlyData = server.GetUserReadOnlyData
    (
          {
              PlayFabId: currentPlayerId
          }
    );
    playerOne.push({firstGame: checkFirstGame(playerOneReadOnlyData)});
	playerOne.push({firstWin: checkFirstWin(playerOneReadOnlyData)});
/*
	
    //get glickoItems to update rank
    var playerOneGold = calculateEarnedGold(args.isWon, checkFirstGame(playerOneReadOnlyData), checkFirstWin(playerOneReadOnlyData), doubleGoldCheck(currentPlayerId));
	//update player data
	var updatePlayerData = server.UpdateUserReadOnlyData
	(
		{
		  PlayFabId: currentPlayerId,
		  Data: 
		  {
            glicko : glickoItems,
	        firstWin : today,
	        firstGame : today 
	      }
	    }
	);
	//update player stats
	//grant gold
  	
  	
  	return playerOneValues;
*/
	return playerOne;
}