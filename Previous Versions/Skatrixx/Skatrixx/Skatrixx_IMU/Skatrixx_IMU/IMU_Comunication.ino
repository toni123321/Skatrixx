void IMU_Comunication()
{

  // start communication with IMU
  // if comunication faild will try again every 5 sec
  status = IMU.begin();
  delay(1000);
  if (status < 0) {
    Serial.println("IMU initialization unsuccessful");
    Serial.println("Check IMU wiring or try cycling power");
    Serial.print("Status: ");
    Serial.println(status);
    delay(5000);
    IMU_Comunication();
  }
}
