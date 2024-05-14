import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HeartRateList from '../HeartRateList.vue'

describe('HeartRateList', () => {
  it('renders a list of heart rates and dates properly', () => {
    const wrapper = mount(HeartRateList)
    const listItems = wrapper.findAll('li')

    expect(listItems.length).toBe(5)
    expect(wrapper.text()).toContain('Datum: 01.05.2024, Herzfrequenz: 70 BPM')
    expect(wrapper.text()).toContain('Datum: 02.05.2024, Herzfrequenz: 72 BPM')
    expect(wrapper.text()).toContain('Datum: 03.05.2024, Herzfrequenz: 68 BPM')
    expect(wrapper.text()).toContain('Datum: 04.05.2024, Herzfrequenz: 86 BPM')
    expect(wrapper.text()).toContain('Datum: 05.05.2024, Herzfrequenz: 45 BPM')
  })
})
