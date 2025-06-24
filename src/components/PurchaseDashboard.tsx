
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
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      case 'invited': return 'bg-purple-100 text-purple-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
                <h1 className="text-xl font-bold text-gray-900">Purchase Department</h1>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Vendors</p>
                  <p className="text-2xl font-bold text-blue-900">{vendors.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Approved</p>
                  <p className="text-2xl font-bold text-green-900">
                    {vendors.filter(v => v.status === 'approved').length}
                  </p>
                </div>
                <Users className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-600">Pending Review</p>
                  <p className="text-2xl font-bold text-yellow-900">
                    {vendors.filter(v => v.status === 'pending' || v.status === 'under_review').length}
                  </p>
                </div>
                <Users className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Invited</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {vendors.filter(v => v.status === 'invited').length}
                  </p>
                </div>
                <Mail className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="vendors" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white border shadow-sm">
            <TabsTrigger value="vendors" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Vendor Management</TabsTrigger>
            <TabsTrigger value="onboarding" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Send Onboarding</TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="vendors">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Vendor Directory</CardTitle>
                <CardDescription>Manage all vendors and their onboarding status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vendors.map((vendor) => (
                    <div key={vendor.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{vendor.name}</p>
                          <p className="text-sm text-gray-600">{vendor.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(vendor.status)} variant="secondary">
                          {vendor.status.replace('_', ' ')}
                        </Badge>
                        <Button variant="outline" size="sm">
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
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Send Onboarding Link</CardTitle>
                <CardDescription>Invite new vendors to complete their onboarding process</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-4">
                  <input
                    type="email"
                    placeholder="Enter vendor email address"
                    value={newVendorEmail}
                    onChange={(e) => setNewVendorEmail(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button onClick={sendOnboardingLink} className="bg-gradient-to-r from-blue-600 to-purple-600">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Invitation
                  </Button>
                </div>
                
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Vendor receives an email with onboarding link and temporary credentials</li>
                    <li>• They complete the registration form and upload required documents</li>
                    <li>• Finance team reviews and approves the onboarding</li>
                    <li>• Vendor can start submitting invoices once approved</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Vendor Reports</CardTitle>
                <CardDescription>Analytics and reports for vendor management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Onboarding Timeline</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">This Month</span>
                        <span className="font-medium">3 vendors</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Last Month</span>
                        <span className="font-medium">5 vendors</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Active</span>
                        <span className="font-medium">{vendors.filter(v => v.status === 'approved').length} vendors</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Approval Rate</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Approved</span>
                        <span className="font-medium text-green-600">85%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Under Review</span>
                        <span className="font-medium text-blue-600">10%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Rejected</span>
                        <span className="font-medium text-red-600">5%</span>
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
