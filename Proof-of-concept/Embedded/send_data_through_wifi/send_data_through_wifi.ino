
#include "WiFi.h"
#include "ESPAsyncWebServer.h"

// Create an Access Point from ESP32
// Example for setting ssid and password
const char *ssid = "MyESP32AP";
const char *password = "testpassword";
AsyncWebServer server(80);

String readData() {
  return "Sample data";
}
 
void setup() {
 
  Serial.begin(115200);
  WiFi.softAP(ssid, password);
 
  Serial.println();
  Serial.print("IP address: ");
  Serial.println(WiFi.softAPIP());


  server.on("/readData", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/plain", readData().c_str());
  });

  server.on("/put", HTTP_PUT, [](AsyncWebServerRequest *request){
        String state;
        if (request->hasParam(state, true)) {
            state = request->getParam(state, true)->value();
        } else {
            state = "No state sent";
        }
        request->send(200, "text/plain", "This is your current state: " + state);
  });


  server.begin();
 
}
 
void loop() {}
