import ApproachHero from '@/components/approach/ApproachHero';
import CapabilitiesGrid from '@/components/approach/CapabilitiesGrid';
import TechCompetencies from '@/components/approach/TechCompetencies';
import IndustryExpertise from '@/components/approach/IndustryExpertise';
import ApproachCTA from '@/components/approach/ApproachCTA';

export default function ApproachPage() {
  return (
    <main>
      <ApproachHero />
      <CapabilitiesGrid />
      <div className="w-full mx-auto px-4 md:px-10 lg:px-20 xl:px-40">
        <TechCompetencies />
        <IndustryExpertise />
      </div>
      <ApproachCTA />
    </main>
  );
}