handlers.closeGame = function (args, context) 
{
	var playerOne = {};
	var playerTwo = {};
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
     playerOne["glicko"] = JSON.stringify(glickoResult[0]);
     playerTwo["glicko"] = JSON.stringify(glickoResult[1]);

    return playerOne;
    //update player data
	updatePlayer(playerOne["id"], playerOne["firstGame"], playerOne["firstWin"], playerOne["glicko"]);
	
	//update stats
	playerOne["stats"] = updateStats(playerOne["id"], args.isWon, parseInt(playerOne["glicko"]["Rating"]))
	
	//grant gold
	var addGoldResult = server.AddUserVirtualCurrency
    (
    	{
	        PlayFabId: playerOne["id"],
	        VirtualCurrency: "GL",
	        Amount: playerOne["gold"]["totalGold"]
    	}
    ); 



	return playerOne;
}