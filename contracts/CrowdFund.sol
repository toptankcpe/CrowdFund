//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "hardhat/console.sol";

// interface IERC20 {
//     function transfer(address, uint) external returns (bool);

//     function transferFrom(
//         address,
//         address,
//         uint
//     ) external returns (bool);
// }

import "../contracts/Topstarter.sol";

contract CrowdFund {
    event Launch(
        uint id,
        address indexed creator,
        uint goal,
        uint32 startAt,
        uint32 endAt
    );


    event Requestfund(
        uint id,
        uint requestcount,
        address indexed creator,
        uint amount,
        uint32 startAt,
        uint32 endAt
    );
    event Cancel(uint id);
    event Pledge(uint indexed id, address indexed caller, uint amount);
    event Unpledge(uint indexed id, address indexed caller, uint amount);
    event Claim(uint id,uint requestcount);
    event Refund(uint id, address indexed caller, uint amount);
    event Voting(uint id, uint requestcount,address indexed caller, bool check);

    struct Campaign {
        
        address creator;
        
        uint goal;

        uint claimleft;

        uint totalfund;
        
        uint pledged;
        
        uint32 startAt;
       
        uint32 endAt;
        
        bool claimed;
    }

    struct Request {
        
        address creator;

        uint votecount;

        uint votetrue;
        
        uint votefalse;
        
        uint amount;
        
        uint32 startAt;
       
        uint32 endAt;
        
        bool claimed;
    }

    Topstarter token = Topstarter(0x932f64E912169643646F8aCB7B39e8f6903D7b89) ;
    

    // Total count of campaigns created.
    // It is also used to generate id for new campaigns.
    uint public count;
    // Mapping from id to Campaign
    mapping(uint => Campaign) public campaigns;
    mapping(uint => mapping(uint => Request)) public requests;

    mapping(uint => mapping(uint => mapping(address => bool))) public votescheck;
    mapping(uint => mapping(uint => mapping(address => bool))) public votes;
    // Mapping from campaign id => pledger => amount pledged
    mapping(uint => mapping(address => uint)) public pledgedAmount;


    receive() external payable {}

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function launch(
        uint _goal,
        uint32 _startAt,
        uint32 _endAt,
        uint32 _id

    ) external {
        // require(_startAt >= block.timestamp, "start at < now");
        require(_endAt >= _startAt, "end at < start at");
        require(_endAt <= block.timestamp + 90 days, "end at > max duration");

        // count += 1;
        campaigns[_id] = Campaign({
            creator: msg.sender,
            goal: _goal,
            claimleft: 0,
            totalfund: 0,
            pledged: 0,
            startAt: _startAt,
            endAt: _endAt,
            claimed: false
        });

        emit Launch(_id, msg.sender, _goal, _startAt, _endAt);
    }

    function requestfund(
        uint _amount,
        uint32 _startAt,
        uint32 _endAt,
        uint32 _id,
        uint32 _requestcount


    ) external {
        Campaign storage campaign = campaigns[_id];
        
        // require(_startAt >= block.timestamp, "start at < now");
        require(_endAt >= _startAt, "end at < start at");
       
        
        require(campaign.claimleft >= _amount, "amount > claimleft");

        // count += 1;
        requests[_id][_requestcount] = Request({
            creator: msg.sender,
            votecount: 0 ,
            votetrue: 0,
            votefalse: 0,
            amount: _amount,
            startAt: _startAt,
            endAt: _endAt,
            claimed: false
        });

    
        emit Requestfund(_id, _requestcount, msg.sender, _amount, _startAt, _endAt);
    }

    function cancel(uint _id) external {
        Campaign memory campaign = campaigns[_id];
        require(campaign.creator == msg.sender, "not creator");
        require(block.timestamp < campaign.startAt, "started");

        delete campaigns[_id];
        emit Cancel(_id);
    }


    function voting(uint _id, uint _requestcount, bool _check) external {
        Request storage request = requests[_id][_requestcount];
        require(votescheck[_id][_requestcount][msg.sender] == false, "already vote");
        
        votes[_id][_requestcount][msg.sender] = _check;
        votescheck[_id][_requestcount][msg.sender] = true;

        if(_check == false){
            request.votecount +=1;
            request.votefalse +=1;
        }else{
            if(_check == true){
                request.votecount +=1;
                request.votetrue +=1;
            }
        }

        emit Voting(_id, _requestcount, msg.sender,_check);
    }
    

    function pledge(uint _id, uint _amount) external {
        
        Campaign storage campaign = campaigns[_id];
        require(block.timestamp >= campaign.startAt, "not started");
        require(block.timestamp <= campaign.endAt, "ended");
       
        
        campaign.pledged += _amount;
        campaign.claimleft += _amount;
        
        
        if(pledgedAmount[_id][msg.sender] == 0){
            campaign.totalfund += 1;
            pledgedAmount[_id][msg.sender] += _amount;
        }else{
            pledgedAmount[_id][msg.sender] += _amount;
        }
       
        token.transferFrom(msg.sender, address(this), _amount);

        emit Pledge(_id, msg.sender, _amount);
    }

    function unpledge(uint _id, uint _amount) external {
        Campaign storage campaign = campaigns[_id];
        require(block.timestamp <= campaign.endAt, "ended");

        campaign.pledged -= _amount;
        pledgedAmount[_id][msg.sender] -= _amount;
        token.transfer(msg.sender, _amount);

        emit Unpledge(_id, msg.sender, _amount);
    }

    function claim(uint _id ,uint _requestcount) external {
        Campaign storage campaign = campaigns[_id];
        Request storage request = requests[_id][_requestcount];
        require(request.creator == msg.sender, "not creator"); 
        require(block.timestamp >= request.endAt || campaign.totalfund == request.votecount, "not expire or vote not complete");
        require(!request.claimed, "claimed");

        if(request.votetrue > request.votefalse){
            request.claimed = true;
            campaign.claimleft -= request.amount;
            token.transfer(request.creator, request.amount);
        }else{
            revert("request not approve");
        }
        

        emit Claim(_id,_requestcount);
    }

    function refund(uint _id) external {
        Campaign memory campaign = campaigns[_id];
        require(block.timestamp > campaign.endAt, "not ended");
        require(campaign.pledged < campaign.goal, "pledged >= goal");

        uint bal = pledgedAmount[_id][msg.sender];
        pledgedAmount[_id][msg.sender] = 0;
        token.transfer(msg.sender, bal);

        emit Refund(_id, msg.sender, bal);
    }
   
  
    
}