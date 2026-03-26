import { test } from '../../fixture/fixtures'
import { step } from 'allure-js-commons'

test.describe("Login", ()=>{

    test.beforeEach(async({pageSection})=>{
        await pageSection.landingPage.navigateTo()
    })

    test("01. Successful login", async({page, pageSection, browserName})=>{
        await step("Step 1: Click on the 'Login' button from the navigation bar", async()=>{
            await pageSection.header.clickLoginButton()
        })

        await step("Step: 2: Click the 'Login' button in the 'Sign in' page", async()=>{
            await pageSection.signInPage.clickLoginButton()
        })

        await step("Step 3: Login with valid credentials", async()=>{
            await pageSection.loginPage.login()
        })

        await step("Step 4: Save browser storage", async()=>{
            
            await page.context().storageState({
                path: `./storage/auth-${browserName}.json` // "chromium" | "firefox" | "webkit"
            });
    })
    })
})