async function searchCard() {

    const cert = document.getElementById("cert").value.trim();

    const result = document.getElementById("result");

    try {

        const response = await fetch("cards.json");
        const cards = await response.json();

        const card = cards.find(c => c.cert === cert);

        if (card) {

            let notes = "";

            for (let note of card.notes) {
                notes += `<li>${note}</li>`;
            }

            result.innerHTML = `
                <h2>Certification #${card.cert}</h2>

                <img src="${card.image}" width="250">

                <h3>${card.player}</h3>

                <p><b>Year:</b> ${card.year}</p>
                <p><b>Brand:</b> ${card.brand}</p>
                <p><b>Set:</b> ${card.set}</p>
                <p><b>Card #:</b> ${card.number}</p>

                <h2>${card.grade}</h2>

                <h3>Notes</h3>

                <ul>${notes}</ul>
            `;

        } else {

            result.innerHTML = "<h2>Certification Not Found</h2>";

        }

    } catch (error) {

        result.innerHTML = "<h2>Error loading card database.</h2>";

        console.error(error);

    }

}
[
  {
    "cert": "001",
    "player": "Ozzie Guillen",
    "year": "1989",
    "brand": "Donruss",
    "set": "MVP",
    "number": "BC-23",
    "grade": "EX5",
    "notes": [
      "Red stain on back",
      "2 factory print dots"
    ],
    "image": "images/001.jpg"
  }
]
function calculatePrice() {

    let cards = parseInt(document.getElementById("cardCount").value);

    if (isNaN(cards) || cards < 1) {
        cards = 1;
    }

    let pricePerCard = 15;

    if (cards >= 3) {
        pricePerCard = 13;
    }

    let total = cards * pricePerCard;

    document.getElementById("totalPrice").innerHTML =
        `Total Price: <strong>$${total}</strong>`;
}
