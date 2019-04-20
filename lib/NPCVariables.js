function NPCVariables () {
    var npcVariables = {};
    npcVariables.Naia_toldTruth;
    npcVariables.Naia_enteredVillage;
    npcVariables.Naia_expectedCaravan;
    npcVariables.Naia_naiaPartnered;
    npcVariables.Naia_marshDangerKnown;
    npcVariables.Naia_villageKnowledge;

    npcVariables.initialize = function () {
        npcVariables.Naia_toldTruth = false;
        npcVariables.Naia_enteredVillage = false;
        npcVariables.Naia_expectedCaravan = false;
        npcVariables.Naia_naiaPartnered = false;
        npcVariables.Naia_marshDangerKnown = false;
        npcVariables.Naia_villageKnowledge = 0;
    }();

    return npcVariables;
}