//bot token
var telegram_bot_id = "6013825963:AAH5E4k83EQ55dXvXjhhAH6eshM8eCcfS1Q";
//chat id
var chat_id = 798615127;
var Uname, Umessage, Udevice, Utelegram;
var ready = function () {
    Uname = document.getElementById("Name:").value;
    Umessage = document.getElementById("Message:").value;
    Udevice = document.getElementById("Device:").value;
    Utelegram = document.getElementById("TelegramID:").value;
    message = "Name " + Uname + "\nMessage " + Umessage + "\nDevice " + Udevice + "\nTelegramID "+ "@" + Utelegram;
};
var requests = function () {
    ready();
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.telegram.org/bot" + telegram_bot_id + "/sendMessage",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache"
        },
        "data": JSON.stringify({
            "chat_id": chat_id,
            "text": message
        })
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
    });
    document.getElementById("Name:").value = "";
    document.getElementById("Message:").value = "";
    document.getElementById("Device:").value = "";
    document.getElementById("TelegramID:").value = "";
    return false;
};
