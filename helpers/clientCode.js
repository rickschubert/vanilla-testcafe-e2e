const { ClientFunction } = require("testcafe")

exports.setFeatureFlags = ClientFunction(() => {
    document.cookie = "featuresOverride={\"FEATURE_NEW_CHECKOUT\":true}"
    location.reload()
})
