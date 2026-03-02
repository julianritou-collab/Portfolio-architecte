import { logoutManager } from './login.js'
import { getWorks , getCategories } from './api.js'
import { displayWorks, displayCategories , filterManager } from './works.js'
import { modalManager } from './modal.js'

console.log("main.js chargé");

let works = null;
export let categories = null;

// point d'entrée de la page d'accueil
const main = async () => {
    console.log("main() appelé");
    // Récupérer les travaux depuis l'API
    works = await getWorks();
    console.log(works);
    // Récupérer les catégories depuis l'API
    categories = await getCategories();
    console.log(categories);
    // Afficher les travaux
    displayWorks(works);
    // Vérifier si l'utilisateur est connecté
    let modeEdit = localStorage.getItem("token") ? true : false;
    // Afficher le mode édition si l'utilisateur est connecté
    if(modeEdit) {
        // afficher le ruban d'édition
        document.querySelector(".edit-ribbon").style.display = "flex";
        // caher le lien de login et afficher le lien de logout
        document.querySelector(".login-link").style.display = "none";
        document.querySelector(".logout-link").style.display = "block";
        // ajouter un écouteur d'événement pour le lien de logout
        document.querySelector(".cta-logout").addEventListener("click", (e) => {
            e.preventDefault();
            logoutManager();
        });
        document.querySelector(".cta-edit-projects").style.display = "flex";
        modalManager();
    }
    else {
        // Afficher les catégories dans les filtres
        displayCategories(categories);
        filterManager(works);
    }     
}

// Lancer la fonction main pour initialiser la page d'accueil
main();



