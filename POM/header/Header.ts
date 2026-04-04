import { Page } from "@playwright/test";
import { BaseElement } from "../../helpers/elements/BaseElement";
import { Button } from "../../helpers/elements/Button";

export class Header {
    page: Page

    logo: BaseElement
    loginButton: Button

    constructor(page: Page){
        this.page = page
        this.logo = new BaseElement(page, "//img[@src='/images/logo.svg']")
        this.loginButton = new Button(page, "//a[contains(normalize-space(), ' Login with Battle.net')]")
    }

    async clickLoginButton(): Promise<void>{
        await this.loginButton.click()
    }
}