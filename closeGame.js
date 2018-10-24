handlers.closeGame = function (args, context) 
{
	var playerOneReadOnlyData = server.GetUserReadOnlyData
    (
          {
              PlayFabId: currentPlayerId
          }
    );
    var playerOneValues = calculateEarnedValues(args.isWon, checkFirstGame(playerOneReadOnlyData), checkFirstWin(playerOneReadOnlyData), doubleGoldCheck(currentPlayerId));

  	
  	
  	return playerOneValues;
}