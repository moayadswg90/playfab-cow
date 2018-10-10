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
  	glickoItems = [{Rating: glickoResult.ratingResult}, {RD: glickoResult.rdResult}];
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
  	//read first player glicko data
  	var firstPlayerGlickoData = getGlickoData(currentPlayerId)
  	var p1RD = firstPlayerGlickoData.RD;
	var p1Rating = firstPlayerGlickoData.Rating;
    
  	//read second player glicko data
	var p2RD = 81;
	var p2Rating = 1215;

	var newRatingResult = newRating(p1RD, p1Rating, p2RD, p2Rating, isWon);
	var newRDResult = newRD(p1RD, p1Rating, p2RD, p2Rating, isWon);
  	//update new glicko
  	return {ratingResult: newRatingResult, rdResult: newRDResult};
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
  return {Rating: glickoRating,RD: glickoRD}; 
}
function updateGlickoData(currentPlayerId, rd, rating)
{
  	glickoItems = [{Rating: rating}, {RD: rd}];
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

//============================================
//Glicko 2 Rating Calculation
function newRD(rd, rating, oppRD, oppRating, outcome)
{		
	return rdFactor(rd, rating, oppRD, oppRating, outcome) * factor;
}
function newRating(rd, rating, oppRD, oppRating, outcome)
{
	return (ratingFactor(rd, rating, oppRD, oppRating, outcome) * factor) + offset;
}
function rdFactor(rd, rating, oppRD, oppRating, outcome)
{
	return 1/Math.sqrt((1/(Math.pow(phi(rd),2)+ Math.pow(vol,2))) + 1/ nu(oppRD, oppRating, rating))
}
function ratingFactor(rd, rating, oppRD, oppRating, outcome)
{
	return mu(rating) + (Math.pow(rdFactor(rd, rating, oppRD, oppRating, outcome),2) * gse(oppRD, oppRating, outcome, rating));
}
function gse(oppRD, oppRating, outcome, rating)
{
	return g(oppRD) * (outcome - e(oppRD, oppRating, rating));
}

function gsqe(oppRD, oppRating, rating)
{
	return Math.pow(g(oppRD), 2) * e(oppRD, oppRating, rating) * (1-e(oppRD, oppRating, rating));
}

function g(rd)
{
	return Math.pow((1 + 3 * phi(rd)* phi(rd)* Math.pow(Math.PI,-2)), -0.5);
}

function e(oppRD, oppRating, rating)
{
	return Math.pow(1 + Math.exp(g(oppRD) * (mu(oppRating)- mu(rating))), -1)	
}
function phi(rd)
{
	return rd/factor;
}

function mu(rating)
{
	return ((rating - offset)/factor);
}
function nu(oppRD, oppRating, rating)
{
	return 1/gsqe(oppRD, oppRating, rating)
}
