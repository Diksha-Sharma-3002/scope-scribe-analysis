import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import StepWizard from '@/components/StepWizard';
import { cn } from '@/lib/utils';

const emissionSchema = z.object({
  category: z.string().min(1, "Scope 3 category is required"),
  supplier: z.string().min(3, "Supplier/Source must be at least 3 characters"),
  activity: z.string().min(1, "Activity description is required"),
  period: z.string().min(1, "Reporting period is required"),
  quantity: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0;
  }, "Quantity must be a number greater than 0"),
  unit: z.string().min(1, "Unit is required"),
  emissionFactor: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, "Emission factor must be a number greater than or equal to 0"),
  description: z.string().optional(),
});

type EmissionFormData = z.infer<typeof emissionSchema>;

const AddEmissionDataForm = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);

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

  const units = ['kg', 'tonnes', 'liters', 'kwh', 'km', 'usd'];

  const form = useForm<EmissionFormData>({
    resolver: zodResolver(emissionSchema),
    defaultValues: {
      category: '',
      supplier: '',
      activity: '',
      period: '',
      quantity: '',
      unit: '',
      emissionFactor: '',
      description: '',
    },
    mode: 'onBlur',
  });

  const { handleSubmit, trigger, formState: { errors } } = form;

  const onSubmit = (data: EmissionFormData) => {
    const quantity = parseFloat(data.quantity);
    const emissionFactor = parseFloat(data.emissionFactor);
    const totalEmissions = quantity * emissionFactor;

    console.log('Emission data submitted:', { ...data, totalEmissions });
    
    toast({
      title: "Data Submitted Successfully",
      description: `Total emissions: ${totalEmissions.toFixed(2)} tCO2e`,
    });

    form.reset();
    setCurrentStep(1);
  };

  const handleNext = async () => {
    let fieldsToValidate: (keyof EmissionFormData)[] = [];
    
    switch (currentStep) {
      case 1:
        fieldsToValidate = ['category', 'supplier'];
        break;
      case 2:
        fieldsToValidate = ['activity', 'period'];
        break;
      case 3:
        fieldsToValidate = ['quantity', 'unit'];
        break;
      case 4:
        fieldsToValidate = ['emissionFactor'];
        break;
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scope 3 Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className={cn(
                        errors.category && "border-destructive"
                      )}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="supplier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supplier/Source</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter supplier name"
                      className={cn(
                        errors.supplier && "border-destructive"
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="activity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Activity Description</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g., Office supplies purchase"
                      className={cn(
                        errors.activity && "border-destructive"
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="period"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reporting Period</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="month"
                      className={cn(
                        errors.period && "border-destructive"
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      step="0.01"
                      placeholder="Enter quantity"
                      className={cn(
                        errors.quantity && "border-destructive"
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className={cn(
                        errors.unit && "border-destructive"
                      )}>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {units.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="emissionFactor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emission Factor (tCO2e/unit)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      step="0.000001"
                      placeholder="Enter emission factor"
                      className={cn(
                        errors.emissionFactor && "border-destructive"
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Any additional information about this emission source..."
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 5:
        const formData = form.getValues();
        const quantity = parseFloat(formData.quantity || '0');
        const emissionFactor = parseFloat(formData.emissionFactor || '0');
        const totalEmissions = quantity * emissionFactor;

        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Review Your Data</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><strong>Category:</strong> {formData.category}</div>
              <div><strong>Supplier:</strong> {formData.supplier}</div>
              <div><strong>Activity:</strong> {formData.activity}</div>
              <div><strong>Period:</strong> {formData.period}</div>
              <div><strong>Quantity:</strong> {formData.quantity} {formData.unit}</div>
              <div><strong>Emission Factor:</strong> {formData.emissionFactor} tCO2e/unit</div>
              <div className="md:col-span-2"><strong>Notes:</strong> {formData.description || 'None'}</div>
              <div className="md:col-span-2 text-lg font-semibold text-primary">
                <strong>Total Emissions: {totalEmissions.toFixed(2)} tCO2e</strong>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Emission Data</CardTitle>
        <CardDescription>
          Complete the 5-step process to submit your emission data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <StepWizard currentStep={currentStep} />
        
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {renderStep()}

            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                Back
              </Button>

              {currentStep < 5 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                >
                  Submit Data
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddEmissionDataForm;