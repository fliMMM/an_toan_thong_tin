const key = document.getElementById("key");
const enBtn = document.getElementById("en");
const deBtn = document.getElementById("de");
const clearBtn = document.getElementById("clear");
const cipherTextField = document.getElementById("cipherText");
const plainTextField = document.getElementById("plainText");
const types = document.getElementById("types");

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase().split("");
const PlayFairLETTERS = "ABCDEFGHIKLMNOPQRSTUVWXYZ".toLowerCase().split("");

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

clear.addEventListener("click", () => {
  plainTextField.value = "";
  cipherTextField.value = "";
  key.value = "";
});

//Caesar welcometophenikaa
function CaesarEncrypt(plainText, cipherText, key) {
  key = parseInt(key);
  plainText = plainText.split("");
  const result = [];
  for (let i = 0; i < plainText.length; i++) {
    const index = LETTERS.indexOf(plainText[i]);
    const pos = (index + key) % 26;
    console.log(pos);
    result.push(LETTERS[pos]);
  }
  console.log(result);
  cipherTextField.value = result.join("");
}
// ucjamkcrmnfclgiyy
function CaesarDecrypt(plainText, cipherText, key) {
  key = parseInt(key);
  cipherText = cipherText.split("");
  const result = [];
  let pos = null;
  for (let i = 0; i < cipherText.length; i++) {
    const index = LETTERS.indexOf(cipherText[i]);
    //console.log(index);
    if (index < key) {
      pos = (index - key + 26) % 26;
    } else {
      pos = (index - key) % 26;
    }
    //console.log(pos);
    result.push(LETTERS[pos]);
  }
  console.log(result);
  plainTextField.value = result.join("");
}

//PlayFair text: instrumentsz  key: monarchy
function PlayFairEncrypt(plainText, cipherText, key) {
  key = key.split("");

  //Tách cặp
  plainText = plainText.split("");
  for (let i = 0; i < plainText.length; i++) {
    if (plainText[i] === plainText[i - 1]) plainText.splice(i, 0, "X");
  }
  if (plainText.length % 2 === 1) plainText.push("X");
  plainText = convertTo2DimensionArray(plainText, 2);

  console.log(plainText);

  //Tạo key array
  let keyArray = [];
  for (let i = 0; i < key.length; i++) {
    keyArray.push(key[i]);
  }

  for (let j = 0; j < PlayFairLETTERS.length; j++) {
    const index = key.indexOf(PlayFairLETTERS[j]);
    if (index === -1) {
      keyArray.push(PlayFairLETTERS[j]);
    }
  }

  const newArr = [];
  while (keyArray.length) newArr.push(keyArray.splice(0, 5));
  keyArray = [...newArr];

  console.log(keyArray);

  //Đảo key array
  const newArrayKey = [];
  for (let i = 0; i < 5; i++) {
    const temp = [];
    for (let k = 0; k < 5; k++) {
      temp.push(keyArray[k][i]);
    }
    newArrayKey.push(temp);
  }

  //console.log("keyArray: ", newArrayKey);
  //console.log("plainText:", plainText);

  const done = [];
  //Hang ngang
  for (let i = 0; i < keyArray.length; i++) {
    for (let j = 0; j < plainText.length; j++) {
      if (
        keyArray[i].indexOf(plainText[j][0]) !== -1 &&
        keyArray[i].indexOf(plainText[j][1]) !== -1
      ) {
        done.push(j);
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
        done.push(j);
        for (let u = 0; u < 2; u++) {
          const index = newArrayKey[i].indexOf(plainText[j][u]);
          console.log(index);
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

  console.log(done);

  let done_index = 0;
  for (let p = 0; p < plainText.length; p++) {
    let X1 = null,
      X2 = null,
      Y1 = null,
      Y2 = null;
    if (done.indexOf(p) === -1) {
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
  }

  console.log("keyArray: ", keyArray);
  console.log("plainText:", temp);
  let _r = "";
  for (let i = 0; i < temp.length; i++) {
    for (let j = 0; j < temp[i].length; j++) {
      _r += temp[i][j];
    }
  }
  cipherTextField.value = _r;
}

//gatlmzclrqtx
function PlayFairDecrypt(plainText, cipherText, key) {
  key = key.split("");

  //Tách cặp
  cipherText = cipherText.split("");
  const newcipherText = convertTo2DimensionArray(cipherText, 2);
  cipherText = convertTo2DimensionArray(cipherText, 2);
  console.log(newcipherText);

  //Tạo key array
  let keyArray = [];
  for (let i = 0; i < key.length; i++) {
    keyArray.push(key[i]);
  }

  for (let j = 0; j < PlayFairLETTERS.length; j++) {
    if (key.indexOf(PlayFairLETTERS[j]) === -1) {
      keyArray.push(PlayFairLETTERS[j]);
    }
  }

  keyArray = convertTo2DimensionArray(keyArray, 5);

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

  const done = [];

  //Hang ngang
  for (let i = 0; i < keyArray.length; i++) {
    for (let j = 0; j < cipherText.length; j++) {
      if (
        keyArray[i].indexOf(cipherText[j][0]) !== -1 &&
        keyArray[i].indexOf(cipherText[j][1]) !== -1
      ) {
        done.push(j);
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
        done.push(j);
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

  console.log(cipherText);
  console.log(done);

  // hinh chu nhat

  for (let p = 0; p < cipherText.length; p++) {
    let X1 = null,
      X2 = null,
      Y1 = null,
      Y2 = null;
    if (done.indexOf(p) === -1) {
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
      console.log(X1, Y1, X2, Y2);
      cipherText[p][1] = keyArray[X2][Y1];
      cipherText[p][0] = keyArray[X1][Y2];
    }
  }

  for (let i = 0; i < cipherText.length; i++) {
    for (let j = 0; j < cipherText[i].length; j++) {
      if (cipherText[i][j] === "X") {
        cipherText[i][j] = "";
      }
    }
  }

  let _r = "";
  for (let i = 0; i < cipherText.length; i++) {
    for (let j = 0; j < cipherText[i].length; j++) {
      _r += cipherText[i][j];
    }
  }

  plainTextField.value = _r;
}

//Hill paymoremoney
function HillEncrypt(plainText, cipherText, key) {
  //Tách cặp
  plainText = plainText.split("");
  plainText = convertTo2DimensionArray(plainText, 3);

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
      plainText[i][j] = LETTERS.indexOf(plainText[i][j]);
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
    cipherText_result.push(LETTERS[num_result[i]]);
  }

  //console.log(cipherText_result);
  cipherTextField.value = cipherText_result.join("");
}

function HillDecrypt(plainText, cipherText, key) {
  //Tách cặp
  cipherText = cipherText.split("");
  cipherText = convertTo2DimensionArray(cipherText, 3);

  //chuyen cipherText sang ma tran so
  for (let i = 0; i < cipherText.length; i++) {
    for (let j = 0; j < cipherText[i].length; j++) {
      cipherText[i][j] = LETTERS.indexOf(cipherText[i][j]);
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
    plainText_result.push(LETTERS[num_result[i]]);
  }

  console.log(plainText_result);
  plainTextField.value = plainText_result.join("");
}

//wearediscoveredsaveyourself key: deceptive
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
    const index = (plainText[i] + key[i % m]) % LETTERS.length;
    result.push(LETTERS[index]);
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
      const index = (cipherText[i] - key[i % m]) % LETTERS.length;
      console.log(LETTERS[index]);
      console.log("index: ", index);
      result.push(LETTERS[index]);
    } else {
      const index =
        (cipherText[i] - key[i % m] + LETTERS.length) % LETTERS.length;
      console.log(LETTERS[index]);
      console.log("index: ", index);
      result.push(LETTERS[index]);
    }
  }

  plainTextField.value = result.join("");
  console.log(m);
}

function convertToNumArray(letterArray) {
  const numArray = [];
  for (let i = 0; i < letterArray.length; i++) {
    numArray.push(LETTERS.indexOf(letterArray[i]));
  }

  return numArray;
}

//RAMSWARUPK key:RANCHOBABA
function VernamEncrypt(plainText, cipherText, key) {
  plainText = plainText.toLowerCase().split("");
  key = key.toLowerCase().split("");

  const newPlainText = [];
  const newKey = [];
  //to bin
  for (let i = 0; i < plainText.length; i++) {
    newPlainText.push(convertToBin(LETTERS.indexOf(plainText[i]), 5));
  }

  for (let i = 0; i < plainText.length; i++) {
    newPlainText[i] = newPlainText[i].split("");
  }

  for (let i = 0; i < key.length; i++) {
    newKey.push(convertToBin(LETTERS.indexOf(key[i]), 5));
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

  result = convertTo2DimensionArray(result, 5);

  //to letter
  const letters = [];
  for (let i = 0; i < result.length; i++) {
    letters.push(LETTERS[binToDecimal(result[i])]);
  }

  cipherTextField.value = letters.join("");
}

function XOR(x, y) {
  if (x === "0" && y === "0") return 0;
  if (x === "0" && y === "1") return 1;
  if (x === "1" && y === "0") return 1;
  if (x === "1" && y === "1") return 0;
}

function convertToBin(letter, num_bits) {
  if (letter === 0) {
    const temp = [];
    for (let i = 0; i < num_bits; i++) {
      temp.push("0");
    }
    return temp.join("");
  }
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
    case "a":
      return 10;
    case "b":
      return 11;
    case "c":
      return 12;
    case "d":
      return 13;
    case "e":
      return 14;
    case "f":
      return 15;
    default:
      return parseInt(text);
  }
};
const convertDecToHex = (text) => {
  switch (text) {
    case 10:
      return "a";
    case 11:
      return "b";
    case 12:
      return "c";
    case 13:
      return "d";
    case 14:
      return "e";
    case 15:
      return "f";
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
  key = convertTo2DimensionArray(key, 2);

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

  PC1K = convertTo2DimensionArray(PC1K, 28);

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
  plainText = convertTo2DimensionArray(plainText, 2);

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

// key:0f1571c947d9e859  02468aceeca86420
function DesEncrypt(plainText, cipherText, key) {
  plainText = plainText.toLowerCase().split("");
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
    right_plainText_after_xor = convertTo2DimensionArray(
      right_plainText_after_xor,
      6
    );
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

  new_after_16_round = convertTo2DimensionArray(new_after_16_round, 4);

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
  const temp = [];
  for (let i = 0; i < array.length; i++) {
    temp.push(array[i]);
  }
  const newArray = [];
  while (temp.length) newArray.push(temp.splice(0, length_per_array));
  return newArray;
}

function gcd(a, b) {
  if (a === 0 || b === 0) return a + b;

  while (a !== b) {
    if (a > b) {
      a -= b;
    } else {
      b -= a;
    }
  }

  return a;
}

function ext_euclidean(x, y, c) {
  let x1 = 1;
  let x2 = 0;
  let y1 = 0;
  let y2 = 1;

  let i = 0;

  while (c !== 1) {
    i++;
    let phan_du_cua_x_chia_y = x % y;
    let ket_qua_cua_x_chia_y = Math.floor(x / y);
    let temp_y2 = y2;
    let temp_x1 = x1;
    x1 = x1 - ket_qua_cua_x_chia_y * y1;
    y2 = x2 - ket_qua_cua_x_chia_y * y2;
    c = phan_du_cua_x_chia_y;
    x = y;
    x1 = y1;
    x2 = temp_y2;
    y1 = temp_x1 - ket_qua_cua_x_chia_y * y1;
    y = phan_du_cua_x_chia_y;
    // console.error(`lần ${i}:`);
    // console.log("x: ", x);
    // console.log("y: ", y);
    // console.log("c: ", c);
    // console.log("x1: ", x1);
    // console.log("x2: ", x2);
    // console.log("y1: ", y1);
    // console.log("y2: ", y2);
  }

  return y2;
}

function genRsaKey(p, q) {
  const On = (p - 1) * (q - 1);
  const temp = [];
  for (let e = 2; e < On; e++) {
    if (gcd(On, e) === 1) temp.push(e);
  }

  // const e = temp[Math.floor(temp.length / 2) + 1];
  const e = 7;

  let d = null;
  if (On > e) {
    d = ext_euclidean(On, e, On % e);
  } else if (On < e) {
    d = ext_euclidean(e, On, e % On);
  }

  console.log("Kpu = {" + e + "," + p * q + "}");
  console.log("Kpr = {" + d + "}");
  return { e, d };
}

function RsaEncrypt(plainText, cipherText, key) {
  const p = parseInt(document.getElementById("p").value);
  const q = parseInt(document.getElementById("q").value);
  const n = p * q;

  const { e } = genRsaKey(p, q);

  console.log("e: ", e);
  console.log("n: ", n);
  // console.log(e, On);
  // console.log(ext_euclidean(On, e, On % e));
  // console.log(ext_euclidean(50, 21, 50 % 21));

  plainText = parseInt(plainText);
  cipherTextField.value = Math.pow(plainText, e) % n;
}

function RsaDecrypt(plainText, cipherText, key) {
  const p = parseInt(document.getElementById("p").value);
  const q = parseInt(document.getElementById("q").value);
  const n = p * q;

  const { d } = genRsaKey(p, q);

  console.log("d: ", d);
  console.log("n: ", n);
  // console.log(e, On);
  // console.log(ext_euclidean(On, e, On % e));
  // console.log(ext_euclidean(50, 21, 50 % 21));

  cipherText = parseInt(cipherText);
  plainTextField.value = Math.pow(cipherText, d) % n;
}

// q = 353, alpha = 3, XA = 97, XB =233
function HellmanEncrypt(plainText, cipherText, key) {
  const q = parseInt(document.getElementById("q").value);
  const alpha = parseInt(document.getElementById("alpha").value);
  const XA = parseInt(document.getElementById("XA").value);
  const XB = parseInt(document.getElementById("XB").value);

  const YA = (alpha ** XA) % q;
  const YB = (alpha ** XB) % q;

  const KA = YB ** XA % q;
  const KB = pow(YA, XB) % q;

  console.log(q, alpha, XA, XB);
  console.log(YA, YB);
  console.log(KA);
  console.log(KB);
}

function pow(x, y) {
  let result = 1;
  for (let i = 0; i < y; i++) {
    result *= x;
  }

  return result;
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
    case "Aes":
      AesEncrypt(plainText, cipherText, key);
      break;
    case "Rsa":
      RsaEncrypt(plainText, cipherText, key);
      break;
    case "Hellman":
      HellmanEncrypt(plainText, cipherText, key);
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
    // case "Vernam":
    //   VernamDecrypt(plainText, cipherText, key);
    //   break;
    case "Des":
      DesDecrypt(plainText, cipherText, key);
      break;
    case "Rsa":
      RsaDecrypt(plainText, cipherText, key);
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
