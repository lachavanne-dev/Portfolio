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
      id: "minifollow",
      folderRoot: "../Projets/MiniFollow",
      title: "MiniFollow",
      tagline: "Produit complet de suivi autonome DJI : application Android, backend licensing et site de distribution",
      image: "assets/minifollow.svg",
      videoPreview: "../Projets/MiniFollow/media/demo-minifollow.mp4",
      context: "PROJET PRODUIT",
      year: "2025-2026",
      category: "personal",
      tags: ["Android", "Kotlin", "Vision temps réel", "Node.js", "Cloud"],
      introTitle: "Système logiciel complet pour drone DJI Mini",
      introSummary: "MiniFollow est un produit distribué hors Play Store, pensé comme une chaîne logicielle complète : acquisition utilisateur, distribution d'APK, activation Premium, suivi autonome et télémétrie minimale.",
      introDetails: [
        "Le cœur du projet est une application Android native qui transforme le flux vidéo DJI en commandes de vol temps réel grâce à la détection de personne, au lissage du tracking, au calcul PID et au virtual stick.",
        "Autour de cette application, j'ai construit un backend Cloud Run qui gère les licences Premium, les webhooks Lemon Squeezy, l'émission de tokens signés pour un usage hors ligne et la télémétrie produit.",
        "Le site statique complète l'ensemble en servant la landing page, la distribution du dernier APK, les informations de compatibilité et le parcours commercial."
      ],
      caseStudy: {
        subtitle: "Vue d'ensemble du produit, de son architecture et d'un aperçu vidéo intégré à mon portfolio.",
        site: {
          href: "https://minifollow.app/",
          label: "Consulter le site MiniFollow",
          meta: "Landing page, téléchargement APK et informations produit"
        },
        media: {
          src: "../Projets/MiniFollow/media/demo-minifollow.mp4",
          title: "Aperçu vidéo",
          caption: "Démonstration courte de l'interface et du fonctionnement global de MiniFollow."
        },
        stats: [
          { label: "Architecture", value: "App + backend + site" },
          { label: "Temps réel", value: "Tracking vidéo + PID" },
          { label: "Distribution", value: "APK direct hors Play Store" }
        ],
        highlights: [
          "Pipeline temps réel complet : flux vidéo DJI, détection ML Kit, lissage du tracking puis commandes virtual stick.",
          "Produit logiciel complet avec site de distribution, backend de licences et mode Premium utilisable hors ligne.",
          "Approche robuste face aux variations DJI Mini grâce à des fallbacks et des mécanismes de compatibilité."
        ],
        sections: [
          {
            title: "Application mobile",
            paragraphs: [
              "L'application Android native en Kotlin et Jetpack Compose pilote le drone en temps réel à partir du flux vidéo. Le pipeline exploite le retour vidéo DJI, la détection de personne avec ML Kit, le suivi de cible et un contrôle PID pour ajuster la trajectoire via virtual stick.",
              "Ce travail m'a amené à gérer des contraintes concrètes de compatibilité Android, de fragmentation des modèles DJI Mini et de fiabilité d'un SDK propriétaire ancien."
            ]
          },
          {
            title: "Backend et licensing",
            paragraphs: [
              "Le backend Node.js/Express sur Cloud Run gère les activations, validations, désactivations et révocations de licences Premium. Il reçoit les webhooks Lemon Squeezy, résout les purchase tokens et émet des tokens RS256 pour autoriser l'usage hors ligne dans l'application.",
              "Cette couche relie paiement, licensing, télémétrie et expérience utilisateur, tout en restant volontairement simple et concentrée sur la valeur métier."
            ]
          },
          {
            title: "Site et distribution",
            paragraphs: [
              "Le site statique sert la landing page, le téléchargement de l'APK, les informations légales et le flux de mise à jour de l'application. Il fait partie du produit, car il gère l'entrée commerciale et la distribution des releases.",
              "L'ensemble montre ma capacité à concevoir un système cohérent de bout en bout, depuis l'expérience web jusqu'au logiciel mobile embarqué et au backend cloud."
            ]
          }
        ],
        closing: "MiniFollow est l'un des projets les plus transversaux de mon parcours : il relie vision temps réel, intégration hardware, architecture backend et logique produit."
      }
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
    { id: "implanter", name: "Implanter", summary: "Réalisation et déploiement." }
  ]
};
