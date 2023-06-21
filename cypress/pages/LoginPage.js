class LoginPage {
    constructor() {
        this.usernameInput = 'input#P9999_USERNAME';
        this.passwordInput = 'input#P9999_PASSWORD';
        this.rememberInput = 'input#P9999_REMEMBER_LABEL';
        this.rememberLabel = 'label#P9999_REMEMBER_LABEL';
        this.signInButton = 'button#B12601466532783624621';
    }

    fillUsername(username) {
        cy.fillInput(this.usernameInput, username);
    }

    fillPassword(password) {
        cy.fillInput(this.passwordInput, password);
    }

    clickSignInButton() {
        cy.get(this.signInButton).click();
    }

    clickRememberInput() {
        cy.get(this.rememberLabel).click();
    }

    checkInputRememberValue(value){
        cy.get(rememberInput).should('have.value', value);
    }

    performLogin(email, password) {
        this.fillUsername(email);
        this.fillPassword(password);
        this.clickSignInButton();
    }
}

export default new LoginPage();