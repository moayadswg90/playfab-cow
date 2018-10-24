function calculateEarnedValues(isWon, firstWin, firstGame, doubleGold)
{
	var values = {};
	values["playGold"] = gameReward;
	values["winGold"] = 0;
	values["doubleGold"] = 0;
	values["totalGold"] = 0;
	values["points"] = 0;
	
	if (firstGame)
	{
		values["game"] += firstGameReward;
	}
	if (isWon == 1)
	{
		values["win"] = winReward;
		values["points"] = pointsReward;
		
		if (firstWin)
		{
			
			values["win"] += firstWinReward;
		}	
	}
	if (doubleGold)
	{
		values["double"] = gold["game"] + gold["win"];
	}
	values["total"] = values["game"] + values["win"] + values["double"]
	return values;
}