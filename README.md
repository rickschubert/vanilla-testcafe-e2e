## About
This repository aims to show how an end to end test suite could be structured when using testcafe. This repository is laid out according to the testcafe recommendations. [Another repository](https://github.com/rick-schubert/testcafe-cucumberjs-e2e), where I even use the same page objects, shows how testcafe could be wrapped around with cucumber. Having extensively compared the two solutions side by side, I have to say that I strongly favour the testcafe style over the cucumber style. (Further details below.)

## How to Install
- `npm install`
- `npm i -g testcafe`

## How to Run
`npm run test` will launch the testcafe CLI with all the necessary options for you.

## Why did I decide against cucumber?
| Advantages | Disadvantages |
| --- | --- |
| **Better error logging** Cucumber comes with its own reporting system which in our use case makes it only harder to debug where an error occurs, as it will just say "a function timed out" for example. The testcafe report is a lot smarter instead (see example below) and pulls attention to the exact line where the error occured. | Steps are not picked up automatically |
| Classes don't have to be instantiated time and time again. In cucumber, every step has it's own closure which for example makes it necessary to instantiate a new HomePage even though it has already been used somewhere in the test before. | No "living documentation" in form of feature files and easy change of program behaviour with tables, parameters etc. (The only contra argument against this: Looking at a test file should already tell you exactly what it is doing.) |
| Test code looks __much__ easier to read for new developers; less clutter | Repetition of step code. (Then again, I have to disagree with that a bit: Yes, when a class method has to be called in another test scenario as well, you also have to call it there. But is that really a problem?)   |
| Testcafe API is not laid out for cucumber. |   |
| Testcafe can be started with its own CLI which is much more intuitive than hiding away all the options in the API hidden under the cucumber test runner. |   |
| Easy screenshotting on fail|   |


## Testcafe Error Reporting: Example

 ✖ User registers and makes a purchase (screenshots:
 /Users/schuber/Documents/github/testcafe-without-cucumber/screenshots/2018-02-26_08-41-41/test-1)

   1) AssertionError: PDP didn't fully load. See call trace above.: expected false to be truthy

      Browser: Chrome 64.0.3282 / Mac OS X 10.12.6
      Screenshot:

   /Users/schuber/Documents/github/testcafe-without-cucumber/screenshots/2018-02-26_08-41-41/test-1/Chrome_64.0.3282_Mac_OS_X_10.12.6/errors/1.png

         13 |
         14 |    async waitToBeLoaded() {
         15 |        this.characteristicPageElements.forEach(async (element) => {
         16 |            await this.testController
         17 |                .expect(element.exists)
       > 18 |                .ok(
         19 |                    `${this.pageTitle} didn't fully load. See call trace above.`
         20 |                )
         21 |        })
         22 |    }
         23 |}

         at <anonymous> (/Users/schuber/Documents/github/testcafe-without-cucumber/pageObjects/base.page.js:18:18)
         at _this.characteristicPageElements.forEach
      (/Users/schuber/Documents/github/testcafe-without-cucumber/pageObjects/base.page.js:15:9)
         at <anonymous> (/Users/schuber/Documents/github/testcafe-without-cucumber/pageObjects/base.page.js:15:41)
         at PDP.waitToBeLoaded (/Users/schuber/Documents/github/testcafe-without-cucumber/pageObjects/base.page.js:14:28)
         at <anonymous> (/Users/schuber/Documents/github/testcafe-without-cucumber/pageObjects/navigation.page.js:45:19)
