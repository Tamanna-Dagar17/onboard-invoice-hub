
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, FileText, Clock, CheckCircle, XCircle, LogOut, Eye, User } from 'lucide-react';
import { toast } from 'sonner';

interface ApproverDashboardProps {
  user: { role: string; name: string };
  onLogout: () => void;
}

const ApproverDashboard = ({ user, onLogout }: ApproverDashboardProps) => {
  const [pendingApprovals, setPendingApprovals] = useState([
    { 
      id: 'INV-001', 
      vendor: 'ABC Corp', 
      amount: '$5,000', 
      po: 'PO-2024-001', 
      submittedDate: '2024-01-25',
      department: 'IT',
      approvalLevel: 'Department Head',
      priority: 'normal'
    },
    { 
      id: 'INV-004', 
      vendor: 'TechSol Inc', 
      amount: '$12,500', 
      po: 'PO-2024-004', 
      submittedDate: '2024-01-26',
      department: 'Marketing',
      approvalLevel: 'Finance',
      priority: 'high'
    },
    { 
      id: 'INV-005', 
      vendor: 'Office Plus', 
      amount: '$850', 
      po: 'PO-2024-005', 
      submittedDate: '2024-01-27',
      department: 'Operations',
      approvalLevel: 'Department Head',
      priority: 'normal'
    },
  ]);

  const [approvalHistory, setApprovalHistory] = useState([
    { id: 'INV-002', vendor: 'XYZ Ltd', amount: '$3,200', action: 'approved', date: '2024-01-23', approver: user.name },
    { id: 'INV-003', vendor: 'DEF Inc', amount: '$7,800', action: 'approved', date: '2024-01-24', approver: user.name },
  ]);

  const handleApproval = (invoiceId: string, action: 'approve' | 'reject') => {
    const invoice = pendingApprovals.find(inv => inv.id === invoiceId);
    if (!invoice) return;

    // Move to history
    setApprovalHistory(prev => [...prev, {
      id: invoice.id,
      vendor: invoice.vendor,
      amount: invoice.amount,
      action: action === 'approve' ? 'approved' : 'rejected',
      date: new Date().toISOString().split('T')[0],
      approver: user.name
    }]);

    // Remove from pending
    setPendingApprovals(prev => prev.filter(inv => inv.id !== invoiceId));

    toast.success(`Invoice ${invoiceId} ${action}d successfully`);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'normal': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionColor = (action: string) => {
    return action === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const totalPendingAmount = pendingApprovals.reduce((sum, inv) => 
    sum + parseFloat(inv.amount.replace('$', '').replace(',', '')), 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Approver Dashboard</h1>
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
          <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600">Pending Approvals</p>
                  <p className="text-2xl font-bold text-red-900">{pendingApprovals.length}</p>
                </div>
                <Clock className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600">High Priority</p>
                  <p className="text-2xl font-bold text-orange-900">
                    {pendingApprovals.filter(inv => inv.priority === 'high').length}
                  </p>
                </div>
                <FileText className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Pending Value</p>
                  <p className="text-2xl font-bold text-purple-900">${totalPendingAmount.toLocaleString()}</p>
                </div>
                <FileText className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Approved Today</p>
                  <p className="text-2xl font-bold text-green-900">
                    {approvalHistory.filter(h => h.date === new Date().toISOString().split('T')[0]).length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white border shadow-sm">
            <TabsTrigger value="pending" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Pending Approvals</TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Approval History</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Pending Invoice Approvals</CardTitle>
                <CardDescription>Review and approve invoices awaiting your authorization</CardDescription>
              </CardHeader>
              <CardContent>
                {pendingApprovals.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
                    <p className="text-gray-600">No pending approvals at this time.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingApprovals.map((invoice) => (
                      <div key={invoice.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <p className="font-medium text-gray-900">{invoice.id}</p>
                              <Badge className={getPriorityColor(invoice.priority)} variant="secondary">
                                {invoice.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">
                              {invoice.vendor} • {invoice.department} • {invoice.po}
                            </p>
                            <p className="text-xs text-gray-500">
                              Submitted: {invoice.submittedDate} • Level: {invoice.approvalLevel}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-medium text-gray-900">{invoice.amount}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleApproval(invoice.id, 'reject')}
                              className="hover:bg-red-50 hover:text-red-600"
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => handleApproval(invoice.id, 'approve')}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Approval History</CardTitle>
                <CardDescription>Track your recent approval decisions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {approvalHistory.map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          {record.action === 'approved' ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{record.id}</p>
                          <p className="text-sm text-gray-600">{record.vendor}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{record.amount}</p>
                          <p className="text-xs text-gray-500">{record.date}</p>
                        </div>
                        <Badge className={getActionColor(record.action)} variant="secondary">
                          {record.action}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Approval Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-green-700">Total Approved</span>
                      <span className="text-lg font-bold text-green-900">
                        {approvalHistory.filter(h => h.action === 'approved').length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-sm font-medium text-red-700">Total Rejected</span>
                      <span className="text-lg font-bold text-red-900">
                        {approvalHistory.filter(h => h.action === 'rejected').length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium text-blue-700">Approval Rate</span>
                      <span className="text-lg font-bold text-blue-900">
                        {approvalHistory.length > 0 
                          ? Math.round((approvalHistory.filter(h => h.action === 'approved').length / approvalHistory.length) * 100)
                          : 0}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Average Response</span>
                      <span className="text-lg font-bold text-gray-900">2.1 hours</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Fastest Response</span>
                      <span className="text-lg font-bold text-gray-900">15 minutes</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">This Month</span>
                      <span className="text-lg font-bold text-gray-900">{approvalHistory.length} approvals</span>
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

export default ApproverDashboard;
