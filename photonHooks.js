

handlers.RoomPropertyUpdated = function (args) {
//set cards, duels, troops, fields in sharedGroupData

    server.WriteTitleEvent({
        EventName : "room_property_changed"
    });
    return { ResultCode : 0, Message: 'Success' };
};
handlers.RoomEventRaised = function (args) 
{
	var eventName = "";
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
	}
    server.WriteTitleEvent
    (
    	{
        	EventName : eventName
    	}
    );
    return { ResultCode : 0, Message: 'Success' };
};