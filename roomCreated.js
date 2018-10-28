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
    server.CreateSharedGroup
    (
          {
              SharedGroupId: photonGameID
          }
    );
    server.AddSharedGroupMembers
    (
          {
              SharedGroupId: photonGameID,
              PlayFabIds: [playerID]
          }
    );
    server.UpdateSharedGroupData
    (
          {
              SharedGroupId: photonGameID,
              Data: {gameStarted: 0}
          }
    );
    return { ResultCode : 0, Message: 'Success' };
};