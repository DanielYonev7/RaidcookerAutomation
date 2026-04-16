import { Page, expect } from "@playwright/test";
import * as allure from "allure-js-commons";
import { BaseElement } from "./BaseElement";
import { logger } from "../logger/logger";

export class Button extends BaseElement {
    constructor(page: Page, locator: string) {
    super(page, locator);
  }

  // ─── Actions ─────────────────────────────────────────────────────────────────

  async doubleClick(): Promise<void> {
    logger.info(`Double clicking button: ${this.locator}`);
    await this.getLocator().dblclick();
   
  }


  // ─── State Getters ────────────────────────────────────────────────────────────

  async isClickable(): Promise<boolean> {
    const visible = await this.getLocator().isVisible();
    const enabled = await this.getLocator().isEnabled();
    const clickable = visible && enabled;
    logger.info(`Button: ${this.locator} isClickable: ${clickable} (visible: ${visible}, enabled: ${enabled})`);
    return clickable;
  }

  async isEnabled(): Promise<boolean> {
    const enabled = await this.getLocator().isEnabled();
    logger.info(`Button: ${this.locator} isEnabled: ${enabled}`);
    return enabled;
  }

  async isDisabled(): Promise<boolean> {
    const disabled = await this.getLocator().isDisabled();
    logger.info(`Button: ${this.locator} isDisabled: ${disabled}`);
    return disabled;
  }

  async isFocused(): Promise<boolean> {
    const focused = await this.getLocator().evaluate((el) => el === document.activeElement);
    logger.info(`Button: ${this.locator} isFocused: ${focused}`);
    return focused;
  }

  // ─── Assertions ───────────────────────────────────────────────────────────────

  async shouldBeClickable(): Promise<void> {
    await allure.step(`Assert button is clickable: ${this.locator}`, async () => {
      logger.info(`Asserting button is clickable: ${this.locator}`);
      await expect(this.getLocator()).toBeVisible();
      await expect(this.getLocator()).toBeEnabled();
    });
  }

  async shouldNotBeClickable(): Promise<void> {
    await allure.step(`Assert button is not clickable: ${this.locator}`, async () => {
      logger.info(`Asserting button is not clickable: ${this.locator}`);
      const visible = await this.getLocator().isVisible();
      const enabled = await this.getLocator().isEnabled();
      const notClickable = !visible || !enabled;
      expect(notClickable).toBe(true);
    });
  }

  async shouldBeEnabled(): Promise<void> {
    await allure.step(`Assert button is enabled: ${this.locator}`, async () => {
      logger.info(`Asserting button is enabled: ${this.locator}`);
      await expect(this.getLocator()).toBeEnabled();
    });
  }

  async shouldBeDisabled(): Promise<void> {
    await allure.step(`Assert button is disabled: ${this.locator}`, async () => {
      logger.info(`Asserting button is disabled: ${this.locator}`);
      await expect(this.getLocator()).toBeDisabled();
    });
  }

  async shouldBeVisible(): Promise<void> {
    await allure.step(`Assert button is visible: ${this.locator}`, async () => {
      logger.info(`Asserting button is visible: ${this.locator}`);
      await expect(this.getLocator()).toBeVisible();
    });
  }

  async shouldNotBeVisible(): Promise<void> {
    await allure.step(`Assert button is not visible: ${this.locator}`, async () => {
      logger.info(`Asserting button is not visible: ${this.locator}`);
      await expect(this.getLocator()).not.toBeVisible();
    });
  }

  async shouldBeFocused(): Promise<void> {
    await allure.step(`Assert button is focused: ${this.locator}`, async () => {
      logger.info(`Asserting button is focused: ${this.locator}`);
      await expect(this.getLocator()).toBeFocused();
    });
  }
}