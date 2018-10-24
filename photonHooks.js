handlers.RoomCreated = function (args)
{
	var photonGameID = args.GameId;
	var playerID = args.UserId;
	server.WriteTitleEvent
    (
	    {
	        EventName : "photonGameID",
	        Body: {photonGameID: photonGameID}
	    }
    );
    server.WriteTitleEvent
    (
	    {
	        EventName : "room_created"
	    }
    );
    var createGroup = server.CreateSharedGroup
    (
          {
              SharedGroupId: photonGameID
          }
    );
    var addRoomCreatorToGroup = server.AddSharedGroupMembers
    (
          {
              SharedGroupId: photonGameID,
              PlayFabIds: [playerID]
          }
    );
    return { ResultCode : 0, Message: 'Success' };
};
handlers.RoomJoined = function (args) 
{
	var playerID = args.UserId;
	var addRoomCreatorToGroup = server.AddSharedGroupMembers
    (
          {
              SharedGroupId: photonGameID,
              PlayFabIds: [playerID]
          }
    );
    server.WriteTitleEvent
    (
	    {
	        EventName : "room_joined"
	    }
    );
    return { ResultCode : 0, Message: 'Success' };
};
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
handlers.RoomClosed = function (args) 
{
    var photonGameID = args.GameId;
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
handlers.RoomPropertyUpdated = function (args) {
    server.WriteTitleEvent({
        EventName : "room_property_changed"
    });
    return { ResultCode : 0, Message: 'Success' };
};
handlers.RoomEventRaised = function (args) {
    server.WriteTitleEvent({
        EventName : "room_event_raised"
    });
    return { ResultCode : 0, Message: 'Success' };
};