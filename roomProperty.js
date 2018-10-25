handlers.RoomPropertyUpdated = function (args) {
//set cards, duels, troops, fields in sharedGroupData

    server.WriteTitleEvent({
        EventName : "room_property_changed"
    });
    return { ResultCode : 0, Message: 'Success' };
};