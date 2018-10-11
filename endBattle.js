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
  	glickoItems = [{Rating: glickoResult.ratingResult}, {RD: glickoResult.rdResult}, Vol: glickoResult.volResult}];
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
//==============================================================================================================================
//==============================================================================================================================
//==============================================================================================================================
function checkFirstGame(firstGameAndWin, currentPlayerId)
{
  var firstGameFlag = false;
  if (firstGameAndWin.Data.firstGame)
    {
  		var firstGame = firstGameAndWin.Data.firstGame.Value;
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
//==============================================================================================================================
function checkFirstWin(firstGameAndWin, currentPlayerId)
{
  var firstWinFlag = false;
  if (firstGameAndWin.Data.firstWin)
    {
      	
  		var firstWin = firstGameAndWin.Data.firstWin.Value;
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


//==============================================================================================================================
function updatePlayerCounter(winsIncrement, fieldsIncrement, troopsIncrement, cardsIncrement, duelsIncrement, currentPlayerId, playerReadOnlyData)
{

  var previousWins = 0;
  var previousFields = 0;
  var previousTroops = 0;
  var previousCards = 0;
  var previousDuels = 0;
  if (playerReadOnlyData.Data.PlayerCounters)
  {
    var previousCounters = JSON.parse(playerReadOnlyData.Data.PlayerCounters.Value);
  	previousWins = parseInt(previousCounters[0].wins);
  	previousFields = parseInt(previousCounters[1].fields);
  	previousTroops = parseInt(previousCounters[2].troops);
  	previousCards = parseInt(previousCounters[3].cards);
 	previousDuels = parseInt(previousCounters[4].duels);
  }
  
 
  // increment counters
  itemsArray = [];
  itemsArray.push({wins:winsIncrement+previousWins});
  itemsArray.push({fields:fieldsIncrement+previousFields});
  itemsArray.push({troops:troopsIncrement+previousTroops});
  itemsArray.push({cards:cardsIncrement+previousCards});
  itemsArray.push({duels:duelsIncrement+previousDuels});
  
  var itemsArray = JSON.stringify(itemsArray); 
  return itemsArray;
}

function calculateGlicko(currentPlayerId, isWon)
{
  	var settings = 
	{
        tau : 0.5,
        rpd : 604800,
        rating : 1500,
        rd : 200,
        vol : 0.06
	};
	var glicko = new glicko2.Glicko2(settings);
	
	var firstPlayerGlickoData = getGlickoData(currentPlayerId)
  	var p1RD = firstPlayerGlickoData.RD;
	var p1Rating = firstPlayerGlickoData.Rating;
	var p1Rating = firstPlayerGlickoData.Vol;
	
    var p1 = glicko.makePlayer(p1Rating, p1RD, 0.06);
    var p2 = glicko.makePlayer(1550, 100, 0.06);
	var matches = [];
	matches.push([p1, p2, isWon]);
	glicko.updateRatings(matches);
	
	var rating = (Math.abs(p1.getRating()));
	var rd = Math.abs(p1.getRd());
	var vol = Math.abs(p1.getVol());
	
  
  	return {ratingResult: rating, rdResult: rd, volResult: vol};
}
function getGlickoData(currentPlayerId)
{
  // read previous counters to increment
   var glickoData = server.GetUserReadOnlyData
  (
   		{
  			PlayFabId: currentPlayerId,
		}
  );
  var glickoData = JSON.parse(glickoData.Data.glicko.Value);

  var glickoRating = glickoData[0].Rating;
  var glickoRD = glickoData[1].RD;
  var glickoVol = glickoData[2].Vol;
  return {Rating: glickoRating,RD: glickoRD, Vol: glickoVol}; 
}
function updateGlickoData(currentPlayerId, rd, rating, vol)
{
  	glickoItems = [{Rating: rating}, {RD: rd}, {Vol: vol} ];
  	var glickoItems = JSON.stringify(glickoItems);
	var updateGlickoData = server.UpdateUserReadOnlyData
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