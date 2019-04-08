function NPCVariables () {
    var npcVariables = {};
    npcVariables.toldTruth;
    npcVariables.enteredVillage;
    npcVariables.expectedCaravan;
    npcVariables.naiaPartnered;

    npcVariables.initialize = function () {
        npcVariables.toldTruth = false;
        npcVariables.enteredVillage = false;
        npcVariables.expectedCaravan = false;
        npcVariables.naiaPartnered = false;
    }();

    return npcVariables;
}