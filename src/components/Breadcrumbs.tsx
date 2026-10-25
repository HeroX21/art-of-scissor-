import React from 'react';
import { useSalon } from '../context/SalonContext';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const { navigate } = useSalon();

  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <ol className="flex items-center gap-2 text-xs text-neutral-400">
        <li>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            className="hover:text-[#D4AF37] transition-colors"
          >
            Home
          </a>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              <li aria-hidden="true" className="text-neutral-600">
                /
              </li>
              <li>
                {isLast || !item.href ? (
                  <span className="text-neutral-200 font-medium" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.href!);
                    }}
                    className="hover:text-[#D4AF37] transition-colors"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
