import * as THREE from 'three';

/**
 * Classe pour gérer les interactions avec des éléments interactifs de la scène
 * et les transitions de caméra associées
 */
export class InteractionManager {
    /**
     * @param {THREE.Camera} camera - La caméra à contrôler
     * @param {import('three/examples/jsm/controls/OrbitControls').OrbitControls} controls - Les controls OrbitControls à gérer
     */
    constructor(camera, controls) {
        this.camera = camera;
        this.controls = controls;
        this.isInteracting = false;
        this.activeInteraction = null;
        this.originalCameraPosition = null;
        this.originalCameraRotation = null;
        this.originalControlsTarget = null;
        this.originalControlsEnabled = null;
        this.interactions = new Map();
        
        // Durée de transition de la caméra en secondes
        this.transitionDuration = 1.0;
        
        // Bind des méthodes
        this.handleKeyDown = this.handleKeyDown.bind(this);
        
        // Ajouter l'écouteur d'événements pour la touche Échap
        window.addEventListener('keydown', this.handleKeyDown);
    }
      /**
     * Ajouter une nouvelle interaction possible
     * @param {string} id - Identifiant unique de l'interaction
     * @param {Object} config - Configuration de l'interaction
     * @param {THREE.Vector3} config.cameraPosition - Position cible de la caméra
     * @param {THREE.Euler|Object} config.cameraRotation - Rotation cible de la caméra
     * @param {THREE.Vector3} [config.controlsTarget] - Cible optionnelle pour les OrbitControls
     * @param {Function} config.onEnter - Fonction appelée quand l'interaction commence
     * @param {Function} config.onExit - Fonction appelée quand l'interaction se termine
     */
    addInteraction(id, config) {
        this.interactions.set(id, {
            cameraPosition: config.cameraPosition || new THREE.Vector3(0, 0, 5),
            cameraRotation: config.cameraRotation || new THREE.Euler(0, 0, 0),
            controlsTarget: config.controlsTarget,
            onEnter: config.onEnter || (() => {}),
            onExit: config.onExit || (() => {})
        });
    }    /**
     * Démarrer une interaction
     * @param {string} id - Identifiant de l'interaction à démarrer
     */
    startInteraction(id) {
        if (this.isInteracting || !this.interactions.has(id)) return;
        
        const interaction = this.interactions.get(id);
        
        // Enregistrer l'état initial de la caméra et des contrôles
        this.originalCameraPosition = this.camera.position.clone();
        this.originalCameraRotation = this.camera.rotation.clone();
        this.originalControlsTarget = this.controls.target.clone();
        this.originalControlsEnabled = this.controls.enabled;
        
        // Désactiver les contrôles de la caméra pendant la transition
        this.controls.enabled = false;
        
        // Démarrer la transition de la caméra
        this.transitionCamera(
            interaction.cameraPosition,
            interaction.cameraRotation,
            this.transitionDuration,
            null, // onComplete callback
            interaction.controlsTarget // Passer la cible des contrôles si définie
        );
        
        // Marquer comme en interaction
        this.isInteracting = true;
        this.activeInteraction = id;
        
        // Exécuter le callback onEnter
        interaction.onEnter();
    }    /**
     * Arrêter l'interaction en cours
     */
    stopInteraction() {
        if (!this.isInteracting || !this.activeInteraction) return;
        
        const interaction = this.interactions.get(this.activeInteraction);
        
        // Exécuter le callback onExit
        interaction.onExit();
        
        // Transition de retour à la position originale
        this.transitionCamera(
            this.originalCameraPosition,
            this.originalCameraRotation,
            this.transitionDuration,
            // Callback à la fin de la transition
            () => {
                // Restaurer l'état d'activation des contrôles
                this.controls.enabled = this.originalControlsEnabled !== null ? 
                    this.originalControlsEnabled : true;
                
                // S'assurer que les contrôles sont mis à jour
                this.controls.update();
                
                // Réinitialiser l'état
                this.isInteracting = false;
                this.activeInteraction = null;
                this.originalControlsTarget = null;
                this.originalControlsEnabled = null;
            },
            // Passer la cible originale des contrôles pour la transition
            this.originalControlsTarget
        );
    }    /**
     * Animer une transition de caméra
     * @param {THREE.Vector3} targetPosition - Position cible
     * @param {THREE.Euler|Object} targetRotation - Rotation cible
     * @param {number} duration - Durée en secondes
     * @param {Function} [onComplete] - Callback à la fin de la transition
     * @param {THREE.Vector3} [controlsTarget] - Cible optionnelle pour OrbitControls
     */
    transitionCamera(targetPosition, targetRotation, duration, onComplete = null, controlsTarget = null) {
        const startPosition = this.camera.position.clone();
        const startRotation = this.camera.rotation.clone();
        
        // Convertir la rotation cible en Euler si nécessaire
        const targetEuler = targetRotation instanceof THREE.Euler 
            ? targetRotation 
            : new THREE.Euler(
                targetRotation.x || 0,
                targetRotation.y || 0,
                targetRotation.z || 0
            );
        
        // Calculer la nouvelle cible pour OrbitControls
        // Si une cible spécifique est fournie, l'utiliser, sinon calculer un point devant la caméra
        let targetPoint;
        if (controlsTarget) {
            targetPoint = controlsTarget;
        } else {
            const targetDirection = new THREE.Vector3(0, 0, -1).applyEuler(targetEuler);
            targetPoint = targetPosition.clone().add(targetDirection.multiplyScalar(5));
        }
        
        // Enregistrer la cible actuelle des contrôles
        const startTarget = this.controls.target.clone();
        
        const startTime = Date.now();
        const endTime = startTime + duration * 1000;
        
        const animate = () => {
            const now = Date.now();
            const progress = Math.min(1, (now - startTime) / (endTime - startTime));
            
            if (progress < 1) {
                // Position de la caméra
                this.camera.position.lerpVectors(startPosition, targetPosition, progress);
                
                // Rotation (interpolation directe pour la rotation)
                this.camera.rotation.x = startRotation.x + (targetEuler.x - startRotation.x) * progress;
                this.camera.rotation.y = startRotation.y + (targetEuler.y - startRotation.y) * progress;
                this.camera.rotation.z = startRotation.z + (targetEuler.z - startRotation.z) * progress;
                
                // Interpolation de la cible des OrbitControls
                this.controls.target.lerpVectors(startTarget, targetPoint, progress);
                
                // Continuer l'animation
                requestAnimationFrame(animate);
            } else {
                // Fin de l'animation - s'assurer que nous sommes exactement à la position/rotation cible
                this.camera.position.copy(targetPosition);
                this.camera.rotation.copy(targetEuler);
                this.controls.target.copy(targetPoint);
                
                // Mise à jour finale des contrôles
                this.controls.update();
                
                // Si nous sommes en mode interactif, réactiver les contrôles
                if (this.isInteracting) {
                    this.controls.enabled = false;
                }
                
                // Exécuter le callback si fourni
                if (onComplete) onComplete();
            }
        };
        
        // Démarrer l'animation
        animate();
    }
    
    /**
     * Gérer l'événement keydown pour détecter la touche Échap
     * @param {KeyboardEvent} event - L'événement keydown
     */
    handleKeyDown(event) {
        // Sortir de l'interaction si la touche Échap est pressée
        if (event.key === 'Escape' && this.isInteracting) {
            this.stopInteraction();
        }
    }
      /**
     * Libérer les ressources
     */
    dispose() {
        // Supprimer les écouteurs d'événements
        window.removeEventListener('keydown', this.handleKeyDown);
        
        // Si une interaction est en cours, la stopper proprement
        if (this.isInteracting) {
            this.stopInteraction();
        }
        
        // Nettoyer les références
        this.camera = null;
        this.controls = null;
        this.originalCameraPosition = null;
        this.originalCameraRotation = null;
        this.originalControlsTarget = null;
        this.interactions.clear();
    }
}
