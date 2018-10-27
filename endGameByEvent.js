function endGameByEvent(photonGameID, playerOneId, playerTwoId, isWon, isDuel, troops, fields, cards, turns, reason)
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
     playerOne["stats"] = {isDuel: isDuel,troops:troops, fields:fields, cards:cards }
     playerOne["glicko"] = glickoResult[0]; 

     var dataPayload = {};
	 var keyString = playerOneId;
	 dataPayload[keyString] = JSON.stringify(playerOne);
	 dataPayload["gameStats"] = {turns: turns, reason: reason};
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