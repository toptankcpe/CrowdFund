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
import React, { Component , useState } from "react";
import Slider from "react-slick";
import { useRouter } from 'next/router'
import { useMoralis , useWeb3ExecuteFunction } from "react-moralis"
import { FiCornerDownLeft } from 'react-icons/fi';
import Moralis from 'moralis'





export default function Headd( ){
  const {isAuthenticated, authenticate, user, logout, isLoggingOut,isInitialized} = useMoralis()


  var [badge, setBadge] = useState([]);
  React.useEffect(() => {

      
    if(isInitialized){



     (async () => {
       
         let resultsbadge
         let resultsbadge1
        
         let use = user.get("ethAddress")
         // console.log(use)
         
         try {
             

             let querybadge = new Moralis.Query("Badge");
             let tmpbadge = querybadge.equalTo("badgeAddress",use);
             resultsbadge = await tmpbadge.find();
             querybadge.equalTo("usedBadge",true);
             resultsbadge1 = await tmpbadge.first();

             
             
             
             
             
           
             var myJSON3 = JSON.stringify(resultsbadge1);
             var pa3 = JSON.parse(myJSON3)

            


             
           
           
           // results = await query.find();
           
             
          } catch (error) {
                 console.log(error);
                
         }

         



         setBadge(pa3)
        
 
             
             // console.log(">>>>>>>>>>" + JSON.parse(JSON.stringify(results["0"])));
             // var myJSON = JSON.stringify(results);
             // var pa = JSON.parse(myJSON)
 
            
             // setEmail(pa);
             
         
         })();
       }
     }, [isInitialized]);

     console.log('>>>>>>>>>>>>>>>>',badge)


    

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
      <Box bg={useColorModeValue('gray.800', 'gray.900')}  px={8}>
      <Flex h={20} alignItems={'center'} justifyContent={'space-between'}>
        {/* <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        /> */}
        <HStack spacing={8} alignItems={'center'}>
          <Box >
          <Heading fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}>
          <Link href={'/'}>
            <Text  color={'blue.400'} as={'span'} >
              Topstarter
            </Text>
          </Link>
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
              Discover Campaign
            </Text>
            </Link>
          </HStack>
       
        </HStack>

       
        
       
        
        
        <Flex alignItems={'center'}>

          <Stack
            
            justify={'flex-end'}
            direction={'row'}
            mr='2'
           >
           <Link href={badge && badge.badgePic && badge.badgePic.url}>
         <Image
                    // rounded={'lg'}
                    maxHeight={14}
                    maxWidth={250}
                    objectFit={'fill'}
                    src= {badge && badge.badgePic && badge.badgePic.url}
          />
          </Link>

          </Stack>
    

          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}>

           

         


                  

           
           

         
             

              <Button
             
              /* flex={1} */
              px={4}
              fontSize={'sm'}
              // rounded={'full'}
              bg={'blue.400'}
              color={'white'}
              boxShadow={
                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
              }
              _hover={{
                bg: 'blue.500',
              }}
              _focus={{
                bg: 'blue.500',
              }}>
              {user.get("username")}
            </Button>

            <Button
             
             /* flex={1} */
             px={4}
             fontSize={'sm'}
             // rounded={'full'}
             bg={'green.500'}
             color={'white'}
             boxShadow={
               '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
             }
             _hover={{
               bg: 'green.500',
             }}
             _focus={{
               bg: 'green.500',
             }}>
             10 point
           </Button>
                    
         
            
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
