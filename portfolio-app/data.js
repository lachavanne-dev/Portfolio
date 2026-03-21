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
          "stage-geii": "page_C.1:C.2/page_C.1:C.2.html",
          "ptut-meteores": "page_C.1:C.2/page_C.1:C.2.html"
        }
      },
      {
        code: "C3/C4.1",
        file: "page_C.3:4.1.pdf", // Supposé pdf
        fileByProject: {
          antenne: "page_C.3:4.1/page_C.3:4.1.html",
          kah: "page_C.3:4.1/page_C.3:4.1.html",
          robot: "page_C.3:4.1/page_C.3:4.1.html",
          "ptut-meteores": "page_C.3:4.1/page_C.3:4.1.html"
        }
      },
      {
        code: "C4.2",
        file: "page_C.4.2.pdf",
        fileByProject: {
          "ptut-meteores": "page_C.4.2/page_C.4.2.html"
        }
      }        // Supposé pdf
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
          "stage-geii": "page_V1/page_V1.html",
          "ptut-meteores": "page_V1/page_V1.html"
        }
      },
      {
        code: "V2",
        file: "page_V2.pdf",
        fileByProject: {
          kah: "page_V2/page_V2.html",
          antenne: "page_V2/page_V2.html",
          robot: "page_V2/page_V2.html",
          "ptut-meteores": "page_V2/page_V2.html"
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
      id: "minifollow",
      folderRoot: "../Projets/MiniFollow",
      title: "MiniFollow",
      tagline: "Produit de suivi autonome DJI développé, distribué et commercialisé dans le cadre de ma micro-entreprise",
      image: "assets/minifollow.svg",
      videoPreview: "../Projets/MiniFollow/media/demo-minifollow.mp4",
      context: "PROJET PRODUIT",
      year: "2025-2026",
      category: "entrepreneurial",
      tags: ["Android", "Kotlin", "Vision temps réel", "Node.js", "Cloud"],
      introTitle: "Système logiciel complet pour drone DJI Mini",
      introSummary: "MiniFollow est un produit distribué hors Play Store, que je développe dans le cadre de ma micro-entreprise comme une chaîne logicielle complète : acquisition utilisateur, distribution d'APK, activation Premium, suivi autonome et télémétrie minimale.",
      introDetails: [
        "Le cœur du projet est une application Android native qui transforme le flux vidéo DJI en commandes de vol temps réel grâce à la détection de personne, au lissage du tracking, au calcul PID et au virtual stick.",
        "Au-delà du développement technique, je porte aussi MiniFollow comme un vrai produit : distribution, mises à jour, licensing, parcours commercial et informations légales sont intégrés à une démarche de micro-entreprise.",
        "Autour de cette application, j'ai construit un backend Cloud Run qui gère les licences Premium, les webhooks Lemon Squeezy, l'émission de tokens signés pour un usage hors ligne et la télémétrie produit.",
        "Le site statique complète l'ensemble en servant la landing page, la distribution du dernier APK, les informations de compatibilité et le parcours commercial."
      ],
      caseStudy: {
        subtitle: "Vue d'ensemble d'un produit développé et commercialisé dans le cadre de ma micro-entreprise, avec son architecture et un aperçu vidéo intégré à mon portfolio.",
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
          { label: "Cadre", value: "Micro-entreprise" },
          { label: "Architecture", value: "App + backend + site" },
          { label: "Temps réel", value: "Tracking vidéo + PID" },
          { label: "Distribution", value: "APK direct hors Play Store" }
        ],
        highlights: [
          "Projet porté dans le cadre de ma micro-entreprise, de la construction du produit jusqu'à sa distribution et son licensing.",
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
        closing: "MiniFollow est l'un des projets les plus transversaux de mon parcours : il relie vision temps réel, intégration hardware, architecture backend, logique produit et démarche entrepreneuriale portée dans le cadre de ma micro-entreprise."
      }
    },
    {
      id: "ptut-meteores",
      folderRoot: "../Projets/Projet_Tutore",
      title: "Radiodétection de météores",
      tagline: "Radar GRAVES, acquisition CI-V et analyse Doppler sur 143,050 MHz",
      image: "../Projets/Projet_Tutore/images/ptut-card.png",
      cardBackground: {
        src: "../Projets/Projet_Tutore/images/ptut-card.png",
        size: "120%",
        position: "50% 100%",
        offsetX: "-10px",
        offsetY: "0px"
      },
      context: "PROJET TUTORÉ",
      year: "2026",
      category: "tutored",
      tags: ["Python", "Radio", "Signal", "Trigger", "Doppler"],
      introTitle: "Chaîne de radiodétection et d'analyse d'événements transitoires",
      introSummary: "Ce projet tutoré vise à détecter, enregistrer et analyser des météores via le radar GRAVES autour de 143,050 MHz, en transformant une simple observation radio en une mesure horodatée, rejouable et exploitable.",
      introDetails: [
        "Le point de départ est une limite d'instrumentation : le récepteur IC-705 permet d'observer le spectre et la waterfall, mais pas de sauvegarder proprement des événements brefs pour les analyser a posteriori.",
        "Avec mes coéquipiers, nous avons donc construit une chaîne complète de mesure : réception radio, récupération des trames CI-V via wfview, transport réseau en TCP, décodage Python, affichage temps réel, enregistrement CSV et relecture comme une vidéo.",
        "L'ensemble permet de détecter automatiquement des événements transitoires, de les calibrer en dBm, d'extraire leurs signatures Doppler et d'envisager une corrélation avec d'autres sources comme FRIPON."
      ],
      caseStudy: {
        subtitle: "Projet d'instrumentation radio réalisé en équipe, centré sur la capture et l'analyse d'événements météoriques transitoires.",
        media: {
          type: "image",
          src: "../Projets/Projet_Tutore/images/ptut-card.png",
          title: "Signature Doppler",
          alt: "Waterfall montrant une signature Doppler liée à un événement transitoire",
          caption: "Exemple de signature fréquentielle structurée exploitée pour l'interprétation physique d'un événement détecté."
        },
        gallery: [
          {
            src: "../Projets/Projet_Tutore/images/slide-05.png",
            title: "Chaîne d'instrumentation",
            caption: "Architecture matérielle et flux de données entre antenne, IC-705, wfview et application Python."
          },
          {
            src: "../Projets/Projet_Tutore/images/slide-07.png",
            title: "Application temps réel",
            caption: "Visualisation simultanée du spectre et de la waterfall avec une résolution de 475 points."
          },
          {
            src: "../Projets/Projet_Tutore/images/slide-09.png",
            title: "Relecture CSV",
            caption: "Outil de relecture, mesure et export développé pour rejouer une capture comme une vidéo."
          },
          {
            src: "../Projets/Projet_Tutore/images/slide-11.png",
            title: "Mode trigger",
            caption: "Capture automatique avec seuil, buffers avant/après événement et nommage utile des fichiers."
          }
        ],
        stats: [
          { label: "Fréquence", value: "143,050 MHz" },
          { label: "Acquisition", value: "475 points / trame" },
          { label: "Workflow", value: "Réception → CSV → relecture" }
        ],
        highlights: [
          "Transformation d'un affichage opérateur en une chaîne de mesure exploitable et horodatée.",
          "Développement d'une application Python de décodage, visualisation, enregistrement et relecture.",
          "Analyse d'événements transitoires par calibration, trigger et interprétation Doppler."
        ],
        sections: [
          {
            title: "Contexte et instrumentation",
            paragraphs: [
              "L'objectif était de dépasser les limites du scope embarqué de l'IC-705 pour enregistrer fidèlement des événements courts, impossibles à analyser sérieusement sans sauvegarde continue et horodatée.",
              "La chaîne d'instrumentation s'appuie sur le radar GRAVES en réception, l'IC-705 pour l'acquisition, wfview comme passerelle CI-V/TCP, puis une application Python chargée du décodage, du traitement et de l'exploitation des trames."
            ]
          },
          {
            title: "Traitement des données",
            paragraphs: [
              "Avec mes coéquipiers, nous avons développé une interface temps réel affichant le spectre et la waterfall sur un span de 5 kHz autour de 143,050 MHz. Chaque trame est enregistrée en CSV avec horodatage, paramètres et 475 points spectraux.",
              "Ce format rend la mesure rejouable, mesurable et exportable. Un lecteur dédié permet ensuite de naviguer dans les captures, de positionner des marqueurs et d'exporter une waterfall complète sur toute la durée de l'événement."
            ]
          },
          {
            title: "Détection et résultats",
            paragraphs: [
              "Le mode trigger surveille la valeur maximale du spectre et déclenche automatiquement une capture lorsque le seuil est dépassé, en conservant un buffer avant et après l'événement pour ne pas perdre le contexte.",
              "Les résultats montrent des événements nets au-dessus du bruit, avec des signatures Doppler mesurables et parfois des élargissements spectraux compatibles avec des phénomènes de fragmentation. Le projet ouvre naturellement vers un tri plus robuste et des corrélations multi-sources."
            ]
          }
        ],
        closing: "Ce projet m'a permis de relier radio, instrumentation, traitement du signal et développement logiciel autour d'un cas réel de détection d'événements transitoires."
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
    },
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
    }
  ],
  skillsInfo: [
    { id: "concevoir", name: "Concevoir", summary: "Cahier des charges et conception." },
    { id: "verifier", name: "Vérifier", summary: "Tests et validation." },
    { id: "maintenir", name: "Maintenir", summary: "Maintenance et cycle de vie." },
    { id: "implanter", name: "Implanter", summary: "Réalisation et déploiement." }
  ]
};
