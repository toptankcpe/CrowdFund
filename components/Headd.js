// import Image from 'next/image';
import {
    Button,
    IconButton,
    Flex,
    Heading,
    Container,
    Collapse,
    Icon,
    Avatar,
    HStack,
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
    Link,
    Box,
    Text,
    useBreakpointValue,
    useColorModeValue,
    useDisclosure } from '@chakra-ui/react';
import React, { Component } from "react";
import Slider from "react-slick";
import { useRouter } from 'next/router'
import { useMoralis , useWeb3ExecuteFunction } from "react-moralis"





export default function Headd(){
  const {isAuthenticated, authenticate, user, logout, isLoggingOut,isInitialized} = useMoralis()
  const router = useRouter()
   // handle function
   const handleLogout = async () => {
    await logout({})
    router.push('/')
}
    
    if(!isAuthenticated) {
        return(
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={8}>
            <Flex h={20} alignItems={'center'} justifyContent={'space-between'}>
            {/* <IconButton
                size={'md'}
                icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                aria-label={'Open Menu'}
                display={{ md: 'none' }}
                onClick={isOpen ? onClose : onOpen}
            /> */}
            <HStack spacing={8} alignItems={'center'}>
            <Link href={'/'}>
                <Box>
                <Heading fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}>
                <Text color={'blue.400'} as={'span'}>
                    Topstarter
                </Text>
            </Heading>
                </Box>
            </Link>
                {/* <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}>
                {Links.map((link) => (
                    <NavLink key={link}>{link}</NavLink>
                ))}
                </HStack> */}
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

            {/* {isOpen ? (
            <Box pb={4} display={{ md: 'none' }}>
                <Stack as={'nav'} spacing={4}>
                {Links.map((link) => (
                    <NavLink key={link}>{link}</NavLink>
                ))}
                </Stack>
            </Box>
            ) : null} */}
        </Box>
        )
    }
    if(isAuthenticated) {
    return(
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={8}>
        <Flex h={20} alignItems={'center'} justifyContent={'space-between'}>
          {/* <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          /> */}
          <HStack spacing={8} alignItems={'center'}>
          <Link href={'/'}>
            <Box>
            <Heading fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}>
              <Text color={'blue.400'} as={'span'}>
                Topstarter
              </Text>
          </Heading>
            </Box>
            </Link>
            {/* <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack> */}
          </HStack>
          <Flex alignItems={'center'}>
            <Stack
              flex={{ base: 1, md: 0 }}
              justify={'flex-end'}
              direction={'row'}
              spacing={6}>
              <Text>{user.get("ethAddress")}</Text>
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
                onClick={() => handleLogout()}>
                Logout
              </Button>
            </Stack>
          </Flex>
        </Flex>

        {/* {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null} */}
      </Box>
    )
    
    }
}
