import { By, Builder, WebDriver, WebElement } from "selenium-webdriver";
import { expect } from 'chai'

describe("Sample Google Page", function () {
    let driver: WebDriver;
    this.beforeAll(async function () {
        const fs = require('fs')
        const folderName = '/reports'
        try {
            if (!fs.existsSync(folderName)) {
                fs.mkdirSync(folderName)
            }
        } catch (err) {
            console.error(err)
        }
        console.log("opening google.com");
        //Initiating the setup
        driver = await new Builder().forBrowser("chrome").build();
        await driver.get("https://www.google.com/");
        console.log("google opened");

    });
    it("step 1: searching in google", async function () {
        console.log("writing on sear box");
        await driver.findElement(By.xpath("//input[@class='gLFyf gsfi']")).sendKeys("amazon webservice");
        console.log("clicking search button");
        let buttons: WebElement[] = await driver.findElements(By.xpath("//input[@class='gNO89b']"));
        console.log(buttons);
        await buttons[1].click();
        console.log("Search done");
        let results: WebElement[] = await driver.findElements(By.xpath("//span['Amazon Web Services']"));
        expect(results.length).not.equals(0);
        console.log("Search result matched");
    });
    this.afterAll(async function () {
        driver.quit();
    });
});
