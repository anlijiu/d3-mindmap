export function buildTree(tokens, md) {
  const root = {
    type: 'root',
    depth: 0,
    value: '',
    children: [],
    payload: {},
  };

  const stack = [root];
  let depth = 0;
  for(let i = 0; i < tokens.length; ++i) {
    const token = tokens[i];

    let current = stack[stack.length - 1];
    if (token.type.endsWith('_open')) {
      const type = token.type.slice(0, -5);
      const payload = {};
      if (token.lines) {
        payload.lines = token.lines;
      }
      if (type === 'heading') {
        depth = token.hLevel;
        while (current?.depth >= depth) {
          stack.pop();
          current = stack[stack.length - 1];
        }
      } else {
        depth = Math.max(depth, current?.depth || 0) + 1;
        if (type === 'ordered_list') {
          payload.start = token.order;
        }
      }
      const item = {
        type,
        depth,
        value: '',
        payload,
        children: [],
      };
      current.children.push(item);
      stack.push(item);
    } else if (!current) {
      continue;
    } else if (token.type === `${current.type}_close`) {
      if (current.type === 'heading') {
        depth = current.depth;
      } else {
        stack.pop();
        depth = 0;
      }
    } else if (token.type === 'inline') {
      const text = md.renderer.render([token], md.options, {});
      current.value = `${current.value || ''}${text}`;
    } else if (token.type === 'fence') {
      let result = md.renderer.render([token], md.options, {});
      // Remarkable only adds className to `<code>` but not `<pre>`, copy it to make PrismJS style work.
      const matches = result.match(/<code( class="[^"]*")>/);
      if (matches) result = result.replace('<pre>', `<pre${matches[1]}>`);
      current.children.push({
        type: token.type,
        depth: depth + 1,
        value: result,
        children: [],
      });
    } else {
      // ignore other nodes
    }
  }
  return root;
}


export function cleanNode(node, depth = 0) {
  if (node.type === 'heading') {
    // drop all paragraphs
    node.children = node.children.filter((item) => item.type !== 'paragraph');
  } else if (node.type === 'list_item') {
    // keep first paragraph as content of list_item, drop others
    node.children = node.children.filter((item) => {
      if (['paragraph', 'fence'].includes(item.type)) {
        if (!node.value) {
          node.value = item.value;
          node.payload = {
            ...node.payload,
            ...item.payload,
          };
        }
        return false;
      }
      return true;
    });
    if (node.payload?.index != null) {
      node.value = `${node.payload.index}. ${node.value}`;
    }
  } else if (node.type === 'ordered_list') {
    let index = node.payload?.start ?? 1;
    node.children.forEach((item) => {
      if (item.type === 'list_item') {
        item.payload = {
          ...item.payload,
          index,
        };
        index += 1;
      }
    });
  }
  if (node.children.length === 0) {
    delete node.children;
  } else {
    node.children.forEach((child) => cleanNode(child, depth + 1));
    if (node.children.length === 1 && !node.children[0].value) {
      node.children = node.children[0].children;
    }
  }
  node.depth = depth;
}
