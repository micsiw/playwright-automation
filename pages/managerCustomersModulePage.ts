import { expect, Locator, Page } from "@playwright/test";

export default class CustomersModule {
  readonly page: Page;
  readonly getSearchCustomerInput: Locator;
  readonly getFirstName: Locator;
  readonly getLastName: Locator;
  readonly getPostCode: Locator;
  readonly getAccounts: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getSearchCustomerInput = page.locator(
      "//input[@type='text' and @placeholder='Search Customer']"
    );
    this.getFirstName = page.locator("//tbody//td[1]");
    this.getLastName = page.locator("//tbody//td[2]");
    this.getPostCode = page.locator("//tbody//td[3]");
    this.getAccounts = page.locator("//tbody//td[4]");
  }

  async searchCustomer(lastName: string) {
    await this.getSearchCustomerInput.type(lastName);
  }

  async validateCustomer(
    firstName: string,
    lastName: string,
    postCode: string
  ) {
    expect(this.getFirstName).toHaveText(firstName);
    expect(this.getLastName).toHaveText(lastName);
    expect(this.getPostCode).toHaveText(postCode);
  }

  selectCustomerAccounts() {
    this.getAccounts;
  }
}
