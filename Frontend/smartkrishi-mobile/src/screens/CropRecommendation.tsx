import { fetchCropRecommendation } from '../lib/api';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, ImageBackground, Alert } from 'react-native';
import { styled } from 'nativewind';
import { ArrowLeft, CheckCircle2, ChevronDown, ChevronUp, Sprout, Info } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { translations, Language } from '../constants/translations';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledLinearGradient = styled(LinearGradient);
const StyledScroll = styled(ScrollView);
const StyledImageBackground = styled(ImageBackground);

const CropRecommendation = ({ onBack, onOpenChat, onAdvisoryComplete, language }: { onBack: () => void; onOpenChat: () => void; onAdvisoryComplete?: () => void; language: Language }) => {
  const t = translations[language];
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [results, setResults] = useState<any[]>([]);
  const [weather, setWeather] = useState<any>(null);
  const [openSection, setOpenSection] = useState<string | null>('soil_type');
  const [formData, setFormData] = useState({
    soil_type: '',
    drainage: '',
    previous_crop: '',
    sunlight: '',
    moisture: ''
  });

  const handleSelect = (id: string, value: string) => {
    setFormData({ ...formData, [id]: value });
    setOpenSection(null); // Close after selection
  };

  const sections = React.useMemo(() => [
    {
      id: 'soil_type',
      label: t.q_soil_type,
      options: [
        { label: t.opt_sandy, value: 'Sandy', icon: '🟤' },
        { label: t.opt_loamy, value: 'Loamy', icon: '🟫' },
        { label: t.opt_clayey, value: 'Clayey', icon: '⬛' },
        { label: 'Kaali (Black)', value: 'black', icon: '🖤' },
        { label: 'Laal (Red)',    value: 'red',   icon: '🔴' },
      ]
    },
    {
      id: 'drainage',
      label: t.q_drainage,
      options: [
        { label: t.opt_flow_away, value: 'Fast', icon: '🌊' },
        { label: t.opt_stays_bit, value: 'Normal', icon: '💧' },
        { label: t.opt_stays_long, value: 'Slow', icon: '🌧️' },
      ]
    },
    {
      id: 'previous_crop',
      label: t.q_prev_crop,
      options: [
        { label: t.opt_legume, value: 'Legume', icon: '🌿' },
        { label: t.opt_cereal, value: 'Cereal', icon: '🌾' },
        { label: t.opt_dont_remember, value: 'None', icon: '❓' },
      ]
    },
    {
      id: 'sunlight',
      label: t.q_sunlight,
      options: [
        { label: t.opt_full_sun, value: 'Full', icon: '☀️' },
        { label: t.opt_half_day, value: 'Partial', icon: '🌤️' },
        { label: t.opt_low_sun, value: 'Low', icon: '🌥️' },
      ]
    },
    {
      id: 'moisture',
      label: t.q_moisture,
      options: [
        { label: t.opt_dry, value: 'Dry', icon: '🏜️' },
        { label: t.opt_normal, value: 'Normal', icon: '🌱' },
        { label: t.opt_wet, value: 'Wet', icon: '💧' },
      ]
    }
  ], [t]);

  const getSelectedLabel = (sectionId: string, data: typeof formData) => {
    const section = sections.find(s => s.id === sectionId);
    const selectedValue = (data as any)[sectionId];
    if (!selectedValue) return 'Select Option...';
    return section?.options.find((o: { label: string; value: string; icon: string }) => o.value === selectedValue)?.label || 'Select Option...';
  };

  const handleSuggest = async () => {
    
    const missing = [];
    if (!formData.soil_type)     missing.push('soil type');
    if (!formData.drainage)      missing.push('water drainage');
    if (!formData.previous_crop) missing.push('previous crop');
    if (!formData.sunlight)      missing.push('sunlight');
    if (!formData.moisture)      missing.push('moisture');

    if (missing.length > 0) {
      Alert.alert(
        '⚠️ Please fill all fields',
        `The following fields are still empty:\n\n• ${missing.join('\n• ')}`,
        [{ text: 'OK' }]
      );
      return;
    }

    setLoading(true);
    setResults([]);

    try {
      const res = await fetchCropRecommendation({
        soil_type:     formData.soil_type.toLowerCase(),
        water:         formData.drainage === 'Fast' ? 'low'
                     : formData.drainage === 'Slow' ? 'high'
                     : 'medium',
        previous_crop: formData.previous_crop === 'Legume' ? 'legume'
                     : formData.previous_crop === 'Cereal' ? 'cereal'
                     : 'other',
        lat: 21.5,
        lon: 83.9,
      });

      if (res?.success) {
        const crops = res.data.crops || [];
        if (crops.length > 0) {
          
          setResult({
            crop:  crops[0].name,
            match: crops[0].match,
            reason: crops[0].reason,
            soil:  formData.soil_type,
            water: crops[0].water,
            image: crops[0].image,
          });

          setResults(crops);
          if (onAdvisoryComplete) onAdvisoryComplete();
        }
      }
    } catch (e) {
      Alert.alert('Error', 'Cannot connect to the server.');
    } finally {
      setLoading(false);
    }
  };



return (
    <StyledView className="flex-1 bg-[#F8FAF9]">
      <StyledView className="bg-neo-dark pt-12 pb-8 px-6 rounded-b-[40px] shadow-lg">
        <StyledView className="flex-row items-center justify-between">
          <StyledTouchableOpacity 
            onPress={onBack}
            className="w-10 h-10 rounded-full bg-white/10 items-center justify-center border border-white/20"
          >
            <ArrowLeft size={20} color="#FFF" />
          </StyledTouchableOpacity>
          <StyledText className="text-white text-xl font-bold">{t.crop_advisory}</StyledText>
          <StyledView className="w-10" />
        </StyledView>
      </StyledView>

      <StyledScroll className="flex-1 px-5 pt-8" showsVerticalScrollIndicator={false}>
        {loading ? (
          <StyledView className="flex-1 items-center justify-center pt-20">
            <ActivityIndicator size="large" color="#4ADE80" />
            <StyledText className="text-neo-dark/60 font-bold mt-6 text-lg">AI is analyzing your field...</StyledText>
          </StyledView>
        ) : !result ? (
          <StyledView className="pb-10">
            <StyledText className="text-neo-dark font-black text-2xl mb-2">{t.diagnostic_title}</StyledText>
            <StyledText className="text-neo-dark/40 font-bold mb-8">{t.diagnostic_subtitle}</StyledText>

            {sections.map((section: typeof sections[0]) => (
              <StyledView key={section.id} className="mb-4">
                <StyledText className="text-neo-dark/60 font-black text-xs uppercase mb-2 ml-2 tracking-widest">{section.label}</StyledText>
                
                <StyledTouchableOpacity
                  onPress={() => setOpenSection(openSection === section.id ? null : section.id)}
                  className={`bg-white p-5 rounded-3xl flex-row items-center justify-between shadow-sm border ${openSection === section.id ? 'border-neo-green/40' : 'border-gray-100'}`}
                >
                  <StyledText className={`font-bold flex-1 ${(formData as any)[section.id] ? 'text-neo-dark' : 'text-gray-300'}`}>
                    {getSelectedLabel(section.id, formData)}
                  </StyledText>
                  {openSection === section.id ? <ChevronUp size={20} color="#4ADE80" /> : <ChevronDown size={20} color="#CED4D1" />}
                </StyledTouchableOpacity>

                {openSection === section.id && (
                  <StyledView className="mt-2 bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm animate-in fade-in slide-in-from-top-2">
                    {section.options.map((opt, idx) => (
                      <StyledTouchableOpacity
                        key={idx}
                        onPress={() => handleSelect(section.id, opt.value)}
                        className={`p-5 flex-row items-center justify-between border-b border-gray-50 ${(formData as any)[section.id] === opt.value ? 'bg-neo-green/5' : ''}`}
                      >
                        <StyledView className="flex-row items-center gap-4">
                          <StyledText className="text-xl">{opt.icon}</StyledText>
                          <StyledText className={`font-bold ${(formData as any)[section.id] === opt.value ? 'text-neo-dark' : 'text-gray-600'}`}>
                            {opt.label}
                          </StyledText>
                        </StyledView>
                        {(formData as any)[section.id] === opt.value && <CheckCircle2 size={16} color="#4ADE80" />}
                      </StyledTouchableOpacity>
                    ))}
                  </StyledView>
                )}
              </StyledView>
            ))}

            <StyledTouchableOpacity 
              onPress={handleSuggest}
              className="mt-8 overflow-hidden rounded-[32px] shadow-lg shadow-neo-green/20"
            >
              <StyledLinearGradient
                colors={['#4ADE80', '#2E7D32']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                className="py-5 items-center flex-row justify-center gap-3"
              >
                <StyledText className="text-white font-black text-lg">Analyze My Field</StyledText>
                <Sprout size={20} color="#FFF" />
              </StyledLinearGradient>
            </StyledTouchableOpacity>
          </StyledView>
) : results.length > 0 ? (
  <StyledView className="pb-10">

    {/* Weather info */}
    {weather && (
      <StyledView className="bg-blue-50 rounded-[24px] p-4 mb-6 flex-row items-center gap-3">
        <StyledText className="text-2xl">🌤️</StyledText>
        <StyledView className="flex-1">
          <StyledText className="text-blue-900 font-bold text-sm">
            {weather.city} Weather
          </StyledText>
          <StyledText className="text-blue-700 text-xs mt-0.5">
            {weather.temperature}°C · {weather.humidity}% Humidity · {weather.description}
          </StyledText>
        </StyledView>
      </StyledView>
    )}

    {/* Section heading */}
    <StyledText className="text-neo-dark font-black text-xl mb-1">
      🌾 Seasonal Crop Suggestions
    </StyledText>
    <StyledText className="text-neo-dark/40 font-bold text-sm mb-6"numberOfLines={1}>
      (crops reco. based on your soil & current weather)
    </StyledText>

    {/* All crops — same style, one by one */}
    {results.map((crop: any, index: number) => (
      <StyledView
        key={index}
        className="bg-white rounded-[32px] overflow-hidden shadow-lg mb-6 border border-gray-50"
      >
        {/* Crop Image */}
        <StyledView style={{ height: 200 }}>
          <StyledImageBackground
            source={{ uri: crop.image }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          >
            <StyledLinearGradient
              colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.78)']}
              style={{ flex: 1, padding: 20, justifyContent: 'flex-end' }}
            >
              {/* Rank badge */}
              <StyledView
                className="absolute top-4 left-4 px-3 py-1 rounded-full"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
              >
                <StyledText className="text-white font-black text-xs">
                  #{index + 1} Pick
                </StyledText>
              </StyledView>

              {/* Match badge */}
              <StyledView className="bg-neo-green/90 px-3 py-1 rounded-full self-start mb-2">
                <StyledText className="text-white font-black text-[10px] uppercase tracking-widest">
                  {crop.match} Match
                </StyledText>
              </StyledView>

              <StyledText className="text-white font-black text-3xl">{crop.name}</StyledText>
              <StyledText className="text-white/70 text-sm">{crop.hindi}</StyledText>
            </StyledLinearGradient>
          </StyledImageBackground>
        </StyledView>

        {/* Crop Details */}
        <StyledView className="p-5">
          {/* Stats */}
          <StyledView
            className="flex-row justify-between mb-4 pb-4"
            style={{ borderBottomWidth: 1, borderBottomColor: '#F3F4F6' }}
          >
            <StyledView className="items-center flex-1">
              <StyledText className="text-neo-dark font-black text-sm">{crop.duration}</StyledText>
              <StyledText className="text-gray-400 text-[10px] mt-0.5">Duration</StyledText>
            </StyledView>
            <StyledView style={{ width: 1, backgroundColor: '#F3F4F6' }} />
            <StyledView className="items-center flex-1">
              <StyledText className="text-neo-dark font-black text-sm">{crop.water}</StyledText>
              <StyledText className="text-gray-400 text-[10px] mt-0.5">Water Need</StyledText>
            </StyledView>
          </StyledView>

          {/* AI Assessment */}
          <StyledView className="bg-green-50 rounded-2xl p-3">
            <StyledView className="flex-row items-center gap-2 mb-1">
              <Info size={14} color="#16a34a" />
              <StyledText className="text-green-800 font-bold text-xs">AI Assessment</StyledText>
            </StyledView>
            <StyledText className="text-green-700 text-xs leading-5">{crop.reason}</StyledText>
          </StyledView>
        </StyledView>
      </StyledView>
    ))}

    {/* Analyze again */}
    <StyledTouchableOpacity
      onPress={() => {
        setResult(null);
        setResults([]);
        setFormData({
          soil_type: '',
          drainage: '',
          previous_crop: '',
          sunlight: '',
          moisture: ''
        });
        setOpenSection('soil_type');
      }}
      className="mt-2 py-5 items-center bg-neo-dark rounded-[32px] shadow-xl flex-row justify-center gap-2"
    >
      <Sprout size={20} color="#4ADE80" />
      <StyledText className="text-white font-black text-lg">Analyze Again</StyledText>
    </StyledTouchableOpacity>

  </StyledView>
) : null}

        <StyledView className="h-40" />
      </StyledScroll>
    </StyledView>
  );
};

export default CropRecommendation;

