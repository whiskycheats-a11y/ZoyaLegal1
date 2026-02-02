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
            console.log(`[AI Request] Sending to ${API_BASE_URL}/api/chat`);

            const response = await fetch(`${API_BASE_URL}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages: apiMessages }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('[AI Error] Server responded with:', response.status, errorData);
                throw new Error(errorData.message || 'Failed to connect to AI');
            }

            const data = await response.json();
            console.log('[AI Success] Received response');

            if (!data.content) {
                console.error('[AI Error] Missing content in response:', data);
                throw new Error('AI response was empty');
            }

            const cleanResponse = data.content.replace(/<(?:HINDI|hindi)>|<\/(?:HINDI|hindi)>/g, "").trim();

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: cleanResponse,
                sender: 'ai',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiMsg]);
        } catch (err: any) {
            console.error('[AI Exception]:', err);
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: err.message === 'Failed to fetch'
                    ? "Server is not responding. Please make sure the backend is running on port 5000."
                    : `Error: ${err.message || "I'm having trouble connecting. Please try again later!"}`,
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
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9999] font-sans pointer-events-none">
            {/* Chat Bubble / FAB */}
            <div className="flex flex-col items-end space-y-4 pointer-events-auto">
                {isOpen && (
                    <div className="bg-white/90 backdrop-blur-2xl w-[calc(100vw-2rem)] md:w-[420px] h-[550px] md:h-[600px] max-h-[85vh] rounded-[2rem] md:rounded-[3rem] shadow-[0_25px_100px_rgba(37,99,235,0.2)] border border-white/50 flex flex-col overflow-hidden animate-in fade-in zoom-in duration-500 slide-in-from-bottom-10 origin-bottom-right">
                        {/* Header: Premium Glass Look */}
                        <div className="relative bg-black p-6 md:p-8 text-white overflow-hidden flex-shrink-0">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/30 rounded-full blur-3xl -mr-10 -mt-10"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl -ml-5 -mb-5"></div>

                            <div className="relative flex justify-between items-center z-10">
                                <div className="flex items-center space-x-3 md:space-x-4">
                                    <div className="relative">
                                        <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-2 md:p-3 rounded-2xl shadow-xl transform -rotate-6">
                                            <Bot className="h-6 w-6 md:h-7 md:w-7 text-white" />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 h-3 w-3 md:h-4 md:w-4 bg-green-500 border-2 border-black rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                                    </div>
                                    <div>
                                        <h3 className="font-black text-lg md:text-xl tracking-tighter uppercase italic line-clamp-1">Zoya AI Assistant_</h3>
                                        <div className="flex items-center text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-blue-400 mt-0.5">
                                            <Sparkles className="h-2.5 w-2.5 md:h-3 md:w-3 mr-1.5 animate-pulse" />
                                            Available 24/7_
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 md:p-3 hover:bg-white/10 rounded-2xl transition-all duration-300 transform hover:rotate-90 hover:scale-110 active:scale-90"
                                >
                                    <X className="h-5 w-5 md:h-6 md:w-6" />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area: Polished Scroller */}
                        <div className="flex-1 overflow-y-auto p-5 md:p-8 space-y-6 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/50 scroll-smooth">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-${msg.sender === 'user' ? 'right' : 'left'}-4 duration-500`}
                                >
                                    <div className={`flex items-start space-x-2 md:space-x-3 max-w-[92%]`}>
                                        {msg.sender === 'ai' && (
                                            <div className="h-7 w-7 md:h-9 md:w-9 bg-black rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 mt-1 border border-gray-800 shadow-md transform -rotate-12">
                                                <Bot className="h-4 w-4 md:h-5 md:w-5 text-white" />
                                            </div>
                                        )}
                                        <div
                                            className={`p-4 md:p-5 rounded-[1.5rem] md:rounded-[1.8rem] text-[13px] md:text-[15px] leading-relaxed shadow-[0_5px_15px_rgba(0,0,0,0.02)] border whitespace-pre-wrap ${msg.sender === 'user'
                                                ? 'bg-gradient-to-br from-black to-gray-800 text-white rounded-br-none border-gray-700 font-bold'
                                                : 'bg-white text-gray-800 rounded-bl-none border-gray-100 font-medium'
                                                }`}
                                        >
                                            {msg.text.split(/(\n)/g).map((line, li) => {
                                                // Handle Heading 3 (###)
                                                if (line.trim().startsWith('###')) {
                                                    return (
                                                        <div key={li} className="text-blue-600 font-black uppercase text-[11px] md:text-sm tracking-wider mt-4 mb-2 border-b border-blue-50 pb-1 flex items-center">
                                                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                                                            {line.replace(/^###\s*/, '').trim()}
                                                        </div>
                                                    );
                                                }

                                                // Handle parts of the line for bolding
                                                return (
                                                    <span key={li}>
                                                        {line.split(/(\*\*.*?\*\*)/g).map((part, i) => {
                                                            if (part.startsWith('**') && part.endsWith('**')) {
                                                                return (
                                                                    <strong key={i} className={`font-black ${msg.sender === 'user' ? 'text-blue-400' : (line.includes('###') ? 'text-blue-600' : 'text-black')}`}>
                                                                        {part.slice(2, -2)}
                                                                    </strong>
                                                                );
                                                            }
                                                            return part;
                                                        })}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start animate-pulse">
                                    <div className="flex items-center space-x-3 bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
                                        <div className="flex space-x-1.5">
                                            <div className="h-2 w-2 md:h-2.5 md:w-2.5 bg-blue-600 rounded-full animate-bounce"></div>
                                            <div className="h-2 w-2 md:h-2.5 md:w-2.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                            <div className="h-2 w-2 md:h-2.5 md:w-2.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area: Glass Action Bar */}
                        <div className="p-8 bg-white/70 backdrop-blur-md border-t border-gray-100">
                            {/* Smart Suggestions */}
                            {messages.length < 3 && !isTyping && (
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {suggestions.map((s, i) => (
                                        <button
                                            key={i}
                                            onClick={() => { setInput(s); handleSend({ preventDefault: () => { } } as any); }}
                                            className="text-[11px] font-black uppercase tracking-tighter bg-gray-50 text-gray-500 px-4 py-2.5 rounded-xl hover:bg-black hover:text-white hover:border-black transition-all border border-gray-200 shadow-sm transform hover:-translate-y-1 active:scale-95"
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            )}

                            <form onSubmit={handleSend} className="relative group">
                                <input
                                    type="text"
                                    placeholder="Type your message..."
                                    className="w-full pl-6 pr-16 py-5 bg-gray-50/80 backdrop-blur-sm rounded-[2rem] border-2 border-gray-100 focus:outline-none focus:border-black/10 focus:ring-8 focus:ring-blue-500/5 transition-all font-bold text-gray-800 placeholder:text-gray-400 shadow-inner"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2.5 top-2.5 p-4 bg-black text-white rounded-2xl hover:bg-blue-600 transition-all shadow-xl active:scale-95 disabled:bg-gray-200 disabled:shadow-none transform group-focus-within:scale-105"
                                    disabled={!input.trim() || isTyping}
                                >
                                    <Send className="h-5 w-5" />
                                </button>
                            </form>
                            <div className="mt-5 flex items-center justify-center space-x-2 text-[9px] font-black uppercase tracking-[0.1em] text-gray-400 italic">
                                <span>Powered by NextGen AI_</span>
                                <span className="h-1 w-1 bg-gray-300 rounded-full"></span>
                                <span>Zoya Hub_</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main FAB */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`bg-black text-white p-5 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:scale-110 transition-all duration-500 group relative overflow-hidden border-4 border-white active:scale-90 pointer-events-auto ${isOpen ? 'rotate-90 bg-red-500 border-red-100' : ''}`}
                >
                    <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                    {isOpen ? (
                        <X className="h-9 w-9 relative z-10" />
                    ) : (
                        <>
                            <MessageSquare className="h-9 w-9 relative z-10" />
                            <div className="absolute top-2 right-2 h-3.5 w-3.5 bg-blue-500 border-2 border-black rounded-full z-20 animate-pulse"></div>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
