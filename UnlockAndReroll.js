handlers.unlockContainer = function (args, context) 
{
	 var unlockContainerBox = server.UnlockContainerItem
	  (
	   		{
	  			PlayFabId: currentPlayerId,
	  			ContainerItemId: args.containerID
			}
	  );
	  log.debug(unlockContainerBox.GrantedItems[0]["ItemId"])
	  log.debug(unlockContainerBox.GrantedItems[0]["ItemInstanceId"])
	  return updateTempLoot(unlockContainerBox,currentPlayerId);
	  
	  //return JSON.parse(unlockContainerBox.GrantedItems[0]);
/*
  try
  {
	 
	  //return updateTempLoot(unlockContainerBox,currentPlayerId);
  }
  catch(e)
  {
		return {code: e.apiErrorInfo.apiError.errorCode, error: e.apiErrorInfo.apiError.error};
  }
*/
}
handlers.reroll = function(args,context)
{
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
    			args.containerID
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
  		Amount: rerollCost
      }
   );
  return true;
}
function updateTempLoot(unlockedContainer,currentPlayerId)
{
  itemsArray = [];
  resultArray = [];

  for (i = 0; i < unlockedContainer.GrantedItems.length; i++)
  {
    itemsArray.push(unlockedContainer.GrantedItems[i]["ItemInstanceId"]); 
    resultArray.push(unlockedContainer.GrantedItems[i]["ItemId"]);
  }

  var setInTempLoot = server.UpdateUserReadOnlyData
  (
      {
        PlayFabId: currentPlayerId,
        Data: 
        {
                  TempLootItem : JSON.stringify(itemsArray)
        }
      }
   );

  return resultArray;
}
function consumeTempLoot(currentPlayerId)
{
  //get temploot
   var tempLoot = server.GetUserReadOnlyData
  (
   		{
  			PlayFabId: currentPlayerId,
		}
  );
  var tempLoot = JSON.parse(tempLoot.Data.TempLootItem.Value);
  //consume temploot
  for (i = 0; i < tempLoot.length; i++)
  {
    var consumeItem = server.ConsumeItem
  	(
   		{
  			PlayFabId: currentPlayerId,
          	ItemInstanceId: tempLoot[i],
  			ConsumeCount: 1
		}
  	);
  }
  return true;
}