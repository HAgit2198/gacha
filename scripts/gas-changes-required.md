# GAS側で必要な変更点

## 新スプレッドシート構成

### スプレッドシート1（統合マスター）
ID: 1qxpyeb284aePNs7K8sEEpFxCqzFHCApXS90EBBFst5o
シート名: 顧客マスター
- C列(index2): メールアドレス
- D列(index3): 名前
- M列(index12): ワールド解放状況（例: "World9", "World9,World8"）
- N列(index13): コンプ状況（例: "N", "N,R", "N,R,SR,UR"）

### スプレッドシート2（顧客コインデータ）
ID: 1EJS5Za4dQfdP2Pc1gAaKJVsX7_kK--fB9i4wYPlkzK0
シート名: コイン獲得
- A列(index0): メールアドレス（3行目=index2から）
- B列: 獲得コイン
- D列: 使用コイン  
- F列: ガチャ使用コイン
- 所持コイン = B - D - F

---

## GASに追加・変更するアクション

### 1. action=spendCoins（コイン消費）
- 対象: コイン獲得シート
- 処理: 該当メールの行のF列に spent を**加算**
- パラメータ: email, spent

### 2. action=saveCompletion（コンプ状況更新）
- 対象: 統合マスターの顧客マスターシート N列
- 処理: 該当メールの行のN列に rarity を追記（カンマ区切り）
  - 例: 現在 "N" → "N,R" に更新
  - rarity=EPILOGUE の場合は "エピローグ" を追記
- パラメータ: email, rarity, count

### 3. action=saveGachaLog（ガチャログ記録）
- 対象: 元の「顧客ID」シートのI列（既存の顧客IDシートに追記）
- 処理: 該当メールの行のI列に カードID を追記（カンマ区切り）
  - isUR=1 の場合は UR カードとして明示（例: "u3" → "[UR]u3"）
- パラメータ: email, drawnCards, consumedCoins, gachaCount, isUR

### 4. action=saveCards（カード所持情報）
- 現状維持（変更なし）
