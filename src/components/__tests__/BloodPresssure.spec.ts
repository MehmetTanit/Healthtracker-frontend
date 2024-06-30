import { describe, it, expect, vi } from 'vitest';
import { shallowMount, flushPromises } from '@vue/test-utils';
import BloodPressureComponent from '@/components/BloodPressure.vue'; // Stellen Sie sicher, dass Sie den richtigen Pfad zur Komponente angeben
import axios from 'axios';
import type { BloodPressure } from '@/model/BloodPressure';

describe('BloodPressureComponent', () => {
    const emptyResponse: BloodPressure[] = [];
    const bloodPressureList: BloodPressure[] = [
        { id: 1, dateRecorded:new Date('2023-06-27T12:00:00Z'), systolicPressure: 120, diastolicPressure: 80 },
        { id: 2, dateRecorded:new Date('2023-06-27T12:00:00Z'), systolicPressure: 130, diastolicPressure: 85 }
    ];

    vi.mock('axios');

    it('should render the title passed to it', () => {
        vi.mocked(axios, true).get.mockResolvedValueOnce({ data: emptyResponse });

        const title = 'Blutdrucküberwachung';
        const wrapper = shallowMount(BloodPressureComponent, {
            props: { title }
        });

        expect(wrapper.text()).toContain(title);
    });

    it('should render the blood pressure entries from the backend', async () => {
        vi.mocked(axios, true).get.mockResolvedValueOnce({ data: bloodPressureList });

        const firstEntry = bloodPressureList[0].systolicPressure.toString();
        const wrapper = shallowMount(BloodPressureComponent);

        await flushPromises();

        expect(wrapper.text()).toContain(firstEntry);
    });

    it('should render message when no blood pressure entries received from backend', async () => {
        vi.mocked(axios, true).get.mockResolvedValueOnce({ data: emptyResponse });

        const msg = 'Noch keine Blutdruckeinträge aufgezeichnet.';
        const wrapper = shallowMount(BloodPressureComponent);

        await flushPromises();

        expect(wrapper.text()).toContain(msg);
    });

    it('should save a new blood pressure entry', async () => {
        vi.mocked(axios, true).post.mockResolvedValueOnce({ data: { id: 3, dateRecorded: new Date().toISOString(), systolicPressure: 125, diastolicPressure: 78 } });

        const wrapper = shallowMount(BloodPressureComponent);
        const systolicPressureInput = 125;
        const diastolicPressureInput = 78;

        // Simulate input and button click
        wrapper.setData({ systolicPressureInput, diastolicPressureInput });
        await wrapper.find('.btn-save').trigger('click');

        await flushPromises();

        // Check if the new entry is added to the component
        expect(wrapper.text()).toContain(systolicPressureInput.toString());
        expect(wrapper.text()).toContain(diastolicPressureInput.toString());
    });

    it('should delete a blood pressure entry', async () => {
        const idToDelete = 1;
        vi.mocked(axios, true).delete.mockResolvedValueOnce({ data: bloodPressureList });

        const wrapper = shallowMount(BloodPressureComponent);

        // Simulate button click to delete the first entry in the list
        await wrapper.find('.btn-delete').trigger('click');

        await flushPromises();

        // Check if the deleted entry is removed from the component
        expect(wrapper.text()).not.toContain(bloodPressureList[0].systolicPressure.toString());
        expect(wrapper.text()).not.toContain(bloodPressureList[0].diastolicPressure.toString());
    });
});
