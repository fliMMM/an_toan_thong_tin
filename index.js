const key = document.getElementById("key");
const enBtn = document.getElementById("en");
const deBtn = document.getElementById("de");
const clearBtn = document.getElementById("clear");
const cipherTextField = document.getElementById("cipherText");
const plainTextField = document.getElementById("plainText");
const types = document.getElementById("types");

const LETTERS = "ABCDEFGHJKLMNOPQRSTUVWXYZ".split("");
const HILLLETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase().split("");

const hillKey = [
  [17, 17, 5],
  [21, 18, 21],
  [2, 2, 19],
];
const hillKeyNghichDao = [
  [4, 9, 15],
  [15, 17, 6],
  [24, 0, 17],
];

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
    if (plainText[i] === plainText[i - 1]) plainText.splice(i, 0, "X");
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
    temp[p][1] = keyArray[X2][Y1];
    temp[p][0] = keyArray[X1][Y2];
  }

  console.log("keyArray: ", keyArray);
  console.log("plainText:", temp);
  cipherTextField.value = temp.join("");
}

function PlayFairDecrypt(plainText, cipherText, key) {
  key = key.split("");

  //Tách cặp
  cipherText = cipherText.split("");
  const newcipherText = [];
  while (cipherText.length) newcipherText.push(cipherText.splice(0, 2));
  cipherText = [...newcipherText];
  console.log(newcipherText);

  //Tạo key array
  let keyArray = [];
  for (let i = 0; i < key.length; i++) {
    keyArray.push(key[i]);
  }

  for (let j = 0; j < LETTERS.length; j++) {
    if (key.indexOf(LETTERS[j]) === -1) {
      keyArray.push(LETTERS[j]);
    }
  }

  const newArr = [];
  while (keyArray.length) newArr.push(keyArray.splice(0, 5));
  keyArray = [...newArr];
  console.log(keyArray);

  //Đảo key aray
  const newArrayKey = [];
  for (let i = 0; i < 5; i++) {
    const temp = [];
    for (let k = 0; k < 5; k++) {
      temp.push(keyArray[k][i]);
    }
    newArrayKey.push(temp);
  }

  // console.log("keyArray: ", keyArray);
  // console.log("plainText:", plainText);

  let _index = 0;

  //Hang ngang
  for (let i = 0; i < keyArray.length; i++) {
    for (let j = 0; j < cipherText.length; j++) {
      if (
        keyArray[i].indexOf(cipherText[j][0]) !== -1 &&
        keyArray[i].indexOf(cipherText[j][1]) !== -1
      ) {
        _index++;
        for (let u = 0; u < 2; u++) {
          const index = keyArray[i].indexOf(cipherText[j][u]);
          if (index == 0) {
            cipherText[j][u] = keyArray[i][4];
          } else {
            cipherText[j][u] = keyArray[i][index - 1];
          }
        }
      }
    }
  }

  //Hang doc
  for (let i = 0; i < newArrayKey.length; i++) {
    for (let j = 0; j < cipherText.length; j++) {
      if (
        newArrayKey[i].indexOf(cipherText[j][0]) !== -1 &&
        newArrayKey[i].indexOf(cipherText[j][1]) !== -1
      ) {
        _index++;
        for (let u = 0; u < 2; u++) {
          const index = newArrayKey[i].indexOf(cipherText[j][u]);
          if (index == 0) {
            cipherText[j][u] = newArrayKey[i][4];
          } else {
            cipherText[j][u] = newArrayKey[i][index - 1];
          }
        }
      }
    }
  }

  // hinh chu nhat
  let temp = [];
  for (let i = 0; i < cipherText.length; i++) {
    const _temp = [];
    for (let j = 0; j < cipherText[i].length; j++) {
      _temp.push(cipherText[i][j]);
    }
    temp.push(_temp);
  }

  for (let p = _index; p < cipherText.length; p++) {
    let X1 = null,
      X2 = null,
      Y1 = null,
      Y2 = null;
    for (let j = 0; j < 5; j++) {
      if (keyArray[j].indexOf(cipherText[p][0]) !== -1) {
        Y1 = keyArray[j].indexOf(cipherText[p][0]);
        X1 = j;
      }

      if (keyArray[j].indexOf(cipherText[p][1]) !== -1) {
        Y2 = keyArray[j].indexOf(cipherText[p][1]);
        X2 = j;
      }
    }
    temp[p][1] = keyArray[X1][Y1];
    temp[p][0] = keyArray[X2][Y2];
  }

  // console.log("keyArray: ", keyArray);
  //console.log("cipherText:", temp);
  for (let i = 0; i < temp.length; i++) {
    for (let j = 0; j < temp[i].length; j++) {
      if (temp[i][j] === "X") {
        temp[i][j] = "";
      }
    }
  }

  plainTextField.value = temp.join("");
}

//Hill
function HillEncrypt(plainText, cipherText, key) {
  //Tách cặp
  plainText = plainText.split("");
  const newPlainText = [];
  while (plainText.length) newPlainText.push(plainText.splice(0, 3));
  plainText = [...newPlainText];

  if (plainText[plainText.length - 1].length < 3) {
    const lastLetter =
      plainText[plainText.length - 1][
        plainText[plainText.length - 1].length - 1
      ];
    //console.log(lastLetter);
    for (let i = 0; i <= 3 - plainText[plainText.length - 1].length; i++) {
      plainText[plainText.length - 1].push(lastLetter);
    }
  }

  console.log(plainText);

  //chuyen plaintext sang ma tran so
  for (let i = 0; i < plainText.length; i++) {
    for (let j = 0; j < plainText[i].length; j++) {
      plainText[i][j] = HILLLETTERS.indexOf(plainText[i][j]);
    }
  }

  //encrypt
  const num_result = [];
  for (let k = 0; k < plainText.length; k++) {
    for (let i = 0; i < hillKey.length; i++) {
      let u = 0;
      let sum = 0;
      for (let j = 0; j < hillKey[i].length; j++) {
        sum += hillKey[i][j] * plainText[k][u];
        u++;
      }
      num_result.push(sum % 26);
    }
  }

  const cipherText_result = [];
  for (let i = 0; i < num_result.length; i++) {
    cipherText_result.push(HILLLETTERS[num_result[i]]);
  }

  //console.log(cipherText_result);
  cipherTextField.value = cipherText_result.join("");
}

function HillDecrypt(plainText, cipherText, key) {
  //Tách cặp
  cipherText = cipherText.split("");
  const newCipherText = [];
  while (cipherText.length) newCipherText.push(cipherText.splice(0, 3));
  cipherText = [...newCipherText];

  //chuyen cipherText sang ma tran so
  for (let i = 0; i < cipherText.length; i++) {
    for (let j = 0; j < cipherText[i].length; j++) {
      cipherText[i][j] = HILLLETTERS.indexOf(cipherText[i][j]);
    }
  }

  //dencrypt
  const num_result = [];
  for (let k = 0; k < cipherText.length; k++) {
    for (let i = 0; i < hillKey.length; i++) {
      let u = 0;
      let sum = 0;
      for (let j = 0; j < hillKey[i].length; j++) {
        sum += hillKeyNghichDao[i][j] * cipherText[k][u];
        u++;
      }
      num_result.push(sum % 26);
    }
  }

  const plainText_result = [];
  for (let i = 0; i < num_result.length; i++) {
    plainText_result.push(HILLLETTERS[num_result[i]]);
  }

  console.log(plainText_result);
  plainTextField.value = plainText_result.join("");
}
//VYBXCLNW
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

//wearediscoveredsaveyourself
//vigen
function VigenereEncrypt(plainText, cipherText, key) {
  key = key.split("");
  const m = key.length;
  plainText = plainText.split("");
  const newKey = [];
  if (key.length < plainText.length) {
    let j = 0;
    for (let i = key.length; i < plainText.length; i++) {
      newKey.push(key[j]);
      j++;
      if (j > key.length - 1) j = 0;
      console.log(newKey);
    }
    key = key.concat(newKey);
  }

  //encrypt
  const result = [];

  plainText = convertToNumArray(plainText);
  key = convertToNumArray(key);
  for (let i = 0; i < plainText.length; i++) {
    const index = (plainText[i] + key[i % m]) % HILLLETTERS.length;
    result.push(HILLLETTERS[index]);
  }

  cipherTextField.value = result.join("");
}
function VigenereDecrypt(plainText, cipherText, key) {
  key = key.split("");
  const m = key.length;
  cipherText = cipherText.split("");
  const newKey = [];
  if (key.length < cipherText.length) {
    let j = 0;
    for (let i = key.length; i < cipherText.length; i++) {
      newKey.push(key[j]);
      j++;
      if (j > key.length - 1) j = 0;
    }
    key = key.concat(newKey);
  }

  //encrypt
  const result = [];

  console.log(cipherText);
  cipherText = convertToNumArray(cipherText);
  key = convertToNumArray(key);
  console.log(cipherText);

  for (let i = 0; i < cipherText.length; i++) {
    if (cipherText[i] - key[i % m] > 0) {
      const index = (cipherText[i] - key[i % m]) % HILLLETTERS.length;
      console.log(HILLLETTERS[index]);
      console.log("index: ", index);
      result.push(HILLLETTERS[index]);
    } else {
      const index =
        (cipherText[i] - key[i % m] + HILLLETTERS.length) % HILLLETTERS.length;
      console.log(HILLLETTERS[index]);
      console.log("index: ", index);
      result.push(HILLLETTERS[index]);
    }
  }

  plainTextField.value = result.join("");
  console.log(m);
}

function convertToNumArray(letterArray) {
  const numArray = [];
  for (let i = 0; i < letterArray.length; i++) {
    numArray.push(HILLLETTERS.indexOf(letterArray[i]));
  }

  return numArray;
}

function VernamEncrypt(plainText, cipherText, key) {
  plainText = plainText.split("");
  key = key.split("");
  const newPlainText = [];
  const newKey = [];
  //to bin
  for (let i = 0; i < plainText.length; i++) {
    newPlainText.push(convertToBin(plainText[i]), 5);
  }
  for (let i = 0; i < plainText.length; i++) {
    newPlainText[i] = newPlainText[i].split("");
  }

  for (let i = 0; i < key.length; i++) {
    newKey.push(convertToBin(key[i]));
  }

  for (let i = 0; i < plainText.length; i++) {
    newKey[i] = newKey[i].split("");
  }

  //xor
  let result = [];
  for (let i = 0; i < newPlainText.length; i++) {
    for (let j = 0; j < newPlainText[i].length; j++) {
      result.push(XOR(newPlainText[i][j], newKey[i][j]));
    }
  }

  const newResult = [];
  while (result.length) newResult.push(result.splice(0, 5));
  result = [...newResult];

  //to letter
  const letters = [];
  for (let i = 0; i < result.length; i++) {
    letters.push(HILLLETTERS[binToDecimal(result[i])]);
  }

  cipherTextField.value = letters.join("");
}

function VernamDecrypt(plainText, cipherText, key) {
  cipherText = cipherText.split("");
  key = key.split("");
  const newCipherText = [];
  const newKey = [];

  //to bin
  for (let i = 0; i < cipherText.length; i++) {
    newCipherText.push(convertToBin(cipherText[i]), 5);
  }
  for (let i = 0; i < cipherText.length; i++) {
    newCipherText[i] = newCipherText[i].split("");
  }

  for (let i = 0; i < key.length; i++) {
    newKey.push(convertToBin(key[i]));
  }

  for (let i = 0; i < cipherText.length; i++) {
    newKey[i] = newKey[i].split("");
  }

  console.log(newCipherText);
  console.log(newKey);

  //xor
  let result = [];
  for (let i = 0; i < newCipherText.length; i++) {
    for (let j = 0; j < newCipherText[i].length; j++) {
      result.push(XOR(newCipherText[i][j], newKey[i][j]));
    }
  }

  console.log(result);

  const newResult = [];
  while (result.length) newResult.push(result.splice(0, 5));
  result = [...newResult];

  //to letter
  const letters = [];
  for (let i = 0; i < result.length; i++) {
    letters.push(HILLLETTERS[binToDecimal(result[i])]);
  }

  plainTextField.value = letters.join("");
}

function XOR(x, y) {
  if (x === "0" && y === "0") return 0;
  if (x === "0" && y === "1") return 1;
  if (x === "1" && y === "0") return 1;
  if (x === "1" && y === "1") return 0;
}

function convertToBin(letter, num_bits) {
  //let index = HILLLETTERS.indexOf(letter);
  if (letter === 0) return "0000";
  const bin = [];
  while (letter !== 1) {
    bin.push(letter % 2);
    letter = Math.floor(letter / 2);
  }
  bin.push("1");

  while (bin.length < num_bits) {
    bin.push("0");
  }

  return bin.reverse().join("");
}

function binToDecimal(numbers) {
  let sum = 0;
  numbers = numbers.reverse();
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] === 1) {
      sum += Math.pow(2, i);
    }
    if (sum > 26) sum -= 26;
  }

  return sum;
}

let PC1 = [
  57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35,
  27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38,
  30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4,
];
PC1 = PC1.map((e) => e - 1);

let hoanViKetThuc = [
  40, 8, 48, 16, 56, 24, 64, 32, 39, 7, 47, 15, 55, 23, 63, 31, 38, 6, 46, 14,
  54, 22, 62, 30, 37, 5, 45, 13, 53, 21, 61, 29, 36, 4, 44, 12, 52, 20, 60, 28,
  35, 3, 43, 11, 51, 19, 59, 27, 34, 2, 42, 10, 50, 18, 58, 26, 33, 1, 41, 9,
  49, 17, 57, 25,
];
hoanViKetThuc = hoanViKetThuc.map((e) => e - 1);

let hoanViKhoiTao = [
  58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4, 62, 54, 46, 38,
  30, 22, 14, 6, 64, 56, 48, 40, 32, 24, 16, 8, 57, 49, 41, 33, 25, 17, 9, 1,
  59, 51, 43, 35, 27, 19, 11, 3, 61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39,
  31, 23, 15, 7,
];
hoanViKhoiTao = hoanViKhoiTao.map((e) => e - 1);

let PC2 = [
  14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27,
  20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34,
  53, 46, 42, 50, 36, 29, 32,
];
PC2 = PC2.map((e) => e - 1);

const Numer_LeftSift_Table = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];

let bang_mo_rong_nua_phai = [
  32, 1, 2, 3, 4, 5, 4, 5, 6, 7, 8, 9, 8, 9, 10, 11, 12, 13, 12, 13, 14, 15, 16,
  17, 16, 17, 18, 19, 20, 21, 20, 21, 22, 23, 24, 25, 24, 25, 26, 27, 28, 29,
  28, 29, 30, 31, 32, 1,
];
bang_mo_rong_nua_phai = bang_mo_rong_nua_phai.map((e) => e - 1);

const SBox = [
  [
    [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
    [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
    [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
    [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13],
  ],

  [
    [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
    [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
    [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
    [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9],
  ],

  [
    [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
    [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
    [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
    [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12],
  ],

  [
    [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
    [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
    [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
    [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14],
  ],

  [
    [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
    [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
    [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
    [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3],
  ],

  [
    [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
    [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
    [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
    [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13],
  ],

  [
    [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
    [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
    [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
    [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12],
  ],

  [
    [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
    [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
    [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
    [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11],
  ],
];

let P = [
  16, 7, 20, 21, 29, 12, 28, 17, 1, 15, 23, 26, 5, 18, 31, 10, 2, 8, 24, 14, 32,
  27, 3, 9, 19, 13, 30, 6, 22, 11, 4, 25,
];
P = P.map((e) => e - 1);

const convertHexToDec = (text) => {
  switch (text) {
    case "A":
      return 10;
    case "B":
      return 11;
    case "C":
      return 12;
    case "D":
      return 13;
    case "E":
      return 14;
    case "F":
      return 15;
    default:
      return parseInt(text);
  }
};
const convertDecToHex = (text) => {
  switch (text) {
    case 10:
      return "A";
    case 11:
      return "B";
    case 12:
      return "C";
    case 13:
      return "D";
    case 14:
      return "E";
    case 15:
      return "F";
    default:
      return parseInt(text);
  }
};

const BinToDec = (BinArray) => {
  const temp = BinArray.reverse();
  let result = 0;
  for (let i = 0; i < temp.length; i++) {
    result += Math.pow(2, i) * temp[i];
  }
  return result;
};

function genFinalKeyDes(key) {
  const newKey = [];
  while (key.length) newKey.push(key.splice(0, 2));
  key = [...newKey];

  const key_64bit = [];
  for (let i = 0; i < key.length; i++) {
    for (let j = 0; j < 2; j++) {
      key[i][j] = convertHexToDec(key[i][j]);
    }
  }

  for (let i = 0; i < key.length; i++) {
    const first = convertToBin(key[i][0], 4);
    const last = convertToBin(key[i][1], 4);
    key_64bit.push(first + last);
  }

  // console.log("key 64bit:", key_64bit);

  const KeyArray_1D_64bit = [];
  for (let i = 0; i < key_64bit.length; i++) {
    for (let j = 0; j < key_64bit[i].length; j++) {
      KeyArray_1D_64bit.push(parseInt(key_64bit[i][j]));
    }
  }

  // console.log("1D key array 64 bit: ", KeyArray_1D_64bit);
  // console.log("Hoan vi khoi tao: ", PC1);

  //gen PC1K
  let PC1K = [];
  for (let i = 0; i < PC1.length; i++) {
    PC1K.push(KeyArray_1D_64bit[PC1[i]]);
  }

  const newPC1K = [];
  while (PC1K.length) newPC1K.push(PC1K.splice(0, 28));
  PC1K = [...newPC1K];

  console.log("PC1K: ", PC1K);
  const SHiftLeftKey = [];
  for (let i = 0; i < 16; i++) {
    SHiftLeftKey.push(
      subKeyGenerate(PC1K[0], PC1K[1], Numer_LeftSift_Table[i])
    );
  }

  // console.log("Key sau khi dich trai: ", SHiftLeftKey);

  const finalKey = [];
  for (let i = 0; i < SHiftLeftKey.length; i++) {
    let temp = [];
    for (let j = 0; j < PC2.length; j++) {
      temp.push(SHiftLeftKey[i][PC2[j]]);
    }
    finalKey.push(temp);
  }

  return finalKey;
}

function genPlanTextDes(plainText) {
  const newPlainText = [];
  while (plainText.length) newPlainText.push(plainText.splice(0, 2));
  plainText = [...newPlainText];

  const plainText_64bit = [];
  for (let i = 0; i < plainText.length; i++) {
    for (let j = 0; j < 2; j++) {
      plainText[i][j] = convertHexToDec(plainText[i][j]);
    }
  }

  for (let i = 0; i < plainText.length; i++) {
    const first = convertToBin(plainText[i][0], 4);
    const last = convertToBin(plainText[i][1], 4);
    plainText_64bit.push(first + last);
  }

  // console.log("plainText 64bit:", plainText_64bit);

  const plainTextArray_1D_64bit = [];
  for (let i = 0; i < plainText_64bit.length; i++) {
    for (let j = 0; j < plainText_64bit[i].length; j++) {
      plainTextArray_1D_64bit.push(parseInt(plainText_64bit[i][j]));
    }
  }

  //gen plainText_after_permute
  let plainText_after_permute = [];
  for (let i = 0; i < hoanViKhoiTao.length; i++) {
    plainText_after_permute.push(plainTextArray_1D_64bit[hoanViKhoiTao[i]]);
  }

  // console.log("PlainText sau khi hoan vi: ", plainText_after_permute);
  return plainText_after_permute;
}

// 0F1571C947D9E859 
function DesEncrypt(plainText, cipherText, key) {
  plainText = plainText.split("");
  key = key.split("");

  const finalKey = genFinalKeyDes(key);
  let finalPlainText = genPlanTextDes(plainText);

  console.log("16 key: ", finalKey);
  console.log("plainText sau khi hoán vị: ", finalPlainText);

  let leftPlainText = finalPlainText.slice(0, 32);
  let rightPlainText = finalPlainText.slice(32, 64);
  for (let i = 0; i < 16; i++) {
    //mo rong ben phai
    const newRightPlainText = [];
    for (let i = 0; i < bang_mo_rong_nua_phai.length; i++) {
      newRightPlainText.push(rightPlainText[bang_mo_rong_nua_phai[i]]);
    }

    let right_plainText_after_xor = [];
    for (let j = 0; j < finalKey[i].length; j++) {
      right_plainText_after_xor.push(
        XOR(newRightPlainText[j].toString(), finalKey[i][j].toString())
      );
    }

    //chia thanh 8 cuc 6 bit
    const new_right_plainText_after_xor = [];
    while (right_plainText_after_xor.length)
      new_right_plainText_after_xor.push(
        right_plainText_after_xor.splice(0, 6)
      );
    right_plainText_after_xor = [...new_right_plainText_after_xor];
    console.log(right_plainText_after_xor);

    //cho vao sBox;
    const after_sbox = [];
    for (let i = 0; i < 8; i++) {
      const firstValue = right_plainText_after_xor[i][0];
      const lastValue = right_plainText_after_xor[i][5];
      const middleValue = right_plainText_after_xor[i].slice(1, 5);
      const SBoxValue =
        SBox[i][BinToDec([firstValue, lastValue])][BinToDec(middleValue)];
      after_sbox.push(SBoxValue);
    }

    console.log("after_sbox: ", after_sbox);
    //convert after_sbox to bin
    for (let i = 0; i < after_sbox.length; i++) {
      after_sbox[i] = convertToBin(after_sbox[i], 4);
    }
    const new_after_sbox = [];
    for (let i = 0; i < after_sbox.length; i++) {
      for (let j = 0; j < after_sbox[i].length; j++) {
        new_after_sbox.push(after_sbox[i][j]);
      }
    }

    // hoan vi sbox
    const sbox_after_permute = [];
    for (let i = 0; i < P.length; i++) {
      sbox_after_permute.push(new_after_sbox[P[i]]);
    }
    console.log("sau khi hoan vi sbox: ", sbox_after_permute);

    //xor sbox voi nua trai;
    const sbox_after_shift = [];
    for (let i = 0; i < 32; i++) {
      sbox_after_shift.push(
        XOR(sbox_after_permute[i].toString(), leftPlainText[i].toString())
      );
    }

    console.log("sbox_after_shift: ", sbox_after_shift);
    leftPlainText = rightPlainText;
    rightPlainText = sbox_after_shift;
  }

  console.log(leftPlainText);
  console.log(rightPlainText);

  const after_16_round = [...rightPlainText, ...leftPlainText];
  let new_after_16_round = [];
  for (let i = 0; i < hoanViKetThuc.length; i++) {
    new_after_16_round.push(after_16_round[hoanViKetThuc[i]]);
  }

  const temp = [];
  while (new_after_16_round.length) temp.push(new_after_16_round.splice(0, 4));
  new_after_16_round = [...temp];

  for (let i = 0; i < new_after_16_round.length; i++) {
    new_after_16_round[i] = convertDecToHex(BinToDec(new_after_16_round[i]));
  }

  cipherTextField.value = new_after_16_round.join("");
  console.log(new_after_16_round.join(""));
}

function DesDecrypt(plainText, cipherText, key) {}

function subKeyGenerate(left, right, count) {
  for (let i = 0; i < count; i++) {
    left.push(left.shift());
    right.push(right.shift());
  }

  return [...left, ...right];
}

function convertTo2DimensionArray(array, length_per_array) {
  const newArray = [];
  while (array.length) newArray.push(array.splice(0, length_per_array));
  return newArray;
}

function Encrypt(plainText, cipherText, key) {
  switch (types.value) {
    case "Caesar":
      CaesarEncrypt(plainText, cipherText, key);
      break;
    case "PlayFair":
      PlayFairEncrypt(plainText, cipherText, key);
      break;
    case "Hill":
      HillEncrypt(plainText, cipherText, key);
      break;
    case "Vigenere":
      VigenereEncrypt(plainText, cipherText, key);
      break;
    case "Vernam":
      VernamEncrypt(plainText, cipherText, key);
      break;
    case "Des":
      DesEncrypt(plainText, cipherText, key);
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
    case "PlayFair":
      PlayFairDecrypt(plainText, cipherText, key);
      break;
    case "Hill":
      HillDecrypt(plainText, cipherText, key);
      break;
    case "Vigenere":
      VigenereDecrypt(plainText, cipherText, key);
      break;
    case "Vernam":
      VernamDecrypt(plainText, cipherText, key);
      break;
    case "Des":
      DesDecrypt(plainText, cipherText, key);
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
