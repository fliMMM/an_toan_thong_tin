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

const hoanViKetThuc = [
  39, 7, 47, 15, 55, 23, 63, 31, 38, 6, 46, 14, 54, 22, 62, 30, 37, 5, 45, 13,
  53, 21, 61, 29, 36, 4, 44, 12, 52, 20, 60, 28, 35, 3, 43, 11, 51, 19, 59, 27,
  34, 2, 42, 10, 50, 18, 58, 26, 33, 1, 41, 9, 49, 17, 57, 25, 32, 0, 40, 8, 48,
  16, 56, 24,
];

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

  console.log("key 64bit:", key_64bit);

  const KeyArray_1D_64bit = [];
  for (let i = 0; i < key_64bit.length; i++) {
    for (let j = 0; j < key_64bit[i].length; j++) {
      KeyArray_1D_64bit.push(parseInt(key_64bit[i][j]));
    }
  }

  console.log("1D key array 64 bit: ", KeyArray_1D_64bit);
  console.log("Hoan vi khoi tao: ", PC1);

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

  console.log("Key sau khi dich trai: ", SHiftLeftKey);

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

  console.log("plainText 64bit:", plainText_64bit);

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

  console.log("PlainText sau khi hoan vi: ", plainText_after_permute);
  return plainText_after_permute;
}

// AABB09182736CCDD
function DesEncrypt(plainText, cipherText, key) {
  plainText = "123456ABCD132536".split("");
  key = "AABB09182736CCDD".split("");

  const finalKey = genFinalKeyDes(key);
  let finalPlainText = genPlanTextDes(plainText);

  for (let i = 0; i < 16; i++) {
    const leftPlainText = finalPlainText.slice(0, 32);
    const rightPlainText = finalPlainText.slice(32, 64);
  }
}

function DesDecrypt(plainText, cipherText, key) {}

function subKeyGenerate(left, right, count) {
  for (let i = 0; i < count; i++) {
    left.push(left.shift());
    right.push(right.shift());

    //mo rong ben phai
    const newRight = [];
    for (let i = 0; i < bang_mo_rong_nua_phai.length; i++) {
      newRight.push(right[bang_mo_rong_nua_phai[i]]);
    }
    console.log(`Ben pha sau khi mo rong lan ${i}: `, newRight );
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
