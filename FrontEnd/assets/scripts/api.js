//api.js : gère les appels à l'API 
console.log("api.js chargé");

// Récupérer les catégories depuis l'API
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

// Récupérer les travaux depuis l'API
export const getWorks = async () => {
    try {
        const response = await fetch('http://localhost:5678/api/works');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des travaux');
        }
        const data = await response.json();
        return data;      
    } catch (error) {
        console.error(error);
        return [];
    }
};

// login de l'utilisateur
export const login = async (email, password) => {
    try {
        const sendData = {
            email: email,
            password: password
        };
        const response = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)
        });
        if (!response.ok) {
            throw new Error('Erreur dans l’identifiant ou le mot de passe');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};  

// Supprimer un travail 
export const deleteWork = async (id) => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
            console.log(`Travail avec l'ID ${id} supprimé avec succès.`);
            return true;
        } else {
            console.error(`Erreur lors de la suppression du travail avec l'ID ${id}.`);
        }
    } catch (error) {
        console.error(`Erreur lors de la suppression du travail avec l'ID ${id}:`, error);
    }
    return false;
};