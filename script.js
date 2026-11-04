// ===== Milana's website: JavaScript =====
// Functions: 1) toggleMenu  2) toggleTheme  3) validateForm  4) openModal / closeModal


// ---------- FUNCTION 1: mobile menu ----------
// On a phone the menu is hidden. The burger button shows or hides it.
function toggleMenu() {
    var menu = document.getElementById("menu");
    var button = document.getElementById("menuButton");

    menu.classList.toggle("open");   // add the class "open" or remove it

    var isOpen = menu.classList.contains("open");   // true or false
    button.setAttribute("aria-expanded", isOpen);
}

// Close the menu after a click on a link in it
var menuLinks = document.querySelectorAll("#menu a");
for (var i = 0; i < menuLinks.length; i++) {
    menuLinks[i].onclick = function () {
        document.getElementById("menu").classList.remove("open");
        document.getElementById("menuButton").setAttribute("aria-expanded", "false");
    };
}


// ---------- FUNCTION 2: light / dark theme ----------
// The class "light-theme" on the body changes the colors (see style.css).
// The choice is saved with localStorage, so it stays after reloading the page.
function toggleTheme() {
    var body = document.body;
    var button = document.getElementById("themeButton");

    body.classList.toggle("light-theme");

    if (body.classList.contains("light-theme")) {
        button.textContent = "Dark theme";
        localStorage.setItem("theme", "light");
    } else {
        button.textContent = "Light theme";
        localStorage.setItem("theme", "dark");
    }
}

// When the page opens, check if the light theme was saved before
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-theme");
    document.getElementById("themeButton").textContent = "Dark theme";
}


// ---------- FUNCTION 3: form validation ----------
// Checks the name, the email and the message.
// Shows an error under a wrong field, or a success message.
function validateForm(event) {
    event.preventDefault();   // do not reload the page

    var nameInput = document.getElementById("name");
    var emailInput = document.getElementById("email");
    var messageInput = document.getElementById("message");

    var name = nameInput.value.trim();   // trim() removes spaces at the start and at the end
    var email = emailInput.value.trim();
    var message = messageInput.value.trim();

    var isValid = true;   // becomes false if we find a mistake

    // clear the old messages first
    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("messageError").textContent = "";
    document.getElementById("formSuccess").textContent = "";
    nameInput.classList.remove("input-error");
    emailInput.classList.remove("input-error");
    messageInput.classList.remove("input-error");

    // name: at least 2 letters
    if (name.length < 2) {
        document.getElementById("nameError").textContent = "Please enter your name (at least 2 letters).";
        nameInput.classList.add("input-error");
        isValid = false;
    }

    // email: one "@", a dot after it, and no spaces (for example name@mail.com)
    var atPosition = email.indexOf("@");
    var dotPosition = email.lastIndexOf(".");
    if (atPosition < 1 ||
        atPosition !== email.lastIndexOf("@") ||
        dotPosition < atPosition + 2 ||
        dotPosition === email.length - 1 ||
        email.indexOf(" ") !== -1) {
        document.getElementById("emailError").textContent = "Please enter a correct email, for example name@mail.com.";
        emailInput.classList.add("input-error");
        isValid = false;
    }

    // message: at least 10 characters
    if (message.length < 10) {
        document.getElementById("messageError").textContent = "The message must have at least 10 characters.";
        messageInput.classList.add("input-error");
        isValid = false;
    }

    if (isValid) {
        document.getElementById("formSuccess").textContent = "Thank you, " + name + "! Your message is ready to send.";
        document.getElementById("contactForm").reset();   // clear the form
    } else {
        // put the cursor in the first field with a mistake
        document.querySelector(".input-error").focus();
    }
}


// ---------- FUNCTION 4: photo window (modal) ----------
// The "View photo" button is inside a photo card. We take the picture,
// the title and the text from this card and show them in a big window.
function openModal(button) {
    var card = button.parentElement;   // the card that contains the button

    var image = card.querySelector("img");
    var title = card.querySelector("h3");
    var text = card.querySelector("p");

    document.getElementById("modalImage").src = image.src;
    document.getElementById("modalImage").alt = image.alt;
    document.getElementById("modalTitle").textContent = title.textContent;
    document.getElementById("modalText").textContent = text.textContent;

    document.getElementById("modal").classList.add("open");
}

function closeModal() {
    document.getElementById("modal").classList.remove("open");
}

// The Esc key also closes the window
document.onkeydown = function (event) {
    if (event.key === "Escape") {
        closeModal();
    }
};
