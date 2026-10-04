# Google Apps Script 統合設定ガイド

全ての機能（ログイン、コイン、カード所持数、ワールド解放、ガチャ履歴）を**1つのスクリプト**で管理します。

---

## ステップ1: スプレッドシートの準備

以下のシートを作成してください（自動作成されるものもあります）:

| シート名 | 用途 |
|---------|------|
| 顧客ID | ログイン情報・コイン数（既存） |
| カード所持数 | ユーザーごとのカード所持データ |
| ワールド解放 | ユーザーごとの解放済みワールド |
| ガチャ履歴 | ガチャの実行履歴 |

---

## ステップ2: Apps Scriptの設定

1. スプレッドシートを開く
2. メニュー「拡張機能」→「Apps Script」
3. 既存のコードを全て削除し、以下のコードを貼り付け:

```javascript
// ===== メインエントリーポイント =====
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var action = data.action;
    
    switch(action) {
      case 'updateCoins':
        return updateCoins(data.email, data.coins);
      case 'logGacha':
        return logGacha(data);
      case 'saveCards':
        return saveCards(data.email, data.ownedCharacters);
      case 'getCards':
        return getCards(data.email);
      case 'saveUnlockedWorlds':
        return saveUnlockedWorlds(data.email, data.unlockedWorlds);
      case 'getUnlockedWorlds':
        return getUnlockedWorlds(data.email);
      default:
        return jsonResponse({ success: false, error: 'Unknown action: ' + action });
    }
  } catch (error) {
    return jsonResponse({ success: false, error: error.message });
  }
}

// JSONレスポンスヘルパー
function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ===== コイン更新 =====
function updateCoins(email, coins) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('顧客ID');
  
  if (!sheet) {
    return jsonResponse({ success: false, error: 'Sheet not found' });
  }
  
  var data = sheet.getDataRange().getValues();
  
  for (var i = 1; i < data.length; i++) {
    if (data[i][1] && data[i][1].toString().toLowerCase() === email.toLowerCase()) {
      sheet.getRange(i + 1, 4).setValue(coins);
      return jsonResponse({ success: true });
    }
  }
  
  return jsonResponse({ success: false, error: 'User not found' });
}

// ===== ガチャ履歴 =====
function logGacha(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('ガチャ履歴');
  
  if (!sheet) {
    sheet = ss.insertSheet('ガチャ履歴');
    sheet.getRange('A1:E1').setValues([['日時', 'メールアドレス', 'タイプ', 'ワールド', 'カード']]);
  }
  
  var timestamp = new Date().toISOString();
  sheet.appendRow([timestamp, data.email, data.type, data.world, data.cards || '[]']);
  
  return jsonResponse({ success: true });
}

// ===== カード所持数 保存 =====
function saveCards(email, ownedCharacters) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('カード所持数');
  
  if (!sheet) {
    sheet = ss.insertSheet('カード所持数');
    sheet.getRange('A1:B1').setValues([['メールアドレス', '所持カードデータ']]);
  }
  
  var data = sheet.getDataRange().getValues();
  var rowIndex = findRowByEmail(data, email);
  
  if (rowIndex > 0) {
    sheet.getRange(rowIndex, 2).setValue(ownedCharacters);
  } else {
    sheet.appendRow([email, ownedCharacters]);
  }
  
  return jsonResponse({ success: true });
}

// ===== カード所持数 取得 =====
function getCards(email) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('カード所持数');
  
  if (!sheet) {
    return jsonResponse({ success: true, ownedCharacters: '{}' });
  }
  
  var data = sheet.getDataRange().getValues();
  
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] && data[i][0].toString().toLowerCase() === email.toLowerCase()) {
      return jsonResponse({ success: true, ownedCharacters: data[i][1] || '{}' });
    }
  }
  
  return jsonResponse({ success: true, ownedCharacters: '{}' });
}

// ===== ワールド解放 保存 =====
function saveUnlockedWorlds(email, unlockedWorlds) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('ワールド解放');
  
  if (!sheet) {
    sheet = ss.insertSheet('ワールド解放');
    sheet.getRange('A1:B1').setValues([['メールアドレス', '解放済みワールド']]);
  }
  
  var data = sheet.getDataRange().getValues();
  var rowIndex = findRowByEmail(data, email);
  
  if (rowIndex > 0) {
    sheet.getRange(rowIndex, 2).setValue(unlockedWorlds);
  } else {
    sheet.appendRow([email, unlockedWorlds]);
  }
  
  return jsonResponse({ success: true });
}

// ===== ワールド解放 取得 =====
function getUnlockedWorlds(email) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('ワールド解放');
  
  if (!sheet) {
    return jsonResponse({ success: true, unlockedWorlds: '["origins"]' });
  }
  
  var data = sheet.getDataRange().getValues();
  
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] && data[i][0].toString().toLowerCase() === email.toLowerCase()) {
      return jsonResponse({ success: true, unlockedWorlds: data[i][1] || '["origins"]' });
    }
  }
  
  return jsonResponse({ success: true, unlockedWorlds: '["origins"]' });
}

// ===== ユーティリティ =====
function findRowByEmail(data, email) {
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] && data[i][0].toString().toLowerCase() === email.toLowerCase()) {
      return i + 1;
    }
  }
  return -1;
}
```

---

## ステップ3: デプロイ

1. 「デプロイ」→「新しいデプロイ」をクリック
2. 左の歯車アイコンをクリック→「ウェブアプリ」を選択
3. 設定:
   - 説明: 「ガチャアプリ統合API」
   - 実行ユーザー: 「自分」
   - アクセスできるユーザー: **「全員」**
4. 「デプロイ」をクリック
5. 「アクセスを承認」→ Googleアカウントで許可
6. 表示されたURLをコピー

---

## ステップ4: URLを設定

コピーしたURLを以下の全てのファイルに設定してください:

```
app/api/update-coins/route.ts
app/api/log-gacha/route.ts
app/api/save-cards/route.ts
app/api/get-cards/route.ts
app/api/save-unlocked-worlds/route.ts
app/api/get-unlocked-worlds/route.ts
```

各ファイルの `APPS_SCRIPT_URL` 変数を新しいURLに変更します。

---

## 機能一覧

| 機能 | action値 | 説明 |
|-----|---------|------|
| コイン更新 | updateCoins | ガチャ後のコイン数を更新 |
| ガチャ履歴 | logGacha | ガチャ結果を記録 |
| カード保存 | saveCards | 所持カードを保存 |
| カード取得 | getCards | 所持カードを取得 |
| ワールド保存 | saveUnlockedWorlds | 解放ワールドを保存 |
| ワールド取得 | getUnlockedWorlds | 解放ワールドを取得 |

---

## トラブルシューティング

### 403エラーが出る場合
- デプロイ時に「アクセスできるユーザー」が「全員」になっているか確認
- 再デプロイが必要な場合は「デプロイを管理」→「新しいデプロイ」

### 302リダイレクトエラー
- URLが正しくコピーされているか確認
- URLの末尾が `/exec` で終わっているか確認

### データが保存されない
- Apps Scriptの「実行数」タブでエラーログを確認
- スプレッドシートの共有設定を確認
