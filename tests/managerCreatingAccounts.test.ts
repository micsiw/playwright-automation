import { test, expect } from "@playwright/test";
import LoginPage from "../pages/loginPage";
import ManagerPanel from "../pages/managerPanelPage";
import AddCustomerModule from "../pages/managerAddCustomerModulePage";
import OpenAccountModule from "../pages/managerOpenAccountModulePage";
import CustomersModule from "../pages/managerCustomersModulePage";
import customers from "../test-data/customers";

test.describe("Manager creating accounts - Task 01", () => {
  let login: LoginPage;
  let panel: ManagerPanel;
  let addCustomer: AddCustomerModule;
  let openAccount: OpenAccountModule;
  let manageCustomers: CustomersModule;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    panel = new ManagerPanel(page);
    addCustomer = new AddCustomerModule(page);
    openAccount = new OpenAccountModule(page);
    manageCustomers = new CustomersModule(page);
    await login.goto();
  });

  test("Creating client number 1", async () => {
    const firstName = customers[0].firstName;
    const lastName = customers[0].lastName;
    const postCode = customers[0].postCode;
    const currency = "Pound";

    await login.loginAsManager();
    await panel.runAddCustomerModule();
    await addCustomer.enterFirstName(firstName);
    await addCustomer.enterLastName(lastName);
    await addCustomer.enterPostCode(postCode);
    await addCustomer.add();
    await panel.runOpenAccountModule();
    await openAccount.selectCustomer(firstName, lastName);
    await openAccount.selectCurrency(currency);
    await openAccount.createAccount();
    await panel.runCustomersModule();
    await manageCustomers.searchCustomer(lastName);
    await manageCustomers.validateCustomer(firstName, lastName, postCode);
    await expect(manageCustomers.getAccounts).toHaveCount(1);
  });

  test("Creating client number 2", async () => {
    const firstName = customers[1].firstName;
    const lastName = customers[1].lastName;
    const postCode = customers[1].postCode;
    const currency = ["Dollar", "Pound"];

    await login.loginAsManager();
    await panel.runAddCustomerModule();
    await addCustomer.enterFirstName(firstName);
    await addCustomer.enterLastName(lastName);
    await addCustomer.enterPostCode(postCode);
    await addCustomer.add();
    await panel.runOpenAccountModule();
    await openAccount.selectCustomer(firstName, lastName);
    await openAccount.selectCurrency(currency[0]);
    await openAccount.createAccount();
    await openAccount.selectCustomer(firstName, lastName);
    await openAccount.selectCurrency(currency[1]);
    await openAccount.createAccount();
    await panel.runCustomersModule();
    await manageCustomers.searchCustomer(lastName);
    await manageCustomers.validateCustomer(firstName, lastName, postCode);
    await expect(manageCustomers.getAccounts).toHaveCount(2);
  });
});
