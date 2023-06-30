import { ElementHandle, Locator, Page } from "@playwright/test";

export default class CustomerTransactionsModule {
  readonly page: Page;
  readonly getStartDatePicker: Locator;
  readonly getEndDatePicker: Locator;
  readonly getTransactionDates: string;

  constructor(page: Page) {
    this.page = page;
    this.getStartDatePicker = page.locator("//input[@id='start']");
    this.getEndDatePicker = page.locator("//input[@id='end']");
    this.getTransactionDates = "//tbody//tr//td[1]";
  }

  async chooseStartDate(date: string) {
    await this.getStartDatePicker.fill(date);
  }

  async chooseEndDate(date: string) {
    await this.getEndDatePicker.fill(date);
  }
}
