import React from 'react';
import { AppConfig } from '../models/AppConfig';

const AppConfigCtx = React.createContext<AppConfig | undefined>(undefined);

const AppConfigContextProvider: React.FC<AppConfig> = ({
  children,
  ...context
}) => <AppConfigCtx.Provider value={context}>{children}</AppConfigCtx.Provider>;

const useAppConfigContext = () => {
  const context = React.useContext(AppConfigCtx) as AppConfig;
  if (context === undefined) {
    throw new Error(
      'useAppConfigContext must be used within AppConfigContextProvider',
    );
  }

  return context;
};

export { useAppConfigContext, AppConfigContextProvider };
