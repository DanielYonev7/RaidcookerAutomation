import { Page } from "@playwright/test";
import { BaseElement } from "../../helpers/elements/BaseElement";
import { logger } from "../../helpers/logger/logger.ts"

export class GridCard {

    page: Page
    card: string
    name: string

    cardImage: BaseElement
    cardTitle: BaseElement
    cardDescription: BaseElement


    constructor(page: Page, name: string){
        this.page = page
        this.name = name

        this.card = `//div[@class='bg-mono-900 border-mono-700 group rounded-xl border p-6 transition-all hover:-translate-y-0.5 hover:border-white/20'][.//*[text()='${name}']]`
        this.cardImage = new BaseElement (page, `${this.card}//span`)
        this.cardTitle = new BaseElement(page, `${this.card}//h3`)
        this.cardDescription = new BaseElement(page, `${this.card}//p`)
    }


    async getCardTitle(): Promise<void>{
        logger.info(`Getting title name of card with name: ${this.name}`)
        await this.cardTitle.getText()

    }
}