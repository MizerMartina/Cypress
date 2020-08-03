
import { EMAIL } from '../fixtures/constants';
import { authPage } from '../page_objects/login.page';
import { createGallery } from '../page_objects/create-gallery.page';

const faker = require("faker");

var randomTitle = faker.lorem.words(3);
var randomDescription = faker.lorem.words(10);
var randomUrl = faker.image.imageUrl();


beforeEach(() => {
    //Login User
    cy.visit('/');
    cy.server();
    cy.route(Cypress.env('apiUrl')).as('homepage');
    cy.route(Cypress.env('apiUrl') + '/galleries?page=1&term=').as('galleries');
    cy.route(Cypress.env('apiUrl') + '/create').as('create-galleries');
    cy.get(".nav-link").contains("Login").click();
    authPage.login(EMAIL.EXISTING, EMAIL.PASSWORD);
    cy.wait('@galleries');
    cy.get(".nav-link").contains("Logout").should("be.visible");
})
describe('Create gallery module - visible', () => {
    it('GA-12 : Create new gallery - validate page info', () => {
        cy.get(".nav-link").contains("Create Gallery").click();
        cy.url().should("include", "/create");
        createGallery.title.should("be.visible");
        createGallery.description.should("be.visible");
        createGallery.imageUrl.should("be.visible");
        createGallery.addImage.should("be.visible");
        createGallery.submitButton.should("be.visible");
        createGallery.cancelButton.should("be.visible");
    })
})

describe('Create gallery module - visible', () => {
    it('GA-12 : Create new gallery - entering valid info', () => {
        cy.get(".nav-link").contains("Create Gallery").click();
        cy.url().should("include", "/create");
        createGallery.newGallery(randomTitle, randomDescription, randomUrl + '.jpg');
        // cy.get("#title").type(randomTitle);
        // cy.get("#description").type(randomDescription);
        // cy.get("input[type=url]").type(randomUrl + ".jpg");
        // cy.get("button[type=submit]").contains("Submit").click();
        cy.url().should("eq", "https://gallery-app.vivifyideas.com/");
    })
})

describe('Create gallery module - visible', () => {
    it.only('Validating "Load more" button', () => {
        //Going to My Galleries page and verifying that it is empty
        cy.get(".nav-link").contains("My Galleries").click();
        cy.url().should("include", "/my-galleries");
        cy.get('h4').contains("No galleries found").should('be.visible');
        cy.get('.btn').contains("Load more").should('not.be.visible');
        //Adding 10 galleries
        for (var i = 0; i < 10; i++) {
            cy.get(".nav-link").contains("Create Gallery").click();
            cy.url().should("include", "/create");
            createGallery.newGallery(randomTitle, randomDescription, randomUrl + '.jpg');
            cy.url().should("eq", "https://gallery-app.vivifyideas.com/");
        }
        //Going to My Galleries and verifying there are 10 galleries and not "Load more" button
        cy.get(".nav-link").contains("My Galleries").click();
        cy.url().should("include", "/my-galleries");
        cy.get('div.grid').children().should('have.length', 10);
        cy.scrollTo('bottom');
        cy.get('.btn').contains("Load more").should('not.be.visible');
        //Adding 11th gallery
        cy.get(".nav-link").contains("Create Gallery").click();
        cy.url().should("include", "/create");
        createGallery.newGallery(randomTitle, randomDescription, randomUrl + '.jpg');
        cy.url().should("eq", "https://gallery-app.vivifyideas.com/");
        //Verifying that there is "Load more" button and there are 11 galleries
        cy.get(".nav-link").contains("My Galleries").click();
        cy.url().should("include", "/my-galleries");
        cy.scrollTo('bottom');
        createGallery.loadMoreButton.should('be.visible');
        createGallery.loadMoreButton.click();
        cy.get('div.grid').children().should('have.length', 11);

    })
})

describe('Create gallery module - visible', () => {
    it('Delete all my galleries', () => {

        for (var i = 0; i < 11; i++) {
            cy.get(".nav-link").contains("My Galleries").click();
            cy.url().should("include", "/my-galleries");
            cy.get('h4').contains("No galleries found").should('not.be.visible');
            cy.get('.box-title').eq(0).click();
           cy.get('.btn-custom').contains('Delete Gallery').should('be.visible').click(); 
        }
        cy.get('h4').contains("No galleries found").should('be.visible');
        cy.get('.btn').contains("Load more").should('not.be.visible');

    })
})