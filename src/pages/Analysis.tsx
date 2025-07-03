
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const Analysis = () => {
  const categoryData = [
    { name: 'Purchased Goods', value: 5602, percentage: 45 },
    { name: 'Transportation', value: 3112, percentage: 25 },
    { name: 'Business Travel', value: 1867, percentage: 15 },
    { name: 'Employee Commuting', value: 1245, percentage: 10 },
    { name: 'Other', value: 624, percentage: 5 },
  ];

  const monthlyData = [
    { month: 'Jan', emissions: 980, target: 1000 },
    { month: 'Feb', emissions: 1120, target: 1000 },
    { month: 'Mar', emissions: 1050, target: 1000 },
    { month: 'Apr', emissions: 1180, target: 1000 },
    { month: 'May', emissions: 1090, target: 1000 },
    { month: 'Jun', emissions: 1030, target: 1000 },
  ];

  const supplierData = [
    { supplier: 'Supplier A', emissions: 2500, risk: 'High' },
    { supplier: 'Supplier B', emissions: 1800, risk: 'Medium' },
    { supplier: 'Supplier C', emissions: 1200, risk: 'Low' },
    { supplier: 'Supplier D', emissions: 900, risk: 'Low' },
    { supplier: 'Supplier E', emissions: 650, risk: 'Medium' },
  ];

  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="min-h-screen bg-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Emission Analysis</h1>
          <p className="text-slate-300">Detailed analysis of your Scope 3 emissions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="bg-slate-700 border-slate-600">
            <CardHeader>
              <CardTitle className="text-white">Emissions by Category</CardTitle>
              <CardDescription className="text-slate-300">
                Distribution of emissions across Scope 3 categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#374151',
                      border: '1px solid #4B5563',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-slate-700 border-slate-600">
            <CardHeader>
              <CardTitle className="text-white">Monthly Emissions Trend</CardTitle>
              <CardDescription className="text-slate-300">
                Emissions vs. targets over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#374151',
                      border: '1px solid #4B5563',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }}
                  />
                  <Line type="monotone" dataKey="emissions" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="target" stroke="#EF4444" strokeWidth={2} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-700 border-slate-600">
            <CardHeader>
              <CardTitle className="text-white">Top Emitting Suppliers</CardTitle>
              <CardDescription className="text-slate-300">
                Suppliers ranked by emission contribution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={supplierData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                  <XAxis type="number" stroke="#9CA3AF" />
                  <YAxis dataKey="supplier" type="category" stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#374151',
                      border: '1px solid #4B5563',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }}
                  />
                  <Bar dataKey="emissions" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-slate-700 border-slate-600">
            <CardHeader>
              <CardTitle className="text-white">Key Insights</CardTitle>
              <CardDescription className="text-slate-300">
                Important findings from your data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-600 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-400 mb-2">Highest Impact Category</h3>
                <p className="text-slate-200">Purchased Goods & Services accounts for 45% of total emissions</p>
              </div>
              <div className="bg-slate-600 p-4 rounded-lg">
                <h3 className="font-semibold text-orange-400 mb-2">Target Performance</h3>
                <p className="text-slate-200">Currently 12% above monthly emission targets</p>
              </div>
              <div className="bg-slate-600 p-4 rounded-lg">
                <h3 className="font-semibold text-green-400 mb-2">Improvement Opportunity</h3>
                <p className="text-slate-200">Focus on top 3 suppliers for 65% emission reduction potential</p>
              </div>
              <div className="bg-slate-600 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-400 mb-2">Trend Analysis</h3>
                <p className="text-slate-200">Emissions have increased 8.5% compared to last quarter</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
