const container = document.querySelector("#container");
const modal = document.querySelector("#modal");
const modal2 = document.querySelector("#modal2");
// const modalcontent = document.querySelector("#content");
const modalcn = document.querySelector("#modal cn");
const modaljp = document.querySelector("#modal jp");
const modal2cn = document.querySelector("#modal2 cn");
const modal2jp = document.querySelector("#modal2 jp");
const modalname = document.querySelector("#modal name");
const modal2name = document.querySelector("#modal2 name");
const load = document.querySelector("#load");
import { getCards } from "./gss.js";

//データ取得
let cards1 = localStorage.getItem("data");
if (cards1 == null) {
    cards1 = await getCards();
    localStorage.setItem("data", cards1);
    load.classList.add("hide");
} else {
    getCards().then((cards2) => {
        localStorage.setItem("data", cards2);
        if (cards1 != cards2) location.reload();
        load.classList.add("hide");
    });
}
const cards = JSON.parse(cards1);

class CARD {
    star_rare = {
        MR: 6,
        UR: 5,
        SR: 4,
        R: 3,
        N: 2,
    };
    constructor(data) {
        this.data = data;
        this.createCard(data);
        this.bind(data);
    }

    createCard(data) {
        this.card = document.createElement("card");
        this.card.style.backgroundImage = `url("./asset/${data.name}.png")`;
        container.appendChild(this.card);
        const nostar = this.star_rare[data.rarity] - data.star;
        this.createType(this.card, data.type);
        this.createStars(this.card, data.star, nostar);
    }
    createStars(dom, x, y) {
        const stars = document.createElement("stars");
        dom.appendChild(stars);
        for (let i = 0; i < x; i++) {
            const star = document.createElement("star");
            stars.appendChild(star);
        }
        for (let i = 0; i < y; i++) {
            const nostar = document.createElement("nostar");
            stars.appendChild(nostar);
        }
    }
    createType(dom, type) {
        const typeDom = document.createElement("type");

        typeDom.classList.add(type);
        dom.appendChild(typeDom);
    }

    //modal書き込み
    bind(data) {
        this.card.addEventListener("click", () => {
            const words = {};
            const wordsjp = {};
            let skill1cn = data.skill1cn;
            let skill1jp = data.skill1jp;
            for (const line of data.notecn.split("\n")) {
                const word = line.split("：")[0];
                words[word] = line.split("：")[1];
                skill1cn = skill1cn.replace(word, "<span>" + word + "</span>");
            }
            for (const line of data.notejp.split("\n")) {
                const word = line.split("：")[0];
                wordsjp[word] = line.split("：")[1];
                skill1jp = skill1jp.replace(word, "<span>" + word + "</span>");
            }

            modalcn.innerHTML = skill1cn;
            modaljp.innerHTML = skill1jp;
            modalname.innerText = data.name;

            modal.querySelectorAll("span").forEach((ele) => {
                ele.addEventListener("click", (e) => {
                    const word = e.target.innerText;
                    modal2.classList.toggle("visible");
                    modal2cn.innerText = words[word];
                    modal2jp.innerText = wordsjp[word];
                    modal2name.innerText = word;
                });
            });

            modal.classList.toggle("visible");
        });
    }
}
modal.addEventListener("click", (e) => {
    if (e.target.id == "modal") modal.classList.toggle("visible");
    if (e.target.id == "modal2") modal2.classList.toggle("visible");
});
modal2.addEventListener("click", (e) => {
    if (e.target.id == "modal2") modal2.classList.toggle("visible");
});

//カード生成
const CARDS = [];
for (const card of cards) {
    CARDS.push(new CARD(card));
}

//しぼりこみ
const form = document.querySelector("#form");
const selectJob = document.querySelector("#job");
const selectType = document.querySelector("#type");
const selectRare = document.querySelector("#rarity");
const selectCost = document.querySelector("#cost");
form.addEventListener("change", () => {
    for (const card of CARDS) {
        card.card.classList.remove("hide");
        if (selectJob.value && card.data.job != selectJob.value) card.card.classList.add("hide");
        if (selectType.value && card.data.type != selectType.value) card.card.classList.add("hide");
        if (selectRare.value && card.data.rarity != selectRare.value) card.card.classList.add("hide");
        if (selectCost.value && card.data.cost != selectCost.value) card.card.classList.add("hide");
    }
});
