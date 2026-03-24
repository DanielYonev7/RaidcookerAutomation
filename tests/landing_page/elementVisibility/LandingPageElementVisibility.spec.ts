import { test, expect } from "../../../fixture/fixtures.ts"
import { step } from "allure-js-commons"

test.describe("Landing Page - Element visibility", ()=>{
    test.beforeEach(async({pageSection})=>{
        await pageSection.landingPage.navigateTo()
    })

    test.only("01. Text elements visibility", async({pageSection})=>{
        await step("Step 1: Assert guild management title is visible", async()=>{
            await pageSection.landingPage.guildManagementTitle.shouldBeVisibleSoft()
        })

        await step("Step 2: Assert 'Your raid team' and 'One platform' titles are visible", async()=>{
            await pageSection.landingPage.yourRaidTeamText.shouldBeVisibleSoft()
            await pageSection.landingPage.onePlatformText.shouldBeVisibleSoft()
        })

        await step("Step 3: Assert title description to be visible", async()=>{
            await pageSection.landingPage.titleDescription.shouldBeVisibleSoft()
        })

        await step("Step 4: Assert 'Get started' and 'See features' buttons visibility", async()=>{
            await pageSection.landingPage.upperGetStartedButton.shouldBeVisibleSoft()
            await pageSection.landingPage.seeFeaturesButton.shouldBeVisibleSoft()
        })

        await step("Step 5: Click on the 'See features' button", async()=>{
            await pageSection.landingPage.clickSeeFeaturesButton()
        })

        await step("Step 6: Assert that middle page titles are visible", async()=>{
            await pageSection.landingPage.whatsInsideText.shouldBeVisibleSoft()
            await pageSection.landingPage.builtForOfficersText.shouldBeVisibleSoft()
        })

        await step("Step 7: Scroll to the 'Ready to cook?' title text", async()=>{
            await pageSection.landingPage.readyToCookText.scrollIntoView()
        })

        await step("Step 8: Assert lower page elements are visible", async()=>{
            await pageSection.landingPage.readyToCookText.shouldBeVisibleSoft()
            await pageSection.landingPage.connectAccountText.shouldBeVisibleSoft()
            await pageSection.landingPage.lowerGetStartedButton.shouldBeVisibleSoft()
        })
    })
})