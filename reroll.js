
//==============================================================================================================================
handlers.reroll = function(args,context)
{
  var containerID = args.containerID;
  //check balance
  if (!checkBalance(currentPlayerId))
  {
    log.debug("insufficient balance");
    return 1052;
  }
  //consume previous loot
  consumeTempLoot(currentPlayerId);
  
  //grant box directly to inventory
  var grantItems = server.GrantItemsToUser
  	(
   		{
  			PlayFabId: currentPlayerId,
  			Annotation: "Rerolled box",
  			ItemIds: 
          	[
    			containerID
  			]
		}
  	);
  var box = Object.values(grantItems)[0][0];
  var boxInstanceID = Object.values(box)[3];
  
  //unlock box new granted box
  var unlockContainerBox = server.UnlockContainerInstance
  (
   		{
  			PlayFabId: currentPlayerId,
  			ContainerItemInstanceId: boxInstanceID
		}
  );
  //update temp loot for future rerolls
  return updateTempLoot(unlockContainerBox,currentPlayerId); 
}
//==============================================================================================================================
function checkBalance(currentPlayerId)
{
  var balanceFlag = true;
   var checkPlayerBalance = server.GetUserInventory
	  (
		  {
			  PlayFabId: currentPlayerId
		  }
	  );
  if (checkPlayerBalance.VirtualCurrency["DM"] < rerollCost )
  {
    return false;
  }
  
  var deductPrice = server.SubtractUserVirtualCurrency
  (
     {
        PlayFabId: currentPlayerId,
        VirtualCurrency: "DM",
  		Amount: 1
      }
   );
  return true;
}