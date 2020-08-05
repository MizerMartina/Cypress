
import { EMAIL } from '../fixtures/constants';
import { createGallery } from '../page_objects/create-gallery.page';
import {authPage} from '../page_objects/login.page';

const faker = require("faker");

var randomTitle = faker.lorem.words(3);
var randomDescription = faker.lorem.words(10);
var randomUrl = faker.image.imageUrl();

var editedTitle = "Izmenjen naziv";
var editedDesc = "Izmenjen opis";
var editUrlSlike = "https://i.pinimg.com/564x/e6/f2/15/e6f2155260df5dc7d85a8dd1cf40efc6.jpg";

beforeEach(() => {

    cy.server();
    cy.route('GET', Cypress.env('apiUrl') + '/galleries?page=1&term=').as('home');
    cy.route('GET', Cypress.env('apiUrl') + '/my-galleries?page=1&term=').as('myGalleries');
    //cy.route('GET', Cypress.env('apiUrl') + `/galleries/${useCaseID}/edit`).as('editMyGallery');


})

it('Create and select gallery', () => {
    cy.loginBe(EMAIL.EXISTING, EMAIL.PASSWORD);
    cy.request('POST', Cypress.env('apiUrl') + '/auth/login', { "email": "test1@test.com", "password": "test1test" })
        .then((resp) => {
            expect(resp.body).to.have.property('access_token');
            expect(resp.body).to.have.property('token_type');
            localStorage.setItem('token', resp.body.access_token);

        })
    cy.visit('/create');
    cy.wait('@home');

    createGallery.newGallery(randomTitle, randomDescription, randomUrl + '.jpg');

    cy.wait('@home');
    cy.url().should("eq", 'https://gallery-app.vivifyideas.com/');
    cy.visit('/my-galleries');
    cy.wait('@myGalleries');
    cy.get('@myGalleries').its('response').then((resp) => {
        let useCaseID = resp.body.galleries[0].id;

        cy.route('GET', Cypress.env('apiUrl') + `/galleries/${useCaseID}`).as('currentGallery');
        cy.route('GET', Cypress.env('apiUrl') + `/galleries/${useCaseID}/edit`).as('editMyGallery');

        cy.get('.box-title').eq(0).click();
        cy.wait('@currentGallery')
        cy.url().should("include", `/${useCaseID}`);
        // createGallery.editGalleryButton.click();
        // cy.wait('@editMyGallery')
        // cy.url().should("eq", `https://gallery-api.vivifyideas.com/api/galleries/${useCaseID}/edit`);

    })

})



it.only('Edit gallery', () => {
    cy.visit('/');
    cy.server();

    cy.get(".nav-link").contains("Login").click();
    authPage.login(EMAIL.EXISTING, EMAIL.PASSWORD);
    cy.get('.nav-link');
    cy.visit('/my-galleries');
    cy.wait('@myGalleries');
    cy.get('@myGalleries').its('response').then((resp) => {
        let useCaseID = resp.body.galleries[0].id;

        cy.route('GET', Cypress.env('apiUrl') + `/galleries/${useCaseID}`).as('currentGallery');
        cy.route('GET', Cypress.env('apiUrl') + `/galleries/${useCaseID}/edit`).as('editMyGallery');

        cy.get('.box-title').eq(0).click();
        cy.wait('@currentGallery')
        cy.url().should("include", `/${useCaseID}`);
        // createGallery.editGalleryButton.click();
        // cy.wait('@editMyGallery')
        // cy.url().should("eq", `https://gallery-api.vivifyideas.com/api/galleries/${useCaseID}/edit`);

    })

})