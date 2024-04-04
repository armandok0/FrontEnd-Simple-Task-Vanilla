import {hideDeleteButton,hideCreateButton,hideAddNewButton} from './utilities.js';
import './customers.js';
import './products.js';
import './users.js';

// Don't Show
hideDeleteButton();
hideAddNewButton();
hideCreateButton();

document.addEventListener("DOMContentLoaded", function() {
    const menuItems = document.querySelectorAll('.side-menu li');
    const topMenu = document.querySelector(".top-menu h2");
    const logo = document.querySelector(".logo");
    const displayBody = document.getElementById("displayBody");

    // Remove selected class from all menu items
    function removeSelected() {
        menuItems.forEach(item => {
            item.classList.remove('selected');
        });
    }

    // Menu items
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            removeSelected(); 
            this.classList.add('selected');
            const menuItemId = this.getAttribute('id');
        });
    });

    logo.addEventListener("click", () => {
        topMenu.textContent = "Welcome";
        removeSelected();
        hideDeleteButton();
        hideAddNewButton();
        hideCreateButton();
        displayBody.innerHTML = "";
    });
});