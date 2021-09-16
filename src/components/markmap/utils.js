

const uniqId = Math.random().toString(36).slice(2, 8);
let globalIndex = 0;
export function getId(): string {
  globalIndex += 1;
  return `mm-${uniqId}-${globalIndex}`;
}

export function walkTree(tree, callback, key = 'children') {
  const walk = (item, parent) => callback(item, () => {
    item[key]?.forEach((child) => {
      walk(child, item);
    });
  }, parent);
  walk(tree);
}

export function arrayFrom(arrayLike) {
  if (Array.from) return Array.from(arrayLike);
  const array = [];
  for (let i = 0; i < arrayLike.length; i += 1) {
    array.push(arrayLike[i]);
  }
  return array;
}

export function childSelector(filter) {
  if (typeof filter === 'string') {
    const tagName = filter;
    filter = (el) => el.tagName === tagName;
  }
  const filterFn = filter;
  return function selector(): T[] {
    let nodes = arrayFrom((this).childNodes);
    if (filterFn) nodes = nodes.filter((node) => filterFn(node));
    return nodes;
  };
}

