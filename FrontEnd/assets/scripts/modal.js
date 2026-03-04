import { startDeleteWorksManager, stopDeleteWorksManager, updateWorks } from './works.js'
import { submitWork } from './api.js'
//modal.js : gère l'affichage de la modale
let modal=null;
let previouslyFocusedElement = null;
let addEventInitialized = false;
let sliderInitialized = false;

//point d'entrée gestion de la modale
export const modalManager = () => {
    console.log("modalManager() appelé");
    document.querySelector(".cta-edit-projects").addEventListener("click", openModal);
};

// Ouvrir la modale
const openModal = async(e) => {
    console.log("openModal() appelé");
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
    // Empêcher la propagation des événements de clic à l'intérieur de la modale
    modal.querySelector(".modal-wrapper").addEventListener("click", stopPropagation);
    // Lancer la gestion de la suppression des travaux dans la modale
    startDeleteWorksManager();
    // Initialiser le formulaire d'ajout de travaux dans la modale
    initAddForm();
    // Gérer le slider (Galerie photo <-> Ajout photo) dans la modale
    if(!sliderInitialized) {
        sliderManager();
        sliderInitialized = true;
    };
};

// Fermer la modale
const closeModal = (e) => {
    console.log("closeModal() appelé");
    e.preventDefault();
    if(modal === null)
        return;
    // Arrêter la gestion de la suppression des travaux dans la modale  
    stopDeleteWorksManager();
    if (previouslyFocusedElement) {
        // Rétablir le focus sur l'élément précédemment focalisé avant la modale
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
    console.log("sliderManager() appelé");
    const slider = document.querySelector(".modal-content");
    const right = document.querySelector('.cta-add-project');
    const left = document.querySelector('.modal-back');
    right.addEventListener("click", () => {
        console.log("aller vers le formulaire d'ajout de travaux");
        left.style.display = "block";
        slider.style.transform = "translateX(-50%)";
    });
    left.addEventListener("click", (e) => {
        console.log("retour à la galerie photo");
        e.preventDefault();
        slider.style.transform = "translateX(0)";
        left.style.display = "none";
    });
};
// Initialiser le formulaire d'ajout de travaux dans la modale
const initAddForm = () => {
    console.log("initAddForm() appelé");
    const form = document.querySelector(".add-work-form");
    const imageInput = form.querySelector("#image");
    const deleteImageBtn = form.querySelector(".delete-image");
    const titleInput = form.querySelector("#title");
    const categoryInput = form.querySelector("#category");
    initCategoryOptions(categoryInput);
    resetForm(form);

    if(addEventInitialized)
        return;
    console.log("Initialisation des événements du formulaire d'ajout de travaux");
    // Ajouter un écouteur d'événement pour l'input de l'image afin d'afficher un aperçu de l'image sélectionnée
    imageInput.addEventListener("change", () => {
        displayImagePreview(form);
        canSubmitForm(form);
    });
     //Ajouter un écouteur d'événement pour le bouton de suppression de l'image afin de réinitialiser le champ de l'image et masquer l'aperçu de l'image
    deleteImageBtn.addEventListener("click", (e) => {
        e.preventDefault();
        imageInput.value = "";
        displayImagePreview(form);
        canSubmitForm(form);
    });
    // Ajouter des écouteurs d'événements pour les autres champs du formulaire afin de vérifier si le formulaire est valide pour activer le bouton de soumission
    titleInput.addEventListener("input", () => canSubmitForm(form));
    categoryInput.addEventListener("change", () => canSubmitForm(form));

    // Ajouter un écouteur d'événement pour la soumission du formulaire d'ajout de travaux
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await doSubmitForm(form);
    });
    addEventInitialized = true;
};

import { categories } from './main.js'
// Initialiser les options de catégories dans le formulaire d'ajout de travaux
const initCategoryOptions = (categoryInput) => {
    console.log("initCategoryOptions() appelé");
    categoryInput.innerHTML = "";
    if(categories === null || categories.length === 0) {
        return;
    }
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        categoryInput.appendChild(option);
    });
}
// Réinitialiser le formulaire d'ajout de travaux
const resetForm = (form) => {
    console.log("resetForm() appelé");
    const imageInput = form.querySelector("#image");
    const titleInput = form.querySelector("#title");
    const categorySelect = form.querySelector("#category");
    const uploadField = form.querySelector(".upload-field");
    const uploadPreview = form.querySelector(".upload-preview");
    const submitBtn = form.querySelector('input[type="submit"]');

    imageInput.value = "";
    titleInput.value = "";
    categorySelect.value = "";
    uploadPreview.src = './assets/images/placeholder.jpeg';
    uploadPreview.style.display = "none";
    uploadField.classList.remove("has-image");
    submitBtn.disabled = true;
    submitBtn.value = "Valider";
}

// Afficher un aperçu de l'image sélectionnée dans le formulaire d'ajout de travaux
const displayImagePreview = (form) => {
    console.log("displayImagePreview() appelé");
    const imageInput = form.querySelector("#image");
    const uploadPreview = form.querySelector(".upload-preview");
    const uploadField = form.querySelector(".upload-field");
    if (!imageInput.files || imageInput.files.length === 0) {
        uploadPreview.src = './assets/images/placeholder.jpeg';
        uploadPreview.style.display = "none";
        uploadField.classList.remove("has-image");
        return;
    }
    const selectedFile = imageInput.files[0];
    const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png'];
    const maxSize = 4 * 1024 * 1024;

    if (!allowedTypes.includes(selectedFile.type) || selectedFile.size > maxSize) {
        imageInput.value = "";
        uploadPreview.src = './assets/images/placeholder.jpeg';
        uploadPreview.style.display = "none";
        uploadField.classList.remove("has-image");
        return;
    }
    uploadPreview.src = URL.createObjectURL(selectedFile);
    uploadPreview.style.display = "block";
    uploadField.classList.add("has-image");
};

// Vérifier si le formulaire d'ajout de travaux est valide pour activer le bouton de soumission
const isFormValid = (form) => {
    console.log("isFormValid() appelé");
    const imageInput = form.querySelector("#image");
    const titleInput = form.querySelector("#title");
    const categorySelect = form.querySelector("#category");

    return imageInput.files &&imageInput.files.length > 0 && titleInput.value.trim() !== "" && categorySelect.value !== "";
};

// Vérifier si le formulaire d'ajout de travaux est valide pour activer le bouton de soumission
const canSubmitForm = (form) => {
    const submitBtn = form.querySelector('input[type="submit"]');
    // Le formulaire est considéré comme valide si une image est sélectionnée, que le champ de titre n'est pas vide et qu'une catégorie est sélectionnée
    submitBtn.disabled = !isFormValid(form);
};

// Gérer la soumission du formulaire d'ajout de travaux
const doSubmitForm = async (form) => {
    console.log("doSubmitForm() appelé");
    // Récupérer les données du formulaire
    const imageInput = form.querySelector("#image");
    const titleInput = form.querySelector("#title");
    const categorySelect = form.querySelector("#category");

    const formData = new FormData();
    formData.append("image", imageInput.files[0]);
    formData.append("title", titleInput.value.trim());
    formData.append("category", categorySelect.value);
    // Envoyer les données à l'API pour ajouter le travail
    const response = await submitWork(formData);
    if(response) {
        // Si l'ajout a réussi, réinitialiser le formulaire et mettre à jour les travaux affichés dans la modale
        resetForm(form);
        updateWorks();
    }
}