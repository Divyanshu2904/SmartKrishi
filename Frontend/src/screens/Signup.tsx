import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { styled } from 'nativewind';
import { User, Mail, Phone, Eye, EyeOff, Lock } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { registerUser } from '../lib/api';



const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScroll = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);
const StyledImageBackground = styled(ImageBackground);
const StyledBlurView = styled(BlurView);
const StyledLinearGradient = styled(LinearGradient);
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView);

interface SignupProps {
  onSignup: (name?: string) => void;
  onLogin: () => void;
}

const Signup = ({ onSignup, onLogin }: SignupProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [language] = useState('en');


  const handleSignup = async () => {
    if (!name || !phone || !password) {
      Alert.alert('Error', 'Name, phone number and password are required.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    if (phone.length < 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number.');
      return;
    }
    setLoading(true);
    try {
      const res = await registerUser(name, phone, password, language);
      if (res?.success) {
        Alert.alert('Success', 'Account created successfully!', [
          { text:  'OK', onPress: () => onSignup(name) }
        ]);
      } else {
        Alert.alert('Signup Failed', res?.message || 'Could not create account.');
      }
    } catch (e) {
      Alert.alert('Error', 'Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop' }}
      className="flex-1 bg-black"
      resizeMode="cover"
    >
      <StyledKeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <StyledScroll className="flex-1" contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 20 }}>
          <StyledBlurView
            intensity={40}
            tint="dark"
            className="rounded-[24px] overflow-hidden border border-white/40 p-6 shadow-2xl bg-white/10 my-10"
          >
            <StyledText className="text-white text-[32px] font-bold mb-2 tracking-tight">Create Account</StyledText>
            <StyledText className="text-white/90 text-sm mb-8 font-medium">Join SmartKrishi and grow with us</StyledText>

            {/* Full Name */}
            <StyledView className="border border-white/50 rounded-xl px-4 py-3 flex-row items-center justify-between bg-white/5 mb-4">
              <StyledTextInput
                placeholder="Full Name"
                placeholderTextColor="rgba(255,255,255,0.8)"
                className="flex-1 text-white text-base py-1"
                value={name}
                onChangeText={setName}
              />
              <User size={20} color="rgba(255,255,255,0.8)" />
            </StyledView>

            {/* Phone Number */}
            <StyledView className="border border-white/50 rounded-xl px-4 py-3 flex-row items-center justify-between bg-white/5 mb-4">
              <StyledTextInput
                placeholder="Phone Number (required)"
                placeholderTextColor="rgba(255,255,255,0.8)"
                className="flex-1 text-white text-base py-1"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
              <Phone size={20} color="rgba(255,255,255,0.8)" />
            </StyledView>

            {/* Email - Optional */}
            <StyledView className="border border-white/50 rounded-xl px-4 py-3 flex-row items-center justify-between bg-white/5 mb-4">
              <StyledTextInput
                placeholder="Email Address (optional)"
                placeholderTextColor="rgba(255,255,255,0.8)"
                className="flex-1 text-white text-base py-1"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
              <Mail size={20} color="rgba(255,255,255,0.8)" />
            </StyledView>

            {/* Password */}
            <StyledView className="border border-white/50 rounded-xl px-4 py-3 flex-row items-center justify-between bg-white/5 mb-4">
              <StyledTextInput
                placeholder="Password"
                placeholderTextColor="rgba(255,255,255,0.8)"
                className="flex-1 text-white text-base py-1"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? <Eye size={20} color="rgba(255,255,255,0.8)" /> : <EyeOff size={20} color="rgba(255,255,255,0.8)" />}
              </TouchableOpacity>
            </StyledView>

            {/* Confirm Password */}
            <StyledView className="border border-white/50 rounded-xl px-4 py-3 flex-row items-center justify-between bg-white/5 mb-4">
              <StyledTextInput
                placeholder="Confirm Password"
                placeholderTextColor="rgba(255,255,255,0.8)"
                className="flex-1 text-white text-base py-1"
                secureTextEntry={!showPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <Lock size={20} color="rgba(255,255,255,0.8)" />
            </StyledView>

            {/* Signup Button */}
            <StyledTouchableOpacity
              className="overflow-hidden rounded-xl shadow-lg mt-4"
              onPress={handleSignup}
              disabled={loading}
            >
              <StyledLinearGradient
                colors={['#C0CA33', '#43A047']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="py-4 items-center"
              >
                {loading
                  ? <ActivityIndicator color="#FFF" />
                  : <StyledText className="text-white font-bold text-lg">Create Account</StyledText>
                }
              </StyledLinearGradient>
            </StyledTouchableOpacity>

            {/* Login Link */}
            <StyledView className="flex-row justify-center mt-6 items-center">
              <StyledText className="text-white/90 text-sm">Already have an account? </StyledText>
              <StyledTouchableOpacity onPress={onLogin}>
                <StyledText className="text-white font-bold text-sm">Login</StyledText>
              </StyledTouchableOpacity>
            </StyledView>

          </StyledBlurView>
        </StyledScroll>
      </StyledKeyboardAvoidingView>
    </StyledImageBackground>
  );
};

export default Signup;