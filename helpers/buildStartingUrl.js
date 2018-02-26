module.exports = (startingOpts) => {
    let startUrl =
        "http://local.m." +
        (startingOpts.Country !== "UK" ? startingOpts.Country : "") +
        "." +
        startingOpts.Brand +
        ".com:8080"

    if (startingOpts.Page === "Home") {
        startUrl = startUrl + "/"
    }

    return startUrl
}
