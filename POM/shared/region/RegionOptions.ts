import { Locator, Page } from "@playwright/test"
import { logger } from "../../../helpers/logger/logger"
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
        logger.info("Selecting EU region from the drop-down")
        await locator.selectOption(this.region.EU)
    }
        
    async regionSelectUS(locator: BaseElement): Promise<void> {
        logger.info("Selecting US region from the drop-down");
        await locator.selectOption(this.region.US);
    }
        
    async regionSelectKR(locator: BaseElement): Promise<void> {
        logger.info("Selecting KR region from the drop-down");
        await locator.selectOption(this.region.KR);
    }
        
    async regionSelectTW(locator: BaseElement): Promise<void> {
        logger.info("Selecting TW region from the drop-down");
        await locator.selectOption(this.region.TW);
    }

}