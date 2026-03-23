/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { PostDetail } from './pages/PostDetail';
import { About } from './pages/About';
import { Privacy } from './pages/Privacy';
import { Contact } from './pages/Contact';
import { AuthProvider } from './contexts/AuthContext';
import { AdminLayout } from './components/AdminLayout';
import { AdminLogin } from './pages/admin/Login';
import { AdminPosts } from './pages/admin/Posts';
import { AdminNewPost } from './pages/admin/NewPost';
import { AdminEditPost } from './pages/admin/EditPost';
import { AdminSettings } from './pages/admin/Settings';

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="post/:slug" element={<PostDetail />} />
              <Route path="about" element={<About />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="contact" element={<Contact />} />
            </Route>
            
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="posts" element={<AdminPosts />} />
              <Route path="posts/new" element={<AdminNewPost />} />
              <Route path="posts/:id/edit" element={<AdminEditPost />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}
