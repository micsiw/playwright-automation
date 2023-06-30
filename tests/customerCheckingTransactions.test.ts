import { test, expect } from "@playwright/test";
import { parse } from "date-fns";
import LoginPage from "../pages/loginPage";
import CustomerLogin from "../pages/customerLoginPage";
import CustomerPanel from "../pages/customerPanelPage";
import CustomerTransactionsModule from "../pages/customerTransactionsModulePage";

test.describe("Customer checking transactions - Task 02", () => {
  let login: LoginPage;
  let customerLogin: CustomerLogin;
  let customerPanel: CustomerPanel;
  let transactions: CustomerTransactionsModule;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    customerLogin = new CustomerLogin(page);
    customerPanel = new CustomerPanel(page);
    transactions = new CustomerTransactionsModule(page);

    await login.goto();
  });

  test("Hermoine Granger view transactions", async ({ page }) => {
    const firstName = "Hermoine";
    const lastName = "Granger";
    const accountNumber = "1001";
    const start = "2015-03-01T15:21";
    const end = "2015-03-29T23:59";

    await login.loginAsCustomer();
    await customerLogin.chooseCustomer(firstName, lastName);
    await customerLogin.loginCustomer();
    await customerPanel.selectAccount(accountNumber);
    await customerPanel.runTransactionsModule();
    await transactions.chooseStartDate(start);
    await transactions.chooseEndDate(end);

    const transactionDates = await page.$$(transactions.getTransactionDates);
    const startDate = parse(start, "yyyy-MM-dd'T'HH:mm", new Date());
    const endDate = parse(end, "yyyy-MM-dd'T'HH:mm", new Date());

    //Looping through all received dates to check if they are in range

    for (const transactionDate of transactionDates) {
      const transactionDateString = await transactionDate.textContent();
      let someDate: Date;
      if (typeof transactionDateString === "string") {
        someDate = parse(
          transactionDateString,
          "MMM d, yyyy hh:mm:ss aa",
          new Date()
        );
        expect(someDate.getTime()).toBeGreaterThanOrEqual(startDate.getTime());
        expect(someDate.getTime()).toBeLessThanOrEqual(endDate.getTime());
      }
    }
  });
});
