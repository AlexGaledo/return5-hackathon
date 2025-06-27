// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract return5 {
    string public name;
    string public description;
    uint256 public goal;
    uint256 public deadline;
    address public owner;
    bool public paused;

    enum projectState{Active, Successful, Failed}
    projectState public state;

    //create tiers for funding
    struct Tier{
        string name;
        uint256 amount;
        uint256 backers;
    }
    
    //backer total contribution and if they funded specific tiers(tiers are made by the owner of the contract).
    struct Backer{
        uint256 totalContribution;
        mapping(uint256 => bool) fundedTiers;
    }

    //tier based funding (fixd amount)
    Tier[] public tiers;
    mapping(address => Backer) public backers;

    //usbale only if owner/contract creator is making the function call.
    modifier onlyOwner(){
        require(msg.sender == owner,"Only owner can use this function");
        _;
    }

    //usable only if project is open.
    modifier projectOpen(){
        require(state == projectState.Active, "Project is closed");
        _;
    }

    // check if project is not paused
    modifier notPaused(){
        require(!paused,"Project is paused");
        _;
    }


    //check project if its failed or still active
    function checkProjectState() internal {
        if(state == projectState.Active){
            if(block.timestamp >= deadline){
                state = address(this).balance >= goal? projectState.Successful:projectState.Failed;
            }else{
                state = address(this).balance >= goal? projectState.Successful:projectState.Active;
            }
        }   
    }


    //contract creator
    constructor(
        address _owner,
        string memory _name,
        string memory _description,
        uint256 _goal,
        uint256 _durationdays)
    {
        name = _name;
        description = _description;
        goal = _goal;
        deadline = block.timestamp + (_durationdays * 1 days);
        owner = _owner;
        state = projectState.Active;
    }


    // fund the contract function 
    function fund(uint256 _tierIndex) public payable projectOpen notPaused{
        
        require(_tierIndex < tiers.length,"tier index not found"); // locate if tier is declarated
        require(msg.value == tiers[_tierIndex].amount,"Incorrect amount"); // get the amount send by the owner

        tiers[_tierIndex].backers++; // increment in the backer count of each tiers
        backers[msg.sender].totalContribution += msg.value; // increment each funding sent by the user
        backers[msg.sender].fundedTiers[_tierIndex] = true; // enable the index of the fund funded by the user
        checkProjectState(); // refresh project state
    }


    // only owner of the contract/project can do this, create tiers for their project 
    function addTier(string memory _name,uint256 _amount)public onlyOwner{
        require(_amount > 0, "Insufficient Amount Sent ");
        tiers.push(Tier(_name,_amount,0));
    }

    //remove tier from tierlst
    function removeTier(uint256 _index)public onlyOwner{
        require(_index < tiers.length,"Index does not exist");
        tiers[_index] = tiers[tiers.length -1];
        tiers.pop();
    }   

    //withdraw from the project funding 
    function withdraw() public onlyOwner notPaused{  
        checkProjectState();
        require(state == projectState.Successful,"Campaign not successful");
        uint256 balance = address(this).balance;
        require(balance > 0, " balance is less than 1");

        payable(owner).transfer(balance);
        
    }

    //balans
    function getContractBalance() public view returns(uint256){
        return address(this).balance;
    }

    //refund back to backers and owner the amount if project failed.
    function refund()public{
        checkProjectState();
        require(state == projectState.Failed,  "Not eligible for refund");
        uint256 refundAmount = backers[msg.sender].totalContribution;
        require(refundAmount > 0, "Nothing to be refunded");

        backers[msg.sender].totalContribution = 0;
        payable(msg.sender).transfer(refundAmount);
        
    }

    //checks if the given address has funded the tier provided
    function hasFunded(address _backer, uint256 _tierIndex)public view returns (bool){
        return backers[_backer].fundedTiers[_tierIndex];
    }

    // toggle pause status of the project
    function togglePause() public onlyOwner{
        paused = !paused;
    }
    
    //get tier list
    function getTiers()public view returns(Tier[] memory){
        return tiers;
    }

    //project status if still active
    function getProjectStatus()public view returns(projectState){
        if (state == projectState.Active && block.timestamp > deadline){
            return address(this).balance >= goal? projectState.Successful: projectState.Failed;
        }
        return state;
    }

    // extend ddeadline for funding
    function addDeadline(uint256 _daysToAdd) public onlyOwner projectOpen{
        deadline += _daysToAdd * 1 days;
    }
}