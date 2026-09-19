import React from 'react';
import { ChatMessage } from '../types';
import { Sparkles, Building2 } from 'lucide-react';

interface MessageItemProps {
  message: ChatMessage;
  className?: string;
}

export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  className = ''
}) => {
  const isOutgoing = message.isFromUser;

  return (
    <div className={`flex flex-col ${isOutgoing ? 'items-end' : 'items-start'} gap-1 mb-3.5 ${className}`}>
      {/* Sender Name for incoming */}
      {!isOutgoing && (
        <span className="text-[10px] text-slate-400 font-extrabold ml-1 uppercase tracking-wider">
          {message.senderName}
        </span>
      )}

      {/* Bubble Container */}
      <div className="max-w-[85%] sm:max-w-[70%] flex flex-col gap-1.5">
        <div
          className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold shadow-3xs leading-relaxed ${
            isOutgoing
              ? 'bg-[#3949AB] text-white rounded-tr-none'
              : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
          }`}
        >
          {/* Main Message Text */}
          <p className="whitespace-pre-wrap">{message.text}</p>
          
          {/* Attached Property Context */}
          {message.propertyContext && (
            <div className={`mt-2 p-2.5 rounded-xl flex items-center gap-2.5 border text-left ${
              isOutgoing 
                ? 'bg-indigo-800/50 border-indigo-700/80 text-white' 
                : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}>
              <img 
                src={message.propertyContext.image} 
                alt="" 
                className="w-10 h-10 object-cover rounded-lg shrink-0 border border-black/10" 
              />
              <div className="flex-1 min-w-0">
                <span className="block text-[10px] uppercase font-black tracking-wider text-amber-400">
                  Property Shared
                </span>
                <h5 className="font-extrabold text-xs truncate leading-snug">
                  {message.propertyContext.title}
                </h5>
                <p className="text-[10px] font-black opacity-90">
                  {message.propertyContext.price}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Timestamp */}
      <span className={`text-[9px] text-slate-400 font-bold ${isOutgoing ? 'mr-1' : 'ml-1'}`}>
        {message.timestamp}
      </span>
    </div>
  );
};
