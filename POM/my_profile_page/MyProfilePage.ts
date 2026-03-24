import { Page } from "@playwright/test";
import { BasePage } from "../../helpers/base_page/BasePage";
import { BaseElement } from "../../helpers/elements/BaseElement";
import { Button } from "../../helpers/elements/Button";
import { logger } from "../../helpers/logger/logger";


export class MyProfilePage extends BasePage{

    //top of the page
    accountName: BaseElement
    refreshAccountDataButton: Button
    dataRefreshedMessage: BaseElement

    //Preferences
    preferencesTitle: BaseElement
    preferredRegionText: BaseElement
    regionDescriptionText: BaseElement

    //Dropdown
    regionSelect: BaseElement
    
    region = {
        EU: "eu",
        US: "us",
        KR: "kr",
        TW: "tw"
    }

    saveButton: Button

    //Active guilds
    activeGuildsTitle: BaseElement
    addGuildButton: Button
    noActiveGuildsText: BaseElement
    setOneUpButton: Button


    constructor(page: Page){
        super(page)

        this.accountName = new BaseElement(page, "//h1")
        this.refreshAccountDataButton = new Button(page, "//button[contains(normalize-space(), 'Refresh account data')]")
        this.dataRefreshedMessage = new BaseElement(page, "//p[contains(normalize-space(), 'Account data refreshed successfully.')]")
        this.preferencesTitle = new BaseElement(page, "//h2[contains(normalize-space(), 'Preferences')]")
        this.preferredRegionText = new BaseElement(page, "//p[contains(normalize-space(), 'Preferred region')]")
        this.regionDescriptionText = new BaseElement(page, "//p[contains(normalize-space(), 'Used as default for guild search and login')]")
        this.regionSelect = new BaseElement(page, "select[name='preferredRegion']")
        this.saveButton = new Button(page, "//button[contains(normalize-space(), 'Save')]")
        this.activeGuildsTitle = new BaseElement(page, "//h2[contains(normalize-space(), 'Active guilds')]")
        this.addGuildButton = new Button(page, "//a[contains(normalize-space(), '+ Add guild')]")
        this.noActiveGuildsText = new BaseElement(page, "//p[contains(normalize-space(), 'No active guilds yet.')]")
        this.setOneUpButton = new Button(page, "//a[contains(normalize-space(), 'Set one up')]")
    }

    async regionSelectEU(): Promise<void>{
        logger.info("Selecting EU region from the drop-down")
        await this.regionSelect.selectOption(this.region.EU)
    }

    async regionSelectUS(): Promise<void> {
        logger.info("Selecting US region from the drop-down");
        await this.regionSelect.selectOption(this.region.US);
    }

    async regionSelectKR(): Promise<void> {
        logger.info("Selecting KR region from the drop-down");
        await this.regionSelect.selectOption(this.region.KR);
    }

    async regionSelectTW(): Promise<void> {
        logger.info("Selecting TW region from the drop-down");
        await this.regionSelect.selectOption(this.region.TW);
    }
}