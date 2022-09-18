const product = {
    plainBurger: {
        name: "Гамбургер простой",
        price: 10000,
        kcall: 400,
        amount: 0,
        get summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        },
    },
    freshBurger: {
        name: "Гамбургер FRESH",
        price: 20500,
        kcall: 500,
        amount: 0,
        get summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        },
    },
    freshCombo: {
        name: "FRESH COMBO",
        price: 31900,
        kcall: 700,
        amount: 0,
        get summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        },
    },
};

const extraProduct = {
    doubleMayonnaise: {
        name: "Двойной майонез",
        price: 500,
        kcall: 50,
    },
    lettuce: {
        name: " Салатный лист",
        price: 300,
        kcall: 10,
    },
    cheese: {
        name: "Сыр",
        price: 400,
        kcall: 30,
    },
};
const btnPlusorMinus = document.querySelectorAll(".main__product-btn"),
    checkExtraProduct = document.querySelectorAll(".main__product-checkbox"),
    addCart = document.querySelector(".addCart"),
    receipt = document.querySelector(".receipt"),
    receiptOut = document.querySelector(".receipt__window-out"),
    receiptWindow = document.querySelector(".receipt__window"),
    recepitBtn = document.querySelector(".receipt__window-btn");

for (let i = 0; i < btnPlusorMinus.length; i++) {
    btnPlusorMinus[i].addEventListener("click", function() {
        PlusorMinus(this);
    });
}

function PlusorMinus(element) {
    let parentID = element.closest(".main__product").getAttribute("id"),
        out = element.closest(".main__product").querySelector(".main__product-num"),
        price = element
        .closest(".main__product")
        .querySelector(".main__product-price span"),
        kcall = element
        .closest(".main__product")
        .querySelector(".main__product-call span");

    if (
        element.getAttribute("data-symbol") == "+" &&
        product[parentID].amount < 50
    ) {
        product[parentID].amount++;
    } else if (
        element.getAttribute("data-symbol") == "-" &&
        product[parentID].amount > 0
    ) {
        product[parentID].amount--;
    }

    out.innerHTML = product[parentID].amount;
    price.innerHTML = product[parentID].summ;
    kcall.innerHTML = product[parentID].Kcall;
}

for (let i = 0; i < checkExtraProduct.length; i++) {
    checkExtraProduct[i].addEventListener("click", function() {
        addextraProduct(this);
    });
}

function addextraProduct(element) {
    const parent = element.closest(".main__product"),
        parentID = parent.getAttribute("id"),
        kcall = parent.querySelector(".main__product-call span"),
        price = parent.querySelector(".main__product-price span"),
        elArt = element.getAttribute("data-extra");
    product[parentID][elArt] = element.checked;

    if (product[parentID][elArt] == true) {
        product[parentID].kcall += extraProduct[elArt].kcall;
        product[parentID].price += extraProduct[elArt].price;
    } else {
        product[parentID].kcall -= extraProduct[elArt].kcall;
        product[parentID].price -= extraProduct[elArt].price;
    }
    kcall.innerHTML = product[parentID].Kcall;
    price.innerHTML = product[parentID].summ;
}

let arrayProduct = [],
    totalName = "",
    totalPrice = 0,
    totalKcall = 0;

addCart.addEventListener("click", function() {
    for (const key in product) {
        const po = product[key];

        if (po.amount > 0) {
            arrayProduct.push(po);
            for (const infoKey in po) {
                if (po[infoKey] === true) {
                    po.name += extraProduct[infoKey].name;
                }
            }
        }
        po.price = po.summ;
        po.kcall = po.Kcall;
    }

    for (let i = 0; i < arrayProduct.length; i++) {
        const el = arrayProduct[i];
        (totalPrice += el.price), (totalKcall += el.kcall);
        totalName += "\n" + el.name + "\n";
    }
    receiptOut.innerHTML = `siz sotib oldingiz: \n ${totalName} \n Kal ${totalKcall} \n \n Narxi ${totalPrice}  som`;

    receipt.style.display = "flex";

    setTimeout(function() {
        receipt.style.opacity = "1";
    }, 1000);

    setTimeout(function() {
        receiptWindow.style.top = "0";
    }, 200);

    document.body.style.overflow = "hidden";

    const outNum = document.querySelectorAll(".main__product-num");
    for (let i = 0; i < outNum.length; i++) {
        outNum[i], (innerHTML = 0);
    }
    const outprice = document.querySelectorAll(".main__product-price span");
    for (let i = 0; i < outprice.length; i++) {
        outprice[i], (innerHTML = 0);
    }
    const outkcall = document.querySelectorAll(".main__product-call span");
    for (let i = 0; i < outkcall.length; i++) {
        outkcall[i], (innerHTML = 0);
    }

    recepitBtn.addEventListener("click", function() {
        location.reload();
    });
});