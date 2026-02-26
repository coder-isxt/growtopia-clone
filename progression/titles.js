window.GTModules = window.GTModules || {};

window.GTModules.titles = (function createTitlesModule() {
  const TITLE_CATALOG = [
    { id: "newcomer", name: "Newcomer", color: "#8fb4ff", defaultUnlocked: true },
    { id: "builder", name: "Builder", color: "#63d39b" },
    { id: "trader", name: "Trader", color: "#ffd166" },
    { id: "guardian", name: "Guardian", color: "#f28482" },
    { id: "legend", name: "Legend", color: "#c084fc", style: { bold: true, glow: true, glowColor: "#c084fc" } },
    { id: "secret", name: "MAID", color: "#700d9e", style: { rainbow: true, bold: true, glow: true } },
    
    { id: "aurora", name: "Aurora", color: "#6cf9e0", style: { gradient: true, gradientShift: true, gradientColors: ["#6cf9e0", "#70a8ff", "#c084fc"], gradientAngle: 92 } },
    { id: "nova", name: "Nova", color: "#ffd166", style: { gradient: true, glow: true, glowColor: "#ffd166", gradientShift: true, gradientColors: ["#ffd166", "#ff7a7a", "#c084fc"], gradientAngle: 24, bold: true } },
    { id: "prism", name: "Prism", color: "#ff6fd8", style: { rainbow: true, glow: true, glowColor: "#ff6fd8", bold: true } },

    //Progression:
    { id: "novice", name: "Novice", color: "#84f4fc" },
    { id: "big", name: "BIG", color: "#ff6e6e", style: { bold: true } },


    //Quests
    { id: "legendary", name: "{username} of Legend", color: "#ffee57", style: { glow: true, glowColor: "#ffaf03" } },
    { id: "is_hero", name: "{username} is Hero", color: "#7b57ff", style: {rainbow: true, bold: true, glow: true, glowColor: "#5b03ff" } },
  ];
  
  function getCatalog() {
    return TITLE_CATALOG.map((entry) => ({ ...entry }));
  }

  return {
    getCatalog
  };
})();
