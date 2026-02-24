//api.js : gère les appels à l'API 
console.log("api.js chargé");

export const getCategories = async () => {
    try {
        const response = await fetch('http://localhost:5678/api/categories');       
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des catégories');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};  

export const getWorks = async () => {
    try {
        const works = window.sessionStorage.getItem("works");
        if (works) {
            console.log("Travaux récupérés depuis le sessionStorage");
            return JSON.parse(works);
        }
        else{
            const response = await fetch('http://localhost:5678/api/works');
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des travaux');
            }
            const data = await response.json();
            window.sessionStorage.setItem("works", JSON.stringify(data));
            console.log("Travaux récupérés depuis l'API et stockés dans le sessionStorage");
            return data;
        }
    } catch (error) {
        console.error(error);
        return [];
    }
};
