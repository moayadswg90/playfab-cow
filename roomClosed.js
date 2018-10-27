
handlers.RoomClosed = function (args) 
{
	var roomData = server.GetSharedGroupData
	(
	    {
	        SharedGroupId: args.GameId,
			GetMembers: true
	    }

	);
	result = endGameByRoomClosed(args.GameId, roomData.Members[0], roomData.Members[1], roomData.Keys);
/*
    server.DeleteSharedGroup
    (
	    {
	        SharedGroupId: photonGameID
	    }
    );
*/  
    server.WriteTitleEvent
    (
	    {
	        EventName : "room_closed"
	    }
    );
    return { ResultCode : 0, Message: 'Success' };
};