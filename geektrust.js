const fs = require('fs');


let perPersonConsumption;
let unitCost;
let guestWaterConsumption = 0;
let corporationWaterSupply;
let borewellWaterSupply;
let guest = 0;
let data;

// 1. allot water function
let allotWater = (apartmentSize, corporationWaterSupply, borewellWaterSupply) => {

    corporationWaterSupply = Number(corporationWaterSupply)
    borewellWaterSupply = Number(borewellWaterSupply)

    if (apartmentSize == 2) {
        perPersonConsumption = 900;
    } else if (apartmentSize == 3) {
        perPersonConsumption = 1500;
    }

    unitCost = perPersonConsumption / (corporationWaterSupply + borewellWaterSupply);
};

// 2. add guest function
let addGuests = (g) => {
    guest += g;
    guestWaterConsumption = guest * 10 * 30;
};

// 3. calculate bill function
let bill = () => {
    let guestBill = 0;
    if (guestWaterConsumption > 0) {
        guestBill = guestWaterConsumption * 2;
    }

    if (guestWaterConsumption > 500) {
        guestBill = 500 * 2 + (guestWaterConsumption - 500) * 3;
    }

    if (guestWaterConsumption > 1500) {
        guestBill = 500 * 2 + 1000 * 3 + (guestWaterConsumption - 1500) * 5;
    }

    if (guestWaterConsumption > 3000) {
        guestBill = 500 * 2 + 1000 * 3 + 1500 * 5 + (guestWaterConsumption - 3000) * 8;
    }

    // getting the ceil value for roundig off
    let totalBill = Math.ceil(
        (unitCost * corporationWaterSupply * 1) +
        (unitCost * borewellWaterSupply * 1.5) +
        guestBill);


    let totalWater = (unitCost * corporationWaterSupply) +
        (unitCost * borewellWaterSupply) +
        (guestWaterConsumption);
        totalWater = Math.round(totalWater);

    return `${totalWater} ${totalBill}`;
}



// runner function.
let runner = (input) =>{
    input = input.trim().split('\n');

    // iterating over the input array
    for (let i = 0; i < input.length; i++) {
        let inputCommand = input[i].trim().split(" ");

        if (inputCommand[0] == 'ALLOT_WATER') {
            let apartmentSize = Number(inputCommand[1]);
            let ratio = inputCommand[2].split(':');
            corporationWaterSupply = ratio[0];
            borewellWaterSupply = ratio[1];
            allotWater(apartmentSize, corporationWaterSupply, borewellWaterSupply);
        } 

        else if (inputCommand[0] == 'ADD_GUESTS') {
            let guest = Number(inputCommand[1]);
            addGuests(guest);
        } 

        else if (inputCommand[0] == 'BILL') {
            console.log(bill());
        }
    }
}

// using fs module to readfile and sending input string to runner function
data = fs.readFileSync(process.argv[2]).toString();
runner(data);
