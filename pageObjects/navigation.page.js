const config = require("./../config")
const { Selector } = require("testcafe")
const PDP = require("./pdp.page")
const Base = require("./base.page")

module.exports = class Navigation extends Base {
    constructor(testController) {
        super()
        this.testController = testController
    }

    get mobileSearchButton() {
        return Selector(".Header-searchButton")
    }
    get searchInput() {
        return Selector(".SearchBar-queryInput")
    }

    get desktopMiniBagIcon() {
        return Selector(".ShoppingCart")
    }

    get mobileMiniBagIcon() {
        return Selector(".Header-shoppingCartIconbutton")
    }

    async search(searchTerm) {
        if (config.breakpoint === "mobile") {
            await this.testController
                .expect(this.mobileSearchButton.exists)
                .ok("Couldn't locate the mobile search button.")
                .click(this.mobileSearchButton)
        }
        await this.testController
            .expect(this.searchInput.exists)
            .ok("Couldn't locate the search input.")
            .typeText(this.searchInput, searchTerm)
            .expect(this.searchInput.value)
            .eql(
                searchTerm,
                "Navigation search input: The search term doesn't show on the input."
            )
        await this.testController.pressKey("enter")
        const pdp = new PDP(this.testController)
        await pdp.waitToBeLoaded()
    }

    async openMiniBag() {
        if (config.breakpoint === "desktop") {
            await this.testController
                .expect(this.desktopMiniBagIcon.exists)
                .ok("Couldn't locate the desktop mini bag icon.")
                .click(this.desktopMiniBagIcon)
        }
        if (config.breakpoint === "mobile") {
            await this.testController
                .expect(this.mobileMiniBagIcon.exists)
                .ok("Couldn't locate the mobile mini bag icon.")
                .click(this.mobileMiniBagIcon)
        }
    }
}
