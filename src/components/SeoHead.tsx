import React, { useEffect } from 'react';
import { useSalon } from '../context/SalonContext';

interface SeoHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  schemaType?: 'HairSalon' | 'Service' | 'BreadcrumbList';
  serviceData?: {
    name: string;
    description: string;
  };
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description,
  canonicalPath = '',
  serviceData
}) => {
  const { config } = useSalon();

  useEffect(() => {
    // 1. Update document title
    document.title = title;

    // 2. Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Update OG Title & Description
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    // 4. Update Canonical Link
    const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${canonicalPath}` : '';
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', fullUrl);

    // 5. Inject / Update Schema.org JSON-LD
    const schemaId = 'aos-structured-data';
    let scriptTag = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = schemaId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'HairSalon',
      '@id': `${fullUrl}#salon`,
      name: 'ART OF SCISSOR Unisex Salon',
      alternateName: 'ART OF SCISSOR',
      description: description,
      telephone: config.primaryPhone,
      email: config.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Ground Floor, Plot No. 7, Street No. 7, near Rani Public School, A-2 Block, Virendar Nagar, Block B, West Sant Nagar',
        addressLocality: 'Burari',
        addressRegion: 'Delhi',
        postalCode: '110084',
        addressCountry: 'IN'
      },
      areaServed: config.primaryArea.map((area) => ({
        '@type': 'AdministrativeArea',
        name: area
      })),
      priceRange: '₹₹',
      ...(serviceData && {
        makesOffer: {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: serviceData.name,
            description: serviceData.description
          }
        }
      })
    };

    scriptTag.textContent = JSON.stringify(jsonLd);
  }, [title, description, canonicalPath, config, serviceData]);

  return null;
};
