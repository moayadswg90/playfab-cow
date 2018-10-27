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
	
	updatePlayer(playerOneId, playerTwoData["firstGame"], playerTwoData["firstWin"], JSON.stringify(playerTwoData["glicko"]));
	updatePlayer(playerTwoId, playerTwoData["firstGame"], playerTwoData["firstWin"], JSON.stringify(playerTwoData["glicko"]));
	
	updateStats(playerOneId, playerOneData["isWon"], parseInt(playerOneData["glicko"]["Rating"]));
	updateStats(playerTwoId, playerTwoData["isWon"], parseInt(playerTwoData["glicko"]["Rating"]));
/*
	//update stats
	playerOne["stats"] = updateStats(playerOneId, playerOneData["isWon"], parseInt(playerOneData["glicko"]["Rating"]));
	playerTwo["stats"] = updateStats(playerTwoId, playerTwoData["isWon"], parseInt(playerTwoData["glicko"]["Rating"]));
*/
	
/*
	//grant gold
	var addGoldResult = server.AddUserVirtualCurrency
    (
    	{
	        PlayFabId: playerOneId,
	        VirtualCurrency: "GL",
	        Amount: playerOne["gold"]["totalGold"]
    	}
    ); 
    var addGoldResult = server.AddUserVirtualCurrency
    (
    	{
	        PlayFabId: playerTwo["id"],
	        VirtualCurrency: "GL",
	        Amount: playerTwo["gold"]["totalGold"]
    	}
    ); 
*/
	
	return playerOneData;
};