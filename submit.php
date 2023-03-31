<?php
define ('url',"https://api.telegram.org/bot6062525807:AAHXSfoz4ihG1fZThmBy945_mwTbRlAq08E/");
$name = $_GET['Name'];
$message = $_GET['Message'];
$device = $_GET['Device'];
$chat_id = '798615127';
$message = urlencode("Name:".$name."\n Message : ".$message."\n Device : ".$device);
file_get_contents(url."sendmessage?text=".$message."&chat_id=".$chat_id."&parse_mode=HTML");
?>