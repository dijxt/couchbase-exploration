import PlayerDetail from '@/components/PlayerDetail';

export default function PlayerDetailPage({ params, searchParams }) {
    const playerName = params.id;
    const clusterSource = searchParams.cluster || '1';

    return (
        <div className="container mx-auto px-4 py-8">
            <PlayerDetail playerName={playerName} clusterSource={clusterSource} />
        </div>
    );
}