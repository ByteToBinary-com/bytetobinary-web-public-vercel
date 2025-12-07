import AboutHero from '@/components/about/AboutHero';
import AboutTimeline from '@/components/about/AboutTimeline';
import AboutValues from '@/components/about/AboutValues';
import AboutTech from '@/components/about/AboutTech';

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutValues />
      <AboutTimeline />
      <AboutTech />
    </main>
  );
}
