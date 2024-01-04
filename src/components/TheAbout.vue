<template>
    <div class="app-container">
        <header class="header">
            <h1>Tischreservierung-Herthas-Diner</h1>
        </header>
        <main>
            <table class="reservierungen-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Kunden ID</th>
                    <th>Tisch IDs</th>
                    <th>Startzeit</th>
                    <th>Endzeit</th>
                    <th>Aktionen</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="reservierung in reservierungen" :key="reservierung.id">
                    <td>{{ reservierung.id }}</td>
                    <td>{{ reservierung.kundenId }}</td>
                    <td>{{ reservierung.tischIds }}</td>
                    <td>{{ reservierung.startZeit }}</td>
                    <td>{{ reservierung.endZeit }}</td>
                    <td>
                        <button @click="editReservierung(reservierung.id)">Bearbeiten</button>
                        <button @click="deleteReservierung(reservierung.id)">Löschen</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            reservierungen: [],
            neueReservierung: {
                kundenId: 0,
                tischIds: "",
                startZeit: "",
                endZeit: "",
            },
        };
    },
    methods: {
        async loadReservierungen() {
            try {
                const response = await fetch('/reservierung');
                const data = await response.json();
                this.reservierungen = data;
            } catch (error) {
                console.error("Fehler beim Laden der Reservierungen:", error);
            }
        },
        async saveReservierung() {
            try {
                const response = await fetch('/reservierung', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.neueReservierung),
                });
                await response.json();
                // Formular leeren
                this.neueReservierung.kundenId = 0;
                this.neueReservierung.tischIds = "";
                this.neueReservierung.startZeit = "";
                this.neueReservierung.endZeit = "";
                // Reservierungen neu laden
                this.loadReservierungen();
            } catch (error) {
                console.error("Fehler beim Speichern der Reservierung:", error);
            }
        },
        async deleteReservierung(id) {
            try {
                await fetch(`/reservierung/${id}`, {
                    method: 'DELETE',
                });
                // Reservierungen neu laden
                this.loadReservierungen();
            } catch (error) {
                console.error("Fehler beim Löschen der Reservierung:", error);
            }
        },
        async editReservierung(id) {
            try {
                // Hier könntest du Logik für den API-Aufruf zum Bearbeiten der Reservierung hinzufügen
                // Zum Beispiel, um die aktuelle Reservierung mit der ID zu holen und in einem Bearbeitungsformular zu verwenden
            } catch (error) {
                console.error("Fehler beim Bearbeiten der Reservierung:", error);
            }
        },

    },
};
</script>

<style scoped>
.app-container {
    font-family: Arial, sans-serif;
    text-align: center;
}

.header {
    background-color: #3498db; /* Blauton für den Header */
    color: #fff;
    padding: 20px;
}

.reservierungen-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.reservierungen-table th, .reservierungen-table td {
    border: 1px solid #ddd;
    padding: 8px;
}

.reservierungen-table th {
    background-color: #3498db; /* Blauton für die Kopfzeile der Tabelle */
    color: #fff;
}

.reservierungen-table button {
    background-color: #3498db; /* Blauton für die Button-Farbe */
    color: #fff;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
    margin-right: 5px;
}

.reservierungen-table button:hover {
    background-color: #2980b9; /* Dunklerer Blauton beim Hovern über den Button */
}
</style>

