import React from 'react';
import { MdLightbulb, MdCode } from 'react-icons/md';
import { FaHandshake } from 'react-icons/fa';

const values = [
	{
		Icon: MdLightbulb,
		title: 'Commitment to Innovation',
		desc: 'We leverage cutting-edge technologies like AI and reactive programming to build solutions that are ready for the future.',
	},
	{
		Icon: FaHandshake,
		title: 'Client-Centric Partnership',
		desc: 'Your success is our success. We work closely with you to understand your goals and deliver tailored solutions.',
	},
	{
		Icon: MdCode,
		title: 'Engineering Excellence',
		desc: 'With a foundation in robust frameworks and cloud platforms, we build high-quality, scalable, and maintainable software.',
	},
];

export default function AboutValues() {
	return (
		<section className="w-full bg-transparent">
			{/* Overlapping container like ServicesHero */}
			<div className="w-full mx-auto px-4 md:px-10 lg:px-20 xl:px-40 -mt-12 md:-mt-16 relative z-30">
				<div className="max-w-[960px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
					{values.map((v) => (
						<div key={v.title} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
							<div className="flex items-start gap-4">
								<div className="w-10 h-10 rounded-md bg-[var(--accent-blue)/10] flex items-center justify-center text-[var(--accent-blue)]">
									<v.Icon className="w-5 h-5" aria-hidden />
								</div>
								<div>
									<h3 className="text-sm font-semibold text-neutral-900">{v.title}</h3>
									<p className="mt-1 text-sm text-neutral-500">{v.desc}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
