Moralis.initialize('Z8FXeX1VJPU6jsG2GkiHwn6nBjpPGr5NjoWXF6db')
Moralis.serverURL = 'https://l3csqx0gioxx.usemoralis.com:2053/server'

import Sidebar from '../components/Sidebar'
import Card from '../components/Socard'
import { Flex, Text, IconButton, Box, useColorModeValue,HStack,Heading,Stack,Button, Link,FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input} from '@chakra-ui/react'
import { useMoralis } from "react-moralis"
import { FiMenu } from 'react-icons/fi'
import Moralis from 'moralis'
import { useNewMoralisObject } from "react-moralis";
import React, { useEffect, useState } from "react";
import { useRouter  } from 'next/router'



export default function Create() {
    const {isAuthenticated, authenticate, user, logout, isLoggingOut,isInitialized} = useMoralis()
    // const Campaign = Moralis.Object.extend("Campaign");
    // const campaign = new Campaign();
    const { save } = useNewMoralisObject("Campaign");

    // router
    const router = useRouter()

    const [state, setState] = React.useState({
        Email: "",
        CampaignName: "",
        Tagline: "",
        Story: "test",
        Group: "Food",
        Goal: "500",
        Country: "thai",
        Deadline: "2018-09-30",
        // Photo: "",
        Reward: ""
      });
    const [selectedTab, setSelectedTab] = useState()

    // handle function
    const handleLogout = async () => {
        await logout({})
        router.push('/')
    }

    function handleChange(event) {
    const value = event.target.value;
    setState({
        ...state,
        [event.target.name]: value,
    });
    }

    // use Effect
    useEffect(() => {
        // console.log(isAuthenticated, "isAuthenticated")
        // if(!isAuthenticated){
        //     router.push('/')
        // }
    }, [])

    const saveObject = async () => {
        // const data = {
        //     Emails: value,
        //     CampaignName: value,
        //     Tagline: value,
        // };
    
        save(state, {
          onSuccess: (Campaign) => {
            // Execute any logic that should take place after the object is saved.
            alert("New object created with objectId: " + Campaign.id);
          },
          onError: (error) => {
            // Execute any logic that should take place if the save fails.
            // error is a Moralis.Error with an error code and message.
            alert("Failed to create new object, with error code: " + error.message);
          },
        });
    };
    // campaign.set('Email','topstarter@gmail.com')
    // campaign.set('CampaignName','Matcha Greentea Organic')
    // campaign.set('Tagline','Matcha Greentea for everyone')

    // campaign.set('Email','toptank@gmail.com')
    // campaign.set('CampaignName','Strawberry Organic')
    // campaign.set('Tagline','Strawberry for everyone')
    // campaign.save()

    if(!isAuthenticated) {
    return (
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
            <Link href={'/'}>
                <Text color={'blue.400'} as={'span'}>
                    Topstarter
                </Text>
            </Link>
        </Heading>
            </Box>
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

    <Flex w="100%">
      <Sidebar setSelected={setSelectedTab} />
      <Flex
        pos="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        <Text>Click the
          <IconButton
            background="none"
            _hover={{ background: 'none' }}
            icon={<FiMenu />}
          />
        to resize the vertical navigation bar.</Text>
      </Flex>
    </Flex>
    </>
        )
    }
    

    if(isAuthenticated){
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

       <Flex w="100%">
       <Sidebar setSelected={setSelectedTab} />
       <Flex
         pos="absolute"
         top="30%"
         left="30%"
         transform="translate(-50%, -50%)"
       >
         {/* <Text>Click the
           <IconButton
             background="none"
             _hover={{ background: 'none' }}
             icon={<FiMenu />}
           />
         to resize the vertical navigation bar.</Text> */}
        { selectedTab === 'Campaign' && <FormControl>
            <FormLabel htmlFor='Email'>Email address</FormLabel>
            <Input size='lg' name='Email' type='text' value={state.Email}
            onChange={handleChange}/>
            {/* <FormHelperText>We'll never share your email.</FormHelperText> */}

            <FormLabel htmlFor='Campaign Name'>Campaign Name</FormLabel>
            <Input size='lg' name='CampaignName' type='text' value={state.CampaignName}
            onChange={handleChange}/>
            {/* <FormHelperText>We'll never share your email.</FormHelperText> */}

            <FormLabel htmlFor='Tagline'>Tagline</FormLabel>
            <Input size='lg' name='Tagline' type='text' value={state.Tagline}
            onChange={handleChange} />
            {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
           
            <Button
            
            mt={4}
            colorScheme='teal'
            // isLoading={props.isSubmitting}
            type='submit'
            onClick={saveObject}
            >
            Submit
          </Button>
        
        </FormControl>}
        { selectedTab === 'Dashboard' && <div>Dashboard</div>}
        { selectedTab === 'Calendar' && <div>Calendar</div>}
        { selectedTab === 'Settings' && <div>Settings</div>}

       </Flex>
     </Flex>
     </>


        )

    
    }
    
}