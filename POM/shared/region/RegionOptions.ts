import { Page } from "@playwright/test"
import { BaseElement } from "../../../helpers/elements/BaseElement"

export class RegionOptions {
    page: Page
        
        region = {
            EU: "eu",
            US: "us",
            KR: "kr",
            TW: "tw"
        }
    
        constructor(page: Page){
            this.page = page
        }

    async regionSelectEU(locator: BaseElement): Promise<void>{
        await locator.selectOption(this.region.EU)
    }
        
    async regionSelectUS(locator: BaseElement): Promise<void> {
        await locator.selectOption(this.region.US);
    }
        
    async regionSelectKR(locator: BaseElement): Promise<void> {
        await locator.selectOption(this.region.KR);
    }
        
    async regionSelectTW(locator: BaseElement): Promise<void> {
        await locator.selectOption(this.region.TW);
    }

}