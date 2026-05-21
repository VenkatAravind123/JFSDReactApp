import React from 'react';
import '../styles/NewsSection.css';

export default function NewsSection() {
  const newsItems = [
    {
      id: 1,
      title: 'Digital Governance Initiative Launch',
      excerpt: 'New administrative portal launched to speed up public grievance redressal across the state.',
      badge: 'Governance',
      badgeClass: 'badge-gov',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9dnDBdyujLsGjAznG0wtx-KWqr21IYqhGaF76T22LEUu8BAhy6IgKdPdiHKghhcKNDZcdzxAQrZqLHPfwByhSRru2Pu68DjCwbVvQJQzpw07DTXU2VOjlO25kcPSTdwlZFFcQwxA7ke5Alh9H_8baODva_lnNdcXZIy7XhUIDCFPT6RddLI_zace8FoI-0S6j0E1cge-2W20DUCJDElIY3uNdh4Zhquu6GoFIzHEQPeOi1vdNIfpyX0DImsr8bDJ70UASszRWYQ'
    },
    {
      id: 2,
      title: 'Upcoming Town Hall Meetings',
      excerpt: 'Join our weekly interactive sessions to discuss infrastructure plans for the upcoming quarter.',
      badge: 'Community',
      badgeClass: 'badge-comm',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7VsEeXhBRubUVX9K8RzwqYN0mDVrPHK5yx3O-AauNGzk88bVRBDpVCYeNK0XJwLRiiOLtjGCI6Q-8541vhgXiJ6VcvHYKavx_INUNY4BWF8C37EUCAf8USSczg-MO55IjJBt8PtYXCFMDU_Kci55aP7kZsSpP3xTUQ5Uya2s2olXKSrkB7JPATso5IFh2mKX8YTAKC0wEC1bSS-xHhnGHB_al7Z8sNPd518InMK7_y_spcjUvR-UAcn6naJUpv40QMldktalByw'
    },
    {
      id: 3,
      title: 'Quarterly Transparency Report',
      excerpt: 'Detailed report on issue resolution rates and funding allocation for local initiatives published.',
      badge: 'Stats',
      badgeClass: 'badge-stats',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAF4Q0jZ-z79YZwXfdEb4YIkdsjE4JY-5_vtRcvnCUeFs7nGH-5abhpNHxhKJ0UTIzOVThsjnlH9qW6c0Jc7rLSy0q3erf-fZM-bcf5Oa0oljNumTfqWHH65sg5IlvlSy7d3YO49myufgmm4TBC-4QO4HxN5l1Kay4Ig9Ee2szsX3pX4XOHT4GIEwTTpiMHkJ6OeNuxd7blzkVdrCeHWwXVPenH_iwFeJvdBWYi_J__SauEi9pGjDFLv1SjdHWpxDtIJclYFa3o6w'
    }
  ];

  return (
    <section className="container news-section">
      <div className="news-header">
        <div>
          <h2 className="section-title">Latest News</h2>
          <p className="section-subtitle">Stay updated with the latest civic developments.</p>
        </div>
        <a className="view-all-link" href="#more-news">View All Updates</a>
      </div>
      <div className="news-grid">
        {newsItems.map((item) => (
          <div key={item.id} className="news-item">
            <div className="news-img-wrapper">
              <img src={item.image} alt={item.title} />
            </div>
            <span className={`news-badge ${item.badgeClass}`}>{item.badge}</span>
            <h3 className="news-title">{item.title}</h3>
            <p className="news-excerpt">{item.excerpt}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
