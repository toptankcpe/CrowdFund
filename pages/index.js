import { ReactNode } from 'react';
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
  useDisclosure
  
  
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';


const Links = ['Dashboard', 'Projects', 'Team']

const NavLink = () => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    
  </Link>
);


import Head from "next/head"
import { useMoralis , useWeb3ExecuteFunction } from "react-moralis"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Headd from "../components/Headd"

export default function Home() {
  
  const {isAuthenticated, authenticate, user, account,logout, isLoggingOut} = useMoralis()
  const contractProcessor = useWeb3ExecuteFunction();
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // router
  const router = useRouter()

  // handle function
  const handleButtonClickStartPage = () => {
    isAuthenticated ? router.push('/create') : alert('login frist')

  }

  const handleButtonClickStartDis = () => {
    isAuthenticated ? router.push('/list') : alert('login frist')

  }

  console.log(account)

  if(!isAuthenticated) {
    return(
      <>
      <Box bg={useColorModeValue('gray.800', 'gray.900')}  px={8}>
        <Flex h={20} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box >
            <Heading fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}>
              <Text  color={'blue.400'} as={'span'} >
                Topstarter
              </Text>
          </Heading>
            </Box>
           
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              <Link href={'create'}>
              <Text color={'white'} as={'span'}>
                Raise Campaign
              </Text>
              </Link>
            </HStack>
           
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              <Link href={'list'}>
              <Text color={'white'} as={'span'}>
                Fund Campaign
              </Text>
              </Link>
            </HStack>
         
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



      {/* /////////////////////////////////////////////////////////////////////////////////////// */}


      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}>
            
            <br />{' '}
            <Text color={'blue.400'} as={'span'}>
              Decentralize Crowdfunding
            </Text>{' '}
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
            The project board is an exclusive resource for contract work. It's
            perfect for freelancers, agencies, and moonlighters.
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <Button
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                onClick={() => handleButtonClickStartPage()}
                _hover={{
                  bg: 'blue.500',
                }}>
                Start Project
              </Button>
            {/* <Link href={'list'}> */}
            <Button rounded={'full'} onClick={() => handleButtonClickStartDis()}>Discover</Button>
            {/* </Link> */}
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
          }
        />
      </Flex>
    </Stack>

     {/* /////////////////////////////////////////////////////////////////////////////////////// */}



     <Footer></Footer>


  
      </>
    )
  }
  return (
    <>
  
      <Headd/>


      {/* /////////////////////////////////////////////////////////////////////////////////////// */}

      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}>
           
            <br />{' '}
            <Text color={'blue.400'} as={'span'}>
              Decentralize Crowdfunding
            </Text>{' '}
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
            The project board is an exclusive resource for contract work. It's
            perfect for freelancers, agencies, and moonlighters.
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Link href={'create'}>
              <Button
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Start Project
              </Button>
            </Link>
            <Link href={'list'}>
            <Button rounded={'full'}>Discover</Button>
            </Link>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
          }
        />
      </Flex>
    </Stack>

     {/* /////////////////////////////////////////////////////////////////////////////////////// */}

    <Footer></Footer>

    </>
  )
}
