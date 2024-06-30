import React from "react";
import { Pressable, Text, View } from "react-native";

interface Props {
  details: {
    basicSalary: number;
    totalPayeTax: number;
    employeePension: number;
    employerPension: number;
  };
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BottomSheet: React.FC<Props> = ({ modalOpen, setModalOpen, details }) => {
  return (
    <View
      className={`absolute z-100 w-screen h-screen flex flex-col justify-end transition-transform duration-500 ease-in-out ${
        modalOpen ? "bg-[#00000065]" : "translate-y-full"
      }`}
    >
      <Pressable
        className="absolute w-full h-full bg-transparent"
        onPress={() => setModalOpen(false)}
      >
        <View className="flex flex-col justify-end h-full w-full">
          <Pressable
            className="h-[50%] w-full flex flex-col justify-end"
            onPress={() => {}}
          >
            <View className="w-full h-[90%] rounded-t-[50px] bg-white px-10 py-10">
              <View className="w-full mb-5">
                <Text className="font-bold">Basic Salary</Text>
                <Text className="font-extrabold text-[1.5rem]">
                  {details.basicSalary.toFixed(2)}
                </Text>
              </View>
              <View className="w-full mb-5">
                <Text className="font-semibold">Total PAYE Tax</Text>
                <Text className="font-extrabold text-[1.5rem]">
                  {details.totalPayeTax.toFixed(2)}
                </Text>
              </View>
              <View className="w-full mb-5">
                <Text className="font-semibold">
                  Employee Pension Contribution Amount
                </Text>
                <Text className="font-extrabold text-[1.5rem]">
                  {details.employeePension.toFixed(2)}
                </Text>
              </View>
              <View className="w-full mb-5">
                <Text className="font-semibold">Employer Pension amount</Text>
                <Text className="font-extrabold text-[1.5rem]">
                  {details.employerPension.toFixed(2)}
                </Text>
              </View>
            </View>
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
};

export default BottomSheet;
