import {
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  useDisclosure,
  useBreakpointValue,
  useToast
} from "@chakra-ui/react";
import {useMemo, useState} from "react";
import React, { useContext } from "react";
import { Loader } from "@googlemaps/js-api-loader";

// CONTEXT
import { LocationContext } from "../../context/location";

// COMPONENTS
import SelectCar from "./selectCar";

// UTILS
import {handlePlaceAutocomplete} from "../../utils/handlePlaceAutocomplete";

const BookRide = () => {
  const [isFocused, setIsFocused] = useState("none");
  const [address, setAddress] = useState({
    pickup: "",
    destination: "",
  });

  const background = useBreakpointValue({ base: 'none', lg: 'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)' })
  const heading = useBreakpointValue({ base: 'brand.500', lg: 'white' })

  const {
    updatePickUpLocation,
    updateDropLocation,
    currentLocation,
    dropLocation,
    pickUpLocation,
    updateDistance,
    updateDuration
  } = useContext(LocationContext);

  const {
    isOpen: isSelectCarModalOpen,
    onOpen: onSelectCarModalOpen,
    onClose: onSelectCarModalClose
  } = useDisclosure()

  const toast = useToast()

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

  React.useEffect(() => {
    if(typeof window.google === 'undefined') {
      return
    }
    const inputElement = document.getElementById('pickup-input')

    const autoComplete = new google.maps?.places?.Autocomplete(inputElement, {
      componentRestrictions: { country: ["in"] },
      fields: ["address_components", "geometry"],
      types: ["address"],
    })

    inputElement.focus();

    autoComplete.addListener("place_changed", () => handlePlaceAutocomplete(updatePickUpLocation, 'pickup', autoComplete, setAddress, address));

  }, [address.pickup])

  React.useEffect(() => {
    if(typeof window.google === 'undefined') {
      return
    }
    const inputElement = document.getElementById('drop-input')

    const autoComplete = new google.maps?.places?.Autocomplete(inputElement, {
      componentRestrictions: { country: ["in"] },
      fields: ["address_components", "geometry"],
      types: ["address"],
    })

    inputElement.focus();

    autoComplete.addListener("place_changed", () => handlePlaceAutocomplete(updateDropLocation, 'destination', autoComplete, setAddress, address));

  }, [address.destination])

  const handleChange = (event) => {
    setAddress({ ...address, [event.target.name]: event.target.value });
  };

  const handleFocus = (event) => {
    setIsFocused(event.target.name);
  };

  const handleBlur = () => {
    setTimeout(() => setIsFocused("none"), 2000);
  };

  const search = async () => {
    // console.log(address);

    const service = new google.maps.DistanceMatrixService();

    const request = {
      origins: [pickUpLocation.geometry],
      destinations: [dropLocation.geometry],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    };

    const res = await service.getDistanceMatrix(request);

    if(res && res.rows.length) {
        if(res.rows[0].elements.length) {
          console.log(res.rows[0].elements[0])
          const distance = res.rows[0].elements[0]?.distance?.value / 1000;
          if(distance > 50){
            toast({
              title: `Trip is out of serviceable area.`,
              description: `Your trip is ${distance}kms long, which falls out of our serviceable area. Please choose trip below 50kms`,
              status: 'error',
              position: 'top',
              isClosable: true
            })
            return
          }
          updateDistance(distance)
          updateDuration(res.rows[0]?.elements[0]?.duration?.value / 60)
          onSelectCarModalOpen()

        }
    }



  };

  return (
    <>
      <SelectCar isOpen={isSelectCarModalOpen} onClose={onSelectCarModalClose} />
      <Box
        w={"100%"}
        background={background}
        px={"1rem"}
        py={"2rem"}
        borderRadius={"10px 10px 0 0"}
      >
        <Heading as={"h3"} size={"lg"} color={heading}>
          Where can we pick you up?
        </Heading>
      </Box>
      <Flex
        mt={"2rem"}
        mx={"1rem"}
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
