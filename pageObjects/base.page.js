const { Selector } = require("testcafe")

module.exports = class Base {
    constructor() {
        this.pageTitle = "Base class"
        this.characteristicPageElements = []
    }

    get disappearedLoadingOverlay() {
        return Selector(".LoaderOverlay[aria-busy=\"false\"]")
    }

    async waitToBeLoaded() {
        this.characteristicPageElements.forEach(async (element) => {
            await this.testController
                .expect(element.exists)
                .ok(`${this.pageTitle} didn't fully load.`)
        })
    }
}
