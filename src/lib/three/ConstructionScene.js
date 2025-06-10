import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';

// Importer nos classes custom
import { PianoSampler } from './PianoSampler.js';
import { InteractionManager } from './InteractionManager.js';



export function createConstructionScene(container) {
    // Créer une instance de notre classe PianoSampler
    const pianoSampler = new PianoSampler();
    
    // Initialiser l'audio dès que l'utilisateur clique sur le conteneur
    container.addEventListener('click', async () => {
        try {
            await pianoSampler.initTone();
        } catch (e) {
            console.warn("Impossible d'initialiser l'audio automatiquement:", e);
        }
    }, { once: true });

    // Scène
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(4, 4, 8);
    const renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        precision: 'highp',
        powerPreference: 'high-performance',
        stencil: false
    });
    
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.physicallyCorrectLights = true;
    container.appendChild(renderer.domElement);
    
    // Contrôles orbitaux pour une navigation plus facile
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 3;
    controls.maxDistance = 10;
    controls.maxPolarAngle = Math.PI / 2;
    
    // Gestionnaire d'interactions pour les objets interactifs
    const interactionManager = new InteractionManager(camera, controls);    // Configurer l'interaction avec le piano
    interactionManager.addInteraction('piano', {
        cameraPosition: new THREE.Vector3(-3.18, 0.5, -2.5),
        cameraRotation: new THREE.Euler(0, 0, 0),
        // Définir une cible pour OrbitControls - le centre approximatif du piano
        controlsTarget: new THREE.Vector3(-3.18, 0, -2.6),
        onEnter: () => {
            console.log("Mode piano activé");
            // Actions spécifiques quand on entre en mode piano
            controls.minDistance = 1.5;     // Permettre un zoom plus proche en mode piano
            controls.maxDistance = 5;       // Limiter le zoom arrière
            controls.enableDamping = true;  // S'assurer que l'atténuation est activée
            controls.dampingFactor = 0.1;   // Atténuation plus prononcée pour plus de fluidité
        },
        onExit: () => {
            console.log("Mode piano désactivé");
            // Restaurer les limites originales des contrôles
            controls.minDistance = 3;
            controls.maxDistance = 10;
            controls.dampingFactor = 0.05;  // Restaurer l'atténuation d'origine
        }
    });

    // Lumières
    // Ajout d'une lumière ambiante pour l'éclairage global
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // pointLight
    const pointLight = new THREE.PointLight(0xffffff, 7, 0, 0);
    pointLight.position.set(1, 3, 1);
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 2048;
    pointLight.shadow.mapSize.height = 2048;
    pointLight.shadow.bias = -0.0001;
    scene.add(pointLight);
    // Helper
    const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.5);
    scene.add(pointLightHelper);

    // rectAreaLight
    const rectLight = new THREE.RectAreaLight(0xffffff, 10, 2, 2);
    rectLight.position.set(-3, 1.5, -3.5);
    rectLight.rotation.y = -Math.PI;
    scene.add(rectLight);

    // Helper
    const rectLightHelper = new RectAreaLightHelper(rectLight);
    rectLight.add(rectLightHelper);

    // Chargeur GLTF
    const loader = new GLTFLoader();
    let model;

    // Fonction de chargement du modèle
    loader.load(
        '/Portfolio/portfolio.glb',
        (gltf) => {
            model = gltf.scene;

            model.position.set(0, 0, 0);
            model.rotation.y = 0;
            // Appliquer les ombres à tous les objets du modèle sauf les touches du piano
            model.traverse((object) => {
                if (object.isMesh) {
                    try {
                        // Utiliser la fonction utilitaire de la classe PianoSampler pour nettoyer le nom
                        const cleanedName = pianoSampler.cleanNoteName(object.name);

                        // Vérifier si c'est une touche de piano (format: note+octave, comme C4, F#3, etc.)
                        const isPianoKey = cleanedName && /^([A-G]#?)([1-6])$/.test(cleanedName);

                        if (isPianoKey) {
                            // Désactiver les ombres pour les touches du piano
                            object.castShadow = false;
                            object.receiveShadow = false;

                            // Créer un matériau original et un matériau pour l'état "enfoncé"
                            const originalMaterial = object.material.clone();
                            const pressedMaterial = object.material.clone();

                            // Le matériau pour l'état enfoncé est légèrement plus foncé et plus bleu
                            if (cleanedName.includes('#')) {
                                // Touche noire (dièse)
                                pressedMaterial.color.setRGB(0.1, 0.1, 0.2);
                            } else {
                                // Touche blanche
                                pressedMaterial.color.setRGB(0.1, 0.1, 1);
                            }

                            // Rendre la touche interactive et stocker toutes les informations nécessaires
                            object.userData = {
                                originalMaterial,
                                pressedMaterial,
                                isPlaying: false,
                                // Stocker le nom nettoyé pour référence ultérieure
                                cleanName: cleanedName,
                                interactive: true
                            };
                        } else {
                            // Pour les autres objets, activer les ombres
                            object.castShadow = true;
                            object.receiveShadow = true;
                        }
                    } catch (error) {
                        console.warn("Erreur lors du traitement de l'objet", object.name, ":", error);
                    }

                    // Rendre l'objet interactif
                    object.userData.interactive = true;
                } else {
                    // Activer les ombres pour tous les autres objets
                    object.castShadow = true;
                    object.receiveShadow = true;
                }
            }
            );

            // Ajouter un gestionnaire de clic sur le modèle
            const raycaster = new THREE.Raycaster();
            const mouse = new THREE.Vector2();            // Fonction pour jouer une note sur le piano
            const playPianoNote = (object) => {
                if (!object.userData || !object.userData.interactive) return;
                
                // Utiliser le nom nettoyé stocké dans userData
                const note = object.userData.cleanName || pianoSampler.cleanNoteName(object.name);
                
                if (note) {
                    // Jouer la note avec notre sampler
                    pianoSampler.noteOn(note, 0.7);
                    
                    // Changer le matériau pour montrer visuellement que la touche est enfoncée
                    if (object.userData.isPlaying === false && object.userData.pressedMaterial) {
                        // Sauvegarder le matériau actuel si ce n'est pas déjà fait
                        if (!object.userData.originalMaterial) {
                            object.userData.originalMaterial = object.material.clone();
                        }
                        
                        // Appliquer le matériau "enfoncé"
                        object.material = object.userData.pressedMaterial;
                        object.userData.isPlaying = true;
                        
                        // Après un délai, relever la touche
                        setTimeout(() => {
                            // Relâcher la note
                            pianoSampler.noteOff(note);
                            
                            // Restaurer le matériau original
                            object.material = object.userData.originalMaterial;
                            object.userData.isPlaying = false;
                        }, 500); // Relâcher après 500ms
                    }
                }
            };

            container.addEventListener('click', (event) => {
                // Normaliser les coordonnées de la souris (-1 à 1)
                const rect = container.getBoundingClientRect();
                mouse.x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
                mouse.y = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;

                // Lancer un rayon depuis la caméra à travers le point de la souris
                raycaster.setFromCamera(mouse, camera);
                // Vérifier les intersections avec les touches du piano
                const intersects = raycaster.intersectObjects(model.children, true);

                if (intersects.length > 0) {
                    const object = intersects[0].object;
                    
                    // Si c'est une touche de piano et que nous ne sommes pas déjà en mode interactif
                    if (object.userData && object.userData.cleanName && !interactionManager.isInteracting) {
                        // Activer le mode piano
                        interactionManager.startInteraction('piano');
                    } else if (interactionManager.isInteracting && 
                              interactionManager.activeInteraction === 'piano') {
                        // Si nous sommes déjà en mode piano, jouer la note
                        playPianoNote(object);
                    }
                }
            });

            scene.add(model);
        },
        (error) => {
            console.error('Une erreur est survenue lors du chargement du modèle', error);
        }
    );
    // Resize
    const resizeHandler = () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
        composer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', resizeHandler);    // Configuration du post-processing pour un rendu proche du ray tracing
    const composer = new EffectComposer(renderer);

    // Rendu de base
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // Anti-aliasing SMAA pour des bords plus doux
    const smaaPass = new SMAAPass(window.innerWidth, window.innerHeight);
    composer.addPass(smaaPass);

    function animate() {
        requestAnimationFrame(animate);

        // Mettre à jour les contrôles (important pour l'effet d'atténuation)
        controls.update();
        
        // Utiliser le composer au lieu de renderer pour appliquer tous les effets
        composer.render();
    }

    // Start animation
    animate();    // Return cleanup function
    return {
        dispose: () => {
            cancelAnimationFrame();
            window.removeEventListener('resize', resizeHandler);
            
            // Libérer les ressources du piano
            pianoSampler.dispose();
            
            // Libérer les ressources du gestionnaire d'interaction
            interactionManager.dispose();

            controls.dispose();
            renderer.dispose();

            // Clean up resources
            scene.traverse((obj) => {
                if (obj.geometry) obj.geometry.dispose();
                if (obj.material) {
                    if (Array.isArray(obj.material)) {
                        obj.material.forEach(m => m.dispose());
                    } else {
                        obj.material.dispose();
                    }
                }
            });

            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        },
        resize: resizeHandler
    };
}
