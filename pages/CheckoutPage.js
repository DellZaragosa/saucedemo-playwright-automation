export class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.fnameInput = page.getByPlaceholder('First Name');
        this.lnameInput = page.getByPlaceholder('Last Name');
        this.postalcodeInput = page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
    }

    async submitInformation(firstName, lastName, postalCode) {
        await this.fnameInput.fill(firstName);
        await this.lnameInput.fill(lastName);
        await this.postalcodeInput.fill(postalCode);
        await this.continueButton.click();
    }
}