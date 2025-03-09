import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

function AdminLogin() {
 const navigate = useNavigate();
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState('');
 const [formData, setFormData] = useState({
   email: '',
   password: ''
 });

 const handleChange = (e) => {
   setFormData(prev => ({
     ...prev,
     [e.target.name]: e.target.value
   }));
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Login attempt with:", formData);
  setLoading(true);
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/drivers/login/admin`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    console.log("Server response:", data);
    localStorage.setItem('adminToken', data.token);
    console.log("Stored token:", localStorage.getItem('adminToken'));
    navigate('/admin/dashboard');
  } catch (error) {
    console.error('Login error:', error);
    setError(error.message || 'Erreur de connexion');
  }
  setLoading(false);
};

 return (
   <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
     <div className="max-w-md w-full space-y-8">
       <div>
         <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
           Administration Spero
         </h2>
         <p className="mt-2 text-center text-sm text-gray-600">
           Accès réservé aux administrateurs
         </p>
       </div>

       {error && (
         <Alert variant="destructive">
           <AlertDescription>{error}</AlertDescription>
         </Alert>
       )}

       <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
         <div className="rounded-md shadow-sm space-y-4">
           <div>
             <Label htmlFor="email">Email</Label>
             <Input
               id="email"
               name="email"
               type="email"
               autoComplete="email"
               value={formData.email}
               onChange={handleChange}
               className="mt-1"
               required
             />
           </div>
           <div>
             <Label htmlFor="password">Mot de passe</Label>
             <Input
               id="password"
               name="password"
               type="password"
               autoComplete="current-password"
               value={formData.password}
               onChange={handleChange}
               className="mt-1"
               required
             />
           </div>
         </div>

         <Button
           type="submit"
           className="w-full bg-spero hover:bg-spero/90"
           disabled={loading}
         >
           {loading ? (
             <>
               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
               Connexion en cours...
             </>
           ) : (
             'Se connecter'
           )}
         </Button>
       </form>

       <div className="text-center text-sm">
         <p className="text-gray-600">
           Identifiants de développement :
         </p>
         <p className="text-gray-500">
           Email: admin@spero-navette.be
         </p>
         <p className="text-gray-500">
           Mot de passe: admin123
         </p>
       </div>
     </div>
   </div>
 );
}

export default AdminLogin;