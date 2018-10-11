handlers.endBattle = function (args, context) 
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
	matches.push([Ryan, Bob, 1]);
	glicko.updateRatings(matches);
	
	var rating = (Math.abs(Ryan.getRating() - 1464) < 0.1).should.be.true;
	var rd = (Math.abs(Ryan.getRd() - 151.52) < 0.01).should.be.true;
	var vol = (Math.abs(Ryan.getVol() - 0.05999) < 0.00001).should.be.true;
	
	return {rating: rating, rd: rd, vol:vol};
}