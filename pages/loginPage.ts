import { Locator, Page } from "@playwright/test";

export default class loginPage {
  readonly page: Page;
  readonly getCustomerLoginButton: Locator;
  readonly getManagerLoginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getCustomerLoginButton = page.locator(
      "//button[contains(text(),'Customer Login')]"
    );
    this.getManagerLoginButton = page.locator(
      "//button[contains(text(),'Bank Manager Login')]"
    );
  }

  async goto() {
    await this.page.goto("/");
  }

  async loginAsCustomer() {
    await this.getCustomerLoginButton.click();
  }

  async loginAsManager() {
    await this.getManagerLoginButton.click();
  }
}
