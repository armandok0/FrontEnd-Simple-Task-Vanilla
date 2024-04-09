
document.addEventListener("DOMContentLoaded", () => {
    // Store deleted product in session storage
    const storeDeletedProduct = (product) => {
        let deletedProducts = JSON.parse(sessionStorage.getItem("deletedProducts")) || [];
        deletedProducts.push(product);
        sessionStorage.setItem("deletedProducts", JSON.stringify(deletedProducts));
    };

    const productsMenu = document.getElementById("products");
    const topMenu = document.querySelector(".top-menu h2");
    const displayBody = document.getElementById("displayBody");
    const deleteButton = document.getElementById("deleteButton");

    productsMenu.addEventListener("click", () => {
        topMenu.textContent = "Products";
        displayBody.innerHTML = "";
        displayBody.style.display = "table";
        displayBody.style.width = "100%";

        // View
        showLoader();
        showDeleteButton();
        hideAddNewButton();
        hideCreateButton();

        fetch("/assets/data/products.json")
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

                // Filter out deleted products
                let deletedProducts = JSON.parse(sessionStorage.getItem("deletedProducts")) || [];
                data = data.filter(product => !deletedProducts.find(deletedProduct => deletedProduct.code === product.code));

                const thCheckbox = document.createElement("th");
                const thCode = document.createElement("th");
                thCode.textContent = "Code";
                const thName = document.createElement("th");
                thName.textContent = "Name";

                const headerRow = document.createElement("tr");
                headerRow.appendChild(thCheckbox);
                headerRow.appendChild(thCode);
                headerRow.appendChild(thName);
                displayBody.appendChild(headerRow);

                // Populating table with product data
                data.forEach((product) => {
                    const tr = document.createElement("tr");
                   
                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.addEventListener("change", (event) => {
                        if (event.target.checked) {
                            tr.classList.add("selected");
                        } else {
                            tr.classList.remove("selected");
                        }
                    });
                    tr.appendChild(document.createElement("td")).appendChild(checkbox);

                    const tdCode = document.createElement("td");
                    tdCode.textContent = product.code;
                    tr.appendChild(tdCode);

                    const tdName = document.createElement("td");
                    tdName.textContent = product.name;
                    tr.appendChild(tdName);

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

    deleteButton.addEventListener("click", () => {
        const selectedRows = displayBody.querySelectorAll(".selected");

        if (selectedRows.length === 0) {
            alert("Please choose one product.");
        } else if (selectedRows.length > 1) {
            alert("Please choose only one product.");
        } else {
            const confirmation = confirm("Are you sure you want to delete this product?");
            if (confirmation) {
                const deletedProduct = {
                    code: selectedRows[0].querySelector("td:nth-child(2)").textContent,
                    name: selectedRows[0].querySelector("td:nth-child(3)").textContent
                };
                storeDeletedProduct(deletedProduct);
                selectedRows[0].remove();
                alert("Product deleted successfully!");
            }
        }
    });
});
