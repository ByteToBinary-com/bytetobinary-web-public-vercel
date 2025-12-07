import React from 'react';
import type { IconType } from 'react-icons';
import * as SiIcons from 'react-icons/si';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io5';

type Group = { label: string; tags: string[] };

const groups: Group[] = [
	{ label: 'Backend', tags: ['Java', 'Spring', 'Quarkus'] },
	{ label: 'Frontend', tags: ['React', 'Angular', 'Flutter'] },
	{ label: 'Cloud & DevOps', tags: ['AWS', 'Azure', 'GCP'] },
	{ label: 'Data & AI', tags: ['AI/ML', 'Kafka', 'Pulsar'] },
];

// Helper to attempt resolving an icon from multiple icon packs by common names
function resolveIcon(...candidates: string[]): IconType | undefined {
	for (const name of candidates) {
		if ((SiIcons as any)[name]) return (SiIcons as any)[name] as IconType;
		if ((FaIcons as any)[name]) return (FaIcons as any)[name] as IconType;
		if ((IoIcons as any)[name]) return (IoIcons as any)[name] as IconType;
	}
	return undefined;
}

const tagIconMap: Record<string, IconType | undefined> = {
	// Backend
	Java: resolveIcon('SiJava', 'FaJava'),
	Spring: resolveIcon('SiSpring', 'FaLeaf'),
	Quarkus: resolveIcon('SiQuarkus'),
	// Frontend
	React: resolveIcon('SiReact', 'FaReact'),
	Angular: resolveIcon('SiAngular'),
	Flutter: resolveIcon('SiFlutter'),
	// Cloud & DevOps
	AWS: resolveIcon('SiAmazonaws', 'FaAws', 'FaAmazon'),
	Azure: resolveIcon('SiMicrosoftazure', 'FaMicrosoft', 'IoLogoAzure'),
	GCP: resolveIcon('SiGooglecloud', 'SiGooglecloudplatform'),
	// Data & AI
	'AI/ML': resolveIcon('SiTensorflow', 'SiKeras'),
	Kafka: resolveIcon('SiApachekafka', 'SiKafka'),
	Pulsar: resolveIcon('SiApachepulsar', 'SiPulsar'),
};

export default function TechCompetencies() {
	return (
		// keep component theme-aware; align with site content padding/width
		<section className="pt-10 pb-8 rounded-lg">
			<div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 xl:px-40">
				<h3 className="text-lg font-semibold text-neutral-900 mb-6">
					Technology Competencies
				</h3>

				{/* use a responsive 2-column layout so groups align neatly with other page content */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
					{groups.map((g: Group) => (
						<div key={g.label} className="space-y-3">
							<h4 className="text-sm font-medium text-neutral-700">{g.label}</h4>
							<div className="flex flex-wrap gap-2">
								{g.tags.map((t: string) => {
									const Icon = tagIconMap[t];
									return (
										<span
											key={t}
											className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 ring-1 ring-blue-100"
										>
											{Icon ? <Icon className="w-3 h-3 mr-1 text-blue-600" aria-hidden /> : null}
											<span className="leading-none">{t}</span>
										</span>
									);
								})}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}