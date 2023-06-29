import { Locator, Page } from "@playwright/test";

export default class AddCustomerModule {
  readonly page: Page;
  readonly getFirstNameInput: Locator;
  readonly getLastNameInput: Locator;
  readonly getPostCodeInput: Locator;
  readonly getAddCustomerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getFirstNameInput = page.locator("//input[@placeholder='First Name']");
    this.getLastNameInput = page.locator("//input[@placeholder='Last Name']");
    this.getPostCodeInput = page.locator("//input[@placeholder='Post Code']");
    this.getAddCustomerButton = page.locator("//button[@type='submit']");
  }

  async enterFirstName(firstName: string) {
    await this.getFirstNameInput.type(firstName);
  }

  async enterLastName(lastName: string) {
    await this.getLastNameInput.type(lastName);
  }

  async enterPostCode(postCode: string) {
    await this.getPostCodeInput.type(postCode);
  }

  async addCustomer() {
    await this.getAddCustomerButton.click();
  }
}
