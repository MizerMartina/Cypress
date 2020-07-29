export default class CreateGallery {
    get title() {
        return cy.get('#title')
    }

    get description() {
        return cy.get('#description')
    }

    get imageUrl() {
        return cy.get('input[type=url]')
    }

    get addImage() {
        return cy.get('button[type=button]').contains("Add image")
    }
    get submitButton() {
        return cy.get('button[type=submit]').contains("Submit")
    }
    get cancelButton() {
        return cy.get('button[type=submit]').contains("Cancel")
    }

    get loadMoreButton() {
        return cy.get('.btn').contains("Load More");
    }

    newGallery (naziv, opis, urlSlike) {
        this.title.type(naziv);
        this.description.type(opis);
        this.imageUrl.type(urlSlike);
        this.submitButton.click();
    }

}

export const createGallery = new CreateGallery()