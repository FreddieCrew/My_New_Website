<?php
if (!isset($_COOKIE['firsttime']))
{
    $ip = getIPAddress(); 
    setcookie($ip, "no", /* EXPIRE */);
}

function getIPAddress() {  
 if(!emptyempty($_SERVER['HTTP_CLIENT_IP'])) {  
            $ip = $_SERVER['HTTP_CLIENT_IP'];  
    }  
elseif (!emptyempty($_SERVER['HTTP_X_FORWARDED_FOR'])) {  
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];  
 }  
else{  
         $ip = $_SERVER['REMOTE_ADDR'];  
 }  
 return $ip;  
}  
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>