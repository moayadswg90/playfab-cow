function calculateEarnedGold(isWon, firstWin, firstGame, doubleGold)
{
	var result = {}
	var currency = {};
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
	gold["increment"] = gold["playGold"] + gold["winGold"] + gold["doubleGold"]
	currency["GL"] = gold;
	result["currency"] = currency;
	return result;
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
	return true;
}
function updateStats(id, isWon, rank, troops, fields, cards, duels)
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
	            "StatisticName": "troops",
	            "Value": troops
        	},
        	{
	            "StatisticName": "fields",
	            "Value": fields
        	},
        	{
	            "StatisticName": "cardsPlayed",
	            "Value": cards
        	},
        	{
	            "StatisticName": "duels",
	            "Value": duels
        	},
        	{
	            "StatisticName": "wins",
	            "Value": isWon
        	},
        	{
	            "StatisticName": "ranks",
	            "Value": rank
        	},
        ]
    });
    return true;
}
//==================== checks
function checkFirstGame(playerReadOnlyData)
{
  var firstGameFlag = false;
  var today = new Date();
  if (playerReadOnlyData.Data.firstGame)
    {
  		var firstGame = playerReadOnlyData.Data.firstGame.Value;
  		var firstGameDate = new Date(firstGame);
  		var differenceInDaysFirstGame = Math.floor((Date.UTC(firstGameDate.getFullYear(), firstGameDate.getMonth(), firstGameDate.getDate()) - Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) ) /(1000 * 60 * 60 * 24));
  		if (differenceInDaysFirstGame != 0)
        {
      		firstGameFlag =  true;
        }
    }
  	else
    {
      
        firstGameFlag = true;
    }
  return firstGameFlag;
}
function checkFirstWin(playerReadOnlyData)
{
  var firstWinFlag = false;
  var today = new Date();
  if (playerReadOnlyData.Data.firstWin)
    {
      	
  		var firstWin = playerReadOnlyData.Data.firstWin.Value;
  		var firstWinDate = new Date(firstWin);
  		var differenceInDaysFirstWin = Math.floor((Date.UTC(firstWinDate.getFullYear(), firstWinDate.getMonth(), firstWinDate.getDate()) - Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) ) /(1000 * 60 * 60 * 24));
  		if (differenceInDaysFirstWin != 0)
        {
      		firstWinFlag =  true;
        }
    }
  	else
    {
      
        firstWinFlag = true;
    }
  return firstWinFlag;
}
function doubleGoldCheck(currentPlayerId) 
{
  	var doubleGold = false;
  	var inventory = server.GetUserInventory
	(
		{
			PlayFabId: currentPlayerId
		}
	);
	inventoryItems = [];
	inventoryItems = inventory.Inventory;
	
	for(i = 0; i < inventoryItems.length; i++)
	{
		
		if (inventoryItems[i].ItemId == "DoubleGold2" || inventoryItems[i].ItemId == "DoubleGold6")
		{
			doubleGold = true;
		}		
	}
	
	return doubleGold;
}
function cheater(id)
{	
	var updateStatistics = server.UpdatePlayerStatistics
    ({
        PlayFabId: id,
        Statistics: 
        [	
        	{
	            "StatisticName": "cheating",
	            "Value": 1
        	}
        ]
    });
}
