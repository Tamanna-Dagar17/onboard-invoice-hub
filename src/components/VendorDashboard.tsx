
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
      case 'approved': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'under_review': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header with glass effect */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Vendor Portal
                </h1>
                <p className="text-sm text-gray-600 font-medium">Welcome back, {user.name}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={onLogout}
              className="hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-200 shadow-sm"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 font-medium">Onboarding Status</p>
                  <p className="text-3xl font-bold text-white capitalize mt-1">{onboardingStatus}</p>
                </div>
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                  {getStatusIcon(onboardingStatus)}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 font-medium">Total Invoices</p>
                  <p className="text-3xl font-bold text-white mt-1">{mockInvoices.length}</p>
                </div>
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                  <FileText className="w-7 h-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 font-medium">Pending Approval</p>
                  <p className="text-3xl font-bold text-white mt-1">
                    {mockInvoices.filter(inv => inv.status === 'pending' || inv.status === 'under_review').length}
                  </p>
                </div>
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Clock className="w-7 h-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/60 backdrop-blur-sm border border-white/20 shadow-lg rounded-xl p-1">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-lg rounded-lg transition-all duration-200"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="onboarding" 
              className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-lg rounded-lg transition-all duration-200"
            >
              Onboarding
            </TabsTrigger>
            <TabsTrigger 
              value="invoices" 
              className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-lg rounded-lg transition-all duration-200"
            >
              Submit Invoice
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-lg rounded-lg transition-all duration-200"
            >
              Invoice History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3 text-xl">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span>Recent Activities</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { text: "Onboarding documents submitted", time: "2 days ago", color: "bg-blue-50 border-blue-200" },
                    { text: "Invoice INV-003 submitted", time: "1 day ago", color: "bg-green-50 border-green-200" },
                    { text: "Invoice INV-001 approved", time: "3 hours ago", color: "bg-purple-50 border-purple-200" }
                  ].map((activity, index) => (
                    <div key={index} className={`flex items-center justify-between p-4 rounded-xl border ${activity.color} transition-all duration-200 hover:shadow-md`}>
                      <span className="text-sm font-medium text-gray-700">{activity.text}</span>
                      <Badge variant="secondary" className="bg-white/80 text-gray-600 font-medium">
                        {activity.time}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3 text-xl">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-white" />
                    </div>
                    <span>Action Required</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {onboardingStatus === 'pending' && (
                    <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl">
                      <p className="text-sm text-orange-800 font-semibold">Complete your onboarding</p>
                      <p className="text-xs text-orange-600 mt-1">Submit all required documents to get approved</p>
                    </div>
                  )}
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
                    <p className="text-sm text-blue-800 font-semibold">Update bank details</p>
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
            <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">Invoice History</CardTitle>
                <CardDescription>Track all your submitted invoices and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockInvoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 hover:shadow-md">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{invoice.id}</p>
                          <p className="text-sm text-gray-600">PO: {invoice.po}</p>
                        </div>
                      </div>
                      <div className="text-right flex items-center space-x-4">
                        <div>
                          <p className="font-semibold text-gray-900 text-lg">{invoice.amount}</p>
                        </div>
                        <Badge className={`${getStatusColor(invoice.status)} font-medium px-3 py-1 border`} variant="secondary">
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
