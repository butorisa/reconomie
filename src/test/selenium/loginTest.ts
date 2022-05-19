const webdriver = require('selenium-webdriver');
const { Builder, By, until } = webdriver;
// const assert = require('assert');

const capabilities = webdriver.Capabilities.chrome();
capabilities.set('chromeOptions', {
    args: [
        '--headless',
        '--no-sandbox',
        '--disable-gpu',
        `--window-size=1980,1200`
    ]
});

/**
 * ログイン成功
 */
(async () => {
    const driver = await new Builder().withCapabilities(capabilities).build();
    await driver.get("http://localhost:3000");
    // IDパスワードを入力
    let userId = await driver.findElement(By.id('loginId'));
    userId.sendKeys("buto.risa");
    let password = await driver.findElement(By.id('password'));
    password.sendKeys("Poyo!0423");
    // ログイン
    let loginButton = await driver.findElement(By.id('loginButton'));
    loginButton.click();

    await driver.wait(until.elementLocated(By.id('paymentList')), 10000);
    // 支払い一覧ページへ遷移していること
    assert.strictEqual(await driver.getCurrentUrl(), "http://localhost:3000/payment");
    driver.quit();
})();

/**
 * ログイン失敗（ID間違い）
 */
(async () => {
    const driver = await new Builder().withCapabilities(capabilities).build();
    await driver.get("http://localhost:3000");
    // IDパスワードを入力
    let userId = await driver.findElement(By.id('loginId'));
    userId.sendKeys("test");
    let password = await driver.findElement(By.id('password'));
    password.sendKeys("Poyo!0423");
    // ログイン
    let loginButton = await driver.findElement(By.id('loginButton'));
    loginButton.click();

    await driver.wait(until.alertIsPresent());
    let alert = await driver.switchTo().alert();
    // アラートにログイン失敗が表示されていること
    assert.strictEqual(await alert.getText(), "invalid id/password");

    await alert.accept();
    driver.quit();
})();
