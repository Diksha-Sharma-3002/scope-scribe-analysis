
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AddEmissionDataForm from '@/components/AddEmissionDataForm';
import BatchUpload from '@/components/BatchUpload';

const DataInput = () => {
  const [activeTab, setActiveTab] = useState('manual');

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Emission Data Input</h1>
          <p className="text-muted-foreground">Enter your Scope 3 emission data for analysis</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            <TabsTrigger value="batch">Batch Upload</TabsTrigger>
          </TabsList>
          
          <TabsContent value="manual" className="mt-6">
            <AddEmissionDataForm />
          </TabsContent>
          
          <TabsContent value="batch" className="mt-6">
            <BatchUpload />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DataInput;
