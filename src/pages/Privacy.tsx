import React from 'react';
import { Helmet } from 'react-helmet-async';

export function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Helmet>
        <title>개인정보처리방침 - robo-advisor.kr</title>
        <meta name="description" content="robo-advisor.kr 개인정보처리방침" />
      </Helmet>
      <h1 className="text-4xl font-medium tracking-tighter text-gray-900 mb-10">개인정보처리방침</h1>
      <div className="prose prose-lg prose-gray font-light">
        <p>
          <strong>robo-advisor.kr</strong>(이하 '본 사이트')은(는) 이용자의 개인정보를 중요시하며, 정보통신망 이용촉진 및 정보보호에 관한 법률 등 관련 법령을 준수하고 있습니다.
        </p>
        <h2>1. 수집하는 개인정보 항목</h2>
        <p>본 사이트는 별도의 회원가입 없이 콘텐츠를 이용할 수 있으며, 이 과정에서 어떠한 개인정보도 수집하지 않습니다.</p>
        
        <h2>2. 쿠키(Cookie)의 운용</h2>
        <p>본 사이트는 Google AdSense 등 제휴 광고 네트워크를 통해 광고를 게재하며, 이 과정에서 제3자가 쿠키를 사용하여 이용자의 관심사에 기반한 광고를 제공할 수 있습니다.</p>
        
        <h2>3. 개인정보 보호책임자</h2>
        <p>본 사이트는 개인정보를 수집하지 않으므로 별도의 개인정보 보호책임자를 지정하지 않습니다. 기타 문의사항은 Contact 페이지를 통해 문의해 주시기 바랍니다.</p>
      </div>
    </div>
  );
}
