// store/playerStore.ts

import { create } from 'zustand';

type PlayerType = 'Allrounder' | 'Bowler' | 'Batsman';

interface RadarStat {
  subject: string;
  A: number;
  B: number;
}

interface YearlyData {
  year: string;
  iplRuns: string;
  t20Runs: string;
  wickets: string;
  cost: string;
}

interface PersonalData {
  age: number;
  birthPlace: string;
  height: string;
  battingStyle: string;
  bowlingStyle: string;
  debut: string;
}

interface Stats {
  matches: number;
  runs: number;
  average: number;
  strikeRate: number;
  fifties: number;
  notOuts: number;
}

interface Player {
  id: string;
  name: string;
  image: string;
  role: string;
  type: string;
  status: string;
  takenBy: string;
  cost: number;
  costGrowth: number;
  personalData: PersonalData;
  iplStats: Stats;
  t20Stats: Stats;
  battingRadar: RadarStat[];
  bowlingRadar: RadarStat[];
  yearlyData: YearlyData[];
}

interface PlayerStore {
  players: Player[];
  teamPlayers: string[]; // list of player IDs
  addPlayer: (player: Player) => void;
  getPlayerById: (id: string) => Player | undefined;
  getPlayersByType: (type: PlayerType) => Player[];
  getTeamPlayers: () => Player[];
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  players: [],
  teamPlayers: [],

  addPlayer: (player: Player) =>
    set((state) => ({
      players: [...state.players, player],
    })),

  getPlayerById: (id: string) =>
    get().players.find((player) => player.id === id),

  getPlayersByType: (type: PlayerType) =>
    get().players.filter((player) => player.role.toLowerCase() === type.toLowerCase()),

  getTeamPlayers: () =>
    get().teamPlayers.map((id) => get().players.find((player) => player.id === id)!).filter(Boolean),
}));





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
usePlayerStore.getState().addPlayer({
  id: "1",
  name: "Virat Kohli",
  image: "/players/virat-kohli.jpg",
  role: "Allrounder",
  type: "Overseas",
  status: "my-team",
  takenBy: "My Team",
  cost: 15,
  costGrowth: 10,
  personalData: {
    age: 34,
    birthPlace: "Delhi, India",
    height: "5'9\"",
    battingStyle: "Right-hand bat",
    bowlingStyle: "Right-arm medium",
    debut: "2008"
  },
  iplStats: {
    matches: 192,
    runs: 5878,
    average: 38.16,
    strikeRate: 130.41,
    fifties: 40,
    notOuts: 12
  },
  t20Stats: {
    matches: 99,
    runs: 3159,
    average: 50.0,
    strikeRate: 140.74,
    fifties: 28,
    notOuts: 10
  },
  battingRadar: [
    { subject: "Strike Rate", A: 130, B: 120 },
    { subject: "Average", A: 50, B: 45 },
    { subject: "Fifties Rate", A: 60, B: 55 },
    { subject: "Boundary %", A: 35, B: 30 },
    { subject: "Runs", A: 5878, B: 5000 },
    { subject: "Not Outs", A: 12, B: 10 }
  ],
  bowlingRadar: [
    { subject: "Wickets", A: 100, B: 90 },
    { subject: "Economy", A: 7.5, B: 8.0 },
    { subject: "Average", A: 25, B: 30 },
    { subject: "Strike Rate", A: 18, B: 20 }
  ],
  yearlyData: [
    { year: "2018", iplRuns: "500", t20Runs: "400", wickets: "20", cost: "10" },
    { year: "2019", iplRuns: "600", t20Runs: "500", wickets: "25", cost: "12" },
    { year: "2020", iplRuns: "700", t20Runs: "600", wickets: "30", cost: "14" },
    { year: "2021", iplRuns: "800", t20Runs: "700", wickets: "35", cost: "16" },
    { year: "2022", iplRuns: "900", t20Runs: "800", wickets: "40", cost: "18" },
    { year: "2023", iplRuns: "1000", t20Runs: "900", wickets: "45", cost: "20" }
  ]



});
