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

                <img src="${card.image}" width="250" alt="${card.player}">

                <h3>${card.player}</h3>

                <p><strong>Year:</strong> ${card.year}</p>
                <p><strong>Brand:</strong> ${card.brand}</p>
                <p><strong>Set:</strong> ${card.set}</p>
                <p><strong>Card #:</strong> ${card.number}</p>

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
    let savings = 0;

    if (cards >= 3) {
        savings = cards * 2;
    }

    document.getElementById("totalPrice").innerHTML = `
        <h2>Total: $${total}</h2>
        <p>Price per card: $${pricePerCard}</p>
        ${savings > 0 ? `<p style="color:green;"><strong>You saved $${savings}!</strong></p>` : ""}
    `;
}
