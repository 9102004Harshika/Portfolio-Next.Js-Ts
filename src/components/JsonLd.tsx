import React from "react";

const JsonLd: React.FC = () => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Harshika Gawade",
    "url": "https://harshikagawade.netlify.app",
    "image": "https://harshikagawade.netlify.app/assets/harshika_themed.png",
    "sameAs": [
      "https://github.com/9102004Harshika",
      "https://www.linkedin.com/in/harshikagawade/",
      "https://twitter.com/harshikagawade"
    ],
    "jobTitle": "Full-Stack Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "description": "Harshika Gawade is a Full-Stack Developer and Creative Technologist specializing in building high-performance applications."
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Harshika Gawade Portfolio",
    "url": "https://harshikagawade.netlify.app",
    "description": "Professional portfolio of Harshika Gawade, a Full-Stack Developer.",
    "publisher": {
      "@type": "Person",
      "name": "Harshika Gawade"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
};

export default JsonLd;
