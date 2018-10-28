handlers.RoomEventRaised = function (args) 
{
	var eventName = "";
	var playerTwoId;
	var result;
	if (args.EvCode == 10)
	{
		eventName = "gameStarted";
		setStartFlag = server.UpdateSharedGroupData
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
	        	SharedGroupId: args.GameId,
				GetMembers: true
	    	}

		);
		for (i = 0; i < roomData.Members.length; i++)
		{
			if(roomData.Members[i] != args.UserId)
				playerTwoId = roomData.Members[i];
		}
		server.WriteTitleEvent
	    (
	    	{
	        	EventName : "beforeEndGameByEvent"
	    	}
	    );
		result = endGameByEvent(args.GameId, args.UserId, playerTwoId, eventData["isWon"], eventData["isDuel"], eventData["troops"], eventData["fields"], eventData["cards"], eventData["turns"], eventData["reason"]);
		server.WriteTitleEvent
	    (
	    	{
	        	EventName : "afterEndGameByEvent"
	    	}
	    );
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