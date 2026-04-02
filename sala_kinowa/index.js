const seatsContainer = document.getElementById("seats")
let seats = [];
for(let i = 1; i <= 150; i++) {
    seats.push({id: i, status: "free"});
    const seatElement = document.createElement("div");
    seatElement.classList.add("seat", "free");
    seatElement.textContent = i;
    seatElement.addEventListener("click", function(event) {
        let clickedSeat = seats[i-1];
        if (clickedSeat.status === "reserved") {
            return;
        }
        if (clickedSeat.status === "free") {
            let selectedCount = seats.filter(seat => seat.status === "selected").length;
            if (selectedCount >= 5) {
                alert("Możesz wybrać maksymalnie 5 miejsc!");
                return;
            }
            clickedSeat.status = "selected";
            seatElement.classList.remove("free");
            seatElement.classList.add("selected");
        } else {
            clickedSeat.status = "free";
            seatElement.classList.remove("selected");
            seatElement.classList.add("free");
        }
        updateSeats();
    })
    seatsContainer.appendChild(seatElement); // dodanie do kontenera z siedzeniami elementu seatElement
}

updateSeats();

function updateSeats() {
    let selectedCount = seats.filter(seat => seat.status === "selected").length;
    let freeCount = seats.filter(seat => seat.status === "free").length;
    let reservedCount = seats.filter(seat => seat.status === "reserved").length;

    document.getElementById("stat_selected").textContent = selectedCount;
    document.getElementById("free_seats").textContent = freeCount;
    document.getElementById("stat_reserved").textContent = reservedCount;

    let selectedSeats = seats.filter(seat => seat.status === "selected");

    for (let j = 1; j <= 5; j++){
        let slotSelect = document.getElementById("ticket_type_" + j);
        let slotInfo = document.querySelector("#slot" + j + " .seat-info");

        if(j <= selectedSeats.length){
            slotSelect.disabled = false;
            slotInfo.textContent = "Miejsce: " + selectedSeats[j-1].id;
        } else {
            slotSelect.disabled = true;
            slotSelect.value = "";
            slotInfo.textContent = "Wybierz miejsce";
        }
    }
}

const prices = new Map([
    ["free", 0],
    ["reduced", 10],
    ["student", 15],
    ["standard", 20]
]);

function calculatePrice(){
    let sum = 0;
    let selectedCount = seats.filter(seat => seat.status === "selected").length;
    for (let j = 1; j <= 5; j++){
        let slotSelect = document.getElementById("ticket_type_" + j);

        if(j <= selectedCount && slotSelect.value !== ""){
                sum+= prices.get(slotSelect.value);
        }
    }
    document.getElementById("stat_price").textContent = sum;
}
document.getElementById("form").addEventListener("change", calculatePrice);
console.log("Cinema seats:", seats);
const form = document.getElementById("form");
form.addEventListener("submit", function(event){
    event.preventDefault();
    console.log("Form submitted");
});