import { CalendarCheck, Menu as MenuIcon, Clock, Users } from "lucide-react";
import dbConnect from "@/lib/db";
import Reservation from "@/models/Reservation";
import Menu from "@/models/Menu";
import SlotConfig from "@/models/SlotConfig";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  try {
    await dbConnect();
    
    const totalReservations = await Reservation.countDocuments();
    const pendingReservations = await Reservation.countDocuments({ status: "pending" });
    const totalMenuItems = await Menu.countDocuments();
    const configuredSlots = await SlotConfig.countDocuments();

    const stats = [
      { name: "Total Reservations", value: totalReservations, icon: CalendarCheck, color: "text-blue-400" },
      { name: "Pending Approval", value: pendingReservations, icon: Users, color: "text-yellow-400" },
      { name: "Menu Items", value: totalMenuItems, icon: MenuIcon, color: "text-green-400" },
      { name: "Configured Slots", value: configuredSlots, icon: Clock, color: "text-purple-400" },
    ];

    return (
      <div className="p-8">
        <h1 className="font-heading text-3xl text-white mb-2">Welcome Back</h1>
        <p className="text-white/50 mb-8">Here's an overview of your restaurant today.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="bg-[#1C1C1C] border border-white/10 rounded-lg p-6 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className={`p-3 rounded bg-white/5 ${stat.color}`}>
                    <Icon size={24} />
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-heading text-white">{stat.value}</div>
                  <div className="text-white/50 text-sm tracking-wide mt-1">{stat.name}</div>
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
      <div className="p-8 text-white">
        <h1 className="text-2xl text-red-500 mb-4">Dashboard Error</h1>
        <pre className="bg-black/50 p-4 rounded overflow-auto text-sm border border-red-500/30">
          {error instanceof Error ? error.stack || error.message : String(error)}
        </pre>
      </div>
    );
  }
}

