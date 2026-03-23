import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import DOMPurify from 'dompurify';
import { AdSense } from '../components/AdSense';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      try {
        const q = query(collection(db, 'posts'), where('slug', '==', slug));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          setNotFound(true);
          return;
        }

        const postData = querySnapshot.docs[0].data();
        
        // Check if published
        if (postData.status !== 'published') {
          // In a real app, we might allow admins to see drafts, but for simplicity:
          setNotFound(true);
          return;
        }

        // Check if scheduled for future
        if (postData.publishDate && postData.publishDate.toDate() > new Date()) {
          setNotFound(true);
          return;
        }

        setPost({
          ...postData,
          date: postData.publishDate 
            ? new Date(postData.publishDate.toDate()).toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' }) 
            : new Date(postData.createdAt?.toDate() || Date.now()).toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' })
        });
      } catch (error) {
        console.error("Error fetching post:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  useEffect(() => {
    if (post?.customJs) {
      const script = document.createElement('script');
      script.text = post.customJs;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [post?.customJs]);

  if (loading) {
    return <div className="max-w-3xl mx-auto px-4 py-16 text-center text-gray-500">Loading post...</div>;
  }

  if (notFound || !post) {
    return <Navigate to="/" replace />;
  }

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Helmet>
        <title>{post.seoTitle || post.title} - robo-advisor.kr</title>
        <meta name="description" content={post.seoDescription || post.description} />
        <meta property="og:title" content={post.seoTitle || post.title} />
        <meta property="og:description" content={post.seoDescription || post.description} />
        <meta property="og:image" content={post.thumbnail} />
        <link rel="canonical" href={`https://robo-advisor.kr/post/${post.slug}`} />
        {post.customCss && <style>{post.customCss}</style>}
        {post.structuredDataJsonLd && (
          <script type="application/ld+json">
            {post.structuredDataJsonLd}
          </script>
        )}
      </Helmet>

      <header className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-xs uppercase tracking-[0.2em] text-gray-500 font-medium">{post.category}</span>
          <span className="w-8 h-[1px] bg-gray-300"></span>
          <time dateTime={post.date} className="text-xs text-gray-500 font-light">{post.date}</time>
        </div>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tighter text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>
        <p className="text-lg text-gray-600 font-light leading-relaxed">
          {post.description}
        </p>
      </header>

      {post.thumbnail && (
        <div className="w-full aspect-[21/9] rounded-sm overflow-hidden mb-16 bg-gray-100 relative">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-full object-cover opacity-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 border border-black/5"></div>
        </div>
      )}

      {/* Top AdSense */}
      <AdSense slotId="post-top-ad" className="mb-12" />

      <div 
        className="prose prose-lg prose-gray mx-auto leading-relaxed max-w-none"
        dangerouslySetInnerHTML={{ 
          __html: DOMPurify.sanitize(post.content, { 
            ADD_ATTR: ['target', 'class', 'style'], 
            ADD_TAGS: ['iframe', 'style'] 
          }) 
        }}
      />

      {/* Middle AdSense (Simulated placement) */}
      <AdSense slotId="post-middle-ad" className="my-12" />

      {post.tags && post.tags.length > 0 && (
        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-wrap gap-3">
          {post.tags.map((tag: string) => (
            <span key={tag} className="text-xs font-medium tracking-widest uppercase text-gray-500 border border-gray-200 px-3 py-1.5 rounded-sm">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Bottom AdSense */}
      <AdSense slotId="post-bottom-ad" className="mt-12" />
    </article>
  );
}
