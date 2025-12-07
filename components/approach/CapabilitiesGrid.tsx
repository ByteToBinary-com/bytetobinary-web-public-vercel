import React from 'react';
import { MdAccountTree, MdBuild, MdAutoGraph, MdSyncAlt, MdDevices, MdSecurity } from 'react-icons/md';

const capabilities = [
	{ title: 'System Architecture', desc: 'Designing resilient, observable systems for scale.', Icon: MdAccountTree },
	{ title: 'Platform Engineering', desc: 'Platform ops, CI/CD and developer experience.', Icon: MdBuild },
	{ title: 'Data & AI', desc: 'Analytics, ML pipelines and real-time processing.', Icon: MdAutoGraph },
	{ title: 'Integration', desc: 'Event-driven & streaming architectures.', Icon: MdSyncAlt },
	{ title: 'UX & Frontend', desc: 'Fast, accessible user experiences on web & mobile.', Icon: MdDevices },
	{ title: 'SRE & Ops', desc: 'SLIs, SLOs, incident readiness and cost controls.', Icon: MdSecurity },
];

export default function CapabilitiesGrid() {
	return (
		<section className="w-full bg-white py-12">
			<div className="max-w-[980px] mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
				{capabilities.map((c) => (
					<div key={c.title} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
						<div className="w-10 h-10 rounded-md bg-[var(--accent-blue)/10] flex items-center justify-center text-[var(--accent-blue)] mb-3">
							{/* ensure SVG uses currentColor for fill/stroke so Tailwind color classes apply */}
							<c.Icon className="w-5 h-5 fill-current stroke-current text-[var(--accent-blue)]" aria-hidden />
						</div>
						<h4 className="text-sm font-semibold text-neutral-900">{c.title}</h4>
						<p className="mt-2 text-sm text-neutral-500">{c.desc}</p>
					</div>
				))}
			</div>
		</section>
	);
}