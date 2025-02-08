// app/InvestorsContext.tsx
"use client"
import { createContext, useContext, useState, ReactNode } from 'react';

type InvestorsContextType = {
  investors: any[];
  setInvestors2: (investors: any[]) => void;
};

const InvestorsContext = createContext<InvestorsContextType | undefined>(undefined);

export const InvestorsProvider = ({ children }: { children: ReactNode }) => {
  const [investors, setInvestors2] = useState<any[]>([]);

  return (
    <InvestorsContext.Provider value={{ investors, setInvestors2 }}>
      {children}
    </InvestorsContext.Provider>
  );
};

export const useInvestors = () => {
  const context:any = useContext(InvestorsContext);
  if (!context) {
    throw new Error("useInvestors must be used within an InvestorsProvider");
  }
  return context;
};
