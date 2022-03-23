#include <MPU9250.h>
#include <math.h>
#include <wire.h >
#include "MPU9250.h"

const int p = 2; // controling the persecution = 6
float acc[3];  // 0=x;;1=y;;2=z;;
float gyr[3];  // 0=x;;1=y;;2=z;;
float Mag[3];  // 0=x;;1=y;;2=z;;
float sped[3]; // 0=x;;1=y;;2=z;;
float spednew = 0;
float spedold = 0;
#define x 0
#define y 1     // again 0=x;;1=y;;2=z;;
#define z 2
//#define RAD_TO_DEG 57.295779513082320876798154814105
//#define PI 3.1415926535897932384626433832795

bool counting = false;
float airTime = 0;
float SumAcc = 0;

float thetaM;    //theta Measured by accelormeter
float phiM;      //phi Measured by accelormeter

//float thetaFnew;   ///////////////////////////////////////////////////////
//float phiFnew;     ////// theta and phi used to make a lowpass filter ////
//float phiFold = 0;   /////////////////////////////////////////////////////
//float thetaFold = 0; /////////////////////////////////////////////////////

float thetaG = 0;////////////////////theat and
float phiG = 0;

float dt;  // delta time in milli Sec
unsigned long millisold;

unsigned long jump_start;
unsigned long jump_end;

float thetaC1 = 0; ///////////////////////////////////////////////////////////////////
float phiC1 = 0;   //////////////////complemntry filterd theta and phi ////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

float thetaC2 = 0;//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
float phiC2 = 0; //////////////////complemntry filterd theta and phi using lowpass filter theta and phi insted of normal theta an phi //////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

float alpha ;  //angle around Zaxes
float alphaC ; //angle around Zaxes withe telt compansated comaps


float thetaRad = 0;
float phiRad = 0;

float phiold = phiM;

float thetaMF = 0;
float phiMF   = 0;

float accnew = 0;
float accold = 0;

// an MPU9250 object with the MPU-9250 sensor on I2C bus 0 with address 0x68
MPU9250 IMU(Wire, 0x68);
int status;


void setup() {
  // serial to display data
  Serial.begin(115200);


  IMU_Comunication(); // start communication with IMU

  IMU.setAccelRange(MPU9250::ACCEL_RANGE_16G);  // setting the accelerometer full scale range to +/-16G

  IMU.setGyroRange(MPU9250::GYRO_RANGE_2000DPS);// setting the gyroscope full scale range to +/-2000 deg/s


  millisold = millis();



}


void loop() {
  // read the sensor
  IMU.readSensor();

  acc[x] = (IMU.getAccelX_mss());
  acc[y] = (IMU.getAccelY_mss());             ////getAccelY_mss()&&getAccelX_mss()are inversed on my sensor or in the liberary
  acc[z] = (IMU.getAccelZ_mss());

  gyr[x] = (IMU.getGyroX_rads() / 2 / PI * 360);
  gyr[y] = (IMU.getGyroY_rads() / 2 / PI * 360);
  gyr[z] = (IMU.getGyroZ_rads() / 2 / PI * 360);

  Mag[x] = IMU.getMagX_uT();
  Mag[y] = IMU.getMagY_uT();
  Mag[z] = IMU.getMagZ_uT();

  dt = ((millis()) - millisold) / 1000.;

  millisold = millis();

  calc();
  printing ();
  airtime();
  Serial.print(counting);
  Serial.print(",");
  Serial.println(airTime);

  spedold = spednew;
  //     delay(50);
}
