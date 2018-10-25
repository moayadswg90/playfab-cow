function endGameByEvent(photonGameID, playerOneId, playerTwoId, isWon, isDuel, troops, fields, cards)
{

	//update player who sent event data
	var playerOne = {};
	var playerTwo = {};
	
	
	var playerTwoWon = 0;
	if(isWon == 0)
		playerTwoWon = 1;
		
	var playerOneReadOnlyData = server.GetUserReadOnlyData
    (
          {
              PlayFabId: playerOneId
          }
    );
    var playerTwoReadOnlyData = server.GetUserReadOnlyData
    (
          {
              PlayFabId: playerTwoId
          }
    );

    

    //player one gold
    playerOne["firstGame"] = checkFirstGame(playerOneReadOnlyData);
/*
    server.WriteTitleEvent
		(
	    	{
	        	EventName : "firstGamecheck", Body: {playerOne["firstGame"]} 
	    	}
		);
*/
    playerOne["firstWin"] = checkFirstWin(playerOneReadOnlyData);
    playerOne["gold"] = calculateEarnedGold(isWon, playerOne["firstWin"], playerOne["firstGame"], doubleGoldCheck(playerOneId));

    //player two gold
    playerTwo["firstGame"] = checkFirstGame(playerTwoReadOnlyData);
    playerTwo["firstWin"] = checkFirstWin(playerTwoReadOnlyData);
    playerTwo["gold"] = calculateEarnedGold(playerTwoWon, playerTwo["firstWin"], playerTwo["firstGame"], doubleGoldCheck(playerTwoId));
 

    //glicko both players
     glickoResult = calculateGlicko(playerOneReadOnlyData, playerTwoReadOnlyData, isWon);

     playerOne["glicko"] = glickoResult[0];
     playerTwo["glicko"] = glickoResult[1];
     
     
	 var setSenderInShareGroupData = server.UpdateSharedGroupData
    (
          {
              SharedGroupId: photonGameID,
              Data: {JSON.parse(playerOne)}
          }
    );
	var result = [playerOne, playerTwo];
	return result;
}