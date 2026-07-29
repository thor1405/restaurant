"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from "lucide-react";
import { useEffect, useState } from "react";

type SettingsData = {
  phoneNumber: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  igLink: string;
  fbLink: string;
  xLink: string;
};

export default function ContactPage() {
  const [settings, setSettings] = useState<SettingsData | null>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => {
        if (data.success) setSettings(data.data);
      })
      .catch(console.error);
  }, []);

  const getFormattedUrl = (url: string) => {
    if (!url || url === '#') return '#';
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  };

  const phone = settings?.phoneNumber || "+33 1 23 45 67 89";
  const email = settings?.email || "contact@letoilepatisserie.com";
  const address1 = settings?.addressLine1 || "123 Avenue des Champs-Élysées";
  const address2 = settings?.addressLine2 || "75008 Paris, France";

  return (
    <div className="pt-32 pb-24 bg-[#111111] min-h-screen">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Contact Us" 
          subtitle="We Look Forward to Welcoming You" 
        />

        <div className="max-w-6xl mx-auto mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            
            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center"
            >
              <h3 className="font-heading text-4xl text-white mb-10 leading-tight">
                Visit Our <br /><span className="italic font-light text-(--color-accent)">Boutique</span>
              </h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-[#1C1C1C] group-hover:border-(--color-accent) group-hover:bg-(--color-accent)/10 transition-colors shrink-0">
                    <MapPin className="text-white/70 group-hover:text-(--color-accent) transition-colors" size={20} />
                  </div>
                  <div>
                    <p className="text-white font-medium tracking-widest uppercase text-sm mb-2">Location</p>
                    <p className="text-white/60 font-light leading-relaxed">{address1}<br />{address2}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-[#1C1C1C] group-hover:border-(--color-accent) group-hover:bg-(--color-accent)/10 transition-colors shrink-0">
                    <Clock className="text-white/70 group-hover:text-(--color-accent) transition-colors" size={20} />
                  </div>
                  <div>
                    <p className="text-white font-medium tracking-widest uppercase text-sm mb-2">Opening Hours</p>
                    <p className="text-white/60 font-light leading-relaxed">Tuesday - Sunday: 7:00 AM - 7:00 PM<br />Monday: Closed</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-[#1C1C1C] group-hover:border-(--color-accent) group-hover:bg-(--color-accent)/10 transition-colors shrink-0">
                    <Phone className="text-white/70 group-hover:text-(--color-accent) transition-colors" size={20} />
                  </div>
                  <div>
                    <p className="text-white font-medium tracking-widest uppercase text-sm mb-2">Phone</p>
                    <a href={`tel:${phone.replace(/\s+/g, '')}`} className="text-white/60 font-light leading-relaxed hover:text-(--color-accent) transition-colors">
                      {phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-[#1C1C1C] group-hover:border-(--color-accent) group-hover:bg-(--color-accent)/10 transition-colors shrink-0">
                    <Mail className="text-white/70 group-hover:text-(--color-accent) transition-colors" size={20} />
                  </div>
                  <div>
                    <p className="text-white font-medium tracking-widest uppercase text-sm mb-2">Email</p>
                    <a href={`mailto:${email}`} className="text-white/60 font-light leading-relaxed hover:text-(--color-accent) transition-colors">
                      {email}
                    </a>
                  </div>
                </div>
              </div>

              {settings && (
                <div className="mt-12 flex gap-4">
                  <a href={getFormattedUrl(settings.igLink)} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-(--color-accent) hover:border-(--color-accent) transition-colors">
                    <Instagram size={20} />
                  </a>
                  <a href={getFormattedUrl(settings.fbLink)} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-(--color-accent) hover:border-(--color-accent) transition-colors">
                    <Facebook size={20} />
                  </a>
                  <a href={getFormattedUrl(settings.xLink)} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-(--color-accent) hover:border-(--color-accent) transition-colors">
                    <Twitter size={20} />
                  </a>
                </div>
              )}
            </motion.div>

            {/* Map Integration */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full h-[500px] lg:h-auto min-h-[500px] rounded-xl overflow-hidden border border-white/10 relative shadow-2xl shadow-black/50"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.142047744348!2d2.292292615587254!3d48.86738580752495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fd1e3c23e85%3A0xf63eb9b8f2d59105!2sChamps-%C3%89lys%C3%A9es%2C%20Paris%2C%20France!5e0!3m2!1sen!2sus!4v1714571830155!5m2!1sen!2sus" 
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                style={{ filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(85%)' }}
              ></iframe>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
