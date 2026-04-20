import React, { useState, useRef, useEffect } from 'react';
import {View, Text, ScrollView, TextInput, TouchableOpacity, Platform, ActivityIndicator, Image, Alert} from 'react-native';
import { styled } from 'nativewind';
import { Send, ArrowLeft, Mic, Paperclip, MoreVertical, MicOff, X } from 'lucide-react-native';
import { translations, Language } from '../constants/translations';
import { fetchChatResponse } from '../lib/api';
import * as ImagePicker from 'expo-image-picker';
// import * as Speech from 'expo-speech';
import { KeyboardAvoidingView } from 'react-native';
import { Audio } from 'expo-av';
import Voice from '@react-native-voice/voice';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScroll = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  time: string;
  image?: string;
}

const WELCOME = "Hello! I am your SmartKrishi AI Assistant. 🌾\n\nI can help you with:\n• Crop recommendations\n• Market rates\n• Disease detection\n• Farming tips\n\nAsk me anything about farming!";

const Chat = ({ onBack, language }: { onBack: () => void; language: Language }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const inputRef = useRef<TextInput>(null);

  const [messages,   setMessages]   = useState<Message[]>([]);
  const [inputText,  setInputText]  = useState('');
  const [loading,    setLoading]    = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [displayed,  setDisplayed]  = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const [recording,  setRecording]  = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Typing animation
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < WELCOME.length) {
        setDisplayed(WELCOME.slice(0, i + 1));
        i++;
        scrollViewRef.current?.scrollToEnd({ animated: false });
      } else {
        clearInterval(interval);
        setTypingDone(true);
        setMessages([{
          id: '1',
          text: WELCOME,
          sender: 'agent',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }
    }, 18);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
  Voice.onSpeechResults = (e: any) => {
    const text = e.value?.[0] || '';
    setInputText(text);
    setIsListening(false);
  };
  Voice.onSpeechError = () => {
    setIsListening(false);
  };
  return () => {
    Voice.destroy().then(Voice.removeAllListeners);
  };
}, []);

  // Send message
  const sendMessage = async () => {
    if ((!inputText.trim() && !selectedImage) || loading) return;

    const sentText = inputText.trim() || 'Image bheja';
    const userMsg: Message = {
      id: Date.now().toString(),
      text: sentText,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      image: selectedImage || undefined,
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setSelectedImage(null);
    setLoading(true);
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);

    try {
      const res = await fetchChatResponse(sentText);
      const agentText = res?.data?.response ||
        'I could not understand that. Please try asking about crops, market rates or diseases.';

      const agentMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: agentText,
        sender: 'agent',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, agentMsg]);

      // Text to speech for agent response
      // Speech.speak(agentText.slice(0, 200), {
      //   language: 'en-IN',
      //   pitch: 1.0,
      //   rate: 0.9,
      // });

    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: 'Could not connect to server. Please check if backend is running.',
        sender: 'agent',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setLoading(false);
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 200);
    }
  };

  // Pick image from gallery
  const pickImage = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Permission needed', 'Please allow media access.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // Voice recording
  const startRecording = async () => {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (!perm.granted) {
        Alert.alert('Permission needed', 'Please allow microphone access.');
        return;
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
    } catch (e) {
      Alert.alert('Error', 'Could not start recording.');
    }
  };

  const stopRecording = async () => {
    if (!recording) return;
    setIsRecording(false);
    await recording.stopAndUnloadAsync();
    setRecording(null);
    // Show placeholder text since we can't do STT without paid API
    setInputText('Voice message recorded. Please type your question.');
    Alert.alert(
      'Voice recorded',
      'Voice-to-text requires additional setup. Please type your message instead.',
      [{ text: 'OK' }]
    );
  };

  const handleMic = async () => {
  if (isListening) {
    await Voice.stop();
    setIsListening(false);
  } else {
    try {
      setIsListening(true);
      setInputText('');
      // Language: Hindi, English, Odia
      const lang = language === 'hi' ? 'hi-IN'
                 : language === 'or' ? 'or-IN'
                 : 'en-IN';
      await Voice.start(lang);
    } catch (e) {
      setIsListening(false);
      Alert.alert('Error', 'Voice recognition failed. Please try again.');
    }
  }
};

  return (<KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
>
  <StyledView className="flex-1 bg-[#F5F9F7]">
    

      {/* Header */}
      <StyledView className="bg-neo-dark pt-12 pb-4 px-6 flex-row items-center justify-between shadow-md">
        <StyledView className="flex-row items-center gap-4">
          <StyledTouchableOpacity
            onPress={onBack}
            className="w-10 h-10 rounded-full bg-white/10 items-center justify-center"
          >
            <ArrowLeft size={20} color="#FFF" />
          </StyledTouchableOpacity>
          <StyledView>
            <StyledText className="text-white font-bold text-lg">Krishi AI Agent</StyledText>
            <StyledView className="flex-row items-center gap-1">
              <StyledView className="w-2 h-2 rounded-full bg-neo-green" />
              <StyledText className="text-neo-green font-medium text-xs">Online</StyledText>
            </StyledView>
          </StyledView>
        </StyledView>
        <StyledTouchableOpacity>
          <MoreVertical size={20} color="#FFF" />
        </StyledTouchableOpacity>
      </StyledView>

      {/* Messages */}
      <StyledScroll
        ref={scrollViewRef}
        className="flex-1 px-4 pt-4"
        contentContainerStyle={{ paddingBottom: 8 }}
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {/* Typing animation */}
        {!typingDone && (
          <StyledView className="max-w-[85%] mb-4 px-4 py-3 rounded-3xl rounded-tl-none bg-white shadow-sm self-start">
            <StyledText className="text-neo-dark text-sm leading-6">{displayed}</StyledText>
            <StyledView className="flex-row gap-1 mt-2">
              <StyledView className="w-1.5 h-1.5 rounded-full bg-neo-green" style={{ opacity: 0.4 }} />
              <StyledView className="w-1.5 h-1.5 rounded-full bg-neo-green" style={{ opacity: 0.7 }} />
              <StyledView className="w-1.5 h-1.5 rounded-full bg-neo-green" />
            </StyledView>
          </StyledView>
        )}

        {/* Messages */}
        {typingDone && messages.map((msg) => (
          <StyledView
            key={msg.id}
            className={`max-w-[85%] mb-4 rounded-3xl shadow-sm overflow-hidden ${
              msg.sender === 'user'
                ? 'self-end bg-neo-dark rounded-tr-none'
                : 'self-start bg-white rounded-tl-none'
            }`}
          >
            {msg.image && (
              <Image
                source={{ uri: msg.image }}
                style={{ width: 200, height: 150 }}
                resizeMode="cover"
              />
            )}
            <StyledView className="px-4 py-3">
              <StyledText className={`text-sm leading-6 ${
                msg.sender === 'user' ? 'text-white' : 'text-neo-dark'
              }`}>
                {msg.text}
              </StyledText>
              <StyledText className={`text-[9px] mt-1 ${
                msg.sender === 'user' ? 'text-white/50 text-right' : 'text-gray-400'
              }`}>
                {msg.time}
              </StyledText>
            </StyledView>
          </StyledView>
        ))}

        {/* Loading */}
        {loading && (
          <StyledView className="self-start bg-white px-4 py-3 rounded-3xl rounded-tl-none mb-4 shadow-sm flex-row items-center gap-2">
            <ActivityIndicator size="small" color="#4ADE80" />
            <StyledText className="text-gray-400 text-xs">Thinking...</StyledText>
          </StyledView>
        )}
      </StyledScroll>

      {/* Selected image preview */}
      {selectedImage && (
        <StyledView className="px-4 py-2 bg-white border-t border-gray-100 flex-row items-center gap-2">
          <Image
            source={{ uri: selectedImage }}
            style={{ width: 48, height: 48, borderRadius: 8 }}
          />
          <StyledText className="text-neo-dark text-xs flex-1">Image selected</StyledText>
          <StyledTouchableOpacity onPress={() => setSelectedImage(null)}>
            <X size={18} color="#9CA3AF" />
          </StyledTouchableOpacity>
        </StyledView>
      )}

      {/* Recording indicator */}
      {isListening && (
        <StyledView className="px-4 py-2 bg-red-50 border-t border-red-100 flex-row items-center gap-2">
          <StyledView className="w-2 h-2 rounded-full bg-red-500" />
          <StyledText className="text-red-600 text-xs font-bold">Listening... Speak now (Hindi / English / Odia)</StyledText>
        </StyledView>
      )}

      {/* Input box */}
      <StyledView
        className="px-4 py-2 bg-white border-t border-gray-100 flex-row items-center gap-2"
        style={{ paddingBottom: Platform.OS === 'android' ? 1 : 24 }}
      >
        {/* Paperclip - image picker */}
        <StyledTouchableOpacity
          onPress={pickImage}
          className="w-10 h-10 items-center justify-center"
        >
          <Paperclip size={20} color="#4ADE80" />
        </StyledTouchableOpacity>

        {/* Text input */}
        <StyledView
          className="flex-1 bg-gray-50 px-4 py-2 border border-gray-200 flex-row items-center"
          style={{ borderRadius: 999 }}
        >
          <StyledTextInput
            ref={inputRef}
            placeholder="Type your message..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 text-neo-dark mr-2"
            value={inputText}
            onChangeText={setInputText}
            multiline
            style={{ maxHeight: 80 }}
          />
          {/* Mic button */}
          <StyledTouchableOpacity onPress={handleMic}>
            {isListening
            ? <MicOff size={18} color="#EF4444" />
            : <Mic size={18} color={isListening ? "#EF4444" : "#9CA3AF"} />
          }
          </StyledTouchableOpacity>
        </StyledView>

        {/* Send button */}
        <StyledTouchableOpacity
          onPress={sendMessage}
          disabled={loading}
          className="w-12 h-12 rounded-2xl items-center justify-center"
          style={{
            backgroundColor: (inputText.trim() || selectedImage) && !loading
              ? '#4ADE80' : '#D1FAE5'
          }}
        >
          <Send
            size={20}
            color={(inputText.trim() || selectedImage) && !loading ? '#0E3A24' : '#6EE7B7'}
          />
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  </KeyboardAvoidingView>
  );
};

export default Chat;