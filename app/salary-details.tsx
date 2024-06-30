import React, { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import calculateGrossSalary from "@/utils/calculations";
import BottomSheet from "@/components/bottom-sheet";

interface InputData {
  netSalary: number;
  allowances: number;
}

interface Result {
  basicSalary: number;
  totalPayeTax: number;
  employeePension: number;
  employerPension: number;
}

const SalaryDetails = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [fufillValidation, setFufillValidation] = useState(false);
  const [error, setError] = useState("");
  const [salaryDetails, setSalaryDetails] = useState<Result>({
    basicSalary: 0,
    totalPayeTax: 0,
    employeePension: 0,
    employerPension: 0,
  });
  const [formValue, setFormValue] = useState<InputData>({
    netSalary: 0,
    allowances: 0,
  });

  useEffect(() => {
    setFufillValidation(formValue.netSalary > 0 && formValue.allowances > 0);
  }, [formValue]);

  const handleChange = (name: string, value: string) => {
    setError("");
    setFormValue({ ...formValue, [name]: parseFloat(value) });
  };

  const handleSubmit = () => {
    const { netSalary, allowances } = formValue;

    if (!netSalary || netSalary <= 0 || !allowances || allowances <= 0) {
      setError("All fields are required and must be greater than zero");
      return;
    }

    try {
      const grossSalary = calculateGrossSalary(netSalary, allowances);
      if (!grossSalary) {
        setError("Error calculating details");
        return;
      }

      setSalaryDetails({
        basicSalary: parseFloat(grossSalary.basicSalary.toFixed(2)),
        totalPayeTax: parseFloat(grossSalary.totalPayeTax.toFixed(2)),
        employeePension: parseFloat(grossSalary.employeePension.toFixed(2)),
        employerPension: parseFloat(grossSalary.employerPension.toFixed(2)),
      });
      setModalOpen(true);
    } catch (error) {
      setError("Gross salary calculation failed");
    }
  };

  return (
    <View className="flex flex-col items-center justify-center pb-40 pt-40 h-screen w-screen px-5 relative">
      {modalOpen && (
        <BottomSheet
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          details={salaryDetails}
        />
      )}
      <View className="flex items-center flex-row mb-36">
        <Text className="text-[#031a6e] text-[2rem] mr-2 font-[900]">
          Salary
        </Text>
        <Text className="text-[#fb7800] text-[2rem] font-[900]">
          Calculator
        </Text>
      </View>
      <View className="w-full">
        <Text className="text-[0.8rem] text-[#333333] mb-2 font-extrabold">
          Desired net salary (GHS)
        </Text>
        <TextInput
          className="w-full border border-[#D8DADC] px-5 h-20 rounded-2xl mb-5"
          placeholder="Enter your desired net salary here"
          onChangeText={(netSalary) => handleChange("netSalary", netSalary)}
          keyboardType="numeric"
        />
        <Text className="text-[0.8rem] text-[#333333] mb-2 font-extrabold">
          Desired net allowances (GHS)
        </Text>
        <TextInput
          className="w-full border border-[#D8DADC] px-5 h-20 rounded-2xl mb-4"
          placeholder="Enter your desired allowances here"
          onChangeText={(allowances) => handleChange("allowances", allowances)}
          keyboardType="numeric"
        />
        <Text className="text-red-500 text-[0.8rem] font-bold mb-8">
          {error}
        </Text>
        <Pressable
          className={`w-full h-20 rounded-2xl ${
            fufillValidation ? "bg-[#031a6e]" : "bg-[#818cb7]"
          }  flex justify-center items-center`}
          onPress={handleSubmit}
          disabled={!fufillValidation}
        >
          <Text className="text-white">Find Gross</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SalaryDetails;
