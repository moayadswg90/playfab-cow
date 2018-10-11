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
