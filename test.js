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
		values["playGold"] += firstGameReward;
	}
	if (isWon == 1)
	{
		values["winGold"] = winReward;
		values["points"] = pointsReward;
		
		if (firstWin)
		{
			
			values["winGold"] += firstWinReward;
		}	
	}
	if (doubleGold)
	{
		values["double"] = gold["playGold"] + gold["winGold"];
	}
	values["totalGold"] = values["playGold"] + values["winGold"] + values["doubleGold"]
	return values;
}