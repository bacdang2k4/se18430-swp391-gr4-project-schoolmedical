import React from 'react';
import DashboardCard from './DashboardCard';
import { 
  Users, 
  Heart, 
  AlertTriangle, 
  Activity, 
  Stethoscope, 
  FileText,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  const stats = [
    {
      title: "Total Students",
      value: "2,847",
      change: "+12% from last month",
      changeType: "positive",
      icon: Users,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Active Medical Records",
      value: "2,654",
      change: "+5% from last month",
      changeType: "positive",
      icon: FileText,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Recent Incidents",
      value: "23",
      change: "-8% from last week",
      changeType: "positive",
      icon: AlertTriangle,
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "Scheduled Checkups",
      value: "156",
      change: "This week",
      changeType: "neutral",
      icon: Stethoscope,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Health Alerts",
      value: "7",
      change: "Requires attention",
      changeType: "negative",
      icon: Heart,
      gradient: "from-red-500 to-pink-500"
    },
    {
      title: "Vaccination Rate",
      value: "94.2%",
      change: "+2.1% from last year",
      changeType: "positive",
      icon: Activity,
      gradient: "from-teal-500 to-blue-500"
    }
  ];

  const recentActivities = [
    {
      type: "Medical Checkup",
      student: "Emma Johnson",
      time: "2 minutes ago",
      status: "completed"
    },
    {
      type: "Incident Report",
      student: "Michael Chen",
      time: "15 minutes ago",
      status: "pending"
    },
    {
      type: "Vaccination",
      student: "Sarah Williams",
      time: "1 hour ago",
      status: "completed"
    },
    {
      type: "Health Alert",
      student: "David Brown",
      time: "2 hours ago",
      status: "urgent"
    }
  ];

  const upcomingAppointments = [
    {
      time: "09:00 AM",
      student: "Alice Cooper",
      type: "Annual Checkup"
    },
    {
      time: "10:30 AM",
      student: "Bob Wilson",
      type: "Vision Screening"
    },
    {
      time: "02:00 PM",
      student: "Carol Davis",
      type: "Vaccination"
    },
    {
      time: "03:30 PM",
      student: "Daniel Martinez",
      type: "Follow-up"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
        <p className="text-muted-foreground">Welcome to the Healthcare Management System</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <DashboardCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>Latest updates from the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'completed' ? 'bg-green-500' :
                      activity.status === 'pending' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`} />
                    <div>
                      <p className="font-medium text-foreground">{activity.type}</p>
                      <p className="text-sm text-muted-foreground">{activity.student}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Today's Appointments</span>
            </CardTitle>
            <CardDescription>Scheduled checkups and appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Stethoscope className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{appointment.student}</p>
                      <p className="text-sm text-muted-foreground">{appointment.type}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-primary">{appointment.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
