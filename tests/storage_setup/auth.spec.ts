import { test } from '../../fixture/fixtures'
import {step} from 'allure-js-commons'

test('Create session state', async ({ page, pageSection, browserName }) => {

    await step("Step 0: Navigate to URL", async()=>{
        await page.goto('/')
    })

    await step("Step 1: Click on the 'Login' button from the navigation bar", async()=>{
            await pageSection.header.clickLoginButton()
        })

    await step("Step: 2: Click the 'Login' button in the 'Sign in' page", async()=>{
        await pageSection.signInPage.clickLoginButton()
    })

    await step("Step 3: Login with valid credentials", async()=>{
        await pageSection.loginPage.login()
    })

    await page.context().storageState({
        path: `./storage/auth-${browserName}.json` // "chromium" | "firefox" | "webkit"
    });
});