import React from 'react';
import { MdSmartToy, MdBolt, MdSyncAlt } from 'react-icons/md';

const expertise = [
	{ title: 'AI & Machine Learning', desc: 'From recommendation engines to predictive analytics.', Icon: MdSmartToy },
	{ title: 'Reactive Architecture', desc: 'Responsive, resilient and elastic systems.', Icon: MdBolt },
	{ title: 'Event-Driven Systems', desc: 'Kafka and Pulsar based real-time architectures.', Icon: MdSyncAlt },
];

export default function ExpertiseGrid() {
	return (
		<section className="w-full py-12 bg-white">
			<div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 xl:px-40">
				<h3 className="text-center text-neutral-800 text-[22px] font-bold pb-8">Core Technical Expertise</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{expertise.map((e) => (
						<div key={e.title} className="flex flex-col items-center text-center gap-3 px-6">
							<div className="w-16 h-16 rounded-full bg-[var(--accent-blue)/10] flex items-center justify-center text-[var(--accent-blue)] mb-2">
								{/* inner circle: light-blue tint + blue icon so it remains visible */}
								<div
									className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
									style={{ backgroundColor: 'rgba(6,182,212,0.15)' }}
								>
									<e.Icon className="w-5 h-5 text-[var(--accent-blue)]" aria-hidden />
								</div>
							</div>
							<h4 className="text-neutral-800 font-bold">{e.title}</h4>
							<p className="text-neutral-600 text-sm">{e.desc}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}