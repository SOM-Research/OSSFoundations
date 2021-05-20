import { shallowMount } from '@vue/test-utils';
import AddFoundation from '@/views/AddFoundation.vue'

//Command: npm run test:unit
describe('Testing component AddFoundation.vue', () => {


  const wrapper = shallowMount(AddFoundation);
  const $ = require('jquery');

  //Updated selected foundation
  it('updates the selected foundation value', () => {
    const foundation = {
      id: "e9x8a3m5p4l4e",
      name: "Example",
      url: "https://example.com",
      rq1Inter: "Y",
      rq1Indep: "Y",
      rq1Open: "N",
      SD: "N",
      rq3rq4: "N",
      legal: "legal",
      topics: [
        {
          name: "Event-organization",
          checked: true
        },
        {
          name: "Training",
          checked: true
        },
        {
          name: "Legal-support",
          checked: false
        },
        {
          name: "Community-coordination",
          checked: true
        },
        {
          name: "Project-sponsoring",
          checked: false
        },
        {
          name: "Software-Development",
          checked: false
        },
        {
          name: "OSS-promotion",
          checked: false
        },
        {
          name: "Government-involvement",
          checked: false
        },
        {
          name: "Standard-leaders",
          checked: false
        }
      ],
      topicsString: "5",
      authorName: "John Doe",
      authorMail: "hello@johndoe.com",
      status: "",
    };
    wrapper.vm.updateSelectedFoundation(foundation);
    expect(wrapper.vm.selectedFoundation).toMatchObject(foundation);

  });

  //Topics to string
  it('converts an array of topics into a string values separated by commas', () => {
    wrapper.vm.topicsToString();
    expect(wrapper.vm.selectedFoundation.topicsString).toMatch('Event-organization,Training,Community-coordination');
  });

  //Validates required form fields before submitting
  it('validates required form fields before submitting', () => {
    expect(wrapper.vm.validateFormBeforeSubmit()).toBeTruthy();
  });

  //Validates required form fields before submitting
  it('shows modal with response', () => {
    wrapper.vm.showModalWithResponse("Test");
    expect(wrapper.vm.responseAction).toMatch("Test");

    const spy = jest.fn();

    const wrapperModal = shallow(<ModalResponse/>);
    wrapperModal.find('#modalResponse').prop('onClick')();
    expect(spy).toHaveBeenCalled();  // Success!


  });


})

// const suma = require('./suma');

// test('sumar 1 + 2 es igual a 3', () => {
//   expect(suma(1, 2)).toBe(3);
// });