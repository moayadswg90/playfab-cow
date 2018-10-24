function calculateEarnedGold(isWon, firstWin, firstGame, doubleGold)
{
	var gold = {};
	gold["playGold"] = gameReward;
	gold["winGold"] = 0;
	gold["doubleGold"] = 0;
	gold["totalGold"] = 0;
	
	if (firstGame)
	{
		gold["playGold"] += firstGameReward;
	}
	if (isWon == 1)
	{
		gold["winGold"] = winReward;
		
		if (firstWin)
		{
			
			gold["winGold"] += firstWinReward;
		}	
	}
	if (doubleGold)
	{
		gold["double"] = gold["playGold"] + gold["winGold"];
	}
	gold["totalGold"] = gold["playGold"] + gold["winGold"] + gold["doubleGold"]
	return gold;
}
function updatePlayer(id, firstWin, firstGame, glicko)
{
	var data = {};
	data["glicko"] = glicko;
	if (firstWin)
	{
		data["firstWin"] = new Date();
	}
	if (firstGame)
	{
		data["firstGame"] = new Date();
	}
	var updatePlayerData = server.UpdateUserReadOnlyData
	(
		{
		  PlayFabId: id,
		  Data: data
	    }
	);
}
function updateStats(id, isWon, rank)
{
	pointsEarned = 0;
	if(isWon == 1)
	{
		pointsEarned = pointsReward
	}
	var updateStatistics = server.UpdatePlayerStatistics
    ({
        PlayFabId: id,
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
	            "Value": rank
        	},
        	{
	            "StatisticName": "wins",
	            "Value": isWon
        	},
        ]
    });
    
    var PlayerStats = server.GetPlayerStatistics
    ({
        PlayFabId: currentPlayerId,
        Statistics: 
        [	
        	{
	            "StatisticName": "DailyPoints",
	            "StatisticNames": ["wins","ranks"]
        	}
        ]
    });
    return PlayerStats.Statistics;
}