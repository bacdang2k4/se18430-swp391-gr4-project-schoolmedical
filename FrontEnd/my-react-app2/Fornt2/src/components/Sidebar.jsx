
import React from 'react';
import { 
  Home, 
  Users, 
  FileText, 
  Heart, 
  AlertTriangle, 
  Calendar,
  Settings,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Sidebar = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
    },
    {
      id: 'students',
      label: 'Students',
      icon: Users,
    },
    {
      id: 'medical-records',
      label: 'Medical Records',
      icon: FileText,
    },
    {
      id: 'health-info',
      label: 'Health Info',
      icon: Heart,
    },
    {
      id: 'incidents',
      label: 'Incidents',
      icon: AlertTriangle,
    },
    {
      id: 'appointments',
      label: 'Appointments',
      icon: Calendar,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
    },
  ];

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col h-screen">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Heart className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-bold text-foreground">HealthCare</h2>
            <p className="text-sm text-muted-foreground">Management System</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start ${
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                onClick={() => onSectionChange(item.id)}
              >
                <Icon className="w-4 h-4 mr-3" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-foreground"
        >
          <LogOut className="w-4 h-4 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
