import { View, Text, Pressable } from "react-native";

import "../global.css";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="w-screen bg-[#35488B] h-screen flex justify-center items-center flex-col pt-36">
      <View className="flex flex-row mb-32 items-center">
        <Text className="text-white text-[2rem] font-[900]">Salary </Text>
        <Text className=" text-[2rem] text-[#fb7800] font-[900]">
          Calculator
        </Text>
      </View>
      <Pressable
        className="bg-white px-4 py-2 rounded-2xl w-[80%] h-20 flex justify-center items-center"
        onPress={() => router.push("/salary-details")}
      >
        <Text className="text-[#35488B] text-lg font-bold">Get Started</Text>
      </Pressable>
    </View>
  );
}
