function loadTable(url, containerId) {
    fetch(url)
    .then(response => response.text())
    .then(data => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(data, 'text/html');
        let table = doc.querySelector("table");

        if (table) {
            document.getElementById(containerId).innerHTML = table.outerHTML;
        } else {
            console.error("Error: Table not found in fetched content!");
            document.getElementById(containerId).innerHTML = "Error: Table not found!";
        }
    })
    .catch(error => {
        console.error("Error loading the table:", error);
        document.getElementById(containerId).innerHTML = "Failed to load supported devices.";
    });
}

window.filterTable = function() {
    let searchQuery = document.getElementById("searchInput").value.toLowerCase();
    let tableContainer = document.getElementById("deviceTableContainer");
    let table = tableContainer.querySelector("table");

    if (!table) return;

    let rows = table.getElementsByTagName("tr");
    let hasMatch = false;

    for (let i = 1; i < rows.length; i++) { // Skip header row
        let cells = rows[i].getElementsByTagName("td");
        if (cells.length < 3) continue;

        let codename = cells[1].textContent.trim().toLowerCase();
        let deviceName = cells[2].textContent.trim().toLowerCase();

        if (codename.includes(searchQuery) || deviceName.includes(searchQuery)) {
            rows[i].style.display = "table-row"; // Show matching rows
            hasMatch = true;
        } else {
            rows[i].style.display = "none"; // Hide non-matching rows
        }
    }

    // Show table only if there are matching results
    if (hasMatch) {
        tableContainer.style.display = "block";  // Show table if matches exist
        table.style.display = "table"; 
    } else {
        tableContainer.style.display = "none";  // Hide table if no matches
        table.style.display = "none";
    }
};

document.addEventListener("DOMContentLoaded", function() {
    // Call `loadTable()` for each page with the correct URL
    loadTable("https://www.viperkernels.com/pages/SupportedDevice.html", "deviceTableContainer");
});

document.addEventListener("DOMContentLoaded", function () {
    let searchInput = document.getElementById("searchInput");
    let tableContainer = document.getElementById("deviceTableContainer");

    // Hide the table when clicking outside search box & results
    document.addEventListener("click", function (event) {
        if (!searchInput.contains(event.target) && !tableContainer.contains(event.target)) {
            tableContainer.style.display = "none"; // Hide results
        }
    });

    // Ensure results show while typing
    searchInput.addEventListener("input", function () {
        if (this.value.trim() !== "") {
            tableContainer.style.display = "block";
        }
    });

    // Keep table visible when hovering over it
    tableContainer.addEventListener("mouseenter", function () {
        this.style.display = "block";
    });

    tableContainer.addEventListener("mouseleave", function () {
        this.style.display = "none";
    });
});