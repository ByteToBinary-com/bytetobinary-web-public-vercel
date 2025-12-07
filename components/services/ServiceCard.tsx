import React from 'react';

type Props = {
  title: string;
  desc: string;
  icon?: React.ReactNode;
};

export default function ServiceCard({ title, desc, icon }: Props) {
  return (
    <article className="flex flex-col gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
        <div>
          <h3 className="text-neutral-800 font-bold text-sm">{title}</h3>
          <p className="text-neutral-600 text-sm mt-1">{desc}</p>
        </div>
      </div>
    </article>
  );
}