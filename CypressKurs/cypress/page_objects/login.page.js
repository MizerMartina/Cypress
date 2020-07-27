export default class AuthPage {
    get email() {
        return cy.get('#email')
    }

    get password() {
        return cy.get('#password')
    }

    get loginButton() {
        return cy.get('button[type=submit]')
    }
    get alert() {
        return cy.get('.alert-danger')
    }
    login (imejl, sifra) {
        this.email.type(imejl)
        this.password.type(sifra)
        this.loginButton.click()
    }
}

export const authPage = new AuthPage()