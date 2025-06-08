<<<<<<< HEAD
// src/services/api.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const driverAPI = {  // N'oubliez pas d'ouvrir l'objet driverAPI
  // Login
  async login(credentials) {
    try {
      console.log('=== DEBUG LOGIN ===');
      console.log('Tentative de connexion avec:', credentials.email);

      const response = await fetch(`${API_URL}/api/drivers/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();
      console.log('Réponse login complète:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Erreur de connexion');
      }

      if (data.token) {
        console.log('✅ Token reçu:', data.token);
        localStorage.setItem('driverToken', data.token);
        console.log('✅ Token sauvegardé dans localStorage');
      } else {
        console.log('❌ Pas de token dans la réponse');
        throw new Error('Token non reçu du serveur');
      }

      return data;
    } catch (error) {
      console.error('❌ Login error:', error);
      throw error;
    }
  },

  // Récupérer les statistiques
  async fetchStats(dateRange) {
    try {
      const token = localStorage.getItem('driverToken');
      console.log('Token utilisé:', token);

      const response = await fetch(`${API_URL}/api/drivers/stats`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Statut de la réponse:', response.status);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de la récupération des statistiques');
      }
  
      const data = await response.json();
      console.log('Data complète reçue:', data);
      return data;
    } catch (error) {
      console.error('Stats error:', error);
      throw error;
    }
  },

// Récupérer le profil
async fetchProfile() {
  try {
    const token = localStorage.getItem('driverToken');
    const response = await fetch(`${API_URL}/api/drivers/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Réponse profil:', response.status);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erreur lors de la récupération du profil');
    }

    const data = await response.json();
    console.log('Données profil reçues:', data);
    return data;
  } catch (error) {
    console.error('Erreur fetchProfile:', error);
    throw error;
  }
},

// Mettre à jour le profil
async updateProfile(profileData) {
  try {
    const token = localStorage.getItem('driverToken');
    console.log('Token récupéré du localStorage:', token);

    if (!token) {
      throw new Error('Token non trouvé - Veuillez vous reconnecter');
    }

    // Vérifier le format exact de l'en-tête Authorization
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    console.log('Headers envoyés:', headers);

    const response = await fetch(`${API_URL}/api/drivers/profile`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(profileData)
    });

    console.log('Données envoyées:', profileData);
    console.log('Statut de la réponse:', response.status);

    if (!response.ok) {
      const error = await response.json();
      console.error('Erreur détaillée:', error);
      throw new Error(error.error || 'Erreur lors de la mise à jour du profil');
    }

    const data = await response.json();
    console.log('Réponse succès:', data);
    return data;

  } catch (error) {
    console.error('Erreur complète:', error);
    throw error;
  }
},
  async fetchRides(filter = 'today') {
    try {
      const token = localStorage.getItem('driverToken');
      console.log('Fetching rides with filter:', filter);

      const response = await fetch(`${API_URL}/api/drivers/rides?date=${filter}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Rides response status:', response.status);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de la récupération des courses');
      }

      const data = await response.json();
      console.log('Rides data received:', data);
      return data;
    } catch (error) {
      console.error('Rides fetch error:', error);
      throw error;
    }
  },

  // Méthode pour compléter une course
  async completeRide(rideId, data) {
    try {
      const token = localStorage.getItem('driverToken');
      const response = await fetch(`${API_URL}/api/drivers/rides/${rideId}/complete`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de la complétion de la course');
      }

      return await response.json();
    } catch (error) {
      console.error('Complete ride error:', error);
      throw error;
    }
  },

  // Méthode pour annuler une course
  async cancelRide(rideId) {
    try {
      const token = localStorage.getItem('driverToken');
      const response = await fetch(`${API_URL}/api/drivers/rides/${rideId}/cancel`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de l\'annulation de la course');
      }

      return await response.json();
    } catch (error) {
      console.error('Cancel ride error:', error);
      throw error;
    }
  }
=======
// src/services/api.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const driverAPI = {  // N'oubliez pas d'ouvrir l'objet driverAPI
  // Login
  async login(credentials) {
    try {
      console.log('=== DEBUG LOGIN ===');
      console.log('Tentative de connexion avec:', credentials.email);

      const response = await fetch(`${API_URL}/api/drivers/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();
      console.log('Réponse login complète:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Erreur de connexion');
      }

      if (data.token) {
        console.log('✅ Token reçu:', data.token);
        localStorage.setItem('driverToken', data.token);
        console.log('✅ Token sauvegardé dans localStorage');
      } else {
        console.log('❌ Pas de token dans la réponse');
        throw new Error('Token non reçu du serveur');
      }

      return data;
    } catch (error) {
      console.error('❌ Login error:', error);
      throw error;
    }
  },

  // Récupérer les statistiques
  async fetchStats(dateRange) {
    try {
      const token = localStorage.getItem('driverToken');
      console.log('Token utilisé:', token);

      const response = await fetch(`${API_URL}/api/drivers/stats`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Statut de la réponse:', response.status);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de la récupération des statistiques');
      }
  
      const data = await response.json();
      console.log('Data complète reçue:', data);
      return data;
    } catch (error) {
      console.error('Stats error:', error);
      throw error;
    }
  },

// Récupérer le profil
async fetchProfile() {
  try {
    const token = localStorage.getItem('driverToken');
    const response = await fetch(`${API_URL}/api/drivers/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Réponse profil:', response.status);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erreur lors de la récupération du profil');
    }

    const data = await response.json();
    console.log('Données profil reçues:', data);
    return data;
  } catch (error) {
    console.error('Erreur fetchProfile:', error);
    throw error;
  }
},

// Mettre à jour le profil
async updateProfile(profileData) {
  try {
    const token = localStorage.getItem('driverToken');
    console.log('Token récupéré du localStorage:', token);

    if (!token) {
      throw new Error('Token non trouvé - Veuillez vous reconnecter');
    }

    // Vérifier le format exact de l'en-tête Authorization
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    console.log('Headers envoyés:', headers);

    const response = await fetch(`${API_URL}/api/drivers/profile`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(profileData)
    });

    console.log('Données envoyées:', profileData);
    console.log('Statut de la réponse:', response.status);

    if (!response.ok) {
      const error = await response.json();
      console.error('Erreur détaillée:', error);
      throw new Error(error.error || 'Erreur lors de la mise à jour du profil');
    }

    const data = await response.json();
    console.log('Réponse succès:', data);
    return data;

  } catch (error) {
    console.error('Erreur complète:', error);
    throw error;
  }
},
  async fetchRides(filter = 'today') {
    try {
      const token = localStorage.getItem('driverToken');
      console.log('Fetching rides with filter:', filter);

      const response = await fetch(`${API_URL}/api/drivers/rides?date=${filter}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Rides response status:', response.status);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de la récupération des courses');
      }

      const data = await response.json();
      console.log('Rides data received:', data);
      return data;
    } catch (error) {
      console.error('Rides fetch error:', error);
      throw error;
    }
  },

  // Méthode pour compléter une course
  async completeRide(rideId, data) {
    try {
      const token = localStorage.getItem('driverToken');
      const response = await fetch(`${API_URL}/api/drivers/rides/${rideId}/complete`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de la complétion de la course');
      }

      return await response.json();
    } catch (error) {
      console.error('Complete ride error:', error);
      throw error;
    }
  },

  // Méthode pour annuler une course
  async cancelRide(rideId) {
    try {
      const token = localStorage.getItem('driverToken');
      const response = await fetch(`${API_URL}/api/drivers/rides/${rideId}/cancel`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de l\'annulation de la course');
      }

      return await response.json();
    } catch (error) {
      console.error('Cancel ride error:', error);
      throw error;
    }
  }
>>>>>>> 9d7972c328e4c9a16471781771699d890d61465d
};