import { describe, it, expect, vi } from 'vitest'
import { shallowMount, mount, flushPromises } from '@vue/test-utils'
import HeartRateComponent from '@/components/HeartRate.vue'
import axios from 'axios'
import Chart from 'chart.js/auto'

// Definiere die HeartRate-Klasse mit einem leeren Konstruktor
class HeartRate {
    id: number
    dateRecorded: Date
    heartRateValue: number

    constructor(id?: number, dateRecorded?: Date, heartRateValue?: number) {
        this.id = id ?? 0
        this.dateRecorded = dateRecorded ?? new Date()
        this.heartRateValue = heartRateValue ?? 0
    }
}

describe('HeartRateComponent', () => {
    const emptyResponse: HeartRate[] = []
    const twoItemResponse: HeartRate[] = [
        new HeartRate(1, new Date(), 60),
        new HeartRate(2, new Date(), 75)
    ]

    vi.mock('axios')
    vi.mock('chart.js/auto', () => ({
        default: {
            Chart: class {
                destroy = vi.fn()
                constructor() {}
            }
        }
    }))

    it('should render the title', () => {
        vi.mocked(axios.get).mockResolvedValueOnce({ data: twoItemResponse });
        const wrapper = shallowMount(HeartRateComponent)
        expect(wrapper.find('h2').text()).toBe('Herzfrequenzüberwachung')
    })

    it('should render the items from the backend', async () => {
        vi.mocked(axios.get).mockResolvedValueOnce({ data: twoItemResponse })

        const wrapper = mount(HeartRateComponent)
        await flushPromises()

        expect(wrapper.text()).toContain('60')
        expect(wrapper.text()).toContain('75')
    })

    it('should render message when no items received from backend', async () => {
        vi.mocked(axios.get).mockResolvedValueOnce({ data: emptyResponse })

        const wrapper = mount(HeartRateComponent)
        await flushPromises()

        expect(wrapper.text()).toContain('Anzahl der Herzfrequenzdaten: 0')
    })

    it('should save a new heart rate entry', async () => {
        vi.mocked(axios.get).mockResolvedValueOnce({ data: emptyResponse })
        vi.mocked(axios.post).mockResolvedValueOnce({ data: { id: 3, dateRecorded: new Date().toISOString(), heartRateValue: 85 } })

        const wrapper = mount(HeartRateComponent)
        wrapper.find('input[type="number"]').setValue(85)
        await wrapper.find('form').trigger('submit.prevent')
        await flushPromises()

        expect(wrapper.text()).toContain('85')
        expect(wrapper.text()).toContain('Anzahl der Herzfrequenzdaten: 1')
    })

    it('should not save an invalid heart rate entry', async () => {
        const wrapper = mount(HeartRateComponent)
        wrapper.find('input[type="number"]').setValue(-1)
        await wrapper.find('form').trigger('submit.prevent')
        await flushPromises()

        expect(wrapper.text()).toContain('Bitte geben Sie einen gültigen Herzfrequenzwert ein.')
    })

    it('should delete a heart rate entry', async () => {
        vi.mocked(axios.get).mockResolvedValueOnce({ data: twoItemResponse })
        vi.mocked(axios.delete).mockResolvedValueOnce({})

        const wrapper = mount(HeartRateComponent)
        await flushPromises()

        await wrapper.find('button[type="reset"]').trigger('click')
        await flushPromises()

        expect(wrapper.text()).not.toContain('60')
        expect(wrapper.text()).toContain('75')
        expect(wrapper.text()).toContain('Anzahl der Herzfrequenzdaten: 1')
    })
})
