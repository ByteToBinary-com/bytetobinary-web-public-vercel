import React from 'react';
import { MdMovie, MdShoppingCart, MdLocalShipping } from 'react-icons/md';

const industries = [
	{
		title: 'Media',
		desc: 'Scalable streaming pipelines and content platforms.',
		Icon: MdMovie,
	},
	{
		title: 'E‑commerce',
		desc: 'High-performance retail backends and checkout.',
		Icon: MdShoppingCart,
	},
	{
		title: 'Transport',
		desc: 'Route optimisation, telematics and fleet platforms.',
		Icon: MdLocalShipping,
	},
];

export default function IndustryExpertise() {
	return (
		<section className="pt-10 pb-12">
			{/* align width/padding with CapabilitiesGrid for consistent layout */}
			<div className="max-w-[980px] mx-auto px-4">
				<h3 className="text-lg font-semibold text-neutral-900 mb-6">
					Industry Expertise
				</h3>

				<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
					{industries.map((it) => (
						<article
							key={it.title}
							className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
						>
							<div className="flex items-start gap-4">
								<div className="w-10 h-10 rounded-md bg-[var(--accent-blue)/10] flex items-center justify-center text-[var(--accent-blue)]">
									<it.Icon className="w-5 h-5" aria-hidden />
								</div>

								<div>
									<h4 className="text-sm font-semibold text-neutral-900">
										{it.title}
									</h4>
									<p className="mt-2 text-sm text-neutral-500">
										{it.desc}
									</p>
								</div>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}