import Hero from '@/components/Hero';
import CoreExpertise from '@/components/CoreExpertise';
import TechStack from '@/components/TechStack';
import FounderSection from '@/components/FounderSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <main>
      <Hero />
      <CoreExpertise />
      <TechStack />
      <ContactSection />
    </main>
  );
}
