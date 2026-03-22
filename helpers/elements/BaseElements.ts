import { Locator, Page, expect } from "@playwright/test";
import { BaseElement } from "./BaseElement";
import { logger } from "../logger/logger";

export class BaseElements {
  protected locator: string;
  protected page: Page;

  constructor(page: Page, locator: string) {
    this.locator = locator;
    this.page = page;
  }

  protected getLocator(): Locator {
    return this.page.locator(this.locator);
  }

  // ─── Collection Access ────────────────────────────────────────────────────────

  nth(index: number): BaseElement {
    const nthLocator = `${this.locator} >> nth=${index}`;
    return new BaseElement(this.page, nthLocator);
  }

  first(): BaseElement {
    return this.nth(0);
  }

  async last(): Promise<BaseElement> {
    const count = await this.getCount();
    return this.nth(count - 1);
  }

  async all(): Promise<BaseElement[]> {
    const count = await this.getCount();
    logger.info(`Retrieving all ${count} elements for locator: ${this.locator}`);
    return Array.from({ length: count }, (_, i) => this.nth(i));
  }

  // ─── Getters ──────────────────────────────────────────────────────────────────

  async getCount(): Promise<number> {
    const count = await this.getLocator().count();
    logger.info(`Element collection: ${this.locator} count: ${count}`);
    return count;
  }

  async getAllTexts(): Promise<string[]> {
    logger.info(`Getting all texts from collection: ${this.locator}`);
    const texts = await this.getLocator().allInnerTexts();
    logger.info(`Texts retrieved: ${JSON.stringify(texts)}`);
    return texts;
  }

  async getAllAttributes(attributeName: string): Promise<(string | null)[]> {
    logger.info(`Getting all "${attributeName}" attributes from collection: ${this.locator}`);
    const count = await this.getCount();
    const attributes: (string | null)[] = [];
    for (let i = 0; i < count; i++) {
      attributes.push(await this.getLocator().nth(i).getAttribute(attributeName));
    }
    logger.info(`Attributes retrieved: ${JSON.stringify(attributes)}`);
    return attributes;
  }

  async isVisible(): Promise<boolean> {
    const visible = await this.getLocator().first().isVisible();
    logger.info(`Collection: ${this.locator} first element isVisible: ${visible}`);
    return visible;
  }

  // ─── Actions ─────────────────────────────────────────────────────────────────

  async clickNth(index: number, options?: Parameters<Locator["click"]>[0]): Promise<void> {
    logger.info(`Clicking element at index ${index} in collection: ${this.locator}`);
    await this.getLocator().nth(index).click(options);
  }

  async clickFirst(options?: Parameters<Locator["click"]>[0]): Promise<void> {
    await this.clickNth(0, options);
  }

  async hoverNth(index: number, options?: Parameters<Locator["hover"]>[0]): Promise<void> {
    logger.info(`Hovering element at index ${index} in collection: ${this.locator}`);
    await this.getLocator().nth(index).hover(options);
  }

  async clickByText(text: string): Promise<void> {
    logger.info(`Clicking element with text "${text}" in collection: ${this.locator}`);
    await this.getLocator().filter({ hasText: text }).first().click();
  }

  // ─── Assertions ───────────────────────────────────────────────────────────────

  async shouldBeVisible(timeout?: number): Promise<void> {
    logger.info(`Asserting collection is visible: ${this.locator}`);
    await expect(this.getLocator().first()).toBeVisible({ timeout });
  }

  async shouldNotBeVisible(timeout?: number): Promise<void> {
    logger.info(`Asserting collection is not visible: ${this.locator}`);
    await expect(this.getLocator().first()).not.toBeVisible({ timeout });
  }

  async shouldHaveCount(count: number): Promise<void> {
    logger.info(`Asserting collection: ${this.locator} has count: ${count}`);
    await expect(this.getLocator()).toHaveCount(count);
  }

  async shouldHaveMinCount(min: number): Promise<void> {
    logger.info(`Asserting collection: ${this.locator} has at least ${min} elements`);
    const count = await this.getCount();
    expect(count).toBeGreaterThanOrEqual(min);
  }

  async shouldContainText(text: string): Promise<void> {
    logger.info(`Asserting collection: ${this.locator} contains text: "${text}"`);
    expect(await this.getLocator().filter({ hasText: text }).count()).toBeGreaterThan(0);
  }

  async shouldIncludeTexts(texts: string[]): Promise<void> {
    logger.info(`Asserting collection: ${this.locator} includes texts: ${JSON.stringify(texts)}`);
    await expect(this.getLocator()).toContainText(texts);
  }

  // ─── Wait Helpers ─────────────────────────────────────────────────────────────

  async waitForVisible(timeout?: number): Promise<void> {
    logger.info(`Waiting for collection to be visible: ${this.locator}`);
    await this.getLocator().first().waitFor({ state: "visible", timeout });
  }

  async waitForCount(count: number, timeout = 10000): Promise<void> {
    logger.info(`Waiting for collection: ${this.locator} to have count: ${count}`);
    await expect(this.getLocator()).toHaveCount(count, { timeout });
  }
}