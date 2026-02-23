window.GTModules = window.GTModules || {};

window.GTModules.titles = (function createTitlesModule() {
  const TITLE_CATALOG = [
    { id: "newcomer", name: "Newcomer", color: "#8fb4ff", defaultUnlocked: true },
    { id: "builder", name: "Builder", color: "#63d39b" },
    { id: "trader", name: "Trader", color: "#ffd166" },
    { id: "guardian", name: "Guardian", color: "#f28482" },
    { id: "legend", name: "Legend", color: "#c084fc" },

    //Progression:
    { id: "novice", name: "Novice", color: "#84f4fc" },
    { id: "big", name: "big", color: "#ff6e6e" },
  ];
  
  function getCatalog() {
    return TITLE_CATALOG.map((entry) => ({ ...entry }));
  }

  return {
    getCatalog
  };
})();

