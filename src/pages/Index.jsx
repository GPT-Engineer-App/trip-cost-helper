import React, { useState } from "react";
import { Box, VStack, Input, FormControl, FormLabel, Button, NumberInput, NumberInputField, Heading, Text, useToast } from "@chakra-ui/react";
import { FaCalculator } from "react-icons/fa";

const Index = () => {
  const [distance, setDistance] = useState("");
  const [efficiency, setEfficiency] = useState("");
  const [fuelCost, setFuelCost] = useState("");
  const [totalCost, setTotalCost] = useState(null);

  const toast = useToast();

  const calculateCost = () => {
    if (!distance || !efficiency || !fuelCost) {
      toast({
        title: "Error",
        description: "Please fill all fields with valid numbers",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const cost = (distance / efficiency) * fuelCost;
    setTotalCost(cost.toFixed(2));
  };

  return (
    <Box p={5}>
      <VStack spacing={4}>
        <Heading as="h1" size="xl">
          Trip Cost Calculator
        </Heading>
        <FormControl id="distance">
          <FormLabel>Distance (miles)</FormLabel>
          <NumberInput min={0} onChange={(valueString) => setDistance(valueString)}>
            <NumberInputField placeholder="Enter distance in miles" />
          </NumberInput>
        </FormControl>
        <FormControl id="efficiency">
          <FormLabel>Fuel Efficiency (MPG)</FormLabel>
          <NumberInput min={0} onChange={(valueString) => setEfficiency(valueString)}>
            <NumberInputField placeholder="Enter vehicle's MPG" />
          </NumberInput>
        </FormControl>
        <FormControl id="fuelCost">
          <FormLabel>Cost of Fuel (per gallon)</FormLabel>
          <NumberInput min={0} precision={2} step={0.01} onChange={(valueString) => setFuelCost(valueString)}>
            <NumberInputField placeholder="Enter cost per gallon" />
          </NumberInput>
        </FormControl>
        <Button leftIcon={<FaCalculator />} colorScheme="teal" onClick={calculateCost}>
          Calculate
        </Button>
        {totalCost !== null && (
          <Box p={4} borderWidth="1px" borderRadius="lg">
            <Text fontSize="xl">Total Trip Cost: ${totalCost}</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default Index;
