const request: Window['fetch'] = ((global: Window | NodeJS.Global | any) => {
    if (typeof global.fetch === 'undefined') {
        return require('node-fetch');
    } else {
        return global.fetch;
    }
})(this as any);

export const parseResponse = (response: Response): Promise<{ content: any; response: Response }> => {
    const getContent = () =>
        (response.headers.get('Content-Type')?.toLowerCase().includes('application/json')
            ? response.json()
            : response.text())
            .then(content => ({ content, response }));

    if (response.ok) {
        return getContent();
    } else {
        return getContent()
            .then(data => Promise.reject(data));
    }
};

export const fetch = request;
export default fetch;
