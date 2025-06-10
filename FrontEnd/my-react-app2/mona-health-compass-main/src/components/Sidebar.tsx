
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Heart, 
  Users, 
  FileText, 
  Calendar, 
  Activity, 
  Settings, 
  BarChart3,
  Stethoscope,
  ClipboardList,
  AlertTriangle,
  Pill,
  UserCheck
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'medical-records', label: 'Medical Records', icon: FileText },
    { id: 'health-info', label: 'Health Info', icon: Heart },
    { id: 'incidents', label: 'Incidents', icon: AlertTriangle },
    { id: 'checkups', label: 'Medical Checkups', icon: Stethoscope },
    { id: 'vaccinations', label: 'Vaccinations', icon: Pill },
    { id: 'nurses', label: 'School Nurses', icon: UserCheck },
    { id: 'reports', label: 'Reports', icon: ClipboardList },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'activity', label: 'Activity Log', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 h-screen bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 healthcare-gradient rounded-lg flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">HealthCare</h1>
            <p className="text-sm text-muted-foreground">Management System</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 hover:bg-accent/10",
                    activeSection === item.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
