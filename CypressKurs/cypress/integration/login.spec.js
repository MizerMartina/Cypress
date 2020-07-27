/// <reference types="cypress"/>

import { EMAIL } from '../fixtures/constants';
import {authPage} from '../page_objects/login.page';
import {randomEmail} from '../utils/index';

const faker = require("faker");

//var randomEmail = faker.internet.email();
var randomPassword = faker.internet.password();

beforeEach(() => {
  cy.visit('/');
  cy.server();
  cy.route(Cypress.env('apiUrl') + '/galleries?page=1&term=').as('galleries');
})

describe('Login module', () => {
  it('GA-19 : Login page layout', () => {
    cy.get(".nav-link").contains("Login").click();
    authPage.email.should("be.visible");
    authPage.password.should("be.visible");
    authPage.loginButton.should("be.visible");

  })
})

describe('Login module', () => {
  it('GA-28 : Login - valid data', () => {
    cy.get(".nav-link").contains("Login").click();
    authPage.login(EMAIL.EXISTING, EMAIL.PASSWORD);
    cy.wait('@galleries');
    // authPage.email.type(EMAIL.EXISTING).click();
    // authPage.password.type(EMAIL.PASSWORD).click();
    // authPage.loginButton.click();
    //cy.wait(1000);
    cy.get(".nav-link").contains("Logout").should("be.visible");
  })
})

describe('Login module', () => {
  it('GA-22-1 : Login - invalid data - username - invalid format', () => {
    cy.get(".nav-link").contains("Login").click();
    authPage.email.type('test').click();
    authPage.password.type(EMAIL.PASSWORD).click();
    authPage.loginButton.click();
    cy.wait(1000);
    authPage.email.then(($input) => {
      expect($input[0].validationMessage).to.eq('Please include an \'@\' in the email address. \'test\' is missing an \'@\'.')
    })
  })
})

describe('Login module', () => {
  it('GA-22-1 : Login - invalid data - username - empty field', () => {
    cy.get(".nav-link").contains("Login").click();
    //cy.get("#email").type('test').click();
    authPage.password.type(EMAIL.PASSWORD).click();
    authPage.loginButton.click();
    cy.wait(1000);
    authPage.email.then(($input) => {
      expect($input[0].validationMessage).to.eq('Please fill out this field.')
    })
  })
})


describe('Login module', () => {
  it.only('GA-22 : Login - invalid data - username', () => {
    cy.get(".nav-link").contains("Login").click();
    authPage.email.type(randomEmail()).click();
    authPage.password.type(EMAIL.PASSWORD).click();
    authPage.loginButton.click();
    cy.wait(1000);
    authPage.alert.should("be.visible");
  })
})

describe('Login module', () => {
  it('GA-25-1 : Login - invalid data - password - empty', () => {
    cy.get(".nav-link").contains("Login").click();
    authPage.email.type(EMAIL.EXISTING).click();
    //cy.get("#password").type(randomPassword).click();
    authPage.loginButton.click();
    cy.wait(1000);
    authPage.password.then(($input) => {
      expect($input[0].validationMessage).to.eq('Please fill out this field.')
    })
  })
})

  describe('Login module', () => {
    it('GA-25 : Login - invalid data - password', () => {
      cy.get(".nav-link").contains("Login").click();
      authPage.email.type(EMAIL.EXISTING).click();
      authPage.password.type(randomPassword).click();
      authPage.loginButton.click();
      cy.wait(1000);
      authPage.alert.should("be.visible")
        .should("have.text", "Bad Credentials")
        .should("have.class", "alert");
    })
  })

  describe('Login module', () => {
    it('GA-26 : Login - invalid data - username and password', () => {
      cy.get(".nav-link").contains("Login").click();
      authPage.email.type(randomEmail).click();
      authPage.password.type(randomPassword).click();
      authPage.loginButton.click();
      cy.wait(1000);
      authPage.alert.should("be.visible")
        .should("have.text", "Bad Credentials")
        .should("have.class", "alert");
    })
  })

  describe('Login module', () => {
    it('Login - empty data', () => {
      cy.get(".nav-link").contains("Login").click();
      //cy.get("#email").type(EMAIL.EXISTING).click();
      //cy.get("#password").type(randomPassword).click();
      authPage.loginButton.click();
      cy.wait(1000);
      authPage.email.then(($input) => {
        expect($input[0].validationMessage).to.eq('Please fill out this field.')
      })
    })
  })