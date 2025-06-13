
"use client";

import { useState, useEffect } from 'react';

const FooterYear: React.FC = () => {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  if (year === null) {
    // You can return a placeholder or null while waiting for client-side render
    return <>...</>; 
  }

  return <>{year}</>;
};

export default FooterYear;
