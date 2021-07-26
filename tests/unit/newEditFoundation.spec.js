import { createRouter, createWebHistory } from 'vue-router'
import { shallowMount } from '@vue/test-utils';
import NewEditFoundation from '@/components/NewEditFoundation.vue';


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
describe('Testing component NewEditFoundation.vue', () => {


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

  const wrapper = shallowMount(NewEditFoundation, {
    propsData: {
      selectedFoundation: foundation
    }
  });
  const $ = require('jquery');
  

  it("updates the 'selectedfoundation' variable with the inputs in the form", () => {
    // wrapper.vm.selectedFoundation = foundation;
    // console.log("SELECTED FOUNDATION IS "+wrapper.vm.selectedFoundationForm);
    wrapper.find('#formName').setValue('FoundationNew')
    expect(wrapper.vm.selectedFoundationForm.name).toBe('FoundationNew');

    wrapper.find('#formUrl').setValue('https://exampleNew.com')
    expect(wrapper.vm.selectedFoundationForm.url).toBe('https://exampleNew.com');

    wrapper.find('#formLegal').setValue("United States 501(c)(3)")
    expect(wrapper.vm.selectedFoundationForm.legal).toBe("United States 501(c)(3)");

    wrapper.find('label[for="dissolvedY"]').trigger('click')
    expect(wrapper.vm.selectedFoundationForm.dissolved).toBe(true);

    wrapper.find('#rq1InterN').setChecked()
    expect(wrapper.vm.selectedFoundationForm.rq1Inter).toBe('N');

    wrapper.find('#rq1IndepN').setChecked()
    expect(wrapper.vm.selectedFoundationForm.rq1Indep).toBe('N');

    wrapper.find('#rq1OpenN').setChecked()
    expect(wrapper.vm.selectedFoundationForm.rq1Inter).toBe('N');

    wrapper.find('#SDN').setChecked()
    expect(wrapper.vm.selectedFoundationForm.SD).toBe('N');

    wrapper.find('input[name="Government-involvement"]').setChecked()
    expect(wrapper.vm.selectedFoundationForm.topics[7].checked).toBe(true);

    wrapper.find('input[name="contactName"]').setValue('Bob Perez')
    expect(wrapper.vm.selectedFoundationForm.authorName).toBe('Bob Perez');

    wrapper.find('input[name="contactEmail"]').setValue('bob@bob.com')
    expect(wrapper.vm.selectedFoundationForm.authorMail).toBe('bob@bob.com');

  



  });




})
