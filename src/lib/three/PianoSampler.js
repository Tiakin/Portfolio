import * as Tone from 'tone';


export class PianoSampler {
    constructor() {
        // Initialiser le piano avec un Sampler de Tone.js
        this.piano = new Tone.Sampler({
            urls: {
                // Échantillons de base pour le piano
                "C1": "C2.mp3",
                "C2": "C3.mp3",
                "C3": "C4.mp3",
                "C4": "C5.mp3",
                "C5": "C6.mp3",
                "C6": "C7.mp3",
            },
            release: 1,
            baseUrl: "https://tonejs.github.io/audio/salamander/",
            onload: () => {
                console.log("Piano sampler chargé avec succès");
            }
        }).toDestination();

        // État des notes actuellement jouées
        this.playingNotes = new Set();
    }
    // Nettoie le nom de la note
    cleanNoteName(name) {
        // Si le nom est déjà propre, le renvoyer
        if (/^[A-G]#?\d$/.test(name)) {
            return name;
        }
        
        // Notes sans 001
        const noteMatch = name.match(/^([A-G])(#?)(\d)001$/i);
        if (noteMatch) {
            const [, note, sharp, octave] = noteMatch;
            return `${note.toUpperCase()}${sharp}${octave}`;
        }
        
        return null; // Pas une note de piano
    }

    // Joue la note
    noteOn(note, velocity = 0.7) {
        if (!note) return;
        
        try {
            // Vérifier si Tone.js est prêt
            if (Tone.context.state !== "running") {
                console.warn("Tone.js n'est pas initialisé. Cliquez sur la scène pour initialiser l'audio.");
                return;
            }

            // Jouer la note
            this.piano.triggerAttack(note, Tone.now(), velocity);
            this.playingNotes.add(note);
        } catch (error) {
            console.error("Erreur lors de la lecture de la note", note, error);
        }
    }

    // Stop la note
    noteOff(note) {
        if (!note || !this.playingNotes.has(note)) return;
        
        try {
            this.piano.triggerRelease(note);
            this.playingNotes.delete(note);
        } catch (error) {
            console.error("Erreur lors de l'arrêt de la note", note, error);
        }
    }

    // Initialiser Tone.js
    async initTone() {
        if (Tone.context.state !== "running") {
            try {
                await Tone.start();
                console.log("Tone.js initialisé avec succès");
            } catch (error) {
                console.error("Erreur lors de l'initialisation de Tone.js", error);
            }
        }
    }

    // dispose
    dispose() {
        try {
            // Arrêter toutes les notes en cours de lecture
            this.playingNotes.forEach(note => {
                this.piano.triggerRelease(note);
            });
            this.playingNotes.clear();
            
            // Dispose du sampler
            if (this.piano) {
                this.piano.dispose();
            }
        } catch (error) {
            console.warn("Erreur lors de la libération des ressources du piano", error);
        }
    }
}
