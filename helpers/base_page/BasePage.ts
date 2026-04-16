import { Page, expect } from "@playwright/test";
import { logger } from "../logger/logger";

export class BasePage {
  constructor(protected readonly page: Page) {}

  // ─── Navigation ───────────────────────────────────────────────────────────────

  async navigateTo(url: string): Promise<void> {
    logger.info(`Navigating to: ${url}`);
    await this.page.goto(url);
  }

  async navigateBack(): Promise<void> {
    logger.info("Navigating back");
    await this.page.goBack();
  }

  async navigateForward(): Promise<void> {
    logger.info("Navigating forward");
    await this.page.goForward();
  }

  async reloadPage(): Promise<void> {
    logger.info("Reloading page");
    await this.page.reload();
  }

  // ─── Page Info ────────────────────────────────────────────────────────────────

  async getTitle(): Promise<string> {
    const title = await this.page.title();
    logger.info(`Page title: "${title}"`);
    return title;
  }

  async getUrl(): Promise<string> {
    const url = this.page.url();
    logger.info(`Current URL: "${url}"`);
    return url;
  }

  // ─── Wait Helpers ─────────────────────────────────────────────────────────────

  async waitForPageLoad(): Promise<void> {
    logger.info("Waiting for page to load");
    await this.page.waitForLoadState("load");
  }

  async waitForNetworkIdle(): Promise<void> {
    logger.info("Waiting for network idle");
    await this.page.waitForLoadState("networkidle");
  }

  // ─── Assertions ───────────────────────────────────────────────────────────────

  async shouldHaveTitle(title: string | RegExp): Promise<void> {
    logger.info(`Asserting page title is: "${title}"`);
    await expect(this.page).toHaveTitle(title);
  }

  async shouldHaveUrl(url: string | RegExp): Promise<void> {
    logger.info(`Asserting page URL is: "${url}"`);
    await expect(this.page).toHaveURL(url);
  }

}