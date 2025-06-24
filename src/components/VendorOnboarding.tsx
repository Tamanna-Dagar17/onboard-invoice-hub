
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface VendorOnboardingProps {
  onStatusChange: (status: 'pending' | 'approved' | 'rejected') => void;
}

const VendorOnboarding = ({ onStatusChange }: VendorOnboardingProps) => {
  const [formData, setFormData] = useState({
    companyName: '',
    businessType: '',
    registrationNumber: '',
    taxId: '',
    address: '',
    contactPerson: '',
    phone: '',
    email: '',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
  });

  const [uploadedDocs, setUploadedDocs] = useState<{[key: string]: boolean}>({
    registration: false,
    tax: false,
    bank: false,
    kyc: false,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (docType: string) => {
    setUploadedDocs(prev => ({ ...prev, [docType]: true }));
    toast.success(`${docType.toUpperCase()} document uploaded successfully`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const requiredFields = ['companyName', 'businessType', 'registrationNumber', 'taxId', 'contactPerson', 'email'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    const missingDocs = Object.entries(uploadedDocs).filter(([_, uploaded]) => !uploaded);
    if (missingDocs.length > 0) {
      toast.error('Please upload all required documents');
      return;
    }

    toast.success('Onboarding application submitted successfully! You will be notified once reviewed.');
    onStatusChange('pending');
  };

  const documentTypes = [
    { key: 'registration', label: 'Business Registration Certificate', required: true },
    { key: 'tax', label: 'Tax Identification Document', required: true },
    { key: 'bank', label: 'Bank Account Verification', required: true },
    { key: 'kyc', label: 'KYC Compliance Documents', required: true },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>Vendor Onboarding</span>
          </CardTitle>
          <CardDescription>
            Complete your vendor registration to start submitting invoices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  placeholder="Enter company name"
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type *</Label>
                <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                  <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corporation">Corporation</SelectItem>
                    <SelectItem value="llc">LLC</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="sole_proprietorship">Sole Proprietorship</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="registrationNumber">Registration Number *</Label>
                <Input
                  id="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                  placeholder="Enter registration number"
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxId">Tax ID *</Label>
                <Input
                  id="taxId"
                  value={formData.taxId}
                  onChange={(e) => handleInputChange('taxId', e.target.value)}
                  placeholder="Enter tax identification number"
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Business Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter complete business address"
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person *</Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                  placeholder="Enter contact person name"
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter phone number"
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter email address"
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name</Label>
                <Input
                  id="bankName"
                  value={formData.bankName}
                  onChange={(e) => handleInputChange('bankName', e.target.value)}
                  placeholder="Enter bank name"
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  value={formData.accountNumber}
                  onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                  placeholder="Enter account number"
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="routingNumber">Routing Number</Label>
                <Input
                  id="routingNumber"
                  value={formData.routingNumber}
                  onChange={(e) => handleInputChange('routingNumber', e.target.value)}
                  placeholder="Enter routing number"
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Document Upload</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documentTypes.map((doc) => (
                  <Card key={doc.key} className="border-2 border-dashed border-gray-200 hover:border-blue-300 transition-colors">
                    <CardContent className="p-4">
                      <div className="text-center space-y-2">
                        {uploadedDocs[doc.key] ? (
                          <CheckCircle className="w-8 h-8 text-green-500 mx-auto" />
                        ) : (
                          <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                        )}
                        <p className="text-sm font-medium text-gray-900">
                          {doc.label} {doc.required && '*'}
                        </p>
                        <Button
                          type="button"
                          variant={uploadedDocs[doc.key] ? "secondary" : "outline"}
                          size="sm"
                          onClick={() => handleFileUpload(doc.key)}
                          className="w-full"
                        >
                          {uploadedDocs[doc.key] ? 'Uploaded' : 'Upload File'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <Button 
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                Submit Onboarding Application
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorOnboarding;
