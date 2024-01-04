<template>
    <div>
        <h2>Kundenliste</h2>
        <ul>
            <li v-for="kunde in kunde" :key="kunde.id">
                {{ kunde.name }} ({{ kunde.email }})
                <button @click="deleteKunde(kunde.id)">Löschen</button>
                <button @click="editKunde(kunde.id)">Bearbeiten</button>
            </li>
        </ul>

        <div>
            <h2>Neuen Kunden hinzufügen</h2>
            <form @submit.prevent="saveKunde">
                <label>Name:</label>
                <input v-model="neuerKunde.name" required />
                <br />
                <label>Email:</label>
                <input v-model="neuerKunde.email" type="email" required />
                <br />
                <button type="submit">Speichern</button>
            </form>
        </div>
    </div>
</template>



<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'

defineProps<{
    title: string
}>()

const kunden: Ref<{ id?: number; name: string; email: string }[]> = ref([])
const neuerKunde = ref<{ name: string; email: string }>({ name: '', email: '' })

const loadKunden = async () => {
    try {
        const response = await fetch('/reservierung')
        const data = await response.json()
        kunden.value = data
    } catch (error) {
        console.error('Fehler beim Laden der Kunden:', error)
    }
}

const saveKunde = async () => {
    try {
        const response = await fetch('/reservierung', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(neuerKunde.value),
        })
        await response.json()
        // Formular leeren
        neuerKunde.value.name = ''
        neuerKunde.value.email = ''
        // Kunden neu laden
        loadKunden()
    } catch (error) {
        console.error('Fehler beim Speichern des Kunden:', error)
    }
}

const deleteKunde = async (id: number) => {
    try {
        await fetch(`/reservierung/${id}`, {
            method: 'DELETE',
        })
        // Kunden neu laden
        loadKunden()
    } catch (error) {
        console.error('Fehler beim Löschen des Kunden:', error)
    }
}

const editKunde = async (id: number) => {
    try {
        // Hier könntest du Logik für den API-Aufruf zum Bearbeiten des Kunden hinzufügen
        // Zum Beispiel, um den aktuellen Kunden mit der ID zu holen und in einem Bearbeitungsformular zu verwenden
    } catch (error) {
        console.error('Fehler beim Bearbeiten des Kunden:', error)
    }
}

// Lifecycle hook
onMounted(() => {
    kunden.value = [
        { id: 1, name: 'Kunde 1', email: 'emailAdresse' }
]
})
</script>

<style>
.kunde-item {
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
