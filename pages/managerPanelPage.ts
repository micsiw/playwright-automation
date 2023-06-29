import { Locator, Page } from "@playwright/test";

export default class ManagerPanel {
  readonly page: Page;
  readonly getAddCustomerButton: Locator;
  readonly getOpenAccountButton: Locator;
  readonly getCustomersButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getAddCustomerButton = page.locator(
      "//button[@ng-class='btnClass1' and contains(text(),'Add Customer')]"
    );
    this.getOpenAccountButton = page.locator(
      "//button[@ng-class='btnClass2' and contains(text(),'Open Account')]"
    );
    this.getCustomersButton = page.locator(
      "//button[@ng-class='btnClass3' and contains(text(),'Customers')]"
    );
  }

  async runAddCustomerModule() {
    await this.getAddCustomerButton.click();
  }

  async runOpenAccountModule() {
    await this.getOpenAccountButton.click();
  }

  async runCustomersModule() {
    await this.getCustomersButton.click();
  }
}
