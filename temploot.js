
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
//==============================================================================================================================
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