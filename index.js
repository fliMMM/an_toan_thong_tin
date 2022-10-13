const key = document.getElementById("key");
const enBtn = document.getElementById("en");
const deBtn = document.getElementById("de");
const clearBtn = document.getElementById("clear");
const cipherTextField = document.getElementById("cipherText");
const plainTextField = document.getElementById("plainText");
const types = document.getElementById("types");

const LETTERS = "ABCDEFGHJKLMNOPQRSTUVWXYZ".split("");

types.addEventListener("change", () => {
  plainTextField.value = "";
  cipherTextField.value = "";
  key.value = "";
});
clear.addEventListener("click", () => {
  plainTextField.value = "";
  cipherTextField.value = "";
  key.value = "";
});

//Caesar
function CaesarEncrypt(plainText, cipherText, key) {
  key = parseInt(key);
  plainText = plainText.split("");
  const result = [];
  for (let i = 0; i < plainText.length; i++) {
    const index = LETTERS.indexOf(plainText[i]);
    const pos = (index + key) % 26;
    result.push(LETTERS[pos]);
  }
  cipherTextField.value = result.join("");
}
function CaesarDecrypt(plainText, cipherText, key) {
  key = parseInt(key);
  plainText = cipherText.split("");
  const result = [];
  for (let i = 0; i < cipherText.length; i++) {
    const index = LETTERS.indexOf(plainText[i]);
    const pos = (index - key) % 26;
    result.push(LETTERS[pos]);
  }
  plainTextField.value = result.join("");
}

//PlayFair
function PlayFairEncrypt(plainText, cipherText, key) {
  plainText = plainText.split("");
  key = key.split("");
  for (let i = 0; i < plainText.length; i++) {
    if (plainText[i] === plainText[i - 1]) plainText[i] = "X";
  }
  let keyArray = [];
  for (let i = 0; i < key.length; i++) {
    keyArray.push(key[i]);
  }

  for (let j = 0; j < LETTERS.length; j++) {
    const index = key.indexOf(LETTERS[j]);
    if (index === -1) {
      keyArray.push(LETTERS[j]);
    }
  }

  const newArr = [];
  while (keyArray.length) newArr.push(keyArray.splice(0, 5));
  keyArray = newArr;

  console.log("keyArray: ", keyArray);
}

// function BruteForce(plainText) {
//   plainText = plainText.split("");

//   for (let j = 1; j <= 26; j++) {
//     const result = [];
//     for (let i = 0; i < plainText.length; i++) {
//       const index = LETTERS.indexOf(plainText[i]);
//       let pos = (index - j) % 26;
//       if(index-j < 0){
//         pos = (index - j + 26) % 26;
//       }
//       result.push(LETTERS[pos]);
//     }
//     console.log(result.join(""));
//   }
// }

function Encrypt(plainText, cipherText, key) {
  switch (types.value) {
    case "Caesar":
      CaesarEncrypt(plainText, cipherText, key);
      break;
    case "PlayFair":
      PlayFairEncrypt(plainText, cipherText, key);
      break;
    default:
      console.log("nothing");
      break;
  }
}

function Decrypt(plainText, cipherText, key) {
  switch (types.value) {
    case "Caesar":
      CaesarDecrypt(plainText, cipherText, key);
      break;
    default:
      console.log("nothing");
      break;
  }
}

enBtn.addEventListener("click", () => {
  Encrypt(plainText.value, cipherText.value, key.value);
});
deBtn.addEventListener("click", () => {
  Decrypt(plainText.value, cipherText.value, key.value);
});
