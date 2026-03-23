import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export function AdminLayout() {
  const { user, isAdmin, loading } = useAuth();
  const unlocked = sessionStorage.getItem('admin_unlocked') === 'true';
  const [isDefaultPassword, setIsDefaultPassword] = useState(false);

  useEffect(() => {
    const checkPassword = async () => {
      try {
        const docRef = doc(db, 'settings', 'security');
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists() || !docSnap.data().adminPassword || docSnap.data().adminPassword === 'admin') {
          setIsDefaultPassword(true);
        }
      } catch (error) {
        console.error("Error checking password:", error);
      }
    };
    if (user && isAdmin && unlocked) {
      checkPassword();
    }
  }, [user, isAdmin, unlocked]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900">Loading...</div>;
  }

  if (!user || !isAdmin || !unlocked) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = async () => {
    await signOut(auth);
    sessionStorage.removeItem('admin_unlocked');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
      {isDefaultPassword && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-3 text-sm text-yellow-800 flex justify-center items-center gap-4 z-50">
          <span>보안을 위해 기본 관리자 비밀번호를 변경해 주세요.</span>
          <Link to="/admin/settings" className="font-medium underline hover:text-yellow-900">설정으로 이동</Link>
        </div>
      )}
      <header className="border-b border-gray-200 sticky top-0 bg-white/90 backdrop-blur-sm z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/admin/posts" className="text-base font-medium tracking-tight text-gray-900">
              Admin Panel
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium text-gray-500">
              <Link to="/admin/posts" className="hover:text-gray-900 transition-colors">Posts</Link>
              <Link to="/admin/settings" className="hover:text-gray-900 transition-colors">Settings</Link>
              <Link to="/" className="hover:text-gray-900 transition-colors" target="_blank">View Site</Link>
            </nav>
          </div>
          <button 
            onClick={handleLogout}
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
