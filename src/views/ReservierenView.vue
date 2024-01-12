<template>
    <div name="container" class="grid-parent">
        <div name="image" class="grid-child" >
            <div>
                <img src="https://cdn.pixabay.com/photo/2022/11/21/12/20/man-7606907_1280.jpg" width="1000" height="1000">
            </div>


            <div name="table">

                <table>
                    <tr>
                        <th class="day">DAY</th>
                        <th class="day">MON</th>
                        <th class="day">TUE</th>
                        <th class="day">WED</th>
                        <th class="day">THU</th>
                        <th class="day">FRI</th>
                        <th class="day">SAT</th>
                        <th class="day">SUN</th>
                    </tr>
                    <tr>
                        <th class="date">DATE</th>
                        <th class="date">22</th>
                        <th class="date">23</th>
                        <th class="date">24</th>
                        <th class="date">25</th>
                        <th class="date">26</th>
                        <th class="date">27</th>
                        <th class="date">28</th>
                    </tr>
                    <div>
                        <tr>
                            <td>Tisch 1 für 4 Personen</td>
                            <td> 18-20</td>
                            <td> 18-20</td>
                            <td> 18-20</td>
                            <td> 18-20</td>
                            <td> 18-20</td>
                            <td> 18-20</td>
                            <td> 18-20</td>
                        </tr>
                    </div>
                    <tr>
                        <div>
                            <td>Tisch 1 für 4 Personen</td>
                            <td> 20-22</td>
                            <td> 20-22</td>
                            <td> 20-22</td>
                            <td> 20-22</td>
                            <td> 20-22</td>
                            <td> 20-22</td>
                            <td> 20-22</td>
                        </div>
                    </tr>
                    <tr>
                        <td>Tisch 2 für 5 Personen</td>
                        <td> 18-20</td>
                        <td> 18-20</td>
                        <td> 18-20</td>
                        <td> 18-20</td>
                        <td> 18-20</td>
                        <td> 18-20</td>
                        <td> 18-20</td>
                    </tr>
                    <tr>
                        <td>Tisch 2 für 5 Personen</td>
                        <td> 20-22</td>
                        <td> 20-22</td>
                        <td> 20-22</td>
                        <td> 20-22</td>
                        <td> 20-22</td>
                        <td> 20-22</td>
                        <td> 20-22</td>
                    </tr>
                    <tr>
                        <div>
                            <td>Tisch 3 für 6 Personen</td>
                            <td> 18-20</td>
                            <td> 18-20</td>
                            <td> 18-20</td>
                            <td> 18-20</td>
                            <td> 18-20</td>
                            <td> 18-20</td>
                            <td> 18-20</td>
                        </div>
                    </tr>
                    <tr>
                        <div>
                            <td>Tisch 3 für 6 Personen</td>
                            <td> 20-22</td>
                            <td> 20-22</td>
                            <td> 20-22</td>
                            <td> 20-22</td>
                            <td> 20-22</td>
                            <td> 20-22</td>
                            <td> 20-22</td>
                        </div>
                    </tr>
                </table>
            </div>
        </div>

        <div name="full" class="grid-child">
             <div>
                <h2>Reservierung Hethas-Diner </h2>
                <p>Wähle dir einen Slot aus und drücke den button reservieren.</p>
                <p>Zum Stornieren, suche deinen reservierten slot und drücke den button stornieren. </p>

                <div>
                    <button type="button" @click="handleReservieren" data-tisch-id="1" data-slot="true">Reservieren</button>
                    <button type="button" @click="stornieren">Stornieren</button>
                    <p>Hier kannst du dein Profil Löschen</p>
                    <button type="button" @click="deleteUser">Löschen</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

const Benutzername = ref('');
const reservierteSlots: { tischId: number; slot: boolean }[] = reactive([]);

const handleReservieren = (event: MouseEvent) => {
    // Extrahiere die Daten aus den data-* Attributen des Elements
    const tischId = (event.target as HTMLElement).dataset.tischId;
    const slot = (event.target as HTMLElement).dataset.slot;

    // Überprüfe, ob die Werte vorhanden sind, und konvertiere sie nach Bedarf
    if (tischId && slot) {
        reservieren(Number(tischId), slot === "true");
    }
};

const reservieren = (tischId:number, slot:boolean) => {
    // Überprüfen, ob der Slot bereits reserviert ist
    if (!reservierteSlots.some(r => r.tischId === tischId && r.slot === slot)) {
        reservierteSlots.push({ tischId, slot });
        console.log('Slot reserviert:', { tischId, slot });
    } else {
        console.log('Slot bereits reserviert');
    }
};

const stornieren = () => {
    const selectedReservierung = window.prompt('Geben Sie die Nummer der Reservierung ein:');
    if (selectedReservierung !== null) {
        reservierteSlots.splice(Number(selectedReservierung), 1);
        console.log('Reservierung storniert:', selectedReservierung);
    }
};

const deleteUser = async () => {
    const endpoint = 'http://localhost:8080/kunden';

    try {
        const response = await fetch(endpoint, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({Benutzername: Benutzername.value}),
        });

        const result = await response.json();
        console.log('Success:', result);

        // Führe weitere Aktionen nach dem Löschen durch, wenn nötig
    } catch (error) {
        console.error('Error:', error);
    }
};
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
