import { expect, Locator, Page } from "@playwright/test";

export default class CustomerPanel {
  readonly page: Page;
  readonly getAccountSelectionDropdown: Locator;
  readonly getSelectedAccount: Locator;
  readonly getTransactionsButton: Locator;
  readonly getDepositButton: Locator;
  readonly getWithdrawButton: Locator;
  readonly getLogoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getAccountSelectionDropdown = page.locator(
      "//select[@id='accountSelect']]"
    );
    this.getSelectedAccount = page.locator(
      "//div[@ng-hide='noAccount'][1]//strong[1]"
    );
    this.getTransactionsButton = page.locator(
      "//button[@ng-class='btnClass1' and contains(text(),'Transactions')]"
    );
    this.getDepositButton = page.locator(
      "//button[@ng-class='btnClass2' and contains(text(),'Deposit')]"
    );
    this.getWithdrawButton = page.locator(
      "//button[@ng-class='btnClass3' and contains(text(),'Withdraw')]"
    );
    this.getLogoutButton = page.locator("//button[contains(text(),'Logout')]");
  }

  async selectAccount(accountNumber: string) {
    await this.getAccountSelectionDropdown.selectOption(accountNumber);
    await expect(this.getSelectedAccount).toHaveText(accountNumber);
  }

  async runTransactionsModule() {
    await this.getTransactionsButton.click();
  }

  async runDepositModule() {
    await this.getDepositButton.click();
  }

  async runWithdrawModule() {
    await this.getWithdrawButton.click();
  }

  async logout() {
    await this.getLogoutButton.click();
  }
}
