const { Selector } = require("testcafe")
const Base = require("./base.page")

module.exports = class PaymentPage extends Base {
    constructor(testController) {
        super()
        this.testController = testController
        this.pageTitle = "Payment Page (Checkout V2)"
        this.characteristicPageElements = [this.orderNowButton]
    }

    get orderNowButton() {
        return Selector(".PaymentContainer-paynow")
    }

    get creditCardNumberInput() {
        return Selector(".Input-field-cardNumber")
    }

    get creditCardCvvInput() {
        return Selector(".Input-field-cvv")
    }

    get creditCardExpiryMonthDropdown() {
        return Selector(".Select-select[name=\"expiryMonth\"]")
    }

    get creditCardExpiryMonthDropdownOptions() {
        return this.creditCardExpiryMonthDropdown.find("option")
    }

    get creditCardExpiryYearDropdown() {
        return Selector(".Select-select[name=\"expiryYear\"]")
    }

    get creditCardExpiryYearDropdownOptions() {
        return this.creditCardExpiryYearDropdown.find("option")
    }

    get acceptTermsAndConditionsCheckboxSpan() {
        return Selector(
            ".FormComponent-isAcceptedTermsAndConditions .Checkbox-check"
        )
    }

    get acceptTermsAndConditionsCheckboxInput() {
        return Selector(".FormComponent-isAcceptedTermsAndConditions input")
    }

    async enterCreditCardDetails(paymentDetails) {
        await this.testController
            .expect(this.creditCardNumberInput.exists)
            .ok("Couldn't find the credit card number input.")
            .typeText(this.creditCardNumberInput, paymentDetails["Card Number"])
            .expect(this.creditCardNumberInput.value)
            .eql(
                paymentDetails["Card Number"],
                "The credit card input hasn't been populated properly."
            )
            .expect(this.creditCardExpiryMonthDropdown.exists)
            .ok("Couldn't find the credit card expiry month dropdown.")
            .click(this.creditCardExpiryMonthDropdown)
            .expect(this.creditCardExpiryMonthDropdownOptions.exists)
            .ok("Couldn't find the credit card expiry month dropdown options.")
            .click(
                this.creditCardExpiryMonthDropdownOptions.withText(
                    paymentDetails["Expiry Month"]
                )
            )
            .expect(this.creditCardExpiryMonthDropdown.value)
            .eql(
                paymentDetails["Expiry Month"],
                "The expiry month option from the dropdown hasn't been selected properly."
            )
            .expect(this.creditCardExpiryYearDropdown.exists)
            .ok("Couldn't find the credit card expiry year dropdown.")
            .click(this.creditCardExpiryYearDropdown)
            .expect(this.creditCardExpiryYearDropdownOptions.exists)
            .ok("Couldn't find the credit card expiry year dropdown options.")
            .click(
                this.creditCardExpiryYearDropdownOptions.withText(
                    paymentDetails["Expiry Year"]
                )
            )
            .expect(this.creditCardExpiryYearDropdown.value)
            .eql(
                paymentDetails["Expiry Year"],
                "The expiry year option from the dropdown hasn't been selected properly."
            )
            .expect(this.creditCardCvvInput.exists)
            .ok("Couldn't find the credit card cvv input.")
            .typeText(this.creditCardCvvInput, paymentDetails["CVV"])
            .expect(this.creditCardCvvInput.value)
            .eql(
                paymentDetails["CVV"],
                "The CVV input hasn't been populated properly."
            )
    }

    async acceptTermsAndConditions() {
        await this.testController
            .expect(this.acceptTermsAndConditionsCheckboxSpan.exists)
            .ok(
                "The Accept Terms And Conditions Checkbox Span couldn't be found."
            )
            .click(this.acceptTermsAndConditionsCheckboxSpan)
            .expect(this.acceptTermsAndConditionsCheckboxInput.exists)
            .ok(
                "The Accept Terms and Conditions Checkbox Input couldn't be found."
            )
            .expect(this.acceptTermsAndConditionsCheckboxInput.checked)
            .ok(
                "It looks like it couldn't tick the checkbox to accept the terms and conditions."
            )
    }

    async placeOrder() {
        await this.testController
            .expect(this.orderNowButton.exists)
            .ok("The order now button wasn't found.")
            .click(this.orderNowButton)
    }
}
