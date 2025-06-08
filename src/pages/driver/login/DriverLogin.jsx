<<<<<<< HEAD
// src/pages/driver/login/DriverLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

// Imports inchangés...

function DriverLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');  // Reset error on new attempt
    setLoading(true);
 
    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${baseUrl}/api/drivers/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });
 
      const data = await response.json();
 
      if (!response.ok) {
        throw new Error(data.error || 'Email ou mot de passe incorrect');
      }
 
      if (data.token) {
        localStorage.setItem('driverToken', data.token);
        // Stocker aussi les infos du chauffeur si nécessaire
        if (data.driver) {
          localStorage.setItem('driverInfo', JSON.stringify(data.driver));
        }
        navigate('/driver/dashboard');
      } else {
        throw new Error('Erreur d\'authentification');
      }
 
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold text-spero">
            Espace Chauffeur
          </CardTitle>
          <p className="text-sm text-gray-600">
            Connectez-vous à votre compte chauffeur
          </p>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Adresse email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="nom@exemple.com"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-spero hover:bg-spero/90"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Connexion en cours...
                </div>
              ) : (
                'Se connecter'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

=======
// src/pages/driver/login/DriverLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

// Imports inchangés...

function DriverLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');  // Reset error on new attempt
    setLoading(true);
 
    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${baseUrl}/api/drivers/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });
 
      const data = await response.json();
 
      if (!response.ok) {
        throw new Error(data.error || 'Email ou mot de passe incorrect');
      }
 
      if (data.token) {
        localStorage.setItem('driverToken', data.token);
        // Stocker aussi les infos du chauffeur si nécessaire
        if (data.driver) {
          localStorage.setItem('driverInfo', JSON.stringify(data.driver));
        }
        navigate('/driver/dashboard');
      } else {
        throw new Error('Erreur d\'authentification');
      }
 
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold text-spero">
            Espace Chauffeur
          </CardTitle>
          <p className="text-sm text-gray-600">
            Connectez-vous à votre compte chauffeur
          </p>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Adresse email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="nom@exemple.com"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-spero hover:bg-spero/90"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Connexion en cours...
                </div>
              ) : (
                'Se connecter'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

>>>>>>> 9d7972c328e4c9a16471781771699d890d61465d
export default DriverLogin;