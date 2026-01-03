import AdminLayout from "@/components/admin/AdminLayout";
import { useServices } from "@/contexts/ServicesContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, CheckCircle2, XCircle, TrendingUp } from "lucide-react";

const AdminOverview = () => {
  const { services } = useServices();

  const totalServices = services.length;
  const activeServices = services.filter((s) => s.isActive).length;
  const inactiveServices = services.filter((s) => !s.isActive).length;
  const bookableServices = services.filter((s) => s.showBookButton && s.isActive).length;

  const stats = [
    {
      title: "Total Services",
      value: totalServices,
      icon: Settings,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      title: "Active Services",
      value: activeServices,
      icon: CheckCircle2,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Inactive Services",
      value: inactiveServices,
      icon: XCircle,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
    },
    {
      title: "Bookable Services",
      value: bookableServices,
      icon: TrendingUp,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's an overview of your services.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="border-border shadow-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Services */}
        <Card className="border-border shadow-card">
          <CardHeader>
            <CardTitle className="font-display text-xl">Recent Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {services.slice(0, 5).map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between p-4 bg-accent/50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg ${service.iconBg} flex items-center justify-center`}>
                      <span className={service.iconColor}>●</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{service.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        ₹{service.consultationFee} • {service.consultationDuration}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        service.isActive
                          ? "bg-emerald-500/10 text-emerald-500"
                          : "bg-rose-500/10 text-rose-500"
                      }`}
                    >
                      {service.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminOverview;
