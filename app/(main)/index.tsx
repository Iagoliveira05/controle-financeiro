import { View, Text, TouchableOpacity, FlatList, Modal, Pressable } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useFocusEffect } from 'expo-router'
import { deleteTransaction, fetchTransactions } from '@/src/services/transactionService'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


export default function Home() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [deleteAction, setDeleteAction] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      async function loadTransactions() {
        const data = await fetchTransactions();
        setTransactions(data);
      }

      loadTransactions();
    }, [])
  );

  async function handleDelete(id: string) {
    await deleteTransaction(id);

    // Atualiza lista depois de deletar
    const data = await fetchTransactions();
    setTransactions(data);
  }


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
            <Text className='text-green-400 text-lg'>R$ {income.toFixed(2).replace('.', ',')}</Text>
          </View>
          <View className='items-center bg-gray-800 px-5 py-3 rounded-2xl'>
            <Text className='text-white text-xl font-bold'>Despesas</Text>
            <Text className='text-red-400 text-lg'>R$ {expense.toFixed(2).replace('.', ',')}</Text>
          </View>
        </View>

        <FlatList
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => {
              setDeleteAction(true);
              setSelectedId(item.id)
              }
            }>
              <View className='bg-slate-600 p-4 rounded-2xl my-2'>
                <Text className='text-white'>{item.title}</Text>
                <Text className={`text-lg ${item.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                  {item.type === 'income' ? '+' : '-'} R$ {item.amount.toFixed(2).replace('.', ',')}
                </Text>
              </View>
            </TouchableOpacity>
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

      <Modal
        animationType="fade"
        visible={deleteAction}
        transparent
        statusBarTranslucent
      >
        <View className="flex-1 justify-center items-center bg-black/40">
          
          {/* Área que fecha ao clicar fora */}
          <Pressable
            className="absolute top-0 bottom-0 left-0 right-0"
            onPress={() => setDeleteAction(false)}
          />

          {/* Card do modal */}
          <View className="w-80 bg-white rounded-2xl p-6 shadow-2xl">
            <Text className="text-lg font-bold mb-4 text-center">
              Excluir transação?
            </Text>

            <Text className="text-gray-500 text-center mb-6">
              Essa ação não pode ser desfeita.
            </Text>

            <View className="flex-row justify-between">
              <Pressable
                className="px-4 py-2"
                onPress={() => setDeleteAction(false)}
              >
                <Text className="text-gray-500 font-semibold">
                  Cancelar
                </Text>
              </Pressable>

              <Pressable
                className="bg-red-500 px-4 py-2 rounded-xl"
                onPress={async () => {
                  if (selectedId) {
                    await handleDelete(selectedId);
                    setDeleteAction(false);
                    setSelectedId(null);
                  }
                }}
              >
                <Text className="text-white font-semibold">
                  Excluir
                </Text>
              </Pressable>
            </View>
          </View>

        </View>
      </Modal>



    </SafeAreaView>
  )
}