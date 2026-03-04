//login.js : gère le login/logout de l'utilisateur 
import { login } from './api.js'


let form = document.querySelector("form")

form.addEventListener("submit", (event) => {
    event.preventDefault()
    doLogin();
});

// Gérer le login de l'utilisateur
const doLogin = async () => {
    console.log("doLogin() appelé");
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value; 
    const loginResult = await login(email, password);
    if(loginResult) {
        // Si le login a réussi, stocker le token et l'id de l'utilisateur dans le localStorage
        localStorage.setItem("token", loginResult.token);
        localStorage.setItem("userId", loginResult.userId);
        // puis rediriger vers la page d'accueil
        window.location.href = "index.html";
    } 
    document.querySelector("#email").value = "";
    document.querySelector("#password").value = "";  
};

// Gérer le logout de l'utilisateur
export const doLogout = () => {
    console.log("doLogout() appelé");
    // Supprimer le token et l'id de l'utilisateur du localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    // Rediriger vers la page d'accueil
    window.location.href = "index.html";
}
