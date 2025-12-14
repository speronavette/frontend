import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { driverAPI } from '@/services/api';

function DriverProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [originalProfile, setOriginalProfile] = useState(null); // Pour restaurer en cas d'annulation

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await driverAPI.fetchProfile();
      if (response.success) {
        setProfile(response.data);
        setOriginalProfile(response.data);
      }
    } catch (err) {
      setError('Erreur de chargement du profil');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      
      const response = await driverAPI.updateProfile(profile);
      
      if (response.success) {
        setProfile(response.data);
        setOriginalProfile(response.data);
        setIsEditing(false);
        setSuccessMessage('Profil mis à jour avec succès');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (err) {
      setError(err.message || 'Erreur lors de la mise à jour du profil');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setProfile(originalProfile); // Restaure les valeurs originales
    setIsEditing(false);
    setError('');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Mon Profil</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {successMessage && (
            <Alert className="mb-4">
              <AlertDescription className="text-green-600">{successMessage}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Prénom</Label>
                <Input 
                  value={profile?.firstName || ''}
                  disabled={!isEditing}
                  onChange={e => setProfile({...profile, firstName: e.target.value})}
                />
              </div>
              <div>
                <Label>Nom</Label>
                <Input 
                  value={profile?.lastName || ''}
                  disabled={!isEditing}
                  onChange={e => setProfile({...profile, lastName: e.target.value})}
                />
              </div>
            </div>

            <div>
              <Label>Email</Label>
              <Input 
                type="email"
                value={profile?.email || ''}
                disabled={!isEditing}
                onChange={e => setProfile({...profile, email: e.target.value})}
              />
            </div>

            <div>
              <Label>Téléphone</Label>
              <Input 
                value={profile?.phone || ''}
                disabled={!isEditing}
                onChange={e => setProfile({...profile, phone: e.target.value})}
              />
            </div>

            <div className="pt-4 flex justify-end gap-2">
              {isEditing ? (
                <>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleCancel}
                  >
                    Annuler
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    Sauvegarder
                  </Button>
                </>
              ) : (
                <Button type="button" onClick={() => setIsEditing(true)}>
                  Modifier
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default DriverProfile;