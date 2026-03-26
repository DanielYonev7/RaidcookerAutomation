import { Page } from "@playwright/test";
import { BasePage } from "../../helpers/base_page/BasePage";
import { InputElement } from "../../helpers/elements/InputElement";
import { Button } from "../../helpers/elements/Button";
import credentials from  "../../test_data/login/credentials.json"


export class LoginPage extends BasePage {

    email: InputElement
    password: InputElement

    continue: Button
    loginButton: Button

    constructor(page: Page){
        super(page)
        
        this.email = new InputElement(page, "input[id='accountName']")
        this.password = new InputElement(page, "input[id='password']")
        this.continue = new Button(page, "button[id='submit']")
        this.loginButton = new Button(page, "button[aria-label='Log in']")
    }

    async enterEmail(email:string):Promise<void>{
        await this.email.fill(email)
    }

    async enterPassword(password:string):Promise<void>{
        await this.password.fill(password)
    }

    async clickContinueButton():Promise<void>{
        await this.continue.click()
    }

    async clickLoginButton():Promise<void>{
        await this.loginButton.click()
    }

    async login():Promise<void>{
        await this.enterEmail(credentials.validCredentials.email)
        await this.clickContinueButton()
        await this.enterPassword(credentials.validCredentials.password)
        await this.clickLoginButton()
    }

}