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