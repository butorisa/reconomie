const puppeteer = require('puppeteer');
const assert = require('assert');

/**
 * ログイン成功
 */
(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');
    // IDパスワードを入力
    const userId = await page.$('#loginId');
    await userId.type('xxxxx');
    const password = await page.$('#password');
    await password.type('xxxxxx');
    // ログイン
    const loginButton = await page.$('#loginButton');
    await loginButton.click();
    await page.waitForTimeout(3000);

    // 支払い一覧ページへ遷移していること
    assert.strictEqual(await page.url(), "http://localhost:3000/payment");
    await browser.close();
})();

/**
 * ログイン失敗（パスワード間違い）
 */
(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');
    // IDパスワードを入力
    const userId = await page.$('#loginId');
    await userId.type('buto.risa');
    const password = await page.$('#password');
    await password.type('abcd');
    // ログイン
    const loginButton = await page.$('#loginButton');
    await loginButton.click();
    await page.waitForTimeout(3000);

    // アラートにログイン失敗が表示されていること
    assert.strictEqual(await page.alert.getText(), "invalid id/password");

    await page.alert.accept();
    await browser.close();
})();
