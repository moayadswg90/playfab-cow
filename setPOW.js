handlers.setPOTW = function (args, context) 
{
  var playerID = context.playerProfile.PlayerId;
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
        PlayFabId: playerID,
        Message: "Congratulations! you are Player Of the Week "
    });
    log.debug(context);
}