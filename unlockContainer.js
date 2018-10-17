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
//==============================================================================================================================
handlers.unlockTest = function (args, context) 
{
  var doubleGold = false;
  	var inventory = server.GetUserInventory
	(
		{
			PlayFabId: currentPlayerId
		}
	);
/*
	var inventoryItems = inventory.Inventory;
	for(i = 0; i < inventoryItems.length; i++)
	{
		if (inventoryItems[i].ItemID == "DoubleGold2" || inventoryItems[i].ItemID == "DoubleGold6")
		{
			doubleGold = true;
		}		
	}
*/
	return doubleGold;
}