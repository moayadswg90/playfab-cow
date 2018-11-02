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
	 var headers = {
        "X-SecretKey": "H3EKWDE95441QE1WI33OUZHJSR48398TBMMU49EWQN57H7FFOR"
    };

    var body =
		{
		  StoreId: "mainStore",
		  Store: 
		  [
		    {
		      ItemId: "BoxOne",
		      VirtualCurrencyPrices: {
		        "GL": 250
		      }
	    	}
		   ]
		}

    var url = "https://722F.playfabapi.com/Admin/UpdateStoreItems";
    var content = JSON.stringify(body);
    var httpMethod = "post";
    var contentType = "application/json";
    var logRequestAndResponse = true;

    // The pre-defined http object makes synchronous HTTP requests
    var response = http.request(url, httpMethod, content, contentType,
        headers, logRequestAndResponse);
    return { responseContent: response };
/*
	var offers = ["BoxOne","BoxTwo", "DoubleGold2Container","DoubleGold6Container"];
	var offerOne = offers[Math.floor(Math.random() * offers.length)];
	
	var offerTwo;
	for(i = 0; i < 5; i++)
	{
		offerTwo = offers[Math.floor(Math.random() * offers.length)];
		if (offerTwo != offerOne)
			break;
	}
	var dailyOffers = [offerOne, offerTwo];
*/
}