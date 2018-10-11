handlers.glickoTest = function (args, context) 
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
    var p1 = glicko.makePlayer(1400, 30, 0.06);
    var p2 = glicko.makePlayer(1550, 100, 0.06);
	var matches = [];
	matches.push([p1, p2, 1]);
	glicko.updateRatings(matches);
	
	var rating = (Math.abs(p1.getRating() - 1464) < 0.1);
	var rd = Math.abs(p1.getRd() - 151.52);
	var vol = Math.abs(p1.getVol() - 0.05999);
	
	return {rating: rating, rd: rd, vol:vol};
}