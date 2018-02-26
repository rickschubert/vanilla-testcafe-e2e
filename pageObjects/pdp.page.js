const { Selector } = require("testcafe")
const config = require("./../config")
const Base = require("./base.page")

module.exports = class PDP extends Base {
    constructor(testController) {
        super()
        this.testController = testController
        this.pageTitle = "PDP"
        this.characteristicPageElements = [
            this.addToBagButton,
            // this.nonexistingelement     // activate to verify the error mechanism
        ]
    }

    get addToBagButton() {
        return Selector(".AddToBag")
    }

    // Used to verify the error mechanism
    get nonexistingelement() {
        return Selector(".thisdoesntexist")
    }

    get addToBagConfirmationModalCloseIcon() {
        return Selector(".Modal-closeIcon")
    }

    async addProductToBag() {
        await this.testController
            .expect(this.addToBagButton.exists)
            .ok("The add to bag button wasn't found.")
            .click(this.addToBagButton)
            .expect(this.disappearedLoadingOverlay.exists)
            .ok("Add Product to bag: Loading overlay didn't disappear.")
        if (config.breakpoint === "mobile") {
            await this.testController
                .expect(this.addToBagConfirmationModalCloseIcon.exists)
                .ok(
                    "The add to bag confirmation modal didn't show up after adding an item to the bag on mobile."
                )
        }
    }

    async dismissAddToBagConfirmationModal() {
        await this.testController
            .expect(this.addToBagConfirmationModalCloseIcon.exists)
            .ok("The add to bag confirmation modal close icon wasn't found.")
            .click(this.addToBagConfirmationModalCloseIcon)
    }
}
