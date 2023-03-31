//bot token
var telegram_bot_id = "6062525807:AAHXSfoz4ihG1fZThmBy945_mwTbRlAq08E";
//chat id
var chat_id = 798615127;
var u_name, message, device;
var ready = function () {
    u_name = document.getElementById("Name").value;
    defmessage = document.getElementById("Message").value;
    device = document.getElementById("Device").value;
    message = "Name: " + u_name + "\nMessage: " + defmessage + "\nDevice: " + device;
};
var sender = function () {
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
    document.getElementById("Name").value = "";
    document.getElementById("Message").value = "";
    document.getElementById("Device").value = "";
    return false;
};