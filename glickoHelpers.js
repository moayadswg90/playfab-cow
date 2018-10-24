function calculateGlicko(playerOneReadOnlyData, playerTwoReadOnlyData, isWon)
{
  	var settings = 
	{
        tau : 0.5,
        rpd : 604800,
        rating : 1500,
        rd : 200,
        vol : 0.06
	};
	var glicko = new glicko2.Glicko2(settings);
	
	var firstPlayerGlickoData = getGlickoData(playerOneReadOnlyData);
  	var p1RD = firstPlayerGlickoData.RD;
	var p1Rating = firstPlayerGlickoData.Rating;
	var p1Vol = firstPlayerGlickoData.Vol;
	
	var secondPlayerGlickoData = getGlickoData(playerTwoReadOnlyData);
  	var p2RD = secondPlayerGlickoData.RD;
	var p2Rating = secondPlayerGlickoData.Rating;
	var p2Vol = secondPlayerGlickoData.Vol;
	
    var p1 = glicko.makePlayer(p1Rating, p1RD, p1Vol);
    var p2 = glicko.makePlayer(p2Rating, p2RD, p2Vol);
	var matches = [];
	matches.push([p1, p2, isWon]);
	glicko.updateRatings(matches);
	
	var p1rating = (Math.abs(p1.getRating()));
	var p1rd = Math.abs(p1.getRd());
	var p1vol = Math.abs(p1.getVol());
	
	var p2rating = (Math.abs(p2.getRating()));
	var p2rd = Math.abs(p2.getRd());
	var p2vol = Math.abs(p2.getVol());
	
	var result = [];
	var playerOneResult = {ratingResult: p1rating, rdResult: p1rd, volResult: p1vol};
	var playerTwoResult = {ratingResult: p2rating, rdResult: p2rd, volResult: p2vol};
	
  	return result[playerOneResult,playerTwoResult];
}

function getGlickoData(playerReadOnlyData)
{
  var glickoData = JSON.parse(playerReadOnlyData.Data.glicko.Value);
  var glickoRating = glickoData[0].Rating;
  var glickoRD = glickoData[1].RD;
  var glickoVol = glickoData[2].Vol;
  return {Rating: glickoRating,RD: glickoRD, Vol: glickoVol}; 
}