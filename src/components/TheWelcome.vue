<template>
    <div>
        <h2>Tische</h2>
        <ul>
            <li v-for="tisch in tische" :key="tisch.id">
                Tischnr: {{ tisch.tischnummer }}, Anzahl Plätze: {{ tisch.anzahlPlaetze }}
                <button @click="deleteTisch(tisch.id)">Löschen</button>
                <button @click="editTisch(tisch.id)">Bearbeiten</button>
            </li>
        </ul>

        <div>
            <h2>Neuen Tisch erstellen</h2>
            <form @submit.prevent="saveTisch">
                <label>Tischnr:</label>
                <input v-model="neuerTisch.tischnummer" type="text" required />
                <br />
                <label>Anzahl Plätze:</label>
                <input v-model="neuerTisch.anzahlPlaetze" type="number" required />
                <br />
                <button type="submit">Speichern</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tische: [],
            neuerTisch: {
                tischnummer: "",
                anzahlPlaetze: 0,
            },
        };
    },
    mounted() {
        this.loadTische();
    },
    methods: {
        async loadTische() {
            try {
                const response = await fetch('/reservierung');
                const data = await response.json();
                this.tische = data;
            } catch (error) {
                console.error("Fehler beim Laden der Tische:", error);
            }
        },
        async saveTisch() {
            try {
                const response = await fetch('/reservierung', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.neuerTisch),
                });
                await response.json();
                // Formular leeren
                this.neuerTisch.tischnummer = "";
                this.neuerTisch.anzahlPlaetze = 0;
                // Tische neu laden
                this.loadTische();
            } catch (error) {
                console.error("Fehler beim Speichern des Tischs:", error);
            }
        },
        async deleteTisch(id) {
            try {
                await fetch(`/reservierung/${id}`, {
                    method: 'DELETE',
                });
                // Tische neu laden
                this.loadTische();
            } catch (error) {
                console.error("Fehler beim Löschen des Tischs:", error);
            }
        },
        async editTisch(id) {
            try {
                // Hier könntest du Logik für den API-Aufruf zum Bearbeiten des Tischs hinzufügen
                // Zum Beispiel, um den aktuellen Tisch mit der ID zu holen und in einem Bearbeitungsformular zu verwenden
            } catch (error) {
                console.error("Fehler beim Bearbeiten des Tischs:", error);
            }
        },
    },

};
</script>

<style>
/* Style für Tisch-Elemente */
.tisch-item {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

/* Style für Aktionsschaltflächen */
.action-button {
    margin-left: 10px;
    cursor: pointer;
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
}

/* Style für Formularelemente */
.form-container {
    margin-top: 20px;
}

.form-label {
    margin-right: 10px;
    font-weight: bold;
}

.form-input {
    margin-bottom: 10px;
    padding: 5px;
}

.form-button {
    cursor: pointer;
    background-color: #28a745;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
}
</style>
