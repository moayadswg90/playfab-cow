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