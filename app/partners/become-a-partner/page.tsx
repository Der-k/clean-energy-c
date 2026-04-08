export default function BecomePartnerPage() {
  return (
    <main className="min-h-screen bg-[#f3f3f3] px-4 py-8 md:px-6 lg:py-10">
      <div className="mx-auto max-w-5xl">
        <section className="rounded-[22px] bg-[#02026d] px-6 py-8 text-center text-white shadow-[0_18px_40px_rgba(2,2,109,0.20)]">
          <p className="text-lg font-extrabold uppercase tracking-tight md:text-2xl">
            Be a Sponsor at the 2026 Clean Energy Conference & Exhibition
          </p>

          <div className="mt-4 space-y-2 text-xs font-semibold md:text-sm">
            <p>Marriott Hotel, Kigali | 6th August – 7th August 2026</p>
            <p>Duxton Hotel, Perth, Australia | 31st August – 1st September 2026</p>
          </div>

          <div className="mt-5">
            <a
              href="/documents/clean-energy-conference-programme-2026.pdf"
              className="inline-flex items-center rounded bg-[#2346c7] px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-white transition hover:bg-[#2d54e4]"
            >
              Download Prospectus
            </a>
          </div>
        </section>

        <section className="mt-6 rounded-[16px] bg-white p-5 shadow-[0_14px_35px_rgba(0,0,0,0.18)] md:p-8">
          <form className="mx-auto max-w-4xl">
            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="Sponsor Full Name"
                className="h-11 rounded border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="h-11 rounded border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="h-11 rounded border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
              />
              <input
                type="text"
                placeholder="Subject"
                className="h-11 rounded border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
              />

              <input
                type="text"
                placeholder="Company Name"
                className="h-11 rounded border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
              />
              <input
                type="text"
                placeholder="Company Website (Optional)"
                className="h-11 rounded border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
              />

              <select className="h-11 rounded border border-slate-200 bg-slate-50 px-4 text-sm text-slate-500 outline-none transition focus:border-blue-400 focus:bg-white">
                <option>Select Sponsorship Level</option>
                <option>Premium Partner</option>
                <option>Platinum Sponsor</option>
                <option>Gold Sponsor</option>
                <option>Silver Sponsor</option>
                <option>Strategic Partner</option>
              </select>

              <input
                type="text"
                placeholder="Estimated Sponsorship Budget"
                className="h-11 rounded border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
              />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
              <input
                type="text"
                placeholder="Company Social Media Links"
                className="h-11 rounded border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
              />

              <div className="flex flex-col gap-1 text-sm text-slate-700">
                <label className="font-medium">Company Logo</label>
                <input
                  type="file"
                  className="text-sm text-slate-600 file:mr-3 file:rounded file:border-0 file:bg-slate-200 file:px-3 file:py-2 file:text-sm file:font-medium"
                />
              </div>
            </div>

            <div className="mt-5">
              <textarea
                rows={5}
                placeholder="Brief Company Description"
                className="w-full rounded border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
              />
            </div>

            <div className="mt-5">
              <textarea
                rows={5}
                placeholder="Additional Comments / Special Requests"
                className="w-full rounded border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
              />
            </div>

            <div className="mt-6 flex justify-center">
              <button
                type="submit"
                className="rounded-full bg-[#02026d] px-6 py-3 text-xs font-bold text-white shadow-[0_10px_24px_rgba(2,2,109,0.28)] transition hover:bg-blue-800"
              >
                Submit Sponsor Application
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}