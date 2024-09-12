const url = "https://script.google.com/macros/s/AKfycbwbOgCs0bqb9GqZ8lfPsDcDaB9Xr48dR8Jsb_yfhbPJFa2m7y_xhYSR7vE7N7nkGljP/exec";

export async function getCards() {
    const res = await fetch(url);
    const json = await res.json();
    const cards = json.filter((card) => {
        return card["name"] != "";
    });
    // console.table(cards);
    return JSON.stringify(cards);
}
