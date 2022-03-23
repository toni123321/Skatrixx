#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>


const char* ssid = "TP-Link_272F";
const char* password = "98789627";
char jsonOutput[128];

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");

  // check wifi connection
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  Serial.println("\nConnected to the WiFi network");
  Serial.print("IP address");
  Serial.println(WiFi.localIP());


}

void loop() {
  // put your main code here, to run repeatedly:
  if (WiFi.status() == WL_CONNECTED)
  {
    HTTPClient client;
    client.begin("https://jsonplaceholder.typicode.com/posts");
    client.addHeader("Content-Type", "application/json");
    const size_t CAPACITY = JSON_OBJECT_SIZE(1);
    StaticJsonDocument<CAPACITY> doc;
    JsonObject object = doc.to<JsonObject>();
    object["title"] = "A title";
    serializeJson(doc, jsonOutput);
    
    int httpCode = client.POST(String(jsonOutput));
    if(httpCode > 0) {
      String payload = client.getString();
      Serial.println("\nStatuscode: " + String(httpCode));
      Serial.println(payload);

      client.end();
    }
    else {
      Serial.println("Error on HTTP request");
    }
}
  else {
    Serial.println("Connection lost");
  }
  delay(10000);
}
