handlers.closeGame = function (args, context) 
{
	var playerOneReadOnlyData = server.GetUserReadOnlyData
    (
          {
              PlayFabId: currentPlayerId
          }
    );
    var playerOneGold = calculateGoldEarned(args.isWon, checkFirstGame(playerOneReadOnlyData), checkFirstWin(playerOneReadOnlyData), doubleGoldCheck(currentPlayerId));
    
  	
  	
  	return playerOneGold;
}