  import React, { useState , useRef } from 'react';
  import { Animated } from 'react-native';
  import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, RefreshControl } from 'react-native';
  import { styled } from 'nativewind';
  import { ArrowLeft, Search, TrendingUp, TrendingDown, MapPin, Filter } from 'lucide-react-native';
  import { LineChart } from 'react-native-chart-kit';
  import { Dimensions } from 'react-native';
  import { translations, Language } from '../constants/translations';
  import { fetchMarketRate } from '../lib/api';
  import { useEffect } from 'react';

  const StyledView = styled(View);
  const StyledText = styled(Text);
  const StyledScroll = styled(ScrollView);
  const StyledTouchableOpacity = styled(TouchableOpacity);
  const StyledTextInput = styled(TextInput);

  const screenWidth = Dimensions.get('window').width;

  const MarketTrends = ({ onBack, onOpenChat, language, userLocation = 'sambalpur' }: { onBack: () => void; onOpenChat: () => void; language: Language; userLocation?: string }) => {
    const t = translations[language];
    const getNearestMandi = (location: string) => {
        console.log('userLocation value:', location);
        const mandis: {[key: string]: string} = {
          'Rourkela':    'Rourkela',
          'Kumbharkata': 'Rourkela',
          'Sundargarh':  'Sundargarh',
          'Sambalpur':   'Sambalpur',
          'Jharsuguda':  'Jharsuguda',
          'Bargarh':     'Bargarh',
          'Bolangir':    'Bolangir',
          'Balangir':    'Bolangir',
          'Bhubaneswar': 'Bhubaneswar',
          'Cuttack':     'Cuttack',
          'Berhampur':   'Berhampur',
          'Puri':        'Puri',
          'Baripada':    'Baripada',
          'Koraput':     'Koraput',
          'Rayagada':    'Rayagada',
        };
  
          console.log('userLocation value:', location);
          const matched = (() => {
            for (const [city, mandi] of Object.entries(mandis)) {
              if (location?.toLowerCase().includes(city.toLowerCase())) {
                return mandi;
              }
            }
            return 'Sambalpur';
          })();
          console.log('matched mandi:', matched);
          return matched;
      };
  
    const nearestMandi = getNearestMandi(userLocation || '');
    const animatedData = useRef(new Animated.Value(0)).current;
    const [chartProgress, setChartProgress] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    const finalData = [3000, 3200, 3100, 3400, 3300, 3500];
    const startData = [2800, 2800, 2800, 2800, 2800, 2800];

    const chartData = finalData.map((val, i) =>
      Math.round(startData[i] + (val - startData[i]) * chartProgress)
    );

    useEffect(() => {
      let frame = 0;
      const total = 40;
      const interval = setInterval(() => {
        frame++;
        setChartProgress(frame / total);
        if (frame >= total) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    }, []);

    // useEffect(() => {
    //   Animated.timing(animatedData, {
    //     toValue: 1,
    //     duration: 1500,
    //     useNativeDriver: false,
    //   }).start();

    //   // Chart data animate — values gradually increase
    //   const steps = 20;
    //   const baseData = [3000, 3200, 3100, 3400, 3300, 3500];
    //   const startData = [2800, 2800, 2800, 2800, 2800, 2800];
    //   let step = 0;

    //   const interval = setInterval(() => {
    //     step++;
    //     const progress = step / steps;
    //     setChartData(baseData.map((val, i) => 
    //       Math.round(startData[i] + (val - startData[i]) * progress)
    //     ));
    //     if (step >= steps) clearInterval(interval);
    //   }, 50);

    //   return () => clearInterval(interval);
    // }, []);
    const [searchQuery, setSearchQuery] = useState('');
    const [marketData, setMarketData] = useState<Array<{id: string; crop: string; price: string; trend: 'up' | 'down'; mandi: string; change: string}>>([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
    loadMarketData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadMarketData();
    setRefreshing(false);
  };

  const loadMarketData = async () => {
    setLoading(true);
    try {
      console.log('Loading market data...');
      const CROPS = [
        { key: 'wheat',      label: 'Wheat (Gehun)',      mandi:'Sambalpur'},
        { key: 'rice',       label: 'Rice (Paddy)',        mandi: 'Jharsuguda' },
        { key: 'maize',      label: 'Maize (Makka)',       mandi: 'Bhubaneswar'},
        { key: 'soybean',    label: 'Soybean',             mandi: 'Rourkela'},
        { key: 'mustard',    label: 'Mustard (Sarson)',    mandi: 'Cuttack' },
        { key: 'cotton',     label: 'Cotton (Kapas)',      mandi: 'Puri' },
        { key: 'tomato',     label: 'Tomato (Tamatar)',    mandi: 'Bargarh'},
        { key: 'potato',     label: 'Potato (Aloo)',       mandi: 'Sundargarh'},
        { key: 'onion',      label: 'Onion (Pyaaz)',       mandi: 'Bargarh' },
        { key: 'chana',      label: 'Chana (Gram)',         mandi: 'Sambalpur'},
        { key: 'arhar',      label: 'Arhar (Tur Dal)',      mandi: 'Berhampur' },
      ];
      const results = await Promise.all(
        CROPS.map(c => fetchMarketRate(c.key, 'nagpur'))
      );
      console.log('Results:', JSON.stringify(results));
      setMarketData(CROPS.map((c, i) => ({
        // id: String(i),
        id: `${c.key}_${c.mandi}_${i}`,
        crop: c.label,
        mandi: c.mandi,
        price: results[i]?.data?.current_price ? `₹${results[i].data.current_price.toLocaleString()}/kg` : '--',
        trend: results[i]?.data?.trend === 'DOWN' ? 'down' : 'up',
        change: results[i]?.data?.trend === 'DOWN' ? '↓ Falling' : results[i]?.data?.trend === 'UP' ? '↑ Rising' : '→ Stable',
      })));
      console.log('MarketData set!');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  //   useEffect(() => {
  //   fetchMarketRate('wheat', 'nagpur').then(res => {
  //     console.log('Market data:', res?.data);
  //   });
  // }, []);

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
            <StyledText className="text-white text-xl font-bold">{t.mandi_rates_title}</StyledText>
            <StyledView className="w-10" />
          </StyledView>

          <StyledView className="flex-row items-center bg-white/10 rounded-2xl px-4 py-3 border border-white/20">
            <Search size={20} color="#4ADE80" />
            <StyledTextInput
              placeholder="Search crops or mandis..."
              placeholderTextColor="rgba(255,255,255,0.5)"
              className="flex-1 ml-3 text-white"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </StyledView>
        </StyledView>

        <StyledScroll
  className="flex-1 px-5 pt-6"
  showsVerticalScrollIndicator={false}
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      colors={['#4ADE80']}
      tintColor="#4ADE80"
    />
  }
>
          {/* Price Chart Preview */}
          <StyledView className="bg-white rounded-[28px] p-5 shadow-sm mb-6">
            <StyledView className="flex-row justify-between items-center mb-4">
              <StyledView>
                <StyledText className="text-gray-400 text-xs font-bold uppercase">Price Index</StyledText>
                <StyledText className="text-neo-dark font-bold text-lg">{t.mandi_rates_title}</StyledText>
              </StyledView>
              <StyledView className="bg-neo-green/10 px-3 py-1 rounded-full border border-neo-green/20">
                <StyledText className="text-neo-dark font-bold text-xs">LIVE</StyledText>
              </StyledView>
            </StyledView>
            
            <LineChart
              data={{
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                datasets: [{
                  data: chartData
                }]
              }}
              width={screenWidth - 80}
              height={180}
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(74, 222, 128, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(14, 58, 36, ${opacity})`,
                style: { borderRadius: 16 },
                propsForDots: { r: "4", strokeWidth: "2", stroke: "#0E3A24" }
              }}
              bezier
              style={{ marginVertical: 8, borderRadius: 16 }}
            />
          </StyledView>

          {/* Mandi List */}
          <StyledView className="flex-row justify-between items-center mb-4">
            <StyledText className="text-neo-dark font-bold text-lg">Nearby Mandis</StyledText>
            <StyledTouchableOpacity className="flex-row items-center gap-1">
              <Filter size={16} color="#0E3A24" />
              <StyledText className="text-neo-dark text-sm font-medium">Filter</StyledText>
            </StyledTouchableOpacity>
          </StyledView>

          {loading && (
            <StyledView className="items-center py-10">
              <StyledText className="text-gray-400 font-medium">Loading market rates...</StyledText>
            </StyledView>
          )}

          {!loading && marketData.length === 0 && (
            <StyledView className="items-center py-10">
              <StyledText className="text-gray-400 font-medium">No data available</StyledText>
            </StyledView>
          )}

          
          {marketData
          .filter(item => {
            if (searchQuery === '') return true;
            return (
              item.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.mandi.toLowerCase().includes(searchQuery.toLowerCase())
            );
          }) 
          .map((item) => (
            <StyledView key={item.id} className="bg-white rounded-[24px] p-4 mb-4 flex-row items-center shadow-sm">
              <StyledView className={`w-12 h-12 rounded-2xl items-center justify-center ${item.trend === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
                {item.trend === 'up' ? <TrendingUp size={24} color="#1B5E20" /> : <TrendingDown size={24} color="#C62828" />}
              </StyledView>
              
              <StyledView className="flex-1 ml-4">
                <StyledText className="text-neo-dark font-bold text-base">{item.crop}</StyledText>
                <StyledView className="flex-row items-center mt-1">
                  <MapPin size={12} color="#9CA3AF" />
                  <StyledText className="text-gray-400 text-xs ml-1">{item.mandi} Mandi</StyledText>
                </StyledView>
              </StyledView>

              <StyledView className="items-end">
                <StyledText className="text-neo-dark font-bold text-base">{item.price}</StyledText>
                <StyledText className={`text-xs font-bold mt-1 ${item.trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                  {item.change}
                </StyledText>
              </StyledView>
            </StyledView>
          ))}

          <StyledView className="h-60" />

        </StyledScroll>
      </StyledView>
    );
  };

  export default MarketTrends;
