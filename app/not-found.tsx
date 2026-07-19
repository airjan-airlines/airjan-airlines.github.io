import Link from "next/link";
import { navItems } from "@/components/nav";

export default function NotFound() {
  return (
    <div className="max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10">
        <div className="md:col-span-8 md:col-start-3">
          <p className="label text-accent mb-6">Error 404</p>
          <h1 className="text-5xl mb-6">This page was never printed.</h1>
          <p className="font-body text-lg leading-relaxed text-ink-light measure mb-12">
            The link may be from an earlier edition. The sections below are all
            still in circulation.
          </p>

          <ul className="border-t border-ink">
            {navItems.map((item) => (
              <li key={item.href} className="border-b border-rule-faint">
                <Link
                  href={item.href}
                  className="group flex items-baseline gap-4 py-4"
                >
                  <span className="font-display text-sm text-ink-faint w-6">
                    {item.numeral}
                  </span>
                  <span className="text-xl group-hover:text-accent group-hover:translate-x-1 transition-all duration-200">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Link href="/" className="label link-rule inline-block mt-10">
            ← Return to cover
          </Link>
        </div>
      </div>
    </div>
  );
}
