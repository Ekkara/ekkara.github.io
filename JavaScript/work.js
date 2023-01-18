import {bankMod} from "./bank.js";
const walletBalanceElement = document.getElementById("walletBalance");
const transferToBankButton = document.getElementById("transferToBankButton");
const workButton = document.getElementById("workButton");
const repayLoanButton = document.getElementById("repayLoanButton");

//initiate start values
const salary = 100;
let walletBalance = 0;
walletBalanceElement.innerText = walletBalance + "kr";

//add money to wallet
const work = () => {
  walletBalance += parseInt(salary);
  walletBalanceElement.innerText = walletBalance + "kr";
};
workButton.addEventListener("click", work);

//work and spend all money to repay loan
const repayLoanByWork = () => {
  bankMod.repayLoan(salary);
};
repayLoanButton.addEventListener("click", repayLoanByWork);

const transferToBank = () => {
  const transferSum = prompt("how much would you like to transfer");

  //simple fail safe, check if it is a valid number.
  //depended that other operation uses parseInt
  //due to how java script adds element as to a string 
  //parsing in advance is close to pointless
  if (!parseInt(transferSum)) {
    alert(`${transferSum} is not a valid numeric digit`);
    return;
  }

  //fail safe, check if user can afford the transfer
  if (walletBalance < transferSum) {
    alert("sorry, you lack the funds to do that");
    return;
  }

  //check if user have a loan, if so pay 10 percent to pay off loan and the rest is transferred to the account
  //obs, repay loan function have their own function to transfer money to bank account if it is more than owed
  if (bankMod.getLoan > 0) {
    bankMod.deposit(parseInt(transferSum * 0.9));
    bankMod.repayLoan(transferSum * 0.1);
  } else {
    bankMod.deposit(parseInt(transferSum));
    }
  //update wallet's value and and texts
  walletBalance -= parseInt(transferSum);
  walletBalanceElement.innerText = walletBalance + "kr";
};
transferToBankButton.addEventListener("click", transferToBank);

export const workMod ={
  work,
  repayLoanByWork,
  transferToBank
}