
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Filter, Eye, Edit, MoreHorizontal } from 'lucide-react';

const StudentList = () => {
  const students = [
    {
      id: "STU001",
      name: "Emma Johnson",
      class: "Grade 10A",
      age: 16,
      healthStatus: "Good",
      lastCheckup: "2024-05-15",
      medicalConditions: ["Asthma"],
      emergencyContact: "+1 (555) 123-4567"
    },
    {
      id: "STU002", 
      name: "Michael Chen",
      class: "Grade 9B",
      age: 15,
      healthStatus: "Excellent",
      lastCheckup: "2024-05-20",
      medicalConditions: [],
      emergencyContact: "+1 (555) 234-5678"
    },
    {
      id: "STU003",
      name: "Sarah Williams", 
      class: "Grade 11C",
      age: 17,
      healthStatus: "Fair",
      lastCheckup: "2024-05-10",
      medicalConditions: ["Diabetes Type 1", "Allergies"],
      emergencyContact: "+1 (555) 345-6789"
    },
    {
      id: "STU004",
      name: "David Brown",
      class: "Grade 8A", 
      age: 14,
      healthStatus: "Good",
      lastCheckup: "2024-05-18",
      medicalConditions: ["Food Allergies"],
      emergencyContact: "+1 (555) 456-7890"
    },
    {
      id: "STU005",
      name: "Alice Cooper",
      class: "Grade 12B",
      age: 18,
      healthStatus: "Excellent", 
      lastCheckup: "2024-05-22",
      medicalConditions: [],
      emergencyContact: "+1 (555) 567-8901"
    }
  ];

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'Excellent': return 'bg-green-100 text-green-800';
      case 'Good': return 'bg-blue-100 text-blue-800';
      case 'Fair': return 'bg-yellow-100 text-yellow-800';
      case 'Poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Students</h2>
          <p className="text-muted-foreground">Manage student information and health records</p>
        </div>
        <Button className="healthcare-gradient border-0 hover:shadow-lg transition-all duration-300">
          <Plus className="w-4 h-4 mr-2" />
          Add Student
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Student Directory</CardTitle>
              <CardDescription>View and manage all enrolled students</CardDescription>
            </div>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {students.map((student) => (
              <div key={student.id} className="p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-semibold">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{student.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {student.class} • Age {student.age} • ID: {student.id}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Last checkup: {new Date(student.lastCheckup).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <Badge className={getHealthStatusColor(student.healthStatus)}>
                        {student.healthStatus}
                      </Badge>
                      {student.medicalConditions.length > 0 && (
                        <div className="mt-2">
                          {student.medicalConditions.map((condition, index) => (
                            <Badge key={index} variant="outline" className="text-xs mr-1">
                              {condition}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentList;
