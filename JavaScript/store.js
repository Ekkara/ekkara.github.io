import {bankMod} from "./bank.js";
//store base URL
const source = "https://hickory-quilled-actress.glitch.me";

const laptopsElement = document.getElementById("selectPC");
const priceElement = document.getElementById("PCPrice");
const nameElement = document.getElementById("PCName");
const descriptionElement = document.getElementById("PCDescription");
const specsElement = document.getElementById("PCSpecs");
const imageElement = document.getElementById("PCImage");
const buyButton = document.getElementById("BuyButton");

let laptops = [];

//store computers just as we did with drinks
fetch(source + "/computers")
  .then((response) => response.json())
  .then((data) => (laptops = data))
  .then((laptops) => addLaptopsToMenu(laptops));

//add all individually drinks
const addLaptopsToMenu = (laptops) => {
  laptops.forEach((PC) => {
    const laptopElement = document.createElement("option");
    laptopElement.value = PC.id;
    laptopElement.appendChild(document.createTextNode(PC.title));
    laptopsElement.appendChild(laptopElement);
  });

  //display price of first item
  updateStoreView(laptops[0]);
};

const handlePCMenuChange = (e) => {
  const selectedPC = laptops[e.target.selectedIndex];
  updateStoreView(selectedPC);
};
laptopsElement.addEventListener("change", handlePCMenuChange);

const updateStoreView = async (selectedPC) => {
  //update simple text values
  priceElement.innerText = selectedPC.price + "kr";
  nameElement.innerText = selectedPC.title;
  descriptionElement.innerText = selectedPC.description;

  //for every element in specs add a line with that data
  specsElement.innerText = (() => {
    let str = "";
    for (let i = 0; i < selectedPC.specs.length; i++) {
      str += selectedPC.specs[i] + "\n";
    }
    return str;
  })(); //an alternative solution potentially better solution could be to add elements in a
  //ul similar to the drink example, and then hide the dots with css

  /*specsElement.innerHTML = "";
  for (let i = 0; i < selectedPC.specs.length; i++) {
    const specElement = document.createElement("option");
    specElement.appendChild(document.createTextNode(selectedPC.specs[i]));
    specsElement.appendChild(specElement);
  }*/

  //the reason i don't use this is that the text element handle out of element way better and isn't place under the image

  //default location for the image
  let imgPath = `${source}/${selectedPC.image}`;

  //this code assumes that the data type is only defined by three letters like jpg and png
  //since we only work with jpg and png i thought this would suffice
  //this removes the file format
  imgPath = imgPath.split(".").slice(0, -1).join(".");
  const supportedFileFormats = ["jpg", "png"];

  //loop through all (two) file-formats and see if a img is accessible
  async function getImage() {
    for (let i = 0; i < supportedFileFormats.length; i++) {
      let photo = await fetch(`${imgPath}.${supportedFileFormats[i]}`);
      if (photo.ok) {
        return `${imgPath}.${supportedFileFormats[i]}`;
      }
    }
    return "/resources/Images/fallbackImage.jpg";
  }

  //get and assign image with function above
  const photoURL = await getImage();
  imageElement.src = photoURL;
};

const attemptToBuy = () => {
  //get displayed pc
  const PC = laptops[laptopsElement.value - 1];

  //see if user can afford the PC, display different prompt accordingly
  if (bankMod.getBalance() >= PC.price) {
    /*bankBalance -= PC.price;
    bankBalanceElement.innerText = bankBalance + "kr";*/
    bankMod.withdraw(PC.price)

    alert(
      `Congratulations on your purchase! you are now a proud owner of ${PC.title}!`
    );
  } else {
    alert(
      `insufficient funds, you currently lack ${
        PC.price - bankMod.getBalance()
      } to purchase this PC!`
    );
  }
};
buyButton.addEventListener("click", attemptToBuy);

export const storeMod = {
  attemptToBuy,
  updateStoreView,
  handlePCMenuChange
}