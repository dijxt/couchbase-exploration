import React from 'react';
import Link from 'next/link';

export default function PlayerCard({ player, source }) {
    const positionList = Array.isArray(player.positions)
        ? player.positions.join(', ')
        : player.positions;

    return (
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold">{player.name}</h3>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
          {source}
        </span>
            </div>
            <div className="text-gray-700 mb-1">
                <span className="font-medium">Pays:</span> {player.nationality}
            </div>
            <div className="text-gray-700 mb-1">
                <span className="font-medium">Position:</span> {positionList}
            </div>
            <div className="flex justify-between mt-3">
                <div className="text-center">
                    <div className="text-sm text-gray-500">Note</div>
                    <div className="font-bold text-lg">{player.overall_rating}</div>
                </div>
                <div className="text-center">
                    <div className="text-sm text-gray-500">Potentiel</div>
                    <div className="font-bold text-lg">{player.potential}</div>
                </div>
                <div className="text-center">
                    <div className="text-sm text-gray-500">Âge</div>
                    <div className="font-bold text-lg">{player.age}</div>
                </div>
            </div>
            <div className="mt-4">
                <Link
                    href={`/players/${encodeURIComponent(player.name)}?cluster=${source.slice(-1)}`}
                    className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors"
                >
                    Voir détails
                </Link>
            </div>
        </div>
    );
}