#include <MPU9250_asukiaaa.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

#ifdef _ESP32_HAL_I2C_H_
// Define pins for MPU9250
#define SDA_PIN 21
#define SCL_PIN 22

// Define pins for ultrasonic sensors
#define TRIG_PIN 5
#define ECHO_PIN 18

//define sound speed in cm/uS
#define SOUND_SPEED 0.034
#define CM_TO_INCH 0.393701
#endif

// Write ssid and password here to test it
// const char* ssid = "********";
// const char* password = "********";
const char* ssid = "********";
const char* password = "********";
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
//
//    if (WiFi.status() == WL_CONNECTED)
//    {
//      HTTPClient client1;
//      client1.begin("https://skatrixx.herokuapp.com/skateDatas/lastRecord");
//      client1.addHeader("Content-Type", "application/json");
//      client1.GET();
//      Serial.println("Res: " + client1.getString());
      
//      HTTPClient client;
//      client.begin("https://skatrixx.herokuapp.com/skateDatas");
//      client.addHeader("Content-Type", "application/json");
//      const size_t CAPACITY = JSON_OBJECT_SIZE(8);
//      StaticJsonDocument<CAPACITY> doc;
//      JsonObject object = doc.to<JsonObject>();
//      object["speed"] = 15;
//      object["height"] = int(distanceCm);
//      object["airtime"] = 1;
//      object["rotation"] = 5;
//      object["accelX"] = int(mySensor.accelX());
//      object["accelY"] = int(mySensor.accelY());
//      object["accelZ"] = int(mySensor.accelZ());
//      object["gyroZ"] = int(mySensor.gyroZ());
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
//      }
//      else {
//        Serial.println("Error on HTTP request");
//      } 
//    }
//    else {
//      Serial.println("Connection lost");
//    }
    delay(500);
//  }

  
}
