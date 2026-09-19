import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  MessageSquare, 
  Send, 
  ArrowLeft, 
  Phone, 
  CheckCircle2, 
  ExternalLink,
  Sparkles,
  Building2,
  Calendar
} from 'lucide-react';

export const MessagesScreen: React.FC = () => {
  const { 
    chatThreads, 
    activeThreadId, 
    setActiveThreadId, 
    sendMessage, 
    setSelectedProperty,
    properties,
    openScheduleVisit,
    showToast 
  } = useApp();

  const [inputText, setInputText] = useState('');

  const activeThread = chatThreads.find(t => t.id === activeThreadId) || (chatThreads.length > 0 ? chatThreads[0] : null);

  const quickPrompts = [
    'Is the price negotiable?',
    'Are physical site visits available this weekend?',
    'Is dedicated car parking included?',
    'Can you share the RERA approval copy?'
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || !activeThread) return;
    sendMessage(activeThread.id, text);
    if (!textToSend) setInputText('');
  };

  const currentProperty = activeThread ? properties.find(p => p.id === activeThread.propertyId) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 pb-24 h-[calc(100vh-130px)] min-h-[500px] flex flex-col">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm flex-1 flex overflow-hidden">
        
        {/* Left: Threads List (hidden on small screens if thread is active) */}
        <div className={`w-full md:w-80 lg:w-96 border-r border-slate-200 flex flex-col ${
          activeThreadId && 'hidden md:flex'
        }`}>
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <h1 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#3949AB]" />
              Inquiries & Messages
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">Direct chat with verified owners, builders & agents</p>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {chatThreads.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                No active conversations yet. Click "Chat" on any property to start an inquiry.
              </div>
            ) : (
              chatThreads.map(thread => {
                const isSelected = activeThread?.id === thread.id;
                return (
                  <div
                    key={thread.id}
                    onClick={() => setActiveThreadId(thread.id)}
                    className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                      isSelected ? 'bg-indigo-50/80 border-l-4 border-[#3949AB]' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img 
                        src={thread.participantAvatar} 
                        alt={thread.participantName} 
                        className="w-11 h-11 rounded-full object-cover border border-slate-200"
                      />
                      <img 
                        src={thread.propertyImage} 
                        alt="Property context" 
                        className="w-5 h-5 rounded-md object-cover absolute -bottom-1 -right-1 border border-white shadow-xs"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h4 className="font-bold text-xs text-slate-900 truncate">{thread.participantName}</h4>
                        <span className="text-[10px] text-slate-400 shrink-0">{thread.lastMessageTime}</span>
                      </div>
                      <p className="text-[11px] font-semibold text-[#3949AB] truncate">{thread.propertyPrice} • {thread.propertyTitle}</p>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{thread.lastMessage}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Active Chat Conversation View */}
        {activeThread ? (
          <div className={`flex-1 flex flex-col bg-slate-50/40 ${!activeThreadId && 'hidden md:flex'}`}>
            
            {/* Chat Top Header */}
            <div className="p-3.5 bg-white border-b border-slate-200 flex items-center justify-between gap-2 shadow-xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <button
                  onClick={() => setActiveThreadId(null)}
                  className="md:hidden p-1.5 rounded-full hover:bg-slate-100 text-slate-600"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <img 
                  src={activeThread.participantAvatar} 
                  alt={activeThread.participantName} 
                  className="w-9 h-9 rounded-full object-cover border border-slate-200"
                />

                <div className="min-w-0">
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 truncate">{activeThread.participantName}</h3>
                  <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    {activeThread.participantRole} • Online
                  </p>
                </div>
              </div>

              {/* Header Right Property Thumbnail Pill */}
              {currentProperty && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openScheduleVisit(currentProperty)}
                    className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#3949AB] text-white font-bold text-xs shadow-xs hover:bg-[#283593]"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#F4A62A]" />
                    <span>Book Visit</span>
                  </button>

                  <button
                    onClick={() => setSelectedProperty(currentProperty)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold"
                  >
                    <span className="max-w-[100px] truncate">{activeThread.propertyPrice}</span>
                    <ExternalLink className="w-3 h-3 text-[#3949AB]" />
                  </button>
                </div>
              )}
            </div>

            {/* Chat Messages Timeline */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              
              {/* Property Context Card Banner */}
              <div className="bg-white p-3 rounded-2xl border border-indigo-100 shadow-xs flex items-center justify-between gap-3 self-center max-w-md w-full">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img src={activeThread.propertyImage} alt={activeThread.propertyTitle} className="w-12 h-12 rounded-xl object-cover" />
                  <div className="min-w-0">
                    <span className="text-xs font-extrabold text-[#3949AB] block">{activeThread.propertyPrice}</span>
                    <p className="text-xs text-slate-800 font-bold truncate">{activeThread.propertyTitle}</p>
                  </div>
                </div>
                {currentProperty && (
                  <button
                    onClick={() => setSelectedProperty(currentProperty)}
                    className="px-2.5 py-1.5 rounded-lg bg-indigo-50 text-[#3949AB] text-xs font-bold shrink-0 hover:bg-indigo-100"
                  >
                    View
                  </button>
                )}
              </div>

              {/* Messages list */}
              {activeThread.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-[80%] ${
                    msg.isFromUser ? 'self-end items-end' : 'self-start items-start'
                  }`}
                >
                  <div
                    className={`p-3 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                      msg.isFromUser
                        ? 'bg-[#3949AB] text-white rounded-br-xs'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5 px-1">{msg.timestamp}</span>
                </div>
              ))}
            </div>

            {/* Quick Prompt Chips */}
            <div className="px-4 py-2 bg-white/60 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {quickPrompts.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white border border-slate-200 text-slate-700 hover:border-[#3949AB] hover:text-[#3949AB] transition-all active:scale-95"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Chat Input Bar */}
            <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message or inquiry..."
                className="flex-1 bg-slate-100 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:bg-white border border-slate-200/80 transition-all"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputText.trim()}
                className="p-2.5 rounded-2xl bg-[#3949AB] hover:bg-[#283593] disabled:opacity-40 text-white shadow-sm transition-all active:scale-90"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-400 text-sm">
            Select a conversation to start chatting
          </div>
        )}

      </div>
    </div>
  );
};
