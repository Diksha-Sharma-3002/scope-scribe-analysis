import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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

interface DataPreviewProps {
  data: EmissionRecord[];
  onSubmit: () => void;
  onReupload: () => void;
}

const DataPreview: React.FC<DataPreviewProps> = ({ data, onSubmit, onReupload }) => {
  // Calculate total emissions
  const totalEmissions = data.reduce((sum, record) => {
    return sum + (record.quantity * record.emission_factor);
  }, 0);

  // Show first 3 records for preview
  const previewData = data.slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Preview</CardTitle>
        <CardDescription>
          Review your parsed data before submitting ({data.length} records found)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-muted rounded-lg p-4">
            <div className="text-sm text-muted-foreground">Total Records</div>
            <div className="text-2xl font-bold">{data.length}</div>
          </div>
          <div className="bg-muted rounded-lg p-4">
            <div className="text-sm text-muted-foreground">Total Emissions</div>
            <div className="text-2xl font-bold">{totalEmissions.toFixed(2)} tCO2e</div>
          </div>
          <div className="bg-muted rounded-lg p-4">
            <div className="text-sm text-muted-foreground">Unique Suppliers</div>
            <div className="text-2xl font-bold">
              {new Set(data.map(record => record.supplier_name)).size}
            </div>
          </div>
        </div>

        {/* Data Preview Table */}
        <div>
          <h3 className="text-lg font-medium mb-4">Preview (First 3 Records)</h3>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Factor</TableHead>
                  <TableHead>Emissions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {previewData.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {record.scope3_category}
                    </TableCell>
                    <TableCell>{record.supplier_name}</TableCell>
                    <TableCell>{record.activity_description}</TableCell>
                    <TableCell>{record.reporting_period}</TableCell>
                    <TableCell>{record.quantity}</TableCell>
                    <TableCell>{record.unit}</TableCell>
                    <TableCell>{record.emission_factor}</TableCell>
                    <TableCell className="font-medium">
                      {(record.quantity * record.emission_factor).toFixed(2)} tCO2e
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {data.length > 3 && (
            <p className="text-sm text-muted-foreground mt-2">
              ... and {data.length - 3} more records
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button onClick={onSubmit} className="flex-1">
            Confirm & Submit All Data
          </Button>
          <Button onClick={onReupload} variant="outline">
            Reupload
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataPreview;