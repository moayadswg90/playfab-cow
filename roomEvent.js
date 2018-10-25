handlers.RoomEventRaised = function (args) 
{
	var eventName = "";
	var playerTwoId;
	var result;
	if (args.EvCode == 10)
	{
		eventName = "gameStarted";
		var setStartFlag = server.UpdateSharedGroupData
		(
          {
              SharedGroupId: args.GameId,
              Data: {gameStarted: 1}
          }
		);
	}
	else if (args.EvCode == 20)
	{
		eventName = "gameEnded";
		eventData = args.Data;
		var roomData = server.GetSharedGroupData
		(
	    	{
	        	SharedGroupId: photonGameID,
				GetMembers: true
	    	}
		);
		for (i = 0; i < roomData.Members; i++)
		{
			if(roomData.Members[i] != args.UserId)
				playerTwoId = roomData.Members[i];
		}
		result = endGameByEvent(args.GameId, args.UserId, playerTwoId, eventData["isWon"], eventData["isDuel"], eventData["troops"], eventData["fields"], eventData["cards"]);	
	}
	else
	{
		//do nothing
	}
    server.WriteTitleEvent
    (
    	{
        	EventName : eventName,
        	Body: {result}
    	}
    );
    return { ResultCode : 0, Message: 'Success' };
};