import { View, Text,Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import icons from '@/constants/icons'

const TabIcon =({focused,icon,title}:{focused:boolean; icon:any; title:string})=>(
    <View className='flex-1 mt-3 flex flex-col items-center'>
        <Image source={icon} tintColor={focused?'#0061ff':'#666876'} resizeMode='contain' className='size-6'/>
        <Text className={`${focused ? 'text-primary-300 font-rubik-medium'  :'text-black-200 font-rubik'} text-xs w-full text-center mt-1`}>
            {title}
        </Text>
    </View>
)

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{
        tabBarShowLabel:false,
        tabBarStyle:{
            backgroundColor:'white',
            position: 'absolute',
            borderTopColor:'#0061FF1A',
            borderTopWidth:1,
            minHeight:70,
        }
    }}>
      <Tabs.Screen name="index" 
      options={{
        title:'Home',
        headerShown:false,
        tabBarIcon:({focused})=>(
            <TabIcon icon={icons.home} focused={focused} title='home'/>
        )
      }}
      />
      <Tabs.Screen name="explore" 
      options={{
        title:'explore',
        headerShown:false,
        tabBarIcon:({focused})=>(
            <TabIcon icon={icons.search} focused={focused} title='expolore'/>
        )
      }}
      />
      <Tabs.Screen name="profiles" 
      options={{
        title:'profile',
        headerShown:false,
        tabBarIcon:({focused})=>(
            <TabIcon icon={icons.person} focused={focused} title='profile'/>
        )
      }}
      />
      
    </Tabs>
  )
}

export default TabsLayout