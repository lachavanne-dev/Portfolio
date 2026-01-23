// data.js

// Structure universelle des dossiers/fichiers
const SKILL_STRUCTURE = {
  concevoir: {
    label: "Concevoir",
    folder: "Concevoir ", // dossier avec espace final dans l'arborescence
    // J'utilise ici les noms EXACTS de ton arborescence
    pages: [
      {
        code: "C1/C2",
        file: "page_C.1:C.2/page_C.1:C.2.pdf",
        fileByProject: {
          kah: "page_C.1:C.2/page_C.1:C.2.html",
          antenne: "page_C.1:C.2/page_C.1:C.2.html",
          robot: "page_C.1:C.2/page_C.1:C.2.html",
          "stage-geii": "page_C.1:C.2/page_C.1:C.2.html"
        }
      },
      {
        code: "C3/C4.1",
        file: "page_C.3:4.1.pdf", // Supposé pdf
        fileByProject: {
          antenne: "page_C.3:4.1/page_C.3:4.1.html",
          kah: "page_C.3:4.1/page_C.3:4.1.html",
          robot: "page_C.3:4.1/page_C.3:4.1.html"
        }
      },
      { code: "C4.2", file: "page_C.4.2.pdf" }        // Supposé pdf
    ],
    description: "Analyser un besoin ou un cahier des charges afin de définir une solution technique cohérente. Cette compétence consiste à concevoir une architecture et à justifier les choix retenus."
  },
  implanter: {
    label: "Implanter",
    folder: "Implanter",
    pages: [
      {
        code: "I.3.1",
        file: "page_1.3.1.pdf",
        fileByProject: {
          antenne: "page_1.3.1/page_1.3.1.html",
          "stage-geii": "page_1.3.1/page_1.3.1.html"
        }
      },
      {
        code: "I.3.2",
        file: "page_1.3.2.pdf",
        fileByProject: {
          antenne: "page_1.3.2/page_1.3.2.html"
        }
      }
    ],
    description: "Passer d’une solution conçue à un système réel et opérationnel. Elle couvre l’intégration matérielle et logicielle ainsi que la mise en service."
  },
  maintenir: {
    label: "Maintenir",
    folder: "Maintenir",
    pages: [
      {
        code: "M1",
        file: "page_M.1.pdf",
        fileByProject: {
          antenne: "page_M.1/page_M.1.html"
        }
      },
      {
        code: "M2",
        file: "page_M.2.pdf",
        fileByProject: {
          antenne: "page_M.2/page_M.2.html"
        }
      }
    ],
    description: "Garantir le bon fonctionnement d’un système dans le temps. Cela implique le diagnostic des défauts et la mise en place d’actions correctives ou préventives."
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
    folder: "Verifier",
    pages: [
      {
        code: "V1",
        file: "page_V1.pdf",
        fileByProject: {
          kah: "page_V1/page_V1.html",
          antenne: "page_V1/page_V1.html",
          robot: "page_V1/page_V1.html",
          "stage-geii": "page_V1/page_V1.html"
        }
      },
      {
        code: "V2",
        file: "page_V2.pdf",
        fileByProject: {
          kah: "page_V2/page_V2.html",
          antenne: "page_V2/page_V2.html",
          robot: "page_V2/page_V2.html"
        }
      }
    ],
    description: "Mettre en place des essais pour s’assurer que le système fonctionne comme attendu. Elle repose sur la mesure, l’analyse des résultats et la validation des performances."
  },
  rapports: {
    label: "Rapports SAE/STAGE",
    folder: "Rapports_SAE",
    pages: [
      {
        code: "Rapport",
        file: "dynamic",
        fileByProject: {
          antenne: "https://drive.google.com/file/d/1-AddneWWg2XKkzxwceeQVFbNgrUY3wCf/view?usp=sharing",
          kah: "https://drive.google.com/file/d/1jgv-VyILdzVyaOZriIrshre-1jDqz2r_/view?usp=sharing",
          "stage-geii": "https://drive.google.com/file/d/1jkNfST7_6v9dAMs87kIJfZfsCFZGfctS/view?usp=sharing"
        }
      } // Sera remplacé par le fichier spécifique du projet
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
      image: "../Projets/images/Antenne_HB9CV.jpeg",
      context: "SAE",
      year: "2025",
      tags: ["RF", "Simulation", "Mesures"],
      introTitle: "Contexte du projet",
      introSummary: "Projet de SAE consistant à concevoir une antenne directionnelle permettant de localiser la provenance d’un signal radio, dans un contexte réel de radiogoniométrie.",
      introDetails: [
        "Le cahier des charges imposait des contraintes concrètes : poids et encombrement réduits, budget limité, utilisation sur le terrain et compatibilité avec une tablette de réception.",
        "Mon travail a couvert le choix de l’architecture de l’antenne, la simulation de son comportement avant fabrication, le réglage pour limiter les pertes de signal entre l’antenne et le récepteur, puis la fabrication et les tests.",
        "L’objectif final était d’obtenir une antenne simple, robuste et réellement exploitable en conditions réelles."
      ]
    },
    {
      id: "kah",
      folderRoot: "../Projets/KAH",
      reportFile: "page_KAH.pdf",
      title: "Kart à Hélice",
      tagline: "Transmission infrarouge, schémas électriques, PCB, tests et corrections",
      image: "../Projets/images/KAH.jpeg",
      context: "SAE",
      year: "2024",
      tags: ["Électronique", "C++", "Transmission IR"],
      introTitle: "Contexte du projet",
      introSummary: "Kart a helice telecommande, avec transmission infrarouge et controle embarque.",
      introDetails: [
        "Conception electronique, programmation C++ et mise au point des commandes.",
        "Objectif : un systeme fiable et reactif pour piloter direction et vitesse."
      ]
    },
    {
      id: "robot",
      folderRoot: "../Projets/Robot_Sumo",
      reportFile: "page_Robot_sumo.pdf",
      title: "Robot Sumo autonome",
      tagline: "Détection adverse, stratégie embarquée, contrôle moteur",
      image: "../Projets/images/Robot_Sumo.jpeg",
      context: "SAE",
      year: "2024",
      tags: ["Électronique", "C++", "Capteurs"],
      introTitle: "Contexte du projet",
      introSummary: "Robot autonome de type sumo : detecter l'adversaire et optimiser la strategie.",
      introDetails: [
        "Integration de capteurs, algorithmes de decision et controle moteur.",
        "Objectif : un robot stable, rapide et capable de gagner des confrontations."
      ]
    },
    {
      id: "stage-geii",
      folderRoot: "../Projets/Stage_LOMA",
      reportFile: "page_Stage_BUT_GEII.pdf",
      title: "Asservissement nanométrique",
      tagline: "Self-mixing, traitement du signal, tests et calibration",
      image: "../Projets/images/Stage_LOMA.jpeg",
      context: "STAGE CNRS - LOMA",
      year: "2025",
      category: "professional",
      tags: ["Python", "Signal", "Lasers"],
      hideSkillDescriptions: true,
      introTitle: "Contexte du stage",
      introSummary: "Ce stage porte sur le développement d’un système de mesure de déplacement nanométrique par effet self-mixing, destiné à la stabilisation active d’un microscope optique.",
      introDetails: [
        "L’objectif principal est de valider expérimentalement un prototype sur un seul axe, en amont d’un futur système multi-axes basé sur trois lasers.",
        "Le dispositif repose sur une diode laser, un miroir piézoélectrique et une plateforme Red Pitaya, associés à un traitement du signal en temps réel sous Python et à une boucle d’asservissement PI."
      ]
    }
  ],
  skillsInfo: [
    { id: "concevoir", name: "Concevoir", summary: "Cahier des charges et conception." },
    { id: "verifier", name: "Vérifier", summary: "Tests et validation." },
    { id: "maintenir", name: "Maintenir", summary: "Maintenance et cycle de vie." },
    { id: "implanter", name: "Implanter", summary: "Réalisation et déploiement." },
    { id: "rapports", name: "Rapports SAE/STAGE", summary: "Documentation." }
  ]
};
