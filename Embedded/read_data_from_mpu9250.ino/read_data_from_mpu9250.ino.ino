#include <MPU9250_asukiaaa.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

#ifdef _ESP32_HAL_I2C_H_
#define SDA_PIN 21
#define SCL_PIN 22
#define TRIG_PIN 5
#define ECHO_PIN 18

//define sound speed in cm/uS
#define SOUND_SPEED 0.034
#define CM_TO_INCH 0.393701
#endif

const char* ssid = "TP-Link_272F";
const char* password = "98789627";
char jsonOutput[128];

MPU9250_asukiaaa mySensor;
long duration;
float distanceCm;
float distanceInch;


void setup() {
  while(!Serial);
  
  Serial.begin(115200);

  // Set pins for Ultrasonic sensor
  pinMode(TRIG_PIN, OUTPUT); // Sets the trigPin as an Output
  pinMode(ECHO_PIN, INPUT);

  
  Serial.println("Start reading data");
  
  #ifdef _ESP32_HAL_I2C_H_
  // for esp32
  Wire.begin(SDA_PIN, SCL_PIN); //sda, scl
  #else
  Wire.begin();
  #endif
  
  mySensor.setWire(&Wire);
  
  mySensor.beginAccel();
  mySensor.beginGyro();

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
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  // Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  
  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(ECHO_PIN, HIGH);
  
  // Calculate the distance
  distanceCm = duration * SOUND_SPEED/2;
  
  // Convert to inches
  distanceInch = distanceCm * CM_TO_INCH;
  
  // Prints the distance in the Serial Monitor
  Serial.print("Distance (cm): ");
  Serial.println(distanceCm);
  

  mySensor.accelUpdate();
  Serial.println("!!! NEW VALUES ACCEL !!!");
  Serial.println("accelX: " + String(mySensor.accelX()));
  Serial.println("accelY: " + String(mySensor.accelY()));
  Serial.println("accelZ: " + String(mySensor.accelZ()));

//  Serial.println("-------------------------------------");
    mySensor.gyroUpdate();
    Serial.println("!!! NEW VALUES GYRO !!!");
//  Serial.println("gyroX: " + String(mySensor.gyroX()));
//  Serial.println("gyroY: " + String(mySensor.gyroY()));
    Serial.println("gyroZ: " + String(mySensor.gyroZ()));

//    if (WiFi.status() == WL_CONNECTED)
//    {
//      HTTPClient client;
//      client.begin("https://skatrixx.herokuapp.com/skateDatas");
//      client.addHeader("Content-Type", "application/json");
//      const size_t CAPACITY = JSON_OBJECT_SIZE(8);
//      StaticJsonDocument<CAPACITY> doc;
//      JsonObject object = doc.to<JsonObject>();
//      object["speed"] = 23;
//      object["height"] = 5;
//      object["airtime"] = 1.5;
//      object["rotation"] = 10;
//      object["accelX"] = -1;
//      object["accelY"] = -1;
//      object["accelZ"] = 1;
//      object["gyroZ"] = 1.12;
//      
//      serializeJson(doc, jsonOutput);
//      
//      int httpCode = client.POST(String(jsonOutput));
//      if(httpCode > 0) {
//        String payload = client.getString();
//        Serial.println("\nStatuscode: " + String(httpCode));
//        Serial.println(payload);
//  
//        client.end();
//     }
//     else {
//      Serial.println("Error on HTTP request");
//     }
//    }
//    else {
//      Serial.println("Connection lost");
//    }
    delay(500);

  
}
