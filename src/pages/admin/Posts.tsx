import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

export function AdminPosts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching posts:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deleteDoc(doc(db, 'posts', id));
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  if (loading) {
    return <div className="text-gray-500">Loading posts...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-medium tracking-tight text-gray-900">Posts</h1>
        <Link
          to="/admin/posts/new"
          className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 transition-colors"
        >
          New Post
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500">
            <tr>
              <th className="px-6 py-4 font-medium">Title</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.map(post => (
              <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900 mb-1">{post.title}</div>
                  <div className="text-xs text-gray-500">/{post.slug}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    post.status === 'published' && (!post.publishDate || post.publishDate.toDate() <= new Date()) ? 'bg-emerald-100 text-emerald-700' :
                    post.status === 'published' && post.publishDate && post.publishDate.toDate() > new Date() ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {post.status === 'published' && post.publishDate && post.publishDate.toDate() > new Date() ? 'scheduled' : post.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs">
                  {post.publishDate ? new Date(post.publishDate.toDate()).toLocaleDateString() : 'N/A'}
                </td>
                <td className="px-6 py-4 text-right space-x-4">
                  <Link to={`/admin/posts/${post.id}/edit`} className="font-medium text-indigo-600 hover:text-indigo-900 transition-colors">Edit</Link>
                  <button onClick={() => handleDelete(post.id)} className="font-medium text-red-600 hover:text-red-900 transition-colors">Delete</button>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  No posts found. Create your first post!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
