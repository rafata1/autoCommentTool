const puppeteer = require('puppeteer');

// const mysql = require('mysql');
// var con = mysql.createConnection(
//     {
//         host: 'localhost',
//         database: 'autocomment',
//         user: 'root',
//         password: '1'
//     }
// )
// con.connect((err) => {
//     if (err) throw err;
//     console.log('connected')
// })
// let usernames = []
// let passwords = []
// con.query('select * from account', (err, rows) => {
//     if (err) throw err;
//     setAccounts(rows)
// })
// function setAccounts(rows) {
//     for (let i = 0; i < rows.length; i++) {
//         usernames.push(rows[i].username)
//         passwords.push(rows[i].password)
//     }
// }
// let postUrls = []
// con.query('select * from posts', postUrls, (err, rows) => {
//     if (err) throw err;
//     setPostUrls(rows)
// })
// function setPostUrls(rows) {
//     for (let i = 0; i < rows.length; i++) {
//         postUrls.push(rows[i].url)
//     }
// }
// let comments = []
// con.query('select * from comments', comments, (err, rows) => {
//     if (err) throw err;
//     setComments(rows)
// })
// function setComments(rows) {
//     for (let i = 0; i < rows.length; i++) {
//         comments.push(rows[i].content)
//     }
//     startProcess()
// }


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function startProcess() {
    const usernames = ["0974606413"]
    const passwords = ["310528032001"]
    const postUrls = ["https://m.facebook.com/photo/?fbid=1163130600780718&set=pob.100012513674200"]
    const comments = ["test comment 01", "test comment 02"]
    console.log(usernames, passwords, postUrls, comments)
    for (let i = 0; i < usernames.length; i++) {
        (async () => {
            try {
                const browser = await puppeteer.launch({ headless: false });
                const [page] = await browser.pages();
                await page.goto('https://facebook.com');
                await page.type('input[name=email]', usernames[i]);
                await page.type('input[name=pass]', passwords[i]);
                await page.click("button[name=login]");
                await page.waitForNavigation();

                //comment 10 times
                for (let i = 0; i <= 10; i++) {
                    const randomPostId = Math.floor(Math.random() * postUrls.length);
                    await page.goto(postUrls[randomPostId])
                    randomCommentId = Math.floor(Math.random() * comments.length);
                    const comment = comments[randomCommentId]
                    await page.evaluate((comment) => {
                        let inputComment = document.getElementsByName("comment_text")[0];
                        inputComment.value = comment
                        let submit = document.querySelector('button[type="submit"]');
                        submit.disabled = false;
                        submit.click();
                    }, comment)
                    await sleep(60000)
                }

            } catch (error) {
                console.log(error)
            }
        })();
    }
}

startProcess()
