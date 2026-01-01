"use client";
import React, { useState, useEffect } from 'react';
import { CertificationData, fetchCertifications } from '@/app/utils/api';
import { useRouter } from 'next/navigation';

const Certifications = () => {
  const router = useRouter();
  const [certifications, setCertifications] = useState<CertificationData[]>([]);
  const [filteredCertifications, setFilteredCertifications] = useState<CertificationData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCertifications = async () => {
      try {
        const data = await fetchCertifications();
        setCertifications(data);
        setFilteredCertifications(data);
      } catch (error) {
        console.error('Failed to fetch certifications:', error);
      } finally {
        setLoading(false);
      }
    };

    getCertifications();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = certifications.filter(cert =>
      cert.title.toLowerCase().includes(query)
    );
    setFilteredCertifications(filtered);
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search certifications..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
        />
        <svg
          className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">
        {filteredCertifications.map((certification) => (
          <div
            key={certification.certificateCourseId}
            onClick={() => router.push(`/Certifications/${certification.slug}`)}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative group overflow-hidden"
          >
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-purple-50 rounded-full group-hover:bg-purple-100 group-hover:scale-125 transition-all duration-500"></div>

            <h3 className="text-lg font-bold text-gray-900 mb-3 relative z-10 group-hover:text-purple-700 transition-colors pr-8">
              {certification.title}
            </h3>
            <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-purple-700 border border-gray-200 group-hover:border-purple-200 group-hover:bg-purple-50 transition-colors relative z-10'>
              {certification.CertificateCourseCostPlans[0].CertificateCourseItems.length} Courses
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;