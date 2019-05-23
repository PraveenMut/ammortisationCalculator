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

function ammortisationSchedule() {
  
}