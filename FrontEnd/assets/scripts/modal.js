//modal.js : gère l'affichage de la modale
let modal=null;
let previouslyFocusedElement = null;

//point d'entrée gestion de la modale
export const modalManager = () => {
    document.querySelector(".cta-edit-projects").addEventListener("click", openModal);
};

// Ouvrir la modale
const openModal = async(e) => {
    e.preventDefault();
    // Stocker l'élément actuellement focalisé avant d'ouvrir la modale
    previouslyFocusedElement = document.activeElement;
    // Afficher la modale
    modal = document.querySelector(".modal");
    modal.style.display = "flex";
    // Rendre la modale accessible en utilisant les attributs ARIA
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    // ajouter les écouteurs d'événements pour fermer la modale
    modal.addEventListener("click", closeModal);
    modal.querySelector(".modal-close").addEventListener("click", closeModal);
    modal.querySelector(".modal-close").addEventListener("click", closeModal);
    // Empêcher la propagation des événements de clic à l'intérieur de la modale
    modal.querySelector(".modal-wrapper").addEventListener("click", stopPropagation);
    // Gérer le slider (Galerie photo <-> Ajout photo) dans la modale
    sliderManager();
};

// Fermer la modale
const closeModal = (e) => {
    e.preventDefault();
    if(modal === null)
        return;  
    if (previouslyFocusedElement) {
        // Rétablir le focus sur l'élément précédemment focalisé avant d'ouvrir la modale
        previouslyFocusedElement.focus();
    }
    // Rendre la modale inaccessible en utilisant les attributs ARIA  
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    // Supprimer les écouteurs d'événements pour fermer la modale
    modal.removeEventListener("click", closeModal);
    modal.querySelector(".modal-close").removeEventListener("click", closeModal);
    modal.querySelector(".modal-wrapper").removeEventListener("click", stopPropagation);
    // Cacher la modale
    modal.style.display = "none";
    modal = null;
};

// Empêcher la propagation des événements de clic à l'intérieur de la modale
const stopPropagation = (e) => {
    e.stopPropagation();
};
// Fermer la modale avec la touche "Escape"
window.addEventListener("keydown", function(e) {
    if(e.key === "Escape" || e.key === "Esc") 
        closeModal(e);
});
// Gérer le slider (Galerie photo <-> Ajout photo) dans la modale
function sliderManager() {
    const slider = document.querySelector(".modal-content");
    const right = document.querySelector('.cta-add-project');
    const left = document.querySelector('.modal-back');
    right.addEventListener("click", () => {
        left.style.display = "block";
        slider.style.transform = "translateX(-50%)";
    });
    left.addEventListener("click", () => {
        slider.style.transform = "translateX(0)";
        left.style.display = "none";
    });
};