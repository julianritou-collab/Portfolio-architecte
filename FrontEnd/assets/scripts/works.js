import { getWorks , deleteWork } from './api.js'
//works.js : gère l'affichage des travaux

// Afficher les travaux 
export function displayWorks(works){
    console.log("displayWorks() appelé");
    let gallery = document.querySelector('.gallery');
    let miniGallery = document.querySelector('.small-gallery');
    gallery.innerHTML = '';
    miniGallery.innerHTML = '';
    works.forEach(work => {
        let figure = createFigure(work);
        gallery.appendChild(figure);
        let miniFigure = createMiniFigure(work);
        miniGallery.appendChild(miniFigure);
    });
};
// Créer une figure pour un projet dans la galerie principale
const createFigure = (work) => {
    let figure = document.createElement('figure');
    let img = document.createElement('img');
    img.src = work.imageUrl;
    img.alt = work.title;
    let figcaption = document.createElement('figcaption');
    figcaption.textContent = work.title;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    return figure;
};
// Créer une mini-figure supprimable pour un projet dans la galerie de la modale
const createMiniFigure = (work) => {
    let miniFigure = document.createElement('figure');
    miniFigure.classList.add("mini-figure");
    let miniImg = document.createElement('img');
    miniImg.src = work.imageUrl;
    miniImg.alt = work.title;
    miniFigure.appendChild(miniImg);
    let deletebutton = document.createElement('button');
    deletebutton.classList.add("delete-button");
    deletebutton.dataset.id = work.id;
    deletebutton.ariaLabel = "Supprimer " + work.title;
    let deleteIcon = document.createElement('i')
    deleteIcon.classList.add("fa-solid", "fa-trash-can");
    deleteIcon.setAttribute("aria-hidden", "true");
    deletebutton.appendChild(deleteIcon);
    miniFigure.appendChild(deletebutton);   
    return miniFigure;
};
    
// Afficher les filtres de catégories de travaux
export function displayCategories(categories){
    console.log("displayCategories() appelé");
    let filters = document.querySelector('.filters');
    filters.innerHTML = '';
    let firstButton = document.createElement('button');
    firstButton.textContent = "Tous";
    firstButton.dataset.id = "all";
    firstButton.classList.add('active');
    filters.appendChild(firstButton);
    categories.forEach(category => {
        let button = document.createElement('button');
        button.textContent = category.name;
        button.dataset.id = category.id;
        filters.appendChild(button);
    });
};

// Gérer le filtrage des travaux par catégorie
export function filterManager(works){
    console.log("filterManager() appelé");
    const filterBtns = document.querySelectorAll(".filters button");

    filterBtns.forEach(filterBtn => {
        filterBtn.addEventListener("click", (e) => {
            console.log("Bouton de filtre cliqué");
            const categoryId = e.target.dataset.id;
            e.target.classList.add('active');
            filterBtns.forEach(btn => {
                if (btn !== e.target) {
                    btn.classList.remove('active');
                }
            }); 
            console.log("ID de catégorie sélectionnée :", categoryId);             
            const filteredWorks = categoryId === "all" ? works : works.filter(work => work.categoryId == parseInt(categoryId));
            console.log("Travaux filtrés :", filteredWorks);        
            displayWorks(filteredWorks);
        });
    }); 
};
// Gérer la suppression des travaux dans la modale

// demarrer l'ecoute des événements de suppression
export function startDeleteWorksManager() {
    console.log("startDeleteWorksManager() appelé");
    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach(button => {
        button.addEventListener("click", () => deleteWorkAndUpdate(button.dataset.id));
    });
};
// arrêter l'écoute des événements de suppression
export function stopDeleteWorksManager() {
    console.log("stopDeleteWorksManager() appelé");
    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach(button => {
        button.removeEventListener("click", () => deleteWorkAndUpdate(button.dataset.id));
    });
}
// Supprimer un travail et mettre à jour l'affichage
const deleteWorkAndUpdate = async (id) => {
    console.log("deleteWorkAndUpdate() appelé");
    const deleteResult = await deleteWork(id);  
    if(deleteResult) {
        updateWorks();
    }
};
// updateWorks() : fonction pour mettre à jour les travaux après une suppression ou une ajout de travail
export const updateWorks = async () => {
    console.log("updateWorks() appelé");
    // arrêter les écouteurs d'événements de suppression
    stopDeleteWorksManager();
    // récupérer les travaux mis à jour depuis l'API
    const works = await getWorks();
    displayWorks(works);
    // redémarrer les écouteurs d'événements de suppression
    startDeleteWorksManager();
};
