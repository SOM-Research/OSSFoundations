import { createRouter, createWebHistory } from 'vue-router'
import { shallowMount } from '@vue/test-utils';
import AddFoundation from '@/views/AddFoundation.vue';


import 'bootstrap';
import axios from 'axios';

jest.mock('axios');
// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//   },
// ];
// const router = createRouter({
//   routes
// });

//Command: npm run test:unit
describe('Testing component AddFoundation.vue', () => {



  const wrapper = shallowMount(AddFoundation);
  const $ = require('jquery');

  const foundation = {
    id: "e9x8a3m5p4l4e",
    name: "ExampleFoundation",
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

  //Updated selected foundation
  it('updates the selected foundation value', () => {

    wrapper.vm.updateSelectedFoundation(foundation);
    expect(wrapper.vm.selectedFoundation).toMatchObject(foundation);
  });

  //Topics to string
  it('converts an array of topics into a string values separated by commas', () => {
    wrapper.vm.topicsToString();
    expect(wrapper.vm.selectedFoundation.topicsString).toMatch('Event-organization,Training,Community-coordination');
  });

  //validateFormBeforeSubmit
  it('validates required form fields before submitting', () => {
    expect(wrapper.vm.validateFormBeforeSubmit()).toBeTruthy();
  });

  //newFoundation
  it('sends a new foundation to the API', () => {

    wrapper.vm.newFoundation(foundation);

    //Checks that the funcion has been called with the arguments:
    //1 - the correct method
    //2 - the arguments: URL and foundation
    expect(axios.post).toHaveBeenCalledWith("https://oss-foundations-api.herokuapp.com/foundations/pending", foundation);
  });

  //Validates required form fields before submitting
  it('shows modal with response', () => {
    // wrapper.vm.showModalWithResponse("Test");
    // expect(wrapper.vm.responseAction).toMatch("Test");

    // const spy = jest.fn();

    // const wrapperModal = shallow(<ModalResponse/>);
    // wrapperModal.find('#modalResponse').prop('onClick')();
    // expect(spy).toHaveBeenCalled();  // Success!
  });


  //BAD FOUNDATION
  const foundationBad = {
    id: "e9x8a3m5p4l4e2",
    name: "ExampleBadFoundation",
    url: "",
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

  //Updated selected foundation
  it('throws error updating the selected foundation value', () => {
    wrapper.vm.updateSelectedFoundation(foundationBad);
    expect(wrapper.vm.selectedFoundation).not.toMatchObject(foundation);
  });

  //Topics to string
  it('throws error converting an array of topics into a string values separated by commas', () => {
    wrapper.vm.topicsToString();
    expect(wrapper.vm.selectedFoundation.topicsString).toMatch('');
  });

  //validateFormBeforeSubmit
  it('throws error validating required form fields before submitting', () => {
    expect(wrapper.vm.validateFormBeforeSubmit()).toBeFalsy();
  });

  //newFoundation
  it('throws error sending a new foundation to the API (wrong method)', () => {

    wrapper.vm.newFoundation(foundationBad);

    //Checks that the funcion has been called with the arguments:
    //1 - the correct method
    //2 - the arguments: URL and foundation
    expect(axios.put).not.toHaveBeenCalledWith("https://oss-foundations-api.herokuapp.com/foundations/pending", foundation);
  });



})
