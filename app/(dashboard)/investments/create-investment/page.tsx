'use client';
import {
  CreateInvestmentForm,
  FormStepper,
} from '@/components/dashboard/investments';
import { useState } from 'react';

export default function CreateNewInvestmentpage() {
  const [step, setStep] = useState(1);
  return (
    <div className="flex gap-6 h-[calc(100vh-120px)] overflow-hidden">
      {/* Fixed Aside - Stepper */}
      <aside className="hidden lg:block lg:w-1/3 xl:w-1/4 overflow-y-auto border-r border-gray-200 pr-4">
        <div className="sticky top-0">
          <FormStepper activeStep={step} className="" />
        </div>
      </aside>

      {/* Main Content - Scrollable Form */}
      <main className="flex-1 overflow-y-auto pr-2">
        <CreateInvestmentForm step={step} setStep={(e) => setStep(e)} />
      </main>
    </div>
  );
}
