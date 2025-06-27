// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {return5} from "./return5.sol";

// factory for releaf Contract
contract return5Factory{
    address public owner;
    bool public paused;

    //Project description
    struct Project{
        address projectAddress;
        address owner;
        string name;
        uint256 timecreated;
    }
    // Project array to store proejcts made in the factory.
    Project[] public projects;

    // enable viewing of projects of a specific user 
    mapping(address=> Project[])public userProject;



    modifier onlyOwner(){
        require(msg.sender == owner,"must be the owenr");
        _;
    }

    modifier notPaused(){
        require(!paused, "Factory is paused");
        _;
    }


    //contract owner = msg.sender which is me since i will be the one to deploy the factory.
    constructor(){
        owner = msg.sender;
    }

    //create project usable by others (this is so that all projects made are under my factory).
    function createProject(
        string memory _name,
        string memory _description,
        uint256 _goal,
        uint256 _durationInDays)external notPaused
    {
        return5 newfactory = new return5(
            msg.sender,
            _name,
            _description,
            _goal,
            _durationInDays
        );

        address projectAddress = address(newfactory);

        Project memory newproject = Project(
            {
                projectAddress:projectAddress,
                owner : msg.sender,
                name : _name,
                timecreated : block.timestamp
            }
        );

        projects.push(newproject);
        userProject[msg.sender].push(newproject);

    }


    //get projects of users specified
    function getUserProjects(address _user)external view returns(Project[] memory){
        return userProject[_user];
    }

    //get all projects made under the factory
    function getAllProjects()external view returns (Project[] memory){
        return projects;
    }

    // pause
    function togglePause()external onlyOwner{
        paused = !paused;
    }
}