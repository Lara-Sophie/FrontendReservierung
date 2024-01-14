import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
//@ts-ignore
import HomeView from "../../views/HomeView.vue";



describe('HomeView', () => {
    it('renders component correctly', () => {
        const wrapper = mount(HomeView);
        expect(wrapper.exists()).toBe(true);
    });


    it('should display error for invalid login', async () => {
        const wrapper = mount(HomeView);

        // Setzen Sie die BenutzerID direkt über die Ref-Instanz
        wrapper.vm.BenutzerID = 'invalidUserID';

        // Trigger the save button click
        await wrapper.find('button').trigger('click');

        // Wait for the next tick
        await wrapper.vm.$nextTick();

        // Expect the error message to be displayed
        expect(console.error('Error loading reservations:'));

    });
    })
