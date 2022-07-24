const filterCharcher = [';', ':', '?', '{', '}', '[', ']'];

export const doCamel = (name: string) => {
    if (!name) return '';
    return name.split('').filter(i => !filterCharcher.includes(i)).reduce((p: string, c: string, i: number) => {
        if (!i) {
            const cn = isNaN(Number(c));
            return cn ? c.toUpperCase() : `T${c}`;
        }
        if (p.indexOf('-') !== -1 || p.indexOf('_') !== -1)
            return p.replace(/(-|_)/g, '') + c.toUpperCase();
        return p + c;
    }, '');
}