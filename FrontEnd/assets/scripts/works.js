//works.js : gère l'affichage des travaux
console.log("works.js chargé");

export function displayWorks(works){
    let gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
    works.forEach(work => {
        let figure = document.createElement('figure');
        let img = document.createElement('img');
        img.src = work.imageUrl;
        img.alt = work.title;
        let figcaption = document.createElement('figcaption');
        figcaption.textContent = work.title;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
};

export function displayCategories(categories){
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
