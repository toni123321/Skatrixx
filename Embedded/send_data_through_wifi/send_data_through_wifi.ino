
#include "WiFi.h"
#include "ESPAsyncWebServer.h"

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

  server.begin();
 
}
 
void loop() {}
