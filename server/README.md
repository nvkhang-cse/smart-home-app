## HOW TO RUN
node index.js --IO_PASSWORD=${PUT THE PASS HERE}

## API
POST localhost:3000/light

Body:
id = 1
name = "LED"
data = 1
unit = "


## TEST

Run client app in smartHomeApp/client
expo start 

If you use the emulator, your IP address in smartHomeApp/src/screen/Test.js should be
http://10.0.2.2:3000/light

If you use real device, your IP address in smartHomeApp/src/screen/Test.js should be
http://{Your IP address}:3000/light

You can get this IP adress by ipconfig (Windows) / ifconfig (Ubuntu)
## SOME REFS
- https://learn.adafruit.com/adafruit-io/mqtt-api
- https://github.com/adafruit/adafruit-io-node
- https://io.adafruit.com/api/docs/mqtt.html#mqtt-data-format
