import { View, Text, TextInput, Touchable, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router';
import { addTransaction } from '@/src/services/transactionService';
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AddTransaction() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  
  async function handleAdd() {
    if (!title || !amount) {
      Alert.alert("Erro",'Por favor, preencha todos os campos');
      return;
    }

    console.log({
      title,
      amount: Number(amount),
      type
    });

    await addTransaction({
      title: title,
      amount: Number(amount.replace(',', '.')),
      type: type,
      date: date.toISOString()
    });

    router.back();
  }

  return (
    <SafeAreaView className='flex-1 bg-background'>
      <View className='flex-1 px-4'>
        <Text className="text-white text-2xl font-bold mt-4">
          Nova Transação
        </Text>

        {/* Titulo */}
        <View className='mt-6'>
          <Text className='text-xl text-zinc-400'>Titulo</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder='Ex: Farmácia, Mercado...'
            placeholderTextColor="#71717a"
            className='bg-zinc-800 p-4 rounded-2xl text-white mt-2'
          />
        </View>

        {/* Data */}
        <View className='mt-6'>
          <Text className='text-xl text-zinc-400'>Data</Text>
          <TouchableOpacity 
            onPress={() => setShowPicker(true)}
            className='bg-zinc-800 p-4 rounded-2xl text-white mt-2'
          >
            <Text className='text-white'>{date.toLocaleDateString('pt-BR')}</Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              onChange={(event, selectedDate) => {
                setShowPicker(false);
                if (selectedDate) {
                  setDate(selectedDate);
                }
              }}
            />
          )}


        </View>

        {/* Valor */}
        <View className='mt-6'>
          <Text className='text-xl text-zinc-400'>Valor</Text>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            keyboardType='numeric'
            placeholder='R$ 0.00'
            placeholderTextColor="#71717a"
            className='bg-zinc-800 p-4 rounded-2xl text-white mt-2'
          />
        </View>

        {/* Tipo */}
        <View className='flex-row justify-between mt-6 gap-6'>
          <TouchableOpacity
            onPress={() => setType('income')}
            className={`flex-1 p-4 rounded-xl items-center ${
              type === 'income'
                ? 'bg-green-500'
                : 'bg-zinc-800'
            }`}
          >
            <Text className="text-white font-semibold text-lg">
              Receita
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setType('expense')}
            className={`flex-1 p-4 rounded-xl items-center ${
              type === 'expense'
                ? 'bg-red-500'
                : 'bg-zinc-800'
            }`}
          >
            <Text className="text-white font-semibold text-lg">
              Despesa
            </Text>
          </TouchableOpacity>
        </View>

        {/* Salvar */}
        <TouchableOpacity
          onPress={handleAdd}
          className='rounded-xl bg-green-600 p-4 items-center justify-center mt-10'
        >
          <Text className='text-2xl text-white font-bold'>Salvar</Text>
        </TouchableOpacity>

        {/* Cancelar */}
        <TouchableOpacity
          onPress={router.back}
          className='rounded-xl bg-zinc-800 p-4 items-center justify-center mt-2'
        >
          <Text className='text-xl text-white font-bold'>Cancelar</Text>
        </TouchableOpacity>

      </View>

      

    </SafeAreaView>
  )
}

