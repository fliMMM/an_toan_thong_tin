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
  key = key.split("");

  //Tách cặp
  plainText = plainText.split("");
  for (let i = 0; i < plainText.length; i++) {
    if (plainText[i] === plainText[i - 1]) plainText[i] = "X";
  }
  if (plainText.length % 2 === 1) plainText.push("X");
  const newPlainText = [];
  while (plainText.length) newPlainText.push(plainText.splice(0, 2));
  plainText = [...newPlainText];

  //Tạo key array
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
  keyArray = [...newArr];

  //Đảo key aray
  const newArrayKey = [];
  for (let i = 0; i < 5; i++) {
    const temp = [];
    for (let k = 0; k < 5; k++) {
      temp.push(keyArray[k][i]);
    }
    newArrayKey.push(temp);
  }

  console.log("keyArray: ", keyArray);
  console.log("plainText:", plainText);

  let _index = 0;

  //Hang ngang
  for (let i = 0; i < keyArray.length; i++) {
    for (let j = 0; j < plainText.length; j++) {
      if (
        keyArray[i].indexOf(plainText[j][0]) !== -1 &&
        keyArray[i].indexOf(plainText[j][1]) !== -1
      ) {
        _index++;
        for (let u = 0; u < 2; u++) {
          const index = keyArray[i].indexOf(plainText[j][u]);
          if (index + 1 > keyArray[i].length - 1) {
            plainText[j][u] = keyArray[i][0];
          } else {
            plainText[j][u] = keyArray[i][index + 1];
          }
        }
      }
    }
  }

  //Hang doc
  for (let i = 0; i < newArrayKey.length; i++) {
    for (let j = 0; j < plainText.length; j++) {
      if (
        newArrayKey[i].indexOf(plainText[j][0]) !== -1 &&
        newArrayKey[i].indexOf(plainText[j][1]) !== -1
      ) {
        _index++;
        for (let u = 0; u < 2; u++) {
          const index = newArrayKey[i].indexOf(plainText[j][u]);
          if (index + 1 > newArrayKey[i].length - 1) {
            plainText[j][u] = newArrayKey[i][0];
          } else {
            plainText[j][u] = newArrayKey[i][index + 1];
          }
        }
      }
    }
  }

  // hinh chu nhat
  const temp = [];
  for (let i = 0; i < plainText.length; i++) {
    const _temp = [];
    for (let j = 0; j < plainText[i].length; j++) {
      _temp.push(plainText[i][j]);
    }
    temp.push(_temp);
  }

  for (let p = _index; p < plainText.length; p++) {
    let X1 = null,
      X2 = null,
      Y1 = null,
      Y2 = null;
    for (let j = 0; j < 5; j++) {
      if (keyArray[j].indexOf(plainText[p][0]) !== -1) {
        Y1 = keyArray[j].indexOf(plainText[p][0]);
        X1 = j;
        
      }

      if (keyArray[j].indexOf(plainText[p][1]) !== -1) {
        Y2 = keyArray[j].indexOf(plainText[p][1]);
        X2 = j;
      }
    }
    temp[p][1] = keyArray[X2][Y1]
    temp[p][0] = keyArray[X1][Y2]
  }

  console.log("keyArray: ", keyArray);
  console.log("plainText:", temp);
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
