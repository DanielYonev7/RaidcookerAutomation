import { Page } from "@playwright/test";
import { BaseElement } from "./BaseElement";
import { logger } from "../logger/logger.ts";
import { expect } from '@playwright/test'

export class InputElement extends BaseElement {
    constructor(page: Page, locator: string) {
    super(page, locator);
  }

  // ─── Actions ─────────────────────────────────────────────────────────────────

  async fill(value: string): Promise<void> {
    logger.info(`Adding text "${value}" to input: ${this.locator}`);
    await this.getLocator().fill(value);
  
  }

  async clearText(): Promise<void> {
    logger.info(`Clearing input: ${this.locator}`);
    await this.getLocator().clear();
  }

  // ─── Assertions ───────────────────────────────────────────────────────────────

  async shouldHaveValue(value: string): Promise<void> {   
    logger.info(`Asserting input: ${this.locator} has value: "${value}"`);
    await expect(this.getLocator()).toHaveValue(value);

  }

  async shouldBeEmpty(): Promise<void> {
    logger.info(`Asserting input is empty: ${this.locator}`);
    await expect(this.getLocator()).toBeEmpty();
  }
}