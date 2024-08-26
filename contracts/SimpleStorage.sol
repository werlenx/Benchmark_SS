// SPDX-License-Identifier: GPL-3.0

pragma solidity >0.4.22 <0.9;

contract SimpleStorage{

    uint256 data;

    constructor(){
        set(3); //set default value for contract 
    }

    

    function set(uint256 _d) public{
        data = _d;
    }
    function get() public view returns(uint256){
        return data;
    }

}