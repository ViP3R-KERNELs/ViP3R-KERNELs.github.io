// Bot token and chat ID
var telegram_bot_id = "6013825963:AAH5E4k83EQ55dXvXjhhAH6eshM8eCcfS1Q";
var chat_id = 798615127;

function ready(country) {
    var Uname = document.getElementById("_Name").value;
    var Udevice = document.getElementById("_Device").value;
    var Utelegram = document.getElementById("_TelegramID").value;
    var IP = document.getElementById("ipFormInput").value;
    
    // Handle ROM selection
    var romType = document.getElementById("romType").value;
    var Uos = "";
    if (romType === "Stock") {
        Uos = document.getElementById("stockROMInput").value;
    } else if (romType === "Custom") {
        var customROM = document.getElementById("customROMSelect").value;
        Uos = (customROM === "Other") ? document.getElementById("customROMInput").value : customROM;
    }

    // Handle Kernel Version selection
    var kernelSelect = document.getElementById("_KernelVer").value;
    var UKerVer = (kernelSelect === "Other") ? document.getElementById("customKernelInput").value : kernelSelect;

    // Handle Android Version selection
    var androidSelect = document.getElementById("_AndVer").value;
    var UAndVer = (androidSelect === "Other") ? document.getElementById("customAndroidInput").value : androidSelect;

    // Country check
    var countryMsg = country ? `\nCountry: ${country}` : "\nCountry: Not Available";

    message = "Name: " + Uname + "\nDevice: " + Udevice + "\nROM Type: " + romType + "\nOS: " + Uos +
              "\nKernel Version: " + UKerVer + "\nAndroid Version: " + UAndVer + "\nTelegramID: @" + Utelegram +
              "\nIP Address: " + IP + countryMsg;
}

function requests() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;
                fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
                    .then(response => response.json())
                    .then(data => {
                        var country = data.address && data.address.country ? data.address.country : null;
                        sendRequest(country);
                    })
                    .catch(error => {
                        console.warn("Geolocation API error:", error);
                        sendRequest(null); // Proceed without country if API fails
                    });
            },
            function (error) {
                console.warn("Geolocation denied:", error);
                sendRequest(null); // Proceed without country if denied
            }
        );
    } else {
        console.warn("Geolocation not supported.");
        sendRequest(null); // Proceed without country
    }

    return false;
}

function sendRequest(country) {
        ready(country);
    if (!message.includes("undefined")) { // Validate if all fields are properly filled
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
            console.log("Message sent successfully:", response);
            alert("Your request has been sent!\nGet in touch with the Admin on Telegram\nUsername - @IamCOD3X");
        }).fail(function (error) {
            console.error("Error sending message:", error);
            alert("Error sending request. Please try again later.");
        });

        // Reset form fields after sending
        document.getElementById("_Name").value = "";
        document.getElementById("_Device").value = "";
        document.getElementById("romType").value = "";
        document.getElementById("stockROMInput").value = "";
        document.getElementById("customROMSelect").value = "";
        document.getElementById("customROMInput").value = "";
        document.getElementById("_KernelVer").value = "";
        document.getElementById("customKernelInput").value = "";
        document.getElementById("_AndVer").value = "";
        document.getElementById("customAndroidInput").value = "";
        document.getElementById("_TelegramID").value = "";
    } else {
        alert("Please fill in all required fields correctly.");
    }
    
    return false;
};
