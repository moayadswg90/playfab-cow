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
	var rating;
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
	if (keys[playerOneId] != null && keys[playerTwoId] != null )
	{
		var playerOneData = JSON.parse(keys[playerOneId].Value);
		var playerTwoData = JSON.parse(keys[playerTwoId].Value);
		updatePlayer(playerOneId, playerOneData["firstGame"], playerOneData["firstWin"], JSON.stringify(playerOneData["glicko"]));
		updatePlayer(playerTwoId, playerTwoData["firstGame"], playerTwoData["firstWin"], JSON.stringify(playerTwoData["glicko"]));
		updateStats(playerOneId, playerOneData["isWon"], parseInt(playerOneData["glicko"]["Rating"]), playerOneData["stats"]["troops"], playerOneData["stats"]["fields"], playerOneData["stats"]["cards"], playerOneData["stats"]["isDuel"]);
		updateStats(playerTwoId, playerTwoData["isWon"], parseInt(playerTwoData["glicko"]["Rating"]), playerOneData["stats"]["troops"], playerTwoData["stats"]["fields"], playerTwoData["stats"]["cards"], playerTwoData["stats"]["isDuel"]);
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
	    if (playerOneData["isWon"] == 1 && playerTwoData["isWon"] == 1)
	    {
		    cheater(playerOneId);
		    cheater(playerTwoId);
	    }
	    	
	}
	else if(keys[playerOneId] != null && keys[playerTwoId] == null )
	{
		var playerOneData = JSON.parse(keys[playerOneId].Value);
		updatePlayer(playerOneId, playerOneData["firstGame"], playerOneData["firstWin"], JSON.stringify(playerOneData["glicko"]));
		updateStats(playerOneId, playerOneData["isWon"], parseInt(playerOneData["glicko"]["Rating"]), playerOneData["stats"]["troops"], playerOneData["stats"]["fields"], playerOneData["stats"]["cards"], playerOneData["stats"]["isDuel"]);
		var addGoldResult = server.AddUserVirtualCurrency
	    (
	    	{
		        PlayFabId: playerOneId,
		        VirtualCurrency: "GL",
		        Amount: playerOneData["gold"]["totalGold"]
	    	}
	    );
	    var playerOneReadOnlyData = server.GetUserReadOnlyData
	    (
	          {
	              PlayFabId: playerOneId
	          }
	    );
	    var playerTwoReadOnlyData = server.GetUserReadOnlyData
	    (
	          {
	              PlayFabId: playerTwoId
	          }
	    );
	    //glicko both players
		glickoResult = calculateGlicko(playerTwoReadOnlyData, playerOneReadOnlyData, 0);
		updatePlayer(playerTwoId, false, false, JSON.stringify(glickoResult[0]));
		updateStats(playerTwoId, 0, parseInt(glickoResult[0]["Rating"]), 0, 0, 0, 0);
		rating = parseInt(glickoResult[0]["Rating"];
		
		//return {result: parseInt(glickoResult[0]["Rating"]};
	}
	else if(keys[playerOneId] == null && keys[playerTwoId] != null )
	{
		var playerTwoData = JSON.parse(keys[playerTwoId].Value);
		updatePlayer(playerTwoId, playerTwoData["firstGame"], playerTwoData["firstWin"], playerTwoData["glicko"]);
		updateStats(playerTwoId, playerTwoData["isWon"], parseInt(playerTwoData["glicko"]["Rating"]), playerTwoData["stats"]["troops"], playerTwoData["stats"]["fields"], playerTwoData["stats"]["cards"], playerTwoData["stats"]["isDuel"]);
		var addGoldResult = server.AddUserVirtualCurrency
	    (
	    	{
		        PlayFabId: playerOneId,
		        VirtualCurrency: "GL",
		        Amount: playerOneData["gold"]["totalGold"]
	    	}
	    );
	    var playerOneReadOnlyData = server.GetUserReadOnlyData
	    (
	          {
	              PlayFabId: playerOneId
	          }
	    );
	    var playerTwoReadOnlyData = server.GetUserReadOnlyData
	    (
	          {
	              PlayFabId: playerTwoId
	          }
	    );
	    //glicko both players
		glickoResult = calculateGlicko(playerOneReadOnlyData, playerTwoReadOnlyData, 0);
		updatePlayer(playerOneId, false, false, glickoResult[0]);
		//return {result: parseInt(glickoResult[0]["Rating"]};
		updateStats(playerOneId, 0, parseInt(glickoResult[0]["Rating"]), 0, 0, 0, 0);
		rating = parseInt(glickoResult[0]["Rating"];
		
	}
	return rating;
	return {code:1};
};