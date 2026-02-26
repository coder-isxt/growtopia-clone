window.GTModules = window.GTModules || {};

window.GTModules.titles = (function createTitlesModule() {
  const TITLE_CATALOG = [
    { id: "newcomer", name: "Newcomer", color: "#8fb4ff", defaultUnlocked: true },
    { id: "builder", name: "Builder", color: "#63d39b" },
    { id: "trader", name: "Trader", color: "#ffd166" },
    { id: "guardian", name: "Guardian", color: "#f28482" },
    { id: "legend", name: "Legend", color: "#c084fc", style: { bold: true, glow: true, glowColor: "#c084fc" } },
    { id: "secret", name: "MAID", color: "#700d9e", style: { rainbow: true, bold: true, glow: true } },

    //Progression:
    { id: "novice", name: "Novice", color: "#84f4fc" },
    { id: "big", name: "BIG", color: "#ff6e6e", style: { bold: true } },


    //Quests
    { id: "legendary", name: "{username} of Legend", color: "#ffee57", style: { glow: true, glowColor: "#ffaf03" } },
    { id: "is_hero", name: "{username} is Hero", color: "#7b57ff", style: { glow: true, glowColor: "#5b03ff" } },
  ];
  
  function getCatalog() {
    return TITLE_CATALOG.map((entry) => ({ ...entry }));
  }

  return {
    getCatalog
  };
})();
