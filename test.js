function calculateEarnedGold(isWon, firstWin, firstGame, doubleGold)
{
	var gold = {};
	gold["playGold"] = gameReward;
	gold["winGold"] = 0;
	gold["doubleGold"] = 0;
	gold["totalGold"] = 0;
	
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
		gold["double"] = gold["playGold"] + gold["winGold"];
	}
	gold["totalGold"] = gold["playGold"] + gold["winGold"] + gold["doubleGold"]
	return gold;
}