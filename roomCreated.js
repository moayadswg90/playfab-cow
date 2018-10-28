handlers.RoomCreated = function (args)
{
	server.WriteTitleEvent
    (
	    {
	        EventName : "photonGameID",
	        Body: {photonGameID: args.GameId}
	    }
    );
    server.CreateSharedGroup
    (
          {
              SharedGroupId: args.GameId
          }
    );
    server.AddSharedGroupMembers
    (
          {
              SharedGroupId: args.GameId,
              PlayFabIds: [args.UserId]
          }
    );
    server.UpdateSharedGroupData
    (
          {
              SharedGroupId: args.GameId,
              Data: {gameStarted: 0}
          }
    );
    return { ResultCode : 0, Message: 'Success' };
};