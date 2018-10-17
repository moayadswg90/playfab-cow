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
	inventoryItems = [];
	inventoryItems = inventory.Inventory;
	
	log.debug(inventoryItems.length);
	for(i = 0; i < inventoryItems.length; i++)
	{
		log.debug(inventoryItems[i]);
		log.debug(inventoryItems[i].ItemId);
		if (inventoryItems[i].ItemId == "DoubleGold2" || inventoryItems[i].ItemId == "DoubleGold6")
		{
			doubleGold = true;
		}		
	}

	return {test: doubleGold};
}