<template>
    <div name="container" class="grid-parent">
        <div name="image" class="grid-child" style="margin: 0px; padding: 0px">
            <div>
                <img src="https://cdn.pixabay.com/photo/2022/11/21/12/20/man-7606907_1280.jpg" width="1000" height="1000">
            </div>





                    <div id="meinContainerId"></div>





            <div class="container" style=" margin: 0px; padding: 0px">
                <div name="BenutzerInput" class="element1">
                    <div style="margin: 0px 0px 0px 10px; padding: 0px">
                        <h5>Na, willste uns endlich  verlassen?</h5>
                    </div>
                    <input v-model="BenutzerID" type="number" min="1" step="1" placeholder="BenutzerID">

                    <button type="button" @click="deleteUser">Löschen</button>
                </div>
            </div>


            </div>




              <div name="full" class="grid-child" style=" margin: 0px; patting: 0px">
                   <div style="margin: 0px">
                      <h2>Reservierung Herthas-Bar </h2>
                      <h5> Willkommen in Herthas Bar,
                          wo wir die besten Drinks mit Herz & Berliner Schnauze servieren.<br>
                          In unserem Wohnzimmerambiente sind Liebhaber*innen aller Spirituosen und Mixgetränke Zuhause. <br>
                          <br>
                          Unsere Inhaberin Hertha ist seit Anbeginn die gute Seele dieses Ladens. <br>
                          Ihre Berliner Herzlichkeit sorgt für gute Laune und den nötigen Respekt - getreu dem Motto: harte Schale, weicher Kern. <br> Chef-Mixologe ist ihr langjähriger Geschäftspartner, Joachim. <br> Gemeinsam starteten sie mit einer kleinen Kneipe an der Ecke, wo die Menschen zum Feierabendbierchen einkehrten.
                          Viele gemixte Drinks und einige Weiterbildungen später, entstand aus der netten Eckkneipe diese fantastische Bar. Neben Feierabendbierchen gibt es hier nun allerhand köstliche Spirituosen und auch nicht-alkoholische Getränke. <br>
                          <br>
                          Heute gehört Herthas Bar zu einem DER Szenelokale des Berliner Nachtlebens. <br>
                          Wer uns einmal live und in Farbe erleben möchte, kann täglich von 18:00 bis 22:00 Uhr reinschneien. Unser empfohlener Welcome-Drink: Herthas Heißer Holunderlikör.<br>
                          <br>
                          Wir freuen uns auf euren Besuch,<br>
                          hier in Herthas Bar!
                          </h5>

                  </div>

                  <div>
                  </div>
                  <div style=" margin: 0px ">
                      <h2>Reservierungen</h2>

                      <div class="container" style=" margin: 0px; padding: 0px; height: 120px">
                          <div name="TischInput" class="element1" style=" marging: 0px; padding: 0px">
                              <input v-model="tischslotId" type="number" min="1" step="1" placeholder="TischSlotID">
                              <input v-model="kundenId" type="number" min="1" step="1" placeholder="KundenId">
                          </div>
                          <div name="TischInput" class="element2"  style=" marging: 0px; padding: 0px">
                              <button type="button" data-tisch-id="1" @click="AddReservierung">Reservieren</button>
                          </div>
                      </div>

                      <hr style=" color: black">

                      <div class="container" style=" margin: 0px; padding: 0px">
                          <div name="serch_nr" class="element1" style=" marging: 0px; padding: 0px">
                              <input v-model="reservierungId" type="number" min="1" step="1" placeholder="deine Reservierungs Nr.">
                          </div>
                          <div name="delete_Reservierung" class="element2" style=" marging: 0px; padding: 0px">
                              <button type="button" data-tisch-id="1" @click="deleteReservierung">Stornieren</button>
                          </div>
                      </div>
                  </div>


              </div>
    </div>



</template>

<script setup lang="ts">
import {ref, reactive, computed} from "vue";
const BenutzerID = ref('');

const kundenId = ref('');

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



// Beispiel-Array
const data = [
    { tischslotid: 1, reserviert: true, tisch:[1,5],endzeit: [2024,1,5,16,54],startzeit: [2024,1,5,16,54] },
    { tischslotid: 1, reserviert: true, tisch:[1,5],endzeit: [2024,1,5,16,54],startzeit: [2024,1,5,16,54] },
    { tischslotid: 1, reserviert: true, tisch:[1,5],endzeit: [2024,1,5,16,54],startzeit: [2024,1,5,16,54] }

];


let slotsIn: any[] = [];



const url = 'http://localhost:8080/slots';

window.onload = function () {
    fetch(url)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error(`Anfrage fehlgeschlagen mit Statuscode: ${response.status}`);
            }
        })
        .then((jsonData) => {
            slotsIn = jsonData;
            console.log(slotsIn);
            createTable(slotsIn);
        })
        .catch((error) => {
            console.error(`Ein Fehler ist aufgetreten: ${error.message}`);
        })


    function createTable(data: Array<{ tischslotid: number, reserviert: boolean, tisch:{id:number, anzahlPlaetze: number },endzeit: number[],startzeit: number[] }>) {
        console.log(slotsIn);
        const table = document.createElement('table');

        // Erstellen Sie die Kopfzeile
        const thead = table.createTHead();
        const row = thead.insertRow();
        const headers = ['Tischslotid', 'Reserviert', 'TischId', 'TischPlätze', 'Endzeit', 'Startzeit'];
        for (const header of headers) {
            const th = document.createElement('th');
            const text = document.createTextNode(header);
            th.appendChild(text);
            row.appendChild(th);
        }

        data.forEach(item => {

                const row = table.insertRow();
                const tischslotidCell = row.insertCell();
                tischslotidCell.textContent = item.tischslotid.toString();
                const reserviertCell = row.insertCell();
                reserviertCell.textContent = item.reserviert.toString();
                const tischIdCell = row.insertCell();
                tischIdCell.textContent = item.tisch.id.toString();
                const tischPlätzeCell = row.insertCell();
                tischPlätzeCell.textContent = item.tisch.anzahlPlaetze.toString();
                const endzeitCell = row.insertCell();
                const endzeitPart = item.endzeit[0] + "-" + item.endzeit[1] + "-" + item.endzeit[2] + " " + item.endzeit[3] + ":" + item.endzeit[4] + "0";
                endzeitCell.textContent = endzeitPart.toString();
                const startzeitCell = row.insertCell();
                const startzeitPart = item.startzeit[0] + "-" + item.startzeit[1] + "-" + item.startzeit[2] + " " + item.startzeit[3] + ":" + item.startzeit[4] + "0";
                startzeitCell.textContent = startzeitPart.toString();

        });

        // Identifizieren Sie das Container-Element und fügen Sie die Tabelle hinzu
        const container = document.getElementById("meinContainerId");
        if (container) {
            container.appendChild(table);
        }
    }
}


const tischslotId = ref('');

async function AddReservierung() {
    const endpoint = 'http://localhost:8080/reservierungen';



    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                kundenId: BenutzerID.value,
                tischSlotId: tischslotId.value
            })
        });

        const result = await response.json();
        console.log('Success:', result);
        showPopup("Tisch hinzugefügt")

    } catch (error) {
        console.error('Error:', error);
    }
}

const reservierungId = ref('');
async function deleteReservierung() {
    const endpointUrl = 'http://localhost:8080/reservierungen/';
    const endpointAttach = reservierungId.value;
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
        showPopup("Tisch gelöscht")

    } catch (error) {
        console.error('Error:', error);
    }
}





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


/* Grundlegendes Tabellendesign */
.table {
    width: 100%;
    border: 1px solid #000000;
}

/* Stil für Tabellenzellen */
.table td {
    display: flex;
    border: 1px solid #ddd;
    padding:20px;
    text-align: center;
    margin-left: 20px;

}

/* Hintergrundfarbe für Kopfzeilen */
.table th {
    display: flex;
    width: 120%;
    padding: 20px;
    margin-left: 20px;
    text-align: center;
    background-color: #4CAF50;
    color: #000000;
}

/* Zebrastreifen-Stil für Zeilen */
.table tr:nth-child(even) {background-color: #f2f2f2;}

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
