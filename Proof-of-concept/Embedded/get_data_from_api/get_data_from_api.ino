#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// Write ssid and password here to test it
const char* ssid = "********";
const char* password = "********";

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
    long rnd = random(1, 10);
    HTTPClient client;
    client.begin("https://jsonplaceholder.typicode.com/comments?id=" + String(rnd));
    int httpCode = client.GET();
    if(httpCode > 0) {
      String payload = client.getString();
      Serial.println("\nStatuscode: " + String(httpCode));
      Serial.println(payload);

      char json[500];
      payload.replace(" ", "");
      payload.replace("\n", "");
      payload.trim();
      payload.remove(0,1);
      payload.toCharArray(json, 500);

      StaticJsonDocument<200> doc;
      deserializeJson(doc, json);

      int id = doc["id"];
      const char* email = doc["email"];

      Serial.println(String(id) + " - " + String(email) + "\n");
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
