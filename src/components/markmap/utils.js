

const uniqId = Math.random().toString(36).slice(2, 8);
let globalIndex = 0;
export function getId(): string {
  globalIndex += 1;
  return `mm-${uniqId}-${globalIndex}`;
}

/**
 * callback 第一个参数 为item
 * 第二个参数是继续遍历孩子
 * 第三个参数parent 
 * 第四个参数在兄弟中的index
 */
export function walkTree(tree, callback, key = 'children') {
  const walk = (item, parent, index) => callback(item, () => {
    item[key]?.forEach((child, ci) => {
      walk(child, item, ci);
    });
  }, parent, index);
  walk(tree, undefined, 0);
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

