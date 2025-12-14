import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const AddDriverModal = ({ isOpen, onClose, onDriverAdded }) => {
 const [loading, setLoading] = useState(false);
 const { toast } = useToast();
 const [formData, setFormData] = useState({
   firstName: '',
   lastName: '',
   email: '',
   phone: '',
   password: ''
 });

 const handleSubmit = async (e) => {
   e.preventDefault();
   setLoading(true);
   
   try {
     const token = localStorage.getItem('adminToken');
     console.log('Token avant envoi:', token);

     const response = await fetch(`${import.meta.env.VITE_API_URL}/api/drivers`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`
       },
       body: JSON.stringify(formData),
       credentials: 'include'
     });

     if (!response.ok) {
       const error = await response.json();
       throw new Error(error.error || 'Erreur lors de la création du chauffeur');
     }

     const data = await response.json();
     onDriverAdded(data.data);
     onClose();
     
     toast({
       title: "Succès",
       description: "Chauffeur créé avec succès",
       variant: "success"
     });

     setFormData({
       firstName: '',
       lastName: '',
       email: '',
       phone: '',
       password: ''
     });
   } catch (error) {
     console.error('Erreur complète:', error);
     toast({
       title: "Erreur",
       description: error.message,
       variant: "destructive"
     });
   } finally {
     setLoading(false);
   }
 };

 return (
   <Dialog open={isOpen} onOpenChange={onClose}>
     <DialogContent>
       <DialogHeader>
         <DialogTitle>Ajouter un chauffeur</DialogTitle>
       </DialogHeader>
       
       <form onSubmit={handleSubmit} className="space-y-4">
         <div className="grid grid-cols-2 gap-4">
           <div>
             <Label htmlFor="firstName">Prénom</Label>
             <Input
               id="firstName"
               name="firstName"
               value={formData.firstName}
               onChange={(e) => setFormData(prev => ({...prev, firstName: e.target.value}))}
               required
             />
           </div>
           <div>
             <Label htmlFor="lastName">Nom</Label>
             <Input
               id="lastName"
               name="lastName"
               value={formData.lastName}
               onChange={(e) => setFormData(prev => ({...prev, lastName: e.target.value}))}
               required
             />
           </div>
         </div>

         <div>
           <Label htmlFor="phone">Téléphone</Label>
           <Input
             id="phone"
             name="phone"
             type="tel"
             value={formData.phone}
             onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
             required
           />
         </div>

         <div>
           <Label htmlFor="email">Email</Label>
           <Input
             id="email"
             name="email"
             type="email"
             value={formData.email}
             onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
             required
           />
         </div>

         <div>
           <Label htmlFor="password">Mot de passe</Label>
           <Input
             id="password"
             name="password"
             type="password"
             value={formData.password}
             onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
             required
           />
         </div>

         <DialogFooter>
           <Button variant="outline" onClick={onClose}>Annuler</Button>
           <Button type="submit" disabled={loading}>
             {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
             Ajouter
           </Button>
         </DialogFooter>
       </form>
     </DialogContent>
   </Dialog>
 );
};

export default AddDriverModal;