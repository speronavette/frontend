// src/utils/bookingValidation.js

// Validation des horaires de réservation
export const validateBookingTime = (date, time, flightTime = null) => {
    // Conversion en Date
    const bookingDateTime = new Date(`${date}T${time}`);
    const now = new Date();
  
    // Ajout de 2 heures au temps actuel pour le délai minimum
    const minTime = new Date(now.getTime() + (2 * 60 * 60 * 1000));
  
    // Vérification que la réservation est dans le futur
    if (bookingDateTime <= now) {
      return {
        valid: false,
        message: 'La date de réservation doit être dans le futur'
      };
    }
  
    // Vérification du délai minimum de 2 heures
    if (bookingDateTime <= minTime) {
      return {
        valid: false,
        message: 'La réservation doit être faite au moins 2 heures à l\'avance'
      };
    }
  
    // Pour les retours avec numéro de vol
    if (flightTime) {
      const flightDateTime = new Date(`${date}T${flightTime}`);
      
      // Vérifier que le pickup est après l'arrivée du vol
      if (bookingDateTime <= flightDateTime) {
        return {
          valid: false,
          message: 'L\'heure de prise en charge doit être après l\'arrivée du vol'
        };
      }
    }
  
    return { valid: true };
  };
  
  // Vérification de la disponibilité
  export const checkAvailability = async (date, time, serviceType) => {
    // Simuler une vérification de disponibilité
    // À remplacer par un appel API réel
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulation : disponible 95% du temps
        const isAvailable = Math.random() > 0.05;
        resolve({
          available: isAvailable,
          message: isAvailable ? 'Disponible' : 'Désolé, ce créneau n\'est plus disponible'
        });
      }, 500);
    });
  };
  
  // Validation des dates de retour
  export const validateReturnDate = (departureDate, returnDate) => {
    const departure = new Date(departureDate);
    const return_ = new Date(returnDate);
  
    if (return_ <= departure) {
      return {
        valid: false,
        message: 'La date de retour doit être après la date de départ'
      };
    }
  
    return { valid: true };
  };
  
  // Validation du numéro de téléphone
  export const validatePhone = (phone) => {
    // Format belge : +32 XXX XX XX XX ou 0XXX XX XX XX
    const phoneRegex = /^(?:\+32|0)\s?\d{1,3}\s?\d{2}\s?\d{2}\s?\d{2}$/;
    return phoneRegex.test(phone);
  };
  
  // Validation de l'email
  export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Validation du numéro de TVA
  export const validateVAT = (vatNumber) => {
    // Format BE0XXX.XXX.XXX ou BE 0XXX.XXX.XXX
    const vatRegex = /^BE\s?0\d{3}\.\d{3}\.\d{3}$/;
    return vatRegex.test(vatNumber);
  };