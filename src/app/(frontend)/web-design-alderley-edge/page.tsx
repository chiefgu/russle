import type { Metadata } from 'next';
import { LocalityPage } from '@/components/sections/LocalityPage';
import { LOCATIONS } from '@/content/locations';
import { LocalVignette } from '@/components/sections/vignettes/LocalVignette';

const data = LOCATIONS['web-design-alderley-edge'];

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  alternates: { canonical: `/${data.slug}` },
};

export default function WebDesignAlderleyEdgePage() {
  return (
    <LocalityPage
      data={data}
      vignette={<LocalVignette query={data.vignetteQuery} placeLine={data.vignettePlaceLine} variant={data.vignetteVariant} />}
    />
  );
}
