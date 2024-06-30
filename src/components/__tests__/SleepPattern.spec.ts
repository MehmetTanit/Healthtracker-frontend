
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { shallowMount, flushPromises } from '@vue/test-utils'
import axios from 'axios'
import Schlafmusterueberwachung from "@/components/SleepPattern.vue";
import { SleepPattern } from '@/model/SleepPattern'


describe('Schlafmusterueberwachung', () => {
    const emptyResponse: SleepPattern[] = []
    const twoItemResponse: SleepPattern[] = [
        new SleepPattern(1, new Date('2023-06-27T12:00:00Z'), 7, 4, 3, 2, 75),
        new SleepPattern(2, new Date('2023-06-28T12:00:00Z'), 8, 5, 3, 1, 80)
    ]

    vi.mock('axios')

    beforeEach(() => {
        vi.resetAllMocks()
    })

    it('should render the title "Schlafmusterüberwachung"', () => {
        vi.mocked(axios, true).get.mockResolvedValueOnce({ data: emptyResponse })

        const wrapper = shallowMount(Schlafmusterueberwachung)
        expect(wrapper.text()).toContain('Schlafmusterüberwachung')
    })

    it('should display info if list from backend is empty', async () => {
        vi.mocked(axios, true).get.mockResolvedValueOnce({ data: emptyResponse })
        const wrapper = shallowMount(Schlafmusterueberwachung)
        await flushPromises()
        expect(wrapper.text()).toContain('Noch keine Schlafmuster aufgezeichnet.')
    })

    it('should render the sleep pattern entries from the backend', async () => {
        vi.mocked(axios, true).get.mockResolvedValueOnce({ data: twoItemResponse })

        const wrapper = shallowMount(Schlafmusterueberwachung)

        await flushPromises()

        expect(wrapper.text()).toContain('75')
        expect(wrapper.text()).toContain('80')
    })

    it('should add a new sleep pattern entry when the form is submitted', async () => {
        const newSleepPatternResponse = new SleepPattern(
            3,
            new Date(),
            6,
            2,
            4,
            1,
            90
        )

        vi.mocked(axios, true).post.mockResolvedValueOnce({ data: newSleepPatternResponse })

        const wrapper = shallowMount(Schlafmusterueberwachung)

        await wrapper.find('#sleepDuration').setValue(6)
        await wrapper.find('#lightSleepDuration').setValue(2)
        await wrapper.find('#deepSleepDuration').setValue(4)
        await wrapper.find('#interruptions').setValue(1)

        await wrapper.find('button').trigger('click')

        await flushPromises()

        expect(wrapper.text()).toContain('90')
    })

    it('should delete a sleep pattern entry when the delete button is clicked', async () => {
        vi.mocked(axios, true).get.mockResolvedValueOnce({ data: twoItemResponse })
        const wrapper = shallowMount(Schlafmusterueberwachung)
        await flushPromises()

        vi.mocked(axios, true).delete.mockResolvedValueOnce({})

        const buttons = wrapper.findAll('button')
        if (buttons.length > 1) {
            await buttons[1].trigger('click')
            await flushPromises()

            expect(axios.delete).toHaveBeenCalledWith(expect.any(String))
            expect(wrapper.findAll('tr').length).toBe(2) // Only one entry should be left
        } else {
            throw new Error('Delete button not found')
        }
    })
})


