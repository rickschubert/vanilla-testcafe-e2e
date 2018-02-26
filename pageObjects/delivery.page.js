const { Selector } = require("testcafe")
const Base = require("./base.page")
const PaymentPage = require("./payment.page")

module.exports = class DeliveryPage extends Base {
    constructor(testController) {
        super()
        this.testController = testController
        this.pageTitle = "Delivery Page (Checkout V2)"
        this.characteristicPageElements = [this.proceedToPaymentButton]
    }

    get proceedToPaymentButton() {
        return Selector(".DeliveryContainer-nextButton")
    }

    get homeExpressButton() {
        return Selector(
            ".FormComponent-deliveryMethod[for=\"delivery-method-home_express\"]"
        )
    }

    get homeExpressRadioButton() {
        return Selector("#delivery-method-home_express")
    }

    get manualEntryCountryDropdown() {
        return Selector("[aria-label=\"Delivery country\"]")
    }

    get manualEntryCountryDropdownOptions() {
        return this.manualEntryCountryDropdown.find("option")
    }

    get manualEntryAddressLineOneInput() {
        return Selector(".Input-field-address1")
    }

    get manualEntryPostCodeInput() {
        return Selector(".Input-field-postcode")
    }

    get manualEntryCityInput() {
        return Selector(".Input-field-city")
    }

    get firstNameInput() {
        return Selector(".Input-field-firstName")
    }

    get lastNameInput() {
        return Selector(".Input-field-lastName")
    }

    get phoneNumberInput() {
        return Selector(".Input-field-telephone")
    }

    async chooseHomeExpress() {
        await this.testController
            .expect(this.homeExpressButton.exists)
            .ok("The Home Express Button couldn't be found on the page.")
            .expect(this.homeExpressRadioButton.exists)
            .ok("The Home Express Radio Button couldn't be found on the page.")
            .click(this.homeExpressButton)
            .expect(this.disappearedLoadingOverlay.exists)
            .ok("The loading overlay didn't disappear in time. Sorry!")
            .expect(this.homeExpressRadioButton.checked)
            .ok("The Home Express radio button isn't checked.")
    }

    async provideDeliveryDetailsManually(country) {
        await this.testController
            .expect(this.manualEntryCountryDropdown.exists)
            .ok("Couldn't find the manual entry country dropdown.")
            .click(this.manualEntryCountryDropdown)
            .expect(this.manualEntryCountryDropdownOptions)
            .ok("Couldn't find the manual entry country dropdown options.")
            .click(this.manualEntryCountryDropdownOptions.withText(country))
            .expect(this.manualEntryCountryDropdown.value)
            .eql(
                country,
                "The country option from the dropdown hasn't been selected properly."
            )
            .expect(this.firstNameInput.exists)
            .ok("Couldn't find the first name input.")
            .typeText(this.firstNameInput, "Testy")
            .expect(this.firstNameInput.value)
            .eql(
                "Testy",
                "The first name field hasn't been populated properly."
            )
            .expect(this.lastNameInput.exists)
            .ok("Couldn't find the last name input.")
            .typeText(this.lastNameInput, "McTest")
            .expect(this.lastNameInput.value)
            .eql(
                "McTest",
                "The last name field hasn't been populated properly."
            )
            .expect(this.phoneNumberInput.exists)
            .ok("Couldn't find the phone number input.")
            .typeText(this.phoneNumberInput, "0987654321")
            .expect(this.phoneNumberInput.value)
            .eql(
                "0987654321",
                "The phpone number field hasn't been populated properly."
            )
            .expect(this.manualEntryAddressLineOneInput.exists)
            .ok("Couldn't find the manual entry address line one input.")
            .typeText(this.manualEntryAddressLineOneInput, "Sesame Street")
            .expect(this.manualEntryAddressLineOneInput.value)
            .eql(
                "Sesame Street",
                "The address line 1 field hasn't been populated properly."
            )
            .expect(this.manualEntryCityInput.exists)
            .ok("Couldn't find the manual entry city input.")
            .typeText(this.manualEntryCityInput, "Oz")
            .expect(this.manualEntryCityInput.value)
            .eql("Oz", "The city field hasn't been populated properly.")

        if (country === "United States") {
            await this.testController
                .expect(this.manualEntryPostCodeInput.exists)
                .ok("Couldn't find the manual entry post code input.")
                .typeText(this.manualEntryPostCodeInput, "90210")
                .expect(this.manualEntryPostCodeInput.value)
                .eql(
                    "90210",
                    "The post code field hasn't been populated properly."
                )
        }
    }

    async proceedToPayment() {
        await this.testController
            .expect(this.proceedToPaymentButton.exists)
            .ok("Couldn't find the proceed to payment button.")
            .click(this.proceedToPaymentButton)
        const paymentpage = new PaymentPage(this.testController)
        await paymentpage.waitToBeLoaded()
    }
}
