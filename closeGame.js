handlers.closeGame = function (args, context) 
{
	var playerOneReadOnlyData = server.GetUserReadOnlyData
    (
          {
              PlayFabId: currentPlayerId
          }
    );
    var playerOneGold = calculateGoldEarned(isWon, checkFirstGame(playerOneReadOnlyData), checkFirstWin(playerOneReadOnlyData), doubleGoldCheck(currentPlayerId));
    
  	
  	
  	return playerOneGold;
}