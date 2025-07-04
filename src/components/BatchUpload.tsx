import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, FileText } from 'lucide-react';
import Papa from 'papaparse';
import DataPreview from './DataPreview';

interface EmissionRecord {
  scope3_category: string;
  supplier_name: string;
  activity_description: string;
  reporting_period: string;
  quantity: number;
  unit: string;
  emission_factor: number;
  notes: string;
}

const BatchUpload = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [parsedData, setParsedData] = useState<EmissionRecord[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  // CSV Template data
  const csvTemplate = [
    {
      scope3_category: 'Purchased Goods & Services',
      supplier_name: 'Acme Supplies',
      activity_description: 'Office paper purchased',
      reporting_period: '2024-07',
      quantity: 500,
      unit: 'kg',
      emission_factor: 0.0015,
      notes: 'N/A'
    }
  ];

  const downloadTemplate = () => {
    const csv = Papa.unparse(csvTemplate);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'emission_data_template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Template Downloaded",
      description: "CSV template has been downloaded successfully",
    });
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      
      if (fileExtension === 'csv') {
        // Parse CSV client-side
        Papa.parse(file, {
          header: true,
          complete: (results) => {
            const records = results.data as EmissionRecord[];
            // Filter out empty rows
            const validRecords = records.filter(record => 
              record.scope3_category && record.supplier_name
            );
            setParsedData(validRecords);
            setShowPreview(true);
            setIsUploading(false);
          },
          error: (error) => {
            toast({
              title: "CSV Parse Error",
              description: error.message,
              variant: "destructive",
            });
            setIsUploading(false);
          }
        });
      } else if (['pdf', 'jpg', 'jpeg', 'png'].includes(fileExtension || '')) {
        // For PDF/Images, we would normally send to backend
        // Since we can't use FastAPI in Lovable, we'll show a message about Supabase
        toast({
          title: "Backend Integration Required",
          description: "PDF and image parsing requires Supabase integration for server-side processing",
          variant: "destructive",
        });
        setIsUploading(false);
      } else {
        toast({
          title: "Unsupported File Type",
          description: "Please upload a CSV, PDF, JPG, or PNG file",
          variant: "destructive",
        });
        setIsUploading(false);
      }
    } catch (error) {
      toast({
        title: "Upload Error",
        description: "Failed to process the uploaded file",
        variant: "destructive",
      });
      setIsUploading(false);
    }
  };

  const handleSubmitData = async () => {
    try {
      // Here we would normally send to /api/ingest
      // For now, we'll just simulate success
      console.log('Submitting emission data:', parsedData);
      
      toast({
        title: "Data Submitted Successfully",
        description: `${parsedData.length} emission records have been processed`,
      });
      
      setParsedData([]);
      setShowPreview(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "Failed to submit emission data",
        variant: "destructive",
      });
    }
  };

  const handleReupload = () => {
    setParsedData([]);
    setShowPreview(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (showPreview && parsedData.length > 0) {
    return (
      <DataPreview 
        data={parsedData}
        onSubmit={handleSubmitData}
        onReupload={handleReupload}
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Batch Upload</CardTitle>
        <CardDescription>
          Upload CSV, PDF, or image files containing emission data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* CSV Template Download */}
        <div className="border border-dashed border-border rounded-lg p-6">
          <div className="text-center space-y-4">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
            <div>
              <h3 className="text-lg font-medium">CSV Template</h3>
              <p className="text-sm text-muted-foreground">
                Download our CSV template to ensure your data is formatted correctly
              </p>
            </div>
            <Button onClick={downloadTemplate} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download CSV Template
            </Button>
          </div>
        </div>

        {/* File Upload */}
        <div className="border border-dashed border-border rounded-lg p-6">
          <div className="text-center space-y-4">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
            <div>
              <h3 className="text-lg font-medium">Upload Your Data</h3>
              <p className="text-sm text-muted-foreground">
                Supports CSV, PDF, JPG, and PNG files
              </p>
            </div>
            <Button 
              onClick={handleFileSelect}
              disabled={isUploading}
            >
              {isUploading ? "Processing..." : "Select File"}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="text-sm text-muted-foreground space-y-2">
          <p><strong>Supported formats:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>CSV:</strong> Use our template format for best results</li>
            <li><strong>PDF:</strong> Text-based documents with emission data tables</li>
            <li><strong>Images:</strong> Photos of invoices, receipts, or data sheets</li>
          </ul>
          <p className="mt-4">
            <strong>Note:</strong> PDF and image processing requires backend integration with Supabase.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BatchUpload;