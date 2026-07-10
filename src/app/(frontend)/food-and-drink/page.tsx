import type { Metadata } from 'next';
import { IndustryPage } from '@/components/sections/IndustryPage';
import { INDUSTRIES } from '@/content/industries';
import { FoodDrinkVignette } from '@/components/sections/vignettes/FoodDrinkVignette';

const data = INDUSTRIES['food-and-drink'];

export const metadata: Metadata = { title: data.metaTitle, description: data.metaDescription };

export default function FoodAndDrinkPage() {
  return <IndustryPage data={data} vignette={<FoodDrinkVignette />} />;
}
