// src/pages/driver/settings/DriverSettings.jsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

function DriverSettings() {
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState('');
 const [success, setSuccess] = useState('');
 const [passwords, setPasswords] = useState({
   currentPassword: '',
   newPassword: '',
   confirmPassword: ''
 });

 const handleSubmit = async (e) => {
   e.preventDefault();
   setError('');
   setSuccess('');
   setLoading(true);

   if (passwords.newPassword !== passwords.confirmPassword) {
     setError('Les mots de passe ne correspondent pas');
     setLoading(false);
     return;
   }

   try {
     const response = await fetch(`${import.meta.env.VITE_API_URL}/api/drivers/change-password`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${localStorage.getItem('driverToken')}`
       },
       body: JSON.stringify({
         currentPassword: passwords.currentPassword,
         newPassword: passwords.newPassword
       })
     });

     if (!response.ok) throw new Error('Erreur lors du changement de mot de passe');
     setSuccess('Mot de passe modifié avec succès');
     setPasswords({
       currentPassword: '',
       newPassword: '',
       confirmPassword: ''
     });
   } catch (err) {
     setError(err.message);
   } finally {
     setLoading(false);
   }
 };

 return (
   <div className="p-6">
     <Card>
       <CardHeader>
         <CardTitle>Paramètres</CardTitle>
       </CardHeader>
       <CardContent>
         <div className="max-w-md">
           {error && <Alert variant="destructive" className="mb-4"><AlertDescription>{error}</AlertDescription></Alert>}
           {success && <Alert className="mb-4 bg-green-50"><AlertDescription className="text-green-800">{success}</AlertDescription></Alert>}

           <form onSubmit={handleSubmit} className="space-y-4">
             <div>
               <Label>Mot de passe actuel</Label>
               <Input 
                 type="password"
                 value={passwords.currentPassword}
                 onChange={e => setPasswords({...passwords, currentPassword: e.target.value})}
                 required
               />
             </div>

             <div>
               <Label>Nouveau mot de passe</Label>
               <Input 
                 type="password"
                 value={passwords.newPassword}
                 onChange={e => setPasswords({...passwords, newPassword: e.target.value})}
                 required
               />
             </div>

             <div>
               <Label>Confirmer le mot de passe</Label>
               <Input 
                 type="password"
                 value={passwords.confirmPassword}
                 onChange={e => setPasswords({...passwords, confirmPassword: e.target.value})}
                 required
               />
             </div>

             <Button type="submit" disabled={loading} className="w-full">
               {loading ? (
                 <>
                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                   Modification...
                 </>
               ) : (
                 'Modifier le mot de passe'
               )}
             </Button>
           </form>
         </div>
       </CardContent>
     </Card>
   </div>
 );
}

export default DriverSettings;