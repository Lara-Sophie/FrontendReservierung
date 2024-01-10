<template>
    <div>
        <h2>Registrieren</h2>
        <p>Benutzername</p>
        <input v-model="benutzernameField" placeholder="Benutzername" type="text">
        <p>Name</p>
        <input v-model="nameField" placeholder="Name" type="text">
        <p>E-Mail</p>
        <input v-model="mailField" placeholder="E-Mail" type="text">
        <p>Allergien</p>
        <input v-model="allergienField" placeholder="Allergien" type="text">
        <p>Telefonnummer</p>
        <input v-model="telefonnummerField" placeholder="Telefonnummer" type="text">
        <p></p>
        <button type="button" @click="save" >registrieren</button>
        <p>Klicke hier um einen tisch zu reservieren</p>
        <button type="button" @click="navigateToAboutPage" >reservieren</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {useRouter} from "vue-router";

const benutzernameField = ref('');
const nameField = ref('');
const mailField = ref('');
const allergienField = ref('');
const telefonnummerField = ref('');

const navigateToAboutPage = (event: MouseEvent) => {
    const userId = (event.target as HTMLElement).getAttribute('data-user-id');
    if (userId) {
        const router = useRouter();
        router.push({ name: 'TheAbout', params: { id: userId } });
    }
};

function save() {
    const endpoint = 'http://localhost:8080/reservierungen';
    const data = {
        benutzername: benutzernameField.value,
        name: nameField.value,
        email: mailField.value,
        allergien: allergienField.value,
        telefonnummer: telefonnummerField.value
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Hier können Sie weitere Aktionen nach dem Speichern ausführen, wenn nötig
        })
        .catch(error => console.error('Error:', error));
}
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
