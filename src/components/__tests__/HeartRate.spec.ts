import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import HeartRate from '@/components/HeartRate.vue';
import { HeartRate as HeartRateModel } from '@/model/heartrate';

// Mock data for the test
const mockHeartRates = [
  new HeartRateModel(310, 23, new Date('2024-05-15T10:30:00'), 90),
  new HeartRateModel(30, 13, new Date('2023-05-15T10:30:00'), 80),
  new HeartRateModel(210, 33, new Date('2024-05-15T10:30:00'), 70),
  new HeartRateModel(110, 13, new Date('2024-05-15T10:30:00'), 100)
];

// Mock axios
vi.mock('axios', () => ({
  default: {
    get: () => Promise.resolve({ data: mockHeartRates })
  }
}));

describe('HeartRate', () => {
  it('renders a list of heart rates and dates properly', async () => {
    const wrapper = mount(HeartRate);

    // Wait for the component to update with the fetched data
    await wrapper.vm.$nextTick();

    const listItems = wrapper.findAll('li');

    expect(listItems.length).toBe(4);
    expect(wrapper.text()).toContain('Datum: 15.05.2024, Herzfrequenz: 90 BPM');
    expect(wrapper.text()).toContain('Datum: 15.05.2023, Herzfrequenz: 80 BPM');
    expect(wrapper.text()).toContain('Datum: 15.05.2024, Herzfrequenz: 70 BPM');
    expect(wrapper.text()).toContain('Datum: 15.05.2024, Herzfrequenz: 100 BPM');
  });
});
