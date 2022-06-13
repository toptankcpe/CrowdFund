// import { Button, Flex ,Text, } from "@chakra-ui/react"

Moralis.initialize('Z8FXeX1VJPU6jsG2GkiHwn6nBjpPGr5NjoWXF6db')
Moralis.serverURL = 'https://l3csqx0gioxx.usemoralis.com:2053/server'

import Moralis from 'moralis'
import { useMoralisQuery } from "react-moralis";
import React, { Component, useState } from "react";
import Slider from "react-slick";

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
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    
    // -> readfile -> prop -> render -> usereffect 
    


    // email.forEach(item => {
    //     let strItem = JSON.stringify(item)
    //     let obj = JSON.parse(strItem)
    //     resultArr.push(obj)
    //   })
    // console.log(resultArr);
    console.log(email);
    console.log(email[0]);
    console.log(email[0].Email);

    const handleLogout = async () => {
      await logout({})
      router.push('/')
  }


//   var getname = async () => {
//       var query = new Moralis.Query("Campaign")
//       var results = await query.find();
//     //   console.log(results[1].get("Tagline"))
//     var json = {}
//     for (let i = 0; i < results.length; i++) {
//         var object = results[i];

//         var arr = {
//             objectId : object.id,
//             createat : object.get("createdAt"),
//             Email : object.get("Email"),
//             CampaignName: object.get("CampaignName"),
//             Tagline: object.get("Tagline")
//         }
//     json[i] = arr
//     //     alert(object.id + " - " + object.get("ownerName"));
//     //   }

    
//     }
//     return json
//   }
//   getname();
  var text1 = "test"
//   var test2 = "test"

//   const mainFunction = async () => {
//     const result = await getname();
//     return result
//   }

//   var t3 = mainFunction();
//   console.log(t3)



//   var UserComponent = () => {
//     var [email, setEmail] = React.useState([]);
//     React.useEffect(() => {
        
//         var getname = async () => {
//             var query = new Moralis.Query("Campaign")
//             var results = await query.find();
//           //   console.log(results[1].get("Tagline"))
//           var json = {}
//           for (let i = 0; i < results.length; i++) {
//               var object = results[i];
      
//               var arr = {
//                   objectId : object.id,
//                   createat : object.get("createdAt"),
//                   Email : object.get("Email"),
//                   CampaignName: object.get("CampaignName"),
//                   Tagline: object.get("Tagline")
//               }
//           json[i] = arr
//           //     alert(object.id + " - " + object.get("ownerName"));
//           //   }
      
          
//           }
//           return json
//         }

//         getname().then(result => setEmail(result));

        
//         // var response = await fetch("/emails");
//         // var { email } = await response.json();   
//         },[]);
//     return email;
// }



// let to = UserComponent();
// let too = JSON.parse(to)
// let too = to[5]

// var jj = JSON.parse(email)
// alert(email["Email"])
// console.log(email)
// console.log(myJSON)
// console.log(email.Email)
// console.log(Object.keys(email));
// console.log(Object.keys(email["0"]));
// React.useEffect(() => {
//     return console.logmainFunction();
//   }, []);
  
//   (async () => {
//     let test5 = await mainFunction()
//   })()

// var ty = (async() => {

//     const users = await mainFunction();
  
//     const asyncExample = async() => {
//       let data;
//       try {
//         data = await Promise.resolve(users);
//       } catch (err) {
//         console.log(err);
//       }
//       return data;
//     };
  
//     //Save response on a variable
//     const globalData = await asyncExample();
//     console.log(globalData);
//     return globalData;
//   })();

//   console.log(ty);

// var globalData;
// const asyncExample = async () =>{
//     try {
//         const data = await getname();
//         return data; // this will change globalData
//         console.log(data); //200
//     }
//     catch (err) {
//         console.log(err);
//     }
// };
// let globalData = asyncExample();


// console.log(globalData);

// const show = async () => {
//     await globalData();
    
// }
// show();

  
// const df = () => {
//     const [athenaVal, setAthenaVAl] = React.useState(null);
  
//     React.useEffect(() => {
//         getname().then(result => setAthenaVAl(result));
//     }, []); // <-- empty dependency array -> on mount/initial render only
  
//     return athenaVal;
//   }

// // var t3 = mainFunction().then(value => console.log(value));


// console.log(df)




  
  
  if(!isAuthenticated) {
    return(
   
      <>
      {/* <h1>{ test }</h1> */}
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
            <Link href={'/'}>
              <Text color={'blue.400'} as={'span'}>
                Topstarter
              </Text>
            </Link>
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


        {/*  => [] => .map [0] ->  */}
      {/* /////////////////////////////////////////////////////////////////////////////////////// */}
      {/* Array.isArray(email) &&  */}
      
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
                onClick={() => handleLogout()}>
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


export async function getServerSideProps(context) {

    return {
        props: {
            test: 'ggEZ',
            users: [{ Email: 'test' }]
        }
    }
}