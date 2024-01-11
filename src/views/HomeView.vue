<template>
    <div class="welcome-container">
        <div class="background-image"></div>

        <div class="content">
            <h1 class="industrial-title">Willkommen!</h1>
            <p class="industrial-text">bei Herthas_Diner</p>

            <div>
                <h2>Anmelden</h2>
                <p>Benutzername</p>
                <input v-model="Benutzername" placeholder="Benutzername" type="text">
                <p></p>
                <button type="button" @click="save">anmelden</button>
                <p>Klicke hier um einen tisch zu reservieren</p>
                <RouterLink to="/reservieren">reservieren</RouterLink>
                <p>Wenn du noch nicht angemeldet bist dann registriere dich bitte hier:</p>
                <RouterLink to="/registrieren">registrieren</RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {RouterLink, useRouter} from "vue-router";
import ReservierenView from "@/views/ReservierenView.vue";

const Benutzername = ref('');

const save = async () => {
    const endpoint = 'http://localhost:8080/kunden';
    const data = { Benutzername };

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log('Success:', result);

    } catch (error) {
        console.error('Error:', error);
    }
};




// Lade Reservierungen nach dem Laden der Komponente
onMounted(() => {
    loadReservierung();
});

const loadReservierung = async () => {
    const endpoint = 'http://localhost:8080/reservierungen';

    try {
        const response = await fetch(endpoint,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
    } catch (error) {
        console.error('Error loading reservations:', error);
    }
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
.welcome-container {
    background-color: #d2b48c; /* Hellbraun */
    padding: 20px;
    margin: 20px;
    border-radius: 10px;
}

/* Überschriften */
.content h2 {
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

/* Registrierungsbutton */
button {
    padding: 10px 20px;
    background-color: #8b735b; /* Dunkles Beige */
    color: #fff; /* Weiß für den Text */
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

/* Button-Hover-Effekt */
button:hover {
    background-color: #6a5c49; /* Dunkleres Beige beim Hover */
}
.industrial-title {
    font-size: 30px;
    margin-bottom: 20px;
}

.industrial-text {
    font-size: 18px;
}
</style>
