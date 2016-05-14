function State() {
  this.board = [];
  for (var i = 0; i < 9; i++) {
    var row = [];
    for (var j = 0; j < 9; j++) {
      row.push(0);
    }
    this.board.push(row);
  }
}

State.prototype.setValue = function(row, col, value) {
  this.board[row][col] = value;
}

State.prototype.isValid = function(row, col) {
  for (var i = 0; i < 9; i++) {
    if (i != col) {
      if (this.board[row][i] == this.board[row][col]) {
        return false;
      }
    }
  }

  for (var i = 0; i < 9; i++) {
    if (i != row) {
      if (this.board[i][col] == this.board[row][col]) {
        return false;
      }
    }
  }


  if (row >= 0 && row < 3) {
    var rowRange = 0;
  } else if (row >= 3 && row < 6) {
    var rowRange = 3;
  } else if (row >= 6 && row < 9) {
    var rowRange = 6;
  };

  if (col >= 0 && col < 3) {
    var colRange = 0;
  } else if (col >= 3 && col < 6) {
    var colRange = 3;
  } else if (col >= 6 && col < 9) {
    var colRange = 6;
  };

  for (var i = rowRange; i < rowRange + 3; i++) {
    for (var j = colRange; j < colRange + 3; j++) {
      if (i != row && j != col) {
        if (this.board[i][j] == this.board[row][col]) {
          return false;
        }
      }
    }
  }
  return true;
}

State.prototype.nextEmptyCell = function() {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (this.board[i][j] == 0) {
        var position = {
          'row': i,
          "col": j
        };
        return position;
      }
    }
  }
  return -1;
}

State.prototype.getDomain = function(row, col) {
  var domain = [];
  for (var i = 1; i < 10; i++) {
    domain.push(i);
  }



  for (var i = 0; i < 9; i++) {
    var index = domain.indexOf(this.board[row][i]);
    if (index > -1) {
      domain.splice(index, 1);
    }
    index = domain.indexOf(this.board[i][col]);
    if (index > -1) {
      domain.splice(index, 1);
    }
  }


  if (row >= 0 && row < 3) {
    var rowRange = 0;
  } else if (row >= 3 && row < 6) {
    var rowRange = 3;
  } else if (row >= 6 && row < 9) {
    var rowRange = 6;
  };

  if (col >= 0 && col < 3) {
    var colRange = 0;
  } else if (col >= 3 && col < 6) {
    var colRange = 3;
  } else if (col >= 6 && col < 9) {
    var colRange = 6;
  };

  for (var i = rowRange; i < rowRange + 3; i++) {
    for (var j = colRange; j < colRange + 3; j++) {
      index = domain.indexOf(this.board[i][j]);
      if (index > -1) {
        domain.splice(index, 1);
      }
    }
  }
  return domain;
}

function solveSudoku(state) {
  count +=1;
  var next = state.nextEmptyCell();
  if (next == -1) { return true;}

  var row = next['row'];
  var col = next['col'];
  var domain = state.getDomain(row, col);

  for(var i=0; i<domain.length; i++){
  	state.setValue(row, col, domain[i]);
  	if(state.isValid(row, col)){
  		if(solveSudoku(state)){
  			return true;
  		}
  	}
  }

  state.setValue(row, col, 0);
  return false;
}


function solve(){
	count=0;
	var valid = true;
	var game = new State();
	for (var i = 0; i < 9; i++) {
	    for (var j = 0; j < 9; j++) {
	    	var value = document.getElementById(i+""+j).innerHTML;
	    	if(value){
	    		game.setValue(i, j, value);
	    		if(!game.isValid(i, j)){
	    			valid = false;
	    		}
	    	}
	    }
  	}
  	if(valid){
  		solved =solveSudoku(game);

	  	for (var i = 0; i < 9; i++) {
		    for (var j = 0; j < 9; j++) {
		    	if(solved){
		    		document.getElementById(i+""+j).innerHTML = game.board[i][j];
		    		document.getElementById("status").innerHTML = "Succes!";
		    	}
		    	else{
		    		document.getElementById("status").innerHTML = "Cannot be solved";
		    	}
		    }
	  	}
  	}
  	else{
  		document.getElementById("status").innerHTML = "Cannot be solved";
  	}
  	
}

function reset(){
	for (var i = 0; i < 9; i++) {
	    for (var j = 0; j < 9; j++) {
	    	document.getElementById(i+""+j).innerHTML = "";
	    }
  	}
}

var text = "";
for(var i=0; i<9; i++){
	var row = "";
	for(var j=0; j<9; j++){
		row += ("<td contenteditable id="+i+""+j+" class='table-data' onkeypress='return event.charCode >= 49 && event.charCode <= 57 && this.innerHTML.length==0'></td>");
	}

	text += ("<tr>"+row+"</tr>");
}
document.getElementById("board").innerHTML = text;