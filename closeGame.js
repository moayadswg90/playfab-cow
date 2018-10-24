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
	//playerOne.push({doubleGold: doubleGoldCheck(playerOne.id)});
	//playerOne.push({gold: calculateEarnedGold(args.isWon, playerOne["firstWin"], playerOne["firstGame"], playerOne["doubleGold"])});
/*
	
    //get glickoItems to update rank
    
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
	return playerOne.firstGame;
}