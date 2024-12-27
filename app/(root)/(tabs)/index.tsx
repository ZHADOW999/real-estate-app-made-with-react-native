import icons from "@/constants/icons";
import images from "@/constants/images";
import { Link, router, useLocalSearchParams } from "expo-router";
import { Image, Text, TouchableOpacity, View,ScrollView, FlatList, Button, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "@/components/Search";
import {FeaturedCard,Card}from "@/components/Cards"
import Filters from "@/components/Filters";
import { useGlobalContext } from "@/lib/global-provider";
import seed from "@/lib/seed";
import { useAppwrite } from "@/lib/useAppwrite";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useEffect } from "react";
import NoResults from "@/components/NoResults";

export default function Index() {
  const {user}= useGlobalContext();
  const params = useLocalSearchParams<{query?:string; filter?:string;}>()

  const {data:latestProperties,loading:latestPropertiesLoaading}=useAppwrite({fn:getLatestProperties})

  const {data:properties ,loading,refetch}=useAppwrite({
    fn:getProperties,
    params: { query: params.query!, filter: params.filter!, limit: 6},
    skip:true,
    
  })

  const handleCardPress =(id:string)=>{
    router.push(`/properties/${id}`)
  }

  useEffect(()=>{
    refetch({ query: params.query!, filter: params.filter!,limit: 6 });
  },[params.query,params.filter])
  return (
    <SafeAreaView className="bg-white h-full">
      {/* <Button title="seed" onPress={seed}/> */}
      <FlatList 
      data={properties}
      renderItem={({item})=><Card item={item} onPress={()=>handleCardPress(item.$id)}/>}
      keyExtractor={(item) => item.$id}
      numColumns={2}
      contentContainerClassName="pb-32"
      columnWrapperClassName="flex gap-5 px-5 "
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={loading?(
        <ActivityIndicator className="text-primary-300 mt-5" size="large" /> 
      ):(<NoResults/>)
    }
      ListHeaderComponent={
              
        <View className="px-5">
  
          <View className="flex flex-row items-center justify-between mt-5">
            <View className="flex flex-row items-center">
              <Image source={{uri: user?.avatar}} className="size-12 rounded-full" />
              <View className="flex flex-col items-start ml-2 justify-center">
                <Text className="font-rubik text-xs text-black-100">Good Morning</Text>
                <Text className="text-base font-rubik-medium text-black-30">{user?.name}</Text>
              </View>
            </View>
            <Image source={icons.bell} className="size-6" />
          </View>
          <Search />
          <View className="my-5">
            <View className="flex flex-row items-center justify-between">
              <Text className="text-xl font-rubik-bold text-black-300">Features</Text>
              <TouchableOpacity >
                <Text className="text-base font-rubik-bold text-primary-300">See All</Text>
              </TouchableOpacity>
            </View>
            {latestPropertiesLoaading ? 
              <ActivityIndicator size="large" className="text-primary-300"/>
            : !latestProperties || latestProperties.length ===0 ? <NoResults/>:(
            <FlatList 
            data={latestProperties}
            renderItem={({item})=><FeaturedCard item={item} onPress={()=>handleCardPress(item.$id)}/>}
            keyExtractor={(item)=>item.$id}
            horizontal
            bounces={false}
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="flex gap-5 mt-5"
            />)}
          </View>
          <View className="flex flex-row items-center justify-between">
              <Text className="text-xl font-rubik-bold text-black-300">Our Recommendation</Text>
              <TouchableOpacity >
                <Text className="text-base font-rubik-bold text-primary-300">See All</Text>
              </TouchableOpacity>
            </View>
              <Filters/>
            
  
        </View>
      }
      />

    </SafeAreaView>

  );
}