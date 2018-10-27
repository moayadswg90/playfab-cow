/*
function endGameByRoomClosed(photonGameID, playerOneId, playerTwoId, keys)
{
	var playerOneData = keys[playerOneId];
	var playeTwoData = keys[playerTwoId];
	
	result = [playerOneData, playeTwoData];
	return result;
	

     var dataPayload = {};
     var gameStats = {turns: turns, reason: reason};
	 var keyString = playerOneId;
	 dataPayload[keyString] = JSON.stringify(playerOne);
	 dataPayload["gameStats"] = JSON.stringify(gameStats);
	 var setSenderInShareGroupData = server.UpdateSharedGroupData
	 (
          {
              SharedGroupId: photonGameID,
              Data: dataPayload
          }
	);
	var result = [playerOne];
	return result;
}
*/

handlers.endGameByRoomClosed = function (args) 
{
	var photonGameID = args.gameId;
	var roomData = server.GetSharedGroupData
	(
	    {
	        SharedGroupId: photonGameID,
			GetMembers: true
	    }

	);
	var playerOneId = roomData.Members[0];
	var playerTwoId = roomData.Members[1];
	var keys = roomData.Keys
	
	var playerOneData = keys[playerOneId];
	var playeTwoData = keys[playerTwoId];
	
	result = [playerOneData, playeTwoData];
	return result;
};