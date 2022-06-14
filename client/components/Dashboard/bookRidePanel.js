import {
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  useDisclosure
} from "@chakra-ui/react";
import { useState } from "react";
import React, { useContext } from "react";

// CONTEXT
import { LocationContext } from "../../context/location";

// COMPONENTS
import SelectCar from "./selectCar";

// UTILS
import { getCurrentLocation } from "../../utils/getCurrentLocation";

const BookRide = () => {
  const [isFocused, setIsFocused] = useState("none");
  const [address, setAddress] = useState({
    pickup: "",
    destination: "",
  });

  const { updatePickUpLocation, updateDropLocation } =
    useContext(LocationContext);

  const {
    isOpen: isSelectCarModalOpen,
    onOpen: onSelectCarModalOpen,
    onClose: onSelectCarModalClose
  } = useDisclosure()


  React.useEffect(() => {
    // Using a debounce effect.
    const handler = setTimeout(() => {
      updatePickUpLocation(address.pickup);
    }, 1500);

    return () => {
      clearTimeout(handler);
    };
  }, [address.pickup]);

  React.useEffect(() => {
    // Using a debounce effect.
    const handler = setTimeout(() => {
      updateDropLocation(address.destination);
    }, 1500);

    return () => {
      clearTimeout(handler);
    };
  }, [address.destination]);

  const handleChange = (event) => {
    setAddress({ ...address, [event.target.name]: event.target.value });
  };

  const handleFocus = (event) => {
    setIsFocused(event.target.name);
  };

  const handleBlur = () => {
    setTimeout(() => setIsFocused("none"), 2000);
  };

  const reqCurrentLocation = async () => {
    try {
      const location = await getCurrentLocation();
      console.log({ location });
    } catch (error) {
      console.log({ error });
    }
  };

  const search = async () => {
    // console.log(address);
    updatePickUpLocation(address.pickup);
    onSelectCarModalOpen()
  };

  return (
    <>
      <SelectCar isOpen={isSelectCarModalOpen} onClose={onSelectCarModalClose} />
      <Box
        w={"100%"}
        background={"linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)"}
        px={"15px"}
        py={"2rem"}
        borderRadius={"10px 10px 0 0"}
      >
        <Heading as={"h3"} size={"lg"} color={"white"}>
          Where can we pick you up?
        </Heading>
      </Box>
      <Flex
        mt={"2rem"}
        mx={"10px"}
        flexDir={"column"}
        align={"center"}
        gridGap={"1rem"}
      >
        <FormControl>
          <FormLabel htmlFor="pickup-input">Pick up location</FormLabel>
          <Input
            id="pickup-input"
            type="search"
            name="pickup"
            placeholder="G T World Mall, Magadi road."
            value={address.pickup}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <Button
            d={isFocused === "pickup" ? "block" : "none"}
            size={"sm"}
            variant={"ghost"}
            colorScheme={"brand"}
            onClick={reqCurrentLocation}
          >
            Or use current location.
          </Button>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="pickup-input">Destination location</FormLabel>
          <Input
            id="drop-input"
            type="search"
            name="destination"
            placeholder="DSCE."
            value={address.destination}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <Button
            d={isFocused === "destination" ? "block" : "none"}
            size={"sm"}
            variant={"ghost"}
            colorScheme={"brand"}
            onClick={reqCurrentLocation}
          >
            Or use current location.
          </Button>
        </FormControl>
        <Button
          w={"full"}
          background={"linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)"}
          color={"white"}
          _hover={{
            background: "linear-gradient(135deg, #000DFF 0%, #6B73FF 100%)",
          }}
          onClick={search}
        >
          Search Cabs
        </Button>
      </Flex>
    </>
  );
};

export default BookRide;
