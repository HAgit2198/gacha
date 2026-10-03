"use client"

import React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Coins, Lock, Leaf, Waves, Clock3, Rainbow } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" // Import Card components


declare global {
  interface Window {
    Vimeo: any
  }
}

// ワールドデータ定義
const WORLDS = {
  origins: {
    id: "origins",
    name: "Vol.1 始まりの空域編",
    enName: "生命の起源",
    subtitle: "生命と旅立ちの地",
    rank: "N",
    icon: Leaf,
    cost: 10,
    cost10: 100,
    theme: {
      primary: "bg-cyan-600",
      secondary: "bg-cyan-700/30",
      border: "border-cyan-400",
      bg: "bg-cyan-900/20",
      text: "text-cyan-300",
      glow: "shadow-cyan-400/50",
    },
    message: "🌿 生命の起源を征服！新しい世界が開けた！",
    description: "生命の誕生と旅立ち。風・森・火の始まりの地。",
    buttonImage: "/images/10-e5-9b-9e-e5-8f-ac-e5-96-9a.png",
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
    cost: 50,
    cost10: 500,
    theme: {
      primary: "bg-green-600",
      secondary: "bg-green-700/30",
      border: "border-green-400",
      bg: "bg-green-900/20",
      text: "text-green-300",
      glow: "shadow-green-400/50",
    },
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
    cost: 100,
    cost10: 1000,
    theme: {
      primary: "bg-yellow-500",
      secondary: "bg-yellow-600/30",
      border: "border-yellow-400",
      bg: "bg-yellow-900/20",
      text: "text-yellow-300",
      glow: "shadow-yellow-400/50",
    },
    message: "🌌 彼方の次元を達成！現実の繊維が揺さぶられる！",
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
    rank: "SSR",
    icon: Rainbow,
    cost: 300,
    cost10: 3000,
    theme: {
      primary: "bg-gradient-to-r from-orange-500 to-red-600",
      secondary: "bg-gradient-to-r from-orange-600/30 to-red-700/30",
      border: "border-orange-400",
      bg: "bg-gradient-to-br from-orange-900/20 to-red-900/20",
      text: "text-orange-300",
      glow: "shadow-orange-400/50",
    },
    message: "🌈クエストピアが現れた！伝説が動き出す！",
    description: "究極の調和と伝説の終焉。全ての元素が融合した世界。",
    characters: [
      { id: "questpia_1", name: "竜帝マジェスティック", element: "全", image: "/majestic-dragon-emperor.png" },
      { id: "questpia_2", name: "魔王ダークロード", element: "全", image: "/dark-demon-lord.png" },
      { id: "questpia_3", name: "不死鳥の戦士", element: "全", image: "/phoenix-fire-warrior.png" },
      { id: "questpia_4", name: "黄金翼の天使", element: "全", image: "/light-angel-golden-wings.png" },
      { id: "questpia_5", name: "氷の女王", element: "全", image: "/ice-queen-sorceress.png" },
      { id: "questpia_6", name: "雷鳴の騎士", element: "全", image: "/lightning-knight-armor.png" },
      { id: "questpia_7", name: "石のゴーレム", element: "全", image: "/stone-golem-guardian.png" },
      { id: "questpia_8", name: "炎の騎士", element: "全", image: "/fire-knight-sword.png" },
      { id: "questpia_9", name: "水の大賢者", element: "全", image: "/water-mage-staff.png" },
      { id: "questpia_10", name: "森のエルフ女王", element: "全", image: "/forest-elf-archer.png" },
      { id: "questpia_11", name: "大地の戦神", element: "全", image: "/earth-warrior-axe.png" },
      { id: "questpia_12", name: "疾風の射手", element: "全", image: "/wind-archer-bow.png" },
      { id: "questpia_13", name: "聖なる神官長", element: "全", image: "/light-priest-holy.png" },
      { id: "questpia_14", name: "闇の暗殺王", element: "全", image: "/dark-assassin-dagger.png" },
      { id: "questpia_15", name: "伝説の炎剣", element: "全", image: "/fire-legendary-sword.png" },
      { id: "questpia_16", name: "氷晶の杖", element: "全", image: "/ice-crystal-staff.png" },
      { id: "questpia_17", name: "炎の妖精", element: "全", image: "/cute-fire-sprite.png" },
      { id: "questpia_18", name: "水のスライム", element: "全", image: "/blue-water-slime.png" },
      { id: "questpia_19", name: "鋼鉄の騎士", element: "全", image: "/steel-knight-character.png" },
      { id: "questpia_20", name: "魔法の学者", element: "全", image: "/magic-scholar-character.png" },
      { id: "questpia_21", name: "岩の兵士", element: "全", image: "/rock-soldier-earth.png" },
      { id: "questpia_22", name: "風の妖精", element: "全", image: "/wind-fairy-green.png" },
      { id: "questpia_23", name: "天使の使徒", element: "全", image: "/light-angel-small.png" },
      { id: "questpia_24", name: "悪魔の使徒", element: "全", image: "/dark-demon-small.png" },
      { id: "questpia_25", name: "創造神", element: "全", image: "/majestic-dragon-emperor.png" },
    ],
  },
}

const WORLD_ORDER = ["origins", "elements", "beyond", "questpia"]

const screens = ["opening", "login", "gacha", "video", "newReveal", "result", "collection", "stats"] as const
type ScreenType = (typeof screens)[number]

export default function WorldQuestGacha() {
  const [screen, setScreen] = useState<ScreenType>("opening")
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
  const [showUnlockModal, setShowUnlockModal] = useState(false)
  const [newUnlockedWorld, setNewUnlockedWorld] = useState<string | null>(null)
  const [selectedCharacter, setSelectedCharacter] = useState<any>(null)
  const [pendingGachaCount, setPendingGachaCount] = useState(0)
  const [passwordInput, setPasswordInput] = useState("")
  const [showPasswordError, setShowPasswordError] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [selectedLockedWorld, setSelectedLockedWorld] = useState<string | null>(null)
  const [showSSRLockedModal, setShowSSRLockedModal] = useState(false)
  const [newCardQueue, setNewCardQueue] = useState<any[]>([])
  const [currentNewCardIndex, setCurrentNewCardIndex] = useState(0)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)
  const [currentWorld, setCurrentWorld] = useState("origins")
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isCollectionLoading, setIsCollectionLoading] = useState(false)
  const [collectionProgress, setCollectionProgress] = useState(0)

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

  const WORLD_PASSWORDS = {
    elements: "RELODA",
    beyond: "TUHRT",
    questpia: "ANORIBW",
  }

  // Opening and login progress feedback: keep the indicator moving while network/assets settle.
  useEffect(() => {
    if (screen !== "opening" && !isLoggingIn) return

    setLoadingProgress(0)
    const interval = window.setInterval(() => {
      setLoadingProgress((current) => Math.min(current + (current < 70 ? 4 : 1), 94))
    }, 120)

    return () => window.clearInterval(interval)
  }, [screen, isLoggingIn])

  // Opening screen auto-transition
  useEffect(() => {
    if (screen === "opening") {
      const timer = setTimeout(() => {
        setLoadingProgress(100)
        // Check localStorage for existing session
        const savedData = localStorage.getItem("worldQuestGacha")
        if (savedData) {
          const data = JSON.parse(savedData)
          setCoins(data.coins || 100000)
          setCurrentWorld(data.currentWorld || "origins")
          setUnlockedWorlds(data.unlockedWorlds || ["origins"])
          setOwnedCharacters(data.ownedCharacters || {})

          const storedEmail = data.email
          const storedUserName = data.userName
          if (storedEmail && storedUserName) {
            setEmail(storedEmail)
            setUserName(storedUserName)
            setScreen("gacha")
            return
          }
        }
        setScreen("login")
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [screen])

  useEffect(() => {
    if (email && userName) {
      // Only save if email and userName are present (meaning user is logged in)
      const data = {
        email,
        userName,
        coins,
        currentWorld,
        unlockedWorlds,
        ownedCharacters,
      }
      localStorage.setItem("worldQuestGacha", JSON.stringify(data))
    }
  }, [email, userName, coins, currentWorld, unlockedWorlds, ownedCharacters])

  useEffect(() => {
    if (!window.Vimeo) {
      const script = document.createElement("script")
      script.src = "https://player.vimeo.com/api/player.js"
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  useEffect(() => {
    if (screen === "video" && videoContainerRef.current && window.Vimeo) {
      if (playerRef.current) {
        playerRef.current.destroy()
        playerRef.current = null
      }

      const iframe = document.createElement("iframe")
      iframe.src =
        "https://player.vimeo.com/video/1165295588?autoplay=1&controls=0&title=0&byline=0&portrait=0&playsinline=1&muted=0"
      iframe.width = "100%"
      iframe.height = "100%"
      iframe.allow = "autoplay; fullscreen; encrypted-media"
      iframe.setAttribute("allowfullscreen", "")
      iframe.setAttribute("webkitallowfullscreen", "")
      iframe.setAttribute("mozallowfullscreen", "")
      iframe.style.position = "absolute"
      iframe.style.top = "0"
      iframe.style.left = "0"
      iframe.style.width = "100%"
      iframe.style.height = "100%"

      videoContainerRef.current.innerHTML = ""
      videoContainerRef.current.appendChild(iframe)

      const player = new window.Vimeo.Player(iframe)

      player.ready().then(() => {
        player.setVolume(1)
        // Explicitly play with audio - needed for mobile browser autoplay policy
        player.play().catch((err: any) => {
          console.error("[v0] Failed to play video:", err)
        })
      })

      player.on("ended", () => {
        // Destroy player and clear video container before transitioning
        player.destroy()
        playerRef.current = null
        if (videoContainerRef.current) {
          videoContainerRef.current.innerHTML = ""
        }
        processGachaResults()
      })

      player.on("error", (error: any) => {
        console.error("[v0] Vimeo player error:", error)
      })

      playerRef.current = player
    }

    return () => {
      if (screen !== "video" && playerRef.current) {
        playerRef.current.destroy()
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
    switch (rank) {
      case "N":
        return {
          single: "/gacha-n-left.png",
          multi: "/gacha-n-right.png",
        }
      case "R":
        return {
          single: "/gacha-r-left.png",
          multi: "/gacha-r-right.png",
        }
      case "SR":
        return {
          single: "/gacha-sr-left.png",
          multi: "/gacha-sr-right.png",
        }
      case "SSR":
        return {
          single: "/gacha-ssr-left.png",
          multi: "/gacha-ssr-right.png",
        }
      default:
        return {
          single: "/gacha-n-left.png",
          multi: "/gacha-n-right.png",
        }
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

  // ワールドコンプリートチェック
  const checkWorldCompletion = (worldId: string) => {
    const { owned, total } = getCompletionRate(worldId)
    return owned === total
  }

  // 次のワールドを解放
  const unlockNextWorld = () => {
    const currentIndex = WORLD_ORDER.indexOf(currentWorld)
    if (currentIndex < WORLD_ORDER.length - 1) {
      const nextWorld = WORLD_ORDER[currentIndex + 1]
      if (!unlockedWorlds.includes(nextWorld)) {
        setUnlockedWorlds((prev) => [...prev, nextWorld])
        setNewUnlockedWorld(nextWorld)
        setShowUnlockModal(true)
      }
    }
  }

  // Unlock audio context on user interaction (for Vimeo sound)
  const unlockAudioContext = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext
      if (AudioContext) {
        const ctx = new AudioContext()
        const buffer = ctx.createBuffer(1, 1, 22050)
        const source = ctx.createBufferSource()
        source.buffer = buffer
        source.connect(ctx.destination)
        source.start(0)
        ctx.resume()
      }
    } catch {
      // silent fail
    }
  }

  // ガチャ実行
  const performGacha = (count: number) => {
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
    const world = WORLDS[currentWorld]
    const count = pendingGachaCount
    const results: any[] = []
    const newOwned = { ...ownedCharacters }

    for (let i = 0; i < count; i++) {
      const randomChar = world.characters[Math.floor(Math.random() * world.characters.length)]
      const isNew = !newOwned[randomChar.id]
      newOwned[randomChar.id] = true
      results.push({ ...randomChar, isNew, world: world.name, rank: world.rank })
    }

    setOwnedCharacters(newOwned)
    setDrawnCharacters(results)

    // 10連の場合、新規カードがあれば1枚ずつ表示
    const newCards = results.filter((r) => r.isNew)
    if (count > 1 && newCards.length > 0) {
      setNewCardQueue(newCards)
      setCurrentNewCardIndex(0)
      setScreen("newReveal")
    } else {
      setScreen("result")
    }

    // カード所持数をスプレッドシートに保存
    saveCardsToSpreadsheet(newOwned)

    // E-H列の所持枚数を更新
    const ownedCount = world.characters.filter((char) => newOwned[char.id]).length
    saveCompletionToSpreadsheet(world.rank, ownedCount)

    setTimeout(() => {
      const isComplete = world.characters.every((char) => newOwned[char.id])
      if (isComplete) {
        unlockNextWorld()
      }
    }, 1000)
  }

  // ワールド選択
const selectWorld = (worldId: string) => {
    if (unlockedWorlds.includes(worldId)) {
      setCurrentWorld(worldId)
    } else {
      // Handle locked world click
      if (worldId === "questpia") {
        // SSR world - check if all previous worlds are completed
        const previousWorlds = ["origins", "elements", "beyond"]
        const allPreviousCompleted = previousWorlds.every(wId => {
          const world = WORLDS[wId as keyof typeof WORLDS]
          const owned = world.characters.filter((char) => ownedCharacters[char.id]).length
          return owned === world.characters.length
        })
        
        if (allPreviousCompleted) {
          // All completed, show password modal
          setSelectedLockedWorld(worldId)
          setPasswordInput("")
          setShowPasswordError(false)
          setShowPasswordModal(true)
        } else {
          // Not all completed, show SSR locked message
          setShowSSRLockedModal(true)
        }
      } else {
        // Normal locked world - show password modal
        setSelectedLockedWorld(worldId)
        setPasswordInput("")
        setShowPasswordError(false)
        setShowPasswordModal(true)
      }
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

  const verifyPasswordAndUnlock = () => {
    if (!newUnlockedWorld) return

    const correctPassword = WORLD_PASSWORDS[newUnlockedWorld as keyof typeof WORLD_PASSWORDS]
    if (passwordInput.trim().toUpperCase() === correctPassword.toUpperCase()) {
      setShowUnlockModal(false)
      setNewUnlockedWorld(null)
      setPasswordInput("")
      setShowPasswordError(false)
      setCurrentWorld(newUnlockedWorld)
    } else {
      setShowPasswordError(true)
      setTimeout(() => setShowPasswordError(false), 2000)
    }
  }

  const unlockWorldWithPassword = async () => {
    if (!selectedLockedWorld) return

    const correctPassword = WORLD_PASSWORDS[selectedLockedWorld as keyof typeof WORLD_PASSWORDS]
    if (passwordInput.trim().toUpperCase() === correctPassword.toUpperCase()) {
      // Unlock the world
      const newUnlockedWorlds = [...unlockedWorlds, selectedLockedWorld]
      setUnlockedWorlds(newUnlockedWorlds)
      setCurrentWorld(selectedLockedWorld)
      setShowPasswordModal(false)
      setSelectedLockedWorld(null)
      setPasswordInput("")
      setShowPasswordError(false)


    } else {
      setShowPasswordError(true)
      setTimeout(() => setShowPasswordError(false), 2000)
    }
  }

  const currentWorldData = WORLDS[currentWorld]
  const completion = getCompletionRate(currentWorld)
  const isComplete = checkWorldCompletion(currentWorld)

  const openCollection = () => {
    setCollectionProgress(8)
    setIsCollectionLoading(true)
    setScreen("collection")

    const images = WORLD_ORDER.flatMap((worldId) =>
      WORLDS[worldId].characters
        .filter((character) => ownedCharacters[character.id])
        .map((character) => character.image)
        .filter(Boolean),
    ) as string[]
    const uniqueImages = [...new Set(images)]
    if (uniqueImages.length === 0) {
      setCollectionProgress(100)
      window.setTimeout(() => setIsCollectionLoading(false), 180)
      return
    }

    let completed = 0
    const updateProgress = () => {
      completed += 1
      setCollectionProgress(Math.min(96, 8 + Math.round((completed / uniqueImages.length) * 88)))
      if (completed === uniqueImages.length) {
        setCollectionProgress(100)
        window.setTimeout(() => setIsCollectionLoading(false), 220)
      }
    }

    uniqueImages.forEach((src) => {
      const image = new window.Image()
      image.onload = updateProgress
      image.onerror = updateProgress
      image.src = src
    })
  }

  const handleEmailLogin = async () => {
    if (!email.trim()) {
      setLoginError("メールアドレスを入力してください")
      return
    }

    setIsLoggingIn(true)
    setLoadingProgress(8)
    setLoginError("")

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
        setUserName(data.name)
        setCoins(data.coins)
        setLoadingProgress(100)
        setScreen("gacha")
        setIsLoggingIn(false)

        // Hydrate collection and stats in parallel after the main screen is visible.
        void Promise.all([
          fetch("/api/get-cards", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email.trim() }),
          })
            .then((cardsResponse) => cardsResponse.json())
            .then((cardsData) => {
              if (cardsData.success && cardsData.ownedCharacters) {
                setOwnedCharacters(cardsData.ownedCharacters)
              }
            })
            .catch((cardsError) => console.error("[v0] Error loading cards:", cardsError)),
          fetchUserStats(),
        ])
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

  const saveCardsToSpreadsheet = async (ownedChars: Record<string, boolean>) => {
    if (!email) return

    try {
      console.log("[v0] Saving cards to spreadsheet:", { email, cardsCount: Object.keys(ownedChars).length })
      const response = await fetch("/api/save-cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, ownedCharacters: ownedChars }),
      })

      if (!response.ok) {
        console.warn("[v0] Failed to save cards to spreadsheet")
        return
      }

      const data = await response.json()
      console.log("[v0] Cards saved to spreadsheet:", data)
    } catch (error) {
      console.error("[v0] Error saving cards:", error)
    }
  }

  const saveCompletionToSpreadsheet = async (rarity: string, count: number) => {
    if (!email) return
    try {
      await fetch("/api/save-completion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, rarity, count }),
      })
    } catch (error) {
      console.warn("[v0] Error saving completion:", error)
    }
  }

  const syncCoinsToSpreadsheet = async (newCoins: number, spentAmount: number = 0) => {
    if (!email) return

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
            src="/opening-bg.png"
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
            alt="Quest+a"
            className="w-[500px] max-w-[90vw] drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          />

          {/* Loading indicator */}
          <div className="mt-10 flex flex-col items-center gap-3" style={{ animation: "openingLogoReveal 1.5s ease-out 1.5s forwards", opacity: 0 }}>
            {/* Animated line */}
            <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-full bg-gradient-to-r from-transparent via-white/70 to-transparent rounded-full" style={{ animation: "openingLineSlide 1.8s ease-in-out infinite" }} />
            </div>
                <div className="w-48 space-y-2">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/15">
                    <div className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-white transition-[width] duration-150" style={{ width: `${loadingProgress}%` }} />
                  </div>
                  <p className="text-center text-white/70 text-xs tracking-[0.2em] font-light">NOW LOADING {loadingProgress}%</p>
                </div>
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
          <h1 className="text-4xl font-bold text-white mb-8 text-center drop-shadow-lg">Quest+a</h1>

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
            {/* Background - crystal island */}
            <div className="absolute inset-0">
              <img src="/sky-islands-background.png" alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50" />
            </div>
            {/* Logo centered */}
            <div className="relative z-10 flex flex-col items-center">
              <img src="/quest-alpha-logo.png" alt="Quest+a" className="w-72 max-w-[80vw] drop-shadow-[0_0_30px_rgba(255,255,255,0.25)]" style={{ animation: "loadingPulse 2s ease-in-out infinite" }} />
              <div className="mt-8 flex flex-col items-center gap-3">
                <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-gradient-to-r from-transparent via-white/70 to-transparent rounded-full" style={{ animation: "openingLineSlide 1.8s ease-in-out infinite" }} />
                </div>
            <div className="w-48 space-y-2">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/15">
                <div className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-white transition-[width] duration-150" style={{ width: `${loadingProgress}%` }} />
              </div>
              <p className="text-center text-white/70 text-xs tracking-[0.2em] font-light">NOW LOADING {loadingProgress}%</p>
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

        <div className="absolute bottom-0 right-0 z-5 h-[500px] w-[500px] pointer-events-none">
          <img
            src="/gacha-guide-character.png"
            alt="Guide Character"
            className="w-full h-full object-contain scale-125"
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
        <div className="relative z-10 p-4 bg-blue-900/60 backdrop-blur-sm border-b border-white/20 shadow-2xl">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-2xl font-bold text-white">Quest+α</h1>
              <p className="text-sm text-blue-200">{userName}</p>
            </div>
            <div className="flex gap-2">
  <Button
  onClick={openCollection}
  variant="ghost"
                className="text-white hover:bg-white/20 rounded-xl backdrop-blur-sm"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                コレクション
              </Button>
              <Button onClick={handleLogout} variant="ghost" className="text-white hover:bg-red-500/20 rounded-xl">
                ログアウト
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 bg-yellow-500 rounded-full px-6 py-2 w-fit mx-auto">
            <Coins className="w-5 h-5 text-yellow-900" />
            <span className="text-yellow-900 font-bold">夢のかけら【{coins.toLocaleString()}】</span>
          </div>
        </div>

        {/* ワールド選択 */}
        <div className="relative z-10 p-4">
          <div className="grid grid-cols-4 gap-3">
            {WORLD_ORDER.map((worldId) => {
              const world = WORLDS[worldId]
              const isUnlocked = unlockedWorlds.includes(worldId)
              const isCurrent = currentWorld === worldId

              return (
                <button
                  key={worldId}
                  onClick={() => selectWorld(worldId)}
                  className={`relative overflow-hidden rounded-lg transition-all ${
                    isCurrent
                      ? "shadow-lg border-2 border-yellow-300"
                      : isUnlocked
                        ? "hover:opacity-90"
                        : "bg-slate-700 hover:bg-slate-600 cursor-pointer"
                  }`}
                >
                  {isUnlocked && worldId === "origins" && world.buttonImage ? (
                    <img
                      src={world.buttonImage || "/placeholder.svg"}
                      alt={world.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`p-3 ${isUnlocked ? world.theme.primary : "bg-slate-700"}`}>
                      <div className="flex flex-col items-center gap-1">
                        {isUnlocked ? (
                          React.createElement(world.icon, { className: "w-5 h-5 text-white" })
                        ) : (
                          <Lock className="w-5 h-5 text-slate-500" />
                        )}
                        <Badge className={`${isCurrent ? "bg-yellow-500" : "bg-white/30"} text-white text-[9px]`}>
                          {world.rank}
                        </Badge>
                      </div>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-6">
          <div className="w-full max-w-md">
            {/* ワールド名 */}
            <h2 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-lg">{currentWorldData.name}</h2>

            {/* Updated completion rate section */}
            <div
              className={`rounded-xl p-3 mb-8 ${currentWorldData.theme.border} ${currentWorldData.theme.primary} max-w-xs mx-auto`}
            >
              <h3 className="text-white text-xs font-bold mb-2 text-center uppercase tracking-wider">コンプリート率</h3>
              <Progress value={completion.percentage} className="h-2 mb-2" />
              <div className="text-center">
                <p className="text-white font-bold text-sm">
                  {completion.owned}/{completion.total}
                </p>
                <p className="text-blue-200 text-xs mt-1">{completion.percentage}%</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => performGacha(1)}
                disabled={coins < currentWorldData.cost || isDrawing}
                className="flex-1 relative overflow-hidden rounded-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <img
                  src={getButtonImages(currentWorldData.rank).single || "/placeholder.svg"}
                  alt="Single Summon"
                  className="w-full h-auto"
                />
                {coins < currentWorldData.cost && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">夢のかけら不足</span>
                  </div>
                )}
              </button>

              <button
                onClick={() => performGacha(10)}
                disabled={coins < currentWorldData.cost10 || isDrawing}
                className="flex-1 relative overflow-hidden rounded-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <img
                  src={getButtonImages(currentWorldData.rank).multi || "/placeholder.svg"}
                  alt="10x Summon"
                  className="w-full h-auto"
                />
                {coins < currentWorldData.cost10 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">夢のかけら不足</span>
                  </div>
                )}
              </button>
            </div>
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

        {/* ワールド解放モーダル */}
        {showUnlockModal && newUnlockedWorld && (
          <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 backdrop-blur-md p-4">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <img
                src={
                  WORLDS[newUnlockedWorld as keyof typeof WORLDS].rank === "R"
                    ? "/guide-character-1.png"
                    : WORLDS[newUnlockedWorld as keyof typeof WORLDS].rank === "SR"
                      ? "/guide-character-2.png"
                      : WORLDS[newUnlockedWorld as keyof typeof WORLDS].rank === "SSR"
                        ? "/guide-character-3.png"
                        : "/guide-character-4.png"
                }
                alt="Guide Character"
                className="h-[80vh] w-auto object-contain opacity-40"
              />
            </div>

            <div className="relative z-10 text-center max-w-md w-full space-y-8">
              <h2 className="text-5xl font-bold text-white drop-shadow-2xl animate-fade-in">
                {WORLDS[newUnlockedWorld as keyof typeof WORLDS].name} 解放
              </h2>

              <div className="space-y-4">
                <p className="text-white text-lg drop-shadow-md">合言葉を入力してください</p>
                <Input
                  type="text"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="合言葉を入力"
                  className="w-full h-12 bg-white/20 border border-white/40 rounded-lg text-white placeholder-white/50 focus:bg-white/30 focus:border-white/60 transition-all backdrop-blur-sm text-center text-lg"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      verifyPasswordAndUnlock()
                    }
                  }}
                />
                {showPasswordError && <p className="text-red-400 font-bold animate-pulse">合言葉が違います</p>}
              </div>

              <Button
                onClick={verifyPasswordAndUnlock}
                className={`w-full h-16 bg-gradient-to-r ${WORLDS[newUnlockedWorld as keyof typeof WORLDS].theme.primary} text-white font-bold text-lg rounded-lg shadow-2xl hover:opacity-90 active:scale-95 transition-all`}
              >
                次のガチャエリアに進む
              </Button>
            </div>
          </div>
        )}

        {/* Password input modal for locked worlds */}
        {showPasswordModal && selectedLockedWorld && (
          <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 backdrop-blur-md p-4">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Lock className="w-48 h-48 text-white/20" />
            </div>

            <div className="relative z-10 text-center max-w-md w-full space-y-8">
              <h2 className="text-4xl font-bold text-white drop-shadow-2xl animate-fade-in">
                {WORLDS[selectedLockedWorld as keyof typeof WORLDS].name}
              </h2>
              <p className="text-white/70 text-lg">このワールドはロックされています</p>

              <div className="space-y-4">
                <p className="text-white text-lg drop-shadow-md">合言葉を入力してください</p>
                <Input
                  type="text"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="合言葉を入力"
                  className="w-full h-12 bg-white/20 border border-white/40 rounded-lg text-white placeholder-white/50 focus:bg-white/30 focus:border-white/60 transition-all backdrop-blur-sm text-center text-lg"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      unlockWorldWithPassword()
                    }
                  }}
                />
                {showPasswordError && <p className="text-red-400 font-bold animate-pulse">合言葉が違います</p>}
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => {
                    setShowPasswordModal(false)
                    setSelectedLockedWorld(null)
                    setPasswordInput("")
                    setShowPasswordError(false)
                  }}
                  variant="outline"
                  className="flex-1 h-12 bg-transparent border-white/40 text-white hover:bg-white/20"
                >
                  キャンセル
                </Button>
                <Button
                  onClick={unlockWorldWithPassword}
                  className={`flex-1 h-12 ${WORLDS[selectedLockedWorld as keyof typeof WORLDS].theme.primary} text-white font-bold rounded-lg shadow-2xl hover:opacity-90 active:scale-95 transition-all`}
                >
                  解放する
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* SSR locked modal - requires all previous worlds to be completed */}
        {showSSRLockedModal && (
          <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 backdrop-blur-md p-4">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Rainbow className="w-48 h-48 text-orange-500/20" />
            </div>

            <div className="relative z-10 text-center max-w-md w-full space-y-8">
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 drop-shadow-2xl">
                {WORLDS.questpia.name}
              </h2>
              
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-br from-orange-900/40 to-red-900/40 rounded-xl border border-orange-500/30">
                  <p className="text-orange-200 text-xl font-bold leading-relaxed">
                    「私は全てをコンプリートした者にのみ開かれるだろう」
                  </p>
                </div>
                
                <p className="text-white/70 text-sm">
                  Vol.1〜Vol.3の全てのカードをコンプリートすると解放されます
                </p>

                <div className="space-y-2">
                  {["origins", "elements", "beyond"].map((worldId) => {
                    const world = WORLDS[worldId as keyof typeof WORLDS]
                    const owned = world.characters.filter((char) => ownedCharacters[char.id]).length
                    const total = world.characters.length
                    const isComplete = owned === total
                    return (
                      <div key={worldId} className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                        <span className="text-white">{world.name}</span>
                        <span className={isComplete ? "text-green-400 font-bold" : "text-white/50"}>
                          {owned}/{total} {isComplete && "✓"}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <Button
                onClick={() => setShowSSRLockedModal(false)}
                variant="outline"
                className="w-full h-12 bg-transparent border-orange-500/40 text-orange-300 hover:bg-orange-500/20"
              >
                閉じる
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  }

  if (screen === "video") {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-black">
        <div ref={videoContainerRef} className="w-full h-screen" />

        <button
          onClick={() => {
            if (playerRef.current) {
              playerRef.current.destroy()
              playerRef.current = null
            }
            if (videoContainerRef.current) {
              videoContainerRef.current.innerHTML = ""
            }
            processGachaResults()
          }}
          className="absolute bottom-8 right-8 z-50 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg backdrop-blur-sm transition-all"
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
          <img src="/images/image.png" alt="New Card Background" className="w-full h-full object-cover" />
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

  if (screen === "result") {
    const isSingle = drawnCharacters.length === 1

    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
        <div className="absolute inset-0">
          <img src="/images/image.png" alt="Gacha Result Background" className="w-full h-full object-cover" />
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
                <div className="overflow-hidden shadow-2xl rounded-lg animate-fade-in">
                  <div className="relative aspect-[3/4]">
                    <img
                      src={drawnCharacters[0].image || "/placeholder.svg"}
                      alt={drawnCharacters[0].name}
                      className="w-full h-full object-cover"
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
                    className="overflow-hidden shadow-2xl rounded-lg hover:scale-105 transition-transform cursor-pointer"
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
                    <div className="relative aspect-[3/4]">
                      <img
                        src={char.image || "/placeholder.svg"}
                        alt={char.name}
                        className="w-full h-full object-cover"
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
          <h1 className="text-xl font-bold text-white drop-shadow-md">Quest+a カード</h1>
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
              <div key={worldId} className="mb-10 [content-visibility:auto] [contain-intrinsic-size:0_420px]">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    {React.createElement(world.icon, { className: "w-8 h-8 text-white" })}
                    <div>
                      <h2 className="text-2xl font-bold text-white drop-shadow-md">{world.name}</h2>
                      <p className="text-white/70 text-sm italic">{world.subtitle}</p>
                    </div>
                    <Badge className={`bg-gradient-to-r ${world.theme.primary} text-white`}>{world.rank}</Badge>
                    {worldComplete && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white animate-pulse">
                        COMPLETE
                      </Badge>
                    )}
                  </div>
                  <span className="text-white font-bold text-lg drop-shadow-md">
                    {worldCompletion.owned}/{worldCompletion.total}
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-3">
                  {world.characters.map((char) => {
                    const isOwned = ownedCharacters[char.id]

                    return (
                      <button
                        key={char.id}
                        onClick={() =>
                          isOwned && setSelectedCharacter({ ...char, world: world.name, rank: world.rank })
                        }
                        className={`${isOwned ? "hover:scale-105 shadow-xl" : "bg-slate-800/50 cursor-default"} overflow-hidden transition-all rounded-lg`}
                      >
                        <div className="relative aspect-[3/4]">
                          {isOwned ? (
                            <img
                              src={char.image || "/placeholder.svg"}
                              alt={char.name}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-slate-700/70 flex items-center justify-center backdrop-blur-sm">
                              <div className="text-4xl text-slate-500">?</div>
                            </div>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {isCollectionLoading && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
            <div className="w-64 space-y-3 text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-cyan-300" />
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/15">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-white transition-[width] duration-200"
                  style={{ width: `${collectionProgress}%` }}
                />
              </div>
              <p className="text-xs tracking-[0.2em] text-white/80">COLLECTION LOADING {collectionProgress}%</p>
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
