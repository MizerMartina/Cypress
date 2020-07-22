/// <reference types="cypress"/>

const faker = require("faker");

var randomEmail = faker.internet.email();
var randomPassword = faker.internet.password();

describe('Login module', () => {
  it('GA-19 : Login page layout', () => {
    cy.visit("/");
    cy.get(".nav-link").contains("Login").click();
    cy.get("#email").should("be.visible");
    cy.get("#password").should("be.visible");
    cy.get("[type=submit]").should("be.visible");
    
  })
})


describe('Login module', () => {
  it('GA-28 : Login - valid data', () => {
    cy.visit("/");
    cy.get(".nav-link").contains("Login").click();
    cy.get("#email").type("test@test.com").click();
    cy.get("#password").type("12345678").click();
    cy.get("[type=submit]").contains("Submit").click();
    cy.wait(1000);
    cy.get(".nav-link").contains("Logout").should("be.visible");
  })
})

describe('Login module', () => {
  it('GA-22 : Login - invalid data - username', () => {
    cy.visit("/");
    cy.get(".nav-link").contains("Login").click();
    cy.get("#email").type(randomEmail).click();
    cy.get("#password").type("12345678").click();
    cy.get("[type=submit]").contains("Submit").click();
    cy.wait(1000);
    cy.get(".alert").contains("Bad Credentials").should("be.visible");
  })
})

describe('Login module', () => {
  it('GA-25 : Login - invalid data - password', () => {
    cy.visit("/");
    cy.get(".nav-link").contains("Login").click();
    cy.get("#email").type("test@test.com").click();
    cy.get("#password").type(randomPassword).click();
    cy.get("[type=submit]").contains("Submit").click();
    cy.wait(1000);
    cy.get(".alert").should("be.visible")
      .should("have.text", "Bad Credentials")
      .should("have.class", "alert");
  })
})

describe('Login module', () => {
  it('GA-26 : Login - invalid data - username and password', () => {
    cy.visit("/");
    cy.get(".nav-link").contains("Login").click();
    cy.get("#email").type(randomEmail).click();
    cy.get("#password").type(randomPassword).click();
    cy.get("[type=submit]").contains("Submit").click();
    cy.wait(1000);
    cy.get(".alert").should("be.visible")
      .should("have.text", "Bad Credentials")
      .should("have.class", "alert");
  })
})

