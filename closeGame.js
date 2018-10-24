handlers.closeGame = function (args, context) 
{
	var playerOne = {};
	var playerOneReadOnlyData = server.GetUserReadOnlyData
    (
          {
              PlayFabId: currentPlayerId
          }
    );
    var playerTwoReadOnlyData = server.GetUserReadOnlyData
    (
          {
              PlayFabId: args.playerTwoId
          }
    );
    playerOne["id"] =  currentPlayerId;
    playerOne["firstGame"] = checkFirstGame(playerOneReadOnlyData)
    playerOne["firstWin"] = checkFirstWin(playerOneReadOnlyData);
    playerOne["gold"] = calculateEarnedGold(args.isWon, playerOne["firstWin"], playerOne["firstGame"], doubleGoldCheck(playerOne["id"]));
    
    //glicko
     glickoResult = calculateGlicko(playerOneReadOnlyData, playerTwoReadOnlyData, args.isWon);
     return glickoResult;
/*
  	playerOne["glicko"] = [{Rating: glickoResult.ratingResult}, {RD: glickoResult.rdResult}, {Vol: glickoResult.volResult}];
  	glickoItems = JSON.stringify(playerOne["glicko"]);
    
    //update player data
	updatePlayer(playerOne["id"], playerOne["firstGame"], playerOne["firstWin"], glickoItems);
	
	//update stats
	playerOne["stats"] = updateStats(playerOne["id"], args.isWon, parseInt(glickoResult.ratingResult))
	
	//grant gold
	var addGoldResult = server.AddUserVirtualCurrency
    (
    	{
	        PlayFabId: playerOne["id"],
	        VirtualCurrency: "GL",
	        Amount: playerOne["gold"]["totalGold"]
    	}
    ); 
*/

	return playerOne;
}