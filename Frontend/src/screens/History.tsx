import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { ArrowLeft, Clock, ChevronRight, FileSearch, Leaf, Zap, Mail } from 'lucide-react-native';

import { translations, Language } from '../constants/translations';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScroll = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

const History = ({ onBack, language }: { onBack: () => void; language: Language }) => {
  const t = translations[language];

  const historyItems = [
    {
      id: '1',
      type: 'Disease Scan',
      title: 'Tomato Early Blight',
      date: 'Today, 2:30 PM',
      icon: <Zap size={20} color="#E65100" />
    },
    {
      id: '2',
      type: 'Chat',
      title: 'Irrigation Advice',
      date: 'Yesterday, 10:20 AM',
      icon: <Mail size={20} color="#0288D1" />
    },
    {
      id: '3',
      type: 'Crop Advisor',
      title: 'Soybean Selection',
      date: 'Apr 05, 11:15 AM',
      icon: <Leaf size={20} color="#388E3C" />
    },
    {
      id: '4',
      type: 'Market Check',
      title: 'Wheat Price - Nagpur',
      date: 'Apr 04, 09:00 AM',
      icon: <FileSearch size={20} color="#5D4037" />
    }
  ];

  return (
    <StyledView className="flex-1 bg-neo-bg">
      {/* Header */}
      <StyledView className="bg-neo-dark pt-12 pb-6 px-6 rounded-b-[32px] shadow-lg">
        <StyledView className="flex-row items-center justify-between mb-4">
          <StyledTouchableOpacity 
            onPress={onBack}
            className="w-10 h-10 rounded-full bg-white/10 items-center justify-center border border-white/20"
          >
            <ArrowLeft size={20} color="#FFF" />
          </StyledTouchableOpacity>
          <StyledText className="text-white text-xl font-bold">Activity Log</StyledText>
          <StyledView className="w-10" />
        </StyledView>
      </StyledView>

      <StyledScroll className="flex-1 px-5 pt-8" showsVerticalScrollIndicator={false}>
        <StyledView className="flex-row items-center gap-2 mb-6">
            <Clock size={16} color="#0E3A24" />
            <StyledText className="text-neo-dark font-bold text-base">Recent Activities</StyledText>
        </StyledView>

        {historyItems.map((item) => (
          <StyledTouchableOpacity 
            key={item.id}
            className="bg-white rounded-[24px] p-5 mb-4 flex-row items-center shadow-sm border border-gray-50"
          >
            <StyledView className="w-12 h-12 bg-gray-50 rounded-2xl items-center justify-center">
              {item.icon}
            </StyledView>
            
            <StyledView className="flex-1 ml-4">
              <StyledText className="text-gray-400 font-bold text-[10px] uppercase tracking-wider">{item.type}</StyledText>
              <StyledText className="text-neo-dark font-bold text-base mt-1">{item.title}</StyledText>
              <StyledText className="text-gray-400 text-xs mt-1">{item.date}</StyledText>
            </StyledView>

            <ChevronRight size={20} color="#D1D5DB" />
          </StyledTouchableOpacity>
        ))}

        <StyledView className="h-40" />

      </StyledScroll>
    </StyledView>
  );
};

export default History;
