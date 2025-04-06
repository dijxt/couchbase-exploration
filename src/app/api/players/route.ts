import { getCluster1, getCluster2, getBucket } from '@/lib/couchbase';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const clusterSource = searchParams.get('cluster') || '1';
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = parseInt(searchParams.get('skip') || '0');

    try {
        const cluster = clusterSource === '1' ? await getCluster1() : await getCluster2();
        const { collection } = await getBucket(cluster);

        // Utilisation de N1QL pour récupérer les joueurs
        const query = `
            SELECT p.*
            FROM fifa AS p
            WHERE p.positions IS NOT NULL
            ORDER BY p.overall_rating DESC
            LIMIT $1
            OFFSET $2
            `;

        const result = await cluster.query(query, { parameters: [limit, skip] });
        return NextResponse.json({ players: result.rows, source: `cluster${clusterSource}` });
    } catch (error) {
        console.error('Erreur lors de la récupération des joueurs:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
