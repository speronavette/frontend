<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2 } from 'lucide-react';
import { TabNavigation } from '@/components/bookings/TabNavigation';
import { SearchFilters } from '@/components/bookings/SearchFilters';
import { UnifiedBookingList } from './components/UnifiedBookingList';
import { UnifiedBookingDetails } from './components/UnifiedBookingDetails';
import { useToast } from "@/components/ui/use-toast";

const Pagination = ({ totalBookings, currentPage, setCurrentPage, bookingsPerPage }) => {
  const pageCount = Math.ceil(totalBookings / bookingsPerPage);
  
  return (
    <div className="flex justify-center gap-2 mt-4">
      {Array.from({ length: pageCount }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => setCurrentPage(i + 1)}
          className={`px-3 py-1 rounded ${
            currentPage === i + 1
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default function BookingsManagement() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTab, setSelectedTab] = useState('pending');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 60;
  const { toast } = useToast();
  const [linkedBooking, setLinkedBooking] = useState(null);

  const fetchLinkedBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/bookings/linked/${bookingId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération du trajet lié');
      }

      const data = await response.json();
      if (data.success && data.data) {
        setLinkedBooking(data.data);
      }
    } catch (err) {
      console.error('Erreur fetchLinkedBooking:', err);
      setError(err.message || 'Erreur lors de la récupération du trajet lié');
    }
  };

  const handleViewDetails = async (booking) => {
    setSelectedBooking(booking);
    setIsDetailsOpen(true);
    setLinkedBooking(null);

    if (booking.bookingGroupId) {
      await fetchLinkedBooking(booking._id);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [selectedTab]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const baseUrl = 'http://localhost:5000';
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch(`${baseUrl}/api/bookings?status=${selectedTab}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) throw new Error('Erreur lors du chargement des réservations');
  
      const data = await response.json();
      
      const validBookings = Array.isArray(data.data)
        ? data.data.filter(booking => booking && booking.client)
        : [];
    
      const sortedBookings = validBookings.sort((a, b) => {
        const dateA = new Date(a.journey.type === 'outbound' ? 
          a.journey.outbound.date : a.journey.inbound.date);
        const dateB = new Date(b.journey.type === 'outbound' ? 
          b.journey.outbound.date : b.journey.inbound.date);
      
        if (dateA.getTime() === dateB.getTime()) {
          const timeA = a.journey.type === 'outbound' ? 
            a.journey.outbound.pickupTime || a.journey.outbound.time : 
            a.journey.inbound.time;
          const timeB = b.journey.type === 'outbound' ? 
            b.journey.outbound.pickupTime || b.journey.outbound.time : 
            b.journey.inbound.time;
          return timeA > timeB ? 1 : -1;
        }
      
        return dateA - dateB;
      });
      
      setBookings(sortedBookings);

    } catch (error) {
      console.error('Erreur:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const baseUrl = 'http://localhost:5000';
      const token = localStorage.getItem('adminToken');
  
      const response = await fetch(`${baseUrl}/api/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de la mise à jour du statut');
      }
  
      // Rafraîchir la liste des réservations
      await fetchBookings();
        
      toast({
        title: `Navette ${newStatus === 'completed' ? 'terminée' : 
                newStatus === 'cancelled' ? 'annulée' : 
                newStatus === 'confirmed' ? 'confirmée' : 'mise à jour'}`,
        description: "Le statut a été mis à jour avec succès",
        variant: "success",
      });
    } catch (err) {
      console.error('Erreur:', err);
      toast({
        title: "Erreur",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  const handleUpdateBooking = async (bookingId, updatedData) => {
    try {
      const baseUrl = 'http://localhost:5000';
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch(`${baseUrl}/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      });
  
      const result = await response.json();
      
      if (!response.ok) throw new Error(result.error);
  
      setBookings(prevBookings => 
        prevBookings.map(booking => 
          booking._id === bookingId ? result.data : booking
        )
      );
      
      setSelectedBooking(result.data);
      setIsDetailsOpen(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (!booking || !booking.client) return false;
    
    const searchString = searchTerm.toLowerCase();
    return (
      booking.client.firstName.toLowerCase().includes(searchString) ||
      booking.client.lastName.toLowerCase().includes(searchString) ||
      booking.client.email.toLowerCase().includes(searchString) ||
      booking.client.phone.includes(searchString) ||
      (booking.journey.outbound?.flightNumber || '').toLowerCase().includes(searchString) ||
      (booking.journey.inbound?.flightNumber || '').toLowerCase().includes(searchString)
    );
  });

  const paginate = (bookings) => {
    const startIndex = (currentPage - 1) * bookingsPerPage;
    const endIndex = startIndex + bookingsPerPage;
    return bookings.slice(startIndex, endIndex);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <TabNavigation 
          selectedTab={selectedTab} 
          onTabChange={setSelectedTab} 
        />

        <SearchFilters
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
        />

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-8 w-8 animate-spin text-spero" />
          </div>
        ) : (
          <>
            <UnifiedBookingList
              bookings={paginate(filteredBookings)}
              onViewDetails={handleViewDetails}
              onStatusChange={handleStatusChange}
              status={selectedTab}
            />
            {selectedTab === 'confirmed' && filteredBookings.length > bookingsPerPage && (
              <Pagination 
                totalBookings={filteredBookings.length}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                bookingsPerPage={bookingsPerPage}
              />
            )}
          </>
        )}
      </div>

      <Dialog 
        open={isDetailsOpen} 
        onOpenChange={(open) => {
          setIsDetailsOpen(open);
          if (!open) {
            setLinkedBooking(null);
          }
        }}
        className="max-w-4xl"
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Détails de la réservation</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <UnifiedBookingDetails
              booking={selectedBooking}
              linkedBooking={linkedBooking}
              onClose={() => {
                setIsDetailsOpen(false);
                setLinkedBooking(null);
              }}
              onUpdate={handleUpdateBooking}
              onStatusChange={handleStatusChange}
              fetchBookings={fetchBookings}
              setIsDetailsOpen={setIsDetailsOpen}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
=======
import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2 } from 'lucide-react';
import { TabNavigation } from '@/components/bookings/TabNavigation';
import { SearchFilters } from '@/components/bookings/SearchFilters';
import { UnifiedBookingList } from './components/UnifiedBookingList';
import { UnifiedBookingDetails } from './components/UnifiedBookingDetails';
import { useToast } from "@/components/ui/use-toast";

const Pagination = ({ totalBookings, currentPage, setCurrentPage, bookingsPerPage }) => {
  const pageCount = Math.ceil(totalBookings / bookingsPerPage);
  
  return (
    <div className="flex justify-center gap-2 mt-4">
      {Array.from({ length: pageCount }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => setCurrentPage(i + 1)}
          className={`px-3 py-1 rounded ${
            currentPage === i + 1
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default function BookingsManagement() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTab, setSelectedTab] = useState('pending');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 60;
  const { toast } = useToast();
  const [linkedBooking, setLinkedBooking] = useState(null);

  const fetchLinkedBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/bookings/linked/${bookingId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération du trajet lié');
      }

      const data = await response.json();
      if (data.success && data.data) {
        setLinkedBooking(data.data);
      }
    } catch (err) {
      console.error('Erreur fetchLinkedBooking:', err);
      setError(err.message || 'Erreur lors de la récupération du trajet lié');
    }
  };

  const handleViewDetails = async (booking) => {
    setSelectedBooking(booking);
    setIsDetailsOpen(true);
    setLinkedBooking(null);

    if (booking.bookingGroupId) {
      await fetchLinkedBooking(booking._id);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [selectedTab]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const baseUrl = 'http://localhost:5000';
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch(`${baseUrl}/api/bookings?status=${selectedTab}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) throw new Error('Erreur lors du chargement des réservations');
  
      const data = await response.json();
      
      const validBookings = Array.isArray(data.data)
        ? data.data.filter(booking => booking && booking.client)
        : [];
    
      const sortedBookings = validBookings.sort((a, b) => {
        const dateA = new Date(a.journey.type === 'outbound' ? 
          a.journey.outbound.date : a.journey.inbound.date);
        const dateB = new Date(b.journey.type === 'outbound' ? 
          b.journey.outbound.date : b.journey.inbound.date);
      
        if (dateA.getTime() === dateB.getTime()) {
          const timeA = a.journey.type === 'outbound' ? 
            a.journey.outbound.pickupTime || a.journey.outbound.time : 
            a.journey.inbound.time;
          const timeB = b.journey.type === 'outbound' ? 
            b.journey.outbound.pickupTime || b.journey.outbound.time : 
            b.journey.inbound.time;
          return timeA > timeB ? 1 : -1;
        }
      
        return dateA - dateB;
      });
      
      setBookings(sortedBookings);

    } catch (error) {
      console.error('Erreur:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const baseUrl = 'http://localhost:5000';
      const token = localStorage.getItem('adminToken');
  
      const response = await fetch(`${baseUrl}/api/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de la mise à jour du statut');
      }
  
      // Rafraîchir la liste des réservations
      await fetchBookings();
        
      toast({
        title: `Navette ${newStatus === 'completed' ? 'terminée' : 
                newStatus === 'cancelled' ? 'annulée' : 
                newStatus === 'confirmed' ? 'confirmée' : 'mise à jour'}`,
        description: "Le statut a été mis à jour avec succès",
        variant: "success",
      });
    } catch (err) {
      console.error('Erreur:', err);
      toast({
        title: "Erreur",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  const handleUpdateBooking = async (bookingId, updatedData) => {
    try {
      const baseUrl = 'http://localhost:5000';
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch(`${baseUrl}/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      });
  
      const result = await response.json();
      
      if (!response.ok) throw new Error(result.error);
  
      setBookings(prevBookings => 
        prevBookings.map(booking => 
          booking._id === bookingId ? result.data : booking
        )
      );
      
      setSelectedBooking(result.data);
      setIsDetailsOpen(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (!booking || !booking.client) return false;
    
    const searchString = searchTerm.toLowerCase();
    return (
      booking.client.firstName.toLowerCase().includes(searchString) ||
      booking.client.lastName.toLowerCase().includes(searchString) ||
      booking.client.email.toLowerCase().includes(searchString) ||
      booking.client.phone.includes(searchString) ||
      (booking.journey.outbound?.flightNumber || '').toLowerCase().includes(searchString) ||
      (booking.journey.inbound?.flightNumber || '').toLowerCase().includes(searchString)
    );
  });

  const paginate = (bookings) => {
    const startIndex = (currentPage - 1) * bookingsPerPage;
    const endIndex = startIndex + bookingsPerPage;
    return bookings.slice(startIndex, endIndex);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <TabNavigation 
          selectedTab={selectedTab} 
          onTabChange={setSelectedTab} 
        />

        <SearchFilters
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
        />

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-8 w-8 animate-spin text-spero" />
          </div>
        ) : (
          <>
            <UnifiedBookingList
              bookings={paginate(filteredBookings)}
              onViewDetails={handleViewDetails}
              onStatusChange={handleStatusChange}
              status={selectedTab}
            />
            {selectedTab === 'confirmed' && filteredBookings.length > bookingsPerPage && (
              <Pagination 
                totalBookings={filteredBookings.length}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                bookingsPerPage={bookingsPerPage}
              />
            )}
          </>
        )}
      </div>

      <Dialog 
        open={isDetailsOpen} 
        onOpenChange={(open) => {
          setIsDetailsOpen(open);
          if (!open) {
            setLinkedBooking(null);
          }
        }}
        className="max-w-4xl"
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Détails de la réservation</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <UnifiedBookingDetails
              booking={selectedBooking}
              linkedBooking={linkedBooking}
              onClose={() => {
                setIsDetailsOpen(false);
                setLinkedBooking(null);
              }}
              onUpdate={handleUpdateBooking}
              onStatusChange={handleStatusChange}
              fetchBookings={fetchBookings}
              setIsDetailsOpen={setIsDetailsOpen}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
>>>>>>> 9d7972c328e4c9a16471781771699d890d61465d
}