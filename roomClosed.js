
handlers.RoomClosed = function (args) 
{
	var photonGameID = args.GameId;
	//get room members
	var roomMembers = server.GetSharedGroupData
    (
	    {
	        SharedGroupId: photonGameID
	    }
    );
    roomMembers = roomMembers.Members;
    for (i=0; i<roomMembers.length; i++)
    {
	   	server.WriteTitleEvent
	    (
		    {
		        EventName : "room_member_when_closing",
		        Body: {member: roomMembers[i]}
		    }
	    ); 
    }
    
    
	//get player ranks
	//end game
	//delete group
    
    server.DeleteSharedGroup
    (
	    {
	        SharedGroupId: photonGameID
	    }
    );
    
    server.WriteTitleEvent
    (
	    {
	        EventName : "room_closed"
	    }
    );
    return { ResultCode : 0, Message: 'Success' };
};