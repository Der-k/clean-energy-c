import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-base font-semibold text-zinc-900">
              Clean Energy Conference
            </p>
            <p className="mt-1 text-base text-zinc-600">
<<<<<<< HEAD
              Connecting Leaders. Mobilising Investment. Accelerating Africa’s Clean Energy Future.
=======
              Fast, clean, and professional event website.
>>>>>>> 30d2ceb24450687e15a1ca80c1efa84d701f0bba
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-base text-zinc-600">
            <Link href="/conference">Conference</Link>
            <Link href="/event">Event</Link>
            <Link href="/speakers">Speakers</Link>
<<<<<<< HEAD
           
=======
            <Link href="/partners">Partners</Link>
>>>>>>> 30d2ceb24450687e15a1ca80c1efa84d701f0bba
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}