Moralis.initialize('Z8FXeX1VJPU6jsG2GkiHwn6nBjpPGr5NjoWXF6db')
Moralis.serverURL = 'https://l3csqx0gioxx.usemoralis.com:2053/server'

import dynamic from 'next/dynamic';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'suneditor/dist/css/suneditor.min.css';

import Sidebars from '../components/Sidebars'
import Card from '../components/Socard'
import Footer from '../components/Footer'
import { Flex, Text, IconButton, Box, useColorModeValue,HStack,Heading,Stack,Button, Link,FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    VStack,
    StackDivider,
    Container,
    SimpleGrid,
    Select} from '@chakra-ui/react'
import { useMoralis , useWeb3ExecuteFunction } from "react-moralis"
import { FiMenu } from 'react-icons/fi'
import Moralis from 'moralis'
import { useNewMoralisObject } from "react-moralis";
import React, { useEffect, useState } from "react";
import { useRouter  } from 'next/router'
import Socardfund from "../components/Socardfund"

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});


export default function Fund() {
    let {isAuthenticated, authenticate,user, logout, account,isLoggingOut,isInitialized,} = useMoralis()

    const contractProcessor = useWeb3ExecuteFunction();
    // const { save } = useNewMoralisObject("Campaign");
    let MonsterCreat = new Moralis.Object.extend('Campaign')
    let allMonster = new MonsterCreat();
    var [count, setCount] = useState(0);
    var [name, setName] = useState();
    var [fundq, setFundq] = useState([[]]);
    var [campq, setCampq] = useState([[]]);
    
    let [state, setState] = React.useState({
      idCount: 0,
      Email: "top@hotmail.com",
      CampaignName: "",
      Tagline: "",
      Story: "",
      Group: "",
      Country: "",
      Reward: "",
      goal: null,
      startAt: new Date(),
      endAt:  new Date()
    });


    const router = useRouter()

    React.useEffect(() => {

     if(isInitialized){

      (async () => {
          let results;
          let response
          let tmp;
          let arr = []
          let arrs = []
         
          let use = user.get("ethAddress")
    
          try {
              let query = new Moralis.Query("Fund");
              let query2 = new Moralis.Query("Campaign");
              
            
              let tmp2 = query.equalTo("fundAddress",use);
              results = await tmp2.find();
              
              var myJSON = JSON.stringify(results);
              var pa = JSON.parse(myJSON)

              for (let i = 0; i < pa.length; i++) {
                arr.push(pa[i].idCount)
                
                let tmp3 = query2.equalTo("idCount",pa[i].idCount);
                response = await tmp3.find();

                arrs.push(response[0])
              }

              var myJSON2 = JSON.stringify(arrs);
              var pa2 = JSON.parse(myJSON2)

            
              
           } catch (error) {
                  console.log(error);
                 
          }


          setFundq(pa)
          setCampq(pa2)
        

          
          })();
        }
      }, [isInitialized]);

      
      console.log(fundq);
      console.log(campq);
      

    async function donate(state) {

      let busdInWei = Moralis.Units.Token(state.goal, "18")
      let startdate = parseInt(new Date(state.startAt).getTime() / 1000 + 100)
      let enddate = parseInt(new Date(state.endAt).getTime() / 1000)
      console.log(typeof busdInWei)
      let options = {
        contractAddress: "0x4cAbE6944176b1ed7cE6eDaD5e080f19f31B59d6",
        functionName: "launch",
        abi: [
          {"inputs":[{"internalType":"uint256","name":"_goal","type":"uint256"},{"internalType":"uint32","name":"_startAt","type":"uint32"},{"internalType":"uint32","name":"_endAt","type":"uint32"},{"internalType":"uint32","name":"_id","type":"uint32"}],"name":"launch","outputs":[],"stateMutability":"nonpayable","type":"function"}
        ],
        params: {
          _goal: busdInWei,
          _startAt: startdate,
          _endAt: enddate,
          _id: state.idCount
        
        },
        
      };
      
      for (let i = 0; i < data.length; i++) {
        if(data[i].Launched == true){
          alert("You have already launched campaign : " + data[i].CampaignName);
          break;
        }

        else {
          await Moralis.enableWeb3(); 
          await contractProcessor.fetch({
            params: options,

            onSuccess: (tx) =>
            tx.wait().then((finalTx) => {
              console.log(file)
              console.log("top")

              let moralisFile = new Moralis.File(name, file);
              allMonster.set(state)
              allMonster.set("Photo", moralisFile) 
              allMonster.set("ethAddress",user.get("ethAddress") ) 
              allMonster.set("Launched",true)
              allMonster.save().then(
                (allMonster) => {
              
              
                count = count +1
                setState({
                    ...state,
                    idCount: count,
                })
                  alert("New object created with objectId: " + allMonster.id);

                },
                (error) => {
      
                  alert("Failed to create new object, with error code: " + error.message);
                }
              );
              
            }),

          });
      }
    }
  };
      

    const [selectedTab, setSelectedTab] = useState()

    const handleLogout = async () => {
        await logout({})
        router.push('/')
    }

    function handleChange(event) {
    const value = event.target.value;
    setState({
        ...state,
        [event.target.name]: +event.target.value,
    })
    ;
    }


    function handleChangeText(event) {
      const value = event.target.value;
      setState({
          ...state,
          [event.target.name]: event.target.value,
      })
      ;
      }

    function handleQuillEdit(value){
      setState((prev) => {
        return {
          ...prev,
          Story: value
        }
      })

  }

    function handleDate(value){
      setState((prev) => {
        return {
          ...prev,
          endAt: value
        }
      })

    }

    function onChangePhoto(e){
      
      // console.log(e.target.files[0].name)
      // console.log(e.target.files[0])
      setName(e.target.files[0].name)
      setFile(e.target.files[0])
      
      
      
    };

      
    function tests(){
      
      console.log("top")
      
      
      
    };


    const busdInWei = Moralis.Units.Token

 
    const saveObject = async () => {
     
        console.log(state)
        donate(state);
        
    };

    const saveNolaunched = async () => {
     
      let moralisFile = new Moralis.File(name, file);
      allMonster.set(state)
      allMonster.set("Photo", moralisFile) 
      allMonster.set("ethAddress",user.get("ethAddress") ) 
      allMonster.set("Launched",false)
      allMonster.save().then(
        (allMonster) => {
  
        count = count +1
        setState({
            ...state,
            idCount: count,
        })
          alert("New object created with objectId: " + allMonster.id);
  
        },
        (error) => {
         
          alert("Failed to create new object, with error code: " + error.message);
        }
      );
      
  };
   
    if(!isAuthenticated) {
    return (
    <>
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={8}>
        <Flex h={20} alignItems={'center'} justifyContent={'space-between'}>
       
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

  
    </Box>

    <Flex w="100%">
      <Sidebars setSelected={setSelectedTab} />
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

      </Box>

       <Flex w="100%" 
       >
       
       <Sidebars setSelected={setSelectedTab} />
       <Flex


        p={8} flex={1} align={'center'} justify={'center'}
        
       >
        <Box w='85%'>

       
        { selectedTab === 'Dashboard' && <div>Dashboard</div>}
        { selectedTab === 'Campaign' && 
        
        <SimpleGrid columns={3} spacing={50}>
      {/* <Slider {...settings}> */}
        { campq.map((elment , i) => (<Socardfund data={elment} datafund={fundq[i]}/>)) }
        {/* cam = [1 3 2]
        funq = [3 2 1] */}
      {/* </Slider> */}
        </SimpleGrid>}
        
        
        { selectedTab === 'AI' && <div>Settings</div>}
            
        </Box>
       </Flex>

     </Flex>

     <Footer></Footer>
   
     </>


        )

    }
    
}