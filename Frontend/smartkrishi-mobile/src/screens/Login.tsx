import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { styled } from 'nativewind';
import { User, Eye, EyeOff, Check } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import { loginUser } from '../lib/api';

WebBrowser.maybeCompleteAuthSession();

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);
const StyledImageBackground = styled(ImageBackground);
const StyledBlurView = styled(BlurView);
const StyledLinearGradient = styled(LinearGradient);
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView);

interface LoginProps {
  onLogin: (name?: string) => void;
  onSignup: () => void;
  onSkip: () => void;
}

const Login = ({ onLogin, onSignup, onSkip }: LoginProps) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   clientId: '748946420826-1gsp9hdgbcppevv25b54kk50nnqb8ip9.apps.googleusercontent.com',
  //   redirectUri: 'https://auth.expo.io/@d_kashyap04/smartkrishi-mobile',
  // });

  // React.useEffect(() => {
  //   if (response?.type === 'success') {
  //     const { authentication } = response;
  //     if (authentication?.accessToken) {
  //       onLogin('Google User');
  //     }
  //   }
  // }, [response]);

const [request, response, promptAsync] = Google.useAuthRequest({
  clientId: '748946420826-1gsp9hdgbcppevv25b54kk50nnqb8ip9.apps.googleusercontent.com',
  redirectUri: AuthSession.makeRedirectUri({
     scheme: 'com.dkashyap04.smartkrishi',
  }),
});

React.useEffect(() => {
  if (request) {
    console.log('https://auth.expo.io/@d_kashyap04/smartkrishi-mobile', request.redirectUri);
  }
}, [request]);


  const handleLogin = async () => {
    if (!phone || !password) {
      Alert.alert('Error', 'Please enter phone number and password.');
      return;
    }
    setLoading(true);
    try {
      const res = await loginUser(phone, password);
      if (res?.success) {
        onLogin(res.data?.user?.name || 'User');
      } else {
        Alert.alert('Login Failed', res?.message || 'Invalid credentials.');
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
        className="flex-1 justify-center px-5"
      >
        <StyledBlurView
          intensity={40}
          tint="dark"
          className="rounded-[24px] overflow-hidden border border-white/40 p-6 shadow-2xl bg-white/10"
        >
          <StyledText className="text-white text-[32px] font-bold mb-2 tracking-tight">Login</StyledText>
          <StyledText className="text-white/90 text-sm mb-8 font-medium">Welcome back, please login to your account</StyledText>

          {/* Phone Input */}
          <StyledView className="border border-white/50 rounded-xl px-4 py-3 flex-row items-center justify-between bg-white/5 mb-4">
            <StyledTextInput
              placeholder="Phone Number"
              placeholderTextColor="rgba(255,255,255,0.8)"
              className="flex-1 text-white text-base py-1"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
            <User size={20} color="rgba(255,255,255,0.8)" />
          </StyledView>

          {/* Password Input */}
          <StyledView className="border border-white/50 rounded-xl px-4 py-3 flex-row items-center justify-between bg-white/5">
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

          {/* Remember Me */}
          <StyledTouchableOpacity
            className="flex-row items-center mt-5 mb-8"
            onPress={() => setRememberMe(!rememberMe)}
          >
            <StyledView className={`w-5 h-5 rounded-[4px] border border-white/60 items-center justify-center mr-3 ${rememberMe ? 'bg-[#7CB342]' : 'bg-transparent'}`}>
              {rememberMe && <Check size={14} color="#FFF" />}
            </StyledView>
            <StyledText className="text-white text-sm font-medium">Remember me</StyledText>
          </StyledTouchableOpacity>

          {/* Login Button */}
          <StyledTouchableOpacity
            className="overflow-hidden rounded-xl shadow-lg"
            onPress={handleLogin}
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
                : <StyledText className="text-white font-bold text-lg">Login</StyledText>
              }
            </StyledLinearGradient>
          </StyledTouchableOpacity>

          {/* Signup Link */}
          <StyledTouchableOpacity onPress={onSkip} className="items-center mt-3">
            <StyledText className="text-white/50 text-sm">Skip now →</StyledText>
          </StyledTouchableOpacity>
          <StyledView className="flex-row justify-center mt-6 items-center">
            <StyledText className="text-white/90 text-sm">No account? </StyledText>
            <TouchableOpacity onPress={onSignup}>
              <StyledText className="text-white font-bold text-sm">Sign Up</StyledText>
            </TouchableOpacity>
          </StyledView>

          {/* Google Login */}
          <StyledView className="items-center mt-8 pt-6 border-t border-white/20">
            <StyledText className="text-white/60 text-[10px] font-black uppercase tracking-[2px] mb-4">Or Continue With</StyledText>
            <StyledTouchableOpacity
              className="flex-row items-center bg-white/10 px-10 py-4 rounded-2xl border border-white/20 shadow-xl"
              onPress={() => promptAsync()}
              disabled={!request}
            >
              <StyledView className="w-6 h-6 mr-3 items-center justify-center">
                <StyledText className="text-white font-black text-xl">G</StyledText>
              </StyledView>
              <StyledText className="text-white font-black text-base">Google Account</StyledText>
            </StyledTouchableOpacity>
          </StyledView>

        </StyledBlurView>
      </StyledKeyboardAvoidingView>
    </StyledImageBackground>
  );
};

export default Login;