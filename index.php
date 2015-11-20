<?php

if(isset($_GET['username']))
{

  $username = $_GET['username'];

  $curl = curl_init();

  curl_setopt_array($curl, array(
    CURLOPT_URL => "http://api.lukisongroup.com/login/users?username=" . $username,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_HTTPHEADER => array("token:azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa"),
  ));

  $response = curl_exec($curl);
  $err = curl_error($curl);

  curl_close($curl);

  if ($err) 
  {
    #echo "cURL Error #:" . $err;
  } 
  else 
  {
    #echo $response;
  }

  $data=$response; 

  echo $result = (json_decode($data));


}
?>


