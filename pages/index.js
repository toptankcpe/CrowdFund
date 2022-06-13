// import { Button, Flex ,Text, } from "@chakra-ui/react"

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
import { useMoralis } from "react-moralis"
import Header from "../components/Header"




export default function Home() {
  
  const {isAuthenticated, authenticate, user, account,logout, isLoggingOut} = useMoralis()
  
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // router
  const router = useRouter()

  // handle function
  const handleButtonClickStartPage = () => {
    isAuthenticated ? router.push('/create') : alert('login frist')
    // if(!isAuthenticated){
    //   alert('login frist')
    //   return
    // }
    // router.push('/create)

  
  }

  const handleButtonClickStartDis = () => {
    isAuthenticated ? router.push('/list') : alert('login frist')
    // if(!isAuthenticated){
    //   alert('login frist')
    //   return
    // }
    // router.push('/create)

  
  }

  console.log(account)

  if(!isAuthenticated) {
    return(
      <>
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
            <Box>
            <Heading fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}>
              <Text color={'blue.400'} as={'span'}>
                Topstarter
              </Text>
          </Heading>
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
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



      {/* /////////////////////////////////////////////////////////////////////////////////////// */}


      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}>
            {/* <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'blue.400',
                zIndex: -1,
              }}>
              Topstarter
            </Text> */}
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


        {/* <Head>
          <title>Login | Topstarter</title>
        </Head>
        <Flex 
        direction="column" 
        justifyContent="center" 
        alignItems="center"
        width="100vw"
        height="100vh"
        bgGradient="linear(to-br, teal.400, purple.300)"
        >
          <Text fontSize="5xl" fontWeight="bold" color="white">Topstarter</Text>
          <Button colorScheme="whiteAlpha" size="lg" mt="6"
          onClick={() => authenticate({
            signingMessage: "Sign to login to Topstarter"
          })}
          >Login with Metamask</Button>
        </Flex> */}
      </>
    )
  }
  return (
    <>
      {/* <Head>
        <title>Topstarter</title>
      </Head>
      <Flex direction="column" width="100vw" height="100vh">
        <Header user={user} logout={logout} isLoggingOut={isLoggingOut}/>
        <Box flex="1" bg="purple.100" px="44" py="20"></Box>
      </Flex> */}
      
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={8}>
        <Flex h={20} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
            <Heading fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}>
              <Text color={'blue.400'} as={'span'}>
                Topstarter
              </Text>
          </Heading>
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
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
                onClick={() => logout({})}>
                Logout
              </Button>
            </Stack>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>



      {/* /////////////////////////////////////////////////////////////////////////////////////// */}


      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}>
            {/* <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'blue.400',
                zIndex: -1,
              }}>
              Topstarter
            </Text> */}
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
