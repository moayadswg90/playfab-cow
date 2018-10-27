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
	var keys = roomData.Data;
	//return keys;
	var playerOneData = JSON.parse(keys[playerOneId].Value);
	var playerTwoData = JSON.parse(keys[playerTwoId].Value);
	
	updatePlayer(playerOneId, playerOneData["firstGame"], playerOneData["firstWin"], JSON.stringify(playerOneData["glicko"]), playerOneData["stats"]["troops"]), playerOneData["stats"]["fields"]), playerOneData["stats"]["cards"]), playerOneData["stats"]["isDuel"]));
	
	updatePlayer(playerTwoId, playerTwoData["firstGame"], playerTwoData["firstWin"], JSON.stringify(playerTwoData["glicko"]), playerOneData["stats"]["troops"]), playerTwoData["stats"]["fields"]), playerTwoData["stats"]["cards"]), playerTwoData["stats"]["isDuel"]));
	
	updateStats(playerOneId, playerOneData["isWon"], parseInt(playerOneData["glicko"]["Rating"]));
	updateStats(playerTwoId, playerTwoData["isWon"], parseInt(playerTwoData["glicko"]["Rating"]));
	
	//grant gold
	var addGoldResult = server.AddUserVirtualCurrency
    (
    	{
	        PlayFabId: playerOneId,
	        VirtualCurrency: "GL",
	        Amount: playerOneData["gold"]["totalGold"]
    	}
    ); 
    var addGoldResult = server.AddUserVirtualCurrency
    (
    	{
	        PlayFabId: playerTwoId,
	        VirtualCurrency: "GL",
	        Amount: playerTwoData["gold"]["totalGold"]
    	}
    ); 	
	return playerOneData;
};