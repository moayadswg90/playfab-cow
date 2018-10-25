handlers.setPOTW = function (args, context) 
{
	try
	{
		var playerID = context.playerProfile.PlayerId;
		  var rank = context.playStreamEvent.Rank;
		  if (rank == 1)
		  {
				var setPOTWData = server.SetTitleData
			  (
			   		{
			  			Key: "potw",
			          	Value: playerID
					}
			  );
			  
			  var grantReward = server.AddUserVirtualCurrency
			    ({
			        PlayFabId: playerID,
			        VirtualCurrency: "DM",
			        Amount: potwReward
			    });
			    var sendNotification = server.SendPushNotification
			    ({
			        Recipient: playerID,
			        Message: "Congratulations! you are Player Of the Week "
			    });  
			}
			else
			{
				 var grantReward = server.AddUserVirtualCurrency
			    ({
			        PlayFabId: playerID,
			        VirtualCurrency: "DM",
			        Amount: weeklyReward
			    });
			    var sendNotification = server.SendPushNotification
			    ({
			        Recipient: playerID,
			        Message: "Congratulations! you Ranked in Top 10 this week"
			    });
			}  
	}
	catch(e)
	{
		return {code: e.apiErrorInfo.apiError.errorCode, error: e.apiErrorInfo.apiError.error};
	}
    
}
handlers.dailyLeaderboardReward = function (args, context) 
{
	try
	{
		var playerID = context.playerProfile.PlayerId;
		 var grantReward = server.AddUserVirtualCurrency
	    ({
	        PlayFabId: playerID,
	        VirtualCurrency: "DM",
	        Amount: dailyReward
	    });
	    var sendNotification = server.SendPushNotification
	    ({
	        Recipient: playerID,
	        Message: "Congratulations! you Ranked in Top 10 in daily leaderboard"
	    });
	}
  		
	catch(e)
	{
		return {code: e.apiErrorInfo.apiError.errorCode, error: e.apiErrorInfo.apiError.error};
	}   
}
handlers.setDailyOffer = function (args, context) 
{
	var offers = ["500FreeGold","BoxOne25Off","BoxOne50Off","BoxTwo25Off","BoxTwo50Off","DoubleGold2Container50Off","DoubleGold6Container50Off"];
	var offerOne = offers[Math.floor(Math.random() * offers.length)];
	
	var offerTwo;
	for(i = 0; i < 5; i++)
	{
		offerTwo = offers[Math.floor(Math.random() * offers.length)];
		if (offerTwo != offerOne)
			break;
	}
	log.debug(offerOne);
	log.debug(offerTwo);
	var dailyOffers = [offerOne, offerTwo];
	log.debug(dailyOffers);

	var setPOTWData = server.SetTitleData
	(
		{
			Key: "dailyOffer",
			Value: JSON.stringify(dailyOffers)
		}
	);
}