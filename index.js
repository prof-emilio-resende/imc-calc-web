function createRequest() {
  var request = null;
  try {
    request = new XMLHttpRequest();
  } catch (tryMS) {
    try {
      request = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (otherMS) {
      try {
      request = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (failed) {
        console.log('no way to create XMLHttpRequest object')
      }
    }
  }

  return request;
}

function handleImcTableResponse() {
  if (this.readyState == 4) {
    if (this.status == 200) {
      var tbl = document.querySelector('#imcTable');
      tbl.innerHTML = '';
      
      var tblObj = JSON.parse(this.responseText);
      
      Object.keys(tblObj).sort().forEach(function(k) {
        var newRow = tbl.insertRow(-1);
        var keyCell = newRow.insertCell(0);
        var keyText = document.createTextNode(k);
        keyCell.appendChild(keyText);

        var newCell = newRow.insertCell(1);
        var valText = document.createTextNode(tblObj[k]);
        newCell.appendChild(valText);
      });
    } else {
      // if there's a problem, we'll tell the user
      alert(`Sorry, can't load the table. ${this.responseText}`);
    }
  }
}

function handleImcCalculateResponse() {
  if (this.readyState == 4) {
    if (this.status == 200) {
      var imc = JSON.parse(this.responseText);
      if (imc) {
        document.querySelector("#imc").innerHTML = `${imc.imc} ${imc.imcDescription}`;
      }
    } else {
      // if there's a problem, we'll tell the user
      alert("Sorry, can't calculate.");
    }
  }
}

function callTable() {
  var request = createRequest();
  if (!request) 'N/A';

  request.onreadystatechange = handleImcTableResponse.bind(request);
  request.open('GET', 'http://localhost:8080/imc/table', true);
  request.send(null);
}

function callTableFetch() {
  fetch('http://localhost:8080/imc/table')
    .then(function(rawResponse) {
      return rawResponse.json()
        .then(function(response) {
          // lets mock a xhr old fashion object
          const xhr = {
            "readyState": 4,
            "status": 200,
            "responseText": JSON.stringify(response)
          };
          handleImcTableResponse.bind(xhr)();
        });
    });
}

function callImcCalc(height, weight) {
  var request = createRequest();
  if (!request) 'N/A';

  request.onreadystatechange = handleImcCalculateResponse.bind(request);
  request.open('POST', 'http://localhost:8080/imc/calculate', true);
  request.setRequestHeader("Content-type", "application/json");
  request.send(JSON.stringify({'height': height, 'weight': weight}));
}

function callImcCalcFetch(height, weight) {
  const options = {
    method: 'post',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({'height': height, 'weight': weight})
  };
  fetch('http://localhost:8080/imc/calculate', options)
    .then(function(rawResponse) {
      return rawResponse.json()
        .then(function(response) {
          // lets mock a xhr old fashion object
          const xhr = {
            "readyState": 4,
            "status": 200,
            "responseText": JSON.stringify(response)
          };
          handleImcCalculateResponse.bind(xhr)();
        });
    });
}

function calculateImc(evt) {
  const heightElem = document.querySelector("#altura");
  const weightElem = document.querySelector("#peso");

  if(!heightElem) throw Error("height is required field!");
  if(!weightElem) throw Error("weight is required field!");

  const height = heightElem.value;
  const weight = weightElem.value;

  callImcCalcFetch(height, weight);
}

window.onload = function() {
  const btn = document.querySelector(".data .form button");
  btn.addEventListener('click', calculateImc);
  callTableFetch();
};
