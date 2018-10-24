function calculateGoldEarned(isWon, firstWin, firstGame, doubleGold)
{
	var gold = [];
	gold["game"] = gameReward;
	gold["win"] = 0;
	gold["double"] = 0;
	gold["total"] = 0;
	
	if (firstGame)
	{
		gold["game"] += firstGameReward;
	}
	if (isWon == 1)
	{
		gold["win"] = 	winReward;
		
		if (firstWin)
		{
			
			gold["win"] += firstWinReward;
		}	
	}
	if (doubleGold)
	{
		gold["double"] = gold["game"] + gold["win"];
	}
	gold["total"] = gold["game"] + gold["win"] + gold["double"]
	return gold;
}