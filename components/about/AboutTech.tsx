import React from 'react';
import * as SiIcons from 'react-icons/si';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io5';

const technologies = [
	{ name: 'Java', candidates: ['SiJava', 'FaJava'] },
	{ name: 'Spring', candidates: ['SiSpring'] },
	{ name: 'React', candidates: ['SiReact', 'FaReact'] },
	{ name: 'Angular', candidates: ['SiAngular'] },
	{ name: 'Flutter', candidates: ['SiFlutter'] },
	{ name: 'AWS', candidates: ['SiAmazonaws', 'FaAws', 'FaAmazon'] },
	{ name: 'Azure', candidates: ['SiMicrosoftazure', 'FaMicrosoft', 'IoLogoAzure'] },
	{ name: 'GCP', candidates: ['SiGooglecloud', 'SiGoogle'] },
	{ name: 'Kafka', candidates: ['SiApachekafka', 'SiKafka'] },
	{ name: 'Quarkus', candidates: ['SiQuarkus'] },
];

function resolveIcon(candidates: string[]) {
	for (const key of candidates) {
		if ((SiIcons as any)[key]) return (SiIcons as any)[key];
		if ((FaIcons as any)[key]) return (FaIcons as any)[key];
		if ((IoIcons as any)[key]) return (IoIcons as any)[key];
	}
	return undefined;
}

export default function AboutTech() {
	return (
		<section className="px-4 md:px-10 lg:px-20 xl:px-40">
			<div className="mx-auto max-w-[960px]">
				<div className="flex flex-col gap-6 py-10">
					<div className="flex flex-col items-center gap-2 text-center">
						<h2 className="text-gray-900 text-3xl font-bold leading-tight tracking-[-0.015em]">
							Our Technological Edge
						</h2>
						<p className="text-gray-600 text-base font-normal leading-normal max-w-2xl">
							We go beyond just listing technologies. We leverage a modern, powerful stack to build future-proof,
							efficient, and scalable solutions tailored to your specific needs.
						</p>
					</div>

					<div className="grid grid-cols-2 gap-4 py-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
						{technologies.map((t: any) => {
							const Icon = resolveIcon(t.candidates);
							return (
								<div
									key={t.name}
									className="flex flex-col items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
								>
									{Icon ? (
										<div
											className="w-12 h-12 rounded-full flex items-center justify-center"
											style={{ backgroundColor: 'rgba(6,182,212,0.08)' }}
										>
											<Icon className="w-6 h-6 text-[var(--accent-blue)]" aria-hidden />
										</div>
									) : (
										<div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100">
											<svg
												className="w-6 h-6 text-gray-400"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
												aria-hidden
											>
												<path
													d="M8.5 7.5L4 12l4.5 4.5"
													stroke="currentColor"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<path
													d="M15.5 7.5L20 12l-4.5 4.5"
													stroke="currentColor"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</div>
									)}

									<p className="text-sm font-medium text-gray-900">{t.name}</p>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
