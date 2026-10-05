"use client"

import React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Coins, Lock, Leaf, Waves, Clock3, Rainbow, Check, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" // Import Card components


declare global {
  interface Window {
    Vimeo: any
  }
}

// ワールドデータ定義 v2
const WORLDS = {
  origins: {
    id: "origins",
    name: "Vol.1 始まりの空域編",
    enName: "生命の起源",
    subtitle: "生命と旅立ちの地",
    rank: "N",
    icon: Leaf,
    cost: 20,
    cost10: 180,
    theme: {
      primary: "bg-green-600",
      secondary: "bg-green-700/30",
      border: "border-green-400",
      bg: "bg-green-900/20",
      text: "text-green-300",
      glow: "shadow-green-400/50",
    },
    message: "🌿 生命の起源を征服！新しい世界が開けた！",
    description: "生命の誕生と旅立ち。風・森・火の始まりの地。",
    buttonImage: "/images/world-btn-origins.png",
    characters: [
      {
        id: "origins_1",
        name: "出発前のルナ",
        element: "風",
        image: "/images/6.png",
      },
      {
        id: "origins_2",
        name: "感情の光ールナー",
        element: "風",
        image: "/images/7.png",
      },
      {
        id: "origins_3",
        name: "風の約束ールナ&リーフー",
        element: "風",
        image: "/images/8.png",
      },
      {
        id: "origins_4",
        name: "世代を超えた絆ールナ&エルダー",
        element: "森",
        image: "/images/9.png",
      },
      {
        id: "origins_5",
        name: "支える炎ールナ&フレアー",
        element: "火",
        image: "/images/10.png",
      },
      {
        id: "origins_6",
        name: "空への挑戦ーカイトー",
        element: "風",
        image: "/images/11.png",
      },
      {
        id: "origins_7",
        name: "未踏の航路ーカイトー",
        element: "風",
        image: "/images/12.png",
      },
      {
        id: "origins_8",
        name: "空を学ぶ日ーカイト&リーフー",
        element: "風",
        image: "/images/13.png",
      },
      {
        id: "origins_9",
        name: "知恵と継承ーカイト&エルダー",
        element: "森",
        image: "/images/14.png",
      },
      {
        id: "origins_10",
        name: "熱き心の交差ーカイト&フレアー",
        element: "火",
        image: "/images/15.png",
      },

      {
        id: "origins_11",
        name: "朝風からの導きーリーフー",
        element: "風",
        image: "/images/16.png",
      },
      {
        id: "origins_12",
        name: "風精の便りーリーフー",
        element: "風",
        image: "/images/17.png",
      },
      {
        id: "origins_13",
        name: "風と遊ぶ子供たちーリーフー",
        element: "風",
        image: "/images/18.png",
      },
      {
        id: "origins_14",
        name: "孤独な夜風の想いーリーフー",
        element: "風",
        image: "/images/19.png",
      },
      {
        id: "origins_15",
        name: "新しい風からの贈り物ーリーフー",
        element: "風",
        image: "/images/20.png",
      },
      {
        id: "origins_16",
        name: "森林の賢者ーエルダー",
        element: "森",
        image: "/images/21.png",
      },
      {
        id: "origins_17",
        name: "森の友との安らぎーエルダー",
        element: "森",
        image: "/images/22.png",
      },
      {
        id: "origins_18",
        name: "木々との調和ーエルダー",
        element: "森",
        image: "/images/23.png",
      },
      {
        id: "origins_19",
        name: "父の愛の花ーエルダー",
        element: "森",
        image: "/images/24.png",
      },
      {
        id: "origins_20",
        name: "親愛なる贈り物ーエルダー",
        element: "森",
        image: "/images/25.png",
      },
      {
        id: "origins_21",
        name: "炎の朝景色ーフレアー",
        element: "火",
        image: "/images/26.png",
      },
      {
        id: "origins_22",
        name: "温かく灯す知恵ーフレアー",
        element: "火",
        image: "/images/27.png",
      },
      {
        id: "origins_23",
        name: "日常の中の炎精ーフレアー",
        element: "火",
        image: "/images/28.png",
      },
      {
        id: "origins_24",
        name: "夕焼けの独炎舞ーフレアー",
        element: "火",
        image: "/images/29.png",
      },
      {
        id: "origins_25",
        name: "静寂の炎精ーフレアー",
        element: "火",
        image: "/images/30.png",
      },
    ],
  },
  elements: {
    id: "elements",
    name: "Vol.2 試練の空域編",
    enName: "元素の領域",
    subtitle: "創造と覚醒の領域",
    rank: "R",
    icon: Waves,
    cost: 30,
    cost10: 270,
    theme: {
      primary: "bg-cyan-600",
      secondary: "bg-cyan-700/30",
      border: "border-cyan-400",
      bg: "bg-cyan-900/20",
      text: "text-cyan-300",
      glow: "shadow-cyan-400/50",
    },
    buttonImage: "/images/world-btn-elements.png",
    description: "自然と文明の調和。水・土・雷の創造の地。",
    characters: [
      { id: "elements_1", name: "空の上の日常 ルナ・フォルティス", element: "風", image: "/cards/31.png" },
      { id: "elements_2", name: "冒険の幕開け ルナ&カイト", element: "風", image: "/cards/32.png" },
      { id: "elements_3", name: "水鏡の真実 ルナ&ミラージュ", element: "水", image: "/cards/33.png" },
      { id: "elements_4", name: "煌めく贈り物 ルナ&ジェム", element: "土", image: "/cards/34.png" },
      { id: "elements_5", name: "背中合わせの勇気 ルナ&ボルト", element: "雷", image: "/cards/35.png" },
      { id: "elements_6", name: "遠き地平を望む者 カイト・ベルウィンド", element: "風", image: "/cards/36.png" },
      { id: "elements_7", name: "夕映えの想い カイト・ベルウィンド", element: "風", image: "/cards/37.png" },
      { id: "elements_8", name: "水鏡が映す心 カイト&ミラージュ", element: "水", image: "/cards/38.png" },
      { id: "elements_9", name: "誇りの交差 カイト&ジェム", element: "土", image: "/cards/39.png" },
      { id: "elements_10", name: "雷雲を越えて カイト&ボルト", element: "雷", image: "/cards/40.png" },
      { id: "elements_11", name: "湖面の神秘 水鏡の精霊ミラージュ", element: "水", image: "/cards/41.png" },
      { id: "elements_12", name: "創造の水流 水鏡の精霊ミラージュ", element: "水", image: "/cards/42.png" },
      { id: "elements_13", name: "神聖なる水鏡 水鏡の精霊ミラージュ", element: "水", image: "/cards/43.png" },
      { id: "elements_14", name: "咲き誇る水晶花 水鏡の精霊ミラージュ", element: "水", image: "/cards/44.png" },
      { id: "elements_15", name: "月夜の静寂 水鏡の精霊ミラージュ", element: "水", image: "/cards/45.png" },
      { id: "elements_16", name: "光を磨く者 大地の精霊ジェム", element: "土", image: "/cards/46.png" },
      { id: "elements_17", name: "輝きの誇り 大地の精霊ジェム", element: "土", image: "/cards/47.png" },
      { id: "elements_18", name: "煌びやかな地図 大地の精霊ジェム", element: "土", image: "/cards/48.png" },
      { id: "elements_19", name: "輝く目の少年 大地の精霊ジェム", element: "土", image: "/cards/49.png" },
      { id: "elements_20", name: "創作の光 大地の精霊ジェム", element: "土", image: "/cards/50.png" },
      { id: "elements_21", name: "稲妻の騎手 雷鳴の精霊ボルト", element: "雷", image: "/cards/51.png" },
      { id: "elements_22", name: "相棒への慈しみ 雷鳴の精霊ボルト", element: "雷", image: "/cards/52.png" },
      { id: "elements_23", name: "責任の荷物 雷鳴の精霊ボルト", element: "雷", image: "/cards/53.png" },
      { id: "elements_24", name: "休息の笑顔 雷鳴の精霊ボルト", element: "雷", image: "/cards/54.png" },
      { id: "elements_25", name: "雷の試練 雷鳴の精霊ボルト", element: "雷", image: "/cards/55.png" },
    ],
  },
  beyond: {
    id: "beyond",
    name: "Vol.3 真理の空域編",
    enName: "彼方の次元",
    subtitle: "真理と神秘の次元",
    rank: "SR",
    icon: Clock3,
    cost: 50,
    cost10: 450,
    theme: {
      primary: "bg-yellow-500",
      secondary: "bg-yellow-600/30",
      border: "border-yellow-400",
      bg: "bg-yellow-900/20",
      text: "text-yellow-300",
      glow: "shadow-yellow-400/50",
    },
    message: "🌌 彼方の次元を達成！現実の繊維が揺さぶられる！",
    buttonImage: "/images/world-btn-beyond.png",
    description: "時空と超常の狭間。時間・闇・光の異界。",
    characters: [
      { id: "beyond_1", name: "想いの写真 ルナ・フォルティス", element: "光", image: "/cards/57.png" },
      { id: "beyond_2", name: "海鳴り亭の再建 ルナ・フォルティス", element: "光", image: "/cards/58.png" },
      { id: "beyond_3", name: "冒険の幕開け ルナ&レム", element: "時間", image: "/cards/59.png" },
      { id: "beyond_4", name: "影との対話 ルナ&シェイド", element: "闇", image: "/cards/60.png" },
      { id: "beyond_5", name: "虹色の約束 ルナ&ユメ", element: "光", image: "/cards/61.png" },
      { id: "beyond_6", name: "遠き地平を望む者 カイト・ベルウィンド", element: "風", image: "/cards/62.png" },
      { id: "beyond_7", name: "共に掲げる軌跡 ルナ&カイト", element: "光", image: "/cards/63.png" },
      { id: "beyond_8", name: "時の学び カイト&レム", element: "時間", image: "/cards/64.png" },
      { id: "beyond_9", name: "影からの啓示 カイト&シェイド", element: "闇", image: "/cards/65.png" },
      { id: "beyond_10", name: "新たな夢の対話 カイト&ユメ", element: "光", image: "/cards/66.png" },
      { id: "beyond_11", name: "時の司書 時の精霊レム", element: "時間", image: "/cards/67.png" },
      { id: "beyond_12", name: "時を聴く者 時の精霊レム", element: "時間", image: "/cards/68.png" },
      { id: "beyond_13", name: "暖炉の語り手 時の精霊レム", element: "時間", image: "/cards/69.png" },
      { id: "beyond_14", name: "黄昏の回想 時の精霊レム", element: "時間", image: "/cards/70.png" },
      { id: "beyond_15", name: "記憶の記録者 時の精霊レム", element: "時間", image: "/cards/71.png" },
      { id: "beyond_16", name: "闇に沈む者 影の精霊シェイド", element: "闇", image: "/cards/72.png" },
      { id: "beyond_17", name: "闇が紡ぐ笑顔 影の精霊シェイド", element: "闇", image: "/cards/73.png" },
      { id: "beyond_18", name: "影の観察者 影の精霊シェイド", element: "闇", image: "/cards/74.png" },
      { id: "beyond_19", name: "思索の闇 影の精霊シェイド", element: "闇", image: "/cards/75.png" },
      { id: "beyond_20", name: "捨てられた光 影の精霊シェイド", element: "闇", image: "/cards/76.png" },
      { id: "beyond_21", name: "夢を紡ぐ者 夢幻の精霊ユメ", element: "光", image: "/cards/77.png" },
      { id: "beyond_22", name: "形にする奇跡 夢幻の精霊ユメ", element: "光", image: "/cards/78.png" },
      { id: "beyond_23", name: "華やぐ装飾 夢幻の精霊ユメ", element: "光", image: "/cards/79.png" },
      { id: "beyond_24", name: "微笑みの受容 夢幻の精霊ユメ", element: "光", image: "/cards/80.png" },
      { id: "beyond_25", name: "星空の夢語り 夢幻の精霊ユメ", element: "光", image: "/cards/81.png" },
    ],
  },
  questpia: {
    id: "questpia",
    name: "Vol.4 虹の架け橋編",
    enName: "クエストピア",
    subtitle: "究極の調和の伝説世界",
    rank: "UR",
    icon: Rainbow,
    cost: 100,
    cost10: 0,
    theme: {
      primary: "bg-gradient-to-r from-orange-500 to-red-600",
      secondary: "bg-gradient-to-r from-orange-600/30 to-red-700/30",
      border: "border-orange-400",
      bg: "bg-gradient-to-br from-orange-900/20 to-red-900/20",
      text: "text-orange-300",
      glow: "shadow-orange-400/50",
    },
    message: "🌈クエストピアが現れた！伝説が動き出す！",
    buttonImage: "/images/world-btn-questpia.png",
    description: "究極の調和と伝説の終焉。全ての元素が融合した世界。",
    characters: [
      { id: "questpia_1",  name: "裏面 リーフ",       element: "全", image: "/cards/ur/back_1.png" },
      { id: "questpia_2",  name: "裏面 エルダー",     element: "全", image: "/cards/ur/back_2.png" },
      { id: "questpia_3",  name: "裏面 フレア",       element: "全", image: "/cards/ur/back_3.png" },
      { id: "questpia_4",  name: "裏面 ミラージュ",   element: "全", image: "/cards/ur/back_4.png" },
      { id: "questpia_5",  name: "裏面 ルナ",         element: "全", image: "/cards/ur/back_5.png" },
      { id: "questpia_6",  name: "裏面 カイト",       element: "全", image: "/cards/ur/back_6.png" },
      { id: "questpia_7",  name: "裏面 ジェム",       element: "全", image: "/cards/ur/back_7.png" },
      { id: "questpia_8",  name: "裏面 ボルト",       element: "全", image: "/cards/ur/back_8.png" },
      { id: "questpia_9",  name: "裏面 レム",         element: "全", image: "/cards/ur/back_9.png" },
      { id: "questpia_10", name: "裏面 シェイド",     element: "全", image: "/cards/ur/back_10.png" },
      { id: "questpia_11", name: "裏面 ユメ",         element: "全", image: "/cards/ur/back_11.png" },
      { id: "questpia_12", name: "表面 ルナ",         element: "全", image: "/cards/ur/front_1.png" },
      { id: "questpia_13", name: "表面 カイト",       element: "全", image: "/cards/ur/front_2.png" },
      { id: "questpia_14", name: "表面 リーフ",       element: "全", image: "/cards/ur/front_3.png" },
      { id: "questpia_15", name: "表面 エルダー",     element: "全", image: "/cards/ur/front_4.png" },
      { id: "questpia_16", name: "表面 フレア",       element: "全", image: "/cards/ur/front_5.png" },
      { id: "questpia_17", name: "表面 ミラージュ",   element: "全", image: "/cards/ur/front_6.png" },
      { id: "questpia_18", name: "表面 ジェム",       element: "全", image: "/cards/ur/front_7.png" },
      { id: "questpia_19", name: "表面 ボルト",       element: "全", image: "/cards/ur/front_8.png" },
      { id: "questpia_20", name: "表面 レム",         element: "全", image: "/cards/ur/front_9.png" },
      { id: "questpia_21", name: "表面 シェイド",     element: "全", image: "/cards/ur/front_10.png" },
      { id: "questpia_22", name: "表面 ユメ",         element: "全", image: "/cards/ur/front_11.png" },
      { id: "questpia_23", name: "表面 ルナのお父さん", element: "全", image: "/cards/ur/front_12.png" },
      { id: "questpia_24", name: "表面 ルナのお母さん", element: "全", image: "/cards/ur/front_13.png" },
      { id: "questpia_25", name: "表面 ロゴ",         element: "全", image: "/cards/ur/front_14.png" },
    ],
  },
}

const WORLD_ORDER = ["origins", "elements", "beyond", "questpia"]

// デモアカウント設定（GAS連携なし）
const DEMO_EMAIL  = "questa@tkm.demo"   // デモ1：originsのみ・100万コイン
const DEMO2_EMAIL = "questa2@tkm.demo"  // デモ2：全ワールド開放・questpia残り4枚・100万コイン
const DEMO_INITIAL_COINS = 1000000

const screens = ["opening", "login", "gacha", "video", "newReveal", "result", "collection", "stats", "urPuzzle"] as const
type ScreenType = (typeof screens)[number]

export default function WorldQuestGacha() {
  const [screen, setScreen] = useState<ScreenType>("opening")
  const [videoMuted, setVideoMuted] = useState(true)
  const [imagesPreloaded, setImagesPreloaded] = useState(false)
  const [preloadProgress, setPreloadProgress] = useState(0)
  const [email, setEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [coins, setCoins] = useState(100000)
  const [loginError, setLoginError] = useState("")
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [unlockedWorlds, setUnlockedWorlds] = useState(["origins"])
  const [ownedCharacters, setOwnedCharacters] = useState<{ [key: string]: boolean }>({})
  const [isDrawing, setIsDrawing] = useState(false)
  const [drawnCharacters, setDrawnCharacters] = useState<any[]>([])
  const [showCompleteModal, setShowCompleteModal] = useState(false)
  const [completeMessage, setCompleteMessage] = useState("")

  const [selectedCharacter, setSelectedCharacter] = useState<any>(null)
  const [pendingGachaCount, setPendingGachaCount] = useState(0)

  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [selectedLockedWorld, setSelectedLockedWorld] = useState<string | null>(null)


  const [showVaultDeliveryModal, setShowVaultDeliveryModal] = useState(false)
  const [vaultDeliveryWorld, setVaultDeliveryWorld] = useState<string | null>(null)
  
  // スプレッドシートから取得するワールド開放状態
  const [sheetWorldUnlocks, setSheetWorldUnlocks] = useState<{
    world6: boolean   // K列 - 試練の空域用
    world7: boolean   // L列 - 真理の空域用
    world9: boolean   // ワールド9 - UR用
    epilogue: boolean // エピローグ解放フラグ
  }>({ world6: false, world7: false, world9: false, epilogue: false })
  
  // スプレッドシートから取得するコンプリート状態
  const [completionStatus, setCompletionStatus] = useState<{
    origins: boolean
    elements: boolean
    beyond: boolean
  }>({ origins: false, elements: false, beyond: false })

  // カードキーシートから取得したワールド別所持枚数（重複あり）
  const [worldCardCounts, setWorldCardCounts] = useState<{ n: number; r: number; sr: number; ur: number }>({ n: 0, r: 0, sr: 0, ur: 0 })

  // BONUS MENU state
  const [showBonusModal, setShowBonusModal] = useState(false)

  // ボックスガチャ用のstate（各ワールドごとに残りカードを管理）
  const [gachaBoxes, setGachaBoxes] = useState<Record<string, string[]>>({})
  const [showCompleteConfirmModal, setShowCompleteConfirmModal] = useState(false)
  const [showEpilogueOnHome, setShowEpilogueOnHome] = useState(false)
  const [showUrCompleteOverlay, setShowUrCompleteOverlay] = useState(false)
  const [pendingCompleteGachaCount, setPendingCompleteGachaCount] = useState(0)
  const [newCardQueue, setNewCardQueue] = useState<any[]>([])
  const [currentNewCardIndex, setCurrentNewCardIndex] = useState(0)
  // UR Puzzle Gacha state
  const [urPieceCount, setUrPieceCount] = useState(0)
  const [urPuzzleQueue, setUrPuzzleQueue] = useState<number[]>([]) // sequence of piece indices to reveal
  const [urPuzzleQueueIndex, setUrPuzzleQueueIndex] = useState(0)
  const UR_TOTAL_PIECES = 25
  const UR_PHASE1_LIMIT = 10 // single draws only for first 10
  // Map piece index 0..25 to collection image: 95=empty, 96=piece1 ... 120=complete
  const getUrPuzzleImage = (count: number) => `/cards/ur/${95 + Math.min(count, UR_TOTAL_PIECES)}.png`
  // Result reveal image for draw N (1-indexed):
  //   Draws  1-11: triangle piece images  84.png ... 94.png
  //   Draws 12-25: full character images  /cards/ur/char/95.png ... 108.png
  const getUrResultImage = (pieceCount: number): { src: string; isCharacter: boolean } | null => {
    if (pieceCount >= 1 && pieceCount <= 11)
      return { src: `/cards/ur/${83 + pieceCount}.png`, isCharacter: false }
    if (pieceCount >= 12 && pieceCount <= 25)
      return { src: `/cards/ur/char/${83 + pieceCount}.png`, isCharacter: true }
    return null
  }
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)
  const [currentWorld, setCurrentWorld] = useState("origins")

  // gacha statistics state
  const [userStats, setUserStats] = useState<{
    totalSingleGacha: number
    total10Gacha: number
    cardCounts: Record<string, number>
    gachaHistory: Array<{
      timestamp: string
      type: string
      world: string
      cards: string[]
    }>
  } | null>(null)

  // LINE公式アカウントURL（コンプリート時に表示）
  const LINE_OFFICIAL_URL = "https://line.me/R/ti/p/@522dkpfe"

  // ボルトデリバリーのランク名
  const VAULT_DELIVERY_RANKS: Record<string, string> = {
    origins: "N",
    elements: "R", 
    beyond: "SR",
    questpia: "UR",
  }

  // ワールド開放条件メッセージ（未開放時に表示）
  const WORLD_UNLOCK_CONDITIONS: Record<string, string> = {
    elements: "Vol.1をコンプリートし、ワールド6を開放すると解放されます",
    beyond: "Vol.2をコンプリートし、ワールド7を開放すると解放されます",
    questpia: "Vol.1〜3を全てコンプリートし、ワールド9を開放すると解放されます",
  }

  // Opening screen auto-transition
  useEffect(() => {
    if (screen === "opening") {
      const timer = setTimeout(async () => {
        // Check localStorage for existing session
        const savedData = localStorage.getItem("worldQuestGacha")
        if (savedData) {
          const data = JSON.parse(savedData)
          const storedEmail = data.email
          const storedUserName = data.userName

          // デモアカウントのデータが残っていたら削除してログイン画面へ
          if (storedEmail && (storedEmail.toLowerCase() === DEMO_EMAIL || storedEmail.toLowerCase() === DEMO2_EMAIL)) {
            localStorage.removeItem("worldQuestGacha")
          }

          if (storedEmail && storedUserName && storedEmail.toLowerCase() !== DEMO_EMAIL && storedEmail.toLowerCase() !== DEMO2_EMAIL) {
            // Apply local state first for instant UI
            setCoins(data.coins || 100000)
            setCurrentWorld(data.currentWorld || "origins")
            setUnlockedWorlds(data.unlockedWorlds || ["origins"])
            setOwnedCharacters(data.ownedCharacters || {})
            setUrPieceCount(data.urPieceCount || data.cardCounts?.ur || 0)
            if (data.gachaBoxes) setGachaBoxes(data.gachaBoxes)
            if (data.sheetWorldUnlocks) setSheetWorldUnlocks(prev => ({
              ...prev,
              ...data.sheetWorldUnlocks,
              // epilogue はlocalStorageが true なら維持（スプレッドシートが未対応でも）
              epilogue: data.sheetWorldUnlocks.epilogue || prev.epilogue,
            }))
            setEmail(String(storedEmail).trim().toLowerCase())
            setUserName(storedUserName)
            setScreen("gacha")
            // セッション復元時もプリロードしないとコレクション画面がローディングのまま進まない
            preloadAllImages()

            // Then sync latest unlock state and cards from spreadsheet in background
            try {
              const [checkRes, cardsRes] = await Promise.all([
                fetch("/api/check-user", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email: storedEmail }),
                }),
                fetch("/api/get-cards", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email: storedEmail }),
                }),
              ])
              const checkData = await checkRes.json()
              const cardsData = await cardsRes.json()

              if (checkData.exists) {
                // Always use spreadsheet as source of truth for unlocks and coins
                if (checkData.unlockedWorlds && Array.isArray(checkData.unlockedWorlds)) {
                  setUnlockedWorlds(checkData.unlockedWorlds)
                }
                if (typeof checkData.coins === "number") {
                  setCoins(checkData.coins)
                }
                // スプレッドシートのワールド開放状態を取得
                if (checkData.sheetWorldUnlocks) {
                  setSheetWorldUnlocks(prev => ({
                    ...checkData.sheetWorldUnlocks,
                    // epilogueはlocalStateがtrueなら維持（スプレッドシートが空でも上書きしない）
                    epilogue: checkData.sheetWorldUnlocks.epilogue || prev.epilogue,
                  }))
                }
                // スプレッドシートのコンプリート状態を取得
                if (checkData.completionStatus) {
                  setCompletionStatus(checkData.completionStatus)
                }
              }
              if (cardsData.success) {
                if (cardsData.ownedCharacters) {
                  setOwnedCharacters(cardsData.ownedCharacters)
                }
                if (cardsData.worldCounts) {
                  setWorldCardCounts(cardsData.worldCounts)
                  setUrPieceCount(cardsData.worldCounts.ur ?? 0)
                }
              }
            } catch (e) {
              // silent — local state already applied
            }
            return
          }
        }
        setScreen("login")
      }, 3500)
      return () => clearTimeout(timer)
    }
  }, [screen])

  useEffect(() => {
    // デモアカウントはlocalStorageに保存しない
    if (email && userName && email.toLowerCase() !== DEMO_EMAIL && email.toLowerCase() !== DEMO2_EMAIL) {
      const data = {
        email,
        userName,
        coins,
        currentWorld,
        unlockedWorlds,
        ownedCharacters,
        urPieceCount,
        gachaBoxes,
        sheetWorldUnlocks,
      }
      localStorage.setItem("worldQuestGacha", JSON.stringify(data))
    }
  }, [email, userName, coins, currentWorld, unlockedWorlds, ownedCharacters, urPieceCount, gachaBoxes, sheetWorldUnlocks])

  useEffect(() => {
    if (!window.Vimeo) {
      const script = document.createElement("script")
      script.src = "https://player.vimeo.com/api/player.js"
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  useEffect(() => {
    if (screen === "video" && videoContainerRef.current) {
      setVideoMuted(true) // 毎回ミュート状態からスタート
      if (playerRef.current) {
        try { playerRef.current.destroy() } catch {}
        playerRef.current = null
      }

      // フォールバック：動画が再生されない場合でも自動で結果へ
      const fallbackTimer = setTimeout(() => {
        processGachaResults()
      }, 90 * 1000)

      const startPlayer = () => {
        if (!videoContainerRef.current) return
        const vw = window.innerWidth
        const vh = window.innerHeight

        // iOSのAutoplay制限対策：まずmuted:trueで確実に自動再生し、
        // 再生が始まったら即ミュート解除して音を出す
        const player = new window.Vimeo.Player(videoContainerRef.current, {
          id: 1165295588,
          autoplay: true,
          muted: true,      // ミュートで確実に自動再生、音声はボタンで解除
          loop: false,      // ループなし
          controls: false,
          playsinline: true,
          title: false,
          byline: false,
          portrait: false,
          width: vw,
          height: vh,
          responsive: true,
        })

        player.ready().then(() => {
          const iframe = videoContainerRef.current?.querySelector("iframe")
          if (iframe) {
            const videoAspect = 16 / 9
            const screenAspect = vw / vh
            const zoomFactor = screenAspect < videoAspect ? 1.5 : 1.0
            let scaleW, scaleH
            if (screenAspect < videoAspect) {
              scaleH = vh * zoomFactor
              scaleW = scaleH * videoAspect
            } else {
              scaleW = vw
              scaleH = scaleW / videoAspect
            }
            iframe.style.position = "absolute"
            iframe.style.border = "none"
            iframe.style.width = `${scaleW}px`
            iframe.style.height = `${scaleH}px`
            iframe.style.top = `${(vh - scaleH) / 2}px`
            iframe.style.left = `${(vw - scaleW) / 2}px`
          }
          player.play().catch(() => {})
        })

        // ended で確実に終了
        player.on("ended", () => {
          clearTimeout(fallbackTimer)
          try { player.destroy() } catch {}
          playerRef.current = null
          processGachaResults()
        })

        playerRef.current = player
      }

      // Vimeo SDK が未ロードなら動的に読み込む
      if (window.Vimeo) {
        startPlayer()
      } else {
        const script = document.createElement("script")
        script.src = "https://player.vimeo.com/api/player.js"
        script.onload = startPlayer
        document.head.appendChild(script)
      }

      return () => clearTimeout(fallbackTimer)
    }

    return () => {
      if (screen !== "video" && playerRef.current) {
        try { playerRef.current.destroy() } catch {}
        playerRef.current = null
      }
    }
  }, [screen])

  // Function to log gacha to spreadsheet


  // Function to fetch user stats
  const fetchUserStats = async () => {
    if (!email) return // Use 'email' from component state

    try {
      const response = await fetch("/api/get-user-stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }), // Use 'email' from component state
      })

      const data = await response.json()
      if (data.success && data.stats) {
        setUserStats(data.stats)
      }
    } catch (error) {
      console.error("[v0] Error fetching user stats:", error)
    }
  }

  const loadUserStats = async () => {
    if (!email) return

    try {
      const response = await fetch("/api/get-user-stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()
      if (data.success && data.stats) {
        setUserStats(data.stats)
      }
    } catch (error) {
      console.log("[v0] Failed to load user stats:", error)
    }
  }

  const getButtonImages = (rank: string) => {
    switch (rank.toUpperCase()) {
      case "N":  return { single: "/gacha-button-n-1x.png",  multi: "/gacha-button-n-10x.png"  } // エリア1: 20 / 180
      case "R":  return { single: "/gacha-button-r-1x.png",  multi: "/gacha-button-r-10x.png"  } // エリア2: 30 / 270
      case "SR": return { single: "/gacha-button-sr-1x.png", multi: "/gacha-button-sr-10x.png" } // エリア3: 50 / 450
      case "UR": return { single: "/gacha-button-ur-1x.png", multi: null }                        // エリア4: 100のみ（単発のみ）
      default:   return { single: "/gacha-button-n-1x.png",  multi: "/gacha-button-n-10x.png"  }
    }
  }

  // Removed performGachaAfterVideo as it's replaced by processGachaResults

  // コンプリート率計算
  const getCompletionRate = (worldId: string) => {
    const world = WORLDS[worldId]
    const total = world.characters.length
    const owned = world.characters.filter((char) => ownedCharacters[char.id]).length
    return { owned, total, percentage: Math.round((owned / total) * 100) }
  }

  // ワールドコンプリートチェック（ownedCharactersの実所持種類数で判定）
  const checkWorldCompletion = (worldId: string) => {
    if (worldId === "questpia") return urPieceCount >= UR_TOTAL_PIECES
    const world = WORLDS[worldId as keyof typeof WORLDS]
    if (!world) return false
    return world.characters.every((char) => ownedCharacters[char.id])
  }

  // 全コンプリート判定（N/R/SR/URすべてコンプリート）
  // questpiaはownedCharactersではなくurPieceCountで判定
  const isAllComplete =
    checkWorldCompletion("origins") &&
    checkWorldCompletion("elements") &&
    checkWorldCompletion("beyond") &&
    urPieceCount >= UR_TOTAL_PIECES

  // Unlock audio context on user interaction (for Vimeo sound on mobile)
  const unlockAudioContext = () => {
    try {
      // Create and resume AudioContext
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext
      if (AudioContext) {
        const ctx = new AudioContext()
        if (ctx.state === "suspended") {
          ctx.resume()
        }
        const buffer = ctx.createBuffer(1, 1, 22050)
        const source = ctx.createBufferSource()
        source.buffer = buffer
        source.connect(ctx.destination)
        source.start(0)
      }
      
      // Also play a silent HTML5 audio to unlock audio playback
      const silentAudio = new Audio("data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA")
      silentAudio.volume = 0.01
      silentAudio.play().catch(() => {})
    } catch {
      // silent fail
    }
  }

  // UR Puzzle Gacha - special handling for questpia world
  const performUrPuzzleGacha = (drawCount: number) => {
    const world = WORLDS.questpia
    const cost = drawCount === 1 ? world.cost : world.cost10
    if (coins < cost) return

    // Calculate which pieces will be revealed（残りが無ければコインを消費しない）
    const remaining = UR_TOTAL_PIECES - urPieceCount
    const actualDraw = Math.min(drawCount === 1 ? 1 : remaining, remaining)
    if (actualDraw <= 0) return

    unlockAudioContext()
    const newCoins = coins - cost
    setCoins(newCoins)
    syncCoinsToSpreadsheet(newCoins, cost)

    // Build the sequence: current+1, current+2, ... current+actualDraw
    const sequence = Array.from({ length: actualDraw }, (_, i) => urPieceCount + i + 1)

    // URピースもカードキーシートに x1〜x25 として記録する。
    // GASのgetUserはカードキーの x の数でURの進捗を返すため、記録しないと再ログインで0に戻る。
    // コイン消費と同じタイミングで保存し、演出中にブラウザを閉じても失われないようにする。
    const pieceIds = sequence.map((n) => `x${n}`)
    saveCardsToSpreadsheet(pieceIds)
    saveGachaLog(actualDraw, pieceIds, cost)
    setUrPuzzleQueue(sequence)
    setUrPuzzleQueueIndex(0)
    setPendingGachaCount(actualDraw)
    setScreen("video")
  }

  // ガチャ実行
  // ボックスガチャ用：ボックスを初期化（25種×2枚=50枚）
  const initializeGachaBox = (worldId: string): string[] => {
    const world = WORLDS[worldId as keyof typeof WORLDS]
    if (!world || worldId === "questpia") return [] // URはボックス対象外
    
    const box: string[] = []
    for (const char of world.characters) {
      box.push(char.id) // 1枚目
      box.push(char.id) // 2枚目
    }
    // シャッフル
    for (let i = box.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[box[i], box[j]] = [box[j], box[i]]
    }
    return box
  }

  // Phase1：軽量UIパーツのみ（背景画像はlayout.tsxのpreloadで並走）→ 完了次第遷移
  // Phase2：カード画像はバックグラウンドで随時読み込み
  const preloadAllImages = (): Promise<void> => {
    // Phase1: ボタン・ロゴ・ロック画像のみ（小サイズ・すぐ終わる）
    // gacha-bg / loading-bg-new / quest-alpha-logo はlayout.tsxの<link rel="preload">で先読み済み
    const phase1Images = [
      "/gacha-button-n-1x.png",
      "/gacha-button-n-10x.png",
      "/gacha-button-r-1x.png",
      "/gacha-button-r-10x.png",
      "/gacha-button-sr-1x.png",
      "/gacha-button-sr-10x.png",
      "/images/world-btn-origins.png",
      "/lock-button-r.png",
      "/lock-button-sr.png",
      "/lock-button-ur.png",
    ]

    // Phase2: カード画像（遷移後バックグラウンドで読み込む）
    const phase2Images = Object.values(WORLDS)
      .flatMap(w => w.characters.map(c => c.image))
      .filter(Boolean)

    const phase1Total = phase1Images.length
    if (phase1Total === 0) {
      setImagesPreloaded(true)
      setPreloadProgress(100)
      // Phase2はバックグラウンドで読み込み
      phase2Images.forEach(src => { const img = new Image(); img.src = src })
      return Promise.resolve()
    }

    return new Promise<void>((resolve) => {
      let resolved = false
      const finish = () => {
        if (resolved) return
        resolved = true
        setImagesPreloaded(true)
        setPreloadProgress(100)
        resolve()
      }
      // 最大5秒でタイムアウト強制遷移
      const timeout = setTimeout(finish, 5000)

      let loaded = 0
      phase1Images.forEach(src => {
        const img = new Image()
        img.onload = img.onerror = () => {
          loaded++
          setPreloadProgress(Math.floor((loaded / phase1Total) * 100))
          if (loaded >= phase1Total) {
            clearTimeout(timeout)
            setImagesPreloaded(true)
            resolve()
            // Phase2: 現在のワールドを最優先、他ワールドは5枚ずつ遅延ロード
            const currentWorldImages = (WORLDS[currentWorld as keyof typeof WORLDS]?.characters ?? [])
              .map(c => c.image).filter(Boolean)
            const otherImages = phase2Images.filter(src2 => !currentWorldImages.includes(src2))

            // Phase2a: 現在ワールドのカード画像（即座にバックグラウンドで開始）
            currentWorldImages.forEach(src2 => { const img2 = new Image(); img2.src = src2 })

            // Phase2b: 他ワールドのカード画像（5枚ずつ、100ms間隔で遅延ロード）
            const BATCH = 5
            let batch = 0
            const loadBatch = () => {
              const slice = otherImages.slice(batch * BATCH, (batch + 1) * BATCH)
              if (slice.length === 0) return
              slice.forEach(src2 => { const img2 = new Image(); img2.src = src2 })
              batch++
              if (batch * BATCH < otherImages.length) setTimeout(loadBatch, 100)
            }
            setTimeout(loadBatch, 500) // Phase2a完了後に開始
          }
        }
        img.src = src
      })
    })
  }

  const drawFromBox = (worldId: string, count: number): string[] => {
    let box = gachaBoxes[worldId]

    // ボックスがない場合は新規作成
    if (!box) {
      box = initializeGachaBox(worldId)
    }

    // ボックスに残りがある場合：残り枚数から引く
    if (box.length > 0) {
      const drawCount = Math.min(count, box.length)
      const drawn = box.slice(0, drawCount)
      const remaining = box.slice(drawCount)
      setGachaBoxes(prev => ({ ...prev, [worldId]: remaining }))

      // 引き切れなかった分はランダム補填
      if (drawCount < count) {
        const allCards = initializeGachaBox(worldId)
        const extra = Array.from({ length: count - drawCount }, () => {
          const idx = Math.floor(Math.random() * allCards.length)
          return allCards[idx]
        })
        return [...drawn, ...extra]
      }
      return drawn
    }

    // ボックスが空（50回コンプリート済み）→ 全カードからランダム抽選
    const allCards = initializeGachaBox(worldId)
    return Array.from({ length: count }, () => {
      const idx = Math.floor(Math.random() * allCards.length)
      return allCards[idx]
    })
  }

  // ボックス残数を取得（未初期化の場合は50枚扱い）
  const getBoxRemaining = (worldId: string): number => {
    if (worldId === "questpia") return Infinity
    const box = gachaBoxes[worldId]
    if (!box) return 50
    return box.length
  }

  const performGacha = (count: number) => {
    // UR Puzzle Gacha is special
    if (currentWorld === "questpia") {
      performUrPuzzleGacha(count)
      return
    }

    const world = WORLDS[currentWorld]
    const cost = count === 1 ? world.cost : world.cost10

    if (coins < cost) return

    // Unlock audio before video plays
    unlockAudioContext()

    const newCoins = coins - cost
    setCoins(newCoins)
    syncCoinsToSpreadsheet(newCoins, cost)

    setPendingGachaCount(count)
    setScreen("video")
  }

  const processGachaResults = () => {
    // UR Puzzle Gacha - special flow
    if (currentWorld === "questpia") {
      // Reveal pieces one by one starting from index 0 of the queue
      setUrPuzzleQueueIndex(0)
      setScreen("urPuzzle" as ScreenType)
      return
    }

    const world = WORLDS[currentWorld]
    const count = pendingGachaCount
    const results: any[] = []
    const newOwned = { ...ownedCharacters }

    // ボックスガチャ方式：ボックスからカードを引く
    const drawnIds = drawFromBox(currentWorld, count)
    
    for (const charId of drawnIds) {
      const char = world.characters.find(c => c.id === charId)
      if (char) {
        const isNew = !newOwned[char.id]
        newOwned[char.id] = true
        results.push({ ...char, isNew, world: world.name, rank: world.rank })
      }
    }

    setOwnedCharacters(newOwned)
    setDrawnCharacters(results)

    // 新規カードがあれば枚数に関わらず1枚ずつ表示してから result へ
    const newCards = results.filter((r) => r.isNew)
    if (newCards.length > 0) {
      setNewCardQueue(newCards)
      setCurrentNewCardIndex(0)
      setScreen("newReveal")
    } else {
      setScreen("result")
    }

    // 今回引いたカードIDを短縮形（n8, r3 等）に変換してカードキーシートに追記
    // origins_8 → n8, elements_3 → r3, beyond_5 → s5, questpia_1 → x1
    const worldPrefixMap: Record<string, string> = {
      origins: "n",
      elements: "r",
      beyond: "s",
      questpia: "x",
    }
    const drawnCardIds = results.map((r) => r.id)
    const drawnShortIds = drawnCardIds.map((id) => {
      const parts = id.split("_")
      const prefix = worldPrefixMap[parts[0]] || parts[0].charAt(0)
      return prefix + parts[1]
    })
    saveCardsToSpreadsheet(drawnShortIds)

    // worldCardCounts を実所持種類数でリアルタイム更新（ownedCharactersベース）
    const rankKey = world.rank.toLowerCase() as "n" | "r" | "sr" | "ur"
    const newOwnedCount = world.characters.filter((char) => newOwned[char.id]).length
    setWorldCardCounts(prev => ({ ...prev, [rankKey]: newOwnedCount }))

    // コンプ状況をN列に更新（25枚コンプ時のみ。GASは枚数を見ずにレア度を書き込むため、ここで絞る）
    const ownedCount = world.characters.filter((char) => newOwned[char.id]).length
    if (ownedCount >= world.characters.length) {
      saveCompletionToSpreadsheet(world.rank, ownedCount)
    }

    // ガチャログを記録
    saveGachaLog(count, drawnShortIds, count === 1 ? world.cost : world.cost10)

    setTimeout(() => {
      const wasCompleteBeforeDraw = world.characters.every((char) => ownedCharacters[char.id])
      const isCompleteAfterDraw = world.characters.every((char) => newOwned[char.id])
      
      // 今回の抽選で初めてコンプリートした場合、Vault Deliveryモーダルを表示
      if (!wasCompleteBeforeDraw && isCompleteAfterDraw) {
        setVaultDeliveryWorld(currentWorld)
        setShowVaultDeliveryModal(true)
      }
    }, 1000)
  }

  // 現在のワールドでガチャを引けるか判定
  // origins は常に引ける。それ以降は前のワールドがコンプ済みである必要がある
  const canGachaInWorld = (worldId: string): boolean => {
    if (!unlockedWorlds.includes(worldId)) return false
    const idx = WORLD_ORDER.indexOf(worldId)
    if (idx <= 0) return true
    const prevWorldId = WORLD_ORDER[idx - 1]
    return checkWorldCompletion(prevWorldId)
  }

  // ワールド選択（矢印・ドットは自由にブラウズ可。ガチャはcanGachaInWorldで制御）
  const selectWorld = (worldId: string) => {
    if (unlockedWorlds.includes(worldId)) {
      setCurrentWorld(worldId)
    } else {
      // ロックされたワールドをタップした場合、開放条件を表示
      setSelectedLockedWorld(worldId)
      setShowPasswordModal(true)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("worldQuestGacha")
    setEmail("")
    setUserName("")
    setCoins(100000)
    setCurrentWorld("origins")
    setUnlockedWorlds(["origins"])
    setOwnedCharacters({})
    setUserStats(null) // Reset user stats on logout
    setScreen("login")
  }

  // コンプリート時のVault Delivery案内用のランク名取得
  const getVaultDeliveryRank = (worldId: string): string => {
    return VAULT_DELIVERY_RANKS[worldId] || ""
  }



  const currentWorldData = WORLDS[currentWorld]
  // UR (questpia) uses urPieceCount instead of character count
  const completion = currentWorld === "questpia"
    ? { owned: urPieceCount, total: UR_TOTAL_PIECES, percentage: Math.round((urPieceCount / UR_TOTAL_PIECES) * 100) }
    : getCompletionRate(currentWorld)
  const isComplete = currentWorld === "questpia"
    ? urPieceCount >= UR_TOTAL_PIECES
    : checkWorldCompletion(currentWorld)

  const handleEmailLogin = async () => {
    if (!email.trim()) {
      setLoginError("メールアドレスを入力してください")
      return
    }

    setIsLoggingIn(true)
    setLoginError("")

    // デモ1：originsのみ解放・GAS連携なし・100万コイン
    if (email.trim().toLowerCase() === DEMO_EMAIL) {
      setUserName("デモユーザー1")
      setEmail(email.trim().toLowerCase())
      setCoins(DEMO_INITIAL_COINS)
      setUnlockedWorlds(["origins"])
      setSheetWorldUnlocks({ world6: false, world7: false, world9: false, epilogue: false })
      setCompletionStatus({ origins: false, elements: false, beyond: false })
      setOwnedCharacters({})
      setWorldCardCounts({ n: 0, r: 0, sr: 0, ur: 0 })
      setUrPieceCount(0)
      setCurrentWorld("origins")
      await preloadAllImages()
      setScreen("gacha")
      setIsLoggingIn(false)
      return
    }

    // デモ2：全ワールド解放・origins/elements/beyondコンプ済み・questpia残り4枚・100万コイン
    if (email.trim().toLowerCase() === DEMO2_EMAIL) {
      // origins(1-25) / elements(1-25) / beyond(1-25) 全75枚を所持済みに設定
      const demo2Owned: { [key: string]: boolean } = {}
      for (let i = 1; i <= 25; i++) { demo2Owned[`origins_${i}`]  = true }
      for (let i = 1; i <= 25; i++) { demo2Owned[`elements_${i}`] = true }
      for (let i = 1; i <= 25; i++) { demo2Owned[`beyond_${i}`]   = true }
      setUserName("デモユーザー2")
      setEmail(email.trim().toLowerCase())
      setCoins(DEMO_INITIAL_COINS)
      setUnlockedWorlds(["origins", "elements", "beyond", "questpia"])
      setSheetWorldUnlocks({ world6: true, world7: true, world9: true, epilogue: false })
      setCompletionStatus({ origins: true, elements: true, beyond: true })
      setOwnedCharacters(demo2Owned)
      setWorldCardCounts({ n: 25, r: 25, sr: 25, ur: 11 })
      setUrPieceCount(11)
      setCurrentWorld("questpia")
      await preloadAllImages()
      setScreen("gacha")
      setIsLoggingIn(false)
      return
    }

    try {
      const response = await fetch("/api/check-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        setLoginError(data.error || "エラーが発生しました。もう一度お試しください。")
        setIsLoggingIn(false)
        return
      }

      if (data.exists) {
        // 以降の書き込み（コイン・カード・ログ）がシートの行と一致するよう正規化して保持
        setEmail(email.trim().toLowerCase())
        setUserName(data.name)
        setCoins(data.coins)

        // Restore unlocked worlds from spreadsheet
        if (data.unlockedWorlds && Array.isArray(data.unlockedWorlds)) {
          setUnlockedWorlds(data.unlockedWorlds)
        }
        
        // スプレッドシートのワールド開放状態を取得
        if (data.sheetWorldUnlocks) {
          setSheetWorldUnlocks(data.sheetWorldUnlocks)
        }
        // スプレッドシートのコンプリート状態を取得
        if (data.completionStatus) {
          setCompletionStatus(data.completionStatus)
        }

        // カードキーシートから所持カードと枚数を取得
        try {
          const cardsResponse = await fetch("/api/get-cards", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email.trim() }),
          })
          const cardsData = await cardsResponse.json()
          if (cardsData.success) {
            if (cardsData.ownedCharacters) {
              setOwnedCharacters(cardsData.ownedCharacters)
            }
            if (cardsData.worldCounts) {
              setWorldCardCounts(cardsData.worldCounts)
              setUrPieceCount(cardsData.worldCounts.ur ?? 0)
            }
          }
        } catch (cardsError) {
          console.error("[v0] Error loading cards:", cardsError)
        }

        // GAS通信完了後に画像プリロードを実行（まだ完了していなければここで待つ）
        if (!imagesPreloaded) {
          await preloadAllImages()
        }

        setScreen("gacha")
        // Fetch user stats after successful login
        fetchUserStats()
      } else {
        setLoginError("ログインできません。登録されていないメールアドレスです。")
      }
    } catch (error) {
      console.error("[v0] Login error:", error)
      setLoginError("接続エラーが発生しました。ネットワーク接続を確認してください。")
    } finally {
      setIsLoggingIn(false)
    }
  }

  // 今回引いたカードIDリストをカードキーシートに追記
  const saveCardsToSpreadsheet = async (drawnCardIds: string[]) => {
    if (!email || drawnCardIds.length === 0) return
    if (email.toLowerCase() === DEMO_EMAIL || email.toLowerCase() === DEMO2_EMAIL) return
    try {
      const response = await fetch("/api/save-cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, drawnCards: drawnCardIds }),
      })
      const data = await response.json()
      console.log("[v0] Cards saved to spreadsheet:", data)
    } catch (error) {
      console.error("[v0] Error saving cards:", error)
    }
  }

  const saveCompletionToSpreadsheet = async (rarity: string, count: number, shouldRecheck = true) => {
    if (!email) return
    if (email.toLowerCase() === DEMO_EMAIL || email.toLowerCase() === DEMO2_EMAIL) {
      if (shouldRecheck && count >= 25) recheckUnlocks()
      return
    }
    try {
      await fetch("/api/save-completion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, rarity, count }),
      })
      // コンプリート達成後のみ解放条件を再チェック（URの途中ピースでは不要）
      if (shouldRecheck && count >= 25) {
        recheckUnlocks()
      }
    } catch (error) {
      console.warn("[v0] Error saving completion:", error)
    }
  }

  // 解放条件を再チェック（check-user APIを呼び直す）
  const recheckUnlocks = async () => {
    if (!email) return

    // デモアカウント：ownedCharactersの実所持種類数で判定（GAS不使用）
    if (email.toLowerCase() === DEMO_EMAIL || email.toLowerCase() === DEMO2_EMAIL) {
      setCompletionStatus({
        origins:  WORLDS.origins.characters.every(c => ownedCharacters[c.id]),
        elements: WORLDS.elements.characters.every(c => ownedCharacters[c.id]),
        beyond:   WORLDS.beyond.characters.every(c => ownedCharacters[c.id]),
      })
      return
    }

    try {
      const res = await fetch("/api/check-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.exists && data.unlockedWorlds && Array.isArray(data.unlockedWorlds)) {
        setUnlockedWorlds(data.unlockedWorlds)
      }
      if (data.completionStatus) {
        setCompletionStatus(data.completionStatus)
      }
      if (data.sheetWorldUnlocks) {
        setSheetWorldUnlocks(prev => ({
          ...data.sheetWorldUnlocks,
          epilogue: data.sheetWorldUnlocks.epilogue || prev.epilogue,
        }))
      }
      if (data.cardCounts) {
        setUrPieceCount(prev => Math.max(prev, data.cardCounts.ur || 0))
      }
    } catch (error) {
      console.warn("[v0] Error rechecking unlocks:", error)
    }
  }

  const saveGachaLog = async (gachaCount: number, drawnCardIds: string[], spentCoins: number) => {
    if (!email) return
    if (email.toLowerCase() === DEMO_EMAIL || email.toLowerCase() === DEMO2_EMAIL) return
    try {
      await fetch("/api/save-gacha-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: userName,
          gachaCount,
          drawnCards: drawnCardIds,
          consumedCoins: spentCoins,
        }),
      })
    } catch (error) {
      console.warn("[v0] Error saving gacha log:", error)
    }
  }

  const syncCoinsToSpreadsheet = async (newCoins: number, spentAmount: number = 0) => {
    if (!email) return
    if (email.toLowerCase() === DEMO_EMAIL || email.toLowerCase() === DEMO2_EMAIL) return

    try {
      const response = await fetch("/api/update-coins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, coins: newCoins, spent: spentAmount }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.warn("[v0] Spreadsheet sync failed (gacha continues normally):", errorText)
        // Silently fail - don't block gacha functionality
        return
      }

      const data = await response.json()
      console.log("[v0] Coins synced to spreadsheet successfully:", data)
    } catch (error) {
      console.warn("[v0] Spreadsheet sync error (gacha continues normally):", error)
      // Silently fail - don't block gacha functionality
    }
  }

  useEffect(() => {
    if (email && userName) {
      // Check for logged-in state using email and userName
      fetchUserStats()
    }
  }, [email, userName]) // Depend on email and userName to re-fetch if they change

  // Opening animation screen
  if (screen === "opening") {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
        {/* Background - fantasy landscape */}
        <div className="absolute inset-0" style={{ animation: "openingBgReveal 3s ease-out forwards" }}>
          <img
            src="/sky-islands-background.png"
            alt="Opening"
            className="w-full h-full object-cover"
            style={{ animation: "openingZoom 3.5s ease-out forwards" }}
          />
          <div className="absolute inset-0 bg-black/30" style={{ animation: "openingFadeOverlay 3s ease-out forwards" }} />
        </div>

        {/* Logo - main focus */}
        <div className="relative z-10 flex flex-col items-center" style={{ animation: "openingLogoReveal 2s ease-out 0.5s forwards", opacity: 0 }}>
          <img
            src="/quest-alpha-logo.png"
            alt="Quest+α"
            className="w-[500px] max-w-[90vw] drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          />

          {/* Loading indicator */}
          <div className="mt-10 flex flex-col items-center gap-3" style={{ animation: "openingLogoReveal 1.5s ease-out 1.5s forwards", opacity: 0 }}>
            {/* Animated line */}
            <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-full bg-gradient-to-r from-transparent via-white/70 to-transparent rounded-full" style={{ animation: "openingLineSlide 1.8s ease-in-out infinite" }} />
            </div>
            <p className="text-white/60 text-xs tracking-[0.3em] font-light">NOW LOADING</p>
          </div>
        </div>
      </div>
    )
  }

  if (screen === "login") {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ animation: "screenFadeIn 0.8s ease-out forwards" }}>
        {/* Background */}
        <div className="absolute inset-0">
          <img src="/login-bg.png" alt="Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Login Form */}
        <div className="relative z-10 w-full max-w-md p-8 backdrop-blur-lg bg-white/10 rounded-2xl shadow-2xl" style={{ animation: "loginFormAppear 0.6s ease-out 0.3s forwards", opacity: 0, transform: "translateY(20px)" }}>
          <h1 className="text-4xl font-bold text-white mb-8 text-center drop-shadow-lg">Quest+α ガチャ</h1>

          <div className="space-y-4">
            <div>
              <label className="block text-white text-sm mb-2 drop-shadow">メールアドレス</label>
              <Input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setLoginError("")
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleEmailLogin()
                  }
                }}
                className="bg-white/90 text-black border-white/50 placeholder:text-gray-500"
              />
            </div>

            {loginError && (
              <div className="text-red-500 text-sm bg-red-100 p-3 rounded whitespace-pre-wrap">{loginError}</div>
            )}

            <Button
              onClick={handleEmailLogin}
              disabled={!email || isLoggingIn}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 text-lg"
            >
              {isLoggingIn ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" style={{ animation: "loadingSpin 0.8s linear infinite" }} />
                  接続中...
                </span>
              ) : "ログイン"}
            </Button>
          </div>
        </div>

        {/* Login loading overlay */}
        {isLoggingIn && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center" style={{ animation: "screenFadeIn 0.3s ease-out forwards" }}>
            {/* Background */}
            <div className="absolute inset-0">
              <img src="/loading-bg-new.png" alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />
            </div>
            {/* Logo + progress */}
            <div className="relative z-10 flex flex-col items-center gap-6">
              <img src="/quest-alpha-logo.png" alt="Quest+α" className="w-72 max-w-[80vw] drop-shadow-[0_0_30px_rgba(255,255,255,0.25)]" style={{ animation: "loadingPulse 2s ease-in-out infinite" }} />
              <div className="flex flex-col items-center gap-3 w-56">
                {/* プログレスバー */}
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${preloadProgress}%`,
                      background: "linear-gradient(90deg, rgba(99,179,237,0.8), rgba(255,255,255,0.9))",
                    }}
                  />
                </div>
                <div className="flex items-center justify-between w-full">
                  <p className="text-white/60 text-xs tracking-[0.3em] font-light">NOW LOADING</p>
                  <p className="text-white/50 text-xs font-mono">{preloadProgress}%</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // This block is effectively removed by setting screen to "gacha" directly if email/userName is found in localStorage.
  // The original 'name' screen logic is commented out and the component does not render anything for it.
  // if (screen === "name") {
  //   setScreen("gacha")
  //   return null
  // }

  if (screen === "gacha") {
    return (
      <div className="min-h-screen relative overflow-hidden flex flex-col bg-blue-950" style={{ animation: "gachaScreenEnter 0.6s ease-out forwards" }}>
        {/* 背景イメージ */}
        <div className="absolute inset-0">
          <img src="/gacha-bg.png" alt="Gacha Background" className="w-full h-full object-contain" />
          <div className="absolute inset-0 bg-blue-950/60" />
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 h-full w-[500px] pointer-events-none top-[120px]">
          <img
            src="https://res.cloudinary.com/dha0jzyxm/image/upload/f_png/クエスタカード_4_xth3xs"
            alt="Guide Character"
            className="w-full h-full object-contain object-bottom"
          />
        </div>

        {/* 光粒子エフェクト */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 80 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                opacity: Math.random() * 0.8 + 0.2,
              }}
            />
          ))}
        </div>

        {/* ヘッダー */}
        <div className="relative z-10 px-3 py-2 bg-blue-900/60 backdrop-blur-sm border-b border-white/20 shadow-2xl">
          <div className="max-w-lg mx-auto">
            {/* 1行目：Quest+α（左）｜コレクション（中）｜ログアウト（右） */}
            <div className="grid grid-cols-3 items-center mb-1.5">
              <h1 className="text-lg font-bold text-white">Quest+α</h1>
              <div className="flex justify-center">
                <Button
                  onClick={() => setScreen("collection")}
                  variant="ghost"
                  className="text-white hover:bg-white/20 rounded-xl text-sm px-3 py-1.5 h-auto"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  コレクション
                </Button>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleLogout} variant="ghost" className="text-white hover:bg-red-500/20 rounded-xl text-sm px-3 py-1.5 h-auto">
                  ログアウト
                </Button>
              </div>
            </div>

            {/* 2行目：名前（左）｜夢の欠片（中）｜LINE（右） */}
            <div className="grid grid-cols-3 items-center">
              <p className="text-sm text-blue-200 truncate">{userName}</p>
              <div className="flex justify-center">
                <div className="flex items-center gap-1.5 bg-yellow-500 rounded-full px-3 py-1.5">
                  <Coins className="w-4 h-4 text-yellow-900 flex-shrink-0" />
                  <span className="text-yellow-900 font-bold text-sm whitespace-nowrap">夢の欠片【{coins.toLocaleString()}】</span>
                </div>
              </div>
              <div className="flex justify-end">
                <a
                  href={LINE_OFFICIAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1.5 bg-[#06C755] hover:bg-[#05b34d] text-white rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .195-.095.369-.238.482l-.021.013-3.378 2.58.438 4.043a.628.628 0 01-.627.688.614.614 0 01-.372-.124l-3.287-2.464-3.287 2.464a.614.614 0 01-.372.124.628.628 0 01-.627-.688l.438-4.043-3.378-2.58-.021-.013a.629.629 0 01-.238-.482c0-.346.281-.631.63-.631h4.169l1.686-3.885a.629.629 0 011.142 0l1.686 3.885h4.169z"/>
                  </svg>
                  LINE
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ワールド選択カルーセル */}
        {(() => {
          const currentIndex = WORLD_ORDER.indexOf(currentWorld)
          const canPrev = currentIndex > 0
          const canNext = currentIndex < WORLD_ORDER.length - 1

          // ロック・アンロック問わずエリア移動（スライド用）
          const goNext = () => {
            if (canNext) {
              const nextId = WORLD_ORDER[currentIndex + 1]
              setCurrentWorld(nextId)
            }
          }
          const goPrev = () => {
            if (canPrev) {
              const prevId = WORLD_ORDER[currentIndex - 1]
              setCurrentWorld(prevId)
            }
          }
          const showLockCondition = () => {
            setSelectedLockedWorld(currentWorld)
            setShowPasswordModal(true)
          }

          // スワイプ対応
          let touchStartX = 0
          const onTouchStart = (e: React.TouchEvent) => { touchStartX = e.touches[0].clientX }
          const onTouchEnd = (e: React.TouchEvent) => {
            const diff = touchStartX - e.changedTouches[0].clientX
            if (diff > 50) goNext()
            else if (diff < -50) goPrev()
          }

          const worldId = currentWorld
          const world = WORLDS[worldId]
          const isUnlocked = unlockedWorlds.includes(worldId)
          // ガチャを引ける状態か（前ワールドのコンプ含む）
          const canGacha = canGachaInWorld(worldId)

          const lockImage = (() => {
            if (worldId === "elements") return "/lock-button-r.png"
            if (worldId === "beyond") return "/lock-button-sr.png"
            if (worldId === "questpia") return "/lock-button-ur.png"
            return "/lock-button-r.png"
          })()

          return (
            <div className="relative z-10 pt-2 pb-1 flex flex-col items-start pl-4"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {/* カード本体（左寄り配置） */}
              <button
                className="relative w-52 h-32 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all active:scale-95 hover:scale-[1.02]"
                style={{
                  borderColor: canGacha
                    ? worldId === "origins" ? "rgba(34,197,94,0.9)"
                    : worldId === "elements" ? "rgba(6,182,212,0.9)"
                    : worldId === "beyond" ? "rgba(234,179,8,0.9)"
                    : "rgba(249,115,22,0.9)"
                    : "rgba(100,116,139,0.5)",
                  boxShadow: canGacha
                    ? worldId === "origins" ? "0 0 18px rgba(34,197,94,0.5), 0 6px 24px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.15)"
                    : worldId === "elements" ? "0 0 18px rgba(6,182,212,0.5), 0 6px 24px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.15)"
                    : worldId === "beyond" ? "0 0 18px rgba(234,179,8,0.5), 0 6px 24px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.15)"
                    : "0 0 18px rgba(249,115,22,0.5), 0 6px 24px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.15)"
                    : "0 4px 16px rgba(0,0,0,0.8)",
                }}
                onClick={!canGacha ? showLockCondition : undefined}
              >
                {canGacha && world.buttonImage ? (
                  <img
                    src={world.buttonImage}
                    alt={world.name}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                ) : canGacha ? (
                  <div className={`w-full h-full flex items-center justify-center ${world.theme.primary}`}>
                    {React.createElement(world.icon, { className: "w-10 h-10 text-white" })}
                  </div>
                ) : (
                  <>
                    <img
                      src={lockImage}
                      alt={`${world.name} (ロック)`}
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                    {/* ロックオーバーレイ */}
                    <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-1">
                      <Lock className="w-7 h-7 text-white/90 drop-shadow-lg" />
                      <span className="text-white/80 text-[10px] font-semibold tracking-wider">タップで条件確認</span>
                    </div>
                  </>
                )}
              </button>

              {/* カード下：三角矢印＋ドットインジケーター */}
              {(() => {
                const arrowColor = worldId === "origins"
                  ? { fill: "rgba(34,197,94,1)", stroke: "rgba(255,255,255,0.7)", glow: "0 0 10px rgba(255,255,255,0.9), 0 2px 8px rgba(255,255,255,0.7)" }
                  : worldId === "elements"
                  ? { fill: "rgba(6,182,212,1)", stroke: "rgba(255,255,255,0.7)", glow: "0 0 10px rgba(255,255,255,0.9), 0 2px 8px rgba(255,255,255,0.7)" }
                  : worldId === "beyond"
                  ? { fill: "rgba(234,179,8,1)", stroke: "rgba(255,255,255,0.7)", glow: "0 0 10px rgba(255,255,255,0.9), 0 2px 8px rgba(255,255,255,0.7)" }
                  : { fill: "rgba(249,115,22,1)", stroke: "rgba(255,255,255,0.7)", glow: "0 0 10px rgba(255,255,255,0.9), 0 2px 8px rgba(255,255,255,0.7)" }

                return (
                  <div className="flex items-center gap-2 mt-2 w-52">
                    {/* 左三角矢印 */}
                    <button
                      onClick={goPrev}
                      disabled={!canPrev}
                      className="flex items-center justify-center w-10 h-10 rounded-full disabled:opacity-15 disabled:cursor-not-allowed transition-all active:scale-85"
                      style={{
                        background: canPrev ? "rgba(0,0,0,0.4)" : "transparent",
                        filter: canPrev ? `drop-shadow(${arrowColor.glow}) drop-shadow(0 2px 4px rgba(0,0,0,0.6))` : undefined,
                        border: canPrev ? `1px solid ${arrowColor.stroke}` : "none",
                      }}
                    >
                      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                        <polygon
                          points="19,3 19,23 5,13"
                          fill={canPrev ? arrowColor.fill : "rgba(255,255,255,0.15)"}
                          stroke={canPrev ? "rgba(255,255,255,0.4)" : "none"}
                          strokeWidth="1"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {/* ドットインジケーター（中央） */}
                    <div className="flex gap-2 justify-center flex-1">
                      {WORLD_ORDER.map((id, i) => (
                        <button
                          key={id}
                          onClick={() => setCurrentWorld(id)}
                          className="rounded-full transition-all"
                          style={{
                            width: i === currentIndex ? "16px" : "8px",
                            height: "8px",
                            background: i === currentIndex ? arrowColor.fill : "rgba(255,255,255,0.25)",
                            boxShadow: i === currentIndex ? arrowColor.glow : undefined,
                          }}
                        />
                      ))}
                    </div>

                    {/* 右三角矢印 */}
                    <button
                      onClick={goNext}
                      disabled={!canNext}
                      className="flex items-center justify-center w-10 h-10 rounded-full disabled:opacity-15 disabled:cursor-not-allowed transition-all active:scale-85"
                      style={{
                        background: canNext ? "rgba(0,0,0,0.4)" : "transparent",
                        filter: canNext ? `drop-shadow(${arrowColor.glow}) drop-shadow(0 2px 4px rgba(0,0,0,0.6))` : undefined,
                        border: canNext ? `1px solid ${arrowColor.stroke}` : "none",
                      }}
                    >
                      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                        <polygon
                          points="7,3 7,23 21,13"
                          fill={canNext ? arrowColor.fill : "rgba(255,255,255,0.15)"}
                          stroke={canNext ? "rgba(255,255,255,0.4)" : "none"}
                          strokeWidth="1"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                )
              })()}
            </div>
          )
        })()}

        {/* メインコンテンツ */}
        <div className="relative z-10 flex-1 flex items-end justify-center px-6 pb-8">
          <div className="w-full max-w-xs">

            <style>{`
              @keyframes pulse-glow {
                0%, 100% { opacity: 1; filter: brightness(1); }
                50% { opacity: 0.92; filter: brightness(1.15); }
              }
            `}</style>

            {/* ロック中 or 前ワールド未コンプの場合はロック表示 */}
            {!canGachaInWorld(currentWorld) ? (
              <button
                onClick={() => { setSelectedLockedWorld(currentWorld); setShowPasswordModal(true) }}
                className="w-full py-5 rounded-xl bg-slate-800/70 border border-slate-600/50 backdrop-blur-sm flex flex-col items-center gap-2 transition-all active:scale-95"
              >
                <Lock className="w-8 h-8 text-slate-400" />
                <span className="text-slate-300 text-sm font-semibold tracking-wider">開放条件を確認する</span>
              </button>
            ) : null}

            {/* ガチャボタン (前ワールドコンプ済みのみ) */}
            {canGachaInWorld(currentWorld) && (urPieceCount < UR_TOTAL_PIECES || currentWorld !== "questpia") ? (() => {
              const isComplete = currentWorld === "questpia"
                ? urPieceCount >= UR_TOTAL_PIECES
                : checkWorldCompletion(currentWorld)

              const boxRemaining = getBoxRemaining(currentWorld)
              const isCeiling = false // 50回以降はランダムで引き続けられる

              const handleGacha = (count: number) => {
                if (isComplete) {
                  setPendingCompleteGachaCount(count)
                  setShowCompleteConfirmModal(true)
                } else {
                  performGacha(count)
                }
              }

              return (
                <div className="flex flex-col gap-2">
                  {/* エピローグパスワード表示（questpia + 全コンプリート + epilogue解放済み） */}
                  {currentWorld === "questpia" && isAllComplete && sheetWorldUnlocks.epilogue && (
                    <div
                      className="rounded-xl px-4 py-2 mb-2 border-2 border-yellow-400/70 text-center"
                      style={{
                        background: "linear-gradient(135deg, rgba(120,80,0,0.7), rgba(60,40,0,0.85))",
                        boxShadow: "0 0 18px rgba(250,204,21,0.4), 0 4px 16px rgba(0,0,0,0.6)",
                        animation: "epiloguePop 0.5s cubic-bezier(0.34,1.56,0.64,1) both",
                      }}
                    >
                      <p className="text-yellow-300 text-[10px] font-bold tracking-widest mb-1.5">エピローグ パスワード</p>
                      <div className="flex items-center justify-center gap-1.5">
                        {["7", "E", "10", "B"].map((key, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <span
                              className="min-w-[32px] h-8 px-1 rounded-lg flex items-center justify-center font-bold text-base text-yellow-200 border border-yellow-400/60"
                              style={{
                                background: "rgba(250,204,21,0.15)",
                                textShadow: "0 0 8px rgba(250,204,21,0.8)",
                                animation: `epilogueKeyPop 0.4s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.08 + 0.2}s both`,
                              }}
                            >
                              {key}
                            </span>
                            {i < 3 && <span className="text-yellow-500/60 text-xs">→</span>}
                          </div>
                        ))}
                      </div>
                      <style>{`
                        @keyframes epiloguePop {
                          from { opacity: 0; transform: scale(0.85); }
                          to   { opacity: 1; transform: scale(1); }
                        }
                        @keyframes epilogueKeyPop {
                          from { opacity: 0; transform: translateY(6px) scale(0.8); }
                          to   { opacity: 1; transform: translateY(0) scale(1); }
                        }
                      `}</style>
                    </div>
                  )}

                  {/* questpia + 全コンプリート + epilogue未解放 → 案内表示 */}
                  {currentWorld === "questpia" && isAllComplete && !sheetWorldUnlocks.epilogue && (
                    <button
                      onClick={() => setShowBonusModal(true)}
                      className="w-full rounded-xl px-4 py-2 mb-2 border-2 border-yellow-400/50 text-center transition-all active:scale-95"
                      style={{
                        background: "rgba(120,80,0,0.4)",
                        boxShadow: "0 0 12px rgba(250,204,21,0.2), 0 4px 12px rgba(0,0,0,0.5)",
                      }}
                    >
                      <p className="text-yellow-300 text-[10px] font-bold tracking-widest mb-0.5">エピローグ解放</p>
                      <p className="text-yellow-100/70 text-[10px]">BONUS MENUから「エピローグを解放する」</p>
                    </button>
                  )}

                  {/* コンプリート率（ガチャボタンと同幅・アンロック時のみ） */}
                  <div
                    className={`rounded-xl px-4 py-1.5 mb-1 border-2 ${currentWorldData.theme.border} ${currentWorldData.theme.primary}`}
                    style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)" }}
                  >
                    <h3 className="text-white text-xs font-bold mb-1 text-center tracking-widest"
                      style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>
                      コンプリート率
                    </h3>
                    <Progress value={completion.percentage} className="h-1.5 mb-1" />
                    <div className="flex items-center justify-center gap-2">
                      <p className="text-white font-bold text-sm" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>{completion.owned}/{completion.total}</p>
                      <p className="text-blue-100 text-xs">{completion.percentage}%</p>
                    </div>
                  </div>



                  {/* ガチャボタン */}
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => handleGacha(1)}
                      disabled={coins < currentWorldData.cost || isDrawing || isCeiling}
                      className="relative overflow-hidden rounded-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ width: "calc(50% - 6px)", boxShadow: "0 4px 20px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.1)", filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.5))" }}
                    >
                      <img
                        src={getButtonImages(currentWorldData.rank).single ?? ""}
                        alt="Single Summon"
                        className="w-full h-auto"
                      />
                      {coins < currentWorldData.cost && !isCeiling && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">夢の欠片不足</span>
                        </div>
                      )}
                    </button>

                    {currentWorld !== "questpia" && (
                      <button
                        onClick={() => handleGacha(10)}
                        disabled={coins < currentWorldData.cost10 || isDrawing}
                        className="relative overflow-hidden rounded-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ width: "calc(50% - 6px)", margin: currentWorld === "questpia" ? "0 auto" : undefined, boxShadow: "0 4px 20px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.1)", filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.5))" }}
                      >
                        <img
                          src={getButtonImages(currentWorldData.rank).multi ?? ""}
                          alt="Multi Summon"
                          className="w-full h-auto"
                        />
                        {coins < currentWorldData.cost10 && !isCeiling && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">夢の欠片不足</span>
                          </div>
                        )}
                      </button>
                    )}
                  </div>


                </div>
              )
            })() : canGachaInWorld(currentWorld) ? (
              <div className="text-center py-6">
                <p className="text-yellow-300 font-bold text-lg">パズル完成！</p>
                <p className="text-white/60 text-sm mt-1">コレクションで確認しよう</p>
              </div>
            ) : null}
          </div>
        </div>

        {/* コンプリートモーダル */}
        {/* {showCompleteModal && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 backdrop-blur-md p-4 animate-fade-in">
            <div
              className={`bg-gradient-to-br ${currentWorldData.theme.primary} rounded-3xl p-8 max-w-md w-full shadow-2xl border-4 ${currentWorldData.theme.border} ${currentWorldData.theme.glow}`}
            >
              <div className="text-center">
                <div className="text-7xl mb-6 animate-bounce">✨</div>
                <h2 className="text-4xl font-bold text-white mb-6 drop-shadow-2xl">ワールド制覇！</h2>
                <p className="text-white text-lg mb-8 leading-relaxed drop-shadow-md">{completeMessage}</p>
                <Button
                  onClick={() => setShowCompleteModal(false)}
                  className="w-full h-16 bg-white text-black hover:bg-white/90 rounded-xl font-bold text-lg shadow-2xl active:scale-95"
                >
                  冒険を続ける
                </Button>
              </div>
            </div>
          </div>
        )} */}

        {/* コンプリート直後：エピローグパスワードをホーム画面で表示 → コレクションへ */}
        {showEpilogueOnHome && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <div
              className="relative z-10 w-full max-w-xs rounded-2xl overflow-hidden shadow-2xl text-center"
              style={{ animation: "completeModalPop 0.35s cubic-bezier(0.34,1.56,0.64,1) both" }}
            >
              {/* ヘッダー */}
              <div className="px-6 pt-6 pb-4" style={{ background: "linear-gradient(135deg, #1a0a00, #3a1a00)" }}>
                <p className="text-yellow-300 text-xs font-bold tracking-widest mb-1">QUEST COMPLETE</p>
                <p className="text-white font-bold text-xl">全コンプリート達成！</p>
              </div>

              {/* パスワード */}
              <div className="px-6 py-5 space-y-4" style={{ background: "linear-gradient(180deg, #2a1400, #1a0a00)" }}>
                <div
                  className="rounded-xl px-4 py-4 border-2 border-yellow-400/70"
                  style={{
                    background: "linear-gradient(135deg, rgba(120,80,0,0.7), rgba(60,40,0,0.85))",
                    boxShadow: "0 0 18px rgba(250,204,21,0.4)",
                  }}
                >
                  <p className="text-yellow-300 text-xs font-bold tracking-widest mb-3">エピローグ パスワード</p>
                  <div className="flex items-center justify-center gap-2">
                    {["7", "E", "10", "B"].map((key, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span
                          className="min-w-[40px] h-10 px-2 rounded-lg flex items-center justify-center font-bold text-lg text-yellow-200 border border-yellow-400/60"
                          style={{
                            background: "rgba(250,204,21,0.15)",
                            textShadow: "0 0 8px rgba(250,204,21,0.8)",
                            animation: `epilogueKeyPop 0.4s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.08 + 0.2}s both`,
                          }}
                        >
                          {key}
                        </span>
                        {i < 3 && <span className="text-yellow-500/60 text-sm">→</span>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 振り返りコレクションへ */}
                <button
                  onClick={() => {
                    setShowEpilogueOnHome(false)
                    setScreen("collection")
                  }}
                  className="w-full py-3.5 rounded-xl font-bold text-base tracking-wider transition-all active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, #f59e0b, #d97706)",
                    boxShadow: "0 4px 16px rgba(245,158,11,0.4)",
                    color: "#1a0a00",
                  }}
                >
                  振り返りコレクションを見る
                </button>

                <button
                  onClick={() => setShowEpilogueOnHome(false)}
                  className="w-full py-2.5 rounded-xl text-white/50 text-sm transition-all active:scale-95"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        )}

        {/* コンプリート済み確認モーダル */}
        {showCompleteConfirmModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
              onClick={() => setShowCompleteConfirmModal(false)}
            />
            <div
              className="relative z-10 w-full max-w-xs rounded-2xl overflow-hidden shadow-2xl text-center"
              style={{ animation: "completeModalPop 0.35s cubic-bezier(0.34,1.56,0.64,1) both" }}
            >
              {/* ヘッダー帯 */}
              <div
                className="px-6 pt-6 pb-4"
                style={{ background: "linear-gradient(135deg, #1a2a4a, #0f1a30)" }}
              >
                {/* アイコン：王冠SVG */}
                <div className="flex justify-center mb-3">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(250,204,21,0.12)", border: "2px solid rgba(250,204,21,0.35)" }}
                  >
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <path d="M4 20h20M4 20l3-10 7 6 3-9 3 9 7-6-3 10H4z" stroke="#fbbf24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
                <h2 className="text-white font-bold text-lg leading-snug tracking-wide">
                  コンプリート済みです
                </h2>
                <p className="text-white/50 text-xs mt-1.5 leading-relaxed">
                  全てのカードを取得済みです<br />それでも引きますか？
                </p>
              </div>

              {/* ボタンエリア */}
              <div
                className="flex border-t border-white/10"
                style={{ background: "#0d1525" }}
              >
                <button
                  onClick={() => setShowCompleteConfirmModal(false)}
                  className="flex-1 py-4 text-white/50 text-sm font-medium tracking-wide border-r border-white/10 transition-all active:bg-white/5"
                >
                  やめる
                </button>
                <button
                  onClick={() => {
                    setShowCompleteConfirmModal(false)
                    performGacha(pendingCompleteGachaCount)
                  }}
                  className="flex-1 py-4 text-amber-400 text-sm font-bold tracking-wide transition-all active:bg-white/5"
                >
                  引く
                </button>
              </div>
            </div>
            <style>{`
              @keyframes completeModalPop {
                from { opacity: 0; transform: scale(0.9) translateY(8px); }
                to   { opacity: 1; transform: scale(1) translateY(0); }
              }
            `}</style>
          </div>
        )}

        {/* Vault Delivery Completion Modal - コンプリート時に表示 */}
        {showVaultDeliveryModal && vaultDeliveryWorld && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
            <div className="relative z-10 w-full max-w-sm bg-gradient-to-b from-amber-900/80 to-slate-900 border border-amber-400/50 rounded-2xl p-6 shadow-2xl space-y-5">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-amber-300">コンプリート!</h2>
                <p className="text-white text-lg font-semibold">
                  {WORLDS[vaultDeliveryWorld as keyof typeof WORLDS].name}
                </p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-4 border border-white/20 text-center space-y-3">
                {vaultDeliveryWorld === "origins" ? (
                  <>
                    <p className="text-amber-200 font-bold text-lg">
                      雷鳴の島での報酬が解放されました！
                    </p>
                    <p className="text-white/70 text-sm">
                      報酬を受け取るには、LINE公式アカウントからお手続きください
                    </p>
                    <p className="text-white/50 text-xs leading-relaxed">
                      ＊雷鳴の島を解放されていない方は引き続き解放できるように進めていきましょう！
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-amber-200 font-bold text-lg">
                      {`ボルトデリバリー ${VAULT_DELIVERY_RANKS[vaultDeliveryWorld]} が開放されました!`}
                    </p>
                    <p className="text-white/70 text-sm">
                      報酬を受け取るには、LINE公式アカウントからお手続きください
                    </p>
                  </>
                )}
              </div>

              <a
                href={LINE_OFFICIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Button className="w-full h-14 bg-[#06C755] hover:bg-[#05b34d] text-white font-bold text-lg rounded-xl shadow-lg">
                  LINE公式アカウントを開く
                </Button>
              </a>
              
              <Button
                onClick={() => {
                  setShowVaultDeliveryModal(false)
                  setVaultDeliveryWorld(null)
                }}
                variant="outline"
                className="w-full h-12 bg-transparent border-white/40 text-white hover:bg-white/20 rounded-xl"
              >
                閉じる
              </Button>
            </div>
          </div>
        )}



        {/* Locked world condition modal */}
        {showPasswordModal && selectedLockedWorld && (() => {
          // 各ワールドのコンプリート状態を計算（worldCardCounts/urPieceCountで判定）
          const getCompletionStatus = (worldId: string) => {
            const COMPLETE = 25
            if (worldId === "origins")  return { owned: worldCardCounts.n  ?? 0, total: COMPLETE, isComplete: checkWorldCompletion("origins") }
            if (worldId === "elements") return { owned: worldCardCounts.r  ?? 0, total: COMPLETE, isComplete: checkWorldCompletion("elements") }
            if (worldId === "beyond")   return { owned: worldCardCounts.sr ?? 0, total: COMPLETE, isComplete: checkWorldCompletion("beyond") }
            const world = WORLDS[worldId as keyof typeof WORLDS]
            if (!world) return { owned: 0, total: 0, isComplete: false }
            const owned = world.characters.filter((char) => ownedCharacters[char.id]).length
            return { owned, total: world.characters.length, isComplete: checkWorldCompletion(worldId) }
          }

          const originsStatus = getCompletionStatus("origins")
          const elementsStatus = getCompletionStatus("elements")
          const beyondStatus = getCompletionStatus("beyond")

          // 選択されたワールドに応じた条件を取得
          const getRequirements = () => {
            if (selectedLockedWorld === "elements") {
              return [
                { label: "Vol.1 始まりの空域", status: originsStatus.isComplete ? "達成" : `${originsStatus.owned}/${originsStatus.total}`, done: originsStatus.isComplete },
                { label: "ワールド6 解放", status: sheetWorldUnlocks.world6 ? "解放済" : "未解放", done: sheetWorldUnlocks.world6 },
              ]
            } else if (selectedLockedWorld === "beyond") {
              return [
                { label: "Vol.2 試練の空域", status: elementsStatus.isComplete ? "達成" : `${elementsStatus.owned}/${elementsStatus.total}`, done: elementsStatus.isComplete },
                { label: "ワールド7 解放", status: sheetWorldUnlocks.world7 ? "解放済" : "未解放", done: sheetWorldUnlocks.world7 },
              ]
            } else if (selectedLockedWorld === "questpia") {
              return [
                { label: "Vol.1 始まりの空域", status: originsStatus.isComplete ? "達成" : `${originsStatus.owned}/${originsStatus.total}`, done: originsStatus.isComplete },
                { label: "Vol.2 試練の空域", status: elementsStatus.isComplete ? "達成" : `${elementsStatus.owned}/${elementsStatus.total}`, done: elementsStatus.isComplete },
                { label: "Vol.3 真理の空域", status: beyondStatus.isComplete ? "達成" : `${beyondStatus.owned}/${beyondStatus.total}`, done: beyondStatus.isComplete },
                { label: "ワールド9 解放", status: sheetWorldUnlocks.world9 ? "解放済" : "未解放", done: sheetWorldUnlocks.world9 },
              ]
            }
            return []
          }

          const requirements = getRequirements()
          const allConditionsMet = requirements.every((req) => req.done)

          return (
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              {/* Background */}
              <div className="absolute inset-0">
                <img src="/loading-bg-new.png" alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
              </div>

              <div className="relative z-10 text-center max-w-sm w-full space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-2xl">
                  {WORLDS[selectedLockedWorld as keyof typeof WORLDS].name}
                </h2>

                <p className="text-white/80 text-sm sm:text-base drop-shadow-md">
                  {allConditionsMet ? "全ての条件を達成しました" : "このエリアはロックされています"}
                </p>

                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20 space-y-3">
                  <p className="text-white/60 text-xs mb-2">解放条件</p>
                  
                  {requirements.map((req, index) => (
                    <div 
                      key={index}
                      className={`flex items-center justify-between p-2 sm:p-3 rounded-lg ${
                        req.done 
                          ? "bg-green-500/20 border border-green-500/40" 
                          : "bg-white/5 border border-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                          req.done ? "bg-green-500" : "bg-white/20"
                        }`}>
                          {req.done ? (
                            <Check className="w-3 h-3 text-white" />
                          ) : (
                            <span className="text-white/50 text-[10px]">{index + 1}</span>
                          )}
                        </div>
                        <span className={`text-xs sm:text-sm ${req.done ? "text-green-300" : "text-white/70"}`}>
                          {req.label}
                        </span>
                      </div>
                      <span className={`text-xs sm:text-sm font-bold flex-shrink-0 ml-2 ${
                        req.done ? "text-green-400" : "text-white/50"
                      }`}>
                        {req.status}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => {
                    setShowPasswordModal(false)
                    setSelectedLockedWorld(null)
                  }}
                  variant="outline"
                  className="w-full h-10 bg-transparent border-white/40 text-white hover:bg-white/20 text-sm"
                >
                  戻る
                </Button>
              </div>
            </div>
          )
        })()}


      </div>
    )
  }

  if (screen === "video") {
    const handleSkip = () => {
      if (playerRef.current) {
        try { playerRef.current.destroy() } catch {}
        playerRef.current = null
      }
      if (videoContainerRef.current) {
        videoContainerRef.current.innerHTML = ""
      }
      processGachaResults()
    }

    const handleUnmute = () => {
      if (playerRef.current) {
        playerRef.current.setMuted(false).catch(() => {})
        playerRef.current.setVolume(1).catch(() => {})
      }
      setVideoMuted(false)
    }

    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-black">
        <div ref={videoContainerRef} className="absolute inset-0 w-full h-full" />

        {/* 右上：ミュート解除ボタン（常時表示、状態によってアイコン切替） */}
        <button
          onClick={handleUnmute}
          className="absolute z-50 flex items-center justify-center w-11 h-11 rounded-full backdrop-blur-md border transition-all active:scale-90"
          style={{
            top: "calc(env(safe-area-inset-top) + 16px)",
            right: "20px",
            background: videoMuted ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.35)",
            borderColor: videoMuted ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.2)",
            boxShadow: videoMuted ? "0 0 14px rgba(255,255,255,0.5), 0 2px 8px rgba(0,0,0,0.5)" : "0 2px 8px rgba(0,0,0,0.4)",
          }}
        >
          {videoMuted ? (
            /* ミュート中：×付きスピーカー */
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <line x1="23" y1="9" x2="17" y2="15"/>
              <line x1="17" y1="9" x2="23" y2="15"/>
            </svg>
          ) : (
            /* 音声ON：スピーカー＋波 */
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
            </svg>
          )}
        </button>

        {/* 右下：スキップ */}
        <button
          onClick={handleSkip}
          className="absolute z-50 bg-black/40 hover:bg-black/60 text-white text-sm font-semibold px-5 py-2.5 rounded-full backdrop-blur-sm border border-white/25 transition-all active:scale-95"
          style={{
            bottom: "calc(env(safe-area-inset-bottom) + 80px)",
            right: "20px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.5)",
          }}
        >
          スキップ
        </button>
      </div>
    )
  }

  if (screen === "newReveal") {
    const currentNewCard = newCardQueue[currentNewCardIndex]
    const isLastNewCard = currentNewCardIndex >= newCardQueue.length - 1

    return (
      <div
        className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 cursor-pointer"
        onClick={() => {
          if (isLastNewCard) {
            setScreen("result")
          } else {
            setCurrentNewCardIndex((prev) => prev + 1)
          }
        }}
      >
        <div className="absolute inset-0">
          <img src="/gacha-bg.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Sparkle effects */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={`sparkle-${currentNewCardIndex}-${i}`}
              className="absolute w-1.5 h-1.5 bg-yellow-300 rounded-full animate-ping opacity-60"
              style={{
                left: `${5 + Math.random() * 90}%`,
                top: `${5 + Math.random() * 90}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 1.5}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center w-full max-w-md">
          {/* Counter */}
          <div className="mb-4 text-white/80 text-sm font-medium">
            NEW {currentNewCardIndex + 1} / {newCardQueue.length}
          </div>

          {/* Card */}
          <div
            key={currentNewCardIndex}
            className="w-full overflow-hidden shadow-2xl rounded-lg"
            style={{ animation: "fadeIn 0.4s ease-out forwards" }}
          >
            <div className="relative aspect-[3/4]">
              <img
                src={currentNewCard?.image || "/placeholder.svg"}
                alt={currentNewCard?.name || ""}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <Badge className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-base px-4 py-2 animate-pulse shadow-2xl">
                  NEW
                </Badge>
              </div>
            </div>
          </div>

          {/* Tap hint */}
          <p className="mt-6 text-white/70 text-sm animate-pulse">
            {isLastNewCard ? "タップして結果一覧へ" : "タップして次へ"}
          </p>
        </div>
      </div>
    )
  }

  // UR Puzzle Gacha reveal screen — shows one piece at a time
  if (screen === "urPuzzle") {
    const currentPieceIndex = urPuzzleQueueIndex
    const displayedPieceCount = urPuzzleQueue[currentPieceIndex] ?? urPieceCount
    const isLastPiece = currentPieceIndex >= urPuzzleQueue.length - 1
    const isComplete = displayedPieceCount >= UR_TOTAL_PIECES
    const resultImage = getUrResultImage(displayedPieceCount)

    const handleUrPuzzleTap = () => {
      // コンプリートオーバーレイ表示中はタップで gacha 画面へ
      if (showUrCompleteOverlay) {
        setShowUrCompleteOverlay(false)
        setUrPuzzleQueue([])
        setUrPuzzleQueueIndex(0)
        setScreen("gacha")
        return
      }

      const newPieceCount = urPuzzleQueue[currentPieceIndex]
      setUrPieceCount(newPieceCount)

      const isComplete = newPieceCount >= UR_TOTAL_PIECES
      if (isComplete) {
        saveCompletionToSpreadsheet("UR", newPieceCount, isComplete)
      }

      if (isLastPiece) {
        if (isComplete) {
          // コンプリート → まずurPuzzle画面上でエピローグオーバーレイを表示
          setShowUrCompleteOverlay(true)
        } else {
          setUrPuzzleQueue([])
          setUrPuzzleQueueIndex(0)
          setScreen("gacha")
        }
      } else {
        setUrPuzzleQueueIndex((prev) => prev + 1)
      }
    }

    const isCharacterReveal = resultImage?.isCharacter === true

    return (
      <div
        className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center bg-black select-none"
        onClick={handleUrPuzzleTap}
        style={{ cursor: "pointer" }}
      >
        {/* コンプリートオーバーレイ：エピローグパスワード */}
        {showUrCompleteOverlay && (
          <div
            className="absolute inset-0 z-50 flex flex-col items-center justify-center p-6"
            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", animation: "screenFadeIn 0.4s ease-out forwards" }}
          >
            <div
              className="w-full max-w-xs rounded-2xl overflow-hidden text-center"
              style={{ animation: "completeModalPop 0.4s cubic-bezier(0.34,1.56,0.64,1) both" }}
            >
              <div className="px-6 pt-6 pb-4" style={{ background: "linear-gradient(135deg, #1a0a00, #3a1a00)" }}>
                <p className="text-yellow-300 text-xs font-bold tracking-widest mb-1">QUEST COMPLETE</p>
                <p className="text-white font-bold text-xl">全コンプリート達成！</p>
              </div>
              <div className="px-6 py-5 space-y-5" style={{ background: "linear-gradient(180deg, #2a1400, #1a0a00)" }}>
                <div
                  className="rounded-xl px-4 py-4 border-2 border-yellow-400/70"
                  style={{
                    background: "linear-gradient(135deg, rgba(120,80,0,0.7), rgba(60,40,0,0.85))",
                    boxShadow: "0 0 18px rgba(250,204,21,0.4)",
                  }}
                >
                  <p className="text-yellow-300 text-xs font-bold tracking-widest mb-3">エピローグ パスワード</p>
                  <div className="flex items-center justify-center gap-2">
                    {["7", "E", "10", "B"].map((key, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span
                          className="min-w-[40px] h-10 px-2 rounded-lg flex items-center justify-center font-bold text-lg text-yellow-200 border border-yellow-400/60"
                          style={{
                            background: "rgba(250,204,21,0.15)",
                            textShadow: "0 0 8px rgba(250,204,21,0.8)",
                            animation: `epilogueKeyPop 0.4s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.08 + 0.3}s both`,
                          }}
                        >
                          {key}
                        </span>
                        {i < 3 && <span className="text-yellow-500/60 text-sm">→</span>}
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-white/40 text-xs tracking-widest" style={{ animation: "urTapHint 1.5s ease-in-out infinite" }}>
                  TAP TO CONTINUE
                </p>
              </div>
            </div>
          </div>
        )}
        {/* Background */}
        <div className="absolute inset-0">
          <img src="/gacha-bg.png" alt="" className="w-full h-full object-cover opacity-20" />
          <div className={`absolute inset-0 ${isCharacterReveal ? "bg-black/40" : "bg-black/60"}`} />
        </div>

        {/* Radial glow */}
        <div
          key={displayedPieceCount}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div
            className={`rounded-full opacity-30 ${isCharacterReveal ? "w-[120vw] h-[120vw]" : "w-96 h-96"}`}
            style={{
              background: isCharacterReveal
                ? "radial-gradient(circle, rgba(255,220,100,0.5) 0%, transparent 65%)"
                : "radial-gradient(circle, rgba(255,200,50,0.6) 0%, transparent 70%)",
              animation: "urGlow 2s ease-in-out infinite alternate",
            }}
          />
        </div>

        {/* ===== CHARACTER REVEAL (draws 12-21) ===== */}
        {isCharacterReveal && resultImage ? (
          <div className="relative w-full min-h-screen flex flex-col">
            {/* Character image — fills most of screen, overflows bottom */}
            <div
              key={`char-${displayedPieceCount}`}
              className="absolute inset-0 flex items-end justify-center"
              style={{ animation: "urCharEnter 0.6s cubic-bezier(0.22,1,0.36,1) forwards" }}
            >
              <img
                src={resultImage.src}
                alt={`UR character ${displayedPieceCount}`}
                className="w-full"
                style={{
                  objectFit: "contain",
                  objectPosition: "bottom center",
                  maxHeight: "100vh",
                  animation: "urPieceFloat 4s ease-in-out infinite",
                }}
              />
            </div>

            {/* Top overlay: UR badge + piece count */}
            <div className="relative z-10 flex flex-col items-center pt-10 px-6">
              <span
                className="px-6 py-1.5 text-white font-bold text-xs tracking-widest uppercase"
                style={{
                  background: "linear-gradient(90deg, #f97316, #eab308)",
                  clipPath: "polygon(8px 0%, calc(100% - 8px) 0%, 100% 50%, calc(100% - 8px) 100%, 8px 100%, 0% 50%)",
                }}
              >
                UR CHARACTER
              </span>
              <p className="text-white/50 text-xs mt-2 tracking-wider">
                {displayedPieceCount} / {UR_TOTAL_PIECES}
              </p>
            </div>

            {/* Bottom overlay: progress bar + tap hint — floats above character */}
            <div className="relative z-10 mt-auto pb-10 px-8 space-y-3">
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${(displayedPieceCount / UR_TOTAL_PIECES) * 100}%`,
                    background: "linear-gradient(90deg, #f97316, #eab308)",
                  }}
                />
              </div>
              {isComplete && (
                <p className="text-yellow-300 font-bold text-center text-sm">
                  パズル完成！
                </p>
              )}
              <p className="text-white/50 text-xs text-center tracking-widest" style={{ animation: "urTapHint 1.5s ease-in-out infinite" }}>
                {isLastPiece ? "TAP TO CONTINUE" : "TAP FOR NEXT"}
              </p>
            </div>
          </div>

        ) : (
          /* ===== PIECE REVEAL (draws 1-11) or fallback ===== */
          <div className="relative z-10 flex flex-col items-center w-full px-0">
            {/* UR badge */}
            <div className="mb-2 flex justify-center">
              <span
                className="px-6 py-1.5 text-white font-bold text-xs tracking-widest uppercase"
                style={{
                  background: "linear-gradient(90deg, #f97316, #eab308)",
                  clipPath: "polygon(8px 0%, calc(100% - 8px) 0%, 100% 50%, calc(100% - 8px) 100%, 8px 100%, 0% 50%)",
                }}
              >
                UR PUZZLE PIECE {displayedPieceCount}
              </span>
            </div>

            <p className="text-white/40 text-xs mb-4 tracking-wider">
              {displayedPieceCount} / {UR_TOTAL_PIECES}
            </p>

            {resultImage ? (
              <div
                key={`piece-${displayedPieceCount}`}
                className="w-full"
                style={{ animation: "urPieceFloat 3s ease-in-out infinite, urPieceEnter 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards" }}
              >
                <img
                  src={resultImage.src}
                  alt={`UR piece ${displayedPieceCount}`}
                  className="w-full h-auto"
                  style={{ maxHeight: "70vh", objectFit: "contain" }}
                />
              </div>
            ) : (
              <div
                key={`piece-${displayedPieceCount}`}
                className="w-full px-8"
                style={{ animation: "urPieceEnter 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards" }}
              >
                <div className="relative overflow-hidden rounded-2xl border border-yellow-400/30">
                  <img
                    src={getUrPuzzleImage(displayedPieceCount)}
                    alt={`UR Puzzle progress ${displayedPieceCount}`}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            )}

            <div className="w-full px-8 mt-5 space-y-1">
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${(displayedPieceCount / UR_TOTAL_PIECES) * 100}%`,
                    background: "linear-gradient(90deg, #f97316, #eab308)",
                  }}
                />
              </div>
              {isComplete && (
                <p className="text-yellow-300 font-bold text-center text-sm mt-2" style={{ animation: "urPieceEnter 0.6s ease-out forwards" }}>
                  パズル完成！
                </p>
              )}
            </div>

            <p className="text-white/40 text-xs mt-6 tracking-widest" style={{ animation: "urTapHint 1.5s ease-in-out infinite" }}>
              {isLastPiece ? "TAP TO CONTINUE" : "TAP FOR NEXT PIECE"}
            </p>
          </div>
        )}
      </div>
    )
  }

  if (screen === "result") {
    const isSingle = drawnCharacters.length === 1

    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
        <div className="absolute inset-0">
          <img src="/gacha-bg.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* 演出エフェクト */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 ${currentWorldData.theme.text} rounded-full animate-bounce opacity-70`}
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 w-full max-w-4xl">
          {isSingle ? (
            <div className="flex flex-col items-center">
              <div className="w-full max-w-md mb-8">
                <div className="relative overflow-hidden rounded-lg animate-fade-in">
                  {/* 背景シャドウ */}
                  <div className="absolute inset-0 bg-black/50 rounded-lg shadow-[0_0_40px_15px_rgba(0,0,0,0.6)]" />
                  <div className="relative aspect-[3/4] shadow-2xl">
                    <img
                      src={drawnCharacters[0].image || "/placeholder.svg"}
                      alt={drawnCharacters[0].name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    {drawnCharacters[0].isNew && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-base px-4 py-2 animate-pulse shadow-2xl">
                          NEW
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setScreen("gacha")}
                className={`w-full max-w-sm h-16 bg-gradient-to-r ${currentWorldData.theme.primary} text-white font-bold text-lg rounded-2xl shadow-2xl ${currentWorldData.theme.glow} active:scale-95`}
              >
                {currentWorldData.name}に戻る
              </Button>
            </div>
          ) : (
            <div>
              <h2 className="text-4xl font-bold text-white text-center mb-8 drop-shadow-2xl">10連召喚結果</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                {drawnCharacters.map((char, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-lg hover:scale-105 transition-transform cursor-pointer"
                    style={{
                      animation: `fadeIn 0.5s ease-out ${index * 0.1}s forwards`,
                    }}
                    onClick={() =>
                      setSelectedCharacter({
                        ...char,
                        world: currentWorldData.name,
                        rank: currentWorldData.rank,
                      })
                    }
                  >
                    {/* 背景シャドウ */}
                    <div className="absolute inset-0 bg-black/50 rounded-lg shadow-[0_0_30px_10px_rgba(0,0,0,0.5)]" />
                    <div className="relative aspect-[3/4] shadow-2xl">
                      <img
                        src={char.image || "/placeholder.svg"}
                        alt={char.name}
                        className="w-full h-full object-cover rounded-lg"
                        loading="eager"
                        decoding="async"
                      />
                      {char.isNew && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold">
                            NEW
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => setScreen("gacha")}
                className={`w-full h-16 bg-gradient-to-r ${currentWorldData.theme.primary} text-white font-bold text-lg rounded-2xl shadow-2xl ${currentWorldData.theme.glow} active:scale-95`}
              >
                {currentWorldData.name}に戻る
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (screen === "collection") {
    // 画像プリロード未完了時はローディング画面
    if (!imagesPreloaded) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#070e1f] relative overflow-hidden">
          {/* 背景の星（固定値でSSRエラー回避） */}
          <div className="absolute inset-0 pointer-events-none">
            {[
              { w:1.5, t:8,  l:12, o:0.4, d:0,    dur:2.0 },
              { w:1,   t:22, l:78, o:0.3, d:0.3,  dur:2.5 },
              { w:2,   t:35, l:5,  o:0.5, d:0.6,  dur:1.8 },
              { w:1,   t:50, l:90, o:0.2, d:0.9,  dur:3.0 },
              { w:1.5, t:65, l:55, o:0.4, d:0.2,  dur:2.2 },
              { w:1,   t:80, l:30, o:0.3, d:1.1,  dur:1.6 },
              { w:2,   t:15, l:45, o:0.5, d:0.5,  dur:2.8 },
              { w:1,   t:42, l:68, o:0.2, d:1.4,  dur:2.0 },
              { w:1.5, t:70, l:82, o:0.4, d:0.7,  dur:1.9 },
              { w:1,   t:90, l:15, o:0.3, d:0.1,  dur:2.4 },
              { w:2,   t:5,  l:60, o:0.5, d:1.8,  dur:2.1 },
              { w:1,   t:55, l:38, o:0.2, d:0.4,  dur:3.2 },
              { w:1.5, t:28, l:92, o:0.4, d:1.0,  dur:1.7 },
              { w:1,   t:75, l:50, o:0.3, d:1.6,  dur:2.6 },
              { w:2,   t:18, l:25, o:0.5, d:0.8,  dur:2.3 },
              { w:1,   t:48, l:72, o:0.2, d:1.3,  dur:1.5 },
            ].map((s, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${s.w}px`,
                  height: `${s.w}px`,
                  top: `${s.t}%`,
                  left: `${s.l}%`,
                  opacity: s.o,
                  animation: `twinkle ${s.dur}s ease-in-out infinite alternate`,
                  animationDelay: `${s.d}s`,
                }}
              />
            ))}
          </div>

          <div className="relative flex flex-col items-center gap-8 w-72 max-w-[85vw]">
            {/* ロゴ */}
            <img
              src="/quest-alpha-logo.png"
              alt="Quest+α"
              className="w-44 max-w-[60vw] object-contain"
              style={{ filter: "drop-shadow(0 0 16px rgba(96,165,250,0.4))", animation: "loadingPulse 2.5s ease-in-out infinite" }}
            />
            {/* 回転する外リング + 内リング */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              {/* 外リング（逆回転） */}
              <div
                className="absolute inset-0 rounded-full border-2 border-dashed border-blue-400/30"
                style={{ animation: "spin-reverse 4s linear infinite" }}
              />
              {/* 中リング（進捗） */}
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 112 112">
                <circle cx="56" cy="56" r="50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                <circle
                  cx="56" cy="56" r="50" fill="none"
                  stroke="url(#progressGrad)" strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={`${2 * Math.PI * 50 * (1 - preloadProgress / 100)}`}
                  style={{ transition: "stroke-dashoffset 0.3s ease" }}
                />
                <defs>
                  <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
              </svg>
              {/* 内スピナー */}
              <div
                className="absolute w-16 h-16 rounded-full border-4 border-transparent border-t-blue-400 border-r-purple-400"
                style={{ animation: "spin 1s linear infinite" }}
              />
              {/* 中央の% */}
              <span className="relative text-white font-bold text-lg tabular-nums">
                {preloadProgress}<span className="text-xs text-white/50">%</span>
              </span>
            </div>

            {/* テキスト */}
            <div className="flex flex-col items-center gap-2">
              <p className="text-white font-bold text-base tracking-widest">LOADING</p>
              <p className="text-white/40 text-xs tracking-wider">コレクションを読み込み中...</p>
            </div>

            {/* 戻るボタン */}
            <button
              onClick={() => setScreen("gacha")}
              className="mt-2 px-6 py-2.5 rounded-full border border-white/20 text-white/60 text-sm font-medium tracking-wider transition-all active:scale-95 hover:border-white/40 hover:text-white/80"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              ホームに戻る
            </button>

            {/* プログレスバー */}
            <div className="w-full">
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${preloadProgress}%`,
                    background: "linear-gradient(90deg, #60a5fa, #a78bfa)",
                    transition: "width 0.3s ease",
                    boxShadow: "0 0 8px rgba(96,165,250,0.6)",
                  }}
                />
              </div>
            </div>
          </div>

          <style>{`
            @keyframes spin { to { transform: rotate(360deg); } }
            @keyframes spin-reverse { to { transform: rotate(-360deg); } }
            @keyframes twinkle { from { opacity: 0.1; } to { opacity: 0.6; } }
            @keyframes loadingPulse { 0%,100% { opacity:0.7; transform:scale(1); } 50% { opacity:1; transform:scale(1.04); } }
          `}</style>
        </div>
      )
    }

    return (
      <div className="min-h-screen relative overflow-hidden flex flex-col">
        {/* 背景 */}
        <div className={`absolute inset-0 ${currentWorldData.theme.bg}`}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80" />
        </div>

        {/* ヘッダー */}
        <div className="relative z-10 flex items-center justify-between p-4 bg-black/50 backdrop-blur-md border-b border-white/20 shadow-2xl">
          <Button
            onClick={() => setScreen("gacha")}
            variant="ghost"
            className="text-white hover:bg-white/20 rounded-xl backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            戻る
          </Button>
          <h1 className="font-game text-xl font-bold text-white drop-shadow-[0_0_10px_rgba(147,197,253,0.6)]"
            style={{ textShadow: "0 0 16px rgba(147,197,253,0.5), 0 2px 6px rgba(0,0,0,0.8)" }}>
            Quest+α
          </h1>
          <div className="w-20" />
        </div>

        {/* コレクション */}
        <div className="relative z-10 flex-1 overflow-y-auto p-4">
          {WORLD_ORDER.map((worldId) => {
            const world = WORLDS[worldId]
            const isUnlocked = unlockedWorlds.includes(worldId)

            if (!isUnlocked) return null

            const worldCompletion = getCompletionRate(worldId)
            const worldComplete = checkWorldCompletion(worldId)

            return (
              <div key={worldId} className="mb-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    {React.createElement(world.icon, { className: "w-8 h-8 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" })}
                    <div>
                      <h2 className="text-2xl font-bold text-white"
                        style={{ textShadow: "0 1px 0 rgba(255,255,255,0.3), 0 -1px 0 rgba(0,0,0,0.5), 0 3px 8px rgba(0,0,0,0.8), 0 0 20px rgba(147,197,253,0.4)" }}>
                        {world.name}
                      </h2>
                      <p className="text-white/60 text-xs tracking-widest uppercase">{world.subtitle}</p>
                    </div>
                    <Badge className={`bg-gradient-to-r ${world.theme.primary} text-white`}>{world.rank}</Badge>
                    {worldComplete && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white animate-pulse">
                        COMPLETE
                      </Badge>
                    )}
                  </div>
                  <span className="text-white font-bold text-lg drop-shadow-md">
                    {worldId === "questpia" ? urPieceCount : worldCompletion.owned}/{worldId === "questpia" ? UR_TOTAL_PIECES : worldCompletion.total}
                  </span>
                </div>

                {/* UR Puzzle: show the puzzle image instead of individual cards */}
                {worldId === "questpia" ? (
                  <div className="space-y-3">
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl border-2 border-orange-400/30">
                      <img
                        src={getUrPuzzleImage(urPieceCount)}
                        alt={`UR Puzzle - ${urPieceCount}/${UR_TOTAL_PIECES} pieces`}
                        className="w-full h-auto"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <p className="text-white font-bold text-center text-sm">
                          ピース {urPieceCount} / {UR_TOTAL_PIECES}
                        </p>
                        <div className="mt-2 h-2 bg-white/20 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-orange-400 to-yellow-300 rounded-full"
                            style={{ width: `${(urPieceCount / UR_TOTAL_PIECES) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    {urPieceCount >= UR_TOTAL_PIECES && (
                      <div className="text-center py-2">
                        <span className="text-yellow-300 font-bold animate-pulse">パズル完成！</span>
                      </div>
                    )}
                  </div>
                ) : (
                <div className="grid grid-cols-5 gap-3">
                  {world.characters.map((char, charIdx) => {
                    const isOwned = ownedCharacters[char.id]

                    return (
                      <button
                        key={char.id}
                        onClick={() =>
                          isOwned && setSelectedCharacter({ ...char, world: world.name, rank: world.rank })
                        }
                        className={`overflow-hidden transition-all rounded-lg ${isOwned ? "card-3d cursor-pointer" : "card-3d-locked cursor-default"}`}
                        style={{ animation: "cardFadeIn 0.35s ease-out both", animationDelay: `${charIdx * 30}ms` }}
                      >
                        <div className="relative aspect-[3/4]">
                          {isOwned ? (
                            <>
                              <img
                                src={char.image || "/placeholder.svg"}
                                alt={char.name}
                                className="w-full h-full object-cover"
                              />
                              {/* 上部光沢 */}
                              <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/30 pointer-events-none rounded-lg" />
                              {/* 左側ハイライト */}
                              <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
                            </>
                          ) : (
                            <div className="w-full h-full bg-slate-700/70 flex items-center justify-center backdrop-blur-sm">
                              <div className="text-3xl text-slate-500 font-bold">?</div>
                              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                            </div>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
                )}
              </div>
            )
          })}
        </div>

        {/* BONUS MENU セクション（全コンプリート時のみ表示） */}
        {isAllComplete && (
          <div className="relative z-10 px-4 pb-6">
            <button
              onClick={() => setShowBonusModal(true)}
              className="w-full rounded-2xl border-2 border-yellow-400/60 bg-yellow-500/10 backdrop-blur-sm p-5 text-left hover:bg-yellow-500/20 active:scale-95 transition-all"
            >
              <p className="text-yellow-300 text-xs font-bold tracking-widest mb-1">BONUS MENU</p>
              <p className="text-white font-bold text-base">新たな島が解放されました</p>
              <p className="text-white/60 text-sm mt-1">タップしてパスワードを確認</p>
            </button>
          </div>
        )}

        {/* BONUS MENU モーダル */}
        {showBonusModal && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-md p-4"
            onClick={() => setShowBonusModal(false)}
          >
            <div
              className="relative w-full max-w-sm bg-gradient-to-b from-yellow-900/90 to-slate-900/95 border-2 border-yellow-400/50 rounded-2xl p-6 shadow-2xl space-y-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center space-y-1">
                <p className="text-yellow-400 text-xs font-bold tracking-widest">BONUS MENU</p>
                <h2 className="text-xl font-bold text-white">新たな島を開放せよ</h2>
              </div>

              {/* エピローグ解放済みの場合はパスワード表示 */}
              {sheetWorldUnlocks.epilogue ? (
                <div className="bg-black/30 rounded-xl p-4 space-y-3 border border-yellow-400/40">
                  <p className="text-yellow-300 text-xs font-bold text-center tracking-widest">エピローグ パスワード</p>
                  <div className="flex items-center justify-center gap-2">
                    {["7", "E", "10", "B"].map((key, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="min-w-[40px] h-10 px-1 rounded-lg bg-yellow-500/20 border border-yellow-400/50 flex items-center justify-center text-yellow-200 font-bold text-xl"
                          style={{ textShadow: "0 0 10px rgba(250,204,21,0.9)" }}>
                          {key}
                        </span>
                        {i < 3 && <span className="text-white/40">→</span>}
                      </div>
                    ))}
                  </div>
                  <p className="text-white/70 text-sm text-center">
                    を順番に押して<br />
                    <span className="text-yellow-300 font-bold">【エピローグ】</span>をみよう！
                  </p>
                </div>
              ) : (
                <div className="bg-black/30 rounded-xl p-4 space-y-4 border border-yellow-400/20">
                  <p className="text-white/80 text-sm leading-relaxed text-center">
                    全コンプリートおめでとうございます！
                  </p>
                  <button
                    onClick={async () => {
                      // localStateを即時更新
                      setSheetWorldUnlocks(prev => ({ ...prev, epilogue: true }))
                      // GASのN列に書き込む
                      try {
                        await fetch("/api/save-completion", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ email, rarity: "EPILOGUE", count: 1 }),
                        })
                      } catch {}
                    }}
                    className="w-full py-4 rounded-xl font-bold text-base tracking-wider transition-all active:scale-95"
                    style={{
                      background: "linear-gradient(135deg, rgba(120,80,0,0.9), rgba(200,140,0,0.9))",
                      border: "2px solid rgba(250,204,21,0.7)",
                      color: "#fef08a",
                      boxShadow: "0 0 20px rgba(250,204,21,0.3), 0 4px 16px rgba(0,0,0,0.5)",
                    }}
                  >
                    エピローグを解放する
                  </button>
                  <p className="text-white/50 text-xs text-center">
                    タップするとパスワードが表示されます
                  </p>
                </div>
              )}

              <button
                onClick={() => setShowBonusModal(false)}
                className="w-full h-10 rounded-xl bg-white/10 border border-white/20 text-white text-sm hover:bg-white/20 active:scale-95 transition-all"
              >
                閉じる
              </button>
            </div>
          </div>
        )}

        {/* キャラクター拡大モーダル */}
        {selectedCharacter && (
          <div
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 backdrop-blur-md p-4 animate-fade-in"
            onClick={() => setSelectedCharacter(null)}
          >
            <div className="relative max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setSelectedCharacter(null)}
                className="absolute -top-4 -right-4 z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl hover:bg-gray-200 transition-all"
              >
                <span className="text-2xl text-black">×</span>
              </button>

              <div className="overflow-hidden shadow-2xl rounded-lg">
                <div className="relative aspect-[3/4]">
                  <img
                    src={selectedCharacter.image || "/placeholder.svg"}
                    alt={selectedCharacter.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  if (screen === "stats") {
    return (
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
        style={{
          backgroundImage: `url(${currentWorldData.bg})`, // Use the theme background
        }}
      >
        <div className="w-full max-w-4xl">
          <Button onClick={() => setScreen("gacha")} className="mb-4" variant="outline">
            ← 戻る
          </Button>

          <Card className="bg-white/95 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-2xl">ガチャ統計</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {userStats ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="text-sm text-gray-600">シングル召喚</div>
                      <div className="text-3xl font-bold">{userStats.totalSingleGacha}回</div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="text-sm text-gray-600">10連召喚</div>
                      <div className="text-3xl font-bold">{userStats.total10Gacha}回</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-3">カード所持数</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-96 overflow-y-auto">
                      {Object.entries(userStats.cardCounts).map(([cardId, count]) => (
                        <div key={cardId} className="p-2 bg-gray-50 rounded flex justify-between">
                          <span className="text-sm">{cardId}</span>
                          <span className="font-bold">{count}枚</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-3">ガチャ履歴</h3>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {userStats.gachaHistory.map((entry, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">{entry.type}</div>
                              <div className="text-sm text-gray-600">{entry.world}</div>
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(entry.timestamp).toLocaleString("ja-JP")}
                            </div>
                          </div>
                          <div className="text-xs mt-2 text-gray-600">{entry.cards.join(", ")}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-gray-500">統計データを読み込み中...</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return null
}
