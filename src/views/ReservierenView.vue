<template>
    <div name="container" class="grid-parent">
        <div name="image" class="grid-child" >
            <div>
                <img src="https://cdn.pixabay.com/photo/2022/11/21/12/20/man-7606907_1280.jpg" width="1000" height="1000">
            </div>
        </div>

        <div name="full" class="grid-child">
            <div name=" title">
                <h1>Reservierung</h1>
                <h2>Herthas-Diner</h2>
            </div >
            <div style=" margin: 0px ">
                <div name="table">
                    <table>
                        <thead>
                        <tr>
                            <th>Tisch</th>
                            <th>Wochentag</th>
                            <th>Datum</th>
                            <th>Von</th>
                            <th>Bis</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>

                <div class="container" style=" margin: 0px; padding: 0px">
                    <div class="element2"  style=" marging: 0px; padding: 0px">
                        <button type="button" @click="loadReservations" data-tisch-id="1" data-slot="true">Reservieren</button>
                    </div>
                </div>
                <div class="container" style=" margin: 0px; padding: 0px">
                        <div name="BenutzerInput" class="element1">
                            <div style="margin: 0px 0px 0px 10px; padding: 0px">
                                <p>Ach willste uns verlassen?!</p>
                            </div>
                            <input v-model="BenutzerID" type="number" min="1" step="1" placeholder="BenutzerID">
                            <button type="button" @click="deleteUser">Löschen</button>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref, reactive, computed} from "vue";
const BenutzerID = ref('');
async function registrierung() {
    document.location.href = "http://localhost:5173/registrieren";
}


const loadReservations = async (reservations) => {
    try {
        const response = await fetch('http://localhost:5173/tischSlots', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        console.log('Success:', result);
        reservations.value = result;
    } catch (error) {
        console.error('Error:', error);
    }
};








const deleteUser = async () => {
    const endpointUrl = 'http://localhost:8080/kunden/';
    const endpointAttach = BenutzerID.value;
    const endpoint = endpointUrl + endpointAttach;
    try {
        const response = await fetch(endpoint, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();
        console.log('Success:', result);
        showPopup("Profil gelöscht");
        await registrierung();


    } catch (error) {
        console.error('Error:', error);
    }
};

function showPopup(message:string) {
    const popup = document.createElement('div');
    popup.textContent = message;
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
}

</script>



<style scoped>

.grid-parent {
    display: grid;
    grid-template-columns: 3fr 1fr;
    justify-content: center; /* Horizontal zentrieren */
}
.grid-child {
    flex: 1;
    padding: 20px;
    border: none;
}

container {
    position: relative;
    content: "width=device-width, initial-scale=1.0";

    height: 100%;
    background-color: #f8f8f8;
}

tytle {
    margin: 0px;
}

image {
    position: relative;
    margin-right: 240px;
    left: 100px;
    top: 0px;
    z-index: -1;
    width: 33.3%
}

full {
    position: relative;
    margin-left: 240px;
    left: 100px;
    top: 0px;
    z-index: -1;
    width: 66.6%
}
body {
    background-color: #f5f5dc; /* Beige */
    color: #000000; /* Dunkles Braun für den Text */
    font-family: 'Georgia', serif; /* Rustikale Schriftart */
    margin: 0;
    padding: 20px;
}

/* Container-Styling */
div {
    background-color: #d2b48c; /* Hellbraun */
    padding: 20px;
    margin: 20px;
    border-radius: 10px;
}




.container {
    display: flex;
}

.element1 {
    flex: 2; /* Das erste Element nimmt 2 Teile des verfügbaren Platzes ein */
    height: 100px;
    margin: 0px;
    padding: 0px

}

.element2 {
    flex: 1; /* Das zweite Element nimmt 1 Teil des verfügbaren Platzes ein */
    height: 100px;
    margin: 0px;
    padding: 0px
}

h1 {
    color: #000000;
    padding-bottom: 10px;
    margin-left: 50px;
}

/* Überschriften */
h2 {
    color: #000000; /* Dunkles Braun */
    margin-left: 50px;
    padding-bottom: 10px;
}

h4 {
    color: #000000; /* Dunkles Braun */
    padding-bottom:  20px;
}

p {
    color: #000000; /* Dunkles Braun */
    margin: 0px;
    padding-bottom: 10px;
}

/* Eingabefelder */
input {
    padding: 10px 10px;
    margin: 10px;
    border: 1px solid #000000; /* Hellbraun */
    border-radius: 5px;
    background-color: #fff; /* Weiß */
    color: #000000; /* Dunkles Braun für den Text */
}

/* Reservierungsbuttons */
button {
    padding: 10px 10px;
    margin: 10px;
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

/* Löschen-Button-Styling */
button.delete {
    background-color: #ff0000; /* Rot */
}




</style>
