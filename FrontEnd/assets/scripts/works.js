//works.js : gère l'affichage des travaux
console.log("works.js chargé");

export function displayWorks(works){
    let gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
    works.forEach(work => {
        console.log(work.category);
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
