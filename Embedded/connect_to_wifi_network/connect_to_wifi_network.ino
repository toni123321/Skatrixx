#include <WiFi.h>
const char* ssid = "TP-Link_272F";
const char* password = "98789627";

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
    Serial.println("You can try to ping me");
    delay(500);
  }
  else {
    Serial.println("Connection lost");
  }
}
