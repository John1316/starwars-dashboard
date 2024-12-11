import Header from '@/ui/components/layout/Header'
import Sidebar from '@/ui/components/layout/Sidebar'
import { Menu, X } from 'lucide-react';
import React, { useState } from 'react'

export default function DashboardLayout({children}: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="layout">
    <Header>
      <button 
        className="lg:hidden"
        onClick={toggleSidebar}
      >
        <div className="">
          {isSidebarOpen ? 
            <X size={24} />
            : <Menu size={24} />
          }
        </div>
      </button>
    </Header>
    
    <Sidebar isOpen={isSidebarOpen} />
    
    <main className="layout__main">
        {children}
    </main>
    
    
    {/* Overlay for mobile */}
    <div 
      className={`layout__overlay ${isSidebarOpen ? 'layout__overlay--visible' : ''}`}
      onClick={() => setIsSidebarOpen(false)}
    />
  </div>
  )
}
