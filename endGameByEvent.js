function endGameByEvent(photonGameID, playerOneId, playerTwoId, isWon, isDuel, troops, fields, cards)
{
	var playerOne = {};
	playerOne["isWon"] = isWon;
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
    //player one gold
    playerOne["firstGame"] = checkFirstGame(playerOneReadOnlyData);
    playerOne["firstWin"] = checkFirstWin(playerOneReadOnlyData);
    playerOne["gold"] = calculateEarnedGold(isWon, playerOne["firstWin"], playerOne["firstGame"], doubleGoldCheck(playerOneId));

    //glicko both players
     glickoResult = calculateGlicko(playerOneReadOnlyData, playerTwoReadOnlyData, isWon);
     playerOne["glicko"] = glickoResult[0]; 
     playerOne["isDuel"] = isDuel;
     playerOne["troops"] = troops;
     playerOne["fields"] = fields;
	 playerOne["cards"] = cards;

     var dataPayload = {};
	 var keyString = playerOne["id"]
	 dataPayload[keyString] = JSON.stringify(playerOne);
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