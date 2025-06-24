
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, FileText, Upload, Clock, CheckCircle, AlertCircle, LogOut } from 'lucide-react';
import VendorOnboarding from './VendorOnboarding';
import InvoiceSubmission from './InvoiceSubmission';
import { toast } from 'sonner';

interface VendorDashboardProps {
  user: { role: string; name: string };
  onLogout: () => void;
}

const VendorDashboard = ({ user, onLogout }: VendorDashboardProps) => {
  const [onboardingStatus, setOnboardingStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  
  const mockInvoices = [
    { id: 'INV-001', po: 'PO-2024-001', amount: '$5,000', status: 'approved', date: '2024-01-15' },
    { id: 'INV-002', po: 'PO-2024-002', amount: '$3,200', status: 'pending', date: '2024-01-20' },
    { id: 'INV-003', po: 'PO-2024-003', amount: '$7,800', status: 'under_review', date: '2024-01-22' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'under_review': return <Clock className="w-4 h-4" />;
      case 'rejected': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Vendor Portal</h1>
                <p className="text-sm text-gray-600">Welcome, {user.name}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={onLogout}
              className="hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Onboarding Status</p>
                  <p className="text-2xl font-bold text-green-900 capitalize">{onboardingStatus}</p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  {getStatusIcon(onboardingStatus)}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Invoices</p>
                  <p className="text-2xl font-bold text-blue-900">{mockInvoices.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Pending Approval</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {mockInvoices.filter(inv => inv.status === 'pending' || inv.status === 'under_review').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border shadow-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Overview</TabsTrigger>
            <TabsTrigger value="onboarding" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Onboarding</TabsTrigger>
            <TabsTrigger value="invoices" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Submit Invoice</TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Invoice History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Recent Activities</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Onboarding documents submitted</span>
                    <Badge variant="secondary">2 days ago</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Invoice INV-003 submitted</span>
                    <Badge variant="secondary">1 day ago</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Invoice INV-001 approved</span>
                    <Badge variant="secondary">3 hours ago</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                    <span>Action Required</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {onboardingStatus === 'pending' && (
                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <p className="text-sm text-orange-800 font-medium">Complete your onboarding</p>
                      <p className="text-xs text-orange-600 mt-1">Submit all required documents to get approved</p>
                    </div>
                  )}
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800 font-medium">Update bank details</p>
                    <p className="text-xs text-blue-600 mt-1">Please verify your banking information</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="onboarding">
            <VendorOnboarding onStatusChange={setOnboardingStatus} />
          </TabsContent>

          <TabsContent value="invoices">
            <InvoiceSubmission />
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Invoice History</CardTitle>
                <CardDescription>Track all your submitted invoices and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockInvoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{invoice.id}</p>
                          <p className="text-sm text-gray-600">PO: {invoice.po}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{invoice.amount}</p>
                        <Badge className={getStatusColor(invoice.status)} variant="secondary">
                          {invoice.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default VendorDashboard;
