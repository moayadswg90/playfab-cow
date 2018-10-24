handlers.closeGame = function (args)
{
/*
	goldEarnedFromPlay = gameReward;
	pointsEarned = 0;
  	goldEarnedFromWin = 0;	
  	today = new Date();
  	firstGame = false;
  	firstWin = false;
  	doubleGold = 0;
*/
  	

  	var playerOne = args.playerOne;
	var playerOneReadOnlyData = server.GetUserReadOnlyData
    (
          {
              PlayFabId: playerOne.id
          }
    );


    var playerOneData = {};
    
    

    glickoResult = calculateGlicko(playerOneReadOnlyData, args.isWon);
  	glickoItems = [{Rating: glickoResult.ratingResult}, {RD: glickoResult.rdResult}, {Vol: glickoResult.volResult}];
  	glickoItems = JSON.stringify(glickoItems);
  	
  	
  	playerOneData["glickoItems"] =  glickoItems;
  	//playerTwoData.glickoItems =  glickoItems;
  	
  	if(checkFirstGame(playerOneReadOnlyData))
  	{
	  	playerOneData["firstGame"] = new Date();
  	}
  	if(checkFirstWin(playerOneReadOnlyData))
  	{
	  	playerOneData["firstWin"] = new Date();
  	}
  	
  	var updatePlayerOneData = server.UpdateUserReadOnlyData
		  	(
		  		{
		  			PlayFabId: playerOne.id,
		  			Data: playerOneData
	      		}
		  	);

  	
  	
  
 }