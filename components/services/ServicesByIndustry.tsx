"use client";
import React, { useState } from 'react';
import { MdCast, MdDynamicFeed, MdMonitor, MdWeb } from 'react-icons/md';

const industryTabs = ['Media', 'E-commerce', 'Transport'] as const;

const sampleGrid = [
  { id: 1, title: 'Real-time Content Delivery', desc: 'Build robust, low-latency streaming infrastructure and content delivery networks that scale to millions of concurrent users.', Icon: MdCast, tags: ['Kafka','AWS MediaServices','Reactive Programming'] },
  { id: 2, title: 'Scalable Content Management', desc: 'Headless CMS and digital asset management systems designed for high-throughput and global distribution.', Icon: MdDynamicFeed, tags: ['Java Spring','Quarkus','React'] },
  { id: 3, title: 'User Engagement Analytics', desc: 'Real-time analytics platforms to track user behavior, personalize content, and increase engagement.', Icon: MdMonitor, tags: ['AI/ML','GCP BigQuery','Pulsar'] },
  { id: 4, title: 'Interactive User Experiences', desc: 'Dynamic front-end applications for media consumption, from video players to interactive feeds.', Icon: MdWeb, tags: ['React','Angular','Flutter'] },
];

export default function ServicesByIndustry() {
  const [active, setActive] = useState<typeof industryTabs[number]>('Media');

  return (
    <section className="w-full bg-white py-10" id="services">
      <div className="w-full mx-auto px-4 md:px-10 lg:px-20 xl:px-40">
        <div className="max-w-[960px]">
          <h2 className="text-[22px] font-bold text-neutral-900 mb-4">Our Services by Industry</h2>

          {/* Tabs */}
          <div className="flex items-center gap-6 border-b border-neutral-200 pb-4">
            {industryTabs.map((t) => (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={`text-sm font-medium pb-2 ${active === t ? 'text-[var(--accent-blue)] border-b-2 border-[var(--accent-blue)]' : 'text-neutral-500'}`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Cards grid */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {sampleGrid.map((item) => (
              <article key={item.id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm flex flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-md bg-[var(--accent-blue)/10] flex items-center justify-center text-[var(--accent-blue)]">
                      <item.Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900">{item.title}</h3>
                      <p className="mt-2 text-sm text-neutral-600">{item.desc}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="text-xs font-medium bg-[var(--accent-blue)/10] text-[var(--accent-blue)] px-2 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}