<template>
    <h2>Reservierung Hethas-Diner </h2>
    <p>Wähle dir einen Slot aus und drücke den button reservieren.</p>
    <p>Zum Stornieren, suche deinen reservierten slot und drücke den button stornieren. </p>
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
    <div>
        <button type="button" @click="handleReservieren" data-tisch-id="1" data-slot="true">Reservieren</button>
        <button type="button" @click="stornieren">Stornieren</button>
        <p>Hier kannst du dein Profil Löschen</p>
        <button type="button" @click="deleteUser">Löschen</button>
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

/* Reservierungsbuttons */
button {
    padding: 10px 20px;
    background-color: #8b735b; /* Dunkles Beige */
    color: #fff; /* Weiß für den Text */
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
}

/* Button-Hover-Effekt */
button:hover {
    background-color: #6a5c49; /* Dunkleres Beige beim Hover */
}

/* Löschen-Button-Styling */
button.delete {
    background-color: #ff0000; /* Rot */
}

/* Zusätzlicher Stil für den Container um die Buttons */
div button {
    margin-top: 15px;
}

/* Text für Profil löschen */
p {
    color: #8b735b; /* Dunkles Beige */
}
</style>
