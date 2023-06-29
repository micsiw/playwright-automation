import { Locator, Page } from "@playwright/test";

export default class OpenAccountModule {
  readonly page: Page;
  readonly getCustomerDropdown: Locator;
  readonly getCurrencyDropdown: Locator;
  readonly getProcessButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getCustomerDropdown = page.locator("//select[@id='userSelect']");
    this.getCurrencyDropdown = page.locator("//select[@id='currency']");
    this.getProcessButton = page.locator(
      "//button[contains(text(),'Process')]"
    );
  }

  async selectCustomer(firstName: string, lastName: string) {
    await this.getCustomerDropdown.selectOption(`${firstName} ${lastName}`);
  }

  async selectCurrency(currency: string) {
    await this.getCurrencyDropdown.selectOption(currency);
  }

  async createAccount() {
    await this.getProcessButton.click();
  }
}
