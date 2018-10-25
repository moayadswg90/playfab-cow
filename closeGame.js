handlers.closeGame = function (args, context) 
{
	var playerOne = {};
	playerOne["id"] =  currentPlayerId;
	var playerTwo = {};
	playerTwo["id"] =  args.playerTwoId;
	
	var playerTwoWon = 0;
	if(args.isWon == 0)
		playerTwoWon = 1;
	
	var playerOneReadOnlyData = server.GetUserReadOnlyData
    (
          {
              PlayFabId: playerOne["id"]
          }
    );
    var playerTwoReadOnlyData = server.GetUserReadOnlyData
    (
          {
              PlayFabId: playerTwo["id"]
          }
    );
    
    //player one gold
    playerOne["firstGame"] = checkFirstGame(playerOneReadOnlyData)
    playerOne["firstWin"] = checkFirstWin(playerOneReadOnlyData);
    playerOne["gold"] = calculateEarnedGold(args.isWon, playerOne["firstWin"], playerOne["firstGame"], doubleGoldCheck(playerOne["id"]));
    
    //player two gold
    playerTwo["firstGame"] = checkFirstGame(playerTwoReadOnlyData)
    playerTwo["firstWin"] = checkFirstWin(playerTwoReadOnlyData);
    playerTwo["gold"] = calculateEarnedGold(playerTwoWon, playerTwo["firstWin"], playerTwo["firstGame"], doubleGoldCheck(playerTwo["id"]));
    
    //glicko both players
     return calculateGlicko(playerOneReadOnlyData, playerTwoReadOnlyData, args.isWon);
     playerOne["glicko"] = glickoResult[0];
     playerTwo["glicko"] = glickoResult[1];

    //update player data
	updatePlayer(playerOne["id"], playerOne["firstGame"], playerOne["firstWin"], JSON.stringify(playerOne["glicko"]));
	updatePlayer(playerTwo["id"], playerTwo["firstGame"], playerTwo["firstWin"], JSON.stringify(playerTwo["glicko"]));
	
	//update stats
	playerOne["stats"] = updateStats(playerOne["id"], args.isWon, parseInt(playerOne["glicko"]["Rating"]));
	playerTwo["stats"] = updateStats(playerTwo["id"], playerTwoWon, parseInt(playerTwo["glicko"]["Rating"]));
	
	//grant gold
	var addGoldResult = server.AddUserVirtualCurrency
    (
    	{
	        PlayFabId: playerOne["id"],
	        VirtualCurrency: "GL",
	        Amount: playerOne["gold"]["totalGold"]
    	}
    ); 
    var addGoldResult = server.AddUserVirtualCurrency
    (
    	{
	        PlayFabId: playerTwo["id"],
	        VirtualCurrency: "GL",
	        Amount: playerTwo["gold"]["totalGold"]
    	}
    ); 


	var result = [playerOne, playerTwo]
	return result;
}