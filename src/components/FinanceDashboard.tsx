
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, FileText, DollarSign, Clock, CheckCircle, XCircle, LogOut, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface FinanceDashboardProps {
  user: { role: string; name: string };
  onLogout: () => void;
}

const FinanceDashboard = ({ user, onLogout }: FinanceDashboardProps) => {
  const [onboardingApplications, setOnboardingApplications] = useState([
    { id: 1, vendorName: 'ABC Corp', submittedDate: '2024-01-20', status: 'pending', documents: 4 },
    { id: 2, vendorName: 'XYZ Ltd', submittedDate: '2024-01-22', status: 'under_review', documents: 3 },
    { id: 3, vendorName: 'DEF Inc', submittedDate: '2024-01-18', status: 'approved', documents: 4 },
  ]);

  const [invoices, setInvoices] = useState([
    { id: 'INV-001', vendor: 'ABC Corp', amount: '$5,000', po: 'PO-2024-001', status: 'pending_approval', submittedDate: '2024-01-25' },
    { id: 'INV-002', vendor: 'XYZ Ltd', amount: '$3,200', po: 'PO-2024-002', status: 'approved', submittedDate: '2024-01-23' },
    { id: 'INV-003', vendor: 'DEF Inc', amount: '$7,800', po: 'PO-2024-003', status: 'under_review', submittedDate: '2024-01-24' },
  ]);

  const handleOnboardingAction = (id: number, action: 'approve' | 'reject') => {
    setOnboardingApplications(prev => 
      prev.map(app => 
        app.id === id 
          ? { ...app, status: action === 'approve' ? 'approved' : 'rejected' }
          : app
      )
    );
    
    const application = onboardingApplications.find(app => app.id === id);
    toast.success(`${application?.vendorName} onboarding ${action}d successfully`);
  };

  const handleInvoiceAction = (invoiceId: string, action: 'approve' | 'reject') => {
    setInvoices(prev => 
      prev.map(inv => 
        inv.id === invoiceId 
          ? { ...inv, status: action === 'approve' ? 'approved' : 'rejected' }
          : inv
      )
    );
    
    const invoice = invoices.find(inv => inv.id === invoiceId);
    toast.success(`Invoice ${invoiceId} ${action}d successfully`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': case 'pending_approval': return 'bg-yellow-100 text-yellow-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalPendingAmount = invoices
    .filter(inv => inv.status === 'pending_approval' || inv.status === 'under_review')
    .reduce((sum, inv) => sum + parseFloat(inv.amount.replace('$', '').replace(',', '')), 0);

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
                <h1 className="text-xl font-bold text-gray-900">Finance Department</h1>
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
                  <p className="text-sm font-medium text-blue-600">Pending Reviews</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {onboardingApplications.filter(app => app.status === 'pending' || app.status === 'under_review').length}
                  </p>
                </div>
                <FileText className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Approved Vendors</p>
                  <p className="text-2xl font-bold text-green-900">
                    {onboardingApplications.filter(app => app.status === 'approved').length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-600">Pending Invoices</p>
                  <p className="text-2xl font-bold text-yellow-900">
                    {invoices.filter(inv => inv.status === 'pending_approval' || inv.status === 'under_review').length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Pending Amount</p>
                  <p className="text-2xl font-bold text-purple-900">${totalPendingAmount.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="onboarding" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white border shadow-sm">
            <TabsTrigger value="onboarding" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Onboarding Review</TabsTrigger>
            <TabsTrigger value="invoices" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Invoice Approval</TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Financial Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="onboarding">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Vendor Onboarding Applications</CardTitle>
                <CardDescription>Review and approve vendor onboarding documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {onboardingApplications.map((application) => (
                    <div key={application.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{application.vendorName}</p>
                          <p className="text-sm text-gray-600">
                            Submitted: {application.submittedDate} • {application.documents} documents
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(application.status)} variant="secondary">
                          {application.status.replace('_', ' ')}
                        </Badge>
                        {application.status === 'pending' || application.status === 'under_review' ? (
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleOnboardingAction(application.id, 'reject')}
                              className="hover:bg-red-50 hover:text-red-600"
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => handleOnboardingAction(application.id, 'approve')}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                          </div>
                        ) : (
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invoices">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Invoice Approvals</CardTitle>
                <CardDescription>Review and approve vendor invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{invoice.id}</p>
                          <p className="text-sm text-gray-600">
                            {invoice.vendor} • {invoice.po} • {invoice.submittedDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{invoice.amount}</p>
                          <Badge className={getStatusColor(invoice.status)} variant="secondary">
                            {invoice.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        {invoice.status === 'pending_approval' || invoice.status === 'under_review' ? (
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleInvoiceAction(invoice.id, 'reject')}
                              className="hover:bg-red-50 hover:text-red-600"
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => handleInvoiceAction(invoice.id, 'approve')}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                          </div>
                        ) : (
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Monthly Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-green-700">Approved Invoices</span>
                      <span className="text-lg font-bold text-green-900">$45,200</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                      <span className="text-sm font-medium text-yellow-700">Pending Approval</span>
                      <span className="text-lg font-bold text-yellow-900">${totalPendingAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium text-blue-700">New Vendors</span>
                      <span className="text-lg font-bold text-blue-900">3</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Processing Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Avg. Onboarding Time</span>
                      <span className="text-lg font-bold text-gray-900">3.2 days</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Avg. Invoice Approval</span>
                      <span className="text-lg font-bold text-gray-900">1.8 days</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Success Rate</span>
                      <span className="text-lg font-bold text-gray-900">94%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default FinanceDashboard;
