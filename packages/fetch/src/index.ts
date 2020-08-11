const request: Window['fetch'] = ((global: Window | NodeJS.Global | any) => {
    if (typeof global.fetch === 'undefined') {
        return require('node-fetch');
    } else {
        return global.fetch;
    }
})(this as any);

export default request;
