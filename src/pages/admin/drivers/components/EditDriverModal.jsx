import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Pencil } from 'lucide-react';

function EditDriverModal({ driver, onDriverUpdated }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    status: 'active',
    // Informations véhicule
    vehicleInfo: {
      brand: '',
      model: '',
      year: '',
      seats: '',
      licensePlate: ''
    },
    // Informations professionnelles
    professionalInfo: {
      licenseNumber: '',
      licenseExpiry: '',
      startDate: '',
      insuranceNumber: '',
      insuranceExpiry: ''
    }
  });

  useEffect(() => {
    if (driver) {
      setFormData({
        firstName: driver.firstName,
        lastName: driver.lastName,
        email: driver.email,
        phone: driver.phone,
        status: driver.status || 'active',
        vehicleInfo: driver.vehicleInfo || {
          brand: '',
          model: '',
          year: '',
          seats: '',
          licensePlate: ''
        },
        professionalInfo: driver.professionalInfo || {
          licenseNumber: '',
          licenseExpiry: '',
          startDate: '',
          insuranceNumber: '',
          insuranceExpiry: ''
        }
      });
    }
  }, [driver]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation du numéro de téléphone
    const phoneRegex = /^(\+32|0)[0-9]{8,9}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError('Le format du numéro de téléphone est invalide');
      setLoading(false);
      return;
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Le format de l\'email est invalide');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/drivers/${driver._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du chauffeur');
      }

      const data = await response.json();
      onDriverUpdated(data.data);
      setOpen(false);
    } catch (err) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Modifier le chauffeur</DialogTitle>
        </DialogHeader>
        
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Personnel</TabsTrigger>
            <TabsTrigger value="vehicle">Véhicule</TabsTrigger>
            <TabsTrigger value="professional">Professionnel</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {activeTab === 'personal' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Statut</Label>
                  <Select name="status" value={formData.status} onValueChange={(value) => handleChange({ target: { name: 'status', value }})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Actif</SelectItem>
                      <SelectItem value="inactive">Inactif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {activeTab === 'vehicle' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vehicleInfo.brand">Marque</Label>
                    <Input
                      id="vehicleInfo.brand"
                      name="vehicleInfo.brand"
                      value={formData.vehicleInfo.brand}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicleInfo.model">Modèle</Label>
                    <Input
                      id="vehicleInfo.model"
                      name="vehicleInfo.model"
                      value={formData.vehicleInfo.model}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vehicleInfo.year">Année</Label>
                    <Input
                      id="vehicleInfo.year"
                      name="vehicleInfo.year"
                      type="number"
                      min="2000"
                      max={new Date().getFullYear()}
                      value={formData.vehicleInfo.year}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicleInfo.seats">Nombre de places</Label>
                    <Input
                      id="vehicleInfo.seats"
                      name="vehicleInfo.seats"
                      type="number"
                      min="1"
                      max="9"
                      value={formData.vehicleInfo.seats}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicleInfo.licensePlate">Plaque d'immatriculation</Label>
                  <Input
                    id="vehicleInfo.licensePlate"
                    name="vehicleInfo.licensePlate"
                    value={formData.vehicleInfo.licensePlate}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {activeTab === 'professional' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="professionalInfo.licenseNumber">N° Permis</Label>
                    <Input
                      id="professionalInfo.licenseNumber"
                      name="professionalInfo.licenseNumber"
                      value={formData.professionalInfo.licenseNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="professionalInfo.licenseExpiry">Expiration Permis</Label>
                    <Input
                      id="professionalInfo.licenseExpiry"
                      name="professionalInfo.licenseExpiry"
                      type="date"
                      value={formData.professionalInfo.licenseExpiry}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="professionalInfo.insuranceNumber">N° Assurance</Label>
                    <Input
                      id="professionalInfo.insuranceNumber"
                      name="professionalInfo.insuranceNumber"
                      value={formData.professionalInfo.insuranceNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="professionalInfo.insuranceExpiry">Expiration Assurance</Label>
                    <Input
                      id="professionalInfo.insuranceExpiry"
                      name="professionalInfo.insuranceExpiry"
                      type="date"
                      value={formData.professionalInfo.insuranceExpiry}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="professionalInfo.startDate">Date de début</Label>
                  <Input
                    id="professionalInfo.startDate"
                    name="professionalInfo.startDate"
                    type="date"
                    value={formData.professionalInfo.startDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-2 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Annuler
              </Button>
              <Button 
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Mise à jour...
                  </>
                ) : (
                  'Mettre à jour'
                )}
              </Button>
            </div>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default EditDriverModal;