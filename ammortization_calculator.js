function calculate() {
  let presentValue = Number(document.querySelector("#presentValue").value);
  let interestRate = Number(document.querySelector("#interestRate").value);
  let loanTerm = Number(document.querySelector("#loanTerm").value);
  // Annuity Payment of a loan = PV  / [(1-(1+r)^-n)/r]
  // PMT = 500,000 / [(1-((1+0.002991666667)^(-30*12))) / (0.002991666667)]
  // PMT = 500,000 / [0.6588360732 / (0.002991666667)]
  // PMT = 500,000 / 220.223757034
  // PMT = 2,270.4180817459
  let compounding_periods = 12;
  let mathInterestRate = (interestRate / 100) / compounding_periods;
  let interestOne = 1 + mathInterestRate;
  var demoninator = (1 - Math.pow(interestOne, -loanTerm*compounding_periods))/(mathInterestRate);
  var resultantValue = presentValue / demoninator;
  var resultNode = document.querySelector("#result");
  resultNode.innerHTML = `$${resultantValue}`;
}

function reset() {
  document.querySelector("#presentValue").value = "";
  document.querySelector("#interestRate").value = "";
  document.querySelector("#loanTerm").value = "";
  let resultant_val = document.querySelector("#result");
  resultant_val.innerHTML = "";
}

function ammortisationSchedule() {
// 500,000 * 0.002991666667 = 1,495.8333335 --> after the first month
// 500,000 + 1,495.8333 = 501,495.8333  ---> interest added after the first month
// 501,495 - 2,000 = 499,495  --> repayment deducted
  let ammortisedArray = [];
  var loan_interest;
  var ammortisedAmount;
  let presentValue = Number(document.querySelector("#presentValue").value);
  let interestRate = Number(document.querySelector("#interestRate").value);
  let loanTerm = Number(document.querySelector("#loanTerm").value);
  for(let i = 0; i < loanTerm; i++) {
   loan_interest = presentValue * interestOne;
   ammortisedAmount = presentValue - loan_interest;
   ammortisedArray.push(ammortisedAmount);
  }
  return ammortisedArray;
}