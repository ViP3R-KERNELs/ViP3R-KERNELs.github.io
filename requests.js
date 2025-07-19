let message = "";

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

    message = `Name: ${Uname}\nDevice: ${Udevice}\nROM Type: ${romType}\nOS: ${Uos}` +
                `\nKernel Version: ${UKerVer}\nAndroid Version: ${UAndVer}\nTelegramID: @${Utelegram}` +
                `\nIP Address: ${IP}${countryMsg}`;
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

    const sendBtn = document.getElementById("sendBtn");
    if (sendBtn) {
        sendBtn.disabled = true;
        sendBtn.innerText = "Sending...";
    }

    if (!message.includes("undefined")) { // Validate if all fields are properly filled
        fetch("https://device-build-request.viperkernels.workers.dev/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: message })
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                sendBtn.innerText = "Sent! 😉";
                alert("Your request has been sent!\nGet in touch with the Admin on Telegram\nUsername - @IamCOD3X");

                // Reset button after 2 seconds
                setTimeout(() => {
                    sendBtn.disabled = false;
                    sendBtn.innerText = "Send";
                }, 2000);
            } else {
                sendBtn.disabled = false;
                sendBtn.innerText = "Send";
                alert("Failed to send message.");
            }
        })
        .catch(error => {
            sendBtn.disabled = false;
            sendBtn.innerText = "Send";
            alert("Network error, try again later.");
            console.error(error);
        });

        // Clear form
        const fieldsToClear = ["_Name", "_Device", "romType", "stockROMInput", "customROMSelect", "customROMInput",
                                "_KernelVer", "customKernelInput", "_AndVer", "customAndroidInput", "_TelegramID", "_ConfirmTelegramID"];
        fieldsToClear.forEach(id => document.getElementById(id).value = "");
    } else {
        alert("Please fill in all required fields correctly.");
    }

    return false;
}
