import Countdown from 'react-countdown';

import Comments from '../components/Comment'

import { useRouter } from "next/router"
import React, { useEffect, useState,Component } from "react"
import ProgressBar from "@ramonak/react-progress-bar";
import SidebarUser from '../components/SidebarUser'
import dynamic from 'next/dynamic';
import 'suneditor/dist/css/suneditor.min.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { CommentSection} from 'react-comments-section'
// import 'react-comments-section/dist/index.css'
import parse from 'html-react-parser';
import {
    Box,
    chakra,
    Container,
    Textarea,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Spacer,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
    Divider,
    VisuallyHidden,
    List,
    ListItem,
    FormControl,
    FormLabel,
    Input,
    IconButton,
    FormHelperText,
    FormErrorMessage,
    useDisclosure
  } from '@chakra-ui/react';
  

  import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
  import { MdLocalShipping } from 'react-icons/md';
  import {
    HamburgerIcon,
    CloseIcon,
    TriangleUpIcon,
    TriangleDownIcon,
    ChevronDownIcon,
    ChevronRightIcon,
  } from '@chakra-ui/icons';
  
  import Head from "next/head"
  import { useMoralis , useWeb3ExecuteFunction } from "react-moralis"
  import Header from "../components/Header"
  import Socard from "../components/Socard"
  import Moralis from 'moralis'

  import Commentlist from "../components/Commentlist"
  import Headd from "../components/Headd";
  import Footer from "../components/Footer";
  import RequestComponent from "../components/RequestComponent";
import { FiCornerDownLeft } from 'react-icons/fi';



  const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
  });
  
  export default function Users(test, users) {

  const {isAuthenticated, authenticate, user, logout, isLoggingOut, Moralis,isInitialized} = useMoralis()
  const contractProcessor = useWeb3ExecuteFunction();
  const parse = require('html-react-parser');

  const [selectedTab, setSelectedTab] = useState('Story')
  
  var [tmpstate, setTmpstate] = useState();
  var [dateiso, setDateiso] = useState(new Date());
  var [totalvote, setTotalvote] = useState([[]]);
  var [votetrue, setVotetrue] = useState();
  var [votefalse, setVotefalse] = useState();
  var [votebool, setVotebool] = useState();
  var [fifth, setFifth] = useState([]);
  var [fourth, setFourth] = useState([]);
  var [third, setThird] = useState([]);
  var [second, setSecond] = useState([]);
  var [length, setLength] = useState();
  const router = useRouter()
  let [fund, setFund] = React.useState({
    idCount: 0,
    Fund: null,
    
  });

  let [commentreq, setCommentreq] = React.useState([[]]);

  let [commentquery, setCommentquery] = React.useState([[]]);
  let [commentfund, setCommentfund] = React.useState({
    
    comValue: "",
    
  });
  React.useEffect(() => {
    
    if(isInitialized){

  
    (async () => {
        let results
        let results2
        let results3
        let results4
        let results10
        let results5
        let results6
        let response2
        let response10
        let response
        let rescomment
        let reqcomment
        let voteall
        let votetmp1
        let votetmp2
        let votetmptrue
        let votetmp4
        let votetmp5
        let votetmpfalse

        let tmp = router.query.id
        let convertStr = parseInt(tmp);
        // console.log(router.query, "router.query")
        // console.log(typeof convertStr)
       
        try {
            let query = new Moralis.Query("Campaign")
            let tmp2 = query.equalTo("idCount",convertStr);
            // results = await query.find();
            results = await tmp2.find();


            let query2 = new Moralis.Query("Fund")
            let tmp3 = query2.equalTo("idCount",convertStr);
            // results = await query.find();
            results2 = await tmp3.find();
            results3 = query2.equalTo("fundAddress",user.get("ethAddress"));
            response = await query2.find()

            let query3 = new Moralis.Query("Comment")
            let tmp4 = query3.equalTo("idCount",convertStr);
            // results = await query.find();
            rescomment = await tmp4.find();

            

            let query4 = new Moralis.Query("RequestFund")
            let tmp5 = query4.equalTo("idCount",convertStr);
            // results = await query.find();
            results4 = await tmp5.find();
            results10 = query4.equalTo("requestCount",results[0].attributes.requestCount);
            response10 = await query4.find()
            
            // console.log(response10)

            

            let query5 = new Moralis.Query("CommentRequest")
            let tmp6 = query5.equalTo("idCount",convertStr);
            // results = await query.find();
            reqcomment = await tmp6.find();
            
            
            
            let query6 = new Moralis.Query("Voting")
            let tmp7 = query6.equalTo("idCount",convertStr);
            results5 = await tmp7.find();
            query6.equalTo("voteCount",results[0].attributes.requestCount);
            voteall = await query6.find()  
            results6 = query6.equalTo("voteAddress",user.get("ethAddress"));
            response2 = await query6.find()


            let votequerytrue = new Moralis.Query('Voting');
            let votequeryfalse = new Moralis.Query('Voting');
            
            votequerytrue.equalTo("idCount", convertStr);  
            votetmp1 = await votequerytrue.find();
            votequerytrue.equalTo("voteCount",results[0].attributes.requestCount);
            votetmp2 = await votequerytrue.find()
            votequerytrue.equalTo("voteResult",true);
            votetmptrue = await votequerytrue.find()
        
            votequeryfalse.equalTo("idCount", convertStr);  
            votetmp4 = await votequeryfalse.find();
            votequeryfalse.equalTo("voteCount",results[0].attributes.requestCount);
            votetmp5 = await votequeryfalse.find()
            votequeryfalse.equalTo("voteResult",false);
            votetmpfalse = await votequeryfalse.find()

            
         } catch (error) {
                console.log(error);
               
        }
        

            // console.log(">>>>>>>>>>" + JSON.parse(JSON.stringify(results["0"])));
            var myJSON = JSON.stringify(results[0]);
            var pa = JSON.parse(myJSON)
            setDateiso(pa.endAt.iso)
            setSecond(pa);

            if(results2.length != 0 && response.length != 0){

              var myJSON2 = JSON.stringify(response[0]);
              var pa2 = JSON.parse(myJSON2)
              setThird(pa2)
            }

            if(results5.length != 0 && response2.length != 0){

              var myJSON6 = JSON.stringify(response2[0]);
              var pa6 = JSON.parse(myJSON6)
              setFifth(pa6)
            }
            // console.log(results)
            // console.log(pa)
           
            var myJSON3 = JSON.stringify(rescomment);
            var pa3 = JSON.parse(myJSON3)
            setCommentquery(pa3);

            if(response10.length != 0){
              var myJSON4 = JSON.stringify(response10[0]);
              var pa4 = JSON.parse(myJSON4)
              console.log(pa4)
              setFourth(pa4);
            }
            

            var myJSON5 = JSON.stringify(reqcomment);
            var pa5 = JSON.parse(myJSON5)
            setCommentreq(pa5);

           
            
            setTotalvote(voteall.length);
            setVotetrue(votetmptrue.length)
            setVotefalse(votetmpfalse.length)
            setLength(results2.length)
            
            setFund({
              ...fund,
              idCount: convertStr,
          })

        })();

      }
    }, [isInitialized]);

    let tm = second.endAt && second.endAt.iso
    let dateti = new Date(tm)
    let textdate = dateti.toString();


    async function fundCampaign(fund) {

      let busdInWei = Moralis.Units.Token(fund.Fund, "18")
      let convert = parseInt(busdInWei)
      let big = BigInt(convert)
      console.log(typeof big);
      let options = {
        contractAddress: "0x4cAbE6944176b1ed7cE6eDaD5e080f19f31B59d6",
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
  
        onSuccess: (tx) =>
        tx.wait().then((finalTx) => {

          Update(fund,second)
          Updatefund(fund,third)


          
        }),
      })
    };



    async function Update(fund,second){
      const MonsterCreature = Moralis.Object.extend('Campaign');
      const query = new Moralis.Query(MonsterCreature);
      query.equalTo("idCount", fund.idCount);  
      console.log(query)
      const monster = await query.first();
      monster.set("Funded", fund.Fund+second.Funded);
      monster.set("claimLeft", fund.Fund+second.Funded);
      monster.save().then(
        (monster) => {
          
          alert("New Campaign object are Updated: " + monster.id);


        },
        (error) => {
         
          alert("Failed to Update new Campaign object, with error code: " + error.message);
        }
      );;;
     
      
   } 

   async function Updatefund(fund,third){

    if(third.length != 0 ){
      const fundCreature = Moralis.Object.extend('Fund');
      const query = new Moralis.Query(fundCreature);
      query.equalTo("idCount", fund.idCount);  
      const monsters = await query.first();
      monsters.set("fundValue", fund.Fund+third.fundValue);
      monsters.save().then(
        (monsters) => {
         
          alert("New Fund object are Updated: " + monsters.id);
         
        },
        (error) => {
         
          alert("Failed to Update new Fund object, with error code: " + error.message);
        }
      )
      
 
    }else{
      let fun = new Moralis.Object.extend('Fund')
      let fundcampaign = new fun();

      fundcampaign.set("idCount", fund.idCount) 
      fundcampaign.set("fundAddress",user.get("ethAddress") ) 
      fundcampaign.set("fundValue",fund.Fund)
      fundcampaign.set("fundAt",new Date())
    
      fundcampaign.save().then(
        (fundcampaign) => {
   
          alert("New object created with objectId: " + fundcampaign.id);
 
        },
        (error) => {
 
          alert("Failed to create new object, with error code: " + error.message);
        }
      );

    }
      
 } 


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
          _spender: "0x4cAbE6944176b1ed7cE6eDaD5e080f19f31B59d6",
          _value: busdInWei
        
        },
        
      }


      
      await Moralis.enableWeb3(); 
      await contractProcessor.fetch({
        params: options,
  
      
        onSuccess: (tx) =>
        tx.wait().then((finalTx) => {
          console.log(finalTx)
          fundCampaign(fund);
        }),


      });
    };


    const saveComment = async (second) => {
     
      let commentCreate = new Moralis.Object.extend('Comment')
      let allcomment = new commentCreate();
      
      allcomment.set(commentfund)
     
      allcomment.set("comAddress", user.get("ethAddress")) 
      allcomment.set("comName", user.get("username"))
      allcomment.set("idCount", second.idCount)
      allcomment.set("comParent", true) 
      allcomment.set("comChild", false)
      allcomment.set("like", 0)
      allcomment.set("dislike", 0)
     
      allcomment.save().then(
        (allcomment) => {
         
          allcomment.set("comId", allcomment.id) 
          allcomment.save()
          alert("New object created with objectId: " + allcomment.id);
          


        },
        (error) => {
          
          alert("Failed to create new object, with error code: " + error.message);
        }
      );
      
  };

    function handleChange(event) {
      const value = event.target.value;
      setFund({
          ...fund,
          [event.target.name]: +event.target.value,
      })
      ;
      }

    function handleChangeText(event) {
      const value = event.target.value;
      setCommentfund({
          ...commentfund,
          [event.target.name]: event.target.value,
      })
      ;
      }


    function handleVoteFalse() {
      handleCheck(third,fourth,fifth,false);
     
      }

    
  
  const handleVoteTrue = () => {



      handleCheck(third,fourth,fifth,true);

  
  }

 

  const themeOptions = {
    COLORS: {
      highlight: '#fff',
      background: '#faf2c7'
    }
  };
      
  const labels = {
    label: 'Write your comment man:',
    placeholder: 'Remember, be nice!',
    submit: 'Submit'
  };

  const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 2
        }}
    />
  );
      

  const Completionist = () => <span>Expired !!!</span>;

  async function handleCheck(third,fourth,fifth,check)  {
    
    if(third.length != 0 ){
      if(fifth.length != 0 ){
        alert("Failed to vote, you have already voting");
      }
      else{
        let VoteCreate = new Moralis.Object.extend('Voting')
        let votingcreate = new VoteCreate();

        const fundCreature = Moralis.Object.extend('RequestFund');
        const query = new Moralis.Query(fundCreature);
        query.equalTo("idCount", third.idCount);  
        const monsters = await query.find();
        query.equalTo("requestCount",fourth.requestCount);
        const updatevote = await query.first()

      
        let options = {
          contractAddress: "0x4cAbE6944176b1ed7cE6eDaD5e080f19f31B59d6",
          functionName: "voting",
          abi: [
            {"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"uint256","name":"_requestcount","type":"uint256"},{"internalType":"bool","name":"_check","type":"bool"}],"name":"voting","outputs":[],"stateMutability":"nonpayable","type":"function"}
          ],
          params: {
            _id: third.idCount,
            _requestcount: fourth.requestCount,
            _check : check
    
          },
          
        }


        
        await Moralis.enableWeb3(); 
        await contractProcessor.fetch({
          params: options,
    
          onSuccess: (tx) =>
          tx.wait().then((finalTx) => {
            

            // console.log(updatevote)

            votingcreate.set("idCount",third.idCount)
            votingcreate.set("voteAddress",user.get("ethAddress"))
            votingcreate.set("voteCount",fourth.requestCount)
            votingcreate.set("voteResult",check)
            setSelectedTab('Request')
            
            // console.log(check)
            votingcreate.save().then(
              (votingcreate) => {

              updatevote.set("curVote", fourth.curVote + 1 );
              updatevote.save().then(
              (updatevote) => {

                // alert("New RequestFund object are Updated: " + updatevote.id);
                
                if(!alert('Alert For your User!')){window.location.reload();}
                
  
              },
              (error) => {
               
                alert("Failed to Update new Fund object, with error code: " + error.message);
              }
            );;
     
              },
              (error) => {
               
                alert("Failed to create new object, with error code: " + error.message);
              }
            );

          }),
        });


      }
    }
    else{
      alert("Failed to vote, you don't have permission");
    }
    
    ;
    }
    let checkpass

  
    let probtrue = (votetrue/totalvote)*100
    let probfalse = (votefalse/totalvote)*100
      
    
    if (probtrue > probfalse){
      checkpass = <Heading
      
      lineHeight={1.1}
      fontWeight={600}
      color="green"
      mt='3'
      fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
     >
  
    
    Approve
    </Heading>
    
    }
    else{
      if (probtrue <= probfalse){

      
        checkpass = <Heading
        
        lineHeight={1.1}
        fontWeight={600}
        color="red"
        mt='3'
        fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
        
      >
      
      Not Approve
      </Heading>
   
      } else{
        checkpass = <Heading
        
        lineHeight={1.1}
        fontWeight={600}
        color="red"
        mt='3'
        fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
        
      >
      
      Not Approve
      </Heading>
      }
    }


    console.log('<<<<<<<<<<<',second.claimLeft)



    let noempty
    let testemp
    if(fourth.length != 0){
      noempty = <><Flex  direction="row" border="3px solid">

      <Box  display='flex' flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p='2%'
          w='40%'
          ml='50'>
      <Heading
      
          lineHeight={1.1}
          fontWeight={700}
          fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
         
        {totalvote}/{length} 
        </Heading>

        <Heading
      
          lineHeight={1.1}
          fontWeight={600}
          mt='2'
          fontSize={{ base: '2xl', sm: '2xl', lg: '1xl' }}>
         Vote Yes : {votetrue}
        
        </Heading>

        <Heading
      
          lineHeight={1.1}
          fontWeight={600}
          mt='2'
          fontSize={{ base: '2xl', sm: '2xl', lg: '1xl' }}>
         Vote No : {votefalse}
        
        </Heading>

        
        </Box>
        <Spacer></Spacer>

        <Box  display='flex' flexDirection="column"
            justifyContent="center"
            alignItems="center"
            w='100%'
            p='2%'
            ml='75'>
              <Heading
      
                lineHeight={1.1}
                fontWeight={700}
                fontSize={{ base: '2xl', sm: '2xl', lg: '3xl' }}>
               Current Status
              
              </Heading>
           
            {checkpass}
          
            </Box>




        <Spacer></Spacer>
        
        <Box  display='flex' flexDirection="column"
            justifyContent="center"
            alignItems="flex-end"
            w='100%'
            p='2%'
            mr='25'>
          
        <Heading
        
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '2xl' }}>
            
              
              Round : {fourth.requestCount}
              </Heading>

        <Heading
        
        lineHeight={1.1}
        fontWeight={600}
        fontSize={{ base: '2xl', sm: '4xl', lg: '2xl' }}
        mt='5'>
        
      Request amount : {fourth.requestAmount} TST
      
      </Heading>
                
        <Heading
        
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '2xl' }}
                mt='5'>
            
            Remaining Time : <Countdown date={fourth.endDate.iso} />
            
             
              </Heading>

        </Box>
      
        </Flex>

        <Box mt='5'>
        <ProgressBar completed={(fourth.requestAmount/second.claimLeft)*100} maxCompleted={100}/>
        </Box>


      <Stack direction="column"  mt={1} mb={10} 
      >
       {/* { fourth.map((element, i) => (<RequestComponent fourth={element} />)) } */}

       {fourth.requestDes && parse(fourth.requestDes)}

       <Box display='flex' flexDirection="row"
          justifyContent="center"
          alignItems="center" >

       <Button
        variant="solid"
        size="md"
        w='100%'
        backgroundColor="green"
        mt={3}
        overflow="visible"
        boxShadow={10}
        border={10}
        color='white'
        borderRadius={5}
        onClick={() => handleVoteTrue()}
      >
        Approve
      </Button>

      
       <Button
        variant="solid"
        size="md"
        w='100%'
        backgroundColor="red"
        mt={3}
        ml={3}
        overflow="visible"
        boxShadow={10}
        border={10}
        borderRadius={5}
        color='white'
        onClick={() => handleVoteFalse()}
      >
        Not Approve
      </Button>

      </Box>

       </Stack>

       <Box
      pl={3}
      pr={3}
      pt={5}
      pb={5}
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      alignItems="flex-end"
    >

       <Textarea  border="3px solid" h="150px" backgroundColor="whiteAlpha.900"  name='comValue' type='text'  onChange={handleChangeText} />
       <Button
        variant="solid"
        size="md"
        backgroundColor="##99d4d0"
        mt={3}
        overflow="visible"
        boxShadow={10}
        border={10}
        borderRadius={5}
        onClick={() => saveComment(fund)}
      >
        Comment
      </Button>
      </Box>
      </>
    }else{

      noempty = <Box>No request here</Box>
      
      
    }

    let enddate = second.endAt && second.endAt.iso
    const total = Date.parse(enddate) - Date.parse(new Date());
    let days = Math.floor( total/(1000*60*60*24) );
    const hours = Math.floor( (total/(1000*60*60)) % 24 );
    const minutes = Math.floor( (total/1000/60) % 60 );
    console.log(days)
    

    return (
        <>
        <Headd>

        </Headd>

      <Container maxW={'7xl'}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 10 }}>
          <Flex>
            <Image
              rounded={'md'}
              alt={'product image'}
              src={
                second.Photo && second.Photo.url
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
               
                <Text fontSize={'lg'}>
                {second.Tagline}
                </Text>
                  
              </VStack>
              
              <Stack align={'end'}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '2xl' }}>
            
              
              {second.Funded} TST / {second.goal} TST
              </Heading>

              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '2xl' }}>
            
              
            Remaining Time : {days} Day {hours} Hours {minutes} Minutes

            {/* <Countdown date={dateiso}><Completionist/></Countdown>  */}
              </Heading>
          
               </Stack>
              <ProgressBar completed={second.Funded/second.goal*100} maxCompleted={100}/>
              <Box>
              {/* <FormLabel htmlFor='Fund'>Fund</FormLabel> */}
              <Input size='lg' name='Fund' type='int' value={fund.Fund}
              onChange={handleChange}/>
              </Box>
              
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
  
           
          </Stack>
        </SimpleGrid>
        
        
            
      
      </Container>
      
      {/* <Divider size='lg' color='black' variant='solid'  /> */}
      <ColoredLine color="black" />
      < Box  display="flex"

               
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        width="100%"
        ml='312px'    >
      <SidebarUser setSelected={setSelectedTab} />
      </Box>
      <ColoredLine color="black" />

     <Container maxW={'7xl'}  p='3%' boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.5)"
       >
     
     { selectedTab === 'Story' && 

     <Stack direction="column"  mt={10} mb={10} 
     >
        {second.Story && parse(second.Story)}
     
        </Stack>

    }

    { selectedTab === 'Comment' && 
     

    <Container  maxW={'full'}>
     
    <Box
        pl={3}
        pr={3}
        pt={5}
        pb={5}
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Textarea border="3px solid" h="150px" backgroundColor="whiteAlpha.900"  name='comValue' type='text'  onChange={handleChangeText} />
        <Button
          variant="solid"
          size="md"
          backgroundColor="##99d4d0"
          mt={3}
          overflow="visible"
          boxShadow={10}
          border={10}
          borderRadius={5}
          onClick={() => saveComment(fund)}
        >
          Comment
        </Button>
      </Box>

      { commentquery.map((elment, i) => (<Commentlist data={elment} />)) }
      
  </Container>

    }

  { selectedTab === 'Update' && <div>Update</div>}
  { selectedTab === 'Request' && <>{noempty}</>
 
  }
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