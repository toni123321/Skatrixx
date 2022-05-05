#include <MPU9250_asukiaaa.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <Arduino_JSON.h>

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

const char* ssid = "AndroidAP";
const char* password = "arpr1138245567";
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

const int UNDEFINED_MODE = 2;
const int START_MODE = 1;
const int STOP_MODE = 0;
int currentMode = 2;
unsigned long getMillis = 0;
unsigned long trickMillis = 0;

int skate_speed = 0;
int height = 0;
int airtime = 0;
int rotation = 0;
double accelX = 0;
double accelY = 0;
double accelZ = 0;
double gyroZ = 0;


void loop() {
  unsigned long currMillis = millis();
  //int trick_status = read_status();
  if (WiFi.status() == WL_CONNECTED)
  {
    if(currMillis - getMillis >= 3) {
      getMillis = currMillis;
      Serial.println(getMillis);
      HTTPClient client1;
      client1.begin("https://skatrixx.herokuapp.com/moduleStates");
      client1.addHeader("Content-Type", "application/json");
      client1.GET();

      JSONVar object = JSON.parse(client1.getString());

      boolean status = object[0]["isStarted"];
      
      //return client1.getString().toInt();
      if((currentMode == UNDEFINED_MODE && status == true)
        || (currentMode == START_MODE && status == false)) {
        currentMode = status;
        Serial.println("I am here, bro! Don't worry!");
      }
    }
  }

  if(currentMode == START_MODE){
    // Read data from sensors
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
    
    mySensor.accelUpdate();
    mySensor.gyroUpdate();

    skate_speed = 15;
    height = int(distanceCm);
    airtime = 1;
    rotation = 5;
    
    accelX = double(mySensor.accelX()); 
    accelY = double(mySensor.accelY());
    accelZ = double(mySensor.accelZ());
    gyroZ = double(mySensor.gyroZ());
   
    
  }
  else if(currentMode == STOP_MODE) {
    // Make POST request to trick data
    
    HTTPClient client;
    client.begin("https://skatrixx.herokuapp.com/skateDatas");
    client.addHeader("Content-Type", "application/json");
    const size_t CAPACITY = JSON_OBJECT_SIZE(8);
    StaticJsonDocument<CAPACITY> doc;
    JsonObject object = doc.to<JsonObject>();
    object["speed"] = skate_speed;
    object["height"] = height;
    object["airtime"] = airtime;
    object["rotation"] = rotation;
    object["accelX"] = accelX;
    object["accelY"] = accelY;
    object["accelZ"] = accelZ;
    object["gyroZ"] = gyroZ;
    
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
    
    currentMode = UNDEFINED_MODE;
  }
}
