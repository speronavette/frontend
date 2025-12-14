// src/layouts/DriverLayout.jsx
import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  LogOut,
  Menu,
  X,
  User,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const menuItems = [
  {
    path: '/driver/dashboard',
    label: 'Tableau de bord',
    icon: LayoutDashboard
  },
  {
    path: '/driver/rides',
    label: 'Mes courses',
    icon: CalendarDays
  },
  {
    path: '/driver/profile',
    label: 'Mon profil',
    icon: User
  },
  {
    path: '/driver/settings',
    label: 'Paramètres',
    icon: Settings
  }
];

function DriverLayout() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('driverToken');
    navigate('/driver/login');
  };

  const NavItem = ({ path, label, icon: Icon }) => (
    <NavLink
      to={path}
      className={({ isActive }) => `
        flex items-center px-4 py-2 rounded-md transition-colors
        ${isActive
          ? 'bg-spero text-white'
          : 'hover:bg-gray-100'
        }
      `}
    >
      <Icon className="h-5 w-5 mr-3" />
      {label}
    </NavLink>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header mobile */}
      <div className="lg:hidden bg-white border-b px-4 py-3 flex justify-between items-center">
        <h1 className="font-bold text-lg text-spero">Spero Driver</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          ${isMobileMenuOpen ? 'block' : 'hidden'}
          lg:block
          fixed lg:static
          inset-0 lg:inset-auto
          z-40 lg:z-0
          w-64
          bg-white
          border-r
          h-full
          overflow-y-auto
        `}>
          <div className="p-4">
            {/* Logo - visible uniquement sur desktop */}
            <div className="hidden lg:block mb-6">
              <h1 className="font-bold text-xl text-spero">Spero Driver</h1>
            </div>

            {/* Navigation */}
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <NavItem key={item.path} {...item} />
              ))}
            </nav>

            {/* Bouton déconnexion */}
            <div className="mt-6 pt-6 border-t">
              <Button
                variant="outline"
                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 mr-3" />
                Déconnexion
              </Button>
            </div>
          </div>
        </aside>

        {/* Contenu principal */}
        <main className="flex-1 lg:ml-64">
          <div className="container">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DriverLayout;