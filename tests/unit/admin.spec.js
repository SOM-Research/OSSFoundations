import { createRouter, createWebHistory } from 'vue-router'
import { shallowMount } from '@vue/test-utils';
import Admin from '@/views/Admin.vue';



import 'bootstrap';
import axios from 'axios';

jest.mock('axios');

import * as firebase from 'firebase'

const onAuthStateChanged = jest.fn()

const getRedirectResult = jest.fn(() => {
  return Promise.resolve({
    user: {
      displayName: 'redirectResultTestDisplayName',
      email: 'redirectTest@test.com',
      emailVerified: true
    }
  })
})

const sendEmailVerification = jest.fn(() => {
  return Promise.resolve('result of sendEmailVerification')
})

const sendPasswordResetEmail = jest.fn(() => Promise.resolve())

const createUserWithEmailAndPassword = jest.fn(() => {
  return Promise.resolve('result of createUserWithEmailAndPassword')
})

const signInWithEmailAndPassword = jest.fn(() => {
  return Promise.resolve('result of signInWithEmailAndPassword')
})

const signInWithRedirect = jest.fn(() => {
  return Promise.resolve('result of signInWithRedirect')
})

const getIdToken = jest.fn(() => {
  return Promise.resolve(1);
})

const initializeApp = jest
  .spyOn(firebase, 'initializeApp')
  .mockImplementation(() => {
    return {
      auth: () => {
        return {
          createUserWithEmailAndPassword,
          signInWithEmailAndPassword,
          currentUser: {
            sendEmailVerification,
            getIdToken,
          },
          signInWithRedirect
        }
      }
    }
  })

jest.spyOn(firebase, 'auth').mockImplementation(() => {
  return {
    onAuthStateChanged,
    currentUser: {
      displayName: 'testDisplayName',
      email: 'test@test.com',
      emailVerified: true,
      getIdToken
    },
    getRedirectResult,
    sendPasswordResetEmail
  }
})

firebase.auth.FacebookAuthProvider = jest.fn(() => { })
firebase.auth.GoogleAuthProvider = jest.fn(() => { })

//Command: npm run test:unit
describe('Testing component Admin.vue', () => {



  const wrapper = shallowMount(Admin);
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

  const foundationsList = [{ "SD": "N", "creationDate": 1622113963851, "id": "007483d644", "legal": "United States 501(c)(3)", "name": "Peer-Directed Projects Center (freenode)", "rq1Indep": "Y", "rq1Inter": "Y", "rq1Open": "N", "rq3rq4": "N", "status": "final", "topics": "Community-coordination", "url": "https://en.wikipedia.org/wiki/Freenode#Peer-Directed_Projects_Center" }, { "SD": "Y", "creationDate": 1622113963851, "id": "04b1e1a1cd", "legal": "French 1901 Non-profit Association", "name": "PostgreSQLFr.org", "rq1Indep": "Y", "rq1Inter": "N", "rq1Open": "Y", "rq3rq4": "N", "status": "final", "topics": "Event-organization,Project-sponsoring,Community-coordination,Software-Development", "url": "http://asso.postgresql.fr" }, { "SD": "Y", "creationDate": 1622113963851, "id": "08349b9008", "legal": "United States 501(c)(3)", "name": "Xiph.org", "rq1Indep": "Y", "rq1Inter": "Y", "rq1Open": "N", "rq3rq4": "N", "status": "final", "topics": "OSS-promotion,Project-sponsoring,Community-coordination,Software-Development", "url": "http://xiph.org/" }, { "SD": "Y", "creationDate": 1622113963851, "id": "0da7e89b20", "legal": "United States 501(c)(3)", "name": "Public Software Fund", "rq1Indep": "Y", "rq1Inter": "Y", "rq1Open": "N", "rq3rq4": "N", "status": "final", "topics": "Project-sponsoring,Software-Development", "url": "http://www.pubsoft.org/" }, { "SD": "Y", "creationDate": 1622113963851, "id": "0f2f01aa98", "legal": "United States 501(c)(6)", "name": ".NET Foundation", "rq1Indep": "Y", "rq1Inter": "Y", "rq1Open": "Y", "rq3rq4": "Y", "status": "final", "topics": "OSS-promotion,Event-organization,Project-sponsoring,Legal-support,Community-coordination,Software-Development", "url": "https://dotnetfoundation.org/" }]
  const idFoundation = "007483d644";
  //Loads correctly a foundation by clicking the button "Edit"
  it('Loads correctly a foundation by clicking the button "Edit"', () => {
    wrapper.vm.loadFormData(idFoundation, foundationsList);
    expect(wrapper.vm.selectedFoundation.id).toBe(idFoundation);
  });

  //Sends a request to edit a foundation
  it('Sends successfully a request to edit a foundation', async() => {
    await wrapper.vm.editFoundation(idFoundation, wrapper.vm.selectedFoundation);
    //Checks that the funcion has been called with the arguments:
    //1 - the correct method
    //2 - the arguments: URL and foundation
    //2 - the Bearer token (mocked on the top)

    expect(axios.put).toHaveBeenCalledWith("https://som-research.uoc.edu/tools/ossfoundations/foundations/"+idFoundation, wrapper.vm.selectedFoundation, { "headers": { "authorization": "Bearer 1" } },);
    // const token = await firebase.auth().currentUser.getIdToken();
    // expect(token).toBe(1);
  });

  it('Throws error when requesting to edit a foundation for the request method', async () => {
    await wrapper.vm.editFoundation(idFoundation, wrapper.vm.selectedFoundation);
    //Checks that the funcion has been called with the arguments:
    //1 - the correct method
    //2 - the arguments
    //2 - the Bearer token (mocked on the top)

    expect(axios.post).not.toHaveBeenCalledWith("https://som-research.uoc.edu/tools/ossfoundations/foundations/"+idFoundation, wrapper.vm.selectedFoundation, { "headers": { "authorization": "Bearer 1" } },);
    // const token = await firebase.auth().currentUser.getIdToken();
    // expect(token).toBe(1);
  });

  //Sends a request to approve a foundation
  it('Sends successfully a request to approve a foundation', async () => {
    await wrapper.vm.approveFoundation(idFoundation, wrapper.vm.selectedFoundation);

    //Expects to change its status to "final"
    expect(wrapper.vm.selectedFoundation.status).toBe("final");
    //Checks that the funcion has been called with the arguments:
    //1 - the correct method
    //2 - the arguments
    //2 - the Bearer token (mocked on the top)
    expect(axios.put).toHaveBeenCalledWith("https://som-research.uoc.edu/tools/ossfoundations/foundations/" + idFoundation, wrapper.vm.selectedFoundation, { "headers": { "authorization": "Bearer 1" } },);
  });

  it('Throws error when requesting to approve a foundation', async () => {
    await wrapper.vm.approveFoundation(idFoundation, wrapper.vm.selectedFoundation);

    //Expects to change its status to "final"
    expect(wrapper.vm.selectedFoundation.status).not.toBe("");
    expect(wrapper.vm.selectedFoundation.status).not.toBe("pending");

  });
  //Sends a request to create a new foundation
  it('Sends successfully a request to create a new foundation', async () => {
    await wrapper.vm.newFoundation(foundation);
    //Checks that the funcion has been called with the arguments:
    //1 - the correct method
    //2 - the arguments
    //2 - the Bearer token (mocked on the top)

    expect(axios.post).toHaveBeenCalledWith("https://som-research.uoc.edu/tools/ossfoundations/foundations/", foundation, { "headers": { "authorization": "Bearer 1" } },);
  });

  //Sends a request to edit a foundation
  it('Sends successfully a request to delete a foundation', async () => {
    await wrapper.vm.deleteFoundation(idFoundation);
    //Checks that the funcion has been called with the arguments:
    //1 - the correct method
    //2 - the arguments
    //2 - the Bearer token (mocked on the top)

    expect(axios.delete).toHaveBeenCalledWith("https://som-research.uoc.edu/tools/ossfoundations/foundations/"+idFoundation, { "headers": { "authorization": "Bearer 1" } },);
    // const token = await firebase.auth().currentUser.getIdToken();
    // expect(token).toBe(1);
  });



})
