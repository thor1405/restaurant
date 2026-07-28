import Link from "next/link";
import dbConnect from "@/lib/db";
import Settings from "@/models/Settings";

export default async function Footer() {
  let settings;
  try {
    await dbConnect();
    settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
  } catch (error) {
    console.error("Failed to fetch footer settings:", error);
    // fallback data
    settings = {
      phoneNumber: "+33 1 23 45 67 89",
      email: "contact@letoilepatisserie.com",
      addressLine1: "123 Luxury Avenue",
      addressLine2: "Paris, 75008, France",
      igLink: "#",
      fbLink: "#",
      xLink: "#"
    };
  }

  return (
    <footer className="bg-[#FAFAFA] border-t border-black/10 pt-20 pb-10 text-black mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="flex flex-col">
            <h3 className="font-heading text-2xl tracking-widest font-semibold mb-6">
              L&apos;ÉTOILE
            </h3>
            <p className="text-black/60 mb-6 font-light leading-relaxed">
              Experience the pinnacle of artisanal baking, where every creation tells a story of passion, precision, and artistry.
            </p>
            <div className="flex gap-4">
              <a href={settings.igLink} className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center text-black/80 hover:text-(--color-accent) hover:border-(--color-accent) transition-colors text-xs font-medium">
                IG
              </a>
              <a href={settings.fbLink} className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center text-black/80 hover:text-(--color-accent) hover:border-(--color-accent) transition-colors text-xs font-medium">
                FB
              </a>
              <a href={settings.xLink} className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center text-black/80 hover:text-(--color-accent) hover:border-(--color-accent) transition-colors text-xs font-medium">
                X
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h4 className="font-heading text-lg tracking-widest mb-6">EXPLORE</h4>
            <ul className="flex flex-col gap-4">
              {['Menu', 'Reservations', 'Private Events', 'Our Story', 'Gallery'].map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link.toLowerCase().replace(' ', '-')}`}
                    className="text-black/60 hover:text-(--color-accent) transition-colors font-light"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col">
            <h4 className="font-heading text-lg tracking-widest mb-6">CONTACT</h4>
            <ul className="flex flex-col gap-4 text-black/60 font-light">
              <li>{settings.addressLine1}</li>
              <li>{settings.addressLine2}</li>
              <li className="mt-2">
                <a href={`tel:${settings.phoneNumber.replace(/\s+/g, '')}`} className="hover:text-(--color-accent) transition-colors">
                  {settings.phoneNumber}
                </a>
              </li>
              <li>
                <a href={`mailto:${settings.email}`} className="hover:text-(--color-accent) transition-colors">
                  {settings.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col">
            <h4 className="font-heading text-lg tracking-widest mb-6">NEWSLETTER</h4>
            <p className="text-black/60 font-light mb-4">
              Subscribe to receive updates on seasonal creations and exclusive events.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-transparent border border-black/20 px-4 py-3 text-black placeholder:text-black/40 focus:outline-none focus:border-(--color-accent) transition-colors"
                required
              />
              <button
                type="button"
                className="bg-(--color-accent) text-black px-4 py-3 font-medium uppercase tracking-widest hover:bg-[#d4b676] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-black/40 font-light">
          <p>&copy; {new Date().getFullYear()} L&apos;Étoile Pâtisserie. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-black transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
