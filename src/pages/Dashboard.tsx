
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, Building } from 'lucide-react';

const Dashboard = () => {
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

  return (
    <div className="min-h-screen bg-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Scope 3 Emissions Dashboard</h1>
          <p className="text-slate-300">Monitor and analyze your supply chain emissions</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-700 border-slate-600">
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
              <CardTitle className="text-white">Quick Actions</CardTitle>
              <CardDescription className="text-slate-300">
                Get started with emission tracking
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                Add New Emission Data
              </button>
              <button className="w-full bg-slate-600 hover:bg-slate-500 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                Generate Report
              </button>
              <button className="w-full bg-slate-600 hover:bg-slate-500 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                View Analytics
              </button>
              <button className="w-full bg-slate-600 hover:bg-slate-500 text-white font-medium py-3 px-4 rounded-lg transition-colors">
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
