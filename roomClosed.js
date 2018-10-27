
handlers.RoomClosed = function (args) 
{
	var photonGameID = args.GameId;
	//get room members
	var roomMembers = server.GetSharedGroupData
    (
	    {
	        SharedGroupId: photonGameID,
	        GetMembers: true
	    }
    );
    // call end game
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