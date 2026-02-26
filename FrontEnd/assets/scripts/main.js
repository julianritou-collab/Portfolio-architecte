//point d'entrée de l'application
import { getWorks , getCategories} from './api.js'
import { displayWorks, displayCategories , filterManager } from './works.js'

console.log("main.js chargé");

const logoutManager = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "index.html";
}

const main = async () => {
    console.log("main() appelé");
    // Vérifier si l'utilisateur est connecté
    let modeEdit = localStorage.getItem("token") ? true : false;
    // Afficher le mode édition si l'utilisateur est connecté
    if(modeEdit) {
        document.querySelector(".edit-ribbon").style.display = "flex";
        document.querySelector(".login-link").style.display = "none";
        document.querySelector(".logout-link").style.display = "block";
        document.querySelector(".cta-logout").addEventListener("click", (e) => {
            e.preventDefault();
            logoutManager();
        });
        document.querySelector(".cta-edit-projects").style.display = "flex";
    }
    // Récupérer les travaux depuis l'API
    const works = await getWorks();
    console.log(works);
    // Récupérer les catégories depuis l'API
    const categories = await getCategories();
    console.log(categories);
    // Afficher les catégories si l'utilisateur n'est pas connecté
    if(!modeEdit) 
        displayCategories(categories);
    // Afficher les travaux
    displayWorks(works);
    // filtrer les travaux par catégorie
    filterManager(works);  
}

main();