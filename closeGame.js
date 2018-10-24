handlers.closeGame = function (args)
{
	goldEarnedFromPlay = gameReward;
	pointsEarned = 0;
  	goldEarnedFromWin = 0;	
  	today = new Date();
  	firstGame = false;
  	firstWin = false;
  	doubleGold = 0;
  	
  	var playerOne = args.playerOne;
	var playerOneReadOnlyData = server.GetUserReadOnlyData
    (
          {
              PlayFabId: playerOne.id
          }
    );
/*
    var playerTwoReadOnlyData = server.GetUserReadOnlyData
    (
          {
              PlayFabId: playerTwo.id
          }
    );
*/
    var playerOneData;
    //var playerTwoData;
    
    glickoResult = calculateGlicko(playerOneReadOnlyData, args.isWon);
  	glickoItems = [{Rating: glickoResult.ratingResult}, {RD: glickoResult.rdResult}, {Vol: glickoResult.volResult}];
  	glickoItems = JSON.stringify(glickoItems);
  	
  	log.debug(glickoItems);
  	
  	playerOneData.glickoItems =  glickoItems;
  	//playerTwoData.glickoItems =  glickoItems;
  	
  	if(checkFirstGame(playerOneReadOnlyData))
  	{
	  	playerOneData.firstGame = today;
  	}
  	if(checkFirstWin(playerOneReadOnlyData))
  	{
	  	playerOneData.firstWin = today;
  	}
  	log.debug(playerOneData);
  	var updatePlayerOneData = server.UpdateUserReadOnlyData
	(
		{
			PlayFabId: playerOne.id,
			Data: 
			{
            	playerOneData
	    	}
	    }
	);
	
  	
/*
  	if(checkFirstGame(playerTwoReadOnlyData))
  	{
	  	playerTwoData.firstGame = today;
  	}
  	if(checkFirstWin(playerTwoReadOnlyData))
  	{
	  	playerTwoData.firstWin = today;
  	}
	var updatePlayerTwoData = server.UpdateUserReadOnlyData
	(
		{
			PlayFabId: playerOne.id,
			Data: 
			{
            	playerTwoData
	    	}
	    }
	);
*/
  	
  	
  
 }