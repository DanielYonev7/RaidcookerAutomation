import { Page } from "@playwright/test";
import {BasePage} from "../../helpers/base_page/BasePage"
import { BaseElement } from "../../helpers/elements/BaseElement";
import { RegionOptions } from "../shared/region/RegionOptions";
import { Button } from "../../helpers/elements/Button";

export class SignInPage extends BasePage {
    
    signInHeader: BaseElement
    description: BaseElement
    regionDropDown: BaseElement
    regionOptions: RegionOptions
    loginButton: Button


    constructor(page: Page){
        super(page)
        this.regionOptions = new RegionOptions(page)

        this.signInHeader = new BaseElement(page, "//h2[contains(normalize-space(), 'Sign in')]")
        this.description = new BaseElement(page, "//p[contains(normalize-space(), 'Connect your Battle.net account to get started.')]")
        this.regionDropDown = new BaseElement(page, `select[id="region-select"]`)
        this.loginButton = new Button(page, `button[id="login-btn"]`)
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

    async clickLoginButton(): Promise<void>{
        await this.loginButton.click()
    }
}