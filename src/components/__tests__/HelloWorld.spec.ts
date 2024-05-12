import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HeartRateList from '../HeartRateList.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(HeartRateList, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
