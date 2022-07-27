// import Image from 'next/image';

import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Avatar,
    useColorModeValue,
    useDisclosure,
    Image,
    FormLabel,
    Input,
    Button,
    VStack,
    Textarea
  } from '@chakra-ui/react';

  // import {
  //   Modal,
  //   ModalOverlay,
  //   ModalContent,
  //   ModalHeader,
  //   ModalFooter,
  //   ModalBody,
  //   ModalCloseButton,
  // } from "@chakra-ui/modal";

  import ReactDOM from 'react-dom';
  import Modal from 'react-modal';
  import dynamic from 'next/dynamic';
  
  import ProgressBar from "@ramonak/react-progress-bar";
  import React, { Component,useState  } from "react";
  import Slider from "react-slick";
  import { useRouter } from 'next/router'
  import Moralis from 'moralis'
  import { useMoralis , useWeb3ExecuteFunction } from "react-moralis"
import Create from '../pages/create';
import { donated } from '../services/donate'

//   import {tests} from "../pages/create"

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});



  export default function SocardCreate({ data, donatedd , saveRequest ,claimrequest }) {
    let {isAuthenticated, authenticate,user, logout, account,isLoggingOut,isInitialized,} = useMoralis()
    const contractProcessor = useWeb3ExecuteFunction();
    let [tmpdata, setTmpdata] = React.useState(false)
    let [req, setReq] = React.useState({
      idCount: 0,
      requestDes: '',
      requestAmount: 0,
      requestCount: 0,
      curVote:0,
      status: false,  
    });

    console.log(req)
 
    async function donateCreate(state) {

        let busdInWei = Moralis.Units.Token(state.goal, "18")
        let startdate = parseInt(new Date().getTime() / 1000 + 100)
        let enddate = parseInt(new Date(state.endAt).getTime() / 1000)
        console.log(typeof busdInWei)
        let options = {
          contractAddress: "0x113EEe540D8AB6a3902711CeE75cBDCD6a29810C",
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
        
      
     
         
  
        
            console.log('else')
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
             
  
            });
        
      
    };
    
      
    
    const router = useRouter()
  
    const handleClick = (id) => {
      router.push({
        pathname: '/users',
        query: {
          id
        }
      })
    }

    function handleChange(event) {
      const value = event.target.value;
      setReq({
          ...req,
          [event.target.name]: +event.target.value,
      })
      ;
      }
  
  
      function handleChangeText(event) {
        const value = event.target.value;
        setReq({
            ...req,
            [event.target.name]: event.target.value,
        })
        ;
        
        }

      function handleQuillEdit(value){
        setReq((prev) => {
          return {
            ...prev,
            requestDes: value
          }
        })
  
      }


    const handleETH = (id) => {
        // console.log(id)
        console.log(tmpdata)
      }
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   
      
    const { isOpen, onOpen, onClose } = useDisclosure()

    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      },
    };
    
    // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
    Modal.setAppElement("#__next")
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
    let button;
    let check = false;
    if (data.Launched == true) {
        // if (tmpdata == false){
        //     setTmpdata(true)
            
        // }
        

        button = <Box display="flex"

               
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        width='100%'

        >
          <Button
            
        mt={4}
        colorScheme='teal'
        
        type='submit'
        onClick={()=>claimrequest(data)}
        width='100%'
        >
        Claim
      </Button>

      <Button
            
        mt={4}
        colorScheme='teal'
        
        type='submit'
        onClick={()=>donateCreate(data)}
        width='100%'
        ml='5px'
        >
        Update
      </Button>

      <Button
        
        mt={4}
        colorScheme='teal'
      
        onClick={openModal}
        
        
        width='100%'
        ml='5px'
        >
        Request
      </Button>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Box flexDirection="column"
                justifyContent="center"
                alignItems="flex-end"
                ml='20px'>

       
                          
                     
        <SunEditor name='requestDes' value={req.requestDes}
          onChange={handleQuillEdit}  setOptions={{
          height: '500px',
          maxHeight: '330px',
          maxWidth : '1400px',
          value: '.',
          
          buttonList: [
            [
              "formatBlock",
              "font",
              "fontSize",
              "fontColor",
              "align",
              "paragraphStyle",
              "blockquote"
            ],
            [
              "bold",
              "underline",
              "italic",
              "strike",
              "subscript",
              "superscript"
            ],
            ["removeFormat"],
            ["outdent", "indent"],
            ["table", "list"],
            ["link", "image", "video"]
          ]
        }}/>
        <Box display="flex"

               
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
         
          >
          <FormLabel htmlFor='requestAmount'>Request amount left : {data.claimLeft} TST</FormLabel>

          <Input size='lg' name='requestAmount' type='Number' 
          onChange={handleChange}
           />
          </Box>
        <Button
            
            mt={4}
            colorScheme='teal'
            
            type='submit'
            onClick={()=>saveRequest(data,req)}
            width='100%'
            >
            Request
          </Button>
        </Box>
      </Modal>
     
     
      </Box> 

      } else {
        button = <Button
            
        mt={4}
        colorScheme='teal'
        
        type='submit'
        onClick={()=>donatedd(data)}
        width='100%'
        >
        Deploy
      </Button>
      }


      const saveObjects = async (data) => {
     
      
        donateCreate(data);
        
    };
      
      return(
        
        
        // <div>
        //   <button onClick={()=>handleClick(data.Email)} style={{ backgroundColor: 'gray' , padding: '5px' , borderRadius: '5px' }} >{data.Email}</button>
        //   {/* <div> {data.Email} </div> */}
        // </div>
        
        
        <Center py={6}>
        <Box
          w={'400px'}
          // w={'full'}
          h={'540px'}
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
          
          {/* <Stack mt={2} direction={'row'} spacing={4} align={'center'}>
           
            <Stack direction={'column'} spacing={0} fontSize={'sm'}>
              <Text fontWeight={600}>Achim Rolle</Text>
              <Text color={'gray.500'}>Feb 08, 2021 · 6min read</Text>
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
  
  