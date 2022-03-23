//
//
//void maping_angels()
//
//{
//  if (phiM < 0)
//  {
//    if ((phiold - phiM) > 90)
//    {
//      phiM = map(phiM, -180, -1, 180, 360);
//    }
//  }
//  if (phiM > 10)
//  {
//    if ((phiold - phiM) < 90)
//    {
//      phiM = map(phiM, 180, 1, -180, -360);
//    }
//  }
//  phiold = phiM;
//}

void calc()
{
  //  thetaMF =  atan2(acc[x], -acc[z]) / 2 / PI * 720; //tan invers(num , denm)
  //  phiMF   =  atan2(acc[y], -acc[z]) / 2 / PI * 720; //tan invers(num , denm)

  //  thetaM =  atan2(acc[x], -acc[z]) / 2 / PI * 360; //tan invers(num , denm)
  phiM   =  -(atan2(acc[y], -acc[z]) / 2 / PI * 360); //tan invers(num , denm)

  thetaM =  atan2(acc[x], sqrt(acc[y] * acc[y] + acc[z] * acc[z])) / 2 / PI * 360; //tan invers(num , denm)
  //  phiM   =  atan2(-acc[y], sqrt(acc[x]*acc[y] + acc[z]*acc[z])) / 2 / PI * 360; //tan invers(num , denm)


  //  thetaFnew = (thetaFold * 0.9) + (thetaM * 0.1);
  //  phiFnew = (phiFold * 0.8) + (phiM * 0.2);
  thetaG = (thetaG + (gyr[y] * dt));
  phiG = (phiG + (gyr[x] * dt));


  thetaC1 = (0.99 * (thetaC1 + (gyr[y] * dt) * 1.15)) + (thetaM * 0.01) ;
  phiC1   = (0.99 * (phiC1   + (gyr[x] * dt) * 1.15)) + (phiM   * 0.01);

  //New complemntry filter
  //  /////////////////////////////////////////////////////////////////////
  //  thetaC1 = 0.99 * (thetaC1 + (gyr[y] * dt)) + 1 * 0.01 ;            // it works good with gain 1.5 but takes long time to go back to zero
  //  phiC1   = 0.99 * (phiC1   - (gyr[x] * dt)) + 1 * 0.01 ;            //
  //  /////////////////////////////////////////////////////////////////////
  //                                                                     //
  //  thetaC2 = (0.80 * thetaG) + (thetaM * 0.2) ;                       //
  //  phiC2  =  (0.80 * phiG) +   ( phiM  * 0.2) ;                       //
  //  /////////////////////////////////////////////////////////////////////
  //  thetaC2 = 0.95 * (thetaC2 + (gyr[y] * dt)) + thetaFnew * 0.05 ;    //
  //  phiC2  = 0.95 * (phiC2 - (gyr[x] * dt)) + phiFnew * 0.05 ;         //
  //  /////////////////////////////////////////////////////////////////////

  thetaRad = thetaC1 / 360 * (2 * PI);
  phiRad =  phiC1 / 360 * (2 * PI);       // we need the angles to calc the telt compansated comaps

  alpha = atan2(Mag[y], Mag[x]) / 2 / PI * 360; //compas based on angel betwen north and X axes
  alphaC = atan2((Mag[y] * cos(phiRad) + Mag[z] * sin(phiRad)), (Mag[x] * cos(thetaRad) - Mag[y] * sin(phiRad) * sin(thetaRad) + Mag[z] * cos(phiRad) * sin(thetaRad))) / 2 / PI * 360; //compansated compas
  speeed();
}
void speeed ()
{
  if ( acc[x] < 1 && acc[x] > -1)
  {
    acc[x] = 0;
  }
  if ( acc[y] < 1 && acc[y] > -1)
  {
    acc[y] = 0;
  }
  if ( acc[z] < 1 && acc[z] > -1)
  {
    acc[z] = 0;
  }
  sped[x] = (acc[x] * dt);
  sped[y] = (acc[y] * dt);
  sped[z] = (acc[z] * dt);
  spednew = spedold +sped[x]  ;
}

void airtime()
{
  SumAcc = sqrt(acc[y] * acc[y] + acc[z] * acc[z] + acc[x] * acc[x]);
  if (acc[z] > 0 && counting == false)

  {
    jump_start = millis();
    counting = true;
  }

  if ((SumAcc) > 100 && counting == true)
  {
    jump_end = millis();

    airTime = (jump_start - jump_end)/ 1000.;
    counting = false;
  }


}
