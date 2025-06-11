import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Heart, 
  Activity, 
  Calendar, 
  Pill, 
  AlertTriangle,
  Plus,
  Download
} from 'lucide-react';

const MedicalRecords = () => {
  const medicalRecords = [
    {
      id: "MR001",
      studentName: "Emma Johnson",
      studentId: "STU001",
      type: "Annual Physical",
      date: "2024-05-15",
      provider: "Dr. Sarah Smith",
      status: "Complete",
      findings: "Normal development, mild asthma noted",
      followUp: "6 months"
    },
    {
      id: "MR002", 
      studentName: "Michael Chen",
      studentId: "STU002",
      type: "Vision Screening",
      date: "2024-05-20",
      provider: "Dr. James Wilson",
      status: "Complete",
      findings: "20/20 vision, no corrections needed",
      followUp: "1 year"
    },
    {
      id: "MR003",
      studentName: "Sarah Williams",
      studentId: "STU003", 
      type: "Diabetes Management",
      date: "2024-05-10",
      provider: "Dr. Maria Garcia",
      status: "Ongoing",
      findings: "Blood sugar levels stable, A1C: 7.2%",
      followUp: "3 months"
    }
  ];

  const healthInfo = [
    {
      studentId: "STU001",
      studentName: "Emma Johnson",
      allergies: ["Peanuts", "Shellfish"],
      chronicConditions: ["Asthma"],
      medications: ["Albuterol Inhaler"],
      bloodType: "A+",
      emergencyContact: "Jennifer Johnson - Mother"
    },
    {
      studentId: "STU003", 
      studentName: "Sarah Williams",
      allergies: ["Latex"],
      chronicConditions: ["Type 1 Diabetes"],
      medications: ["Insulin", "Glucose Monitor"],
      bloodType: "O-",
      emergencyContact: "Robert Williams - Father"
    }
  ];

  const incidents = [
    {
      id: "INC001",
      studentName: "David Brown",
      type: "Injury",
      description: "Minor cut on playground",
      date: "2024-05-22",
      severity: "Minor",
      treatment: "Cleaned and bandaged",
      reportedBy: "Teacher - Ms. Anderson"
    },
    {
      id: "INC002",
      studentName: "Emma Johnson", 
      type: "Asthma Episode",
      description: "Breathing difficulty during PE",
      date: "2024-05-20",
      severity: "Moderate",
      treatment: "Inhaler administered, rest period",
      reportedBy: "Nurse - Jane Peters"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Complete': return 'bg-green-100 text-green-800';
      case 'Ongoing': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Minor': return 'bg-green-100 text-green-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'Severe': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Medical Records</h2>
          <p className="text-muted-foreground">Comprehensive health information and medical history</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="healthcare-gradient border-0 hover:shadow-lg transition-all duration-300">
            <Plus className="w-4 h-4 mr-2" />
            New Record
          </Button>
        </div>
      </div>

      <Tabs defaultValue="records" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="records" className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Medical Records</span>
          </TabsTrigger>
          <TabsTrigger value="health-info" className="flex items-center space-x-2">
            <Heart className="w-4 h-4" />
            <span>Health Information</span>
          </TabsTrigger>
          <TabsTrigger value="incidents" className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Incidents</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="records">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Medical Records</span>
              </CardTitle>
              <CardDescription>
                Complete medical examination records and assessments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medicalRecords.map((record) => (
                  <div key={record.id} className="p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-foreground">{record.type}</h3>
                          <Badge className={getStatusColor(record.status)}>
                            {record.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          <strong>Student:</strong> {record.studentName} ({record.studentId})
                        </p>
                        <p className="text-sm text-muted-foreground mb-1">
                          <strong>Provider:</strong> {record.provider}
                        </p>
                        <p className="text-sm text-muted-foreground mb-2">
                          <strong>Date:</strong> {new Date(record.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-foreground mb-2">
                          <strong>Findings:</strong> {record.findings}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          <strong>Follow-up:</strong> {record.followUp}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health-info">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>Health Information</span>
              </CardTitle>
              <CardDescription>
                Chronic conditions, allergies, and ongoing health management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {healthInfo.map((info) => (
                  <div key={info.studentId} className="p-4 rounded-lg border border-border">
                    <h3 className="font-semibold text-foreground mb-3">
                      {info.studentName} ({info.studentId})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Allergies</h4>
                        <div className="flex flex-wrap gap-2">
                          {info.allergies.map((allergy, index) => (
                            <Badge key={index} variant="outline" className="bg-red-50 text-red-700">
                              {allergy}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Chronic Conditions</h4>
                        <div className="flex flex-wrap gap-2">
                          {info.chronicConditions.map((condition, index) => (
                            <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                              {condition}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Medications</h4>
                        <div className="flex flex-wrap gap-2">
                          {info.medications.map((medication, index) => (
                            <Badge key={index} variant="outline" className="bg-green-50 text-green-700">
                              {medication}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Emergency Contact</h4>
                        <p className="text-sm text-muted-foreground">{info.emergencyContact}</p>
                        <p className="text-sm text-muted-foreground">Blood Type: {info.bloodType}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incidents">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5" />
                <span>Incident Reports</span>
              </CardTitle>
              <CardDescription>
                Medical incidents, injuries, and emergency responses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incidents.map((incident) => (
                  <div key={incident.id} className="p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-foreground">{incident.type}</h3>
                          <Badge className={getSeverityColor(incident.severity)}>
                            {incident.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          <strong>Student:</strong> {incident.studentName}
                        </p>
                        <p className="text-sm text-muted-foreground mb-1">
                          <strong>Date:</strong> {new Date(incident.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-foreground mb-2">
                          <strong>Description:</strong> {incident.description}
                        </p>
                        <p className="text-sm text-foreground mb-2">
                          <strong>Treatment:</strong> {incident.treatment}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          <strong>Reported by:</strong> {incident.reportedBy}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Report
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MedicalRecords;
