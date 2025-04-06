import { checkXDCRStatus } from '@/lib/couchbase';

export async function GET() {
    try {
        const status = await checkXDCRStatus();
        return NextResponse.json(status);
    } catch (error) {
        console.error('Erreur lors de la vérification du statut de synchronisation:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}