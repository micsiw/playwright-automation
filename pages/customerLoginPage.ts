import { Locator, Page } from "@playwright/test";

export default class CustomerLogin {
  readonly page: Page;
  readonly getCustomerSelectionDropdown: Locator;
  readonly getCustomerLoginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getCustomerSelectionDropdown = page.locator(
      "//select[@id='userSelect']"
    );
    this.getCustomerLoginButton = page.locator(
      "//button[contains(text(),'Login')]"
    );
  }

  async chooseCustomer(firstName: string, lastName: string) {
    await this.getCustomerSelectionDropdown.selectOption(
      `${firstName} ${lastName}`
    );
  }

  async loginCustomer() {
    await this.getCustomerLoginButton.click();
  }
}
