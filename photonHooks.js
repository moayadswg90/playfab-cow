

handlers.RoomPropertyUpdated = function (args) {
//set cards, duels, troops, fields in sharedGroupData

    server.WriteTitleEvent({
        EventName : "room_property_changed"
    });
    return { ResultCode : 0, Message: 'Success' };
};
handlers.RoomEventRaised = function (args) 
{
	//check event code 20 for game is done;
	//read sharedGroupData property
	//set player id of winning in sharedGroupData
    server.WriteTitleEvent({
        EventName : "room_event_raised"
    });
    return { ResultCode : 0, Message: 'Success' };
};