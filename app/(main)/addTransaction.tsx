import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function addTransaction() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('income');
  


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
      </View>
    </SafeAreaView>
  )
}