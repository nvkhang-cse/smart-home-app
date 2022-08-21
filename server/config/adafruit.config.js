const args = require("minimist")(process.argv.slice(2))

module.exports = {
    HOST: "io.adafruit.com",
    PORT: 8883,
    IO_USERNAME: "nhkhang",
    IO_PASSWORD: args['IO_PASSWORD'],
    FEED_LED: "nhkhang/feeds/bk-iot-led",
    FEED_GAS: "nhkhang/feeds/bk-iot-gas"
};