
handlers.RoomLeft = function (args) 
{
    server.WriteTitleEvent
    (
	    {
	        EventName : "room_left"
	    }
    );
    return { ResultCode : 0, Message: 'Success' };
};
