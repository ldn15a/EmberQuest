function NPCVariables () {
    var npcVariables = {};
    npcVariables.toldTruth;
    npcVariables.enteredVillage;
    npcVariables.expectedCaravan;
    npcVariables.naiaPartnered;

    npcVariables.initialize = function () {
        npcVariables.toldTruth = true;
        npcVariables.enteredVillage = false;
        npcVariables.expectedCaravan = true;
        npcVariables.naiaPartnered = false;
    }();

    return npcVariables;
}