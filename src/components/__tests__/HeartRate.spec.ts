import { describe, it, expect, vi } from 'vitest'
import { shallowMount, flushPromises } from '@vue/test-utils'
import axios from 'axios'
import HeartRate from "@/components/HeartRate.vue";
import { HeartRate as HeartRateModel } from '@/model/heartrate'



describe('HeartRate', () => {
    const emptyResponse: HeartRateModel[] = []
    const twoItemResponse: HeartRateModel[] = [
        {id: 1, dateRecorded: new Date('2023-06-27T12:00:00Z'), heartRateValue: 72},
        {id: 2, dateRecorded: new Date('2023-06-28T12:00:00Z'), heartRateValue: 75}
    ]

    vi.mock('axios')

    it('should render the title "Herzfrequenzüberwachung"', () => {
        vi.mocked(axios, true).get.mockResolvedValueOnce({data: emptyResponse})

        const wrapper = shallowMount(HeartRate)
        expect(wrapper.text()).toContain('Herzfrequenzüberwachung')
    })

    it('should render the heart rate entries from the backend', async () => {
        vi.mocked(axios, true).get.mockResolvedValueOnce({data: twoItemResponse})

        const wrapper = shallowMount(HeartRate)

        await flushPromises()

        expect(wrapper.text()).toContain('Herzfrequenz: 72')
        expect(wrapper.text()).toContain('Herzfrequenz: 75')
    })

    it('should display a message when no heart rate entries exist', async () => {
        vi.mocked(axios, true).get.mockResolvedValueOnce({data: emptyResponse})

        const wrapper = shallowMount(HeartRate)
        await flushPromises()

        expect(wrapper.text()).toContain('Noch keine Herzfrequenzeinträge aufgezeichnet.')
    })

})
