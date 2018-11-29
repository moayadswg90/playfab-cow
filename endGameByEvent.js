function endGameByEvent(photonGameID, playerOneId, playerTwoId, isWon, isDuel, troops, fields, cards, turns, reason)
{
	var playerOne = {};
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
    playerOne["isWon"] = isWon;
    playerOne["firstWin"] = checkFirstWin(playerOneReadOnlyData);
    playerOne["reward"] = calculateEarnedGold(isWon, playerOne["firstWin"], playerOne["firstGame"], doubleGoldCheck(playerOneId));

    //glicko both players
     glickoResult = calculateGlicko(playerOneReadOnlyData, playerTwoReadOnlyData, isWon);
     pointsEarned = 0;
     if (isWon == 1)
     	pointsEarned = 10;
     playerOne["stats"] = {isDuel: isDuel,troops:troops, fields:fields, cards:cards, WeeklyPoints: pointsEarned,DailyPoints: pointsEarned, ranks:glickoResult[0]["Rating"]}
     playerOne["glicko"] = glickoResult[0]; 

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