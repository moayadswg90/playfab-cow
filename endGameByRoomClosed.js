
function endGameByRoomClosed(photonGameID, playerOneId, playerTwoId, keys)
{
	if (keys[playerOneId] != null && keys[playerTwoId] != null )
	{
		var playerOneData = JSON.parse(keys[playerOneId].Value);
		var playerTwoData = JSON.parse(keys[playerTwoId].Value);
		updatePlayer(playerOneId, playerOneData["firstGame"], playerOneData["firstWin"], JSON.stringify(playerOneData["glicko"]));
		updatePlayer(playerTwoId, playerTwoData["firstGame"], playerTwoData["firstWin"], JSON.stringify(playerTwoData["glicko"]));
		updateStats(playerOneId, playerOneData["isWon"], parseInt(playerOneData["glicko"]["Rating"]), playerOneData["stats"]["troops"], playerOneData["stats"]["fields"], playerOneData["stats"]["cards"], playerOneData["stats"]["isDuel"],0);
		updateStats(playerTwoId, playerTwoData["isWon"], parseInt(playerTwoData["glicko"]["Rating"]), playerOneData["stats"]["troops"], playerTwoData["stats"]["fields"], playerTwoData["stats"]["cards"], playerTwoData["stats"]["isDuel"],0);
		var addGoldResult = server.AddUserVirtualCurrency
	    (
	    	{
		        PlayFabId: playerOneId,
		        VirtualCurrency: "GL",
		        Amount: playerOneData["reward"]["currency"]["GL"]["increment"]
	    	}
	    ); 
		var addGoldResult = server.AddUserVirtualCurrency
	    (
	    	{
		        PlayFabId: playerTwoId,
		        VirtualCurrency: "GL",
		        Amount: playerTwoData["reward"]["currency"]["GL"]["increment"]
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
		updateStats(playerOneId, playerOneData["isWon"], parseInt(playerOneData["glicko"]["Rating"]), playerOneData["stats"]["troops"], playerOneData["stats"]["fields"], playerOneData["stats"]["cards"], playerOneData["stats"]["isDuel"],0);
		var addGoldResult = server.AddUserVirtualCurrency
	    (
	    	{
		        PlayFabId: playerOneId,
		        VirtualCurrency: "GL",
		        Amount: playerOneData["reward"]["currency"]["GL"]["increment"]
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
		glickoResult = calculateGlicko(playerTwoReadOnlyData, playerOneReadOnlyData, 0);
		updatePlayer(playerTwoId, false, false, JSON.stringify(glickoResult[0]));
		updateStats(playerTwoId, 0, parseInt(glickoResult[0]["Rating"]), 0, 0, 0, 0,1);
	}
	else if(keys[playerOneId] == null && keys[playerTwoId] != null )
	{
		var playerTwoData = JSON.parse(keys[playerTwoId].Value);
		updatePlayer(playerTwoId, playerTwoData["firstGame"], playerTwoData["firstWin"],JSON.stringify(playerTwoData["glicko"]));
		updateStats(playerTwoId, playerTwoData["isWon"], parseInt(playerTwoData["glicko"]["Rating"]), playerTwoData["stats"]["troops"], playerTwoData["stats"]["fields"], playerTwoData["stats"]["cards"], playerTwoData["stats"]["isDuel"],0);
		var addGoldResult = server.AddUserVirtualCurrency
	    (
	    	{
		        PlayFabId: playerOneId,
		        VirtualCurrency: "GL",
		        Amount: playerTwoData["reward"]["currency"]["GL"]["increment"]
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
		glickoResult = calculateGlicko(playerOneReadOnlyData, playerTwoReadOnlyData, 0);
		updatePlayer(playerOneId, false, false, JSON.stringify(glickoResult[0]));
		updateStats(playerOneId, 0, parseInt(glickoResult[0]["Rating"]), 0, 0, 0, 0,1);
		
	}
	return {code:1};
}