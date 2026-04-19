import React, { useEffect } from 'react';
import { View, Text, Animated, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { styled } from 'nativewind';
import { LinearGradient } from 'expo-linear-gradient';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImageBackground = styled(ImageBackground);
const StyledLinearGradient = styled(LinearGradient);
const StyledImage = styled(Image);

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(20);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <StyledView className="flex-1 bg-black">
      <StyledImageBackground
        source={require('../../assets/splash-bg.png')} 
        className="flex-1"
        resizeMode="cover"
      >
        <StyledLinearGradient
          colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.8)']}
          className="flex-1 px-8 pb-16 pt-24"
        >
          <Animated.View 
            style={{ 
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
            }} 
            className="flex-1 justify-between w-full"
          >
            {/* Top Title Group */}
            <StyledView className="w-full items-center mt-10">
                <StyledText className="text-white text-xl font-medium tracking-tight mb-2 text-center">
                    Welcome to
                </StyledText>
                <StyledText className="text-white text-[54px] font-black leading-none tracking-tighter mb-1 text-center" style={{ textShadowColor: 'rgba(0,0,0,0.3)', textShadowOffset: {width: 0, height: 2}, textShadowRadius: 4 }}>
                    SmartKrishi
                </StyledText>
                <StyledText className="text-[#FBBF24] text-[15px] font-semibold tracking-[2px] text-center mt-1" style={{ textShadowColor: 'rgba(0,0,0,0.7)', textShadowOffset: {width: 0, height: 2}, textShadowRadius: 4 }}>
                    (Har Kisan ka Digital Saathi)
                </StyledText>
            </StyledView>

            {/* Bottom Actions Group */}
            <StyledView className="w-full">
                <StyledView className="w-full items-center mb-6">
                    <StyledText className="text-white/90 text-[15px] font-medium text-center">
                        AI-powered tools for smarter farming
                    </StyledText>
                </StyledView>

                <StyledTouchableOpacity 
                onPress={onFinish}
                className="w-full bg-[#ADFF2F] py-[20px] rounded-[32px] items-center active:opacity-90 shadow-2xl shadow-[#ADFF2F]/40"
                >
                <StyledText className="text-[#0E3A24] font-black text-xl">Get Started</StyledText>
                </StyledTouchableOpacity>
            </StyledView>
          </Animated.View>
        </StyledLinearGradient>
      </StyledImageBackground>
    </StyledView>
  );
};

export default SplashScreen;
