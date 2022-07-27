// import { Button, Flex ,Text, } from "@chakra-ui/react"

Moralis.initialize('Z8FXeX1VJPU6jsG2GkiHwn6nBjpPGr5NjoWXF6db')
Moralis.serverURL = 'https://l3csqx0gioxx.usemoralis.com:2053/server'

import Moralis from 'moralis'
import { useMoralisQuery } from "react-moralis";
import React, { Component, useState } from "react";
import Slider from "react-slick";


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';

import { ReactNode } from 'react';
import {
  Button,
  IconButton,
  Flex,
  Heading,
  Container,
  Collapse,
  Icon,
  Center,
  Avatar,
  HStack,
  Link,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Stack,
  SimpleGrid,
  Box,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure
  
  
} from '@chakra-ui/react';

import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';

import Head from "next/head"
import { useMoralis } from "react-moralis"
import Header from "../components/Header"
import Socard from "../components/Socard"
import { useRouter } from 'next/router'
import Headd from "../components/Headd"
import Footer from '../components/Footer';

export default function blogPostWithImage({ test, users }) {
  const {isAuthenticated, authenticate, user,account, logout, isLoggingOut, Moralis} = useMoralis()
  const { isOpen, onOpen, onClose } = useDisclosure();
  var resultArr = []
  var [email, setEmail] = useState(users);
  const router = useRouter()
  React.useEffect(() => {
        
    (async () => {
        let results 
        
        try {
            let query = new Moralis.Query("Campaign")
            results = await query.find();
            
         } catch (error) {
                console.log(error);
               
        }
        

            // console.log(">>>>>>>>>>" + JSON.parse(JSON.stringify(results["0"])));
            var myJSON = JSON.stringify(results);
            var pa = JSON.parse(myJSON)

           
            setEmail(pa);

        
        })();
    }, []);
   

    const handleLogout = async () => {
      await logout({})
      router.push('/')
  }


  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '10px' });

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 5
        }}
    />
);


  if(!isAuthenticated) {
    return(
   
      <>
      {/* <h1>{ test }</h1> */}
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={8}>
        <Flex h={20} alignItems={'center'} justifyContent={'space-between'}>
      
          <HStack spacing={8} alignItems={'center'}>
            <Box>
            <Heading fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}>
            <Link href={'/'}>
              <Text color={'blue.400'} as={'span'}>
                Topstarter
              </Text>
            </Link>
          </Heading>
            </Box>
          
          </HStack>
          <Flex alignItems={'center'}>
            <Stack
              flex={{ base: 1, md: 0 }}
              justify={'flex-end'}
              direction={'row'}
              spacing={6}>
            
              <Button
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'pink.400'}
                href={'#'}
                _hover={{
                  bg: 'pink.300',
                }}
                onClick={() => authenticate({
                  signingMessage: "Sign to login to Topstarter"
                })}>
                Login with Metamask
              </Button>
            </Stack>
          </Flex>
        </Flex>

      </Box>

        

      <SimpleGrid columns={4} spacing={50}>
      {/* <Slider {...settings}> */}
        { email.map((elment, i) => (<Socard data={elment} />)) }
      {/* </Slider> */}
      </SimpleGrid>
 
 
     {/* /////////////////////////////////////////////////////////////////////////////////////// */}
  
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr 1fr' }}
          spacing={8}>
          <Stack spacing={6}>
            <Box>
              <Text color={useColorModeValue('gray.700', 'white')}>Topstarter</Text>
            </Box>
            <Text fontSize={'sm'}>
              © 2022 Chakra Templates. All rights reserved
            </Text>
          </Stack>
          <Stack align={'flex-start'}>
            <Text>Product</Text>
            <Link href={'#'}>Overview</Link>
            <Link href={'#'}>Features</Link>
            <Link href={'#'}>Tutorials</Link>
            <Link href={'#'}>Pricing</Link>
            <Link href={'#'}>Releases</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <Text>Company</Text>
            <Link href={'#'}>About</Link>
            <Link href={'#'}>Press</Link>
            <Link href={'#'}>Careers</Link>
            <Link href={'#'}>Contact</Link>
            <Link href={'#'}>Partners</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <Text>Support</Text>
            <Link href={'#'}>Help Center</Link>
            <Link href={'#'}>Terms of Service</Link>
            <Link href={'#'}>Legal</Link>
            <Link href={'#'}>Privacy Policy</Link>
            <Link href={'#'}>Status</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <Text>Follow Us</Text>
            <Link href={'#'}>Facebook</Link>
            <Link href={'#'}>Twitter</Link>
            <Link href={'#'}>Dribbble</Link>
            <Link href={'#'}>Instagram</Link>
            <Link href={'#'}>LinkedIn</Link>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>

       
      </>
    )
  }
  return (
    <>
  
      <Headd></Headd>

      <Box mt ='50' ml='50' mr='50'>
      <Heading color="gray.500">Food</Heading>
      <ColoredLine color='black'/>
      
      <Slider {...settings}>
        { email.map((elment, i) => (<Socard data={elment} />)) }

        </Slider>

      </Box>
      
      <Box mt='50' ml='50' mr='50'>
      <Heading color="gray.500">Journey</Heading>
      <ColoredLine color='black'/>
      <Slider {...settings}>
        { email.map((elment, i) => (<Socard data={elment} />)) }

        </Slider>

      </Box>
      
      <Box mt='50' ml='50' mr='50'>
      <Heading color="gray.500">Accessories</Heading>
      <ColoredLine color='black'/>
      <Slider {...settings}>
        { email.map((elment, i) => (<Socard data={elment} />)) }

        </Slider>

      </Box>
    
      <Footer></Footer>

    </>
  )
}


export async function getServerSideProps(context) {

    return {
        props: {
            test: 'ggEZ',
            users: [{ Email: 'test' }]
        }
    }
}