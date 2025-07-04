import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepWizardProps {
  currentStep: number;
  totalSteps?: number;
}

const steps = [
  { number: 1, label: 'Category & Supplier' },
  { number: 2, label: 'Activity Description' },
  { number: 3, label: 'Quantity & Unit' },
  { number: 4, label: 'Emission Factor & Notes' },
  { number: 5, label: 'Review & Submit' },
];

const StepWizard: React.FC<StepWizardProps> = ({ currentStep, totalSteps = 5 }) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all",
                  step.number < currentStep
                    ? "bg-primary text-primary-foreground border-primary"
                    : step.number === currentStep
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted text-muted-foreground border-muted-foreground/30"
                )}
              >
                {step.number < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.number
                )}
              </div>
              <div className="mt-2 text-center">
                {/* Show full label on larger screens */}
                <span className={cn(
                  "hidden md:block text-xs font-medium",
                  step.number === currentStep ? "text-primary font-bold" : "text-muted-foreground"
                )}>
                  {step.label}
                </span>
                {/* Show only step number on small screens */}
                <span className={cn(
                  "md:hidden text-xs font-medium",
                  step.number === currentStep ? "text-primary font-bold" : "text-muted-foreground"
                )}>
                  Step {step.number}
                </span>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-2 transition-all",
                  step.number < currentStep ? "bg-primary" : "bg-muted-foreground/30"
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepWizard;