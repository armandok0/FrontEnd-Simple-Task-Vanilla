const deleteButton = document.getElementById("deleteButton");
const addButton = document.getElementById("addButton");

export function showLoader() {
    const loaderWrapper = document.querySelector('.loader-wrapper');
    loaderWrapper.style.display = 'flex';
}

export function hideLoader() {
    const loaderWrapper = document.querySelector('.loader-wrapper');
    loaderWrapper.style.display = 'none';
}

export function showDeleteButton() {
    deleteButton.style.display = "block";
}

export function hideDeleteButton() {
    deleteButton.style.display = "none";
}

export function showAddNewButton() {
    addButton.style.display = "block";
}

export function hideAddNewButton() {
    addButton.style.display = "none";
}

export function showCreateButton() {
    createButton.style.display = "block";
}

export function hideCreateButton() {
    createButton.style.display = "none";
}