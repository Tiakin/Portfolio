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
                imageUrl: `${assets}/SmartDesk.png`
            },
            {
                id: 'panleuth',
                title: 'Panleuth',
                url: 'panleuth.com',
                favicon: `${assets}/Panleuth-icon.png`,
                isActive: false,
                imageUrl: `${assets}/Panleuth.png`
            },
            {
                id: 'miammiam',
                title: 'MiamMiam',
                url: 'miammiam.fr',
                favicon: `${assets}/Miammiam-icon.png`,
                isActive: false,
                imageUrl: `${assets}/Miammiam.png`
            },
            {
                id: 'transportdoux',
                title: 'Transport Doux',
                url: 'transport.doux',
                favicon: `${assets}/TransportDoux-icon.png`,
                isActive: false,
                imageUrl: `${assets}/TransportDoux.png`
            }        ];
        
        // Applications de la barre de tâches (écran droite)
        this.taskbarApps = [
            {
                id: 'saeavion',
                name: 'SAE Avion',
                icon: `${assets}/SAEAvion-icon.png`,
                isActive: true,
                imageUrl: `${assets}/SAEAvion.png`
            },
            {
                id: 'survie',
                name: 'Survie',
                icon: `${assets}/Survie-icon.png`,
                isActive: false,
                imageUrl: `${assets}/Survie.png`
            },
            {
                id: 'mtvehicles',
                name: 'MTVehicles',
                icon: `${assets}/MTVehicles-icon.jpg`,
                isActive: false,
                imageUrl: `${assets}/MTVehicles.png`
            }
        ];
        
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
        ctx.fillRect(0, 0, canvas.width, canvas.height);        if (screenId === 'affichage_g') {
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
    handleScreenClick(screenId, x, y = 0) {        
        if (screenId === 'affichage_g') {
            this.handleBrowserClick(x);
        } else if (screenId === 'affichage_d') {
            this.handleDesktopClick(x, y);
        }
    }

    /**
     * Gérer les clics sur le navigateur
     * @param {number} x - Position X normalisée (0-1)
     */
    handleBrowserClick(x) {
        const tabIndex = Math.floor(x * this.browserTabs.length);
        if (tabIndex >= 0 && tabIndex < this.browserTabs.length) {
            this.activeTabIndex = tabIndex;
            this.updateScreenContent('affichage_g');
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
    }
}
