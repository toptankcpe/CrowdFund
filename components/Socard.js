// import Image from 'next/image';
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Image
} from '@chakra-ui/react';
import ProgressBar from "@ramonak/react-progress-bar";
import React, { Component } from "react";
import Slider from "react-slick";
import { useRouter } from 'next/router'

export default function Socard({ data }) {
  
    
  
  const router = useRouter()

  const handleClick = (id) => {
    router.push({
      pathname: '/users',
      query: {
        id
      }
    })
  }
  console.log(data.Photo && data.Photo.url)

  


    return(
      
      
      // <div>
      //   <button onClick={()=>handleClick(data.Email)} style={{ backgroundColor: 'gray' , padding: '5px' , borderRadius: '5px' }} >{data.Email}</button>
      //   {/* <div> {data.Email} </div> */}
      // </div>
      
      
      <Center py={6} >
      <Box
        w={'400px'}
        // w={'full'}
        h={'550px'}
        // h={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
        onClick={()=>handleClick(data.idCount)}>
        <Box
         
          bg={'gray.100'}
          overflow={'auto'}
          h={'300px'}
          mt={-6}
          mx={-6}
          mb={6}
          // pos={'relative'}
          >
          <Image
          //  boxSize='300px'
           h='100%'
           w='100%'
          //  objectFit='cover'
       
          src={data.Photo && data.Photo.url}
            
          
          />
        </Box>
        <Stack>
          
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
        
        <Stack mt={2} direction={'row'} spacing={4} align={'center'}>
          {/* <Avatar
            src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
            alt={'Author'}
          /> */}
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>Achim Rolle</Text>
            <Text color={'gray.500'}>Feb 08, 2021 · 6min read</Text>
          </Stack>
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

