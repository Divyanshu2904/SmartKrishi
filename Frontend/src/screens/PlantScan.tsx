import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import { Camera, Image as ImageIcon, ArrowLeft, Zap, ShieldCheck, AlertTriangle, RefreshCcw } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { detectPlantDisease } from '../lib/api';

import { translations, Language } from '../constants/translations';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledLinearGradient = styled(LinearGradient);
const StyledScroll = styled(ScrollView);
const StyledImage = styled(Image);

const PlantScan = ({ onBack, onOpenChat, onDiagnosisComplete, language }: { onBack: () => void; onOpenChat: () => void; onDiagnosisComplete?: () => void; language: Language }) => {

  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      analyzeImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'We need access to your camera to scan plants.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      analyzeImage(result.assets[0].uri);
    }
  };

  // const analyzeImage = (uri: string) => {
  //   setLoading(true);
  //   setResult(null);
  //   // Mock API call
  //   setTimeout(() => {
  //     setResult({
  //       disease: "Tomato Early Blight",
  //       severity: "Moderate",
  //       recommendation: "Apply Copper-based fungicides. Remove infected lower leaves.",
  //       confidence: "98.2%"
  //     });
  //     setLoading(false);
  //   }, 2500);
  // };


  const analyzeImage = async (uri: string) => {
    setLoading(true);
    setResult(null);
    try {
      const res = await detectPlantDisease(uri);
      if (res?.success) {
        setResult({
          disease:        res.data.disease,
          confidence:     res.data.confidence + '%',
          severity:       res.data.solution?.common_name || 'Detected',
          recommendation: res.data.solution?.treatment || 'No treatment data',
        });
        if (onDiagnosisComplete) onDiagnosisComplete();
      } else {
        Alert.alert('Error', 'Disease detect nahi hui. Dobara try karo.');
      }
    } catch {
      Alert.alert('Error', 'Server se connect nahi ho pa raha.');
    } finally {
      setLoading(false);
    }
  };




  return (
    <StyledView className="flex-1 bg-neo-bg">
      {/* Header */}
      <StyledView className="bg-neo-dark pt-12 pb-6 px-6 rounded-b-[32px] shadow-lg">
        <StyledView className="flex-row items-center justify-between mb-6">
          <StyledTouchableOpacity 
            onPress={onBack}
            className="w-10 h-10 rounded-full bg-white/10 items-center justify-center border border-white/20"
          >
            <ArrowLeft size={20} color="#FFF" />
          </StyledTouchableOpacity>
          <StyledText className="text-white text-xl font-bold">Health Scan</StyledText>
          <StyledView className="w-10" />
        </StyledView>
      </StyledView>

      <StyledScroll className="flex-1 px-5 pt-8" showsVerticalScrollIndicator={false}>
        <StyledView className="items-center">
            {/* Scan Area */}
            <StyledView className="w-full aspect-square bg-white rounded-[40px] overflow-hidden border-4 border-white shadow-xl items-center justify-center p-2">
                {image ? (
                    <StyledImage source={{ uri: image }} className="w-full h-full rounded-[32px]" />
                ) : (
                    <StyledView className="items-center">
                        <StyledView className="w-20 h-20 bg-neo-bg rounded-full items-center justify-center mb-4">
                            <Zap size={40} color="#0E3A24" />
                        </StyledView>
                        <StyledText className="text-gray-400 font-medium text-center px-10">Upload or take a photo of the infected leaf area</StyledText>
                    </StyledView>
                )}
                
                {loading && (
                    <StyledView className="absolute inset-0 bg-black/40 items-center justify-center rounded-[32px]">
                        <ActivityIndicator size="large" color="#4ADE80" />
                        <StyledText className="text-white mt-4 font-bold">AI Analyzing...</StyledText>
                    </StyledView>
                )}
            </StyledView>

            {/* Buttons */}
            {!loading && !result && (
                <StyledView className="flex-row gap-4 mt-8 w-full">
                    <StyledTouchableOpacity 
                        onPress={takePhoto}
                        className="flex-1 bg-neo-dark py-5 rounded-3xl items-center shadow-lg"
                    >
                        <Camera size={24} color="#4ADE80" />
                        <StyledText className="text-white font-bold mt-2">Camera</StyledText>
                    </StyledTouchableOpacity>
                    
                    <StyledTouchableOpacity 
                         onPress={pickImage}
                         className="flex-1 bg-white py-5 rounded-3xl items-center border border-gray-100 shadow-sm"
                    >
                        <ImageIcon size={24} color="#0E3A24" />
                        <StyledText className="text-neo-dark font-bold mt-2">Gallery</StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
            )}

            {/* Results */}
            {result && (
                <StyledView className="w-full mt-6 bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
                    <StyledView className="flex-row items-center gap-3 mb-4">
                        <AlertTriangle size={24} color="#E65100" />
                        <StyledText className="text-neo-dark font-bold text-lg">{result.disease}</StyledText>
                    </StyledView>
                    
                    <StyledView className="bg-orange-50 p-4 rounded-2xl mb-4">
                        <StyledText className="text-orange-900 font-bold text-xs uppercase mb-1">Diagnosis</StyledText>
                        <StyledText className="text-orange-900 text-sm">{result.recommendation}</StyledText>
                    </StyledView>

                    <StyledView className="flex-row justify-between border-t border-gray-50 pt-4">
                        <StyledView>
                            <StyledText className="text-gray-400 text-xs font-bold uppercase">Confidence</StyledText>
                            <StyledText className="text-neo-dark font-bold">{result.confidence}</StyledText>
                        </StyledView>
                        <StyledView className="items-end">
                            <StyledText className="text-gray-400 text-xs font-bold uppercase">Severity</StyledText>
                            <StyledText className="text-red-600 font-bold">{result.severity}</StyledText>
                        </StyledView>
                    </StyledView>

                    <StyledTouchableOpacity 
                        onPress={() => { setImage(null); setResult(null); }}
                        className="mt-9 py-4 bg-neo-bg rounded-2xl flex-row items-center justify-center gap- (-1)"
                    >
                        <RefreshCcw size={18} color="#0E3A24" />
                        <StyledText className="text-neo-dark font-bold">Scan Another</StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
            )}

            <StyledView className="mt-8 mb-40 flex-row items-center gap-2 bg-green-50 px-4 py-2 rounded-full">

                {/* <ShieldCheck size={16} color="#1B5E20" /> */}
                {/* <StyledText className="text-green-800 text-xs font-medium">99.8% Accuracy on 50+ Crop Types</StyledText> */}
            </StyledView>
        </StyledView>
      </StyledScroll>
    </StyledView>
  );
};

export default PlantScan;
