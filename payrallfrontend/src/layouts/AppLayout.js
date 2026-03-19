import React from 'react'
import Navbar from '../components/navigation/Navbar';
import Sidebar from '../components/navigation/Sidebar';
import Footer from '../components/footer/Footer';
import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top navbar (sticky) */}
      <Navbar />

      {/* Main area: sidebar + content */}
      <div className="flex flex-1 w-full">
        {/* Sidebar component handles its own responsive behavior (shows drawer on mobile / mini on desktop) */}
        <Sidebar />

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
