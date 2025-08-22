import { useEffect } from 'react';
import { useSiteConfig } from '@/hooks/useApi';

const SEOHead = () => {
  const { siteConfig, loading, error } = useSiteConfig();

  useEffect(() => {
    if (loading || error || !siteConfig) return;

    // Update document title
    document.title = siteConfig.site_title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', siteConfig.meta_description);
    updateMetaTag('keywords', siteConfig.meta_keywords);

    // Open Graph meta tags
    updateMetaTag('og:title', siteConfig.og_title, true);
    updateMetaTag('og:description', siteConfig.og_description, true);
    updateMetaTag('og:type', siteConfig.og_type, true);
    
    if (siteConfig.og_url) {
      updateMetaTag('og:url', siteConfig.og_url, true);
    }

    // Twitter Card meta tags
    updateMetaTag('twitter:card', siteConfig.twitter_card);
    updateMetaTag('twitter:title', siteConfig.twitter_title);
    updateMetaTag('twitter:description', siteConfig.twitter_description);

    // Handle images (base64 or URL)
    if (siteConfig.og_image_data?.data) {
      updateMetaTag('og:image', siteConfig.og_image_data.data, true);
    } else if (siteConfig.og_image_file) {
      updateMetaTag('og:image', `${import.meta.env.VITE_API_BASE_URL || 'http://192.168.10.192:8000'}${siteConfig.og_image_file}`, true);
    }

    if (siteConfig.twitter_image_data?.data) {
      updateMetaTag('twitter:image', siteConfig.twitter_image_data.data);
    } else if (siteConfig.twitter_image_file) {
      updateMetaTag('twitter:image', `${import.meta.env.VITE_API_BASE_URL || 'http://192.168.10.192:8000'}${siteConfig.twitter_image_file}`);
    }

    // Handle favicon
    const updateFavicon = () => {
      // Remove existing favicon
      const existingFavicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
      if (existingFavicon) {
        existingFavicon.remove();
      }

      // Add new favicon
      const favicon = document.createElement('link');
      favicon.rel = 'icon';
      
      if (siteConfig.favicon_data?.data) {
        favicon.href = siteConfig.favicon_data.data;
        favicon.type = siteConfig.favicon_data.mime_type;
      } else if (siteConfig.favicon_file) {
        favicon.href = `${import.meta.env.VITE_API_BASE_URL || 'http://192.168.10.192:8000'}${siteConfig.favicon_file}`;
      }
      
      document.head.appendChild(favicon);
    };

    if (siteConfig.favicon_data?.data || siteConfig.favicon_file) {
      updateFavicon();
    }

  }, [siteConfig, loading, error]);

  return null; // This component doesn't render anything
};

export default SEOHead;