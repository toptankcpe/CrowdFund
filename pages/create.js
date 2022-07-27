Moralis.initialize('Z8FXeX1VJPU6jsG2GkiHwn6nBjpPGr5NjoWXF6db')
Moralis.serverURL = 'https://l3csqx0gioxx.usemoralis.com:2053/server'

import dynamic from 'next/dynamic';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'suneditor/dist/css/suneditor.min.css';
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'



import { Flex, Text, IconButton, Box, useColorModeValue,HStack,Heading,Stack,Button, Link,FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Textarea,
    Image,
    VStack,
    StackDivider,
    Grid,
    Container,
    SimpleGrid,
    Select} from '@chakra-ui/react'
import { useMoralis , useWeb3ExecuteFunction } from "react-moralis"
import { FiCornerDownLeft, FiMenu } from 'react-icons/fi'
import Moralis from 'moralis'
import React, { useEffect, useState } from "react";
import { useRouter  } from 'next/router'
import SocardCreate from "../components/SocardCreate"
import Socardfund from "../components/Socardfund"
import SidebarRedeem from "../components/SidebarRedeem"
import SidebarCampaign from "../components/SidebarCampaign"
import Souvenir from "../components/Souvenir"
import Headd from "../components/Headd"
import SocardBadge from "../components/SocardBadge"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";



const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});



export default function Create() {
    let {isAuthenticated, authenticate,user, logout, account,isLoggingOut,isInitialized,} = useMoralis()
    const contractProcessor = useWeb3ExecuteFunction();
  
    let MonsterCreat = new Moralis.Object.extend('Campaign')
    let allMonster = new MonsterCreat();
    var [count, setCount] = useState(0);
    var [check, setCheck] = useState(false);
    var [name, setName] = useState();
    var [file, setFile] = useState();
    var [data, setData] = useState([[]]);
    var [badge, setBadge] = useState([[]]);
    var [checkbadge, setCheckbadge] = useState([]);

    var [fundq, setFundq] = useState([[]]);
    var [campq, setCampq] = useState([[]]);

    var [note, setNote] = useState('');
    var [notes, setNotes] = useState([]);
    
    let [state, setState] = React.useState({
      idCount: 0,
      Email: "top@hotmail.com",
      CampaignName: "",
      Tagline: "",
      Story: "",
      Group: "",
      Country: "",
      Reward: "",
      requestCount: 0,
      claimLeft:0,
      goal: null,
      startAt: new Date(),
      endAt:  new Date()
    });


    let [textgen, setTextgen] = React.useState({
      Title: "",
      Keyword: "",
      MinLength: 50,
      MaxLength: 768,
      NumSequences: 1,
      Temperature: 0.9,
    });

   
    const router = useRouter()

    React.useEffect(() => {

      
     if(isInitialized){
      (async () => {
          let results;
          let responsecamp;
          let tmp;
          let resultsfund
          let arr = []
          let arrs = []
          let resultsbadge
          let resultsbadge1
         
          let use = user.get("ethAddress")
        
          
          try {
              let query = new Moralis.Query("Campaign");
              results = await query.find();
              query.withCount();
              let response = await query.find();
              tmp = response.count + 1
            
              let tmp2 = query.equalTo("ethAddress",use);
              results = await tmp2.find();

              let querybadge = new Moralis.Query("Badge");
              let tmpbadge = querybadge.equalTo("badgeAddress",use);
              resultsbadge = await tmpbadge.find();
              let tmpbadge1 = querybadge.equalTo("usedBadge",true);
              resultsbadge1 = await tmpbadge1.first();

              
              let queryfund = new Moralis.Query("Fund");
              let querycamp = new Moralis.Query("Campaign");
              
            
              let tmpfund = queryfund.equalTo("fundAddress",use);
              resultsfund = await tmpfund.find();
              
              var myJSONfund = JSON.stringify(resultsfund);
              var pafund = JSON.parse(myJSONfund)

              for (let i = 0; i < pafund.length; i++) {
                arr.push(pafund[i].idCount)
                
                let tmp3 = querycamp.equalTo("idCount",pafund[i].idCount);
                responsecamp = await tmp3.find();

                arrs.push(responsecamp[0])
              }

              var myJSON2 = JSON.stringify(arrs);
              var pa2 = JSON.parse(myJSON2)

         
              var myJSON3 = JSON.stringify(resultsbadge);
              var pa3 = JSON.parse(myJSON3)

              var myJSON4 = JSON.stringify(resultsbadge1);
              var pa4 = JSON.parse(myJSON4)
        
              
           } catch (error) {
                  console.log(error);
                 
          }

          var myJSON = JSON.stringify(results.results);
          var pa = JSON.parse(myJSON)

          for (let i = 0; i < pa.length; i++) {
            if(pa[i].Launched == true){
              setCheck(true) 
              break;
            }
          }



          setBadge(pa3)
          setCheckbadge(pa4)
          setFundq(pafund)
          setCampq(pa2)
        
         
          setData(pa)
          setCount(tmp)
          setState({
            ...state,
            idCount: tmp,
        })    
          
          })();
        }
      }, [isInitialized]);


    async function donateOld(state) {

      let busdInWei = Moralis.Units.Token(state.goal, "18")
      let dateinit = new Date()
      let startdate = parseInt(dateinit.getTime() / 1000 + 60)
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
      
        if(check == true){
          alert("You have already launched campaign");
          
        }

        else {
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
                     
              let moralisFile = new Moralis.File(name, file);
              allMonster.set(state)
              allMonster.set("startAt",dateinit)
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
                setSelectedTab('Campaign')
                if(!alert('Create Campaign Complete')){window.location.reload();}
                    
                },
                (error) => {
                
                  alert("Failed to create new object, with error code: " + error.message);
                }
              );
              
            }),

          });
      }
    
  };

  async function donatedd (data){
 
    let MonsterCreat = new Moralis.Object.extend('Campaign')
    let allMonster = new MonsterCreat();

        let busdInWei = Moralis.Units.Token(data.goal, "18")
        let startdate = parseInt(new Date().getTime() / 1000 + 60)
        let enddate = parseInt(new Date(data.endAt.iso).getTime() / 1000)
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
            _id: data.idCount
          
          },
          
        };
        
          if(check == true){
            alert("You have already launched campaign");
            
          }
  
          else {
            console.log(options)
            await Moralis.enableWeb3(); 
            await contractProcessor.fetch({
              params: options,
              onSuccess: (tx) =>
              tx.wait().then((finalTx) => {    
                Updated(data)
              }),
  
            });
        }
      
    
}

async function Updated(data){
    const MonsterCreature = Moralis.Object.extend('Campaign');
    const query = new Moralis.Query(MonsterCreature);
    query.equalTo("idCount", data.idCount);  
    const monster = await query.first();
    monster.set("Launched", true);
    monster.set("startAt", new Date);
    monster.save().then(
        (monster) => {
         
          setSelectedTab('Campaign')
          if(!alert('Create Campaign] Complete')){window.location.reload();}

        },
        (error) => {
         
          alert("Failed to create new object, with error code: " + error.message);
        }
      );;
    
 } 


    const [selectedTab, setSelectedTab] = useState('Create')
    const [selectedTab1, setSelectedTab1] = useState('Token')
    const [selectedTab2, setSelectedTab2] = useState('My Raise Campaign')
  
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

    function handleChangeTextgenNum(event) {
      const value = event.target.value;
      setTextgen({
          ...textgen,
          [event.target.name]: +event.target.value,
      })
      ;
      }
  
    function handleChangeTextgenText(event) {
      const value = event.target.value;
      setTextgen({
          ...textgen,
          [event.target.name]: event.target.value,
      })
      ;
      }

 
    async function handleSubmitTextgen(textgen) {
      const res = await fetch('https://bb08-34-87-141-183.ngrok.io/predict-reviews', {
        // mode:'no-cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
          
        },
        body: JSON.stringify(
          textgen
        
        )
      })
      const json = await res.json();
      console.log(json)
      setNotes(json)
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

      setName(e.target.files[0].name)
      setFile(e.target.files[0])

    };

    const saveObject = async () => { 
      await donateOld(state)
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

  async function claimrequest(data) {

  
    let curdate = new Date()
    const requestCreature = Moralis.Object.extend('RequestFund');
    const requestquery = new Moralis.Query(requestCreature);
    requestquery.equalTo("idCount", data.idCount);  
    const requesttmp1 = await requestquery.find();
    requestquery.equalTo("requestCount",data.requestCount);
    const requesttmp2 = await requestquery.find()
    const requesttmp3 = await requestquery.first()
 

    let query2 = new Moralis.Query("Fund")
    let tmp3 = query2.equalTo("idCount",data.idCount);
            // results = await query.find();
    let results2 = await tmp3.find();


    const voteCreature = Moralis.Object.extend('Voting');
    const votequerytrue = new Moralis.Query(voteCreature);
    const votequeryfalse = new Moralis.Query(voteCreature);
    votequerytrue.equalTo("idCount", data.idCount);  
    const votetmp1 = await votequerytrue.find();
    votequerytrue.equalTo("voteCount",data.requestCount);
    const votetmp2 = await votequerytrue.find()
    votequerytrue.equalTo("voteResult",true);
    const votetmptrue = await votequerytrue.find()

    
    votequeryfalse.equalTo("idCount", data.idCount);  
    const votetmp4 = await votequeryfalse.find();
    votequeryfalse.equalTo("voteCount",data.requestCount);
    const votetmp5 = await votequeryfalse.find()
    votequeryfalse.equalTo("voteResult",false);
    const votetmpfalse = await votequeryfalse.find()

 
    if(requesttmp2.length != 0){

      if(requesttmp2[0].attributes.Claimed == false){

        if(curdate >= (requesttmp2.endDate && requesttmp2.endDate.iso) ){

          let probtrue = (votetmptrue.length/results2.length)*100
          let probfalse = (votetmpfalse.length/results2.length)*100
          if (probtrue > probfalse){
            let options = {
            contractAddress: "0x4cAbE6944176b1ed7cE6eDaD5e080f19f31B59d6",
          
            functionName: "claim",
            abi: [
              {"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"uint256","name":"_requestcount","type":"uint256"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"}
            ],
            params: {
              _id: data.idCount,
              _requestcount: data.requestCount,

         
            },
            
          };
          
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
                  

                  requesttmp3.set('Claimed',true)
                  requesttmp3.save().then(
                    (requesttmp3) => {
                     
                    
                      alert("New object created with objectId: " + requesttmp3.id);
                    },
                    (error) => {
                  
                      alert("Failed to create new object, with error code: " + error.message);
                    }
                  );
                  
                }),

              })


        }else{
          if(probtrue <= probfalse){
            alert("request not approve");
          }
        }

    }else{
      if(votetmp2.length == results2.length){
        let probtrue = (votetmptrue.length/results2.length)*100
        let probfalse = (votetmpfalse.length/results2.length)*100
        if (probtrue > probfalse){
          let options = {
          contractAddress: "0x4cAbE6944176b1ed7cE6eDaD5e080f19f31B59d6",
        
          functionName: "claim",
          abi: [
            {"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"uint256","name":"_requestcount","type":"uint256"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"}
          ],
          params: {
            _id: data.idCount,
            _requestcount: data.requestCount,

          
          },
          
        };
        
            await Moralis.enableWeb3(); 
            await contractProcessor.fetch({
              params: options,
        
              onSuccess: (tx) =>
              tx.wait().then((finalTx) => {
                

                requesttmp3.set('Claimed',true)
                requesttmp3.save().then(
                  (requesttmp3) => {
                   
                    alert("New object created with objectId: " + requesttmp3.id);
                  },
                  (error) => {
                   
                    alert("Failed to create new object, with error code: " + error.message);
                  }
                );
                
              }),

            })
      

        }else{
          if(probtrue <= probfalse){
            alert("request not approve");
          }
        }
 
      }else{
        alert("Your previous request not expire or not complete");
      }

    }

   } else{
      alert("You already claim this request please create a new one");
    }
  
  }else{
    alert("Please create request form first");
  }
};

//////////////////////////////////////////////////////


  const saveRequest = async (data, req) => {

    
    const camCreature = Moralis.Object.extend('Campaign');
    const query = new Moralis.Query(camCreature);
    query.equalTo("idCount", data.idCount);  
    const camp = await query.first();


    const requestCreature = Moralis.Object.extend('RequestFund');
    const requestquery = new Moralis.Query(requestCreature);
    requestquery.equalTo("idCount", data.idCount);  
    const requesttmp1 = await requestquery.find();
    requestquery.equalTo("requestCount",data.requestCount);
    const requesttmp2 = await requestquery.find()
    console.log(requesttmp2.length)

    const voteCreature = Moralis.Object.extend('Voting');
    const votequerytrue = new Moralis.Query(voteCreature);
    const votequeryfalse = new Moralis.Query(voteCreature);
    
    votequerytrue.equalTo("idCount", data.idCount);  
    const votetmp1 = await votequerytrue.find();
    votequerytrue.equalTo("voteCount",data.requestCount);
    const votetmp2 = await votequerytrue.find()
    votequerytrue.equalTo("voteResult",true);
    const votetmptrue = await votequerytrue.find()

    votequeryfalse.equalTo("idCount", data.idCount);  
    const votetmp4 = await votequeryfalse.find();
    votequeryfalse.equalTo("voteCount",data.requestCount);
    const votetmp5 = await votequeryfalse.find()
    votequeryfalse.equalTo("voteResult",false);
    const votetmpfalse = await votequeryfalse.find()
    
    
    
    //////////Total Fund Address/////////////
    let query2 = new Moralis.Query("Fund")
    let tmp3 = query2.equalTo("idCount",data.idCount);
            // results = await query.find();
    let results2 = await tmp3.find();

    let RequestCreate = new Moralis.Object.extend('RequestFund')
    let requestFund = new RequestCreate();
    let curdate = new Date()

      if(requesttmp2.length != 0 && requesttmp2[0].attributes.Claimed == false){

        if(curdate <= requesttmp2[0].attributes.endDate ){

          if(votetmp2.length == results2.length){

            let probtrue = (votetmptrue.length/results2.length)*100
            let probfalse = (votetmpfalse.length/results2.length)*100
              
              if (probtrue > probfalse){
                alert("Your previous request has been approve : please claim your token first before create a new one");
              } else{

                if (probtrue <= probfalse){
                  if(data.claimLeft >= req.requestAmount && req.requestAmount != 0 ){

                    const date = new Date();
                    date.setDate(date.getDate() + 3);
        
                    let busdInWei = Moralis.Units.Token(req.requestAmount, "18")
                    let startdate = parseInt(new Date().getTime() / 1000 )
                    let enddate = parseInt(date.getTime() / 1000)
      
                  
                    let options = {
                      contractAddress: "0x4cAbE6944176b1ed7cE6eDaD5e080f19f31B59d6",
                      functionName: "requestfund",
                      abi: [
                        {"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint32","name":"_startAt","type":"uint32"},{"internalType":"uint32","name":"_endAt","type":"uint32"},{"internalType":"uint32","name":"_id","type":"uint32"},{"internalType":"uint32","name":"_requestcount","type":"uint32"}],"name":"requestfund","outputs":[],"stateMutability":"nonpayable","type":"function"}
                      ],
                      params: {
                        _amount : busdInWei,
                        _startAt: startdate,
                        _endAt: enddate,
                        _id: data.idCount,
                        _requestcount: data.requestCount + 1 ,

                      },
                      
                    };
                    
     
                        await Moralis.enableWeb3(); 
                        await contractProcessor.fetch({
                          params: options,
                    
                       
                          onSuccess: (tx) =>
                          tx.wait().then((finalTx) => {    
                            req.idCount = data.idCount
                            req.requestCount = data.requestCount + 1 
                            requestFund.set(req)
                            requestFund.set("requestAddress",user.get("ethAddress"))
                            requestFund.set("startDate",new Date)
                            requestFund.set("endDate",date)
                            console.log(req)
                            
                            requestFund.save().then(
                              (requestFund) => {
                                
                          
                                alert("New object created with objectId: " + requestFund.id);
                  
                                camp.set("requestCount", req.requestCount);
                                camp.set("claimLeft", data.claimLeft - req.requestAmount);
                                camp.save().then(
                                    (camp) => {
                                     
                       
                                      alert("New object Update with objectId: " + camp.id);
        
                                    },
                                    (error) => {
                                     
                                      alert("Failed to create new object, with error code: " + error.message);
                                    }
                                  );
                 
                              },
                              (error) => {
                               
                                alert("Failed to create new object, with error code: " + error.message);
                              }
                            );
                          }),
              
                        });

                      }
                    else{
                      alert("Request amount is more than Claim amount left");
                    }
                }
              }

        }else{
          alert("Request not expire or not complete");
        }

      }else{

        
        let probtrue = (votetmptrue.length/results2.length)*100
        let probfalse = (votetmpfalse.length/results2.length)*100
        
        if (probtrue > probfalse){
          alert("Your previous request has been approve : please claim your token first before create a new one");
        } else{

          if(probtrue <= probfalse){
            if(data.claimLeft >= req.requestAmount){
              
              const date = new Date();
              date.setDate(date.getDate() + 3);

              let busdInWei = Moralis.Units.Token(data.goal, "18")
              let startdate = parseInt(new Date().getTime() / 1000 )
              let enddate = parseInt(date.getTime() / 1000)
             
              let options = {
                contractAddress: "0x4cAbE6944176b1ed7cE6eDaD5e080f19f31B59d6",
                functionName: "requestfund",
                abi: [
                  {"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint32","name":"_startAt","type":"uint32"},{"internalType":"uint32","name":"_endAt","type":"uint32"},{"internalType":"uint32","name":"_id","type":"uint32"},{"internalType":"uint32","name":"_requestcount","type":"uint32"}],"name":"requestfund","outputs":[],"stateMutability":"nonpayable","type":"function"}
                ],
                params: {
                  _amount : req.requestAmount,
                  _startAt: startdate,
                  _endAt: enddate,
                  _id: data.idCount,
                  _requestcount: data.requestCount + 1 ,

        
                },
                
              };
              

              await Moralis.enableWeb3(); 
              await contractProcessor.fetch({
                params: options,
          
              
                onSuccess: (tx) =>
                tx.wait().then((finalTx) => {    
                  req.idCount = data.idCount
                  req.requestCount = data.requestCount + 1 
                  requestFund.set(req)
                  requestFund.set("requestAddress",user.get("ethAddress"))
                  requestFund.set("startDate",new Date)
                  requestFund.set("endDate",date)
                  console.log(req)
                  
                  requestFund.save().then(
                    (requestFund) => {
                     
                  
                
                      alert("New object created with objectId: " + requestFund.id);

                      
                      camp.set("requestCount", req.requestCount);
                      camp.set("claimLeft", data.claimLeft - req.requestAmount);
                      camp.save().then(
                          (camp) => {
                
                            alert("New object Update with objectId: " + camp.id);
 
                          },
                          (error) => {
                           
                            alert("Failed to create new object, with error code: " + error.message);
                          }
                        );

                    },
                    (error) => {
                      
                      alert("Failed to create new object, with error code: " + error.message);
                    }
                  );
                }),
    
              });
              }
              else{
                alert("Request amount is more than Claim amount left");
              }
            }
          }
      }
    } 
      
    else{
      if(data.claimLeft >= req.requestAmount && req.requestAmount != 0 ){
      
        const date = new Date();
        date.setDate(date.getDate() + 3);

      
        let busdInWei = Moralis.Units.Token(req.requestAmount, "18")
        let startdate = parseInt(new Date().getTime() / 1000 )
        let enddate = parseInt(date.getTime() / 1000)
        
  
        let options = {
          contractAddress: "0x4cAbE6944176b1ed7cE6eDaD5e080f19f31B59d6",
          functionName: "requestfund",
          abi: [
            {"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint32","name":"_startAt","type":"uint32"},{"internalType":"uint32","name":"_endAt","type":"uint32"},{"internalType":"uint32","name":"_id","type":"uint32"},{"internalType":"uint32","name":"_requestcount","type":"uint32"}],"name":"requestfund","outputs":[],"stateMutability":"nonpayable","type":"function"}
          ],
          params: {
            _amount : busdInWei,
            _startAt: startdate,
            _endAt: enddate,
            _id: data.idCount,
            _requestcount: data.requestCount + 1 ,
 
          },
          
        };
        
    
            await Moralis.enableWeb3(); 
            await contractProcessor.fetch({
              params: options,
        
    
              onSuccess: (tx) =>
              tx.wait().then((finalTx) => {    
                req.idCount = data.idCount
                req.requestCount = data.requestCount + 1 
                requestFund.set(req)
                requestFund.set("requestAddress",user.get("ethAddress"))
                requestFund.set("startDate",new Date)
                requestFund.set("endDate",date)
                console.log(req)
                
                requestFund.save().then(
                  (requestFund) => {
                      
                    alert("New object created with objectId: " + requestFund.id);
      
                    
                    camp.set("requestCount", req.requestCount);
                    camp.set("claimLeft", data.claimLeft - req.requestAmount);
                    camp.save().then(
                        (camp) => {
                        
                          alert("New object Update with objectId: " + camp.id);
                          
                        },
                        (error) => {
                        
                          alert("Failed to create new object, with error code: " + error.message);
                        }
                      );
                  
                  },
                  (error) => {
                    
                    alert("Failed to create new object, with error code: " + error.message);
                  }
                );
              }),
      
            });
         
          }
        else{
          alert("Request amount is more than Claim amount left");
        } 
    }     
};

async function changeBadge (sendbadge){

  let querybadge = new Moralis.Query("Badge");
  let tmpbadge = querybadge.equalTo("badgeAddress",user.get("ethAddress"));  
  let resultsbadge = await tmpbadge.find();
  let tmpbadge1 = querybadge.equalTo("usedBadge",true);
  let resultsbadge1 = await tmpbadge1.first();

  let querybadgesend = new Moralis.Query("Badge");
  let tmpbadgesend = querybadgesend.equalTo("objectId",sendbadge.objectId);
  let resultsbadgesend = await tmpbadgesend.first();



  if(typeof resultsbadge1 !== 'undefined'){
   
  resultsbadge1.set("usedBadge", false);
  resultsbadge1.save().then(
      (resultsbadge1) => {
        
      
        resultsbadgesend.set("usedBadge", true)
        resultsbadgesend.save().then(
        (resultsbadge1) => {
          
          setSelectedTab('Badge')
          if(!alert("Success change: " + resultsbadgesend.id)){window.location.reload();}
          


        },
        (error) => {
        alert("Failed to create new object, with error code: " + error.message);
        }
      );;

      },
      (error) => {
       
        alert("Failed to create new object, with error code: " + error.message);
      }
    );;

  }else{
    resultsbadgesend.set("usedBadge", true)
    resultsbadgesend.save().then(
    (resultsbadge1) => {
    
      setSelectedTab('Badge')
      if(!alert("Success change: " + resultsbadgesend.id)){window.location.reload();}
      
    },
    (error) => {
      
      alert("Failed to create new object, with error code: " + error.message);
    }
  );;
  }
}


async function removeBadge (sendbadge){


  let querybadge = new Moralis.Query("Badge");
  let tmpbadge = querybadge.equalTo("badgeAddress",sendbadge.badgeAddress);  
  let resultsbadge = await tmpbadge.find();
  let tmpbadge1 = querybadge.equalTo("usedBadge",true);
  let resultsbadge1 = await tmpbadge1.first();


  resultsbadge1.set("usedBadge", false);
  resultsbadge1.save().then(
      (resultsbadge1) => {
        

        if(!alert("Success remove: " + resultsbadge1.id)){window.location.reload();}

        
      },
      (error) => {
        
        alert("Failed to create new object, with error code: " + error.message);
      }
    );;


}


  
const ColoredLine = ({ color }) => (
  <hr
      style={{
          color: color,
          backgroundColor: color,
          height: 5
      }}
  />
);

   
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
        <Headd></Headd>

       <Flex w="100%" 
       >
       
       <Sidebar setSelected={setSelectedTab} />
       <Flex
       
        //  pos="absolute"
        //  top="10%"
        //  bottom="20%"
        //  left="20%"
        //  right = "30%"
        //  transform="translate(-50%, -50%)"

        p={8} flex={1} align={'flex-start'} justify={'center'}
        
       >
        <Box w='85%'>
         {/* <Text>Click the
           <IconButton
             background="none"
             _hover={{ background: 'none' }}
             icon={<FiMenu />}
           />
         to resize the vertical navigation bar.</Text> */}
        { selectedTab === 'Create' && 

       
        
        <FormControl>
       
        
        <VStack
          divider={<StackDivider borderColor='gray.200' />}
          spacing={4}
          align='stretch'
        >
          
            {/* <FormLabel htmlFor='Email'>Email address</FormLabel>
            <Input size='lg' name='Email' type='text' value={state.Email}
            onChange={handleChangeText}/> */}
            {/* <FormHelperText>We'll never share your email.</FormHelperText> */}

            <FormLabel htmlFor='Campaign Name'>Campaign Name</FormLabel>
            <Input size='lg' name='CampaignName' type='text' value={state.CampaignName}
            onChange={handleChangeText}/>
           
            <FormLabel htmlFor='Tagline'>Tagline</FormLabel>
            <Input size='lg' name='Tagline' type='text' value={state.Tagline}
            onChange={handleChangeText} />

            <FormLabel htmlFor='Photo'>Thumbnail</FormLabel>
            <Input size='lg' name='Photo' type='file' onChange={onChangePhoto}
             />
          

            <FormLabel htmlFor='Group'>Group</FormLabel>
            <Select size='lg' placeholder='Select option' name='Group' onChange={handleChangeText}>
              <option value='Food'>Food</option>
              <option value='Art'>Art</option>
              <option value='Accessories'>Accessories</option>
              <option value='Other'>Other</option>
              
              
            </Select>
            {/* <Input size='lg' name='Group' type='text' value={state.Group}
            onChange={handleChangeText} /> */}





            <FormLabel htmlFor='Country'>Country</FormLabel>
            {/* <Input size='lg' name='Country' type='text' value={state.Country} */}
            {/* onChange={handleChangeText} /> */}
            <Select size='lg' placeholder='Select option' name='Country' onChange={handleChangeText} >
            <option value='Afghanistan'>Afghanistan</option>
            <option value='Australia'>Australia</option>
            <option value='Argentina'>Argentina</option>
            <option value='Angola'>Angola</option>
            <option value='Belgium'>Belgium</option>
            <option value='Bolivia'>Bolivia</option>
            <option value='Burundi'>Burundi</option>
            <option value='Canada'>Canada</option>
            <option value='Cambodia'>Cambodia</option>
            <option value='Germany'>Germany</option>
            <option value='France'>France</option>
            <option value='Indonesia'>Indonesia</option>
            <option value='Malaysia'>Malaysia</option>
            <option value='Spain'>Spain</option>
            <option value='Taiwan'>Taiwan</option>
            <option value='Thailand'>Thailand</option>
            <option value='Turkey'>Turkey</option>
            <option value='Ukraine'>Ukraine</option>
            <option value='United Kingdom'>United Kingdom</option>
            <option value='United States'>United States</option>
            <option value='Vatican City'>Vatican City</option>
            <option value='Vietnam'>Vietnam</option>
            <option value='Zambia'>Zambia</option>
            <option value='Zimbabwe'>Zimbabwe</option>
            
                          
                            </Select>
         

            {/* <FormLabel htmlFor='_startAt'>startAt</FormLabel>
            <Input size='lg' name='startAt' type='int' value={state.startAt}
            onChange={handleChange} /> */}
        

           

            <FormLabel htmlFor='_endAt'>Story</FormLabel>
            <SunEditor name='Story' value={state.Story} onChange={handleQuillEdit}  setOptions={{
          
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
          ],
          height: 400
        }}/>
            {/* <div onBlur={handleQuillEditor_update}></div>
            <QuillNoSSRWrapper  theme="snow" placeholder="WTF" type='text' name='Story' value={state.Story} onBlur={handleQuillEdit} /> */}


            <FormLabel htmlFor='goal'>Goal</FormLabel>
            <Input size='lg' name='goal' type='Number' value={state.goal}
            onChange={handleChange} />

            <FormLabel htmlFor='_endAt'>EndDate</FormLabel>
            {/* <Input size='lg' name='endAt' type='int' value={state.endAt}
            onChange={handleChange} /> */}
             
              <DatePicker selected={state.endAt} value={state.endAt} onChange={handleDate} h></DatePicker>
             
           
            </VStack>
            
            <SimpleGrid  columns={2}
          spacing={8}>
            <Button
            
            mt={4}
            colorScheme='teal'
            // isLoading={props.isSubmitting}
            type='submit'
            onClick={saveObject}
            >
            Deploy
          </Button> 

          <Button
            
            mt={4}
            colorScheme='teal'
            // isLoading={props.isSubmitting}
            type='submit'
            onClick={saveNolaunched}
            >
            Draft
          </Button>
          </SimpleGrid>
        
        </FormControl>}
        { selectedTab === 'Dashboard' && <div>Dashboard</div>}
        { selectedTab === 'Campaign' && 
        <>

        <SidebarCampaign setSelected2={setSelectedTab2} />  

        <ColoredLine color='#AEC8CA' />
                
        { selectedTab2 === 'My Raise Campaign' &&  
            
          <SimpleGrid columns={3} spacing={50}>
       
          { data.map((elment, i) => (<SocardCreate data={elment} donatedd={donatedd} saveRequest={saveRequest} claimrequest = {claimrequest} />)) }

          </SimpleGrid>
           }  

        { selectedTab2 === 'My Fund Campaign' && 
          <SimpleGrid columns={3} spacing={50}>
                {/* <Slider {...settings}> */}
                  { campq.map((elment , i) => (<Socardfund data={elment} datafund={fundq[i]}/>)) }
                  {/* cam = [1 3 2]
                  funq = [3 2 1] */}
                {/* </Slider> */}
                  </SimpleGrid>}
                  
        
          </>
          }
        
        
        
        
        { selectedTab === 'AI' && 
         <Grid
         templateColumns="repeat(350px, 1fr)"
         
         gap={6}
         display="flex"
         alignItems="center"
         justifyContent="center"
       >
         <Box
            w ='100%'
           display="flex"
           width="90%"
           flexDirection="column"
           alignItems="flex-start"
           
           mt = '1px'
         >
           {/* <Textarea
             height={400}
             color="whiteAlpha.500"
             backgroundColor="whiteAlpha.500"
             border="3px solid"
           /> */}
           <SunEditor name='Story' value={state.Story} onChange={handleQuillEdit} setOptions={{
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

          width="100%"
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
          mt='20px'
          >
          <FormLabel htmlFor='goal'>Select Category</FormLabel>
          <Select size='lg' placeholder='Select option' name='Group' onChange={handleChangeText}>
              <option value='Food'>Food</option>
              <option value='Art'>Art</option>
              <option value='Accessories'>Accessories</option>
              <option value='Other'>Other</option>
              
              
            </Select>
          </Box>
            <Box display="flex"

          //  width="30%"
           flexDirection="row"
           justifyContent="center"
           alignItems="center"
           mt='20px'
           
           >
            <Box display="flex"

               
                flexDirection="column"
                justifyContent="center"
                alignItems="flex-start"
                width="40%"
               >
              <FormLabel htmlFor='Title'>Title</FormLabel>
            
              <Input size='lg' name='Title' type='Text' value={textgen.Title}
              onChange={handleChangeTextgenText} />
            </Box>
            
            <Box display="flex"

               
                flexDirection="column"
                justifyContent="center"
                alignItems="flex-start"
                width="40%"
                ml='20px'
               >
              <FormLabel htmlFor='Keyword'>Keyword</FormLabel>
             
              <Input size='lg' name='Keyword' type='Text' value={textgen.Keyword}
              onChange={handleChangeTextgenText} />
            </Box>

            <Box display="flex"

               
                flexDirection="column"
                justifyContent="center"
                alignItems="flex-start"
                ml='20px'
               >
              <FormLabel htmlFor='MinLength'>MinLength</FormLabel>
             
              <Input size='lg' name='MinLength' type='Number' value={textgen.MinLength}
              onChange={handleChangeTextgenNum} />
            </Box>

            <Box display="flex"

               
                flexDirection="column"
                justifyContent="center"
                alignItems="flex-start"
                ml='20px'
               >
              <FormLabel htmlFor='MaxLength'>MaxLength</FormLabel>
             
              <Input size='lg' name='MaxLength' type='Number' value={textgen.MaxLength}
              onChange={handleChangeTextgenNum} />
            </Box>

            <Box display="flex"

               
                flexDirection="column"
                justifyContent="center"
                alignItems="flex-start"
                ml='20px'
               >
              <FormLabel htmlFor='NumSequences'>NumSequences</FormLabel>
             
              <Input size='lg' name='NumSequences' type='Number' value={textgen.NumSequences}
              onChange={handleChangeTextgenNum} />
            </Box>

            <Box display="flex"

               
                flexDirection="column"
                justifyContent="center"
                alignItems="flex-start"
                ml='20px'
               >
              <FormLabel htmlFor='Temperature'>Temperature</FormLabel>
             
              <Input size='lg' name='Temperature' type='Number' value={textgen.Temperature}
              onChange={handleChangeTextgenNum} />
            </Box>

            </Box>


            
           <Button
             variant="solid"
             size="md"
             mt={4}
             border="50px"
             backgroundColor="twitter.500"
             opacity={0.91}
             w ='100%'
             onClick={() => handleSubmitTextgen(textgen)}>
             Generate
           </Button>
           <Textarea backgroundColor="whiteAlpha.500" mt={5} h='800px' border="3px solid" value={notes && notes[1]}/>
         </Box>
         


        



       </Grid>}

       { selectedTab === 'Redeem' && <>
       
       
       

        <SidebarRedeem setSelected1={setSelectedTab1} />
        <ColoredLine color="#AEC8CA"/>
       
        <Flex justifyContent="center" flexDirection="column" alignItems="center">
        { selectedTab1 === 'Token' && <Flex
        flexDirection="row"
        alignItems="center"
        backgroundColor="whiteAlpha.500"
        // border='2px' borderColor='gray.400'
        mt='10'
      >
        <Flex flexDirection="column" alignItems="center">
          
          <Box display="flex" p={2}  alignItems="center">
            <Heading>10 point</Heading>
            <Heading ml={5}>---></Heading>
            <Heading ml={5}>1 TST</Heading>
            <Box display="flex" p={5} ml={10} alignItems="center">
              
              <Button
                variant="solid"
                size="md"
                display="flex"
                justifyContent="center"
                alignItems="center"
                pl={50}
                pr={50}
                colorScheme="linkedin"
                height={10}
              >
                Redeem
              </Button>
            </Box>
          </Box>
          <Box display="flex" p={2} alignItems="center">
            <Heading>20 point</Heading>
            <Heading ml={5}>---></Heading>
            <Heading ml={5}>2 TST</Heading>
            <Box display="flex" p={5} ml={10} alignItems="center">
              <Button
                variant="solid"
                size="md"
                display="flex"
                justifyContent="center"
                alignItems="center"
                pl={50}
                pr={50}
                colorScheme="linkedin"
                height={10}
              >
                Redeem
              </Button>
            </Box>
          </Box>
          <Box display="flex" p={2} alignItems="center">
            <Heading>30 point</Heading>
            <Heading ml={5}>---></Heading>
            <Heading ml={5}>3 TST</Heading>
            <Box display="flex" p={5} ml={10} alignItems="center">
              <Button
                variant="solid"
                size="md"
                display="flex"
                justifyContent="center"
                alignItems="center"
                pl={50}
                pr={50}
                colorScheme="linkedin"
                height={10}
              >
                Redeem
              </Button>
            </Box>
          </Box>
          <Box display="flex" p={2} alignItems="center">
            <Heading>40 point</Heading>
            <Heading ml={5}>---></Heading>
            <Heading ml={5}>4 TST</Heading>
            <Box display="flex" p={5} ml={10} alignItems="center">
              <Button
                variant="solid"
                size="md"
                display="flex"
                justifyContent="center"
                alignItems="center"
                pl={50}
                pr={50}
                colorScheme="linkedin"
                height={10}
              >
                Redeem
              </Button>
            </Box>
          </Box>
          <Box display="flex" p={2} alignItems="center">
            <Heading>50 point</Heading>
            <Heading ml={5}>---></Heading>
            <Heading ml={5}>6 TST</Heading>
            <Box display="flex" p={5} ml={10} alignItems="center">
              <Button
                variant="solid"
                size="md"
                display="flex"
                justifyContent="center"
                alignItems="center"
                pl={50}
                pr={50}
                colorScheme="linkedin"
                height={10}
              >
                Redeem
              </Button>
            </Box>
          </Box>
          <Box display="flex" p={2} alignItems="center">
            <Heading>80 point</Heading>
            <Heading ml={5}>---></Heading>
            <Heading ml={5}>10 TST</Heading>
            <Box display="flex" p={5} ml={5} alignItems="center">
              <Button
                variant="solid"
                size="md"
                display="flex"
                justifyContent="center"
                alignItems="center"
                pl={50}
                pr={50}
                colorScheme="linkedin"
                height={10}
              >
                Redeem
              </Button>
            </Box>
          </Box>
          <Box display="flex" p={2} alignItems="center">
            <Heading>100 point</Heading>
            <Heading ml={5}>---></Heading>
            <Heading ml={5}>15 TST</Heading>
            <Box display="flex" p={5} alignItems="center">
              <Button
                variant="solid"
                size="md"
                display="flex"
                justifyContent="center"
                alignItems="center"
                pl={50}
                pr={50}
                colorScheme="linkedin"
                height={10}
              >
                Redeem
              </Button>
            </Box>
          </Box>
        </Flex>
      </Flex>}

      { selectedTab1 === 'Souvenir' &&  

    <SimpleGrid mt='20'columns={3} spacing={50}>
      <Souvenir></Souvenir>
    </SimpleGrid>  }

      
    </Flex>
    </>}

    { selectedTab === 'Badge' && 
    
        <SimpleGrid columns={3} spacing={50}>
       
       { badge.map((elment, i) => (<SocardBadge badge={elment} changeBadge = {changeBadge} removeBadge = {removeBadge} />)) }

       </SimpleGrid> }

            
        </Box>
       </Flex>
       
     </Flex>

     <Footer></Footer>
   
     </>


        )
  
    }
    
}