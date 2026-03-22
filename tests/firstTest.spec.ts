import {test} from "../fixture/fixtures.ts"
import { BaseElement } from "../helpers/elements/BaseElement.ts"

test("Test 1", async({page})=>{
    await page.goto("https://playwright.dev/")
    const title = new BaseElement(page, "//h1")
    await title.shouldBeVisible()
})