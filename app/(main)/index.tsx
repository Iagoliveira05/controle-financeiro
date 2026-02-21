import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

type Transaction = {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
}

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', title: 'Salário', amount: 3000, type: 'income' },
    { id: '2', title: 'Mercado', amount: 500, type: 'expense' },
  ])


  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;


  return (
    <SafeAreaView className='flex-1 bg-background'>
      <View className='flex-1 px-4'>
        <View className='flex-row gap-2'>
          <Text className='text-2xl text-white'>Saldo Atual</Text>
          <Text className='text-2xl text-gray-200'>R$ {balance.toFixed(2)}</Text>
        </View>

        <View className='flex-row gap-12 mt-4 mb-4 justify-center'>
          <View className='items-center bg-gray-800 px-5 py-3 rounded-2xl'>
            <Text className='text-white text-xl font-bold'>Renda</Text>
            <Text className='text-green-400 text-lg'>R$ {income.toFixed(2)}</Text>
          </View>
          <View className='items-center bg-gray-800 px-5 py-3 rounded-2xl'>
            <Text className='text-white text-xl font-bold'>Despesas</Text>
            <Text className='text-red-400 text-lg'>R$ {expense.toFixed(2)}</Text>
          </View>
        </View>

        <FlatList
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View className='bg-slate-600 p-4 rounded-2xl my-2'>
              <Text className='text-white'>{item.title}</Text>
              <Text className={`text-lg ${item.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                {item.type === 'income' ? '+' : '-'} R$ {item.amount.toFixed(2)}
              </Text>
            </View>
          )}
        />

        {/* Botão flutuante */}
        <TouchableOpacity
          onPress={() => router.push('/addTransaction')}
          className="absolute bottom-6 right-6 bg-green-500 w-14 h-14 rounded-full items-center justify-center shadow-lg"
        >
          <Text className="text-white text-2xl font-bold">+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}