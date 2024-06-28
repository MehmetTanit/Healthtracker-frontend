import { describe, it, expect, vi } from 'vitest'
import { shallowMount, flushPromises } from '@vue/test-utils'
import axios from 'axios'
import HeartRate from "@/components/HeartRate.vue";
import { HeartRate as HeartRateModel } from '@/model/heartrate'


describe('DynamicHeartRateForm', () => {
    const emptyResponse: HeartRateModel[] = []
    const twoItemResponse: HeartRateModel[] = [
        { id: 1, dateRecorded: new Date('2023-06-27T12:00:00Z'), heartRateValue: 72 },
        { id: 2, dateRecorded: new Date('2023-06-28T12:00:00Z'), heartRateValue: 75 }
    ]

    vi.mock('axios')

    it('should render the title "Herzfrequenzüberwachung"', () => {
        vi.mocked(axios, true).get.mockResolvedValueOnce({ data: emptyResponse })

        const wrapper = shallowMount(HeartRate)
        expect(wrapper.text()).toContain('Herzfrequenzüberwachung')
    })

    it('should render the heart rate entries from the backend', async () => {
        vi.mocked(axios, true).get.mockResolvedValueOnce({ data: twoItemResponse })

        const wrapper = shallowMount(HeartRate)

        await flushPromises()

        expect(wrapper.text()).toContain('Herzfrequenz: 72')
        expect(wrapper.text()).toContain('Herzfrequenz: 75')
    })

    it('should render message when no heart rate entries are received from backend', async () => {
        vi.mocked(axios, true).get.mockResolvedValueOnce({ data: emptyResponse })

        const msg = 'No heart rate entries yet'
        const wrapper = shallowMount(HeartRate)

        await flushPromises()

        expect(wrapper.text()).toContain(msg)
    })

    it('should add a new heart rate entry when the form is submitted', async () => {
        const newHeartRateResponse = {
            id: 3,
            dateRecorded: new Date().toISOString(),
            heartRateValue: 80
        }

        vi.mocked(axios, true).post.mockResolvedValueOnce({ data: newHeartRateResponse })

        const wrapper = shallowMount(HeartRate)

        await wrapper.find('input').setValue(80)
        await wrapper.find('button').trigger('click')

        await flushPromises()

        expect(wrapper.text()).toContain('Herzfrequenz: 80')
    })
})
