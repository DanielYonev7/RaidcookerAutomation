import { test as base } from "@playwright/test";
import { Page } from "@playwright/test";
import * as allure from "allure-js-commons";
import fs from "fs";
import { getLogFilePath } from "../helpers/logger/logger.ts"

export class Application {
  //dashboardPage: DashboardPage;
  //profilePage: ProfilePage;
 
  constructor(page: Page) {
    //this.dashboardPage = new DashboardPage(page);
    //this.profilePage   = new ProfilePage(page);
  }
}
 
 
type CustomFixtures = {
  pageSection: Application;
};
 
export const test = base.extend<CustomFixtures>({
  pageSection: async ({ page }, use, testInfo) => {
    const app = new Application(page);
 
    await use(app);
 
    try {
      const logPath = getLogFilePath();
      if (fs.existsSync(logPath)) {
        const logContent = fs.readFileSync(logPath, "utf-8");
        await allure.attachment("Test Execution Logs", logContent, {
          contentType: "text/plain",
        });
      }
    } catch {
  
    }

    if (testInfo.status !== testInfo.expectedStatus) {
      try {
        const screenshot = await page.screenshot({ fullPage: true });
        await allure.attachment("Failure Screenshot", screenshot, {
          contentType: "image/png",
        });
      } catch {

      }
    }
  },
});
 
export { expect } from "@playwright/test";