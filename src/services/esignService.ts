const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api';

export const esignService = {
    async createOrder(userData: any, serviceType: string) {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userData, serviceType })
        });
        return response.json();
    },

    async updateFormData(orderId: string, formData: any) {
        const response = await fetch(`${API_URL}/orders/${orderId}/form`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ formData })
        });
        return response.json();
    },

    async recordPayment(orderId: string, transactionId: string, amount: number) {
        const response = await fetch(`${API_URL}/orders/${orderId}/payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ transactionId, amount })
        });
        return response.json();
    },

    async initiateESign(orderId: string) {
        const response = await fetch(`${API_URL}/orders/${orderId}/esign/initiate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        return response.json();
    },

    async verifyESign(orderId: string) {
        const response = await fetch(`${API_URL}/orders/${orderId}/esign/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        return response.json();
    },

    async uploadSignature(orderId: string, signatureData: string) {
        console.log(`[ESIGN-FRONTEND] Uploading signature for order: ${orderId} to ${API_URL}`);
        const response = await fetch(`${API_URL}/orders/${orderId}/signature`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ signatureData })
        });

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Signature upload failed');
            }
            return data;
        } else {
            const text = await response.text();
            console.error("[ESIGN-FRONTEND] Non-JSON response received:", text.slice(0, 500));
            throw new Error(`Server returned non-JSON response (${response.status}). Potential 404 or backend crash.`);
        }
    }
};
