function calculateGlicko(playerReadOnlyData, isWon)
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
	
	var firstPlayerGlickoData = getGlickoData(playerReadOnlyData);
  	var p1RD = firstPlayerGlickoData.RD;
	var p1Rating = firstPlayerGlickoData.Rating;
	var p1Vol = firstPlayerGlickoData.Vol;
	
    var p1 = glicko.makePlayer(p1Rating, p1RD, p1Vol);
    var p2 = glicko.makePlayer(1550, 100, 0.06);
	var matches = [];
	matches.push([p1, p2, isWon]);
	glicko.updateRatings(matches);
	
	var rating = (Math.abs(p1.getRating()));
	var rd = Math.abs(p1.getRd());
	var vol = Math.abs(p1.getVol());
	
  
  	return {ratingResult: rating, rdResult: rd, volResult: vol};
}

function getGlickoData(playerReadOnlyData)
{
  var glickoData = JSON.parse(playerReadOnlyData.Data.glicko.Value);
  var glickoRating = glickoData[0].Rating;
  var glickoRD = glickoData[1].RD;
  var glickoVol = glickoData[2].Vol;
  return {Rating: glickoRating,RD: glickoRD, Vol: glickoVol}; 
}