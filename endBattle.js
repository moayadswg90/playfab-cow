handlers.endBattle = function (args, context) 
{
	goldEarnedFromPlay = gameReward;
	pointsEarned = 0;
  	goldEarnedFromWin = 0;
  	isWon = args.isWon; 	
  	today = new Date();
  	firstGame = false;
  	firstWin = false;
  	
	var playerReadOnlyData = server.GetUserReadOnlyData
    (
          {
              PlayFabId: currentPlayerId,
          }
    );
    
    var newCounters = updatePlayerCounter(args.isWon, args.fields, args.troops, args.cards, args.isDuel, currentPlayerId, playerReadOnlyData);	  	
  	firstGame = checkFirstGame(playerReadOnlyData, currentPlayerId);
  	firstWin = checkFirstWin(playerReadOnlyData, currentPlayerId);
  	
  	glickoResult = calculateGlicko(currentPlayerId, isWon);
  	glickoItems = [{Rating: glickoResult.ratingResult}, {RD: glickoResult.rdResult}, {Vol: glickoResult.volResult}];
  	var glickoItems = JSON.stringify(glickoItems);
  	newRating = parseInt(glickoResult.ratingResult);
  
  	if (isWon == 1)
  	{ 	
	  	pointsEarned = pointsReward;
		goldEarnedFromWin = winReward;
		//if first Game update first game & first win & counters
	  	if (firstGame)
	  	{
		  	goldEarnedFromPlay += firstGameReward;
		  	goldEarnedFromWin += firstWinReward;
		  	var updatePlayerData = server.UpdateUserReadOnlyData
		  	(
		  		{
		  			PlayFabId: currentPlayerId,
		  			Data: 
		  			{
	                  PlayerCounters : newCounters,
                      glicko : glickoItems,
	                  firstWin : today,
	                  firstGame : today 
	        		}
	      		}
		  	);
	  	}
	  	//if first WIN update first win & counters
	  	else if (firstWin)
	  	{
		  	goldEarnedFromWin += firstWinReward;
		  	var updatePlayerData = server.UpdateUserReadOnlyData
		  	(
		  		{
		  			PlayFabId: currentPlayerId,
		  			Data: 
		  			{
	                  PlayerCounters : newCounters,
                      glicko : glickoItems,
	                  firstWin : today
	        		}
	      		}
		  	);
	  	}
	  	//if WIN only update counters
	  	else
	  	{
		  var updatePlayerData = server.UpdateUserReadOnlyData
		  	(
		  		{
		  			PlayFabId: currentPlayerId,
		  			Data: 
		  			{
	                  PlayerCounters : newCounters,
                      glicko : glickoItems
	        		}
	      		}
		  	);	
	  	} 	
  	}
  	else if (isWon == 0)
  	{
	  	if (firstGame)
	  	{
		  	goldEarnedFromPlay += firstGameReward;
		  	var updatePlayerData = server.UpdateUserReadOnlyData
		  	(
		  		{
		  			PlayFabId: currentPlayerId,
		  			Data: 
		  			{
	                  PlayerCounters : newCounters,
                      glicko : glickoItems,
	                  firstGame : today 
	        		}
	      		}
		  	);
	  	}
	  	else
	  	{  	
		  	var updatePlayerData = server.UpdateUserReadOnlyData
		  	(
		  		{
		  			PlayFabId: currentPlayerId,
		  			Data: 
		  			{
	                  PlayerCounters : newCounters,
                      glicko : glickoItems
	        		}
	      		}
		  	);
	  	}	
  	}
  	else
  	{
	  		var updatePlayerData = server.UpdateUserReadOnlyData
		  	(
		  		{
		  			PlayFabId: currentPlayerId,
		  			Data: 
		  			{
	                  PlayerCounters : newCounters,
                      glicko : glickoItems
	        		}
	      		}
		  	);
  	}
    var updateStatistics = server.UpdatePlayerStatistics
    ({
        PlayFabId: currentPlayerId,
        Statistics: 
        [	
        	{
	            "StatisticName": "DailyPoints",
	            "Value": pointsEarned
        	},
        	{
	            "StatisticName": "WeeklyPoints",
	            "Value": pointsEarned
        	},
        	{
	            "StatisticName": "MonthlyPoints",
	            "Value": pointsEarned
        	},
          	{
	            "StatisticName": "ranks",
	            "Value": newRating
        	}
        ]
    });
    
  	totalGoldEarned = goldEarnedFromWin + goldEarnedFromPlay;
    var addGoldResult = server.AddUserVirtualCurrency
    ({
        PlayFabId: currentPlayerId,
        VirtualCurrency: "GL",
        Amount: totalGoldEarned
    }); 	
  return {pointsEarned: pointsEarned, goldEarnedFromWin: goldEarnedFromWin, goldEarnedFromPlay: goldEarnedFromPlay, stats: newCounters, rating: glickoResult.ratingResult};
}