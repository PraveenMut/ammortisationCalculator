let payment;
let ammortisedBefore;

function getData() {
  return {
    presentValue: Number(document.querySelector("#presentValue").value),
    interestRate: Number(document.querySelector("#interestRate").value),
    loanTerm:  Number(document.querySelector("#loanTerm").value),
    additionalPayment: Math.floor(Number(document.querySelector('#additional-pmt').value)),
    additionalPaymentsDiv: document.querySelector("#additional-payments-container"),
    compoundingPeriods: 12,
  }
}

const reducer = function(accumulator, currentValue) {
  return accumulator + currentValue;
}

function addToElement(element, content) {
  let el = document.querySelector(`#${element}`);
  el.innerHTML = `${content};`
}

function calculate() {
  // Annuity Payment of a loan = PV  / [(1-(1+r)^-n)/r]
  // PMT = 500,000 / [(1-((1+0.002991666667)^(-30*12))) / (0.002991666667)]
  // PMT = 500,000 / [0.6588360732 / (0.002991666667)]
  // PMT = 500,000 / 220.223757034
  var data = getData();
  let p = data.presentValue;
  let apr = data.interestRate;
  let c = data.compoundingPeriods;
  let n = data.loanTerm;
  let mathInterestRate = (apr / 100) / c;
  let interestOne =  1 + mathInterestRate;
  var demoninator = (1 - Math.pow(interestOne, -n*c))/(mathInterestRate);
  var resultantValue = Math.floor(p / demoninator);
  var resultNode = document.querySelector("#result");
  resultNode.innerHTML = `$${resultantValue}`;
  return resultantValue;
}

function reset() {
  document.querySelector("#presentValue").value = "";
  document.querySelector("#interestRate").value = "";
  document.querySelector("#loanTerm").value = "";
  let resultant_val = document.querySelector("#result");
  resultant_val.innerHTML = "";
}

function ammortisationSchedule(payment) {
  let ammortisedArray = [];
  let counter = [];
  let fetch_data = getData();
  var remainingBalance = fetch_data.presentValue;
  let term = fetch_data.loanTerm * fetch_data.compoundingPeriods;
  let interestRate = fetch_data.interestRate / 100;
  mathInterestRate = ((interestRate)/fetch_data.compoundingPeriods);
  let interestByOne = 1 + mathInterestRate;
  for(let i = 0; i < term; i++) {
    interestComponent = remainingBalance * mathInterestRate
    principalComponent = payment - interestComponent;
    remainingBalance -= principalComponent;
    ammortisedArray.push(Math.floor(remainingBalance));
    counter.push(i);
  }
  return [ammortisedArray, counter];
};

var configuration = {
  type: 'line',
  data: {
      labels: ammortisation_schedule()[1],
      datasets: [{
          backgroundColor: 'rgba(2,83,179,0.2)',
          label: "Balance Remaining",
          data: ammortisation_schedule()[0]
      },]
  },
    options: {
      title: {
        text: 'Breakdown of Payments'
      },
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Month'
          },
          gridLines: {
            display: false
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Balance Remaining'
          }
        }]
      },
    }
}

function chart_run() {
  var ctx = document.getElementById('myChart');
  var myChart = new Chart(ctx, configuration);
  myChart.update();
}

function paymentEstimator() {
  ammortisationSchedule(calculate());
  chart_run();
}

function paymentsadjusted() {
  let ammortBeforeAry = ammortisationSchedule(calculate())[0];
  let ammortAfterAry = ammortisationSchedule(getData().additionalPayment)[0];
  let ammortDifference = ammortBeforeAry.reduce(reducer) - ammortAfterAry.reduce(reducer);
  addToElement(ammortDifference);
  getData().additionalPaymentsDiv.style.display = "block";
  drawChart(ammortAfterAry[0]);
};

