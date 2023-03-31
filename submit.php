<?php
define ('url',"https://api.telegram.org/bot6062525807:AAHXSfoz4ihG1fZThmBy945_mwTbRlAq08E/");
$name = $_GET['name'];
$message = $_GET['message'];
$device = $_GET['device'];
$chat_id = '798615127';
$message = urlencode("Name:".$name."\n Message : ".$message."\n Device : ".$device);
file_get_contents(url."sendmessage?text=".$message."&chat_id=".$chat_id."&parse_mode=HTML");
?>