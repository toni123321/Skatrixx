
void printing()
{

  Serial.print((acc[x]), p);
  Serial.print(",");
  Serial.print((acc[y]), p);
  Serial.print(",");
  Serial.print((acc[z]), p);
  Serial.print(",");




  //  Serial.print(thetaFnew, p);
  //  Serial.print(",");
  //  Serial.print(phiFnew, p);
  //  Serial.print(",");
  Serial.print((gyr[x]), p);
  Serial.print(",");
  Serial.print((gyr[y]), p);
  Serial.print(",");
  Serial.print((gyr[z]), p);
  Serial.print(",");
  Serial.print((thetaG), p);
  Serial.print(",");
  Serial.print((phiG), p);
  Serial.print(",");

  Serial.print(thetaM, p);
  Serial.print(",");
  Serial.print(phiM, p);
  Serial.print(",");

  Serial.print((thetaC1), p);
  Serial.print(",");
  Serial.print((phiC1), p);
  Serial.print(",");

  //  Serial.print((thetaC2), p);
  //  Serial.print(",");
  //  Serial.print((phiC2), p);
  //  Serial.print(",");
  //  Serial.print(alpha, p);
  //  Serial.print(",");
  Serial.print(alphaC, p);
  Serial.print(",");
  //  Serial.println(mpu.getRoll());
  Serial.println(spednew * 3.6, p);
  //  Serial.print("Temperature in C: ");
  //  Serial.println(IMU.getTemperature_C(),p);
  //  Serial.println();
  //  thetaFold = thetaFnew;
  //  phiFold = phiFnew;
}
