handlers.RoomJoined = function (args) 
{

	var addRoomCreatorToGroup = server.AddSharedGroupMembers
    (
          {
              SharedGroupId: args.GameId,
              PlayFabIds: args.UserId
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