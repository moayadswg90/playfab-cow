
handlers.setPOTW = function (args, context) 
{
  var newPOTW = context.playerProfile.PlayerId;
  var setPOTWData = server.SetTitleData
  (
   		{
  			Key: "potw",
          	Value: newPOTW
		}
  ); 
}