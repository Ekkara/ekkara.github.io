const hideElements = document.getElementsByClassName("hideIfNoLoan");
const bankBalanceElement = document.getElementById("bankBalance");
const loanElement = document.getElementById("bankLoan");
const getLoanButton = document.getElementById("takeLoanButton");

//initiate default values
let bankBalance = 0;
let bankLoan = 0;
bankBalanceElement.innerText = bankBalance + "kr";
loanElement.innerText = bankLoan + "kr";

const takeLoan = () => {
  //fail safe, not allowed to have an existing loan
  if (bankLoan > 0) {
    alert("You can only take one loan at the time");
    return;
  }

  const desiredLoan = prompt(
    "Please fill in the desired amount you wish to loan"
  );

  if (!isNaN(desiredLoan) && desiredLoan > 0) {
    //see if value is a number and a realistic loan e.g
    //not zero or trying to ask for money

    //fail safe, not allowed to have an existing loan
    if (desiredLoan > bankBalance * 2) {
      alert("You can only take a loan of twice the money on your bank");
      return;
    }

    //update text elements
    bankLoan = parseInt(desiredLoan);
    loanElement.innerText = bankLoan + "kr";

    bankBalance += parseInt(desiredLoan);
    bankBalanceElement.innerText = bankBalance + "kr";

    //display loan elements
    for (let i = 0; i < hideElements.length; i++) {
      hideElements[i].style.display = "block";
    }
  } else {
    alert(`${desiredLoan} is not a valid numeric digit`);
  }
};
getLoanButton.addEventListener("click", takeLoan);

const repayLoan = (sum) => {
  //pay back the loan
  bankLoan -= sum;

  //if loan under or equal to zero the loan is gone
  if (bankLoan <= 0) {
    //if the loan is now negative, transfer the money to the balance
    bankBalance += parseInt(Math.abs(bankLoan));

    //hide the loan elements
    for (let i = 0; i < hideElements.length; i++) {
      hideElements[i].style.display = "none";
    }
  }
  bankBalanceElement.innerText = bankBalance + "kr";
  loanElement.innerText = bankLoan + "kr";
};

const deposit = (amount) => {
  bankBalance += parseInt(amount);
  bankBalanceElement.innerText = bankBalance  + "kr";
};

const withdraw = (amount) => {
  deposit(-amount);
};
const getBalance = () => {
  return bankBalance;
};
const getLoan = () => {
  return bankLoan;
};

export const bankMod = {
  takeLoan,
  repayLoan,
  deposit,
  withdraw,
  getBalance,
  getLoan,
};