import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  BusinessConfig,
  SalonPackage,
  INITIAL_BUSINESS_CONFIG,
  MENS_PACKAGES,
  WOMENS_PACKAGES
} from '../config/salonConfig';

interface SalonContextType {
  config: BusinessConfig;
  updateConfig: (updates: Partial<BusinessConfig>) => void;
  mensPackages: SalonPackage[];
  womensPackages: SalonPackage[];
  updatePackage: (id: string, updates: Partial<SalonPackage>) => void;
  activeRoute: string;
  navigate: (route: string) => void;
  isAppointmentModalOpen: boolean;
  openAppointmentModal: (prefill?: string) => void;
  closeAppointmentModal: () => void;
  selectedPrefill: string | null;
  isOwnerModalOpen: boolean;
  openOwnerModal: () => void;
  closeOwnerModal: () => void;
  isOwnerAuthenticated: boolean;
  loginOwner: (pin: string) => boolean;
  logoutOwner: () => void;
}

const SalonContext = createContext<SalonContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CONFIG: 'aos_salon_config_v1',
  MENS_PKGS: 'aos_mens_pkgs_v1',
  WOMENS_PKGS: 'aos_womens_pkgs_v1',
  AUTH: 'aos_owner_auth_v1'
};

export const SalonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load configuration from localStorage or initial defaults
  const [config, setConfig] = useState<BusinessConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
      if (saved) return { ...INITIAL_BUSINESS_CONFIG, ...JSON.parse(saved) };
    } catch {
      // fallback
    }
    return INITIAL_BUSINESS_CONFIG;
  });

  const [mensPackages, setMensPackages] = useState<SalonPackage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MENS_PKGS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return MENS_PACKAGES;
  });

  const [womensPackages, setWomensPackages] = useState<SalonPackage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WOMENS_PKGS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return WOMENS_PACKAGES;
  });

  // Owner authentication state
  const [isOwnerAuthenticated, setIsOwnerAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // Modal states
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [selectedPrefill, setSelectedPrefill] = useState<string | null>(null);
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);

  // Client SPA Route state based on window.location.pathname
  const [activeRoute, setActiveRoute] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      return path && path !== '' ? path : '/';
    }
    return '/';
  });

  // Browser navigation sync
  useEffect(() => {
    const handlePopState = () => {
      setActiveRoute(window.location.pathname || '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (route: string) => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname !== route) {
        window.history.pushState({}, '', route);
      }
      setActiveRoute(route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const updateConfig = (updates: Partial<BusinessConfig>) => {
    setConfig(prev => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(next));
      } catch {
        // storage err
      }
      return next;
    });
  };

  const updatePackage = (id: string, updates: Partial<SalonPackage>) => {
    setMensPackages(prev => {
      const updated = prev.map(p => (p.id === id ? { ...p, ...updates } : p));
      try {
        localStorage.setItem(STORAGE_KEYS.MENS_PKGS, JSON.stringify(updated));
      } catch {}
      return updated;
    });

    setWomensPackages(prev => {
      const updated = prev.map(p => (p.id === id ? { ...p, ...updates } : p));
      try {
        localStorage.setItem(STORAGE_KEYS.WOMENS_PKGS, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const openAppointmentModal = (prefill?: string) => {
    setSelectedPrefill(prefill || null);
    setIsAppointmentModalOpen(true);
  };

  const closeAppointmentModal = () => {
    setIsAppointmentModalOpen(false);
    setSelectedPrefill(null);
  };

  const openOwnerModal = () => setIsOwnerModalOpen(true);
  const closeOwnerModal = () => setIsOwnerModalOpen(false);

  const loginOwner = (pin: string): boolean => {
    if (pin.trim() === config.adminPin.trim()) {
      setIsOwnerAuthenticated(true);
      try {
        localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      } catch {}
      return true;
    }
    return false;
  };

  const logoutOwner = () => {
    setIsOwnerAuthenticated(false);
    try {
      localStorage.removeItem(STORAGE_KEYS.AUTH);
    } catch {}
  };

  return (
    <SalonContext.Provider
      value={{
        config,
        updateConfig,
        mensPackages,
        womensPackages,
        updatePackage,
        activeRoute,
        navigate,
        isAppointmentModalOpen,
        openAppointmentModal,
        closeAppointmentModal,
        selectedPrefill,
        isOwnerModalOpen,
        openOwnerModal,
        closeOwnerModal,
        isOwnerAuthenticated,
        loginOwner,
        logoutOwner
      }}
    >
      {children}
    </SalonContext.Provider>
  );
};

export const useSalon = () => {
  const context = useContext(SalonContext);
  if (!context) {
    throw new Error('useSalon must be used within a SalonProvider');
  }
  return context;
};
