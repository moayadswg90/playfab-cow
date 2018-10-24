handlers.RoomCreated = function (args) {
    server.WriteTitleEvent({
        EventName : "room_created"
    });
    return { ResultCode : 0, Message: 'Success' };
};
handlers.RoomJoined = function (args) {
    server.WriteTitleEvent({
        EventName : "room_joined"
    });
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