'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';

// Sanity Studio, embedded and served at yourdomain.com/studio
export default function StudioPage() {
  return <NextStudio config={config} />;
}
