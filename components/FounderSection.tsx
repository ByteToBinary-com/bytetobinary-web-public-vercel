import Image from 'next/image';

export default function FounderSection() {
  return (
    <section className="pt-10 bg-white w-full" id="about">
      <div className="w-full mx-auto px-4 md:px-10 lg:px-20 xl:px-40">
        <div className="bg-gray-50 rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 border border-gray-200">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQWmovA5pVCd69_634P9dk8SiqP32paxgRLY95szitT2DPX23MJkUUMTk66WkLuGt3nV3zDlHJnX-_Ckoid1COyxZRx0WF3vOFBoYgFfLUnft6zbCvNvwUICIGX2y7f66yZSJAxCB7uhkOz2S9UsKtLTPt4diTZrbMaGq3hH8FxsiwyYfSTq_W1NFhZxy8nm6mKKca4byO1A28gi2QTqtjLWLeWqX6W4H2I1D9CzL4PT7MQKedZ4HImC703cWO5m3_gFt6dlrlxPR2"
            alt="founder"
            width={160}
            height={160}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-[var(--accent-blue)/50]"
          />
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-black">Meet the Founder</h2>
            <p className="text-gray-600 mt-2 text-lg">John Doe, Principal Engineer</p>
            <p className="text-gray-700 mt-4">With over 15 years at the forefront of software engineering, I founded ByteToBinary to translate enterprise-level experience into focused, high-impact solutions. My passion is architecting systems that are not just functional, but resilient, scalable, and intelligent. I believe in a partnership approach, working closely with you to turn complex challenges into competitive advantages.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
