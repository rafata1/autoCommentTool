const puppeteer = require('puppeteer');
const axios = require('axios')

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getNewJob() {
    return await axios.get('https://auto-comment-server.herokuapp.com/job')
}

function startProcess() {
    const usernames = ["hoanghuy11042001@gmail.com", "01232532857"]
    const passwords = ["@Phuong2709", "vietanh123"]
    for (let i = 0; i < usernames.length; i++) {
        (async () => {
            try {
                const browser = await puppeteer.launch({headless: false});
                const [page] = await browser.pages();
                await page.goto('https://facebook.com');
                await page.type('input[name=email]', usernames[i]);
                await page.type('input[name=pass]', passwords[i]);
                await page.click("button[name=login]");
                await page.waitForNavigation();

                for (let j = 0; j <= 5000000; j++) {
                    const data = await getNewJob()
                    const url = data.data.Data.url
                    const comment = data.data.Data.comment
                    console.log(url, comment)
                    await page.goto(url)
                    await page.evaluate((comment) => {
                        let inputComment = document.getElementsByName("comment_text")[0];
                        inputComment.value = comment
                        let submit = document.querySelector('button[type="submit"]');
                        submit.disabled = false;
                        submit.click();
                    }, comment)
                    console.log(usernames[i], "commented")
                    await sleep(5 * 60000)
                }
            } catch (error) {
                console.log(usernames[i], "error")
                // console.log(error)
            }
        })();
    }
}

startProcess()