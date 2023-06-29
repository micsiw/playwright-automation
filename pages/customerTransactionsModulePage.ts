import { Locator, Page } from "@playwright/test";

export default class CustomerTransactionsModule {
  readonly page: Page;
  readonly getStartDatePicker: Locator;
  readonly getEndDatePicker: Locator;
  readonly getTransactionList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getStartDatePicker = page.locator("//input[@id='start']");
    this.getEndDatePicker = page.locator("//input[@id='end']");
    this.getTransactionList = page.locator("//tbody//tr");
  }

  //date format: '2015-01-01T00:00'

  async chooseStartDate(date: string) {
    await this.getStartDatePicker.fill(date);
  }

  async chooseEndDate(date: string) {
    await this.getEndDatePicker.fill(date);
  }

  selectTransactionList() {
    this.getTransactionList;
  }
}
