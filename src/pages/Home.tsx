import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Hero } from '../components/Hero';
import { PostCard } from '../components/PostCard';
import { db } from '../firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';

export function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(
          collection(db, 'posts'),
          where('status', '==', 'published'),
          orderBy('publishDate', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const now = new Date();
        
        const fetchedPosts = querySnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter((post: any) => {
            if (!post.publishDate) return true;
            return post.publishDate.toDate() <= now;
          })
          .map((post: any) => ({
            ...post,
            date: post.publishDate 
              ? new Date(post.publishDate.toDate()).toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' }) 
              : new Date(post.createdAt?.toDate() || Date.now()).toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' })
          }));
          
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Helmet>
        <title>robo-advisor.kr - 로보어드바이저 투자 가이드</title>
        <meta name="description" content="초보자도 쉽게 이해할 수 있는 로보어드바이저 투자 가이드와 최신 트렌드를 확인하세요." />
        <link rel="canonical" href="https://robo-advisor.kr/" />
      </Helmet>
      
      <Hero />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 border-b border-gray-200 pb-6">
          <span className="text-xs uppercase tracking-[0.2em] text-gray-500 font-medium block mb-3">Latest Updates</span>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-gray-900">최신 글</h2>
        </div>
        
        {loading ? (
          <div className="text-center text-gray-500 py-12">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-500 py-12">등록된 글이 없습니다.</div>
        ) : (
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
