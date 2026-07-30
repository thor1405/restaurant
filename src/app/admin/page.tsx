import { Menu as MenuIcon, Image as ImageIcon, Calendar } from "lucide-react";
import dbConnect from "@/lib/db";
import Menu from "@/models/Menu";
import Event from "@/models/Event";
import Gallery from "@/models/Gallery";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  try {
    await dbConnect();
    
    const totalMenuItems = await Menu.countDocuments();
    const totalEvents = await Event.countDocuments();
    const activeEvents = await Event.countDocuments({ isActive: true });
    const totalGalleryImages = await Gallery.countDocuments();

    const stats = [
      { name: "Menu Items", value: totalMenuItems, icon: MenuIcon, color: "text-blue-400" },
      { name: "Total Events", value: totalEvents, icon: Calendar, color: "text-purple-400" },
      { name: "Active Events", value: activeEvents, icon: Calendar, color: "text-green-400" },
      { name: "Gallery Images", value: totalGalleryImages, icon: ImageIcon, color: "text-pink-400" },
    ];

    return (
      <div className="p-8">
        <h1 className="font-heading text-3xl text-black mb-2">Welcome Back</h1>
        <p className="text-black/50 mb-8">Here's an overview of your pâtisserie today.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="bg-white border border-black/10 rounded-lg p-6 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className={`p-3 rounded bg-black/5 ${stat.color}`}>
                    <Icon size={24} />
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-heading text-black">{stat.value}</div>
                  <div className="text-black/50 text-sm tracking-wide mt-1">{stat.name}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Dashboard error:", error);
    return (
      <div className="p-8 text-black">
        <h1 className="text-2xl text-red-500 mb-4">Dashboard Error</h1>
        <pre className="bg-[#F7F5F2] p-4 rounded overflow-auto text-sm border border-red-500/30">
          {error instanceof Error ? error.stack || error.message : String(error)}
        </pre>
      </div>
    );
  }
}

