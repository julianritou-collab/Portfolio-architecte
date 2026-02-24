import { getWorks , getCategories} from './api.js'
import { displayWorks, displayCategories } from './works.js'
//point d'entrée de l'application
console.log("main.js chargé");



const main = async () => {
    console.log("main() appelé");
    // Récupérer les travaux depuis l'API
    const works = await getWorks();
    console.log(works);
    // Récupérer les catégories depuis l'API
    const categories = await getCategories();
    console.log(categories);
    // Afficher les catégories
    displayCategories(categories);
    // Afficher les travaux
    displayWorks(works);
    
}

main();