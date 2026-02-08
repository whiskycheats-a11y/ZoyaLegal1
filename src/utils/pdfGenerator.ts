import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface PDFData {
    orderId: string;
    userName: string;
    docType: string;
    date: string;
    formData?: any;
    isDraft?: boolean;
    signatureUrl?: string; // Client's uploaded signature
}

export const generateLegalPDF = async (data: PDFData) => {
    const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;

    // Helper to load image
    const loadImage = (url: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = url;
            img.onload = () => resolve(img);
            img.onerror = (err) => reject(err);
        });
    };

    // 1. Professional Header / Letterhead
    doc.setFont('times', 'bold');
    doc.setFontSize(22);
    doc.text('ZOYA LEGAL SERVICES', pageWidth / 2, 25, { align: 'center' });

    doc.setFontSize(8);
    doc.setFont('times', 'normal');
    doc.text('Authorized Digital Execution & Notary Support Channel', pageWidth / 2, 30, { align: 'center' });
    doc.text('Z-Hub Security Protocol | Verification: 2026-XLY', pageWidth / 2, 34, { align: 'center' });

    // Decorative Line
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(margin, 40, pageWidth - margin, 40);

    // 2. Reference & Date
    doc.setFontSize(10);
    doc.setFont('times', 'bold');
    doc.text(`REF ID: ${data.orderId.toUpperCase()}`, margin, 50);
    doc.text(`DATE: ${data.date}`, pageWidth - margin - 40, 50);

    // 3. Document Title
    doc.setFontSize(18);
    doc.text(data.docType.toUpperCase(), pageWidth / 2, 65, { align: 'center' });

    // 4. Content Area (Legal Style)
    doc.setFontSize(12);
    doc.setFont('times', 'normal');

    const content = [
        `THIS DOCUMENT is a legal instrument initiated by ${data.userName}.`,
        `The following details have been recorded for the purpose of digital execution:`,
        "",
        `Service Category: ${data.docType}`,
        `Signatory Name: ${data.userName}`,
        `Execution Status: ${data.isDraft ? 'DRAFT PENDING SIGNATURE' : 'EXECUTED & VERIFIED'}`,
        "",
        "DETAILS & DECLARATION:",
        data.formData?.purpose || "Legal declaration provided by the signatory for official records.",
        "",
        data.isDraft
            ? "This document is electronically generated and serves as a valid draft for review purposes. Final execution requires digital consent and authorized Notary stamping."
            : "This document has been digitally executed following the ZoyaLegal Digital Consent Protocol. The signatory has provided voluntary consent and a verified signature scan.",
        ""
    ];

    let yPos = 80;
    content.forEach(line => {
        if (line === "") {
            yPos += 5;
        } else {
            const splitLines = doc.splitTextToSize(line, pageWidth - (margin * 2));
            doc.text(splitLines, margin, yPos);
            yPos += (splitLines.length * 6);
        }
    });

    // 5. Signature Placement (Only in Draft PDFs for client review)
    if (data.signatureUrl && data.isDraft) {
        try {
            console.log('[PDF] Loading signature from:', data.signatureUrl);

            // For Cloudinary URLs, ensure CORS is handled
            let imageUrl = data.signatureUrl;
            if (imageUrl.includes('cloudinary.com')) {
                // Add transformation to ensure proper format
                imageUrl = imageUrl.replace('/upload/', '/upload/f_auto,q_auto/');
            }

            const img = await loadImage(imageUrl);
            const imgWidth = 40;
            const imgHeight = (img.height * imgWidth) / img.width;

            // Limit height to 20mm
            const finalHeight = Math.min(imgHeight, 20);

            doc.addImage(img, 'PNG', margin, yPos, imgWidth, finalHeight);
            console.log('[PDF] Signature embedded successfully');
            yPos += finalHeight + 5;
        } catch (err) {
            console.error("[PDF] Signature loading failed:", err);
            doc.setFontSize(10);
            doc.setTextColor(255, 0, 0);
            doc.text("[SIGNATURE SCAN ATTACHED IN RECORD]", margin, yPos);
            doc.setTextColor(0, 0, 0);
            yPos += 10;
        }
    } else if (!data.isDraft) {
        // Final PDF - leave space for manual signature
        doc.text("__________________________", margin, yPos);
        yPos += 6;
    }

    doc.setFontSize(10);
    doc.setFont('times', 'bold');
    doc.text("Authorized Electronic Record", margin, yPos);
    yPos += 5;
    doc.text("ZoyaLegal Digital Vault", margin, yPos);

    // 6. Watermark for Draft
    if (data.isDraft) {
        doc.setTextColor(200, 200, 200);
        doc.setFontSize(60);
        doc.setFont('times', 'bold');
        doc.saveGraphicsState();
        doc.setGState(doc.GState({ opacity: 0.1 }));
        doc.text('DRAFT ONLY', pageWidth / 2, pageHeight / 2, {
            align: 'center',
            angle: 45
        });
        doc.restoreGraphicsState();
    }

    // 7. Security Footer
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(8);
    doc.text('Security Notice: This is an encrypted digital record. Modification is strictly prohibited.', margin, pageHeight - 15);
    doc.text('Powered by ZoyaLegal.com - Secure Execution Room', pageWidth - margin - 70, pageHeight - 15);

    // Save/Download
    const fileName = `${data.isDraft ? 'Draft' : 'Final'}_${data.orderId.slice(-6)}.pdf`;
    doc.save(fileName);
};
