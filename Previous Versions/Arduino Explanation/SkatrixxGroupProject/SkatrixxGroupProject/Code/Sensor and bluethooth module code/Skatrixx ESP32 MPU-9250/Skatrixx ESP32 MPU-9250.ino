#define ARDUINOJSON_ENABLE_STD_STRING 1
#include <ArduinoJson.h>
#include <SparkFunMPU9250-DMP.h>
#include <Wire.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>


// ============ BLE CONFIG ============

BLECharacteristic bleDistanceCharacteristics("cba1d466-344c-4be3-ab3f-189f80dd7518", BLECharacteristic::PROPERTY_NOTIFY);
BLEDescriptor bleDistanceDescriptor(BLEUUID((uint16_t)0x2902));

#define SERVICE_UUID "d2eac697-febf-4d21-aa62-baa42c6ae422"
#define bleServerName "DMP"

bool deviceConnected = false;

//Setup callbacks onConnect and onDisconnect
class MyServerCallbacks: public BLEServerCallbacks {
  void onConnect(BLEServer* pServer) {
    deviceConnected = true;
  };
  void onDisconnect(BLEServer* pServer) {
    deviceConnected = false;
  }
};

// ============ END BLE CONFIG ============

// ============ MPU-9250 CONFIG ============

#define INTERRUPT_PIN_MPU 19
// Connected to "Wire" object - 22 (SCL) & 21 (SDA)
MPU9250_DMP mpu;

// ============ END MPU-9250 CONFIG ============

StaticJsonDocument<200> jsonDocTxt;

void taskStatus(void *parameter);
SemaphoreHandle_t mtx;
const signed char orientationDefault[9] = {1, 0, 0, 0, 1, 0 ,0 , 0, 1};


void setup() {
  Serial.begin(115200);

    // Create the BLE Device
  BLEDevice::init(bleServerName);

  // Create the BLE Server
  BLEServer *pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());

  // Create the BLE Service
  BLEService *bleDistanceService = pServer->createService(SERVICE_UUID);

  // Create BLE Characteristics and Create a BLE Descriptor
  // Distance

  bleDistanceService->addCharacteristic(&bleDistanceCharacteristics);
  bleDistanceDescriptor.setValue("DMP");
  bleDistanceCharacteristics.addDescriptor(&bleDistanceDescriptor);

  // Start the service
  bleDistanceService->start();

  // Start advertising
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pServer->getAdvertising()->start();
  Serial.println("Waiting a client connection to notify...");

    mtx = xSemaphoreCreateMutex();
    xSemaphoreGive(mtx);

    xTaskCreatePinnedToCore(taskStatus,   /* Task function. */
                            "taskStatus", /* String with name of task. */
                            20000,        /* Stack size in bytes. */
                            NULL, /* Parameter passed as input of the task */
                            3,    /* Priority of the task. */
                            NULL, /* Task handle. */
                            0);   /* Core where the task should run */
  }

void taskStatus(void *parameter) {
  std::string output;
  unsigned short fifoCnt;
  inv_error_t result;

  pinMode(INTERRUPT_PIN_MPU, INPUT_PULLUP);

  if (mpu.begin() != INV_SUCCESS) {
    while (1) {
      Serial.println("Unable to communicate with MPU-9250");
      Serial.println("Check connections, and try again.");
      Serial.println();
      delay(5000);
    }
  }

  mpu.enableInterrupt();
  mpu.setIntLevel(INT_ACTIVE_LOW);
  mpu.setIntLatched(INT_LATCHED);

  mpu.dmpBegin(DMP_FEATURE_6X_LP_QUAT |   // Enable 6-axis quat
                   DMP_FEATURE_GYRO_CAL,  // Use gyro calibration
               10);                       // Set DMP FIFO rate to 10 Hz
 mpu.dmpSetOrientation(orientationDefault);


  while (1) {
    if (digitalRead(INTERRUPT_PIN_MPU) == LOW) {
      fifoCnt = mpu.fifoAvailable();

      if (fifoCnt > 0) {
        result = mpu.dmpUpdateFifo();

        if (result == INV_SUCCESS) {
          mpu.computeEulerAngles();
          StaticJsonDocument<200> jsonDocTxt;
          std::string output;
          
         
          float q0 = mpu.calcQuat(mpu.qw);
          float q1 = mpu.calcQuat(mpu.qx);
          float q2 = mpu.calcQuat(mpu.qy);
          float q3 = mpu.calcQuat(mpu.qz);


          Serial.printf("Qmpu=[%f,%f,%f,%f]\r\n", q0, q1, q2, q3);
          Serial.printf("---------------------\r\n");
          // rootTx["roll"] = mpu.roll;
          // rootTx["pitch"] = mpu.pitch;
          // rootTx["yaw"] = mpu.yaw;

          
          jsonDocTxt["q0"] = q0;
          jsonDocTxt["q1"] = q1;
          jsonDocTxt["q2"] = q2;
          jsonDocTxt["q3"] = q3;

        
          serializeJson(jsonDocTxt, output);
          bleDistanceCharacteristics.setValue(output);
          bleDistanceCharacteristics.notify();
          jsonDocTxt.clear();
        }
      } else {
        Serial.println("false interrupt");
        delay(20);
      }
    } else {
      delay(20);
    }
  }
}

void loop() {
   //Set temperature Characteristic value and notify connected client

  
  Serial.printf("loop() running on core %d\r\n", xPortGetCoreID());
  while (1) {
    Serial.printf("[RAM: %d]\r\n", esp_get_free_heap_size());
    delay(1000);
  }
}
