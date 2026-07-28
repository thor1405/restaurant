"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";

type SettingsData = {
  phoneNumber: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  igLink: string;
  fbLink: string;
  xLink: string;
};

export default function SettingsManager() {
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        if (data.success) {
          setSettings(data.data);
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!settings) return;
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        alert("Settings saved successfully!");
      } else {
        alert("Failed to save settings");
      }
    } catch (error) {
      alert("An error occurred");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-white">Loading settings...</div>;
  }

  if (!settings) {
    return <div className="p-8 text-white">Error loading settings.</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl text-white">Footer Settings</h1>
        <p className="text-white/50 mt-2">Manage the contact information and links displayed in the website footer.</p>
      </div>

      <div className="bg-[#1C1C1C] rounded-lg border border-white/10 p-6 max-w-2xl">
        <form onSubmit={handleSave} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/70 text-xs tracking-widest uppercase mb-2">Phone Number</label>
              <input 
                type="text" name="phoneNumber" required value={settings.phoneNumber} onChange={handleChange}
                className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-(--color-accent)"
              />
            </div>
            <div>
              <label className="block text-white/70 text-xs tracking-widest uppercase mb-2">Email Address</label>
              <input 
                type="email" name="email" required value={settings.email} onChange={handleChange}
                className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-(--color-accent)"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/70 text-xs tracking-widest uppercase mb-2">Address Line 1</label>
              <input 
                type="text" name="addressLine1" required value={settings.addressLine1} onChange={handleChange}
                className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-(--color-accent)"
              />
            </div>
            <div>
              <label className="block text-white/70 text-xs tracking-widest uppercase mb-2">Address Line 2</label>
              <input 
                type="text" name="addressLine2" required value={settings.addressLine2} onChange={handleChange}
                className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-(--color-accent)"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <h3 className="text-lg font-heading text-white mb-4">Social Links</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-xs tracking-widest uppercase mb-2">Instagram URL</label>
                <input 
                  type="text" name="igLink" value={settings.igLink} onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-(--color-accent)"
                />
              </div>
              <div>
                <label className="block text-white/70 text-xs tracking-widest uppercase mb-2">Facebook URL</label>
                <input 
                  type="text" name="fbLink" value={settings.fbLink} onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-(--color-accent)"
                />
              </div>
              <div>
                <label className="block text-white/70 text-xs tracking-widest uppercase mb-2">X (Twitter) URL</label>
                <input 
                  type="text" name="xLink" value={settings.xLink} onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-(--color-accent)"
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? "Saving..." : "Save Settings"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
