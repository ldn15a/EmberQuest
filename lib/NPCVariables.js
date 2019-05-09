function NPCVariables () {
    var npcVariables = {};
    npcVariables.Naia_toldTruth;
    npcVariables.Naia_enteredVillage;
    npcVariables.Naia_expectedCaravan;
    npcVariables.Naia_naiaPartnered;
    npcVariables.Naia_marshDangerKnown;
    npcVariables.Naia_villageKnowledge;
    npcVariables.Naia_naiaFriendship;
    npcVariables.Naia_naiaEnd;
    npcVariables.Naia_elderQuestion;
    npcVariables.Naia_tideQuestion;
    npcVariables.Naia_childQuestion;
    npcVariables.Naia_numAsked;
    npcVariables.Naia_motiveReveal;
    npcVariables.Naia_askedFestival;
    npcVariables.Naia_thiefStory;
    npcVariables.Naia_naiaPlan;
    npcVariables.Naia_wraithSoothed;
    npcVariables.Naia_naiaSuspicious;
    npcVariables.Naia_wraithQuestion;
    npcVariables.Naia_naiaDistract;
    npcVariables.Absent_absentMindedEncounter;
    npcVariables.Worried_firstEncounterWorried;
    npcVariables.Worried_blackIceRumorKnown;
    npcVariables.MerchantAgent_askedWho;
    npcVariables.MerchantAgent_askedVillage;
    npcVariables.MerchantAgent_askedTrade;
    npcVariables.MerchantAgent_renzelJob;
    //hungry - if coal
    //Merchant - Health + 3
    //Merchant - IngisCard + 1
    //Merchant - flashPowder + 4
    //NaiaHeavyMarshPreBoss - Health + 50


    npcVariables.initialize = function () {
        npcVariables.Naia_toldTruth = false;
        npcVariables.Naia_enteredVillage = false;
        npcVariables.Naia_expectedCaravan = false;
        npcVariables.Naia_naiaPartnered = false;
        npcVariables.Naia_marshDangerKnown = false;
        npcVariables.Naia_villageKnowledge = 0;
        npcVariables.Naia_naiaFriendship;
        npcVariables.Naia_naiaEnd;
        npcVariables.Naia_elderQuestion;
        npcVariables.Naia_tideQuestion;
        npcVariables.Naia_childQuestion;
        npcVariables.Naia_numAsked;
        npcVariables.Naia_motiveReveal;
        npcVariables.Naia_askedFestival;
        npcVariables.Naia_thiefStory;
        npcVariables.Naia_naiaPlan;
        npcVariables.Naia_wraithSoothed;
        npcVariables.Naia_naiaSuspicious;
        npcVariables.Naia_wraithQuestion;
        npcVariables.Naia_naiaDistract;
        npcVariables.Absent_absentMindedEncounter;
        npcVariables.Worried_firstEncounterWorried;
        npcVariables.Worried_blackIceRumorKnown;
        npcVariables.MerchantAgent_askedWho;
        npcVariables.MerchantAgent_askedVillage;
        npcVariables.MerchantAgent_askedTrade;
        npcVariables.MerchantAgent_renzelJob;
    }();

    npcVariables.copy = function (source) {
        npcVariables.Naia_toldTruth = source.Naia_toldTruth;
        npcVariables.Naia_enteredVillage = source.Naia_enteredVillage;
        npcVariables.Naia_expectedCaravan = source.Naia_expectedCaravan;
        npcVariables.Naia_naiaPartnered = source.Naia_naiaPartnered;
        npcVariables.Naia_marshDangerKnown = source.Naia_marshDangerKnown;
        npcVariables.Naia_villageKnowledge = source.Naia_villageKnowledge;
        npcVariables.Naia_naiaFriendship = source.Naia_naiaFriendship;
        npcVariables.Naia_naiaEnd = source.Naia_naiaEnd;
        npcVariables.Naia_elderQuestion = source.Naia_elderQuestion;
        npcVariables.Naia_tideQuestion = source.Naia_tideQuestion;
        npcVariables.Naia_childQuestion = source.Naia_childQuestion;
        npcVariables.Naia_numAsked = source.Naia_numAsked;
        npcVariables.Naia_motiveReveal = source.Naia_motiveReveal;
        npcVariables.Naia_askedFestival = source.Naia_askedFestival;
        npcVariables.Naia_thiefStory = source.Naia_thiefStory;
        npcVariables.Naia_naiaPlan = source.Naia_naiaPlan;
        npcVariables.Naia_wraithSoothed = source.Naia_wraithSoothed;
        npcVariables.Naia_naiaSuspicious = source.Naia_naiaSuspicious;
        npcVariables.Naia_wraithQuestion = source.Naia_wraithQuestion;
        npcVariables.Naia_naiaDistract = source.Naia_naiaDistract;
        npcVariables.Absent_absentMindedEncounter = source.Absent_absentMindedEncounter;
        npcVariables.Worried_firstEncounterWorried = source.Worried_firstEncounterWorried;
        npcVariables.Worried_blackIceRumorKnown = source.Worried_blackIceRumorKnown;
        npcVariables.MerchantAgent_askedWho = source.MerchantAgent_askedWho;
        npcVariables.MerchantAgent_askedVillage = source.MerchantAgent_askedVillage;
        npcVariables.MerchantAgent_askedTrade = source.MerchantAgent_askedTrade;
        npcVariables.MerchantAgent_renzelJob = source.MerchantAgent_renzelJob;
    }

    return npcVariables;
}