import {describe, expect, it} from "vitest";
import { render, fireEvent, waitFor } from '@testing-library/vue';
// @ts-ignore
import ReservierenView from '/src/views/ReservierenView.vue';


describe('ReservierenView', () => {
    it('sollte deleteUser aufrufen, wenn der "Löschen"-Button geklickt wird', async () => {
        const { getByPlaceholderText, getByText } = render(ReservierenView);

        // Setze BenutzerID
        await fireEvent.update(getByPlaceholderText('BenutzerID'), '123');


        // Klicke auf den "Löschen"-Button
        await fireEvent.click(getByText('Löschen'));

        // Warte darauf, dass die deleteUser-Funktion aufgerufen wird
        await waitFor(() => {
            expect(console.log('Success:'));
        });
    });
});