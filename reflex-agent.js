// Our state space
let sList = [];

// An index of states in the table
let stateNumber = 0;

// The Agent function
function reflex_agent(location, state){
   	if (state === "DIRTY") {
        return "CLEAN";
    } else if (location === "A") {
        return "RIGHT";
    } else if (location === "B") { 
        return "LEFT";
    }
}

// Gets a random state
function getRandomState() {
    return [Math.random() < 0.5 ? "A" : "B", Math.random() < 0.5 ? "CLEAN" : "DIRTY", Math.random() < 0.5 ? "CLEAN" : "DIRTY"];
}

// Check if a state is in the state space list
function reached(state) {
    for (const stt of sList) {
        if (stt[0] === state[0] && stt[1] === state[1] && stt[2] === state[2]) {
            return true;
        }
    }
    return false;
}

// A reference to the table html object
const stateTable = document.getElementById("states-table");

// Adds a row to the html object table
function addStateToTable(state) {
        let newRow = document.createElement('tr');
        let htmlRow = '<td>' + ++stateNumber + '</td>';
        htmlRow += '<td>' + state[0] + '</td>';
        htmlRow += '<td>' + state[1] + '</td>';
        htmlRow += '<td>' + state[2] + '</td>';
        newRow.innerHTML = htmlRow;
        stateTable.appendChild(newRow);
}

// The good stuff goes here!
async function test() {
    // Get a random initial state
    let s = getRandomState();
    do {
        // CHeck if we already reached all possible states 
        // if we have, break out of the loop and tell the user
        // we are done.
        if (sList.length === 8) {
            break;
        }
        // A repeated state(one that we already reached)
        if (reached(s)) {
            let tmp = s;
            // Generate a new random state
            s = getRandomState();
      	    document.getElementById("log")
             .innerHTML+= `<br>state [${tmp}] already reached, generating a new state ... [${s}] randomly generated.`;
            // Try again(we could get the same state n times in a row...)
            continue;
        }
        // Local variables to get the next state
        let location = s[0];
        let state = location === "A" ? s[1] : s[2];
        // The agent function
        // Shuld return an action [CLEAN, LEFT, RIGHT] based on the current state
        let actionResult = reflex_agent(location, state);
        // Add the current state to the reached states list
        sList.push([s[0], s[1], s[2]]);
        // Show it in the table
        addStateToTable(s);
        // Show a log to the user
      	document.getElementById("log")
           .innerHTML+="<br>Location: "
           .concat(location).concat(" | Action: ")
           .concat(actionResult);
        // Compute the new state based on the action
      	if (actionResult === "CLEAN"){
        	if (location === "A") {
                s[1] = "CLEAN";
            }
         	else if (location === "B") {
                s[2] = "CLEAN";
            }
      	}
      	else if (actionResult === "RIGHT") {
            s[0] = "B";
        }
      	else if (actionResult === "LEFT") {
            s[0] = "A";
        }
        // A 1 second delay for the user 
        await new Promise(r => setTimeout(r, 1000));        
    } while (true);
    // Tell the user we are done
    document.getElementById("log")
        .innerHTML+="<br>Done!";
}

// Here we go
test();