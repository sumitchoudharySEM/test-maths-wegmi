// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0 ;

contract CoinFlip {

    address public Owner;
    uint256 GameNumber;
    struct Game  {
        uint256 GameId; 
        uint8 GameState; // 1 started, 2 finished/over, 3 paid
        uint256 StackAmount;   
        address payable Player;
        bool ChosenValue; //true for heads, false for tails 
        bool RandomOutput; //true for heads, false for tails
        bool GameResult; // true for a win, false for a loose
    }

    mapping(uint256 => Game) public Games; 

    constructor (){
        Owner = msg.sender;
        GameNumber = 1;
    }


    function PrintGame(uint256 GameIdVal )external view returns (Game memory){
        return Games[GameIdVal];
    }

    function PrintNextGameNo()public view returns(uint256){
        return GameNumber;
    }

    function getRandomResult() public view returns (bool) {
        return block.timestamp % 2 == 0; // Simulated randomness, not secure for production
    }

    function StartGame(uint256 StackAmountVal, bool ChosenCoinSideVal) public payable returns(bool) {
        require(msg.value >= StackAmountVal );
        Games[GameNumber].GameId = GameNumber;
        Games[GameNumber].GameState = 1;
        Games[GameNumber].StackAmount = StackAmountVal;
        Games[GameNumber].Player = payable(msg.sender);
        Games[GameNumber].ChosenValue = ChosenCoinSideVal;
        bool result = getRandomResult(); // Simulate the coin flip result
        Games[GameNumber].RandomOutput = result;
        if (result == ChosenCoinSideVal) {
            Games[GameNumber].GameResult = true;
            Games[GameNumber].GameState = 2;
            payable(msg.sender).transfer(msg.value * 192 / 100);
            Games[GameNumber].GameState = 3;
        } else {
            Games[GameNumber].GameResult = false;
            Games[GameNumber].GameState = 2;
        }   
        GameNumber ++;  
        return Games[GameNumber].GameResult;   
    }

}