import { BasePage } from './basePage';
import { assert } from 'chai'


export class WTWElement {
    public static Element(locator: string) {

        return new BasePage(locator);
    }
}

export class WTWPage extends WTWElement {

    static languageDropDown() { return this.Element(".material-symbols-outlined[aria-hidden='true'][data-eventaction='Country Site Menu Opened']") };
    static selectAmericaDropDown() { return this.Element("button[id='region-0'] span[class='material-symbols-outlined country-selector__icon']") };
    static selectAmericanEnglish() { return this.Element("//a[contains(@href,'/en-US')][normalize-space()='English']") };
    static usLanguageText() { return this.Element("(//strong[contains(text(),'US')])[1]") };
    static acceptCookies() { return this.Element("//button[@id='truste-consent-button']") };
    static searchIcon() { return this.Element("//span[normalize-space()='search']") };
    static searchTextField() { return this.Element("//input[@title='Insert a query. Press enter to send']") };
    static resultsText() { return this.Element("//span[contains(text(),'Results')]") };
    static sortResultsByDateEle() { return this.Element("//span[@aria-label='Sort by Date in descending order']") };
    static articleFilterCheckBox() { return this.Element("div[aria-label='Inclusion filter on Article; 8 results']") };
    static articleFilterResultsText() { return this.Element("//div[@aria-label='Remove inclusion filter on Article']") };
    static articleLinks() { return this.Element("//span[contains(text(),'https:')]") };



    static async changeTheLanguageToEnglish() {
        await this.acceptCookies().click();
        await this.languageDropDown().waitForDisplayed();
        await this.languageDropDown().click();
        await this.selectAmericaDropDown().waitForDisplayed();
        await this.selectAmericaDropDown().click();
        await this.selectAmericanEnglish().waitForDisplayed();
        await this.selectAmericanEnglish().click();
        await this.usLanguageText().waitForDisplayed();
        return await this.usLanguageText().getVisibleText();

    }

    static async validateSearchResults() {
        await this.searchIcon().click();
        await this.searchTextField().waitForDisplayed();
        await this.searchTextField().addValue('IFRS 17');
        await browser.keys('\uE007');
        await this.resultsText().waitForDisplayed();
        return await this.resultsText().getVisibleText();

    }

    static async sortResultByDate(){
        let sortByDateFlag = await this.sortResultsByDateEle().getAttribute('aria-checked');
        if(sortByDateFlag==='false'){
          await this.sortResultsByDateEle().click();
        }
        return  Boolean(await this.sortResultsByDateEle().getAttribute('aria-checked'));
    }

    static async filterByArticle(){
       await this.articleFilterCheckBox().click();
       await this.articleFilterResultsText().waitForDisplayed();
       return await this.articleFilterResultsText().getVisibleText();
    }

    static async validateArticleLinks(){
       let links = (await $$("//span[contains(text(),'https:')]"));
       let linkTextArr = [];
       for (let i = 0; i < links.length; i++) {
       await linkTextArr.push(links[i].getText())
        
       }
       return await linkTextArr
    }
}










