import { getWorks } from './api.js'
import { displayWorks } from './works.js'
//point d'entrée de l'application
console.log("main.js chargé");



const main = async () => {
    console.log("main() appelé");
    // Récupérer les travaux depuis l'API
    const works = await getWorks();
    console.log(works);
    // Afficher les travaux
    displayWorks(works);
}

main();