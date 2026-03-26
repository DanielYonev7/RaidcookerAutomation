import { defineConfig, devices } from "@playwright/test";
import path from "path";

const ALLURE_RESULTS_DIR = "allure-results";

export default defineConfig({
  // ── Test discovery ──────────────────────────────────────────────────────────
  testDir: "./tests",

  // ── Execution settings ──────────────────────────────────────────────────────
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 60_000,

  // ── Reporters ───────────────────────────────────────────────────────────────
  reporter: [
    ["list"],
    [
      "allure-playwright",
      {
        outputFolder: ALLURE_RESULTS_DIR,
        suiteTitle: true,
        detail: false,
        environmentInfo: {
          NODE_VERSION: process.version,
          PLAYWRIGHT_VERSION: require("@playwright/test/package.json").version,
        },
      },
    ],
  ],

  // ── Shared browser settings ─────────────────────────────────────────────────
  use: {
    baseURL: process.env.BASE_URL ?? "http://localhost:4321/",

    // Screenshot on failure – attached to Allure at the failing step
    screenshot: "only-on-failure",

    // Full-page trace on first retry (opens in trace viewer)
    trace: "on-first-retry",

    // Record video on first retry
    video: "on-first-retry",

    // Viewport
    viewport: { width: 1920, height: 1080 },

    // Keep browser context around for step-level attachment hooks
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },

  // ── Allure output directory ─────────────────────────────────────────────────
  outputDir: path.resolve("test-results"),

  // ── Projects (browsers) ────────────────────────────────────────────────────
  
projects: [
  // ── Chromium ──────────────────────────────────────────────────────────────
  {
    name: "Chromium cookie storage and login",
    testDir: "./tests",
    testMatch: "**/login/Login.spec.ts",
    use: {
      ...devices["Desktop Chrome"],
      storageState: undefined,
    },
  },
  {
    name: "Chromium main tests",
    testDir: "./tests",
    testMatch: "**/*.spec.ts",
    testIgnore: ["**/Login.spec.ts"],
    use: {
      ...devices["Desktop Chrome"],
      storageState: "./storage/auth-chromium.json",
    },
    dependencies: ["Chromium cookie storage and login"],
  },


  // ── Firefox ───────────────────────────────────────────────────────────────
  {
    name: "Firefox cookie storage and login",
    testDir: "./tests",
    testMatch: "**/login/Login.spec.ts",
    use: {
      ...devices["Desktop Firefox"],
      storageState: undefined,
    },
  },
  {
    name: "Firefox main tests",
    testDir: "./tests",
    testMatch: "**/*.spec.ts",
    testIgnore: ["**/Login.spec.ts"],
    use: {
      ...devices["Desktop Firefox"],
      storageState: "./storage/auth-firefox.json",
    },
    dependencies: ["Firefox cookie storage and login"],
  },


  // ── WebKit ────────────────────────────────────────────────────────────────
  {
    name: "WebKit cookie storage and login",
    testDir: "./tests",
    testMatch: "**/login/Login.spec.ts",
    use: {
      ...devices["Desktop Safari"],
      storageState: undefined,
    },
  },
  {
    name: "WebKit main tests",
    testDir: "./tests",
    testMatch: "**/*.spec.ts",
    testIgnore: ["**/Login.spec.ts"],
    use: {
      ...devices["Desktop Safari"],
      storageState: "./storage/auth-webkit.json",
    },
    dependencies: ["WebKit cookie storage and login"],
  },
],
});
