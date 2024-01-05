<template>
    <div>
        <h2>Kundenliste</h2>
        <ul>
            <li v-for="kunde in kunden" :key="kunde.id" class="kunde-item">
                {{ kunde.name }} ({{ kunde.email }})
                <button @click="deleteKunde(kunde.id)" class="action-button">Löschen</button>
                <button @click="editKunde(kunde.id)" class="action-button">Bearbeiten</button>
            </li>
        </ul>

        <div class="form-container">
            <h2>Neuen Kunden hinzufügen</h2>
            <form @submit.prevent="saveKunde">
                <label class="form-label">Name:</label>
                <input v-model="neuerKunde.name" class="form-input" required />
                <br />
                <label class="form-label">Email:</label>
                <input v-model="neuerKunde.email" type="email" class="form-input" required />
                <br />
                <button type="submit" class="form-button">Speichern</button>
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
        const response = await fetch('/kunde') // Ändern Sie den Endpunkt entsprechend
        const data = await response.json()
        kunden.value = data
    } catch (error) {
        console.error('Fehler beim Laden der Kunden:', error)
    }
}

const saveKunde = async () => {
    try {
        const response = await fetch('/kunde', { // Ändern Sie den Endpunkt entsprechend
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(neuerKunde.value),
        })
        await response.json()
        neuerKunde.value = { name: '', email: '' }
        loadKunden()
    } catch (error) {
        console.error('Fehler beim Speichern des Kunden:', error)
    }
}

const deleteKunde = async (id: number) => {
    try {
        await fetch(`/kunde/${id}`, { // Ändern Sie den Endpunkt entsprechend
            method: 'DELETE',
        })
        loadKunden()
    } catch (error) {
        console.error('Fehler beim Löschen des Kunden:', error)
    }
}

const editKunde = async (id: number) => {
    try {
        // Hier könntest du Logik für den API-Aufruf zum Bearbeiten des Kunden hinzufügen
    } catch (error) {
        console.error('Fehler beim Bearbeiten des Kunden:', error)
    }
}

// Lifecycle hook
onMounted(() => {
    loadKunden()
})
</script>

<style>
/* Kopieren Sie Ihr vorhandenes Styling hier */
.kunde-item {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.action-button {
    margin-left: 10px;
    cursor: pointer;
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
}

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
