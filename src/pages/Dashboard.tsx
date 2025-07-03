
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, Building, Award, TrendingDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Total Emissions',
      value: '12,450 tCO2e',
      change: '+2.3%',
      icon: BarChart3,
      color: 'text-blue-400',
    },
    {
      title: 'Categories Tracked',
      value: '15',
      change: '+1 new',
      icon: Building,
      color: 'text-green-400',
    },
    {
      title: 'Suppliers',
      value: '84',
      change: '+8.1%',
      icon: Users,
      color: 'text-purple-400',
    },
    {
      title: 'Reduction Target',
      value: '25%',
      change: 'by 2030',
      icon: TrendingUp,
      color: 'text-orange-400',
    },
  ];

  const topSuppliers = [
    {
      name: 'EcoTech Solutions',
      reduction: '35%',
      emissions: '450 tCO2e',
      rank: 1,
      trend: 'up'
    },
    {
      name: 'Green Manufacturing Co.',
      reduction: '28%',
      emissions: '680 tCO2e',
      rank: 2,
      trend: 'up'
    },
    {
      name: 'Sustainable Logistics Ltd',
      reduction: '22%',
      emissions: '820 tCO2e',
      rank: 3,
      trend: 'stable'
    },
    {
      name: 'Clean Energy Partners',
      reduction: '18%',
      emissions: '1,200 tCO2e',
      rank: 4,
      trend: 'up'
    },
    {
      name: 'Efficient Transport Inc',
      reduction: '15%',
      emissions: '1,450 tCO2e',
      rank: 5,
      trend: 'down'
    },
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Scope 3 Emissions Dashboard</h1>
            <p className="text-slate-300">Monitor and analyze your supply chain emissions</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-slate-700 border-slate-600">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-200">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <p className="text-xs text-slate-400">
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 bg-slate-700 border-slate-600">
            <CardHeader>
              <CardTitle className="text-white">Emission Categories</CardTitle>
              <CardDescription className="text-slate-300">
                Breakdown by Scope 3 categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { category: 'Purchased Goods & Services', percentage: 45, value: '5,602 tCO2e' },
                  { category: 'Transportation & Distribution', percentage: 25, value: '3,112 tCO2e' },
                  { category: 'Business Travel', percentage: 15, value: '1,867 tCO2e' },
                  { category: 'Employee Commuting', percentage: 10, value: '1,245 tCO2e' },
                  { category: 'Other Categories', percentage: 5, value: '624 tCO2e' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-200">{item.category}</span>
                        <span className="text-slate-300">{item.value}</span>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-2 mt-1">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-700 border-slate-600">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-yellow-400" />
                <CardTitle className="text-white">Top Suppliers</CardTitle>
              </div>
              <CardDescription className="text-slate-300">
                Ranked by emission reduction achievements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topSuppliers.map((supplier, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-600 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full text-white text-sm font-bold">
                      {supplier.rank}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{supplier.name}</p>
                      <p className="text-slate-400 text-xs">{supplier.emissions}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-400 text-sm font-medium">
                      -{supplier.reduction}
                    </span>
                    {supplier.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-400" />}
                    {supplier.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-400" />}
                    {supplier.trend === 'stable' && <div className="h-4 w-4 bg-yellow-400 rounded-full" />}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <Card className="bg-slate-700 border-slate-600">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
              <CardDescription className="text-slate-300">
                Get started with emission tracking
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                Add New Emission Data
              </button>
              <button className="bg-slate-600 hover:bg-slate-500 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                Generate Report
              </button>
              <button className="bg-slate-600 hover:bg-slate-500 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                View Analytics
              </button>
              <button className="bg-slate-600 hover:bg-slate-500 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                Export Data
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
