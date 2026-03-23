import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AdSense } from './AdSense';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="border-b border-gray-200 sticky top-0 bg-white/90 backdrop-blur-sm z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="text-base font-medium tracking-[0.2em] uppercase text-gray-900">
            robo-advisor.kr
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-light tracking-wide text-gray-600">
            <Link to="/about" className="hover:text-gray-900 transition-colors">About</Link>
            <Link to="/contact" className="hover:text-gray-900 transition-colors">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Global Top AdSense */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <AdSense slotId="global-top-ad" />
      </div>

      <main className="flex-grow w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Global Bottom AdSense */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <AdSense slotId="global-bottom-ad" />
      </div>

      <footer className="border-t border-gray-200 bg-gray-50 pt-20 pb-12 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500 font-light">
          <div className="mb-8 space-x-6">
            <Link to="/privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-gray-900 transition-colors">Contact</Link>
          </div>
          
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-sm border border-gray-200 text-xs leading-relaxed text-gray-500 mb-8 text-left shadow-sm">
            <span className="text-xs font-medium text-gray-900 tracking-widest uppercase mb-2 block">Disclaimer</span>
            본 사이트는 투자 권유를 목적으로 하지 않으며,<br/>
            투자 판단과 책임은 투자자 본인에게 있습니다.
          </div>
          
          <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} robo-advisor.kr. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
