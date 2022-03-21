#include <MPU9250_asukiaaa.h>

#ifdef _ESP32_HAL_I2C_H_
#define SDA_PIN 21
#define SCL_PIN 22
#endif

MPU9250_asukiaaa mySensor;

void setup() {
  while(!Serial);
  
  Serial.begin(115200);
  Serial.println("Start reading data");
  
  #ifdef _ESP32_HAL_I2C_H_
  // for esp32
  Wire.begin(SDA_PIN, SCL_PIN); //sda, scl
  #else
  Wire.begin();
  #endif
  
  mySensor.setWire(&Wire);
  
  mySensor.beginAccel();
}

void loop() {
  mySensor.accelUpdate();
  Serial.println("print accel values");
  Serial.println("accelX: " + String(mySensor.accelX()));
  Serial.println("accelY: " + String(mySensor.accelY()));
  Serial.println("accelZ: " + String(mySensor.accelZ()));
  delay(500);
}
