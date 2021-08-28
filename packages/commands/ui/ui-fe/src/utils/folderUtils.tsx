// 拆解path
export function slicePath(path: string) {
    const parts: { name: string; path: string }[] = [];
    let startIndex = 0;
    let index = 0;
    const findSeparator = () => {
        index = path.indexOf("/", startIndex);
        if (index === -1) index = path.indexOf("\\", startIndex);
        return index !== -1;
    };
    const addPart = (index: number) => {
        const folder = path.substring(startIndex, index);
        const slice = path.substring(0, index + 1);
        parts.push({
            name: folder,
            path: slice,
        });
    };
    while (findSeparator()) {
        addPart(index);
        startIndex = index + 1;
    }
    if (startIndex < path.length) addPart(path.length);
    return parts;
}
