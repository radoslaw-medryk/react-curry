function newMemoryNode() {
    return { f: null, map: new Map() };
}

function simpleCurry(func, ...args) {
    return func.length === 0
        ? () => func()
        : (a1) => func(a1, ...args);
}

function getReusableCurry(memory, func, ...args) {
    let node = memory;
    for (const arg of args) {
        const current = node.map.get(arg);
        if (!current) {
            current = newMemoryNode();
            node.map.set(arg, current);
        }
        node = current;
    }

    if (!node.f) {
        node.f = simpleCurry(func, ...args);
    }

    return node.f;
}

export function curry(func) {
    const memory = newMemoryNode();
    return (...args) => getReusableCurry(memory, func, ...args);
}
