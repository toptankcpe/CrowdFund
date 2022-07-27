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


  export default function SocardBadge({ badge , changeBadge, removeBadge}) {
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
   
    if (badge.usedBadge == true) {
        // if (tmpdata == false){
        //     setTmpdata(true)
            
        // }
        

        button =  <Button
            
        mt={4}
        colorScheme='teal'
        
        type='submit'
        onClick={()=>removeBadge(badge)}
        >
        Remove
      </Button> 

      } else {

        button =
        <Button
            
        mt={4}
        colorScheme='teal'
        
        type='submit'
        onClick={()=>changeBadge(badge)}
        >
        Use
      </Button> 
      }



    // console.log("test" , datafund)
      
      return(
        
        
        // <div>
        //   <button onClick={()=>handleClick(data.Email)} style={{ backgroundColor: 'gray' , padding: '5px' , borderRadius: '5px' }} >{data.Email}</button>
        //   {/* <div> {data.Email} </div> */}
        // </div>
        
        
        <Center py={6}>
        <Box
          w={'400px'}
          // w={'full'}
          h={'460px'}
          // h={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'md'}
          p={6}
          overflow={'hidden'}
          >
          <Box

            display='flex'
            alignItems={'center'} 
            
            justifyContent={'center'}

           
            bg={'gray.100'}
            overflow={'auto'}
            h={'270px'}
            mt={-6}
            mx={-6}
            mb={6}
            // pos={'relative'}
            onClick={()=>handleClick(badge.idCount)}
            >
            <Image
            //  boxSize='300px'
            maxHeight={200}
            maxWidth={250}
               
            //  objectFit='cover'
         
            src={badge.badgePic && badge.badgePic.url}
              
            
            />
          </Box>
          <Stack onClick={()=>handleClick(badge.idCount)}>
            
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
              {badge.badgeName}
            </Heading>
            <Text color={'gray.500'}>
              {badge.badgeDes && badge.badgeDes.substring(0, 85)} . . .
            </Text>
          </Stack>
  
       
  
  
          {/* <Stack mt={6} align={'end'}>
          <Text ontWeight={600}>
          {data.Funded} TST / {data.goal} TST
            </Text>
          
          </Stack> */}
          {/* <ProgressBar completed={data.Funded/data.goal*100} maxCompleted={100}/> */}
          
          {/* <Stack mt={2} direction={'row'} spacing={4} align={'end'}>
         
            <Stack direction={'column'} spacing={0} fontSize={'sm'}>
              <Text fontWeight={600}>Achim Rolle</Text>
              <Text color={'gray.500'}>Feb 08, 2021</Text>
            </Stack>
            <Spacer />
            <Stack direction={'column'} spacing={0} fontSize={'sm'} align={'end'}>
              <Text fontWeight={600}>My Fund : {datafund.fundValue}</Text>
            
            </Stack>
            

          </Stack> */}
        
          <Stack>
          
         {button}

          
          
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
  
  