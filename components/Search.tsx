import { View, Text,Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams, usePathname } from 'expo-router'
import icons from '@/constants/icons'
import {useDebouncedCallback} from "use-debounce"


const Search = () => {
    const path = usePathname();
    const params = useLocalSearchParams<{query?:string}>();
    const [search,setSearch]= useState(params.query);

    const deBouncedSearch = useDebouncedCallback((text: string) => router.setParams({ query: text }), 500); // Changed to direct number
    const handleSearch = (text:string) => {
        // navigation.navigate('Properties', { query: search });
        setSearch(text);
        deBouncedSearch(text)
    }
  return (
    <View className='flex flex-row items-center justify-between w-full px-4 rounded-lg bg-accent-100 border border-primary-100 mt-5 py-2'>
        <View className='flex-1 flex-row items-center justify-between z-50'>
            <Image source={icons.search} className='size-5'/>
            <TextInput 
            value={search}
            onChangeText={handleSearch}
            placeholder='Search for properties'
            className='text-sm font-rubik text-black-100 mt-2 flex-1'
            />
        </View>
        <TouchableOpacity >
            <Image source={icons.filter} className='size-5'/>
        </TouchableOpacity>
      {/* <Text>Search</Text> */}
    </View>
  )
}

export default Search