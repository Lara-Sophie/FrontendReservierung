<template>
    <div>
        <h2>Registrieren</h2>
        <p>Name</p>
        <input v-model="name" placeholder="Name" type="text">
        <p>E-Mail</p>
        <input v-model="mail" placeholder="E-Mail" type="text">
        <p>Allergien</p>
        <input v-model="allergien" placeholder="Allergien" type="text">
        <p>Telefonnummer</p>
        <input v-model="telefonnummer" placeholder="Telefonnummer" type="text">
        <p></p>
        <button type="button" @click="save" >registrieren</button>
        <p>Klicke hier um einen tisch zu reservieren</p>
        <RouterLink to="/reservieren">reservieren</RouterLink>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {RouterLink, useRouter} from "vue-router";

//const benutzernameField = ref('');
const name = ref('');
const mail = ref('');
const allergien = ref('');
const telefonnummer = ref('');

const save = async () => {
    const endpoint = 'http://localhost:8080/kunden';
    const data = {
        name:name.value,
        email: mail.value,
        allergien: allergien.value,
        telefonnummer: telefonnummer.value
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(endpoint, requestOptions);
        if (response.ok) {
            console.log('Erfolgreich gespeichert:', data);

            // Öffne ein Popup-Fenster für 3 Sekunden
            const popup = document.createElement('div');
            popup.textContent = 'Jetzt bist du registriert';
            popup.style.position = 'fixed';
            popup.style.top = '10px';
            popup.style.left = '50%';
            popup.style.transform = 'translateX(-50%)';
            popup.style.background = '#4CAF50';
            popup.style.color = 'white';
            popup.style.padding = '10px';
            popup.style.borderRadius = '5px';
            document.body.appendChild(popup);

            setTimeout(() => {
                document.body.removeChild(popup);
            }, 3000);
        } else {
            console.error('Fehler beim Speichern:', response.statusText);
        }
    } catch (error) {
        console.error('Fehler beim Speichern:', error.message);
    }
};
</script>


<style>
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
</style>