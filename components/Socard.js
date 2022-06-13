import Image from 'next/image';
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { Component } from "react";
import Slider from "react-slick";
import { useRouter } from 'next/router'

export default function Socard({ data }) {
  
    
  
  const router = useRouter()

  const handleClick = (email) => {
    router.push({
      pathname: '/users',
      query: {
        email
      }
    })
  }

  


    return(
      
      
      // <div>
      //   <button onClick={()=>handleClick(data.Email)} style={{ backgroundColor: 'gray' , padding: '5px' , borderRadius: '5px' }} >{data.Email}</button>
      //   {/* <div> {data.Email} </div> */}
      // </div>
      
      
      <Center py={6}>
      <Box
        maxW={'445px'}
        w={'full'}
        maxH={'445px'}
        h={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
        onClick={()=>handleClick(data.objectId)}>
        <Box
          h={'210px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}>
          {/* <Image
            src={
              'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            }
            layout={'fill'}
          /> */}
        </Box>
        <Stack>
          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}>
            {data.Email}
          </Text>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}>
            {data.CampaignName}
          </Heading>
          <Text color={'gray.500'}>
            {data.Tagline}
          </Text>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
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

