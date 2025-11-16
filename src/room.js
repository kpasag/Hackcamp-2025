const checkbox = document.getElementById("customCheck");
const textarea = document.getElementById("customScenariosInput");

checkbox.addEventListener("change", () => {
    textarea.classList.toggle("hidden", !checkbox.checked);
});
    