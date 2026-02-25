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