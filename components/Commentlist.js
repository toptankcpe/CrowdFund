// import Image from 'next/image';

import {
    Box, 
    Stack,
    Text,
    Flex,  
    Button,
    Heading,
    Link,
    Image,
    IconButton
  } from '@chakra-ui/react';

  import {

    TriangleUpIcon,
    TriangleDownIcon,
  
  } from '@chakra-ui/icons';

  import React, { Component , useState } from "react";
  import { useRouter } from 'next/router'
  import Moralis from 'moralis'
  import { useMoralis , useWeb3ExecuteFunction } from "react-moralis"
import { FiCornerDownLeft } from 'react-icons/fi';


  export default function Commentlist({ data , badge }) {
    const {isAuthenticated, authenticate, user, logout, isLoggingOut,isInitialized} = useMoralis()
    
    var [commentbadge, setCommentbadge] = useState([]);

    let tm = data && data.createdAt
 
    let dateti = new Date(tm)
    let textdate = dateti.toString();

    let textsplit = textdate.split("+")[0];

    React.useEffect(() => {

      
      if(isInitialized){
  
  
  
       (async () => {
         
           let resultsbadge
           let resultsbadge1
          
           let use = user.get("ethAddress")
           // console.log(use)
           
           try {
               
  
               let querybadge = new Moralis.Query("Badge");
               let tmpbadge = querybadge.equalTo("badgeAddress",data.comAddress);
               resultsbadge = await tmpbadge.find();
               querybadge.equalTo("usedBadge",true);
               resultsbadge1 = await tmpbadge.first();
  
               
               
               
               
               
             
               var myJSON3 = JSON.stringify(resultsbadge1);
               var pa3 = JSON.parse(myJSON3)
  
              
  
  
               
             
             
             // results = await query.find();
             
               
            } catch (error) {
                   console.log(error);
                  
           }
  
           
  
  
  
           setCommentbadge(pa3)
          
   
               
               // console.log(">>>>>>>>>>" + JSON.parse(JSON.stringify(results["0"])));
               // var myJSON = JSON.stringify(results);
               // var pa = JSON.parse(myJSON)
   
              
               // setEmail(pa);
               
           
           })();
         }
       }, [isInitialized]);

       const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 2
            }}
        />
      );




     

    return(
    <Box mb="2">
        <Box
          backgroundColor="white"
          borderRadius="lg"
          boxShadow="sm"
          pl={3}
          pr={3}
          pt={5}
          pb={5}
          display="block"
          border="2px solid"
        >
          <Flex
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-start"
            mb={2}
            pl={4}
          >
            <Heading
              size="md"
              as="h2"
              lineHeight="shorter"
              fontWeight="bold"
              fontFamily="heading"
            >
              {data.comName}
            </Heading>

            <Stack
            
            justify={'flex-end'}
            direction={'row'}
            ml={2}
           
           >
           <Link href={badge && badge.badgePic && badge.badgePic.url}>
         <Image
                    // rounded={'lg'}
                    height={10}
                    maxWidth={250}
                    objectFit={'fill'}
                    
                    src= {commentbadge && commentbadge.badgePic && commentbadge.badgePic.url}
          />
          </Link>

          </Stack>




            <Text ml={2} opacity={0.53}>
              {textsplit}
            </Text>

           

           




          </Flex>

          <ColoredLine color={'black'} />

          


          <Stack spacing={5} pl={4} pt={4} mb={8} flexDirection="row" >
            <Stack spacing={2} flexDirection="column">
              <Text color="gray.600">
              {data.comValue}
              </Text>
            </Stack>
          </Stack>

          
          
          <Button variant="solid" size="md" ml={3}>
            Reply
          </Button>
          <IconButton
            aria-label="icon"
            icon={<TriangleUpIcon />}
            size="md"
            ml={2}
            color="whatsapp.500"
          />
          <Text display="inline" ml={2}>
          {data.like}
          </Text>
          <IconButton
            aria-label="icon"
            icon={<TriangleDownIcon />}
            size="md"
            ml={2}
            color="red.500"
          />
          <Text display="inline" ml={2}>
          {data.dislike}
          </Text>
        </Box>
      </Box>
    )
}
  
  
  
  // const Socard = ({ email }) => {
  //   return(
  //       <div>
  //         {email.Email}
  //       </div>
  //   )
  
  // };
  
  










