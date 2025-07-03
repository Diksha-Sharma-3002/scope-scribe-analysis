
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, FileText, Home, Calculator } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/input', label: 'Data Input', icon: Calculator },
    { path: '/analysis', label: 'Analysis', icon: BarChart3 },
    { path: '/report', label: 'Reports', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-slate-800">
      <nav className="bg-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-blue-400">Scope 3 Emissions Tracker</h1>
              </div>
              <div className="hidden md:block ml-10">
                <div className="flex items-baseline space-x-4">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 transition-colors ${
                          location.pathname === item.path
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                        }`}
                      >
                        <Icon size={16} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;
