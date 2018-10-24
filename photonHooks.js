handlers.createGroup = function (args)
{

    var createGroup = server.CreateSharedGroup
    (
          {
              SharedGroupId: "rrrrrrrrrr"
          }
    );
    return { ResultCode : 0, Message: 'Success' };
}
handlers.RoomCreated = function (args)
{
	log.debug(args);
	var photonGameID = args.GameId;
	var playerID = args.UserId;
	log.debug(photonGameID);
	log.debug(playerID);
    server.WriteTitleEvent
    (
	    {
	        EventName : "room_created"
	    }
    );
    var createGroup = server.CreateSharedGroup
    (
          {
              SharedGroupId: "room_1"
          }
    );
    return { ResultCode : 0, Message: 'Success' };
};
handlers.RoomJoined = function (args) 
{
    server.WriteTitleEvent
    (
	    {
	        EventName : "room_joined"
	    }
    );
    return { ResultCode : 0, Message: 'Success' };
};
handlers.RoomLeft = function (args) {
    server.WriteTitleEvent({
        EventName : "room_left"
    });
    return { ResultCode : 0, Message: 'Success' };
};
handlers.RoomClosed = function (args) {
    server.WriteTitleEvent({
        EventName : "room_closed"
    });
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