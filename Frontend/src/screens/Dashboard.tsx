import React, { useState, useRef, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, ImageBackground, Image, Animated } from 'react-native';
import {
    Bell,
    Leaf,
    Microscope,
    TrendingUp,
    ClipboardList,
    ChevronRight,
    CloudSun,
    User,
    Settings,
    Droplets,
    Wind,
    Sun,
    Home,
    PieChart,
    Thermometer,
    MapPin,
    Calendar
} from 'lucide-react-native';
import { styled } from 'nativewind';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Path } from 'react-native-svg';

import { BlurView } from 'expo-blur';
import { translations, Language } from '../constants/translations';

import * as Location from 'expo-location';
import { fetchWeather, fetchMarketRate } from '../lib/api';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScroll = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledLinearGradient = styled(LinearGradient);
const StyledImageBackground = styled(ImageBackground);
const StyledBlurView = styled(BlurView);

const { width } = Dimensions.get('window');

interface DashboardProps {
    onNavigate: (screen: string) => void;
    language: Language;
    onLocationDetected?: (location: string) => void;
}

const Dashboard = ({ onNavigate, language, onLocationDetected }: DashboardProps) => {
    const t = translations[language];

    const [activeCropIndex, setActiveCropIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef<any>(null);
    const autoScrollRef = useRef<any>(null);
    const autoScrollTimer = useRef<any>(null);

    const SNAP_WIDTH = width * 0.88;

    const [weather, setWeather] = useState({
        temperature: '--',
        humidity: '--',
        wind_speed: '--',
        pressure: '--',
        description: 'Loading...',
        city: '...',
        sunrise: '6:12 AM',
        sunset: '6:48 PM',
        });
        const [marketRates, setMarketRates] = useState([
        { name: t.wheat,   emoji: '🌾', price: '--', trend: 'STABLE' },
        { name: t.rice,    emoji: '🍚', price: '--', trend: 'STABLE' },
        { name: t.soybean, emoji: '🫘', price: '--', trend: 'STABLE' },
        { name: t.mustard, emoji: '🌻', price: '--', trend: 'STABLE' },
        ]);
        const [locationName, setLocationName] = useState('Loading...');
        const [cropRec, setCropRec] = useState('--');

        const getCropImage = (cropName?: string) => {
    const images: { [key: string]: string } = {
        muskmelon: 'https://images.unsplash.com/photo-1571575173700-afb9492e6a50?q=80&w=500',
        wheat:     'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=500',
        rice:      'https://t3.ftcdn.net/jpg/08/41/57/10/360_F_841571074_36z4m8I6mgotOJfCEo84t6IF38Lq2I8h.jpg',
        maize:     'https://t4.ftcdn.net/jpg/04/81/17/71/360_F_481177182_lku1Lo01Qq47FQUzUkbzm1XmCmbOw3ib.webp',
        cotton:    'https://t4.ftcdn.net/jpg/06/84/31/79/360_F_684317966_Pn9qU1DEfW5zpwoj25znJ1i0VdaOM2Px.jpg',
        sugarcane: 'https://t3.ftcdn.net/jpg/09/07/33/02/360_F_907330218_wMQBy6JMZJyv7rUeViMuVFM9DWSrETn5.jpg',
        tomato:    'https://cdn.britannica.com/16/187216-050-CB57A09B/tomatoes-tomato-plant-Fruit-vegetable.jpg',
        potato:    'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=500',
        onion:     'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?q=80&w=500',
        banana:    'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=500',
        mango:     'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=500',
        grapes:    'https://images.unsplash.com/photo-1537640538966-79f369143f8f?q=80&w=500',
        watermelon:'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=500',
        soybean:   'https://static.toiimg.com/thumb/107437958/107437958.jpg?height=746&width=420',
        chickpea:  'https://www.gardenia.net/wp-content/uploads/2023/05/cicer-arietinum-chickpeas-780x520.webp',
        lentil:    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrp5swwCh2E41xcaRfX9JhuE4Z8IMfZZpIvw&s',
    };
    const key = (cropName ?? '').toLowerCase().trim();
    return images[key] || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=500';
};


        const allCropsData: { [key: string]: { soil: string; temp: string; water: string; image: string } } = {
            rice:        { soil: 'Clayey',      temp: '25°C', water: 'Frequent',  image: 'https://t3.ftcdn.net/jpg/08/41/57/10/360_F_841571074_36z4m8I6mgotOJfCEo84t6IF38Lq2I8h.jpg' },
            maize:       { soil: 'Loamy',       temp: '22°C', water: 'Moderate',  image: 'https://t4.ftcdn.net/jpg/04/81/17/71/360_F_481177182_lku1Lo01Qq47FQUzUkbzm1XmCmbOw3ib.webp' },
            chickpea:    { soil: 'Sandy-Loam',  temp: '20°C', water: 'Low',       image: 'https://www.gardenia.net/wp-content/uploads/2023/05/cicer-arietinum-chickpeas-780x520.webp' },
            kidneybeans: { soil: 'Loamy',       temp: '20°C', water: 'Moderate',  image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?q=80&w=500' },
            // pigeonpeas:  { soil: 'Sandy-Loam',  temp: '28°C', water: 'Low',       image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72c4?q=80&w=500' },
            // mothbeans:   { soil: 'Sandy',       temp: '30°C', water: 'Low',       image: 'https://images.unsplash.com/photo-1585996993690-66d9c98e8db2?q=80&w=500' },
            // mungbean:    { soil: 'Loamy',       temp: '28°C', water: 'Moderate',  image: 'https://images.unsplash.com/photo-1585996993690-66d9c98e8db2?q=80&w=500' },
            // blackgram:   { soil: 'Clayey',      temp: '28°C', water: 'Moderate',  image: 'https://images.unsplash.com/photo-1585996993690-66d9c98e8db2?q=80&w=500' },
            lentil:      { soil: 'Sandy-Loam',  temp: '18°C', water: 'Low',       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrp5swwCh2E41xcaRfX9JhuE4Z8IMfZZpIvw&s' },
            pomegranate: { soil: 'Sandy-Loam',  temp: '25°C', water: 'Low',       image: 'https://www.gardenia.net/wp-content/uploads/2019/10/shutterstock_2384779801.jpg' },
            banana:      { soil: 'Loamy',       temp: '27°C', water: 'Frequent',  image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=500' },
            mango:       { soil: 'Loamy',       temp: '27°C', water: 'Moderate',  image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=500' },
            grapes:      { soil: 'Sandy-Loam',  temp: '23°C', water: 'Moderate',  image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?q=80&w=500' },
            watermelon:  { soil: 'Sandy-Loam',  temp: '30°C', water: 'Moderate',  image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=500' },
            muskmelon:   { soil: 'Sandy',       temp: '30°C', water: 'Moderate',  image: 'https://images.unsplash.com/photo-1571575173700-afb9492e6a50?q=80&w=500' },
            apple:       { soil: 'Loamy',       temp: '15°C', water: 'Moderate',  image: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?q=80&w=500' },
            orange:      { soil: 'Loamy',       temp: '22°C', water: 'Moderate',  image: 'https://i.pinimg.com/736x/61/23/e1/6123e1e54a33de953797718103887089.jpg' },
            papaya:      { soil: 'Sandy-Loam',  temp: '30°C', water: 'Moderate',  image: 'https://www.shutterstock.com/image-photo/big-orange-papaya-gree-tree-600nw-2489304241.jpg' },
            // coconut:     { soil: 'Sandy',       temp: '27°C', water: 'Frequent',  image: 'https://images.unsplash.com/photo-1580984969071-a8da8d144b97?q=80&w=500' },
            cotton:      { soil: 'Black',       temp: '28°C', water: 'Moderate',  image: 'https://t4.ftcdn.net/jpg/06/84/31/79/360_F_684317966_Pn9qU1DEfW5zpwoj25znJ1i0VdaOM2Px.jpg' },
            jute:        { soil: 'Loamy',       temp: '28°C', water: 'Frequent',  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmB_gpIDKpYqMZOCLf-qRVsfnDk-AJP2MleQ&s' },
            sugarcane:   { soil: 'Clayey',      temp: '25°C', water: 'Frequent',  image: 'https://t3.ftcdn.net/jpg/09/07/33/02/360_F_907330218_wMQBy6JMZJyv7rUeViMuVFM9DWSrETn5.jpg' },
            tomato:      { soil: 'Loamy',       temp: '25°C', water: 'Frequent',  image: 'https://cdn.britannica.com/16/187216-050-CB57A09B/tomatoes-tomato-plant-Fruit-vegetable.jpg' },
        };

const cropData = useMemo(() => {
    const allCrops = Object.keys(allCropsData);
    
    // Recommended crop pehle, phir baaki
    const recommended = typeof cropRec === 'string' && cropRec !== '--' ? cropRec.toLowerCase() : 'rice';
    const others = allCrops.filter(c => c !== recommended);
    const ordered = [recommended, ...others];

    return ordered.map((cropKey, index) => {
        const info = allCropsData[cropKey] || { soil: 'Loamy', temp: '25°C', water: 'Moderate', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=500' };
        const matchPercent = index === 0 ? '98%' : index === 1 ? '96%' : index === 2 ? '94%' : `${Math.max(70, 92 - index * 2)}%`;
        return {
            name: cropKey.charAt(0).toUpperCase() + cropKey.slice(1),
            match: matchPercent,
            image: info.image,
            soil: info.soil,
            temp: info.temp,
            water: info.water,
            iconColor: '#1B5E20'
        };
    });
}, [cropRec]);

useEffect(() => {
    const timer = setTimeout(() => {
        loadDashboardData();
    }, 1000);
    return () => clearTimeout(timer);
}, []);


        useEffect(() => {
            let currentIndex = 0;
            
            autoScrollTimer.current = setInterval(() => {
                currentIndex = (currentIndex + 1) % cropData.length;
                scrollViewRef.current?.scrollTo({
                    x: currentIndex * SNAP_WIDTH,
                    animated: true
                });
                setActiveCropIndex(currentIndex);
            }, 3000);

            return () => clearInterval(autoScrollTimer.current);
            }, [cropData.length, SNAP_WIDTH]);


        const loadDashboardData = async () => {
            console.log('=== loadDashboardData START ===');
        try {
            // 1. Get location
            console.log('Requesting location permission...');
            const { status } = await Location.requestForegroundPermissionsAsync();
            console.log('Location status:', status); 
            if (status !== 'granted') return;

            const loc = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Low,
                timeInterval: 5000,
                distanceInterval: 0,
            });
            console.log('Got location:', loc.coords.latitude, loc.coords.longitude);

            const lat = loc.coords.latitude;
            const lon = loc.coords.longitude;

            // 2. Reverse geocode - city name
            const geo = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lon });
                if (geo[0]) {
                const city = geo[0].city || geo[0].subregion || geo[0].district || geo[0].region || 'Unknown';
                setLocationName(`${city}, ${geo[0].region || ''}`);
                if (onLocationDetected) onLocationDetected(city);
                console.log('Full geo data:', JSON.stringify(geo[0])); // debug ke liye
                }

            // 3. Weather + Crop from backend
            const weatherRes = await fetchWeather(lat, lon);

            if (weatherRes?.success) {
                const w = weatherRes.data.weather;
                const crop = weatherRes.data.crop;
                
                console.log('Weather data:', JSON.stringify(w)); // debug line
                
                setWeather({
                    temperature: String(w.temperature),
                    humidity:    String(w.humidity),
                    wind_speed:  String(w.wind_speed),
                    pressure:    String(w.pressure),
                    description: w.description || 'CLEAR SKY',
                    city:        w.city || 'Loading...',
                    sunrise: w.sunrise || '6:12 AM',
                    sunset:  w.sunset  || '6:48 PM',
                });
                setCropRec(typeof crop === 'string' && crop.trim() ? crop : '--');
            }


            // 4. Market rates
            const crops = [
            { key: 'wheat',   name: t.wheat,   emoji: '🌾' },
            { key: 'rice',    name: t.rice,    emoji: '🍚' },
            { key: 'soybean', name: t.soybean, emoji: '🫘' },
            { key: 'mustard', name: t.mustard, emoji: '🌻' },
            ];
            const rates = await Promise.all(
            crops.map(c => fetchMarketRate(c.key, 'nagpur'))
            );
            setMarketRates(crops.map((c, i) => ({
            name:  c.name,
            emoji: c.emoji,
            price: rates[i]?.data?.current_price
                ? `₹${rates[i].data.current_price.toLocaleString()}`
                : '--',
            trend: rates[i]?.data?.trend || 'STABLE',
            })));

        } catch (e) {
            console.error('Dashboard load error:', e);
            }
        };


const handleScroll = (event: any) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollOffset / SNAP_WIDTH);
    if (index !== activeCropIndex) {
        setActiveCropIndex(index);
    }
};

    return (
        <StyledView className="flex-1 bg-neo-bg">
            <StyledScroll className="flex-1" showsVerticalScrollIndicator={false}>

                {/* Header Section with Image */}
                <StyledView className="h-[340px] w-full overflow-hidden">
                    <StyledImageBackground
                        source={{ uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop' }}
                        className="flex-1 px-5 pt-12"
                    >
                        <StyledView className="flex-row justify-between items-center">
                            <StyledView className="w-10 h-10" />
                        </StyledView>

                        <StyledView className="mt-8 flex-row justify-between items-start">
                            <StyledView>
                                <StyledText className="text-white font-bold text-lg">{t.welcome}</StyledText>
                                <StyledText className="text-white font-bold text-2xl">Divyanshu</StyledText>
                                <StyledView className="flex-row items-center mt-2">
                                    <MapPin size={12} color="rgba(255,255,255,0.7)" />
                                    <StyledText className="text-white/70 text-xs ml-1 font-medium">{locationName}</StyledText>
                                </StyledView>
                            </StyledView>

                            <StyledView className="items-end">
                                <StyledText className="text-white text-5xl font-bold tracking-tighter">{weather.temperature}°C</StyledText>
                                <StyledView className="flex-row items-center gap-1 mt-1">
                                    <Sun size={14} color="#FFD700" />
                                    <StyledText className="text-white text-xs font-bold uppercase tracking-wider">{weather.description}</StyledText>
                                </StyledView>
                                <StyledView className="flex-row items-center gap-1 mt-1 opacity-60">
                                    {/* <Calendar size={10} color="#FFF" /> */}
                                    <StyledText className="text-white text-[10px]">
                                        {new Date().toLocaleDateString('en-IN', { weekday: 'short' })} | {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                    </StyledText>
                                </StyledView>
                            </StyledView>
                        </StyledView>

                    </StyledImageBackground>
                </StyledView>


                {/* Seamless Content Body with Subtle Organic Texture */}
                <StyledView className="-mt-16 rounded-t-[40px] overflow-hidden shadow-2xl">
                    <StyledImageBackground
                        source={{ uri: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1000&auto=format&fit=crop' }}
                        className="w-full"
                    >
                        <StyledBlurView
                            intensity={30}
                            tint="light"
                            className="px-3 pt-10 pb-40"
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
                        >
                            {/* Crop Recommendation Section Header */}
                            <StyledView className="flex-row justify-between items-center mb-4 px-4">
                                <StyledText className="text-neo-dark font-black text-xl tracking-tight">
                                    {t.crop_recommendation}
                                </StyledText>
                            </StyledView>

                            {/* Sliding Spotlight Carousel */}
                            <Animated.ScrollView 
                                horizontal
                                ref={scrollViewRef} 
                                showsHorizontalScrollIndicator={false}
                                pagingEnabled={false}
                                decelerationRate="fast"
                                snapToInterval={SNAP_WIDTH}
                                snapToAlignment="center"
                                onScroll={Animated.event(
                                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                                    { 
                                        useNativeDriver: false,
                                        listener: (event: any) => {
                                            const index = Math.round(event.nativeEvent.contentOffset.x / SNAP_WIDTH);
                                            if (index !== activeCropIndex) setActiveCropIndex(index);
                                        }
                                    }
                                )}
                                scrollEventThrottle={32}
                                onScrollBeginDrag={() => {
                                    clearInterval(autoScrollRef.current);
                                }}
                                style={{ marginBottom: 16 }}
                                contentContainerStyle={{ paddingHorizontal: 16 }}
                            >
                                {cropData.map((item, index) => (
                                    <StyledView 
                                        key={index}
                                        style={{ width: width * 0.85 }}
                                        className="bg-white/90 rounded-[40px] overflow-hidden shadow-2xl border border-white/60 mr-4"
                                    >
                                        <StyledView className="flex-row h-[180px]">
                                            {/* Spotlight Left */}
                                            <StyledTouchableOpacity className="w-[60%] h-full relative">
                                                <StyledImageBackground source={{ uri: item.image }} className="flex-1" resizeMode="cover">
                                                    <StyledLinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.6)']} className="flex-1 p-5 justify-end">
                                                        <StyledView className="bg-neo-green px-2 py-1 rounded-full self-start mb-2">
                                                            <StyledText className="text-white font-black text-[10px] uppercase">{item.match}</StyledText>
                                                        </StyledView>
                                                        <StyledText className="text-white font-black text-xl">{item.name}</StyledText>
                                                    </StyledLinearGradient>
                                                </StyledImageBackground>
                                            </StyledTouchableOpacity>

                                            {/* Insights Right */}
                                            <StyledView className="w-[40%] bg-white p-4 justify-between border-l border-white/40">
                                                <StyledView className="flex-row items-center gap-2 mb-2">
                                                    <StyledView className="w-1.5 h-1.5 bg-neo-green rounded-full" />
                                                    <StyledText className="text-neo-dark/40 font-black text-[9px] uppercase tracking-wider">Plan Insights</StyledText>
                                                </StyledView>

                                                <StyledView className="gap-y-3">
                                                    <StyledView>
                                                        <StyledText className="text-neo-dark/40 font-bold text-[8px] uppercase">Soil Type</StyledText>
                                                        <StyledText className="text-neo-dark font-black text-[11px]">{item.soil}</StyledText>
                                                    </StyledView>
                                                    <StyledView>
                                                        <StyledText className="text-neo-dark/40 font-bold text-[8px] uppercase">Temperature</StyledText>
                                                        <StyledText className="text-neo-dark font-black text-[11px]">{item.temp}</StyledText>
                                                    </StyledView>
                                                    <StyledView>
                                                        <StyledText className="text-neo-dark/40 font-bold text-[8px] uppercase">Water</StyledText>
                                                        <StyledText className="text-neo-dark font-black text-[11px]">{item.water}</StyledText>
                                                    </StyledView>
                                                </StyledView>
                                            </StyledView>
                                        </StyledView>
                                    </StyledView>
                                ))}
                            </Animated.ScrollView>

                            {/* Pagination Dots */}
                            <StyledView className="flex-row justify-center items-center gap-2 mb-8">
                                {/* {cropData.slice(0, 3).map((_, index) => {  */}
                                {cropData.map((_, index) => {
                                    const dotWidth = scrollX.interpolate({
                                        inputRange: [
                                            (index - 1) * SNAP_WIDTH,
                                            index * SNAP_WIDTH,
                                            (index + 1) * SNAP_WIDTH,
                                        ],
                                        outputRange: [6, 24, 6],
                                        extrapolate: 'clamp',
                                    });

                                    const opacity = scrollX.interpolate({
                                        inputRange: [
                                            (index - 1) * SNAP_WIDTH,
                                            index * SNAP_WIDTH,
                                            (index + 1) * SNAP_WIDTH,
                                        ],
                                        outputRange: [0.3, 1, 0.3],
                                        extrapolate: 'clamp',
                                    });

                                    return (
                                        <Animated.View 
                                            key={index}
                                            style={{ 
                                                width: dotWidth,
                                                opacity: opacity,
                                                height: 6,
                                                borderRadius: 3,
                                                backgroundColor: '#ADFF2F' // neo-green
                                            }}
                                        />
                                    );
                                })}
                            </StyledView>


                            {/* Weather Overview Card */}

                            <StyledView className="bg-white/90 rounded-[40px] p-6 shadow-xl mb-8 border border-white/60">
                                <StyledView className="flex-row justify-between items-center mb-6">
                                    <StyledView>
                                        <StyledText className="text-neo-dark/40 font-black text-[10px] tracking-[2px] uppercase">{t.weather_title}</StyledText>
                                        <StyledText className="text-neo-dark font-bold text-sm">{locationName}</StyledText>
                                    </StyledView>
                                    <StyledView className="w-10 h-10 bg-orange-50 rounded-full items-center justify-center">
                                        <CloudSun size={20} color="#F59E0B" />
                                    </StyledView>
                                </StyledView>

                                {/* Metrics Grid */}
                                <StyledView className="flex-row flex-wrap justify-between gap-y-4 mb-8">
                                    <StyledView className="w-[48%] bg-[#F8FAF9] p-4 rounded-3xl items-center border border-gray-100">
                                        <Droplets size={24} color="#3B82F6" />
                                        <StyledText className="text-neo-dark font-black text-xl mt-2">{weather.humidity}%</StyledText>
                                        <StyledText className="text-gray-400 text-[10px] font-bold">{t.humidity}</StyledText>
                                    </StyledView>

                                    <StyledView className="w-[48%] bg-[#F0F9FF] p-4 rounded-3xl items-center border border-gray-100">
                                        <Wind size={24} color="#06B6D4" />
                                        <StyledText className="text-neo-dark font-black text-xl mt-2">{weather.wind_speed} <StyledText className="text-xs">km/h</StyledText></StyledText>
                                        <StyledText className="text-gray-400 text-[10px] font-bold">{t.wind_speed}</StyledText>
                                    </StyledView>

                                    <StyledView className="w-[48%] bg-[#FAF5FF] p-4 rounded-3xl items-center border border-gray-100">
                                        <PieChart size={24} color="#A855F7" />
                                        <StyledText className="text-neo-dark font-black text-xl mt-2">{weather.pressure}</StyledText>
                                        <StyledText className="text-gray-400 text-[10px] font-bold">{t.pressure}</StyledText>
                                    </StyledView>

                                    <StyledView className="w-[48%] bg-[#FEFCE8] p-4 rounded-3xl items-center border border-gray-100">
                                        <Sun size={24} color="#EAB308" />
                                        <StyledText className="text-neo-dark font-black text-xl mt-2">UV 5</StyledText>
                                        <StyledText className="text-gray-400 text-[10px] font-bold">{t.moderate}</StyledText>
                                    </StyledView>
                                </StyledView>

                                {/* Sunrise/Sunset Solar Cycle */}
                                <StyledView className="pt-6 border-t border-gray-100">
                                    <StyledView className="flex-row justify-between items-center mb-4">
                                        <StyledView className="flex-row items-center gap-2">
                                            <StyledView className="w-8 h-8 bg-orange-100 rounded-full items-center justify-center">
                                                <Sun size={14} color="#F59E0B" />
                                            </StyledView>
                                            <StyledView>
                                                <StyledText className="text-gray-400 text-[8px] font-bold uppercase">{t.sunrise}</StyledText>
                                                <StyledText className="text-neo-dark font-black text-xs">{weather.sunrise}</StyledText>
                                            </StyledView>
                                        </StyledView>

                                        <StyledView className="flex-row items-center gap-2">
                                            <StyledView className="items-end">
                                                <StyledText className="text-gray-400 text-[8px] font-bold uppercase">{t.sunset}</StyledText>
                                                <StyledText className="text-neo-dark font-black text-xs">{weather.sunset}</StyledText>
                                            </StyledView>
                                            <StyledView className="w-8 h-8 bg-blue-50 rounded-full items-center justify-center">
                                                <Sun size={14} color="#3B82F6" />
                                            </StyledView>
                                        </StyledView>
                                    </StyledView>

                                    <StyledView className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <StyledLinearGradient
                                            colors={['#F59E0B', '#3B82F6']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            className="w-[65%] h-full"
                                        />
                                    </StyledView>
                                </StyledView>
                            </StyledView>

                            {/* Action Section */}
                            <StyledView className="flex-row justify-between items-center mb-6 px-2">
                                <StyledText className="text-neo-dark font-black text-2xl">{t.quick_access}</StyledText>
                                <StyledTouchableOpacity onPress={() => onNavigate('explore')}>
                                    <StyledView className="bg-neo-green/20 px-4 py-2 rounded-full border border-neo-green/30">
                                        <StyledText className="text-neo-dark font-black text-xs uppercase">{t.see_all}</StyledText>
                                    </StyledView>
                                </StyledTouchableOpacity>
                            </StyledView>

                            <StyledView className="flex-row flex-wrap justify-between gap-y-5">
                                <StyledTouchableOpacity
                                    onPress={() => onNavigate('scan')}
                                    className="w-[48%] bg-white/70 p-7 rounded-[40px] shadow-sm items-center border border-white/50"
                                >
                                    <StyledView className="w-16 h-16 bg-orange-50 rounded-[24px] items-center justify-center mb-4 border border-orange-100/50">
                                        <Microscope size={32} color="#E65100" />
                                    </StyledView>
                                    <StyledText className="text-neo-dark font-black text-sm">{t.plant_diagnosis}</StyledText>
                                </StyledTouchableOpacity>

                                <StyledTouchableOpacity
                                    onPress={() => onNavigate('crop')}
                                    className="w-[48%] bg-white/70 p-7 rounded-[40px] shadow-sm items-center border border-white/50"
                                >
                                    <StyledView className="w-16 h-16 bg-green-50 rounded-[24px] items-center justify-center mb-4 border border-green-100/50">
                                        <Leaf size={32} color="#1B5E20" />
                                    </StyledView>
                                    <StyledText className="text-neo-dark font-black text-sm">{t.crop_advisory}</StyledText>
                                </StyledTouchableOpacity>
                            </StyledView>
                        </StyledBlurView>
                    </StyledImageBackground>
                </StyledView>

            </StyledScroll>
        </StyledView>
    );
};

export default Dashboard;
