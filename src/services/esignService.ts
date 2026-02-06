/**
 * ZoyaLegal eSign Service Abstraction
 * Currently in Simulation Mode.
 * Switch to 'live' and provide provider credentials to go live.
 */

export type ESignProvider = 'DIGIO' | 'SIGNZY' | 'NSDL' | 'SIMULATION';

interface ESignConfig {
    provider: ESignProvider;
    apiKey?: string;
    environment: 'sandbox' | 'production';
}

const config: ESignConfig = {
    provider: 'SIMULATION', // Change to 'DIGIO' for real integration
    environment: 'sandbox',
};

export const esignService = {
    /**
     * Initialize the signing process
     * For Digio: Typically involves uploading the PDF to their server and getting a document ID
     * For Simulation: Returns a mock document ID
     */
    async initializeSigning(data: { name: string; email: string; docType: string }): Promise<string> {
        console.log(`[ESignService] Initializing ${config.provider} for ${data.name}`);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        return `DOC-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    },

    /**
     * Verifies the status of a document
     */
    async getStatus(_docId: string): Promise<'PENDING' | 'SIGNED' | 'EXPIRED'> {
        return 'PENDING';
    },

    /**
     * Recommendation for Provider
     */
    getRecommendedProvider(): string {
        return 'DIGIO';
    }
};
