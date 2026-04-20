import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { 
  ChevronLeft, 
  Microscope, 
  Leaf, 
  TrendingUp, 
  Sparkles, 
  ClipboardList, 
  CloudSun,
  Droplets,
  Sprout,
  Users,
  Store,
  BookOpen
} from 'lucide-react-native';
import { styled } from 'nativewind';
import { LinearGradient } from 'expo-linear-gradient';
import { translations, Language } from '../constants/translations';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScroll = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledLinearGradient = styled(LinearGradient);

interface ExploreFeaturesProps {
  onNavigate: (screen: string) => void;
  onBack: () => void;
  language: Language;
}

const FeatureCard = ({ title, description, icon: Icon, color, onPress }: any) => (
  <StyledTouchableOpacity 
    onPress={onPress}
    className="w-[48%] bg-white rounded-[32px] p-5 mb-4 shadow-sm border border-gray-50 flex-col items-start"
  >
    <StyledView className={`w-12 h-12 rounded-2xl items-center justify-center mb-3`} style={{ backgroundColor: `${color}15` }}>
      <Icon size={24} color={color} />
    </StyledView>
    <StyledView>
      <StyledText className="text-neo-dark font-black text-sm">{title}</StyledText>
      <StyledText className="text-gray-400 text-[10px] mt-1 line-clamp-2">{description}</StyledText>
    </StyledView>
  </StyledTouchableOpacity>
);

const ExploreFeatures = ({ onNavigate, onBack, language }: ExploreFeaturesProps) => {
  const t = translations[language];

  const features = [
    {
      id: 'scan',
      title: t.ai_disease_title,
      description: t.ai_disease_desc,
      icon: Microscope,
      color: '#E65100',
    },
    {
      id: 'crop',
      title: t.crop_advisor_title,
      description: t.crop_advisor_desc,
      icon: Leaf,
      color: '#1B5E20',
    },
    {
      id: 'market',
      title: t.mandi_rates_title,
      description: t.mandi_rates_desc,
      icon: TrendingUp,
      color: '#0D47A1',
    },
    {
      id: 'chat',
      title: t.smart_chat,
      description: t.smart_chat, 
      icon: Sparkles,
      color: '#4A148C',
    },
    {
      id: 'history',
      title: t.farming_log,
      description: t.farming_log_desc,
      icon: ClipboardList,
      color: '#37474F',
    },
    {
      id: 'dashboard',
      title: t.weather_detailed,
      description: t.weather_detailed_desc,
      icon: CloudSun,
      color: '#FFA000',
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FBF8' }}>
      <StyledView className="flex-1 px-5 pt-12">
        
        {/* Header */}
        <StyledView className="flex-row items-center justify-between mb-8">

          <StyledTouchableOpacity 
            onPress={onBack}
            className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm"
          >
            <ChevronLeft size={20} color="#0E3A24" />
          </StyledTouchableOpacity>
          <StyledText className="text-neo-dark font-black text-xl">{t.explore_tools}</StyledText>
          <StyledView className="w-10" /> 
        </StyledView>

        <StyledScroll showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          <StyledView className="mb-6">
            <StyledText className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Primary Tools</StyledText>
            <StyledView className="flex-row flex-wrap justify-between">
              {features.map((feature) => (
                <FeatureCard 
                  key={feature.id}
                  {...feature}
                  onPress={() => onNavigate(feature.id)}
                />
              ))}
            </StyledView>
          </StyledView>

          {/* Secondary Features (Placeholders for premium feel) */}
          <StyledView>
            <StyledText className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">{t.coming_soon}</StyledText>
            <StyledView className="flex-row flex-wrap justify-between opacity-50">
              <FeatureCard 
                title={t.community_title} 
                description={t.community_desc} 
                icon={Users} 
                color="#00695C" 
                onPress={() => {}} 
              />
              <FeatureCard 
                title="Smart Store" 
                description="Buy seeds and equipment" 
                icon={Store} 
                color="#C62828" 
                onPress={() => {}} 
              />
            </StyledView>
          </StyledView>

        </StyledScroll>
      </StyledView>
    </SafeAreaView>
  );
};

export default ExploreFeatures;
