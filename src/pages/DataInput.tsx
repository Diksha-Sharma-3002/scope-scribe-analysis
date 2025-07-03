
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const DataInput = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    category: '',
    supplier: '',
    activity: '',
    quantity: '',
    unit: '',
    emissionFactor: '',
    description: '',
    period: '',
  });

  const categories = [
    'Purchased Goods & Services',
    'Capital Goods',
    'Fuel & Energy Related Activities',
    'Upstream Transportation & Distribution',
    'Waste Generated in Operations',
    'Business Travel',
    'Employee Commuting',
    'Upstream Leased Assets',
    'Downstream Transportation & Distribution',
    'Processing of Sold Products',
    'Use of Sold Products',
    'End-of-Life Treatment of Sold Products',
    'Downstream Leased Assets',
    'Franchises',
    'Investments',
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate emissions
    const quantity = parseFloat(formData.quantity);
    const emissionFactor = parseFloat(formData.emissionFactor);
    const totalEmissions = quantity * emissionFactor;

    console.log('Emission data submitted:', { ...formData, totalEmissions });
    
    toast({
      title: "Data Submitted Successfully",
      description: `Total emissions: ${totalEmissions.toFixed(2)} tCO2e`,
    });

    // Reset form
    setFormData({
      category: '',
      supplier: '',
      activity: '',
      quantity: '',
      unit: '',
      emissionFactor: '',
      description: '',
      period: '',
    });
  };

  return (
    <div className="min-h-screen bg-slate-800 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Emission Data Input</h1>
          <p className="text-slate-300">Enter your Scope 3 emission data for analysis</p>
        </div>

        <Card className="bg-slate-700 border-slate-600">
          <CardHeader>
            <CardTitle className="text-white">Add Emission Data</CardTitle>
            <CardDescription className="text-slate-300">
              Fill in the details for your emission activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-slate-200">Scope 3 Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-600 border-slate-500">
                      {categories.map((category) => (
                        <SelectItem key={category} value={category} className="text-white hover:bg-slate-500">
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supplier" className="text-slate-200">Supplier/Source</Label>
                  <Input
                    id="supplier"
                    value={formData.supplier}
                    onChange={(e) => handleInputChange('supplier', e.target.value)}
                    placeholder="Enter supplier name"
                    className="bg-slate-600 border-slate-500 text-white placeholder-slate-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="activity" className="text-slate-200">Activity Description</Label>
                  <Input
                    id="activity"
                    value={formData.activity}
                    onChange={(e) => handleInputChange('activity', e.target.value)}
                    placeholder="e.g., Office supplies purchase"
                    className="bg-slate-600 border-slate-500 text-white placeholder-slate-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="period" className="text-slate-200">Reporting Period</Label>
                  <Input
                    id="period"
                    type="month"
                    value={formData.period}
                    onChange={(e) => handleInputChange('period', e.target.value)}
                    className="bg-slate-600 border-slate-500 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-slate-200">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    step="0.01"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange('quantity', e.target.value)}
                    placeholder="Enter quantity"
                    className="bg-slate-600 border-slate-500 text-white placeholder-slate-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit" className="text-slate-200">Unit</Label>
                  <Select value={formData.unit} onValueChange={(value) => handleInputChange('unit', value)}>
                    <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-600 border-slate-500">
                      <SelectItem value="kg" className="text-white hover:bg-slate-500">kg</SelectItem>
                      <SelectItem value="tonnes" className="text-white hover:bg-slate-500">tonnes</SelectItem>
                      <SelectItem value="liters" className="text-white hover:bg-slate-500">liters</SelectItem>
                      <SelectItem value="kwh" className="text-white hover:bg-slate-500">kWh</SelectItem>
                      <SelectItem value="km" className="text-white hover:bg-slate-500">km</SelectItem>
                      <SelectItem value="usd" className="text-white hover:bg-slate-500">USD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="emissionFactor" className="text-slate-200">Emission Factor (tCO2e/unit)</Label>
                  <Input
                    id="emissionFactor"
                    type="number"
                    step="0.000001"
                    value={formData.emissionFactor}
                    onChange={(e) => handleInputChange('emissionFactor', e.target.value)}
                    placeholder="Enter emission factor"
                    className="bg-slate-600 border-slate-500 text-white placeholder-slate-400"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description" className="text-slate-200">Additional Notes</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Any additional information about this emission source..."
                    className="bg-slate-600 border-slate-500 text-white placeholder-slate-400"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Submit Data
                </Button>
                <Button type="button" variant="outline" className="border-slate-500 text-slate-200 hover:bg-slate-600">
                  Save as Draft
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataInput;
