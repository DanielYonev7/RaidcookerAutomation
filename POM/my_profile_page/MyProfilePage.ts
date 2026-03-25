import { Page } from "@playwright/test";
import { BasePage } from "../../helpers/base_page/BasePage";
import { BaseElement } from "../../helpers/elements/BaseElement";
import { Button } from "../../helpers/elements/Button";
import  {RegionOptions}  from "../shared/region/RegionOptions";


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
    regionDropDown: BaseElement
    regionOptions: RegionOptions
    
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
        this.regionOptions = new RegionOptions(page)

        this.accountName = new BaseElement(page, "//h1")
        this.refreshAccountDataButton = new Button(page, "//button[contains(normalize-space(), 'Refresh account data')]")
        this.dataRefreshedMessage = new BaseElement(page, "//p[contains(normalize-space(), 'Account data refreshed successfully.')]")
        this.preferencesTitle = new BaseElement(page, "//h2[contains(normalize-space(), 'Preferences')]")
        this.preferredRegionText = new BaseElement(page, "//p[contains(normalize-space(), 'Preferred region')]")
        this.regionDescriptionText = new BaseElement(page, "//p[contains(normalize-space(), 'Used as default for guild search and login')]")
        this.regionDropDown = new BaseElement(page, "select[name='preferredRegion']")
        this.saveButton = new Button(page, "//button[contains(normalize-space(), 'Save')]")
        this.activeGuildsTitle = new BaseElement(page, "//h2[contains(normalize-space(), 'Active guilds')]")
        this.addGuildButton = new Button(page, "//a[contains(normalize-space(), '+ Add guild')]")
        this.noActiveGuildsText = new BaseElement(page, "//p[contains(normalize-space(), 'No active guilds yet.')]")
        this.setOneUpButton = new Button(page, "//a[contains(normalize-space(), 'Set one up')]")
    }

    async regionSelectEU(): Promise<void>{
        await this.regionOptions.regionSelectEU(this.regionDropDown)
    }
            
    async regionSelectUS(): Promise<void> {
        await this.regionOptions.regionSelectUS(this.regionDropDown)
    }
            
    async regionSelectKR(): Promise<void> {
        await this.regionOptions.regionSelectKR(this.regionDropDown)
    }
            
    async regionSelectTW(): Promise<void> {
        await this.regionOptions.regionSelectTW(this.regionDropDown)
    }
}