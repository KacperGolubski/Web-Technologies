const seatsContainer = document.getElementById("seats")
let seats = [];
for(let i = 1; i <= 150; i++) {
    seats.push({id: i, status: "free"});
    const seatElement = document.createElement("div");
    seatElement.classList.add("seat", "free");
    seatElement.textContent = i;
    seatsContainer.appendChild(seatElement);
}
console.log("Cinema seats:", seats);
const form = document.getElementById("form");
form.addEventListener("submit", function(event){
    event.preventDefault();
    console.log("Form submitted");
});