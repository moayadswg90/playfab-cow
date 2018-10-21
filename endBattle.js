handlers.endBattle = function (args, context) 
{
/*
	var doubleGold = checkDoubleGold(currentPlayerId);
	return doubleGold;
*/
	goldEarnedFromPlay = gameReward;
	pointsEarned = 0;
  	goldEarnedFromWin = 0;	
  	today = new Date();
  	firstGame = false;
  	firstWin = false;
  	doubleGold = 0;
  	
	var playerReadOnlyData = server.GetUserReadOnlyData
    (
          {
              PlayFabId: currentPlayerId
          }
    );
    
    	  	
  	firstGame = checkFirstGame(playerReadOnlyData);
  	firstWin = checkFirstWin(playerReadOnlyData);
  	
  	glickoResult = calculateGlicko(playerReadOnlyData, args.isWon);
  	glickoItems = [{Rating: glickoResult.ratingResult}, {RD: glickoResult.rdResult}, {Vol: glickoResult.volResult}];
  	glickoItems = JSON.stringify(glickoItems);
  	
  
  	if (args.isWon == 1)
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
                      glicko : glickoItems
	        		}
	      		}
		  	);	
	  	} 	
  	}
  	else if (args.isWon == 0)
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
	            "Value": parseInt(glickoResult.ratingResult)
        	},
          	{
	            "StatisticName": "wins",
	            "Value": args.isWon
        	},
          	{
	            "StatisticName": "cardsPlayed",
	            "Value": args.cards
        	},
          	{
	            "StatisticName": "TroopsRecruited",
	            "Value": args.troops
        	},
          	{
	            "StatisticName": "duels",
	            "Value": args.isDuel
        	}
        ]
    });
    var PlayerStats = server.GetPlayerStatistics
    ({
        PlayFabId: currentPlayerId,
        Statistics: 
        [	
        	{
	            "StatisticName": "DailyPoints",
	            "StatisticNames": ["wins", "cardsPlayed", "TroopsRecruited", "duels", "ranks"]
        	}
        ]
    });
  	totalGoldEarned = goldEarnedFromWin + goldEarnedFromPlay;
  	if(doubleGoldCheck(currentPlayerId))
    	doubleGold = totalGoldEarned;
    var addGoldResult = server.AddUserVirtualCurrency
    ({
        PlayFabId: currentPlayerId,
        VirtualCurrency: "GL",
        Amount: totalGoldEarned + doubleGold
    }); 	
  return {pointsEarned: pointsEarned, goldEarnedFromWin: goldEarnedFromWin, goldEarnedFromPlay: goldEarnedFromPlay, goldFromDouble: doubleGold,  Statistics: PlayerStats.Statistics};
}