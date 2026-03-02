//login.js : gère le login de l'utilisateur 
import { login } from './api.js'

console.log("login.js chargé");

let form = document.querySelector("form")

form.addEventListener("submit", (event) => {
    event.preventDefault()
    loginManager();
});

// Gérer le login de l'utilisateur
const loginManager = async () => {
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value; 
    const loginResult = await login(email, password);
    if(loginResult) {
        // Si le login a réussi, stocker le token et l'id de l'utilisateur dans le localStorage
        localStorage.setItem("token", loginResult.token);
        localStorage.setItem("userId", loginResult.userId);
        // puis rediriger vers la page d'accueil
        window.location.href = "index.html";
    } else {
        alert("Identifiant ou mot de passe incorrect");
    } 
    document.querySelector("#email").value = "";
    document.querySelector("#password").value = "";  
};
