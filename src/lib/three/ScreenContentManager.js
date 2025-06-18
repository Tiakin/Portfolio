import * as THREE from 'three';
import { assets } from '$app/paths';

/**
 * Gestionnaire de contenu pour les écrans dans la scène 3D
 * Permet d'afficher du contenu dynamique sur les meshes d'écran
 */
export class ScreenContentManager {
    constructor() {
        this.screenMeshes = new Map();
        this.canvases = new Map();
        this.textures = new Map();
        
        // Onglets du navigateur (écran gauche)
        this.browserTabs = [
            {
                id: 'smartdesk',
                title: 'SmartDesk',
                url: 'smartdesk.dev',
                favicon: `${assets}/SmartDesk-icon.png`,
                isActive: true,
                imageUrl: `${assets}/SmartDesk.png`,
                description: "Application web collaborative simulant un bureau connecté avec calendrier et widgets.",
                technologies: ["Svelte", "TailwindCSS", "JavaScript", "NodeJS", "MySQL", "Git"],
                skills: [
                    {
                    name: "Réaliser : Développer des applications informatiques simples",
                    description: "Création d'une application web avec composants dynamiques comme le calendrier et les widgets."
                    },
                    {
                    name: "Optimiser : Sélectionner les algorithmes adéquats pour répondre à un problème donné",
                    description: "Gestion des données des widgets et de leur affichage efficace."
                    },
                    {
                    name: "Administrer : Déployer des services dans une architecture réseau",
                    description: "Mise en ligne de l'application avec configuration d'un serveur et gestion des dépendances."
                    },
                    {
                    name: "Collaborer : Situer son rôle et ses missions au sein d’une équipe informatique",
                    description: "Travail en équipe de 4 avec répartition des tâches, intégration continue et gestion de version."
                    }
                ]
            },
            {
                id: 'panleuth',
                title: 'Panleuth',
                url: 'panleuth.com',
                favicon: `${assets}/Panleuth-icon.png`,
                isActive: false,
                imageUrl: `${assets}/Panleuth.png`,
                description: "Site fictif d'une université gratuite réalisé seul pour un cours d'anglais.",
                technologies: ["HTML", "CSS", "JavaScript", "Git", "Bootstrap", "Spline"],
                skills: [
                    {
                    name: "Réaliser : Développer des applications informatiques simples",
                    description: "Création d’un site vitrine complet avec contenu textuel en anglais."
                    },
                    {
                    name: "Optimiser : Appréhender et construire des algorithmes",
                    description: "Structure logique du contenu, navigation simple, responsive."
                    },
                    {
                    name: "Conduire : Identifier les besoins métiers des clients et des utilisateurs",
                    description: "Définir un message et une structure adaptés à un public cible fictif."
                    }
                ]
            },
            {
                id: 'miammiam',
                title: 'MiamMiam',
                url: 'miammiam.fr',
                favicon: `${assets}/Miammiam-icon.png`,
                isActive: false,
                imageUrl: `${assets}/Miammiam.png`,
                description: "Application de gestion de listes de courses développée en Symfony, avec fonctions collaboratives.",
                technologies: ["PHP", "Symfony", "Twig", "Bootstrap", "MySQL", "Git"],
                skills: [
                    {
                    name: "Réaliser : Partir des exigences et aller jusqu’à une application complète",
                    description: "Création d'une application fonctionnelle avec back-end, front-end et persistance."
                    },
                    {
                    name: "Gérer : Optimiser une base de données, interagir avec une application et mettre en œuvre la sécurité",
                    description: "Gestion des utilisateurs, listes et partages avec sécurisation des accès."
                    },
                    {
                    name: "Optimiser : Sélectionner les algorithmes adéquats pour répondre à un problème donné",
                    description: "Fonctions d'ajout intelligent, suggestions automatiques d’articles."
                    },
                    {
                    name: "Collaborer : Situer son rôle et ses missions au sein d’une équipe informatique",
                    description: "Développement en groupe avec Git et communication régulière sur les tâches."
                    }
                ]
            },
            {
                id: 'transportdoux',
                title: 'Transport Doux',
                url: 'transport.doux',
                favicon: `${assets}/TransportDoux-icon.png`,
                isActive: false,
                imageUrl: `${assets}/TransportDoux.png`,
                description: "Site de sensibilisation aux moyens de transport écologiques disponibles sur le campus de la Doua.",
                technologies: ["HTML", "CSS", "JavaScript", "Git"],
                skills: [
                    {
                    name: "Réaliser : Développer des applications informatiques simples",
                    description: "Création d’un site vitrine simple avec contenu informatif et visuel."
                    },
                    {
                    name: "Conduire : Identifier les besoins métiers des clients et des utilisateurs",
                    description: "Adapter le message pour informer et sensibiliser les étudiants à l'écologie."
                    },
                    {
                    name: "Collaborer : Situer son rôle et ses missions au sein d’une équipe informatique",
                    description: "Travail en équipe avec répartition des pages et intégration de contenus."
                    },
                    {
                    name: "Gérer : Concevoir et mettre en place une base de données à partir d’un cahier des charges client",
                    description: "Système simple de données, potentiellement en JSON ou statique, pour les infos transport."
                    }
                ]
            }];
        
        // Applications de la barre de tâches (écran droite)
        this.taskbarApps = [
            {
                id: 'saeavion',
                name: 'SAE Avion',
                icon: `${assets}/SAEAvion-icon.png`,
                isActive: true,
                imageUrl: `${assets}/SAEAvion.png`,
                title: 'SAE Avion',
                description: "SAE consistant à visualiser les trajectoires de vols et détecter les collisions aériennes grâce à la coloration d'un graphe.",
                technologies: ["Java", "Swing", "CSV","GraphStream","JXMapViewer2", "Git"],
                skills: [
                    {
                    name: "Réaliser : Partir des exigences et aller jusqu’à une application complète",
                    description: "Développement d’une interface et visualisation graphique complexe."
                    },
                    {
                    name: "Optimiser : Analyser et optimiser des applications",
                    description: "Algorithmes d’analyse de trajectoire et logique de détection de conflits."
                    },
                    {
                    name: "Conduire : Appliquer une démarche de suivi de projet en fonction des besoins métiers des clients et des utilisateurs",
                    description: "Mise en œuvre d’une SAE structurée avec itérations et validation."
                    },
                    {
                    name: "Collaborer : Situer son rôle et ses missions au sein d’une équipe informatique",
                    description: "Répartition technique et coordination sur l’intégration."
                    }
                ]
            },
            {
                id: 'survie',
                name: 'Survie',
                icon: `${assets}/Survie-icon.png`,
                isActive: false,
                imageUrl: `${assets}/Survie.png`,
                title: 'Survie',
                description: "Plugin Minecraft complet développé seul ajoutant blocs, systèmes de craft et mécaniques de survie.",
                technologies: ["Java", "Spigot API", "YAML", "Git"],
                skills: [
                    {
                    name: "Réaliser : Adapter des applications sur un ensemble de supports (embarqué, web, mobile, IoT…)",
                    description: "Développement dans un environnement contraint avec contraintes temps réel."
                    },
                    {
                    name: "Optimiser : Analyser et optimiser des applications",
                    description: "Optimisation des comportements, compatibilité serveur, gestion des ressources."
                    },
                    {
                    name: "Administrer : Déployer des services dans une architecture réseau",
                    description: "Déploiement du plugin sur des serveurs de jeu, configuration YAML."
                    },
                    {
                    name: "Conduire : Appliquer une démarche de suivi de projet en fonction des besoins métiers des clients et des utilisateurs",
                    description: "Design complet de gameplay et d’équilibrage, avec tests continus."
                    }
                ]
            },
            {
                id: 'mtvehicles',
                name: 'MTVehicles',
                icon: `${assets}/MTVehicles-icon.jpg`,
                isActive: false,
                imageUrl: `${assets}/MTVehicles.png`,
                title: 'MT Vehicles',
                description: "Plugin Minecraft de gestion de véhicules, je suis contributeur actif sur ce projet open source.",
                technologies: ["Java", "Spigot API", "YAML", "Git", "Gradle"],
                skills: [
                    {
                    name: "Réaliser : Partir des exigences et aller jusqu’à une application complète",
                    description: "Ajout de modules fonctionnels dans un code existant, participation active au projet."
                    },
                    {
                    name: "Optimiser : Sélectionner les algorithmes adéquats pour répondre à un problème donné",
                    description: "Améliorations de performances, gestion fine des comportements des véhicules."
                    },
                    {
                    name: "Administrer : Installer et configurer un poste de travail",
                    description: "Compilation, configuration de test, environnement de dev Minecraft."
                    },
                    {
                    name: "Collaborer : Situer son rôle et ses missions au sein d’une équipe informatique",
                    description: "Contribution open source, communication avec d'autres développeurs du projet."
                    }
                ]
            }
        ];
        
        // Application mobile (téléphone)
        this.mobileApp = {
            id: 'lyonguessr',
            title: 'LyonGuessr',
            name: 'LyonGuessr',
            description: "Jeu mobile inspiré de GeoGuessr basé sur la ville de Lyon, avec géolocalisation, scoring et photos.",
            technologies: ["Kotlin", "Google Maps API", "Firebase", "Android"],
            skills: [
                {
                name: "Réaliser : Adapter des applications sur un ensemble de supports (embarqué, web, mobile, IoT…)",
                description: "Application mobile multiplateforme avec carte, timer et gestion de l'état de jeu."
                },
                {
                name: "Optimiser : Sélectionner les algorithmes adéquats pour répondre à un problème donné",
                description: "Calcul des scores, distances, gestion des sessions."
                },
                {
                name: "Gérer : Optimiser une base de données, interagir avec une application et mettre en œuvre la sécurité",
                description: "Firebase pour stocker les données utilisateur et progression."
                },
                {
                name: "Conduire : Appliquer une démarche de suivi de projet en fonction des besoins métiers des clients et des utilisateurs",
                description: "Itérations sur le design UX, amélioration de l'expérience joueur."
                }
            ]
        };
        
        this.activeTabIndex = 0;
        this.activeAppIndex = 0;
        
        // Cache des images chargées
        this.loadedImages = new Map();
        this.loadImages();
    }
    
    /**
     * Charger toutes les images des projets
     */    loadImages() {
        // Charger les images des onglets
        this.browserTabs.forEach(tab => {
            const img = new Image();
            img.onload = () => {
                this.loadedImages.set(tab.imageUrl, img);
                // Mettre à jour l'affichage si c'est l'onglet actif
                if (this.browserTabs[this.activeTabIndex].id === tab.id) {
                    this.updateScreenContent('affichage_g');
                }
            };
            img.src = tab.imageUrl;
            
            // Charger aussi les favicons
            if (tab.favicon) {
                const iconImg = new Image();
                iconImg.onload = () => {
                    this.loadedImages.set(tab.favicon, iconImg);
                    this.updateScreenContent('affichage_g');
                };
                iconImg.src = tab.favicon;
            }
        });

        // Charger les images des applications
        this.taskbarApps.forEach(app => {
            const img = new Image();
            img.onload = () => {
                this.loadedImages.set(app.imageUrl, img);
                // Mettre à jour l'affichage si c'est l'application active
                if (this.taskbarApps[this.activeAppIndex].id === app.id) {
                    this.updateScreenContent('affichage_d');
                }
            };
            img.src = app.imageUrl;
            
            // Charger aussi les icônes d'applications
            if (app.icon) {
                const iconImg = new Image();
                iconImg.onload = () => {
                    this.loadedImages.set(app.icon, iconImg);
                    this.updateScreenContent('affichage_d');
                };
                iconImg.src = app.icon;
            }
        });

        // Charger l'image de démarrage Windows
        const startImg = new Image();
        startImg.onload = () => {
            this.loadedImages.set(`${assets}/windows-11.png`, startImg);
            // Mettre à jour l'affichage de l'écran droit
            this.updateScreenContent('affichage_d');
        };
        startImg.src = `${assets}/windows-11.png`;
    }

    /**
     * Enregistrer un mesh d'écran pour afficher du contenu
     * @param {string} screenId - Identifiant de l'écran
     * @param {THREE.Mesh} mesh - Le mesh de l'écran
     * @param {number} width - Largeur du canvas en pixels
     * @param {number} height - Hauteur du canvas en pixels
     */
    registerScreen(screenId, mesh, width = 512, height = 256) {
        // Créer un canvas pour dessiner le contenu
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
          // Créer une texture à partir du canvas
        const texture = new THREE.CanvasTexture(canvas);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.flipY = false;
        
        // Créer un matériau avec la texture
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true
        });
        
        // Appliquer le matériau au mesh
        if (mesh.material) {
            if (Array.isArray(mesh.material)) {
                // Si c'est un array de matériaux, remplacer le premier
                mesh.material[0] = material;
            } else {
                mesh.material = material;
            }
        }
        
        // Stocker les références
        this.screenMeshes.set(screenId, mesh);
        this.canvases.set(screenId, canvas);
        this.textures.set(screenId, texture);
        
        // Dessiner le contenu initial
        this.updateScreenContent(screenId);
    }    /**
     * Mettre à jour le contenu d'un écran
     * @param {string} screenId - Identifiant de l'écran
     */
    updateScreenContent(screenId) {
        const canvas = this.canvases.get(screenId);
        const texture = this.textures.get(screenId);
        
        if (!canvas || !texture) return;
        
        const ctx = canvas.getContext('2d');
        
        // Effacer le canvas
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        if (screenId === 'affichage_g') {
            this.drawBrowserLeftScreen(ctx, canvas);
        } else if (screenId === 'affichage_d') {
            this.drawWindowsRightScreen(ctx, canvas);
        }
        
        // Marquer la texture pour mise à jour
        texture.needsUpdate = true;
    }    /**
     * Dessiner le navigateur Chrome-like
     * @param {CanvasRenderingContext2D} ctx - Contexte du canvas
     * @param {HTMLCanvasElement} canvas - Canvas
     */    // Anciennes méthodes supprimées - remplacées par drawBrowserLeftScreen et drawWindowsRightScreen
      /**
     * Gérer les clics sur l'écran
     * @param {string} screenId - Identifiant de l'écran
     * @param {number} x - Position X normalisée (0-1)
     * @param {number} y - Position Y normalisée (0-1)
     */
    handleScreenClick(screenId, x, y) {        
        if (screenId === 'affichage_g') {
            this.handleBrowserClick(x, y);
        } else if (screenId === 'affichage_d') {
            this.handleDesktopClick(x, y);
        }
    }

    /**
     * Gérer les clics sur le navigateur
     * @param {number} x - Position X normalisée (0-1)
     * @param {number} y - Position Y normalisée (0-1)
     */
    handleBrowserClick(x, y) {
        const tabHeight = 35; // Hauteur de la barre d'onglets
        if( y < tabHeight / 720) {
            const tabIndex = Math.floor(x * this.browserTabs.length);
            if (tabIndex >= 0 && tabIndex < this.browserTabs.length) {
                this.activeTabIndex = tabIndex;
                this.updateScreenContent('affichage_g');
            }
        }
    }    /**
     * Gérer les clics sur le bureau Windows
     * @param {number} x - Position X normalisée (0-1)
     * @param {number} y - Position Y normalisée (0-1)
     */
    handleDesktopClick(x, y) {
        // Vérifier si le clic est dans la zone de la barre de tâches (en bas)
        const taskbarHeight = 40; // Même valeur que dans drawWindowsRightScreen
        const canvasHeight = 720; // Hauteur du canvas par défaut
        const taskbarZone = 1 - (taskbarHeight / canvasHeight); // Zone Y où commence la barre de tâches
        
        if (y >= taskbarZone) {
            // Clic dans la barre de tâches - calculer quelle application
            const startX = 45 / 1280; // Position du premier bouton app (45px sur canvas de 512px)
            const appWidth = 40 / 1280; // Largeur d'un bouton app (40px)
            const spacing = 5 / 1280; // Espacement entre boutons (5px)
            
            // Vérifier si le clic est dans la zone des applications
            if (x >= startX) {
                const relativeX = x - startX;
                const appIndex = Math.floor(relativeX / (appWidth + spacing));
                
                if (appIndex >= 0 && appIndex < this.taskbarApps.length) {
                    this.activeAppIndex = appIndex;
                    this.updateScreenContent('affichage_d');
                }
            }
        }
        // Si le clic n'est pas dans la barre de tâches, on ne fait rien (pas d'action sur l'image)
    }
    /**
     * Nettoyer les ressources
     */
    dispose() {
        this.textures.forEach(texture => texture.dispose());
        this.screenMeshes.clear();
        this.canvases.clear();
        this.textures.clear();
    }

    /**
     * Dessiner le navigateur pour l'écran de gauche (orientation correcte)
     * @param {CanvasRenderingContext2D} ctx - Contexte du canvas
     * @param {HTMLCanvasElement} canvas - Canvas
     */
    drawBrowserLeftScreen(ctx, canvas) {
        ctx.save();
        ctx.scale(1, 1);
        
        const tabHeight = 35;
        const addressBarHeight = 40;
        
        // Barre d'onglets
        ctx.fillStyle = '#f1f3f4';
        ctx.fillRect(0, 0, canvas.width, tabHeight);
        
        // Dessiner les onglets
        let tabX = 0;
        const tabWidth = canvas.width / this.browserTabs.length;
        
        this.browserTabs.forEach((tab, index) => {
            const isActive = index === this.activeTabIndex;
            
            // Fond de l'onglet
            ctx.fillStyle = isActive ? '#ffffff' : '#dadce0';
            ctx.fillRect(tabX, 0, tabWidth, tabHeight);
            
            // Bordure de l'onglet
            ctx.strokeStyle = '#dadce0';
            ctx.lineWidth = 1;
            ctx.strokeRect(tabX, 0, tabWidth, tabHeight);
              // Favicon et titre
            const faviconImg = this.loadedImages.get(tab.favicon);
            if (faviconImg) {
                // Dessiner l'icône réelle
                ctx.drawImage(faviconImg, tabX + 5, 10, 16, 16);
            } else {
                // Fallback si l'image n'est pas chargée
                ctx.fillStyle = '#202124';
                ctx.font = '12px Arial';
                ctx.textAlign = 'left';
                ctx.fillText('🌐', tabX + 8, 18);
            }
            
            ctx.fillStyle = '#202124';
            ctx.font = '12px Arial';
            ctx.textAlign = 'left';
            ctx.fillText(tab.title, tabX + 25, 22);
            
            tabX += tabWidth;
        });
        
        // Barre d'adresse
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, tabHeight, canvas.width, addressBarHeight);
        
        // Champ d'adresse
        const addressPadding = 10;
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(addressPadding, tabHeight + 8, canvas.width - addressPadding * 2, 24);
        
        ctx.strokeStyle = '#dadce0';
        ctx.lineWidth = 1;
        ctx.strokeRect(addressPadding, tabHeight + 8, canvas.width - addressPadding * 2, 24);
        
        // URL active
        const activeTab = this.browserTabs[this.activeTabIndex];
        ctx.fillStyle = '#5f6368';
        ctx.font = '11px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('🔒 ' + activeTab.url, addressPadding + 8, tabHeight + 22);
        
        // Zone de contenu
        const contentY = tabHeight + addressBarHeight;
        const contentHeight = canvas.height - contentY;
        
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, contentY, canvas.width, contentHeight);        // Afficher l'image du contenu
        const loadedImage = this.loadedImages.get(activeTab.imageUrl);        if (loadedImage) {
            // Dessiner l'image réelle en mode "cover" (remplit tout l'espace, peut être tronquée)
            const imgWidth = canvas.width;
            const imgHeight = contentHeight;
            const imgRatio = loadedImage.width / loadedImage.height;
            const containerRatio = imgWidth / imgHeight;
            
            let drawWidth, drawHeight, drawX, drawY;
            let sourceX = 0, sourceY = 0, sourceWidth = loadedImage.width, sourceHeight = loadedImage.height;
            
            if (imgRatio > containerRatio) {
                // Image plus large que le conteneur - on tronque les côtés
                drawWidth = imgWidth;
                drawHeight = imgHeight;
                drawX = 0;
                drawY = contentY;
                
                // Calculer quelle partie de l'image source utiliser
                const targetWidth = loadedImage.height * containerRatio;
                sourceX = (loadedImage.width - targetWidth) / 2;
                sourceWidth = targetWidth;            } else {
                // Image plus haute que le conteneur - on tronque le bas
                drawWidth = imgWidth;
                drawHeight = imgHeight;
                drawX = 0;
                drawY = contentY;
                
                // Calculer quelle partie de l'image source utiliser (garder le haut)
                const targetHeight = loadedImage.width / containerRatio;
                sourceHeight = targetHeight;
            }
            
            ctx.drawImage(loadedImage, sourceX, sourceY, sourceWidth, sourceHeight, drawX, drawY, drawWidth, drawHeight);
        } else {
            // Image pas encore chargée, afficher un placeholder
            ctx.fillStyle = '#f0f0f0';
            ctx.fillRect(20, contentY + 5, canvas.width, contentHeight);
            
            ctx.fillStyle = '#666';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Chargement...', canvas.width / 2, contentY + contentHeight / 2);
        }
        
        ctx.restore();
    }

    /**
     * Dessiner Windows pour l'écran de droite (orientation spécifique)
     * @param {CanvasRenderingContext2D} ctx - Contexte du canvas
     * @param {HTMLCanvasElement} canvas - Canvas
     */
    drawWindowsRightScreen(ctx, canvas) {
        // Pour l'écran de droite, on dessine dans l'orientation native du canvas
        // sans rotation complexe, juste adapté à son orientation physique
        ctx.save();
        ctx.scale(1, 1);        const taskbarHeight = 40; // Barre horizontale en bas
          // Image de l'application active qui prend tout l'écran sauf la barre de tâches
        if (this.activeAppIndex < this.taskbarApps.length) {
            const activeApp = this.taskbarApps[this.activeAppIndex];
            const loadedImage = this.loadedImages.get(activeApp.imageUrl);
            
            // Zone d'image qui prend tout l'écran sauf la barre de tâches
            const imageWidth = canvas.width;
            const imageHeight = canvas.height - taskbarHeight;
              if (loadedImage) {
                // Dessiner l'image réelle en mode "cover" (remplit tout l'espace, peut être tronquée)
                const imgRatio = loadedImage.width / loadedImage.height;
                const containerRatio = imageWidth / imageHeight;
                
                let drawWidth, drawHeight, drawX, drawY;
                let sourceX = 0, sourceY = 0, sourceWidth = loadedImage.width, sourceHeight = loadedImage.height;
                
                if (imgRatio > containerRatio) {
                    // Image plus large que le conteneur - on tronque les côtés
                    drawWidth = imageWidth;
                    drawHeight = imageHeight;
                    drawX = 0;
                    drawY = 0;
                    
                    // Calculer quelle partie de l'image source utiliser
                    const targetWidth = loadedImage.height * containerRatio;
                    sourceX = (loadedImage.width - targetWidth) / 2;
                    sourceWidth = targetWidth;                } else {
                    // Image plus haute que le conteneur - on tronque le bas
                    drawWidth = imageWidth;
                    drawHeight = imageHeight;
                    drawX = 0;
                    drawY = 0;
                    
                    // Calculer quelle partie de l'image source utiliser (garder le haut)
                    const targetHeight = loadedImage.width / containerRatio;
                    sourceHeight = targetHeight;
                }
                
                ctx.drawImage(loadedImage, sourceX, sourceY, sourceWidth, sourceHeight, drawX, drawY, drawWidth, drawHeight);
            } else {
                // Image pas encore chargée, afficher un placeholder
                ctx.fillStyle = '#f0f0f0';
                ctx.fillRect(0, 0, imageWidth, imageHeight);
                
                ctx.fillStyle = '#666';
                ctx.font = '16px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('Chargement...', canvas.width / 2, (canvas.height - taskbarHeight) / 2);
            }
        } else {
            // Si aucune app active, fond simple
            ctx.fillStyle = '#0078d4';
            ctx.fillRect(0, 0, canvas.width, canvas.height - taskbarHeight);
        }
        const appWidth = 40;
        
        // Barre de tâches horizontale en bas
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, canvas.height - taskbarHeight, canvas.width, taskbarHeight);
        
        // Bouton Démarrer (à gauche de la barre)
        ctx.fillStyle = '#0078d4';
        ctx.fillRect(5, canvas.height - taskbarHeight + 5, 30, 30);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        const startImg = this.loadedImages.get(`${assets}/windows-11.png`);
        if (startImg) {
            // Dessiner l'icône réelle
            const iconSize = 24;
            const iconX = (appWidth - iconSize) / 2;
            const iconY = canvas.height - taskbarHeight + 8;
            ctx.drawImage(startImg, iconX, iconY, iconSize, iconSize);
        } else {
            ctx.fillText('⊞', 20, canvas.height - taskbarHeight + 25);
        }
        // Applications dans la barre de tâches (horizontalement)
        let appX = 45;
        this.taskbarApps.forEach((app, index) => {
            const isActive = index === this.activeAppIndex;
            
            // Fond de l'application
            ctx.fillStyle = isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent';
            ctx.fillRect(appX, canvas.height - taskbarHeight + 5, appWidth, 30);
            
            if (isActive) {
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 1;
                ctx.strokeRect(appX, canvas.height - taskbarHeight + 5, appWidth, 30);
            }
              // Icône de l'application
            const iconImg = this.loadedImages.get(app.icon);
            if (iconImg) {
                // Dessiner l'icône réelle
                const iconSize = 24;
                const iconX = appX + (appWidth - iconSize) / 2;
                const iconY = canvas.height - taskbarHeight + 8;
                ctx.drawImage(iconImg, iconX, iconY, iconSize, iconSize);
            } else {
                // Fallback si l'image n'est pas chargée
                ctx.fillStyle = '#ffffff';
                ctx.font = '16px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('📱', appX + appWidth / 2, canvas.height - taskbarHeight + 25);
            }
            
            appX += appWidth + 5;
        });        // Zone système (à droite de la barre)
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'right';
        const time = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        ctx.fillText(time, canvas.width - 10, canvas.height - taskbarHeight + 24);
        
        ctx.restore();
    }    /**
     * Récupérer les informations détaillées du projet actuellement affiché
     * @param {string} screenId - Identifiant de l'écran ('affichage_g', 'affichage_d', ou 'affichage_mobile')
     * @returns {Object|null} Informations détaillées du projet ou null
     */
    getCurrentProjectInfo(screenId) {
        if (screenId === 'affichage_g') {
            // Écran gauche - retourner l'onglet actif
            if (this.activeTabIndex >= 0 && this.activeTabIndex < this.browserTabs.length) {
                const activeTab = this.browserTabs[this.activeTabIndex];
                return {
                    title: activeTab.title,
                    description: activeTab.description || '',
                    technologies: activeTab.technologies || [],
                    skills: activeTab.skills || [],
                    url: activeTab.projectUrl || activeTab.url || ''
                };
            }
        } else if (screenId === 'affichage_d') {
            // Écran droit - retourner l'application active
            if (this.activeAppIndex >= 0 && this.activeAppIndex < this.taskbarApps.length) {
                const activeApp = this.taskbarApps[this.activeAppIndex];
                return {
                    title: activeApp.title || activeApp.name,
                    description: activeApp.description || '',
                    technologies: activeApp.technologies || [],
                    skills: activeApp.skills || [],
                    url: activeApp.projectUrl || ''
                };
            }
        } else if (screenId === 'affichage_mobile') {
            // Téléphone mobile - retourner l'application mobile
            return {
                title: this.mobileApp.title,
                description: this.mobileApp.description || '',
                technologies: this.mobileApp.technologies || [],
                skills: this.mobileApp.skills || [],
                url: this.mobileApp.projectUrl || ''
            };
        }
        return null;
    }    /**
     * Déterminer quel écran est actuellement en interaction
     * @param {string} activeInteractionId - ID de l'interaction active
     * @returns {string|null} ID de l'écran en interaction ou null
     */
    getActiveScreenId(activeInteractionId) {
        if (activeInteractionId === 'affichage_g') {
            return 'affichage_g';
        } else if (activeInteractionId === 'affichage_d') {
            return 'affichage_d';
        } else if (activeInteractionId === 'affichage_mobile') {
            return 'affichage_mobile';
        }
        return null;
    }

    
}
