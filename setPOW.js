handlers.setPOTW = function (args, context) 
{
  var playerID = context.playerProfile.PlayerId;
  //var rank = context.playStreamEvent.TriggeringEventData.Rank;
  var rank = 1;
  log.debug(context.playStreamEvent.EventData);
  return true;
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