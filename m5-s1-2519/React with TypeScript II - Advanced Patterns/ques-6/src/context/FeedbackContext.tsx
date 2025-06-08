import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface FeedbackFormData {
  name: string;
  email: string;
  rating: number;
  feedback: string;
}

interface FeedbackContextType {
  data: FeedbackFormData;
  setData: (data: FeedbackFormData) => void;
}

const initialData: FeedbackFormData = {
  name: '',
  email: '',
  rating: 0,
  feedback: '',
};

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export const FeedbackProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<FeedbackFormData>(initialData);

  return (
    <FeedbackContext.Provider value={{ data, setData }}>
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = (): FeedbackContextType => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
};
