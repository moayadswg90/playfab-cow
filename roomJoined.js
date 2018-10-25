handlers.RoomJoined = function (args) 
{

	var playerID = args.UserId;
	server.WriteTitleEvent
    (
	    {
	        EventName : "room_joined",
	        Body: {joinerId: playerID}
	    }
    );
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