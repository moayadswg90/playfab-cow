handlers.unlockTest = function (args, context) 
{
  var containerID = args.containerID;

  //unlock box
  var unlockContainerBox = server.UnlockContainerItem
  (
   		{
  			PlayFabId: currentPlayerId,
  			ContainerItemId: containerID
		}
  );
      log.debug(unlockContainerBox);
  //update temp loot for future rerolls
  return updateTempLoot(unlockContainerBox,currentPlayerId); 
}
handlers.unlockContainer = function (args, context) 
{
  var containerID = args.containerID;

  //unlock box
  var unlockContainerBox = server.UnlockContainerInstance
  (
   		{
  			PlayFabId: currentPlayerId,
  			ContainerItemInstanceId: containerID
		}
  );
  //update temp loot for future rerolls
  return updateTempLoot(unlockContainerBox,currentPlayerId); 
}
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
    var itemID = Object.values(unlockedContainer.GrantedItems[i])[1];
    itemsArray.push(itemID); 
    resultArray.push(Object.values(unlockedContainer.GrantedItems[i])[0]);
  }

  var itemsArray = JSON.stringify(itemsArray);
  // set cards inside UserData
  var setInTempLoot = server.UpdateUserReadOnlyData
  (
      {
        PlayFabId: currentPlayerId,
        Data: 
        {
                  TempLootItem : itemsArray
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