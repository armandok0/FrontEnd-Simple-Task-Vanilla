document.addEventListener("DOMContentLoaded", () => {
    const usersMenu = document.getElementById("users");
    const topMenu = document.querySelector(".top-menu h2");
    const displayBody = document.getElementById("displayBody");
    const addButton = document.getElementById("addButton");
    let addUserForm = null;
    let createButton = null;
  

    function displayUsers() {
        topMenu.textContent = "Users";
        displayBody.innerHTML = "";
        displayBody.style.display = "table";
        displayBody.style.width = "100%";
        hideCreateButton();
        // View
        showLoader();
        hideDeleteButton();
        fetch("/assets/data/users.json")
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

                let createdUsers = JSON.parse(sessionStorage.getItem("createdUsers")) || [];
                data = [...data, ...createdUsers];

                const thName = document.createElement("th");
                thName.textContent = "Name";
                const thCode = document.createElement("th");
                thCode.textContent = "Code";

                const headerRow = document.createElement("tr");
                headerRow.appendChild(thName);
                headerRow.appendChild(thCode);
                displayBody.appendChild(headerRow);

                data.forEach((user) => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${user.name}</td>
                        <td>${user.code}</td>
                    `;
                    displayBody.appendChild(tr);
                });
                hideLoader();
            })
            .catch((error) => {
                console.error("Error fetching or processing data:", error);
                displayBody.innerHTML = "<tr><td colspan='2'>Error fetching or processing data. Please try again later.</td></tr>";
                hideLoader();
            });
    }

    function hideCreateUserForm() {
        if (addUserForm) {
            addUserForm.style.display = "none";
        }
    }
    
    function showCreateUserForm() {
        topMenu.textContent = "Add New User";
        
        // Go Back button to the top menu
        const goBackButton = document.createElement("button");
        goBackButton.innerHTML = '<img src="scripts/arrow-left.svg" alt="Go Back">';
        goBackButton.addEventListener("click", () => {
            displayUsers();
            hideCreateUserForm();
            showAddNewButton();
            hideCreateButton();
            displayBody.style.display = "table";
            displayBody.style.width = "100%";
        });
        topMenu.appendChild(goBackButton);

        showCreateButton();
        addUserForm = document.createElement("div");
        addUserForm.innerHTML = `
            <label for="nameInput">Name:</label>
            <input type="text" id="nameInput" placeholder="Enter name" class="input-style">
            <label for="codeInput">Code:</label>
            <input type="text" id="codeInput" placeholder="Enter code" class="input-style">
        `;
        addUserForm.classList.add("form-container");
        displayBody.parentNode.insertBefore(addUserForm, displayBody.nextSibling);

        createButton = document.getElementById("createButton");
        createButton.addEventListener("click", createUser);
    }

    function createUser() {
        const nameInput = document.getElementById("nameInput").value;
        const codeInput = document.getElementById("codeInput").value;

        if (!nameInput && !codeInput) {
            alert("All fields are required.");
        } else if (!nameInput) {
            alert("Name is required.");
        } else if (!codeInput) {
            alert("Code is required.");
        } else {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${nameInput}</td>
                <td>${codeInput}</td>
            `;
            displayBody.insertBefore(newRow, displayBody.children[1]);
            document.getElementById("nameInput").value = "";
            document.getElementById("codeInput").value = "";

            displayBody.style.display = "table";
            displayBody.style.width = "100%";

            showAddNewButton();
            hideCreateButton();

            topMenu.textContent = "Users";

            let createdUsers = JSON.parse(sessionStorage.getItem("createdUsers")) || [];
            createdUsers.push({ name: nameInput, code: codeInput });
            sessionStorage.setItem("createdUsers", JSON.stringify(createdUsers));
            createButton.removeEventListener("click", createUser);
            if (addUserForm) {
                addUserForm.remove();
            }
        }
    }

    addButton.addEventListener("click", () => {
        addButton.style.display = "none";
        displayBody.style.display = "none";
        showCreateUserForm();
    });

    usersMenu.addEventListener("click", () => {
        displayUsers();
        hideCreateUserForm();
        showAddNewButton();
    });

});
