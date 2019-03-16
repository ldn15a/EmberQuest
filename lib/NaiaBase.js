function NaiaBase () {
    var naiaBase = {};

	naiaBase.toldTruth;
	naiaBase.marshDangerKnown;
	naiaBase.villageKnowledge;
	naiaBase.enteredVillage;
	naiaBase.expectedCaravan;
	naiaBase.naiaPartnered;
	naiaBase.naiasCharm;

    naiaBase.update = function () {

    }

    naiaBase.initialize = function () {

        naiaBase.toldTruth = false;
		naiaBase.marshDangerKnown = false;
		naiaBase.villageKnowledge = 0;
		naiaBase.enteredVillage = false;
		naiaBase.expectedCaravan = false;
		naiaBase.naiaPartnered = false;
		naiaBase.naiasCharm = false;
    }();

    return naiaBase;
}