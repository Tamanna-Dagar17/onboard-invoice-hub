
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Users, Mail, LogOut, Plus, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface PurchaseDashboardProps {
  user: { role: string; name: string };
  onLogout: () => void;
}

const PurchaseDashboard = ({ user, onLogout }: PurchaseDashboardProps) => {
  const [vendors, setVendors] = useState([
    { id: 1, name: 'ABC Corp', status: 'approved', email: 'contact@abccorp.com', onboardingDate: '2024-01-15' },
    { id: 2, name: 'XYZ Ltd', status: 'pending', email: 'info@xyzltd.com', onboardingDate: '2024-01-20' },
    { id: 3, name: 'DEF Inc', status: 'under_review', email: 'hello@definc.com', onboardingDate: '2024-01-22' },
  ]);

  const [newVendorEmail, setNewVendorEmail] = useState('');

  const sendOnboardingLink = () => {
    if (!newVendorEmail) {
      toast.error('Please enter vendor email');
      return;
    }

    const newVendor = {
      id: vendors.length + 1,
      name: 'New Vendor',
      status: 'invited',
      email: newVendorEmail,
      onboardingDate: new Date().toISOString().split('T')[0],
    };

    setVendors(prev => [...prev, newVendor]);
    setNewVendorEmail('');
    toast.success(`Onboarding link sent to ${newVendorEmail}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'under_review': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'invited': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Enhanced header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Purchase Department
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 font-medium">Total Vendors</p>
                  <p className="text-3xl font-bold text-white mt-1">{vendors.length}</p>
                </div>
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 font-medium">Approved</p>
                  <p className="text-3xl font-bold text-white mt-1">
                    {vendors.filter(v => v.status === 'approved').length}
                  </p>
                </div>
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 font-medium">Pending Review</p>
                  <p className="text-3xl font-bold text-white mt-1">
                    {vendors.filter(v => v.status === 'pending' || v.status === 'under_review').length}
                  </p>
                </div>
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 font-medium">Invited</p>
                  <p className="text-3xl font-bold text-white mt-1">
                    {vendors.filter(v => v.status === 'invited').length}
                  </p>
                </div>
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Mail className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced tabs */}
        <Tabs defaultValue="vendors" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/60 backdrop-blur-sm border border-white/20 shadow-lg rounded-xl p-1">
            <TabsTrigger 
              value="vendors" 
              className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-lg rounded-lg transition-all duration-200"
            >
              Vendor Management
            </TabsTrigger>
            <TabsTrigger 
              value="onboarding" 
              className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-lg rounded-lg transition-all duration-200"
            >
              Send Onboarding
            </TabsTrigger>
            <TabsTrigger 
              value="reports" 
              className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-lg rounded-lg transition-all duration-200"
            >
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="vendors">
            <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">Vendor Directory</CardTitle>
                <CardDescription>Manage all vendors and their onboarding status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vendors.map((vendor) => (
                    <div key={vendor.id} className="flex items-center justify-between p-5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 hover:shadow-md">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{vendor.name}</p>
                          <p className="text-sm text-gray-600">{vendor.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className={`${getStatusColor(vendor.status)} font-medium px-3 py-1 border`} variant="secondary">
                          {vendor.status.replace('_', ' ')}
                        </Badge>
                        <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="onboarding">
            <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">Send Onboarding Link</CardTitle>
                <CardDescription>Invite new vendors to complete their onboarding process</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex space-x-4">
                  <input
                    type="email"
                    placeholder="Enter vendor email address"
                    value={newVendorEmail}
                    onChange={(e) => setNewVendorEmail(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  <Button 
                    onClick={sendOnboardingLink} 
                    className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 hover:from-blue-600 hover:via-indigo-700 hover:to-purple-700 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send Invitation
                  </Button>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
                  <h4 className="font-semibold text-blue-900 mb-3">What happens next?</h4>
                  <ul className="text-sm text-blue-800 space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Vendor receives an email with onboarding link and temporary credentials</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>They complete the registration form and upload required documents</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Finance team reviews and approves the onboarding</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Vendor can start submitting invoices once approved</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">Vendor Reports</CardTitle>
                <CardDescription>Analytics and reports for vendor management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl border border-blue-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Onboarding Timeline</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">This Month</span>
                        <span className="font-semibold text-blue-700 text-lg">3 vendors</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Last Month</span>
                        <span className="font-semibold text-blue-700 text-lg">5 vendors</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total Active</span>
                        <span className="font-semibold text-blue-700 text-lg">{vendors.filter(v => v.status === 'approved').length} vendors</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-100 rounded-xl border border-emerald-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Approval Rate</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Approved</span>
                        <span className="font-semibold text-emerald-700 text-lg">85%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Under Review</span>
                        <span className="font-semibold text-blue-700 text-lg">10%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Rejected</span>
                        <span className="font-semibold text-red-700 text-lg">5%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default PurchaseDashboard;
