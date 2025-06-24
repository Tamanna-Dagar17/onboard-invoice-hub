
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, CalendarDays, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

const InvoiceSubmission = () => {
  const [invoiceData, setInvoiceData] = useState({
    poNumber: '',
    invoiceNumber: '',
    invoiceDate: '',
    dueDate: '',
    amount: '',
    description: '',
    taxAmount: '',
    totalAmount: '',
  });

  const [attachments, setAttachments] = useState<{[key: string]: boolean}>({
    invoice: false,
    receipt: false,
    delivery: false,
  });

  // Mock PO data
  const mockPOs = [
    { number: 'PO-2024-001', vendor: 'ABC Corp', amount: '$5,000', items: 'Office Supplies' },
    { number: 'PO-2024-002', vendor: 'XYZ Ltd', amount: '$3,200', items: 'IT Equipment' },
    { number: 'PO-2024-003', vendor: 'DEF Inc', amount: '$7,800', items: 'Consulting Services' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setInvoiceData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-calculate total amount
      if (field === 'amount' || field === 'taxAmount') {
        const amount = parseFloat(updated.amount) || 0;
        const tax = parseFloat(updated.taxAmount) || 0;
        updated.totalAmount = (amount + tax).toFixed(2);
      }
      
      return updated;
    });
  };

  const handleFileUpload = (attachmentType: string) => {
    setAttachments(prev => ({ ...prev, [attachmentType]: true }));
    toast.success(`${attachmentType} file uploaded successfully`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const requiredFields = ['poNumber', 'invoiceNumber', 'invoiceDate', 'amount'];
    const missingFields = requiredFields.filter(field => !invoiceData[field as keyof typeof invoiceData]);
    
    if (missingFields.length > 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!attachments.invoice) {
      toast.error('Please upload the invoice document');
      return;
    }

    toast.success('Invoice submitted successfully! You will receive updates on the approval status.');
    
    // Reset form
    setInvoiceData({
      poNumber: '',
      invoiceNumber: '',
      invoiceDate: '',
      dueDate: '',
      amount: '',
      description: '',
      taxAmount: '',
      totalAmount: '',
    });
    setAttachments({
      invoice: false,
      receipt: false,
      delivery: false,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>Submit Invoice</span>
          </CardTitle>
          <CardDescription>
            Submit your invoice against an existing purchase order
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="poNumber">Purchase Order Number *</Label>
                <Select value={invoiceData.poNumber} onValueChange={(value) => handleInputChange('poNumber', value)}>
                  <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select PO Number" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockPOs.map((po) => (
                      <SelectItem key={po.number} value={po.number}>
                        {po.number} - {po.items} ({po.amount})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="invoiceNumber">Invoice Number *</Label>
                <Input
                  id="invoiceNumber"
                  value={invoiceData.invoiceNumber}
                  onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
                  placeholder="Enter invoice number"
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="invoiceDate">Invoice Date *</Label>
                <Input
                  id="invoiceDate"
                  type="date"
                  value={invoiceData.invoiceDate}
                  onChange={(e) => handleInputChange('invoiceDate', e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={invoiceData.dueDate}
                  onChange={(e) => handleInputChange('dueDate', e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Invoice Amount *</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={invoiceData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  placeholder="0.00"
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxAmount">Tax Amount</Label>
                <Input
                  id="taxAmount"
                  type="number"
                  step="0.01"
                  value={invoiceData.taxAmount}
                  onChange={(e) => handleInputChange('taxAmount', e.target.value)}
                  placeholder="0.00"
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="totalAmount">Total Amount</Label>
                <Input
                  id="totalAmount"
                  type="number"
                  value={invoiceData.totalAmount}
                  readOnly
                  className="bg-gray-50 transition-all duration-200"
                  placeholder="Calculated automatically"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={invoiceData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter invoice description or additional notes"
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Attachments</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-2 border-dashed border-gray-200 hover:border-blue-300 transition-colors">
                  <CardContent className="p-4">
                    <div className="text-center space-y-2">
                      <FileText className={`w-8 h-8 mx-auto ${attachments.invoice ? 'text-green-500' : 'text-gray-400'}`} />
                      <p className="text-sm font-medium text-gray-900">Invoice Document *</p>
                      <Button
                        type="button"
                        variant={attachments.invoice ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => handleFileUpload('invoice')}
                        className="w-full"
                      >
                        {attachments.invoice ? 'Uploaded' : 'Upload'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-dashed border-gray-200 hover:border-blue-300 transition-colors">
                  <CardContent className="p-4">
                    <div className="text-center space-y-2">
                      <FileText className={`w-8 h-8 mx-auto ${attachments.receipt ? 'text-green-500' : 'text-gray-400'}`} />
                      <p className="text-sm font-medium text-gray-900">Receipt/Proof</p>
                      <Button
                        type="button"
                        variant={attachments.receipt ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => handleFileUpload('receipt')}
                        className="w-full"
                      >
                        {attachments.receipt ? 'Uploaded' : 'Upload'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-dashed border-gray-200 hover:border-blue-300 transition-colors">
                  <CardContent className="p-4">
                    <div className="text-center space-y-2">
                      <FileText className={`w-8 h-8 mx-auto ${attachments.delivery ? 'text-green-500' : 'text-gray-400'}`} />
                      <p className="text-sm font-medium text-gray-900">Delivery Note</p>
                      <Button
                        type="button"
                        variant={attachments.delivery ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => handleFileUpload('delivery')}
                        className="w-full"
                      >
                        {attachments.delivery ? 'Uploaded' : 'Upload'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex justify-end">
              <Button 
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                Submit Invoice
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceSubmission;
