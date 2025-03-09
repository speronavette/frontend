import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from 'lucide-react';

const CompleteRideDialog = ({ isOpen, onClose, onComplete, ride }) => {
  const [rating, setRating] = useState(10);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    onComplete({
      rating: Number(rating),
      comment
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Noter la course</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {/* Système de notation avec étoiles */}
          <div>
            <Label>Note</Label>
            <div className="flex justify-center gap-2 my-4">
              {[...Array(10)].map((_, index) => (
                <button
                  key={index + 1}
                  type="button"
                  onClick={() => setRating(index + 1)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-6 w-6 ${
                      index < rating 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'fill-gray-200 text-gray-200'
                    } transition-colors duration-150`}
                  />
                </button>
              ))}
            </div>
            <p className="text-center text-sm text-gray-500">{rating}/10</p>
          </div>

          {/* Champ de commentaire */}
          <div>
            <Label htmlFor="comment">Commentaire (optionnel)</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ajouter un commentaire..."
              className="mt-2"
              rows={4}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleSubmit}>Valider</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CompleteRideDialog;