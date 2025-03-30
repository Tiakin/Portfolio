import * as THREE from 'three';

export function createConstructionScene(container) {
    // Scène
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();

    const createTextMesh = (text, height, color, emissive, size = 1) => {
        const textGroup = new THREE.Group();
        const letter_spacing = 0.8 * size;

        // Séparation des lettres
        const letters = text.split('');
        const totalWidth = letters.length * letter_spacing;

        letters.forEach((letter, i) => {
            const canvas = document.createElement('canvas');
            canvas.width = 256; 
            canvas.height = 256;
            const ctx = canvas.getContext('2d');

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#ffffff'; // couleur de base
            ctx.font = 'bold 120px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Effet de halo
            ctx.shadowColor = emissive;
            ctx.shadowBlur = 20;
            ctx.fillText(letter, 128, 128);

            // Texture
            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;

            // Material
            const material = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                color: color,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            });

            const letterGeometry = new THREE.PlaneGeometry(size * 1.2, size * 1.2);
            const letterMesh = new THREE.Mesh(letterGeometry, material);

            const xPos = ((i - letters.length / 2) * letter_spacing) + letter_spacing / 2;
            letterMesh.position.set(xPos, height, 0);

            letterMesh.rotation.z = (Math.random() - 0.5) * 0.1;
            letterMesh.rotation.y = (Math.random() - 0.5) * 0.1;

            textGroup.add(letterMesh);
        });

        return textGroup;
    };

    const titleText = createTextMesh("MES PROJETS", 3, 0x29b6f6, 0x0288d1, 1.4);
    mainGroup.add(titleText);

    const subtitleText = createTextMesh("EN TRAVAUX", 1, 0xffab40, 0xff7e5f, 0.8);
    mainGroup.add(subtitleText);

    // Groupe
    const blueprintGroup = new THREE.Group();

    // Cube
    const cubeGeometry = new THREE.BoxGeometry(6, 6, 6);
    const edgesGeometry = new THREE.EdgesGeometry(cubeGeometry);
    const edgesMaterial = new THREE.LineBasicMaterial({
        color: 0x4fc3f7,
        transparent: true,
        opacity: 0.7
    });
    const wireframeCube = new THREE.LineSegments(edgesGeometry, edgesMaterial);
    blueprintGroup.add(wireframeCube);

    mainGroup.add(blueprintGroup);

    scene.add(mainGroup);

    let time = 0;

    // Resize
    const resizeHandler = () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', resizeHandler);

    // Animation
    function animate() {
        const animationId = requestAnimationFrame(animate);

        time += 0.01;

        // Rotation du cube
        wireframeCube.rotation.y = time * 0.2;
        wireframeCube.rotation.z = time * 0.1;

        mainGroup.position.y = Math.sin(time * 0.5) * 0.2;

        // Animation du texte
        if (titleText && titleText.children) {
            titleText.children.forEach((letter, i) => {
                letter.position.y = 3 + Math.sin(time * 0.8 + i * 0.2) * 0.1;
                letter.material.opacity = 0.8 + Math.sin(time * 1.5 + i * 0.3) * 0.2;
            });
        }
        // Animation du texte
        if (subtitleText && subtitleText.children) {
            subtitleText.children.forEach((letter, i) => {
                letter.position.y = 1 + Math.sin(time * 1.2 + i * 0.15) * 0.05;
                letter.material.opacity = 0.7 + Math.sin(time * 2 + i * 0.2) * 0.3;
            });
        }

        // Render scene
        renderer.render(scene, camera);
    }

    // Start animation
    const animationId = animate();

    // Return cleanup function
    return {
        dispose: () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resizeHandler);

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
