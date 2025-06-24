
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, FileText, Upload, Clock, CheckCircle, AlertCircle, LogOut, TrendingUp, Star, Award } from 'lucide-react';
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
      case 'approved': return 'badge-success';
      case 'pending': return 'badge-warning';
      case 'under_review': return 'badge-info';
      case 'rejected': return 'badge-danger';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="decoration-blob absolute top-20 right-20 w-64 h-64 bg-blue-400/10"></div>
        <div className="decoration-blob absolute bottom-20 left-20 w-80 h-80 bg-purple-400/10" style={{animationDelay: '-3s'}}></div>
      </div>

      {/* Enhanced header with glass effect */}
      <header className="glass sticky top-0 z-50 border-b border-white/20 shadow-elegant">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-glow">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gradient">
                  Vendor Portal
                </h1>
                <p className="text-sm text-gray-600 font-medium flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>Welcome back, {user.name}</span>
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={onLogout}
              className="btn-gradient border-0 text-white hover:scale-110 transition-all duration-300"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Enhanced stats cards with better gradients */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <Card className="border-0 shadow-luxury bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 text-white hover-lift">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 font-semibold text-sm uppercase tracking-wide">Onboarding Status</p>
                  <p className="text-4xl font-bold text-white capitalize mt-2">{onboardingStatus}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    {getStatusIcon(onboardingStatus)}
                    <span className="text-emerald-100 text-sm">Active</span>
                  </div>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                  <Award className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-luxury bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 text-white hover-lift">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 font-semibold text-sm uppercase tracking-wide">Total Invoices</p>
                  <p className="text-4xl font-bold text-white mt-2">{mockInvoices.length}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-blue-100 text-sm">+12% this month</span>
                  </div>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                  <FileText className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-luxury bg-gradient-to-br from-purple-500 via-pink-600 to-red-600 text-white hover-lift">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 font-semibold text-sm uppercase tracking-wide">Pending Approval</p>
                  <p className="text-4xl font-bold text-white mt-2">
                    {mockInvoices.filter(inv => inv.status === 'pending' || inv.status === 'under_review').length}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-purple-100 text-sm">Awaiting review</span>
                  </div>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                  <Clock className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced tabs with modern styling */}
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 glass border border-white/20 shadow-elegant rounded-2xl p-2">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-elegant rounded-xl transition-all duration-300 text-lg font-semibold py-3"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="onboarding" 
              className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-elegant rounded-xl transition-all duration-300 text-lg font-semibold py-3"
            >
              Onboarding
            </TabsTrigger>
            <TabsTrigger 
              value="invoices" 
              className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-elegant rounded-xl transition-all duration-300 text-lg font-semibold py-3"
            >
              Submit Invoice
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-elegant rounded-xl transition-all duration-300 text-lg font-semibold py-3"
            >
              Invoice History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="card-modern">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-gradient">Recent Activities</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { text: "Onboarding documents submitted", time: "2 days ago", gradient: "from-blue-50 to-indigo-100" },
                    { text: "Invoice INV-003 submitted", time: "1 day ago", gradient: "from-green-50 to-emerald-100" },
                    { text: "Invoice INV-001 approved", time: "3 hours ago", gradient: "from-purple-50 to-pink-100" }
                  ].map((activity, index) => (
                    <div key={index} className={`flex items-center justify-between p-6 rounded-2xl bg-gradient-to-r ${activity.gradient} border-0 hover-lift`}>
                      <span className="text-sm font-semibold text-gray-700">{activity.text}</span>
                      <Badge className="bg-white/80 text-gray-600 font-semibold px-4 py-2 rounded-full">
                        {activity.time}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="card-modern">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-gradient-secondary">Action Required</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {onboardingStatus === 'pending' && (
                    <div className="p-6 bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 border-0 rounded-2xl shadow-elegant">
                      <p className="text-sm text-orange-800 font-bold">Complete your onboarding</p>
                      <p className="text-xs text-orange-600 mt-2">Submit all required documents to get approved</p>
                    </div>
                  )}
                  <div className="p-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-0 rounded-2xl shadow-elegant">
                    <p className="text-sm text-blue-800 font-bold">Update bank details</p>
                    <p className="text-xs text-blue-600 mt-2">Please verify your banking information</p>
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

          <TabsContent value="history" className="space-y-8">
            <Card className="card-modern">
              <CardHeader>
                <CardTitle className="text-2xl text-gradient">Invoice History</CardTitle>
                <CardDescription className="text-lg">Track all your submitted invoices and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockInvoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-8 border-0 rounded-2xl bg-gradient-to-r from-gray-50 to-white hover-lift shadow-elegant">
                      <div className="flex items-center space-x-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center shadow-glow">
                          <FileText className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-lg">{invoice.id}</p>
                          <p className="text-sm text-gray-600 font-medium">PO: {invoice.po}</p>
                          <p className="text-xs text-gray-500">Date: {invoice.date}</p>
                        </div>
                      </div>
                      <div className="text-right flex items-center space-x-6">
                        <div>
                          <p className="font-bold text-gray-900 text-2xl">{invoice.amount}</p>
                        </div>
                        <Badge className={`${getStatusColor(invoice.status)} font-semibold px-4 py-2 text-sm rounded-full`}>
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
