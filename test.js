function calculateEarnedGold(isWon, firstWin, firstGame, doubleGold)
{
	var gold = {};
	gold["playGold"] = gameReward;
	gold["winGold"] = 0;
	gold["doubleGold"] = 0;
	gold["totalGold"] = 0;
	
	if (firstGame)
	{
		gold["playGold"] += firstGameReward;
	}
	if (isWon == 1)
	{
		gold["winGold"] = winReward;
		gold["points"] = pointsReward;
		
		if (firstWin)
		{
			
			gold["winGold"] += firstWinReward;
		}	
	}
	if (doubleGold)
	{
		gold["double"] = gold["playGold"] + gold["winGold"];
	}
	gold["totalGold"] = gold["playGold"] + gold["winGold"] + gold["doubleGold"]
	return gold;
}