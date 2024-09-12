const url = "https://script.google.com/macros/s/AKfycbwUmZQfsRClXOYh7tx51uX06cLfymYIU0l7-3odgpWM2s_SmpGkzTCyQ5ZHKQwab3xP/exec";

export async function getCards() {
    const res = await fetch(url);
    const json = await res.json();
    const cards = json.filter((card) => {
        return card["name"] != "";
    });
    // console.table(cards);
    return JSON.stringify(cards);
}
