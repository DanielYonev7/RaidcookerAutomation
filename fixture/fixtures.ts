import { test as base } from "@playwright/test";
import { Page } from "@playwright/test";
import * as allure from "allure-js-commons";
import fs from "fs";
import { getLogFilePath } from "../helpers/logger/logger.ts"
import { LandingPage } from "../POM/landing_page/LandingPage.ts"

interface PageFixtures{
  pageSection: PageSections
}
 
 
interface PageSections{
  landingPage: LandingPage
}
 
export const test = base.extend<PageFixtures>({
  pageSection: async ({ page }, use, testInfo) => {
    const pageSection: PageSections ={
      landingPage: new LandingPage(page)
    }
 
    await use(pageSection);
 
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