import { describe, it, expect, vi, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import axios from 'axios'
import BloodSugar from '../BloodSugar.vue'

// Mocked response data for blood sugar entries
const mockBloodSugars = [
    { id: 1, dateRecorded: new Date().toISOString(), bloodSugarLevel: 90 },
    { id: 2, dateRecorded: new Date().toISOString(), bloodSugarLevel: 110 }
]

// Mocking axios globally
describe('BloodSugarView', () => {
    beforeEach(() => {
        vi.mock('axios')
    })

    // Test case: Display message when no blood sugar entries exist
    it('should display message when no blood sugar entries exist', async () => {
        vi.mocked(axios, true).get.mockResolvedValueOnce({ data: [] })

        const wrapper = shallowMount(BloodSugar)
        await wrapper.vm.$nextTick()

        expect(wrapper.text()).toContain('Noch keine Blutzuckereinträge aufgezeichnet.')
    })

    // Test case: Render blood sugar entries from backend
    it('should render blood sugar entries from backend', async () => {
        vi.mocked(axios, true).get.mockResolvedValueOnce({ data: mockBloodSugars })

        const wrapper = shallowMount(BloodSugar)
        await wrapper.vm.$nextTick()

        const expectedRows = 1 + mockBloodSugars.length // Header + number of entries
        expect(wrapper.findAll('tr').length).toBe(expectedRows)
        expect(wrapper.text()).toContain('90') // Check for specific blood sugar levels
        expect(wrapper.text()).toContain('110')
    })

    // Test case: Save a new blood sugar entry
    it('should save a new blood sugar entry', async () => {
        const newBloodSugar = { id: 3, dateRecorded: new Date().toISOString(), bloodSugarLevel: 100 }

        vi.mocked(axios, true).post.mockResolvedValueOnce({ data: newBloodSugar })

        const wrapper = shallowMount(BloodSugar)
        await wrapper.vm.$nextTick()

        wrapper.find('input#bloodSugarLevel').setValue('100')
        await wrapper.vm.$nextTick()

        wrapper.find('button.btn-save').trigger('click')
        await wrapper.vm.$nextTick()

        expect(wrapper.text()).toContain('100')
    })
})
