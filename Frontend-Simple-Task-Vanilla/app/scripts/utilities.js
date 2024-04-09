const deleteButton = document.getElementById("deleteButton");
const addButton = document.getElementById("addButton");

function showLoader() {
    const loaderWrapper = document.querySelector('.loader-wrapper');
    loaderWrapper.style.display = 'flex';
}
function hideLoader() {
    const loaderWrapper = document.querySelector('.loader-wrapper');
    loaderWrapper.style.display = 'none';
}

function showDeleteButton() {
    deleteButton.style.display = "block";
}

function hideDeleteButton() {
    deleteButton.style.display = "none";
}

 function showAddNewButton() {
    addButton.style.display = "block";
}
 function hideAddNewButton() {
    addButton.style.display = "none";
}

 function showCreateButton() {
    createButton.style.display = "block";
}

 function hideCreateButton() {
    createButton.style.display = "none";
}