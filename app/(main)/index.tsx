import { View, Text, TouchableOpacity, FlatList, Modal, Pressable } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useFocusEffect } from 'expo-router'
import { deleteTransaction, fetchTransactions } from '@/src/services/transactionService'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';



export default function Home() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [deleteAction, setDeleteAction] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showFilter, setShowFilter] = useState(false);
  const [sortField, setSortField] = useState<'date' | 'amount' | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

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

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (!sortField) return 0;

    if (sortField === 'date') {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      return sortOrder === 'asc'
        ? dateA - dateB
        : dateB - dateA;
    }

    if (sortField === 'amount') {
      return sortOrder === 'asc'
        ? a.amount - b.amount
        : b.amount - a.amount;
    }

    return 0;
  });


  return (
    <SafeAreaView className='flex-1 bg-zinc-900'>
      <View className='flex-1 px-4'>
        {/* Saldo Atual */}
        <View className='mt-4 bg-slate-800 p-4 rounded-2xl'>
          <Text className='text-base text-white'>Saldo Atual</Text>
          <Text 
            className={`text-3xl mt-2 ${balance >= 0 ? 'text-green-400' : 'text-red-400'} font-bold`}
          >R$ {balance.toFixed(2).replace(".", ",")}</Text>
        </View>

        {/* Renda e despesas */}
        <View className='flex-row gap-4 mt-4 mb-4'>
          
          <View className='flex-1 items-center bg-gray-800 py-4 rounded-2xl'>
            <Text className='text-white text-lg font-semibold'>Renda</Text>
            <Text className='text-green-400 text-xl font-bold mt-1'>
              R$ {income.toFixed(2).replace('.', ',')}
            </Text>
          </View>

          <View className='flex-1 items-center bg-gray-800 py-4 rounded-2xl'>
            <Text className='text-white text-lg font-semibold'>Despesas</Text>
            <Text className='text-red-400 text-xl font-bold mt-1'>
              R$ {expense.toFixed(2).replace('.', ',')}
            </Text>
          </View>

        </View>

        <View className='flex-row items-center mb-4'>
          <TouchableOpacity 
            className='flex-row items-center justify-start py-2 px-4 gap-2 bg-slate-800 rounded-2xl self-start'
            onPress={() => setShowFilter(!showFilter)}
          >
            <AntDesign name="filter" size={20} color="white" />
          </TouchableOpacity>

          {showFilter && (
            <View className="flex-row ml-2 bg-slate-800 rounded-2xl py-2 px-4 self-start gap-3">

              {/* Data */}
              <TouchableOpacity
                className="flex-row items-center gap-2"
                onPress={() => {
                  if (sortField === 'date') {
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  } else {
                    setSortField('date');
                    setSortOrder('asc');
                  }
                }}
              >
                <Text className="text-white text-base">Data</Text>
                {sortField === 'date' && (
                  <FontAwesome6
                    name={sortOrder === 'asc' ? "arrow-up" : "arrow-down"}
                    size={14}
                    color="white"
                  />
                )}
              </TouchableOpacity>

              {/* Valor */}
              <TouchableOpacity
                className="flex-row items-center gap-2"
                onPress={() => {
                  if (sortField === 'amount') {
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  } else {
                    setSortField('amount');
                    setSortOrder('asc');
                  }
                }}
              >
                <Text className="text-white text-base">Valor</Text>
                {sortField === 'amount' && (
                  <FontAwesome6
                    name={sortOrder === 'asc' ? "arrow-up" : "arrow-down"}
                    size={14}
                    color="white"
                  />
                )}
              </TouchableOpacity>

            </View>
          )}
        </View>


        {/* Lista de transações */}
        <FlatList
          data={sortedTransactions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => {
              setDeleteAction(true);
              setSelectedId(item.id)
              }
            }>
              <View className='bg-slate-600 p-4 rounded-2xl my-2'>
                <View className='flex-row justify-between'>
                  <Text className='text-white'>{item.title}</Text>
                  <Text className='text-slate-400'>{new Date(item.date).toLocaleDateString("pt-BR")}</Text>
                </View>
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