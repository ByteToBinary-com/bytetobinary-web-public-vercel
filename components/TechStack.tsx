import * as SiIcons from 'react-icons/si';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io5';
import type { IconType } from 'react-icons';

const technologies: { name: string; candidates: string[] }[] = [
	{ name: 'Java', candidates: ['SiJava', 'FaJava'] },
	{ name: 'Spring', candidates: ['SiSpring'] },
	{ name: 'Quarkus', candidates: ['SiQuarkus'] },
	{ name: 'React', candidates: ['SiReact', 'FaReact'] },
	{ name: 'Angular', candidates: ['SiAngular'] },
	{ name: 'Flutter', candidates: ['SiFlutter', 'FaMobileAlt'] },
	{ name: 'AWS', candidates: ['SiAmazonaws', 'FaAws', 'FaAmazon'] },
	{ name: 'Azure', candidates: ['SiMicrosoftazure', 'FaMicrosoft', 'IoLogoAzure'] },
	{ name: 'GCP', candidates: ['SiGooglecloud', 'SiGoogle'] },
	{ name: 'Kafka', candidates: ['SiApachekafka', 'SiKafka'] },
	{ name: 'Pulsar', candidates: ['SiApachepulsar', 'SiPulsar'] },
	{ name: 'Kubernetes', candidates: ['SiKubernetes'] },
];

function resolveIcon(candidates: string[]): IconType | undefined {
	for (const key of candidates) {
		if ((SiIcons as any)[key]) return (SiIcons as any)[key] as IconType;
		if ((FaIcons as any)[key]) return (FaIcons as any)[key] as IconType;
		if ((IoIcons as any)[key]) return (IoIcons as any)[key] as IconType;
	}
	return undefined;
}

export default function TechStack() {
	return (
		<section className="pt-10 bg-white w-full" id="tech-stack">
			<div className="w-full mx-auto px-4 md:px-10 lg:px-20 xl:px-40">
				<h2 className="text-[22px] font-bold text-black px-4 pb-3 pt-5">
					Our Technology Stack
				</h2>
				<div className="px-4 py-10">
					<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 text-center">
						{technologies.map(({ name, candidates }) => {
							const Icon = resolveIcon(candidates);
							return (
								<div key={name} className="flex flex-col items-center gap-2">
									<div className="h-12 w-12 bg-white rounded-full flex items-center justify-center border border-gray-200">
										{Icon ? (
											<div
												className="w-8 h-8 rounded-full flex items-center justify-center"
												style={{
													backgroundColor: 'rgba(6,182,212,0.12)',
												}}
											>
												<Icon
													className="w-5 h-5 text-[var(--accent-blue)]"
													aria-hidden
												/>
											</div>
										) : (
											<svg
												className="w-6 h-6 text-[var(--accent-blue)]"
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
										)}
									</div>
									<p className="text-black text-sm">{name}</p>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
