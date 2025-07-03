
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send, X, Bot } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your Scope 3 Emissions assistant. How can I help you navigate the app today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');

  const botResponses = {
    'dashboard': "The Dashboard shows your total emissions overview, categories breakdown, and top suppliers. You can access it from the navigation menu.",
    'data input': "Use the Data Input page to add new emission data for different categories like purchased goods, transportation, and business travel.",
    'analysis': "The Analysis page provides detailed charts and insights about your emission patterns and trends over time.",
    'report': "Generate comprehensive reports in the Reports section to export and share your emission data and analysis.",
    'suppliers': "View your top-performing suppliers ranked by emission reduction achievements on the Dashboard.",
    'help': "I can help you with: Dashboard navigation, Data Input, Analysis, Reports, and Supplier information. Just ask!",
    'default': "I can help you navigate through the app. Try asking about 'dashboard', 'data input', 'analysis', 'reports', or 'suppliers'."
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('dashboard')) return botResponses.dashboard;
    if (lowerMessage.includes('data') || lowerMessage.includes('input')) return botResponses['data input'];
    if (lowerMessage.includes('analysis') || lowerMessage.includes('chart')) return botResponses.analysis;
    if (lowerMessage.includes('report')) return botResponses.report;
    if (lowerMessage.includes('supplier')) return botResponses.suppliers;
    if (lowerMessage.includes('help')) return botResponses.help;
    
    return botResponses.default;
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    const botResponse: Message = {
      id: messages.length + 2,
      text: getBotResponse(inputText),
      isBot: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
    setInputText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg z-50"
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>

      {/* Chatbot Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 h-96 bg-slate-700 border-slate-600 shadow-xl z-40">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center space-x-2">
              <Bot className="h-5 w-5 text-blue-400" />
              <span>Emissions Assistant</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-full p-4 pt-0">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      message.isBot
                        ? 'bg-slate-600 text-slate-100'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="flex space-x-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 bg-slate-600 border-slate-500 text-white placeholder:text-slate-400"
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Chatbot;
