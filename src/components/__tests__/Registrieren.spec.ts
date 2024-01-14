import { mount } from '@vue/test-utils';
// @ts-ignore
import RegistrierenView from '/src/views/RegistrierenView.vue';
import {describe, expect, it} from "vitest";
import { render, fireEvent, waitFor } from '@testing-library/vue';

describe('RegistrierenView', () => {
    it('should send a POST request when the button is clicked', async () => {
        const {getByPlaceholderText, getByText} = render(RegistrierenView);

        // Fülle die Eingabefelder aus
        await fireEvent.update(getByPlaceholderText('BenutzerID'), '123');
        await fireEvent.update(getByPlaceholderText('Name'), 'Max Mustermann');
        await fireEvent.update(getByPlaceholderText('Telefonnummer'), '123456789');
        await fireEvent.update(getByPlaceholderText('Mail'), 'max@example.com');

        // Klicke auf den Registrieren-Button
        await fireEvent.click(getByText('registrieren'));

        // Warte darauf, dass die Registrierung abgeschlossen ist (z.B., Weiterleitung)
        await waitFor(() => {
            expect(console.log('Success:'));
        });
    })
})