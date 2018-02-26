const buildStartingUrl = require("./../helpers/buildStartingUrl")
const { setFeatureFlags } = require("./../helpers/clientCode")
const { logSuccess } = require("./../helpers/logger")
const Navigation = require("./../pageObjects/navigation.page")
const PDP = require("./../pageObjects/pdp.page")
const MiniBag = require("./../pageObjects/minibag.page")
const SignIn = require("./../pageObjects/signin.page")
const DeliveryPage = require("./../pageObjects/delivery.page")
const PaymentPage = require("./../pageObjects/payment.page")
const ThankYouPage = require("./../pageObjects/thankyou.page")

fixture("New User Journeys") // eslint-disable-line no-undef
test("User registers and makes a purchase", async (testController) => {
    await testController.navigateTo(
        buildStartingUrl({
            Brand: "Topshop",
            Country: "US",
            Page: "Home",
        })
    )
    await setFeatureFlags()
    logSuccess("I start on the Topshop US Home page")

    const navBar = new Navigation(testController)
    await navBar.search("24R43NYLW")
    logSuccess("I search for a product code")

    const pdp = new PDP(testController)
    await pdp.addProductToBag()
    logSuccess("I add the product to the bag")

    await pdp.dismissAddToBagConfirmationModal()
    logSuccess("I dismiss the add to bag confirmation modal")

    await navBar.openMiniBag()
    logSuccess("I view the bag")

    const minibag = new MiniBag(testController)
    await minibag.goToCheckout()
    logSuccess("I proceed to checkout from the bag")

    const signinpage = new SignIn(testController)
    await signinpage.registerDuringCheckout()
    logSuccess("I register during checkout")

    const deliverypage = new DeliveryPage(testController)
    await deliverypage.chooseHomeExpress()
    logSuccess("I choose Home Express as the delivery option")

    await deliverypage.provideDeliveryDetailsManually("United States")
    logSuccess("I enter my delivery details")

    await deliverypage.proceedToPayment()
    logSuccess("I proceed to payment")

    const paymentpage = new PaymentPage(testController)
    await paymentpage.enterCreditCardDetails({
        "Card Number": "378282246310005",
        CVV: "1234",
        "Expiry Month": "12",
        "Expiry Year": "2021",
    })
    logSuccess("I enter my credit card details")

    await paymentpage.acceptTermsAndConditions()
    logSuccess("I accept the terms and conditions")

    await paymentpage.placeOrder()
    logSuccess("I place the order")

    const thankyoupage = new ThankYouPage(testController)
    await thankyoupage.waitToBeLoaded()
    logSuccess("I see the confirmation for my order")
})
