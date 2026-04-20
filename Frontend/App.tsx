import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { styled } from 'nativewind';
// Screens
import SplashScreen from './src/screens/SplashScreen';
import LanguageSelection from './src/screens/LanguageSelection';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Dashboard from './src/screens/Dashboard';
import MarketTrends from './src/screens/MarketTrends';
import CropRecommendation from './src/screens/CropRecommendation';
import PlantScan from './src/screens/PlantScan';
import Chat from './src/screens/Chat';
import History from './src/screens/History';
import ExploreFeatures from './src/screens/ExploreFeatures';
import Profile from './src/screens/Profile';


import { translations, Language } from './src/constants/translations';

import {
  Sparkles,
  Home,
  Leaf,
  TrendingUp,
  Microscope,
  ClipboardList,
  Camera,
  User
} from 'lucide-react-native';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);


export default function App() {
const [currentScreen, setCurrentScreen] = useState('splash');
const [userLanguage, setUserLanguage] = useState('hi');
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [userName, setUserName] = useState('Guest User');
const [locationName, setLocationName] = useState('Kumbharkata');

  const mainScreens = ['dashboard', 'market', 'crop', 'scan', 'profile'];
  const [diagnosisCount, setDiagnosisCount] = useState(0);
  const [advisoryCount, setAdvisoryCount] = useState(0);

  const showNav = mainScreens.includes(currentScreen);
  
  const lang = (userLanguage || 'hi') as Language;
  const t = translations[lang];

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onFinish={() => setCurrentScreen('language')} />;
      case 'language':
        return (
          <LanguageSelection
            onContinue={(lang) => {
              setUserLanguage(lang);
              setCurrentScreen('dashboard');
            }}
          />
        );
        case 'login':
          return (
            <Login
              onLogin={(name?: string) => {
                setIsLoggedIn(true);
                if (name) setUserName(name);
                setCurrentScreen('dashboard');
              }}
              onSignup={() => setCurrentScreen('signup')}
              onSkip={() => setCurrentScreen('dashboard')}
            />
          );
      // case 'login':
      //   return (
      //     <Login
      //       onLogin={() => setCurrentScreen('dashboard')}
      //       onSignup={() => setCurrentScreen('signup')}
      //       onSkip={() => setCurrentScreen('dashboard')}
      //     />
      //   );

      case 'signup':
        return (
          <Signup
            onSignup={(name?: string) => {
              setIsLoggedIn(true);
              if (name) setUserName(name);
              setCurrentScreen('dashboard');
            }}
            onLogin={() => setCurrentScreen('login')}
          />
        );
      // case 'signup':
      //   return (
      //     <Signup
      //       onSignup={() => setCurrentScreen('dashboard')}
      //       onLogin={() => setCurrentScreen('login')}
      //     />
      //   );
        case 'dashboard':
          return <Dashboard language={lang} onNavigate={(screen) => setCurrentScreen(screen)} onLocationDetected={(loc) => setLocationName(loc)} />;
      // case 'dashboard':
      //   return <Dashboard language={lang} onNavigate={(screen) => setCurrentScreen(screen)} onLocationDetected={(loc) => setLocationName(loc)} />;
      case 'market':
        return <MarketTrends language={lang} onBack={() => setCurrentScreen('dashboard')} onOpenChat={() => setCurrentScreen('chat')} userLocation={locationName} />;
      // case 'market':
      //   return <MarketTrends language={lang} onBack={() => setCurrentScreen('dashboard')} onOpenChat={() => setCurrentScreen('chat')} />;
      case 'crop':
        return (
          <CropRecommendation
            language={lang}
            onBack={() => setCurrentScreen('dashboard')}
            onOpenChat={() => setCurrentScreen('chat')}
            onAdvisoryComplete={() => setAdvisoryCount((prev) => prev + 1)}
          />
        );
      case 'scan':
        return (
          <PlantScan
            language={lang}
            onBack={() => setCurrentScreen('dashboard')}
            onOpenChat={() => setCurrentScreen('chat')}
            onDiagnosisComplete={() => setDiagnosisCount((prev) => prev + 1)}
          />
        );
      case 'chat':
        return <Chat language={lang} onBack={() => setCurrentScreen('dashboard')} />;
      case 'history':
        return <History language={lang} onBack={() => setCurrentScreen('dashboard')} />;
      case 'profile':
        return (
          <Profile
            language={lang}
            onNavigate={(screen) => setCurrentScreen(screen)}
            onLogout={() => {
              setIsLoggedIn(false);
              setUserName('Guest User');
              setCurrentScreen('login');
            }}
            isLoggedIn={isLoggedIn}
            userName={userName}
            diagnosisCount={diagnosisCount}
            advisoryCount={advisoryCount}
          />
        );
      case 'explore':
        return <ExploreFeatures language={lang} onNavigate={(screen) => setCurrentScreen(screen)} onBack={() => setCurrentScreen('dashboard')} />;
      default:
        return <Dashboard language={lang} onNavigate={(screen) => setCurrentScreen(screen)} />;
    }
  };

  return (
    <StyledView className="flex-1 bg-white">
      <StatusBar style="dark" />
      {renderScreen()}

      {/* Krishi AI Agent - Positioned above Navigation Bar */}
      {showNav && (
        <StyledTouchableOpacity
          className="absolute bottom-28 right-6 w-14 h-14 rounded-full bg-[#0E3A24] items-center justify-center shadow-lg shadow-[#0E3A24]/50 z-50"
          onPress={() => setCurrentScreen('chat')}
        >
          <Sparkles size={24} color="#FFF" />
        </StyledTouchableOpacity>
      )}

      {/* Global Navigation Bar - Premium Rounded Full-Width */}
      {showNav && (
        <StyledView className="absolute bottom-0 left-0 right-0 h-24 bg-white flex-row items-center justify-around px-4 shadow-[0_-15px_30px_rgba(0,0,0,0.05)] border-t border-gray-50 rounded-t-[40px] pb-2">

          <StyledTouchableOpacity
            className="items-center flex-1 py-2"
            onPress={() => setCurrentScreen('dashboard')}
          >
            <Home size={22} color={currentScreen === 'dashboard' ? '#4ADE80' : '#000'} opacity={currentScreen === 'dashboard' ? 1 : 0.3} />
            <StyledText className={`text-[10px] mt-1 ${currentScreen === 'dashboard' ? 'text-neo-green font-bold' : 'text-black opacity-30'}`}>{t.home}</StyledText>
          </StyledTouchableOpacity>

          <StyledTouchableOpacity
            onPress={() => setCurrentScreen('crop')}
            className="items-center flex-1 py-2"
          >
            <Leaf size={22} color={currentScreen === 'crop' ? '#4ADE80' : '#000'} opacity={currentScreen === 'crop' ? 1 : 0.3} />
            <StyledText className={`text-[10px] mt-1 ${currentScreen === 'crop' ? 'text-neo-green font-bold' : 'text-black opacity-30'}`}>{t.crops}</StyledText>
          </StyledTouchableOpacity>

          <StyledTouchableOpacity
            onPress={() => setCurrentScreen('scan')}
            className="items-center flex-1 py-2"
          >
            <Camera size={22} color={currentScreen === 'scan' ? '#4ADE80' : '#000'} opacity={currentScreen === 'scan' ? 1 : 0.3} />
            <StyledText className={`text-[10px] mt-1 ${currentScreen === 'scan' ? 'text-neo-green font-bold' : 'text-black opacity-30'}`}>{t.scan}</StyledText>
          </StyledTouchableOpacity>

          <StyledTouchableOpacity
            onPress={() => setCurrentScreen('market')}
            className="items-center flex-1 py-2"
          >
            <TrendingUp size={22} color={currentScreen === 'market' ? '#4ADE80' : '#000'} opacity={currentScreen === 'market' ? 1 : 0.3} />
            <StyledText className={`text-[10px] mt-1 ${currentScreen === 'market' ? 'text-neo-green font-bold' : 'text-black opacity-30'}`}>{t.market}</StyledText>
          </StyledTouchableOpacity>

          <StyledTouchableOpacity
            onPress={() => setCurrentScreen('profile')}
            className="items-center flex-1 py-2"
          >
            <User size={22} color={currentScreen === 'profile' ? '#4ADE80' : '#000'} opacity={currentScreen === 'profile' ? 1 : 0.3} />
            <StyledText className={`text-[10px] mt-1 ${currentScreen === 'profile' ? 'text-neo-green font-bold' : 'text-black opacity-30'}`}>{t.profile}</StyledText>
          </StyledTouchableOpacity>

        </StyledView>
      )}

    </StyledView>
  );
}




