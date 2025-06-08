<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const { sendConfirmationEmail } = require('../services/emailService');

// POST /api/bookings/split
router.post('/split', async (req, res) => {
  try {
    const { commonData, outboundData, inboundData } = req.body;
    let outboundId, inboundId;

    // Créer la réservation aller
    if (outboundData) {
      const outboundBooking = new Booking({
        ...commonData,
        journey: { outbound: outboundData.journey },
        status: 'confirmed',
        pickupTime: outboundData.pickupTime
      });
      await outboundBooking.save();
      outboundId = outboundBooking._id;
    }

    // Créer la réservation retour
    if (inboundData) {
      const inboundBooking = new Booking({
        ...commonData,
        journey: { inbound: inboundData.journey },
        status: 'confirmed'
      });
      await inboundBooking.save();
      inboundId = inboundBooking._id;
    }

    // Retourner les IDs des nouvelles réservations
    res.status(200).json({
      success: true,
      data: {
        outboundId,
        inboundId
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la séparation de la réservation",
      error: error.message
    });
  }
});

// POST /api/bookings/send-roundtrip-confirmation
router.post('/send-roundtrip-confirmation', async (req, res) => {
  try {
    const { outboundId, inboundId, email } = req.body;
    
    // Récupérer les deux réservations
    const [outbound, inbound] = await Promise.all([
      Booking.findById(outboundId),
      Booking.findById(inboundId)
    ]);

    // Envoyer l'email de confirmation
    await sendConfirmationEmail({
      to: email,
      subject: "Confirmation de votre réservation aller-retour - Spero Navette",
      outbound,
      inbound
    });

    res.status(200).json({
      success: true,
      message: "Email de confirmation envoyé"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de l'envoi de l'email de confirmation",
      error: error.message
    });
  }
});

=======
const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const { sendConfirmationEmail } = require('../services/emailService');

// POST /api/bookings/split
router.post('/split', async (req, res) => {
  try {
    const { commonData, outboundData, inboundData } = req.body;
    let outboundId, inboundId;

    // Créer la réservation aller
    if (outboundData) {
      const outboundBooking = new Booking({
        ...commonData,
        journey: { outbound: outboundData.journey },
        status: 'confirmed',
        pickupTime: outboundData.pickupTime
      });
      await outboundBooking.save();
      outboundId = outboundBooking._id;
    }

    // Créer la réservation retour
    if (inboundData) {
      const inboundBooking = new Booking({
        ...commonData,
        journey: { inbound: inboundData.journey },
        status: 'confirmed'
      });
      await inboundBooking.save();
      inboundId = inboundBooking._id;
    }

    // Retourner les IDs des nouvelles réservations
    res.status(200).json({
      success: true,
      data: {
        outboundId,
        inboundId
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la séparation de la réservation",
      error: error.message
    });
  }
});

// POST /api/bookings/send-roundtrip-confirmation
router.post('/send-roundtrip-confirmation', async (req, res) => {
  try {
    const { outboundId, inboundId, email } = req.body;
    
    // Récupérer les deux réservations
    const [outbound, inbound] = await Promise.all([
      Booking.findById(outboundId),
      Booking.findById(inboundId)
    ]);

    // Envoyer l'email de confirmation
    await sendConfirmationEmail({
      to: email,
      subject: "Confirmation de votre réservation aller-retour - Spero Navette",
      outbound,
      inbound
    });

    res.status(200).json({
      success: true,
      message: "Email de confirmation envoyé"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de l'envoi de l'email de confirmation",
      error: error.message
    });
  }
});

>>>>>>> 9d7972c328e4c9a16471781771699d890d61465d
module.exports = router;