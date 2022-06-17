// import { useRouter } from "next/router"
// import { useEffect, useState } from "react"

// const Users = () => {
//     // state
//     const [email, setEmail] = useState()
//     const router = useRouter()

//     // handle fucntion
    
//     // use Effect
//     useEffect(() => {
//         console.log(router.query, "router.query")
//        setEmail(router.query.email)
//     },[router])

//     return (
//         <div>
//             <h1>
//                 {email}
//             </h1>

//         </div>
//     )
// }

// export default Users

import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
    VisuallyHidden,
    List,
    ListItem,
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    FormErrorMessage,
    useDisclosure
  } from '@chakra-ui/react';
  





  import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
  import { MdLocalShipping } from 'react-icons/md';
  import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
  } from '@chakra-ui/icons';
  
  import Head from "next/head"
  import { useMoralis , useWeb3ExecuteFunction } from "react-moralis"
  import Header from "../components/Header"
  import Socard from "../components/Socard"
  import Moralis from 'moralis'

  import Headd from "../components/Headd";
  import Footer from "../components/Footer";
  export default function Users(test, users) {

  const {isAuthenticated, authenticate, user, logout, isLoggingOut, Moralis} = useMoralis()
  const contractProcessor = useWeb3ExecuteFunction();
    // const { isOpen, onOpen, onClose } = useDisclosure();
    // var resultArr = []
 
  var [second, setSecond] = useState([]);
  const router = useRouter()
  let [fund, setFund] = React.useState({
    idCount: 0,
    Fund: null,
    
  });
  React.useEffect(() => {
        
    (async () => {
        let results
        let tmp = router.query.id
        let convertStr = parseInt(tmp);
        console.log(router.query, "router.query")
        console.log(typeof convertStr)
       
        try {
            let query = new Moralis.Query("Campaign")
            let tmp2 = query.equalTo("idCount",convertStr);
            // results = await query.find();
            results = await tmp2.find();
            
         } catch (error) {
                console.log(error);
               
        }
        
     

            
            // console.log(">>>>>>>>>>" + JSON.parse(JSON.stringify(results["0"])));
            var myJSON = JSON.stringify(results[0]);
            var pa = JSON.parse(myJSON)
            // console.log(results)
            // console.log(pa)
           
            setSecond(pa);
            setFund({
              ...fund,
              idCount: convertStr,
          })

            
            
        
        })();
    }, []);

    console.log(fund)


    async function fundCampaign(fund) {

      let busdInWei = Moralis.Units.Token(fund.Fund, "18")
      let convert = parseInt(busdInWei)
      let big = BigInt(convert)
      console.log(typeof big);
      let options = {
        contractAddress: "0xC8F3CEef7D11E1FDF990465C8cA46Dea3F8bb4C4",
        functionName: "pledge",
        abi: [
          {"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"pledge","outputs":[],"stateMutability":"nonpayable","type":"function"}
        ],
        params: {
          _id: fund.idCount,
          _amount: busdInWei
        
        },
        
      }


      
      await Moralis.enableWeb3(); 
      await contractProcessor.fetch({
        params: options,
  
        onSuccess: (data) => {
          console.log(data);
          console.log("mint done");
        },
        onComplete: () => {
          console.log("done");
        },
        onError: (err) => {
          console.log(err);
        },
      });
    };


    async function approve(fund) {

      let busdInWei = Moralis.Units.Token(fund.Fund, "18")
      let convert = parseInt(busdInWei)
      let big = BigInt(convert)
      
      let options = {
        contractAddress: "0x932f64E912169643646F8aCB7B39e8f6903D7b89",
        functionName: "approve",
        abi: [
          {
            "constant": false,
            "inputs": [
                {
                    "name": "_spender",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
        ],
        params: {
          _spender: "0xC8F3CEef7D11E1FDF990465C8cA46Dea3F8bb4C4",
          _value: busdInWei
        
        },
        
      }


      
      await Moralis.enableWeb3(); 
      await contractProcessor.fetch({
        params: options,
  
        // onSuccess: (data) => {
        //   console.log(data);
        //   console.log("mint done");
        // },
        // onComplete: () => {
        //   console.log("done");
        // },
        // onError: (err) => {
        //   console.log(err);
        // },
        onSuccess: (tx) =>
        tx.wait().then((finalTx) => {
          console.log(finalTx)
          fundCampaign(fund);
        }),


      });
    };

    function handleChange(event) {
      const value = event.target.value;
      setFund({
          ...fund,
          [event.target.name]: +event.target.value,
      })
      ;
      }
    
    return (


        <>
        <Headd>

        </Headd>

      <Container maxW={'7xl'}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}>
          <Flex>
            <Image
              rounded={'md'}
              alt={'product image'}
              src={
                'https://media.istockphoto.com/id/1351381197/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%8A%E0%B8%B2%E0%B9%80%E0%B8%82%E0%B8%B5%E0%B8%A2%E0%B8%A7%E0%B8%AD%E0%B8%B8%E0%B9%88%E0%B8%99%E0%B8%9A%E0%B8%99%E0%B9%82%E0%B8%95%E0%B9%8A%E0%B8%B0%E0%B9%84%E0%B8%A1%E0%B9%89.webp?s=612x612&w=is&k=20&c=pfVYpC3tmdJGiloa6Pt-QXcG5O8GDSn9zewnVu3FMj4='
              }
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={{ base: '100%', sm: '400px', lg: '500px' }}
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={'header'}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                {second.CampaignName}
              </Heading>
              <Text
                color={useColorModeValue('gray.900', 'gray.400')}
                fontWeight={300}
                fontSize={'2xl'}>
                $350.00 USD
              </Text>
            </Box>
  
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={'column'}
              divider={
                <StackDivider
                  borderColor={useColorModeValue('gray.200', 'gray.600')}
                />
              }>
              <VStack spacing={{ base: 4, sm: 6 }}>
                {/* <Text
                  color={useColorModeValue('gray.500', 'gray.400')}
                  fontSize={'2xl'}
                  fontWeight={'300'}>
                  Test
                </Text> */}
                <Text fontSize={'lg'}>
                {second.Tagline}
                </Text>
                  
              </VStack>
              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={useColorModeValue('yellow.500', 'yellow.300')}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}>
                  Features
                </Text>
  
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  <List spacing={2}>
                    <ListItem>Chronograph</ListItem>
                    <ListItem>Master Chronometer Certified</ListItem>{' '}
                    <ListItem>Tachymeter</ListItem>
                  </List>
                  <List spacing={2}>
                    <ListItem>Anti‑magnetic</ListItem>
                    <ListItem>Chronometer</ListItem>
                    <ListItem>Small seconds</ListItem>
                  </List>
                </SimpleGrid>
              </Box>
              <Box>
              <FormLabel htmlFor='Fund'>Fund</FormLabel>
              <Input size='lg' name='Fund' type='int' value={fund.Fund}
              onChange={handleChange}/>
              </Box>
              {/* <Box> */}
                {/* <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={useColorModeValue('yellow.500', 'yellow.300')}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}>
                  Product Details
                </Text> */}
  
                {/* <List spacing={2}>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Between lugs:
                    </Text>{' '}
                    20 mm
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Bracelet:
                    </Text>{' '}
                    leather strap
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Case:
                    </Text>{' '}
                    Steel
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Case diameter:
                    </Text>{' '}
                    42 mm
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Dial color:
                    </Text>{' '}
                    Black
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Crystal:
                    </Text>{' '}
                    Domed, scratch‑resistant sapphire crystal with anti‑reflective
                    treatment inside
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Water resistance:
                    </Text>{' '}
                    5 bar (50 metres / 167 feet){' '}
                  </ListItem>
                </List> */}
              {/* </Box> */}
            </Stack>
  
            <Button
              rounded={'none'}
              w={'full'}
              mt={8}
              size={'lg'}
              py={'7'}
              bg={useColorModeValue('gray.900', 'gray.50')}
              color={useColorModeValue('white', 'gray.900')}
              textTransform={'uppercase'}
              _hover={{
                transform: 'translateY(2px)',
                boxShadow: 'lg',
              }}
              type='submit'
              onClick={() => approve(fund)}>
              Fund Campaign
            </Button>
  
            <Stack direction="row" alignItems="center" justifyContent={'center'}>
              <MdLocalShipping />
              <Text>The investment risk. Prospectus carefully before investing</Text>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
      

      <Footer>
      </Footer>
      </>
    );
  }
 
  export async function getServerSideProps(context) {

    return {
        props: {
            test: 'ggEZ',
            users: [{ Email: 'test' }]
        }
    }
}