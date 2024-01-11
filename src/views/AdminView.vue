<template>
    <div>
        <h2>Tischverwaltung</h2>

        <!-- Eingabemaske für neuen Tisch -->
        <div>
            <label for="tischId">Tisch ID:</label>
            <input type="number" v-model="newTischId" id="tischId" />

            <label for="anzahlPlaetze">Anzahl Plätze:</label>
            <input type="number" v-model="newAnzahlPlaetze" id="anzahlPlaetze" />

            <button @click="addTisch">Tisch hinzufügen</button>
        </div>

        <!-- Tabelle für vorhandene Tische -->
        <table>
            <thead>
            <tr>
                <th @click="sortTable('id')">Tisch ID</th>
                <th @click="sortTable('anzahlPlaetze')">Anzahl Plätze</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="tisch in sortedTische" :key="tisch.id">
                <td>{{ tisch.id }}</td>
                <td>{{ tisch.anzahlPlaetze }}</td>
                <td>
                    <button @click="deleteTisch(tisch.id)" class="delete">Löschen</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newTischId: 0,
            newAnzahlPlaetze: 0,
            tische: [],
            sortKey: '',
        };
    },
    computed: {
        sortedTische() {
            return this.tische.slice().sort((a, b) => {
                if (this.sortKey) {
                    return a[this.sortKey] - b[this.sortKey];
                }
                return 0;
            });
        },
    },
    methods: {
        addTisch() {
            const newTisch = {
                id: this.newTischId,
                anzahlPlaetze: this.newAnzahlPlaetze,
            };

            this.tische.push(newTisch);
            // Hier kannst du die Daten auch an den Server senden, um in der Datenbank zu speichern.

            // Zurücksetzen der Eingabefelder
            this.newTischId = 0;
            this.newAnzahlPlaetze = 0;
        },
        deleteTisch(tischId) {
            const index = this.tische.findIndex((tisch) => tisch.id === tischId);
            if (index !== -1) {
                this.tische.splice(index, 1);
                // Hier kannst du die Daten auch an den Server senden, um in der Datenbank zu löschen.
            }
        },
        sortTable(key) {
            this.sortKey = key;
        },
    },
};
</script>

<style scoped>

    /* Allgemeiner Hintergrund und Schriftstil */
body {
    background-color: #f5f5dc; /* Beige */
    color: #4d3319; /* Dunkles Braun für den Text */
    font-family: 'Georgia', serif; /* Rustikale Schriftart */
    margin: 0;
    padding: 0;
}

/* Container-Styling */
div {
    background-color: #d2b48c; /* Hellbraun */
    padding: 20px;
    margin: 20px;
    border-radius: 10px;
}

/* Überschriften */
h2 {
    color: #5e4934; /* Dunkles Braun */
}

/* Eingabefelder */
input {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #d2b48c; /* Hellbraun */
    border-radius: 5px;
    background-color: #fff; /* Weiß */
    color: #4d3319; /* Dunkles Braun für den Text */
}

/* Reservierungsbuttons */
button {
    padding: 10px 20px;
    background-color: #8b735b; /* Dunkles Beige */
    color: #fff; /* Weiß für den Text */
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
}

/* Button-Hover-Effekt */
button:hover {
    background-color: #6a5c49; /* Dunkleres Beige beim Hover */
}

/* Löschen-Button-Styling */
button.delete {
    background-color: #ff0000; /* Rot */
}

/* Zusätzlicher Stil für den Container um die Buttons */
div button {
    margin-top: 15px;
}

/* Text für Profil löschen */
p {
    color: #8b735b; /* Dunkles Beige */
}
</style>


