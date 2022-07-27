import Moralis from 'moralis'
import { useMoralis , useWeb3ExecuteFunction } from "react-moralis"
// const contractProcessor = useWeb3ExecuteFunction();
export const donate = async (state, data, name, file, user, contractProcessor ) => {
    
    let MonsterCreat = new Moralis.Object.extend('Campaign')
    let allMonster = new MonsterCreat();

        let busdInWei = Moralis.Units.Token(state.goal, "18")
        let startdate = parseInt(new Date(state.startAt).getTime() / 1000 + 100)
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
        
        // for (let i = 0; i < data.length; i++) {
        //   if(data[i].Launched == true){
        //     alert("You have already launched campaign : " + data[i].CampaignName);
        //     break;
        //   }
  
        //   else {
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
                allMonster.set("Photo", moralisFile) 
                allMonster.set("ethAddress",user.get("ethAddress") ) 
                allMonster.set("Launched",true)
                allMonster.save().then(
                  (allMonster) => {
                    // Execute any logic that should take place after the object is saved.
                  
                
                  
                    alert("New object created with objectId: " + allMonster.id);
                    return true
        
        
                  },
                  (error) => {
                    // Execute any logic that should take place if the save fails.
                    // error is a Moralis.Error with an error code and message.
                    alert("Failed to create new object, with error code: " + error.message);
                    return false
                  }
                );
                
              }),
  
            });
        // }
    //   }
    
}

export const donated = async(data,contractProcessor) => {
    // const contractProcessor = useWeb3ExecuteFunction();
    let MonsterCreat = new Moralis.Object.extend('Campaign')
    let allMonster = new MonsterCreat();

        let busdInWei = Moralis.Units.Token(data.goal, "18")
        let startdate = parseInt(new Date().getTime() / 1000 + 100)
        let enddate = parseInt(new Date(data.endAt).getTime() / 1000)
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
            _id: data.idCount
          
          },
          
        };
        
    
        //   if(data[i].Launched == true){
        //     alert("You have already launched campaign : " + data[i].CampaignName);
            
        //   }
  
        //   else {
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
                Updated(data)
              }),
  
            });
        // }
      
    
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
          // Execute any logic that should take place after the object is saved.
        
      
  
          alert("New object created with objectId: " + monster.id);
          


        },
        (error) => {
          // Execute any logic that should take place if the save fails.
          // error is a Moralis.Error with an error code and message.
          alert("Failed to create new object, with error code: " + error.message);
        }
      );;
    
    
 } 
