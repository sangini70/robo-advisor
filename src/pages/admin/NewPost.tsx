import React from 'react';
import { PostForm } from '../../components/admin/PostForm';

export function AdminNewPost() {
  return (
    <div>
      <div className="mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-medium tracking-tight text-gray-900">New Post</h1>
      </div>
      <PostForm />
    </div>
  );
}
