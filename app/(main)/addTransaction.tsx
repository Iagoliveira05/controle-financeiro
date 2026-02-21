import { View, Text, TextInput, Touchable, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router';

export default function addTransaction() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('income');
  
  function handleSave() {
    if (!title || !amount) {
      Alert.alert("Erro",'Por favor, preencha todos os campos');
      return;
    }

    console.log({
      title,
      amount: Number(amount),
      type
    });

    router.back();
  }


  return (
    <SafeAreaView className='flex-1 bg-background'>
      <View className='flex-1 px-4'>
        <Text className="text-white text-2xl font-bold mt-4">
          Nova Transação
        </Text>

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

        <TouchableOpacity
          onPress={handleSave}
          className='rounded-xl bg-green-600 p-4 items-center justify-center mt-10'
        >
          <Text className='text-2xl text-white font-bold'>Salvar</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}