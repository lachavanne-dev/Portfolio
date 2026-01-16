// data.js

// Structure universelle des dossiers/fichiers
const SKILL_STRUCTURE = {
  concevoir: {
    label: "Concevoir",
    folder: "Concevoir ", // dossier avec espace final dans l'arborescence
    // J'utilise ici les noms EXACTS de ton arborescence
    pages: [
      { code: "C1/C2", file: "page_C.1:C.2/page_C.1:C.2.pdf" },
      {
        code: "C3/C4.1",
        file: "page_C.3:4.1.pdf", // Supposé pdf
        fileByProject: {
          antenne: "page_C.3:4.1/page_C.3:4.1.html",
          kah: "page_C.3:4.1/page_C.3:4.1.html"
        }
      },
      { code: "C4.2", file: "page_C.4.2.pdf" }        // Supposé pdf
    ],
    description: "Analyse des besoins, architecture fonctionnelle et justification des choix."
  },
  implanter: {
    label: "Implanter",
    folder: "Implanter",
    pages: [
      { code: "I.3.1", file: "page_1.3.1.pdf" },
      { code: "I.3.2", file: "page_1.3.2.pdf" }
    ],
    description: "Industrialisation, dossier de fabrication et câblage."
  },
  maintenir: {
    label: "Maintenir",
    folder: "Maintenir",
    pages: [
      { code: "M1", file: "page_M.1.pdf" },
      { code: "M2", file: "page_M.2.pdf" }
    ],
    description: "Plan de maintien en condition opérationnelle (préventif/correctif)."
  },
  manager: {
    label: "Manager",
    folder: "Manager",
    pages: [
      { code: "G1", file: "page_G.1.pdf" },
      { code: "G3", file: "page_G.3.pdf" }
    ],
    description: "Planification, budget et revue de projet."
  },
  verifier: {
    label: "Vérifier",
    folder: "Vérifier",
    pages: [
      { code: "V1", file: "page_V1.pdf" },
      { code: "V2", file: "page_V2.pdf" }
    ],
    description: "Protocoles d'essais et validation des performances."
  },
  rapports: {
    label: "Rapports SAE",
    folder: "Rapports_SAE",
    pages: [
      { code: "Rapport", file: "dynamic" } // Sera remplacé par le fichier spécifique du projet
    ],
    description: "Dossier technique complet et rendu final."
  }
};

window.portfolioData = {
  structure: SKILL_STRUCTURE,
  projects: [
    {
      id: "antenne",
      folderRoot: "../Projets/Antenne_HB9CV", // Dossier racine accessible depuis portfolio-app
      reportFile: "page_Antenne HB9CV.pdf",
      title: "Antenne HB9CV",
      tagline: "Radiogoniométrie 144 MHz : simulation, fabrication et mesures",
      image: "assets/antenne.svg",
      context: "SAE S4",
      year: "2025",
      tags: ["RF", "Simulation", "Mesures"]
    },
    {
      id: "kah",
      folderRoot: "../Projets/KAH",
      reportFile: "page_KAH.pdf",
      title: "Kart à Hélice",
      tagline: "Transmission infrarouge, schémas électriques, PCB, tests et corrections",
      image: window.KAH_ASSETS ? window.KAH_ASSETS.color : "assets/kah_color.png",
      context: "SAE",
      year: "2024",
      tags: ["Électronique", "PCB", "Tests"]
    },
    {
      id: "robot",
      folderRoot: "../Projets/Robot_Sumo",
      reportFile: "page_Robot_sumo.pdf",
      title: "Robot Sumo autonome",
      tagline: "Robotisation & IA embarquée",
      image: "assets/robot.svg",
      context: "Robotique & Contrôle",
      year: "2023",
      tags: ["Autonomie", "C++", "Prototype"]
    }
  ],
  skillsInfo: [
    { id: "concevoir", name: "Concevoir", summary: "Cahier des charges et conception." },
    { id: "implanter", name: "Implanter", summary: "Réalisation et déploiement." },
    { id: "maintenir", name: "Maintenir", summary: "Maintenance et cycle de vie." },
    { id: "manager", name: "Manager", summary: "Gestion de projet." },
    { id: "verifier", name: "Vérifier", summary: "Tests et validation." },
    { id: "rapports", name: "Rapports SAE", summary: "Documentation." }
  ]
};
