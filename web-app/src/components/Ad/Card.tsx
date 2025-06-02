import { Flex, Box, Image, Link, Text } from "@chakra-ui/react";
import React, { useState, useRef } from "react";
import { Icon } from "@chakra-ui/react"
import { HiHeart } from "react-icons/hi"
interface props {
  id: string;
  location: string;
  price: number;
  image?: string;
  title?: string
}

const Card: React.FC<props> = ({ id, location, price, title, image }) => {

  const [favoriteState, setFavoriteState] = useState(false)

  const saveNewFavoriteAd= () => {
    setFavoriteState(!favoriteState)
  }


  return (
  <Box>
<Box
  cursor="pointer"
  maxW="sm"
  borderWidth="1px"
  borderRadius="lg"
  overflow="hidden"
  position="relative"
>

<Link href={`${process.env.NEXT_PUBLIC_BASE_PATH}/ad/${id}`} _hover={{ textDecoration: "none" }}>
  <Image 
    src={`${process.env.NEXT_PUBLIC_BASE_PATH}/ad1.jpeg`} 
    alt="" 
    width="100%"
    objectFit="cover"
    height="100%"
  />
  </Link>
  
  {/* Favorite icon */}
  <Box
    position="absolute"
    top="3"
 
    right="3" 
    h="50"
    w="90"
    onClick={saveNewFavoriteAd}
  >
    <Icon as={HiHeart} boxSize="6"
      zIndex="1"
      position="relative" 
    
      color = {favoriteState ? "red" : "rgba(0, 0, 0, 0.5)"}/>
  </Box>
 
  {/* Slide navigation (right arrow) */}
  <Box
    position="absolute"
    top="110"
    right="3"
    bg="white"
    borderRadius="full"
    p={1}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  </Box>

  {/* Dots indicator (static) */}
  <Flex 
    position="absolute" 
    bottom="3" 
    left="0" 
    right="0" 
    justify="center" 
    gap="2"
  >
    {/* First dot (active) */}
    <Box w="2" h="2" borderRadius="full" bg="white" />
    {/* Inactive dots */}
    <Box w="2" h="2" borderRadius="full" bg="whiteAlpha.500" />
    <Box w="2" h="2" borderRadius="full" bg="whiteAlpha.500" />
  </Flex>

</Box>
<Link href={`${process.env.NEXT_PUBLIC_BASE_PATH}/ad/${id}`} _hover={{ textDecoration: "none" }}> 
      <Box
        mt="1"
        as="h4"
        lineHeight="tight"
        noOfLines={1}
      >
        {title}
      </Box>
      </Link>
      <Box
        mt="1"
       as="h4"
        lineHeight="tight"
        noOfLines={1}
      >
           <Text fontSize="sm" color="blackAlpha.600">  {location}</Text>
      </Box>

      <Box>
        <Text fontSize="sm"  > {price}  € par nuit</Text>
      </Box>
      </Box>
  );
};

export default Card;
