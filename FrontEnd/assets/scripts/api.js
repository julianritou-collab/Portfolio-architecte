//api.js : gère les appels à l'API 


// Récupérer les catégories depuis l'API
export const getCategories = async () => {
    console.log("getCategories() appelé");
    try {
        const response = await fetch('http://localhost:5678/api/categories');       
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des catégories');
        }
        const data = await response.json();
        console.log("Catégories récupérées :", data);
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};  

// Récupérer les travaux depuis l'API
export const getWorks = async () => {
    console.log("getWorks() appelé");
    try {
        const response = await fetch('http://localhost:5678/api/works');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des travaux');
        }
        const data = await response.json();
        console.log("Travaux récupérés :", data);
        return data;      
    } catch (error) {
        console.error(error);
        return [];
    }
};

// login de l'utilisateur
export const login = async (email, password) => {
    console.log("login() appelé avec email :", email);
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
        if (response.status === 401 || response.status === 404) {
            console.error('Erreur dans l’identifiant ou le mot de passe');
            alert('Erreur dans l’identifiant ou le mot de passe');
            return null;
        }
        else if (!response.ok) {
            throw new Error("Une erreur est survenue lors de la connexion. Veuillez réessayer plus tard.");
        }
        const data = await response.json();
        console.log("Utilisateur connecté :", data);
        return data;
    } catch (error) {   
        console.error(error);     
        alert("Une erreur est survenue lors de la connexion.\n Veuillez réessayer plus tard.");
        return null;
    }
};  

// Supprimer un travail 
export const deleteWork = async (id) => {
    console.log("deleteWork() appelé avec id :", id);
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
        } else if (response.status === 401) {
            console.error(`Non autorisé à supprimer le travail avec l'ID ${id}.`);
            alert(`Non autorisé à supprimer le travail avec l'ID ${id}.`);
            return false;
        } else if (response.status === 500) {
            console.error(`Erreur innattendue lors de la suppression du travail avec l'ID ${id}.`);
            alert(`Erreur innattendue lors de la suppression du travail avec l'ID ${id}.`);
            return false;     
        }
        else {
            throw new Error(`Erreur lors de la suppression du travail avec l'ID ${id}`);
        }
    } catch (error) {
        console.error(`Erreur lors de la suppression du travail avec l'ID ${id}:`, error);
        alert(`Erreur lors de la suppression du travail avec l'ID ${id}.\n Veuillez réessayer plus tard.`);
    }
    return false;
};

// Ajouter un travail
export const submitWork = async (formData) => {
    console.log("submitWork() appelé avec formData :", formData);
    const token = localStorage.getItem("token");
    try {
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        if(response.status === 400) {
            console.error("Données invalides pour l'ajout du travail");
            alert("Données invalides pour l'ajout du travail.\n Veuillez vérifier les champs et réessayer.");
            return null;
        } else if (response.status === 401) {
            console.error("Non autorisé à ajouter le travail");
            alert("Non autorisé à ajouter le travail.\n Veuillez vous reconnecter et réessayer.");
            return null;
        } else if(response.status === 500) {
            console.error("Erreur innattendue lors de l'ajout du travail");
            alert("Erreur innattendue lors de l'ajout du travail.\n Veuillez réessayer plus tard.");
            return null;     
        } else if (!response.ok) {
            throw new Error("Une erreur est survenue lors de l'ajout du travail. Veuillez réessayer plus tard.");
        }
        const data = await response.json();
        console.log("Travail ajouté :", data);
        return data;
    } catch (error) {
        console.error(error);
        alert("Une erreur est survenue lors de l'ajout du travail.\n Veuillez réessayer plus tard.");
        return null;
    }

};
