document.addEventListener('DOMContentLoaded', () => {
    const customersMenu = document.getElementById("customers");
    const topMenu = document.querySelector(".top-menu h2");
    const displayBody = document.getElementById("displayBody");

    customersMenu.addEventListener("click", () => {
        topMenu.textContent = "Customers";
        displayBody.innerHTML = "";
        displayBody.style.display = "table";
        displayBody.style.width = "100%";
        showLoader();
        hideDeleteButton();
        hideAddNewButton();
        hideCreateButton();

        fetch("/assets/data/customers.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (!data || !Array.isArray(data)) {
                    throw new Error("Invalid data format: expected an array");
                }

                displayBody.innerHTML = "";
                const thCode = document.createElement("th");
                thCode.textContent = "Code";
                const thName = document.createElement("th");
                thName.textContent = "Name";
                const thAddress = document.createElement("th");
                thAddress.textContent = "Address";

                const headerRow = document.createElement("tr");
                headerRow.appendChild(thCode);
                headerRow.appendChild(thName);
                headerRow.appendChild(thAddress);
                displayBody.appendChild(headerRow);

                data.forEach((customer) => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${customer.code}</td>
                        <td>${customer.name}</td>
                        <td>${customer.address}</td>
                    `;
                    displayBody.appendChild(tr);
                });

                hideLoader();
            })
            .catch((error) => {
                console.error("Error fetching or processing data:", error);
                displayBody.innerHTML = "<tr><td colspan='3'>Error fetching or processing data. Please try again later.</td></tr>";
                hideLoader();
            });
    });
});