import Link from "next/link";
import { profile } from "@/data/resume";
import { navItems } from "./nav";

export default function SiteFooter() {
  return (
    <footer className="relative z-10 px-6 md:px-14 lg:px-20 pb-14 md:pb-20">
      <div className="max-w-[1440px] mx-auto border-t border-ink pt-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            <p className="font-display text-2xl leading-none">{profile.name}</p>
            <p className="label mt-2">
              {profile.issueLine} · {profile.issueName}
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-4">
            <ul className="space-y-1.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm link-rule">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/archive" className="text-sm link-rule text-ink-light">
                  Archive
                </Link>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-3">
            <ul className="space-y-1.5">
              <li>
                <a href={`mailto:${profile.email}`} className="text-sm link-rule">
                  Email
                </a>
              </li>
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm link-rule"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={profile.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm link-rule"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="label mt-10 text-ink-faint">{profile.location}</p>
      </div>
    </footer>
  );
}
