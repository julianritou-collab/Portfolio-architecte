//login.js : gère le login de l'utilisateur 
import { login } from './api.js'

console.log("login.js chargé");

let form = document.querySelector("form")

form.addEventListener("submit", (event) => {
    event.preventDefault()
    loginManager();
});

const loginManager = async () => {
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value; 
    const loginResult = await login(email, password);
    if(loginResult) {
        localStorage.setItem("token", loginResult.token);
        localStorage.setItem("userId", loginResult.userId);
        window.location.href = "index.html";
    } else {
        alert("Identifiant ou mot de passe incorrect");
    } 
    document.querySelector("#email").value = "";
    document.querySelector("#password").value = "";  
};
