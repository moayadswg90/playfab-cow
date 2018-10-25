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

    server.WriteTitleEvent
		(
	    	{
	        	EventName : "pOneReadOnlyPassed"
	    	}
		);
    

    //player one gold
    playerOne["firstGame"] = checkFirstGame(playerOneReadOnlyData);
    playerOne["firstWin"] = checkFirstWin(playerOneReadOnlyData);
    playerOne["gold"] = calculateEarnedGold(isWon, playerOne["firstWin"], playerOne["firstGame"], doubleGoldCheck(playerOneId));
    server.WriteTitleEvent
		(
	    	{
	        	EventName : "pOneCheckers"
	    	}
		);
    
    //player two gold
    playerTwo["firstGame"] = checkFirstGame(playerTwoReadOnlyData);
    playerTwo["firstWin"] = checkFirstWin(playerTwoReadOnlyData);
    playerTwo["gold"] = calculateEarnedGold(playerTwoWon, playerTwo["firstWin"], playerTwo["firstGame"], doubleGoldCheck(playerTwoId));
    server.WriteTitleEvent
		(
	    	{
	        	EventName : "pTwoCheckers"
	    	}
		);
    
    //glicko both players
     glickoResult = calculateGlicko(playerOneReadOnlyData, playerTwoReadOnlyData, args.isWon);
     playerOne["glicko"] = glickoResult[0];
     playerTwo["glicko"] = glickoResult[1];
     
     server.WriteTitleEvent
		(
	    	{
	        	EventName : "senderPlayerObj",
	        	Body: {playerOne}
	    	}
		);
		server.WriteTitleEvent
		(
	    	{
	        	EventName : "PlayerTwoObj",
	        	Body: {playerTwo}
	    	}
		);
	 var setSenderInShareGroupData = server.UpdateSharedGroupData
    (
          {
              SharedGroupId: photonGameID,
              Data: {playerOneId: playerOne}
          }
    );
	var result = [playerOne, playerTwo];
	return result;
}