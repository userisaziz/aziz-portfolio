import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  author?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  twitterCard?: 'summary' | 'summary_large_image';
  noIndex?: boolean;
  canonicalUrl?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Abdul Aziz Portfolio',
  description = 'Abdul Aziz - Frontend Developer & Designer from Bangalore crafting exceptional digital experiences with React, TypeScript, and cutting-edge web technologies.',
  keywords = ['Frontend Developer', 'React', 'TypeScript', 'Web Developer', 'UI/UX', 'Bangalore', 'Portfolio'],
  author = 'Abdul Aziz',
  image = '/placeholder.svg',
  url = '',
  type = 'website',
  twitterCard = 'summary_large_image',
  noIndex = false,
  canonicalUrl
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, property?: string) => {
      const selector = property ? `meta[property=\"${property}\"]` : `meta[name=\"${name}\"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', property);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords.join(', '));
    updateMetaTag('author', author);
    
    if (noIndex) {
      updateMetaTag('robots', 'noindex, nofollow');
    } else {
      updateMetaTag('robots', 'index, follow');
    }

    // Open Graph tags
    updateMetaTag('', title, 'og:title');
    updateMetaTag('', description, 'og:description');
    updateMetaTag('', type, 'og:type');
    updateMetaTag('', `${window.location.origin}${image}`, 'og:image');
    updateMetaTag('', `${window.location.origin}${url}`, 'og:url');
    updateMetaTag('', 'Abdul Aziz Portfolio', 'og:site_name');

    // Twitter Card tags
    updateMetaTag('twitter:card', twitterCard);
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', `${window.location.origin}${image}`);
    updateMetaTag('twitter:site', '@abdul_aziz');
    updateMetaTag('twitter:creator', '@abdul_aziz');

    // Canonical URL
    let canonical = document.querySelector('link[rel=\"canonical\"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl || `${window.location.origin}${url}`);

    // Structured data for portfolio
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Abdul Aziz',
      jobTitle: 'Frontend Developer',
      description: description,
      url: `${window.location.origin}${url}`,
      image: `${window.location.origin}${image}`,
      sameAs: [
        // Add your social media profiles here
        'https://github.com/yourusername',
        'https://linkedin.com/in/yourusername',
        'https://twitter.com/yourusername'
      ],
      worksFor: {
        '@type': 'Organization',
        name: 'Freelance'
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bangalore',
        addressCountry: 'India'
      },
      knowsAbout: keywords
    };

    // Add structured data script
    let structuredDataScript = document.querySelector('#structured-data');
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.id = 'structured-data';
      structuredDataScript.type = 'application/ld+json';
      document.head.appendChild(structuredDataScript);
    }
    structuredDataScript.textContent = JSON.stringify(structuredData);

  }, [title, description, keywords, author, image, url, type, twitterCard, noIndex, canonicalUrl]);

  return null;
};

export default SEO;