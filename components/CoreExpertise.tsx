import React from 'react';
import { MdPlayCircleFilled, MdShoppingCart, MdLocalShipping, MdSmartToy } from 'react-icons/md';

const items = [
	{
		id: '1',
		Icon: MdPlayCircleFilled,
		title: 'Media & Streaming',
		desc: 'Building resilient, high-throughput media delivery platforms.',
	},
	{
		id: '2',
		Icon: MdShoppingCart,
		title: 'High-Traffic E-commerce',
		desc: 'Creating seamless and scalable online retail experiences.',
	},
	{
		id: '3',
		Icon: MdLocalShipping,
		title: 'Logistics & Transport',
		desc: 'Optimizing complex logistics with real-time data systems.',
	},
	{
		id: '4',
		Icon: MdSmartToy,
		title: 'AI & Machine Learning',
		desc: 'Integrating intelligent, data-driven features to unlock new value.',
	},
];

export default function CoreExpertise() {
	return (
		<section className="pt-10 bg-white w-full" id="expertise">
			<div className="w-full mx-auto px-4 md:px-10 lg:px-20 xl:px-40">
				<h2 className="text-[22px] font-bold text-black px-4 pb-3 pt-5">
					Core Expertise
				</h2>
				<div className="flex flex-col gap-10 px-4 py-10">
					<div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
						{items.map((it) => {
							const Icon = it.Icon;
							return (
								<div
									key={it.id}
									className="flex flex-1 gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 flex-col"
								>
									<div className="text-[var(--accent-blue)]">
										<Icon className="text-3xl" aria-hidden />
									</div>
									<div className="flex flex-col gap-1">
										<h3 className="text-black text-base font-bold">
											{it.title}
										</h3>
										<p className="text-gray-600 text-sm">{it.desc}</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
