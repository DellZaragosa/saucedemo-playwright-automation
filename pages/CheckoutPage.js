export class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.postalcodeInput = page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async submitInformation(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalcodeInput.fill(postalCode);
        await this.continueButton.click();
    }
}