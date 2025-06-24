
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, FileText, Users, DollarSign, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import LoginForm from '@/components/LoginForm';
import VendorDashboard from '@/components/VendorDashboard';
import PurchaseDashboard from '@/components/PurchaseDashboard';
import FinanceDashboard from '@/components/FinanceDashboard';
import ApproverDashboard from '@/components/ApproverDashboard';

type UserRole = 'vendor' | 'purchase' | 'finance' | 'approver' | null;

const Index = () => {
  const [currentUser, setCurrentUser] = useState<{ role: UserRole; name: string } | null>(null);

  const handleLogin = (role: UserRole, name: string) => {
    setCurrentUser({ role, name });
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const renderDashboard = () => {
    switch (currentUser.role) {
      case 'vendor':
        return <VendorDashboard user={currentUser} onLogout={handleLogout} />;
      case 'purchase':
        return <PurchaseDashboard user={currentUser} onLogout={handleLogout} />;
      case 'finance':
        return <FinanceDashboard user={currentUser} onLogout={handleLogout} />;
      case 'approver':
        return <ApproverDashboard user={currentUser} onLogout={handleLogout} />;
      default:
        return <div>Unknown role</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {renderDashboard()}
    </div>
  );
};

export default Index;
