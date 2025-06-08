<<<<<<< HEAD
import React from 'react';
import SEO from '../components/SEO'; // Importation du composant SEO

const TermsAndConditions = () => {
  return (
    <>
      <SEO 
        title="Conditions Générales"
        description="Consultez les conditions générales d'utilisation des services de navette aéroport Spero Navette pour vos transferts vers Bruxelles, Charleroi et Paris."
        keywords="conditions générales, CGV navette aéroport, termes et conditions transport, règlement navette aéroport, politique réservation"
      />

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-spero mb-8 text-center">Conditions générales - Spero Navette</h1>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-spero mb-4">Article 1 : Réservations et paiements</h2>
            <div className="space-y-2 text-gray-700">
              <p>1.1. Toute réservation vaut acceptation de nos conditions générales.</p>
              <p>1.2. Modalités de paiement :</p>
              <ul className="list-disc pl-8 my-2">
                <li>En espèces au chauffeur ou via Bancontact lors de la prise en charge</li>
                <li>Par virement bancaire avant la date du transfert</li>
                <li>Sur facture (uniquement pour les entreprises et indépendants)</li>
              </ul>
              <p>1.3. Les factures doivent être réglées dans les 14 jours suivant leur émission. Tout retard de paiement entraînera des frais administratifs de 10% du montant total avec un minimum de 20€, ainsi que les intérêts légaux applicables.</p>
              <p>1.4. Pour toute demande de réservation moins de 24 heures avant votre prise en charge, veuillez appeler notre bureau au +32 490 197 914.</p>
              <p>1.5. Nos prix sont doublés les 24/12, 25/12, 31/12 et 01/01.</p>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-spero mb-4">Article 2 : Annulation et modification</h2>
            <div className="space-y-2 text-gray-700">
              <p>2.1. En cas d'annulation moins de 12 heures avant la prise en charge, une indemnité de 50% du prix de la course sera facturée avec un minimum de 50€.</p>
              <p>2.2. Les modifications de réservation doivent être communiquées dès que possible. Les modifications demandées moins de 24 heures avant le départ ne peuvent être garanties.</p>
              <p>2.3. Spero Navette se réserve le droit d'annuler un service en cas de force majeure, sans compensation autre que le remboursement du montant déjà payé.</p>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-spero mb-4">Article 3 : Transport et responsabilités</h2>
            <div className="space-y-2 text-gray-700">
              <p>3.1. Le transport a lieu sous la responsabilité du client. Spero Navette mettra en œuvre tous les moyens raisonnables pour vous déposer à temps à votre destination.</p>
              <p>3.2. Spero Navette ne peut être tenu responsable des retards, modifications ou annulations dues à :</p>
              <ul className="list-disc pl-8 my-2">
                <li>Conditions météorologiques exceptionnelles</li>
                <li>Catastrophes naturelles</li>
                <li>Grèves, manifestations ou troubles civils</li>
                <li>Problèmes techniques imprévisibles</li>
                <li>Retards des vols ou modifications par les compagnies aériennes</li>
                <li>Contrôles de sécurité ou douaniers prolongés</li>
                <li>Autres circonstances imprévisibles et indépendantes de notre volonté</li>
              </ul>
              <p>3.3. La responsabilité de Spero Navette est limitée au montant couvert par notre assurance professionnelle.</p>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-spero mb-4">Article 4 : Obligations du client</h2>
            <div className="space-y-2 text-gray-700">
              <p>4.1. Le client doit fournir un numéro de téléphone portable où il est joignable en permanence le jour du service.</p>
              <p>4.2. Le client est prié de prévenir Spero Navette si les bagages ne sont pas délivrés dans l'heure suivant l'atterrissage ou si tout autre problème empêche sa présence dans le hall des arrivées dans l'heure suivant l'atterrissage.</p>
              <p>4.3. Si le client est injoignable après l'atterrissage, le chauffeur attendra au maximum 1 heure. Le montant total de la course restera dû.</p>
              <p>4.4. Si le client fournit des données incorrectes (par exemple, l'heure de départ à l'étranger plutôt que l'heure d'arrivée en Belgique), Spero Navette ne peut garantir la disponibilité d'un chauffeur.</p>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-spero mb-4">Article 5 : Conditions spécifiques</h2>
            <div className="space-y-2 text-gray-700">
              <p>5.1. Pour les retours, une combinaison avec d'autres voyageurs peut être organisée pour les vols avec moins de 45 minutes d'intervalle, afin de minimiser l'attente.</p>
              <p>5.2. Spero Navette donnera toujours priorité aux départs en cas de retards sur les retours.</p>
              <p>5.3. Les sièges auto, sièges enfants et maxi-cosi sont mis à disposition gratuitement sur demande préalable. Ils doivent être restitués dans leur état initial. Toute dégradation ou salissure entraînera des frais de remise en état d'un minimum de 50€.</p>
              <p>5.4. Les animaux voyagent uniquement dans leur cage et dans le coffre du véhicule, selon les mêmes conditions que dans un avion.</p>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-spero mb-4">Article 6 : Réclamations et litiges</h2>
            <div className="space-y-2 text-gray-700">
              <p>6.1. Toutes les plaintes ou réclamations doivent être envoyées par courrier recommandé au plus tard 7 jours après la date de la facture.</p>
              <p>6.2. Le droit belge est applicable à toutes ces conditions générales.</p>
              <p>6.3. Tout litige relatif à l'exécution ou l'interprétation de ces conditions générales sera de la compétence exclusive des tribunaux de Bruxelles.</p>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-spero mb-4">Article 7 : Protection des données</h2>
            <div className="space-y-2 text-gray-700">
              <p>7.1. Les données personnelles collectées lors de la réservation sont utilisées uniquement pour le traitement de votre réservation et la gestion de la relation client.</p>
              <p>7.2. Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles.</p>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-spero mb-4">Article 8 : Dispositions finales</h2>
            <div className="space-y-2 text-gray-700">
              <p>8.1. Les conditions générales peuvent être modifiées à tout moment par Spero Navette. La version applicable est celle en vigueur à la date de la réservation.</p>
              <p>8.2. Si l'une des clauses des présentes conditions générales s'avérait nulle, les autres clauses conserveraient leur pleine validité.</p>
            </div>
          </section>
          
          <div className="mt-10 text-center text-gray-500">
            <p>Dernière mise à jour : Mars 2025</p>
            <p>Spero Navette SRL - BE1007.320.551</p>
          </div>
        </div>
      </div>
    </>
  );
};

=======
import React from 'react';
import SEO from '../components/SEO'; // Importation du composant SEO

const TermsAndConditions = () => {
  return (
    <>
      <SEO 
        title="Conditions Générales"
        description="Consultez les conditions générales d'utilisation des services de navette aéroport Spero Navette pour vos transferts vers Bruxelles, Charleroi et Paris."
        keywords="conditions générales, CGV navette aéroport, termes et conditions transport, règlement navette aéroport, politique réservation"
      />

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-spero mb-8 text-center">Conditions générales - Spero Navette</h1>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-spero mb-4">Article 1 : Réservations et paiements</h2>
            <div className="space-y-2 text-gray-700">
              <p>1.1. Toute réservation vaut acceptation de nos conditions générales.</p>
              <p>1.2. Modalités de paiement :</p>
              <ul className="list-disc pl-8 my-2">
                <li>En espèces au chauffeur ou via Bancontact lors de la prise en charge</li>
                <li>Par virement bancaire avant la date du transfert</li>
                <li>Sur facture (uniquement pour les entreprises et indépendants)</li>
              </ul>
              <p>1.3. Les factures doivent être réglées dans les 14 jours suivant leur émission. Tout retard de paiement entraînera des frais administratifs de 10% du montant total avec un minimum de 20€, ainsi que les intérêts légaux applicables.</p>
              <p>1.4. Pour toute demande de réservation moins de 24 heures avant votre prise en charge, veuillez appeler notre bureau au +32 490 197 914.</p>
              <p>1.5. Nos prix sont doublés les 24/12, 25/12, 31/12 et 01/01.</p>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-spero mb-4">Article 2 : Annulation et modification</h2>
            <div className="space-y-2 text-gray-700">
              <p>2.1. En cas d'annulation moins de 12 heures avant la prise en charge, une indemnité de 50% du prix de la course sera facturée avec un minimum de 50€.</p>
              <p>2.2. Les modifications de réservation doivent être communiquées dès que possible. Les modifications demandées moins de 24 heures avant le départ ne peuvent être garanties.</p>
              <p>2.3. Spero Navette se réserve le droit d'annuler un service en cas de force majeure, sans compensation autre que le remboursement du montant déjà payé.</p>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-spero mb-4">Article 3 : Transport et responsabilités</h2>
            <div className="space-y-2 text-gray-700">
              <p>3.1. Le transport a lieu sous la responsabilité du client. Spero Navette mettra en œuvre tous les moyens raisonnables pour vous déposer à temps à votre destination.</p>
              <p>3.2. Spero Navette ne peut être tenu responsable des retards, modifications ou annulations dues à :</p>
              <ul className="list-disc pl-8 my-2">
                <li>Conditions météorologiques exceptionnelles</li>
                <li>Catastrophes naturelles</li>
                <li>Grèves, manifestations ou troubles civils</li>
                <li>Problèmes techniques imprévisibles</li>
                <li>Retards des vols ou modifications par les compagnies aériennes</li>
                <li>Contrôles de sécurité ou douaniers prolongés</li>
                <li>Autres circonstances imprévisibles et indépendantes de notre volonté</li>
              </ul>
              <p>3.3. La responsabilité de Spero Navette est limitée au montant couvert par notre assurance professionnelle.</p>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-spero mb-4">Article 4 : Obligations du client</h2>
            <div className="space-y-2 text-gray-700">
              <p>4.1. Le client doit fournir un numéro de téléphone portable où il est joignable en permanence le jour du service.</p>
              <p>4.2. Le client est prié de prévenir Spero Navette si les bagages ne sont pas délivrés dans l'heure suivant l'atterrissage ou si tout autre problème empêche sa présence dans le hall des arrivées dans l'heure suivant l'atterrissage.</p>
              <p>4.3. Si le client est injoignable après l'atterrissage, le chauffeur attendra au maximum 1 heure. Le montant total de la course restera dû.</p>
              <p>4.4. Si le client fournit des données incorrectes (par exemple, l'heure de départ à l'étranger plutôt que l'heure d'arrivée en Belgique), Spero Navette ne peut garantir la disponibilité d'un chauffeur.</p>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-spero mb-4">Article 5 : Conditions spécifiques</h2>
            <div className="space-y-2 text-gray-700">
              <p>5.1. Pour les retours, une combinaison avec d'autres voyageurs peut être organisée pour les vols avec moins de 45 minutes d'intervalle, afin de minimiser l'attente.</p>
              <p>5.2. Spero Navette donnera toujours priorité aux départs en cas de retards sur les retours.</p>
              <p>5.3. Les sièges auto, sièges enfants et maxi-cosi sont mis à disposition gratuitement sur demande préalable. Ils doivent être restitués dans leur état initial. Toute dégradation ou salissure entraînera des frais de remise en état d'un minimum de 50€.</p>
              <p>5.4. Les animaux voyagent uniquement dans leur cage et dans le coffre du véhicule, selon les mêmes conditions que dans un avion.</p>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-spero mb-4">Article 6 : Réclamations et litiges</h2>
            <div className="space-y-2 text-gray-700">
              <p>6.1. Toutes les plaintes ou réclamations doivent être envoyées par courrier recommandé au plus tard 7 jours après la date de la facture.</p>
              <p>6.2. Le droit belge est applicable à toutes ces conditions générales.</p>
              <p>6.3. Tout litige relatif à l'exécution ou l'interprétation de ces conditions générales sera de la compétence exclusive des tribunaux de Bruxelles.</p>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-spero mb-4">Article 7 : Protection des données</h2>
            <div className="space-y-2 text-gray-700">
              <p>7.1. Les données personnelles collectées lors de la réservation sont utilisées uniquement pour le traitement de votre réservation et la gestion de la relation client.</p>
              <p>7.2. Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles.</p>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-spero mb-4">Article 8 : Dispositions finales</h2>
            <div className="space-y-2 text-gray-700">
              <p>8.1. Les conditions générales peuvent être modifiées à tout moment par Spero Navette. La version applicable est celle en vigueur à la date de la réservation.</p>
              <p>8.2. Si l'une des clauses des présentes conditions générales s'avérait nulle, les autres clauses conserveraient leur pleine validité.</p>
            </div>
          </section>
          
          <div className="mt-10 text-center text-gray-500">
            <p>Dernière mise à jour : Mars 2025</p>
            <p>Spero Navette SRL - BE1007.320.551</p>
          </div>
        </div>
      </div>
    </>
  );
};

>>>>>>> 9d7972c328e4c9a16471781771699d890d61465d
export default TermsAndConditions;