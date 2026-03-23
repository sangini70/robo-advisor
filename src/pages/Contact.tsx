import React from 'react';
import { Helmet } from 'react-helmet-async';

export function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Helmet>
        <title>문의하기 - robo-advisor.kr</title>
        <meta name="description" content="robo-advisor.kr 문의하기 페이지입니다." />
      </Helmet>
      <h1 className="text-4xl font-medium tracking-tighter text-gray-900 mb-10">문의하기</h1>
      <div className="prose prose-lg prose-gray font-light mb-12">
        <p>
          궁금한 점이 있으시거나 제안하실 내용이 있다면 언제든지 아래 이메일로 연락 주시기 바랍니다.
        </p>
        <p>
          <strong>이메일:</strong> <a href="mailto:contact@robo-advisor.kr" className="text-gray-900 hover:text-gray-600 transition-colors">contact@robo-advisor.kr</a>
        </p>
      </div>
    </div>
  );
}
