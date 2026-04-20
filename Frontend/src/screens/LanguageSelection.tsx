import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Dimensions, Image } from 'react-native';
import { styled } from 'nativewind';
import { Globe, CheckCircle2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledLinearGradient = styled(LinearGradient);
const StyledImage = styled(Image);

interface LanguageSelectionProps {
  onContinue: (lang: string) => void;
}

const languages = [
  { id: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { id: 'en', name: 'English', native: 'English' },
  { id: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
];


const LanguageSelection = ({ onContinue }: LanguageSelectionProps) => {
  const [selected, setSelected] = useState('hi');

  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <StyledView className="flex-1 px-6 justify-center">
        
        <StyledView className="items-center mb-12">
            <StyledView className="w-24 h-24 rounded-[34px] overflow-hidden bg-white shadow-md items-center justify-center mb-6 border border-gray-50">
                <StyledImage 
                    source={require('../../assets/logo-main.png')} 
                    className="w-full h-full scale-[1.8]"
                    resizeMode="contain"
                />
            </StyledView>

            <StyledText className="text-3xl font-black text-[#0E3A24] mb-2">SmartKrishi</StyledText>

          <StyledText className="text-[#0E3A24]/60 text-center px-4">
            Select your preferred language to continue with SmartKrishi
          </StyledText>
        </StyledView>

        <StyledView className="space-y-4">
          {languages.map((lang) => (
            <StyledTouchableOpacity
              key={lang.id}
              onPress={() => setSelected(lang.id)}
              className={`p-5 rounded-[24px] border-2 flex-row items-center justify-between ${
                selected === lang.id ? 'border-[#0E3A24] bg-[#F5F9F7]' : 'border-gray-100 bg-white'
              }`}
            >
              <StyledView>
                <StyledText className={`font-bold text-lg ${selected === lang.id ? 'text-[#0E3A24]' : 'text-gray-600'}`}>
                  {lang.native}
                </StyledText>
                <StyledText className="text-gray-400 text-sm">{lang.name}</StyledText>
              </StyledView>
              {selected === lang.id && <CheckCircle2 size={24} color="#0E3A24" />}
            </StyledTouchableOpacity>
          ))}
        </StyledView>

        <StyledTouchableOpacity 
          className="mt-12 overflow-hidden rounded-2xl shadow-lg"
          onPress={() => onContinue(selected)}
        >
          <StyledLinearGradient
            colors={['#0E3A24', '#1B5E20']}
            className="py-4 items-center"
          >
            <StyledText className="text-white font-bold text-lg">Continue</StyledText>
          </StyledLinearGradient>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledSafeAreaView>
  );
};

export default LanguageSelection;
