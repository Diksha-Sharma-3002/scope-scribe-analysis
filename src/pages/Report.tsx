
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download, Calendar, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Report = () => {
  const { toast } = useToast();
  const [reportType, setReportType] = useState('');
  const [reportPeriod, setReportPeriod] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = async () => {
    if (!reportType || !reportPeriod) {
      toast({
        title: "Missing Information",
        description: "Please select both report type and period",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Report Generated Successfully",
        description: `${reportType} report for ${reportPeriod} is ready for download`,
      });
    }, 3000);
  };

  const reportTemplates = [
    {
      title: 'Executive Summary',
      description: 'High-level overview of emissions performance',
      icon: BarChart3,
      color: 'text-blue-400',
    },
    {
      title: 'Detailed Analysis',
      description: 'Comprehensive breakdown by category and supplier',
      icon: FileText,
      color: 'text-green-400',
    },
    {
      title: 'Compliance Report',
      description: 'Formatted for regulatory submissions',
      icon: Calendar,
      color: 'text-purple-400',
    },
    {
      title: 'Action Plan',
      description: 'Recommended actions for emission reduction',
      icon: Download,
      color: 'text-orange-400',
    },
  ];

  const sampleReportData = {
    summary: {
      totalEmissions: 12450,
      categories: 15,
      suppliers: 84,
      period: 'Q2 2024'
    },
    topCategories: [
      { name: 'Purchased Goods & Services', emissions: 5602, percentage: 45 },
      { name: 'Transportation & Distribution', emissions: 3112, percentage: 25 },
      { name: 'Business Travel', emissions: 1867, percentage: 15 },
    ],
    recommendations: [
      'Engage with top 5 suppliers to set emission reduction targets',
      'Implement green procurement policies for office supplies',
      'Optimize logistics routes to reduce transportation emissions',
      'Encourage remote work to reduce business travel',
    ]
  };

  return (
    <div className="min-h-screen bg-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Report Generation</h1>
          <p className="text-slate-300">Generate comprehensive emission reports and analysis</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-slate-700 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white">Generate Report</CardTitle>
                <CardDescription className="text-slate-300">
                  Create custom emission reports
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-200">Report Type</label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-600 border-slate-500">
                      <SelectItem value="executive" className="text-white hover:bg-slate-500">Executive Summary</SelectItem>
                      <SelectItem value="detailed" className="text-white hover:bg-slate-500">Detailed Analysis</SelectItem>
                      <SelectItem value="compliance" className="text-white hover:bg-slate-500">Compliance Report</SelectItem>
                      <SelectItem value="action" className="text-white hover:bg-slate-500">Action Plan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-200">Report Period</label>
                  <Select value={reportPeriod} onValueChange={setReportPeriod}>
                    <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-600 border-slate-500">
                      <SelectItem value="current-month" className="text-white hover:bg-slate-500">Current Month</SelectItem>
                      <SelectItem value="current-quarter" className="text-white hover:bg-slate-500">Current Quarter</SelectItem>
                      <SelectItem value="current-year" className="text-white hover:bg-slate-500">Current Year</SelectItem>
                      <SelectItem value="custom" className="text-white hover:bg-slate-500">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleGenerateReport}
                  disabled={isGenerating}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isGenerating ? 'Generating...' : 'Generate Report'}
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-700 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white">Report Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {reportTemplates.map((template, index) => {
                  const Icon = template.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-slate-600 rounded-lg">
                      <Icon className={`h-5 w-5 ${template.color}`} />
                      <div>
                        <h4 className="text-sm font-medium text-white">{template.title}</h4>
                        <p className="text-xs text-slate-300">{template.description}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="bg-slate-700 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white">Report Preview</CardTitle>
                <CardDescription className="text-slate-300">
                  Sample report based on current data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border-b border-slate-600 pb-4">
                    <h3 className="text-lg font-semibold text-white mb-4">Executive Summary</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-slate-600 p-3 rounded-lg">
                        <div className="text-2xl font-bold text-blue-400">{sampleReportData.summary.totalEmissions.toLocaleString()}</div>
                        <div className="text-sm text-slate-300">Total tCO2e</div>
                      </div>
                      <div className="bg-slate-600 p-3 rounded-lg">
                        <div className="text-2xl font-bold text-green-400">{sampleReportData.summary.categories}</div>
                        <div className="text-sm text-slate-300">Categories</div>
                      </div>
                      <div className="bg-slate-600 p-3 rounded-lg">
                        <div className="text-2xl font-bold text-purple-400">{sampleReportData.summary.suppliers}</div>
                        <div className="text-sm text-slate-300">Suppliers</div>
                      </div>
                      <div className="bg-slate-600 p-3 rounded-lg">
                        <div className="text-2xl font-bold text-orange-400">{sampleReportData.summary.period}</div>
                        <div className="text-sm text-slate-300">Period</div>
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-slate-600 pb-4">
                    <h3 className="text-lg font-semibold text-white mb-4">Top Emission Categories</h3>
                    <div className="space-y-3">
                      {sampleReportData.topCategories.map((category, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-slate-200">{category.name}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-slate-300">{category.emissions.toLocaleString()} tCO2e</span>
                            <span className="text-blue-400">({category.percentage}%)</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Key Recommendations</h3>
                    <ul className="space-y-2">
                      {sampleReportData.recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <span className="text-slate-300">{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
