

"use client";

import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import { useState, useEffect } from 'react';

import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  
 
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1">
        <AdminNavbar />
        <div className="flex items-center justify-end py-2 pr-4 bg-gray-100">
        </div>
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}