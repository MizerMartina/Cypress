
import { EMAIL } from '../fixtures/constants';
import { authPage } from '../page_objects/login.page';
import { createGallery } from '../page_objects/create-gallery.page';

beforeEach(() => {
    //adding mock up galleries
    cy.server();
    cy.route('GET', Cypress.env('apiUrl') + '/my-galleries?page=1&term='/*, 'fixture:all.json'*/).as('homepage');
})

it('What?', () => {
    cy.loginBe(EMAIL.EXISTING, EMAIL.PASSWORD);
    cy.request('POST', Cypress.env('apiUrl') + '/auth/login', { "email": "test1@test.com", "password": "test1test" })
        .then((resp) => {
            expect(resp.body).to.have.property('access_token');
            expect(resp.body).to.have.property('token_type');
            localStorage.setItem('token', resp.body.access_token);

        })
    cy.visit('/my-galleries');
    cy.wait('@homepage');
    cy.get('@homepage').its('response').then((resp) => {
        for (var i = 0; i < 10; i++) {
            cy.request({
                method: 'DELETE',
                url: Cypress.env('apiUrl') + '/galleries/' + resp.body.galleries[i].id,
                form: true,
                followRedirect: true,
                headers: {
                    authorization: `Bearer ${window.localStorage.getItem('token')}`,
                }
            })
        }
        /* same as previous
        for (var i = 0; i < 10; i++) {
            let useCaseID = resp.body.galleries[i].id;
            cy.request({
                method: 'DELETE',
                url: `${Cypress.env('apiUrl')}/galleries/${useCaseID}`,
                form: true,
                followRedirect: true,
                headers: {
                    authorization: `Bearer ${window.localStorage.getItem('token')}`,
                }
            })
        }*/

    })
})
