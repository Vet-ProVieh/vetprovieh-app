

export interface IPdfRepository {

    /**
     * Download a PDF
     * @param {string} id
     * @return {Promise<string|null>}
     */
     downloadPdf(id: string): Promise<string | null>;
}
