import {test} from "../fixture/fixtures.ts"
import { BaseElement } from "../helpers/elements/BaseElement.ts"

test("Test 1", async({page, pageSection})=>{
    await page.goto("/")
    const title = new BaseElement(page, "//h1")
    await title.shouldBeVisible()
    await page.waitForTimeout(5000)

})