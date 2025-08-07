import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const leaderboardData = [
  { rank: 1, username: "SpeedySumit", wpm: 145, accuracy: "98.2%" },
  { rank: 2, username: "CodeMaster", wpm: 138, accuracy: "97.6%" },
  { rank: 3, username: "TypeKing", wpm: 132, accuracy: "96.4%" },
  { rank: 4, username: "ReactRider", wpm: 129, accuracy: "97.1%" },
  { rank: 5, username: "FastFingers", wpm: 125, accuracy: "95.8%" },
  { rank: 6, username: "TypoNinja", wpm: 119, accuracy: "96.7%" },
  { rank: 7, username: "SpeedWriter", wpm: 115, accuracy: "94.3%" },
  { rank: 8, username: "AsyncAce", wpm: 112, accuracy: "95.2%" },
  { rank: 9, username: "BugHunter", wpm: 110, accuracy: "93.5%" },
  { rank: 10, username: "LoopLord", wpm: 106, accuracy: "92.7%" },
  { rank: 11, username: "ConsoleQueen", wpm: 101, accuracy: "91.6%" },
  { rank: 12, username: "DevDynamo", wpm: 97, accuracy: "93.0%" },
  { rank: 13, username: "KeyStroker", wpm: 95, accuracy: "90.8%" },
  { rank: 14, username: "CharCoder", wpm: 91, accuracy: "89.4%" },
  { rank: 15, username: "PixelPusher", wpm: 89, accuracy: "88.1%" },
];

const Leaderboard = () => {
  return (
    <div className="bg-gray-800 min-h-screen py-10 px-4 text-white">
      <div className="max-w-4xl mx-auto bg-gray-900 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-yellow-400 mb-6">
           Leaderboard
        </h1>
        <Table className="w-full">
          <TableHeader>
            <TableRow className="text-gray-400 border-b border-gray-700">
              <TableHead className='text-gray-100'>Rank</TableHead>
              <TableHead className='text-gray-100'>Accuracy</TableHead>
              <TableHead className='text-gray-100'>WPM</TableHead>
              <TableHead className='text-gray-100 text-right'>Username</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.map((item) => (
              <TableRow
                key={item.rank}
                className={`border-b border-gray-700 hover:bg-gray-800 transition ${
                  item.rank === 1
                    ? "text-yellow-300 font-semibold"
                    : item.rank === 2
                    ? "text-gray-300"
                    : item.rank === 3
                    ? "text-orange-300"
                    : ""
                }`}
              >
                <TableCell>{item.rank}</TableCell>
                <TableCell>{item.accuracy}</TableCell>
                <TableCell>{item.wpm}</TableCell>
                <TableCell className="text-right">{item.username}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Leaderboard;
