handlers.closeGame = function (args, context) 
{
	var playerOne = {};
	var playerOneReadOnlyData = server.GetUserReadOnlyData
    (
          {
              PlayFabId: currentPlayerId
          }
    );
    playerOne["id"] =  currentPlayerId;
    playerOne["firstGame"] = checkFirstGame(playerOneReadOnlyData)
    playerOne["firstWin"] = checkFirstWin(playerOneReadOnlyData);
    playerOne["gold"] = calculateEarnedGold(args.isWon, playerOne["firstWin"], playerOne["firstGame"], doubleGoldCheck(playerOne["id"]));
    
    //glicko
    glickoResult = calculateGlicko(playerOneReadOnlyData, args.isWon);
  	glickoItems = [{Rating: glickoResult.ratingResult}, {RD: glickoResult.rdResult}, {Vol: glickoResult.volResult}];
  	glickoItems = JSON.stringify(glickoItems);
    
    //update player data
	updatePlayer(playerOne["id"], playerOne["firstGame"], playerOne["firstWin"], glickoItems);
	
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
	return playerOne;
}