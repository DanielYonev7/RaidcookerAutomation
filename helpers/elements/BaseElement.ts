import { Locator, Page, expect } from "@playwright/test";
import { logger } from "../logger/logger";

export class BaseElement {
  protected locator: string;
  protected page: Page;

  constructor(page: Page, locator: string) {
    this.locator = locator;
    this.page = page;
  }

  protected getLocator(): Locator {
    return this.page.locator(this.locator);
  }

  // ─── Actions ────────────────────────────────────────────────────────────────

   async click(): Promise<void> {
    try {
      logger.info(`Clicking element: ${this.locator}`);
      await this.getLocator().click();
    } catch (error) {
      logger.error(`Failed to click element: ${this.locator} | Error: ${error}`);
      throw error;
    }
  }
 
  async hover(): Promise<void> {
    try {
      logger.info(`Hovering element: ${this.locator}`);
      await this.getLocator().hover();
    } catch (error) {
      logger.error(`Failed to hover element: ${this.locator} | Error: ${error}`);
      throw error;
    }
  }
 
  async focus(): Promise<void> {
    try {
      logger.info(`Focusing element: ${this.locator}`);
      await this.getLocator().focus();
    } catch (error) {
      logger.error(`Failed to focus element: ${this.locator} | Error: ${error}`);
      throw error;
    }
  }
 
  async selectOption(value: string | string[]): Promise<void> {
    try {
      logger.info(`Selecting option "${value}" on element: ${this.locator}`);
      await this.getLocator().selectOption(value);
    } catch (error) {
      logger.error(`Failed to select option "${value}" on element: ${this.locator} | Error: ${error}`);
      throw error;
    }
  }
 
  async pressKey(key: string): Promise<void> {
    try {
      logger.info(`Pressing key "${key}" on element: ${this.locator}`);
      await this.getLocator().press(key);
    } catch (error) {
      logger.error(`Failed to press key "${key}" on element: ${this.locator} | Error: ${error}`);
      throw error;
    }
  }
 
  async scrollIntoView(): Promise<void> {
    try {
      logger.info(`Scrolling element into view: ${this.locator}`);
      await this.getLocator().scrollIntoViewIfNeeded();
    } catch (error) {
      logger.error(`Failed to scroll element into view: ${this.locator} | Error: ${error}`);
      throw error;
    }
  }
  // ─── Getters ─────────────────────────────────────────────────────────────────

  async getText(): Promise<string> {
    logger.info(`Getting text from element: ${this.locator}`);
    const text = await this.getLocator().innerText();
    logger.info(`Text retrieved: "${text}"`);
    return text;
  }

  async getAttribute(attributeName: string): Promise<string | null> {
    logger.info(`Getting attribute "${attributeName}" from element: ${this.locator}`);
    const value = await this.getLocator().getAttribute(attributeName);
    logger.info(`Attribute "${attributeName}" value: "${value}"`);
    return value;
  }

  async getCssAttribute(property: string): Promise<string> {
    logger.info(`Getting CSS property "${property}" from element: ${this.locator}`);
    const value = await this.getLocator().evaluate(
      (el, prop) => window.getComputedStyle(el).getPropertyValue(prop),
      property
    );
    logger.info(`CSS property "${property}" value: "${value}"`);
    return value;
  }

  async isVisible(): Promise<boolean> {
    const visible = await this.getLocator().isVisible();
    logger.info(`Element: ${this.locator} isVisible: ${visible}`);
    return visible;
  }

  async isEnabled(): Promise<boolean> {
    const enabled = await this.getLocator().isEnabled();
    logger.info(`Element: ${this.locator} isEnabled: ${enabled}`);
    return enabled;
  }

  async isChecked(): Promise<boolean> {
    const checked = await this.getLocator().isChecked();
    logger.info(`Element: ${this.locator} isChecked: ${checked}`);
    return checked;
  }

  async getCount(): Promise<number> {
    const count = await this.getLocator().count();
    logger.info(`Element: ${this.locator} count: ${count}`);
    return count;
  }

  // ─── Assertions ───────────────────────────────────────────────────────────────

  async shouldBeVisible(): Promise<void> {
    logger.info(`Asserting element is visible: ${this.locator}`);
    await expect(this.getLocator()).toBeVisible();
  }

  async shouldBeVisibleSoft(): Promise<void> {
    logger.info(`Asserting element is visible: ${this.locator}`);
    await expect.soft(this.getLocator()).toBeVisible();
  }

  async shouldNotBeVisible(): Promise<void> {
    logger.info(`Asserting element is not visible: ${this.locator}`);
    await expect(this.getLocator()).not.toBeVisible();
  }
  
  async shouldNotBeVisibleSoft(): Promise<void> {
    logger.info(`Asserting element is not visible: ${this.locator}`);
    await expect.soft(this.getLocator()).not.toBeVisible();
  }

  async shouldBeEnabled(): Promise<void> {
    logger.info(`Asserting element is enabled: ${this.locator}`);
    await expect(this.getLocator()).toBeEnabled();
  }

  async shouldBeDisabled(): Promise<void> {
    logger.info(`Asserting element is disabled: ${this.locator}`);
    await expect(this.getLocator()).toBeDisabled();
  }

  async shouldBeChecked(): Promise<void> {
    logger.info(`Asserting element is checked: ${this.locator}`);
    await expect(this.getLocator()).toBeChecked();
  }

  async shouldHaveText(text: string | RegExp): Promise<void> {
    logger.info(`Asserting element: ${this.locator} has text: "${text}"`);
    await expect(this.getLocator()).toHaveText(text);
  }

  async shouldContainText(text: string | RegExp): Promise<void> {
    logger.info(`Asserting element: ${this.locator} contains text: "${text}"`);
    await expect(this.getLocator()).toContainText(text);
  }

  async shouldHaveValue(value: string | RegExp): Promise<void> {
    logger.info(`Asserting element: ${this.locator} has value: "${value}"`);
    await expect(this.getLocator()).toHaveValue(value);
  }

  async shouldHaveAttribute(attribute: string, value: string | RegExp): Promise<void> {
    logger.info(`Asserting element: ${this.locator} has attribute "${attribute}": "${value}"`);
    await expect(this.getLocator()).toHaveAttribute(attribute, value);
  }

  async shouldHaveCount(count: number): Promise<void> {
    logger.info(`Asserting element: ${this.locator} count is: ${count}`);
    await expect(this.getLocator()).toHaveCount(count);
  }

  async shouldHaveCssProperty(property: string, value: string): Promise<void> {
    logger.info(`Asserting element: ${this.locator} CSS "${property}" is "${value}"`);
    await expect(this.getLocator()).toHaveCSS(property, value);
  }

  // ─── Wait Helpers ────────────────────────────────────────────────────────────

  async waitForVisible(): Promise<void> {
    logger.info(`Waiting for element to be visible: ${this.locator}`);
    await this.getLocator().waitFor({ state: "visible"});
  }

  async waitForHidden(): Promise<void> {
    logger.info(`Waiting for element to be hidden: ${this.locator}`);
    await this.getLocator().waitFor({ state: "hidden"});
  }
}