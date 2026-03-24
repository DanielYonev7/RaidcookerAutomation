import { Page } from "@playwright/test";
import { BasePage } from "../../helpers/base_page/BasePage.ts";
import { BaseElement } from "../../helpers/elements/BaseElement.ts";
import { Button } from "../../helpers/elements/Button.ts";
import { GridCard } from "./GridCard.ts";
import { logger } from "../../helpers/logger/logger.ts";

export class LandingPage extends BasePage{

    //upper page section
    guildManagementTitle: BaseElement
    yourRaidTeamText: BaseElement
    onePlatformText: BaseElement
    titleDescription: BaseElement

    //middle page section
    whatsInsideText: BaseElement
    builtForOfficersText: BaseElement

    //buttons
    upperGetStartedButton: Button
    lowerGetStartedButton: Button
    seeFeaturesButton: Button

    //grid cards
    gridCards: GridCard[]

    rosterManagement: GridCard
    raidCompositions: GridCard
    lootSheets: GridCard
    permissionControl: GridCard
    battleNetSync: GridCard
    multiGuildSupport: GridCard

    //lower section
    readyToCookText: BaseElement
    connectAccountText: BaseElement


    constructor(page: Page){
        super(page)

        this.guildManagementTitle = new BaseElement(page, "//p[contains(normalize-space(), 'World of Warcraft · Guild Management')]")
        this.yourRaidTeamText = new BaseElement(page, "//h1[contains(normalize-space(), 'Your raid team.')]")
        this.onePlatformText = new BaseElement(page, "//span[contains(normalize-space(), 'One platform.')]")
        this.titleDescription = new BaseElement(page, "//p[contains(normalize-space(), 'From roster management')]")
        this.upperGetStartedButton = new Button(page, `//div[@class='flex items-center gap-4']//a[@href="/get-started"]`)
        this.lowerGetStartedButton = new Button(page, `//section[@class='px-8 py-24']//a[@href="/get-started"]`)
        this.seeFeaturesButton = new Button(page, `//a[@href="#features"]`)
        this.whatsInsideText = new BaseElement(page, `//p[contains(text(), concat("What", "'", "s inside"))]`)
        this.builtForOfficersText = new BaseElement(page, "//h2[contains(text(), 'Built for officers,')]")
        this.rosterManagement = new GridCard(page, "Roster Management")
        this.raidCompositions = new GridCard(page, "Raid Compositions")
        this.lootSheets = new GridCard(page, "Loot Sheets")
        this.permissionControl = new GridCard(page, "Permission Control")
        this.battleNetSync = new GridCard(page, "Battle.net Sync")
        this.multiGuildSupport = new GridCard(page, "Multi-guild Support")
        this.readyToCookText = new BaseElement(page, "//h2[contains(normalize-space(), 'Ready to cook?')]")
        this.connectAccountText = new BaseElement(page, "//p[contains(normalize-space(), 'Connect your Battle.net')]")

        //Add more grid cards here
        this.gridCards = [
            
            this.rosterManagement,
            this.raidCompositions,
            this.lootSheets,
            this.permissionControl,
            this.battleNetSync,
            this.multiGuildSupport,
    ]

    }

    async clickUpperGetStartedButton(): Promise<void>{
        logger.info("Clicking upper 'Get Started' button")
        await this.upperGetStartedButton.click()
    }

    async clickLowerGetStartedButton(): Promise<void>{
        logger.info("Clicking lower 'Get Started' button")
        await this.lowerGetStartedButton.click()
    }

    async clickSeeFeaturesButton(): Promise<void>{
        logger.info("Clicking 'See features' button")
        await this.seeFeaturesButton.click()
    }
    async navigateTo(): Promise<void> {
        logger.info("Navigating to 'Landing page' url")
        await this.page.goto("/")
    }
}