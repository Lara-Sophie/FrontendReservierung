<!-- Reservierung.vue -->

<template>
    <div class="app-container">
        <header class="header">
            <h1>Tischreservierung-Herthas-Diner</h1>
        </header>
        <main>
            <table class="reservierungen-table">
                <thead>
                <tr>
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

            <div class="neue-reservierung-form">
                <h2>Neue Reservierung hinzufügen</h2>
                <form @submit.prevent="saveReservierung">
                    <label for="kundenId">Kunden ID:</label>
                    <input v-model="neueReservierung.kundenId" type="number" required>
                    <label for="tischIds">Tisch IDs:</label>
                    <input v-model="neueReservierung.tischIds" type="text" required>
                    <label for="startZeit">Startzeit:</label>
                    <input v-model="neueReservierung.startZeit" type="datetime-local" required>
                    <label for="endZeit">Endzeit:</label>
                    <input v-model="neueReservierung.endZeit" type="datetime-local" required>
                    <button type="submit">Reservierung hinzufügen</button>
                </form>
            </div>
        </main>
    </div>
</template>

<script lang="ts">
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
    mounted() {
        this.loadReservierungen();
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
                this.clearForm();
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
                this.loadReservierungen();
            } catch (error) {
                console.error("Fehler beim Löschen der Reservierung:", error);
            }
        },
        async editReservierung(id) {
            // Implementiere die Logik für die Bearbeitung hier, wenn benötigt
        },
        clearForm() {
            this.neueReservierung.kundenId = 0;
            this.neueReservierung.tischIds = "";
            this.neueReservierung.startZeit = "";
            this.neueReservierung.endZeit = "";
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
    background-color: #3498db;
    color: #fff;
    padding: 20px;
}

.reservierungen-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.reservierungen-table th,
.reservierungen-table td {
    border: 1px solid #ddd;
    padding: 8px;
}

.reservierungen-table th {
    background-color: #3498db;
    color: #fff;
}

.reservierungen-table button {
    background-color: #3498db;
    color: #fff;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
    margin-right: 5px;
}

.reservierungen-table button:hover {
    background-color: #2980b9;
}

.neue-reservierung-form {
    margin-top: 20px;
}

.neue-reservierung-form h2 {
    font-size: 20px;
    margin-bottom: 10px;
}

.neue-reservierung-form form {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.neue-reservierung-form label {
    margin-top: 10px;
}

.neue-reservierung-form input,
.neue-reservierung-form button {
    margin-top: 5px;
}
</style>
