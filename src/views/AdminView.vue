<template>


        <div name="container" class="grid-parent" >
                <div name="image" class="grid-child" >
                        <img src="https://cdn.pixabay.com/photo/2022/11/21/12/20/man-7606907_1280.jpg" width="1000" height="1000" >
                </div>

                <div name="full" class="grid-child" >

                                <div name=" title">
                                        <h1>Admin Site</h1>
                                </div >
                                &nbsp;
                                <div style=" margin: 0px ">
                                        <h2>Tische</h2>

                                        <div class="container">
                                        <div name="TischInput" class="element1">

                                                <input v-model="TischNr" type="number" min="1" step="1" placeholder="TischNr">
                                                <input type="number" min="1" step="1" placeholder="anzahl Plätze">
                                        </div>

                                        <div name="TischOutput" class="element2">
                                                <button @click="AddTisch"> AddTisch </button>
                                                <button @click="deleteTisch"> DeleteTisch </button>
                                        </div>

                                        </div>

                                </div>
                                &nbsp;
                                <div style=" margin: 0px ">
                                        <h2>Tischslots</h2>

                                        <div name="TischNummer" style=" margin: 0px 0px 0px 22px" >
                                                <input type="number" min="1" step="1" placeholder="Tischslot Nr">
                                        </div>

                                        <div name="StartzeitDiv" style=" margin: 0px 0px 0px 22px">
                                            <div style="margin: 0px 0px 0px 10px; padding: 0px">
                                                <h4> Startzeit</h4>
                                            </div>
                                                <input type="date" min="2024-02-01">

                                                <input type="time" min="18:00" step="7200" max="18:00">

                                        </div>


                                        <div style="margin: 0px 0px 0px 22px ">
                                        <button @click="AddTischSlots"> Add Tischslot </button>
                                        <button @click="DeleteTischSlots"> Delete Tischslot </button>
                                        </div>
                                </div>

                                <div style="margin: 0px 0px 0px 40px">
                                        <button @click="reservierung">Reservierung </button>
                                </div>

                </div>
        </div>


</template>



<script setup lang="ts">
import { ref } from 'vue';
import {RouterLink, useRouter} from "vue-router";
import ReservierenView from "@/views/ReservierenView.vue";


const TischNr = ref('');
async function reservierung() {
   document.location.href = "http://localhost:5173/reservieren";
}


async function AddTisch() {
        const endpointUrl = 'http://localhost:8080/tische/';
        const endpointAttach = TischNr.value;
        const endpoint = endpointUrl + endpointAttach;


        try {
                const response = await fetch(endpoint, {
                        method: 'POST',
                        headers: {
                                'Content-Type': 'application/json',
                        }
                });

                const result = await response.json();
                console.log('Success:', result);

        } catch (error) {
                console.error('Error:', error);
        }
}

async function deleteTisch() {
        const endpointUrl = 'http://localhost:8080/tische/';
        const endpointAttach = TischNr.value;
        const endpoint = endpointUrl + endpointAttach;

        try {
                const response = await fetch(endpoint, {
                        method: 'DELETE',
                        headers: {
                                'Content-Type': 'application/json',
                        }
                });

                const result = await response;
                console.log('Success:', result);

        } catch (error) {
                console.error('Error:', error);
        }
}

async function AddTischSlots() {
        const endpointUrl = 'http://localhost:8080/tischSlot/';
        const endpointAttach = {TischNr};
        const endpoint = endpointUrl + endpointAttach;


        try {
                const response = await fetch(endpoint, {
                        method: 'POST',
                        headers: {
                                'Content-Type': 'application/json',
                        }
                });

                const result = await response.json();
                console.log('Success:', result);

        } catch (error) {
                console.error('Error:', error);
        }
}

async function DeleteTischSlots() {
        const endpointUrl = 'http://localhost:8080/tischSlot/';
        const endpointAttach = {TischNr};
        const endpoint = endpointUrl + endpointAttach;

        try {
                const response = await fetch(endpoint, {
                        method: 'DELETE',
                        headers: {
                                'Content-Type': 'application/json',
                        }
                });

                const result = await response.json();
                console.log('Success:', result);

        } catch (error) {
                console.error('Error:', error);
        }
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


