// 計算結果の例外処理
function judgeNumber(x) {
  if(isNaN(x)) {
    return '--';
  }
  return x;
}

function nullJudge(x, y, z) {
  if(x === "" || y === "" || z === "") {
    return null;
  } else {
    return {amount:x, price:y, useAmount:z};
  }
}

//【計算ページ】量が入力された時
changeAmountCalc = function(ele) {
  var amount = ele.value;
  var parent = ele.parentNode.parentNode;
  var price = parent.children[1].children[1].value;
  var useAmount = parent.children[2].children[0].value;
  var judged = nullJudge(amount, price, useAmount);
  var result = 0;
  if (judged === null) {
    result = '--';
  } else {
    result = Math.round(judged.price / judged.amount * judged.useAmount * 10) / 10;
  }
  var sumField = parent.children[3].children[0];
  var sumArray = [];
  var list = document.getElementById('list');
  var count = list.childElementCount - 1;
  var total = 0;
  sumField.textContent = result;
  for(var i = 0; i < count; i++) {
    sumArray.push(document.getElementById('sum'+i).textContent);
    // console.log(sumArray[i]);
    total = total + Number(sumArray[i]);
  }
  // console.log(total);
  var TOTAL = document.getElementById('total');
  TOTAL.textContent = judgeNumber(Math.round(total * 10) / 10);
}

//【計算ページ】料金が入力された時
changePriceCalc = function(ele) {
  var price = ele.value;
  var parent = ele.parentNode.parentNode;
  var amount = parent.children[1].children[0].value;
  var useAmount = parent.children[2].children[0].value;
  var judged = nullJudge(amount, price, useAmount);
  var result = 0;
  if (judged === null) {
    result = '--';
  } else {
    result = Math.round(judged.price / judged.amount * judged.useAmount * 10) / 10;
  }
  var sumField = parent.children[3].children[0];
  var sumArray = [];
  var list = document.getElementById('list');
  var count = list.childElementCount - 1;
  var total = 0;
  var TOTAL = document.getElementById('total');
  sumField.textContent = result;
  for(var i = 0; i < count; i++) {
    sumArray.push(document.getElementById('sum'+i).textContent);
    total = total + Number(sumArray[i]);
  }
  var TOTAL = document.getElementById('total');
  TOTAL.textContent = judgeNumber(Math.round(total * 10) / 10);
}

//【計算ページ】使用量が入力された時
changeUseAmountCalc = function(ele) {
  var useAmount = ele.value;
  var parent = ele.parentNode.parentNode;
  var amount = parent.children[1].children[0].value;
  var price = parent.children[1].children[1].value;
  var judged = nullJudge(amount, price, useAmount);
  var result = 0;
  if (judged === null) {
    result = '--';
  } else {
    result = Math.round(judged.price / judged.amount * judged.useAmount * 10) / 10;
  }
  var sumField = parent.children[3].children[0];
  var sumArray = [];
  var list = document.getElementById('list');
  var count = list.childElementCount - 1;
  var total = 0;
  var TOTAL = document.getElementById('total');
  sumField.textContent = result;
  for(var i = 0; i < count; i++) {
    sumArray.push(document.getElementById('sum'+i).textContent);
    total = total + Number(sumArray[i]);
  }
  var TOTAL = document.getElementById('total');
  TOTAL.textContent = judgeNumber(Math.round(total * 10) / 10);
}

//【計算ページ】行を追加する
function coladd() {
  var list = document.getElementById('list');
  var count = list.childElementCount - 1;
  var listItem = document.createElement("ons-list-item");
  var rowItem = document.createElement("ons-row");
  rowItem.setAttribute("id", "row" + count);
  rowItem.setAttribute("class", "row");
  rowItem.setAttribute("align", "center");
  rowItem.innerHTML = '<ons-col><ons-input type="text" id="material' + count + '" class="material" value="" modifier="underbar"></ons-input><ons-select class="selBox" onchange="getSelect(' + count + ', this.value)"><option value="">選択<option></ons-select></ons-col><ons-col><ons-input type="tel" id="amount' + count + '" class="amount" value="" modifier="underbar" onchange="changeAmountCalc(this)" ></ons-input>㌘/ <ons-input type="tel" id="price' + count + '" class="price" value="" modifier="underbar" onchange="changePriceCalc(this)"></ons-input>円</ons-col><ons-col><ons-input type="tel" id="useAmount' + count + '" class="useAmount" value="" modifier="underbar" onchange="changeUseAmountCalc(this)"></ons-input>㌘</ons-col><ons-col><span id="sum' + count + '" class="sum">0</span>円</ons-col><ons-col><ons-button class="delbtn" type="button" id="delBtn1" class="delete" onclick="deleteRow(this)">削除</ons-button></ons-col>'
  listItem.appendChild(rowItem);
  list.appendChild(listItem);
  showSelectBox();
}

//【計算ページ】行を削除する
deleteRow = function(obj) {
  var listItem = obj.parentNode.parentNode.parentNode;
  var list = listItem.parentNode;
  var sum = listItem.children[0].children[3].children[0].textContent;
  var TOTAL = document.getElementById('total');
  TOTAL.textContent = Math.round((TOTAL.textContent - sum) * 10) / 10;
  list.remove();
  var rowIdArray = document.querySelectorAll('.row');
  var amountIdArray = document.querySelectorAll('.amount');
  var priceIdArray = document.querySelectorAll('.price');
  var useAmountIdArray = document.querySelectorAll('.useAmount');
  var sumIdArray = document.querySelectorAll('.sum');
  for(var i = 0; i < rowIdArray.length; i++){
    rowIdArray[i].setAttribute('id', 'row' + i);
  }
  for(var i = 0; i < amountIdArray.length; i++){
    amountIdArray[i].setAttribute('id', 'amount' + i);
  }
  for(var i = 0; i < priceIdArray.length; i++){
    priceIdArray[i].setAttribute('id', 'price' + i);
  }
  for(var i = 0; i < useAmountIdArray.length; i++){
    useAmountIdArray[i].setAttribute('id', 'useAmount' + i);
  }
  for(var i = 0; i < sumIdArray.length; i++){
    sumIdArray[i].setAttribute('id', 'sum' + i);
  }
}

//【素材登録ページ】保存ボタン押下時
function onSaveButtonClick() {
  var memos = document.querySelectorAll('.memoText');
  var memoValues = {};
  if(memos[0].value.match(/^(.{1,10})$/)){
    memoValues.material = memos[0].value;
  } else {
    ons.notification.alert({message: "素材名を10文字以内で入力してください"});
    return false;
  }
  if(memos[1].value.match(/^(\d{1,10})$/)) {
    memoValues.amount = memos[1].value;
  } else {
    ons.notification.alert({message: "使用量を半角数字10文字以内で入力してください"});
    return false;
  }
  if(memos[2].value.match(/^(\d{1,10})$/)) {
    memoValues.price = memos[2].value;
  } else {
    ons.notification.alert({message: "値段を半角数字10文字以内で入力してください"});
    return false;
  }
  util.addItem(memoValues);
  memos[0].value = '';
  memos[1].value = '';
  memos[2].value = '';
  var tabbar = document.querySelector("ons-tabbar")
  tabbar.setActiveTab(2);
}

//【素材一覧ページ】素材を削除する
function deleteMaterial(ele) {
  var node = ele.parentNode.parentNode;
  var materialListId = node.getAttribute('id');
  var deleteIndex = materialListId.split('-');
  util.deleteItem(deleteIndex[1]);
  var page = node.parentNode.parentNode.parentNode.parentNode;
  var list = page.querySelector('#memoList');
  list.innerHTML = '';
  //メモの件数分ons-list-item要素を取得
  var items = util.getItems();
  items.forEach(function(memo, index) {
    ons.createElement('<ons-list-item><ons-row id="materialList-' + index + '"><ons-col class="materialList">' + memo.material + '</ons-col><ons-col class="materialList">' +memo.amount + '㌘</ons-col><ons-col class="materialList">' + memo.price + '円</ons-col><ons-col><ons-button class="delbtn" type="button" id="delBtn1" class="delete" onclick="deleteMaterial(this)">削除</ons-button></ons-col></ons-row></ons-list-item>', {append:list});
  });
}

//【計算ページ】セレクトボックス内で選択された素材のamoutとpriceを取得して表示する
function getSelect(unit, text) {
  var items = util.getItems();
  for(let i = 0; i < items.length; i++) {
    if(text === items[i].material) {
      document.getElementById("material" + unit).value = text;
      document.getElementById("amount" + unit).value = items[i].amount;
      document.getElementById("price" + unit).value = items[i].price;
      break;
    }
  }
}

//【共通】各ページが表示された時
document.addEventListener('show', function(event) {
  var page = event.target;
  //一覧画面が表示された時
  if(page.id === 'page3') {
    //ons-list要素を初期化
    var list = page.querySelector('#memoList');
    list.innerHTML = '';
    //メモの件数分ons-list-item要素を取得
    var items = util.getItems();
    // console.log(itemsLength);
    items.forEach(function(memo, index) {
      ons.createElement('<ons-list-item><ons-row id="materialList-' + index + '"><ons-col class="materialList">' + memo.material + '</ons-col><ons-col class="materialList">' + memo.amount + '㌘</ons-col><ons-col class="materialList">' + memo.price + '円</ons-col><ons-col><ons-button class="delbtn" type="button" id="delBtn1" class="delete" onclick="deleteMaterial(this)">削除</ons-button></ons-col></ons-row></ons-list-item>', {append:list});
    });
  } else if(page.id === 'page1') {
    showSelectBox();
  };
});

//【計算ページ】セレクトボックスに選択肢を表示
function showSelectBox() {
  var items = util.getItems();
  var selBoxies = document.querySelectorAll('.selBox');
  selBoxies.forEach(function(selBox) {
    selBox.children[0].innerHTML = '';
    selBox.children[0].append(ons.createElement('<option value="" disabled selected>▼選択</option>'));
    items.forEach(function(memo) {
      selBox.children[0].append(ons.createElement('<option value="' + memo.material + '">' + memo.material + '</option>'));
    });
  });
}

