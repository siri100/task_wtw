import { WTWPage } from '../common/pages/wtw.page';
import { assert, expect } from 'chai';
import * as commonData from "../common/support/testdata.json";

describe('WTW Software Test Suite : ', () => {

  before('Navigate to WTW Site', async () => {
    await driver.maximizeWindow();
    await driver.url('https://www.wtwco.com/en-us/solutions/insurance-consulting-and-technology')

  });
  it('WTW Task', async () => {

    let usLanguageText = await WTWPage.changeTheLanguageToEnglish();
    expect(usLanguageText).to.equal('US');

    let resultsText = await WTWPage.validateSearchResults();
    expect(resultsText).contains('IFRS 17')

    let sortByDateFlag = await WTWPage.sortResultByDate();
    console.log(sortByDateFlag)
    expect(sortByDateFlag).to.be.true;

    let filterByArticleFlag = await WTWPage.filterByArticle();
    expect(filterByArticleFlag).to.be.equal('Article');
    
    let linkTextArr = await WTWPage.validateArticleLinks();
    for (let i = 0; i < linkTextArr.length; i++) {
      if((await linkTextArr[i]).startsWith('https://www.wtwco.com/en-US/')){
        continue;
      }else{
        throw new Error('Links are not displayed as expected')
      }
    }




  });

});


