//bot token
var telegram_bot_id = "6013825963:AAH5E4k83EQ55dXvXjhhAH6eshM8eCcfS1Q";
//chat id
var chat_id = 798615127;
var Uname, Umessage, Udevice, Utelegram, Uos, UKerVer, UAndVer;
var ready = function () {
    Uname = document.getElementById("_Name").value;
    Udevice = document.getElementById("_Device").value;
    // Handle ROM/OS selection
    var osSelect = document.getElementById("_OS");
    if (osSelect.value === "Other") {
        Uos = document.getElementById("customOSInput").value;  // Get custom input if "Other" is selected
    } else {
        Uos = osSelect.value;
    }
    // Handle Kernel Version selection
    var kernelSelect = document.getElementById("_KernelVer");
    if (kernelSelect.value === "Other") {
        UKerVer = document.getElementById("customKernelInput").value;  // Get custom input if "Other" is selected
    } else {
        UKerVer = kernelSelect.value;
    }
    // Handle Android Version selection
    var androidSelect = document.getElementById("_AndVer");
    if (androidSelect.value === "Other") {
        UAndVer = document.getElementById("customAndroidInput").value;  // Get custom input if "Other" is selected
    } else {
        UAndVer = androidSelect.value;
    }
    Utelegram = document.getElementById("_TelegramID").value;
    IP = document.getElementById("ipFormInput").value;
    message = "Name: " + Uname + "\nDevice: " + Udevice + "\nOS: " + Uos + "\nKernel Version: " + UKerVer + "\nAndroid Version: " + UAndVer + "\nTelegramID: " + "@" + Utelegram + "\nIP-Address: " + IP;
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
    // Reset fields after sending
    document.getElementById("_Name").value = "";
    document.getElementById("_Device").value = "";
    document.getElementById("_OS").value = "";
    document.getElementById("_TelegramID").value = "";
    document.getElementById("_KernelVer").value = "";
    document.getElementById("_AndVer").value = "";
    document.getElementById("ipFormInput").value = "";

    return false;
};
