import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView, Alert, Modal, TextInput, Linking } from 'react-native';
import { 
  MapPin, 
  History as HistoryIcon, 
  ChevronRight, 
  LogIn,
  Camera,
  ShieldCheck, 
  Languages, 
  Bell,
  Activity,
  Microscope,
  TrendingUp,
  Leaf,
  Star,
  Info,
  Lock,
  Trash2,
  MessageCircle,
  X
} from 'lucide-react-native';
import { styled } from 'nativewind';
import { translations, Language } from '../constants/translations';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { fetchMarketRate } from '../lib/api';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScroll = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);
const StyledTextInput = styled(TextInput);

interface ProfileProps {
  onNavigate: (screen: string) => void;
  onLogout: () => void;
  language: Language;
  isLoggedIn?: boolean;
  userName?: string;
  diagnosisCount?: number;
  advisoryCount?: number;
}

const MenuOption = ({ icon: Icon, title, subtitle, onPress, color = "#0E3A24" }: any) => (
  <StyledTouchableOpacity
    onPress={onPress}
    className="flex-row items-center justify-between py-5 border-b border-gray-100"
  >
    <StyledView className="flex-row items-center">
      <StyledView className="w-12 h-12 rounded-2xl items-center justify-center" style={{ backgroundColor: `${color}10` }}>
        <Icon size={22} color={color} />
      </StyledView>
      <StyledView className="ml-4">
        <StyledText className="text-neo-dark font-black text-sm">{title}</StyledText>
        {subtitle && <StyledText className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter mt-0.5">{subtitle}</StyledText>}
      </StyledView>
    </StyledView>
    <ChevronRight size={18} color="#D1D5DB" />
  </StyledTouchableOpacity>
);

const Profile = ({
  onNavigate,
  onLogout,
  language,
  isLoggedIn = false,
  userName = 'Guest User',
  diagnosisCount = 0,
  advisoryCount = 0,
}: ProfileProps) => {
  const t = translations[language];
  const [profileImage, setProfileImage] = useState<string | null>(null);
  useEffect(() => {
  AsyncStorage.getItem('profileImage').then(img => {
    if (img) setProfileImage(img);
  });
}, []);
  const [locationName, setLocationName] = useState('Detecting location...');
  const [marketRate, setMarketRate] = useState<string>('--');
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [suggestion, setSuggestion] = useState('');

  useEffect(() => {
    loadLocation();
    loadMarketRate();
  }, []);

  const loadLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') { setLocationName('Location not available'); return; }
      const loc = await Location.getCurrentPositionAsync({});
      const geo = await Location.reverseGeocodeAsync({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
      if (geo[0]) {
        const city = geo[0].city || geo[0].subregion || geo[0].district || 'Unknown';
        setLocationName(`${city}, ${geo[0].region || ''}`);
      }
    } catch (e) { setLocationName('Location unavailable'); }
  };

  const loadMarketRate = async () => {
    try {
      const res = await fetchMarketRate('wheat', 'nagpur');
      if (res?.success && res?.data?.current_price) {
        setMarketRate(`₹${res.data.current_price.toLocaleString()}`);
      }
    } catch (e) { setMarketRate('--'); }
  };

  const handlePickImage = async () => {
    Alert.alert('Profile Photo', 'Choose an option', [
      {
        text: 'Camera',
        onPress: async () => {
          const { status } = await ImagePicker.requestCameraPermissionsAsync();
          if (status !== 'granted') { Alert.alert('Permission denied', 'Camera access is required.'); return; }
          const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.8 });
          if (!result.canceled) {
            const uri = result.assets[0].uri;
            setProfileImage(uri);
            await AsyncStorage.setItem('profileImage', uri);
          }
        },
      },
      {
        text: 'Gallery',
        onPress: async () => {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') { Alert.alert('Permission denied', 'Gallery access is required.'); return; }
          const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.8 });
          if (!result.canceled) {
            const uri = result.assets[0].uri;
            setProfileImage(uri);
            await AsyncStorage.setItem('profileImage', uri);
          }
        },
      },

      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleSendRating = () => {
    if (rating === 0) { Alert.alert('Rating Required', 'Please select a star rating before submitting.'); return; }
    const stars = '⭐'.repeat(rating);
    const message = `SmartKrishi App Review\n\nUser: ${userName}\nRating: ${stars} (${rating}/5)\n\nSuggestion:\n${suggestion || 'No suggestion provided.'}`;
    const whatsappUrl = `whatsapp://send?phone=919110953362&text=${encodeURIComponent(message)}`;
    Linking.canOpenURL(whatsappUrl).then((supported) => {
      if (supported) {
        Linking.openURL(whatsappUrl);
        setShowRatingModal(false);
        setRating(0);
        setSuggestion('');
      } else {
        Alert.alert('WhatsApp not found', 'Please install WhatsApp to send feedback.');
      }
    });
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to permanently delete your account? This action cannot be undone and all your data will be lost.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => { setShowSecurityModal(false); onLogout(); Alert.alert('Account Deleted', 'Your account has been permanently deleted.'); } },
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FBF8' }}>
      <StyledScroll className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>

        {/* Profile Header */}
        <StyledView className="px-5 pt-8 mb-8">
          <StyledView className="bg-white rounded-[40px] p-8 shadow-sm">
            <StyledView className="items-center">
              <TouchableOpacity onPress={handlePickImage}>
                <StyledView className="w-28 h-28 rounded-full border-4 border-neo-green/20 overflow-hidden bg-gray-50 items-center justify-center">
                  {profileImage ? (
                    <Image source={{ uri: profileImage }} style={{ width: 112, height: 112, borderRadius: 56 }} />
                  ) : (
                    <Camera size={44} color="#1B5E20" />
                  )}
                </StyledView>
                <StyledView className="absolute bottom-0 right-0 w-8 h-8 bg-neo-dark rounded-full items-center justify-center border-2 border-white">
                  <Camera size={14} color="#FFF" />
                </StyledView>
              </TouchableOpacity>
              <StyledText className="text-neo-dark font-black text-2xl mt-4">
                {isLoggedIn ? userName : 'Guest User'}
              </StyledText>
              <StyledView className="flex-row items-center mt-1">
                <MapPin size={12} color="#1B5E20" />
                <StyledText className="text-gray-500 text-xs font-bold ml-1">{locationName}</StyledText>
              </StyledView>
            </StyledView>

            {/* Stats */}
            <StyledView className="flex-row justify-around mt-8 pt-6 border-t border-gray-50">
              <StyledView className="items-center">
                <StyledView className="bg-orange-50 w-10 h-10 rounded-2xl items-center justify-center mb-3">
                  <Microscope size={20} color="#E65100" />
                </StyledView>
                <StyledText className="text-neo-dark font-black text-xl">{isLoggedIn ? diagnosisCount : '--'}</StyledText>
                <StyledText className="text-gray-400 text-[10px] uppercase font-bold tracking-tight mt-1">{t.diagnosis_stat}</StyledText>
              </StyledView>
              <StyledView className="w-[1px] h-12 bg-gray-100 self-center" />
              <StyledView className="items-center">
                <StyledView className="bg-blue-50 w-10 h-10 rounded-2xl items-center justify-center mb-3">
                  <TrendingUp size={20} color="#0D47A1" />
                </StyledView>
                <StyledText className="text-neo-dark font-black text-xl">{marketRate}<StyledText className="text-xs">/kg</StyledText></StyledText>
                <StyledText className="text-gray-400 text-[10px] uppercase font-bold tracking-tight mt-1">Wheat Rate</StyledText>
              </StyledView>
              <StyledView className="w-[1px] h-12 bg-gray-100 self-center" />
              <StyledView className="items-center">
                <StyledView className="bg-green-50 w-10 h-10 rounded-2xl items-center justify-center mb-3">
                  <Leaf size={20} color="#1B5E20" />
                </StyledView>
                <StyledText className="text-neo-dark font-black text-xl">{isLoggedIn ? advisoryCount : '--'}</StyledText>
                <StyledText className="text-gray-400 text-[10px] uppercase font-bold tracking-tight mt-1">{t.advisory_stat}</StyledText>
              </StyledView>
            </StyledView>
          </StyledView>
        </StyledView>

        {/* Menu */}
        <StyledView className="px-8">
          <StyledText className="text-gray-400 text-xs font-black uppercase tracking-widest mb-2">{t.activities}</StyledText>
          <StyledView className="mb-8">
            <MenuOption icon={HistoryIcon} title={t.farming_history} subtitle="Past scans and harvests"
              onPress={() => isLoggedIn ? onNavigate('history') : Alert.alert('Login Required', 'Please login to view your farming history.')}
              color="#0D47A1" />
            <MenuOption icon={Activity} title="My Statistics" subtitle="Progress over time"
              onPress={() => isLoggedIn ? {} : Alert.alert('Login Required', 'Please login to view your statistics.')}
              color="#43A047" />
          </StyledView>

          <StyledText className="text-gray-400 text-xs font-black uppercase tracking-widest mb-2">{t.settings}</StyledText>
          <StyledView className="mb-8">
            <MenuOption icon={Languages} title={t.app_language} subtitle="Hindi / English / Odia"
              onPress={() => onNavigate('language')} color="#6A1B9A" />
            <MenuOption icon={Bell} title={t.notifications} subtitle="Alerts and updates"
              onPress={() => Alert.alert('Notifications', 'Notification settings coming soon.')} color="#E65100" />
            <MenuOption icon={ShieldCheck} title="Security & Privacy" subtitle="Password, data and account control"
              onPress={() => isLoggedIn ? setShowSecurityModal(true) : Alert.alert('Login Required', 'Please login to access security settings.')}
              color="#37474F" />
            <MenuOption icon={Info} title="About SmartKrishi" subtitle="Version, licenses and developer info"
              onPress={() => setShowAboutModal(true)} color="#0277BD" />
            <MenuOption icon={Star} title="Rate the App" subtitle="Share your experience and suggestions"
              onPress={() => setShowRatingModal(true) }
              color="#F9A825" />
          </StyledView>

          <StyledTouchableOpacity
          onPress={isLoggedIn ? () => Alert.alert('Logout', 'Are you sure you want to logout?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Logout', style: 'destructive', onPress: onLogout },
          ]) : onLogout}
          className={`flex-row items-center justify-center py-5 rounded-[28px] border ${
            isLoggedIn 
              ? 'bg-red-50 border-red-200' 
              : 'bg-neo-green/10 border-neo-green/20'
          }`}
        >
          <LogIn size={20} color={isLoggedIn ? '#C62828' : '#1B5E20'} strokeWidth={3} />
          <StyledText className={`font-black text-base ml-3 ${isLoggedIn ? 'text-red-700' : 'text-[#1B5E20]'}`}>
            {isLoggedIn ? 'Logout' : t.login}
          </StyledText>
        </StyledTouchableOpacity>

          <StyledView className="items-center mt-8">
            <StyledText className="text-gray-300 text-[10px] font-bold">SMARTKRISHI V 1.0.4</StyledText>
          </StyledView>
        </StyledView>
      </StyledScroll>

      {/* ===== RATING MODAL ===== */}
      <Modal visible={showRatingModal} transparent animationType="slide">
        <StyledView className="flex-1 justify-end bg-black/50">
          <StyledView className="bg-white rounded-t-[40px] p-8">
            <StyledView className="flex-row justify-between items-center mb-6">
              <StyledText className="text-neo-dark font-black text-xl">Rate SmartKrishi</StyledText>
              <TouchableOpacity onPress={() => setShowRatingModal(false)}>
                <X size={24} color="#9CA3AF" />
              </TouchableOpacity>
            </StyledView>
            <StyledText className="text-gray-500 text-sm mb-6 text-center">
              Your feedback helps us improve the app for farmers across India.
            </StyledText>
            <StyledView className="flex-row justify-center mb-6" style={{ gap: 12 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <Text style={{ fontSize: 40 }}>{star <= rating ? '⭐' : '☆'}</Text>
                </TouchableOpacity>
              ))}
            </StyledView>
            <StyledText className="text-center text-gray-400 text-sm mb-6 font-bold">
              {rating === 1 ? 'Poor' : rating === 2 ? 'Fair' : rating === 3 ? 'Good' : rating === 4 ? 'Very Good' : rating === 5 ? 'Excellent! 🎉' : 'Tap a star to rate'}
            </StyledText>
            <StyledView className="border border-gray-200 rounded-2xl p-4 mb-6 bg-gray-50">
              <StyledTextInput
                placeholder="Share your suggestions, bug reports or feedback..."
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={4}
                style={{ minHeight: 80, textAlignVertical: 'top', color: '#0E3A24' }}
                value={suggestion}
                onChangeText={setSuggestion}
              />
            </StyledView>
            <StyledTouchableOpacity
              onPress={handleSendRating}
              className="bg-neo-dark py-4 rounded-2xl flex-row items-center justify-center"
            >
              <MessageCircle size={20} color="#FFF" />
              <StyledText className="text-white font-black text-base ml-2">Send via WhatsApp</StyledText>
            </StyledTouchableOpacity>
            <StyledText className="text-center text-gray-300 text-xs mt-4">
              Your review will be sent to the developer via WhatsApp
            </StyledText>
          </StyledView>
        </StyledView>
      </Modal>

      {/* ===== SECURITY MODAL ===== */}
      <Modal visible={showSecurityModal} transparent animationType="slide">
        <StyledView className="flex-1 justify-end bg-black/50">
          <StyledView className="bg-white rounded-t-[40px] p-8">
            <StyledView className="flex-row justify-between items-center mb-6">
              <StyledText className="text-neo-dark font-black text-xl">Security & Privacy</StyledText>
              <TouchableOpacity onPress={() => setShowSecurityModal(false)}>
                <X size={24} color="#9CA3AF" />
              </TouchableOpacity>
            </StyledView>
            <StyledTouchableOpacity
              onPress={() => { setShowSecurityModal(false); Alert.alert('Change Password', 'A password reset link will be sent to your registered contact.'); }}
              className="flex-row items-center py-5 border-b border-gray-100"
            >
              <StyledView className="w-12 h-12 rounded-2xl bg-blue-50 items-center justify-center mr-4">
                <Lock size={22} color="#0D47A1" />
              </StyledView>
              <StyledView className="flex-1">
                <StyledText className="text-neo-dark font-black text-sm">Change Password</StyledText>
                <StyledText className="text-gray-400 text-[10px] uppercase font-bold mt-0.5">Update your account password</StyledText>
              </StyledView>
              <ChevronRight size={18} color="#D1D5DB" />
            </StyledTouchableOpacity>
            <StyledTouchableOpacity
              onPress={() => Alert.alert('Data Privacy Policy', 'SmartKrishi collects only the data necessary to provide agricultural recommendations. Your personal data is never shared with third parties. All data is stored securely on our servers.\n\nFor any privacy concerns, contact us via WhatsApp.')}
              className="flex-row items-center py-5 border-b border-gray-100"
            >
              <StyledView className="w-12 h-12 rounded-2xl bg-green-50 items-center justify-center mr-4">
                <ShieldCheck size={22} color="#1B5E20" />
              </StyledView>
              <StyledView className="flex-1">
                <StyledText className="text-neo-dark font-black text-sm">Data Privacy Policy</StyledText>
                <StyledText className="text-gray-400 text-[10px] uppercase font-bold mt-0.5">How we use your data</StyledText>
              </StyledView>
              <ChevronRight size={18} color="#D1D5DB" />
            </StyledTouchableOpacity>
            <StyledTouchableOpacity
              onPress={() => Alert.alert('Two-Factor Authentication', 'Two-factor authentication via OTP will be available in the next update.')}
              className="flex-row items-center py-5 border-b border-gray-100"
            >
              <StyledView className="w-12 h-12 rounded-2xl bg-purple-50 items-center justify-center mr-4">
                <ShieldCheck size={22} color="#6A1B9A" />
              </StyledView>
              <StyledView className="flex-1">
                <StyledText className="text-neo-dark font-black text-sm">Two-Factor Authentication</StyledText>
                <StyledText className="text-gray-400 text-[10px] uppercase font-bold mt-0.5">Add extra layer of security</StyledText>
              </StyledView>
              <ChevronRight size={18} color="#D1D5DB" />
            </StyledTouchableOpacity>
            <StyledTouchableOpacity onPress={handleDeleteAccount} className="flex-row items-center py-5">
              <StyledView className="w-12 h-12 rounded-2xl bg-red-50 items-center justify-center mr-4">
                <Trash2 size={22} color="#C62828" />
              </StyledView>
              <StyledView className="flex-1">
                <StyledText className="text-red-700 font-black text-sm">Delete Account</StyledText>
                <StyledText className="text-gray-400 text-[10px] uppercase font-bold mt-0.5">Permanently remove your account and data</StyledText>
              </StyledView>
              <ChevronRight size={18} color="#D1D5DB" />
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      </Modal>

      {/* ===== ABOUT MODAL ===== */}
      <Modal visible={showAboutModal} transparent animationType="slide">
        <StyledView className="flex-1 justify-end bg-black/50">
          <StyledView className="bg-white rounded-t-[40px] p-8" style={{ maxHeight: '92%' }}>
            <StyledView className="flex-row justify-between items-center mb-6">
              <StyledText className="text-neo-dark font-black text-xl">About SmartKrishi</StyledText>
              <TouchableOpacity onPress={() => setShowAboutModal(false)}>
                <X size={24} color="#9CA3AF" />
              </TouchableOpacity>
            </StyledView>

            <ScrollView showsVerticalScrollIndicator={false}>

              {/* Logo + App Name */}
              <StyledView className="items-center mb-6">
                <Image
                  source={require('../../assets/logo.png')}
                  style={{ width: 100, height: 100, borderRadius: 24, marginBottom: 12 }}
                  resizeMode="contain"
                />
                <StyledText className="text-neo-dark font-black text-2xl">SmartKrishi</StyledText>
                <StyledText className="text-gray-400 text-sm mt-1">Version 1.0.4</StyledText>
                <StyledText className="text-gray-400 text-xs mt-1">{"Built with ❤️ for Indian Farmers"}</StyledText>
              </StyledView>

              {/* About Text */}
              <StyledView className="bg-gray-50 rounded-2xl p-4 mb-5">
                <StyledText className="text-gray-700 text-xs leading-6">
                  {"SmartKrishi is an AI-powered agricultural advisory platform designed to help farmers across India make informed decisions about crop health, market rates, and farming practices."}
                </StyledText>
              </StyledView>

              {/* Developer Card */}
              <StyledView className="bg-neo-dark rounded-2xl p-5 mb-5">
                <StyledView className="flex-row items-center mb-4">
                  <StyledView className="w-12 h-12 bg-neo-green/20 rounded-full items-center justify-center mr-3">
                    <Text style={{ fontSize: 22 }}>👨‍💻</Text>
                  </StyledView>
                  <StyledView>
                    <StyledText className="text-white font-black text-base">Divyanshu Kumar</StyledText>
                    {/* <StyledText className="text-white/50 text-xs font-bold">Full Stack AI Developer</StyledText> */}
                  </StyledView>
                </StyledView>
                <StyledText className="text-white/70 text-xs leading-5 mb-4">
                  {"Passionate about building intelligent solutions for real-world problems. SmartKrishi is designed to empower Indian farmers with AI-driven insights, making modern agriculture accessible to everyone."}
                </StyledText>
                <StyledView className="border-t border-white/10 pt-4">
                  <StyledTouchableOpacity className="flex-row items-center mb-3" onPress={() => Linking.openURL('tel:9110953362')}>
                    <StyledText className="text-xs font-bold mr-2">📞</StyledText>
                    <StyledText className="text-white/70 text-xs ml-2">+91 9110953362</StyledText>
                  </StyledTouchableOpacity>
                  <StyledTouchableOpacity className="flex-row items-center mb-3" onPress={() => Linking.openURL('mailto:divyanshukumar29042004@gmail.com')}>
                    <StyledText className="text-xs font-bold mr-2">✉️</StyledText>
                    <StyledText className="text-white/70 text-xs ml-2">divyanshukumar29042004@gmail.com</StyledText>
                  </StyledTouchableOpacity>
                  <StyledTouchableOpacity className="flex-row items-center" onPress={() => Linking.openURL('https://www.linkedin.com/in/divyanshu-kumar04')}>
                    <StyledText className="text-xs font-bold mr-2">💼</StyledText>
                    <StyledText className="text-white/70 text-xs ml-2">linkedin.com/in/divyanshu-kumar04</StyledText>
                  </StyledTouchableOpacity>
                </StyledView>
              </StyledView>

              {/* Tech Info */}
              {/* <StyledView className="bg-gray-50 rounded-2xl p-5 mb-5">
                <StyledView className="flex-row justify-between py-2 border-b border-gray-100">
                  <StyledText className="text-gray-400 text-xs font-bold uppercase">Tech Stack</StyledText>
                  <StyledText className="text-neo-dark text-xs font-black">React Native + Flask AI</StyledText>
                </StyledView>
                <StyledView className="flex-row justify-between py-2 border-b border-gray-100">
                  <StyledText className="text-gray-400 text-xs font-bold uppercase">AI Models</StyledText>
                  <StyledText className="text-neo-dark text-xs font-black">CNN + RandomForest</StyledText>
                </StyledView>
                <StyledView className="flex-row justify-between py-2 border-b border-gray-100">
                  <StyledText className="text-gray-400 text-xs font-bold uppercase">Database</StyledText>
                  <StyledText className="text-neo-dark text-xs font-black">PostgreSQL</StyledText>
                </StyledView>
                <StyledView className="flex-row justify-between py-2">
                  <StyledText className="text-gray-400 text-xs font-bold uppercase">Released</StyledText>
                  <StyledText className="text-neo-dark text-xs font-black">April 2026</StyledText>
                </StyledView>
              </StyledView> */}

              {/* License */}
              <StyledView className="bg-gray-50 rounded-2xl p-4 mb-5">
                <StyledText className="text-neo-dark text-sm font-bold mb-2">Version 1.0.4</StyledText>
                <StyledText className="text-gray-600 text-xs mb-2">{"© 2026 SmartKrishi. All rights reserved."}</StyledText>
                <StyledText className="text-gray-600 text-xs">This app uses open-source libraries. See documentation for license details.</StyledText>
              </StyledView>

              {/* Contact Button */}
              <StyledTouchableOpacity
                onPress={() => {
                  const msg = `Hello, I am using SmartKrishi App (v1.0.4). I have a query.`;
                  Linking.openURL(`whatsapp://send?phone=919110953362&text=${encodeURIComponent(msg)}`);
                }}
                className="bg-neo-dark py-4 rounded-2xl flex-row items-center justify-center mb-8"
              >
                <MessageCircle size={20} color="#4ADE80" />
                <StyledText className="text-white font-black text-base ml-2">Contact Developer</StyledText>
              </StyledTouchableOpacity>

            </ScrollView>
          </StyledView>
        </StyledView>
      </Modal>

    </SafeAreaView>
  );
};

export default Profile;