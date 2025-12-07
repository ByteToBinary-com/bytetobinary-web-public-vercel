import React from 'react';
import { MdMovie, MdShoppingCart, MdLocalShipping } from 'react-icons/md';

const timeline = [
	{
		Icon: MdMovie,
		title: 'Mastering Media Streaming',
		desc: 'Delivering high-performance, scalable media solutions to millions of users.',
	},
	{
		Icon: MdShoppingCart,
		title: 'Innovating in E-commerce',
		desc: 'Architecting robust e-commerce platforms with seamless user experiences.',
	},
	{
		Icon: MdLocalShipping,
		title: 'Modernizing Transport Logistics',
		desc: 'Developing real-time logistics systems for complex transport networks.',
	},
];

export default function AboutTimeline() {
	return (
		<section className="px-4 md:px-10 lg:px-20 xl:px-40">
			<div className="mx-auto max-w-[960px]">
				<h2 className="text-gray-900 text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-10">
					My Journey in Technology
				</h2>

				<div className="grid grid-cols-[40px_1fr] gap-x-2 px-4">
					{timeline.map((t, idx) => (
						<React.Fragment key={t.title}>
							<div className="flex flex-col items-center gap-1 pt-3">
								<t.Icon
									className="text-[var(--accent-blue)] text-2xl"
									aria-hidden
								/>
								<div className="w-[1.5px] bg-gray-200 h-2 grow"></div>
							</div>

							<div className="flex flex-1 flex-col py-3">
								<p className="text-gray-900 text-base font-medium leading-normal">
									{t.title}
								</p>
								<p className="text-gray-600 text-base font-normal leading-normal">
									{t.desc}
								</p>
							</div>
						</React.Fragment>
					))}
				</div>
			</div>
		</section>
	);
}
