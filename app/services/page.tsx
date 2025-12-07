import { ServicesHero, ServicesByIndustry, ExpertiseGrid, ServicesCTA } from '@/components/services';
import ContactSection from '@/components/ContactSection';

export default function ServicesPage() {
  return (
    <main>
      <ServicesHero />
      <ServicesByIndustry />
      <ExpertiseGrid />
      <ServicesCTA />
    </main>
  );
}