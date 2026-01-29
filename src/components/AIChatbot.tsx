import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

export default function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Hello! I am your ZoyaLegal AI Assistant. How can I help you today?',
            sender: 'ai',
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: input,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        try {
            // Map messages to the format expected by the API
            const apiMessages = [...messages, userMsg].map(m => ({
                role: m.sender === 'user' ? 'user' : 'assistant',
                content: m.text
            }));

            const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_BASE_URL}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages: apiMessages }),
            });

            if (!response.ok) throw new Error('Failed to connect to AI');

            const data = await response.json();

            const cleanResponse = data.content.replace(/<(?:HINDI|hindi)>|<\/(?:HINDI|hindi)>/g, "").trim();

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: cleanResponse,
                sender: 'ai',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiMsg]);
        } catch (err) {
            console.error('AI Error:', err);
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: "I'm having trouble connecting to my brain. Please try again in a moment!",
                sender: 'ai',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    const suggestions = [
        "How to register as an advocate?",
        "What is CSC Service?",
        "Apply for Gulf Visa",
        "Legal Documentation help"
    ];

    return (
        <div className="fixed bottom-6 right-6 z-[9999] font-sans">
            {/* Chat Bubble / FAB */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 group relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    <MessageSquare className="h-8 w-8 relative z-10" />
                    <div className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500"></span>
                    </div>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="bg-white w-[350px] md:w-[400px] h-[550px] rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-blue-50 flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300 slide-in-from-bottom-10">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="bg-white/20 p-2 rounded-xl">
                                <Bot className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Zoya AI</h3>
                                <div className="flex items-center text-[10px] uppercase tracking-widest opacity-80 font-bold">
                                    <span className="h-1.5 w-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
                                    Legal Assistant
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`flex items-end space-x-2 max-w-[85%]`}>
                                    {msg.sender === 'ai' && (
                                        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mb-1 border border-blue-200">
                                            <Bot className="h-4 w-4 text-blue-600" />
                                        </div>
                                    )}
                                    <div
                                        className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.sender === 'user'
                                            ? 'bg-blue-600 text-white rounded-br-none'
                                            : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="flex items-center space-x-2 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
                                    <div className="flex space-x-1">
                                        <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce"></div>
                                        <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce delay-75"></div>
                                        <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce delay-150"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-6 bg-white border-t border-gray-100">
                        {/* Suggestions */}
                        {messages.length < 3 && !isTyping && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {suggestions.map((s, i) => (
                                    <button
                                        key={i}
                                        onClick={() => { setInput(s); handleSend({ preventDefault: () => { } } as any); }}
                                        className="text-[10px] font-bold bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors border border-blue-100"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}

                        <form onSubmit={handleSend} className="relative">
                            <input
                                type="text"
                                placeholder="Ask me anything..."
                                className="w-full pl-5 pr-14 py-4 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 transition-all font-medium text-sm"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-2 p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg active:scale-95 disabled:bg-gray-300"
                                disabled={!input.trim() || isTyping}
                            >
                                <Send className="h-5 w-5" />
                            </button>
                        </form>
                        <p className="text-[10px] text-center text-gray-400 mt-4 flex items-center justify-center">
                            <Sparkles className="h-3 w-3 mr-1 text-blue-400" />
                            AI can make mistakes. Verify important info.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
