const { Selector } = require("testcafe")
const Base = require("./base.page")

module.exports = class MiniBag extends Base {
    constructor(testController) {
        super()
        this.testController = testController
    }

    get checkoutNowButton() {
        return Selector(".Button.MiniBag-continueButton")
    }

    async goToCheckout() {
        await this.testController
            .expect(this.checkoutNowButton.exists)
            .ok("Couldn't locate the checkout now button.")
            .click(this.checkoutNowButton)
    }
}
