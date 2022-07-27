// import Image from 'next/image';

import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Avatar,
    useColorModeValue,
    Image,
    Button,
    Spacer 
  } from '@chakra-ui/react';
  import ProgressBar from "@ramonak/react-progress-bar";
  import React, { Component } from "react";
  import Slider from "react-slick";
  import { useRouter } from 'next/router'
  import Moralis from 'moralis'
  import { useMoralis , useWeb3ExecuteFunction } from "react-moralis"
import Create from '../pages/create';
import { donated } from '../services/donate'

//   import {tests} from "../pages/create"


  export default function Socardfund({ data, datafund }) {
    let {isAuthenticated, authenticate,user, logout, account,isLoggingOut,isInitialized,} = useMoralis()
    const contractProcessor = useWeb3ExecuteFunction();
    let [tmpdata, setTmpdata] = React.useState(false)
 
    const router = useRouter()
  
    const handleClick = (id) => {
      router.push({
        pathname: '/users',
        query: {
          id
        }
      })
    }


    const handleETH = (id) => {
        // console.log(id)
        console.log(tmpdata)
      }
   
 
    let button;
  
      const saveObjects = async (data) => {
     
      
        donateCreate(data);
        
    };

    console.log("test" , datafund)
      
      return(
        
        
        // <div>
        //   <button onClick={()=>handleClick(data.Email)} style={{ backgroundColor: 'gray' , padding: '5px' , borderRadius: '5px' }} >{data.Email}</button>
        //   {/* <div> {data.Email} </div> */}
        // </div>
        
        
        <Center py={6}>
        <Box
          w={'400px'}
          // w={'full'}
          h={'570px'}
          // h={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'md'}
          p={6}
          overflow={'hidden'}
          >
          <Box
           
            bg={'gray.100'}
            overflow={'auto'}
            h={'270px'}
            mt={-6}
            mx={-6}
            mb={6}
            // pos={'relative'}
            onClick={()=>handleClick(data.idCount)}>
            <Image
            //  boxSize='300px'
             h='100%'
             w='100%'
            //  objectFit='cover'
         
            src={data.Photo && data.Photo.url}
              
            
            />
          </Box>
          <Stack onClick={()=>handleClick(data.idCount)}>
            
            {/* <Text
              color={'green.500'}
              textTransform={'uppercase'}
              fontWeight={800}
              fontSize={'sm'}
              letterSpacing={1.1}>
              {data.Email}
            </Text> */}
            <Heading
              color={useColorModeValue('gray.700', 'white')}
              fontSize={'2xl'}
              fontFamily={'body'}>
              {data.CampaignName}
            </Heading>
            <Text color={'gray.500'}>
              {data.Tagline && data.Tagline.substring(0, 85)} . . .
            </Text>
          </Stack>
  
       
  
  
          <Stack mt={6} align={'end'}>
          <Text ontWeight={600}>
          {data.Funded} TST / {data.goal} TST
            </Text>
          
          </Stack>
          <ProgressBar completed={data.Funded/data.goal*100} maxCompleted={100}/>
          
          <Stack mt={2} direction={'row'} spacing={4} align={'end'}>
            {/* <Avatar
              src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
              alt={'Author'}
            /> */}
            <Stack direction={'column'} spacing={0} fontSize={'sm'}>
              <Text fontWeight={600}>Achim Rolle</Text>
              <Text color={'gray.500'}>Feb 08, 2021</Text>
            </Stack>
            <Spacer />
            <Stack direction={'column'} spacing={0} fontSize={'sm'} align={'end'}>
              <Text fontWeight={600}>My Fund : {datafund.fundValue}</Text>
              {/* <Text color={'gray.500'}>Feb 08, 2021</Text> */}
            </Stack>
            

          </Stack>
        
          <Stack>
          
          <Button
            
        mt={4}
        colorScheme='teal'
        
        type='submit'
        onClick={()=>donateCreate(data)}
        >
        Claim
      </Button> 

          
          
          </Stack>
        </Box>
      </Center>
      
        
      
  
  
        
      )
  
  
    
            
    }
  
  
  
  // const Socard = ({ email }) => {
  //   return(
  //       <div>
  //         {email.Email}
  //       </div>
  //   )
  
  // };
  
  