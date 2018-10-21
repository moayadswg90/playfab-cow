handlers.setDailyOffer = function (args, context) 
{
	var offers = ["500FreeGold","BoxOne25Off","BoxOne50Off","BoxTwo25Off","BoxTwo50Off","DoubleGold2Container50Off","DoubleGold6Container50Off"];
	var offerOne = offers[Math.floor(Math.random() * offers.length)];
	
	var offerTwo;
	for(i = 0; i < 5; i++)
	{
		offerTwo = offers[Math.floor(Math.random() * offers.length)];
		if (offerTwo != offerOne)
			break;
	}
	log.debug(offerOne);
	log.debug(offerTwo);
	var dailyOffers = [offerOne, offerTwo];
	log.debug(dailyOffers);

	var setPOTWData = server.SetTitleData
	(
		{
			Key: "dailyOffer",
			Value: JSON.stringify(dailyOffers)
		}
	);
}