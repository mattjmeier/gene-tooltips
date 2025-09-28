import {
  __export
} from "./chunk-PZ5AY32C.js";

// node_modules/ideogram/src/js/version.js
var version = "1.53.0";
var version_default = version;

// node_modules/d3-selection/src/namespaces.js
var xhtml = "http://www.w3.org/1999/xhtml";
var namespaces_default = {
  svg: "http://www.w3.org/2000/svg",
  xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

// node_modules/d3-selection/src/namespace.js
function namespace_default(name2) {
  var prefix = name2 += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name2.slice(0, i)) !== "xmlns") name2 = name2.slice(i + 1);
  return namespaces_default.hasOwnProperty(prefix) ? { space: namespaces_default[prefix], local: name2 } : name2;
}

// node_modules/d3-selection/src/creator.js
function creatorInherit(name2) {
  return function() {
    var document2 = this.ownerDocument, uri = this.namespaceURI;
    return uri === xhtml && document2.documentElement.namespaceURI === xhtml ? document2.createElement(name2) : document2.createElementNS(uri, name2);
  };
}
function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}
function creator_default(name2) {
  var fullname = namespace_default(name2);
  return (fullname.local ? creatorFixed : creatorInherit)(fullname);
}

// node_modules/d3-selection/src/selector.js
function none() {
}
function selector_default(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
}

// node_modules/d3-selection/src/selection/select.js
function select_default(select) {
  if (typeof select !== "function") select = selector_default(select);
  for (var groups2 = this._groups, m = groups2.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group2 = groups2[j], n2 = group2.length, subgroup = subgroups[j] = new Array(n2), node, subnode, i = 0; i < n2; ++i) {
      if ((node = group2[i]) && (subnode = select.call(node, node.__data__, i, group2))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }
  return new Selection(subgroups, this._parents);
}

// node_modules/d3-selection/src/array.js
function array(x) {
  return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
}

// node_modules/d3-selection/src/selectorAll.js
function empty() {
  return [];
}
function selectorAll_default(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
}

// node_modules/d3-selection/src/selection/selectAll.js
function arrayAll(select) {
  return function() {
    return array(select.apply(this, arguments));
  };
}
function selectAll_default(select) {
  if (typeof select === "function") select = arrayAll(select);
  else select = selectorAll_default(select);
  for (var groups2 = this._groups, m = groups2.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group2 = groups2[j], n2 = group2.length, node, i = 0; i < n2; ++i) {
      if (node = group2[i]) {
        subgroups.push(select.call(node, node.__data__, i, group2));
        parents.push(node);
      }
    }
  }
  return new Selection(subgroups, parents);
}

// node_modules/d3-selection/src/matcher.js
function matcher_default(selector) {
  return function() {
    return this.matches(selector);
  };
}
function childMatcher(selector) {
  return function(node) {
    return node.matches(selector);
  };
}

// node_modules/d3-selection/src/selection/selectChild.js
var find = Array.prototype.find;
function childFind(match) {
  return function() {
    return find.call(this.children, match);
  };
}
function childFirst() {
  return this.firstElementChild;
}
function selectChild_default(match) {
  return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : childMatcher(match)));
}

// node_modules/d3-selection/src/selection/selectChildren.js
var filter = Array.prototype.filter;
function children() {
  return Array.from(this.children);
}
function childrenFilter(match) {
  return function() {
    return filter.call(this.children, match);
  };
}
function selectChildren_default(match) {
  return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
}

// node_modules/d3-selection/src/selection/filter.js
function filter_default(match) {
  if (typeof match !== "function") match = matcher_default(match);
  for (var groups2 = this._groups, m = groups2.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group2 = groups2[j], n2 = group2.length, subgroup = subgroups[j] = [], node, i = 0; i < n2; ++i) {
      if ((node = group2[i]) && match.call(node, node.__data__, i, group2)) {
        subgroup.push(node);
      }
    }
  }
  return new Selection(subgroups, this._parents);
}

// node_modules/d3-selection/src/selection/sparse.js
function sparse_default(update) {
  return new Array(update.length);
}

// node_modules/d3-selection/src/selection/enter.js
function enter_default() {
  return new Selection(this._enter || this._groups.map(sparse_default), this._parents);
}
function EnterNode(parent, datum2) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum2;
}
EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) {
    return this._parent.insertBefore(child, this._next);
  },
  insertBefore: function(child, next) {
    return this._parent.insertBefore(child, next);
  },
  querySelector: function(selector) {
    return this._parent.querySelector(selector);
  },
  querySelectorAll: function(selector) {
    return this._parent.querySelectorAll(selector);
  }
};

// node_modules/d3-selection/src/constant.js
function constant_default(x) {
  return function() {
    return x;
  };
}

// node_modules/d3-selection/src/selection/data.js
function bindIndex(parent, group2, enter, update, exit, data) {
  var i = 0, node, groupLength = group2.length, dataLength = data.length;
  for (; i < dataLength; ++i) {
    if (node = group2[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }
  for (; i < groupLength; ++i) {
    if (node = group2[i]) {
      exit[i] = node;
    }
  }
}
function bindKey(parent, group2, enter, update, exit, data, key) {
  var i, node, nodeByKeyValue = /* @__PURE__ */ new Map(), groupLength = group2.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
  for (i = 0; i < groupLength; ++i) {
    if (node = group2[i]) {
      keyValues[i] = keyValue = key.call(node, node.__data__, i, group2) + "";
      if (nodeByKeyValue.has(keyValue)) {
        exit[i] = node;
      } else {
        nodeByKeyValue.set(keyValue, node);
      }
    }
  }
  for (i = 0; i < dataLength; ++i) {
    keyValue = key.call(parent, data[i], i, data) + "";
    if (node = nodeByKeyValue.get(keyValue)) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue.delete(keyValue);
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }
  for (i = 0; i < groupLength; ++i) {
    if ((node = group2[i]) && nodeByKeyValue.get(keyValues[i]) === node) {
      exit[i] = node;
    }
  }
}
function datum(node) {
  return node.__data__;
}
function data_default(value, key) {
  if (!arguments.length) return Array.from(this, datum);
  var bind = key ? bindKey : bindIndex, parents = this._parents, groups2 = this._groups;
  if (typeof value !== "function") value = constant_default(value);
  for (var m = groups2.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j], group2 = groups2[j], groupLength = group2.length, data = arraylike(value.call(parent, parent && parent.__data__, j, parents)), dataLength = data.length, enterGroup = enter[j] = new Array(dataLength), updateGroup = update[j] = new Array(dataLength), exitGroup = exit[j] = new Array(groupLength);
    bind(parent, group2, enterGroup, updateGroup, exitGroup, data, key);
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength) ;
        previous._next = next || null;
      }
    }
  }
  update = new Selection(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}
function arraylike(data) {
  return typeof data === "object" && "length" in data ? data : Array.from(data);
}

// node_modules/d3-selection/src/selection/exit.js
function exit_default() {
  return new Selection(this._exit || this._groups.map(sparse_default), this._parents);
}

// node_modules/d3-selection/src/selection/join.js
function join_default(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  if (typeof onenter === "function") {
    enter = onenter(enter);
    if (enter) enter = enter.selection();
  } else {
    enter = enter.append(onenter + "");
  }
  if (onupdate != null) {
    update = onupdate(update);
    if (update) update = update.selection();
  }
  if (onexit == null) exit.remove();
  else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}

// node_modules/d3-selection/src/selection/merge.js
function merge_default(context) {
  var selection2 = context.selection ? context.selection() : context;
  for (var groups0 = this._groups, groups1 = selection2._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n2 = group0.length, merge2 = merges[j] = new Array(n2), node, i = 0; i < n2; ++i) {
      if (node = group0[i] || group1[i]) {
        merge2[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Selection(merges, this._parents);
}

// node_modules/d3-selection/src/selection/order.js
function order_default() {
  for (var groups2 = this._groups, j = -1, m = groups2.length; ++j < m; ) {
    for (var group2 = groups2[j], i = group2.length - 1, next = group2[i], node; --i >= 0; ) {
      if (node = group2[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }
  return this;
}

// node_modules/d3-selection/src/selection/sort.js
function sort_default(compare) {
  if (!compare) compare = ascending;
  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }
  for (var groups2 = this._groups, m = groups2.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group2 = groups2[j], n2 = group2.length, sortgroup = sortgroups[j] = new Array(n2), node, i = 0; i < n2; ++i) {
      if (node = group2[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }
  return new Selection(sortgroups, this._parents).order();
}
function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

// node_modules/d3-selection/src/selection/call.js
function call_default() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}

// node_modules/d3-selection/src/selection/nodes.js
function nodes_default() {
  return Array.from(this);
}

// node_modules/d3-selection/src/selection/node.js
function node_default() {
  for (var groups2 = this._groups, j = 0, m = groups2.length; j < m; ++j) {
    for (var group2 = groups2[j], i = 0, n2 = group2.length; i < n2; ++i) {
      var node = group2[i];
      if (node) return node;
    }
  }
  return null;
}

// node_modules/d3-selection/src/selection/size.js
function size_default() {
  let size = 0;
  for (const node of this) ++size;
  return size;
}

// node_modules/d3-selection/src/selection/empty.js
function empty_default() {
  return !this.node();
}

// node_modules/d3-selection/src/selection/each.js
function each_default(callback) {
  for (var groups2 = this._groups, j = 0, m = groups2.length; j < m; ++j) {
    for (var group2 = groups2[j], i = 0, n2 = group2.length, node; i < n2; ++i) {
      if (node = group2[i]) callback.call(node, node.__data__, i, group2);
    }
  }
  return this;
}

// node_modules/d3-selection/src/selection/attr.js
function attrRemove(name2) {
  return function() {
    this.removeAttribute(name2);
  };
}
function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant(name2, value) {
  return function() {
    this.setAttribute(name2, value);
  };
}
function attrConstantNS(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}
function attrFunction(name2, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name2);
    else this.setAttribute(name2, v);
  };
}
function attrFunctionNS(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
    else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}
function attr_default(name2, value) {
  var fullname = namespace_default(name2);
  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
  }
  return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
}

// node_modules/d3-selection/src/window.js
function window_default(node) {
  return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
}

// node_modules/d3-selection/src/selection/style.js
function styleRemove(name2) {
  return function() {
    this.style.removeProperty(name2);
  };
}
function styleConstant(name2, value, priority) {
  return function() {
    this.style.setProperty(name2, value, priority);
  };
}
function styleFunction(name2, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name2);
    else this.style.setProperty(name2, v, priority);
  };
}
function style_default(name2, value, priority) {
  return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name2, value, priority == null ? "" : priority)) : styleValue(this.node(), name2);
}
function styleValue(node, name2) {
  return node.style.getPropertyValue(name2) || window_default(node).getComputedStyle(node, null).getPropertyValue(name2);
}

// node_modules/d3-selection/src/selection/property.js
function propertyRemove(name2) {
  return function() {
    delete this[name2];
  };
}
function propertyConstant(name2, value) {
  return function() {
    this[name2] = value;
  };
}
function propertyFunction(name2, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name2];
    else this[name2] = v;
  };
}
function property_default(name2, value) {
  return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name2, value)) : this.node()[name2];
}

// node_modules/d3-selection/src/selection/classed.js
function classArray(string) {
  return string.trim().split(/^|\s+/);
}
function classList(node) {
  return node.classList || new ClassList(node);
}
function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}
ClassList.prototype = {
  add: function(name2) {
    var i = this._names.indexOf(name2);
    if (i < 0) {
      this._names.push(name2);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name2) {
    var i = this._names.indexOf(name2);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name2) {
    return this._names.indexOf(name2) >= 0;
  }
};
function classedAdd(node, names) {
  var list = classList(node), i = -1, n2 = names.length;
  while (++i < n2) list.add(names[i]);
}
function classedRemove(node, names) {
  var list = classList(node), i = -1, n2 = names.length;
  while (++i < n2) list.remove(names[i]);
}
function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}
function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}
function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}
function classed_default(name2, value) {
  var names = classArray(name2 + "");
  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n2 = names.length;
    while (++i < n2) if (!list.contains(names[i])) return false;
    return true;
  }
  return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
}

// node_modules/d3-selection/src/selection/text.js
function textRemove() {
  this.textContent = "";
}
function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}
function text_default(value) {
  return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
}

// node_modules/d3-selection/src/selection/html.js
function htmlRemove() {
  this.innerHTML = "";
}
function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}
function htmlFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}
function html_default(value) {
  return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
}

// node_modules/d3-selection/src/selection/raise.js
function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}
function raise_default() {
  return this.each(raise);
}

// node_modules/d3-selection/src/selection/lower.js
function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function lower_default() {
  return this.each(lower);
}

// node_modules/d3-selection/src/selection/append.js
function append_default(name2) {
  var create2 = typeof name2 === "function" ? name2 : creator_default(name2);
  return this.select(function() {
    return this.appendChild(create2.apply(this, arguments));
  });
}

// node_modules/d3-selection/src/selection/insert.js
function constantNull() {
  return null;
}
function insert_default(name2, before) {
  var create2 = typeof name2 === "function" ? name2 : creator_default(name2), select = before == null ? constantNull : typeof before === "function" ? before : selector_default(before);
  return this.select(function() {
    return this.insertBefore(create2.apply(this, arguments), select.apply(this, arguments) || null);
  });
}

// node_modules/d3-selection/src/selection/remove.js
function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}
function remove_default() {
  return this.each(remove);
}

// node_modules/d3-selection/src/selection/clone.js
function selection_cloneShallow() {
  var clone = this.cloneNode(false), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function selection_cloneDeep() {
  var clone = this.cloneNode(true), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function clone_default(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}

// node_modules/d3-selection/src/selection/datum.js
function datum_default(value) {
  return arguments.length ? this.property("__data__", value) : this.node().__data__;
}

// node_modules/d3-selection/src/selection/on.js
function contextListener(listener) {
  return function(event) {
    listener.call(this, event, this.__data__);
  };
}
function parseTypenames(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t4) {
    var name2 = "", i = t4.indexOf(".");
    if (i >= 0) name2 = t4.slice(i + 1), t4 = t4.slice(0, i);
    return { type: t4, name: name2 };
  });
}
function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on) return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;
    else delete this.__on;
  };
}
function onAdd(typename, value, options) {
  return function() {
    var on = this.__on, o, listener = contextListener(value);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
        this.addEventListener(o.type, o.listener = listener, o.options = options);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, options);
    o = { type: typename.type, name: typename.name, value, listener, options };
    if (!on) this.__on = [o];
    else on.push(o);
  };
}
function on_default(typename, value, options) {
  var typenames = parseTypenames(typename + ""), i, n2 = typenames.length, t4;
  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n2; ++i) {
        if ((t4 = typenames[i]).type === o.type && t4.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }
  on = value ? onAdd : onRemove;
  for (i = 0; i < n2; ++i) this.each(on(typenames[i], value, options));
  return this;
}

// node_modules/d3-selection/src/selection/dispatch.js
function dispatchEvent(node, type2, params) {
  var window2 = window_default(node), event = window2.CustomEvent;
  if (typeof event === "function") {
    event = new event(type2, params);
  } else {
    event = window2.document.createEvent("Event");
    if (params) event.initEvent(type2, params.bubbles, params.cancelable), event.detail = params.detail;
    else event.initEvent(type2, false, false);
  }
  node.dispatchEvent(event);
}
function dispatchConstant(type2, params) {
  return function() {
    return dispatchEvent(this, type2, params);
  };
}
function dispatchFunction(type2, params) {
  return function() {
    return dispatchEvent(this, type2, params.apply(this, arguments));
  };
}
function dispatch_default(type2, params) {
  return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type2, params));
}

// node_modules/d3-selection/src/selection/iterator.js
function* iterator_default() {
  for (var groups2 = this._groups, j = 0, m = groups2.length; j < m; ++j) {
    for (var group2 = groups2[j], i = 0, n2 = group2.length, node; i < n2; ++i) {
      if (node = group2[i]) yield node;
    }
  }
}

// node_modules/d3-selection/src/selection/index.js
var root = [null];
function Selection(groups2, parents) {
  this._groups = groups2;
  this._parents = parents;
}
function selection() {
  return new Selection([[document.documentElement]], root);
}
function selection_selection() {
  return this;
}
Selection.prototype = selection.prototype = {
  constructor: Selection,
  select: select_default,
  selectAll: selectAll_default,
  selectChild: selectChild_default,
  selectChildren: selectChildren_default,
  filter: filter_default,
  data: data_default,
  enter: enter_default,
  exit: exit_default,
  join: join_default,
  merge: merge_default,
  selection: selection_selection,
  order: order_default,
  sort: sort_default,
  call: call_default,
  nodes: nodes_default,
  node: node_default,
  size: size_default,
  empty: empty_default,
  each: each_default,
  attr: attr_default,
  style: style_default,
  property: property_default,
  classed: classed_default,
  text: text_default,
  html: html_default,
  raise: raise_default,
  lower: lower_default,
  append: append_default,
  insert: insert_default,
  remove: remove_default,
  clone: clone_default,
  datum: datum_default,
  on: on_default,
  dispatch: dispatch_default,
  [Symbol.iterator]: iterator_default
};
var selection_default = selection;

// node_modules/d3-selection/src/select.js
function select_default2(selector) {
  return typeof selector === "string" ? new Selection([[document.querySelector(selector)]], [document.documentElement]) : new Selection([[selector]], root);
}

// node_modules/d3-selection/src/local.js
var nextId = 0;
function local() {
  return new Local();
}
function Local() {
  this._ = "@" + (++nextId).toString(36);
}
Local.prototype = local.prototype = {
  constructor: Local,
  get: function(node) {
    var id2 = this._;
    while (!(id2 in node)) if (!(node = node.parentNode)) return;
    return node[id2];
  },
  set: function(node, value) {
    return node[this._] = value;
  },
  remove: function(node) {
    return this._ in node && delete node[this._];
  },
  toString: function() {
    return this._;
  }
};

// node_modules/d3-selection/src/sourceEvent.js
function sourceEvent_default(event) {
  let sourceEvent;
  while (sourceEvent = event.sourceEvent) event = sourceEvent;
  return event;
}

// node_modules/d3-selection/src/pointer.js
function pointer_default(event, node) {
  event = sourceEvent_default(event);
  if (node === void 0) node = event.currentTarget;
  if (node) {
    var svg2 = node.ownerSVGElement || node;
    if (svg2.createSVGPoint) {
      var point2 = svg2.createSVGPoint();
      point2.x = event.clientX, point2.y = event.clientY;
      point2 = point2.matrixTransform(node.getScreenCTM().inverse());
      return [point2.x, point2.y];
    }
    if (node.getBoundingClientRect) {
      var rect = node.getBoundingClientRect();
      return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
    }
  }
  return [event.pageX, event.pageY];
}

// node_modules/d3-selection/src/selectAll.js
function selectAll_default2(selector) {
  return typeof selector === "string" ? new Selection([document.querySelectorAll(selector)], [document.documentElement]) : new Selection([array(selector)], root);
}

// node_modules/d3-fetch/src/index.js
var src_exports = {};
__export(src_exports, {
  blob: () => blob_default,
  buffer: () => buffer_default,
  csv: () => csv2,
  dsv: () => dsv,
  html: () => html,
  image: () => image_default,
  json: () => json_default,
  svg: () => svg,
  text: () => text_default2,
  tsv: () => tsv2,
  xml: () => xml_default
});

// node_modules/d3-fetch/src/blob.js
function responseBlob(response) {
  if (!response.ok) throw new Error(response.status + " " + response.statusText);
  return response.blob();
}
function blob_default(input, init3) {
  return fetch(input, init3).then(responseBlob);
}

// node_modules/d3-fetch/src/buffer.js
function responseArrayBuffer(response) {
  if (!response.ok) throw new Error(response.status + " " + response.statusText);
  return response.arrayBuffer();
}
function buffer_default(input, init3) {
  return fetch(input, init3).then(responseArrayBuffer);
}

// node_modules/d3-dsv/src/dsv.js
var EOL = {};
var EOF = {};
var QUOTE = 34;
var NEWLINE = 10;
var RETURN = 13;
function objectConverter(columns) {
  return new Function("d", "return {" + columns.map(function(name2, i) {
    return JSON.stringify(name2) + ": d[" + i + '] || ""';
  }).join(",") + "}");
}
function customConverter(columns, f) {
  var object = objectConverter(columns);
  return function(row, i) {
    return f(object(row), i, columns);
  };
}
function inferColumns(rows) {
  var columnSet = /* @__PURE__ */ Object.create(null), columns = [];
  rows.forEach(function(row) {
    for (var column in row) {
      if (!(column in columnSet)) {
        columns.push(columnSet[column] = column);
      }
    }
  });
  return columns;
}
function pad(value, width) {
  var s = value + "", length2 = s.length;
  return length2 < width ? new Array(width - length2 + 1).join(0) + s : s;
}
function formatYear(year) {
  return year < 0 ? "-" + pad(-year, 6) : year > 9999 ? "+" + pad(year, 6) : pad(year, 4);
}
function formatDate(date) {
  var hours = date.getUTCHours(), minutes = date.getUTCMinutes(), seconds2 = date.getUTCSeconds(), milliseconds2 = date.getUTCMilliseconds();
  return isNaN(date) ? "Invalid Date" : formatYear(date.getUTCFullYear(), 4) + "-" + pad(date.getUTCMonth() + 1, 2) + "-" + pad(date.getUTCDate(), 2) + (milliseconds2 ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds2, 2) + "." + pad(milliseconds2, 3) + "Z" : seconds2 ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds2, 2) + "Z" : minutes || hours ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + "Z" : "");
}
function dsv_default(delimiter) {
  var reFormat = new RegExp('["' + delimiter + "\n\r]"), DELIMITER = delimiter.charCodeAt(0);
  function parse(text, f) {
    var convert, columns, rows = parseRows(text, function(row, i) {
      if (convert) return convert(row, i - 1);
      columns = row, convert = f ? customConverter(row, f) : objectConverter(row);
    });
    rows.columns = columns || [];
    return rows;
  }
  function parseRows(text, f) {
    var rows = [], N = text.length, I = 0, n2 = 0, t4, eof = N <= 0, eol = false;
    if (text.charCodeAt(N - 1) === NEWLINE) --N;
    if (text.charCodeAt(N - 1) === RETURN) --N;
    function token() {
      if (eof) return EOF;
      if (eol) return eol = false, EOL;
      var i, j = I, c;
      if (text.charCodeAt(j) === QUOTE) {
        while (I++ < N && text.charCodeAt(I) !== QUOTE || text.charCodeAt(++I) === QUOTE) ;
        if ((i = I) >= N) eof = true;
        else if ((c = text.charCodeAt(I++)) === NEWLINE) eol = true;
        else if (c === RETURN) {
          eol = true;
          if (text.charCodeAt(I) === NEWLINE) ++I;
        }
        return text.slice(j + 1, i - 1).replace(/""/g, '"');
      }
      while (I < N) {
        if ((c = text.charCodeAt(i = I++)) === NEWLINE) eol = true;
        else if (c === RETURN) {
          eol = true;
          if (text.charCodeAt(I) === NEWLINE) ++I;
        } else if (c !== DELIMITER) continue;
        return text.slice(j, i);
      }
      return eof = true, text.slice(j, N);
    }
    while ((t4 = token()) !== EOF) {
      var row = [];
      while (t4 !== EOL && t4 !== EOF) row.push(t4), t4 = token();
      if (f && (row = f(row, n2++)) == null) continue;
      rows.push(row);
    }
    return rows;
  }
  function preformatBody(rows, columns) {
    return rows.map(function(row) {
      return columns.map(function(column) {
        return formatValue(row[column]);
      }).join(delimiter);
    });
  }
  function format2(rows, columns) {
    if (columns == null) columns = inferColumns(rows);
    return [columns.map(formatValue).join(delimiter)].concat(preformatBody(rows, columns)).join("\n");
  }
  function formatBody(rows, columns) {
    if (columns == null) columns = inferColumns(rows);
    return preformatBody(rows, columns).join("\n");
  }
  function formatRows(rows) {
    return rows.map(formatRow).join("\n");
  }
  function formatRow(row) {
    return row.map(formatValue).join(delimiter);
  }
  function formatValue(value) {
    return value == null ? "" : value instanceof Date ? formatDate(value) : reFormat.test(value += "") ? '"' + value.replace(/"/g, '""') + '"' : value;
  }
  return {
    parse,
    parseRows,
    format: format2,
    formatBody,
    formatRows,
    formatRow,
    formatValue
  };
}

// node_modules/d3-dsv/src/csv.js
var csv = dsv_default(",");
var csvParse = csv.parse;
var csvParseRows = csv.parseRows;
var csvFormat = csv.format;
var csvFormatBody = csv.formatBody;
var csvFormatRows = csv.formatRows;
var csvFormatRow = csv.formatRow;
var csvFormatValue = csv.formatValue;

// node_modules/d3-dsv/src/tsv.js
var tsv = dsv_default("	");
var tsvParse = tsv.parse;
var tsvParseRows = tsv.parseRows;
var tsvFormat = tsv.format;
var tsvFormatBody = tsv.formatBody;
var tsvFormatRows = tsv.formatRows;
var tsvFormatRow = tsv.formatRow;
var tsvFormatValue = tsv.formatValue;

// node_modules/d3-dsv/src/autoType.js
var fixtz = (/* @__PURE__ */ new Date("2019-01-01T00:00")).getHours() || (/* @__PURE__ */ new Date("2019-07-01T00:00")).getHours();

// node_modules/d3-fetch/src/text.js
function responseText(response) {
  if (!response.ok) throw new Error(response.status + " " + response.statusText);
  return response.text();
}
function text_default2(input, init3) {
  return fetch(input, init3).then(responseText);
}

// node_modules/d3-fetch/src/dsv.js
function dsvParse(parse) {
  return function(input, init3, row) {
    if (arguments.length === 2 && typeof init3 === "function") row = init3, init3 = void 0;
    return text_default2(input, init3).then(function(response) {
      return parse(response, row);
    });
  };
}
function dsv(delimiter, input, init3, row) {
  if (arguments.length === 3 && typeof init3 === "function") row = init3, init3 = void 0;
  var format2 = dsv_default(delimiter);
  return text_default2(input, init3).then(function(response) {
    return format2.parse(response, row);
  });
}
var csv2 = dsvParse(csvParse);
var tsv2 = dsvParse(tsvParse);

// node_modules/d3-fetch/src/image.js
function image_default(input, init3) {
  return new Promise(function(resolve, reject) {
    var image = new Image();
    for (var key in init3) image[key] = init3[key];
    image.onerror = reject;
    image.onload = function() {
      resolve(image);
    };
    image.src = input;
  });
}

// node_modules/d3-fetch/src/json.js
function responseJson(response) {
  if (!response.ok) throw new Error(response.status + " " + response.statusText);
  if (response.status === 204 || response.status === 205) return;
  return response.json();
}
function json_default(input, init3) {
  return fetch(input, init3).then(responseJson);
}

// node_modules/d3-fetch/src/xml.js
function parser(type2) {
  return (input, init3) => text_default2(input, init3).then((text) => new DOMParser().parseFromString(text, type2));
}
var xml_default = parser("application/xml");
var html = parser("text/html");
var svg = parser("image/svg+xml");

// node_modules/d3-brush/src/index.js
var src_exports3 = {};
__export(src_exports3, {
  brush: () => brush_default,
  brushSelection: () => brushSelection,
  brushX: () => brushX,
  brushY: () => brushY
});

// node_modules/d3-dispatch/src/index.js
var src_exports2 = {};
__export(src_exports2, {
  dispatch: () => dispatch_default2
});

// node_modules/d3-dispatch/src/dispatch.js
var noop = { value: () => {
} };
function dispatch() {
  for (var i = 0, n2 = arguments.length, _2 = {}, t4; i < n2; ++i) {
    if (!(t4 = arguments[i] + "") || t4 in _2 || /[\s.]/.test(t4)) throw new Error("illegal type: " + t4);
    _2[t4] = [];
  }
  return new Dispatch(_2);
}
function Dispatch(_2) {
  this._ = _2;
}
function parseTypenames2(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t4) {
    var name2 = "", i = t4.indexOf(".");
    if (i >= 0) name2 = t4.slice(i + 1), t4 = t4.slice(0, i);
    if (t4 && !types.hasOwnProperty(t4)) throw new Error("unknown type: " + t4);
    return { type: t4, name: name2 };
  });
}
Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _2 = this._, T = parseTypenames2(typename + "", _2), t4, i = -1, n2 = T.length;
    if (arguments.length < 2) {
      while (++i < n2) if ((t4 = (typename = T[i]).type) && (t4 = get(_2[t4], typename.name))) return t4;
      return;
    }
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i < n2) {
      if (t4 = (typename = T[i]).type) _2[t4] = set(_2[t4], typename.name, callback);
      else if (callback == null) for (t4 in _2) _2[t4] = set(_2[t4], typename.name, null);
    }
    return this;
  },
  copy: function() {
    var copy3 = {}, _2 = this._;
    for (var t4 in _2) copy3[t4] = _2[t4].slice();
    return new Dispatch(copy3);
  },
  call: function(type2, that) {
    if ((n2 = arguments.length - 2) > 0) for (var args = new Array(n2), i = 0, n2, t4; i < n2; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type2)) throw new Error("unknown type: " + type2);
    for (t4 = this._[type2], i = 0, n2 = t4.length; i < n2; ++i) t4[i].value.apply(that, args);
  },
  apply: function(type2, that, args) {
    if (!this._.hasOwnProperty(type2)) throw new Error("unknown type: " + type2);
    for (var t4 = this._[type2], i = 0, n2 = t4.length; i < n2; ++i) t4[i].value.apply(that, args);
  }
};
function get(type2, name2) {
  for (var i = 0, n2 = type2.length, c; i < n2; ++i) {
    if ((c = type2[i]).name === name2) {
      return c.value;
    }
  }
}
function set(type2, name2, callback) {
  for (var i = 0, n2 = type2.length; i < n2; ++i) {
    if (type2[i].name === name2) {
      type2[i] = noop, type2 = type2.slice(0, i).concat(type2.slice(i + 1));
      break;
    }
  }
  if (callback != null) type2.push({ name: name2, value: callback });
  return type2;
}
var dispatch_default2 = dispatch;

// node_modules/d3-drag/src/noevent.js
var nonpassivecapture = { capture: true, passive: false };
function noevent_default(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}

// node_modules/d3-drag/src/nodrag.js
function nodrag_default(view) {
  var root2 = view.document.documentElement, selection2 = select_default2(view).on("dragstart.drag", noevent_default, nonpassivecapture);
  if ("onselectstart" in root2) {
    selection2.on("selectstart.drag", noevent_default, nonpassivecapture);
  } else {
    root2.__noselect = root2.style.MozUserSelect;
    root2.style.MozUserSelect = "none";
  }
}
function yesdrag(view, noclick) {
  var root2 = view.document.documentElement, selection2 = select_default2(view).on("dragstart.drag", null);
  if (noclick) {
    selection2.on("click.drag", noevent_default, nonpassivecapture);
    setTimeout(function() {
      selection2.on("click.drag", null);
    }, 0);
  }
  if ("onselectstart" in root2) {
    selection2.on("selectstart.drag", null);
  } else {
    root2.style.MozUserSelect = root2.__noselect;
    delete root2.__noselect;
  }
}

// node_modules/d3-drag/src/event.js
function DragEvent(type2, {
  sourceEvent,
  subject,
  target,
  identifier,
  active,
  x,
  y: y2,
  dx,
  dy,
  dispatch: dispatch2
}) {
  Object.defineProperties(this, {
    type: { value: type2, enumerable: true, configurable: true },
    sourceEvent: { value: sourceEvent, enumerable: true, configurable: true },
    subject: { value: subject, enumerable: true, configurable: true },
    target: { value: target, enumerable: true, configurable: true },
    identifier: { value: identifier, enumerable: true, configurable: true },
    active: { value: active, enumerable: true, configurable: true },
    x: { value: x, enumerable: true, configurable: true },
    y: { value: y2, enumerable: true, configurable: true },
    dx: { value: dx, enumerable: true, configurable: true },
    dy: { value: dy, enumerable: true, configurable: true },
    _: { value: dispatch2 }
  });
}
DragEvent.prototype.on = function() {
  var value = this._.on.apply(this._, arguments);
  return value === this._ ? this : value;
};

// node_modules/d3-color/src/define.js
function define_default(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}

// node_modules/d3-color/src/color.js
function Color() {
}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*";
var reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
var reHex = /^#([0-9a-f]{3,8})$/;
var reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`);
var reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`);
var reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`);
var reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`);
var reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`);
var reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
var named = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
define_default(Color, color, {
  copy(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHex8() {
  return this.rgb().formatHex8();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format2) {
  var m, l;
  format2 = (format2 + "").trim().toLowerCase();
  return (m = reHex.exec(format2)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format2)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format2)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format2)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format2)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format2)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format2)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format2) ? rgbn(named[format2]) : format2 === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n2) {
  return new Rgb(n2 >> 16 & 255, n2 >> 8 & 255, n2 & 255, 1);
}
function rgba(r2, g, b, a) {
  if (a <= 0) r2 = g = b = NaN;
  return new Rgb(r2, g, b, a);
}
function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r2, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r2) : new Rgb(r2, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r2, g, b, opacity) {
  this.r = +r2;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
define_default(Rgb, rgb, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}
function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function rgb_formatRgb() {
  const a = clampa(this.opacity);
  return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
}
function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}
function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}
function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h3, s, l, a) {
  if (a <= 0) h3 = s = l = NaN;
  else if (l <= 0 || l >= 1) h3 = s = NaN;
  else if (s <= 0) h3 = NaN;
  return new Hsl(h3, s, l, a);
}
function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl();
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r2 = o.r / 255, g = o.g / 255, b = o.b / 255, min4 = Math.min(r2, g, b), max5 = Math.max(r2, g, b), h3 = NaN, s = max5 - min4, l = (max5 + min4) / 2;
  if (s) {
    if (r2 === max5) h3 = (g - b) / s + (g < b) * 6;
    else if (g === max5) h3 = (b - r2) / s + 2;
    else h3 = (r2 - g) / s + 4;
    s /= l < 0.5 ? max5 + min4 : 2 - max5 - min4;
    h3 *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h3;
  }
  return new Hsl(h3, s, l, o.opacity);
}
function hsl(h3, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h3) : new Hsl(h3, s, l, opacity == null ? 1 : opacity);
}
function Hsl(h3, s, l, opacity) {
  this.h = +h3;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
define_default(Hsl, hsl, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h3 = this.h % 360 + (this.h < 0) * 360, s = isNaN(h3) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h3 >= 240 ? h3 - 240 : h3 + 120, m1, m2),
      hsl2rgb(h3, m1, m2),
      hsl2rgb(h3 < 120 ? h3 + 240 : h3 - 120, m1, m2),
      this.opacity
    );
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
  }
}));
function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}
function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}
function hsl2rgb(h3, m1, m2) {
  return (h3 < 60 ? m1 + (m2 - m1) * h3 / 60 : h3 < 180 ? m2 : h3 < 240 ? m1 + (m2 - m1) * (240 - h3) / 60 : m1) * 255;
}

// node_modules/d3-color/src/math.js
var radians = Math.PI / 180;
var degrees = 180 / Math.PI;

// node_modules/d3-color/src/lab.js
var K = 18;
var Xn = 0.96422;
var Yn = 1;
var Zn = 0.82521;
var t0 = 4 / 29;
var t1 = 6 / 29;
var t2 = 3 * t1 * t1;
var t3 = t1 * t1 * t1;
function labConvert(o) {
  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl) return hcl2lab(o);
  if (!(o instanceof Rgb)) o = rgbConvert(o);
  var r2 = rgb2lrgb(o.r), g = rgb2lrgb(o.g), b = rgb2lrgb(o.b), y2 = xyz2lab((0.2225045 * r2 + 0.7168786 * g + 0.0606169 * b) / Yn), x, z;
  if (r2 === g && g === b) x = z = y2;
  else {
    x = xyz2lab((0.4360747 * r2 + 0.3850649 * g + 0.1430804 * b) / Xn);
    z = xyz2lab((0.0139322 * r2 + 0.0971045 * g + 0.7141733 * b) / Zn);
  }
  return new Lab(116 * y2 - 16, 500 * (x - y2), 200 * (y2 - z), o.opacity);
}
function lab(l, a, b, opacity) {
  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
}
function Lab(l, a, b, opacity) {
  this.l = +l;
  this.a = +a;
  this.b = +b;
  this.opacity = +opacity;
}
define_default(Lab, lab, extend(Color, {
  brighter(k) {
    return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  darker(k) {
    return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  rgb() {
    var y2 = (this.l + 16) / 116, x = isNaN(this.a) ? y2 : y2 + this.a / 500, z = isNaN(this.b) ? y2 : y2 - this.b / 200;
    x = Xn * lab2xyz(x);
    y2 = Yn * lab2xyz(y2);
    z = Zn * lab2xyz(z);
    return new Rgb(
      lrgb2rgb(3.1338561 * x - 1.6168667 * y2 - 0.4906146 * z),
      lrgb2rgb(-0.9787684 * x + 1.9161415 * y2 + 0.033454 * z),
      lrgb2rgb(0.0719453 * x - 0.2289914 * y2 + 1.4052427 * z),
      this.opacity
    );
  }
}));
function xyz2lab(t4) {
  return t4 > t3 ? Math.pow(t4, 1 / 3) : t4 / t2 + t0;
}
function lab2xyz(t4) {
  return t4 > t1 ? t4 * t4 * t4 : t2 * (t4 - t0);
}
function lrgb2rgb(x) {
  return 255 * (x <= 31308e-7 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}
function rgb2lrgb(x) {
  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}
function hclConvert(o) {
  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab)) o = labConvert(o);
  if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
  var h3 = Math.atan2(o.b, o.a) * degrees;
  return new Hcl(h3 < 0 ? h3 + 360 : h3, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}
function hcl(h3, c, l, opacity) {
  return arguments.length === 1 ? hclConvert(h3) : new Hcl(h3, c, l, opacity == null ? 1 : opacity);
}
function Hcl(h3, c, l, opacity) {
  this.h = +h3;
  this.c = +c;
  this.l = +l;
  this.opacity = +opacity;
}
function hcl2lab(o) {
  if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
  var h3 = o.h * radians;
  return new Lab(o.l, Math.cos(h3) * o.c, Math.sin(h3) * o.c, o.opacity);
}
define_default(Hcl, hcl, extend(Color, {
  brighter(k) {
    return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
  },
  darker(k) {
    return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
  },
  rgb() {
    return hcl2lab(this).rgb();
  }
}));

// node_modules/d3-color/src/cubehelix.js
var A = -0.14861;
var B = 1.78277;
var C = -0.29227;
var D = -0.90649;
var E = 1.97294;
var ED = E * D;
var EB = E * B;
var BC_DA = B * C - D * A;
function cubehelixConvert(o) {
  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Rgb)) o = rgbConvert(o);
  var r2 = o.r / 255, g = o.g / 255, b = o.b / 255, l = (BC_DA * b + ED * r2 - EB * g) / (BC_DA + ED - EB), bl = b - l, k = (E * (g - l) - C * bl) / D, s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), h3 = s ? Math.atan2(k, bl) * degrees - 120 : NaN;
  return new Cubehelix(h3 < 0 ? h3 + 360 : h3, s, l, o.opacity);
}
function cubehelix(h3, s, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h3) : new Cubehelix(h3, s, l, opacity == null ? 1 : opacity);
}
function Cubehelix(h3, s, l, opacity) {
  this.h = +h3;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
define_default(Cubehelix, cubehelix, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h3 = isNaN(this.h) ? 0 : (this.h + 120) * radians, l = +this.l, a = isNaN(this.s) ? 0 : this.s * l * (1 - l), cosh2 = Math.cos(h3), sinh2 = Math.sin(h3);
    return new Rgb(
      255 * (l + a * (A * cosh2 + B * sinh2)),
      255 * (l + a * (C * cosh2 + D * sinh2)),
      255 * (l + a * (E * cosh2)),
      this.opacity
    );
  }
}));

// node_modules/d3-interpolate/src/basis.js
function basis(t13, v0, v1, v2, v3) {
  var t22 = t13 * t13, t32 = t22 * t13;
  return ((1 - 3 * t13 + 3 * t22 - t32) * v0 + (4 - 6 * t22 + 3 * t32) * v1 + (1 + 3 * t13 + 3 * t22 - 3 * t32) * v2 + t32 * v3) / 6;
}
function basis_default(values) {
  var n2 = values.length - 1;
  return function(t4) {
    var i = t4 <= 0 ? t4 = 0 : t4 >= 1 ? (t4 = 1, n2 - 1) : Math.floor(t4 * n2), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n2 - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t4 - i / n2) * n2, v0, v1, v2, v3);
  };
}

// node_modules/d3-interpolate/src/basisClosed.js
function basisClosed_default(values) {
  var n2 = values.length;
  return function(t4) {
    var i = Math.floor(((t4 %= 1) < 0 ? ++t4 : t4) * n2), v0 = values[(i + n2 - 1) % n2], v1 = values[i % n2], v2 = values[(i + 1) % n2], v3 = values[(i + 2) % n2];
    return basis((t4 - i / n2) * n2, v0, v1, v2, v3);
  };
}

// node_modules/d3-interpolate/src/constant.js
var constant_default3 = (x) => () => x;

// node_modules/d3-interpolate/src/color.js
function linear(a, d) {
  return function(t4) {
    return a + t4 * d;
  };
}
function exponential(a, b, y2) {
  return a = Math.pow(a, y2), b = Math.pow(b, y2) - a, y2 = 1 / y2, function(t4) {
    return Math.pow(a + t4 * b, y2);
  };
}
function hue(a, b) {
  var d = b - a;
  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant_default3(isNaN(a) ? b : a);
}
function gamma(y2) {
  return (y2 = +y2) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y2) : constant_default3(isNaN(a) ? b : a);
  };
}
function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : constant_default3(isNaN(a) ? b : a);
}

// node_modules/d3-interpolate/src/rgb.js
var rgb_default = function rgbGamma(y2) {
  var color2 = gamma(y2);
  function rgb2(start3, end2) {
    var r2 = color2((start3 = rgb(start3)).r, (end2 = rgb(end2)).r), g = color2(start3.g, end2.g), b = color2(start3.b, end2.b), opacity = nogamma(start3.opacity, end2.opacity);
    return function(t4) {
      start3.r = r2(t4);
      start3.g = g(t4);
      start3.b = b(t4);
      start3.opacity = opacity(t4);
      return start3 + "";
    };
  }
  rgb2.gamma = rgbGamma;
  return rgb2;
}(1);
function rgbSpline(spline) {
  return function(colors2) {
    var n2 = colors2.length, r2 = new Array(n2), g = new Array(n2), b = new Array(n2), i, color2;
    for (i = 0; i < n2; ++i) {
      color2 = rgb(colors2[i]);
      r2[i] = color2.r || 0;
      g[i] = color2.g || 0;
      b[i] = color2.b || 0;
    }
    r2 = spline(r2);
    g = spline(g);
    b = spline(b);
    color2.opacity = 1;
    return function(t4) {
      color2.r = r2(t4);
      color2.g = g(t4);
      color2.b = b(t4);
      return color2 + "";
    };
  };
}
var rgbBasis = rgbSpline(basis_default);
var rgbBasisClosed = rgbSpline(basisClosed_default);

// node_modules/d3-interpolate/src/numberArray.js
function numberArray_default(a, b) {
  if (!b) b = [];
  var n2 = a ? Math.min(b.length, a.length) : 0, c = b.slice(), i;
  return function(t4) {
    for (i = 0; i < n2; ++i) c[i] = a[i] * (1 - t4) + b[i] * t4;
    return c;
  };
}
function isNumberArray(x) {
  return ArrayBuffer.isView(x) && !(x instanceof DataView);
}

// node_modules/d3-interpolate/src/array.js
function genericArray(a, b) {
  var nb = b ? b.length : 0, na = a ? Math.min(nb, a.length) : 0, x = new Array(na), c = new Array(nb), i;
  for (i = 0; i < na; ++i) x[i] = value_default(a[i], b[i]);
  for (; i < nb; ++i) c[i] = b[i];
  return function(t4) {
    for (i = 0; i < na; ++i) c[i] = x[i](t4);
    return c;
  };
}

// node_modules/d3-interpolate/src/date.js
function date_default(a, b) {
  var d = /* @__PURE__ */ new Date();
  return a = +a, b = +b, function(t4) {
    return d.setTime(a * (1 - t4) + b * t4), d;
  };
}

// node_modules/d3-interpolate/src/number.js
function number_default(a, b) {
  return a = +a, b = +b, function(t4) {
    return a * (1 - t4) + b * t4;
  };
}

// node_modules/d3-interpolate/src/object.js
function object_default(a, b) {
  var i = {}, c = {}, k;
  if (a === null || typeof a !== "object") a = {};
  if (b === null || typeof b !== "object") b = {};
  for (k in b) {
    if (k in a) {
      i[k] = value_default(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }
  return function(t4) {
    for (k in i) c[k] = i[k](t4);
    return c;
  };
}

// node_modules/d3-interpolate/src/string.js
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
var reB = new RegExp(reA.source, "g");
function zero(b) {
  return function() {
    return b;
  };
}
function one(b) {
  return function(t4) {
    return b(t4) + "";
  };
}
function string_default(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
  a = a + "", b = b + "";
  while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) {
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs;
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      if (s[i]) s[i] += bm;
      else s[++i] = bm;
    } else {
      s[++i] = null;
      q.push({ i, x: number_default(am, bm) });
    }
    bi = reB.lastIndex;
  }
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs;
    else s[++i] = bs;
  }
  return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function(t4) {
    for (var i2 = 0, o; i2 < b; ++i2) s[(o = q[i2]).i] = o.x(t4);
    return s.join("");
  });
}

// node_modules/d3-interpolate/src/value.js
function value_default(a, b) {
  var t4 = typeof b, c;
  return b == null || t4 === "boolean" ? constant_default3(b) : (t4 === "number" ? number_default : t4 === "string" ? (c = color(b)) ? (b = c, rgb_default) : string_default : b instanceof color ? rgb_default : b instanceof Date ? date_default : isNumberArray(b) ? numberArray_default : Array.isArray(b) ? genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object_default : number_default)(a, b);
}

// node_modules/d3-interpolate/src/round.js
function round_default(a, b) {
  return a = +a, b = +b, function(t4) {
    return Math.round(a * (1 - t4) + b * t4);
  };
}

// node_modules/d3-interpolate/src/transform/decompose.js
var degrees2 = 180 / Math.PI;
var identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function decompose_default(a, b, c, d, e3, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e3,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees2,
    skewX: Math.atan(skewX) * degrees2,
    scaleX,
    scaleY
  };
}

// node_modules/d3-interpolate/src/transform/parse.js
var svgNode;
function parseCss(value) {
  const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m.isIdentity ? identity : decompose_default(m.a, m.b, m.c, m.d, m.e, m.f);
}
function parseSvg(value) {
  if (value == null) return identity;
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return identity;
  value = value.matrix;
  return decompose_default(value.a, value.b, value.c, value.d, value.e, value.f);
}

// node_modules/d3-interpolate/src/transform/index.js
function interpolateTransform(parse, pxComma, pxParen, degParen) {
  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }
  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({ i: i - 4, x: number_default(xa, xb) }, { i: i - 2, x: number_default(ya, yb) });
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }
  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360;
      else if (b - a > 180) a += 360;
      q.push({ i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: number_default(a, b) });
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }
  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({ i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: number_default(a, b) });
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }
  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({ i: i - 4, x: number_default(xa, xb) }, { i: i - 2, x: number_default(ya, yb) });
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }
  return function(a, b) {
    var s = [], q = [];
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null;
    return function(t4) {
      var i = -1, n2 = q.length, o;
      while (++i < n2) s[(o = q[i]).i] = o.x(t4);
      return s.join("");
    };
  };
}
var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

// node_modules/d3-interpolate/src/zoom.js
var epsilon2 = 1e-12;
function cosh(x) {
  return ((x = Math.exp(x)) + 1 / x) / 2;
}
function sinh(x) {
  return ((x = Math.exp(x)) - 1 / x) / 2;
}
function tanh(x) {
  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}
var zoom_default = function zoomRho(rho, rho2, rho4) {
  function zoom(p0, p1) {
    var ux0 = p0[0], uy0 = p0[1], w0 = p0[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, i, S;
    if (d2 < epsilon2) {
      S = Math.log(w1 / w0) / rho;
      i = function(t4) {
        return [
          ux0 + t4 * dx,
          uy0 + t4 * dy,
          w0 * Math.exp(rho * t4 * S)
        ];
      };
    } else {
      var d1 = Math.sqrt(d2), b02 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1), b12 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1), r0 = Math.log(Math.sqrt(b02 * b02 + 1) - b02), r1 = Math.log(Math.sqrt(b12 * b12 + 1) - b12);
      S = (r1 - r0) / rho;
      i = function(t4) {
        var s = t4 * S, coshr0 = cosh(r0), u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
        return [
          ux0 + u * dx,
          uy0 + u * dy,
          w0 * coshr0 / cosh(rho * s + r0)
        ];
      };
    }
    i.duration = S * 1e3 * rho / Math.SQRT2;
    return i;
  }
  zoom.rho = function(_2) {
    var _1 = Math.max(1e-3, +_2), _22 = _1 * _1, _4 = _22 * _22;
    return zoomRho(_1, _22, _4);
  };
  return zoom;
}(Math.SQRT2, 2, 4);

// node_modules/d3-interpolate/src/hsl.js
function hsl2(hue2) {
  return function(start3, end2) {
    var h3 = hue2((start3 = hsl(start3)).h, (end2 = hsl(end2)).h), s = nogamma(start3.s, end2.s), l = nogamma(start3.l, end2.l), opacity = nogamma(start3.opacity, end2.opacity);
    return function(t4) {
      start3.h = h3(t4);
      start3.s = s(t4);
      start3.l = l(t4);
      start3.opacity = opacity(t4);
      return start3 + "";
    };
  };
}
var hsl_default = hsl2(hue);
var hslLong = hsl2(nogamma);

// node_modules/d3-interpolate/src/hcl.js
function hcl2(hue2) {
  return function(start3, end2) {
    var h3 = hue2((start3 = hcl(start3)).h, (end2 = hcl(end2)).h), c = nogamma(start3.c, end2.c), l = nogamma(start3.l, end2.l), opacity = nogamma(start3.opacity, end2.opacity);
    return function(t4) {
      start3.h = h3(t4);
      start3.c = c(t4);
      start3.l = l(t4);
      start3.opacity = opacity(t4);
      return start3 + "";
    };
  };
}
var hcl_default = hcl2(hue);
var hclLong = hcl2(nogamma);

// node_modules/d3-interpolate/src/cubehelix.js
function cubehelix2(hue2) {
  return function cubehelixGamma(y2) {
    y2 = +y2;
    function cubehelix3(start3, end2) {
      var h3 = hue2((start3 = cubehelix(start3)).h, (end2 = cubehelix(end2)).h), s = nogamma(start3.s, end2.s), l = nogamma(start3.l, end2.l), opacity = nogamma(start3.opacity, end2.opacity);
      return function(t4) {
        start3.h = h3(t4);
        start3.s = s(t4);
        start3.l = l(Math.pow(t4, y2));
        start3.opacity = opacity(t4);
        return start3 + "";
      };
    }
    cubehelix3.gamma = cubehelixGamma;
    return cubehelix3;
  }(1);
}
var cubehelix_default = cubehelix2(hue);
var cubehelixLong = cubehelix2(nogamma);

// node_modules/d3-timer/src/timer.js
var frame = 0;
var timeout = 0;
var interval = 0;
var pokeDelay = 1e3;
var taskHead;
var taskTail;
var clockLast = 0;
var clockNow = 0;
var clockSkew = 0;
var clock = typeof performance === "object" && performance.now ? performance : Date;
var setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
  setTimeout(f, 17);
};
function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}
function clearNow() {
  clockNow = 0;
}
function Timer() {
  this._call = this._time = this._next = null;
}
Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time2) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time2 = (time2 == null ? now() : +time2) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail) taskTail._next = this;
      else taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time2;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};
function timer(callback, delay, time2) {
  var t4 = new Timer();
  t4.restart(callback, delay, time2);
  return t4;
}
function timerFlush() {
  now();
  ++frame;
  var t4 = taskHead, e3;
  while (t4) {
    if ((e3 = clockNow - t4._time) >= 0) t4._call.call(void 0, e3);
    t4 = t4._next;
  }
  --frame;
}
function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}
function poke() {
  var now2 = clock.now(), delay = now2 - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now2;
}
function nap() {
  var t03, t13 = taskHead, t22, time2 = Infinity;
  while (t13) {
    if (t13._call) {
      if (time2 > t13._time) time2 = t13._time;
      t03 = t13, t13 = t13._next;
    } else {
      t22 = t13._next, t13._next = null;
      t13 = t03 ? t03._next = t22 : taskHead = t22;
    }
  }
  taskTail = t03;
  sleep(time2);
}
function sleep(time2) {
  if (frame) return;
  if (timeout) timeout = clearTimeout(timeout);
  var delay = time2 - clockNow;
  if (delay > 24) {
    if (time2 < Infinity) timeout = setTimeout(wake, time2 - clock.now() - clockSkew);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}

// node_modules/d3-timer/src/timeout.js
function timeout_default(callback, delay, time2) {
  var t4 = new Timer();
  delay = delay == null ? 0 : +delay;
  t4.restart((elapsed) => {
    t4.stop();
    callback(elapsed + delay);
  }, delay, time2);
  return t4;
}

// node_modules/d3-transition/src/transition/schedule.js
var emptyOn = dispatch_default2("start", "end", "cancel", "interrupt");
var emptyTween = [];
var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;
function schedule_default(node, name2, id2, index2, group2, timing) {
  var schedules = node.__transition;
  if (!schedules) node.__transition = {};
  else if (id2 in schedules) return;
  create(node, id2, {
    name: name2,
    index: index2,
    // For context during callback.
    group: group2,
    // For context during callback.
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
}
function init(node, id2) {
  var schedule = get2(node, id2);
  if (schedule.state > CREATED) throw new Error("too late; already scheduled");
  return schedule;
}
function set2(node, id2) {
  var schedule = get2(node, id2);
  if (schedule.state > STARTED) throw new Error("too late; already running");
  return schedule;
}
function get2(node, id2) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id2])) throw new Error("transition not found");
  return schedule;
}
function create(node, id2, self2) {
  var schedules = node.__transition, tween;
  schedules[id2] = self2;
  self2.timer = timer(schedule, 0, self2.time);
  function schedule(elapsed) {
    self2.state = SCHEDULED;
    self2.timer.restart(start3, self2.delay, self2.time);
    if (self2.delay <= elapsed) start3(elapsed - self2.delay);
  }
  function start3(elapsed) {
    var i, j, n2, o;
    if (self2.state !== SCHEDULED) return stop2();
    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self2.name) continue;
      if (o.state === STARTED) return timeout_default(start3);
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      } else if (+i < id2) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("cancel", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }
    }
    timeout_default(function() {
      if (self2.state === STARTED) {
        self2.state = RUNNING;
        self2.timer.restart(tick, self2.delay, self2.time);
        tick(elapsed);
      }
    });
    self2.state = STARTING;
    self2.on.call("start", node, node.__data__, self2.index, self2.group);
    if (self2.state !== STARTING) return;
    self2.state = STARTED;
    tween = new Array(n2 = self2.tween.length);
    for (i = 0, j = -1; i < n2; ++i) {
      if (o = self2.tween[i].value.call(node, node.__data__, self2.index, self2.group)) {
        tween[++j] = o;
      }
    }
    tween.length = j + 1;
  }
  function tick(elapsed) {
    var t4 = elapsed < self2.duration ? self2.ease.call(null, elapsed / self2.duration) : (self2.timer.restart(stop2), self2.state = ENDING, 1), i = -1, n2 = tween.length;
    while (++i < n2) {
      tween[i].call(node, t4);
    }
    if (self2.state === ENDING) {
      self2.on.call("end", node, node.__data__, self2.index, self2.group);
      stop2();
    }
  }
  function stop2() {
    self2.state = ENDED;
    self2.timer.stop();
    delete schedules[id2];
    for (var i in schedules) return;
    delete node.__transition;
  }
}

// node_modules/d3-transition/src/interrupt.js
function interrupt_default(node, name2) {
  var schedules = node.__transition, schedule, active, empty3 = true, i;
  if (!schedules) return;
  name2 = name2 == null ? null : name2 + "";
  for (i in schedules) {
    if ((schedule = schedules[i]).name !== name2) {
      empty3 = false;
      continue;
    }
    active = schedule.state > STARTING && schedule.state < ENDING;
    schedule.state = ENDED;
    schedule.timer.stop();
    schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
    delete schedules[i];
  }
  if (empty3) delete node.__transition;
}

// node_modules/d3-transition/src/selection/interrupt.js
function interrupt_default2(name2) {
  return this.each(function() {
    interrupt_default(this, name2);
  });
}

// node_modules/d3-transition/src/transition/tween.js
function tweenRemove(id2, name2) {
  var tween0, tween1;
  return function() {
    var schedule = set2(this, id2), tween = schedule.tween;
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n2 = tween1.length; i < n2; ++i) {
        if (tween1[i].name === name2) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }
    schedule.tween = tween1;
  };
}
function tweenFunction(id2, name2, value) {
  var tween0, tween1;
  if (typeof value !== "function") throw new Error();
  return function() {
    var schedule = set2(this, id2), tween = schedule.tween;
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t4 = { name: name2, value }, i = 0, n2 = tween1.length; i < n2; ++i) {
        if (tween1[i].name === name2) {
          tween1[i] = t4;
          break;
        }
      }
      if (i === n2) tween1.push(t4);
    }
    schedule.tween = tween1;
  };
}
function tween_default(name2, value) {
  var id2 = this._id;
  name2 += "";
  if (arguments.length < 2) {
    var tween = get2(this.node(), id2).tween;
    for (var i = 0, n2 = tween.length, t4; i < n2; ++i) {
      if ((t4 = tween[i]).name === name2) {
        return t4.value;
      }
    }
    return null;
  }
  return this.each((value == null ? tweenRemove : tweenFunction)(id2, name2, value));
}
function tweenValue(transition2, name2, value) {
  var id2 = transition2._id;
  transition2.each(function() {
    var schedule = set2(this, id2);
    (schedule.value || (schedule.value = {}))[name2] = value.apply(this, arguments);
  });
  return function(node) {
    return get2(node, id2).value[name2];
  };
}

// node_modules/d3-transition/src/transition/interpolate.js
function interpolate_default(a, b) {
  var c;
  return (typeof b === "number" ? number_default : b instanceof color ? rgb_default : (c = color(b)) ? (b = c, rgb_default) : string_default)(a, b);
}

// node_modules/d3-transition/src/transition/attr.js
function attrRemove2(name2) {
  return function() {
    this.removeAttribute(name2);
  };
}
function attrRemoveNS2(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant2(name2, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttribute(name2);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrConstantNS2(fullname, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrFunction2(name2, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttribute(name2);
    string0 = this.getAttribute(name2);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attrFunctionNS2(fullname, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attr_default2(name2, value) {
  var fullname = namespace_default(name2), i = fullname === "transform" ? interpolateTransformSvg : interpolate_default;
  return this.attrTween(name2, typeof value === "function" ? (fullname.local ? attrFunctionNS2 : attrFunction2)(fullname, i, tweenValue(this, "attr." + name2, value)) : value == null ? (fullname.local ? attrRemoveNS2 : attrRemove2)(fullname) : (fullname.local ? attrConstantNS2 : attrConstant2)(fullname, i, value));
}

// node_modules/d3-transition/src/transition/attrTween.js
function attrInterpolate(name2, i) {
  return function(t4) {
    this.setAttribute(name2, i.call(this, t4));
  };
}
function attrInterpolateNS(fullname, i) {
  return function(t4) {
    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t4));
  };
}
function attrTweenNS(fullname, value) {
  var t03, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t03 = (i0 = i) && attrInterpolateNS(fullname, i);
    return t03;
  }
  tween._value = value;
  return tween;
}
function attrTween(name2, value) {
  var t03, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t03 = (i0 = i) && attrInterpolate(name2, i);
    return t03;
  }
  tween._value = value;
  return tween;
}
function attrTween_default(name2, value) {
  var key = "attr." + name2;
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  var fullname = namespace_default(name2);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}

// node_modules/d3-transition/src/transition/delay.js
function delayFunction(id2, value) {
  return function() {
    init(this, id2).delay = +value.apply(this, arguments);
  };
}
function delayConstant(id2, value) {
  return value = +value, function() {
    init(this, id2).delay = value;
  };
}
function delay_default(value) {
  var id2 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id2, value)) : get2(this.node(), id2).delay;
}

// node_modules/d3-transition/src/transition/duration.js
function durationFunction(id2, value) {
  return function() {
    set2(this, id2).duration = +value.apply(this, arguments);
  };
}
function durationConstant(id2, value) {
  return value = +value, function() {
    set2(this, id2).duration = value;
  };
}
function duration_default(value) {
  var id2 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id2, value)) : get2(this.node(), id2).duration;
}

// node_modules/d3-transition/src/transition/ease.js
function easeConstant(id2, value) {
  if (typeof value !== "function") throw new Error();
  return function() {
    set2(this, id2).ease = value;
  };
}
function ease_default(value) {
  var id2 = this._id;
  return arguments.length ? this.each(easeConstant(id2, value)) : get2(this.node(), id2).ease;
}

// node_modules/d3-transition/src/transition/easeVarying.js
function easeVarying(id2, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (typeof v !== "function") throw new Error();
    set2(this, id2).ease = v;
  };
}
function easeVarying_default(value) {
  if (typeof value !== "function") throw new Error();
  return this.each(easeVarying(this._id, value));
}

// node_modules/d3-transition/src/transition/filter.js
function filter_default2(match) {
  if (typeof match !== "function") match = matcher_default(match);
  for (var groups2 = this._groups, m = groups2.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group2 = groups2[j], n2 = group2.length, subgroup = subgroups[j] = [], node, i = 0; i < n2; ++i) {
      if ((node = group2[i]) && match.call(node, node.__data__, i, group2)) {
        subgroup.push(node);
      }
    }
  }
  return new Transition(subgroups, this._parents, this._name, this._id);
}

// node_modules/d3-transition/src/transition/merge.js
function merge_default2(transition2) {
  if (transition2._id !== this._id) throw new Error();
  for (var groups0 = this._groups, groups1 = transition2._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n2 = group0.length, merge2 = merges[j] = new Array(n2), node, i = 0; i < n2; ++i) {
      if (node = group0[i] || group1[i]) {
        merge2[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Transition(merges, this._parents, this._name, this._id);
}

// node_modules/d3-transition/src/transition/on.js
function start(name2) {
  return (name2 + "").trim().split(/^|\s+/).every(function(t4) {
    var i = t4.indexOf(".");
    if (i >= 0) t4 = t4.slice(0, i);
    return !t4 || t4 === "start";
  });
}
function onFunction(id2, name2, listener) {
  var on0, on1, sit = start(name2) ? init : set2;
  return function() {
    var schedule = sit(this, id2), on = schedule.on;
    if (on !== on0) (on1 = (on0 = on).copy()).on(name2, listener);
    schedule.on = on1;
  };
}
function on_default2(name2, listener) {
  var id2 = this._id;
  return arguments.length < 2 ? get2(this.node(), id2).on.on(name2) : this.each(onFunction(id2, name2, listener));
}

// node_modules/d3-transition/src/transition/remove.js
function removeFunction(id2) {
  return function() {
    var parent = this.parentNode;
    for (var i in this.__transition) if (+i !== id2) return;
    if (parent) parent.removeChild(this);
  };
}
function remove_default2() {
  return this.on("end.remove", removeFunction(this._id));
}

// node_modules/d3-transition/src/transition/select.js
function select_default3(select) {
  var name2 = this._name, id2 = this._id;
  if (typeof select !== "function") select = selector_default(select);
  for (var groups2 = this._groups, m = groups2.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group2 = groups2[j], n2 = group2.length, subgroup = subgroups[j] = new Array(n2), node, subnode, i = 0; i < n2; ++i) {
      if ((node = group2[i]) && (subnode = select.call(node, node.__data__, i, group2))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        schedule_default(subgroup[i], name2, id2, i, subgroup, get2(node, id2));
      }
    }
  }
  return new Transition(subgroups, this._parents, name2, id2);
}

// node_modules/d3-transition/src/transition/selectAll.js
function selectAll_default3(select) {
  var name2 = this._name, id2 = this._id;
  if (typeof select !== "function") select = selectorAll_default(select);
  for (var groups2 = this._groups, m = groups2.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group2 = groups2[j], n2 = group2.length, node, i = 0; i < n2; ++i) {
      if (node = group2[i]) {
        for (var children2 = select.call(node, node.__data__, i, group2), child, inherit2 = get2(node, id2), k = 0, l = children2.length; k < l; ++k) {
          if (child = children2[k]) {
            schedule_default(child, name2, id2, k, children2, inherit2);
          }
        }
        subgroups.push(children2);
        parents.push(node);
      }
    }
  }
  return new Transition(subgroups, parents, name2, id2);
}

// node_modules/d3-transition/src/transition/selection.js
var Selection2 = selection_default.prototype.constructor;
function selection_default2() {
  return new Selection2(this._groups, this._parents);
}

// node_modules/d3-transition/src/transition/style.js
function styleNull(name2, interpolate) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name2), string1 = (this.style.removeProperty(name2), styleValue(this, name2));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate(string00 = string0, string10 = string1);
  };
}
function styleRemove2(name2) {
  return function() {
    this.style.removeProperty(name2);
  };
}
function styleConstant2(name2, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = styleValue(this, name2);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function styleFunction2(name2, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name2), value1 = value(this), string1 = value1 + "";
    if (value1 == null) string1 = value1 = (this.style.removeProperty(name2), styleValue(this, name2));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function styleMaybeRemove(id2, name2) {
  var on0, on1, listener0, key = "style." + name2, event = "end." + key, remove2;
  return function() {
    var schedule = set2(this, id2), on = schedule.on, listener = schedule.value[key] == null ? remove2 || (remove2 = styleRemove2(name2)) : void 0;
    if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);
    schedule.on = on1;
  };
}
function style_default2(name2, value, priority) {
  var i = (name2 += "") === "transform" ? interpolateTransformCss : interpolate_default;
  return value == null ? this.styleTween(name2, styleNull(name2, i)).on("end.style." + name2, styleRemove2(name2)) : typeof value === "function" ? this.styleTween(name2, styleFunction2(name2, i, tweenValue(this, "style." + name2, value))).each(styleMaybeRemove(this._id, name2)) : this.styleTween(name2, styleConstant2(name2, i, value), priority).on("end.style." + name2, null);
}

// node_modules/d3-transition/src/transition/styleTween.js
function styleInterpolate(name2, i, priority) {
  return function(t4) {
    this.style.setProperty(name2, i.call(this, t4), priority);
  };
}
function styleTween(name2, value, priority) {
  var t4, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t4 = (i0 = i) && styleInterpolate(name2, i, priority);
    return t4;
  }
  tween._value = value;
  return tween;
}
function styleTween_default(name2, value, priority) {
  var key = "style." + (name2 += "");
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  return this.tween(key, styleTween(name2, value, priority == null ? "" : priority));
}

// node_modules/d3-transition/src/transition/text.js
function textConstant2(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction2(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}
function text_default3(value) {
  return this.tween("text", typeof value === "function" ? textFunction2(tweenValue(this, "text", value)) : textConstant2(value == null ? "" : value + ""));
}

// node_modules/d3-transition/src/transition/textTween.js
function textInterpolate(i) {
  return function(t4) {
    this.textContent = i.call(this, t4);
  };
}
function textTween(value) {
  var t03, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t03 = (i0 = i) && textInterpolate(i);
    return t03;
  }
  tween._value = value;
  return tween;
}
function textTween_default(value) {
  var key = "text";
  if (arguments.length < 1) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  return this.tween(key, textTween(value));
}

// node_modules/d3-transition/src/transition/transition.js
function transition_default() {
  var name2 = this._name, id0 = this._id, id1 = newId();
  for (var groups2 = this._groups, m = groups2.length, j = 0; j < m; ++j) {
    for (var group2 = groups2[j], n2 = group2.length, node, i = 0; i < n2; ++i) {
      if (node = group2[i]) {
        var inherit2 = get2(node, id0);
        schedule_default(node, name2, id1, i, group2, {
          time: inherit2.time + inherit2.delay + inherit2.duration,
          delay: 0,
          duration: inherit2.duration,
          ease: inherit2.ease
        });
      }
    }
  }
  return new Transition(groups2, this._parents, name2, id1);
}

// node_modules/d3-transition/src/transition/end.js
function end_default() {
  var on0, on1, that = this, id2 = that._id, size = that.size();
  return new Promise(function(resolve, reject) {
    var cancel = { value: reject }, end2 = { value: function() {
      if (--size === 0) resolve();
    } };
    that.each(function() {
      var schedule = set2(this, id2), on = schedule.on;
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end2);
      }
      schedule.on = on1;
    });
    if (size === 0) resolve();
  });
}

// node_modules/d3-transition/src/transition/index.js
var id = 0;
function Transition(groups2, parents, name2, id2) {
  this._groups = groups2;
  this._parents = parents;
  this._name = name2;
  this._id = id2;
}
function transition(name2) {
  return selection_default().transition(name2);
}
function newId() {
  return ++id;
}
var selection_prototype = selection_default.prototype;
Transition.prototype = transition.prototype = {
  constructor: Transition,
  select: select_default3,
  selectAll: selectAll_default3,
  selectChild: selection_prototype.selectChild,
  selectChildren: selection_prototype.selectChildren,
  filter: filter_default2,
  merge: merge_default2,
  selection: selection_default2,
  transition: transition_default,
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: on_default2,
  attr: attr_default2,
  attrTween: attrTween_default,
  style: style_default2,
  styleTween: styleTween_default,
  text: text_default3,
  textTween: textTween_default,
  remove: remove_default2,
  tween: tween_default,
  delay: delay_default,
  duration: duration_default,
  ease: ease_default,
  easeVarying: easeVarying_default,
  end: end_default,
  [Symbol.iterator]: selection_prototype[Symbol.iterator]
};

// node_modules/d3-ease/src/cubic.js
function cubicInOut(t4) {
  return ((t4 *= 2) <= 1 ? t4 * t4 * t4 : (t4 -= 2) * t4 * t4 + 2) / 2;
}

// node_modules/d3-ease/src/poly.js
var exponent = 3;
var polyIn = function custom(e3) {
  e3 = +e3;
  function polyIn2(t4) {
    return Math.pow(t4, e3);
  }
  polyIn2.exponent = custom;
  return polyIn2;
}(exponent);
var polyOut = function custom2(e3) {
  e3 = +e3;
  function polyOut2(t4) {
    return 1 - Math.pow(1 - t4, e3);
  }
  polyOut2.exponent = custom2;
  return polyOut2;
}(exponent);
var polyInOut = function custom3(e3) {
  e3 = +e3;
  function polyInOut2(t4) {
    return ((t4 *= 2) <= 1 ? Math.pow(t4, e3) : 2 - Math.pow(2 - t4, e3)) / 2;
  }
  polyInOut2.exponent = custom3;
  return polyInOut2;
}(exponent);

// node_modules/d3-ease/src/sin.js
var pi = Math.PI;
var halfPi = pi / 2;

// node_modules/d3-ease/src/math.js
function tpmt(x) {
  return (Math.pow(2, -10 * x) - 9765625e-10) * 1.0009775171065494;
}

// node_modules/d3-ease/src/bounce.js
var b1 = 4 / 11;
var b2 = 6 / 11;
var b3 = 8 / 11;
var b4 = 3 / 4;
var b5 = 9 / 11;
var b6 = 10 / 11;
var b7 = 15 / 16;
var b8 = 21 / 22;
var b9 = 63 / 64;
var b0 = 1 / b1 / b1;

// node_modules/d3-ease/src/back.js
var overshoot = 1.70158;
var backIn = function custom4(s) {
  s = +s;
  function backIn2(t4) {
    return (t4 = +t4) * t4 * (s * (t4 - 1) + t4);
  }
  backIn2.overshoot = custom4;
  return backIn2;
}(overshoot);
var backOut = function custom5(s) {
  s = +s;
  function backOut2(t4) {
    return --t4 * t4 * ((t4 + 1) * s + t4) + 1;
  }
  backOut2.overshoot = custom5;
  return backOut2;
}(overshoot);
var backInOut = function custom6(s) {
  s = +s;
  function backInOut2(t4) {
    return ((t4 *= 2) < 1 ? t4 * t4 * ((s + 1) * t4 - s) : (t4 -= 2) * t4 * ((s + 1) * t4 + s) + 2) / 2;
  }
  backInOut2.overshoot = custom6;
  return backInOut2;
}(overshoot);

// node_modules/d3-ease/src/elastic.js
var tau = 2 * Math.PI;
var amplitude = 1;
var period = 0.3;
var elasticIn = function custom7(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
  function elasticIn2(t4) {
    return a * tpmt(- --t4) * Math.sin((s - t4) / p);
  }
  elasticIn2.amplitude = function(a2) {
    return custom7(a2, p * tau);
  };
  elasticIn2.period = function(p2) {
    return custom7(a, p2);
  };
  return elasticIn2;
}(amplitude, period);
var elasticOut = function custom8(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
  function elasticOut2(t4) {
    return 1 - a * tpmt(t4 = +t4) * Math.sin((t4 + s) / p);
  }
  elasticOut2.amplitude = function(a2) {
    return custom8(a2, p * tau);
  };
  elasticOut2.period = function(p2) {
    return custom8(a, p2);
  };
  return elasticOut2;
}(amplitude, period);
var elasticInOut = function custom9(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
  function elasticInOut2(t4) {
    return ((t4 = t4 * 2 - 1) < 0 ? a * tpmt(-t4) * Math.sin((s - t4) / p) : 2 - a * tpmt(t4) * Math.sin((s + t4) / p)) / 2;
  }
  elasticInOut2.amplitude = function(a2) {
    return custom9(a2, p * tau);
  };
  elasticInOut2.period = function(p2) {
    return custom9(a, p2);
  };
  return elasticInOut2;
}(amplitude, period);

// node_modules/d3-transition/src/selection/transition.js
var defaultTiming = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: cubicInOut
};
function inherit(node, id2) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id2])) {
    if (!(node = node.parentNode)) {
      throw new Error(`transition ${id2} not found`);
    }
  }
  return timing;
}
function transition_default2(name2) {
  var id2, timing;
  if (name2 instanceof Transition) {
    id2 = name2._id, name2 = name2._name;
  } else {
    id2 = newId(), (timing = defaultTiming).time = now(), name2 = name2 == null ? null : name2 + "";
  }
  for (var groups2 = this._groups, m = groups2.length, j = 0; j < m; ++j) {
    for (var group2 = groups2[j], n2 = group2.length, node, i = 0; i < n2; ++i) {
      if (node = group2[i]) {
        schedule_default(node, name2, id2, i, group2, timing || inherit(node, id2));
      }
    }
  }
  return new Transition(groups2, this._parents, name2, id2);
}

// node_modules/d3-transition/src/selection/index.js
selection_default.prototype.interrupt = interrupt_default2;
selection_default.prototype.transition = transition_default2;

// node_modules/d3-brush/src/constant.js
var constant_default4 = (x) => () => x;

// node_modules/d3-brush/src/event.js
function BrushEvent(type2, {
  sourceEvent,
  target,
  selection: selection2,
  mode,
  dispatch: dispatch2
}) {
  Object.defineProperties(this, {
    type: { value: type2, enumerable: true, configurable: true },
    sourceEvent: { value: sourceEvent, enumerable: true, configurable: true },
    target: { value: target, enumerable: true, configurable: true },
    selection: { value: selection2, enumerable: true, configurable: true },
    mode: { value: mode, enumerable: true, configurable: true },
    _: { value: dispatch2 }
  });
}

// node_modules/d3-brush/src/noevent.js
function nopropagation2(event) {
  event.stopImmediatePropagation();
}
function noevent_default2(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}

// node_modules/d3-brush/src/brush.js
var MODE_DRAG = { name: "drag" };
var MODE_SPACE = { name: "space" };
var MODE_HANDLE = { name: "handle" };
var MODE_CENTER = { name: "center" };
var { abs, max, min } = Math;
function number1(e3) {
  return [+e3[0], +e3[1]];
}
function number2(e3) {
  return [number1(e3[0]), number1(e3[1])];
}
var X = {
  name: "x",
  handles: ["w", "e"].map(type),
  input: function(x, e3) {
    return x == null ? null : [[+x[0], e3[0][1]], [+x[1], e3[1][1]]];
  },
  output: function(xy) {
    return xy && [xy[0][0], xy[1][0]];
  }
};
var Y = {
  name: "y",
  handles: ["n", "s"].map(type),
  input: function(y2, e3) {
    return y2 == null ? null : [[e3[0][0], +y2[0]], [e3[1][0], +y2[1]]];
  },
  output: function(xy) {
    return xy && [xy[0][1], xy[1][1]];
  }
};
var XY = {
  name: "xy",
  handles: ["n", "w", "e", "s", "nw", "ne", "sw", "se"].map(type),
  input: function(xy) {
    return xy == null ? null : number2(xy);
  },
  output: function(xy) {
    return xy;
  }
};
var cursors = {
  overlay: "crosshair",
  selection: "move",
  n: "ns-resize",
  e: "ew-resize",
  s: "ns-resize",
  w: "ew-resize",
  nw: "nwse-resize",
  ne: "nesw-resize",
  se: "nwse-resize",
  sw: "nesw-resize"
};
var flipX = {
  e: "w",
  w: "e",
  nw: "ne",
  ne: "nw",
  se: "sw",
  sw: "se"
};
var flipY = {
  n: "s",
  s: "n",
  nw: "sw",
  ne: "se",
  se: "ne",
  sw: "nw"
};
var signsX = {
  overlay: 1,
  selection: 1,
  n: null,
  e: 1,
  s: null,
  w: -1,
  nw: -1,
  ne: 1,
  se: 1,
  sw: -1
};
var signsY = {
  overlay: 1,
  selection: 1,
  n: -1,
  e: null,
  s: 1,
  w: null,
  nw: -1,
  ne: -1,
  se: 1,
  sw: 1
};
function type(t4) {
  return { type: t4 };
}
function defaultFilter(event) {
  return !event.ctrlKey && !event.button;
}
function defaultExtent() {
  var svg2 = this.ownerSVGElement || this;
  if (svg2.hasAttribute("viewBox")) {
    svg2 = svg2.viewBox.baseVal;
    return [[svg2.x, svg2.y], [svg2.x + svg2.width, svg2.y + svg2.height]];
  }
  return [[0, 0], [svg2.width.baseVal.value, svg2.height.baseVal.value]];
}
function defaultTouchable() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function local2(node) {
  while (!node.__brush) if (!(node = node.parentNode)) return;
  return node.__brush;
}
function empty2(extent2) {
  return extent2[0][0] === extent2[1][0] || extent2[0][1] === extent2[1][1];
}
function brushSelection(node) {
  var state = node.__brush;
  return state ? state.dim.output(state.selection) : null;
}
function brushX() {
  return brush(X);
}
function brushY() {
  return brush(Y);
}
function brush_default() {
  return brush(XY);
}
function brush(dim) {
  var extent2 = defaultExtent, filter3 = defaultFilter, touchable = defaultTouchable, keys = true, listeners = dispatch_default2("start", "brush", "end"), handleSize = 6, touchending;
  function brush2(group2) {
    var overlay = group2.property("__brush", initialize).selectAll(".overlay").data([type("overlay")]);
    overlay.enter().append("rect").attr("class", "overlay").attr("pointer-events", "all").attr("cursor", cursors.overlay).merge(overlay).each(function() {
      var extent3 = local2(this).extent;
      select_default2(this).attr("x", extent3[0][0]).attr("y", extent3[0][1]).attr("width", extent3[1][0] - extent3[0][0]).attr("height", extent3[1][1] - extent3[0][1]);
    });
    group2.selectAll(".selection").data([type("selection")]).enter().append("rect").attr("class", "selection").attr("cursor", cursors.selection).attr("fill", "#777").attr("fill-opacity", 0.3).attr("stroke", "#fff").attr("shape-rendering", "crispEdges");
    var handle = group2.selectAll(".handle").data(dim.handles, function(d) {
      return d.type;
    });
    handle.exit().remove();
    handle.enter().append("rect").attr("class", function(d) {
      return "handle handle--" + d.type;
    }).attr("cursor", function(d) {
      return cursors[d.type];
    });
    group2.each(redraw).attr("fill", "none").attr("pointer-events", "all").on("mousedown.brush", started).filter(touchable).on("touchstart.brush", started).on("touchmove.brush", touchmoved).on("touchend.brush touchcancel.brush", touchended).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  brush2.move = function(group2, selection2, event) {
    if (group2.tween) {
      group2.on("start.brush", function(event2) {
        emitter(this, arguments).beforestart().start(event2);
      }).on("interrupt.brush end.brush", function(event2) {
        emitter(this, arguments).end(event2);
      }).tween("brush", function() {
        var that = this, state = that.__brush, emit = emitter(that, arguments), selection0 = state.selection, selection1 = dim.input(typeof selection2 === "function" ? selection2.apply(this, arguments) : selection2, state.extent), i = value_default(selection0, selection1);
        function tween(t4) {
          state.selection = t4 === 1 && selection1 === null ? null : i(t4);
          redraw.call(that);
          emit.brush();
        }
        return selection0 !== null && selection1 !== null ? tween : tween(1);
      });
    } else {
      group2.each(function() {
        var that = this, args = arguments, state = that.__brush, selection1 = dim.input(typeof selection2 === "function" ? selection2.apply(that, args) : selection2, state.extent), emit = emitter(that, args).beforestart();
        interrupt_default(that);
        state.selection = selection1 === null ? null : selection1;
        redraw.call(that);
        emit.start(event).brush(event).end(event);
      });
    }
  };
  brush2.clear = function(group2, event) {
    brush2.move(group2, null, event);
  };
  function redraw() {
    var group2 = select_default2(this), selection2 = local2(this).selection;
    if (selection2) {
      group2.selectAll(".selection").style("display", null).attr("x", selection2[0][0]).attr("y", selection2[0][1]).attr("width", selection2[1][0] - selection2[0][0]).attr("height", selection2[1][1] - selection2[0][1]);
      group2.selectAll(".handle").style("display", null).attr("x", function(d) {
        return d.type[d.type.length - 1] === "e" ? selection2[1][0] - handleSize / 2 : selection2[0][0] - handleSize / 2;
      }).attr("y", function(d) {
        return d.type[0] === "s" ? selection2[1][1] - handleSize / 2 : selection2[0][1] - handleSize / 2;
      }).attr("width", function(d) {
        return d.type === "n" || d.type === "s" ? selection2[1][0] - selection2[0][0] + handleSize : handleSize;
      }).attr("height", function(d) {
        return d.type === "e" || d.type === "w" ? selection2[1][1] - selection2[0][1] + handleSize : handleSize;
      });
    } else {
      group2.selectAll(".selection,.handle").style("display", "none").attr("x", null).attr("y", null).attr("width", null).attr("height", null);
    }
  }
  function emitter(that, args, clean2) {
    var emit = that.__brush.emitter;
    return emit && (!clean2 || !emit.clean) ? emit : new Emitter(that, args, clean2);
  }
  function Emitter(that, args, clean2) {
    this.that = that;
    this.args = args;
    this.state = that.__brush;
    this.active = 0;
    this.clean = clean2;
  }
  Emitter.prototype = {
    beforestart: function() {
      if (++this.active === 1) this.state.emitter = this, this.starting = true;
      return this;
    },
    start: function(event, mode) {
      if (this.starting) this.starting = false, this.emit("start", event, mode);
      else this.emit("brush", event);
      return this;
    },
    brush: function(event, mode) {
      this.emit("brush", event, mode);
      return this;
    },
    end: function(event, mode) {
      if (--this.active === 0) delete this.state.emitter, this.emit("end", event, mode);
      return this;
    },
    emit: function(type2, event, mode) {
      var d = select_default2(this.that).datum();
      listeners.call(
        type2,
        this.that,
        new BrushEvent(type2, {
          sourceEvent: event,
          target: brush2,
          selection: dim.output(this.state.selection),
          mode,
          dispatch: listeners
        }),
        d
      );
    }
  };
  function started(event) {
    if (touchending && !event.touches) return;
    if (!filter3.apply(this, arguments)) return;
    var that = this, type2 = event.target.__data__.type, mode = (keys && event.metaKey ? type2 = "overlay" : type2) === "selection" ? MODE_DRAG : keys && event.altKey ? MODE_CENTER : MODE_HANDLE, signX = dim === Y ? null : signsX[type2], signY = dim === X ? null : signsY[type2], state = local2(that), extent3 = state.extent, selection2 = state.selection, W = extent3[0][0], w0, w1, N = extent3[0][1], n0, n1, E2 = extent3[1][0], e0, e1, S = extent3[1][1], s0, s1, dx = 0, dy = 0, moving, shifting = signX && signY && keys && event.shiftKey, lockX, lockY, points = Array.from(event.touches || [event], (t4) => {
      const i = t4.identifier;
      t4 = pointer_default(t4, that);
      t4.point0 = t4.slice();
      t4.identifier = i;
      return t4;
    });
    interrupt_default(that);
    var emit = emitter(that, arguments, true).beforestart();
    if (type2 === "overlay") {
      if (selection2) moving = true;
      const pts = [points[0], points[1] || points[0]];
      state.selection = selection2 = [[
        w0 = dim === Y ? W : min(pts[0][0], pts[1][0]),
        n0 = dim === X ? N : min(pts[0][1], pts[1][1])
      ], [
        e0 = dim === Y ? E2 : max(pts[0][0], pts[1][0]),
        s0 = dim === X ? S : max(pts[0][1], pts[1][1])
      ]];
      if (points.length > 1) move(event);
    } else {
      w0 = selection2[0][0];
      n0 = selection2[0][1];
      e0 = selection2[1][0];
      s0 = selection2[1][1];
    }
    w1 = w0;
    n1 = n0;
    e1 = e0;
    s1 = s0;
    var group2 = select_default2(that).attr("pointer-events", "none");
    var overlay = group2.selectAll(".overlay").attr("cursor", cursors[type2]);
    if (event.touches) {
      emit.moved = moved;
      emit.ended = ended;
    } else {
      var view = select_default2(event.view).on("mousemove.brush", moved, true).on("mouseup.brush", ended, true);
      if (keys) view.on("keydown.brush", keydowned, true).on("keyup.brush", keyupped, true);
      nodrag_default(event.view);
    }
    redraw.call(that);
    emit.start(event, mode.name);
    function moved(event2) {
      for (const p of event2.changedTouches || [event2]) {
        for (const d of points)
          if (d.identifier === p.identifier) d.cur = pointer_default(p, that);
      }
      if (shifting && !lockX && !lockY && points.length === 1) {
        const point2 = points[0];
        if (abs(point2.cur[0] - point2[0]) > abs(point2.cur[1] - point2[1]))
          lockY = true;
        else
          lockX = true;
      }
      for (const point2 of points)
        if (point2.cur) point2[0] = point2.cur[0], point2[1] = point2.cur[1];
      moving = true;
      noevent_default2(event2);
      move(event2);
    }
    function move(event2) {
      const point2 = points[0], point0 = point2.point0;
      var t4;
      dx = point2[0] - point0[0];
      dy = point2[1] - point0[1];
      switch (mode) {
        case MODE_SPACE:
        case MODE_DRAG: {
          if (signX) dx = max(W - w0, min(E2 - e0, dx)), w1 = w0 + dx, e1 = e0 + dx;
          if (signY) dy = max(N - n0, min(S - s0, dy)), n1 = n0 + dy, s1 = s0 + dy;
          break;
        }
        case MODE_HANDLE: {
          if (points[1]) {
            if (signX) w1 = max(W, min(E2, points[0][0])), e1 = max(W, min(E2, points[1][0])), signX = 1;
            if (signY) n1 = max(N, min(S, points[0][1])), s1 = max(N, min(S, points[1][1])), signY = 1;
          } else {
            if (signX < 0) dx = max(W - w0, min(E2 - w0, dx)), w1 = w0 + dx, e1 = e0;
            else if (signX > 0) dx = max(W - e0, min(E2 - e0, dx)), w1 = w0, e1 = e0 + dx;
            if (signY < 0) dy = max(N - n0, min(S - n0, dy)), n1 = n0 + dy, s1 = s0;
            else if (signY > 0) dy = max(N - s0, min(S - s0, dy)), n1 = n0, s1 = s0 + dy;
          }
          break;
        }
        case MODE_CENTER: {
          if (signX) w1 = max(W, min(E2, w0 - dx * signX)), e1 = max(W, min(E2, e0 + dx * signX));
          if (signY) n1 = max(N, min(S, n0 - dy * signY)), s1 = max(N, min(S, s0 + dy * signY));
          break;
        }
      }
      if (e1 < w1) {
        signX *= -1;
        t4 = w0, w0 = e0, e0 = t4;
        t4 = w1, w1 = e1, e1 = t4;
        if (type2 in flipX) overlay.attr("cursor", cursors[type2 = flipX[type2]]);
      }
      if (s1 < n1) {
        signY *= -1;
        t4 = n0, n0 = s0, s0 = t4;
        t4 = n1, n1 = s1, s1 = t4;
        if (type2 in flipY) overlay.attr("cursor", cursors[type2 = flipY[type2]]);
      }
      if (state.selection) selection2 = state.selection;
      if (lockX) w1 = selection2[0][0], e1 = selection2[1][0];
      if (lockY) n1 = selection2[0][1], s1 = selection2[1][1];
      if (selection2[0][0] !== w1 || selection2[0][1] !== n1 || selection2[1][0] !== e1 || selection2[1][1] !== s1) {
        state.selection = [[w1, n1], [e1, s1]];
        redraw.call(that);
        emit.brush(event2, mode.name);
      }
    }
    function ended(event2) {
      nopropagation2(event2);
      if (event2.touches) {
        if (event2.touches.length) return;
        if (touchending) clearTimeout(touchending);
        touchending = setTimeout(function() {
          touchending = null;
        }, 500);
      } else {
        yesdrag(event2.view, moving);
        view.on("keydown.brush keyup.brush mousemove.brush mouseup.brush", null);
      }
      group2.attr("pointer-events", "all");
      overlay.attr("cursor", cursors.overlay);
      if (state.selection) selection2 = state.selection;
      if (empty2(selection2)) state.selection = null, redraw.call(that);
      emit.end(event2, mode.name);
    }
    function keydowned(event2) {
      switch (event2.keyCode) {
        case 16: {
          shifting = signX && signY;
          break;
        }
        case 18: {
          if (mode === MODE_HANDLE) {
            if (signX) e0 = e1 - dx * signX, w0 = w1 + dx * signX;
            if (signY) s0 = s1 - dy * signY, n0 = n1 + dy * signY;
            mode = MODE_CENTER;
            move(event2);
          }
          break;
        }
        case 32: {
          if (mode === MODE_HANDLE || mode === MODE_CENTER) {
            if (signX < 0) e0 = e1 - dx;
            else if (signX > 0) w0 = w1 - dx;
            if (signY < 0) s0 = s1 - dy;
            else if (signY > 0) n0 = n1 - dy;
            mode = MODE_SPACE;
            overlay.attr("cursor", cursors.selection);
            move(event2);
          }
          break;
        }
        default:
          return;
      }
      noevent_default2(event2);
    }
    function keyupped(event2) {
      switch (event2.keyCode) {
        case 16: {
          if (shifting) {
            lockX = lockY = shifting = false;
            move(event2);
          }
          break;
        }
        case 18: {
          if (mode === MODE_CENTER) {
            if (signX < 0) e0 = e1;
            else if (signX > 0) w0 = w1;
            if (signY < 0) s0 = s1;
            else if (signY > 0) n0 = n1;
            mode = MODE_HANDLE;
            move(event2);
          }
          break;
        }
        case 32: {
          if (mode === MODE_SPACE) {
            if (event2.altKey) {
              if (signX) e0 = e1 - dx * signX, w0 = w1 + dx * signX;
              if (signY) s0 = s1 - dy * signY, n0 = n1 + dy * signY;
              mode = MODE_CENTER;
            } else {
              if (signX < 0) e0 = e1;
              else if (signX > 0) w0 = w1;
              if (signY < 0) s0 = s1;
              else if (signY > 0) n0 = n1;
              mode = MODE_HANDLE;
            }
            overlay.attr("cursor", cursors[type2]);
            move(event2);
          }
          break;
        }
        default:
          return;
      }
      noevent_default2(event2);
    }
  }
  function touchmoved(event) {
    emitter(this, arguments).moved(event);
  }
  function touchended(event) {
    emitter(this, arguments).ended(event);
  }
  function initialize() {
    var state = this.__brush || { selection: null };
    state.extent = number2(extent2.apply(this, arguments));
    state.dim = dim;
    return state;
  }
  brush2.extent = function(_2) {
    return arguments.length ? (extent2 = typeof _2 === "function" ? _2 : constant_default4(number2(_2)), brush2) : extent2;
  };
  brush2.filter = function(_2) {
    return arguments.length ? (filter3 = typeof _2 === "function" ? _2 : constant_default4(!!_2), brush2) : filter3;
  };
  brush2.touchable = function(_2) {
    return arguments.length ? (touchable = typeof _2 === "function" ? _2 : constant_default4(!!_2), brush2) : touchable;
  };
  brush2.handleSize = function(_2) {
    return arguments.length ? (handleSize = +_2, brush2) : handleSize;
  };
  brush2.keyModifiers = function(_2) {
    return arguments.length ? (keys = !!_2, brush2) : keys;
  };
  brush2.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? brush2 : value;
  };
  return brush2;
}

// node_modules/d3-format/src/index.js
var src_exports4 = {};
__export(src_exports4, {
  FormatSpecifier: () => FormatSpecifier,
  format: () => format,
  formatDefaultLocale: () => defaultLocale,
  formatLocale: () => locale_default,
  formatPrefix: () => formatPrefix,
  formatSpecifier: () => formatSpecifier,
  precisionFixed: () => precisionFixed_default,
  precisionPrefix: () => precisionPrefix_default,
  precisionRound: () => precisionRound_default
});

// node_modules/d3-format/src/formatDecimal.js
function formatDecimal_default(x) {
  return Math.abs(x = Math.round(x)) >= 1e21 ? x.toLocaleString("en").replace(/,/g, "") : x.toString(10);
}
function formatDecimalParts(x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null;
  var i, coefficient = x.slice(0, i);
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x.slice(i + 1)
  ];
}

// node_modules/d3-format/src/exponent.js
function exponent_default(x) {
  return x = formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
}

// node_modules/d3-format/src/formatGroup.js
function formatGroup_default(grouping, thousands) {
  return function(value, width) {
    var i = value.length, t4 = [], j = 0, g = grouping[0], length2 = 0;
    while (i > 0 && g > 0) {
      if (length2 + g + 1 > width) g = Math.max(1, width - length2);
      t4.push(value.substring(i -= g, i + g));
      if ((length2 += g + 1) > width) break;
      g = grouping[j = (j + 1) % grouping.length];
    }
    return t4.reverse().join(thousands);
  };
}

// node_modules/d3-format/src/formatNumerals.js
function formatNumerals_default(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
}

// node_modules/d3-format/src/formatSpecifier.js
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function formatSpecifier(specifier) {
  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}
formatSpecifier.prototype = FormatSpecifier.prototype;
function FormatSpecifier(specifier) {
  this.fill = specifier.fill === void 0 ? " " : specifier.fill + "";
  this.align = specifier.align === void 0 ? ">" : specifier.align + "";
  this.sign = specifier.sign === void 0 ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === void 0 ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === void 0 ? void 0 : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === void 0 ? void 0 : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === void 0 ? "" : specifier.type + "";
}
FormatSpecifier.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};

// node_modules/d3-format/src/formatTrim.js
function formatTrim_default(s) {
  out: for (var n2 = s.length, i = 1, i0 = -1, i1; i < n2; ++i) {
    switch (s[i]) {
      case ".":
        i0 = i1 = i;
        break;
      case "0":
        if (i0 === 0) i0 = i;
        i1 = i;
        break;
      default:
        if (!+s[i]) break out;
        if (i0 > 0) i0 = 0;
        break;
    }
  }
  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
}

// node_modules/d3-format/src/formatPrefixAuto.js
var prefixExponent;
function formatPrefixAuto_default(x, p) {
  var d = formatDecimalParts(x, p);
  if (!d) return x + "";
  var coefficient = d[0], exponent2 = d[1], i = exponent2 - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent2 / 3))) * 3) + 1, n2 = coefficient.length;
  return i === n2 ? coefficient : i > n2 ? coefficient + new Array(i - n2 + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + formatDecimalParts(x, Math.max(0, p + i - 1))[0];
}

// node_modules/d3-format/src/formatRounded.js
function formatRounded_default(x, p) {
  var d = formatDecimalParts(x, p);
  if (!d) return x + "";
  var coefficient = d[0], exponent2 = d[1];
  return exponent2 < 0 ? "0." + new Array(-exponent2).join("0") + coefficient : coefficient.length > exponent2 + 1 ? coefficient.slice(0, exponent2 + 1) + "." + coefficient.slice(exponent2 + 1) : coefficient + new Array(exponent2 - coefficient.length + 2).join("0");
}

// node_modules/d3-format/src/formatTypes.js
var formatTypes_default = {
  "%": (x, p) => (x * 100).toFixed(p),
  "b": (x) => Math.round(x).toString(2),
  "c": (x) => x + "",
  "d": formatDecimal_default,
  "e": (x, p) => x.toExponential(p),
  "f": (x, p) => x.toFixed(p),
  "g": (x, p) => x.toPrecision(p),
  "o": (x) => Math.round(x).toString(8),
  "p": (x, p) => formatRounded_default(x * 100, p),
  "r": formatRounded_default,
  "s": formatPrefixAuto_default,
  "X": (x) => Math.round(x).toString(16).toUpperCase(),
  "x": (x) => Math.round(x).toString(16)
};

// node_modules/d3-format/src/identity.js
function identity_default(x) {
  return x;
}

// node_modules/d3-format/src/locale.js
var map = Array.prototype.map;
var prefixes = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function locale_default(locale3) {
  var group2 = locale3.grouping === void 0 || locale3.thousands === void 0 ? identity_default : formatGroup_default(map.call(locale3.grouping, Number), locale3.thousands + ""), currencyPrefix = locale3.currency === void 0 ? "" : locale3.currency[0] + "", currencySuffix = locale3.currency === void 0 ? "" : locale3.currency[1] + "", decimal = locale3.decimal === void 0 ? "." : locale3.decimal + "", numerals = locale3.numerals === void 0 ? identity_default : formatNumerals_default(map.call(locale3.numerals, String)), percent = locale3.percent === void 0 ? "%" : locale3.percent + "", minus = locale3.minus === void 0 ? "−" : locale3.minus + "", nan = locale3.nan === void 0 ? "NaN" : locale3.nan + "";
  function newFormat(specifier) {
    specifier = formatSpecifier(specifier);
    var fill = specifier.fill, align = specifier.align, sign = specifier.sign, symbol = specifier.symbol, zero2 = specifier.zero, width = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type2 = specifier.type;
    if (type2 === "n") comma = true, type2 = "g";
    else if (!formatTypes_default[type2]) precision === void 0 && (precision = 12), trim = true, type2 = "g";
    if (zero2 || fill === "0" && align === "=") zero2 = true, fill = "0", align = "=";
    var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type2) ? "0" + type2.toLowerCase() : "", suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type2) ? percent : "";
    var formatType = formatTypes_default[type2], maybeSuffix = /[defgprs%]/.test(type2);
    precision = precision === void 0 ? 6 : /[gprs]/.test(type2) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
    function format2(value) {
      var valuePrefix = prefix, valueSuffix = suffix, i, n2, c;
      if (type2 === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;
        var valueNegative = value < 0 || 1 / value < 0;
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);
        if (trim) value = formatTrim_default(value);
        if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;
        valuePrefix = (valueNegative ? sign === "(" ? sign : minus : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = (type2 === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");
        if (maybeSuffix) {
          i = -1, n2 = value.length;
          while (++i < n2) {
            if (c = value.charCodeAt(i), 48 > c || c > 57) {
              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }
      if (comma && !zero2) value = group2(value, Infinity);
      var length2 = valuePrefix.length + value.length + valueSuffix.length, padding = length2 < width ? new Array(width - length2 + 1).join(fill) : "";
      if (comma && zero2) value = group2(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";
      switch (align) {
        case "<":
          value = valuePrefix + value + valueSuffix + padding;
          break;
        case "=":
          value = valuePrefix + padding + value + valueSuffix;
          break;
        case "^":
          value = padding.slice(0, length2 = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length2);
          break;
        default:
          value = padding + valuePrefix + value + valueSuffix;
          break;
      }
      return numerals(value);
    }
    format2.toString = function() {
      return specifier + "";
    };
    return format2;
  }
  function formatPrefix2(specifier, value) {
    var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)), e3 = Math.max(-8, Math.min(8, Math.floor(exponent_default(value) / 3))) * 3, k = Math.pow(10, -e3), prefix = prefixes[8 + e3 / 3];
    return function(value2) {
      return f(k * value2) + prefix;
    };
  }
  return {
    format: newFormat,
    formatPrefix: formatPrefix2
  };
}

// node_modules/d3-format/src/defaultLocale.js
var locale;
var format;
var formatPrefix;
defaultLocale({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function defaultLocale(definition) {
  locale = locale_default(definition);
  format = locale.format;
  formatPrefix = locale.formatPrefix;
  return locale;
}

// node_modules/d3-format/src/precisionFixed.js
function precisionFixed_default(step) {
  return Math.max(0, -exponent_default(Math.abs(step)));
}

// node_modules/d3-format/src/precisionPrefix.js
function precisionPrefix_default(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent_default(value) / 3))) * 3 - exponent_default(Math.abs(step)));
}

// node_modules/d3-format/src/precisionRound.js
function precisionRound_default(step, max5) {
  step = Math.abs(step), max5 = Math.abs(max5) - step;
  return Math.max(0, exponent_default(max5) - exponent_default(step)) + 1;
}

// node_modules/d3-array/src/ascending.js
function ascending_default(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

// node_modules/d3-array/src/bisector.js
function bisector_default(f) {
  let delta = f;
  let compare = f;
  if (f.length === 1) {
    delta = (d, x) => f(d) - x;
    compare = ascendingComparator(f);
  }
  function left2(a, x, lo, hi) {
    if (lo == null) lo = 0;
    if (hi == null) hi = a.length;
    while (lo < hi) {
      const mid = lo + hi >>> 1;
      if (compare(a[mid], x) < 0) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }
  function right2(a, x, lo, hi) {
    if (lo == null) lo = 0;
    if (hi == null) hi = a.length;
    while (lo < hi) {
      const mid = lo + hi >>> 1;
      if (compare(a[mid], x) > 0) hi = mid;
      else lo = mid + 1;
    }
    return lo;
  }
  function center(a, x, lo, hi) {
    if (lo == null) lo = 0;
    if (hi == null) hi = a.length;
    const i = left2(a, x, lo, hi - 1);
    return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
  }
  return { left: left2, center, right: right2 };
}
function ascendingComparator(f) {
  return (d, x) => ascending_default(f(d), x);
}

// node_modules/d3-array/src/number.js
function number_default2(x) {
  return x === null ? NaN : +x;
}

// node_modules/d3-array/src/bisect.js
var ascendingBisect = bisector_default(ascending_default);
var bisectRight = ascendingBisect.right;
var bisectLeft = ascendingBisect.left;
var bisectCenter = bisector_default(number_default2).center;
var bisect_default = bisectRight;

// node_modules/d3-array/src/array.js
var array2 = Array.prototype;
var slice = array2.slice;
var map2 = array2.map;

// node_modules/d3-array/src/ticks.js
var e10 = Math.sqrt(50);
var e5 = Math.sqrt(10);
var e2 = Math.sqrt(2);
function ticks_default(start3, stop2, count2) {
  var reverse2, i = -1, n2, ticks, step;
  stop2 = +stop2, start3 = +start3, count2 = +count2;
  if (start3 === stop2 && count2 > 0) return [start3];
  if (reverse2 = stop2 < start3) n2 = start3, start3 = stop2, stop2 = n2;
  if ((step = tickIncrement(start3, stop2, count2)) === 0 || !isFinite(step)) return [];
  if (step > 0) {
    let r0 = Math.round(start3 / step), r1 = Math.round(stop2 / step);
    if (r0 * step < start3) ++r0;
    if (r1 * step > stop2) --r1;
    ticks = new Array(n2 = r1 - r0 + 1);
    while (++i < n2) ticks[i] = (r0 + i) * step;
  } else {
    step = -step;
    let r0 = Math.round(start3 * step), r1 = Math.round(stop2 * step);
    if (r0 / step < start3) ++r0;
    if (r1 / step > stop2) --r1;
    ticks = new Array(n2 = r1 - r0 + 1);
    while (++i < n2) ticks[i] = (r0 + i) / step;
  }
  if (reverse2) ticks.reverse();
  return ticks;
}
function tickIncrement(start3, stop2, count2) {
  var step = (stop2 - start3) / Math.max(0, count2), power = Math.floor(Math.log(step) / Math.LN10), error = step / Math.pow(10, power);
  return power >= 0 ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power) : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
}
function tickStep(start3, stop2, count2) {
  var step0 = Math.abs(stop2 - start3) / Math.max(0, count2), step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)), error = step0 / step1;
  if (error >= e10) step1 *= 10;
  else if (error >= e5) step1 *= 5;
  else if (error >= e2) step1 *= 2;
  return stop2 < start3 ? -step1 : step1;
}

// node_modules/d3-array/src/max.js
function max2(values, valueof) {
  let max5;
  if (valueof === void 0) {
    for (const value of values) {
      if (value != null && (max5 < value || max5 === void 0 && value >= value)) {
        max5 = value;
      }
    }
  } else {
    let index2 = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index2, values)) != null && (max5 < value || max5 === void 0 && value >= value)) {
        max5 = value;
      }
    }
  }
  return max5;
}

// node_modules/d3-array/src/shuffle.js
var shuffle_default = shuffler(Math.random);
function shuffler(random) {
  return function shuffle(array3, i0 = 0, i1 = array3.length) {
    let m = i1 - (i0 = +i0);
    while (m) {
      const i = random() * m-- | 0, t4 = array3[m + i0];
      array3[m + i0] = array3[i + i0];
      array3[i + i0] = t4;
    }
    return array3;
  };
}

// node_modules/d3-scale/src/init.js
function initRange(domain, range) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(domain);
      break;
    default:
      this.range(range).domain(domain);
      break;
  }
  return this;
}

// node_modules/d3-scale/src/ordinal.js
var implicit = Symbol("implicit");

// node_modules/d3-scale/src/constant.js
function constants(x) {
  return function() {
    return x;
  };
}

// node_modules/d3-scale/src/number.js
function number(x) {
  return +x;
}

// node_modules/d3-scale/src/continuous.js
var unit = [0, 1];
function identity2(x) {
  return x;
}
function normalize(a, b) {
  return (b -= a = +a) ? function(x) {
    return (x - a) / b;
  } : constants(isNaN(b) ? NaN : 0.5);
}
function clamper(a, b) {
  var t4;
  if (a > b) t4 = a, a = b, b = t4;
  return function(x) {
    return Math.max(a, Math.min(b, x));
  };
}
function bimap(domain, range, interpolate) {
  var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
  if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
  else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
  return function(x) {
    return r0(d0(x));
  };
}
function polymap(domain, range, interpolate) {
  var j = Math.min(domain.length, range.length) - 1, d = new Array(j), r2 = new Array(j), i = -1;
  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range = range.slice().reverse();
  }
  while (++i < j) {
    d[i] = normalize(domain[i], domain[i + 1]);
    r2[i] = interpolate(range[i], range[i + 1]);
  }
  return function(x) {
    var i2 = bisect_default(domain, x, 1, j) - 1;
    return r2[i2](d[i2](x));
  };
}
function copy(source, target) {
  return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp()).unknown(source.unknown());
}
function transformer() {
  var domain = unit, range = unit, interpolate = value_default, transform, untransform, unknown, clamp = identity2, piecewise2, output, input;
  function rescale() {
    var n2 = Math.min(domain.length, range.length);
    if (clamp !== identity2) clamp = clamper(domain[0], domain[n2 - 1]);
    piecewise2 = n2 > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }
  function scale(x) {
    return x == null || isNaN(x = +x) ? unknown : (output || (output = piecewise2(domain.map(transform), range, interpolate)))(transform(clamp(x)));
  }
  scale.invert = function(y2) {
    return clamp(untransform((input || (input = piecewise2(range, domain.map(transform), number_default)))(y2)));
  };
  scale.domain = function(_2) {
    return arguments.length ? (domain = Array.from(_2, number), rescale()) : domain.slice();
  };
  scale.range = function(_2) {
    return arguments.length ? (range = Array.from(_2), rescale()) : range.slice();
  };
  scale.rangeRound = function(_2) {
    return range = Array.from(_2), interpolate = round_default, rescale();
  };
  scale.clamp = function(_2) {
    return arguments.length ? (clamp = _2 ? true : identity2, rescale()) : clamp !== identity2;
  };
  scale.interpolate = function(_2) {
    return arguments.length ? (interpolate = _2, rescale()) : interpolate;
  };
  scale.unknown = function(_2) {
    return arguments.length ? (unknown = _2, scale) : unknown;
  };
  return function(t4, u) {
    transform = t4, untransform = u;
    return rescale();
  };
}
function continuous() {
  return transformer()(identity2, identity2);
}

// node_modules/d3-scale/src/tickFormat.js
function tickFormat(start3, stop2, count2, specifier) {
  var step = tickStep(start3, stop2, count2), precision;
  specifier = formatSpecifier(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start3), Math.abs(stop2));
      if (specifier.precision == null && !isNaN(precision = precisionPrefix_default(step, value))) specifier.precision = precision;
      return formatPrefix(specifier, value);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      if (specifier.precision == null && !isNaN(precision = precisionRound_default(step, Math.max(Math.abs(start3), Math.abs(stop2))))) specifier.precision = precision - (specifier.type === "e");
      break;
    }
    case "f":
    case "%": {
      if (specifier.precision == null && !isNaN(precision = precisionFixed_default(step))) specifier.precision = precision - (specifier.type === "%") * 2;
      break;
    }
  }
  return format(specifier);
}

// node_modules/d3-scale/src/linear.js
function linearish(scale) {
  var domain = scale.domain;
  scale.ticks = function(count2) {
    var d = domain();
    return ticks_default(d[0], d[d.length - 1], count2 == null ? 10 : count2);
  };
  scale.tickFormat = function(count2, specifier) {
    var d = domain();
    return tickFormat(d[0], d[d.length - 1], count2 == null ? 10 : count2, specifier);
  };
  scale.nice = function(count2) {
    if (count2 == null) count2 = 10;
    var d = domain();
    var i0 = 0;
    var i1 = d.length - 1;
    var start3 = d[i0];
    var stop2 = d[i1];
    var prestep;
    var step;
    var maxIter = 10;
    if (stop2 < start3) {
      step = start3, start3 = stop2, stop2 = step;
      step = i0, i0 = i1, i1 = step;
    }
    while (maxIter-- > 0) {
      step = tickIncrement(start3, stop2, count2);
      if (step === prestep) {
        d[i0] = start3;
        d[i1] = stop2;
        return domain(d);
      } else if (step > 0) {
        start3 = Math.floor(start3 / step) * step;
        stop2 = Math.ceil(stop2 / step) * step;
      } else if (step < 0) {
        start3 = Math.ceil(start3 * step) / step;
        stop2 = Math.floor(stop2 * step) / step;
      } else {
        break;
      }
      prestep = step;
    }
    return scale;
  };
  return scale;
}
function linear3() {
  var scale = continuous();
  scale.copy = function() {
    return copy(scale, linear3());
  };
  initRange.apply(scale, arguments);
  return linearish(scale);
}

// node_modules/d3-time/src/interval.js
var t02 = /* @__PURE__ */ new Date();
var t12 = /* @__PURE__ */ new Date();
function timeInterval(floori, offseti, count2, field) {
  function interval2(date) {
    return floori(date = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+date)), date;
  }
  interval2.floor = (date) => {
    return floori(date = /* @__PURE__ */ new Date(+date)), date;
  };
  interval2.ceil = (date) => {
    return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
  };
  interval2.round = (date) => {
    const d0 = interval2(date), d1 = interval2.ceil(date);
    return date - d0 < d1 - date ? d0 : d1;
  };
  interval2.offset = (date, step) => {
    return offseti(date = /* @__PURE__ */ new Date(+date), step == null ? 1 : Math.floor(step)), date;
  };
  interval2.range = (start3, stop2, step) => {
    const range = [];
    start3 = interval2.ceil(start3);
    step = step == null ? 1 : Math.floor(step);
    if (!(start3 < stop2) || !(step > 0)) return range;
    let previous;
    do
      range.push(previous = /* @__PURE__ */ new Date(+start3)), offseti(start3, step), floori(start3);
    while (previous < start3 && start3 < stop2);
    return range;
  };
  interval2.filter = (test) => {
    return timeInterval((date) => {
      if (date >= date) while (floori(date), !test(date)) date.setTime(date - 1);
    }, (date, step) => {
      if (date >= date) {
        if (step < 0) while (++step <= 0) {
          while (offseti(date, -1), !test(date)) {
          }
        }
        else while (--step >= 0) {
          while (offseti(date, 1), !test(date)) {
          }
        }
      }
    });
  };
  if (count2) {
    interval2.count = (start3, end2) => {
      t02.setTime(+start3), t12.setTime(+end2);
      floori(t02), floori(t12);
      return Math.floor(count2(t02, t12));
    };
    interval2.every = (step) => {
      step = Math.floor(step);
      return !isFinite(step) || !(step > 0) ? null : !(step > 1) ? interval2 : interval2.filter(field ? (d) => field(d) % step === 0 : (d) => interval2.count(0, d) % step === 0);
    };
  }
  return interval2;
}

// node_modules/d3-time/src/millisecond.js
var millisecond = timeInterval(() => {
}, (date, step) => {
  date.setTime(+date + step);
}, (start3, end2) => {
  return end2 - start3;
});
millisecond.every = (k) => {
  k = Math.floor(k);
  if (!isFinite(k) || !(k > 0)) return null;
  if (!(k > 1)) return millisecond;
  return timeInterval((date) => {
    date.setTime(Math.floor(date / k) * k);
  }, (date, step) => {
    date.setTime(+date + step * k);
  }, (start3, end2) => {
    return (end2 - start3) / k;
  });
};
var milliseconds = millisecond.range;

// node_modules/d3-time/src/duration.js
var durationSecond = 1e3;
var durationMinute = durationSecond * 60;
var durationHour = durationMinute * 60;
var durationDay = durationHour * 24;
var durationWeek = durationDay * 7;
var durationMonth = durationDay * 30;
var durationYear = durationDay * 365;

// node_modules/d3-time/src/second.js
var second = timeInterval((date) => {
  date.setTime(date - date.getMilliseconds());
}, (date, step) => {
  date.setTime(+date + step * durationSecond);
}, (start3, end2) => {
  return (end2 - start3) / durationSecond;
}, (date) => {
  return date.getUTCSeconds();
});
var seconds = second.range;

// node_modules/d3-time/src/minute.js
var timeMinute = timeInterval((date) => {
  date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond);
}, (date, step) => {
  date.setTime(+date + step * durationMinute);
}, (start3, end2) => {
  return (end2 - start3) / durationMinute;
}, (date) => {
  return date.getMinutes();
});
var timeMinutes = timeMinute.range;
var utcMinute = timeInterval((date) => {
  date.setUTCSeconds(0, 0);
}, (date, step) => {
  date.setTime(+date + step * durationMinute);
}, (start3, end2) => {
  return (end2 - start3) / durationMinute;
}, (date) => {
  return date.getUTCMinutes();
});
var utcMinutes = utcMinute.range;

// node_modules/d3-time/src/hour.js
var timeHour = timeInterval((date) => {
  date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond - date.getMinutes() * durationMinute);
}, (date, step) => {
  date.setTime(+date + step * durationHour);
}, (start3, end2) => {
  return (end2 - start3) / durationHour;
}, (date) => {
  return date.getHours();
});
var timeHours = timeHour.range;
var utcHour = timeInterval((date) => {
  date.setUTCMinutes(0, 0, 0);
}, (date, step) => {
  date.setTime(+date + step * durationHour);
}, (start3, end2) => {
  return (end2 - start3) / durationHour;
}, (date) => {
  return date.getUTCHours();
});
var utcHours = utcHour.range;

// node_modules/d3-time/src/day.js
var timeDay = timeInterval(
  (date) => date.setHours(0, 0, 0, 0),
  (date, step) => date.setDate(date.getDate() + step),
  (start3, end2) => (end2 - start3 - (end2.getTimezoneOffset() - start3.getTimezoneOffset()) * durationMinute) / durationDay,
  (date) => date.getDate() - 1
);
var timeDays = timeDay.range;
var utcDay = timeInterval((date) => {
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCDate(date.getUTCDate() + step);
}, (start3, end2) => {
  return (end2 - start3) / durationDay;
}, (date) => {
  return date.getUTCDate() - 1;
});
var utcDays = utcDay.range;
var unixDay = timeInterval((date) => {
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCDate(date.getUTCDate() + step);
}, (start3, end2) => {
  return (end2 - start3) / durationDay;
}, (date) => {
  return Math.floor(date / durationDay);
});
var unixDays = unixDay.range;

// node_modules/d3-time/src/week.js
function timeWeekday(i) {
  return timeInterval((date) => {
    date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
    date.setHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setDate(date.getDate() + step * 7);
  }, (start3, end2) => {
    return (end2 - start3 - (end2.getTimezoneOffset() - start3.getTimezoneOffset()) * durationMinute) / durationWeek;
  });
}
var timeSunday = timeWeekday(0);
var timeMonday = timeWeekday(1);
var timeTuesday = timeWeekday(2);
var timeWednesday = timeWeekday(3);
var timeThursday = timeWeekday(4);
var timeFriday = timeWeekday(5);
var timeSaturday = timeWeekday(6);
var timeSundays = timeSunday.range;
var timeMondays = timeMonday.range;
var timeTuesdays = timeTuesday.range;
var timeWednesdays = timeWednesday.range;
var timeThursdays = timeThursday.range;
var timeFridays = timeFriday.range;
var timeSaturdays = timeSaturday.range;
function utcWeekday(i) {
  return timeInterval((date) => {
    date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
    date.setUTCHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setUTCDate(date.getUTCDate() + step * 7);
  }, (start3, end2) => {
    return (end2 - start3) / durationWeek;
  });
}
var utcSunday = utcWeekday(0);
var utcMonday = utcWeekday(1);
var utcTuesday = utcWeekday(2);
var utcWednesday = utcWeekday(3);
var utcThursday = utcWeekday(4);
var utcFriday = utcWeekday(5);
var utcSaturday = utcWeekday(6);
var utcSundays = utcSunday.range;
var utcMondays = utcMonday.range;
var utcTuesdays = utcTuesday.range;
var utcWednesdays = utcWednesday.range;
var utcThursdays = utcThursday.range;
var utcFridays = utcFriday.range;
var utcSaturdays = utcSaturday.range;

// node_modules/d3-time/src/month.js
var timeMonth = timeInterval((date) => {
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
}, (date, step) => {
  date.setMonth(date.getMonth() + step);
}, (start3, end2) => {
  return end2.getMonth() - start3.getMonth() + (end2.getFullYear() - start3.getFullYear()) * 12;
}, (date) => {
  return date.getMonth();
});
var timeMonths = timeMonth.range;
var utcMonth = timeInterval((date) => {
  date.setUTCDate(1);
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCMonth(date.getUTCMonth() + step);
}, (start3, end2) => {
  return end2.getUTCMonth() - start3.getUTCMonth() + (end2.getUTCFullYear() - start3.getUTCFullYear()) * 12;
}, (date) => {
  return date.getUTCMonth();
});
var utcMonths = utcMonth.range;

// node_modules/d3-time/src/year.js
var timeYear = timeInterval((date) => {
  date.setMonth(0, 1);
  date.setHours(0, 0, 0, 0);
}, (date, step) => {
  date.setFullYear(date.getFullYear() + step);
}, (start3, end2) => {
  return end2.getFullYear() - start3.getFullYear();
}, (date) => {
  return date.getFullYear();
});
timeYear.every = (k) => {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : timeInterval((date) => {
    date.setFullYear(Math.floor(date.getFullYear() / k) * k);
    date.setMonth(0, 1);
    date.setHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setFullYear(date.getFullYear() + step * k);
  });
};
var timeYears = timeYear.range;
var utcYear = timeInterval((date) => {
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCFullYear(date.getUTCFullYear() + step);
}, (start3, end2) => {
  return end2.getUTCFullYear() - start3.getUTCFullYear();
}, (date) => {
  return date.getUTCFullYear();
});
utcYear.every = (k) => {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : timeInterval((date) => {
    date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setUTCFullYear(date.getUTCFullYear() + step * k);
  });
};
var utcYears = utcYear.range;

// node_modules/d3-time/src/ticks.js
function ticker(year, month, week, day, hour, minute) {
  const tickIntervals = [
    [second, 1, durationSecond],
    [second, 5, 5 * durationSecond],
    [second, 15, 15 * durationSecond],
    [second, 30, 30 * durationSecond],
    [minute, 1, durationMinute],
    [minute, 5, 5 * durationMinute],
    [minute, 15, 15 * durationMinute],
    [minute, 30, 30 * durationMinute],
    [hour, 1, durationHour],
    [hour, 3, 3 * durationHour],
    [hour, 6, 6 * durationHour],
    [hour, 12, 12 * durationHour],
    [day, 1, durationDay],
    [day, 2, 2 * durationDay],
    [week, 1, durationWeek],
    [month, 1, durationMonth],
    [month, 3, 3 * durationMonth],
    [year, 1, durationYear]
  ];
  function ticks(start3, stop2, count2) {
    const reverse2 = stop2 < start3;
    if (reverse2) [start3, stop2] = [stop2, start3];
    const interval2 = count2 && typeof count2.range === "function" ? count2 : tickInterval(start3, stop2, count2);
    const ticks2 = interval2 ? interval2.range(start3, +stop2 + 1) : [];
    return reverse2 ? ticks2.reverse() : ticks2;
  }
  function tickInterval(start3, stop2, count2) {
    const target = Math.abs(stop2 - start3) / count2;
    const i = bisector_default(([, , step2]) => step2).right(tickIntervals, target);
    if (i === tickIntervals.length) return year.every(tickStep(start3 / durationYear, stop2 / durationYear, count2));
    if (i === 0) return millisecond.every(Math.max(tickStep(start3, stop2, count2), 1));
    const [t4, step] = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
    return t4.every(step);
  }
  return [ticks, tickInterval];
}
var [utcTicks, utcTickInterval] = ticker(utcYear, utcMonth, utcSunday, unixDay, utcHour, utcMinute);
var [timeTicks, timeTickInterval] = ticker(timeYear, timeMonth, timeSunday, timeDay, timeHour, timeMinute);

// node_modules/d3-time-format/src/locale.js
function localDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
    date.setFullYear(d.y);
    return date;
  }
  return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
}
function utcDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
    date.setUTCFullYear(d.y);
    return date;
  }
  return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
}
function newDate(y2, m, d) {
  return { y: y2, m, d, H: 0, M: 0, S: 0, L: 0 };
}
function formatLocale(locale3) {
  var locale_dateTime = locale3.dateTime, locale_date = locale3.date, locale_time = locale3.time, locale_periods = locale3.periods, locale_weekdays = locale3.days, locale_shortWeekdays = locale3.shortDays, locale_months = locale3.months, locale_shortMonths = locale3.shortMonths;
  var periodRe = formatRe(locale_periods), periodLookup = formatLookup(locale_periods), weekdayRe = formatRe(locale_weekdays), weekdayLookup = formatLookup(locale_weekdays), shortWeekdayRe = formatRe(locale_shortWeekdays), shortWeekdayLookup = formatLookup(locale_shortWeekdays), monthRe = formatRe(locale_months), monthLookup = formatLookup(locale_months), shortMonthRe = formatRe(locale_shortMonths), shortMonthLookup = formatLookup(locale_shortMonths);
  var formats = {
    "a": formatShortWeekday,
    "A": formatWeekday,
    "b": formatShortMonth,
    "B": formatMonth,
    "c": null,
    "d": formatDayOfMonth,
    "e": formatDayOfMonth,
    "f": formatMicroseconds,
    "g": formatYearISO,
    "G": formatFullYearISO,
    "H": formatHour24,
    "I": formatHour12,
    "j": formatDayOfYear,
    "L": formatMilliseconds,
    "m": formatMonthNumber,
    "M": formatMinutes,
    "p": formatPeriod,
    "q": formatQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatSeconds,
    "u": formatWeekdayNumberMonday,
    "U": formatWeekNumberSunday,
    "V": formatWeekNumberISO,
    "w": formatWeekdayNumberSunday,
    "W": formatWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatYear2,
    "Y": formatFullYear,
    "Z": formatZone,
    "%": formatLiteralPercent
  };
  var utcFormats = {
    "a": formatUTCShortWeekday,
    "A": formatUTCWeekday,
    "b": formatUTCShortMonth,
    "B": formatUTCMonth,
    "c": null,
    "d": formatUTCDayOfMonth,
    "e": formatUTCDayOfMonth,
    "f": formatUTCMicroseconds,
    "g": formatUTCYearISO,
    "G": formatUTCFullYearISO,
    "H": formatUTCHour24,
    "I": formatUTCHour12,
    "j": formatUTCDayOfYear,
    "L": formatUTCMilliseconds,
    "m": formatUTCMonthNumber,
    "M": formatUTCMinutes,
    "p": formatUTCPeriod,
    "q": formatUTCQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatUTCSeconds,
    "u": formatUTCWeekdayNumberMonday,
    "U": formatUTCWeekNumberSunday,
    "V": formatUTCWeekNumberISO,
    "w": formatUTCWeekdayNumberSunday,
    "W": formatUTCWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatUTCYear,
    "Y": formatUTCFullYear,
    "Z": formatUTCZone,
    "%": formatLiteralPercent
  };
  var parses = {
    "a": parseShortWeekday,
    "A": parseWeekday,
    "b": parseShortMonth,
    "B": parseMonth,
    "c": parseLocaleDateTime,
    "d": parseDayOfMonth,
    "e": parseDayOfMonth,
    "f": parseMicroseconds,
    "g": parseYear,
    "G": parseFullYear,
    "H": parseHour24,
    "I": parseHour24,
    "j": parseDayOfYear,
    "L": parseMilliseconds,
    "m": parseMonthNumber,
    "M": parseMinutes,
    "p": parsePeriod,
    "q": parseQuarter,
    "Q": parseUnixTimestamp,
    "s": parseUnixTimestampSeconds,
    "S": parseSeconds,
    "u": parseWeekdayNumberMonday,
    "U": parseWeekNumberSunday,
    "V": parseWeekNumberISO,
    "w": parseWeekdayNumberSunday,
    "W": parseWeekNumberMonday,
    "x": parseLocaleDate,
    "X": parseLocaleTime,
    "y": parseYear,
    "Y": parseFullYear,
    "Z": parseZone,
    "%": parseLiteralPercent
  };
  formats.x = newFormat(locale_date, formats);
  formats.X = newFormat(locale_time, formats);
  formats.c = newFormat(locale_dateTime, formats);
  utcFormats.x = newFormat(locale_date, utcFormats);
  utcFormats.X = newFormat(locale_time, utcFormats);
  utcFormats.c = newFormat(locale_dateTime, utcFormats);
  function newFormat(specifier, formats2) {
    return function(date) {
      var string = [], i = -1, j = 0, n2 = specifier.length, c, pad3, format2;
      if (!(date instanceof Date)) date = /* @__PURE__ */ new Date(+date);
      while (++i < n2) {
        if (specifier.charCodeAt(i) === 37) {
          string.push(specifier.slice(j, i));
          if ((pad3 = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);
          else pad3 = c === "e" ? " " : "0";
          if (format2 = formats2[c]) c = format2(date, pad3);
          string.push(c);
          j = i + 1;
        }
      }
      string.push(specifier.slice(j, i));
      return string.join("");
    };
  }
  function newParse(specifier, Z) {
    return function(string) {
      var d = newDate(1900, void 0, 1), i = parseSpecifier(d, specifier, string += "", 0), week, day;
      if (i != string.length) return null;
      if ("Q" in d) return new Date(d.Q);
      if ("s" in d) return new Date(d.s * 1e3 + ("L" in d ? d.L : 0));
      if (Z && !("Z" in d)) d.Z = 0;
      if ("p" in d) d.H = d.H % 12 + d.p * 12;
      if (d.m === void 0) d.m = "q" in d ? d.q : 0;
      if ("V" in d) {
        if (d.V < 1 || d.V > 53) return null;
        if (!("w" in d)) d.w = 1;
        if ("Z" in d) {
          week = utcDate(newDate(d.y, 0, 1)), day = week.getUTCDay();
          week = day > 4 || day === 0 ? utcMonday.ceil(week) : utcMonday(week);
          week = utcDay.offset(week, (d.V - 1) * 7);
          d.y = week.getUTCFullYear();
          d.m = week.getUTCMonth();
          d.d = week.getUTCDate() + (d.w + 6) % 7;
        } else {
          week = localDate(newDate(d.y, 0, 1)), day = week.getDay();
          week = day > 4 || day === 0 ? timeMonday.ceil(week) : timeMonday(week);
          week = timeDay.offset(week, (d.V - 1) * 7);
          d.y = week.getFullYear();
          d.m = week.getMonth();
          d.d = week.getDate() + (d.w + 6) % 7;
        }
      } else if ("W" in d || "U" in d) {
        if (!("w" in d)) d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
        day = "Z" in d ? utcDate(newDate(d.y, 0, 1)).getUTCDay() : localDate(newDate(d.y, 0, 1)).getDay();
        d.m = 0;
        d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day + 5) % 7 : d.w + d.U * 7 - (day + 6) % 7;
      }
      if ("Z" in d) {
        d.H += d.Z / 100 | 0;
        d.M += d.Z % 100;
        return utcDate(d);
      }
      return localDate(d);
    };
  }
  function parseSpecifier(d, specifier, string, j) {
    var i = 0, n2 = specifier.length, m = string.length, c, parse;
    while (i < n2) {
      if (j >= m) return -1;
      c = specifier.charCodeAt(i++);
      if (c === 37) {
        c = specifier.charAt(i++);
        parse = parses[c in pads ? specifier.charAt(i++) : c];
        if (!parse || (j = parse(d, string, j)) < 0) return -1;
      } else if (c != string.charCodeAt(j++)) {
        return -1;
      }
    }
    return j;
  }
  function parsePeriod(d, string, i) {
    var n2 = periodRe.exec(string.slice(i));
    return n2 ? (d.p = periodLookup.get(n2[0].toLowerCase()), i + n2[0].length) : -1;
  }
  function parseShortWeekday(d, string, i) {
    var n2 = shortWeekdayRe.exec(string.slice(i));
    return n2 ? (d.w = shortWeekdayLookup.get(n2[0].toLowerCase()), i + n2[0].length) : -1;
  }
  function parseWeekday(d, string, i) {
    var n2 = weekdayRe.exec(string.slice(i));
    return n2 ? (d.w = weekdayLookup.get(n2[0].toLowerCase()), i + n2[0].length) : -1;
  }
  function parseShortMonth(d, string, i) {
    var n2 = shortMonthRe.exec(string.slice(i));
    return n2 ? (d.m = shortMonthLookup.get(n2[0].toLowerCase()), i + n2[0].length) : -1;
  }
  function parseMonth(d, string, i) {
    var n2 = monthRe.exec(string.slice(i));
    return n2 ? (d.m = monthLookup.get(n2[0].toLowerCase()), i + n2[0].length) : -1;
  }
  function parseLocaleDateTime(d, string, i) {
    return parseSpecifier(d, locale_dateTime, string, i);
  }
  function parseLocaleDate(d, string, i) {
    return parseSpecifier(d, locale_date, string, i);
  }
  function parseLocaleTime(d, string, i) {
    return parseSpecifier(d, locale_time, string, i);
  }
  function formatShortWeekday(d) {
    return locale_shortWeekdays[d.getDay()];
  }
  function formatWeekday(d) {
    return locale_weekdays[d.getDay()];
  }
  function formatShortMonth(d) {
    return locale_shortMonths[d.getMonth()];
  }
  function formatMonth(d) {
    return locale_months[d.getMonth()];
  }
  function formatPeriod(d) {
    return locale_periods[+(d.getHours() >= 12)];
  }
  function formatQuarter(d) {
    return 1 + ~~(d.getMonth() / 3);
  }
  function formatUTCShortWeekday(d) {
    return locale_shortWeekdays[d.getUTCDay()];
  }
  function formatUTCWeekday(d) {
    return locale_weekdays[d.getUTCDay()];
  }
  function formatUTCShortMonth(d) {
    return locale_shortMonths[d.getUTCMonth()];
  }
  function formatUTCMonth(d) {
    return locale_months[d.getUTCMonth()];
  }
  function formatUTCPeriod(d) {
    return locale_periods[+(d.getUTCHours() >= 12)];
  }
  function formatUTCQuarter(d) {
    return 1 + ~~(d.getUTCMonth() / 3);
  }
  return {
    format: function(specifier) {
      var f = newFormat(specifier += "", formats);
      f.toString = function() {
        return specifier;
      };
      return f;
    },
    parse: function(specifier) {
      var p = newParse(specifier += "", false);
      p.toString = function() {
        return specifier;
      };
      return p;
    },
    utcFormat: function(specifier) {
      var f = newFormat(specifier += "", utcFormats);
      f.toString = function() {
        return specifier;
      };
      return f;
    },
    utcParse: function(specifier) {
      var p = newParse(specifier += "", true);
      p.toString = function() {
        return specifier;
      };
      return p;
    }
  };
}
var pads = { "-": "", "_": " ", "0": "0" };
var numberRe = /^\s*\d+/;
var percentRe = /^%/;
var requoteRe = /[\\^$*+?|[\]().{}]/g;
function pad2(value, fill, width) {
  var sign = value < 0 ? "-" : "", string = (sign ? -value : value) + "", length2 = string.length;
  return sign + (length2 < width ? new Array(width - length2 + 1).join(fill) + string : string);
}
function requote(s) {
  return s.replace(requoteRe, "\\$&");
}
function formatRe(names) {
  return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
}
function formatLookup(names) {
  return new Map(names.map((name2, i) => [name2.toLowerCase(), i]));
}
function parseWeekdayNumberSunday(d, string, i) {
  var n2 = numberRe.exec(string.slice(i, i + 1));
  return n2 ? (d.w = +n2[0], i + n2[0].length) : -1;
}
function parseWeekdayNumberMonday(d, string, i) {
  var n2 = numberRe.exec(string.slice(i, i + 1));
  return n2 ? (d.u = +n2[0], i + n2[0].length) : -1;
}
function parseWeekNumberSunday(d, string, i) {
  var n2 = numberRe.exec(string.slice(i, i + 2));
  return n2 ? (d.U = +n2[0], i + n2[0].length) : -1;
}
function parseWeekNumberISO(d, string, i) {
  var n2 = numberRe.exec(string.slice(i, i + 2));
  return n2 ? (d.V = +n2[0], i + n2[0].length) : -1;
}
function parseWeekNumberMonday(d, string, i) {
  var n2 = numberRe.exec(string.slice(i, i + 2));
  return n2 ? (d.W = +n2[0], i + n2[0].length) : -1;
}
function parseFullYear(d, string, i) {
  var n2 = numberRe.exec(string.slice(i, i + 4));
  return n2 ? (d.y = +n2[0], i + n2[0].length) : -1;
}
function parseYear(d, string, i) {
  var n2 = numberRe.exec(string.slice(i, i + 2));
  return n2 ? (d.y = +n2[0] + (+n2[0] > 68 ? 1900 : 2e3), i + n2[0].length) : -1;
}
function parseZone(d, string, i) {
  var n2 = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
  return n2 ? (d.Z = n2[1] ? 0 : -(n2[2] + (n2[3] || "00")), i + n2[0].length) : -1;
}
function parseQuarter(d, string, i) {
  var n2 = numberRe.exec(string.slice(i, i + 1));
  return n2 ? (d.q = n2[0] * 3 - 3, i + n2[0].length) : -1;
}
function parseMonthNumber(d, string, i) {
  var n2 = numberRe.exec(string.slice(i, i + 2));
  return n2 ? (d.m = n2[0] - 1, i + n2[0].length) : -1;
}
function parseDayOfMonth(d, string, i) {
  var n2 = numberRe.exec(string.slice(i, i + 2));
  return n2 ? (d.d = +n2[0], i + n2[0].length) : -1;
}
function parseDayOfYear(d, string, i) {
  var n2 = numberRe.exec(string.slice(i, i + 3));
  return n2 ? (d.m = 0, d.d = +n2[0], i + n2[0].length) : -1;
}
function parseHour24(d, string, i) {
  var n2 = numberRe.exec(string.slice(i, i + 2));
  return n2 ? (d.H = +n2[0], i + n2[0].length) : -1;
}
function parseMinutes(d, string, i) {
  var n2 = numberRe.exec(string.slice(i, i + 2));
  return n2 ? (d.M = +n2[0], i + n2[0].length) : -1;
}
function parseSeconds(d, string, i) {
  var n2 = numberRe.exec(string.slice(i, i + 2));
  return n2 ? (d.S = +n2[0], i + n2[0].length) : -1;
}
function parseMilliseconds(d, string, i) {
  var n2 = numberRe.exec(string.slice(i, i + 3));
  return n2 ? (d.L = +n2[0], i + n2[0].length) : -1;
}
function parseMicroseconds(d, string, i) {
  var n2 = numberRe.exec(string.slice(i, i + 6));
  return n2 ? (d.L = Math.floor(n2[0] / 1e3), i + n2[0].length) : -1;
}
function parseLiteralPercent(d, string, i) {
  var n2 = percentRe.exec(string.slice(i, i + 1));
  return n2 ? i + n2[0].length : -1;
}
function parseUnixTimestamp(d, string, i) {
  var n2 = numberRe.exec(string.slice(i));
  return n2 ? (d.Q = +n2[0], i + n2[0].length) : -1;
}
function parseUnixTimestampSeconds(d, string, i) {
  var n2 = numberRe.exec(string.slice(i));
  return n2 ? (d.s = +n2[0], i + n2[0].length) : -1;
}
function formatDayOfMonth(d, p) {
  return pad2(d.getDate(), p, 2);
}
function formatHour24(d, p) {
  return pad2(d.getHours(), p, 2);
}
function formatHour12(d, p) {
  return pad2(d.getHours() % 12 || 12, p, 2);
}
function formatDayOfYear(d, p) {
  return pad2(1 + timeDay.count(timeYear(d), d), p, 3);
}
function formatMilliseconds(d, p) {
  return pad2(d.getMilliseconds(), p, 3);
}
function formatMicroseconds(d, p) {
  return formatMilliseconds(d, p) + "000";
}
function formatMonthNumber(d, p) {
  return pad2(d.getMonth() + 1, p, 2);
}
function formatMinutes(d, p) {
  return pad2(d.getMinutes(), p, 2);
}
function formatSeconds(d, p) {
  return pad2(d.getSeconds(), p, 2);
}
function formatWeekdayNumberMonday(d) {
  var day = d.getDay();
  return day === 0 ? 7 : day;
}
function formatWeekNumberSunday(d, p) {
  return pad2(timeSunday.count(timeYear(d) - 1, d), p, 2);
}
function dISO(d) {
  var day = d.getDay();
  return day >= 4 || day === 0 ? timeThursday(d) : timeThursday.ceil(d);
}
function formatWeekNumberISO(d, p) {
  d = dISO(d);
  return pad2(timeThursday.count(timeYear(d), d) + (timeYear(d).getDay() === 4), p, 2);
}
function formatWeekdayNumberSunday(d) {
  return d.getDay();
}
function formatWeekNumberMonday(d, p) {
  return pad2(timeMonday.count(timeYear(d) - 1, d), p, 2);
}
function formatYear2(d, p) {
  return pad2(d.getFullYear() % 100, p, 2);
}
function formatYearISO(d, p) {
  d = dISO(d);
  return pad2(d.getFullYear() % 100, p, 2);
}
function formatFullYear(d, p) {
  return pad2(d.getFullYear() % 1e4, p, 4);
}
function formatFullYearISO(d, p) {
  var day = d.getDay();
  d = day >= 4 || day === 0 ? timeThursday(d) : timeThursday.ceil(d);
  return pad2(d.getFullYear() % 1e4, p, 4);
}
function formatZone(d) {
  var z = d.getTimezoneOffset();
  return (z > 0 ? "-" : (z *= -1, "+")) + pad2(z / 60 | 0, "0", 2) + pad2(z % 60, "0", 2);
}
function formatUTCDayOfMonth(d, p) {
  return pad2(d.getUTCDate(), p, 2);
}
function formatUTCHour24(d, p) {
  return pad2(d.getUTCHours(), p, 2);
}
function formatUTCHour12(d, p) {
  return pad2(d.getUTCHours() % 12 || 12, p, 2);
}
function formatUTCDayOfYear(d, p) {
  return pad2(1 + utcDay.count(utcYear(d), d), p, 3);
}
function formatUTCMilliseconds(d, p) {
  return pad2(d.getUTCMilliseconds(), p, 3);
}
function formatUTCMicroseconds(d, p) {
  return formatUTCMilliseconds(d, p) + "000";
}
function formatUTCMonthNumber(d, p) {
  return pad2(d.getUTCMonth() + 1, p, 2);
}
function formatUTCMinutes(d, p) {
  return pad2(d.getUTCMinutes(), p, 2);
}
function formatUTCSeconds(d, p) {
  return pad2(d.getUTCSeconds(), p, 2);
}
function formatUTCWeekdayNumberMonday(d) {
  var dow = d.getUTCDay();
  return dow === 0 ? 7 : dow;
}
function formatUTCWeekNumberSunday(d, p) {
  return pad2(utcSunday.count(utcYear(d) - 1, d), p, 2);
}
function UTCdISO(d) {
  var day = d.getUTCDay();
  return day >= 4 || day === 0 ? utcThursday(d) : utcThursday.ceil(d);
}
function formatUTCWeekNumberISO(d, p) {
  d = UTCdISO(d);
  return pad2(utcThursday.count(utcYear(d), d) + (utcYear(d).getUTCDay() === 4), p, 2);
}
function formatUTCWeekdayNumberSunday(d) {
  return d.getUTCDay();
}
function formatUTCWeekNumberMonday(d, p) {
  return pad2(utcMonday.count(utcYear(d) - 1, d), p, 2);
}
function formatUTCYear(d, p) {
  return pad2(d.getUTCFullYear() % 100, p, 2);
}
function formatUTCYearISO(d, p) {
  d = UTCdISO(d);
  return pad2(d.getUTCFullYear() % 100, p, 2);
}
function formatUTCFullYear(d, p) {
  return pad2(d.getUTCFullYear() % 1e4, p, 4);
}
function formatUTCFullYearISO(d, p) {
  var day = d.getUTCDay();
  d = day >= 4 || day === 0 ? utcThursday(d) : utcThursday.ceil(d);
  return pad2(d.getUTCFullYear() % 1e4, p, 4);
}
function formatUTCZone() {
  return "+0000";
}
function formatLiteralPercent() {
  return "%";
}
function formatUnixTimestamp(d) {
  return +d;
}
function formatUnixTimestampSeconds(d) {
  return Math.floor(+d / 1e3);
}

// node_modules/d3-time-format/src/defaultLocale.js
var locale2;
var timeFormat;
var timeParse;
var utcFormat;
var utcParse;
defaultLocale2({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function defaultLocale2(definition) {
  locale2 = formatLocale(definition);
  timeFormat = locale2.format;
  timeParse = locale2.parse;
  utcFormat = locale2.utcFormat;
  utcParse = locale2.utcParse;
  return locale2;
}

// node_modules/d3-time-format/src/isoFormat.js
var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";
function formatIsoNative(date) {
  return date.toISOString();
}
var formatIso = Date.prototype.toISOString ? formatIsoNative : utcFormat(isoSpecifier);

// node_modules/d3-time-format/src/isoParse.js
function parseIsoNative(string) {
  var date = new Date(string);
  return isNaN(date) ? null : date;
}
var parseIso = +/* @__PURE__ */ new Date("2000-01-01T00:00:00.000Z") ? parseIsoNative : utcParse(isoSpecifier);

// node_modules/ideogram/src/js/init/organism-metadata.js
var organismMetadata = {
  9606: {
    commonName: "Human",
    scientificName: "Homo sapiens",
    assemblies: {
      default: "GCF_000001405.26",
      // GRCh38
      GRCh38: "GCF_000001405.26",
      GRCh37: "GCF_000001405.13",
      NCBI36: "GCF_000001405.12"
    },
    hasGeneCache: true,
    hasParalogCache: true,
    hasInteractionCache: true,
    hasGeneStructureCache: true,
    hasProteinCache: true,
    hasSynonymCache: true,
    hasTissueCache: true,
    hasVariantCache: true
  },
  10090: {
    commonName: "Mouse",
    scientificName: "Mus musculus",
    assemblies: {
      default: "GCF_000001635.27",
      // GRCm39
      GRCm39: "GCF_000001635.27",
      GRCm38: "GCF_000001635.20",
      MGSCv37: "GCF_000001635.18"
    },
    hasGeneCache: true,
    hasParalogCache: true,
    hasInteractionCache: true,
    hasGeneStructureCache: true,
    hasProteinCache: true,
    hasSynonymCache: true
  },
  9598: {
    commonName: "Chimpanzee",
    scientificName: "Pan troglodytes",
    assemblies: {
      "default": "GCF_028858775.1",
      "NHGRI_mPanTro3-v1.1-hic.freeze_pri": "GCF_028858775.1",
      "Pan_tro 3.0": "GCF_000001515.7"
    },
    hasGeneCache: true,
    hasSynonymCache: true
  },
  10116: {
    commonName: "Rat",
    scientificName: "Rattus norvegicus",
    assemblies: {
      "default": "GCF_000001895.5",
      "Rnor_6.0": "GCF_000001895.5"
    },
    hasGeneCache: true,
    hasParalogCache: true,
    hasSynonymCache: true
  },
  3702: {
    commonName: "Thale cress",
    scientificName: "Arabidopsis thaliana",
    assemblies: {
      default: "GCF_000001735.3",
      // TAIR10
      TAIR10: "GCF_000001735.3"
    }
  },
  4530: {
    commonName: "Rice",
    scientificName: "Oryza sativa",
    assemblies: {
      "default": "GCA_001433935.1",
      "IRGSP-1.0": "GCA_001433935.1"
    }
  },
  4577: {
    commonName: "Maize",
    scientificName: "Zea mays",
    assemblies: {
      "default": "GCA_000005005.5",
      "IRGSP-1.0": "GCA_001433935.1"
    }
  },
  4641: {
    commonName: "Banana",
    scientificName: "Musa acuminata",
    assemblies: {
      default: "mock"
    }
  },
  7227: {
    commonName: "Fly",
    scientificName: "Drosophila melanogaster",
    assemblies: {
      "default": "GCA_000001215.4",
      "Release 6 plus ISO1 MT": "GCA_000001215.4"
    },
    hasSynonymCache: true
  },
  7165: {
    commonName: "Mosquito",
    scientificName: "Anopheles gambiae",
    assemblies: {
      default: "GCF_000005575.2"
    }
  },
  746128: {
    commonName: "Aspergillis fumigatus",
    scientificName: "Aspergillis fumigatus",
    assemblies: {
      default: "GCF_000002655.1"
    }
  },
  227321: {
    scientificName: "Aspergillus nidulans",
    assemblies: {
      default: "GCF_000149205.2"
    }
  },
  5061: {
    commonName: "black mold",
    scientificName: "Aspergillus niger",
    assemblies: {
      default: "GCF_003184595.1"
    }
  },
  5062: {
    commonName: "koji",
    scientificName: "Aspergillus oryzae",
    assemblies: {
      default: "GCF_000184455.2"
    }
  },
  15368: {
    commonName: "stiff brome",
    scientificName: "Brachypodium distachyon",
    assemblies: {
      default: "GCF_000005505.3"
    }
  },
  60711: {
    commonName: "green monkey",
    scientificName: "Chlorocebus sabaeus",
    assemblies: {
      default: "GCF_015252025.1"
    }
  },
  7719: {
    commonName: "Vase tunicate",
    scientificName: "Ciona intestinalis",
    assemblies: {
      default: "GCF_000224145.3"
    }
  },
  9685: {
    commonName: "Cat",
    scientificName: "Felis catus",
    assemblies: {
      default: "GCF_000181335.3"
    },
    hasGeneCache: true
  },
  9031: {
    commonName: "Chicken",
    scientificName: "Gallus gallus",
    assemblies: {
      default: "GCF_000002315.6"
    },
    hasGeneCache: true,
    hasParalogCache: true
  },
  9593: {
    commonName: "Gorilla",
    scientificName: "Gorilla gorilla",
    assemblies: {
      default: "GCF_008122165.1"
    }
  },
  4513: {
    commonName: "Barley",
    scientificName: "Hordeum vulgare",
    assemblies: {
      default: "GCA_901482405.1"
    }
  },
  9541: {
    commonName: "Crab-eating macaque",
    scientificName: "Macaca fascicularis",
    assemblies: {
      default: "GCF_000364345.1"
    },
    hasGeneCache: true,
    hasParalogCache: true,
    hasSynonymCache: true
  },
  9544: {
    commonName: "Rhesus macaque",
    scientificName: "Macaca mulatta",
    assemblies: {
      default: "GCF_003339765.1"
    },
    hasGeneCache: true,
    hasParalogCache: true,
    hasSynonymCache: true
  },
  9597: {
    commonName: "Bonobo",
    scientificName: "Pan paniscus",
    assemblies: {
      default: "GCF_013052645.1"
    }
  },
  9615: {
    commonName: "Dog",
    scientificName: "Canis lupus familiaris",
    assemblies: {
      default: "GCF_014441545.1"
    },
    hasGeneCache: true,
    hasParalogCache: true,
    hasSynonymCache: true
  },
  9823: {
    commonName: "Pig",
    scientificName: "Sus scrofa",
    assemblies: {
      default: "GCF_000003025.6"
    },
    hasGeneCache: true,
    hasParalogCache: true,
    hasSynonymCache: true
  },
  4932: {
    commonName: "Yeast",
    scientificName: "Saccharomyces cerevisiae",
    assemblies: {
      default: "GCA_000146045.2",
      R64: "GCA_000146045.2"
    }
  },
  5833: {
    commonName: "malaria parasite",
    scientificName: "Plasmodium falciparum",
    assemblies: {
      default: "GCA_000002765.3",
      GCA_000002765: "GCA_000002765.3"
    }
  },
  6239: {
    commonName: "worm",
    scientificName: "Caenorhabditis elegans",
    assemblies: {
      default: "GCF_000002985.6"
    },
    hasGeneCache: true,
    hasParalogCache: true,
    hasSynonymCache: true
  },
  4081: {
    commonName: "tomato",
    scientificName: "Solanum lycopersicum",
    assemblies: {
      default: "GCF_000188115.4"
    }
  },
  4072: {
    commonName: "pepper",
    scientificName: "Capsicum annuum",
    assemblies: {
      default: "GCF_000710875.1"
    }
  },
  3694: {
    commonName: "black cottonwood",
    scientificName: "Populus trichocarpa",
    assemblies: {
      default: "GCF_000002775.5"
    }
  }
};

// node_modules/ideogram/src/js/lib.js
var d3 = Object.assign(
  {},
  src_exports,
  src_exports3,
  src_exports2,
  src_exports4
);
d3.select = select_default2;
d3.selectAll = selectAll_default2;
d3.scaleLinear = linear3;
d3.max = max2;
function assemblyIsAccession() {
  return "assembly" in this.config && /(GCF_|GCA_)/.test(this.config.assembly);
}
function hasNonGenBankAssembly(ideo) {
  return "assembly" in ideo.config && /(GCA_)/.test(ideo.config.assembly) === false;
}
function getDir(dir) {
  var script, tmp, protocol, dataDir, ideogramInLeaf, scripts = document.scripts, version2 = Ideogram.version;
  if (location.pathname.includes("/examples/vanilla/") === false) {
    return `https://cdn.jsdelivr.net/npm/ideogram@${version2}/dist/data/${dir}`;
  }
  for (var i = 0; i < scripts.length; i++) {
    script = scripts[i];
    ideogramInLeaf = /ideogram/.test(script.src.split("/").slice(-1));
    if ("src" in script && ideogramInLeaf) {
      tmp = script.src.split("//");
      protocol = tmp[0];
      tmp = "/" + tmp[1].split("/").slice(0, -2).join("/");
      dataDir = protocol + "//" + tmp + "/data/" + dir;
      return dataDir;
    }
  }
  return "../data/" + dir;
}
function fetchWithRetry(url, isRetry = false) {
  return fetch(url).then((response) => {
    if (response.ok) {
      return response;
    } else {
      if (isRetry === false) {
        var urlWithoutExtension = url.replace(".json", "");
        return fetchWithRetry(urlWithoutExtension, true);
      } else {
        throw Error("Fetch failed for " + url);
      }
    }
  });
}
function getDataDir() {
  return getDir("bands/native/");
}
function round(coord) {
  return Math.round(coord * 100) / 100;
}
function formatSiPrefix(num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function(item2) {
    return num >= item2.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + " " + item.symbol : "0";
}
function onDidRotate(chrModel) {
  call(this.onDidRotateCallback, chrModel);
}
function getSvg() {
  return d3.select(this.selector).node();
}
function fetchWithAuth(url, contentType) {
  var ideo = this, config2 = ideo.config, headers = new Headers();
  if (config2.accessToken) {
    headers = new Headers({ Authorization: "Bearer " + config2.accessToken });
  }
  if (contentType === "text") {
    return d3.text(url, { headers });
  } else {
    return d3.json(url, { headers });
  }
}
function getEarlyTaxid(name2) {
  name2 = slug(name2);
  for (const taxid in organismMetadata) {
    const organism = organismMetadata[taxid];
    const commonName = slug(organism.commonName);
    const scientificName = slug(organism.scientificName);
    if (commonName === name2 || scientificName === name2) {
      return taxid;
    }
  }
  return null;
}
function getTaxid(name2) {
  var organism, taxid, commonName, scientificName, ideo = this, organisms = ideo.organisms;
  name2 = slug(name2);
  for (taxid in organisms) {
    organism = organisms[taxid];
    commonName = slug(organism.commonName);
    scientificName = slug(organism.scientificName);
    if (commonName === name2 || scientificName === name2) {
      return taxid;
    }
  }
  return null;
}
function getCommonName(taxid) {
  var ideo = this;
  if (taxid in ideo.organisms) {
    return ideo.organisms[taxid].commonName;
  }
  return null;
}
function getScientificName(taxid) {
  var ideo = this;
  if (taxid in ideo.organisms) {
    return ideo.organisms[taxid].scientificName;
  }
  return null;
}
function camel(str) {
  const camelCaseString = str.split(/[ _-]/g).map((token, i) => {
    if (i > 0) {
      return token[0].toUpperCase() + token.slice(1);
    } else {
      return token;
    }
  }).join("");
  return camelCaseString;
}
function slug(value) {
  if (typeof value === "undefined") return "";
  return value.toLowerCase().replace(/ /g, "-");
}
function isRoman(s) {
  return /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i.test(s);
}
function parseRoman(s) {
  var val = { M: 1e3, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 };
  return s.toUpperCase().split("").reduce(function(r2, a, i, aa) {
    return val[a] < val[aa[i + 1]] ? r2 - val[a] : r2 + val[a];
  }, 0);
}
function downloadPng(ideo) {
  var ideoSvg = document.querySelector(ideo.selector);
  var canvas = document.createElement("canvas");
  var canvasId = "_ideo-undisplayed-dl-canvas";
  canvas.setAttribute("style", "display: none");
  canvas.setAttribute("id", canvasId);
  var width = ideoSvg.width.baseVal.value + 30;
  var ideoSvgClone = ideoSvg.cloneNode(true);
  ideoSvgClone.style.left = "";
  canvas.setAttribute("width", width);
  document.body.appendChild(canvas);
  function triggerDownload(imgUrl) {
    var evt = new MouseEvent("click", {
      view: window,
      bubbles: false,
      cancelable: true
    });
    var a = document.createElement("a");
    a.setAttribute("download", "ideogram.png");
    a.setAttribute("href", imgUrl);
    a.setAttribute("target", "_blank");
    a.setAttribute("id", "_ideo-undisplayed-dl-image-link");
    a.setAttribute("style", "display: none;");
    document.body.appendChild(a);
    a.dispatchEvent(evt);
    canvas.remove();
  }
  var canvas = document.getElementById(canvasId);
  canvas.width *= 2;
  canvas.height *= 2;
  var ctx = canvas.getContext("2d");
  ctx.setTransform(2, 0, 0, 2, 0, 0);
  ctx.imageSmoothingEnabled = false;
  var data = new XMLSerializer().serializeToString(ideoSvgClone);
  var domUrl = window.URL || window.webkitURL || window;
  var img = new Image();
  var svgBlob = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
  var url = domUrl.createObjectURL(svgBlob);
  img.onload = function() {
    ctx.drawImage(img, 0, 0);
    domUrl.revokeObjectURL(url);
    var imgUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    triggerDownload(imgUrl);
  };
  img.src = url;
}
function getFont(ideo) {
  const config2 = ideo.config;
  let family = "sans-serif";
  if (config2.fontFamily) {
    family = config2.fontFamily;
  }
  let weight = 600;
  if (config2.fontWeight) {
    weight = config2.fontWeight;
  }
  const labelSize = config2.annotLabelSize ? config2.annotLabelSize : 13;
  const font = weight + " " + labelSize + "px " + family;
  return font;
}
function getTextSize(text, ideo) {
  var font = getFont(ideo);
  var canvas = getTextSize.canvas || (getTextSize.canvas = document.createElement("canvas"));
  var context = canvas.getContext("2d");
  context.font = font;
  var metrics = context.measureText(text);
  var right2 = metrics.actualBoundingBoxRight;
  var left2 = metrics.actualBoundingBoxLeft;
  var width = Math.abs(left2) + Math.abs(right2);
  const height = Math.abs(metrics.actualBoundingBoxAscent) + Math.abs(metrics.actualBoundingBoxDescent);
  return { width, height };
}
function deepCopy(array3) {
  return JSON.parse(JSON.stringify(array3));
}
function pluralize(word, count2) {
  return word + (count2 > 1 ? "s" : "");
}
function hexToRgb(hex2) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex2 = hex2.replace(shorthandRegex, function(m, r2, g, b) {
    return r2 + r2 + g + g + b + b;
  });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex2);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
function componentToHex(c) {
  var hex2 = parseInt(c, 10).toString(16);
  return hex2.length === 1 ? "0" + hex2 : hex2;
}
function rgbToHex(r2, g, b) {
  return "#" + componentToHex(r2) + componentToHex(g) + componentToHex(b);
}
function rgbColorToHex(color2) {
  const rgb2 = color2.split("rgb(")[1].trim(")").split(", ");
  const hex2 = rgbToHex(rgb2[0], rgb2[1], rgb2[2]);
  return hex2;
}
function ensureContrast(color2, bgColor = "#FFF") {
  if (color2.slice(0, 3) === "rgb") color2 = rgbColorToHex(color2);
  if (color2[0] !== "#") return color2;
  const rgb2 = hexToRgb(color2);
  if (bgColor === "#FFF") {
    if (rgb2.r > 150 && rgb2.g > 150 && rgb2.b > 150) {
      color2 = `rgb(${rgb2.r - 30}, ${rgb2.g - 30}, ${rgb2.b - 30})`;
    }
    if (rgb2.r > 200 && rgb2.g > 200 && rgb2.b > 200) {
      color2 = `rgb(${rgb2.r - 50}, ${rgb2.g - 50}, ${rgb2.b - 50})`;
    }
  } else {
    const bgRgb = hexToRgb(bgColor);
    const contrast = getContrast(
      [rgb2.r, rgb2.g, rgb2.b],
      [bgRgb.r, bgRgb.g, bgRgb.b]
    );
    if (contrast < 3) {
      color2 = `rgb(230, 230, 230)`;
    }
  }
  return color2;
}
var RED = 0.2126;
var GREEN = 0.7152;
var BLUE = 0.0722;
var GAMMA = 2.4;
function luminance(r2, g, b) {
  var a = [r2, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, GAMMA);
  });
  return a[0] * RED + a[1] * GREEN + a[2] * BLUE;
}
function getContrast(rgb1, rgb2) {
  var lum1 = luminance(...rgb1);
  var lum2 = luminance(...rgb2);
  var brightest = Math.max(lum1, lum2);
  var darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}
function adjustBrightness(color2, brightness) {
  if (color2[0] !== "#") return color2;
  const rgb2 = hexToRgb(color2);
  const br = brightness;
  const newRgb = { r: rgb2.r * br, g: rgb2.g * br, b: rgb2.b * br };
  const newColor = `rgb(${newRgb.r}, ${newRgb.g}, ${newRgb.b})`;
  return newColor;
}
function getTippyConfig() {
  return {
    theme: "light-border",
    allowHTML: true,
    popperOptions: {
      // Docs: https://atomiks.github.io/tippyjs/v6/all-props/#popperoptions
      modifiers: [
        // Docs: https://popper.js.org/docs/v2/modifiers
        {
          name: "flip"
        }
      ]
    },
    onShow: function() {
      document.querySelectorAll("[data-tippy-root]").forEach((tippyNode) => tippyNode.remove());
    }
  };
}

// node_modules/ideogram/src/js/bands/styles.js
var staticColors;
var staticCss;
var staticGradients;
staticColors = [
  ["gneg", "#FFF", "#FFF", "#DDD"],
  ["gpos25", "#C8C8C8", "#DDD", "#BBB"],
  ["gpos33", "#BBB", "#BBB", "#AAA"],
  ["gpos50", "#999", "#AAA", "#888"],
  ["gpos66", "#888", "#888", "#666"],
  ["gpos75", "#777", "#777", "#444"],
  ["gpos100", "#444", "#666", "#000"],
  ["acen", "#FEE", "#FEE", "#FDD"],
  ["noBands", "#BBB", "#BBB", "#AAA"]
];
staticCss = '#_ideogram {padding-left: 5px;} #_ideogram .labeled {padding-left: 15px;} #_ideogram.labeledLeft {padding-left: 15px; padding-top: 15px;} #_ideogram text {font: 9px Tahoma; fill: #000;} #_ideogram .italic {font-style: italic;} #_ideogram .chromosome {cursor: pointer; fill: #AAA;}#_ideogram.no-rotate .chromosome {cursor: default;} #_ideogram .chrLabel, #_ideogram .annot {cursor: pointer;}#_ideogram .chrSetLabel {font-weight: bolder;}#_ideogram .ghost {opacity: 0.2;}#_ideogram .hidden {display: none;}#_ideogram .bandLabelStalk line {stroke: #AAA; stroke-width: 1;}#_ideogram .syntenyBorder {stroke:#AAA;stroke-width:1;}#_ideogram rect.cursor {  fill: #F00;  stroke: #F00;  fill-opacity: .3;  shape-rendering: crispEdges;}#_ideogram .brush .selection {  fill: #F00;  stroke: #F00;  fill-opacity: .3;  shape-rendering: crispEdges;}#_ideogram .noBands {fill: #AAA;}#_ideogram .gneg {fill: #FFF}#_ideogram .gpos25 {fill: #BBB}#_ideogram .gpos33 {fill: #AAA}#_ideogram .gpos50 {fill: #888}#_ideogram .gpos66 {fill: #666}#_ideogram .gpos75 {fill: #444}#_ideogram .gpos100 {fill: #000}#_ideogram .gpos {fill: #000}#_ideogram .acen {fill: #FDD}#_ideogram .stalk {fill: #CCE;}#_ideogram .gvar {fill: #DDF}#_ideogram.faint .gneg {fill: #FFF}#_ideogram.faint .gpos25 {fill: #EEE}#_ideogram.faint .gpos33 {fill: #EEE}#_ideogram.faint .gpos50 {fill: #EEE}#_ideogram.faint .gpos66 {fill: #EEE}#_ideogram.faint .gpos75 {fill: #EEE}#_ideogram.faint .gpos100 {fill: #DDD}#_ideogram.faint .gpos {fill: #DDD}#_ideogram.faint .acen {fill: #FEE}#_ideogram.faint .stalk {fill: #EEF;}#_ideogram.faint .gvar {fill: #EEF}#_ideogram .gneg {fill: url("#gneg")} #_ideogram .gpos25 {fill: url("#gpos25")} #_ideogram .gpos33 {fill: url("#gpos33")} #_ideogram .gpos50 {fill: url("#gpos50")} #_ideogram .gpos66 {fill: url("#gpos66")} #_ideogram .gpos75 {fill: url("#gpos75")} #_ideogram .gpos100 {fill: url("#gpos100")} #_ideogram .gpos {fill: url("#gpos100")} #_ideogram .acen {fill: url("#acen")} #_ideogram .stalk {fill: url("#stalk")} #_ideogram .gvar {fill: url("#gvar")} #_ideogram .noBands {fill: url("#noBands")} #_ideogram .chromosome {fill: url("#noBands")} ';
staticGradients = '<pattern id="stalk" width="2" height="1" patternUnits="userSpaceOnUse" patternTransform="rotate(30 0 0)"><rect x="0" y="0" width="10" height="2" fill="#CCE" /> <line x1="0" y1="0" x2="0" y2="100%" style="stroke:#88B; stroke-width:0.7;" /></pattern><pattern id="gvar" width="2" height="1" patternUnits="userSpaceOnUse" patternTransform="rotate(-30 0 0)"><rect x="0" y="0" width="10" height="2" fill="#DDF" /> <line x1="0" y1="0" x2="0" y2="100%" style="stroke:#99C; stroke-width:0.7;" /></pattern>';

// node_modules/ideogram/src/js/init/configure.js
function configurePloidy(ideo) {
  if (!ideo.config.ploidy) ideo.config.ploidy = 1;
  if (ideo.config.ploidy > 1) {
    ideo.sexChromosomes = {};
    if (!ideo.config.sex) {
      ideo.config.sex = "male";
    }
    if (ideo.config.ploidy === 2 && !ideo.config.ancestors) {
      ideo.config.ancestors = { M: "#ffb6c1", P: "#add8e6" };
      ideo.config.ploidyDesc = "MP";
    }
  }
}
function configureHeight(ideo) {
  var container, rect, chrHeight;
  if (!ideo.config.chrHeight) {
    container = ideo.config.container;
    rect = document.querySelector(container).getBoundingClientRect();
    if (ideo.config.orientation === "vertical") {
      chrHeight = rect.height;
    } else {
      chrHeight = rect.width;
    }
    if (container === "body" || chrHeight === 0) chrHeight = 400;
    ideo.config.chrHeight = chrHeight;
  }
}
function configureWidth(ideo) {
  var chrWidth, chrHeight;
  if (!ideo.config.chrWidth) {
    chrWidth = 10;
    chrHeight = ideo.config.chrHeight;
    if (chrHeight < 900 && chrHeight > 500) {
      chrWidth = Math.round(chrHeight / 40);
    } else if (chrHeight >= 900) {
      chrWidth = Math.round(chrHeight / 45);
    }
    ideo.config.chrWidth = chrWidth;
  }
}
function configureMargin(ideo) {
  if (ideo.config.geometry && ideo.config.geometry === "collinear") {
    if ("chrMargin" in ideo.config === false) {
      ideo.config.chrMargin = 0;
    }
    return;
  }
  if (!ideo.config.chrMargin) {
    if (ideo.config.ploidy === 1) {
      ideo.config.chrMargin = 10;
    } else {
      ideo.config.chrMargin = Math.round(ideo.config.chrWidth / 4);
    }
  }
  if (ideo.config.showBandLabels) ideo.config.chrMargin += 20;
}
function configureBump(ideo) {
  ideo.bump = Math.round(ideo.config.chrHeight / 125);
  ideo.adjustedBump = false;
  if (ideo.config.chrHeight < 200) {
    ideo.adjustedBump = true;
    ideo.bump = 4;
  }
}
function configureSingleChromosome(config2, ideo) {
  if (config2.chromosome) {
    ideo.config.chromosomes = [config2.chromosome];
    if ("showBandLabels" in config2 === false) {
      ideo.config.showBandLabels = true;
    }
    if ("rotatable" in config2 === false) ideo.config.rotatable = false;
  }
}
function configureOrganisms(config2, ideo) {
  ideo.organisms = Object.assign({}, organismMetadata);
  if (config2.taxid && config2.organismMetadata) ideo.organisms[config2.taxid] = config2.organismMetadata;
  ideo.organismsWithBands = Object.assign({}, ideo.organisms);
}
function configureCallbacks(config2, ideo) {
  if (config2.onLoad) ideo.onLoadCallback = config2.onLoad;
  if (config2.onLoadAnnots) ideo.onLoadAnnotsCallback = config2.onLoadAnnots;
  if (config2.onBeforeDrawAnnots) {
    ideo.onBeforeDrawAnnotsCallback = config2.onBeforeDrawAnnots;
  }
  if (config2.onDrawAnnots) ideo.onDrawAnnotsCallback = config2.onDrawAnnots;
  if (config2.onBrushMove) ideo.onBrushMoveCallback = config2.onBrushMove;
  if (config2.onBrushEnd) ideo.onBrushEndCallback = config2.onBrushEnd;
  if (config2.onCursorMove) ideo.onCursorMoveCallback = config2.onCursorMove;
  if (config2.onDidRotate) ideo.onDidRotateCallback = config2.onDidRotate;
  if (config2.onWillShowAnnotTooltip) {
    ideo.onWillShowAnnotTooltipCallback = config2.onWillShowAnnotTooltip;
  }
  if (config2.onDidShowAnnotTooltip) {
    ideo.onDidShowAnnotTooltipCallback = config2.onDidShowAnnotTooltip;
  }
  if (config2.onClickAnnot) {
    ideo.onClickAnnotCallback = config2.onClickAnnot;
  }
}
function configureMiscellaneous(ideo) {
  ideo.chromosomesArray = [];
  ideo.coordinateSystem = "iscn";
  ideo.maxLength = { bp: 0, iscn: 0 };
  ideo.chromosomes = {};
  ideo.numChromosomes = 0;
  if (!ideo.config.debug) ideo.config.debug = false;
  if (!ideo.config.dataDir) ideo.config.dataDir = ideo.getDataDir();
  if (!ideo.config.container) ideo.config.container = "body";
  ideo.selector = ideo.config.container + " #_ideogram";
  if (!ideo.config.resolution) ideo.config.resolution = "";
  if (!ideo.config.orientation) ideo.config.orientation = "vertical";
  if (!ideo.config.brush) ideo.config.brush = null;
  if (!ideo.config.rows) ideo.config.rows = 1;
  if ("showChromosomeLabels" in ideo.config === false) {
    ideo.config.showChromosomeLabels = true;
  }
  if (!ideo.config.showNonNuclearChromosomes) {
    ideo.config.showNonNuclearChromosomes = false;
  }
  if (!ideo.config.chromosomeScale) {
    ideo.config.chromosomeScale = "absolute";
  }
  if (!ideo.config.showTools) ideo.config.showTools = false;
}
function configureBands(ideo) {
  if (!ideo.config.showBandLabels) ideo.config.showBandLabels = false;
  if ("showFullyBanded" in ideo.config === false) {
    ideo.config.showFullyBanded = true;
  }
  ideo.bandsToShow = [];
  ideo.bandData = {};
}
var configuredCss = staticCss;
function configureTextStyle(ideo) {
  const config2 = ideo.config;
  if (!config2.chrLabelSize) ideo.config.chrLabelSize = 9;
  if (!config2.chrLabelColor) ideo.config.chrLabelColor = "#000";
  if (!config2.fontFamily) ideo.config.fontFamily = "";
  const size = `font-size: ${config2.chrLabelSize}px`;
  const color2 = `fill: ${config2.chrLabelColor}`;
  const fontFamily = `font-family: ${config2.fontFamily}`;
  configuredCss += `#_ideogram text {${fontFamily}; ${size}; ${color2};}`;
  configuredCss += `#_ideogramLabel text {${fontFamily};}`;
}
function configure(config2) {
  this.config = JSON.parse(JSON.stringify(config2));
  configureMiscellaneous(this);
  configurePloidy(this);
  configureBands(this);
  configureHeight(this);
  configureWidth(this);
  configureMargin(this);
  configureCallbacks(config2, this);
  configureOrganisms(config2, this);
  configureBump(this);
  configureSingleChromosome(config2, this);
  configureTextStyle(this);
  this.initAnnotSettings();
  if (!this.config.geometry || this.config.geometry === "parallel") {
    this.config.chrMargin += this.config.chrWidth;
    if (this.config.annotationsLayout === "heatmap") {
      this.config.chrMargin += this.config.annotTracksHeight;
    } else {
      this.config.chrMargin += this.config.annotTracksHeight * 2;
    }
  }
  this.init();
}

// node_modules/ideogram/src/js/collinear-vertical.js
function labelGenomes(ideo) {
  ideo.config.taxids.forEach((taxid, i) => {
    var org = ideo.organisms[taxid];
    var scientificName = org.scientificName;
    d3.select(ideo.selector).append("text").attr("class", "genomeLabel italic").attr("x", 55 + 200 * i).attr("y", 10).text(scientificName).attr("text-anchor", "middle");
  });
}
function rearrangeChromosomes(chrSets, yOffsets, x, ideo) {
  var i, chrSet, y2, chrLabelX, adjustedX, chr, taxid, orgIndex, config2 = ideo.config, chrLabelSize = config2.chrLabelSize;
  for (i = 0; i < chrSets.length; i++) {
    chrSet = chrSets[i];
    y2 = yOffsets[i] + 23 - chrLabelSize;
    chr = ideo.chromosomesArray[i];
    taxid = chr.id.split("-")[1];
    orgIndex = ideo.config.taxids.indexOf(taxid);
    adjustedX = x - orgIndex * 200 - 30 - 5;
    if (orgIndex === 0) {
      chrLabelX = -34;
      adjustedX += ideo.config.chrWidth * 2 - 16;
    } else {
      chrLabelX = ideo.config.chrWidth * 2 - 24;
    }
    if (config2.showChromosomeLabels) {
      const labelSpan = chrSet.querySelector(".chrLabel > tspan");
      labelSpan.setAttribute("x", chrLabelX);
      labelSpan.setAttribute("dy", chrLabelSize - 8);
      chrSet.querySelector(".chrLabel").setAttribute("text-anchor", "start");
    }
    chrSet.setAttribute(
      "transform",
      "rotate(90) translate(" + y2 + "," + adjustedX + ")"
    );
    chrSet.querySelector(".chromosome").setAttribute(
      "transform",
      "translate(-13, 10)"
    );
  }
  labelGenomes(ideo);
}
function getYOffsets(chrSets, ideo) {
  var yOffsets, i, index2, chr, prevChr, y2, prevWidth, prevY, yBump, taxid, seenTaxids = {};
  yOffsets = [];
  for (i = 0; i < chrSets.length; i++) {
    chr = ideo.chromosomesArray[i];
    taxid = chr.id.split("-")[1];
    index2 = i === 0 ? i : i - 1;
    prevChr = ideo.chromosomesArray[index2];
    if (i === 0 || taxid in seenTaxids === false) {
      y2 = 20;
      seenTaxids[taxid] = 1;
    } else {
      prevWidth = prevChr.width;
      prevY = yOffsets[index2];
      yBump = ideo.config.showChromosomeLabels ? 0 : 2;
      y2 = prevY + prevWidth + yBump + ideo.config.chrMargin;
    }
    yOffsets.push(y2);
  }
  return yOffsets;
}
function collinearizeVerticalChromosomes(ideo) {
  var chrSets, yOffsets, x, height, width, config2 = ideo.config;
  ideo.config.annotLabelHeight = 12;
  if ("demarcateCollinearChromosomes" in ideo.config === false) {
    ideo.config.demarcateCollinearChromosomes = true;
  }
  chrSets = document.querySelectorAll(".chromosome-set");
  x = -40;
  yOffsets = getYOffsets(chrSets, ideo);
  rearrangeChromosomes(chrSets, yOffsets, x, ideo);
  width = Math.round(yOffsets.slice(-1)[0] + 70);
  if (config2.multiorganism) {
    height *= 8;
    var maxHeight = 0;
    yOffsets.forEach((d) => {
      if (d > maxHeight) maxHeight = d;
    });
    height = maxHeight + 30;
  } else {
    height = xOffsets.slice(-1)[0] + 30;
  }
  d3.select(ideo.selector).attr("height", height).attr("width", width);
  d3.select("#_ideogramTrackLabelContainer").remove();
  d3.select("#_ideogramInnerWrap").insert("div", ":first-child").attr("id", "_ideogramTrackLabelContainer").style("position", "absolute");
}
var collinear_vertical_default = collinearizeVerticalChromosomes;

// node_modules/ideogram/src/js/collinear.js
function labelGenomes2(ideo) {
  ideo.config.taxids.forEach((taxid, i) => {
    var org = ideo.organisms[taxid];
    var config2 = ideo.config;
    var scientificName = org.scientificName;
    d3.select(ideo.selector).append("text").attr("class", "genomeLabel italic").attr("x", 5).attr("y", config2.chrLabelSize + (200 + 3 * config2.chrWidth) * i).text(scientificName);
  });
}
function rearrangeChromosomes2(chrSets, xOffsets2, y2, ideo) {
  var i, chr, chrSet, taxid, x, adjustedY, orgIndex, chrLabelY, config2 = ideo.config, chrWidth = config2.chrWidth, chrLabelSize = config2.chrLabelSize;
  for (i = 0; i < chrSets.length; i++) {
    chrSet = chrSets[i];
    x = xOffsets2[i];
    chr = ideo.chromosomesArray[i];
    taxid = chr.id.split("-")[1];
    orgIndex = config2.taxids.indexOf(taxid);
    adjustedY = y2 + orgIndex * 200;
    if (orgIndex === 0 && ideo.config.multiorganism) {
      chrLabelY = chrLabelSize - 4;
      adjustedY += chrWidth * 2 + chrLabelSize;
    } else {
      chrLabelY = chrWidth * 2 + chrLabelSize + 2;
    }
    if (ideo.config.showChromosomeLabels) {
      chrSet.querySelector(".chrLabel").setAttribute("y", chrLabelY);
      chrSet.querySelector(".chrLabel").setAttribute("text-anchor", "middle");
    }
    chrSet.setAttribute("transform", "translate(" + x + "," + adjustedY + ")");
    chrSet.querySelector(".chromosome").setAttribute(
      "transform",
      "translate(-13, 10)"
    );
  }
  if (config2.multiorganism) {
    labelGenomes2(ideo);
  }
}
function getXOffsets(chrSets, ideo) {
  var xOffsets2, i, index2, chr, prevChr, x, prevWidth, prevX, xBump, taxid, seenTaxids = {};
  xOffsets2 = [];
  for (i = 0; i < chrSets.length; i++) {
    chr = ideo.chromosomesArray[i];
    taxid = chr.id.split("-")[1];
    index2 = i === 0 ? i : i - 1;
    prevChr = ideo.chromosomesArray[index2];
    if (i === 0 || taxid in seenTaxids === false) {
      x = 20;
      seenTaxids[taxid] = 1;
    } else {
      prevWidth = prevChr.width;
      prevX = xOffsets2[index2];
      xBump = ideo.config.showChromosomeLabels ? 0 : 2;
      x = prevX + prevWidth + xBump + ideo.config.chrMargin;
    }
    xOffsets2.push(x);
  }
  return xOffsets2;
}
function collinearizeChromosomes(ideo) {
  var chrSets, xOffsets2, y2, height, width, config2 = ideo.config, annotHeight = config2.annotationHeight || 0;
  if (config2.orientation === "vertical") {
    collinear_vertical_default(ideo);
    return;
  }
  ideo.config.annotLabelHeight = 12;
  var annotLabelHeight = ideo.config.annotLabelHeight;
  if ("demarcateCollinearChromosomes" in ideo.config === false) {
    ideo.config.demarcateCollinearChromosomes = true;
  }
  chrSets = document.querySelectorAll(".chromosome-set");
  y2 = config2.numAnnotTracks * (annotHeight + annotLabelHeight + 4) - config2.chrWidth + 1;
  xOffsets2 = getXOffsets(chrSets, ideo);
  rearrangeChromosomes2(chrSets, xOffsets2, y2, ideo);
  height = y2 + config2.chrWidth * 2 + 20;
  if (config2.multiorganism) {
    height *= 8;
    var maxWidth = 0;
    xOffsets2.forEach((d) => {
      if (d > maxWidth) maxWidth = d;
    });
    width = maxWidth + 20;
  } else {
    width = xOffsets2.slice(-1)[0] + 20;
  }
  d3.select(ideo.selector).attr("width", width).attr("height", height);
  d3.select("#_ideogramTrackLabelContainer").remove();
  d3.select("#_ideogramInnerWrap").insert("div", ":first-child").attr("id", "_ideogramTrackLabelContainer").style("position", "absolute");
}
var collinear_default = collinearizeChromosomes;

// node_modules/fflate/esm/browser.js
var ch2 = {};
var wk = function(c, id2, msg, transfer, cb) {
  var w = new Worker(ch2[id2] || (ch2[id2] = URL.createObjectURL(new Blob([
    c + ';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'
  ], { type: "text/javascript" }))));
  w.onmessage = function(e3) {
    var d = e3.data, ed = d.$e$;
    if (ed) {
      var err2 = new Error(ed[0]);
      err2["code"] = ed[1];
      err2.stack = ed[2];
      cb(err2, null);
    } else
      cb(null, d);
  };
  w.postMessage(msg, transfer);
  return w;
};
var u8 = Uint8Array;
var u16 = Uint16Array;
var u32 = Uint32Array;
var fleb = new u8([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]);
var fdeb = new u8([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]);
var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var freb = function(eb, start3) {
  var b = new u16(31);
  for (var i = 0; i < 31; ++i) {
    b[i] = start3 += 1 << eb[i - 1];
  }
  var r2 = new u32(b[30]);
  for (var i = 1; i < 30; ++i) {
    for (var j = b[i]; j < b[i + 1]; ++j) {
      r2[j] = j - b[i] << 5 | i;
    }
  }
  return [b, r2];
};
var _a = freb(fleb, 2);
var fl = _a[0];
var revfl = _a[1];
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0);
var fd = _b[0];
var revfd = _b[1];
var rev = new u16(32768);
for (i = 0; i < 32768; ++i) {
  x = (i & 43690) >>> 1 | (i & 21845) << 1;
  x = (x & 52428) >>> 2 | (x & 13107) << 2;
  x = (x & 61680) >>> 4 | (x & 3855) << 4;
  rev[i] = ((x & 65280) >>> 8 | (x & 255) << 8) >>> 1;
}
var x;
var i;
var hMap = function(cd, mb, r2) {
  var s = cd.length;
  var i = 0;
  var l = new u16(mb);
  for (; i < s; ++i) {
    if (cd[i])
      ++l[cd[i] - 1];
  }
  var le = new u16(mb);
  for (i = 0; i < mb; ++i) {
    le[i] = le[i - 1] + l[i - 1] << 1;
  }
  var co;
  if (r2) {
    co = new u16(1 << mb);
    var rvb = 15 - mb;
    for (i = 0; i < s; ++i) {
      if (cd[i]) {
        var sv = i << 4 | cd[i];
        var r_1 = mb - cd[i];
        var v = le[cd[i] - 1]++ << r_1;
        for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
          co[rev[v] >>> rvb] = sv;
        }
      }
    }
  } else {
    co = new u16(s);
    for (i = 0; i < s; ++i) {
      if (cd[i]) {
        co[i] = rev[le[cd[i] - 1]++] >>> 15 - cd[i];
      }
    }
  }
  return co;
};
var flt = new u8(288);
for (i = 0; i < 144; ++i)
  flt[i] = 8;
var i;
for (i = 144; i < 256; ++i)
  flt[i] = 9;
var i;
for (i = 256; i < 280; ++i)
  flt[i] = 7;
var i;
for (i = 280; i < 288; ++i)
  flt[i] = 8;
var i;
var fdt = new u8(32);
for (i = 0; i < 32; ++i)
  fdt[i] = 5;
var i;
var flm = hMap(flt, 9, 0);
var flrm = hMap(flt, 9, 1);
var fdm = hMap(fdt, 5, 0);
var fdrm = hMap(fdt, 5, 1);
var max3 = function(a) {
  var m = a[0];
  for (var i = 1; i < a.length; ++i) {
    if (a[i] > m)
      m = a[i];
  }
  return m;
};
var bits = function(d, p, m) {
  var o = p / 8 | 0;
  return (d[o] | d[o + 1] << 8) >> (p & 7) & m;
};
var bits16 = function(d, p) {
  var o = p / 8 | 0;
  return (d[o] | d[o + 1] << 8 | d[o + 2] << 16) >> (p & 7);
};
var shft = function(p) {
  return (p + 7) / 8 | 0;
};
var slc = function(v, s, e3) {
  if (s == null || s < 0)
    s = 0;
  if (e3 == null || e3 > v.length)
    e3 = v.length;
  var n2 = new (v.BYTES_PER_ELEMENT == 2 ? u16 : v.BYTES_PER_ELEMENT == 4 ? u32 : u8)(e3 - s);
  n2.set(v.subarray(s, e3));
  return n2;
};
var ec = [
  "unexpected EOF",
  "invalid block type",
  "invalid length/literal",
  "invalid distance",
  "stream finished",
  "no stream handler",
  ,
  "no callback",
  "invalid UTF-8 data",
  "extra field too long",
  "date not in range 1980-2099",
  "filename too long",
  "stream finishing",
  "invalid zip data"
  // determined by unknown compression method
];
var err = function(ind, msg, nt) {
  var e3 = new Error(msg || ec[ind]);
  e3.code = ind;
  if (Error.captureStackTrace)
    Error.captureStackTrace(e3, err);
  if (!nt)
    throw e3;
  return e3;
};
var inflt = function(dat, buf, st) {
  var sl = dat.length;
  if (!sl || st && st.f && !st.l)
    return buf || new u8(0);
  var noBuf = !buf || st;
  var noSt = !st || st.i;
  if (!st)
    st = {};
  if (!buf)
    buf = new u8(sl * 3);
  var cbuf = function(l2) {
    var bl = buf.length;
    if (l2 > bl) {
      var nbuf = new u8(Math.max(bl * 2, l2));
      nbuf.set(buf);
      buf = nbuf;
    }
  };
  var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
  var tbts = sl * 8;
  do {
    if (!lm) {
      final = bits(dat, pos, 1);
      var type2 = bits(dat, pos + 1, 3);
      pos += 3;
      if (!type2) {
        var s = shft(pos) + 4, l = dat[s - 4] | dat[s - 3] << 8, t4 = s + l;
        if (t4 > sl) {
          if (noSt)
            err(0);
          break;
        }
        if (noBuf)
          cbuf(bt + l);
        buf.set(dat.subarray(s, t4), bt);
        st.b = bt += l, st.p = pos = t4 * 8, st.f = final;
        continue;
      } else if (type2 == 1)
        lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
      else if (type2 == 2) {
        var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
        var tl = hLit + bits(dat, pos + 5, 31) + 1;
        pos += 14;
        var ldt = new u8(tl);
        var clt = new u8(19);
        for (var i = 0; i < hcLen; ++i) {
          clt[clim[i]] = bits(dat, pos + i * 3, 7);
        }
        pos += hcLen * 3;
        var clb = max3(clt), clbmsk = (1 << clb) - 1;
        var clm = hMap(clt, clb, 1);
        for (var i = 0; i < tl; ) {
          var r2 = clm[bits(dat, pos, clbmsk)];
          pos += r2 & 15;
          var s = r2 >>> 4;
          if (s < 16) {
            ldt[i++] = s;
          } else {
            var c = 0, n2 = 0;
            if (s == 16)
              n2 = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i - 1];
            else if (s == 17)
              n2 = 3 + bits(dat, pos, 7), pos += 3;
            else if (s == 18)
              n2 = 11 + bits(dat, pos, 127), pos += 7;
            while (n2--)
              ldt[i++] = c;
          }
        }
        var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
        lbt = max3(lt);
        dbt = max3(dt);
        lm = hMap(lt, lbt, 1);
        dm = hMap(dt, dbt, 1);
      } else
        err(1);
      if (pos > tbts) {
        if (noSt)
          err(0);
        break;
      }
    }
    if (noBuf)
      cbuf(bt + 131072);
    var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
    var lpos = pos;
    for (; ; lpos = pos) {
      var c = lm[bits16(dat, pos) & lms], sym = c >>> 4;
      pos += c & 15;
      if (pos > tbts) {
        if (noSt)
          err(0);
        break;
      }
      if (!c)
        err(2);
      if (sym < 256)
        buf[bt++] = sym;
      else if (sym == 256) {
        lpos = pos, lm = null;
        break;
      } else {
        var add = sym - 254;
        if (sym > 264) {
          var i = sym - 257, b = fleb[i];
          add = bits(dat, pos, (1 << b) - 1) + fl[i];
          pos += b;
        }
        var d = dm[bits16(dat, pos) & dms], dsym = d >>> 4;
        if (!d)
          err(3);
        pos += d & 15;
        var dt = fd[dsym];
        if (dsym > 3) {
          var b = fdeb[dsym];
          dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
        }
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
        if (noBuf)
          cbuf(bt + 131072);
        var end2 = bt + add;
        for (; bt < end2; bt += 4) {
          buf[bt] = buf[bt - dt];
          buf[bt + 1] = buf[bt + 1 - dt];
          buf[bt + 2] = buf[bt + 2 - dt];
          buf[bt + 3] = buf[bt + 3 - dt];
        }
        bt = end2;
      }
    }
    st.l = lm, st.p = lpos, st.b = bt, st.f = final;
    if (lm)
      final = 1, st.m = lbt, st.d = dm, st.n = dbt;
  } while (!final);
  return bt == buf.length ? buf : slc(buf, 0, bt);
};
var wbits = function(d, p, v) {
  v <<= p & 7;
  var o = p / 8 | 0;
  d[o] |= v;
  d[o + 1] |= v >>> 8;
};
var wbits16 = function(d, p, v) {
  v <<= p & 7;
  var o = p / 8 | 0;
  d[o] |= v;
  d[o + 1] |= v >>> 8;
  d[o + 2] |= v >>> 16;
};
var hTree = function(d, mb) {
  var t4 = [];
  for (var i = 0; i < d.length; ++i) {
    if (d[i])
      t4.push({ s: i, f: d[i] });
  }
  var s = t4.length;
  var t22 = t4.slice();
  if (!s)
    return [et, 0];
  if (s == 1) {
    var v = new u8(t4[0].s + 1);
    v[t4[0].s] = 1;
    return [v, 1];
  }
  t4.sort(function(a, b) {
    return a.f - b.f;
  });
  t4.push({ s: -1, f: 25001 });
  var l = t4[0], r2 = t4[1], i0 = 0, i1 = 1, i2 = 2;
  t4[0] = { s: -1, f: l.f + r2.f, l, r: r2 };
  while (i1 != s - 1) {
    l = t4[t4[i0].f < t4[i2].f ? i0++ : i2++];
    r2 = t4[i0 != i1 && t4[i0].f < t4[i2].f ? i0++ : i2++];
    t4[i1++] = { s: -1, f: l.f + r2.f, l, r: r2 };
  }
  var maxSym = t22[0].s;
  for (var i = 1; i < s; ++i) {
    if (t22[i].s > maxSym)
      maxSym = t22[i].s;
  }
  var tr = new u16(maxSym + 1);
  var mbt = ln(t4[i1 - 1], tr, 0);
  if (mbt > mb) {
    var i = 0, dt = 0;
    var lft = mbt - mb, cst = 1 << lft;
    t22.sort(function(a, b) {
      return tr[b.s] - tr[a.s] || a.f - b.f;
    });
    for (; i < s; ++i) {
      var i2_1 = t22[i].s;
      if (tr[i2_1] > mb) {
        dt += cst - (1 << mbt - tr[i2_1]);
        tr[i2_1] = mb;
      } else
        break;
    }
    dt >>>= lft;
    while (dt > 0) {
      var i2_2 = t22[i].s;
      if (tr[i2_2] < mb)
        dt -= 1 << mb - tr[i2_2]++ - 1;
      else
        ++i;
    }
    for (; i >= 0 && dt; --i) {
      var i2_3 = t22[i].s;
      if (tr[i2_3] == mb) {
        --tr[i2_3];
        ++dt;
      }
    }
    mbt = mb;
  }
  return [new u8(tr), mbt];
};
var ln = function(n2, l, d) {
  return n2.s == -1 ? Math.max(ln(n2.l, l, d + 1), ln(n2.r, l, d + 1)) : l[n2.s] = d;
};
var lc = function(c) {
  var s = c.length;
  while (s && !c[--s])
    ;
  var cl = new u16(++s);
  var cli = 0, cln = c[0], cls = 1;
  var w = function(v) {
    cl[cli++] = v;
  };
  for (var i = 1; i <= s; ++i) {
    if (c[i] == cln && i != s)
      ++cls;
    else {
      if (!cln && cls > 2) {
        for (; cls > 138; cls -= 138)
          w(32754);
        if (cls > 2) {
          w(cls > 10 ? cls - 11 << 5 | 28690 : cls - 3 << 5 | 12305);
          cls = 0;
        }
      } else if (cls > 3) {
        w(cln), --cls;
        for (; cls > 6; cls -= 6)
          w(8304);
        if (cls > 2)
          w(cls - 3 << 5 | 8208), cls = 0;
      }
      while (cls--)
        w(cln);
      cls = 1;
      cln = c[i];
    }
  }
  return [cl.subarray(0, cli), s];
};
var clen = function(cf, cl) {
  var l = 0;
  for (var i = 0; i < cl.length; ++i)
    l += cf[i] * cl[i];
  return l;
};
var wfblk = function(out, pos, dat) {
  var s = dat.length;
  var o = shft(pos + 2);
  out[o] = s & 255;
  out[o + 1] = s >>> 8;
  out[o + 2] = out[o] ^ 255;
  out[o + 3] = out[o + 1] ^ 255;
  for (var i = 0; i < s; ++i)
    out[o + i + 4] = dat[i];
  return (o + 4 + s) * 8;
};
var wblk = function(dat, out, final, syms, lf, df, eb, li, bs, bl, p) {
  wbits(out, p++, final);
  ++lf[256];
  var _a2 = hTree(lf, 15), dlt = _a2[0], mlb = _a2[1];
  var _b2 = hTree(df, 15), ddt = _b2[0], mdb = _b2[1];
  var _c = lc(dlt), lclt = _c[0], nlc = _c[1];
  var _d = lc(ddt), lcdt = _d[0], ndc = _d[1];
  var lcfreq = new u16(19);
  for (var i = 0; i < lclt.length; ++i)
    lcfreq[lclt[i] & 31]++;
  for (var i = 0; i < lcdt.length; ++i)
    lcfreq[lcdt[i] & 31]++;
  var _e = hTree(lcfreq, 7), lct = _e[0], mlcb = _e[1];
  var nlcc = 19;
  for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc)
    ;
  var flen = bl + 5 << 3;
  var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
  var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + (2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18]);
  if (flen <= ftlen && flen <= dtlen)
    return wfblk(out, p, dat.subarray(bs, bs + bl));
  var lm, ll, dm, dl;
  wbits(out, p, 1 + (dtlen < ftlen)), p += 2;
  if (dtlen < ftlen) {
    lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
    var llm = hMap(lct, mlcb, 0);
    wbits(out, p, nlc - 257);
    wbits(out, p + 5, ndc - 1);
    wbits(out, p + 10, nlcc - 4);
    p += 14;
    for (var i = 0; i < nlcc; ++i)
      wbits(out, p + 3 * i, lct[clim[i]]);
    p += 3 * nlcc;
    var lcts = [lclt, lcdt];
    for (var it = 0; it < 2; ++it) {
      var clct = lcts[it];
      for (var i = 0; i < clct.length; ++i) {
        var len = clct[i] & 31;
        wbits(out, p, llm[len]), p += lct[len];
        if (len > 15)
          wbits(out, p, clct[i] >>> 5 & 127), p += clct[i] >>> 12;
      }
    }
  } else {
    lm = flm, ll = flt, dm = fdm, dl = fdt;
  }
  for (var i = 0; i < li; ++i) {
    if (syms[i] > 255) {
      var len = syms[i] >>> 18 & 31;
      wbits16(out, p, lm[len + 257]), p += ll[len + 257];
      if (len > 7)
        wbits(out, p, syms[i] >>> 23 & 31), p += fleb[len];
      var dst = syms[i] & 31;
      wbits16(out, p, dm[dst]), p += dl[dst];
      if (dst > 3)
        wbits16(out, p, syms[i] >>> 5 & 8191), p += fdeb[dst];
    } else {
      wbits16(out, p, lm[syms[i]]), p += ll[syms[i]];
    }
  }
  wbits16(out, p, lm[256]);
  return p + ll[256];
};
var deo = new u32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
var et = new u8(0);
var dflt = function(dat, lvl, plvl, pre, post, lst) {
  var s = dat.length;
  var o = new u8(pre + s + 5 * (1 + Math.ceil(s / 7e3)) + post);
  var w = o.subarray(pre, o.length - post);
  var pos = 0;
  if (!lvl || s < 8) {
    for (var i = 0; i <= s; i += 65535) {
      var e3 = i + 65535;
      if (e3 >= s) {
        w[pos >> 3] = lst;
      }
      pos = wfblk(w, pos + 1, dat.subarray(i, e3));
    }
  } else {
    var opt = deo[lvl - 1];
    var n2 = opt >>> 13, c = opt & 8191;
    var msk_1 = (1 << plvl) - 1;
    var prev = new u16(32768), head = new u16(msk_1 + 1);
    var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
    var hsh = function(i2) {
      return (dat[i2] ^ dat[i2 + 1] << bs1_1 ^ dat[i2 + 2] << bs2_1) & msk_1;
    };
    var syms = new u32(25e3);
    var lf = new u16(288), df = new u16(32);
    var lc_1 = 0, eb = 0, i = 0, li = 0, wi = 0, bs = 0;
    for (; i < s; ++i) {
      var hv = hsh(i);
      var imod = i & 32767, pimod = head[hv];
      prev[imod] = pimod;
      head[hv] = imod;
      if (wi <= i) {
        var rem = s - i;
        if ((lc_1 > 7e3 || li > 24576) && rem > 423) {
          pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i - bs, pos);
          li = lc_1 = eb = 0, bs = i;
          for (var j = 0; j < 286; ++j)
            lf[j] = 0;
          for (var j = 0; j < 30; ++j)
            df[j] = 0;
        }
        var l = 2, d = 0, ch_1 = c, dif = imod - pimod & 32767;
        if (rem > 2 && hv == hsh(i - dif)) {
          var maxn = Math.min(n2, rem) - 1;
          var maxd = Math.min(32767, i);
          var ml = Math.min(258, rem);
          while (dif <= maxd && --ch_1 && imod != pimod) {
            if (dat[i + l] == dat[i + l - dif]) {
              var nl = 0;
              for (; nl < ml && dat[i + nl] == dat[i + nl - dif]; ++nl)
                ;
              if (nl > l) {
                l = nl, d = dif;
                if (nl > maxn)
                  break;
                var mmd = Math.min(dif, nl - 2);
                var md = 0;
                for (var j = 0; j < mmd; ++j) {
                  var ti = i - dif + j + 32768 & 32767;
                  var pti = prev[ti];
                  var cd = ti - pti + 32768 & 32767;
                  if (cd > md)
                    md = cd, pimod = ti;
                }
              }
            }
            imod = pimod, pimod = prev[imod];
            dif += imod - pimod + 32768 & 32767;
          }
        }
        if (d) {
          syms[li++] = 268435456 | revfl[l] << 18 | revfd[d];
          var lin = revfl[l] & 31, din = revfd[d] & 31;
          eb += fleb[lin] + fdeb[din];
          ++lf[257 + lin];
          ++df[din];
          wi = i + l;
          ++lc_1;
        } else {
          syms[li++] = dat[i];
          ++lf[dat[i]];
        }
      }
    }
    pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i - bs, pos);
    if (!lst && pos & 7)
      pos = wfblk(w, pos + 1, et);
  }
  return slc(o, 0, pre + shft(pos) + post);
};
var crct = function() {
  var t4 = new Int32Array(256);
  for (var i = 0; i < 256; ++i) {
    var c = i, k = 9;
    while (--k)
      c = (c & 1 && -306674912) ^ c >>> 1;
    t4[i] = c;
  }
  return t4;
}();
var crc = function() {
  var c = -1;
  return {
    p: function(d) {
      var cr = c;
      for (var i = 0; i < d.length; ++i)
        cr = crct[cr & 255 ^ d[i]] ^ cr >>> 8;
      c = cr;
    },
    d: function() {
      return ~c;
    }
  };
};
var adler = function() {
  var a = 1, b = 0;
  return {
    p: function(d) {
      var n2 = a, m = b;
      var l = d.length | 0;
      for (var i = 0; i != l; ) {
        var e3 = Math.min(i + 2655, l);
        for (; i < e3; ++i)
          m += n2 += d[i];
        n2 = (n2 & 65535) + 15 * (n2 >> 16), m = (m & 65535) + 15 * (m >> 16);
      }
      a = n2, b = m;
    },
    d: function() {
      a %= 65521, b %= 65521;
      return (a & 255) << 24 | a >>> 8 << 16 | (b & 255) << 8 | b >>> 8;
    }
  };
};
var dopt = function(dat, opt, pre, post, st) {
  return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : 12 + opt.mem, pre, post, !st);
};
var mrg = function(a, b) {
  var o = {};
  for (var k in a)
    o[k] = a[k];
  for (var k in b)
    o[k] = b[k];
  return o;
};
var wcln = function(fn2, fnStr, td2) {
  var dt = fn2();
  var st = fn2.toString();
  var ks = st.slice(st.indexOf("[") + 1, st.lastIndexOf("]")).replace(/\s+/g, "").split(",");
  for (var i = 0; i < dt.length; ++i) {
    var v = dt[i], k = ks[i];
    if (typeof v == "function") {
      fnStr += ";" + k + "=";
      var st_1 = v.toString();
      if (v.prototype) {
        if (st_1.indexOf("[native code]") != -1) {
          var spInd = st_1.indexOf(" ", 8) + 1;
          fnStr += st_1.slice(spInd, st_1.indexOf("(", spInd));
        } else {
          fnStr += st_1;
          for (var t4 in v.prototype)
            fnStr += ";" + k + ".prototype." + t4 + "=" + v.prototype[t4].toString();
        }
      } else
        fnStr += st_1;
    } else
      td2[k] = v;
  }
  return [fnStr, td2];
};
var ch = [];
var cbfs = function(v) {
  var tl = [];
  for (var k in v) {
    if (v[k].buffer) {
      tl.push((v[k] = new v[k].constructor(v[k])).buffer);
    }
  }
  return tl;
};
var wrkr = function(fns, init3, id2, cb) {
  var _a2;
  if (!ch[id2]) {
    var fnStr = "", td_1 = {}, m = fns.length - 1;
    for (var i = 0; i < m; ++i)
      _a2 = wcln(fns[i], fnStr, td_1), fnStr = _a2[0], td_1 = _a2[1];
    ch[id2] = wcln(fns[m], fnStr, td_1);
  }
  var td2 = mrg({}, ch[id2][1]);
  return wk(ch[id2][0] + ";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=" + init3.toString() + "}", id2, td2, cbfs(td2), cb);
};
var bInflt = function() {
  return [u8, u16, u32, fleb, fdeb, clim, fl, fd, flrm, fdrm, rev, ec, hMap, max3, bits, bits16, shft, slc, err, inflt, inflateSync, pbf, gu8];
};
var bDflt = function() {
  return [u8, u16, u32, fleb, fdeb, clim, revfl, revfd, flm, flt, fdm, fdt, rev, deo, et, hMap, wbits, wbits16, hTree, ln, lc, clen, wfblk, wblk, shft, slc, dflt, dopt, deflateSync, pbf];
};
var guze = function() {
  return [gzs, gzl];
};
var zule = function() {
  return [zlv];
};
var pbf = function(msg) {
  return postMessage(msg, [msg.buffer]);
};
var gu8 = function(o) {
  return o && o.size && new u8(o.size);
};
var astrm = function(strm) {
  strm.ondata = function(dat, final) {
    return postMessage([dat, final], [dat.buffer]);
  };
  return function(ev) {
    return strm.push(ev.data[0], ev.data[1]);
  };
};
var astrmify = function(fns, strm, opts, init3, id2) {
  var t4;
  var w = wrkr(fns, init3, id2, function(err2, dat) {
    if (err2)
      w.terminate(), strm.ondata.call(strm, err2);
    else {
      if (dat[1])
        w.terminate();
      strm.ondata.call(strm, err2, dat[0], dat[1]);
    }
  });
  w.postMessage(opts);
  strm.push = function(d, f) {
    if (!strm.ondata)
      err(5);
    if (t4)
      strm.ondata(err(4, 0, 1), null, !!f);
    w.postMessage([d, t4 = f], [d.buffer]);
  };
  strm.terminate = function() {
    w.terminate();
  };
};
var b22 = function(d, b) {
  return d[b] | d[b + 1] << 8;
};
var b42 = function(d, b) {
  return (d[b] | d[b + 1] << 8 | d[b + 2] << 16 | d[b + 3] << 24) >>> 0;
};
var b82 = function(d, b) {
  return b42(d, b) + b42(d, b + 4) * 4294967296;
};
var wbytes = function(d, b, v) {
  for (; v; ++b)
    d[b] = v, v >>>= 8;
};
var gzh = function(c, o) {
  var fn2 = o.filename;
  c[0] = 31, c[1] = 139, c[2] = 8, c[8] = o.level < 2 ? 4 : o.level == 9 ? 2 : 0, c[9] = 3;
  if (o.mtime != 0)
    wbytes(c, 4, Math.floor(new Date(o.mtime || Date.now()) / 1e3));
  if (fn2) {
    c[3] = 8;
    for (var i = 0; i <= fn2.length; ++i)
      c[i + 10] = fn2.charCodeAt(i);
  }
};
var gzs = function(d) {
  if (d[0] != 31 || d[1] != 139 || d[2] != 8)
    err(6, "invalid gzip data");
  var flg = d[3];
  var st = 10;
  if (flg & 4)
    st += d[10] | (d[11] << 8) + 2;
  for (var zs = (flg >> 3 & 1) + (flg >> 4 & 1); zs > 0; zs -= !d[st++])
    ;
  return st + (flg & 2);
};
var gzl = function(d) {
  var l = d.length;
  return (d[l - 4] | d[l - 3] << 8 | d[l - 2] << 16 | d[l - 1] << 24) >>> 0;
};
var gzhl = function(o) {
  return 10 + (o.filename && o.filename.length + 1 || 0);
};
var zlh = function(c, o) {
  var lv = o.level, fl2 = lv == 0 ? 0 : lv < 6 ? 1 : lv == 9 ? 3 : 2;
  c[0] = 120, c[1] = fl2 << 6 | (fl2 ? 32 - 2 * fl2 : 1);
};
var zlv = function(d) {
  if ((d[0] & 15) != 8 || d[0] >>> 4 > 7 || (d[0] << 8 | d[1]) % 31)
    err(6, "invalid zlib data");
  if (d[1] & 32)
    err(6, "invalid zlib data: preset dictionaries not supported");
};
function AsyncCmpStrm(opts, cb) {
  if (!cb && typeof opts == "function")
    cb = opts, opts = {};
  this.ondata = cb;
  return opts;
}
var Deflate = function() {
  function Deflate2(opts, cb) {
    if (!cb && typeof opts == "function")
      cb = opts, opts = {};
    this.ondata = cb;
    this.o = opts || {};
  }
  Deflate2.prototype.p = function(c, f) {
    this.ondata(dopt(c, this.o, 0, 0, !f), f);
  };
  Deflate2.prototype.push = function(chunk, final) {
    if (!this.ondata)
      err(5);
    if (this.d)
      err(4);
    this.d = final;
    this.p(chunk, final || false);
  };
  return Deflate2;
}();
var AsyncDeflate = /* @__PURE__ */ function() {
  function AsyncDeflate2(opts, cb) {
    astrmify([
      bDflt,
      function() {
        return [astrm, Deflate];
      }
    ], this, AsyncCmpStrm.call(this, opts, cb), function(ev) {
      var strm = new Deflate(ev.data);
      onmessage = astrm(strm);
    }, 6);
  }
  return AsyncDeflate2;
}();
function deflateSync(data, opts) {
  return dopt(data, opts || {}, 0, 0);
}
var Inflate = function() {
  function Inflate2(cb) {
    this.s = {};
    this.p = new u8(0);
    this.ondata = cb;
  }
  Inflate2.prototype.e = function(c) {
    if (!this.ondata)
      err(5);
    if (this.d)
      err(4);
    var l = this.p.length;
    var n2 = new u8(l + c.length);
    n2.set(this.p), n2.set(c, l), this.p = n2;
  };
  Inflate2.prototype.c = function(final) {
    this.d = this.s.i = final || false;
    var bts = this.s.b;
    var dt = inflt(this.p, this.o, this.s);
    this.ondata(slc(dt, bts, this.s.b), this.d);
    this.o = slc(dt, this.s.b - 32768), this.s.b = this.o.length;
    this.p = slc(this.p, this.s.p / 8 | 0), this.s.p &= 7;
  };
  Inflate2.prototype.push = function(chunk, final) {
    this.e(chunk), this.c(final);
  };
  return Inflate2;
}();
var AsyncInflate = /* @__PURE__ */ function() {
  function AsyncInflate2(cb) {
    this.ondata = cb;
    astrmify([
      bInflt,
      function() {
        return [astrm, Inflate];
      }
    ], this, 0, function() {
      var strm = new Inflate();
      onmessage = astrm(strm);
    }, 7);
  }
  return AsyncInflate2;
}();
function inflateSync(data, out) {
  return inflt(data, out);
}
var Gzip = function() {
  function Gzip2(opts, cb) {
    this.c = crc();
    this.l = 0;
    this.v = 1;
    Deflate.call(this, opts, cb);
  }
  Gzip2.prototype.push = function(chunk, final) {
    Deflate.prototype.push.call(this, chunk, final);
  };
  Gzip2.prototype.p = function(c, f) {
    this.c.p(c);
    this.l += c.length;
    var raw = dopt(c, this.o, this.v && gzhl(this.o), f && 8, !f);
    if (this.v)
      gzh(raw, this.o), this.v = 0;
    if (f)
      wbytes(raw, raw.length - 8, this.c.d()), wbytes(raw, raw.length - 4, this.l);
    this.ondata(raw, f);
  };
  return Gzip2;
}();
var Gunzip = function() {
  function Gunzip2(cb) {
    this.v = 1;
    Inflate.call(this, cb);
  }
  Gunzip2.prototype.push = function(chunk, final) {
    Inflate.prototype.e.call(this, chunk);
    if (this.v) {
      var s = this.p.length > 3 ? gzs(this.p) : 4;
      if (s >= this.p.length && !final)
        return;
      this.p = this.p.subarray(s), this.v = 0;
    }
    if (final) {
      if (this.p.length < 8)
        err(6, "invalid gzip data");
      this.p = this.p.subarray(0, -8);
    }
    Inflate.prototype.c.call(this, final);
  };
  return Gunzip2;
}();
var AsyncGunzip = /* @__PURE__ */ function() {
  function AsyncGunzip2(cb) {
    this.ondata = cb;
    astrmify([
      bInflt,
      guze,
      function() {
        return [astrm, Inflate, Gunzip];
      }
    ], this, 0, function() {
      var strm = new Gunzip();
      onmessage = astrm(strm);
    }, 9);
  }
  return AsyncGunzip2;
}();
function gunzipSync(data, out) {
  return inflt(data.subarray(gzs(data), -8), out || new u8(gzl(data)));
}
var Zlib = function() {
  function Zlib2(opts, cb) {
    this.c = adler();
    this.v = 1;
    Deflate.call(this, opts, cb);
  }
  Zlib2.prototype.push = function(chunk, final) {
    Deflate.prototype.push.call(this, chunk, final);
  };
  Zlib2.prototype.p = function(c, f) {
    this.c.p(c);
    var raw = dopt(c, this.o, this.v && 2, f && 4, !f);
    if (this.v)
      zlh(raw, this.o), this.v = 0;
    if (f)
      wbytes(raw, raw.length - 4, this.c.d());
    this.ondata(raw, f);
  };
  return Zlib2;
}();
var Unzlib = function() {
  function Unzlib2(cb) {
    this.v = 1;
    Inflate.call(this, cb);
  }
  Unzlib2.prototype.push = function(chunk, final) {
    Inflate.prototype.e.call(this, chunk);
    if (this.v) {
      if (this.p.length < 2 && !final)
        return;
      this.p = this.p.subarray(2), this.v = 0;
    }
    if (final) {
      if (this.p.length < 4)
        err(6, "invalid zlib data");
      this.p = this.p.subarray(0, -4);
    }
    Inflate.prototype.c.call(this, final);
  };
  return Unzlib2;
}();
var AsyncUnzlib = /* @__PURE__ */ function() {
  function AsyncUnzlib2(cb) {
    this.ondata = cb;
    astrmify([
      bInflt,
      zule,
      function() {
        return [astrm, Inflate, Unzlib];
      }
    ], this, 0, function() {
      var strm = new Unzlib();
      onmessage = astrm(strm);
    }, 11);
  }
  return AsyncUnzlib2;
}();
function unzlibSync(data, out) {
  return inflt((zlv(data), data.subarray(2, -4)), out);
}
var Decompress = function() {
  function Decompress2(cb) {
    this.G = Gunzip;
    this.I = Inflate;
    this.Z = Unzlib;
    this.ondata = cb;
  }
  Decompress2.prototype.push = function(chunk, final) {
    if (!this.ondata)
      err(5);
    if (!this.s) {
      if (this.p && this.p.length) {
        var n2 = new u8(this.p.length + chunk.length);
        n2.set(this.p), n2.set(chunk, this.p.length);
      } else
        this.p = chunk;
      if (this.p.length > 2) {
        var _this_1 = this;
        var cb = function() {
          _this_1.ondata.apply(_this_1, arguments);
        };
        this.s = this.p[0] == 31 && this.p[1] == 139 && this.p[2] == 8 ? new this.G(cb) : (this.p[0] & 15) != 8 || this.p[0] >> 4 > 7 || (this.p[0] << 8 | this.p[1]) % 31 ? new this.I(cb) : new this.Z(cb);
        this.s.push(this.p, final);
        this.p = null;
      }
    } else
      this.s.push(chunk, final);
  };
  return Decompress2;
}();
var AsyncDecompress = function() {
  function AsyncDecompress2(cb) {
    this.G = AsyncGunzip;
    this.I = AsyncInflate;
    this.Z = AsyncUnzlib;
    this.ondata = cb;
  }
  AsyncDecompress2.prototype.push = function(chunk, final) {
    Decompress.prototype.push.call(this, chunk, final);
  };
  return AsyncDecompress2;
}();
function decompressSync(data, out) {
  return data[0] == 31 && data[1] == 139 && data[2] == 8 ? gunzipSync(data, out) : (data[0] & 15) != 8 || data[0] >> 4 > 7 || (data[0] << 8 | data[1]) % 31 ? inflateSync(data, out) : unzlibSync(data, out);
}
var te = typeof TextEncoder != "undefined" && new TextEncoder();
var td = typeof TextDecoder != "undefined" && new TextDecoder();
var tds = 0;
try {
  td.decode(et, { stream: true });
  tds = 1;
} catch (e3) {
}
var dutf8 = function(d) {
  for (var r2 = "", i = 0; ; ) {
    var c = d[i++];
    var eb = (c > 127) + (c > 223) + (c > 239);
    if (i + eb > d.length)
      return [r2, slc(d, i - 1)];
    if (!eb)
      r2 += String.fromCharCode(c);
    else if (eb == 3) {
      c = ((c & 15) << 18 | (d[i++] & 63) << 12 | (d[i++] & 63) << 6 | d[i++] & 63) - 65536, r2 += String.fromCharCode(55296 | c >> 10, 56320 | c & 1023);
    } else if (eb & 1)
      r2 += String.fromCharCode((c & 31) << 6 | d[i++] & 63);
    else
      r2 += String.fromCharCode((c & 15) << 12 | (d[i++] & 63) << 6 | d[i++] & 63);
  }
};
var DecodeUTF8 = function() {
  function DecodeUTF82(cb) {
    this.ondata = cb;
    if (tds)
      this.t = new TextDecoder();
    else
      this.p = et;
  }
  DecodeUTF82.prototype.push = function(chunk, final) {
    if (!this.ondata)
      err(5);
    final = !!final;
    if (this.t) {
      this.ondata(this.t.decode(chunk, { stream: true }), final);
      if (final) {
        if (this.t.decode().length)
          err(8);
        this.t = null;
      }
      return;
    }
    if (!this.p)
      err(4);
    var dat = new u8(this.p.length + chunk.length);
    dat.set(this.p);
    dat.set(chunk, this.p.length);
    var _a2 = dutf8(dat), ch3 = _a2[0], np = _a2[1];
    if (final) {
      if (np.length)
        err(8);
      this.p = null;
    } else
      this.p = np;
    this.ondata(ch3, final);
  };
  return DecodeUTF82;
}();
var EncodeUTF8 = function() {
  function EncodeUTF82(cb) {
    this.ondata = cb;
  }
  EncodeUTF82.prototype.push = function(chunk, final) {
    if (!this.ondata)
      err(5);
    if (this.d)
      err(4);
    this.ondata(strToU8(chunk), this.d = final || false);
  };
  return EncodeUTF82;
}();
function strToU8(str, latin1) {
  if (latin1) {
    var ar_1 = new u8(str.length);
    for (var i = 0; i < str.length; ++i)
      ar_1[i] = str.charCodeAt(i);
    return ar_1;
  }
  if (te)
    return te.encode(str);
  var l = str.length;
  var ar = new u8(str.length + (str.length >> 1));
  var ai = 0;
  var w = function(v) {
    ar[ai++] = v;
  };
  for (var i = 0; i < l; ++i) {
    if (ai + 5 > ar.length) {
      var n2 = new u8(ai + 8 + (l - i << 1));
      n2.set(ar);
      ar = n2;
    }
    var c = str.charCodeAt(i);
    if (c < 128 || latin1)
      w(c);
    else if (c < 2048)
      w(192 | c >> 6), w(128 | c & 63);
    else if (c > 55295 && c < 57344)
      c = 65536 + (c & 1023 << 10) | str.charCodeAt(++i) & 1023, w(240 | c >> 18), w(128 | c >> 12 & 63), w(128 | c >> 6 & 63), w(128 | c & 63);
    else
      w(224 | c >> 12), w(128 | c >> 6 & 63), w(128 | c & 63);
  }
  return slc(ar, 0, ai);
}
function strFromU8(dat, latin1) {
  if (latin1) {
    var r2 = "";
    for (var i = 0; i < dat.length; i += 16384)
      r2 += String.fromCharCode.apply(null, dat.subarray(i, i + 16384));
    return r2;
  } else if (td)
    return td.decode(dat);
  else {
    var _a2 = dutf8(dat), out = _a2[0], ext = _a2[1];
    if (ext.length)
      err(8);
    return out;
  }
}
var dbf = function(l) {
  return l == 1 ? 3 : l < 6 ? 2 : l == 9 ? 1 : 0;
};
var z64e = function(d, b) {
  for (; b22(d, b) != 1; b += 4 + b22(d, b + 2))
    ;
  return [b82(d, b + 12), b82(d, b + 4), b82(d, b + 20)];
};
var exfl = function(ex) {
  var le = 0;
  if (ex) {
    for (var k in ex) {
      var l = ex[k].length;
      if (l > 65535)
        err(9);
      le += l + 4;
    }
  }
  return le;
};
var wzh = function(d, b, f, fn2, u, c, ce, co) {
  var fl2 = fn2.length, ex = f.extra, col = co && co.length;
  var exl = exfl(ex);
  wbytes(d, b, ce != null ? 33639248 : 67324752), b += 4;
  if (ce != null)
    d[b++] = 20, d[b++] = f.os;
  d[b] = 20, b += 2;
  d[b++] = f.flag << 1 | (c < 0 && 8), d[b++] = u && 8;
  d[b++] = f.compression & 255, d[b++] = f.compression >> 8;
  var dt = new Date(f.mtime == null ? Date.now() : f.mtime), y2 = dt.getFullYear() - 1980;
  if (y2 < 0 || y2 > 119)
    err(10);
  wbytes(d, b, y2 << 25 | dt.getMonth() + 1 << 21 | dt.getDate() << 16 | dt.getHours() << 11 | dt.getMinutes() << 5 | dt.getSeconds() >>> 1), b += 4;
  if (c != -1) {
    wbytes(d, b, f.crc);
    wbytes(d, b + 4, c < 0 ? -c - 2 : c);
    wbytes(d, b + 8, f.size);
  }
  wbytes(d, b + 12, fl2);
  wbytes(d, b + 14, exl), b += 16;
  if (ce != null) {
    wbytes(d, b, col);
    wbytes(d, b + 6, f.attrs);
    wbytes(d, b + 10, ce), b += 14;
  }
  d.set(fn2, b);
  b += fl2;
  if (exl) {
    for (var k in ex) {
      var exf = ex[k], l = exf.length;
      wbytes(d, b, +k);
      wbytes(d, b + 2, l);
      d.set(exf, b + 4), b += 4 + l;
    }
  }
  if (col)
    d.set(co, b), b += col;
  return b;
};
var wzf = function(o, b, c, d, e3) {
  wbytes(o, b, 101010256);
  wbytes(o, b + 8, c);
  wbytes(o, b + 10, c);
  wbytes(o, b + 12, d);
  wbytes(o, b + 16, e3);
};
var ZipPassThrough = function() {
  function ZipPassThrough2(filename) {
    this.filename = filename;
    this.c = crc();
    this.size = 0;
    this.compression = 0;
  }
  ZipPassThrough2.prototype.process = function(chunk, final) {
    this.ondata(null, chunk, final);
  };
  ZipPassThrough2.prototype.push = function(chunk, final) {
    if (!this.ondata)
      err(5);
    this.c.p(chunk);
    this.size += chunk.length;
    if (final)
      this.crc = this.c.d();
    this.process(chunk, final || false);
  };
  return ZipPassThrough2;
}();
var ZipDeflate = function() {
  function ZipDeflate2(filename, opts) {
    var _this_1 = this;
    if (!opts)
      opts = {};
    ZipPassThrough.call(this, filename);
    this.d = new Deflate(opts, function(dat, final) {
      _this_1.ondata(null, dat, final);
    });
    this.compression = 8;
    this.flag = dbf(opts.level);
  }
  ZipDeflate2.prototype.process = function(chunk, final) {
    try {
      this.d.push(chunk, final);
    } catch (e3) {
      this.ondata(e3, null, final);
    }
  };
  ZipDeflate2.prototype.push = function(chunk, final) {
    ZipPassThrough.prototype.push.call(this, chunk, final);
  };
  return ZipDeflate2;
}();
var AsyncZipDeflate = function() {
  function AsyncZipDeflate2(filename, opts) {
    var _this_1 = this;
    if (!opts)
      opts = {};
    ZipPassThrough.call(this, filename);
    this.d = new AsyncDeflate(opts, function(err2, dat, final) {
      _this_1.ondata(err2, dat, final);
    });
    this.compression = 8;
    this.flag = dbf(opts.level);
    this.terminate = this.d.terminate;
  }
  AsyncZipDeflate2.prototype.process = function(chunk, final) {
    this.d.push(chunk, final);
  };
  AsyncZipDeflate2.prototype.push = function(chunk, final) {
    ZipPassThrough.prototype.push.call(this, chunk, final);
  };
  return AsyncZipDeflate2;
}();
var Zip = function() {
  function Zip2(cb) {
    this.ondata = cb;
    this.u = [];
    this.d = 1;
  }
  Zip2.prototype.add = function(file) {
    var _this_1 = this;
    if (!this.ondata)
      err(5);
    if (this.d & 2)
      this.ondata(err(4 + (this.d & 1) * 8, 0, 1), null, false);
    else {
      var f = strToU8(file.filename), fl_1 = f.length;
      var com = file.comment, o = com && strToU8(com);
      var u = fl_1 != file.filename.length || o && com.length != o.length;
      var hl_1 = fl_1 + exfl(file.extra) + 30;
      if (fl_1 > 65535)
        this.ondata(err(11, 0, 1), null, false);
      var header = new u8(hl_1);
      wzh(header, 0, file, f, u, -1);
      var chks_1 = [header];
      var pAll_1 = function() {
        for (var _i = 0, chks_2 = chks_1; _i < chks_2.length; _i++) {
          var chk = chks_2[_i];
          _this_1.ondata(null, chk, false);
        }
        chks_1 = [];
      };
      var tr_1 = this.d;
      this.d = 0;
      var ind_1 = this.u.length;
      var uf_1 = mrg(file, {
        f,
        u,
        o,
        t: function() {
          if (file.terminate)
            file.terminate();
        },
        r: function() {
          pAll_1();
          if (tr_1) {
            var nxt = _this_1.u[ind_1 + 1];
            if (nxt)
              nxt.r();
            else
              _this_1.d = 1;
          }
          tr_1 = 1;
        }
      });
      var cl_1 = 0;
      file.ondata = function(err2, dat, final) {
        if (err2) {
          _this_1.ondata(err2, dat, final);
          _this_1.terminate();
        } else {
          cl_1 += dat.length;
          chks_1.push(dat);
          if (final) {
            var dd = new u8(16);
            wbytes(dd, 0, 134695760);
            wbytes(dd, 4, file.crc);
            wbytes(dd, 8, cl_1);
            wbytes(dd, 12, file.size);
            chks_1.push(dd);
            uf_1.c = cl_1, uf_1.b = hl_1 + cl_1 + 16, uf_1.crc = file.crc, uf_1.size = file.size;
            if (tr_1)
              uf_1.r();
            tr_1 = 1;
          } else if (tr_1)
            pAll_1();
        }
      };
      this.u.push(uf_1);
    }
  };
  Zip2.prototype.end = function() {
    var _this_1 = this;
    if (this.d & 2) {
      this.ondata(err(4 + (this.d & 1) * 8, 0, 1), null, true);
      return;
    }
    if (this.d)
      this.e();
    else
      this.u.push({
        r: function() {
          if (!(_this_1.d & 1))
            return;
          _this_1.u.splice(-1, 1);
          _this_1.e();
        },
        t: function() {
        }
      });
    this.d = 3;
  };
  Zip2.prototype.e = function() {
    var bt = 0, l = 0, tl = 0;
    for (var _i = 0, _a2 = this.u; _i < _a2.length; _i++) {
      var f = _a2[_i];
      tl += 46 + f.f.length + exfl(f.extra) + (f.o ? f.o.length : 0);
    }
    var out = new u8(tl + 22);
    for (var _b2 = 0, _c = this.u; _b2 < _c.length; _b2++) {
      var f = _c[_b2];
      wzh(out, bt, f, f.f, f.u, -f.c - 2, l, f.o);
      bt += 46 + f.f.length + exfl(f.extra) + (f.o ? f.o.length : 0), l += f.b;
    }
    wzf(out, bt, this.u.length, tl, l);
    this.ondata(null, out, true);
    this.d = 2;
  };
  Zip2.prototype.terminate = function() {
    for (var _i = 0, _a2 = this.u; _i < _a2.length; _i++) {
      var f = _a2[_i];
      f.t();
    }
    this.d = 2;
  };
  return Zip2;
}();
var UnzipPassThrough = function() {
  function UnzipPassThrough2() {
  }
  UnzipPassThrough2.prototype.push = function(data, final) {
    this.ondata(null, data, final);
  };
  UnzipPassThrough2.compression = 0;
  return UnzipPassThrough2;
}();
var UnzipInflate = function() {
  function UnzipInflate2() {
    var _this_1 = this;
    this.i = new Inflate(function(dat, final) {
      _this_1.ondata(null, dat, final);
    });
  }
  UnzipInflate2.prototype.push = function(data, final) {
    try {
      this.i.push(data, final);
    } catch (e3) {
      this.ondata(e3, null, final);
    }
  };
  UnzipInflate2.compression = 8;
  return UnzipInflate2;
}();
var AsyncUnzipInflate = function() {
  function AsyncUnzipInflate2(_2, sz) {
    var _this_1 = this;
    if (sz < 32e4) {
      this.i = new Inflate(function(dat, final) {
        _this_1.ondata(null, dat, final);
      });
    } else {
      this.i = new AsyncInflate(function(err2, dat, final) {
        _this_1.ondata(err2, dat, final);
      });
      this.terminate = this.i.terminate;
    }
  }
  AsyncUnzipInflate2.prototype.push = function(data, final) {
    if (this.i.terminate)
      data = slc(data, 0);
    this.i.push(data, final);
  };
  AsyncUnzipInflate2.compression = 8;
  return AsyncUnzipInflate2;
}();
var Unzip = function() {
  function Unzip2(cb) {
    this.onfile = cb;
    this.k = [];
    this.o = {
      0: UnzipPassThrough
    };
    this.p = et;
  }
  Unzip2.prototype.push = function(chunk, final) {
    var _this_1 = this;
    if (!this.onfile)
      err(5);
    if (!this.p)
      err(4);
    if (this.c > 0) {
      var len = Math.min(this.c, chunk.length);
      var toAdd = chunk.subarray(0, len);
      this.c -= len;
      if (this.d)
        this.d.push(toAdd, !this.c);
      else
        this.k[0].push(toAdd);
      chunk = chunk.subarray(len);
      if (chunk.length)
        return this.push(chunk, final);
    } else {
      var f = 0, i = 0, is2 = void 0, buf = void 0;
      if (!this.p.length)
        buf = chunk;
      else if (!chunk.length)
        buf = this.p;
      else {
        buf = new u8(this.p.length + chunk.length);
        buf.set(this.p), buf.set(chunk, this.p.length);
      }
      var l = buf.length, oc = this.c, add = oc && this.d;
      var _loop_2 = function() {
        var _a2;
        var sig = b42(buf, i);
        if (sig == 67324752) {
          f = 1, is2 = i;
          this_1.d = null;
          this_1.c = 0;
          var bf = b22(buf, i + 6), cmp_1 = b22(buf, i + 8), u = bf & 2048, dd = bf & 8, fnl = b22(buf, i + 26), es = b22(buf, i + 28);
          if (l > i + 30 + fnl + es) {
            var chks_3 = [];
            this_1.k.unshift(chks_3);
            f = 2;
            var sc_1 = b42(buf, i + 18), su_1 = b42(buf, i + 22);
            var fn_1 = strFromU8(buf.subarray(i + 30, i += 30 + fnl), !u);
            if (sc_1 == 4294967295) {
              _a2 = dd ? [-2] : z64e(buf, i), sc_1 = _a2[0], su_1 = _a2[1];
            } else if (dd)
              sc_1 = -1;
            i += es;
            this_1.c = sc_1;
            var d_1;
            var file_1 = {
              name: fn_1,
              compression: cmp_1,
              start: function() {
                if (!file_1.ondata)
                  err(5);
                if (!sc_1)
                  file_1.ondata(null, et, true);
                else {
                  var ctr = _this_1.o[cmp_1];
                  if (!ctr)
                    file_1.ondata(err(14, "unknown compression type " + cmp_1, 1), null, false);
                  d_1 = sc_1 < 0 ? new ctr(fn_1) : new ctr(fn_1, sc_1, su_1);
                  d_1.ondata = function(err2, dat3, final2) {
                    file_1.ondata(err2, dat3, final2);
                  };
                  for (var _i = 0, chks_4 = chks_3; _i < chks_4.length; _i++) {
                    var dat2 = chks_4[_i];
                    d_1.push(dat2, false);
                  }
                  if (_this_1.k[0] == chks_3 && _this_1.c)
                    _this_1.d = d_1;
                  else
                    d_1.push(et, true);
                }
              },
              terminate: function() {
                if (d_1 && d_1.terminate)
                  d_1.terminate();
              }
            };
            if (sc_1 >= 0)
              file_1.size = sc_1, file_1.originalSize = su_1;
            this_1.onfile(file_1);
          }
          return "break";
        } else if (oc) {
          if (sig == 134695760) {
            is2 = i += 12 + (oc == -2 && 8), f = 3, this_1.c = 0;
            return "break";
          } else if (sig == 33639248) {
            is2 = i -= 4, f = 3, this_1.c = 0;
            return "break";
          }
        }
      };
      var this_1 = this;
      for (; i < l - 4; ++i) {
        var state_1 = _loop_2();
        if (state_1 === "break")
          break;
      }
      this.p = et;
      if (oc < 0) {
        var dat = f ? buf.subarray(0, is2 - 12 - (oc == -2 && 8) - (b42(buf, is2 - 16) == 134695760 && 4)) : buf.subarray(0, i);
        if (add)
          add.push(dat, !!f);
        else
          this.k[+(f == 2)].push(dat);
      }
      if (f & 2)
        return this.push(buf.subarray(i), final);
      this.p = buf.subarray(i);
    }
    if (final) {
      if (this.c)
        err(13);
      this.p = null;
    }
  };
  Unzip2.prototype.register = function(decoder) {
    this.o[decoder.compression] = decoder;
  };
  return Unzip2;
}();

// node_modules/workbox-core/_version.js
try {
  self["workbox:core:7.0.0"] && _();
} catch (e3) {
}

// node_modules/workbox-core/models/messages/messages.js
var messages = {
  "invalid-value": ({ paramName, validValueDescription, value }) => {
    if (!paramName || !validValueDescription) {
      throw new Error(`Unexpected input to 'invalid-value' error.`);
    }
    return `The '${paramName}' parameter was given a value with an unexpected value. ${validValueDescription} Received a value of ${JSON.stringify(value)}.`;
  },
  "not-an-array": ({ moduleName, className, funcName, paramName }) => {
    if (!moduleName || !className || !funcName || !paramName) {
      throw new Error(`Unexpected input to 'not-an-array' error.`);
    }
    return `The parameter '${paramName}' passed into '${moduleName}.${className}.${funcName}()' must be an array.`;
  },
  "incorrect-type": ({ expectedType, paramName, moduleName, className, funcName }) => {
    if (!expectedType || !paramName || !moduleName || !funcName) {
      throw new Error(`Unexpected input to 'incorrect-type' error.`);
    }
    const classNameStr = className ? `${className}.` : "";
    return `The parameter '${paramName}' passed into '${moduleName}.${classNameStr}${funcName}()' must be of type ${expectedType}.`;
  },
  "incorrect-class": ({ expectedClassName, paramName, moduleName, className, funcName, isReturnValueProblem }) => {
    if (!expectedClassName || !moduleName || !funcName) {
      throw new Error(`Unexpected input to 'incorrect-class' error.`);
    }
    const classNameStr = className ? `${className}.` : "";
    if (isReturnValueProblem) {
      return `The return value from '${moduleName}.${classNameStr}${funcName}()' must be an instance of class ${expectedClassName}.`;
    }
    return `The parameter '${paramName}' passed into '${moduleName}.${classNameStr}${funcName}()' must be an instance of class ${expectedClassName}.`;
  },
  "missing-a-method": ({ expectedMethod, paramName, moduleName, className, funcName }) => {
    if (!expectedMethod || !paramName || !moduleName || !className || !funcName) {
      throw new Error(`Unexpected input to 'missing-a-method' error.`);
    }
    return `${moduleName}.${className}.${funcName}() expected the '${paramName}' parameter to expose a '${expectedMethod}' method.`;
  },
  "add-to-cache-list-unexpected-type": ({ entry }) => {
    return `An unexpected entry was passed to 'workbox-precaching.PrecacheController.addToCacheList()' The entry '${JSON.stringify(entry)}' isn't supported. You must supply an array of strings with one or more characters, objects with a url property or Request objects.`;
  },
  "add-to-cache-list-conflicting-entries": ({ firstEntry, secondEntry }) => {
    if (!firstEntry || !secondEntry) {
      throw new Error(`Unexpected input to 'add-to-cache-list-duplicate-entries' error.`);
    }
    return `Two of the entries passed to 'workbox-precaching.PrecacheController.addToCacheList()' had the URL ${firstEntry} but different revision details. Workbox is unable to cache and version the asset correctly. Please remove one of the entries.`;
  },
  "plugin-error-request-will-fetch": ({ thrownErrorMessage }) => {
    if (!thrownErrorMessage) {
      throw new Error(`Unexpected input to 'plugin-error-request-will-fetch', error.`);
    }
    return `An error was thrown by a plugins 'requestWillFetch()' method. The thrown error message was: '${thrownErrorMessage}'.`;
  },
  "invalid-cache-name": ({ cacheNameId, value }) => {
    if (!cacheNameId) {
      throw new Error(`Expected a 'cacheNameId' for error 'invalid-cache-name'`);
    }
    return `You must provide a name containing at least one character for setCacheDetails({${cacheNameId}: '...'}). Received a value of '${JSON.stringify(value)}'`;
  },
  "unregister-route-but-not-found-with-method": ({ method }) => {
    if (!method) {
      throw new Error(`Unexpected input to 'unregister-route-but-not-found-with-method' error.`);
    }
    return `The route you're trying to unregister was not  previously registered for the method type '${method}'.`;
  },
  "unregister-route-route-not-registered": () => {
    return `The route you're trying to unregister was not previously registered.`;
  },
  "queue-replay-failed": ({ name: name2 }) => {
    return `Replaying the background sync queue '${name2}' failed.`;
  },
  "duplicate-queue-name": ({ name: name2 }) => {
    return `The Queue name '${name2}' is already being used. All instances of backgroundSync.Queue must be given unique names.`;
  },
  "expired-test-without-max-age": ({ methodName, paramName }) => {
    return `The '${methodName}()' method can only be used when the '${paramName}' is used in the constructor.`;
  },
  "unsupported-route-type": ({ moduleName, className, funcName, paramName }) => {
    return `The supplied '${paramName}' parameter was an unsupported type. Please check the docs for ${moduleName}.${className}.${funcName} for valid input types.`;
  },
  "not-array-of-class": ({ value, expectedClass, moduleName, className, funcName, paramName }) => {
    return `The supplied '${paramName}' parameter must be an array of '${expectedClass}' objects. Received '${JSON.stringify(value)},'. Please check the call to ${moduleName}.${className}.${funcName}() to fix the issue.`;
  },
  "max-entries-or-age-required": ({ moduleName, className, funcName }) => {
    return `You must define either config.maxEntries or config.maxAgeSecondsin ${moduleName}.${className}.${funcName}`;
  },
  "statuses-or-headers-required": ({ moduleName, className, funcName }) => {
    return `You must define either config.statuses or config.headersin ${moduleName}.${className}.${funcName}`;
  },
  "invalid-string": ({ moduleName, funcName, paramName }) => {
    if (!paramName || !moduleName || !funcName) {
      throw new Error(`Unexpected input to 'invalid-string' error.`);
    }
    return `When using strings, the '${paramName}' parameter must start with 'http' (for cross-origin matches) or '/' (for same-origin matches). Please see the docs for ${moduleName}.${funcName}() for more info.`;
  },
  "channel-name-required": () => {
    return `You must provide a channelName to construct a BroadcastCacheUpdate instance.`;
  },
  "invalid-responses-are-same-args": () => {
    return `The arguments passed into responsesAreSame() appear to be invalid. Please ensure valid Responses are used.`;
  },
  "expire-custom-caches-only": () => {
    return `You must provide a 'cacheName' property when using the expiration plugin with a runtime caching strategy.`;
  },
  "unit-must-be-bytes": ({ normalizedRangeHeader }) => {
    if (!normalizedRangeHeader) {
      throw new Error(`Unexpected input to 'unit-must-be-bytes' error.`);
    }
    return `The 'unit' portion of the Range header must be set to 'bytes'. The Range header provided was "${normalizedRangeHeader}"`;
  },
  "single-range-only": ({ normalizedRangeHeader }) => {
    if (!normalizedRangeHeader) {
      throw new Error(`Unexpected input to 'single-range-only' error.`);
    }
    return `Multiple ranges are not supported. Please use a  single start value, and optional end value. The Range header provided was "${normalizedRangeHeader}"`;
  },
  "invalid-range-values": ({ normalizedRangeHeader }) => {
    if (!normalizedRangeHeader) {
      throw new Error(`Unexpected input to 'invalid-range-values' error.`);
    }
    return `The Range header is missing both start and end values. At least one of those values is needed. The Range header provided was "${normalizedRangeHeader}"`;
  },
  "no-range-header": () => {
    return `No Range header was found in the Request provided.`;
  },
  "range-not-satisfiable": ({ size, start: start3, end: end2 }) => {
    return `The start (${start3}) and end (${end2}) values in the Range are not satisfiable by the cached response, which is ${size} bytes.`;
  },
  "attempt-to-cache-non-get-request": ({ url, method }) => {
    return `Unable to cache '${url}' because it is a '${method}' request and only 'GET' requests can be cached.`;
  },
  "cache-put-with-no-response": ({ url }) => {
    return `There was an attempt to cache '${url}' but the response was not defined.`;
  },
  "no-response": ({ url, error }) => {
    let message = `The strategy could not generate a response for '${url}'.`;
    if (error) {
      message += ` The underlying error is ${error}.`;
    }
    return message;
  },
  "bad-precaching-response": ({ url, status }) => {
    return `The precaching request for '${url}' failed` + (status ? ` with an HTTP status of ${status}.` : `.`);
  },
  "non-precached-url": ({ url }) => {
    return `createHandlerBoundToURL('${url}') was called, but that URL is not precached. Please pass in a URL that is precached instead.`;
  },
  "add-to-cache-list-conflicting-integrities": ({ url }) => {
    return `Two of the entries passed to 'workbox-precaching.PrecacheController.addToCacheList()' had the URL ${url} with different integrity values. Please remove one of them.`;
  },
  "missing-precache-entry": ({ cacheName, url }) => {
    return `Unable to find a precached response in ${cacheName} for ${url}.`;
  },
  "cross-origin-copy-response": ({ origin }) => {
    return `workbox-core.copyResponse() can only be used with same-origin responses. It was passed a response with origin ${origin}.`;
  },
  "opaque-streams-source": ({ type: type2 }) => {
    const message = `One of the workbox-streams sources resulted in an '${type2}' response.`;
    if (type2 === "opaqueredirect") {
      return `${message} Please do not use a navigation request that results in a redirect as a source.`;
    }
    return `${message} Please ensure your sources are CORS-enabled.`;
  }
};

// node_modules/workbox-core/models/messages/messageGenerator.js
var generatorFunction = (code, details = {}) => {
  const message = messages[code];
  if (!message) {
    throw new Error(`Unable to find message for code '${code}'.`);
  }
  return message(details);
};
var messageGenerator = false ? fallback : generatorFunction;

// node_modules/workbox-core/_private/WorkboxError.js
var WorkboxError = class extends Error {
  /**
   *
   * @param {string} errorCode The error code that
   * identifies this particular error.
   * @param {Object=} details Any relevant arguments
   * that will help developers identify issues should
   * be added as a key on the context object.
   */
  constructor(errorCode, details) {
    const message = messageGenerator(errorCode, details);
    super(message);
    this.name = errorCode;
    this.details = details;
  }
};

// node_modules/workbox-core/_private/assert.js
var isArray = (value, details) => {
  if (!Array.isArray(value)) {
    throw new WorkboxError("not-an-array", details);
  }
};
var hasMethod = (object, expectedMethod, details) => {
  const type2 = typeof object[expectedMethod];
  if (type2 !== "function") {
    details["expectedMethod"] = expectedMethod;
    throw new WorkboxError("missing-a-method", details);
  }
};
var isType = (object, expectedType, details) => {
  if (typeof object !== expectedType) {
    details["expectedType"] = expectedType;
    throw new WorkboxError("incorrect-type", details);
  }
};
var isInstance = (object, expectedClass, details) => {
  if (!(object instanceof expectedClass)) {
    details["expectedClassName"] = expectedClass.name;
    throw new WorkboxError("incorrect-class", details);
  }
};
var isOneOf = (value, validValues, details) => {
  if (!validValues.includes(value)) {
    details["validValueDescription"] = `Valid values are ${JSON.stringify(validValues)}.`;
    throw new WorkboxError("invalid-value", details);
  }
};
var isArrayOfClass = (value, expectedClass, details) => {
  const error = new WorkboxError("not-array-of-class", details);
  if (!Array.isArray(value)) {
    throw error;
  }
  for (const item of value) {
    if (!(item instanceof expectedClass)) {
      throw error;
    }
  }
};
var finalAssertExports = false ? null : {
  hasMethod,
  isArray,
  isInstance,
  isOneOf,
  isType,
  isArrayOfClass
};

// node_modules/workbox-core/_private/logger.js
var logger = false ? null : (() => {
  if (!("__WB_DISABLE_DEV_LOGS" in globalThis)) {
    self.__WB_DISABLE_DEV_LOGS = false;
  }
  let inGroup = false;
  const methodToColorMap = {
    debug: `#7f8c8d`,
    log: `#2ecc71`,
    warn: `#f39c12`,
    error: `#c0392b`,
    groupCollapsed: `#3498db`,
    groupEnd: null
    // No colored prefix on groupEnd
  };
  const print = function(method, args) {
    if (self.__WB_DISABLE_DEV_LOGS) {
      return;
    }
    if (method === "groupCollapsed") {
      if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
        console[method](...args);
        return;
      }
    }
    const styles = [
      `background: ${methodToColorMap[method]}`,
      `border-radius: 0.5em`,
      `color: white`,
      `font-weight: bold`,
      `padding: 2px 0.5em`
    ];
    const logPrefix = inGroup ? [] : ["%cworkbox", styles.join(";")];
    console[method](...logPrefix, ...args);
    if (method === "groupCollapsed") {
      inGroup = true;
    }
    if (method === "groupEnd") {
      inGroup = false;
    }
  };
  const api = {};
  const loggerMethods = Object.keys(methodToColorMap);
  for (const key of loggerMethods) {
    const method = key;
    api[method] = (...args) => {
      print(method, args);
    };
  }
  return api;
})();

// node_modules/workbox-range-requests/_version.js
try {
  self["workbox:range-requests:7.0.0"] && _();
} catch (e3) {
}

// node_modules/workbox-range-requests/utils/calculateEffectiveBoundaries.js
function calculateEffectiveBoundaries(blob, start3, end2) {
  if (true) {
    finalAssertExports.isInstance(blob, Blob, {
      moduleName: "workbox-range-requests",
      funcName: "calculateEffectiveBoundaries",
      paramName: "blob"
    });
  }
  const blobSize = blob.size;
  if (end2 && end2 > blobSize || start3 && start3 < 0) {
    throw new WorkboxError("range-not-satisfiable", {
      size: blobSize,
      end: end2,
      start: start3
    });
  }
  let effectiveStart;
  let effectiveEnd;
  if (start3 !== void 0 && end2 !== void 0) {
    effectiveStart = start3;
    effectiveEnd = end2 + 1;
  } else if (start3 !== void 0 && end2 === void 0) {
    effectiveStart = start3;
    effectiveEnd = blobSize;
  } else if (end2 !== void 0 && start3 === void 0) {
    effectiveStart = blobSize - end2;
    effectiveEnd = blobSize;
  }
  return {
    start: effectiveStart,
    end: effectiveEnd
  };
}

// node_modules/workbox-range-requests/utils/parseRangeHeader.js
function parseRangeHeader(rangeHeader) {
  if (true) {
    finalAssertExports.isType(rangeHeader, "string", {
      moduleName: "workbox-range-requests",
      funcName: "parseRangeHeader",
      paramName: "rangeHeader"
    });
  }
  const normalizedRangeHeader = rangeHeader.trim().toLowerCase();
  if (!normalizedRangeHeader.startsWith("bytes=")) {
    throw new WorkboxError("unit-must-be-bytes", { normalizedRangeHeader });
  }
  if (normalizedRangeHeader.includes(",")) {
    throw new WorkboxError("single-range-only", { normalizedRangeHeader });
  }
  const rangeParts = /(\d*)-(\d*)/.exec(normalizedRangeHeader);
  if (!rangeParts || !(rangeParts[1] || rangeParts[2])) {
    throw new WorkboxError("invalid-range-values", { normalizedRangeHeader });
  }
  return {
    start: rangeParts[1] === "" ? void 0 : Number(rangeParts[1]),
    end: rangeParts[2] === "" ? void 0 : Number(rangeParts[2])
  };
}

// node_modules/workbox-range-requests/createPartialResponse.js
async function createPartialResponse(request, originalResponse) {
  try {
    if (true) {
      finalAssertExports.isInstance(request, Request, {
        moduleName: "workbox-range-requests",
        funcName: "createPartialResponse",
        paramName: "request"
      });
      finalAssertExports.isInstance(originalResponse, Response, {
        moduleName: "workbox-range-requests",
        funcName: "createPartialResponse",
        paramName: "originalResponse"
      });
    }
    if (originalResponse.status === 206) {
      return originalResponse;
    }
    const rangeHeader = request.headers.get("range");
    if (!rangeHeader) {
      throw new WorkboxError("no-range-header");
    }
    const boundaries = parseRangeHeader(rangeHeader);
    const originalBlob = await originalResponse.blob();
    const effectiveBoundaries = calculateEffectiveBoundaries(originalBlob, boundaries.start, boundaries.end);
    const slicedBlob = originalBlob.slice(effectiveBoundaries.start, effectiveBoundaries.end);
    const slicedBlobSize = slicedBlob.size;
    const slicedResponse = new Response(slicedBlob, {
      // Status code 206 is for a Partial Content response.
      // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/206
      status: 206,
      statusText: "Partial Content",
      headers: originalResponse.headers
    });
    slicedResponse.headers.set("Content-Length", String(slicedBlobSize));
    slicedResponse.headers.set("Content-Range", `bytes ${effectiveBoundaries.start}-${effectiveBoundaries.end - 1}/${originalBlob.size}`);
    return slicedResponse;
  } catch (error) {
    if (true) {
      logger.warn(`Unable to construct a partial response; returning a 416 Range Not Satisfiable response instead.`);
      logger.groupCollapsed(`View details here.`);
      logger.log(error);
      logger.log(request);
      logger.log(originalResponse);
      logger.groupEnd();
    }
    return new Response("", {
      status: 416,
      statusText: "Range Not Satisfiable"
    });
  }
}

// node_modules/ideogram/src/js/init/caches/cache-lib.js
async function fetchByteRangesByName(url) {
  const byteRangesByName = {};
  const path = `${url.replace(".tsv.gz", "")}.tsv.li.gz`;
  const response = await cacheFetch(path);
  const text = await response.text();
  const lines = text.split("\n");
  for (let i = 0; i < lines.length - 1; i++) {
    const [gene, rawOffset] = lines[i].split("	");
    if (gene[0] === "#") continue;
    const offset2 = parseInt(rawOffset);
    const offsetEnd = parseInt(lines[i + 1].split("	")[1]);
    byteRangesByName[gene] = [offset2, offsetEnd];
  }
  return byteRangesByName;
}
async function fetchVariantByteRangesByName(text) {
  const byteRangesByName = {};
  const lines = text.split("\n");
  for (let i = 0; i < lines.length - 1; i++) {
    const [gene, rawOffset, rawLength] = lines[i].split("	");
    if (gene[0] === "#") continue;
    const offset2 = parseInt(rawOffset);
    const offsetEnd = offset2 + parseInt(rawLength);
    byteRangesByName[gene] = [offset2, offsetEnd];
  }
  return byteRangesByName;
}
function supportsCache(orgName, cacheName) {
  const metadata = parseOrgMetadata(orgName);
  const cacheProp = "has" + cacheName + "Cache";
  return metadata[cacheProp] && metadata[cacheProp] === true;
}
function getCacheUrl(orgName, cacheDir, cacheType, fileType = "tsv") {
  const organism = slug(orgName);
  if (!cacheDir) {
    cacheDir = getDir("cache/" + cacheType + "/");
  } else {
    cacheDir += cacheType + "/";
  }
  const cacheUrl = cacheDir + organism + "-" + cacheType + "." + fileType + ".gz";
  return cacheUrl;
}
function getFullId(prefix, slimId, fullNumLength = 11) {
  if (prefix === "WBGene") fullNumLength = 8;
  const zeroPaddedId = slimId.padStart(fullNumLength, "0");
  return prefix + zeroPaddedId;
}
async function getServiceWorkerCache() {
  const currentIdeogram = `ideogram-${version_default}`;
  const cacheNames = await caches.keys();
  cacheNames.forEach((name2) => {
    if (name2.startsWith("ideogram-") && name2 !== currentIdeogram) {
      caches.delete(name2);
    }
  });
  const cache = await caches.open(currentIdeogram);
  return cache;
}
async function cacheFetch(url) {
  const cache = await getServiceWorkerCache();
  window.ideoCache = cache;
  window.createPartialResponse = createPartialResponse;
  const decompressedUrl = url.replace(".gz", "");
  const response = await cache.match(decompressedUrl);
  if (typeof response === "undefined") {
    const rawResponse = await fetch(url);
    const blob = await rawResponse.blob();
    const uint8Array = new Uint8Array(await blob.arrayBuffer());
    const data = strFromU8(decompressSync(uint8Array));
    const contentLength = data.length;
    const decompressedResponse = new Response(
      new Blob([data], { type: "text/tab-separated-values" }),
      { headers: new Headers({ "Content-Length": contentLength }) }
    );
    await cache.put(decompressedUrl, decompressedResponse);
    return await cache.match(decompressedUrl);
  }
  return await cache.match(decompressedUrl);
}
async function cacheRangeFetch(url, byteRange) {
  url = url.replace(".gz", "");
  const rangeStart = byteRange[0] + 1;
  const rangeEnd = byteRange[1] - 1;
  const headers = new Headers({
    "content-type": "multipart/byteranges",
    "range": `bytes=${rangeStart}-${rangeEnd}`
  });
  const request = new Request(url, { headers });
  const cache = await getServiceWorkerCache();
  const fullResponse = await cache.match(request);
  const partialResponse = await createPartialResponse(request, fullResponse);
  const text = await partialResponse.text();
  return text;
}
window.cacheRangeFetch = cacheRangeFetch;
function parseOrgMetadata(orgName) {
  const taxid = getEarlyTaxid(orgName);
  return organismMetadata[taxid] || {};
}
async function fetchAndParse(cacheUrl, perfTimes, parseFn, orgName = null) {
  const fetchStartTime = performance.now();
  const response = await cacheFetch(cacheUrl);
  let data;
  if (cacheUrl.includes(".json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }
  const fetchEndTime = performance.now();
  perfTimes.fetch = Math.round(fetchEndTime - fetchStartTime);
  let parsedCache;
  if (cacheUrl.includes("tissue")) {
    const byteRangesByName = await fetchByteRangesByName(cacheUrl);
    parsedCache = parseFn(data, perfTimes, byteRangesByName);
  } else if (cacheUrl.includes("variant")) {
    const variantsTsvPath = cacheUrl.replace(".li", "");
    await cacheFetch(variantsTsvPath);
    const byteRangesByName = await fetchVariantByteRangesByName(data);
    parsedCache = parseFn(data, perfTimes, byteRangesByName);
  } else {
    parsedCache = parseFn(data, perfTimes, orgName);
  }
  perfTimes.parseCache = Math.round(performance.now() - fetchEndTime);
  return [parsedCache, perfTimes];
}

// node_modules/ideogram/src/js/init/caches/gene-cache-worker.js
function parseGeneCache(rawTsv, perfTimes) {
  const names = [];
  const nameCaseMap = {};
  const namesById = {};
  const fullNamesById = {};
  const idsByName = {};
  const lociByName = {};
  const lociById = {};
  const preAnnots = [];
  const tissueIdsByName = {};
  let ensemblPrefix;
  let t03 = performance.now();
  const lines = rawTsv.split(/\r\n|\n/);
  perfTimes.rawTsvSplit = Math.round(performance.now() - t03);
  t03 = performance.now();
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === "") continue;
    if (line[0] === "#") {
      if (line.slice(0, 9) === "## prefix") {
        ensemblPrefix = line.split("prefix: ")[1];
      }
      continue;
    }
    const [
      chromosome,
      rawStart,
      rawLength,
      slimEnsemblId,
      gene,
      rawFullName,
      tissueIds
    ] = line.trim().split(/\t/);
    const fullName = decodeURIComponent(rawFullName);
    const start3 = parseInt(rawStart);
    const stop2 = start3 + parseInt(rawLength);
    const ensemblId = getFullId(ensemblPrefix, slimEnsemblId);
    preAnnots.push([chromosome, start3, stop2, ensemblId, gene, fullName]);
    const locus = [chromosome, start3, stop2];
    names.push(gene);
    nameCaseMap[gene.toLowerCase()] = gene;
    namesById[ensemblId] = gene;
    fullNamesById[ensemblId] = fullName;
    idsByName[gene] = ensemblId;
    lociByName[gene] = locus;
    lociById[ensemblId] = locus;
    if (tissueIds !== void 0) {
      const processedTissueIds = [];
      const splitTissueIds = tissueIds.split(",");
      for (let i2 = 0; i2 < splitTissueIds.length; i2++) {
        processedTissueIds.push(parseInt(splitTissueIds[i2], 10));
      }
      tissueIdsByName[gene] = processedTissueIds;
    }
  }
  ;
  const t13 = performance.now();
  perfTimes.parseCacheLoop = Math.round(t13 - t03);
  perfTimes.parseAnnots = Math.round(performance.now() - t13);
  return [
    names,
    nameCaseMap,
    namesById,
    fullNamesById,
    idsByName,
    lociByName,
    lociById
    // , sortedAnnots
  ];
}

// node_modules/ideogram/src/js/init/caches/paralog-cache-worker.js
function parseParalogCache(rawTsv, perfTimes) {
  const paralogsByName = {};
  let ensemblPrefix;
  let t03 = performance.now();
  const lines = rawTsv.split(/\r\n|\n/);
  perfTimes.rawTsvSplit = Math.round(performance.now() - t03);
  t03 = performance.now();
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === "") continue;
    if (line[0] === "#") {
      if (line.slice(0, 9) === "## prefix") {
        ensemblPrefix = line.split("prefix: ")[1];
      }
      continue;
    }
    const columns = line.trim().split(/\t/);
    const gene = columns[0];
    const geneSlimId = columns[1];
    const paralogs = [];
    if (columns[2][0] === "_") {
      const pointer = columns[2].slice(1).toUpperCase();
      const paralogSuperList = paralogsByName[pointer];
      const geneId = getFullId(ensemblPrefix, geneSlimId);
      for (let j = 0; j < paralogSuperList.length; j++) {
        const id2 = paralogSuperList[j];
        if (id2 !== geneId) {
          paralogs.push(id2);
        }
      }
      paralogs.unshift(getFullId(ensemblPrefix, columns[3]));
    } else {
      const slimEnsemblIds = columns.slice(2);
      for (let j = 0; j < slimEnsemblIds.length; j++) {
        const slimId = slimEnsemblIds[j];
        if (slimId !== geneSlimId) {
          paralogs.push(getFullId(ensemblPrefix, slimId));
        }
      }
    }
    paralogsByName[gene.toUpperCase()] = paralogs;
  }
  ;
  const t13 = performance.now();
  perfTimes.parseCacheLoop = Math.round(t13 - t03);
  return paralogsByName;
}

// node_modules/ideogram/src/js/init/caches/interaction-cache-worker.js
function parseInteractionCache(rawJson, perfTimes, orgName) {
  let t03 = performance.now();
  const interactionsByName = {};
  const tmp = orgName.replace("-", " ");
  const desluggedOrg = tmp[0].toUpperCase() + tmp.slice(1);
  t03 = performance.now();
  for (const gene in rawJson["interactions"]) {
    const ixnLists = rawJson["interactions"][gene];
    interactionsByName[gene] = { result: [] };
    for (let i = 0; i < ixnLists.length; i++) {
      const compressedIxn = ixnLists[i];
      const slimPwId = compressedIxn[0];
      interactionsByName[gene].result.push({
        fields: {
          left: { values: compressedIxn[1] },
          right: { values: compressedIxn[2] }
        },
        id: "WP" + slimPwId,
        name: rawJson["pathwayNamesById"][slimPwId],
        species: desluggedOrg
      });
    }
  }
  const t13 = performance.now();
  perfTimes.parseCacheLoop = Math.round(t13 - t03);
  return interactionsByName;
}

// node_modules/ideogram/src/js/init/caches/gene-structure-cache-worker.js
function deserializeSubparts(rawSubparts, subpartKeys) {
  const subparts = [];
  for (let i = 0; i < rawSubparts.length; i++) {
    const rawSubpart = rawSubparts[i].split(";");
    const subpartType = subpartKeys[parseInt(rawSubpart[0])];
    const start3 = parseInt(rawSubpart[1]);
    const length2 = parseInt(rawSubpart[2]);
    const subpart = [subpartType, start3, length2];
    subparts.push(subpart);
  }
  return subparts;
}
function parseMetainformationHeader(line) {
  const splitHead = line.split(" keys: ");
  if (splitHead.length < 2) return [null];
  const metaHeader = splitHead[0].split("## ")[1];
  const keys = {};
  splitHead[1].split(", ").forEach((entry) => {
    const splitEntry = entry.split(" = ");
    keys[splitEntry[0]] = splitEntry[1];
  });
  return [metaHeader, keys];
}
function parseGeneStructureCache(rawTsv, perfTimes) {
  const featuresByGene = {};
  let t03 = performance.now();
  const lines = rawTsv.split(/\r\n|\n/);
  perfTimes.rawTsvSplit = Math.round(performance.now() - t03);
  let biotypeKeys, subpartKeys;
  t03 = performance.now();
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === "") continue;
    if (line[0] === "#") {
      if (line[1] === "#") {
        const [metaHeader, keys] = parseMetainformationHeader(line);
        if (metaHeader === "biotype") {
          biotypeKeys = keys;
        } else if (metaHeader === "subpart") {
          subpartKeys = keys;
        }
      }
      continue;
    }
    const splitLine = line.trim().split(/\t/);
    const [
      name2,
      rawStartOffset,
      biotypeCompressed,
      strand
    ] = splitLine.slice(0, 4);
    const startOffset = parseInt(rawStartOffset);
    const gene = name2.split("-").slice(0, -1).join("-");
    const rawSubparts = splitLine.slice(4);
    const subparts = deserializeSubparts(rawSubparts, subpartKeys);
    const biotype = biotypeKeys[biotypeCompressed];
    const feature = {
      name: name2,
      startOffset,
      biotype,
      strand,
      subparts
    };
    if (gene in featuresByGene) {
      featuresByGene[gene].push(feature);
    } else {
      featuresByGene[gene] = [feature];
    }
  }
  ;
  const t13 = performance.now();
  perfTimes.parseCacheLoop = Math.round(t13 - t03);
  return featuresByGene;
}

// node_modules/ideogram/src/js/init/caches/protein-cache-worker.js
function deserializeProtein(rawProtein, domainKeys) {
  const domains = [];
  for (let i = 0; i < rawProtein.length; i++) {
    const rawDomain = rawProtein[i].split(";");
    const domainName = domainKeys[rawDomain[0]];
    const start3 = parseInt(rawDomain[1]);
    const length2 = parseInt(rawDomain[2]);
    const domain = [domainName, start3, length2];
    domains.push(domain);
  }
  return domains;
}
function parseMetainformationHeader2(line) {
  const splitHead = line.split(" keys: ");
  if (splitHead.length < 2) return [null];
  const metaHeader = splitHead[0].split("## ")[1];
  const keys = {};
  splitHead[1].split("; ").forEach((entry) => {
    const splitEntry = entry.split(" = ");
    keys[splitEntry[0]] = splitEntry[1];
  });
  return [metaHeader, keys];
}
function parseProteinCache(rawTsv, perfTimes) {
  const featuresByGene = {};
  let t03 = performance.now();
  const lines = rawTsv.split(/\r\n|\n/);
  perfTimes.rawTsvSplit = Math.round(performance.now() - t03);
  let domainKeys;
  t03 = performance.now();
  let gene = null;
  let refTxBaseNum;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === "") continue;
    if (line[0] === "#") {
      if (line[1] === "#") {
        const [metaHeader, keys] = parseMetainformationHeader2(line);
        if (metaHeader === "domain") {
          domainKeys = keys;
        }
      }
      continue;
    }
    const splitLine = line.trim().split(/\t/);
    let transcriptName = splitLine[0];
    if (isNaN(transcriptName)) {
      const splitTxName = transcriptName.split("-");
      const txNum = splitTxName.slice(-1)[0];
      const highestDigit = parseInt(txNum[0]);
      const numDigits = txNum.length;
      refTxBaseNum = highestDigit * 10 ** (numDigits - 1);
      gene = splitTxName.slice(0, -1).join("-");
    } else {
      transcriptName = refTxBaseNum + parseInt(transcriptName);
      transcriptName = gene + "-" + transcriptName;
    }
    const rawProtein = splitLine.slice(1);
    const protein = deserializeProtein(rawProtein, domainKeys);
    const feature = {
      transcriptName,
      protein
    };
    if (gene in featuresByGene) {
      featuresByGene[gene].push(feature);
    } else {
      featuresByGene[gene] = [feature];
    }
  }
  ;
  const t13 = performance.now();
  perfTimes.parseCacheLoop = Math.round(t13 - t03);
  return featuresByGene;
}

// node_modules/ideogram/src/js/init/caches/synonym-cache-worker.js
function parseSynonymCache(rawTsv, perfTimes) {
  const byGene = {};
  let t03 = performance.now();
  const lines = rawTsv.split(/\r\n|\n/);
  perfTimes.rawTsvSplit = Math.round(performance.now() - t03);
  t03 = performance.now();
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === "" || line[0] === "#") continue;
    const splitLine = line.trim().split(/\t/);
    const gene = splitLine[0];
    const synonyms = splitLine.slice(1);
    byGene[gene] = synonyms;
  }
  ;
  const t13 = performance.now();
  perfTimes.parseCacheLoop = Math.round(t13 - t03);
  return { byGene };
}

// node_modules/ideogram/src/js/init/caches/tissue-cache-worker.js
function parseTissueKeys(rawTissuesString) {
  const tissueNames = [];
  const tissueColors = [];
  const tissueSamples = [];
  rawTissuesString.split(";").forEach((entry) => {
    const splitEntry = entry.split(",");
    tissueNames.push(splitEntry[0]);
    tissueColors.push(splitEntry[1]);
    tissueSamples.push(splitEntry[2]);
  });
  return [tissueNames, tissueColors, tissueSamples];
}
async function getTissueExpressions(gene, config2) {
  const cache = Ideogram.tissueCache;
  const byteRange = cache.byteRangesByName[gene];
  if (!Ideogram.cacheRangeFetch) Ideogram.cacheRangeFetch = cacheRangeFetch;
  if (!byteRange) return null;
  let cacheDir = null;
  if (config2.cacheDir) cacheDir = config2.cacheDir;
  const cacheType = "tissues";
  const extension = "tsv";
  const orgName = "homo-sapiens";
  const cacheUrl = getCacheUrl(orgName, cacheDir, cacheType, extension);
  const geneDataLine = await cacheRangeFetch(cacheUrl, byteRange);
  const tissueExpressions = [];
  const rawExpressions = geneDataLine.split("	").slice(1);
  for (let i = 0; i < rawExpressions.length; i++) {
    const rawValues = rawExpressions[i].split(";").map(
      (v) => v === "" ? 0 : v
      // inflate empty string to 0-integer
    );
    const numValues = rawValues.length;
    if (numValues === 15) {
      rawValues.splice(1, 0, 0);
    } else if (numValues === 14) {
      rawValues.splice(1, 0, 0);
      rawValues.splice(1, 0, 0);
    } else if (numValues === 13) {
      rawValues.splice(1, 0, 0);
      rawValues.splice(1, 0, 0);
      rawValues.splice(1, 0, 0);
    }
    const tissueId = rawValues[0];
    const boxMetrics = rawValues.slice(1, 6);
    const min4 = parseFloat(boxMetrics[0]);
    const q1 = parseFloat(boxMetrics[1]);
    const median = parseFloat(boxMetrics[2]);
    const q3 = parseFloat(boxMetrics[3]);
    const max5 = parseFloat(boxMetrics[4]);
    const quantiles = rawValues.slice(6).map((v) => parseInt(v));
    const expression = {
      min: min4,
      q1,
      median,
      q3,
      max: max5,
      quantiles
    };
    const tissue = cache.tissueNames[tissueId];
    const color2 = cache.tissueColors[tissueId];
    const samples = parseInt(cache.tissueSamples[tissueId]);
    tissueExpressions.push({ tissue, expression, color: color2, samples });
  }
  return tissueExpressions;
}
function parseTissueCache(rawTsv, perfTimes, byteRangesByName) {
  let tissueNames;
  let tissueColors;
  let tissueSamples;
  let t03 = performance.now();
  const lines = rawTsv.split(/\r\n|\n/);
  perfTimes.rawTsvSplit = Math.round(performance.now() - t03);
  t03 = performance.now();
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === "") continue;
    if (line[0] === "#") {
      if (line.slice(0, 10) === "## tissues") {
        const parsedTissueKeys = parseTissueKeys(line.split("tissues: ")[1]);
        [tissueNames, tissueColors, tissueSamples] = parsedTissueKeys;
      }
      continue;
    }
  }
  ;
  const t13 = performance.now();
  perfTimes.parseCacheLoop = Math.round(t13 - t03);
  return {
    getTissueExpressions,
    byteRangesByName,
    tissueNames,
    tissueColors,
    tissueSamples
  };
}

// node_modules/ideogram/src/js/init/caches/variant-cache-worker.js
var variantOriginMap = {
  "0": "unknown",
  "1": "germline",
  "2": "somatic",
  "4": "inherited",
  "8": "paternal",
  "16": "maternal",
  "32": "de-novo",
  "64": "biparental",
  "128": "uniparental",
  "256": "not-tested",
  "512": "tested-inconclusive",
  "1073741824": "other"
};
function parseDiseaseElement(diseaseArray, i) {
  const [rawId, rawName] = diseaseArray[i].split("|");
  const id2 = "MONDO:" + rawId;
  const name2 = rawName.replaceAll("_", " ");
  return [id2, name2];
}
function parseDiseaseKey(line) {
  const diseaseNamesById = {};
  const diseaseArray = getArray(line);
  for (let i = 0; i < diseaseArray.length; i++) {
    const [id2, name2] = parseDiseaseElement(diseaseArray, i);
    diseaseNamesById[id2] = name2;
  }
  return [diseaseArray, diseaseNamesById];
}
function parseMolecularConsequenceKey(line) {
  const molecularConsequenceById = {};
  const molecularConsequenceArray = getArray(line);
  for (let i = 0; i < molecularConsequenceArray.length; i++) {
    const [id2, rawName] = molecularConsequenceArray[i].split("|");
    const name2 = rawName.replaceAll("_", " ");
    molecularConsequenceById[id2] = name2;
  }
  return [molecularConsequenceArray, molecularConsequenceById];
}
function parseDiseases(rawDiseases, diseaseArray) {
  const diseases = [];
  if (rawDiseases === "") {
    return [{ id: "", disease: "Not provided" }];
  }
  const diseaseIndexValues = rawDiseases.split(",");
  for (let i = 0; i < diseaseIndexValues.length; i++) {
    const diseaseIndexValue = parseInt(diseaseIndexValues[i]);
    const [id2, name2] = parseDiseaseElement(diseaseArray, diseaseIndexValue);
    const disease = { id: id2, name: name2 };
    diseases.push(disease);
  }
  return diseases;
}
function parseMolecularConsequences(rawMolecularConsequences, mcArray) {
  const molecularConsequences = [];
  const mcIndexValues = rawMolecularConsequences.split(",");
  for (let i = 0; i < mcIndexValues.length; i++) {
    const mcIndexValue = parseInt(mcIndexValues[i]);
    const [id2, name2] = mcArray[mcIndexValue].split("|");
    const mc = { id: id2, name: name2 };
    molecularConsequences.push(mc);
  }
  return molecularConsequences;
}
function parseKey(index2, key) {
  return key[index2].replaceAll("_", " ");
}
function parseVariant(line, variantCache) {
  const [
    chromosome,
    rawPosition,
    rawClinvarId,
    refAllele,
    // Allele in the reference genome
    altAllele,
    // Allele that makes this a "variant"
    rawDiseases,
    rawAfExac,
    rawReviewStatus,
    rawClinicalSignificance,
    rawVariantType,
    rawMolecularConsequences,
    rawOrigin,
    rsNumber
  ] = line.split("	");
  const position = parseInt(rawPosition);
  const afExac = rawAfExac === "" ? null : parseFloat(rawAfExac);
  const keys = variantCache.keys;
  const clinvarVariantId = rawClinvarId;
  const diseases = parseDiseases(rawDiseases, keys.diseaseArray);
  const reviewStatus = parseKey(rawReviewStatus, keys.reviewStatuses);
  const clinicalSignificance = parseKey(
    rawClinicalSignificance,
    keys.clinicalSignificances
  );
  const variantType = parseKey(rawVariantType, keys.variantTypes);
  let molecularConsequences = null;
  if (rawMolecularConsequences !== "") {
    molecularConsequences = parseMolecularConsequences(
      rawMolecularConsequences,
      keys.molecularConsequenceArray
    );
  }
  const dbSnpId = rsNumber ? "rs" + rsNumber : null;
  const origin = variantOriginMap[rawOrigin];
  const variant = {
    chromosome,
    position,
    afExac,
    clinvarVariantId,
    refAllele,
    altAllele,
    diseases,
    reviewStatus,
    rawReviewStatus: parseInt(rawReviewStatus),
    clinicalSignificance,
    rawClinicalSignificance: parseInt(rawClinicalSignificance),
    variantType,
    molecularConsequences,
    dbSnpId,
    origin,
    rawOrigin: parseInt(rawOrigin)
  };
  return variant;
}
async function getVariants(gene, ideo) {
  const variants = [];
  const cache = Ideogram.variantCache;
  const byteRange = cache.byteRangesByName[gene];
  if (!Ideogram.cacheRangeFetch) Ideogram.cacheRangeFetch = cacheRangeFetch;
  if (!byteRange) return [];
  const config2 = ideo.config;
  let cacheDir = null;
  if (config2.cacheDir) cacheDir = config2.cacheDir;
  const cacheType = "variants";
  const extension = "tsv";
  const orgName = "homo-sapiens";
  const cacheUrl = getCacheUrl(orgName, cacheDir, cacheType, extension);
  const geneLocus = Ideogram.geneCache.lociByName[gene];
  const data = await cacheRangeFetch(cacheUrl, byteRange);
  const lines = data.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const variant = parseVariant(line, cache);
    variant.positionRelative = variant.position - geneLocus[1];
    variants.push(variant);
  }
  return variants;
}
function getArray(line) {
  const value = line.split("= ")[1];
  return JSON.parse(value);
}
function parseVariantCacheIndex(rawTsv, perfTimes, byteRangesByName) {
  let diseaseArray;
  let diseaseNamesById;
  let variantTypes;
  let clinicalSignificances;
  let reviewStatuses;
  let molecularConsequenceArray;
  let molecularConsequenceById;
  let t03 = performance.now();
  const lines = rawTsv.split(/\r\n|\n/);
  perfTimes.rawTsvSplit = Math.round(performance.now() - t03);
  t03 = performance.now();
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === "") continue;
    if (line[0] === "#") {
      const firstChars = line.slice(0, 50);
      if (firstChars.includes("disease_mondo_ids_and_names")) {
        [diseaseArray, diseaseNamesById] = parseDiseaseKey(line);
      } else if (firstChars.includes("variant_types")) {
        variantTypes = getArray(line);
      } else if (firstChars.includes("clinical_significances")) {
        clinicalSignificances = getArray(line);
      } else if (firstChars.includes("clinical_review_statuses")) {
        reviewStatuses = getArray(line);
      } else if (firstChars.includes("molecular_consequences")) {
        [molecularConsequenceArray, molecularConsequenceById] = parseMolecularConsequenceKey(line);
      }
      continue;
    }
    break;
  }
  ;
  const t13 = performance.now();
  perfTimes.parseCacheLoop = Math.round(t13 - t03);
  return {
    getVariants,
    byteRangesByName,
    keys: {
      diseaseArray,
      diseaseNamesById,
      variantTypes,
      clinicalSignificances,
      reviewStatuses,
      molecularConsequenceArray,
      molecularConsequenceById
    }
  };
}

// node_modules/ideogram/src/js/init/caches/cache.js
async function initCaches(config2) {
  if (!config2.useCache) return;
  const organism = config2.organism;
  let cacheDir = null;
  if (config2.cacheDir) cacheDir = config2.cacheDir;
  if (config2.awaitCache) {
    const cachePromise = Promise.all([
      cacheFactory("gene", organism, config2, cacheDir),
      cacheFactory("paralog", organism, config2, cacheDir),
      cacheFactory("interaction", organism, config2, cacheDir),
      cacheFactory("synonym", organism, config2, cacheDir)
    ]);
    if (config2.showGeneStructureInTooltip) {
      cacheFactory("geneStructure", organism, config2, cacheDir);
      cacheFactory("protein", organism, config2, cacheDir);
      cacheFactory("tissue", organism, config2, cacheDir);
      if (config2.showVariantInTooltip) {
        cacheFactory("variant", organism, config2, cacheDir);
      }
    }
    return cachePromise;
  } else {
    cacheFactory("gene", organism, config2, cacheDir);
    cacheFactory("paralog", organism, config2, cacheDir);
    cacheFactory("interaction", organism, config2, cacheDir);
    if (config2.showGeneStructureInTooltip) {
      cacheFactory("geneStructure", organism, config2, cacheDir);
      cacheFactory("protein", organism, config2, cacheDir);
      cacheFactory("synonym", organism, config2, cacheDir);
      cacheFactory("tissue", organism, config2, cacheDir);
      if (config2.showVariantInTooltip) {
        cacheFactory("variant", organism, config2, cacheDir);
      }
    }
  }
}
var allCacheProps = {
  gene: {
    metadata: "Gene",
    dir: "genes",
    fn: setGeneCache,
    // worker: geneCacheWorker // Uncomment when workers work
    parseFn: parseGeneCache
    // Remove when workers work
  },
  paralog: {
    metadata: "Paralog",
    dir: "paralogs",
    fn: setParalogCache,
    // worker: paralogCacheWorker // Uncomment when workers work
    parseFn: parseParalogCache
    // Remove when workers work
  },
  interaction: {
    metadata: "Interaction",
    dir: "interactions",
    fn: setInteractionCache,
    extension: "json",
    // worker: interactionCacheWorker, // Uncomment when workers work
    parseFn: parseInteractionCache
    // Remove when workers work
  },
  geneStructure: {
    metadata: "GeneStructure",
    dir: "gene-structures",
    fn: setGeneStructureCache,
    // worker: geneStructureCacheWorker // Uncomment when workers work
    parseFn: parseGeneStructureCache
    // Remove when workers work
  },
  protein: {
    metadata: "Protein",
    dir: "proteins",
    fn: setProteinCache,
    // worker: proteinCacheWorker // Uncomment when workers work
    parseFn: parseProteinCache
    // Remove when workers work
  },
  synonym: {
    metadata: "Synonym",
    dir: "synonyms",
    fn: setSynonymCache,
    // worker: synonymCacheWorker // Uncomment when workers work
    parseFn: parseSynonymCache
    // Remove when workers work
  },
  tissue: {
    metadata: "Tissue",
    dir: "tissues",
    fn: setTissueCache,
    // worker: tissueCacheWorker // Uncomment when workers work
    parseFn: parseTissueCache
    // Remove when workers work
  },
  variant: {
    metadata: "Variant",
    dir: "variants",
    fn: setVariantCache,
    extension: "tsv.li",
    // worker: variantCacheWorker // Uncomment when workers work
    parseFn: parseVariantCacheIndex
    // Remove when workers work
  }
};
function setGeneCache(parsedCache) {
  const [
    interestingNames,
    nameCaseMap,
    namesById,
    fullNamesById,
    idsByName,
    lociByName,
    lociById
    //, sortedAnnots
  ] = parsedCache;
  Ideogram.geneCache = {
    interestingNames,
    // Array ordered by general or scholarly interest
    nameCaseMap,
    // Maps of lowercase gene names to proper gene names
    namesById,
    fullNamesById,
    idsByName,
    lociByName,
    // Object of gene positions, keyed by gene name
    lociById
    //, sortedAnnots // Ideogram annotations sorted by genomic position
  };
}
function setParalogCache(parsedCache) {
  const paralogsByName = parsedCache;
  Ideogram.paralogCache = { paralogsByName };
}
function setInteractionCache(parsedCache) {
  const interactionsByName = parsedCache;
  Ideogram.interactionCache = interactionsByName;
}
function setGeneStructureCache(parsedCache) {
  const featuresByGene = parsedCache;
  Ideogram.geneStructureCache = featuresByGene;
}
function setProteinCache(parsedCache) {
  Ideogram.proteinCache = parsedCache;
}
function setSynonymCache(parsedCache) {
  Ideogram.synonymCache = parsedCache;
}
function setTissueCache(parsedCache) {
  Ideogram.tissueCache = parsedCache;
}
function setVariantCache(parsedCache) {
  Ideogram.variantCache = parsedCache;
}
async function cacheFactory(cacheName, orgName, config2, cacheDir = null) {
  const cacheProps = allCacheProps[cacheName];
  const debug = config2.debug;
  const startTime = performance.now();
  let perfTimes = {};
  let parsedCache;
  if (!supportsCache(orgName, cacheProps.metadata)) return;
  const staticProp = cacheName + "Cache";
  if (Ideogram[staticProp] && Ideogram[staticProp][orgName]) {
    return;
  }
  if (!Ideogram[staticProp]) {
    Ideogram[staticProp] = {};
  }
  const extension = (cacheProps == null ? void 0 : cacheProps.extension) ?? "tsv";
  const cacheUrl = getCacheUrl(orgName, cacheDir, cacheProps.dir, extension);
  [parsedCache, perfTimes] = await fetchAndParse(cacheUrl, perfTimes, cacheProps.parseFn, orgName);
  if (debug) console.time(`${cacheName}Cache total`);
  return new Promise((resolve) => {
    cacheProps.fn(parsedCache, orgName);
    Ideogram[staticProp][orgName] = Ideogram[staticProp];
    if (debug) {
      console.timeEnd(`${cacheName}Cache total`);
      perfTimes.total = Math.round(performance.now() - startTime);
      const preamble = "perfTimes in init" + cacheProps.metadata + "Cache:";
      console.log(preamble, perfTimes);
    }
    resolve();
  });
}

// node_modules/ideogram/src/js/init/finish-init.js
function processLabels(config2, ideo) {
  var i, chrID, t0C, t1C;
  if (config2.showBandLabels === true) {
    t0C = (/* @__PURE__ */ new Date()).getTime();
    ideo.hideUnshownBandLabels();
    t1C = (/* @__PURE__ */ new Date()).getTime();
    if (config2.debug) {
      console.log("Time in showing bands: " + (t1C - t0C) + " ms");
    }
    if (config2.orientation === "vertical") {
      for (i = 0; i < ideo.chromosomesArray.length; i++) {
        chrID = "#" + ideo.chromosomesArray[i].id;
        ideo.rotateChromosomeLabels(d3.select(chrID), i);
      }
    }
  }
  if (config2.showChromosomeLabels === true) {
    ideo.drawChromosomeLabels(ideo.chromosomes);
  }
}
function processAnnots(ideo) {
  if (typeof ideo.timeout !== "undefined") window.clearTimeout(ideo.timeout);
  ideo.rawAnnots = ideo.setOriginalTrackIndexes(ideo.rawAnnots);
  if (ideo.config.annotationsDisplayedTracks) {
    ideo.annots = ideo.updateDisplayedTracks(ideo.config.annotationsDisplayedTracks);
  } else {
    ideo.annots = ideo.processAnnotData(ideo.rawAnnots);
    if (ideo.config.filterable) ideo.initCrossFilter();
    ideo.drawProcessedAnnots(ideo.annots);
  }
}
function waitForAndProcessAnnots(ideo) {
  if (ideo.rawAnnots) {
    processAnnots(ideo);
  } else {
    (function checkAnnotData() {
      ideo.timeout = setTimeout(function() {
        if (!ideo.rawAnnots || ideo.rawAnnots && typeof ideo.rawAnnots.then !== "undefined") {
          checkAnnotData();
        } else {
          processAnnots(ideo);
        }
      }, 50);
    })();
  }
}
function reportDebugTimings(config2, t03, t0A) {
  var t1A = (/* @__PURE__ */ new Date()).getTime();
  if (config2.debug) {
    console.log("Time in drawChromosome: " + (t1A - t0A) + " ms");
  }
  var t13 = (/* @__PURE__ */ new Date()).getTime();
  if (config2.debug) {
    console.log("Time constructing ideogram: " + (t13 - t03) + " ms");
  }
}
function finishInit(t03) {
  var t0A = (/* @__PURE__ */ new Date()).getTime(), ideo = this, config2 = ideo.config, confAnnots = config2.annotations;
  ideo.initDrawChromosomes();
  if (config2.annotationsPath) waitForAndProcessAnnots(ideo);
  processLabels(config2, ideo);
  if (config2.brush) ideo.createBrush(config2.brush);
  else if (config2.cursorPosition) ideo.createClickCursor(config2.cursorPosition);
  if (confAnnots) {
    if (Array.isArray(confAnnots)) {
      ideo.drawAnnots(confAnnots);
    } else {
      ideo.rawAnnots = confAnnots;
      ideo.afterRawAnnots();
      processAnnots(ideo);
    }
  }
  reportDebugTimings(config2, t03, t0A);
  ideo.setOverflowScroll();
  if (config2.geometry === "collinear") collinear_default(ideo);
  if (ideo.config.debug) console.time("initCache: Ideogram");
  initCaches(ideo.config).then(() => {
    if (ideo.config.debug) console.timeEnd("initCache: Ideogram");
    if (ideo.onLoadCallback) ideo.onLoadCallback();
  });
}

// node_modules/ideogram/src/js/ploidy.js
var Ploidy = class {
  constructor(config2) {
    this._config = config2;
    this._description = this._normalize(this._config.ploidyDesc);
  }
  // Get number of chromosomes in a chromosome set
  getChromosomesNumber(setIndex) {
    if (this._config.ploidyDesc) {
      var chrSetCode = this._config.ploidyDesc[setIndex];
      if (chrSetCode instanceof Object) {
        return Object.keys(chrSetCode)[0].length;
      } else {
        return chrSetCode.length;
      }
    } else {
      return this._config.ploidy || 1;
    }
  }
  // Normalize use defined description
  _normalize(description) {
    var key, descValue, normalized = [];
    if (!description) return description;
    for (key in description) {
      descValue = description[key];
      if (typeof descValue === "string") {
        if (this._config.orientation === "vertical") {
          descValue = descValue.split("").reverse();
        }
        normalized.push({
          ancestors: descValue,
          existence: this._getexistenceArray(descValue.length)
        });
      } else {
        normalized.push({
          ancestors: Object.keys(descValue)[0],
          existence: descValue[Object.keys(descValue)[0]]
        });
      }
    }
    return normalized;
  }
  // Get array filled by '11' elements
  _getexistenceArray(length2) {
    var array3 = [];
    for (var i = 0; i < length2; i++) {
      array3.push("11");
    }
    return array3;
  }
  getSetSize(chrSetIndex) {
    if (this._description) {
      return this._description[chrSetIndex].ancestors.length;
    } else {
      return 1;
    }
  }
  // Get ancestor letter
  getAncestor(chrSetIndex, chrIndex) {
    if (this._description) {
      return this._description[chrSetIndex].ancestors[chrIndex];
    } else {
      return "";
    }
  }
  // Check if chromosome's arm should be rendered.
  // If no description was provided, method returns true and
  // something another depending on user provided description.
  exists(chrSetIndex, chrIndex, armIndex) {
    if (this._description) {
      var desc = this._description[chrSetIndex].existence[chrIndex][armIndex];
      return Number(desc) > 0;
    } else {
      return true;
    }
  }
};

// node_modules/ideogram/src/js/views/chromosome-util.js
var ChromosomeUtil = class {
  constructor(node) {
    this._node = node;
  }
  getLabel() {
    var label = d3.select(this._node.parentNode).select("text.chrLabel").text();
    return label;
  }
  /**
   * Get chromosome set label
   */
  getSetLabel() {
    var setLabel = d3.select(this._node.parentNode).select("text.chrSetLabel").text();
    return setLabel;
  }
};

// node_modules/ideogram/src/js/layouts/layout.js
var Layout = class {
  constructor(config2, ideo) {
    this._config = config2;
    this._ideo = ideo;
    this._ploidy = this._ideo._ploidy;
    this._translate = void 0;
    if ("chrSetMargin" in config2) {
      this.chrSetMargin = config2.chrSetMargin;
    } else {
      var chrMargin = this._config.chrMargin;
      this.chrSetMargin = this._config.ploidy > 1 ? chrMargin : 0;
    }
    this._tickSize = 8;
    this._isRotated = false;
  }
  // Get chart left margin
  _getLeftMargin() {
    return this.margin.left;
  }
  // Get rotated chromosome y scale
  _getYScale() {
    return 20 / this._config.chrWidth;
  }
  // Get chromosome labels
  getChromosomeLabels(chrElement) {
    var util = new ChromosomeUtil(chrElement), labels = [];
    if (this._ideo.config.ploidy > 1) {
      labels.push(util.getSetLabel());
    }
    labels.push(util.getLabel());
    return labels.filter(function(d) {
      return d.length > 0;
    });
  }
  getChromosomeBandLabelTranslate(band2) {
    var x, y2, translate, ideo = this._ideo, tickSize = this._tickSize, orientation = ideo.config.orientation;
    if (orientation === "vertical") {
      x = tickSize;
      y2 = ideo.round(2 + band2.px.start + band2.px.width / 2);
      translate = "rotate(-90)translate(" + x + "," + y2 + ")";
    } else if (orientation === "horizontal") {
      x = ideo.round(-tickSize + band2.px.start + band2.px.width / 2);
      y2 = -10;
      translate = "translate(" + x + "," + y2 + ")";
    }
    return {
      x,
      y: y2,
      translate
    };
  }
  didRotate(chrIndex, chrElement) {
    var ideo, taxid, chrName, bands, chrModel, oldWidth, chrSetElement, transform, scale, scaleRE;
    ideo = this._ideo;
    taxid = ideo.config.taxid;
    chrName = chrElement.id.split("-")[0].replace("chr", "");
    chrModel = ideo.chromosomes[taxid][chrName];
    bands = chrModel.bands;
    chrSetElement = d3.select(chrElement.parentNode);
    transform = chrSetElement.attr("transform");
    scaleRE = /scale\(.*\)/;
    scale = scaleRE.exec(transform);
    transform = transform.replace(scale, "");
    chrSetElement.attr("transform", transform);
    oldWidth = chrModel.width;
    chrModel = ideo.getChromosomeModel(bands, chrName, taxid, chrIndex);
    chrModel.oldWidth = oldWidth;
    ideo.chromosomes[taxid][chrName] = chrModel;
    ideo.drawChromosome(chrModel);
    ideo.handleRotateOnClick();
    if (ideo.rawAnnots) {
      if (ideo.displayedTrackIndexes) {
        ideo.updateDisplayedTracks(ideo.displayedTrackIndexes);
      } else {
        ideo.annots = ideo.processAnnotData(ideo.rawAnnots);
        ideo.drawProcessedAnnots(ideo.annots);
        if (ideo.config.filterable) {
          ideo.initCrossFilter();
        }
      }
    }
    if (ideo.config.showBandLabels === true) {
      ideo.drawBandLabels(ideo.chromosomes);
      ideo.hideUnshownBandLabels();
    }
    if (ideo.onDidRotateCallback) {
      ideo.onDidRotateCallback(chrModel);
    }
  }
  rotate(chrSetIndex, chrIndex, chrElement) {
    var ideo, otherChrs, ideoBounds, labelSelectors;
    ideo = this._ideo;
    labelSelectors = ideo.selector + " .chrSetLabel, " + ideo.selector + " .chrLabel";
    ideoBounds = document.querySelector(ideo.selector).getBoundingClientRect();
    otherChrs = d3.selectAll(ideo.selector + " g.chromosome").filter(function() {
      return this !== chrElement;
    });
    if (this._isRotated) {
      this._isRotated = false;
      ideo.config.chrHeight = ideo.config.chrHeightOriginal;
      ideo.config.chrWidth = ideo.config.chrWidthOriginal;
      ideo.config.annotationHeight = ideo.config.annotationHeightOriginal;
      this.rotateBack(chrSetIndex, chrIndex, chrElement, function() {
        otherChrs.style("display", null);
        d3.selectAll(labelSelectors).style("display", null);
        ideo._layout.didRotate(chrIndex, chrElement);
      });
    } else {
      this._isRotated = true;
      otherChrs.style("display", "none");
      d3.selectAll(labelSelectors).style("display", "none");
      this.rotateForward(chrSetIndex, chrIndex, chrElement, function() {
        var chrHeight, elementLength, windowLength;
        ideo.config.chrHeightOriginal = ideo.config.chrHeight;
        ideo.config.chrWidthOriginal = ideo.config.chrWidth;
        ideo.config.annotationHeightOriginal = ideo.config.annotationHeight;
        const settingsGearWidth = 20;
        if (ideo._layout._class === "VerticalLayout") {
          elementLength = ideoBounds.width - settingsGearWidth;
          windowLength = window.innerWidth - settingsGearWidth;
        } else {
          elementLength = ideoBounds.height - 10;
          windowLength = window.innerHeight - 10;
        }
        if (windowLength < elementLength) {
          chrHeight = windowLength;
        } else {
          chrHeight = elementLength;
        }
        chrHeight -= ideo.config.chrMargin * 2;
        ideo.config.chrHeight = chrHeight;
        ideo.config.chrWidth *= 2.3;
        ideo.config.annotationHeight *= 1.7;
        ideo._layout.didRotate(chrIndex, chrElement);
      });
    }
  }
  getChromosomeLabelClass() {
    if (this._config.ploidy === 1) {
      return "chrLabel";
    } else {
      return "chrSetLabel";
    }
  }
  _getAdditionalOffset() {
    var config2 = this._config;
    var numTracks = config2.annotationsNumTracks || config2.numAnnotTracks || 1;
    return (config2.annotationHeight || 0) * numTracks;
  }
  _getChromosomeSetSize(chrSetIndex) {
    var setSize = this._ploidy.getSetSize(chrSetIndex);
    return setSize * this._config.chrWidth * 2 + this.chrSetMargin;
  }
  // Get chromosome set label anchor property
  getChromosomeSetLabelAnchor() {
    return "middle";
  }
  // Get chromosome label y position.
  getChromosomeLabelYPosition() {
    return -5.5;
  }
  getChromosomeSetLabelYPosition(chrIndex) {
    if (this._config.ploidy === 1) {
      return this.getChromosomeLabelYPosition(chrIndex);
    } else {
      return -2 * this._config.chrWidth;
    }
  }
};
var layout_default = Layout;

// node_modules/ideogram/src/js/layouts/vertical-layout.js
var VerticalLayout = class extends layout_default {
  constructor(config2, ideo) {
    super(config2, ideo);
    this._class = "VerticalLayout";
    this.margin = {
      top: 30,
      left: 15
    };
  }
  rotateForward(chrSetIndex, chrIndex, chrElement, callback) {
    var self2 = this;
    var xOffset = 20;
    var scale = this.getChromosomeScale(chrElement);
    var transform = "translate(" + xOffset + ", 25) " + scale;
    d3.select(chrElement.parentNode).transition().attr("transform", transform).on("end", callback);
    var labels = this.getChromosomeLabels(chrElement);
    var y2 = (xOffset + self2._config.chrWidth) * 1.3;
    d3.select(this._ideo.getSvg()).append("g").attr("class", "tmp").selectAll("text").data(labels).enter().append("text").attr("class", function(d, i) {
      return i === 0 && labels.length === 2 ? "chrSetLabel" : null;
    }).attr("x", 0).attr("y", y2).style("opacity", 0).text(String).transition().style("opacity", 1);
    this._ideo.config.orientation = "horizontal";
  }
  rotateBack(setIndex, chrIndex, chrElement, callback) {
    var scale = this.getChromosomeScaleBack(chrElement);
    var translate = this.getChromosomeSetTranslate(setIndex);
    d3.select(chrElement.parentNode).transition().attr("transform", translate + " " + scale).on("end", callback);
    d3.selectAll(this._ideo.selector + " g.tmp").style("opacity", 0).remove();
    this._ideo.config.orientation = "vertical";
  }
  getHeight() {
    return this._config.chrHeight + this.margin.top * 1.5;
  }
  getWidth() {
    return "97%";
  }
  getChromosomeBandTickY1() {
    return 2;
  }
  getChromosomeBandTickY2() {
    return 10;
  }
  getChromosomeSetLabelTranslate() {
    return "rotate(-90)";
  }
  getChromosomeBandLabelAnchor() {
    return null;
  }
  getChromosomeScale(chrElement) {
    var ideoBox, chrBox, scaleX, scaleY;
    ideoBox = d3.select(this._ideo.selector).node().getBoundingClientRect();
    chrBox = chrElement.getBoundingClientRect();
    scaleX = ideoBox.width / chrBox.height * 0.97;
    scaleY = this._getYScale();
    return "scale(" + scaleX + ", " + scaleY + ")";
  }
  getChromosomeScaleBack(chrElement) {
    var scale, scaleX, scaleY, chrName, chrModel, taxid, ideo, config2;
    ideo = this._ideo;
    config2 = ideo.config;
    taxid = config2.taxid;
    chrName = chrElement.id.split("-")[0].replace("chr", "");
    chrModel = this._ideo.chromosomes[taxid][chrName];
    scaleX = chrModel.oldWidth / (config2.chrHeight * 3) * 0.97;
    scaleY = 1 / this._getYScale();
    scale = "scale(" + scaleX + ", " + scaleY + ")";
    return scale;
  }
  getChromosomeSetTranslate(setIndex) {
    var marginTop = this.margin.top;
    var chromosomeSetYTranslate = this.getChromosomeSetYTranslate(setIndex);
    return "rotate(90) translate(" + marginTop + ", -" + chromosomeSetYTranslate + ")";
  }
  getChromosomeSetYTranslate(setIndex) {
    var pad3 = this._getAdditionalOffset(), config2 = this._config, margin = config2.chrMargin, width = config2.chrWidth, translate;
    if (!config2.ploidyDesc) {
      if (config2.annotationsLayout === "histogram") {
        var barWidth = config2.barWidth;
        return margin + setIndex * (margin + width + 3) + barWidth * 2;
      } else {
        const decorPad = "legendPad" in config2 ? config2.legendPad : 0;
        translate = width + setIndex * (margin + width) + pad3 * 2 + decorPad;
        if (pad3 > 0) {
          return translate;
        } else {
          return translate + 4 + 2 * setIndex;
        }
      }
    }
    if (!this._translate) {
      this._translate = [this._ploidy.getSetSize(0) * width * 2];
      var prevTranslate;
      for (var i = 1; i < this._config.ploidyDesc.length; i++) {
        prevTranslate = this._translate[i - 1];
        this._translate[i] = prevTranslate + this._getChromosomeSetSize(i - 1);
      }
    }
    return this._translate[setIndex];
  }
  getChromosomeSetLabelXPosition() {
    return this._config.chrWidth * this._config.ploidy / -2;
  }
  getChromosomeLabelXPosition() {
    return this._config.chrWidth / -2;
  }
};
var vertical_layout_default = VerticalLayout;

// node_modules/ideogram/src/js/layouts/horizontal-layout.js
var HorizontalLayout = class extends layout_default {
  constructor(config2, ideo) {
    super(config2, ideo);
    this._class = "HorizontalLayout";
    this.margin = {
      left: 20,
      top: 30
    };
  }
  _getLeftMargin() {
    var margin = layout_default.prototype._getLeftMargin.call(this);
    if (this._config.ploidy > 1) {
      margin *= 1.8;
    }
    return margin;
  }
  rotateForward(setIndex, chrIndex, chrElement, callback) {
    var xOffset, yOffset, transform, labels;
    xOffset = 30;
    yOffset = xOffset + 7.5;
    transform = "rotate(90) translate(" + xOffset + ", -" + yOffset + ") ";
    d3.select(chrElement.parentNode).transition().attr("transform", transform).on("end", callback);
    labels = this.getChromosomeLabels(chrElement);
    d3.select(this._ideo.getSvg()).append("g").attr("class", "tmp").selectAll("text").data(labels).enter().append("text").attr("class", function(d, i) {
      return i === 0 && labels.length === 2 ? "chrSetLabel" : null;
    }).attr("x", xOffset - 4).attr("y", function(d, i) {
      return (i + 1 + labels.length % 2) * 12;
    }).style("text-anchor", "middle").style("opacity", 0).text(String).transition().style("opacity", 1);
    this._ideo.config.orientation = "vertical";
  }
  rotateBack(setIndex, chrIndex, chrElement, callback) {
    var translate = this.getChromosomeSetTranslate(setIndex);
    d3.select(chrElement.parentNode).transition().attr("transform", translate).on("end", callback);
    d3.selectAll(this._ideo.selector + " g.tmp").style("opacity", 0).remove();
    this._ideo.config.orientation = "horizontal";
  }
  getHeight(taxid) {
    if (typeof taxid === "undefined") taxid = this._config.taxids[0];
    var numChromosomes = this._config.chromosomes[taxid].length;
    var lastSetOffset = this.getChromosomeSetYTranslate(numChromosomes - 1);
    var lastSetSize = this._getChromosomeSetSize(numChromosomes - 1);
    lastSetOffset += lastSetSize;
    return lastSetOffset + this._getAdditionalOffset() * 2;
  }
  getWidth() {
    return this._config.chrHeight + this.margin.top * 1.5;
  }
  getChromosomeSetLabelAnchor() {
    return "end";
  }
  getChromosomeBandLabelAnchor() {
    return null;
  }
  getChromosomeBandTickY1() {
    return 2;
  }
  getChromosomeBandTickY2() {
    return 10;
  }
  getChromosomeSetLabelTranslate() {
    return null;
  }
  getChromosomeSetTranslate(setIndex) {
    var leftMargin = this._getLeftMargin();
    var yTranslate = this.getChromosomeSetYTranslate(setIndex);
    return "translate(" + leftMargin + ", " + yTranslate + ")";
  }
  getChromosomeSetYTranslate(setIndex) {
    if (!this._config.ploidyDesc) {
      return this._config.chrMargin * (setIndex + 1);
    }
    if (!this._translate) {
      this._translate = [1];
      for (var i = 1; i < this._config.ploidyDesc.length; i++) {
        this._translate[i] = this._translate[i - 1] + this._getChromosomeSetSize(i - 1);
      }
    }
    return this._translate[setIndex];
  }
  getChromosomeSetLabelXPosition(i) {
    if (this._config.ploidy === 1) {
      return this.getChromosomeLabelXPosition(i);
    } else {
      return -20;
    }
  }
  getChromosomeSetLabelYPosition(i) {
    var setSize = this._ploidy.getSetSize(i), config2 = this._config, chrMargin = config2.chrMargin, chrWidth = config2.chrWidth, y2;
    if (config2.ploidy === 1) {
      y2 = chrWidth / 2 + 3;
    } else {
      y2 = setSize * chrMargin / 2;
    }
    return y2;
  }
  getChromosomeLabelXPosition() {
    return -8;
  }
  getChromosomeLabelYPosition() {
    return this._config.chrWidth;
  }
};
var horizontal_layout_default = HorizontalLayout;

// node_modules/ideogram/src/js/layouts/paired-layout.js
var PairedLayout = class extends layout_default {
  constructor(config2, ideo) {
    super(config2, ideo);
    this._class = "PairedLayout";
    this.margin = {
      left: 30
    };
  }
  getHeight() {
    return this._config.chrHeight + this.margin.left * 1.5;
  }
  getWidth() {
    return "97%";
  }
  getChromosomeBandTickY1(chrIndex) {
    return chrIndex % 2 ? this._config.chrWidth : this._config.chrWidth * 2;
  }
  getChromosomeBandTickY2(chrIndex) {
    var width = this._config.chrWidth;
    return chrIndex % 2 ? width - this._tickSize : width * 2 + this._tickSize;
  }
  getChromosomeBandLabelAnchor(chrIndex) {
    return chrIndex % 2 ? null : "end";
  }
  getChromosomeBandLabelTranslate(band2, chrIndex) {
    var x = chrIndex % 2 ? 10 : -this._config.chrWidth - 10;
    var y2 = this._ideo.round(band2.px.start + band2.px.width / 2) + 3;
    return {
      x: y2,
      y: y2,
      translate: "rotate(-90) translate(" + x + ", " + y2 + ")"
    };
  }
  getChromosomeLabelXPosition() {
    return -this._tickSize;
  }
  getChromosomeSetLabelXPosition() {
    return this._config.chrWidth / -2;
  }
  getChromosomeSetLabelTranslate() {
    return "rotate(-90)";
  }
  getChromosomeSetTranslate(setIndex) {
    var chromosomeSetYTranslate = this.getChromosomeSetYTranslate(setIndex);
    return "rotate(90) translate(" + this.margin.left + ", -" + chromosomeSetYTranslate + ")";
  }
  getChromosomeSetYTranslate(setIndex) {
    return 200 * (setIndex + 1);
  }
};
var paired_layout_default = PairedLayout;

// node_modules/ideogram/src/js/layouts/small-layout.js
var SmallLayout = class extends layout_default {
  constructor(config2, ideo) {
    super(config2, ideo);
    this._class = "SmallLayout";
    this.margin = {
      left: 36.5,
      top: 10
    };
    var taxid = this._ideo.getTaxid(this._ideo.config.organism);
    this.chrs = config2.chromosomes[taxid];
    var numChrs = this.chrs.length;
    this.chrsPerRow = Math.ceil(numChrs / config2.rows);
  }
  // rotateForward(setIndex, chrIndex, chrElement, callback) {
  //   var ideoBox =
  //      d3.select(this._ideo.selector).node().getBoundingClientRect();
  //   var chrBox = chrElement.getBoundingClientRect();
  //
  //   var scaleX = (ideoBox.width / chrBox.height) * 0.97;
  //   var scaleY = this._getYScale();
  //
  //   transform = 'translate(5, 25) scale(' + scaleX + ', ' + scaleY + ')';
  //
  //   d3.select(chrElement.parentNode)
  //     .transition()
  //     .attr('transform', transform)
  //     .on('end', callback);
  // }
  //
  // rotateBack(setIndex, chrIndex, chrElement, callback) {
  //   var translate = this.getChromosomeSetTranslate(setIndex);
  //
  //   d3.select(chrElement.parentNode)
  //     .transition()
  //     .attr('transform', translate)
  //     .on('end', callback);
  // }
  /**
   * eweitz 2020-04-13:
   * This height metric is crude because it is calculated before
   * the height ("width") of each chromosome is calculated.
   *
   * It calculates height by multiplying the max height of all chromosomes
   * (specified in the Ideogram configuration object) by the number of rows.
   * This ensures the ideogram height doesn't truncate in cases like dog
   * (where chrX on the second row is longer than chr1 on the first), but it
   * often leaves too much space on the second row, e.g. for human.
   *
   * Ideally, ideogram height would be cumulative height per row, plus top
   * margin.  This would require calling getHeight _after_ all chromosomes
   * have had their height (technically, chr.width) assigned.  See draft new
   * getHeight method below this getHeight method.
  */
  getHeight() {
    var config2 = this._config;
    var chrHeight = config2.chrHeight * 1.25;
    return this._config.rows * (chrHeight + this.margin.top);
  }
  /**
   * eweitz 2020-04-13:
   * Draft refinement of getHeight.  See note in classic version above.
   *
   * Total height is cumulative height per row, plus top margin
   */
  // getHeight() {
  //   let height = 0;
  //   const rows = this._config.rows;
  //   const chrEntries = Object.entries(this.chrs);
  //   for (let i = 0; i < rows; i++) {
  //     let rowHeight = 0;
  //     // Starting and ending indexes of chromosomes of this row
  //     const startIndex = this.chrsPerRow * i;
  //     const endIndex = this.chrsPerRow * (i + 1) - 1;
  //     for (let j = startIndex; j < endIndex; j++) {
  //       const thisChrHeight = chrEntries[j][1].width;
  //       if (thisChrHeight > rowHeight) {
  //         rowHeight = thisChrHeight;
  //       }
  //     }
  //     height += rowHeight + this.margin.top;
  //   }
  //   return height;
  // }
  getWidth() {
    return "97%";
  }
  getChromosomeBandLabelTranslate() {
  }
  getChromosomeSetLabelTranslate() {
    return "rotate(-90)";
  }
  getChromosomeSetTranslate(setIndex) {
    var xOffset, yOffset;
    if (setIndex > this.chrsPerRow - 1) {
      xOffset = this.margin.left + this._config.chrHeight * 1.3;
      yOffset = this.getChromosomeSetYTranslate(setIndex - this.chrsPerRow);
    } else {
      xOffset = this.margin.left;
      yOffset = this.getChromosomeSetYTranslate(setIndex);
    }
    return "rotate(90) translate(" + xOffset + ", -" + yOffset + ")";
  }
  getChromosomeSetYTranslate(setIndex) {
    var additionalPadding = this._getAdditionalOffset() * 0.3;
    return this.margin.left * setIndex + this._config.chrWidth + additionalPadding * 2 + additionalPadding * setIndex;
  }
  getChromosomeSetLabelXPosition(setIndex) {
    return (this._ploidy.getSetSize(setIndex) * this._config.chrWidth + 20) / -2 + (this._config.ploidy > 1 ? 0 : this._config.chrWidth);
  }
  getChromosomeLabelXPosition() {
    return this._config.chrWidth / -2;
  }
};
var small_layout_default = SmallLayout;

// node_modules/ideogram/src/js/layouts/layout-adapter.js
function getLayout(ideo) {
  var config2 = ideo.config;
  if ("perspective" in config2 && config2.perspective === "comparative") {
    return new paired_layout_default(config2, ideo);
  } else if ("rows" in config2 && config2.rows > 1) {
    return new small_layout_default(config2, ideo);
  } else if (config2.orientation === "vertical") {
    return new vertical_layout_default(config2, ideo);
  } else if (config2.orientation === "horizontal") {
    return new horizontal_layout_default(config2, ideo);
  } else {
    return new vertical_layout_default(config2, ideo);
  }
}

// node_modules/ideogram/src/js/init/write-container.js
function setPloidy(ideo) {
  if ("ploidyDesc" in ideo.config && typeof ideo.config.ploidyDesc === "string") {
    var tmp = [];
    for (var i = 0; i < ideo.numChromosomes; i++) {
      tmp.push(ideo.config.ploidyDesc);
    }
    ideo.config.ploidyDesc = tmp;
  }
  ideo._ploidy = new Ploidy(ideo.config);
}
function getContainerSvgClass(ideo) {
  var svgClass = "";
  if (ideo.config.showChromosomeLabels) {
    if (ideo.config.orientation === "horizontal") {
      svgClass += "labeledLeft ";
    } else {
      svgClass += "labeled ";
    }
  }
  if (ideo.config.rotatable === false) {
    svgClass += "no-rotate ";
  }
  if (ideo.config.annotationsLayout && ideo.config.annotationsLayout === "overlay") {
    svgClass += "faint";
  }
  return svgClass;
}
function handleEscape(event) {
  if (event.keyCode === 27) {
    const tooltip = document.querySelector("._ideogramTooltip");
    if (tooltip) {
      tooltip.style.opacity = 0;
    }
    const pathwayContainer = document.querySelector("#ideo-pathway-container");
    if (pathwayContainer) {
      pathwayContainer.remove();
    }
  }
}
function writeTooltipContainer(ideo) {
  d3.select(ideo.config.container + " #_ideogramOuterWrap").append("div").attr("class", "_ideogramTooltip").attr("id", `${ideo.config.container.replace("#", "")}_ideogramTooltip`).style("opacity", 0).style("position", "fixed").style("text-align", "center").style("padding", "4px").style("font", "12px sans-serif").style("background", "white").style("border", "1px solid black").style("border-radius", "5px").style("z-index", "1000").style("margin-left", "-2px");
  document.removeEventListener("keydown", handleEscape);
  document.addEventListener("keydown", handleEscape);
}
function writeContainerDom(ideo) {
  d3.selectAll(ideo.config.container + " #_ideogramOuterWrap").remove();
  d3.select(ideo.config.container).append("div").attr("id", "_ideogramOuterWrap").append("div").attr("id", "_ideogramTrackLabelContainer").style("position", "absolute");
  d3.select(ideo.config.container + " #_ideogramOuterWrap").append("div").attr("id", "_ideogramMiddleWrap").style("position", "relative").style("overflow-x", "auto").style("transform", "translateZ(0)").append("div").attr("id", "_ideogramInnerWrap").append("svg").attr("id", "_ideogram").attr("class", getContainerSvgClass(ideo)).attr("width", ideo._layout.getWidth()).attr("height", ideo._layout.getHeight()).html(ideo.getBandColorGradients());
}
function writeContainer(t03) {
  var ideo = this;
  if (ideo.config.annotationsPath) {
    ideo.fetchAnnots(ideo.config.annotationsPath);
  }
  setPloidy(ideo);
  ideo._layout = getLayout(ideo);
  writeContainerDom(ideo);
  ideo.isOnlyIdeogram = document.querySelectorAll("#_ideogram").length === 1;
  writeTooltipContainer(ideo);
  ideo.finishInit(t03);
}

// node_modules/ideogram/src/js/bands/fetch.js
var lastBandDataUrl = "";
function getBandUrl(bandDataFileNames, taxid, ideo) {
  return ideo.config.dataDir + bandDataFileNames[taxid];
}
function shouldFetchBands(bandDataFileNames, taxid, ideo) {
  var bandDataUrl = getBandUrl(bandDataFileNames, taxid, ideo);
  return (!(typeof window.chrBands !== "undefined" && lastBandDataUrl === "") || lastBandDataUrl !== bandDataUrl) && hasNonGenBankAssembly(ideo) && taxid in bandDataFileNames;
}
function setBandData(url, fileNames, chrBands2, ideo) {
  var taxid, fetchedTaxid, fileName;
  for (taxid in fileNames) {
    fileName = fileNames[taxid];
    if (url.includes(fileName) && fileName !== "") {
      fetchedTaxid = taxid;
    }
  }
  ideo.bandData[fetchedTaxid] = chrBands2;
}
function fetchBands(bandDataFileNames, taxid, t03, ideo) {
  var bandDataUrl = getBandUrl(bandDataFileNames, taxid, ideo);
  if (!ideo.numBandDataResponses) ideo.numBandDataResponses = 0;
  return fetchWithRetry(bandDataUrl).then(function(response) {
    return response.json().then(function(rawBands) {
      lastBandDataUrl = bandDataUrl;
      delete window.chrBands;
      window.chrBands = rawBands.chrBands;
      setBandData(response.url, bandDataFileNames, chrBands, ideo);
    });
  });
}

// node_modules/ideogram/src/js/init/init.js
function isHeterogameticChromosome(chrModel, chrIndex, ideo) {
  var ploidy = ideo.config.ploidy;
  return "sex" in ideo.config && (ploidy === 2 && ideo.sexChromosomes.index + 1 === chrIndex || ideo.config.sex === "female" && chrModel.name === "Y");
}
function prepareChromosomes(bandsArray, chrs, taxid, ideo) {
  var j, bands, chromosome, chrModel, chrIndex;
  for (j = 0; j < chrs.length; j++) {
    chromosome = chrs[j];
    if (typeof bandsArray !== "undefined") bands = bandsArray[j];
    chrIndex = j + ideo.config.taxids.indexOf(taxid);
    chrModel = ideo.getChromosomeModel(bands, chromosome, taxid, chrIndex);
    if (typeof chromosome !== "string") {
      chromosome = chromosome.name.split(" ").slice(-1)[0].replace("chr", "");
    }
    ideo.chromosomes[taxid][chromosome] = chrModel;
    ideo.chromosomesArray.push(chrModel);
    if (isHeterogameticChromosome(chrModel, j, ideo)) continue;
    ideo.drawChromosome(chrModel);
  }
}
function setCoordinateSystem(chrs, ideo) {
  if (typeof chrBands !== "undefined" && chrs.length >= chrBands.length / 2) {
    ideo.coordinateSystem = "bp";
  }
}
function initDrawChromosomes() {
  var taxid, i, chrs, bandsArray, ideo = this, taxids = ideo.config.taxids;
  for (i = 0; i < taxids.length; i++) {
    taxid = taxids[i];
    chrs = ideo.config.chromosomes[taxid];
    bandsArray = ideo.bandsArray[taxid];
    if (!ideo.config.showNonNuclearChromosomes) {
      chrs = chrs.filter((chr) => chr !== "MT");
      if (typeof bandsArray !== "undefined") {
        bandsArray = bandsArray.filter((bands) => {
          return bands[0].chr !== "MT";
        });
      }
    }
    setCoordinateSystem(chrs, ideo);
    ideo.chromosomes[taxid] = {};
    ideo.setSexChromosomes(chrs);
    prepareChromosomes(bandsArray, chrs, taxid, ideo);
    if (ideo.config.showBandLabels) ideo.drawBandLabels(ideo.chromosomes);
    ideo.handleRotateOnClick();
    ideo._gotChrModels = true;
  }
}
function handleRotateOnClick() {
  var ideo = this;
  if (!("rotatable" in ideo.config && ideo.config.rotatable === false)) {
    d3.selectAll(ideo.selector + " .chromosome-set").on("click", function() {
      const element = this.children[1];
      ideo.rotateAndToggleDisplay(element);
    });
  } else {
    d3.selectAll(ideo.selector).style("cursor", "default");
  }
}
function onLoad() {
  call(this.onLoadCallback);
}
function getBandFileName(taxid, accession, ideo) {
  var organism = ideo.organisms[taxid];
  var bandFileName = [slug(organism.scientificName)];
  var assemblies = organism.assemblies;
  var resolution = ideo.config.resolution;
  if (accession !== assemblies.default) {
    bandFileName.push(accession);
  }
  if (taxid === "9606" && (accession in assemblies === "false" && Object.values(assemblies).includes(config.assembly) || resolution !== "" && resolution !== 850)) {
    bandFileName.push(resolution);
  }
  bandFileName = bandFileName.join("-");
  var fullyBandedTaxids = ["9606", "10090", "10116"];
  if (fullyBandedTaxids.includes(taxid) && !ideo.config.showFullyBanded) {
    bandFileName += "-no-bands";
  }
  bandFileName += ".json";
  return bandFileName;
}
function getBandFileNames(taxid, bandFileNames, ideo) {
  var organism, assemblies, accession, bandFileName, config2 = ideo.config;
  organism = ideo.organisms[taxid];
  if (!config2.assembly) ideo.config.assembly = "default";
  assemblies = organism.assemblies;
  if (ideo.assemblyIsAccession()) {
    accession = config2.assembly;
  } else {
    accession = assemblies[config2.assembly];
  }
  bandFileName = getBandFileName(taxid, accession, ideo);
  var isCustomOrganism = taxid === "-1";
  if (taxid in ideo.organismsWithBands || isCustomOrganism) {
    bandFileNames[taxid] = bandFileName;
  }
  return bandFileNames;
}
function prepareContainer(taxid, bandFileNames, t03, ideo) {
  if (shouldFetchBands(bandFileNames, taxid, ideo)) {
    return fetchBands(bandFileNames, taxid, t03, ideo).then(function() {
      return ideo.processBandData(taxid);
    });
  } else {
    return new Promise(function(resolve) {
      ideo.processBandData(taxid);
      resolve([taxid, void 0]);
    });
  }
}
function initializeTaxids(ideo) {
  return new Promise(function(resolve) {
    var organism = ideo.config.organism;
    if (typeof organism === "number") {
      ideo.getOrganismFromEutils(organism, function() {
        ideo.getTaxids(resolve);
      });
    } else {
      ideo.getTaxids(resolve);
    }
  });
}
function getBandsAndPrepareContainer(taxids, t03, ideo) {
  var bandFileNames, i, taxid, promises = [];
  bandFileNames = {};
  for (taxid in organismMetadata) {
    bandFileNames[taxid] = "";
  }
  for (i = 0; i < taxids.length; i++) {
    taxid = String(taxids[i]);
    bandFileNames = getBandFileNames(taxid, bandFileNames, ideo);
    promises.push(prepareContainer(taxid, bandFileNames, t03, ideo));
  }
  Promise.all(promises).then(function(taxidsAndBandsArrays) {
    var taxidAndBandsArray, taxid2, bandsArray;
    for (i = 0; i < taxidsAndBandsArrays.length; i++) {
      taxidAndBandsArray = taxidsAndBandsArrays[i];
      taxid2 = taxidAndBandsArray[0];
      bandsArray = taxidAndBandsArray[1];
      if ("bandsArray" in ideo === false) {
        ideo.bandsArray = {};
      }
      ideo.bandsArray[taxid2] = bandsArray;
    }
    ideo.writeContainer(t03);
  });
}
var ideoNext = {};
var ideoQueued = {};
var ideoWait = {};
function init2(ideo) {
  ideo = ideo || this;
  var containerId = ideo.config.container;
  if (ideoWait[containerId]) {
    ideoQueued[containerId] = true;
    ideoNext[containerId] = ideo;
  } else {
    ideoWait[containerId] = true;
    initializeTaxids(ideo).then(function(taxids) {
      var taxid = taxids[0];
      ideo.config.taxid = taxid;
      ideo.config.taxids = taxids;
      ideo.organismScientificName = ideo.getScientificName(ideo.config.taxid);
      var t03 = (/* @__PURE__ */ new Date()).getTime();
      getBandsAndPrepareContainer(taxids, t03, ideo);
      ideoWait[containerId] = false;
      if (ideoQueued[containerId]) {
        ideoQueued[containerId] = false;
        init2(ideoNext[containerId]);
      }
    });
  }
}

// node_modules/ideogram/src/js/parsers/bed-parser.js
var BedParser = class _BedParser {
  constructor(bed, ideo) {
    this.rawAnnots = this.parseBed(bed, ideo);
  }
  // http://stackoverflow.com/a/5624139
  static componentToHex(c) {
    var hex2 = parseInt(c, 10).toString(16);
    return hex2.length === 1 ? "0" + hex2 : hex2;
  }
  static rgbToHex(r2, g, b) {
    return "#" + _BedParser.componentToHex(r2) + _BedParser.componentToHex(g) + _BedParser.componentToHex(b);
  }
  parseGenomicCoordinates(columns, ucscStyle) {
    var chr, start3, stop2, length2;
    chr = columns[0];
    start3 = parseInt(columns[1], 10);
    stop2 = parseInt(columns[2], 10);
    length2 = stop2 - start3;
    if (ucscStyle) {
      chr = chr.slice(3);
    }
    return [chr, start3, stop2, length2];
  }
  /**
   * Parses an annotation from a tab-separated line of a BED file
   */
  parseAnnotFromTsvLine(tsvLine, chrs, ucscStyle) {
    var annot, chrIndex, chr, start3, rgb2, color2, label, columns = tsvLine.split(/\s/g);
    [chr, start3, stop, length] = this.parseGenomicCoordinates(columns, ucscStyle);
    chrIndex = chrs.indexOf(chr);
    if (chrIndex === -1) return [null, null];
    annot = ["", start3, length, 0];
    if (columns.length >= 4) {
      label = columns[3];
      annot[0] = label;
    }
    if (columns.length >= 8) {
      rgb2 = columns[8].split(",");
      color2 = _BedParser.rgbToHex(rgb2[0], rgb2[1], rgb2[2]);
      annot.push(color2);
    }
    return [chrIndex, annot];
  }
  parseRawAnnots(annots, bedStartIndex, tsvLines, chrs) {
    var i, line, chrIndex, annot, keys, rawAnnots, ucscStyle;
    ucscStyle = true;
    if (isNaN(parseInt(tsvLines[bedStartIndex], 10)) === false) {
      ucscStyle = false;
    }
    for (i = bedStartIndex; i < tsvLines.length; i++) {
      line = tsvLines[i];
      [chrIndex, annot] = this.parseAnnotFromTsvLine(line, chrs, ucscStyle);
      if (chrIndex !== null) annots[chrIndex].annots.push(annot);
    }
    keys = ["name", "start", "length", "trackIndex"];
    if (tsvLines[bedStartIndex].length >= 8) keys.push("color");
    rawAnnots = { keys, annots };
    return rawAnnots;
  }
  /**
  * Parses a BED file, returns raw annotations
  */
  parseBed(bed, ideo) {
    var i, chrs, chr, bedStartIndex, rawAnnots, annots = [], tsvLines = bed.split(/\r\n|\n/);
    chrs = Object.keys(ideo.chromosomes[ideo.config.taxid]);
    for (i = 0; i < chrs.length; i++) {
      chr = chrs[i];
      annots.push({ chr, annots: [] });
    }
    bedStartIndex = 0;
    if (tsvLines[0].slice(0, 3) === "chr" || isNaN(parseInt(tsvLines[0], 10))) {
      bedStartIndex = 1;
    }
    rawAnnots = this.parseRawAnnots(annots, bedStartIndex, tsvLines, chrs);
    return rawAnnots;
  }
};

// node_modules/ideogram/src/js/parsers/tsv-parser.js
var TsvParser = class {
  constructor(tsv3, ideo) {
    this.rawAnnots = this.parseTsv(tsv3, ideo);
  }
  parseGenomicCoordinates(columns) {
    const chr = columns[1];
    const start3 = parseInt(columns[2], 10);
    const length2 = parseInt(columns[3], 10);
    return [chr, start3, length2];
  }
  /**
  * Parses a TSV file, returns raw annotations
  */
  parseTsv(tsv3, ideo) {
    const lines = tsv3.split(/\r\n|\n/);
    const chrs = Object.keys(ideo.chromosomes[ideo.config.taxid]);
    const annots = [];
    for (let i = 0; i < chrs.length; i++) {
      const chr = chrs[i];
      annots.push({ chr, annots: [] });
    }
    let headers;
    const innerKeysByField = {};
    const customHeaders = [];
    const numRequired = 4;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line === "") continue;
      if (line[0] === "#") {
        if (line[1] === "#") {
          const keySplit = line.split(" keys: ");
          if (keySplit.length > 1) {
            const field = keySplit[0].slice(3);
            const keys = keySplit[1].split(";");
            innerKeysByField[camel(field)] = keys;
          }
        } else {
          headers = line.slice(1).trim().split(/\t/).map((h3) => camel(h3));
          const customs = headers.slice(numRequired);
          customs.forEach((custom10, i2) => customHeaders.push(camel(custom10)));
        }
        continue;
      }
      const columns = line.trim().split(/\t/);
      const name2 = columns[0];
      const [chr, start3, length2] = this.parseGenomicCoordinates(columns);
      const chrIndex = chrs.indexOf(chr);
      if (chrIndex === -1) continue;
      const customValues = columns.slice(numRequired);
      for (let j = 0; j < numRequired; j++) {
        const customHeader = customHeaders[j];
        if (customHeader in innerKeysByField) {
          const innerKeys = innerKeysByField[customHeader];
          const block = columns[numRequired + j];
          const group2 = block.split(";");
          const customValue = [];
          if (group2[0] !== "") {
            for (let k = 0; k < group2.length; k++) {
              const innerObj = {};
              const innerValues = group2[k].split("!");
              for (let m = 0; m < innerValues.length; m++) {
                const innerKey = innerKeys[m];
                const innerValue = innerValues[m];
                innerObj[camel(innerKey)] = innerValue;
              }
              customValue.push(innerObj);
            }
          }
          customValues[j] = customValue;
        }
      }
      const annot = [name2, chr, start3, length2].concat(customValues);
      annot.push(i);
      annots[chrIndex].annots.push(annot);
    }
    ;
    headers.push("initRank");
    const rawAnnots = { keys: headers, annots, innerKeysByField };
    return rawAnnots;
  }
};

// node_modules/ideogram/src/js/annotations/heatmap-lib.js
var reservedTrackKeys = [
  "name",
  "start",
  "length",
  "trackIndex",
  "trackIndexOriginal",
  "color"
];
var defaultHeatmapColors = {
  3: ["00B", "DDD", "F00"],
  5: ["00D", "66D", "DDD", "F88", "F00"],
  17: [
    "00D",
    "00D",
    "00D",
    "00D",
    "00D",
    "44D",
    "44D",
    "DDD",
    "DDD",
    "DDD",
    "DDD",
    "F88",
    "F66",
    "F22",
    "F22",
    "F00",
    "F00",
    "F00"
  ]
};
function getLabels(ideo) {
  var annotKeys, labels, heatmaps, i;
  if (ideo.rawAnnots.metadata && ideo.rawAnnots.metadata.trackLabels) {
    labels = ideo.rawAnnots.metadata.trackLabels;
  } else if (ideo.config.heatmaps) {
    labels = [];
    heatmaps = ideo.config.heatmaps;
    for (i = 0; i < heatmaps.length; i++) {
      labels.push(heatmaps[i].key);
    }
  } else {
    annotKeys = ideo.rawAnnots.keys.slice(0);
    labels = annotKeys.filter((d) => !reservedTrackKeys.includes(d));
  }
  if (ideo.displayedTrackIndexes) {
    labels = labels.filter(function(d, i2) {
      return ideo.displayedTrackIndexes.includes(i2 + 1);
    });
  }
  return labels;
}
function inflateThresholds(ideo) {
  var thresholds, colors2, rawAnnots = ideo.rawAnnots;
  if (rawAnnots.metadata && !rawAnnots.metadata.heatmapThresholds && !ideo.config.heatmapThresholds) {
    return;
  }
  if (ideo.config.heatmapThresholds) {
    thresholds = ideo.config.heatmapThresholds;
  } else {
    thresholds = ideo.rawAnnots.metadata.heatmapThresholds;
  }
  colors2 = defaultHeatmapColors[thresholds.length + 1];
  thresholds = thresholds.map((d, i) => {
    return [d, "#" + colors2[i]];
  });
  thresholds.push(["+", "#" + colors2.slice(-1)[0]]);
  return thresholds;
}
function inflateHeatmaps(ideo) {
  var i, labels, heatmaps, annotationTracks, rawAnnots, displayedTracks, thresholds = ideo.config.heatmapThresholds;
  heatmaps = [];
  rawAnnots = ideo.rawAnnots;
  labels = rawAnnots.keys.slice(3);
  annotationTracks = [];
  displayedTracks = [];
  if (rawAnnots.metadata || !isNaN(thresholds[0])) {
    thresholds = inflateThresholds(ideo);
  }
  for (i = 0; i < labels.length; i++) {
    heatmaps.push({ key: labels[i], thresholds });
    annotationTracks.push({ id: labels[i] });
    displayedTracks.push(i + 1);
  }
  ideo.config.annotationsNumTracks = labels.length;
  ideo.config.annotationsDisplayedTracks = displayedTracks;
  ideo.config.heatmaps = heatmaps;
  ideo.config.annotationTracks = annotationTracks;
}
function shouldUseThreshold(m, numThresholds, value, prevThreshold, threshold2) {
  return (
    // If this is the last threshold, and
    // its value is "+" and the value is above the previous threshold...
    m === numThresholds && (threshold2 === "+" && value > prevThreshold) || // ... or if the value matches the threshold...
    value === threshold2 || // ... or if this isn't the first or last threshold, and
    // the value is between this threshold and the previous one...
    m !== 0 && m !== numThresholds && (value <= threshold2 && value > prevThreshold) || // ... or if this is the first threshold and the value is
    // at or below the threshold
    m === 0 && value <= threshold2
  );
}
function getHeatmapAnnotColor(thresholds, value) {
  var m, numThresholds, thresholdList, threshold2, tvNum, thresholdColor, prevThreshold, useThresholdColor, color2;
  for (m = 0; m < thresholds.length; m++) {
    numThresholds = thresholds.length - 1;
    thresholdList = thresholds[m];
    threshold2 = thresholdList[0];
    tvNum = parseFloat(threshold2);
    if (isNaN(tvNum) === false) threshold2 = tvNum;
    if (m !== 0) prevThreshold = parseFloat(thresholds[m - 1][0]);
    thresholdColor = thresholdList[1];
    useThresholdColor = shouldUseThreshold(
      m,
      numThresholds,
      value,
      prevThreshold,
      threshold2
    );
    if (useThresholdColor) color2 = thresholdColor;
  }
  return color2;
}

// node_modules/ideogram/src/js/annotations/track-labels-collinear.js
function renderTrackLabels(labels, ideo) {
  var i, x, y2, labelContainer, markBump, annotLabelHeight = ideo.config.annotLabelHeight, demarcateChrs = ideo.config.demarcateCollinearChromosomes;
  x = 11;
  markBump = demarcateChrs ? 2 : 0;
  labelContainer = d3.select(ideo.config.container + " #_ideogramTrackLabelContainer");
  labelContainer.html("");
  y2 = ideo.config.annotationHeight + annotLabelHeight + 4;
  for (i = 0; i < labels.length; i++) {
    labelContainer.style("position", "absolute").append("div").attr("class", "_ideogramTrackLabel").style("opacity", 1).style("position", "absolute").style("text-align", "center").style("padding", "1px").style("font", "11px sans-serif").style("background", "white").style("line-height", "10px").style("z-index", "5").style("left", x + markBump + "px").style("top", y2 * i + markBump + "px").style("width", "max-content").style("transform-origin", "bottom left").style("text-align", "left").html(labels[i]);
  }
}
function writeTrackLabels(ideo) {
  var labels = getLabels(ideo);
  renderTrackLabels(labels, ideo);
}

// node_modules/ideogram/src/js/annotations/heatmap-collinear.js
function writeCanvases(chr, chrLeft, ideo) {
  var j, trackLeft, trackWidth, canvas, context, id2, chrWidth = chr.width, contextArray = [], annotLabelHeight = ideo.config.annotLabelHeight, numAnnotTracks = ideo.config.numAnnotTracks;
  for (j = 0; j < numAnnotTracks; j++) {
    trackWidth = ideo.config.annotationHeight + annotLabelHeight + 4;
    id2 = chr.id + "-canvas-" + j;
    trackLeft = chrLeft;
    if (chr.chrIndex > 0) {
      trackLeft += ideo.config.chrMargin * chr.chrIndex - 1;
    }
    canvas = d3.select(ideo.config.container + " #_ideogramInnerWrap").append("canvas").attr("id", id2).attr("width", chrWidth + 1).attr("height", trackWidth).style("position", "absolute").style("left", trackLeft + "px").style("top", trackWidth * j + 1 + "px");
    context = canvas.nodes()[0].getContext("2d");
    contextArray.push([context, chr]);
  }
  return contextArray;
}
function fillCanvasAnnots(annots, contextArray, ideo) {
  var j, annot, context, chr, annotLabelHeight = ideo.config.annotLabelHeight, annotHeight = ideo.config.annotationHeight, demarcateChrs = ideo.config.demarcateCollinearChromosomes;
  var trackWidth = annotHeight + annotLabelHeight + 4;
  for (j = 0; j < annots.length; j++) {
    annot = annots[j];
    context = contextArray[annot.trackIndex][0];
    chr = contextArray[annot.trackIndex][1];
    context.fillStyle = annot.color;
    if (demarcateChrs) {
      if (annot.startPx < 1 || annot.startPx > chr.width - 1) continue;
      context.fillRect(annot.startPx, 1, 0.5, trackWidth);
    } else {
      context.fillRect(annot.startPx, annotLabelHeight + 1, 0.5, annotHeight);
    }
  }
  if (demarcateChrs) {
    for (j = 0; j < contextArray.length; j++) {
      context = contextArray[j][0];
      chr = contextArray[j][1];
      context.fillStyle = "#555";
      if (chr.chrIndex === 0) context.fillRect(0, 0, 1, trackWidth);
      context.fillRect(chr.width - 1, 0, 1.1, trackWidth);
      context.fillRect(0, 0, chr.width + 1, 1);
      if (ideo.config.chrMargin) context.fillRect(0, 0, 1.1, trackWidth);
    }
  }
}
function drawHeatmapsCollinear(annotContainers, ideo) {
  var annots, chrLeft, contextArray, i, chr, prevX = 0, xBump = ideo.config.showChromosomesLabels ? 2 : -0.1;
  d3.select(ideo.selector).classed("labeledLeft", false);
  d3.selectAll(ideo.config.container + " canvas").remove();
  for (i = 0; i < annotContainers.length; i++) {
    annots = annotContainers[i].annots;
    chr = ideo.chromosomesArray[i];
    if (i === 0) {
      chrLeft = 12;
    } else {
      chrLeft = prevX + ideo.chromosomesArray[i - 1].width + 14;
      prevX += ideo.chromosomesArray[i - 1].width + xBump;
    }
    contextArray = writeCanvases(chr, chrLeft, ideo);
    fillCanvasAnnots(annots, contextArray, ideo);
  }
  writeTrackLabels(ideo);
  if (ideo.onDrawAnnotsCallback) ideo.onDrawAnnotsCallback();
}

// node_modules/ideogram/src/js/annotations/heatmap-2d.js
function writeCanvas(chr, ideoHeight, width, ideo) {
  var left2, canvas, context, id2;
  id2 = chr.id + "-canvas";
  left2 = ideo.config.chrWidth * 2 + ideo.config.annotationHeight - 0.5;
  canvas = d3.select(ideo.config.container + " #_ideogramInnerWrap").append("canvas").attr("id", id2).attr("width", width).attr("height", ideoHeight).style("position", "absolute").style("left", left2 + "px").style("top", "0px");
  context = canvas.nodes()[0].getContext("2d");
  return context;
}
function fillCanvasAnnotValues(annot, context, ideo) {
  var i, x, values, annotHeight = ideo.config.annotationHeight, ideoMarginTop = ideo._layout.margin.top;
  values = annot.values;
  for (i = 0; i < values.length; i++) {
    context.fillStyle = values[i];
    x = (i - 1) * annotHeight;
    context.fillRect(x, annot.startPx + ideoMarginTop, annotHeight, 2);
  }
}
function drawHeatmaps2d(annotContainers, ideo) {
  var annot, context, i, chr, container = ideo.config.container, ideoMarginTop = ideo._layout.margin.top, ideoHeight = ideo.config.chrHeight + ideoMarginTop, width = ideo.config.annotationHeight * annotContainers[0].values.length;
  d3.selectAll(container + " canvas").remove();
  d3.select(container + " #_ideogramInnerWrap").style("max-width", width + "px");
  d3.select(container + " #_ideogram").attr("width", width);
  chr = ideo.chromosomesArray[0];
  context = writeCanvas(chr, ideoHeight, width, ideo);
  for (i = 0; i < annotContainers.length; i++) {
    annot = annotContainers[i];
    fillCanvasAnnotValues(annot, context, ideo);
  }
  if (ideo.onDrawAnnotsCallback) {
    ideo.onDrawAnnotsCallback();
  }
}
function add2dAnnotsForChr(annots, omittedAnnots, annotsByChr, chrModel, m, keys, ideo) {
  var j, k, annot, ra, stop2, stopPx, color2, thresholds = ideo.config.heatmapThresholds;
  for (j = 0; j < annotsByChr.annots.length; j++) {
    ra = annotsByChr.annots[j];
    annot = {};
    annot.values = [];
    for (k = 0; k < 3; k++) {
      annot[keys[k]] = ra[k];
    }
    for (k = 3; k < keys.length; k++) {
      color2 = getHeatmapAnnotColor(thresholds, ra[k]);
      annot.values.push(color2);
    }
    stop2 = annot.start + annot.length;
    annot.chr = annotsByChr.chr;
    annot.chrIndex = m;
    annot.startPx = ideo.convertBpToPx(chrModel, annot.start);
    stopPx = ideo.convertBpToPx(chrModel, stop2);
    annot.px = Math.round((annot.startPx + stopPx) / 2);
    annots.push(annot);
  }
  annots.shift();
  return [annots, omittedAnnots];
}

// node_modules/ideogram/src/js/annotations/track-labels.js
function startHideTrackLabelTimeout(ideo) {
  if (ideo.config.showTrackLabel === false) return;
  ideo.hideTrackLabelTimeout = window.setTimeout(function() {
    d3.select(ideo.config.container + " #_ideogramTrackLabel").transition().duration(500).style("opacity", 0);
  }, 250);
}
function writeTrackLabelContainer(ideo) {
  d3.select(ideo.config.container + " #_ideogramTrackLabelContainer").append("div").attr("id", "_ideogramTrackLabel").style("opacity", 0).style("position", "absolute").style("text-align", "center").style("padding", "1px").style("font", "11px sans-serif").style("background", "white").style("line-height", "10px").style("z-index", "9000");
}
function renderTrackLabels2(top2, left2, ideo) {
  d3.select(ideo.config.container + " #_ideogramTrackLabel").style("opacity", 1).style("left", left2 + "px").style("top", top2 + "px").style("width", "max-content").style("transform-origin", "bottom left").style("text-align", "left").on("mouseover", function() {
    clearTimeout(ideo.hideTrackLabelTimeout);
  }).on("mouseout", function() {
    startHideTrackLabelTimeout(ideo);
  });
}
function getTrackLabelOffsets(labels, trackCanvas, ideo) {
  var firstTrackId, firstTrack, trackBox, labelBox, ideoBox, left2, top2, marginHack = 7;
  firstTrackId = trackCanvas.id.split("-").slice(0, -1).join("-") + "-0";
  firstTrack = d3.select(ideo.config.container + " #" + firstTrackId).nodes()[0];
  trackBox = firstTrack.getBoundingClientRect();
  labelBox = d3.select(ideo.config.container + " #_ideogramTrackLabel").nodes()[0].getBoundingClientRect();
  ideoBox = d3.select(ideo.config.container).nodes()[0].getBoundingClientRect();
  left2 = Math.round(trackBox.left + labelBox.width) - trackBox.width - 1;
  left2 -= ideoBox.left - marginHack;
  top2 = -(labels.split("<br>").length - 2) * trackBox.width + 2;
  return [left2, top2];
}
function showTrackLabel(trackCanvas, ideo) {
  var labels, left2, top2;
  clearTimeout(ideo.hideTrackLabelTimeout);
  labels = getLabels(ideo);
  labels = labels.join("<br>");
  d3.select(ideo.config.container + " #_ideogramTrackLabel").interrupt().style("top", "").style("left", "").style("transform", null).style("transform", "rotate(-90deg)").html(labels);
  [left2, top2] = getTrackLabelOffsets(labels, trackCanvas, ideo);
  renderTrackLabels2(top2, left2, ideo);
}

// node_modules/ideogram/src/js/annotations/heatmap.js
function writeCanvases2(chr, chrLeft, ideoHeight, ideo) {
  var j, trackLeft, trackWidth, canvas, context, id2, contextArray = [], numAnnotTracks = ideo.config.numAnnotTracks;
  var marginHack = 7;
  for (j = 0; j < numAnnotTracks; j++) {
    trackWidth = ideo.config.annotationHeight;
    id2 = chr.id + "-canvas-" + j;
    trackLeft = chrLeft - trackWidth * (numAnnotTracks - j) - marginHack;
    canvas = d3.select(ideo.config.container + " #_ideogramInnerWrap").append("canvas").attr("id", id2).attr("width", trackWidth).attr("height", ideoHeight).style("position", "absolute").style("left", trackLeft + "px");
    context = canvas.nodes()[0].getContext("2d");
    contextArray.push(context);
  }
  return contextArray;
}
function fillCanvasAnnots2(annots, contextArray, chrWidth, ideoMarginTop) {
  var j, annot, context, x;
  for (j = 0; j < annots.length; j++) {
    annot = annots[j];
    context = contextArray[annot.trackIndex];
    context.fillStyle = annot.color;
    x = annot.trackIndex - 1;
    context.fillRect(x, annot.startPx + ideoMarginTop, chrWidth, 0.5);
  }
}
function drawHeatmaps(annotContainers) {
  var annots, chrLeft, contextArray, chrWidth, i, chr, ideo = this, config2 = ideo.config, ideoMarginTop = ideo._layout.margin.top, ideoHeight = config2.chrHeight + ideoMarginTop;
  if (config2.geometry === "collinear") {
    return drawHeatmapsCollinear(annotContainers, ideo);
  } else if (config2.annotationsLayout === "heatmap-2d") {
    return drawHeatmaps2d(annotContainers, ideo);
  }
  d3.selectAll(ideo.config.container + " canvas").remove();
  writeTrackLabelContainer(ideo);
  for (i = 0; i < annotContainers.length; i++) {
    annots = annotContainers[i].annots;
    chr = ideo.chromosomesArray[i];
    chrWidth = ideo.config.chrWidth;
    chrLeft = ideo._layout.getChromosomeSetYTranslate(i);
    contextArray = writeCanvases2(chr, chrLeft, ideoHeight, ideo);
    fillCanvasAnnots2(annots, contextArray, chrWidth, ideoMarginTop);
  }
  d3.selectAll(ideo.config.container + " canvas").on("mouseover", function() {
    showTrackLabel(this, ideo);
  }).on("mouseout", function() {
    startHideTrackLabelTimeout(ideo);
  });
  if (ideo.onDrawAnnotsCallback) {
    ideo.onDrawAnnotsCallback();
  }
}
function getNewRawAnnots(heatmapKeyIndexes, rawAnnots, ideo) {
  var j, k, ra, newRa, value, thresholds, color2, trackIndex, newRas = [];
  for (j = 0; j < rawAnnots.length; j++) {
    ra = rawAnnots[j];
    for (k = 0; k < heatmapKeyIndexes.length; k++) {
      newRa = ra.slice(0, 3);
      value = ra[heatmapKeyIndexes[k]];
      thresholds = ideo.config.heatmaps[k].thresholds;
      color2 = getHeatmapAnnotColor(thresholds, value);
      trackIndex = k;
      newRa.push(trackIndex, color2, value);
      newRas.push(newRa);
    }
  }
  return newRas;
}
function getNewRawAnnotContainers(heatmapKeyIndexes, rawAnnotBoxes, ideo) {
  var raContainer, chr, rawAnnots, newRas, i, newRaContainers = [];
  for (i = 0; i < rawAnnotBoxes.length; i++) {
    raContainer = rawAnnotBoxes[i];
    chr = raContainer.chr;
    rawAnnots = raContainer.annots;
    newRas = getNewRawAnnots(heatmapKeyIndexes, rawAnnots, ideo);
    newRaContainers.push({ chr, annots: newRas });
  }
  return newRaContainers;
}
function reportPerformance(t03, ideo) {
  var t13 = (/* @__PURE__ */ new Date()).getTime();
  if (ideo.config.debug) {
    console.log("Time in deserializeAnnotsForHeatmap: " + (t13 - t03) + " ms");
  }
}
function deserializeAnnotsForHeatmap(rawAnnotsContainer) {
  var newRaContainers, heatmapKey, heatmapKeyIndexes, i, t03 = (/* @__PURE__ */ new Date()).getTime(), keys = rawAnnotsContainer.keys, rawAnnotBoxes = rawAnnotsContainer.annots, ideo = this;
  heatmapKeyIndexes = [];
  for (i = 0; i < ideo.config.heatmaps.length; i++) {
    heatmapKey = ideo.config.heatmaps[i].key;
    heatmapKeyIndexes.push(keys.indexOf(heatmapKey));
  }
  newRaContainers = getNewRawAnnotContainers(heatmapKeyIndexes, rawAnnotBoxes, ideo);
  keys.splice(3, 0, "trackIndex");
  keys.splice(4, 0, "color");
  ideo.rawAnnots.keys = keys;
  ideo.rawAnnots.annots = newRaContainers;
  reportPerformance(t03, ideo);
}

// node_modules/ideogram/src/js/annotations/events.js
function onLoadAnnots() {
  call(this.onLoadAnnotsCallback);
}
function onDrawAnnots() {
  call(this.onDrawAnnotsCallback);
}
function hideAnnotTooltip() {
  d3.selectAll("._ideogramTooltip").transition().duration(500).style("opacity", 0).style("pointer-events", "none");
}
function startHideAnnotTooltipTimeout() {
  const ideo = this;
  if (ideo.config.showAnnotTooltip === false) {
    return;
  }
  const hideMs = ideo.oneTimeDelayTooltipHideMs ?? 250;
  delete ideo.oneTimeDelayTooltipHideMs;
  ideo.hideAnnotTooltipTimeout = window.setTimeout(function() {
    hideAnnotTooltip();
  }, hideMs);
  ideo.isTooltipCooling = true;
  ideo.hideAnnotTooltipCounter = window.setTimeout(function() {
    ideo.isTooltipCooling = false;
  }, 500);
}
function renderTooltip(tooltip, content, matrix, yOffset, ideo) {
  const left2 = ideo.config.orientation === "horizontal" ? matrix.left + matrix.width / 2 : matrix.left + matrix.width;
  tooltip.html(content).style("opacity", 1).style("left", left2 + "px").style("top", matrix.top - yOffset + "px").style("font-family", ideo.config.fontFamily).style("pointer-events", null).on("mouseover", function() {
    clearTimeout(ideo.hideAnnotTooltipTimeout);
  }).on("mouseout", function() {
    ideo.startHideAnnotTooltipTimeout();
  });
}
function getCoarseBpLength(annot) {
  const length2 = Math.abs(annot.stop - annot.start);
  return formatSiPrefix(length2) + "bp";
}
function getContentAndYOffset(annot, includeLength = false) {
  var content, yOffset, range, displayName;
  range = "chr" + annot.chr + ":" + annot.start.toLocaleString();
  if (annot.displayCoordinates) {
    range = annot.displayCoordinates;
  } else if (annot.length > 0) {
    range += "-" + annot.stop.toLocaleString();
    if (includeLength) range += " (" + getCoarseBpLength(annot) + ")";
  }
  content = `<span class="_ideoTooltipFooter"><br />${range}</span>`;
  yOffset = 24;
  if (annot.name) {
    displayName = annot.displayName ? annot.displayName : annot.name;
    content = displayName + content;
    yOffset += 8;
  }
  return [content, yOffset];
}
async function onWillShowAnnotTooltip(event, context) {
  await call(this.onWillShowAnnotTooltipCallback, event, context);
}
function onDidShowAnnotTooltip() {
  call(this.onDidShowAnnotTooltipCallback);
}
function onClickAnnot(annot) {
  this.prevClickedAnnot = annot;
  this.hasShownAnnotSinceClick = false;
  this.onClickAnnotCallback(annot);
}
async function showAnnotTooltip(annot, context) {
  var content, yOffset, tooltip, ideo = this;
  if (ideo.config.showAnnotTooltip === false) return;
  clearTimeout(ideo.hideAnnotTooltipTimeout);
  if (ideo.onWillShowAnnotTooltipCallback) {
    annot = await ideo.onWillShowAnnotTooltipCallback(annot, context);
  }
  if (annot === null) {
    hideAnnotTooltip();
    return;
  }
  ideo.prevTooltipAnnotName = annot.name;
  tooltip = d3.select(`#${ideo.config.container.replace("#", "")}_ideogramTooltip`);
  tooltip.interrupt();
  const includeLength = true;
  [content, yOffset] = getContentAndYOffset(annot, includeLength);
  const matrix = context.getBoundingClientRect();
  renderTooltip(tooltip, content, matrix, yOffset, ideo);
  if (ideo.onDidShowAnnotTooltipCallback) {
    ideo.onDidShowAnnotTooltipCallback();
  }
}

// node_modules/ideogram/src/js/annotations/labels.js
var allLabelStyle = `
  <style>
    #_ideogram .annot path, ._ideogramLabel {
      cursor: pointer;
    }

    #_ideogram .annot path {
      stroke-width: 1px;
      stroke: white;
      stroke-linejoin: bevel;
    }

    #_ideogram .annot ._ideogramLabel._ideoActive {
      fill: #77F !important;
      stroke: #F0F0FF !important;
    }

    #_ideogram .annot > path._ideoActive {
      stroke: #D0D0DD !important;
      stroke-width: 1.5px;
    }

    #_ideogram .annot ._ideogramLabel {
      stroke: white;
      stroke-width: 5px;
      stroke-linejoin: round;
      paint-order: stroke fill;
      text-align: center;
    }
  </style>
  `;
function getAnnotDomLabelId(annot) {
  return "ideogramLabel_" + annot.domId;
}
function changeAnnotState(state, labelId, annotId) {
  d3.selectAll("._ideoActive").classed("_ideoActive", false);
  d3.select("#" + labelId).attr("class", "_ideogramLabel " + state);
  d3.select("#" + annotId + " > path").attr("class", state);
}
function triggerAnnotEvent(event, ideo) {
  let labelId, annotId;
  const target = event.target;
  const type2 = event.type;
  const targetClasses = Array.from(target.classList);
  if (targetClasses.includes("_ideogramLabel")) {
    labelId = target.id;
    annotId = target.id.split("ideogramLabel_")[1];
    d3.select("#" + annotId + " path").dispatch(type2);
  } else {
    const annotElement = target.parentElement;
    labelId = "ideogramLabel_" + annotElement.id;
    annotId = annotElement.id;
    if (targetClasses.includes("_ideogramLabelRect")) {
      d3.select("#" + annotId + " path").dispatch(type2);
    }
  }
  if (type2 === "mouseout") {
    ideo.time.prevTooltipOff = performance.now();
    ideo.time.prevTooltipAnnotDomId = annotId;
  }
  if (type2 === "mouseover") {
    clearTimeout(window._ideoActiveTimeout);
    changeAnnotState("_ideoActive", labelId, annotId);
  } else {
    window._ideoActiveTimeout = window.setTimeout(function() {
      changeAnnotState("", labelId, annotId);
    }, 250);
  }
}
function renderLabel(annot, style2, ideo) {
  if (!ideo.didSetLabelStyle) {
    document.querySelector("#_ideogramInnerWrap").insertAdjacentHTML("afterbegin", allLabelStyle);
    ideo.didSetLabelStyle = true;
  }
  const id2 = getAnnotDomLabelId(annot);
  const font = getFont(ideo);
  let fill = annot.color === "pink" ? "#CF406B" : annot.color;
  fill = ensureContrast(fill);
  const translate = `translate(-${style2.width + 9},${style2.height / 2 - 1.5})`;
  d3.select("#" + annot.domId).append("text").attr("id", id2).attr("class", "_ideogramLabel").attr("transform", `rotate(-90) ${translate}`).style("font", font).style("fill", fill).style("pointer-events", null).html(annot.name);
  const paralogNeighborhoodMargin = 10;
  const rectWidth = style2.width + paralogNeighborhoodMargin;
  const rectTranslate = `translate(-${rectWidth}, -${style2.height / 2})`;
  d3.select("#" + annot.domId).append("rect").attr("class", "_ideogramLabelRect").attr("transform", `rotate(-90) ${rectTranslate}`).attr("width", style2.width + 10).attr("height", style2.height).attr("style", "opacity: 0");
}
function getAnnotByName(annotName, ideo) {
  var annot;
  var found = false;
  ideo.annots.forEach((annotsByChr) => {
    if (found) return;
    annotsByChr.annots.forEach((thisAnnot) => {
      if (found) return;
      if (thisAnnot.name === annotName) {
        annot = thisAnnot;
        found = true;
      }
    });
  });
  return annot;
}
function getAnnotLabelLayout(annot, ideo) {
  var annotDom, annotRect, ideoRect, width, height, top2, bottom2, left2, right2, config2 = ideo.config;
  annotDom = document.querySelector("#" + annot.domId);
  if (annotDom === null) return null;
  annotRect = annotDom.getBoundingClientRect();
  ideoRect = document.querySelector("#_ideogram").getBoundingClientRect();
  const textSize = getTextSize(annot.name, ideo);
  width = textSize.width;
  const pad3 = config2.fontFamily ? 9 : 7;
  width += pad3;
  const labelSize = config2.annotLabelSize ? config2.annotLabelSize : 13;
  height = labelSize;
  top2 = annotRect.top - ideoRect.top + height - 1;
  bottom2 = top2 + height;
  left2 = annotRect.left - ideoRect.left - width;
  right2 = left2 + width;
  name = annot.name;
  return { top: top2, bottom: bottom2, right: right2, left: left2, width, height, name };
}
function addAnnotLabel(annotName, backgroundColor, borderColor) {
  var annot, ideo = this;
  annot = getAnnotByName(annotName, ideo);
  const layout = getAnnotLabelLayout(annot, ideo);
  if (layout === null) return;
  const style2 = Object.assign(layout, { backgroundColor, borderColor });
  renderLabel(annot, style2, ideo);
}
function getIsXOverlap(o, n2, p) {
  const oLeft = o.left - p;
  const nLeft = n2.left - p;
  const oRight = o.right + p;
  const nRight = n2.right + p;
  return oLeft <= nLeft && oLeft <= nRight && oRight <= nRight && oRight >= nLeft || oLeft >= nLeft && oLeft <= nRight && oRight >= nRight && oRight >= nLeft || oLeft <= nLeft && oLeft <= nRight && oRight >= nRight && oRight >= nLeft || oLeft >= nLeft && oLeft <= nRight && oRight >= nLeft && oRight <= nRight;
}
function getIsYOverlap(o, n2, p) {
  const oTop = o.top - p;
  const nTop = n2.top - p;
  const oBottom = o.bottom + p;
  const nBottom = n2.bottom + p;
  return (
    // false
    oTop <= nTop && oTop <= nBottom && oBottom <= nBottom && oBottom >= nTop || oTop >= nTop && oTop <= nBottom && oBottom >= nBottom && oBottom >= nTop
  );
}
function fillAnnotLabels(sortedAnnots = [], numLabels = 10) {
  const ideo = this;
  sortedAnnots = deepCopy(sortedAnnots);
  ideo.clearAnnotLabels();
  let spacedAnnots = [];
  const spacedLayouts = [];
  if (sortedAnnots.length === 0) {
    sortedAnnots = ideo.flattenAnnots();
  }
  const strokeWidth = 0;
  sortedAnnots.forEach((annot, i) => {
    const layout = getAnnotLabelLayout(annot, ideo);
    if (layout === null) {
      console.debug(annot.name + " has null layout");
      return;
    }
    const hasOverlap = spacedLayouts.length > 0 && spacedLayouts.some((sl, j) => {
      const xOverlap = getIsXOverlap(sl, layout, strokeWidth);
      const yOverlap = getIsYOverlap(sl, layout, strokeWidth);
      return xOverlap && yOverlap;
    });
    if (hasOverlap) return;
    spacedAnnots.push(annot);
    spacedLayouts.push(layout);
  });
  const config2 = ideo.config;
  if ("relatedGenesMode" in config2 && ["hints"].includes(config2.relatedGenesMode)) {
    numLabels = 20;
  }
  spacedAnnots = spacedAnnots.sort(ideo.annotSortFunction).slice(0, numLabels);
  spacedAnnots.reverse();
  spacedAnnots.forEach((annot) => {
    ideo.addAnnotLabel(annot.name);
  });
  d3.selectAll(".annot").on("mouseover", (event) => triggerAnnotEvent(event)).on("mouseout", (event) => triggerAnnotEvent(event, ideo)).on("click", (event) => triggerAnnotEvent(event));
}
function removeAnnotLabel(annotName) {
  const ideo = this;
  const annot = getAnnotByName(annotName, ideo);
  const id2 = getAnnotDomLabelId(annot);
  document.querySelector("#" + id2).remove();
}
function clearAnnotLabels() {
  const labels = document.querySelectorAll("._ideogramLabel");
  labels.forEach((label) => {
    label.remove();
  });
}

// node_modules/ideogram/src/js/annotations/histogram.js
function histogramAnnots(ideo, annot) {
  var value, thresholds, histogramKeyIndexes, height;
  var keys = ideo.rawAnnots.keys;
  histogramKeyIndexes = [];
  for (var i = 0; i < ideo.config.histogram.length; i++) {
    var histogramKey = ideo.config.histogram[i].key;
    histogramKeyIndexes.push(keys.indexOf(histogramKey));
  }
  value = annot[keys[histogramKeyIndexes]];
  if (ideo.config.histogram) {
    thresholds = ideo.config.histogram.thresholds;
    height = getHistogramHeight(thresholds, value, ideo);
  }
  return height;
}
function getHistogramHeight(thresholds, value, ideo) {
  var thresholds = ideo.config.histogram[0].thresholds;
  var m, numThresholds, thresholdList, threshold2, tvNum, prevThreshold, useThresholdHeight, height;
  for (m = 0; m < thresholds.length; m++) {
    numThresholds = thresholds.length - 1;
    thresholdList = thresholds[m];
    threshold2 = thresholdList[0];
    tvNum = parseFloat(threshold2);
    if (isNaN(tvNum) === false) threshold2 = tvNum;
    if (m !== 0) prevThreshold = parseFloat(thresholds[m - 1][0]);
    useThresholdHeight = shouldUseThreshold(
      m,
      numThresholds,
      value,
      prevThreshold,
      threshold2
    );
    if (useThresholdHeight) height = parseFloat(thresholdList[1]);
  }
  return height;
}
function getRawBars(chrModels, ideo) {
  var chr, chrModel, lastBand, numBins, bar, h3, i, px, barWidth = ideo.config.barWidth, bars = [];
  for (h3 = 0; h3 < ideo.chromosomesArray.length; h3++) {
    chr = ideo.chromosomesArray[h3].name;
    chrModel = chrModels[chr];
    lastBand = chrModel.bands[chrModel.bands.length - 1];
    numBins = Math.round(lastBand.px.stop / barWidth);
    bar = { chr, annots: [] };
    for (i = 0; i < numBins; i++) {
      px = i * barWidth - ideo.bump;
      bar.annots.push({
        bp: ideo.convertPxToBp(chrModel, px + ideo.bump),
        px,
        count: 0,
        chrIndex: chrModel.chrIndex,
        chrName: chr,
        color: ideo.config.annotationsColor,
        annots: []
      });
    }
    bars.push(bar);
  }
  return bars;
}
function assignAnnotsToBars(annots, bars, chrModels, ideo) {
  var chrAnnots, chrModel, barAnnots, h3, i, annot, px, j, barPx, nextBarPx, barWidth = ideo.config.barWidth;
  for (h3 = 0; h3 < annots.length; h3++) {
    chrAnnots = annots[h3].annots;
    chrModel = chrModels[annots[h3].chr];
    barAnnots = bars[chrModel.chrIndex].annots;
    for (i = 0; i < chrAnnots.length; i++) {
      annot = chrAnnots[i];
      px = annot.px - ideo.bump;
      for (j = 0; j < barAnnots.length; j++) {
        barPx = barAnnots[j].px;
        nextBarPx = barPx + barWidth;
        if (j === barAnnots.length - 1) nextBarPx += barWidth;
        if (px >= barPx && px < nextBarPx) {
          bars[chrModel.chrIndex].annots[j].count += 1;
          bars[chrModel.chrIndex].annots[j].annots.push(annot);
          break;
        }
      }
    }
  }
  return bars;
}
function setIdeoMaxAnnotsPerBar(bars, isFirstGet, ideo) {
  var maxAnnotsPerBarAllChrs, i, maxAnnotsPerBar, annots, chr, j, barCount;
  if (isFirstGet || ideo.config.histogramScaling === "relative") {
    maxAnnotsPerBarAllChrs = 0;
    for (i = 0; i < bars.length; i++) {
      maxAnnotsPerBar = 0;
      annots = bars[i].annots;
      chr = bars[i].chr;
      for (j = 0; j < annots.length; j++) {
        barCount = annots[j].count;
        if (barCount > maxAnnotsPerBar) maxAnnotsPerBar = barCount;
        if (barCount > maxAnnotsPerBarAllChrs) {
          maxAnnotsPerBarAllChrs = barCount;
        }
      }
      ideo.maxAnnotsPerBar[chr] = maxAnnotsPerBar;
    }
    ideo.maxAnnotsPerBarAllChrs = maxAnnotsPerBarAllChrs;
  }
}
function setProportionalBarHeight(bars, ideo) {
  var i, annots, chr, j, barCount, barCountRatio, height, ideoIsRotated = ideo._layout._isRotated;
  for (i = 0; i < bars.length; i++) {
    annots = bars[i].annots;
    chr = bars[i].chr;
    for (j = 0; j < annots.length; j++) {
      barCount = annots[j].count;
      if (ideo.config.histogramScaling === "relative") {
        barCountRatio = barCount / ideo.maxAnnotsPerBar[chr];
      } else {
        barCountRatio = barCount / ideo.maxAnnotsPerBarAllChrs;
      }
      if (ideoIsRotated === false) {
        height = barCountRatio * ideo.config.chrMargin;
      } else {
        height = barCountRatio * ideo.config.chrHeightOriginal * 3;
      }
      if (isNaN(height)) {
        height = 0;
      }
      bars[i].annots[j].height = height;
    }
  }
  return bars;
}
function reportGetHistogramBarPerformance(t03, ideo) {
  var t13 = (/* @__PURE__ */ new Date()).getTime();
  if (ideo.config.debug) {
    console.log("Time spent in getHistogramBars: " + (t13 - t03) + " ms");
  }
}
function setIdeoHistogramScaling(ideo) {
  if ("histogramScaling" in ideo.config === false) {
    ideo.config.histogramScaling = "absolute";
  }
}
function getHistogramBars(annots) {
  var chrModels, bars, isFirstGet = false, t03 = (/* @__PURE__ */ new Date()).getTime(), ideo = this;
  chrModels = ideo.chromosomes[ideo.config.taxid];
  setIdeoHistogramScaling(ideo);
  if (typeof ideo.maxAnnotsPerBar === "undefined") {
    ideo.maxAnnotsPerBar = {};
    isFirstGet = true;
  }
  bars = getRawBars(chrModels, ideo);
  bars = assignAnnotsToBars(annots, bars, chrModels, ideo);
  setIdeoMaxAnnotsPerBar(bars, isFirstGet, ideo);
  bars = setProportionalBarHeight(bars, ideo);
  reportGetHistogramBarPerformance(t03, ideo);
  ideo.bars = bars;
  return bars;
}
function getHistogramPoints(d, chrWidth, chrWidths, ideo) {
  var x1, x2, y1, y2;
  x1 = d.px + ideo.bump;
  x2 = d.px + ideo.config.barWidth + ideo.bump;
  y1 = chrWidth;
  y2 = chrWidth + d.height;
  var thisChrWidth = chrWidths[d.chr];
  if (x2 > thisChrWidth) {
    x2 = thisChrWidth;
  }
  return x1 + "," + y1 + " " + x2 + "," + y1 + " " + x2 + "," + y2 + " " + x1 + "," + y2;
}
function writeHistogramAnnots(chrAnnot, ideo) {
  var chrs, chr, chrWidths = {}, chrWidth = ideo.config.chrWidth;
  chrs = ideo.chromosomes[ideo.config.taxid];
  for (chr in chrs) {
    chrWidths[chr] = chrs[chr];
  }
  chrAnnot.append("polygon").attr("class", "annot").attr("points", function(d) {
    return getHistogramPoints(d, chrWidth, chrWidths, ideo);
  }).attr("fill", function(d) {
    return d.color;
  });
}

// node_modules/ideogram/src/js/annotations/legend.js
var legendStyle = "#_ideogramLegend {font: 12px Arial; overflow: auto; cursor: default;} #_ideogramLegend svg {float: left;} #_ideogramLegend ul {position: relative; left: -14px; list-style: none; float: left; padding-left: 10px; margin: 0 0 1em 0; width: auto; border: none;} #_ideogramLegend li {float: none; margin: 0;}#_ideogramLegend ul span {position: relative; left: -15px;} ";
function getIcon(row, ideo) {
  var icon, triangleAttrs, circleAttrs, rectAttrs, fill = 'fill="' + row.color + '" style="stroke: #AAA;"', shape2 = row.shape;
  triangleAttrs = 'd="m7,3 l -5 9 l 9 0 z"';
  circleAttrs = 'd="m2,9a 4.5,4.5 0 1,0 9,0a 4.5,4.5 0 1,0 -9,0"';
  rectAttrs = 'height="10" width="10" y="3"';
  if ("shape" in row && ["circle", "triangle"].includes(shape2)) {
    if (shape2 === "circle") {
      icon = "<path " + circleAttrs + " " + fill + "></path>";
    } else if (shape2 === "triangle") {
      var transform = "";
      if (ideo.config.orientation === "vertical") {
        transform = ' transform="rotate(90, 7, 7)"';
      }
      if (ideo.config.orientation === "down") {
        transform = ' transform="rotate(180, 7, 7)"';
      }
      icon = "<path " + triangleAttrs + transform + " " + fill + "></path>";
    }
  } else {
    icon = "<rect " + rectAttrs + " " + fill + "/>";
  }
  return icon;
}
function getListItems(labels, svg2, list, nameHeight, ideo) {
  var i, icon, y2, row, lineHeight = getLineHeight(ideo);
  for (i = 0; i < list.rows.length; i++) {
    row = list.rows[i];
    labels += '<li class="_ideoLegendEntry">' + row.name + "</li>";
    y2 = lineHeight * (i - 1) + nameHeight + 1;
    if ("name" in list) y2 += lineHeight;
    icon = getIcon(row, ideo);
    const transform = "translate(0, " + y2 + ")";
    svg2 += '<g transform="' + transform + '">' + icon + "</g>";
  }
  return [labels, svg2];
}
function getLineHeight(ideo) {
  return round(getTextSize("A", ideo).height) * 2 + 0.5;
}
function writeLegend(ideo) {
  var i, legend, svg2, labels, list, content, config2 = ideo.config, lineHeight = getLineHeight(ideo);
  d3.select(config2.container + " #_ideogramLegend").remove();
  legend = config2.legend;
  content = "";
  for (i = 0; i < legend.length; i++) {
    list = legend[i];
    let nameHeight = lineHeight;
    if (list.nameHeight) {
      nameHeight = list.nameHeight;
    }
    let nameStyle = "";
    if (nameHeight) {
      nameStyle = `style="height: ${nameHeight}px; position: relative; left: -${nameHeight - 5}px;"`;
    }
    if ("name" in list) {
      labels = `<li class="_ideoLegendName" ${nameStyle}>` + list.name + `</li>`;
    }
    svg2 = '<svg id="_ideogramLegendSvg" width="' + lineHeight + '">';
    [labels, svg2] = getListItems(labels, svg2, list, nameHeight, ideo);
    svg2 += "</svg>";
    content += svg2 + "<ul>" + labels + "</ul>";
  }
  var fontFamily = `font-family: ${config2.fontFamily};`;
  var lineHeightCss = `line-height: ${getLineHeight(ideo)}px;`;
  legendStyle += `#_ideogramLegend {${fontFamily} ${lineHeightCss}}`;
  var target = d3.select(config2.container + " #_ideogramOuterWrap");
  target.append("style").html(legendStyle);
  target.append("div").attr("id", "_ideogramLegend").html(content);
}

// node_modules/ideogram/src/js/annotations/draw.js
function parseFriendlyAnnots(friendlyAnnots, rawAnnots) {
  var i, j, annot, rawAnnot;
  for (i = 0; i < friendlyAnnots.length; i++) {
    annot = friendlyAnnots[i];
    for (j = 0; j < rawAnnots.length; j++) {
      if (annot.chr === rawAnnots[j].chr) {
        rawAnnot = [
          annot.name,
          annot.start,
          annot.stop - annot.start
        ];
        if ("color" in annot) rawAnnot.push(annot.color);
        if ("shape" in annot) rawAnnot.push(annot.shape);
        if ("placement" in annot) rawAnnot.push(annot.placement);
        rawAnnots[j].annots.push(rawAnnot);
        break;
      }
    }
  }
  return rawAnnots;
}
function parseFriendlyKeys(friendlyAnnots) {
  var keys = ["name", "start", "length"];
  if ("color" in friendlyAnnots[0]) {
    keys.push("color");
  }
  if ("shape" in friendlyAnnots[0]) {
    keys.push("shape");
  }
  if ("placement" in friendlyAnnots[0]) {
    keys.push("placement");
  }
  return keys;
}
function drawAnnots(friendlyAnnots, layout, keep = false, isOtherLayout = false) {
  var keys, chr, rawAnnots = [], ideo = this, chrs = ideo.chromosomes[ideo.config.taxid];
  if (friendlyAnnots.length === 0) {
    ideo.annots = [];
    return;
  }
  if ("annots" in friendlyAnnots[0] || // When filtering
  "values" in friendlyAnnots[0]) {
    return ideo.drawProcessedAnnots(friendlyAnnots, layout);
  }
  for (chr in chrs) {
    rawAnnots.push({ chr, annots: [] });
  }
  rawAnnots = parseFriendlyAnnots(friendlyAnnots, rawAnnots);
  keys = parseFriendlyKeys(friendlyAnnots);
  ideo.rawAnnots = { keys, annots: rawAnnots };
  const processedAnnots = ideo.processAnnotData(ideo.rawAnnots);
  if (!isOtherLayout) {
    ideo.annots = processedAnnots;
  } else {
    ideo.annotsOther = processedAnnots;
  }
  ideo.drawProcessedAnnots(processedAnnots, layout, keep);
}
function getShapes(annotHeight) {
  var reverseTriangle, triangle, circle, rectangle, r2, span, histo;
  reverseTriangle = "m0,0 l -" + annotHeight + " " + -2 * annotHeight + " l " + 2 * annotHeight + " 0 z";
  triangle = "m0,0 l -" + annotHeight + " " + 2 * annotHeight + " l " + 2 * annotHeight + " 0 z";
  r2 = annotHeight;
  circle = "m -" + r2 + ", " + r2 + "a " + r2 + "," + r2 + " 0 1,0 " + r2 * 2 + ",0a " + r2 + "," + r2 + " 0 1,0 -" + r2 * 2 + ",0";
  rectangle = "m0,0 l 0 " + 2 * annotHeight + "l " + annotHeight + " 0l 0 -" + 2 * annotHeight + "z";
  span = ` `;
  histo = ` `;
  return {
    reverseTriangle,
    triangle,
    circle,
    rectangle,
    span,
    histo
  };
}
function getChrAnnotNodes(filledAnnots, ideo) {
  return d3.selectAll(ideo.selector + " .chromosome").data(filledAnnots).selectAll("path.annot").data(function(d) {
    return d.annots;
  }).enter();
}
function determineShape(d, shapes) {
  if (!d.shape || d.shape === "triangle") {
    if (d.placement < 0) {
      return shapes.reverseTriangle;
    }
    return shapes.triangle;
  } else if (d.shape === "circle") {
    return shapes.circle;
  } else if (d.shape === "rectangle") {
    return shapes.rectangle;
  } else if (d.shape === "span") {
    return shapes.span;
  } else if (d.shape === "histo") {
    return shapes.histo;
  } else {
    return d.shape;
  }
}
function writeTrackAnnots(chrAnnot, ideo) {
  var shapes, annotHeight = ideo.config.annotationHeight;
  shapes = getShapes(annotHeight);
  var gElement = chrAnnot.append("g").attr("id", function(d) {
    return d.domId;
  }).attr("class", "annot").attr("transform", function(d) {
    if (d.shape !== "span" && d.shape !== "histo") {
      var y2 = ideo.config.chrWidth + d.placement * annotHeight * 2;
      if (d.placement < 0) {
        var y2 = (d.placement + 1) * annotHeight * 2;
      }
      return "translate(" + d.px + "," + y2 + ")";
    }
  }).attr("fill", function(d) {
    return d.color;
  });
  gElement.filter(function(d) {
    return d.shape === "span" || d.shape == "histo";
  }).on("mouseover", function(event, d) {
    ideo.showAnnotTooltip(d, this);
  }).on("mouseout", function() {
    ideo.startHideAnnotTooltipTimeout();
  }).on("click", function(event, d) {
    ideo.onClickAnnot(d);
  }).append("polygon").attr("points", function(d) {
    var x1 = d.startPx;
    var x2 = d.stopPx;
    var annotHeight2 = ideo.config.annotationHeight * 2;
    var y2 = ideo.config.chrWidth + d.placement * annotHeight2;
    if (d.shape === "span") {
      if (d.placement < 0) {
        var y2 = annotHeight2 + (d.placement - 1) * annotHeight2;
      }
      var points = [
        `${x1},${y2 + annotHeight2}`,
        `${x2},${y2 + annotHeight2}`,
        `${x2},${y2}`,
        `${x1},${y2}`
      ];
      const bars = points.join(" ");
      return bars;
    }
    if (d.shape === "histo") {
      if (d.placement >= 0) {
        var points = [
          `${x1},${y2}`,
          `${x2},${y2}`,
          `${x2},${y2 + d.height}`,
          `${x1},${y2 + d.height}`
        ];
      } else if (d.placement < 0) {
        var y2 = (d.placement + 1) * annotHeight2;
        var points = [
          `${x1},${y2 - d.height}`,
          `${x2},${y2 - d.height}`,
          `${x2},${y2}`,
          `${x1},${y2}`
        ];
      }
      const bars = points.join(" ");
      return bars;
    }
  });
  gElement.filter(function(d) {
    return d.shape !== "span" && d.shape !== "histo";
  }).append("path").attr("d", function(d) {
    return determineShape(d, shapes);
  }).on("mouseover", function(event, d) {
    ideo.showAnnotTooltip(d, this);
  }).on("mouseout", function() {
    ideo.startHideAnnotTooltipTimeout();
  }).on("click", function(event, d) {
    ideo.onClickAnnot(d);
  });
}
function writeOverlayAnnots(chrAnnot, ideo) {
  chrAnnot.append("polygon").attr("id", function(d) {
    return d.id;
  }).attr("class", "annot").attr("points", function(d) {
    var x1, x2, chrWidth = ideo.config.chrWidth;
    if (d.stopPx - d.startPx > 1) {
      x1 = d.startPx;
      x2 = d.stopPx;
    } else {
      x1 = d.px - 0.5;
      x2 = d.px + 0.5;
    }
    return x1 + "," + chrWidth + " " + x2 + "," + chrWidth + " " + x2 + ",0 " + x1 + ",0";
  }).attr("fill", function(d) {
    return d.color;
  }).on("mouseover", function(event, d) {
    ideo.showAnnotTooltip(d, this);
  }).on("mouseout", function() {
    ideo.startHideAnnotTooltipTimeout();
  });
}
function writeSpanAnnots(chrAnnot, ideo) {
  chrAnnot.append("g").attr("id", function(d) {
    return d.domId;
  }).attr("class", "annot").append("polygon").attr("points", function(d) {
    var annotHeight = ideo.config.annotationHeight * 2;
    var x1 = d.startPx;
    var x2 = d.stopPx;
    var y2 = ideo.config.chrWidth + d.placement * annotHeight;
    var points = [
      `${x1},${y2 + annotHeight}`,
      `${x2},${y2 + annotHeight}`,
      `${x2},${y2}`,
      `${x1},${y2}`
    ];
    const bars = points.join(" ");
    return bars;
  }).attr("fill", function(d) {
    return d.color;
  }).on("mouseover", function(event, d) {
    ideo.showAnnotTooltip(d, this);
  }).on("mouseout", function() {
    ideo.startHideAnnotTooltipTimeout();
  }).on("click", function(event, d) {
    ideo.onClickAnnot(d);
  });
}
function warnIfTooManyAnnots(layout, annots) {
  var i, numAnnots;
  if (!/heatmap/.test(layout) && layout !== "histogram") {
    numAnnots = 0;
    for (i = 0; i < annots.length; i++) {
      numAnnots += annots[i].annots.length;
    }
    if (numAnnots > 2e3) {
      console.warn(
        'Rendering more than 2000 annotations in Ideogram?\nTry setting "annotationsLayout" to "heatmap" or "histogram" in your Ideogram configuration object for better layout and performance.'
      );
    }
  }
}
function drawAnnotsByLayoutType(layout, annots, ideo) {
  var filledAnnots, chrAnnot;
  warnIfTooManyAnnots(layout, annots);
  if (layout === "histogram") annots = ideo.getHistogramBars(annots);
  filledAnnots = ideo.fillAnnots(annots);
  chrAnnot = getChrAnnotNodes(filledAnnots, ideo);
  if (layout === "tracks") {
    writeTrackAnnots(chrAnnot, ideo);
  } else if (layout === "overlay") {
    writeOverlayAnnots(chrAnnot, ideo);
  } else if (layout === "histogram") {
    writeHistogramAnnots(chrAnnot, ideo);
  } else if (layout === "span") {
    writeSpanAnnots(chrAnnot, ideo);
  }
}
function drawProcessedAnnots(annots, layout, keep = false) {
  var ideo = this;
  if (ideo.onBeforeDrawAnnotsCallback) {
    ideo.onBeforeDrawAnnotsCallback();
  }
  if (!keep) {
    d3.selectAll(ideo.selector + " .annot").remove();
  }
  if (layout === void 0) layout = "tracks";
  if (ideo.config.annotationsLayout) layout = ideo.config.annotationsLayout;
  if ("legend" in ideo.config) writeLegend(ideo);
  if (/heatmap/.test(layout)) {
    ideo.drawHeatmaps(annots);
    return;
  }
  drawAnnotsByLayoutType(layout, annots, ideo);
  if (ideo.onDrawAnnotsCallback) ideo.onDrawAnnotsCallback();
}

// node_modules/ideogram/src/js/annotations/synteny-lib.js
function writeSyntenicRegion(syntenies, regionID, ideo) {
  return syntenies.append("g").attr("class", "syntenicRegion").attr("id", regionID).on("click", function() {
    var activeRegion = this;
    var others = d3.selectAll(ideo.selector + " .syntenicRegion").filter(function() {
      return this !== activeRegion;
    });
    others.classed("hidden", !others.classed("hidden"));
  }).on("mouseover", function() {
    var activeRegion = this;
    d3.selectAll(ideo.selector + " .syntenicRegion").filter(function() {
      return this !== activeRegion;
    }).classed("ghost", true);
  }).on("mouseout", function() {
    d3.selectAll(ideo.selector + " .syntenicRegion").classed("ghost", false);
  });
}
function writeSyntenicRegionPolygons(syntenicRegion, x1, x2, r1, r2, regions) {
  var color2, opacity;
  color2 = "color" in regions ? regions.color : "#CFC";
  opacity = "opacity" in regions ? regions.opacity : 1;
  syntenicRegion.append("polygon").attr(
    "points",
    x1 + ", " + r1.startPx + " " + x1 + ", " + r1.stopPx + " " + x2 + ", " + r2.stopPx + " " + x2 + ", " + r2.startPx
  ).style("fill", color2).style("fill-opacity", opacity);
}
function writeSyntenicRegionPolygonsHorizontal(syntenicRegion, y1, y2, r1, r2, regions) {
  var color2, opacity;
  color2 = "color" in regions ? regions.color : "#CFC";
  opacity = "opacity" in regions ? regions.opacity : 1;
  syntenicRegion.append("polygon").attr(
    "points",
    r1.startPx - 15 + ", " + y1 + " " + (r1.stopPx - 15) + ", " + y1 + " " + (r2.stopPx - 15) + ", " + y2 + " " + (r2.startPx - 15) + ", " + y2
  ).style("fill", color2).style("fill-opacity", opacity);
}
function getRegionsR1AndR2(regions, ideo, xOffset = null) {
  var r1, r2, r1Offset, r2Offset;
  r1 = regions.r1;
  r2 = regions.r2;
  if (typeof r1.chr === "string") {
    const taxids = ideo.config.taxids;
    if (ideo.config.multiorganism) {
      r1.chr = ideo.chromosomes[taxids[0]][r1.chr];
      r2.chr = ideo.chromosomes[taxids[1]][r2.chr];
    } else {
      r1.chr = ideo.chromosomes[taxids[0]][r1.chr];
      r2.chr = ideo.chromosomes[taxids[0]][r2.chr];
    }
  }
  var r1ChrDom = document.querySelector("#" + r1.chr.id + "-chromosome-set");
  var r1GenomeHorizontalXOffset = r1ChrDom.getCTM().e;
  var r1GenomeVerticalXOffset = r1ChrDom.getCTM().f;
  var r2ChrDom = document.querySelector("#" + r2.chr.id + "-chromosome-set");
  var r2GenomeHorizontalXOffset = r2ChrDom.getCTM().e;
  var r2GenomeVerticalXOffset = r2ChrDom.getCTM().f;
  if (xOffset === null) {
    if (ideo.config.orientation === "vertical") {
      r1Offset = r1GenomeVerticalXOffset - 12;
      r2Offset = r2GenomeVerticalXOffset - 12;
    } else {
      r1Offset = r1GenomeHorizontalXOffset;
      r2Offset = r2GenomeHorizontalXOffset;
    }
  } else {
    r1Offset = xOffset;
    r2Offset = xOffset;
  }
  r1.startPx = ideo.convertBpToPx(r1.chr, r1.start) + r1Offset;
  r1.stopPx = ideo.convertBpToPx(r1.chr, r1.stop) + r1Offset;
  r2.startPx = ideo.convertBpToPx(r2.chr, r2.start) + r2Offset;
  r2.stopPx = ideo.convertBpToPx(r2.chr, r2.stop) + r2Offset;
  return [r1, r2];
}

// node_modules/ideogram/src/js/annotations/synteny-collinear.js
function writeSyntenicRegionLines(syntenicRegion, x1, x2, r1, r2) {
  syntenicRegion.append("line").attr("class", "syntenyBorder").attr("x1", x1).attr("x2", x2).attr("y1", r1.startPx).attr("y2", r2.startPx);
  syntenicRegion.append("line").attr("class", "syntenyBorder").attr("x1", x1).attr("x2", x2).attr("y1", r1.stopPx).attr("y2", r2.stopPx);
}
function writeSyntenicRegions(syntenicRegions, syntenies, ideo) {
  var i, regions, r1, r2, regionID, syntenicRegion, chrWidth, x1, x2;
  for (i = 0; i < syntenicRegions.length; i++) {
    regions = syntenicRegions[i];
    [r1, r2] = getRegionsR1AndR2(regions, ideo);
    regionID = r1.chr.id + "_" + r1.start + "_" + r1.stop + "___" + r2.chr.id + "_" + r2.start + "_" + r2.stop;
    syntenicRegion = writeSyntenicRegion(syntenies, regionID, ideo);
    chrWidth = ideo.config.chrWidth;
    x1 = chrWidth + 51;
    x2 = chrWidth + 245;
    writeSyntenicRegionPolygons(syntenicRegion, x1, x2, r1, r2, regions);
    writeSyntenicRegionLines(syntenicRegion, x1, x2, r1, r2);
  }
}
function reportPerformance2(t03, ideo) {
  var t13 = (/* @__PURE__ */ new Date()).getTime();
  if (ideo.config.debug) {
    console.log("Time in drawSyntenicRegions: " + (t13 - t03) + " ms");
  }
}
function drawSyntenyCollinear(syntenicRegions, ideo) {
  var syntenies, t03 = (/* @__PURE__ */ new Date()).getTime();
  syntenies = d3.select(ideo.selector).insert("g", ":first-child").attr("class", "synteny");
  writeSyntenicRegions(syntenicRegions, syntenies, ideo);
  reportPerformance2(t03, ideo);
}

// node_modules/ideogram/src/js/annotations/synteny-collinear-horizontal.js
function writeSyntenicRegionLines2(syntenicRegion, y1, y2, r1, r2) {
  syntenicRegion.append("line").attr("class", "syntenyBorder").attr("x1", r1.startPx - 15).attr("x2", r2.startPx - 15).attr("y1", y1).attr("y2", y2);
  syntenicRegion.append("line").attr("class", "syntenyBorder").attr("x1", r1.stopPx - 15).attr("x2", r2.stopPx - 15).attr("y1", y1).attr("y2", y2);
}
function writeSyntenicRegions2(syntenicRegions, syntenies, ideo) {
  var i, regions, r1, r2, regionID, syntenicRegion, chrWidth, y1, y2;
  for (i = 0; i < syntenicRegions.length; i++) {
    regions = syntenicRegions[i];
    [r1, r2] = getRegionsR1AndR2(regions, ideo);
    regionID = r1.chr.id + "_" + r1.start + "_" + r1.stop + "___" + r2.chr.id + "_" + r2.start + "_" + r2.stop;
    syntenicRegion = writeSyntenicRegion(syntenies, regionID, ideo);
    chrWidth = ideo.config.chrWidth;
    y1 = chrWidth + 31;
    y2 = chrWidth + 191;
    writeSyntenicRegionPolygonsHorizontal(
      syntenicRegion,
      y1,
      y2,
      r1,
      r2,
      regions
    );
    writeSyntenicRegionLines2(syntenicRegion, y1, y2, r1, r2);
  }
}
function reportPerformance3(t03, ideo) {
  var t13 = (/* @__PURE__ */ new Date()).getTime();
  if (ideo.config.debug) {
    console.log("Time in drawSyntenicRegions: " + (t13 - t03) + " ms");
  }
}
function drawSyntenyCollinearHorizontal(syntenicRegions, ideo) {
  var syntenies, t03 = (/* @__PURE__ */ new Date()).getTime();
  syntenies = d3.select(ideo.selector).insert("g", ":first-child").attr("class", "synteny");
  writeSyntenicRegions2(syntenicRegions, syntenies, ideo);
  reportPerformance3(t03, ideo);
}

// node_modules/ideogram/src/js/annotations/synteny.js
function writeSyntenicRegionLines3(syntenicRegion, x1, x2, r1, r2, regions) {
  var stroke, width;
  if (Math.abs(r1.startPx - r1.startPx) < 2 && Math.abs(r1.stopPx - r1.stopPx) < 2) {
    stroke = regions.color;
    width = regions.width;
  } else {
    stroke = "";
    width = "";
  }
  syntenicRegion.append("line").attr("class", "syntenyBorder").attr("x1", x1).attr("x2", x2).attr("y1", r1.startPx).attr("y2", r2.startPx).style("stroke", stroke).style("stroke-width", width);
  syntenicRegion.append("line").attr("class", "syntenyBorder").attr("x1", x1).attr("x2", x2).attr("y1", r1.stopPx).attr("y2", r2.stopPx).style("stroke", stroke).style("stroke-width", stroke);
}
function writeSyntenicRegionLabels(syntenicRegion, x1, x2, r1, r2, regionId) {
  var rangeIds = regionId.split("__").map((d) => "label_" + d);
  if ("name" in r1) {
    syntenicRegion.append("text").attr("id", rangeIds[0]).attr("y", r1.startPx + 3).text(r1.name);
    var r1Width = document.querySelector("#" + rangeIds[0]).getBoundingClientRect().width;
    d3.select("#" + rangeIds[0]).attr("x", x1 - 15 - r1Width);
  }
  if ("name" in r2) {
    syntenicRegion.append("text").attr("id", rangeIds[1]).text(r2.name).attr("x", x2 + 15).attr("y", r2.startPx + 3).text(r2.name);
  }
}
function writeSyntenicRegions3(syntenicRegions, syntenies, xOffset, ideo) {
  var i, regions, r1, r2, regionID, syntenicRegion, chrWidth, x1, x2;
  for (i = 0; i < syntenicRegions.length; i++) {
    regions = syntenicRegions[i];
    [r1, r2] = getRegionsR1AndR2(regions, ideo, xOffset);
    regionID = r1.chr.id + "_" + r1.start + "_" + r1.stop + "___" + r2.chr.id + "_" + r2.start + "_" + r2.stop;
    syntenicRegion = writeSyntenicRegion(syntenies, regionID, ideo);
    chrWidth = ideo.config.chrWidth;
    x1 = ideo._layout.getChromosomeSetYTranslate(0);
    x2 = ideo._layout.getChromosomeSetYTranslate(1) - chrWidth;
    writeSyntenicRegionPolygons(syntenicRegion, x1, x2, r1, r2, regions);
    writeSyntenicRegionLines3(syntenicRegion, x1, x2, r1, r2, regions);
    writeSyntenicRegionLabels(syntenicRegion, x1, x2, r1, r2, regionID);
  }
}
function reportPerformance4(t03, ideo) {
  var t13 = (/* @__PURE__ */ new Date()).getTime();
  if (ideo.config.debug) {
    console.log("Time in drawSyntenicRegions: " + (t13 - t03) + " ms");
  }
}
function drawSynteny(syntenicRegions) {
  var syntenies, xOffset, t03 = (/* @__PURE__ */ new Date()).getTime(), ideo = this, config2 = ideo.config;
  ideo.syntenicRegions = syntenicRegions;
  if (config2.multiorganism && config2.geometry === "collinear") {
    if (config2.orientation === "vertical") {
      return drawSyntenyCollinear(syntenicRegions, ideo);
    } else {
      return drawSyntenyCollinearHorizontal(syntenicRegions, ideo);
    }
  }
  syntenies = d3.select(ideo.selector).insert("g", ":first-child").attr("class", "synteny");
  xOffset = ideo._layout.margin.left;
  writeSyntenicRegions3(syntenicRegions, syntenies, xOffset, ideo);
  reportPerformance4(t03, ideo);
}

// node_modules/ideogram/src/js/annotations/filter.js
function restoreDefaultTracks() {
  var ideo = this;
  ideo.config.numAnnotTracks = ideo.config.annotationsNumTracks;
  d3.selectAll(ideo.selector + " .annot").remove();
  ideo.drawAnnots(ideo.processAnnotData(ideo.rawAnnots));
}
function getDisplayedRawAnnotsByChr(annotsByChr, trackIndexes) {
  var annot, displayedRawAnnotsByChr, annots, i, displayedAnnots, j, trackIndex;
  displayedRawAnnotsByChr = [];
  for (i = 0; i < annotsByChr.length; i++) {
    annots = annotsByChr[i];
    displayedAnnots = [];
    for (j = 0; j < annots.annots.length; j++) {
      annot = annots.annots[j].slice();
      trackIndex = annot[3] + 1;
      if (trackIndexes.includes(trackIndex)) {
        annot[3] = trackIndexes.indexOf(trackIndex);
        displayedAnnots.push(annot);
      }
    }
    displayedRawAnnotsByChr.push({ chr: annots.chr, annots: displayedAnnots });
  }
  return displayedRawAnnotsByChr;
}
function updateDisplayedTracks(trackIndexes) {
  var displayedRawAnnotsByChr, displayedAnnots, rawAnnots, ideo = this, annotsByChr = ideo.rawAnnots.annots;
  ideo.config.numAnnotTracks = trackIndexes.length;
  displayedRawAnnotsByChr = getDisplayedRawAnnotsByChr(annotsByChr, trackIndexes);
  rawAnnots = { keys: ideo.rawAnnots.keys, annots: displayedRawAnnotsByChr };
  if (ideo.config.geometry === "collinear") {
    collinear_default(ideo);
  }
  displayedAnnots = ideo.processAnnotData(rawAnnots);
  d3.selectAll(ideo.selector + " .annot").remove();
  ideo.displayedTrackIndexes = trackIndexes;
  ideo.drawAnnots(displayedAnnots);
  return displayedAnnots;
}
function getSetAnnotsByChr(annotsByChr, ideo) {
  var i, j, annots, annot, setAnnots, trackIndexOriginal, numAvailTracks, setAnnotsByChr = [];
  numAvailTracks = 1;
  for (i = 0; i < annotsByChr.length; i++) {
    annots = annotsByChr[i];
    setAnnots = [];
    for (j = 0; j < annots.annots.length; j++) {
      annot = annots.annots[j].slice();
      trackIndexOriginal = annot[3];
      if (trackIndexOriginal + 1 > numAvailTracks) {
        numAvailTracks = trackIndexOriginal + 1;
      }
      annot.splice(4, 0, trackIndexOriginal);
      setAnnots.push(annot);
    }
    setAnnotsByChr.push({ chr: annots.chr, annots: setAnnots });
  }
  ideo.numAvailTracks = numAvailTracks;
  return setAnnotsByChr;
}
function setOriginalTrackIndexes(rawAnnots) {
  var keys, annotsByChr, setAnnotsByChr, ideo = this;
  keys = rawAnnots.keys;
  if (keys.length < 4 || keys[3] !== "trackIndex" || keys[4] === "trackIndexOriginal") {
    return rawAnnots;
  }
  annotsByChr = rawAnnots.annots;
  setAnnotsByChr = getSetAnnotsByChr(annotsByChr, ideo);
  keys.splice(4, 0, "trackIndexOriginal");
  rawAnnots = { keys, annots: setAnnotsByChr };
  if (ideo.rawAnnots.metadata) rawAnnots.metadata = ideo.rawAnnots.metadata;
  return rawAnnots;
}

// node_modules/ideogram/src/js/annotations/process.js
var colorMap = [
  ["F00"],
  // If there is 1 track, then color it red.
  ["F00", "88F"],
  // If 2 tracks, color one red and one light blue.
  ["F00", "CCC", "88F"],
  // If 3, color one red, one grey, one light blue.
  ["F00", "FA0", "0AF", "88F"],
  // And so on.
  ["F00", "FA0", "CCC", "0AF", "88F"],
  ["F00", "FA0", "875", "578", "0AF", "88F"],
  ["F00", "FA0", "875", "CCC", "578", "0AF", "88F"],
  ["F00", "FA0", "7A0", "875", "0A7", "578", "0AF", "88F"],
  ["F00", "FA0", "7A0", "875", "CCC", "0A7", "578", "0AF", "88F"],
  ["F00", "FA0", "7A0", "875", "552", "255", "0A7", "578", "0AF", "88F"]
];
function orderAnnotContainers(annots, ideo) {
  var unorderedAnnots, i, j, annot, chr, chrs;
  unorderedAnnots = annots;
  annots = [];
  chrs = ideo.chromosomesArray;
  for (i = 0; i < chrs.length; i++) {
    chr = chrs[i].name;
    for (j = 0; j < unorderedAnnots.length; j++) {
      annot = unorderedAnnots[j];
      if (annot.chr === chr) {
        annots.push(annot);
      }
    }
  }
  return annots;
}
function addClientAnnot(annots, annot, ra, m, annotationTracks) {
  var annotTrack;
  annot.trackIndex = ra[3];
  annotTrack = annotationTracks[annot.trackIndex];
  if (annotTrack.color) {
    annot.color = annotTrack.color;
  }
  if (annotTrack.shape) {
    annot.shape = annotTrack.shape;
  }
  if (annotTrack.placement) {
    annot.placement = annotTrack.placement;
  } else {
    annot.placement = annot.trackIndex;
  }
  annots[m].annots.push(annot);
  return annots;
}
function addSparseServerAnnot(annot, ra, omittedAnnots, annots, m, ideo) {
  var colors2 = colorMap[ideo.numAvailTracks - 1];
  annot.trackIndex = ra[3];
  annot.trackIndexOriginal = ra[4];
  annot.color = "#" + colors2[annot.trackIndexOriginal];
  if (annot.trackIndex > ideo.config.numTracks - 1) {
    if (annot.trackIndex in omittedAnnots) {
      omittedAnnots[annot.trackIndex].push(annot);
    } else {
      omittedAnnots[annot.trackIndex] = [annot];
    }
    return [annots, omittedAnnots];
  }
  annots[m].annots.push(annot);
  return [annots, omittedAnnots];
}
function addBasicClientAnnot(annots, annot, m, ideo) {
  if (!annot.trackIndex) {
    annot.trackIndex = 0;
  }
  if (!annot.color) {
    annot.color = ideo.config.annotationsColor;
  }
  if (!annot.shape) {
    annot.shape = "triangle";
  }
  if (!annot.placement) {
    annot.placement = annot.trackIndex;
  }
  annots[m].annots.push(annot);
  return annots;
}
function addAnnot(annot, keys, ra, omittedAnnots, annots, m, ideo) {
  if (ideo.config.annotationTracks) {
    annots = addClientAnnot(annots, annot, ra, m, ideo.config.annotationTracks);
  } else if (keys[3] === "trackIndex" && ideo.numAvailTracks !== 1) {
    [annots, omittedAnnots] = addSparseServerAnnot(annot, ra, omittedAnnots, annots, m, ideo);
  } else {
    annots = addBasicClientAnnot(annots, annot, m, ideo);
  }
  return [annots, omittedAnnots];
}
function getAnnotDomId(chrIndex, annotIndex) {
  return "_c" + chrIndex + "_a" + annotIndex;
}
function addAnnotsForChr(annots, omittedAnnots, annotsByChr, chrModel, m, keys, ideo) {
  var j, k, annot, ra;
  const shouldAssignDomId = !ideo.config.annotationsLayout || ideo.config.annotationsLayout === "tracks";
  for (j = 0; j < annotsByChr.annots.length; j++) {
    ra = annotsByChr.annots[j];
    annot = {};
    for (k = 0; k < keys.length; k++) {
      annot[keys[k]] = ra[k];
    }
    if (ideo.config.heatmaps) {
      if (keys.includes("trackIndex")) {
        var trackIndex = ra[keys.indexOf("trackIndex")];
        var heatmapKey = ideo.config.heatmaps[trackIndex].key;
        annot[heatmapKey] = ra[ra.length - 1];
      }
    }
    annot.stop = annot.start + annot.length;
    annot.chr = annotsByChr.chr;
    annot.chrIndex = m;
    if (ideo.config.histogram) {
      annot.height = histogramAnnots(ideo, annot);
    }
    annot.startPx = ideo.convertBpToPx(chrModel, annot.start);
    annot.stopPx = ideo.convertBpToPx(chrModel, annot.stop);
    annot.px = Math.round((annot.startPx + annot.stopPx) / 2);
    if (shouldAssignDomId) annot.domId = getAnnotDomId(m, j);
    [annots, omittedAnnots] = addAnnot(annot, keys, ra, omittedAnnots, annots, m, ideo);
  }
  if (shouldAssignDomId) {
    if (ideo.annotSortFunction) {
      annots[m].annots = setAnnotRanks(annots[m].annots, ideo);
      annots[m].annots.sort((a, b) => {
        return -ideo.annotSortFunction(a, b);
      });
    } else {
      annots[m].annots.sort((a, b) => a[1] - b[1]);
    }
    for (j = 0; j < annots[m].annots.length; j++) {
      annots[m].annots[j].domId = getAnnotDomId(m, j);
    }
  }
  return [annots, omittedAnnots];
}
function warnOfUndefinedChromosome(annotsByChr) {
  console.warn(
    'Chromosome "' + annotsByChr.chr + '" undefined in ideogram; ' + annotsByChr.annots.length + " annotations not shown"
  );
}
function addAnnots(rawAnnots, keys, ideo) {
  var m, i, annotsByChr, chrModel, annots = [], omittedAnnots = {};
  m = -1;
  for (i = 0; i < rawAnnots.length; i++) {
    annotsByChr = rawAnnots[i];
    chrModel = ideo.chromosomes[ideo.config.taxid][annotsByChr.chr];
    if (typeof chrModel === "undefined") {
      warnOfUndefinedChromosome(annotsByChr);
      continue;
    }
    m++;
    annots.push({ chr: annotsByChr.chr, annots: [] });
    if (ideo.config.annotationsLayout !== "heatmap-2d") {
      [annots, omittedAnnots] = addAnnotsForChr(
        annots,
        omittedAnnots,
        annotsByChr,
        chrModel,
        m,
        keys,
        ideo
      );
    } else {
      [annots, omittedAnnots] = add2dAnnotsForChr(
        annots,
        omittedAnnots,
        annotsByChr,
        chrModel,
        m,
        keys,
        ideo
      );
    }
  }
  return [annots, omittedAnnots];
}
function sendTrackAndAnnotWarnings(omittedAnnots, ideo) {
  var numOmittedTracks, layout = ideo.config.annotationsLayout, numTracks = ideo.config.numAnnotTracks;
  if (!/heatmap/.test(layout) && numTracks > 10) {
    console.error(
      "Ideogram only displays up to 10 tracks at a time.  You specified " + numTracks + " tracks.  Perhaps consider a different way to visualize your data."
    );
  }
  numOmittedTracks = Object.keys(omittedAnnots).length;
  if (numOmittedTracks) {
    console.warn(
      "Ideogram configuration specified " + numTracks + " tracks, but loaded annotations contain " + numOmittedTracks + " extra tracks."
    );
  }
}
function processAnnotData(rawAnnots) {
  var keys, annots, omittedAnnots, ideo = this;
  keys = rawAnnots.keys;
  rawAnnots = rawAnnots.annots;
  [annots, omittedAnnots] = addAnnots(rawAnnots, keys, ideo);
  annots = orderAnnotContainers(annots, ideo);
  sendTrackAndAnnotWarnings(omittedAnnots, ideo);
  return annots;
}

// node_modules/ideogram/src/js/parsers/expression-matrix-parser.js
var ExpressionMatrixParser = class {
  /**
   * @param {String} matrix Tab-delimited gene expression matrix
   * @param {Object} coordinates Coordinates [chr, start, length] by gene name
   * @param {Object} ideo Ideogram object
   */
  constructor(matrix, ideo) {
    this.matrix = matrix;
    this.ideo = ideo;
  }
  /**
   * Initialize rawAnnots by fetching genomic coordinates, then merging them
   * with the gene expression matrix supplied in constructor.
   */
  setRawAnnots() {
    var parser2, ideo, matrix;
    parser2 = this;
    ideo = this.ideo;
    matrix = this.matrix;
    return new Promise(function(resolve) {
      parser2.rawAnnots = parser2.fetchCoordinates(ideo).then(function(coordinates) {
        parser2.coordinates = coordinates;
        resolve(parser2.parseExpressionMatrix(matrix, ideo));
      });
    });
  }
  /**
   * Get chromosome, start and stop coordinates from genome annotation file
   *
   * TODO: Support non-human organisms
   */
  fetchCoordinates(ideo) {
    var coordinates = {};
    if (ideo.config.organism === "human") {
      var ensemblData = ideo.config.dataDir + "../../annotations/Homo_sapiens,_Ensembl_80.tsv";
      return new Promise(function(resolve) {
        ideo.fetch(ensemblData, "text").then(function(data) {
          var tsvLines, i, start3, stop2, gene, chr, length2;
          tsvLines = data.split(/\r\n|\n/).slice(1);
          for (i = 0; i < tsvLines.length; i++) {
            [start3, stop2, gene, , chr] = tsvLines[i].split(/\s/g);
            start3 = parseInt(start3);
            stop2 = parseInt(stop2);
            length2 = stop2 - start3;
            coordinates[gene] = [chr, start3, length2];
          }
          resolve(coordinates);
        });
      });
    } else {
      throw Error("Expression matrix parsing is only supported for human");
    }
  }
  /**
   * Parses an annotation from a tab-separated line of a matrix file
   */
  parseAnnotFromTsvLine(tsvLine, chrs) {
    var annot, chrIndex, chr, start3, gene, expressions, columns = tsvLine.split(/\s/g);
    gene = columns[0];
    if (gene in this.coordinates === false) return [null, null];
    expressions = columns.slice(1).map((d) => parseFloat(d));
    [chr, start3, length] = this.coordinates[gene];
    chrIndex = chrs.indexOf(chr);
    if (chrIndex === -1) return [null, null];
    annot = [gene, start3, length];
    annot = annot.concat(expressions);
    return [chrIndex, annot];
  }
  /**
  * Parses a gene expression matrix file, returns raw annotations
  */
  parseExpressionMatrix(matrix, ideo) {
    var i, chrs, rawAnnots, cells, line, chrIndex, annot, keys, annots = [], tsvLines = matrix.split(/\r\n|\n/);
    chrs = Object.keys(ideo.chromosomes[ideo.config.taxid]);
    for (i = 0; i < chrs.length; i++) {
      annots.push({ chr: chrs[i], annots: [] });
    }
    for (i = 1; i < tsvLines.length; i++) {
      line = tsvLines[i];
      [chrIndex, annot] = this.parseAnnotFromTsvLine(line, chrs);
      if (chrIndex !== null) annots[chrIndex].annots.push(annot);
    }
    cells = tsvLines[0].split(/\s/g);
    keys = ["name", "start", "length"].concat(cells);
    rawAnnots = { keys, annots };
    return rawAnnots;
  }
};

// node_modules/ideogram/src/js/annotations/download.js
function downloadAnnotations() {
  const ideo = this;
  const annots = {};
  ideo.annots.forEach((chrAnnots) => {
    chrAnnots.annots.forEach((annot) => {
      const desc = ideo.annotDescriptions.annots[annot.name];
      annots[annot.name] = [
        annot.name,
        desc.ensemblId,
        annot.chr,
        annot.start,
        annot.stop,
        annot.length,
        desc.type
      ];
    });
  });
  const header = [
    "# Gene name",
    "Ensembl ID",
    "Chromosome",
    "Start",
    "Stop",
    "Length",
    "Type"
  ];
  const rows = [header].concat(Object.values(annots));
  const annotsTsv = ideo.annotDescriptions.headers + "\n#\n" + rows.map((row) => row.join("	")).join("\n");
  const annotsHref = "data:text/plain;charset=utf-8," + encodeURIComponent(annotsTsv);
  var evt = new MouseEvent("click", {
    view: window,
    bubbles: false,
    cancelable: true
  });
  var a = document.createElement("a");
  a.setAttribute("download", "ideogram.tsv");
  a.setAttribute("href", annotsHref);
  a.setAttribute("target", "_blank");
  a.setAttribute("id", "_ideo-undisplayed-dl-annots-link");
  a.setAttribute("style", "display: none;");
  document.body.appendChild(a);
  a.dispatchEvent(evt);
}

// node_modules/ideogram/src/js/annotations/annotations.js
function initNumTracksAndBarWidth(ideo, config2) {
  if (config2.annotationTracks) {
    ideo.config.numAnnotTracks = config2.annotationTracks.length;
  } else if (config2.annotationsNumTracks) {
    ideo.config.numAnnotTracks = config2.annotationsNumTracks;
  } else {
    ideo.config.numAnnotTracks = 1;
  }
  ideo.config.annotTracksHeight = config2.annotationHeight * config2.numAnnotTracks;
  if (typeof config2.barWidth === "undefined") {
    ideo.config.barWidth = 3;
  }
}
function initTooltip(ideo, config2) {
  if (config2.showAnnotTooltip !== false) {
    ideo.config.showAnnotTooltip = true;
  }
  if (config2.onWillShowAnnotTooltip) {
    ideo.onWillShowAnnotTooltipCallback = config2.onWillShowAnnotTooltip;
  }
  if (config2.onDidShowAnnotTooltip) {
    ideo.onDidShowAnnotTooltipCallback = config2.onDidShowAnnotTooltip;
  }
}
function initAnnotLabel(ideo, config2) {
  if (config2.addAnnotLabel !== false) {
    ideo.config.addAnnotLabel = true;
  }
  if (config2.onWillAddAnnotLabel) {
    ideo.onWillAddAnnotLabelCallback = config2.onWillAddAnnotLabel;
  }
}
function initAnnotHeight(ideo) {
  var config2 = ideo.config;
  var annotHeight;
  if (!config2.annotationHeight) {
    if (config2.annotationsLayout === "heatmap") {
      annotHeight = config2.chrWidth - 1;
    } else {
      annotHeight = Math.round(config2.chrHeight / 100);
      if (annotHeight < 3) annotHeight = 3;
    }
    ideo.config.annotationHeight = annotHeight;
  }
}
function initAnnotSettings() {
  var ideo = this, config2 = ideo.config;
  initAnnotHeight(ideo);
  if (config2.annotationsPath || config2.localAnnotationsPath || ideo.annots || config2.annotations) {
    initNumTracksAndBarWidth(ideo, config2);
  } else {
    ideo.config.annotTracksHeight = 0;
    ideo.config.numAnnotTracks = 0;
  }
  if (typeof config2.annotationsColor === "undefined") {
    ideo.config.annotationsColor = "#F00";
  }
  if (config2.onClickAnnot) {
    ideo.onClickAnnotCallback = config2.onClickAnnot;
  }
  initTooltip(ideo, config2);
  initAnnotLabel(ideo, config2);
}
function validateAnnotsUrl(annotsUrl) {
  var tmp, extension;
  tmp = annotsUrl.split("?")[0].split(".");
  extension = tmp[tmp.length - 1];
  if (["bed", "json", "tsv"].includes(extension) === false) {
    extension = extension.toUpperCase();
    alert(
      "Ideogram.js only supports BED and Ideogram JSON and TSV at the moment.  Sorry, check back soon for " + extension + " support!"
    );
    return;
  }
  return extension;
}
function detectDuplicateChrsInRawAnnots(ideo) {
  const seen = {};
  const duplicates = [];
  const chrs = ideo.rawAnnots.annots.map((annot) => annot.chr);
  chrs.forEach((chr) => {
    if (chr in seen) duplicates.push(chr);
    seen[chr] = 1;
  });
  if (duplicates.length > 0) {
    const message = `Duplicate chromosomes detected.
Chromosome list: ${chrs}.  Duplicates: ${duplicates}.
To fix this, edit your raw annotations JSON data to remove redundant chromosomes.`;
    throw Error(message);
  }
}
function afterRawAnnots() {
  var ideo = this, config2 = ideo.config;
  ideo.rawAnnots.annots = ideo.rawAnnots.annots.sort(Ideogram.sortChromosomes);
  if (ideo.onLoadAnnotsCallback) {
    ideo.onLoadAnnotsCallback();
  }
  if ("heatmapThresholds" in config2 || "metadata" in ideo.rawAnnots && "heatmapThresholds" in ideo.rawAnnots.metadata) {
    if (config2.annotationsLayout === "heatmap") {
      inflateHeatmaps(ideo);
    } else if (config2.annotationsLayout === "heatmap-2d") {
      ideo.config.heatmapThresholds = inflateThresholds(ideo);
    }
  }
  if (config2.heatmaps) {
    ideo.deserializeAnnotsForHeatmap(ideo.rawAnnots);
  }
  detectDuplicateChrsInRawAnnots(ideo);
}
function flattenAnnots() {
  const ideo = this;
  return ideo.annots.reduce((accumulator, annots) => {
    return [...accumulator, ...annots.annots];
  }, []);
}
function fetchAnnots(annotsUrl) {
  var extension, is2dHeatmap, ideo = this, config2 = ideo.config;
  is2dHeatmap = config2.annotationsLayout === "heatmap-2d";
  var extension = validateAnnotsUrl(annotsUrl);
  if (annotsUrl.slice(0, 4) !== "http" && !is2dHeatmap && extension !== "tsv") {
    ideo.fetch(annotsUrl).then(function(data) {
      ideo.rawAnnotsResponse = data;
      ideo.rawAnnots = data;
      ideo.afterRawAnnots();
    });
    return;
  }
  extension = is2dHeatmap ? "" : extension;
  ideo.fetch(annotsUrl, "text").then(function(text) {
    ideo.rawAnnotsResponse = text;
    if (is2dHeatmap) {
      var parser2 = new ExpressionMatrixParser(text, ideo);
      parser2.setRawAnnots().then(function(d) {
        ideo.rawAnnots = d;
        ideo.afterRawAnnots();
      });
    } else {
      if (extension === "tsv") {
        ideo.rawAnnots = new TsvParser(text, ideo).rawAnnots;
      } else if (extension === "bed") {
        ideo.rawAnnots = new BedParser(text, ideo).rawAnnots;
      } else {
        ideo.rawAnnots = JSON.parse(text);
      }
      ideo.afterRawAnnots();
    }
  });
}
function fillAnnots(annots) {
  var filledAnnots, chrs, chrArray, i, chr, annot, chrIndex;
  filledAnnots = [];
  chrs = [];
  chrArray = this.chromosomesArray;
  for (i = 0; i < chrArray.length; i++) {
    chr = chrArray[i].name;
    chrs.push(chr);
    filledAnnots.push({ chr, annots: [] });
  }
  for (i = 0; i < annots.length; i++) {
    annot = annots[i];
    chrIndex = chrs.indexOf(annot.chr);
    if (chrIndex !== -1) {
      filledAnnots[chrIndex] = annot;
    }
  }
  return filledAnnots;
}
function setAnnotRanks(annots, ideo) {
  if (annots.length === 0) return annots;
  if ("initRank" in annots[0] === false) {
    if ("geneCache" in Ideogram === false) return annots;
    const ranks = Ideogram.geneCache.interestingNames;
    return annots.map((annot) => {
      if (ranks.includes(annot.name)) {
        annot.rank = ranks.indexOf(annot.name) + 1;
      } else {
        annot.rank = 1e10;
      }
      return annot;
    });
  } else {
    return annots.map((annot) => {
      annot.rank = annot.initRank;
      return annot;
    });
  }
}
function sortAnnotsByRank(annots, ideo) {
  if (ideo) {
    annots = setAnnotRanks(annots, ideo);
  }
  return annots.sort((a, b) => {
    return a.rank - b.rank;
  });
}

// node_modules/ideogram/src/js/annotations/highlight.js
function highlight(chrNames, color2 = "red") {
  const ideo = this;
  const taxid = ideo.config.taxid;
  const highlightsHtml = chrNames.map((chrName) => {
    const chrId = ideo.chromosomes[taxid][chrName].id;
    const chrSet = `${ideo.selector} #${chrId}-chromosome-set`;
    const chrDom = document.querySelector(chrSet);
    const rect = chrDom.getBoundingClientRect();
    const style2 = `style="
      stroke-width: 1px;
      stroke: ${color2};
      fill: ${color2};
      fill-opacity: 0.05;
      position: absolute;
      rx: 4;
      ry: 4;
      height: ${rect.width + 15}px;
      width: ${rect.height + 15}px"`;
    const left2 = chrDom.transform.baseVal[1].matrix.f - 7.5;
    const transform = `transform="rotate(90) translate(10, ${left2})"`;
    const id2 = `id="ideo-highlight-${chrId}"`;
    return `<rect class="ideo-highlight" ${id2} ${style2} ${transform}/>`;
  }).join();
  const ideoDom = document.querySelector(ideo.selector);
  ideoDom.insertAdjacentHTML("afterBegin", highlightsHtml);
}
function unhighlight(chrNames) {
  const ideo = this;
  let highlightsSelector = `${ideo.selector} .ideo-highlight`;
  if (typeof chrNames !== "undefined") {
    const taxid = ideo.config.taxid;
    highlightsSelector = chrNames.map((chrName) => {
      const chrId = ideo.chromosomes[taxid][chrName].id;
      return `${ideo.selector} #ideo-highlight-${chrId}`;
    });
  }
  document.querySelectorAll(highlightsSelector).forEach((element) => {
    element.remove();
  });
}

// node_modules/ideogram/src/js/services/eutils-config.js
var apiKey = "&api_key=7e33ac6a08a6955ec3b83d214d22b21a2808";
var eutils = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/";
var esearch = eutils + "esearch.fcgi?retmode=json" + apiKey;
var esummary = eutils + "esummary.fcgi?retmode=json" + apiKey;
var elink = eutils + "elink.fcgi?retmode=json" + apiKey;
function getAssemblySearchUrl(taxid, ideo) {
  var termStem, asmSearchUrl;
  if (ideo.assemblyIsAccession()) {
    termStem = ideo.config.assembly + "%22[Assembly%20Accession]";
  } else {
    termStem = taxid + "%22[taxid]AND%20(%22latest%20refseq%22[filter])%20";
  }
  asmSearchUrl = ideo.esearch + "&db=assembly&term=%22" + termStem + "AND%20(%22chromosome%20level%22[filter]%20OR%20%22complete%20genome%22[filter])";
  return asmSearchUrl;
}

// node_modules/ideogram/src/js/services/organisms.js
function getTaxidFromEutils(orgName, ideo) {
  var taxonomySearch, taxid;
  taxonomySearch = ideo.esearch + "&db=taxonomy&term=" + orgName;
  return d3.json(taxonomySearch).then(function(data) {
    var idlist = data.esearchresult.idlist;
    if (idlist.length === 0) {
      var warning = 'Organism "' + orgName + `" is generally unknown; it was not found in the NCBI Taxonomy database.  If you did not intend to specify a novel or custom taxon, then try using the organism's scientific name, e.g. Homo sapiens or Arabidopsis thaliana.`;
      throw warning;
    } else {
      taxid = data.esearchresult.idlist[0];
      return [orgName, taxid];
    }
  });
}
function getOrganismFromEutils(taxid, callback) {
  var organism, taxonomySearch, ideo = this;
  taxid = ideo.config.organism;
  taxonomySearch = ideo.esummary + "&db=taxonomy&id=" + taxid;
  d3.json(taxonomySearch).then(function(data) {
    organism = data.result[String(taxid)].commonname;
    ideo.config.organism = organism;
    return callback(organism);
  });
}
function setTaxidData(taxid, ideo) {
  var dataDir, urlOrg, taxids;
  if (ideo.assemblyIsAccession()) {
    return new Promise(function(resolve) {
      ideo.coordinateSystem = "bp";
      ideo.getAssemblyAndChromosomesFromEutils(taxid, resolve);
    });
  }
  dataDir = ideo.config.dataDir;
  urlOrg = slug(ideo.organisms[taxid].scientificName);
  taxids = [taxid];
  var fullyBandedTaxids = ["9606", "10090", "10116"];
  if (fullyBandedTaxids.includes(taxid) && !ideo.config.showFullyBanded) {
    urlOrg += "-no-bands";
  }
  var chromosomesUrl = dataDir + urlOrg + ".json";
  var promise2 = new Promise((resolve, reject) => {
    return fetchWithRetry(chromosomesUrl).then((response) => {
      return response.json().then(function(json) {
        resolve(json);
      });
    }).catch((errorMessage) => {
      reject(errorMessage);
    });
  });
  return promise2.then(
    function(chrData) {
      var chrBands2 = chrData.chrBands;
      var asmAndChrTaxidsArray = [""], chromosomes = [], seenChrs = {}, chr, maxLength, splitBand, length2;
      ideo.bandData[chrData.taxid] = chrBands2;
      for (var i = 0; i < chrBands2.length; i++) {
        splitBand = chrBands2[i].split(" ");
        chr = splitBand[0];
        length2 = splitBand.slice(-1)[0];
        if (chr in seenChrs) {
          continue;
        } else {
          chromosomes.push({ name: chr, type: "nuclear", length: length2 });
          seenChrs[chr] = 1;
        }
      }
      chromosomes = chromosomes.sort(Ideogram.sortChromosomes);
      maxLength = { bp: 0, iscn: 0 };
      chromosomes.forEach((chr2) => {
        if (chr2.length > maxLength.bp) maxLength.bp = chr2.length;
      });
      ideo.maxLength[taxid] = maxLength;
      asmAndChrTaxidsArray.push(chromosomes);
      asmAndChrTaxidsArray.push(taxids);
      return asmAndChrTaxidsArray;
    },
    function() {
      return new Promise(function(resolve) {
        ideo.coordinateSystem = "bp";
        ideo.getAssemblyAndChromosomesFromEutils(taxid, resolve);
      });
    }
  );
}
function setAssemblyAndChromosomes(taxid, resolve, ideo) {
  var assembly, chrs, originalChrs, orgName, filteredChrs, config2 = ideo.config;
  setTaxidData(taxid, ideo).then(function(asmChrTaxidsArray) {
    assembly = asmChrTaxidsArray[0];
    chrs = asmChrTaxidsArray[1];
    if ("chromosomes" in config2 === false || config2.chromosomes === null) {
      ideo.config.chromosomes = {};
      ideo.config.chromosomes[taxid] = chrs;
    } else {
      if (config2.multiorganism) {
        if (taxid in config2.chromosomes) {
          originalChrs = config2.chromosomes[taxid];
        } else {
          orgName = slug(ideo.getScientificName(taxid));
          ideo.config.chromosomes[taxid] = config2.chromosomes[orgName].slice();
          originalChrs = ideo.config.chromosomes[taxid];
        }
      } else {
        originalChrs = config2.chromosomes;
      }
      filteredChrs = chrs.filter((d) => originalChrs.includes(d.name));
      ideo.config.chromosomes[taxid] = filteredChrs;
    }
    ideo.chromosomes[taxid] = ideo.config.chromosomes[taxid].slice();
    ideo.organisms[taxid].assemblies = {
      default: assembly
    };
    resolve();
  });
}
function isOrganismSupported(org, ideo) {
  var taxid, ideoOrg;
  for (taxid in ideo.organisms) {
    ideoOrg = ideo.organisms[taxid];
    if (taxid === slug(org) || slug(ideoOrg.commonName) === slug(org) || slug(ideoOrg.scientificName) === slug(org)) {
      return true;
    }
  }
  return false;
}
function populateNonNativeOrg(orgs, ideo) {
  var org, promise, i, getTaxidFromEutilsPromises = [], augmentedOrganismMetadata = {};
  for (i = 0; i < orgs.length; i++) {
    org = orgs[i];
    if (isOrganismSupported(org, ideo) === false) {
      promise = getTaxidFromEutils(org, ideo).then(function(orgNameAndTaxid) {
        var taxid = orgNameAndTaxid[1], orgName = orgNameAndTaxid[0], name2, scientificName;
        name2 = orgName.replace("-", " ");
        scientificName = name2[0].toUpperCase() + name2.slice(1);
        augmentedOrganismMetadata[taxid] = {
          scientificName,
          commonName: "",
          assemblies: { default: "" }
        };
        Object.assign(ideo.organisms, augmentedOrganismMetadata);
      }, function(warning) {
        console.warn(warning);
        var customMetadata = {
          scientificName: org,
          commonName: org,
          assemblies: { default: "" }
        };
        ideo.organisms["-1"] = customMetadata;
        augmentedOrganismMetadata["-1"] = customMetadata;
      });
    } else {
      promise = new Promise(function(resolve) {
        var taxid = ideo.getTaxid(org);
        augmentedOrganismMetadata[taxid] = ideo.organisms[taxid];
        resolve();
      });
    }
    getTaxidFromEutilsPromises.push(promise);
  }
  return Promise.all(getTaxidFromEutilsPromises).then(function() {
    return augmentedOrganismMetadata;
  });
}
function prepareTmpChrsAndTaxids(ideo) {
  var orgs, taxids, tmpChrs, org, taxid, chrsOrgSlugs, config2 = ideo.config;
  taxids = [];
  tmpChrs = {};
  orgs = config2.multiorganism ? config2.organism : [config2.organism];
  return populateNonNativeOrg(orgs, ideo).then(function(orgMetadata) {
    var orgFields = orgMetadata[taxid];
    for (taxid in orgMetadata) {
      orgFields = orgMetadata[taxid];
      taxids.push(taxid);
      if (config2.multiorganism) {
        if (typeof config2.chromosomes !== "undefined") {
          chrsOrgSlugs = Object.keys(config2.chromosomes).map((org2) => slug(org2));
          if (chrsOrgSlugs.includes(slug(orgFields.scientificName))) {
            org = orgFields.scientificName;
          } else if (chrsOrgSlugs.includes(slug(orgFields.commonName))) {
            org = orgFields.commonName;
          }
          if (slug(org) in config2.chromosomes) {
            tmpChrs[taxid] = config2.chromosomes[slug(org)];
          } else {
            tmpChrs[taxid] = config2.chromosomes[org.toLowerCase()];
          }
        } else {
          tmpChrs = null;
        }
      }
    }
    return [tmpChrs, taxids];
  });
}
function sortTaxidsByOriginalOrganismOption(ideo) {
  var configOrganisms, sortedTaxids, i;
  configOrganisms = ideo.config.organism;
  sortedTaxids = [];
  if (Array.isArray(configOrganisms)) {
    for (i = 0; i < configOrganisms.length; i++) {
      sortedTaxids.push(ideo.getTaxid(configOrganisms[i]));
    }
  } else {
    sortedTaxids.push(ideo.getTaxid(configOrganisms));
  }
  return sortedTaxids;
}
function getTaxidsForOrganismsInConfig(callback, ideo) {
  prepareTmpChrsAndTaxids(ideo).then(function([tmpChrs, taxids]) {
    var i, taxid, promise, assemblies, asmAccs, config2 = ideo.config, asmAndChrPromises = [];
    for (i = 0; i < taxids.length; i++) {
      taxid = taxids[i];
      assemblies = ideo.organisms[taxid].assemblies;
      asmAccs = Object.values(assemblies);
      if (assemblies.default === "" || ideo.assemblyIsAccession() && !asmAccs.includes(config2.assembly)) {
        promise = new Promise(function(resolve) {
          setAssemblyAndChromosomes(taxid, resolve, ideo);
        });
      } else {
        ideo.config.taxids = taxids;
        if (ideo.config.multiorganism) {
          ideo.config.chromosomes = tmpChrs;
        }
        promise = new Promise(function(resolve) {
          resolve();
        });
      }
      asmAndChrPromises.push(promise);
    }
    Promise.all(asmAndChrPromises).then(function() {
      taxids = sortTaxidsByOriginalOrganismOption(ideo);
      ideo.config.taxids = taxids;
      return callback(taxids);
    });
  });
}
function getIsMultiorganism(taxidInit, ideo) {
  return "organism" in ideo.config && ideo.config.organism instanceof Array || taxidInit && ideo.config.taxid instanceof Array;
}
function getTaxidsForOrganismsNotInConfig(taxidInit, callback, ideo) {
  var taxids;
  if (ideo.config.multiorganism) {
    if (taxidInit) {
      taxids = ideo.config.taxid;
    }
  } else {
    if (taxidInit) {
      taxids = [ideo.config.taxid];
    }
    ideo.config.taxids = taxids;
  }
  callback(taxids);
}
function getTaxids(callback) {
  var taxidInit, ideo = this;
  taxidInit = "taxid" in ideo.config;
  ideo.config.multiorganism = getIsMultiorganism(taxidInit, ideo);
  if (ideo.config.multiorganism) ideo.coordinateSystem = "bp";
  if ("organism" in ideo.config) {
    const org = ideo.config.organism;
    if (typeof org === "string") {
      ideo.config.organism = slug(org.toLowerCase());
    }
    getTaxidsForOrganismsInConfig(callback, ideo);
  } else {
    getTaxidsForOrganismsNotInConfig(taxidInit, callback, ideo);
  }
}

// node_modules/ideogram/src/js/services/services.js
function getESearchUrlForChromosomes(asmUid, ideo) {
  var qs;
  qs = "&db=nuccore&dbfrom=assembly&linkname=assembly_nuccore&cmd=neighbor_history&from_uid=" + asmUid;
  return d3.json(ideo.elink + qs).then(function(data) {
    var webenv = data.linksets[0].webenv;
    qs = "&db=nuccore&term=%231+AND+%28sequence_from_chromosome[Properties]+OR+sequence_from_plastid[Properties]+OR+sequence_from_mitochondrion[Properties]%29&WebEnv=" + webenv + "&usehistory=y&retmax=1000";
    return ideo.esearch + qs;
  });
}
function fetchNucleotideSummary(data, ideo) {
  var ids, ntSummary;
  ids = data.esearchresult.idlist.join(",");
  ntSummary = ideo.esummary + "&db=nucleotide&id=" + ids;
  return d3.json(ntSummary);
}
function parseMitochondrion(result, ideo) {
  var type2, cnIndex, chrName;
  if (ideo.config.showNonNuclearChromosomes) {
    type2 = result.genome;
    cnIndex = result.subtype.split("|").indexOf("plasmid");
    if (cnIndex === -1) {
      chrName = "MT";
    } else {
      chrName = result.subname.split("|")[cnIndex];
    }
  } else {
    return [null, null];
  }
  return [chrName, type2];
}
function parseChloroplastOrPlastid(ideo) {
  if (ideo.config.showNonNuclearChromosomes) {
    return ["CP", "chloroplast"];
  }
  return [null, null];
}
function parseApicoplast(ideo) {
  if (ideo.config.showNonNuclearChromosomes) {
    return ["AP", "apicoplast"];
  }
  return [null, null];
}
function parseNuclear(result) {
  var type2, cnIndex, chrName;
  type2 = "nuclear";
  cnIndex = result.subtype.split("|").indexOf("chromosome");
  chrName = result.subname.split("|")[cnIndex];
  if (typeof chrName !== "undefined" && chrName.substr(0, 3) === "chr") {
    chrName = chrName.substr(3);
  }
  return [chrName, type2];
}
function getChrNameAndType(result, ideo) {
  var genome = result.genome;
  if (genome === "mitochondrion") {
    return parseMitochondrion(result, ideo);
  } else if (genome === "chloroplast" || genome === "plastid") {
    return parseChloroplastOrPlastid(ideo);
  } else if (genome === "apicoplast") {
    return parseApicoplast(ideo);
  } else {
    return parseNuclear(result);
  }
}
function parseChromosome(result, ideo) {
  var chrName, type2, chromosome;
  [chrName, type2] = getChrNameAndType(result, ideo);
  chromosome = {
    name: chrName,
    length: result.slen,
    type: type2
  };
  return chromosome;
}
function parseChromosomes(results, taxid, ideo) {
  var x, chromosome, seenChrId, maxLength, seenChrs = {}, chromosomes = [];
  for (x in results) {
    if (x === "uids") continue;
    chromosome = parseChromosome(results[x], ideo);
    seenChrId = chromosome.name + "_" + chromosome.length;
    if (chromosome.type !== null && seenChrId in seenChrs === false) {
      chromosomes.push(chromosome);
    }
    seenChrs[seenChrId] = 1;
  }
  chromosomes = chromosomes.sort(Ideogram.sortChromosomes);
  maxLength = { bp: 0, iscn: 0 };
  chromosomes.forEach((chr) => {
    if (chr.length > maxLength.bp) maxLength.bp = chr.length;
  });
  if (maxLength.bp > ideo.maxLength.bp) ideo.maxLength.bp = maxLength.bp;
  ideo.maxLength[taxid] = maxLength;
  ideo.coordinateSystem = "bp";
  return chromosomes;
}
function fetchAssemblySummary(data, ideo) {
  var asmUid, asmSummaryUrl;
  asmUid = data.esearchresult.idlist[0];
  asmSummaryUrl = ideo.esummary + "&db=assembly&id=" + asmUid;
  return d3.json(asmSummaryUrl);
}
function getAssemblyAndChromosomesFromEutils(taxid, callback) {
  var assemblyAccession, ideo = this;
  var asmSearchUrl = getAssemblySearchUrl(taxid, ideo);
  d3.json(asmSearchUrl).then(function(data) {
    return fetchAssemblySummary(data, ideo);
  }).then(function(data) {
    var asmUid = data.result.uids[0];
    assemblyAccession = data.result[asmUid];
    return getESearchUrlForChromosomes(asmUid, ideo);
  }).then(function(esearchUrl) {
    return d3.json(esearchUrl);
  }).then(function(data) {
    return fetchNucleotideSummary(data, ideo);
  }).then(function(data) {
    var chromosomes = parseChromosomes(data.result, taxid, ideo);
    return callback([assemblyAccession, chromosomes]);
  }, function(rejectedReason) {
    console.warn(rejectedReason);
  });
}

// node_modules/ideogram/src/js/bands/show.js
function hideUnshownBandLabels() {
  var ideo = this;
  var bandsToShow = ideo.bandsToShow.join(",");
  if (ideo.bandsToShow.length === 0) return;
  d3.selectAll(ideo.selector + " .bandLabel, .bandLabelStalk").style("display", "none");
  d3.selectAll(bandsToShow).style("display", "");
}
function getPrevRight(prevLabelXRight, prevHiddenBoxIndex, i, textOffsets, chrModel) {
  var prevTextBoxLeft, prevTextBoxWidth;
  if (prevHiddenBoxIndex !== i) {
    prevTextBoxLeft = textOffsets[chrModel.id][i];
    prevTextBoxWidth = 36;
    prevLabelXRight = prevTextBoxLeft + prevTextBoxWidth;
  }
  return prevLabelXRight;
}
function updateShown(indexesToShow, overlapRight, left2, pad3, prevRight, i, isBefore) {
  var hiddenIndex, doSkip, thisRight = isBefore ? overlapRight : prevRight;
  if (left2 < pad3 + thisRight) {
    overlapRight = prevRight;
    hiddenIndex = i;
    doSkip = isBefore;
  } else {
    indexesToShow.push(i);
  }
  return [indexesToShow, overlapRight, hiddenIndex, doSkip];
}
function getIndexesToShow(offsets, chrModel) {
  var i, hiddenIndex, left2, prevRight, doSkip, indexesToShow = [], textsLength = offsets[chrModel.id].length, overlapRight = 0, pad3 = 5;
  for (i = 0; i < textsLength; i++) {
    left2 = offsets[chrModel.id][i];
    [indexesToShow, overlapRight, hiddenIndex, doSkip] = updateShown(indexesToShow, overlapRight, left2, pad3, prevRight, i, true);
    if (doSkip) continue;
    prevRight = getPrevRight(prevRight, hiddenIndex, i, offsets, chrModel);
    [indexesToShow, overlapRight, hiddenIndex, doSkip] = updateShown(indexesToShow, overlapRight, left2, pad3, prevRight, i, false);
  }
  return indexesToShow;
}
function setBandsToShow(chrs, textOffsets) {
  var index2, i, j, indexesToShow, chrModel, selectorsToShow, ithLength, ideo = this;
  ideo.bandsToShow = [];
  for (i = 0; i < chrs.length; i++) {
    chrModel = chrs[i];
    indexesToShow = getIndexesToShow(textOffsets, chrModel);
    selectorsToShow = [];
    ithLength = indexesToShow.length;
    for (j = 0; j < ithLength; j++) {
      index2 = indexesToShow[j];
      selectorsToShow.push("#" + chrModel.id + " .bsbsl-" + index2);
    }
    ideo.bandsToShow = ideo.bandsToShow.concat(selectorsToShow);
  }
}

// node_modules/ideogram/src/js/bands/draw.js
function drawBandLabelText(chr, bandsToLabel, chrModel, textOffsets) {
  var ideo = this, layout = ideo._layout, chrIndex = chrModel.chrIndex;
  chr.selectAll("text").data(bandsToLabel).enter().append("g").attr("class", function(d, i) {
    return "bandLabel bsbsl-" + i;
  }).attr("transform", function(d) {
    var transform = layout.getChromosomeBandLabelTranslate(d, chrIndex);
    if (ideo.config.orientation === "horizontal") {
      textOffsets[chrModel.id].push(transform.x + 13);
    } else {
      textOffsets[chrModel.id].push(transform.y + 6);
    }
    return transform.translate;
  }).append("text").attr("text-anchor", layout.getChromosomeBandLabelAnchor(chrIndex)).text(function(d) {
    return d.name;
  });
  return textOffsets;
}
function drawBandLabelStalk(chr, bandsToLabel, chrModel, textOffsets) {
  var ideo = this;
  chr.selectAll("line.bandLabelStalk").data(bandsToLabel).enter().append("g").attr("class", function(d, i) {
    return "bandLabelStalk bsbsl-" + i;
  }).attr("transform", function(d) {
    var x, y2;
    x = ideo.round(d.px.start + d.px.width / 2);
    y2 = -10;
    textOffsets[chrModel.id].push(x + 13);
    return "translate(" + x + "," + y2 + ")";
  }).append("line").attr("x1", 0).attr("y1", ideo._layout.getChromosomeBandTickY1(chrModel.chrIndex)).attr("x2", 0).attr("y2", ideo._layout.getChromosomeBandTickY2(chrModel.chrIndex));
}
function getChrModels(chromosomes) {
  var taxid, chr, chrModels = [];
  for (taxid in chromosomes) {
    for (chr in chromosomes[taxid]) {
      chrModels.push(chromosomes[taxid][chr]);
    }
  }
  return chrModels;
}
function drawBandLabels(chromosomes) {
  var i, chr, chrModel, chrModels, bandsToLabel, ideo = this, textOffsets = {};
  chrModels = getChrModels(chromosomes);
  for (i = 0; i < chrModels.length; i++) {
    chrModel = chrModels[i];
    chr = d3.select(ideo.selector + " #" + chrModel.id);
    textOffsets[chrModel.id] = [];
    bandsToLabel = chrModel.bands.filter((d) => d.name !== "pter");
    textOffsets = ideo.drawBandLabelText(chr, bandsToLabel, chrModel, textOffsets);
    ideo.drawBandLabelStalk(chr, bandsToLabel, chrModel, textOffsets);
  }
  ideo.setBandsToShow(chrModels, textOffsets);
}
function getStainAndColors(i, colors2) {
  var stain, color1, color2, color3;
  stain = colors2[i][0];
  color1 = colors2[i][1];
  color2 = colors2[i][2];
  color3 = colors2[i][3];
  return [stain, color1, color2, color3];
}
function getGradients(colors2) {
  var i, stain, color1, color2, color3, gradients = "";
  for (i = 0; i < colors2.length; i++) {
    [stain, color1, color2, color3] = getStainAndColors(i, colors2);
    gradients += '<linearGradient id="' + stain + '" x1="0%" y1="0%" x2="0%" y2="100%">';
    if (stain === "gneg") {
      gradients += '<stop offset="70%" stop-color="' + color2 + '" /><stop offset="95%" stop-color="' + color3 + '" /><stop offset="100%" stop-color="' + color1 + '" />';
    } else {
      gradients += '<stop offset="5%" stop-color="' + color1 + '" /><stop offset="15%" stop-color="' + color2 + '" /><stop offset="60%" stop-color="' + color3 + '" />';
    }
    gradients += "</linearGradient>";
  }
  return gradients;
}
function getBandColorGradients() {
  var css2, gradients = "";
  gradients = getGradients(staticColors);
  css2 = `<style>${configuredCss}</style>`;
  gradients += staticGradients;
  gradients = "<defs>" + gradients + "</defs>";
  gradients = css2 + gradients;
  return gradients;
}

// node_modules/ideogram/src/js/bands/parse.js
function getDelimiterTsvLinesAndInit(source, content) {
  var delimiter, tsvLines, init3;
  if (typeof chrBands === "undefined" && source !== "native") {
    delimiter = /\t/;
    tsvLines = content.split(/\r\n|\n/);
    init3 = 1;
  } else {
    delimiter = / /;
    tsvLines = content;
    init3 = 0;
  }
  return [delimiter, tsvLines, init3];
}
function updateChromosomes(chromosomes) {
  var tmp, i;
  if (chromosomes instanceof Array && typeof chromosomes[0] === "object") {
    tmp = [];
    for (i = 0; i < chromosomes.length; i++) {
      tmp.push(chromosomes[i].name);
    }
    chromosomes = tmp;
  }
  return chromosomes;
}
function getLineObject(chr, columns, stain, taxid) {
  return {
    chr,
    bp: {
      start: parseInt(columns[5], 10),
      stop: parseInt(columns[6], 10)
    },
    iscn: {
      start: parseInt(columns[3], 10),
      stop: parseInt(columns[4], 10)
    },
    px: {
      start: -1,
      stop: -1,
      width: -1
    },
    name: columns[1] + columns[2],
    stain,
    taxid
  };
}
function getStain(columns) {
  var stain = columns[7];
  if (columns[8]) stain += columns[8];
  return stain;
}
function updateLines(lines, columns, taxid) {
  var chr, stain, line;
  chr = columns[0];
  if (chr in lines === false) lines[chr] = [];
  stain = getStain(columns);
  line = getLineObject(chr, columns, stain, taxid);
  lines[chr].push(line);
  return lines;
}
function shouldSkipBand(chrs, chr, taxid, ideo) {
  var hasChrs, chrsAreList, chrNotInList, chrsAreObject, innerChrsAreStrings, matchingChrObjs, chrNotInObject, multiorganism = ideo.config.multiorganism;
  hasChrs = typeof chrs !== "undefined" && chrs !== null;
  if (!hasChrs) return false;
  chrsAreList = Array.isArray(chrs);
  chrNotInList = chrsAreList && chrs.indexOf(chr) === -1;
  chrsAreObject = typeof chrs === "object";
  if (chrsAreList && !chrsAreObject && chrNotInList) return true;
  if (taxid in chrs === false && multiorganism) return false;
  if (!multiorganism) {
    matchingChrObjs = chrs.filter((thisChr) => thisChr === chr);
    chrNotInObject = matchingChrObjs.length === 0;
  } else {
    innerChrsAreStrings = typeof chrs[taxid][0] === "string";
    if (innerChrsAreStrings) {
      chrNotInObject = chrs[taxid].includes(chr) === false;
    } else {
      matchingChrObjs = chrs[taxid].filter((thisChr) => thisChr.name === chr);
      chrNotInObject = matchingChrObjs.length === 0;
    }
  }
  return chrNotInObject;
}
function parseBands(taxid, chromosomes, ideo) {
  var delimiter, tsvLines, columns, chr, i, init3, source, content, lines = {};
  content = ideo.bandData[taxid];
  if (Array.isArray(content)) source = "native";
  chromosomes = updateChromosomes(chromosomes);
  var result = getDelimiterTsvLinesAndInit(source, content);
  delimiter = result[0];
  tsvLines = result[1];
  init3 = result[2];
  for (i = init3; i < tsvLines.length; i++) {
    columns = tsvLines[i].split(delimiter);
    chr = columns[0];
    if (shouldSkipBand(chromosomes, chr, taxid, ideo)) {
      continue;
    }
    lines = updateLines(lines, columns, taxid);
  }
  return lines;
}

// node_modules/ideogram/src/js/bands/bands.js
function getBandsArray(chromosome, bandsByChr, taxid, ideo) {
  var bands, chrLength, bandsArray = [];
  bands = bandsByChr[chromosome];
  bandsArray.push(bands);
  chrLength = {
    iscn: bands[bands.length - 1].iscn.stop,
    bp: bands[bands.length - 1].bp.stop
  };
  if (taxid in ideo.maxLength === false) {
    ideo.maxLength[taxid] = { bp: 0, iscn: 0 };
  }
  if (chrLength.iscn > ideo.maxLength[taxid].iscn) {
    ideo.maxLength[taxid].iscn = chrLength.iscn;
    if (chrLength.iscn > ideo.maxLength.iscn) {
      ideo.maxLength.iscn = chrLength.iscn;
    }
  }
  if (chrLength.bp > ideo.maxLength[taxid].bp) {
    ideo.maxLength[taxid].bp = chrLength.bp;
    if (chrLength.bp > ideo.maxLength.bp) {
      ideo.maxLength.bp = chrLength.bp;
    }
  }
  return bandsArray;
}
function setChrsByTaxidsWithBands(taxid, chrs, bandsArray, ideo) {
  var bandsByChr, chromosome, k, chrBandsArray;
  bandsByChr = parseBands(taxid, chrs, ideo);
  chrs = Object.keys(bandsByChr).sort(Ideogram.sortChromosomes);
  if ("chromosomes" in ideo.config === false || ideo.config.chromosomes === null) {
    ideo.config.chromosomes = {};
  }
  if (chrs.length > 0) {
    ideo.config.chromosomes[taxid] = chrs.slice();
  }
  ideo.numChromosomes += ideo.config.chromosomes[taxid].length;
  for (k = 0; k < chrs.length; k++) {
    chromosome = chrs[k];
    chrBandsArray = getBandsArray(chromosome, bandsByChr, taxid, ideo);
    bandsArray = bandsArray.concat(chrBandsArray);
  }
  return bandsArray;
}
function setChromosomesByTaxid(taxid, chrs, bandsArray, ideo) {
  var chr, i;
  if (taxid in ideo.bandData || taxid in organismMetadata && ideo.assemblyIsAccession() === false) {
    bandsArray = setChrsByTaxidsWithBands(taxid, chrs, bandsArray, ideo);
  } else {
    ideo.numChromosomes += chrs.length;
    for (i = 0; i < chrs.length; i++) {
      chr = chrs[i];
      if (chr.length > ideo.maxLength.bp) ideo.maxLength.bp = chr.length;
    }
  }
  return bandsArray;
}
function reportPerformance5(t03, ideo) {
  var t13 = (/* @__PURE__ */ new Date()).getTime();
  if (ideo.config.debug) {
    console.log("Time in processBandData: " + (t13 - t03) + " ms");
  }
}
function processBandData(taxid) {
  var bandsArray, chrs, ideo = this, config2 = ideo.config, t03 = (/* @__PURE__ */ new Date()).getTime();
  bandsArray = [];
  if ("chromosomes" in config2) {
    if (config2.multiorganism) {
      chrs = config2.chromosomes;
    } else if (taxid in config2.chromosomes) {
      chrs = config2.chromosomes[taxid].slice();
    } else {
      chrs = config2.chromosomes.slice();
    }
  }
  bandsArray = setChromosomesByTaxid(taxid, chrs, bandsArray, ideo);
  reportPerformance5(t03, ideo);
  return [taxid, bandsArray];
}

// node_modules/ideogram/src/js/brush.js
function onBrushMove() {
  call(this.onBrushMoveCallback);
}
function onBrushEnd() {
  call(this.onBrushEndCallback);
}
function setBrush(bpDomain, pxRange, xOffset, width, ideo) {
  var xScale, length2 = ideo.config.chrHeight;
  xScale = d3.scaleLinear().domain(bpDomain).range(pxRange);
  ideo.brush = d3.brushX().extent([[xOffset, 0], [length2 + xOffset, width]]).on("brush", _onBrushMove).on("end", _onBrushEnd);
  function _onBrushMove({ selection: selection2 }) {
    var extent2 = selection2.map(xScale.invert), from = Math.floor(extent2[0]), to = Math.ceil(extent2[1]);
    ideo.selectedRegion = { from, to, extent: to - from };
    if (ideo.onBrushMoveCallback) {
      ideo.onBrushMoveCallback();
    }
  }
  function _onBrushEnd({ selection: selection2 }) {
    if (ideo.onBrushEndCallback) {
      ideo.onBrushEndCallback();
    }
  }
}
function getBasePairDomainAndPixelRange(chrModel, xOffset) {
  var band2, i, bpDomain = [1], pxRange = [1], lastBand = chrModel.bands.slice(-1)[0];
  for (i = 0; i < chrModel.bands.length; i++) {
    band2 = chrModel.bands[i];
    bpDomain.push(band2.bp.start);
    pxRange.push(band2.px.start + xOffset);
  }
  bpDomain.push(lastBand.bp.stop - 1);
  pxRange.push(lastBand.px.stop + xOffset);
  return [bpDomain, pxRange];
}
function refineGenomicCoordinates(chr, from, to) {
  var nameSplit, fromToSplit;
  nameSplit = chr.split(":");
  fromToSplit = chr.split("-");
  if (nameSplit.length > 1 && fromToSplit.length > 1) {
    chr = nameSplit[0].replace("chr", "");
    fromToSplit = nameSplit[1].split("-");
    from = parseInt(fromToSplit[0]);
    to = parseInt(fromToSplit[1] - 1);
  }
  return [chr, from, to];
}
function getChrModel(chr, ideo) {
  var i, cm, chrModel;
  for (i = 0; i < ideo.chromosomesArray.length; i++) {
    cm = ideo.chromosomesArray[i];
    if (cm.name === chr) {
      chrModel = cm;
      return chrModel;
    }
  }
}
function writeBrush(chrModel, from, to, xOffset, width, ideo) {
  var x0, x1, yTranslate, yOffset;
  x0 = ideo.convertBpToPx(chrModel, from) + xOffset;
  x1 = ideo.convertBpToPx(chrModel, to) + xOffset;
  yTranslate = ideo._layout.getChromosomeSetYTranslate(0);
  yOffset = yTranslate + (ideo.config.chrWidth - width) / 2;
  d3.select(ideo.selector).append("g").attr("class", "brush").attr("transform", "translate(0, " + yOffset + ")").call(ideo.brush).call(ideo.brush.move, [x0, x1]);
}
function setSelectedRegion(from, to, ideo) {
  var extent2 = to - from + 1;
  ideo.selectedRegion = { from, to, extent: extent2 };
}
function createBrush(chr, from, to) {
  var chrModel, chrLengthBp, bpDomain, pxRange, lastBand, ideo = this, width = ideo.config.chrWidth + 6.5, xOffset = ideo._layout.margin.left;
  [chr, from, to] = refineGenomicCoordinates(chr, from, to);
  chrModel = getChrModel(chr, ideo);
  [bpDomain, pxRange] = getBasePairDomainAndPixelRange(chrModel, xOffset);
  lastBand = chrModel.bands.slice(-1)[0];
  chrLengthBp = lastBand.bp.stop;
  if (typeof from === "undefined") from = Math.floor(chrLengthBp / 10);
  if (typeof to === "undefined") to = Math.ceil(from * 2);
  setBrush(bpDomain, pxRange, xOffset, width, ideo);
  setSelectedRegion(from, to, ideo);
  writeBrush(chrModel, from, to, xOffset, width, ideo);
}

// node_modules/ideogram/src/js/cursor.js
function onCursorMove() {
  call(this.onCursorMoveCallback);
}
function setCursor(position, bpDomain, pxRange, xOffset, width, ideo) {
  var xScale;
  xScale = d3.scaleLinear().domain(bpDomain).range(pxRange);
  if (!("rotatable" in ideo.config && ideo.config.rotatable === false)) {
    console.warn("Using the cursor with rotate is not supported.");
  }
  var yTranslate = ideo._layout.getChromosomeSetYTranslate(0);
  var yOffset = yTranslate + (ideo.config.chrWidth - width) / 2;
  var cursorBrush = d3.select(ideo.selector).append("g").attr("class", "brush").attr("transform", "translate(0, " + yOffset + ")").append("rect").attr("class", "cursor").attr("x", xScale(position)).attr("y", 0).attr("width", 1).attr("height", 30);
  if (ideo.onCursorMove) {
    ideo.onCursorMoveCallback(position);
  }
  if (!ideo.setCursorPosition) {
    ideo.setCursorPosition = function(newPosition) {
      cursorBrush.attr("x", xScale(newPosition));
      if (ideo.onCursorMove) {
        ideo.onCursorMoveCallback(newPosition);
      }
    };
  }
  d3.selectAll(ideo.selector + " .chromosome").on("click", function(event) {
    var x = event.offsetX;
    x -= 6;
    cursorBrush.attr("x", x);
    var newPosition = Math.floor(xScale.invert(x));
    if (ideo.onCursorMove) {
      ideo.onCursorMoveCallback(newPosition);
    }
  });
}
function getBasePairDomainAndPixelRange2(chrModel, xOffset) {
  var band2, i, bpDomain = [1], pxRange = [1], lastBand = chrModel.bands.slice(-1)[0];
  for (i = 0; i < chrModel.bands.length; i++) {
    band2 = chrModel.bands[i];
    bpDomain.push(band2.bp.start);
    pxRange.push(band2.px.start + xOffset);
  }
  bpDomain.push(lastBand.bp.stop - 1);
  pxRange.push(lastBand.px.stop + xOffset);
  return [bpDomain, pxRange];
}
function getChrModel2(chr, ideo) {
  var i, cm, chrModel;
  for (i = 0; i < ideo.chromosomesArray.length; i++) {
    cm = ideo.chromosomesArray[i];
    if (cm.name === chr) {
      chrModel = cm;
      return chrModel;
    }
  }
}
function createClickCursor(position) {
  var chrModel, bpDomain, pxRange, ideo = this, width = ideo.config.chrWidth + 6.5, xOffset = ideo._layout.margin.left;
  if (typeof position === "undefined") {
    return false;
  }
  chrModel = getChrModel2(ideo.config.chromosome, ideo);
  [bpDomain, pxRange] = getBasePairDomainAndPixelRange2(chrModel, xOffset);
  setCursor(position, bpDomain, pxRange, xOffset, width, ideo);
}

// node_modules/ideogram/src/js/sex-chromosomes.js
function drawSexChromosomes(container, chrIndex) {
  var bandsArray, taxid, chrs, sexChromosomeIndexes, sciLength, chromosome, bands, chrModel, sci, homologIndex;
  bandsArray = this.bandsArray;
  taxid = this.config.taxid;
  chrs = this.config.chromosomes[taxid];
  if (this.config.sex === "male") {
    sexChromosomeIndexes = [1, 0];
  } else {
    sexChromosomeIndexes = [0, 0];
  }
  sciLength = sexChromosomeIndexes.length;
  for (homologIndex = 0; homologIndex < sciLength; homologIndex++) {
    sci = sexChromosomeIndexes[homologIndex] + chrIndex;
    chromosome = chrs[sci];
    bands = bandsArray[taxid][sci];
    chrModel = this.getChromosomeModel(bands, chromosome, taxid, sci);
    this.appendHomolog(chrModel, chrIndex, homologIndex, container);
  }
}
function setSexChromosomes(chrs) {
  var chr, i, ideo = this, sexChrs = { X: 1, Y: 1 };
  if (this.config.ploidy !== 2 || !this.config.sex) return;
  ideo.sexChromosomes.list = [];
  for (i = 0; i < chrs.length; i++) {
    chr = chrs[i];
    if (ideo.config.sex === "male" && chr in sexChrs) {
      ideo.sexChromosomes.list.push(chr);
      if (!ideo.sexChromosomes.index) {
        ideo.sexChromosomes.index = i;
      }
    } else if (chr === "X") {
      ideo.sexChromosomes.list.push(chr, chr);
      ideo.sexChromosomes.index = i;
    }
  }
}

// node_modules/ideogram/src/js/coordinate-converters.js
function throwBpToPxError(bp, chr, band2) {
  throw new Error(
    "Base pair out of range.  bp: " + bp + "; length of chr" + chr.name + ": " + band2.bp.stop
  );
}
function getPx(chr, bp) {
  var i, px, band2, bpToIscnScale, iscn, iscnStart, iscnStop, iscnLength, bpStart, bpStop, bpLength, pxStart, pxLength;
  for (i = 0; i < chr.bands.length; i++) {
    band2 = chr.bands[i];
    bpStart = band2.bp.start;
    bpStop = band2.bp.stop;
    bpLength = bpStop - bpStart;
    iscnStart = band2.iscn.start;
    iscnStop = band2.iscn.stop;
    iscnLength = iscnStop - iscnStart;
    pxStart = band2.px.start;
    pxLength = band2.px.width;
    if (bp >= bpStart && bp <= bpStop) {
      bpToIscnScale = iscnLength / bpLength;
      iscn = iscnStart + (bp - bpStart) * bpToIscnScale;
      px = pxStart + pxLength * (iscn - iscnStart) / iscnLength;
      return [px, band2];
    }
  }
  return [null, band2];
}
function convertBpToPx(chr, bp) {
  var band2, px;
  if (chr.bands.length > 1 || chr.name === "MT") {
    [px, band2] = getPx(chr, bp);
    if (px !== null) return px;
  } else if (bp >= 1 && bp <= chr.length) {
    px = chr.scale.bp * bp;
    return px;
  }
  throwBpToPxError(bp, chr, band2);
}
function throwPxToBpError(px, chr, pxStop) {
  throw new Error(
    "Pixel out of range.  px: " + px + "; length of chr" + chr.name + ": " + pxStop
  );
}
function getBp(iscnStop, iscnStart, px, pxStop, pxStart, band2, iscnLength) {
  var pxLength, bpLength, pxToIscnScale, iscn, bp;
  iscnLength = iscnStop - iscnStart;
  pxLength = pxStop - pxStart;
  bpLength = band2.bp.stop - band2.bp.start;
  pxToIscnScale = iscnLength / pxLength;
  iscn = iscnStart + (px - pxStart) * pxToIscnScale;
  bp = band2.bp.start + bpLength * (iscn - iscnStart) / iscnLength;
  return Math.round(bp);
}
function convertPxToBp(chr, px) {
  var i, band2, bp, pxStart, pxStop, iscnStart, iscnStop, iscnLength;
  if (px === 0) {
    px = chr.bands[0].px.start;
  }
  for (i = 0; i < chr.bands.length; i++) {
    band2 = chr.bands[i];
    pxStart = band2.px.start;
    pxStop = band2.px.stop;
    iscnStart = band2.iscn.start;
    iscnStop = band2.iscn.stop;
    if (px >= pxStart && px <= pxStop) {
      bp = getBp(iscnStop, iscnStart, px, pxStop, pxStart, band2, iscnLength);
      return bp;
    }
  }
  throwPxToBpError(px, chr, pxStop);
}

// node_modules/crossfilter2/src/array.js
var array8 = arrayUntyped;
var array16 = arrayUntyped;
var array32 = arrayUntyped;
var arrayLengthen = arrayLengthenUntyped;
var arrayWiden = arrayWidenUntyped;
if (typeof Uint8Array !== "undefined") {
  array8 = function(n2) {
    return new Uint8Array(n2);
  };
  array16 = function(n2) {
    return new Uint16Array(n2);
  };
  array32 = function(n2) {
    return new Uint32Array(n2);
  };
  arrayLengthen = function(array3, length2) {
    if (array3.length >= length2) return array3;
    var copy3 = new array3.constructor(length2);
    copy3.set(array3);
    return copy3;
  };
  arrayWiden = function(array3, width) {
    var copy3;
    switch (width) {
      case 16:
        copy3 = array16(array3.length);
        break;
      case 32:
        copy3 = array32(array3.length);
        break;
      default:
        throw new Error("invalid array width!");
    }
    copy3.set(array3);
    return copy3;
  };
}
function arrayUntyped(n2) {
  var array3 = new Array(n2), i = -1;
  while (++i < n2) array3[i] = 0;
  return array3;
}
function arrayLengthenUntyped(array3, length2) {
  var n2 = array3.length;
  while (n2 < length2) array3[n2++] = 0;
  return array3;
}
function arrayWidenUntyped(array3, width) {
  if (width > 32) throw new Error("invalid array width!");
  return array3;
}
function bitarray(n2) {
  this.length = n2;
  this.subarrays = 1;
  this.width = 8;
  this.masks = {
    0: 0
  };
  this[0] = array8(n2);
}
bitarray.prototype.lengthen = function(n2) {
  var i, len;
  for (i = 0, len = this.subarrays; i < len; ++i) {
    this[i] = arrayLengthen(this[i], n2);
  }
  this.length = n2;
};
bitarray.prototype.add = function() {
  var m, w, one2, i, len;
  for (i = 0, len = this.subarrays; i < len; ++i) {
    m = this.masks[i];
    w = this.width - 32 * i;
    one2 = (~m & m + 1) >>> 0;
    if (w >= 32 && !one2) {
      continue;
    }
    if (w < 32 && one2 & 1 << w) {
      this[i] = arrayWiden(this[i], w <<= 1);
      this.width = 32 * i + w;
    }
    this.masks[i] |= one2;
    return {
      offset: i,
      one: one2
    };
  }
  this[this.subarrays] = array8(this.length);
  this.masks[this.subarrays] = 1;
  this.width += 8;
  return {
    offset: this.subarrays++,
    one: 1
  };
};
bitarray.prototype.copy = function(dest, src) {
  var i, len;
  for (i = 0, len = this.subarrays; i < len; ++i) {
    this[i][dest] = this[i][src];
  }
};
bitarray.prototype.truncate = function(n2) {
  var i, len;
  for (i = 0, len = this.subarrays; i < len; ++i) {
    for (var j = this.length - 1; j >= n2; j--) {
      this[i][j] = 0;
    }
  }
  this.length = n2;
};
bitarray.prototype.zero = function(n2) {
  var i, len;
  for (i = 0, len = this.subarrays; i < len; ++i) {
    if (this[i][n2]) {
      return false;
    }
  }
  return true;
};
bitarray.prototype.zeroExcept = function(n2, offset2, zero2) {
  var i, len;
  for (i = 0, len = this.subarrays; i < len; ++i) {
    if (i === offset2 ? this[i][n2] & zero2 : this[i][n2]) {
      return false;
    }
  }
  return true;
};
bitarray.prototype.zeroExceptMask = function(n2, mask) {
  var i, len;
  for (i = 0, len = this.subarrays; i < len; ++i) {
    if (this[i][n2] & mask[i]) {
      return false;
    }
  }
  return true;
};
bitarray.prototype.only = function(n2, offset2, one2) {
  var i, len;
  for (i = 0, len = this.subarrays; i < len; ++i) {
    if (this[i][n2] != (i === offset2 ? one2 : 0)) {
      return false;
    }
  }
  return true;
};
bitarray.prototype.onlyExcept = function(n2, offset2, zero2, onlyOffset, onlyOne) {
  var mask;
  var i, len;
  for (i = 0, len = this.subarrays; i < len; ++i) {
    mask = this[i][n2];
    if (i === offset2)
      mask &= zero2;
    if (mask != (i === onlyOffset ? onlyOne : 0)) {
      return false;
    }
  }
  return true;
};
var array_default2 = {
  array8: arrayUntyped,
  array16: arrayUntyped,
  array32: arrayUntyped,
  arrayLengthen: arrayLengthenUntyped,
  arrayWiden: arrayWidenUntyped,
  bitarray
};

// node_modules/crossfilter2/src/filter.js
var filterExact = (bisect2, value) => {
  return function(values) {
    var n2 = values.length;
    return [bisect2.left(values, value, 0, n2), bisect2.right(values, value, 0, n2)];
  };
};
var filterRange = (bisect2, range) => {
  var min4 = range[0], max5 = range[1];
  return function(values) {
    var n2 = values.length;
    return [bisect2.left(values, min4, 0, n2), bisect2.left(values, max5, 0, n2)];
  };
};
var filterAll = (values) => {
  return [0, values.length];
};
var filter_default3 = {
  filterExact,
  filterRange,
  filterAll
};

// node_modules/crossfilter2/src/identity.js
var identity_default3 = (d) => {
  return d;
};

// node_modules/crossfilter2/src/null.js
var null_default = () => {
  return null;
};

// node_modules/crossfilter2/src/zero.js
var zero_default = () => {
  return 0;
};

// node_modules/crossfilter2/src/heap.js
function heap_by(f) {
  function heap(a, lo, hi) {
    var n2 = hi - lo, i = (n2 >>> 1) + 1;
    while (--i > 0) sift(a, i, n2, lo);
    return a;
  }
  function sort2(a, lo, hi) {
    var n2 = hi - lo, t4;
    while (--n2 > 0) t4 = a[lo], a[lo] = a[lo + n2], a[lo + n2] = t4, sift(a, 1, n2, lo);
    return a;
  }
  function sift(a, i, n2, lo) {
    var d = a[--lo + i], x = f(d), child;
    while ((child = i << 1) <= n2) {
      if (child < n2 && f(a[lo + child]) > f(a[lo + child + 1])) child++;
      if (x <= f(a[lo + child])) break;
      a[lo + i] = a[lo + child];
      i = child;
    }
    a[lo + i] = d;
  }
  heap.sort = sort2;
  return heap;
}
var h = heap_by(identity_default3);
h.by = heap_by;
var heap_default = h;

// node_modules/crossfilter2/src/heapselect.js
function heapselect_by(f) {
  var heap = heap_default.by(f);
  function heapselect(a, lo, hi, k) {
    var queue = new Array(k = Math.min(hi - lo, k)), min4, i, d;
    for (i = 0; i < k; ++i) queue[i] = a[lo++];
    heap(queue, 0, k);
    if (lo < hi) {
      min4 = f(queue[0]);
      do {
        if (f(d = a[lo]) > min4) {
          queue[0] = d;
          min4 = f(heap(queue, 0, k)[0]);
        }
      } while (++lo < hi);
    }
    return queue;
  }
  return heapselect;
}
var h2 = heapselect_by(identity_default3);
h2.by = heapselect_by;
var heapselect_default = h2;

// node_modules/crossfilter2/src/bisect.js
function bisect_by(f) {
  function bisectLeft2(a, x, lo, hi) {
    while (lo < hi) {
      var mid = lo + hi >>> 1;
      if (f(a[mid]) < x) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }
  function bisectRight2(a, x, lo, hi) {
    while (lo < hi) {
      var mid = lo + hi >>> 1;
      if (x < f(a[mid])) hi = mid;
      else lo = mid + 1;
    }
    return lo;
  }
  bisectRight2.right = bisectRight2;
  bisectRight2.left = bisectLeft2;
  return bisectRight2;
}
var bisect = bisect_by(identity_default3);
bisect.by = bisect_by;
var bisect_default2 = bisect;

// node_modules/crossfilter2/src/permute.js
var permute_default2 = (array3, index2, deep) => {
  for (var i = 0, n2 = index2.length, copy3 = deep ? JSON.parse(JSON.stringify(array3)) : new Array(n2); i < n2; ++i) {
    copy3[i] = array3[index2[i]];
  }
  return copy3;
};

// node_modules/crossfilter2/src/reduce.js
var reduceIncrement = (p) => {
  return p + 1;
};
var reduceDecrement = (p) => {
  return p - 1;
};
var reduceAdd = (f) => {
  return function(p, v) {
    return p + +f(v);
  };
};
var reduceSubtract = (f) => {
  return function(p, v) {
    return p - f(v);
  };
};
var reduce_default = {
  reduceIncrement,
  reduceDecrement,
  reduceAdd,
  reduceSubtract
};

// node_modules/@ranfdev/deepobj/dist/deepobj.m.js
function deepobj_m_default(t4, e3, i, n2, r2) {
  for (r2 in n2 = (i = i.split(".")).splice(-1, 1), i) e3 = e3[i[r2]] = e3[i[r2]] || {};
  return t4(e3, n2);
}

// node_modules/crossfilter2/src/result.js
var get3 = (obj, prop) => {
  const value = obj[prop];
  return typeof value === "function" ? value.call(obj) : value;
};
var reg = /\[([\w\d]+)\]/g;
var result_default = (obj, path) => {
  return deepobj_m_default(get3, obj, path.replace(reg, ".$1"));
};

// node_modules/crossfilter2/src/index.js
var REMOVED_INDEX = -1;
crossfilter.heap = heap_default;
crossfilter.heapselect = heapselect_default;
crossfilter.bisect = bisect_default2;
crossfilter.permute = permute_default2;
var src_default = crossfilter;
function crossfilter() {
  var crossfilter2 = {
    add,
    remove: removeData,
    dimension,
    groupAll,
    size,
    all,
    allFiltered,
    onChange,
    isElementFiltered
  };
  var data = [], n2 = 0, filters, filterListeners = [], dataListeners = [], removeDataListeners = [], callbacks = [];
  filters = new array_default2.bitarray(0);
  function add(newData) {
    var n0 = n2, n1 = newData.length;
    if (n1) {
      data = data.concat(newData);
      filters.lengthen(n2 += n1);
      dataListeners.forEach(function(l) {
        l(newData, n0, n1);
      });
      triggerOnChange("dataAdded");
    }
    return crossfilter2;
  }
  function removeData(predicate) {
    var newIndex = new Array(n2), removed = [], usePred = typeof predicate === "function", shouldRemove = function(i) {
      return usePred ? predicate(data[i], i) : filters.zero(i);
    };
    for (var index1 = 0, index2 = 0; index1 < n2; ++index1) {
      if (shouldRemove(index1)) {
        removed.push(index1);
        newIndex[index1] = REMOVED_INDEX;
      } else {
        newIndex[index1] = index2++;
      }
    }
    filterListeners.forEach(function(l) {
      l(-1, -1, [], removed, true);
    });
    removeDataListeners.forEach(function(l) {
      l(newIndex);
    });
    for (var index3 = 0, index4 = 0; index3 < n2; ++index3) {
      if (newIndex[index3] !== REMOVED_INDEX) {
        if (index3 !== index4) filters.copy(index4, index3), data[index4] = data[index3];
        ++index4;
      }
    }
    data.length = n2 = index4;
    filters.truncate(index4);
    triggerOnChange("dataRemoved");
  }
  function maskForDimensions(dimensions) {
    var n3, d, len, id2, mask = Array(filters.subarrays);
    for (n3 = 0; n3 < filters.subarrays; n3++) {
      mask[n3] = ~0;
    }
    for (d = 0, len = dimensions.length; d < len; d++) {
      id2 = dimensions[d].id();
      mask[id2 >> 7] &= ~(1 << (id2 & 63));
    }
    return mask;
  }
  function isElementFiltered(i, ignore_dimensions) {
    var mask = maskForDimensions(ignore_dimensions || []);
    return filters.zeroExceptMask(i, mask);
  }
  function dimension(value, iterable) {
    if (typeof value === "string") {
      var accessorPath = value;
      value = function(d) {
        return result_default(d, accessorPath);
      };
    }
    var dimension2 = {
      filter: filter3,
      filterExact: filterExact2,
      filterRange: filterRange2,
      filterFunction,
      filterAll: filterAll2,
      currentFilter,
      hasCurrentFilter,
      top: top2,
      bottom: bottom2,
      group: group2,
      groupAll: groupAll2,
      dispose,
      remove: dispose,
      // for backwards-compatibility
      accessor: value,
      id: function() {
        return id2;
      }
    };
    var one2, zero2, offset2, id2, values, index2, newValues, newIndex, iterablesIndexCount, iterablesIndexFilterStatus, iterablesEmptyRows = [], sortRange = function(n3) {
      return cr_range(n3).sort(function(A2, B2) {
        var a = newValues[A2], b = newValues[B2];
        return a < b ? -1 : a > b ? 1 : A2 - B2;
      });
    }, refilter = filter_default3.filterAll, refilterFunction, filterValue, filterValuePresent, indexListeners = [], dimensionGroups = [], lo0 = 0, hi0 = 0, t4 = 0, k;
    dataListeners.unshift(preAdd);
    dataListeners.push(postAdd);
    removeDataListeners.push(removeData2);
    var tmp = filters.add();
    offset2 = tmp.offset;
    one2 = tmp.one;
    zero2 = ~one2;
    id2 = offset2 << 7 | Math.log(one2) / Math.log(2);
    preAdd(data, 0, n2);
    postAdd(data, 0, n2);
    function preAdd(newData, n0, n1) {
      var newIterablesIndexCount, newIterablesIndexFilterStatus;
      if (iterable) {
        t4 = 0;
        j = 0;
        k = [];
        for (var i0 = 0; i0 < newData.length; i0++) {
          for (j = 0, k = value(newData[i0]); j < k.length; j++) {
            t4++;
          }
        }
        newValues = [];
        newIterablesIndexCount = cr_range(newData.length);
        newIterablesIndexFilterStatus = cr_index(t4, 1);
        var unsortedIndex = cr_range(t4);
        for (var l = 0, index1 = 0; index1 < newData.length; index1++) {
          k = value(newData[index1]);
          if (!k.length) {
            newIterablesIndexCount[index1] = 0;
            iterablesEmptyRows.push(index1 + n0);
            continue;
          }
          newIterablesIndexCount[index1] = k.length;
          for (j = 0; j < k.length; j++) {
            newValues.push(k[j]);
            unsortedIndex[l] = index1;
            l++;
          }
        }
        var sortMap = sortRange(t4);
        newValues = permute_default2(newValues, sortMap);
        newIndex = permute_default2(unsortedIndex, sortMap);
      } else {
        newValues = newData.map(value);
        newIndex = sortRange(n1);
        newValues = permute_default2(newValues, newIndex);
      }
      var bounds = refilter(newValues), lo1 = bounds[0], hi1 = bounds[1];
      var index22, index3, index4;
      if (iterable) {
        n1 = t4;
        if (refilterFunction) {
          for (index22 = 0; index22 < n1; ++index22) {
            if (!refilterFunction(newValues[index22], index22)) {
              if (--newIterablesIndexCount[newIndex[index22]] === 0) {
                filters[offset2][newIndex[index22] + n0] |= one2;
              }
              newIterablesIndexFilterStatus[index22] = 1;
            }
          }
        } else {
          for (index3 = 0; index3 < lo1; ++index3) {
            if (--newIterablesIndexCount[newIndex[index3]] === 0) {
              filters[offset2][newIndex[index3] + n0] |= one2;
            }
            newIterablesIndexFilterStatus[index3] = 1;
          }
          for (index4 = hi1; index4 < n1; ++index4) {
            if (--newIterablesIndexCount[newIndex[index4]] === 0) {
              filters[offset2][newIndex[index4] + n0] |= one2;
            }
            newIterablesIndexFilterStatus[index4] = 1;
          }
        }
      } else {
        if (refilterFunction) {
          for (index22 = 0; index22 < n1; ++index22) {
            if (!refilterFunction(newValues[index22], index22)) {
              filters[offset2][newIndex[index22] + n0] |= one2;
            }
          }
        } else {
          for (index3 = 0; index3 < lo1; ++index3) {
            filters[offset2][newIndex[index3] + n0] |= one2;
          }
          for (index4 = hi1; index4 < n1; ++index4) {
            filters[offset2][newIndex[index4] + n0] |= one2;
          }
        }
      }
      if (!n0) {
        values = newValues;
        index2 = newIndex;
        iterablesIndexCount = newIterablesIndexCount;
        iterablesIndexFilterStatus = newIterablesIndexFilterStatus;
        lo0 = lo1;
        hi0 = hi1;
        return;
      }
      var oldValues = values, oldIndex = index2, oldIterablesIndexFilterStatus = iterablesIndexFilterStatus, old_n0, i1 = 0;
      i0 = 0;
      if (iterable) {
        old_n0 = n0;
        n0 = oldValues.length;
        n1 = t4;
      }
      values = iterable ? new Array(n0 + n1) : new Array(n2);
      index2 = iterable ? new Array(n0 + n1) : cr_index(n2, n2);
      if (iterable) iterablesIndexFilterStatus = cr_index(n0 + n1, 1);
      if (iterable) {
        var oldiiclength = iterablesIndexCount.length;
        iterablesIndexCount = array_default2.arrayLengthen(iterablesIndexCount, n2);
        for (var j = 0; j + oldiiclength < n2; j++) {
          iterablesIndexCount[j + oldiiclength] = newIterablesIndexCount[j];
        }
      }
      var index5 = 0;
      for (; i0 < n0 && i1 < n1; ++index5) {
        if (oldValues[i0] < newValues[i1]) {
          values[index5] = oldValues[i0];
          if (iterable) iterablesIndexFilterStatus[index5] = oldIterablesIndexFilterStatus[i0];
          index2[index5] = oldIndex[i0++];
        } else {
          values[index5] = newValues[i1];
          if (iterable) iterablesIndexFilterStatus[index5] = newIterablesIndexFilterStatus[i1];
          index2[index5] = newIndex[i1++] + (iterable ? old_n0 : n0);
        }
      }
      for (; i0 < n0; ++i0, ++index5) {
        values[index5] = oldValues[i0];
        if (iterable) iterablesIndexFilterStatus[index5] = oldIterablesIndexFilterStatus[i0];
        index2[index5] = oldIndex[i0];
      }
      for (; i1 < n1; ++i1, ++index5) {
        values[index5] = newValues[i1];
        if (iterable) iterablesIndexFilterStatus[index5] = newIterablesIndexFilterStatus[i1];
        index2[index5] = newIndex[i1] + (iterable ? old_n0 : n0);
      }
      bounds = refilter(values), lo0 = bounds[0], hi0 = bounds[1];
    }
    function postAdd(newData, n0, n1) {
      indexListeners.forEach(function(l) {
        l(newValues, newIndex, n0, n1);
      });
      newValues = newIndex = null;
    }
    function removeData2(reIndex) {
      if (iterable) {
        for (var i0 = 0, i1 = 0; i0 < iterablesEmptyRows.length; i0++) {
          if (reIndex[iterablesEmptyRows[i0]] !== REMOVED_INDEX) {
            iterablesEmptyRows[i1] = reIndex[iterablesEmptyRows[i0]];
            i1++;
          }
        }
        iterablesEmptyRows.length = i1;
        for (i0 = 0, i1 = 0; i0 < n2; i0++) {
          if (reIndex[i0] !== REMOVED_INDEX) {
            if (i1 !== i0) iterablesIndexCount[i1] = iterablesIndexCount[i0];
            i1++;
          }
        }
        iterablesIndexCount = iterablesIndexCount.slice(0, i1);
      }
      var n0 = values.length;
      for (var i = 0, j = 0, oldDataIndex; i < n0; ++i) {
        oldDataIndex = index2[i];
        if (reIndex[oldDataIndex] !== REMOVED_INDEX) {
          if (i !== j) values[j] = values[i];
          index2[j] = reIndex[oldDataIndex];
          if (iterable) {
            iterablesIndexFilterStatus[j] = iterablesIndexFilterStatus[i];
          }
          ++j;
        }
      }
      values.length = j;
      if (iterable) iterablesIndexFilterStatus = iterablesIndexFilterStatus.slice(0, j);
      while (j < n0) index2[j++] = 0;
      var bounds = refilter(values);
      lo0 = bounds[0], hi0 = bounds[1];
    }
    function filterIndexBounds(bounds) {
      var lo1 = bounds[0], hi1 = bounds[1];
      if (refilterFunction) {
        refilterFunction = null;
        filterIndexFunction(function(d, i2) {
          return lo1 <= i2 && i2 < hi1;
        }, bounds[0] === 0 && bounds[1] === values.length);
        lo0 = lo1;
        hi0 = hi1;
        return dimension2;
      }
      var i, j, k2, added = [], removed = [], valueIndexAdded = [], valueIndexRemoved = [];
      if (lo1 < lo0) {
        for (i = lo1, j = Math.min(lo0, hi1); i < j; ++i) {
          added.push(index2[i]);
          valueIndexAdded.push(i);
        }
      } else if (lo1 > lo0) {
        for (i = lo0, j = Math.min(lo1, hi0); i < j; ++i) {
          removed.push(index2[i]);
          valueIndexRemoved.push(i);
        }
      }
      if (hi1 > hi0) {
        for (i = Math.max(lo1, hi0), j = hi1; i < j; ++i) {
          added.push(index2[i]);
          valueIndexAdded.push(i);
        }
      } else if (hi1 < hi0) {
        for (i = Math.max(lo0, hi1), j = hi0; i < j; ++i) {
          removed.push(index2[i]);
          valueIndexRemoved.push(i);
        }
      }
      if (!iterable) {
        for (i = 0; i < added.length; i++) {
          filters[offset2][added[i]] ^= one2;
        }
        for (i = 0; i < removed.length; i++) {
          filters[offset2][removed[i]] ^= one2;
        }
      } else {
        var newAdded = [];
        var newRemoved = [];
        for (i = 0; i < added.length; i++) {
          iterablesIndexCount[added[i]]++;
          iterablesIndexFilterStatus[valueIndexAdded[i]] = 0;
          if (iterablesIndexCount[added[i]] === 1) {
            filters[offset2][added[i]] ^= one2;
            newAdded.push(added[i]);
          }
        }
        for (i = 0; i < removed.length; i++) {
          iterablesIndexCount[removed[i]]--;
          iterablesIndexFilterStatus[valueIndexRemoved[i]] = 1;
          if (iterablesIndexCount[removed[i]] === 0) {
            filters[offset2][removed[i]] ^= one2;
            newRemoved.push(removed[i]);
          }
        }
        added = newAdded;
        removed = newRemoved;
        if (refilter === filter_default3.filterAll) {
          for (i = 0; i < iterablesEmptyRows.length; i++) {
            if (filters[offset2][k2 = iterablesEmptyRows[i]] & one2) {
              filters[offset2][k2] ^= one2;
              added.push(k2);
            }
          }
        } else {
          for (i = 0; i < iterablesEmptyRows.length; i++) {
            if (!(filters[offset2][k2 = iterablesEmptyRows[i]] & one2)) {
              filters[offset2][k2] ^= one2;
              removed.push(k2);
            }
          }
        }
      }
      lo0 = lo1;
      hi0 = hi1;
      filterListeners.forEach(function(l) {
        l(one2, offset2, added, removed);
      });
      triggerOnChange("filtered");
      return dimension2;
    }
    function filter3(range) {
      return range == null ? filterAll2() : Array.isArray(range) ? filterRange2(range) : typeof range === "function" ? filterFunction(range) : filterExact2(range);
    }
    function filterExact2(value2) {
      filterValue = value2;
      filterValuePresent = true;
      return filterIndexBounds((refilter = filter_default3.filterExact(bisect_default2, value2))(values));
    }
    function filterRange2(range) {
      filterValue = range;
      filterValuePresent = true;
      return filterIndexBounds((refilter = filter_default3.filterRange(bisect_default2, range))(values));
    }
    function filterAll2() {
      filterValue = void 0;
      filterValuePresent = false;
      return filterIndexBounds((refilter = filter_default3.filterAll)(values));
    }
    function filterFunction(f) {
      filterValue = f;
      filterValuePresent = true;
      refilterFunction = f;
      refilter = filter_default3.filterAll;
      filterIndexFunction(f, false);
      var bounds = refilter(values);
      lo0 = bounds[0], hi0 = bounds[1];
      return dimension2;
    }
    function filterIndexFunction(f, filterAll3) {
      var i, k2, x, added = [], removed = [], valueIndexAdded = [], valueIndexRemoved = [], indexLength = values.length;
      if (!iterable) {
        for (i = 0; i < indexLength; ++i) {
          if (!(filters[offset2][k2 = index2[i]] & one2) ^ !!(x = f(values[i], i))) {
            if (x) added.push(k2);
            else removed.push(k2);
          }
        }
      }
      if (iterable) {
        for (i = 0; i < indexLength; ++i) {
          if (f(values[i], i)) {
            added.push(index2[i]);
            valueIndexAdded.push(i);
          } else {
            removed.push(index2[i]);
            valueIndexRemoved.push(i);
          }
        }
      }
      if (!iterable) {
        for (i = 0; i < added.length; i++) {
          if (filters[offset2][added[i]] & one2) filters[offset2][added[i]] &= zero2;
        }
        for (i = 0; i < removed.length; i++) {
          if (!(filters[offset2][removed[i]] & one2)) filters[offset2][removed[i]] |= one2;
        }
      } else {
        var newAdded = [];
        var newRemoved = [];
        for (i = 0; i < added.length; i++) {
          if (iterablesIndexFilterStatus[valueIndexAdded[i]] === 1) {
            iterablesIndexCount[added[i]]++;
            iterablesIndexFilterStatus[valueIndexAdded[i]] = 0;
            if (iterablesIndexCount[added[i]] === 1) {
              filters[offset2][added[i]] ^= one2;
              newAdded.push(added[i]);
            }
          }
        }
        for (i = 0; i < removed.length; i++) {
          if (iterablesIndexFilterStatus[valueIndexRemoved[i]] === 0) {
            iterablesIndexCount[removed[i]]--;
            iterablesIndexFilterStatus[valueIndexRemoved[i]] = 1;
            if (iterablesIndexCount[removed[i]] === 0) {
              filters[offset2][removed[i]] ^= one2;
              newRemoved.push(removed[i]);
            }
          }
        }
        added = newAdded;
        removed = newRemoved;
        if (filterAll3) {
          for (i = 0; i < iterablesEmptyRows.length; i++) {
            if (filters[offset2][k2 = iterablesEmptyRows[i]] & one2) {
              filters[offset2][k2] ^= one2;
              added.push(k2);
            }
          }
        } else {
          for (i = 0; i < iterablesEmptyRows.length; i++) {
            if (!(filters[offset2][k2 = iterablesEmptyRows[i]] & one2)) {
              filters[offset2][k2] ^= one2;
              removed.push(k2);
            }
          }
        }
      }
      filterListeners.forEach(function(l) {
        l(one2, offset2, added, removed);
      });
      triggerOnChange("filtered");
    }
    function currentFilter() {
      return filterValue;
    }
    function hasCurrentFilter() {
      return filterValuePresent;
    }
    function top2(k2, top_offset) {
      var array3 = [], i = hi0, j, toSkip = 0;
      if (top_offset && top_offset > 0) toSkip = top_offset;
      while (--i >= lo0 && k2 > 0) {
        if (filters.zero(j = index2[i])) {
          if (toSkip > 0) {
            --toSkip;
          } else {
            array3.push(data[j]);
            --k2;
          }
        }
      }
      if (iterable) {
        for (i = 0; i < iterablesEmptyRows.length && k2 > 0; i++) {
          if (filters.zero(j = iterablesEmptyRows[i])) {
            if (toSkip > 0) {
              --toSkip;
            } else {
              array3.push(data[j]);
              --k2;
            }
          }
        }
      }
      return array3;
    }
    function bottom2(k2, bottom_offset) {
      var array3 = [], i, j, toSkip = 0;
      if (bottom_offset && bottom_offset > 0) toSkip = bottom_offset;
      if (iterable) {
        for (i = 0; i < iterablesEmptyRows.length && k2 > 0; i++) {
          if (filters.zero(j = iterablesEmptyRows[i])) {
            if (toSkip > 0) {
              --toSkip;
            } else {
              array3.push(data[j]);
              --k2;
            }
          }
        }
      }
      i = lo0;
      while (i < hi0 && k2 > 0) {
        if (filters.zero(j = index2[i])) {
          if (toSkip > 0) {
            --toSkip;
          } else {
            array3.push(data[j]);
            --k2;
          }
        }
        i++;
      }
      return array3;
    }
    function group2(key) {
      var group3 = {
        top: top3,
        all: all2,
        reduce: reduce2,
        reduceCount,
        reduceSum,
        order: order2,
        orderNatural,
        size: size2,
        dispose: dispose2,
        remove: dispose2
        // for backwards-compatibility
      };
      dimensionGroups.push(group3);
      var groups2, groupIndex, groupWidth = 8, groupCapacity = capacity(groupWidth), k2 = 0, select, heap, reduceAdd2, reduceRemove, reduceInitial, update = null_default, reset = null_default, resetNeeded = true, groupAll3 = key === null_default, n0old;
      if (arguments.length < 1) key = identity_default3;
      filterListeners.push(update);
      indexListeners.push(add2);
      removeDataListeners.push(removeData3);
      add2(values, index2, 0, n2);
      function add2(newValues2, newIndex2, n0, n1) {
        if (iterable) {
          n0old = n0;
          n0 = values.length - newValues2.length;
          n1 = newValues2.length;
        }
        var oldGroups = groups2, reIndex = iterable ? [] : cr_index(k2, groupCapacity), add3 = reduceAdd2, remove2 = reduceRemove, initial = reduceInitial, k0 = k2, i0 = 0, i1 = 0, j, g0, x0, x1, g, x;
        if (resetNeeded) add3 = initial = null_default;
        if (resetNeeded) remove2 = initial = null_default;
        groups2 = new Array(k2), k2 = 0;
        if (iterable) {
          groupIndex = k0 ? groupIndex : [];
        } else {
          groupIndex = k0 > 1 ? array_default2.arrayLengthen(groupIndex, n2) : cr_index(n2, groupCapacity);
        }
        if (k0) x0 = (g0 = oldGroups[0]).key;
        while (i1 < n1 && !((x1 = key(newValues2[i1])) >= x1)) ++i1;
        while (i1 < n1) {
          if (g0 && x0 <= x1) {
            g = g0, x = x0;
            reIndex[i0] = k2;
            g0 = oldGroups[++i0];
            if (g0) x0 = g0.key;
          } else {
            g = { key: x1, value: initial() }, x = x1;
          }
          groups2[k2] = g;
          while (x1 <= x) {
            j = newIndex2[i1] + (iterable ? n0old : n0);
            if (iterable) {
              if (groupIndex[j]) {
                groupIndex[j].push(k2);
              } else {
                groupIndex[j] = [k2];
              }
            } else {
              groupIndex[j] = k2;
            }
            g.value = add3(g.value, data[j], true);
            if (!filters.zeroExcept(j, offset2, zero2)) g.value = remove2(g.value, data[j], false);
            if (++i1 >= n1) break;
            x1 = key(newValues2[i1]);
          }
          groupIncrement();
        }
        while (i0 < k0) {
          groups2[reIndex[i0] = k2] = oldGroups[i0++];
          groupIncrement();
        }
        if (iterable) {
          for (var index1 = 0; index1 < n2; index1++) {
            if (!groupIndex[index1]) {
              groupIndex[index1] = [];
            }
          }
        }
        if (k2 > i0) {
          if (iterable) {
            for (i0 = 0; i0 < n0old; ++i0) {
              for (index1 = 0; index1 < groupIndex[i0].length; index1++) {
                groupIndex[i0][index1] = reIndex[groupIndex[i0][index1]];
              }
            }
          } else {
            for (i0 = 0; i0 < n0; ++i0) {
              groupIndex[i0] = reIndex[groupIndex[i0]];
            }
          }
        }
        j = filterListeners.indexOf(update);
        if (k2 > 1 || iterable) {
          update = updateMany;
          reset = resetMany;
        } else {
          if (!k2 && groupAll3) {
            k2 = 1;
            groups2 = [{ key: null, value: initial() }];
          }
          if (k2 === 1) {
            update = updateOne;
            reset = resetOne;
          } else {
            update = null_default;
            reset = null_default;
          }
          groupIndex = null;
        }
        filterListeners[j] = update;
        function groupIncrement() {
          if (iterable) {
            k2++;
            return;
          }
          if (++k2 === groupCapacity) {
            reIndex = array_default2.arrayWiden(reIndex, groupWidth <<= 1);
            groupIndex = array_default2.arrayWiden(groupIndex, groupWidth);
            groupCapacity = capacity(groupWidth);
          }
        }
      }
      function removeData3(reIndex) {
        if (k2 > 1 || iterable) {
          var oldK = k2, oldGroups = groups2, seenGroups = cr_index(oldK, oldK), i, i0, j;
          if (!iterable) {
            for (i = 0, j = 0; i < n2; ++i) {
              if (reIndex[i] !== REMOVED_INDEX) {
                seenGroups[groupIndex[j] = groupIndex[i]] = 1;
                ++j;
              }
            }
          } else {
            for (i = 0, j = 0; i < n2; ++i) {
              if (reIndex[i] !== REMOVED_INDEX) {
                groupIndex[j] = groupIndex[i];
                for (i0 = 0; i0 < groupIndex[j].length; i0++) {
                  seenGroups[groupIndex[j][i0]] = 1;
                }
                ++j;
              }
            }
          }
          groups2 = [], k2 = 0;
          for (i = 0; i < oldK; ++i) {
            if (seenGroups[i]) {
              seenGroups[i] = k2++;
              groups2.push(oldGroups[i]);
            }
          }
          if (k2 > 1 || iterable) {
            if (!iterable) {
              for (i = 0; i < j; ++i) groupIndex[i] = seenGroups[groupIndex[i]];
            } else {
              for (i = 0; i < j; ++i) {
                for (i0 = 0; i0 < groupIndex[i].length; ++i0) {
                  groupIndex[i][i0] = seenGroups[groupIndex[i][i0]];
                }
              }
            }
          } else {
            groupIndex = null;
          }
          filterListeners[filterListeners.indexOf(update)] = k2 > 1 || iterable ? (reset = resetMany, update = updateMany) : k2 === 1 ? (reset = resetOne, update = updateOne) : reset = update = null_default;
        } else if (k2 === 1) {
          if (groupAll3) return;
          for (var index3 = 0; index3 < n2; ++index3) if (reIndex[index3] !== REMOVED_INDEX) return;
          groups2 = [], k2 = 0;
          filterListeners[filterListeners.indexOf(update)] = update = reset = null_default;
        }
      }
      function updateMany(filterOne, filterOffset, added, removed, notFilter) {
        if (filterOne === one2 && filterOffset === offset2 || resetNeeded) return;
        var i, j, k3, n3, g;
        if (iterable) {
          for (i = 0, n3 = added.length; i < n3; ++i) {
            if (filters.zeroExcept(k3 = added[i], offset2, zero2)) {
              for (j = 0; j < groupIndex[k3].length; j++) {
                g = groups2[groupIndex[k3][j]];
                g.value = reduceAdd2(g.value, data[k3], false, j);
              }
            }
          }
          for (i = 0, n3 = removed.length; i < n3; ++i) {
            if (filters.onlyExcept(k3 = removed[i], offset2, zero2, filterOffset, filterOne)) {
              for (j = 0; j < groupIndex[k3].length; j++) {
                g = groups2[groupIndex[k3][j]];
                g.value = reduceRemove(g.value, data[k3], notFilter, j);
              }
            }
          }
          return;
        }
        for (i = 0, n3 = added.length; i < n3; ++i) {
          if (filters.zeroExcept(k3 = added[i], offset2, zero2)) {
            g = groups2[groupIndex[k3]];
            g.value = reduceAdd2(g.value, data[k3], false);
          }
        }
        for (i = 0, n3 = removed.length; i < n3; ++i) {
          if (filters.onlyExcept(k3 = removed[i], offset2, zero2, filterOffset, filterOne)) {
            g = groups2[groupIndex[k3]];
            g.value = reduceRemove(g.value, data[k3], notFilter);
          }
        }
      }
      function updateOne(filterOne, filterOffset, added, removed, notFilter) {
        if (filterOne === one2 && filterOffset === offset2 || resetNeeded) return;
        var i, k3, n3, g = groups2[0];
        for (i = 0, n3 = added.length; i < n3; ++i) {
          if (filters.zeroExcept(k3 = added[i], offset2, zero2)) {
            g.value = reduceAdd2(g.value, data[k3], false);
          }
        }
        for (i = 0, n3 = removed.length; i < n3; ++i) {
          if (filters.onlyExcept(k3 = removed[i], offset2, zero2, filterOffset, filterOne)) {
            g.value = reduceRemove(g.value, data[k3], notFilter);
          }
        }
      }
      function resetMany() {
        var i, j, g;
        for (i = 0; i < k2; ++i) {
          groups2[i].value = reduceInitial();
        }
        if (iterable) {
          for (i = 0; i < n2; ++i) {
            for (j = 0; j < groupIndex[i].length; j++) {
              g = groups2[groupIndex[i][j]];
              g.value = reduceAdd2(g.value, data[i], true, j);
            }
          }
          for (i = 0; i < n2; ++i) {
            if (!filters.zeroExcept(i, offset2, zero2)) {
              for (j = 0; j < groupIndex[i].length; j++) {
                g = groups2[groupIndex[i][j]];
                g.value = reduceRemove(g.value, data[i], false, j);
              }
            }
          }
          return;
        }
        for (i = 0; i < n2; ++i) {
          g = groups2[groupIndex[i]];
          g.value = reduceAdd2(g.value, data[i], true);
        }
        for (i = 0; i < n2; ++i) {
          if (!filters.zeroExcept(i, offset2, zero2)) {
            g = groups2[groupIndex[i]];
            g.value = reduceRemove(g.value, data[i], false);
          }
        }
      }
      function resetOne() {
        var i, g = groups2[0];
        g.value = reduceInitial();
        for (i = 0; i < n2; ++i) {
          g.value = reduceAdd2(g.value, data[i], true);
        }
        for (i = 0; i < n2; ++i) {
          if (!filters.zeroExcept(i, offset2, zero2)) {
            g.value = reduceRemove(g.value, data[i], false);
          }
        }
      }
      function all2() {
        if (resetNeeded) reset(), resetNeeded = false;
        return groups2;
      }
      function top3(k3) {
        var top4 = select(all2(), 0, groups2.length, k3);
        return heap.sort(top4, 0, top4.length);
      }
      function reduce2(add3, remove2, initial) {
        reduceAdd2 = add3;
        reduceRemove = remove2;
        reduceInitial = initial;
        resetNeeded = true;
        return group3;
      }
      function reduceCount() {
        return reduce2(reduce_default.reduceIncrement, reduce_default.reduceDecrement, zero_default);
      }
      function reduceSum(value2) {
        return reduce2(reduce_default.reduceAdd(value2), reduce_default.reduceSubtract(value2), zero_default);
      }
      function order2(value2) {
        select = heapselect_default.by(valueOf);
        heap = heap_default.by(valueOf);
        function valueOf(d) {
          return value2(d.value);
        }
        return group3;
      }
      function orderNatural() {
        return order2(identity_default3);
      }
      function size2() {
        return k2;
      }
      function dispose2() {
        var i = filterListeners.indexOf(update);
        if (i >= 0) filterListeners.splice(i, 1);
        i = indexListeners.indexOf(add2);
        if (i >= 0) indexListeners.splice(i, 1);
        i = removeDataListeners.indexOf(removeData3);
        if (i >= 0) removeDataListeners.splice(i, 1);
        i = dimensionGroups.indexOf(group3);
        if (i >= 0) dimensionGroups.splice(i, 1);
        return group3;
      }
      return reduceCount().orderNatural();
    }
    function groupAll2() {
      var g = group2(null_default), all2 = g.all;
      delete g.all;
      delete g.top;
      delete g.order;
      delete g.orderNatural;
      delete g.size;
      g.value = function() {
        return all2()[0].value;
      };
      return g;
    }
    function dispose() {
      dimensionGroups.forEach(function(group3) {
        group3.dispose();
      });
      var i = dataListeners.indexOf(preAdd);
      if (i >= 0) dataListeners.splice(i, 1);
      i = dataListeners.indexOf(postAdd);
      if (i >= 0) dataListeners.splice(i, 1);
      i = removeDataListeners.indexOf(removeData2);
      if (i >= 0) removeDataListeners.splice(i, 1);
      filters.masks[offset2] &= zero2;
      return filterAll2();
    }
    return dimension2;
  }
  function groupAll() {
    var group2 = {
      reduce: reduce2,
      reduceCount,
      reduceSum,
      value,
      dispose,
      remove: dispose
      // for backwards-compatibility
    };
    var reduceValue, reduceAdd2, reduceRemove, reduceInitial, resetNeeded = true;
    filterListeners.push(update);
    dataListeners.push(add2);
    add2(data, 0, n2);
    function add2(newData, n0) {
      var i;
      if (resetNeeded) return;
      for (i = n0; i < n2; ++i) {
        reduceValue = reduceAdd2(reduceValue, data[i], true);
        if (!filters.zero(i)) {
          reduceValue = reduceRemove(reduceValue, data[i], false);
        }
      }
    }
    function update(filterOne, filterOffset, added, removed, notFilter) {
      var i, k, n3;
      if (resetNeeded) return;
      for (i = 0, n3 = added.length; i < n3; ++i) {
        if (filters.zero(k = added[i])) {
          reduceValue = reduceAdd2(reduceValue, data[k], notFilter);
        }
      }
      for (i = 0, n3 = removed.length; i < n3; ++i) {
        if (filters.only(k = removed[i], filterOffset, filterOne)) {
          reduceValue = reduceRemove(reduceValue, data[k], notFilter);
        }
      }
    }
    function reset() {
      var i;
      reduceValue = reduceInitial();
      for (i = 0; i < n2; ++i) {
        reduceValue = reduceAdd2(reduceValue, data[i], true);
        if (!filters.zero(i)) {
          reduceValue = reduceRemove(reduceValue, data[i], false);
        }
      }
    }
    function reduce2(add3, remove2, initial) {
      reduceAdd2 = add3;
      reduceRemove = remove2;
      reduceInitial = initial;
      resetNeeded = true;
      return group2;
    }
    function reduceCount() {
      return reduce2(reduce_default.reduceIncrement, reduce_default.reduceDecrement, zero_default);
    }
    function reduceSum(value2) {
      return reduce2(reduce_default.reduceAdd(value2), reduce_default.reduceSubtract(value2), zero_default);
    }
    function value() {
      if (resetNeeded) reset(), resetNeeded = false;
      return reduceValue;
    }
    function dispose() {
      var i = filterListeners.indexOf(update);
      if (i >= 0) filterListeners.splice(i, 1);
      i = dataListeners.indexOf(add2);
      if (i >= 0) dataListeners.splice(i, 1);
      return group2;
    }
    return reduceCount();
  }
  function size() {
    return n2;
  }
  function all() {
    return data;
  }
  function allFiltered(ignore_dimensions) {
    var array3 = [], i = 0, mask = maskForDimensions(ignore_dimensions || []);
    for (i = 0; i < n2; i++) {
      if (filters.zeroExceptMask(i, mask)) {
        array3.push(data[i]);
      }
    }
    return array3;
  }
  function onChange(cb) {
    if (typeof cb !== "function") {
      console.warn("onChange callback parameter must be a function!");
      return;
    }
    callbacks.push(cb);
    return function() {
      callbacks.splice(callbacks.indexOf(cb), 1);
    };
  }
  function triggerOnChange(eventName) {
    for (var i = 0; i < callbacks.length; i++) {
      callbacks[i](eventName);
    }
  }
  return arguments.length ? add(arguments[0]) : crossfilter2;
}
function cr_index(n2, m) {
  return (m < 257 ? array_default2.array8 : m < 65537 ? array_default2.array16 : array_default2.array32)(n2);
}
function cr_range(n2) {
  var range = cr_index(n2, n2);
  for (var i = -1; ++i < n2; ) range[i] = i;
  return range;
}
function capacity(w) {
  return w === 8 ? 256 : w === 16 ? 65536 : 4294967296;
}

// node_modules/ideogram/src/js/filter.js
function unpackAnnots() {
  var chr, annots, i, unpackedAnnots = [], ideo = this, chrs = ideo.annots;
  for (i = 0; i < chrs.length; i++) {
    chr = chrs[i];
    annots = chr.annots;
    unpackedAnnots = unpackedAnnots.concat(annots);
  }
  return unpackedAnnots;
}
function packAnnots(unpackedAnnots) {
  var chr, annot, i, annots = [], ideo = this, chrs = ideo.annots;
  for (chr in chrs) {
    annots.push({ chr: chrs[chr].chr, annots: [] });
  }
  for (i = 0; i < unpackedAnnots.length; i++) {
    annot = unpackedAnnots[i];
    annots[annot.chrIndex].annots.push(annot);
  }
  return annots;
}
function initCrossFilter() {
  var i, facet, ideo = this, keys = ideo.rawAnnots.keys;
  ideo.unpackedAnnots = ideo.unpackAnnots();
  ideo.crossfilter = src_default(ideo.unpackedAnnots);
  ideo.annotsByFacet = {};
  ideo.facets = keys.slice(3, keys.length);
  for (i = 0; i < ideo.facets.length; i++) {
    facet = ideo.facets[i];
    ideo.annotsByFacet[facet] = ideo.crossfilter.dimension(function(d) {
      return d[facet];
    });
  }
  if ("filterSelections" in ideo) {
    ideo.filterAnnots(ideo.filterSelections);
  }
  ideo.filteredAnnots = ideo.annots;
}
function getFilteredResults(selections, ideo) {
  var fn2, i, facet, results, filter3, counts = {};
  if (Object.keys(selections).length === 0) {
    results = ideo.unpackedAnnots;
  } else {
    for (i = 0; i < ideo.facets.length; i++) {
      facet = ideo.facets[i];
      if (facet in selections) {
        filter3 = selections[facet];
        if (Array.isArray(filter3)) {
          fn2 = function(d) {
            if (filter3.length === 2) {
              return filter3[0] <= d && d < filter3[1];
            } else if (filter3.length === 4) {
              return filter3[0] <= d && d < filter3[1] || filter3[2] <= d && d < filter3[3];
            }
          };
        } else {
          fn2 = function(d) {
            return d in filter3;
          };
        }
      } else {
        fn2 = null;
      }
      ideo.annotsByFacet[facet].filter(fn2);
      counts[facet] = ideo.annotsByFacet[facet].group().top(Infinity);
    }
    results = ideo.annotsByFacet[facet].top(Infinity);
  }
  return [results, counts];
}
function filterAnnots(selections) {
  var i, facet, results, counts, t03 = Date.now(), ideo = this;
  ideo.filterSelections = selections;
  [results, counts] = getFilteredResults(selections, ideo);
  for (i < 0; i < ideo.facets.length; i++) {
    ideo.annotsByFacet[facet].filterAll();
  }
  results = ideo.packAnnots(results);
  delete ideo.maxAnnotsPerBar;
  delete ideo.maxAnnotsPerBarAllChrs;
  ideo.filteredAnnots = results;
  d3.selectAll(ideo.selector + " polygon.annot").remove();
  ideo.drawAnnots(results);
  console.log("Time in filterAnnots: " + (Date.now() - t03) + " ms");
  return counts;
}

// node_modules/ideogram/src/js/views/chromosome-model.js
function getPixelAndOtherData(bands, chr, hasBands, ideo) {
  var i, band2, csLength, width, maxLength, pxStop = 0, taxid = chr.id.split("-")[1], cs = ideo.coordinateSystem, chrHeight = ideo.config.chrHeight;
  for (i = 0; i < bands.length; i++) {
    band2 = bands[i];
    csLength = band2[cs].stop - band2[cs].start;
    if (ideo._layout._isRotated) {
      width = chrHeight * csLength / chr.length;
    } else {
      if (ideo.config.chromosomeScale === "relative") {
        maxLength = ideo.maxLength[taxid][cs];
      } else {
        maxLength = ideo.maxLength[cs];
      }
      width = chrHeight * chr.length / maxLength * csLength / chr.length;
    }
    bands[i].px = { start: pxStop, stop: pxStop + width, width };
    pxStop = bands[i].px.stop;
    if (hasBands && band2.stain === "acen" && band2.name[0] === "p") {
      chr.pcenIndex = i;
    }
  }
  return [bands, chr, pxStop];
}
function getChrScale(chr, hasBands, ideo) {
  var chrHeight = ideo.config.chrHeight, chrLength = chr.length, maxLength = ideo.maxLength, taxid = chr.id.split("-")[1], scale = {};
  scale.bp = chrHeight / maxLength.bp;
  if (ideo.config.multiorganism === true) {
    if (ideo.config.chromosomeScale === "relative") {
      scale.iscn = chrHeight * chrLength / maxLength[taxid].bp;
      scale.bp = chrHeight / maxLength[taxid].bp;
    } else {
      scale.iscn = chrHeight * chrLength / maxLength.bp;
    }
  } else if (hasBands) {
    scale.iscn = chrHeight / maxLength.iscn;
  }
  return scale;
}
function getChromosomePixels(chr) {
  var bands, chrHeight, pxStop, hasBands, maxLength, taxid = chr.id.split("-")[1], ideo = this;
  bands = chr.bands;
  chrHeight = ideo.config.chrHeight;
  pxStop = 0;
  hasBands = typeof bands !== "undefined";
  if (hasBands) {
    [bands, chr, pxStop] = getPixelAndOtherData(bands, chr, hasBands, ideo);
  } else {
    if (ideo.config.chromosomeScale === "relative") {
      maxLength = ideo.maxLength[taxid][ideo.coordinateSystem];
    } else {
      maxLength = ideo.maxLength[ideo.coordinateSystem];
    }
    pxStop = chrHeight * chr.length / maxLength;
  }
  chr.width = pxStop;
  chr.scale = getChrScale(chr, hasBands, ideo);
  chr.bands = bands;
  return chr;
}
function getChrModelScaffold(chr, bands, chrName, ideo) {
  var hasBands = typeof bands !== "undefined";
  if (hasBands) {
    const lastBand = bands.slice(-1)[0];
    chr.name = chrName;
    chr.length = lastBand[ideo.coordinateSystem].stop;
    chr.bpLength = lastBand.bp.stop;
    chr.type = "nuclear";
  } else {
    chr = chrName;
  }
  return chr;
}
function deleteExtraneousBands(chr, hasBands) {
  if (hasBands && chr.bands.length === 1) {
    delete chr.bands;
  }
  return chr;
}
function getCentromerePosition(hasBands, bands) {
  if (hasBands === false) return "";
  const firstBand = bands[0];
  const lastBand = bands.slice(-1)[0];
  const chrLength = lastBand.bp.stop - firstBand.bp.start;
  const smallLength = chrLength / 20;
  if (
    // As with almost all mouse chromosome, chimpanzee chr22
    firstBand.name[0] === "p" && bands[1].name[0] === "q" && firstBand.bp.stop - firstBand.bp.start < smallLength
  ) {
    return "telocentric-p";
  }
  const penultimateBand = bands.slice(-2)[0];
  if (penultimateBand.name[0] === "p" && lastBand.name[0] === "q" && lastBand.bp.stop - lastBand.bp.start < smallLength) {
    return "telocentric-q";
  }
  return "";
}
function getChromosomeModel(bands, chrName, taxid, chrIndex) {
  var hasBands, org, chr = {}, ideo = this;
  hasBands = typeof bands !== "undefined";
  chr = getChrModelScaffold(chr, bands, chrName, ideo);
  chr.chrIndex = chrIndex;
  chr.id = "chr" + chr.name + "-" + taxid;
  if (ideo.config.fullChromosomeLabels === true) {
    org = this.organisms[taxid];
    chr.name = org.scientificName + " chr" + chr.name;
  }
  chr.bands = bands;
  chr = ideo.getChromosomePixels(chr);
  chr.centromerePosition = getCentromerePosition(hasBands, bands);
  chr = deleteExtraneousBands(chr, hasBands);
  return chr;
}

// node_modules/ideogram/src/js/tools/tools.js
var style = `
  <style>

    #gear {
      position: absolute;
      right: 3px;
      top: 24px;
      z-index: 8001;
      cursor: pointer;
      height: 18px;
      width: 18px;
    }

    #tools {
      position: absolute;
      width: 120px;
      right: 27px;
      top: 16px;
      z-index: 8000;
      background: white;
      margin: 0;
      border: 1px solid #CCC;
      border-radius: 4px;
      box-shadow: -2px 4px 6px #CCC;
    }

    #tools ul {
      margin-block-start: 0;
      margin-block-end: 0;
      padding-inline-start: 0;
    }

    #tools li, #download li {
      padding: 2px 12px 2px 12px;
      cursor: pointer;
    }

    #tools li:hover,
    #tools li.active,
    #download li:hover {
      background: #DDD;
    }

    #tools li.ideo-disabled,
    #tools li.active.ideo-disabled,
    #download li.ideo-disabled {
      background: #FFF;
      color: #CCC;
      cursor: default;
    }

    #download {
      position: absolute;
      right: 3px;
      top: 16px;
      z-index: 8000;
      background: white;
      margin: 0;
      padding-inline-start: 0;
    }

    #settings {
      position: absolute;
      right: 3px;
      top: 16px;
      z-index: 8000;
      background: white;
      margin: 0;
      padding-inline-start: 0;
    }

    #about {
      position: absolute;
      right: 24px;
      top: -8px;
      z-index: 8000;
      background: white;
      width: 300px;
      border: 1px solid #CCC;
      padding: 10px;
      border-radius: 4px;
      box-shadow: -2px 4px 6px #CCC;
      cursor: default;
    }

    #close {
      float: right;
      border: 1px solid #DDD;
      border-radius: 4px;
      padding: 0 6px;
      background: #EEE;
      font-weight: bold;
      cursor: pointer;
    }

    #settings label {
      display: inline;
      text-decoration: underline;
      text-decoration-style: dotted;
      cursor: pointer;
    }

    #download {
      position: absolute;
      width: 120px;
      top: -2px;
      right: 120px;
      z-index: 8000;
      background: white;
      margin: 0;
      border: 1px solid #CCC;
      border-radius: 4px;
      box-shadow: -2px 4px 6px #CCC;
    }

    li {
      list-style-type: none;
    }

    #settings .no-underline {
      text-decoration: none;
    }

    #settings .setting {
      margin-right: 8px;
    }

    #settings input[type="checkbox"], #settings input[type="radio"] {
      position: relative;
      top: 2px;
    }

    .area-header {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
      clear: both;
    }

    .area-content {
      display: flex;
      flex-wrap: wrap;
    }

    .area-content > div {
      margin-right: 30px;
      margin-bottom: 15px;
    }

    .tab-panel input[type="number"] {
      width: 50px;
    }

    .tab-panel ul {
      width: 600px;
      list-style: none;
      border-bottom: 1px solid #CCC;
      box-sizing: border-box;
      margin-bottom: 0;
      padding-left: 0;
    }

    .tab-panel .nav:before, .tab-panel .nav:after {
      content: " ";
      display: table;
      clear: both;
    }

    .tab-panel li {
      float: left;
      margin-right: 2px;
      display: block;
      margin-bottom: -1px;
    }

    .tab-panel li > a {
      padding: 10px 15px;
      text-decoration: none;
      border-radius: 4px 4px 0 0;
      display: block;
      position: relative;
    }

    .tab-panel li.active > a {
      border: 1px solid #CCC;
      border-bottom: none;
      background-color: white;
    }

    .tab-panel .tab-content {
      width: 600px;
    }

    .tab-panel .tab-content > div {
      display: none;
      padding-top: 20px;
      clear: both;
    }

    .tab-panel .tab-content > div {
      padding: 20px 10px 5px 10px;
    }

    .tab-panel .tab-content > div.active {
      display: block;
      border: 1px solid #CCC;
      border-top: none;
    }

  </style>`;
var gearIcon = '<svg viewBox="0 0 512 512"><path fill="#AAA" d="M444.788 291.1l42.616 24.599c4.867 2.809 7.126 8.618 5.459 13.985-11.07 35.642-29.97 67.842-54.689 94.586a12.016 12.016 0 0 1-14.832 2.254l-42.584-24.595a191.577 191.577 0 0 1-60.759 35.13v49.182a12.01 12.01 0 0 1-9.377 11.718c-34.956 7.85-72.499 8.256-109.219.007-5.49-1.233-9.403-6.096-9.403-11.723v-49.184a191.555 191.555 0 0 1-60.759-35.13l-42.584 24.595a12.016 12.016 0 0 1-14.832-2.254c-24.718-26.744-43.619-58.944-54.689-94.586-1.667-5.366.592-11.175 5.459-13.985L67.212 291.1a193.48 193.48 0 0 1 0-70.199l-42.616-24.599c-4.867-2.809-7.126-8.618-5.459-13.985 11.07-35.642 29.97-67.842 54.689-94.586a12.016 12.016 0 0 1 14.832-2.254l42.584 24.595a191.577 191.577 0 0 1 60.759-35.13V25.759a12.01 12.01 0 0 1 9.377-11.718c34.956-7.85 72.499-8.256 109.219-.007 5.49 1.233 9.403 6.096 9.403 11.723v49.184a191.555 191.555 0 0 1 60.759 35.13l42.584-24.595a12.016 12.016 0 0 1 14.832 2.254c24.718 26.744 43.619 58.944 54.689 94.586 1.667 5.366-.592 11.175-5.459 13.985L444.788 220.9a193.485 193.485 0 0 1 0 70.2zM336 256c0-44.112-35.888-80-80-80s-80 35.888-80 80 35.888 80 80 80 80-35.888 80-80z"/></svg>';
function deactivate(items) {
  items.forEach((item) => {
    item.classList.remove("active");
  });
}
function closeTools() {
  const toolHeaders = document.querySelectorAll("#tools > ul > li");
  deactivate(toolHeaders);
  const itemsToClose = document.querySelectorAll(".ideo-modal, .ideo-tool-panel");
  itemsToClose.forEach((item) => {
    item.remove();
  });
  document.querySelector("#tools").style.display = "none";
}
function handleHideForHoverables(trigger, tool, toolHeader, toolHeaders) {
  if (trigger === "mouseenter") {
    toolHeader.addEventListener("mouseleave", (event) => {
      const toElement = event.toElement;
      const toId = toElement.id;
      const panelElement = document.querySelector(".ideo-tool-panel");
      const toolsElement = document.querySelector("#tools");
      if (toolsElement.contains(toElement) && panelElement && !panelElement.contains(toElement) && toId !== tool) {
        deactivate(toolHeaders);
        panelElement.remove();
      }
    });
  }
}
function getTrigger(toolHeader) {
  const shouldHover = Array.from(toolHeader.classList).includes("ideo-tool-hover");
  const trigger = shouldHover ? "mouseenter" : "click";
  return trigger;
}
function handleToolClick(ideo) {
  const toolHeaders = document.querySelectorAll("#tools > ul > li");
  toolHeaders.forEach((toolHeader) => {
    const trigger = getTrigger(toolHeader);
    toolHeader.addEventListener(trigger, (event) => {
      deactivate(toolHeaders);
      toolHeader.classList += " active";
      const tool = toolHeader.id.split("-")[0];
      const panel = getPanel(tool, ideo);
      if (trigger === "mouseenter") {
        toolHeader.insertAdjacentHTML("beforeend", panel);
        handleHideForHoverables(trigger, tool, toolHeader, toolHeaders);
        if (tool === "download") {
          document.querySelector("#download-image").addEventListener("click", (event2) => {
            closeTools();
            downloadPng(ideo);
          });
          document.querySelector("#download-annots").addEventListener("click", (event2) => {
            const element = document.querySelector("#download-annots");
            const classes = Array.from(element.classList);
            if (classes.includes("ideo-disabled") === false) {
              closeTools();
              ideo.downloadAnnotations();
            }
          });
        }
      } else {
        document.querySelector("#gear").insertAdjacentHTML("beforeend", panel);
      }
    });
  });
  document.querySelectorAll("#close").forEach((closeButton) => {
    closeButton.addEventListener("click", () => {
      closeTools();
    });
  });
}
function handleGearClick(ideo) {
  document.querySelector("#gear").addEventListener("click", (event) => {
    var options = document.querySelector("#tools");
    if (options.style.display === "none") {
      options.style.display = "";
      hideOnClickOutside();
    } else {
      options.style.display = "none";
      closeTools();
    }
  });
  handleToolClick(ideo);
}
function showGearOnIdeogramHover(ideo) {
  const container = document.querySelector(ideo.selector);
  const gear = document.querySelector("#gear");
  const panel = document.querySelector("#tools");
  container.addEventListener("mouseover", () => gear.style.display = "");
  container.addEventListener("mouseout", () => {
    if (panel.style.display === "none") {
      gear.style.display = "none";
    }
  });
  gear.addEventListener("mouseover", () => gear.style.display = "");
}
function getPanel(tool, ideo) {
  var panel;
  if (tool === "download") panel = getDownload(ideo);
  if (tool === "about") panel = getAbout();
  return panel.trim();
}
function getDownload(ideo) {
  const numAnnots = document.querySelectorAll(".annot").length;
  const annotsClass = numAnnots > 0 ? "" : "ideo-disabled";
  return `
    <div id="download" class="ideo-tool-panel">
      <li id="download-image">Image</li>
      <li id="download-annots" class="${annotsClass}">Annotations</li>
    </div>
  `;
}
function getAbout() {
  const ideogramLink = `
    <a href="https://github.com/eweitz/ideogram" target="_blank" rel="noopener">
      Ideogram.js</a>`;
  const closeButton = '<span id="close">x</span>';
  return `
    <div id="about" class="ideo-modal">
      ${ideogramLink}, version ${version_default} ${closeButton}<br/>
      <i>Chromosome visualization for the web</i>
    </div>`;
}
function hideOnClickOutside(selector) {
  const elements = document.querySelectorAll("#gear, #tools");
  const outsideClickListener = (event) => {
    let clickedOutsideCount = 0;
    elements.forEach((element) => {
      if (!element.contains(event.target)) {
        clickedOutsideCount += 1;
      }
    });
    if (clickedOutsideCount === elements.length) {
      closeTools();
      removeClickListener();
    }
  };
  const removeClickListener = () => {
    document.removeEventListener("click", outsideClickListener);
  };
  document.addEventListener("click", outsideClickListener);
}
function initTools(ideo) {
  const triangle = '<span style="float: right">&blacktriangleright;</span>';
  const toolsHtml = `
    ${style}
    <div id="gear" style="display: none">${gearIcon}</div>
    <div id="tools" style="display: none">
      <ul>
        <li id="download-tool" class="ideo-tool-hover">Download ${triangle}</li>
        <li id="about-tool">About</li>
      </ul>
    </div>`;
  document.querySelector(ideo.selector).insertAdjacentHTML("beforebegin", toolsHtml);
  handleGearClick(ideo);
  showGearOnIdeogramHover(ideo);
}

// node_modules/ideogram/src/js/model-adapter.js
var ModelAdapter = class _ModelAdapter {
  constructor(model) {
    this._model = model;
    this._class = "ModelAdapter";
  }
  static getInstance(model) {
    if (model.bands) {
      return new _ModelAdapter(model);
    } else {
      return new ModelNoBandsAdapter(model);
    }
  }
  getModel() {
    return this._model;
  }
  getCssClass() {
    return "";
  }
};
var ModelNoBandsAdapter = class extends ModelAdapter {
  constructor(model) {
    super(model);
    this._class = "ModelNoBandsAdapter";
  }
  getModel() {
    this._model.bands = [];
    const isMT = this._model.name === "MT";
    const width = this._model.width;
    if (width > 1 || isMT) {
      this._model.bands.push({
        name: "q",
        px: {
          start: 0,
          stop: width,
          width
        },
        bp: {
          start: 1,
          stop: this._model.bpLength ?? this._model.length
        },
        iscn: {
          start: 1,
          stop: this._model.length
        }
      });
    }
    return this._model;
  }
  getCssClass() {
    return "noBands";
  }
};

// node_modules/ideogram/src/js/color.js
var Color2 = class {
  constructor(config2) {
    this._config = config2;
    this._ploidy = new Ploidy(this._config);
  }
  getArmColor(chrSetIndex, chrIndex, armIndex) {
    if (this._config.armColors) {
      return this._config.armColors[armIndex];
    } else if (this._config.ancestors) {
      return this._getPolyploidArmColor(chrSetIndex, chrIndex, armIndex);
    } else {
      return null;
    }
  }
  getBorderColor(chrSetIndex, chrIndex, armIndex) {
    const config2 = this._config;
    const color2 = config2.chrBorderColor ? config2.chrBorderColor : "#000";
    if (chrIndex < config2.ploidy) {
      return color2;
    } else if (this._ploidy.exists(chrSetIndex, chrIndex, armIndex)) {
      return color2;
    } else {
      return "#fff";
    }
  }
  getFillColor() {
    const config2 = this._config;
    if (!config2.chrFillColor) return "#AAA";
    const color2 = config2.chrFillColor;
    if (typeof color2 === "string") {
      return { arm: color2, centromere: "" };
    } else {
      return color2;
    }
    ;
  }
  _getPolyploidArmColor(chrSetIndex, chrIndex, armIndex) {
    if (!this._ploidy.exists(chrSetIndex, chrIndex, armIndex)) {
      return "transparent";
    } else {
      var ancestor = this._ploidy.getAncestor(chrSetIndex, chrIndex, armIndex);
      return this._config.ancestors[ancestor];
    }
  }
};

// node_modules/ideogram/src/js/range.js
var Range = class {
  /**
  * Chromosome range.
  * @public
  * @class
  * @param {Object} data - range data.
  * @param {Integer} data.chr - chromosome index.
  * @param {Integer[]} [data.ploidy] - array which controls on which
  *                                    chromosomes range should appear in case
  *                                    of ploidy.
  * @param {Integer} data.start - range start.
  * @param {Integer} data.stop - range end.
  * @param {String} data.color - range color.
  */
  constructor(data) {
    this._data = data;
    this.start = data.start;
    this.stop = data.stop;
    this.length = this.stop - this.start;
  }
  getColor(chrIndex) {
    if (!("ploidy" in this._data)) {
      return this._getColor(chrIndex);
    } else if ("ploidy" in this._data && this._data.ploidy[chrIndex]) {
      return this._getColor(chrIndex);
    } else {
      return "transparent";
    }
  }
  _getColor(chrIndex) {
    if (Array.isArray(this._data.color)) {
      return this._data.color[chrIndex];
    } else {
      return this._data.color;
    }
  }
};

// node_modules/ideogram/src/js/views/chromosome.js
var Chromosome = class {
  constructor(adapter, config2, ideo) {
    this._adapter = adapter;
    this._model = this._adapter.getModel();
    this._config = config2;
    this._ideo = ideo;
    this._color = new Color2(this._config);
    this._bumpCoefficient = 5;
  }
  /**
   * Factory method
   */
  static getInstance(adapter, config2, ideo) {
    const centromerePosition = adapter.getModel().centromerePosition;
    if (centromerePosition === "telocentric-p") {
      return new TelocentricPChromosome(adapter, config2, ideo);
    } else if (centromerePosition === "telocentric-q") {
      return new TelocentricQChromosome(adapter, config2, ideo);
    } else {
      return new MetacentricChromosome(adapter, config2, ideo);
    }
  }
  _addPArmShape(clipPath, isPArmRendered) {
    if (isPArmRendered) {
      return clipPath.concat(this._getPArmShape());
    } else {
      return clipPath;
    }
  }
  _addQArmShape(clipPath, isQArmRendered) {
    if (isQArmRendered) {
      return clipPath.concat(this._getQArmShape());
    } else {
      return clipPath;
    }
  }
  /**
   * Append bands container and apply clip-path to it
   */
  render(container, chrSetIndex, chrIndex) {
    var self2, isPArmRendered, isQArmRendered, clipPath, opacity, fill, isFullyBanded;
    self2 = this;
    container = container.append("g").attr("class", "bands").attr(
      "clip-path",
      "url(#" + this._model.id + "-chromosome-set-clippath)"
    );
    isPArmRendered = this._renderArm(container, chrSetIndex, chrIndex, "p");
    isQArmRendered = this._renderArm(container, chrSetIndex, chrIndex, "q");
    this._renderRangeSet(container, chrSetIndex, chrIndex);
    clipPath = [];
    clipPath = this._addPArmShape(clipPath, isPArmRendered);
    clipPath = this._addQArmShape(clipPath, isQArmRendered);
    opacity = "0";
    fill = "";
    isFullyBanded = this.isFullyBanded();
    if ("ancestors" in this._ideo.config && !("rangeSet" in this._ideo.config)) {
      fill = self2._color.getArmColor(chrSetIndex, chrIndex, 0);
      if (isFullyBanded) {
        opacity = "0.5";
      }
    } else if (isFullyBanded) {
      opacity = null;
      fill = "transparent";
    } else if (!("ancestors" in this._ideo.config)) {
      opacity = "1";
    }
    let centromereFill;
    if (this._ideo.config.chrFillColor) {
      const fillColor = self2._color.getFillColor();
      fill = fillColor.arm;
      centromereFill = fillColor.centromere;
    }
    container.append("g").attr("class", "chromosome-border").selectAll("path").data(clipPath).enter().append("path").attr("fill", fill).style("fill-opacity", opacity).style("fill", function(d) {
      if (d.class === "acen" && centromereFill) {
        return centromereFill;
      }
    }).attr("stroke", function(d, i) {
      return self2._color.getBorderColor(chrSetIndex, chrIndex, i);
    }).attr("stroke-width", function(d) {
      return "strokeWidth" in d ? d.strokeWidth : 1;
    }).attr("d", function(d) {
      return d.path;
    }).attr("class", function(d) {
      return d.class;
    });
    return clipPath;
  }
  _renderRangeSet(container, chrSetIndex, chrIndex) {
    var self2, rangeSet, rangesContainer, ideo;
    if (!("rangeSet" in this._config)) {
      return;
    }
    rangeSet = this._config.rangeSet.filter(function(range) {
      return range.chr - 1 === chrSetIndex;
    }).map(function(range) {
      return new Range(range);
    });
    rangesContainer = container.append("g").attr("class", "range-set");
    self2 = this;
    ideo = self2._ideo;
    rangesContainer.selectAll("rect.range").data(rangeSet).enter().append("rect").attr("class", "range").attr("x", function(range) {
      return ideo.convertBpToPx(self2._model, range.start);
    }).attr("y", 0).attr("width", function(range) {
      return ideo.convertBpToPx(self2._model, range.length);
    }).attr("height", this._config.chrWidth).style("fill", function(range) {
      return range.getColor(chrIndex);
    });
  }
  /**
   * Get chromosome's shape main values
   */
  _getShapeData() {
    var firstQBand, i, lastBand, rightTerminalPosition;
    for (i = 0; i < this._model.bands.length; i++) {
      if (this._model.bands[i].name[0] === "q") {
        firstQBand = this._model.bands[i];
        break;
      }
    }
    lastBand = this._model.bands.length - 1;
    rightTerminalPosition = this._model.bands[lastBand].px.stop;
    return {
      x1: 0,
      x2: firstQBand ? firstQBand.px.start : rightTerminalPosition,
      x3: rightTerminalPosition,
      w: this._config.chrWidth,
      b: this._config.chrWidth / this._bumpCoefficient
    };
  }
  _getPArmShape() {
    var d = this._getShapeData(), x = d.x2 - d.b;
    if (this.isFullyBanded() || "ancestors" in this._ideo.config) {
      return {
        class: "",
        path: "M" + d.b + ",0 L" + x + ",0 Q" + (d.x2 + d.b) + "," + d.w / 2 + "," + x + "," + d.w + " L" + d.b + "," + d.w + " Q-" + d.b + "," + d.w / 2 + "," + d.b + ",0"
      };
    } else {
      return [{
        class: "",
        path: "M" + d.b + ",0 L" + (x - 2) + ",0 L" + (x - 2) + "," + d.w + " L" + d.b + "," + d.w + " Q-" + d.b + "," + d.w / 2 + "," + d.b + ",0"
      }, {
        class: "acen",
        path: "M" + x + ",0 Q" + (d.x2 + d.b) + "," + d.w / 2 + "," + x + "," + d.w + " L" + x + "," + d.w + " L" + (x - 2) + "," + d.w + " L" + (x - 2) + ",0"
      }];
    }
  }
  _getQArmShape() {
    var d = this._getShapeData(), x = d.x3 - d.b, x2b = d.x2 + d.b;
    if (this.isFullyBanded() || "ancestors" in this._ideo.config) {
      return {
        class: "",
        path: "M" + x2b + ",0 L" + x + ",0 Q" + (d.x3 + d.b) + "," + d.w / 2 + "," + x + "," + d.w + " L" + x2b + "," + d.w + " Q" + (d.x2 - d.b) + "," + d.w / 2 + "," + x2b + ",0"
      };
    } else {
      return [{
        path: "M" + x2b + ",0 L" + x + ",0 Q" + (d.x3 + d.b) + "," + d.w / 2 + "," + x + "," + d.w + " L" + x2b + "," + d.w + " L" + x2b + ",0"
      }, {
        class: "acen",
        path: "M" + x2b + ",0Q" + (d.x2 - d.b) + "," + d.w / 2 + "," + x2b + "," + d.w + " L" + x2b + "," + d.w + "L" + (x2b + 2) + "," + d.w + "L" + (x2b + 2) + ",0"
      }];
    }
  }
  isFullyBanded() {
    return this._model.bands && (this._model.bands.length !== 2 || this._model.bands[0].name[0] === "q");
  }
  /**
   * Render arm bands
   */
  _renderBands(container, chrSetIndex, chrIndex, bands, arm) {
    var self2, armIndex, fill;
    self2 = this;
    armIndex = arm === "p" ? 0 : 1;
    fill = "";
    if ("ancestors" in self2._ideo.config && !self2.isFullyBanded()) {
      fill = self2._color.getArmColor(chrSetIndex, chrIndex, armIndex);
    }
    container.selectAll("path.band." + arm).data(bands).enter().append("path").attr("id", function(d) {
      return self2._model.id + "-" + d.name.replace(".", "-");
    }).attr("class", function(d) {
      return "band " + arm + "-band " + d.stain;
    }).attr("d", function(d) {
      var start3, length2;
      start3 = self2._ideo.round(d.px.start);
      length2 = self2._ideo.round(d.px.width);
      return "M " + start3 + ", 0l " + length2 + " 0 l 0 " + self2._config.chrWidth + " l -" + length2 + " 0 z";
    }).style("fill", fill);
  }
  /**
   * Render a chromosome arm.
   * Returns boolean indicating if any bands were rendered.
   */
  _renderArm(container, chrSetIndex, chrIndex, arm) {
    var bands = this._model.bands.filter(function(band2) {
      return band2.name[0] === arm;
    });
    this._renderBands(container, chrSetIndex, chrIndex, bands, arm);
    return Boolean(bands.length);
  }
};
var MetacentricChromosome = class extends Chromosome {
  constructor(model, config2, ideo) {
    super(model, config2, ideo);
    this._class = "MetacentricChromosome";
  }
};
var TelocentricPChromosome = class extends Chromosome {
  constructor(model, config2, ideo) {
    super(model, config2, ideo);
    this._class = "TelocentricPChromosome";
    this._pArmOffset = 3;
  }
  _addPArmShape(clipPath) {
    return clipPath.concat(this._getPArmShape());
  }
  _getPArmShape() {
    var d = this._getShapeData();
    d.o = this._pArmOffset;
    return [{
      class: "acen",
      path: "M" + (d.x2 + 2) + ",1L" + (d.x2 + d.o + 3.25) + ",1 L" + (d.x2 + d.o + 3.25) + "," + (d.w - 1) + " L" + (d.x2 + 2) + "," + (d.w - 1)
    }, {
      class: "gpos66",
      path: "M" + (d.x2 - d.o + 5) + ",0L" + (d.x2 - d.o + 3) + ",0 L" + (d.x2 - d.o + 3) + "," + d.w + " L" + (d.x2 - d.o + 5) + "," + d.w,
      strokeWidth: 0.5
    }];
  }
  _getQArmShape() {
    var d = this._getShapeData(), x = d.x3 - d.b, o = this._pArmOffset + 3;
    return {
      class: "",
      path: "M" + (d.x2 + o) + ",0 L" + x + ",0 Q" + (d.x3 + d.b) + "," + d.w / 2 + "," + x + "," + d.w + " L" + (d.x2 + o) + "," + d.w
    };
  }
};
var TelocentricQChromosome = class extends Chromosome {
  constructor(model, config2, ideo) {
    super(model, config2, ideo);
    this._class = "TelocentricQChromosome";
    this._qArmOffset = 3;
  }
  _getPArmShape() {
    var d = this._getShapeData(), x = d.x3 - d.b, o = this._qArmOffset;
    return {
      class: "",
      path: (
        // 'M1,0, ' +
        "M" + (d.x2 + o) + ",0 L" + (x + o) + ",0 L" + (x + o) + "," + d.w + " L" + d.b + "," + d.w + " Q-" + d.b + "," + d.w / 2 + "," + d.b + ",0"
      )
    };
  }
  _addQArmShape(clipPath) {
    return clipPath.concat(this._getQArmShape());
  }
  _getQArmShape() {
    var d = this._getShapeData();
    d.o = this._qArmOffset;
    return [{
      class: "acen",
      path: "M" + (d.x2 + 2) + ",1 L" + (d.x2 + d.o + 3.25) + ",1 L" + (d.x2 + d.o + 3.25) + "," + (d.w - 1) + " L" + (d.x2 + 2) + "," + (d.w - 1)
    }, {
      class: "gpos66",
      path: "M" + (d.x2 + d.o + 5) + ",0 L" + (d.x2 + d.o + 3) + ",0 L" + (d.x2 + d.o + 3) + "," + d.w + " L" + (d.x2 + d.o + 5) + "," + d.w,
      strokeWidth: 0.5
    }];
  }
};

// node_modules/ideogram/src/js/views/draw-chromosomes.js
function appendHomolog(chrModel, chrIndex, homologIndex, container) {
  var homologOffset, chromosome, shape2, defs, adapter;
  defs = d3.select(this.selector + " defs");
  adapter = ModelAdapter.getInstance(chrModel);
  homologOffset = homologIndex * this.config.chrMargin;
  chromosome = container.append("g").attr("id", chrModel.id).attr("class", "chromosome " + adapter.getCssClass()).attr("transform", "translate(0, " + homologOffset + ")");
  shape2 = Chromosome.getInstance(adapter, this.config, this).render(chromosome, chrIndex, homologIndex);
  d3.select("#" + chrModel.id + "-chromosome-set-clippath").remove();
  defs.append("clipPath").attr("id", chrModel.id + "-chromosome-set-clippath").selectAll("path").data(shape2).enter().append("path").attr("d", function(d) {
    return d.path;
  }).attr("class", function(d) {
    return d.class;
  });
  if (chrModel.width < 1) {
    d3.select("#" + chrModel.id + " .bands").style("opacity", 0);
  }
}
function drawChromosome(chrModel) {
  var chrIndex, container, numChrsInSet, transform, homologIndex, chrSetSelector;
  chrIndex = chrModel.chrIndex;
  transform = this._layout.getChromosomeSetTranslate(chrIndex);
  chrSetSelector = this.selector + " #" + chrModel.id + "-chromosome-set";
  d3.selectAll(chrSetSelector + " g").remove();
  container = d3.select(chrSetSelector);
  if (container.nodes().length === 0) {
    container = d3.select(this.selector).append("g").attr("class", "chromosome-set").attr("transform", transform).attr("id", chrModel.id + "-chromosome-set");
  }
  if ("sex" in this.config && this.config.ploidy === 2 && this.sexChromosomes.index === chrIndex) {
    this.drawSexChromosomes(container, chrIndex);
    return;
  }
  numChrsInSet = 1;
  if (this.config.ploidy > 1) {
    numChrsInSet = this._ploidy.getChromosomesNumber(chrIndex);
  }
  for (homologIndex = 0; homologIndex < numChrsInSet; homologIndex++) {
    this.appendHomolog(chrModel, chrIndex, homologIndex, container);
  }
}
function rotateAndToggleDisplay(chrElement) {
  var chrName, chrModel, chrIndex;
  this.unhighlight();
  if (!this.config.taxid) return;
  chrName = chrElement.id.split("-")[0].replace("chr", "");
  chrModel = this.chromosomes[this.config.taxid][chrName];
  chrIndex = chrModel.chrIndex;
  this._layout.rotate(chrIndex, chrIndex, chrElement);
}
function setOverflowScroll() {
  var ideo, config2, ideoWidth, ideoInnerWrap, ideoMiddleWrap, ideoSvg, ploidy, ploidyPad;
  ideo = this;
  config2 = ideo.config;
  ideoSvg = d3.select(config2.container + " svg#_ideogram");
  ideoInnerWrap = d3.select(config2.container + " #_ideogramInnerWrap");
  ideoMiddleWrap = d3.select(config2.container + " #_ideogramMiddleWrap");
  ploidy = config2.ploidy;
  if (ploidy === 1) {
    ploidyPad = ploidy;
  } else {
    ploidyPad = ploidy * 1.12;
  }
  let annotHeight = 0;
  if ("annotationsLayout" in config2) {
    annotHeight = config2.annotationHeight * config2.numAnnotTracks;
  }
  if (config2.orientation === "vertical" && config2.perspective !== "comparative" && config2.geometry !== "collinear") {
    ideoWidth = ideo.numChromosomes * (config2.chrWidth + config2.chrMargin + annotHeight);
  } else {
    return;
  }
  if (config2.annotationsLayout === "heatmap-2d") {
    return;
  }
  ideoWidth = Math.ceil(ideoWidth * ploidyPad / config2.rows);
  if (ideo._layout._class === "SmallLayout") ideoWidth += 100;
  ideoWidth += 35;
  ideoMiddleWrap.style("height", ideo._layout.getHeight() + "px");
  ideoInnerWrap.style("max-width", ideoWidth + "px").style("overflow-x", "scroll").style("position", "absolute");
  ideoSvg.style("min-width", ideoWidth - 5 + "px");
  if (ideo.config.showTools) {
    initTools(ideo);
  }
}

// node_modules/ideogram/src/js/views/chromosome-labels.js
function getChrSetLabelLines(d, i, ideo) {
  var lines;
  if (d.name.indexOf(" ") === -1) {
    lines = [d.name];
  } else {
    lines = d.name.match(/^(.*)\s+([^\s]+)$/).slice(1).reverse();
  }
  if ("sex" in ideo.config && ideo.config.ploidy === 2 && i === ideo.sexChromosomes.index) {
    if (ideo.config.sex === "male") {
      lines = ["XY"];
    } else {
      lines = ["XX"];
    }
  }
  return lines;
}
function renderChromosomeSetLabel(d, i, textElement, ideo) {
  var lines = getChrSetLabelLines(d, i, ideo);
  d3.select(textElement).selectAll("tspan").data(lines).enter().append("tspan").attr("dy", function(d2, i2) {
    return i2 * -1.2 + "em";
  }).attr("x", ideo._layout.getChromosomeSetLabelXPosition()).attr("class", function(a, i2) {
    var fullLabels = ideo.config.fullChromosomeLabels;
    return i2 === 1 && fullLabels ? "italic" : null;
  }).text(String);
}
function appendChromosomeSetLabels(ideo) {
  var layout = ideo._layout;
  d3.selectAll(ideo.selector + " .chromosome-set").insert("text", ":first-child").data(ideo.chromosomesArray).attr("class", layout.getChromosomeLabelClass()).attr("transform", layout.getChromosomeSetLabelTranslate()).attr("x", layout.getChromosomeSetLabelXPosition()).attr("y", function(d, i) {
    return layout.getChromosomeSetLabelYPosition(i);
  }).attr("text-anchor", layout.getChromosomeSetLabelAnchor()).each(function(d, i) {
    renderChromosomeSetLabel(d, i, this, ideo);
  });
}
function appendChromosomeLabels(ideo) {
  var layout = ideo._layout;
  d3.selectAll(ideo.selector + " .chromosome-set").each(function(a, chrSetIndex) {
    d3.select(this).selectAll(".chromosome").append("text").attr("class", "chrLabel").attr("transform", layout.getChromosomeSetLabelTranslate()).attr("x", function(d, i) {
      return layout.getChromosomeLabelXPosition(i);
    }).attr("y", function(d, i) {
      return layout.getChromosomeLabelYPosition(i);
    }).text(function(d, chrIndex) {
      return ideo._ploidy.getAncestor(chrSetIndex, chrIndex);
    }).attr("text-anchor", "middle");
  });
}
function drawChromosomeLabels() {
  var ideo = this;
  appendChromosomeSetLabels(ideo);
  appendChromosomeLabels(ideo);
}
function getLabelPositionAttrs(scale) {
  var x, y2, scaleSvg;
  if (typeof scale !== "undefined" && scale.hasOwnProperty("x") && !(scale.x === 1 && scale.y === 1)) {
    scaleSvg = "scale(" + scale.x + "," + scale.y + ")";
    x = -6;
    y2 = scale === "" ? -16 : -14;
  } else {
    x = -8;
    y2 = -16;
    scale = { x: 1, y: 1 };
    scaleSvg = "";
  }
  return { x, y: y2, scaleSvg, scale };
}
function updateChrIndex(chrIndex, config2) {
  if (config2.numAnnotTracks > 1 || config2.orientation === "") chrIndex -= 1;
  return chrIndex;
}
function rotateVerticalChromosomeLabels(chr, chrIndex, labelPosAttrs, ideo) {
  var chrMargin2, chrMargin, y2, config2 = ideo.config;
  chrIndex = updateChrIndex(chrIndex, config2);
  chrMargin2 = -4;
  if (config2.showBandLabels === true) {
    chrMargin2 = config2.chrMargin + config2.chrWidth + 26;
  }
  chrMargin = config2.chrMargin * chrIndex;
  if (config2.numAnnotTracks > 1 === false) chrMargin += 1;
  y2 = chrMargin + chrMargin2;
  chr.selectAll("text.chrLabel").attr("transform", labelPosAttrs.scaleSvg).selectAll("tspan").attr("x", labelPosAttrs.x).attr("y", y2);
}
function rotateHorizontalChromosomeLabels(chr, chrIndex, labelPosAttrs, ideo) {
  var chrMargin, chrMargin2, tracksHeight, x, config2 = ideo.config;
  chrMargin2 = -config2.chrWidth - 2;
  if (config2.showBandLabels === true) chrMargin2 = config2.chrMargin + 8;
  tracksHeight = config2.annotTracksHeight;
  if (config2.annotationsLayout !== "overlay") tracksHeight *= 2;
  chrMargin = config2.chrMargin * chrIndex;
  x = -(chrMargin + chrMargin2) + 3 + tracksHeight;
  x /= labelPosAttrs.scale.x;
  chr.selectAll("text.chrLabel").attr("transform", "rotate(-90)" + labelPosAttrs.scaleSvg).selectAll("tspan").attr("x", x).attr("y", labelPosAttrs.y);
}
function rotateChromosomeLabels(chr, chrIndex, orientation, scale) {
  var labelPosAttrs, ideo = this;
  chrIndex -= 1;
  labelPosAttrs = getLabelPositionAttrs(scale);
  if (orientation === "vertical" || orientation === "") {
    rotateVerticalChromosomeLabels(chr, chrIndex, labelPosAttrs, ideo);
  } else {
    rotateHorizontalChromosomeLabels(chr, chrIndex, labelPosAttrs, ideo);
  }
}

// node_modules/@popperjs/core/lib/enums.js
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start2 = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = basePlacements.reduce(function(acc, placement) {
  return acc.concat([placement + "-" + start2, placement + "-" + end]);
}, []);
var placements = [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start2, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

// node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}

// node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}

// node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

// node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name2) {
    var style2 = state.styles[name2] || {};
    var attributes = state.attributes[name2] || {};
    var element = state.elements[name2];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style2);
    Object.keys(attributes).forEach(function(name3) {
      var value = attributes[name3];
      if (value === false) {
        element.removeAttribute(name3);
      } else {
        element.setAttribute(name3, value === true ? "" : value);
      }
    });
  });
}
function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name2) {
      var element = state.elements[name2];
      var attributes = state.attributes[name2] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name2) ? state.styles[name2] : initialStyles[name2]);
      var style2 = styleProperties.reduce(function(style3, property) {
        style3[property] = "";
        return style3;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style2);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles_default = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect,
  requires: ["computeStyles"]
};

// node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function getBasePlacement(placement) {
  return placement.split("-")[0];
}

// node_modules/@popperjs/core/lib/utils/math.js
var max4 = Math.max;
var min3 = Math.min;
var round2 = Math.round;

// node_modules/@popperjs/core/lib/utils/userAgent.js
function getUAString() {
  var uaData = navigator.userAgentData;
  if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
    return uaData.brands.map(function(item) {
      return item.brand + "/" + item.version;
    }).join(" ");
  }
  return navigator.userAgent;
}

// node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}

// node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round2(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round2(clientRect.height) / element.offsetHeight || 1 : 1;
  }
  var _ref = isElement(element) ? getWindow(element) : window, visualViewport = _ref.visualViewport;
  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y2 = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width,
    height,
    top: y2,
    right: x + width,
    bottom: y2 + height,
    left: x,
    x,
    y: y2
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width,
    height
  };
}

// node_modules/@popperjs/core/lib/dom-utils/contains.js
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}

// node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}

// node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}

// node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function getDocumentElement(element) {
  return ((isElement(element) ? element.ownerDocument : (
    // $FlowFixMe[prop-missing]
    element.document
  )) || window.document).documentElement;
}

// node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || // DOM Element detected
    (isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element)
  );
}

// node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = /firefox/i.test(getUAString());
  var isIE = /Trident/i.test(getUAString());
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css2 = getComputedStyle(currentNode);
    if (css2.transform !== "none" || css2.perspective !== "none" || css2.contain === "paint" || ["transform", "perspective"].indexOf(css2.willChange) !== -1 || isFirefox && css2.willChange === "filter" || isFirefox && css2.filter && css2.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}

// node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}

// node_modules/@popperjs/core/lib/utils/within.js
function within(min4, value, max5) {
  return max4(min4, min3(value, max5));
}
function withinMaxClamp(min4, value, max5) {
  var v = within(min4, value, max5);
  return v > max5 ? max5 : v;
}

// node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

// node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}

// node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function expandToHashMap(value, keys) {
  return keys.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

// node_modules/@popperjs/core/lib/modifiers/arrow.js
var toPaddingObject = function toPaddingObject2(padding, state) {
  padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state, name2 = _ref.name, options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min4 = paddingObject[minProp];
  var max5 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min4, center, max5);
  var axisProp = axis;
  state.modifiersData[name2] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
}
function effect2(_ref2) {
  var state = _ref2.state, options = _ref2.options;
  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (!contains(state.elements.popper, arrowElement)) {
    return;
  }
  state.elements.arrow = arrowElement;
}
var arrow_default = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow,
  effect: effect2,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};

// node_modules/@popperjs/core/lib/utils/getVariation.js
function getVariation(placement) {
  return placement.split("-")[1];
}

// node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref, win) {
  var x = _ref.x, y2 = _ref.y;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round2(x * dpr) / dpr || 0,
    y: round2(y2 * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y2 = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x,
    y: y2
  }) : {
    x,
    y: y2
  };
  x = _ref3.x;
  y2 = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle(offsetParent).position !== "static" && position === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        offsetParent[heightProp]
      );
      y2 -= offsetY - popperRect.height;
      y2 *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        offsetParent[widthProp]
      );
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x,
    y: y2
  }, getWindow(popper2)) : {
    x,
    y: y2
  };
  x = _ref4.x;
  y2 = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y2 + "px)" : "translate3d(" + x + "px, " + y2 + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y2 + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state, options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration,
    isFixed: state.options.strategy === "fixed"
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
var computeStyles_default = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};

// node_modules/@popperjs/core/lib/modifiers/eventListeners.js
var passive = {
  passive: true
};
function effect3(_ref) {
  var state = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
var eventListeners_default = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect: effect3,
  data: {}
};

// node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
var hash = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash[matched];
  });
}

// node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var hash2 = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash2[matched];
  });
}

// node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

// node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function getViewportRect(element, strategy) {
  var win = getWindow(element);
  var html2 = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html2.clientWidth;
  var height = html2.clientHeight;
  var x = 0;
  var y2 = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = isLayoutViewport();
    if (layoutViewport || !layoutViewport && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y2 = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x + getWindowScrollBarX(element),
    y: y2
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html2 = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max4(html2.scrollWidth, html2.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max4(html2.scrollHeight, html2.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y2 = -winScroll.scrollTop;
  if (getComputedStyle(body || html2).direction === "rtl") {
    x += max4(html2.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x,
    y: y2
  };
}

// node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

// node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function getScrollParent(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}

// node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    updatedList.concat(listScrollParents(getParentNode(target)))
  );
}

// node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

// node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function getInnerBoundingClientRect(element, strategy) {
  var rect = getBoundingClientRect(element, false, strategy === "fixed");
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = max4(rect.top, accRect.top);
    accRect.right = min3(rect.right, accRect.right);
    accRect.bottom = min3(rect.bottom, accRect.bottom);
    accRect.left = max4(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

// node_modules/@popperjs/core/lib/utils/computeOffsets.js
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start2:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
      default:
    }
  }
  return offsets;
}

// node_modules/@popperjs/core/lib/utils/detectOverflow.js
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$strategy = _options.strategy, strategy = _options$strategy === void 0 ? state.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply;
    });
  }
  return overflowOffsets;
}

// node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements2 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements2.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements2;
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a, b) {
    return overflows[a] - overflows[b];
  });
}

// node_modules/@popperjs/core/lib/modifiers/flip.js
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state, options = _ref.options, name2 = _ref.name;
  if (state.modifiersData[name2]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = /* @__PURE__ */ new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i = 0; i < placements2.length; i++) {
    var placement = placements2[i];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start2;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break") break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name2]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
var flip_default = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};

// node_modules/@popperjs/core/lib/modifiers/hide.js
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function(side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state, name2 = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name2] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
var hide_default = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide
};

// node_modules/@popperjs/core/lib/modifiers/offset.js
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name2 = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x = _data$state$placement.x, y2 = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y2;
  }
  state.modifiersData[name2] = data;
}
var offset_default = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};

// node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function popperOffsets(_ref) {
  var state = _ref.state, name2 = _ref.name;
  state.modifiersData[name2] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
var popperOffsets_default = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};

// node_modules/@popperjs/core/lib/utils/getAltAxis.js
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}

// node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function preventOverflow(_ref) {
  var state = _ref.state, options = _ref.options, name2 = _ref.name;
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary,
    rootBoundary,
    padding,
    altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min4 = offset2 + overflow[mainSide];
    var max5 = offset2 - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start2 ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start2 ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset2 + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min3(min4, tetherMin) : min4, offset2, tether ? max4(max5, tetherMax) : max5);
    popperOffsets2[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset2;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === "x" ? top : left;
    var _altSide = mainAxis === "x" ? bottom : right;
    var _offset = popperOffsets2[altAxis];
    var _len = altAxis === "y" ? "height" : "width";
    var _min = _offset + overflow[_mainSide];
    var _max = _offset - overflow[_altSide];
    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
    popperOffsets2[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state.modifiersData[name2] = data;
}
var preventOverflow_default = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"]
};

// node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

// node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round2(rect.width) / element.offsetWidth || 1;
  var scaleY = round2(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

// node_modules/@popperjs/core/lib/utils/orderModifiers.js
function order(modifiers) {
  var map4 = /* @__PURE__ */ new Map();
  var visited = /* @__PURE__ */ new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map4.set(modifier.name, modifier);
  });
  function sort2(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map4.get(dep);
        if (depModifier) {
          sort2(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort2(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

// node_modules/@popperjs/core/lib/utils/debounce.js
function debounce(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}

// node_modules/@popperjs/core/lib/utils/mergeByName.js
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}

// node_modules/@popperjs/core/lib/createPopper.js
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers3 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper4(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options2);
        state.scrollParents = {
          reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers3, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m) {
          return m.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        for (var index2 = 0; index2 < state.orderedModifiers.length; index2++) {
          if (state.reset === true) {
            state.reset = false;
            index2 = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index2], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name2 = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name: name2,
              instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      return instance;
    }
    instance.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref) {
        var name2 = _ref.name, _ref$options = _ref.options, options2 = _ref$options === void 0 ? {} : _ref$options, effect5 = _ref.effect;
        if (typeof effect5 === "function") {
          var cleanupFn = effect5({
            state,
            name: name2,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}
var createPopper = popperGenerator();

// node_modules/@popperjs/core/lib/popper-lite.js
var defaultModifiers = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default];
var createPopper2 = popperGenerator({
  defaultModifiers
});

// node_modules/@popperjs/core/lib/popper.js
var defaultModifiers2 = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default, offset_default, flip_default, preventOverflow_default, arrow_default, hide_default];
var createPopper3 = popperGenerator({
  defaultModifiers: defaultModifiers2
});

// node_modules/tippy.js/dist/tippy.esm.js
var BOX_CLASS = "tippy-box";
var CONTENT_CLASS = "tippy-content";
var BACKDROP_CLASS = "tippy-backdrop";
var ARROW_CLASS = "tippy-arrow";
var SVG_ARROW_CLASS = "tippy-svg-arrow";
var TOUCH_OPTIONS = {
  passive: true,
  capture: true
};
var TIPPY_DEFAULT_APPEND_TO = function TIPPY_DEFAULT_APPEND_TO2() {
  return document.body;
};
function hasOwnProperty(obj, key) {
  return {}.hasOwnProperty.call(obj, key);
}
function getValueAtIndexOrReturn(value, index2, defaultValue) {
  if (Array.isArray(value)) {
    var v = value[index2];
    return v == null ? Array.isArray(defaultValue) ? defaultValue[index2] : defaultValue : v;
  }
  return value;
}
function isType2(value, type2) {
  var str = {}.toString.call(value);
  return str.indexOf("[object") === 0 && str.indexOf(type2 + "]") > -1;
}
function invokeWithArgsOrReturn(value, args) {
  return typeof value === "function" ? value.apply(void 0, args) : value;
}
function debounce2(fn2, ms) {
  if (ms === 0) {
    return fn2;
  }
  var timeout2;
  return function(arg) {
    clearTimeout(timeout2);
    timeout2 = setTimeout(function() {
      fn2(arg);
    }, ms);
  };
}
function removeProperties(obj, keys) {
  var clone = Object.assign({}, obj);
  keys.forEach(function(key) {
    delete clone[key];
  });
  return clone;
}
function splitBySpaces(value) {
  return value.split(/\s+/).filter(Boolean);
}
function normalizeToArray(value) {
  return [].concat(value);
}
function pushIfUnique(arr, value) {
  if (arr.indexOf(value) === -1) {
    arr.push(value);
  }
}
function unique(arr) {
  return arr.filter(function(item, index2) {
    return arr.indexOf(item) === index2;
  });
}
function getBasePlacement2(placement) {
  return placement.split("-")[0];
}
function arrayFrom(value) {
  return [].slice.call(value);
}
function removeUndefinedProps(obj) {
  return Object.keys(obj).reduce(function(acc, key) {
    if (obj[key] !== void 0) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}
function div() {
  return document.createElement("div");
}
function isElement2(value) {
  return ["Element", "Fragment"].some(function(type2) {
    return isType2(value, type2);
  });
}
function isNodeList(value) {
  return isType2(value, "NodeList");
}
function isMouseEvent(value) {
  return isType2(value, "MouseEvent");
}
function isReferenceElement(value) {
  return !!(value && value._tippy && value._tippy.reference === value);
}
function getArrayOfElements(value) {
  if (isElement2(value)) {
    return [value];
  }
  if (isNodeList(value)) {
    return arrayFrom(value);
  }
  if (Array.isArray(value)) {
    return value;
  }
  return arrayFrom(document.querySelectorAll(value));
}
function setTransitionDuration(els, value) {
  els.forEach(function(el) {
    if (el) {
      el.style.transitionDuration = value + "ms";
    }
  });
}
function setVisibilityState(els, state) {
  els.forEach(function(el) {
    if (el) {
      el.setAttribute("data-state", state);
    }
  });
}
function getOwnerDocument(elementOrElements) {
  var _element$ownerDocumen;
  var _normalizeToArray = normalizeToArray(elementOrElements), element = _normalizeToArray[0];
  return element != null && (_element$ownerDocumen = element.ownerDocument) != null && _element$ownerDocumen.body ? element.ownerDocument : document;
}
function isCursorOutsideInteractiveBorder(popperTreeData, event) {
  var clientX = event.clientX, clientY = event.clientY;
  return popperTreeData.every(function(_ref) {
    var popperRect = _ref.popperRect, popperState = _ref.popperState, props = _ref.props;
    var interactiveBorder = props.interactiveBorder;
    var basePlacement = getBasePlacement2(popperState.placement);
    var offsetData = popperState.modifiersData.offset;
    if (!offsetData) {
      return true;
    }
    var topDistance = basePlacement === "bottom" ? offsetData.top.y : 0;
    var bottomDistance = basePlacement === "top" ? offsetData.bottom.y : 0;
    var leftDistance = basePlacement === "right" ? offsetData.left.x : 0;
    var rightDistance = basePlacement === "left" ? offsetData.right.x : 0;
    var exceedsTop = popperRect.top - clientY + topDistance > interactiveBorder;
    var exceedsBottom = clientY - popperRect.bottom - bottomDistance > interactiveBorder;
    var exceedsLeft = popperRect.left - clientX + leftDistance > interactiveBorder;
    var exceedsRight = clientX - popperRect.right - rightDistance > interactiveBorder;
    return exceedsTop || exceedsBottom || exceedsLeft || exceedsRight;
  });
}
function updateTransitionEndListener(box, action, listener) {
  var method = action + "EventListener";
  ["transitionend", "webkitTransitionEnd"].forEach(function(event) {
    box[method](event, listener);
  });
}
function actualContains(parent, child) {
  var target = child;
  while (target) {
    var _target$getRootNode;
    if (parent.contains(target)) {
      return true;
    }
    target = target.getRootNode == null ? void 0 : (_target$getRootNode = target.getRootNode()) == null ? void 0 : _target$getRootNode.host;
  }
  return false;
}
var currentInput = {
  isTouch: false
};
var lastMouseMoveTime = 0;
function onDocumentTouchStart() {
  if (currentInput.isTouch) {
    return;
  }
  currentInput.isTouch = true;
  if (window.performance) {
    document.addEventListener("mousemove", onDocumentMouseMove);
  }
}
function onDocumentMouseMove() {
  var now2 = performance.now();
  if (now2 - lastMouseMoveTime < 20) {
    currentInput.isTouch = false;
    document.removeEventListener("mousemove", onDocumentMouseMove);
  }
  lastMouseMoveTime = now2;
}
function onWindowBlur() {
  var activeElement = document.activeElement;
  if (isReferenceElement(activeElement)) {
    var instance = activeElement._tippy;
    if (activeElement.blur && !instance.state.isVisible) {
      activeElement.blur();
    }
  }
}
function bindGlobalEventListeners() {
  document.addEventListener("touchstart", onDocumentTouchStart, TOUCH_OPTIONS);
  window.addEventListener("blur", onWindowBlur);
}
var isBrowser = typeof window !== "undefined" && typeof document !== "undefined";
var isIE11 = isBrowser ? (
  // @ts-ignore
  !!window.msCrypto
) : false;
function createMemoryLeakWarning(method) {
  var txt = method === "destroy" ? "n already-" : " ";
  return [method + "() was called on a" + txt + "destroyed instance. This is a no-op but", "indicates a potential memory leak."].join(" ");
}
function clean(value) {
  var spacesAndTabs = /[ \t]{2,}/g;
  var lineStartWithSpaces = /^[ \t]*/gm;
  return value.replace(spacesAndTabs, " ").replace(lineStartWithSpaces, "").trim();
}
function getDevMessage(message) {
  return clean("\n  %ctippy.js\n\n  %c" + clean(message) + "\n\n  %c👷‍ This is a development-only message. It will be removed in production.\n  ");
}
function getFormattedMessage(message) {
  return [
    getDevMessage(message),
    // title
    "color: #00C584; font-size: 1.3em; font-weight: bold;",
    // message
    "line-height: 1.5",
    // footer
    "color: #a6a095;"
  ];
}
var visitedMessages;
if (true) {
  resetVisitedMessages();
}
function resetVisitedMessages() {
  visitedMessages = /* @__PURE__ */ new Set();
}
function warnWhen(condition, message) {
  if (condition && !visitedMessages.has(message)) {
    var _console;
    visitedMessages.add(message);
    (_console = console).warn.apply(_console, getFormattedMessage(message));
  }
}
function errorWhen(condition, message) {
  if (condition && !visitedMessages.has(message)) {
    var _console2;
    visitedMessages.add(message);
    (_console2 = console).error.apply(_console2, getFormattedMessage(message));
  }
}
function validateTargets(targets) {
  var didPassFalsyValue = !targets;
  var didPassPlainObject = Object.prototype.toString.call(targets) === "[object Object]" && !targets.addEventListener;
  errorWhen(didPassFalsyValue, ["tippy() was passed", "`" + String(targets) + "`", "as its targets (first) argument. Valid types are: String, Element,", "Element[], or NodeList."].join(" "));
  errorWhen(didPassPlainObject, ["tippy() was passed a plain object which is not supported as an argument", "for virtual positioning. Use props.getReferenceClientRect instead."].join(" "));
}
var pluginProps = {
  animateFill: false,
  followCursor: false,
  inlinePositioning: false,
  sticky: false
};
var renderProps = {
  allowHTML: false,
  animation: "fade",
  arrow: true,
  content: "",
  inertia: false,
  maxWidth: 350,
  role: "tooltip",
  theme: "",
  zIndex: 9999
};
var defaultProps = Object.assign({
  appendTo: TIPPY_DEFAULT_APPEND_TO,
  aria: {
    content: "auto",
    expanded: "auto"
  },
  delay: 0,
  duration: [300, 250],
  getReferenceClientRect: null,
  hideOnClick: true,
  ignoreAttributes: false,
  interactive: false,
  interactiveBorder: 2,
  interactiveDebounce: 0,
  moveTransition: "",
  offset: [0, 10],
  onAfterUpdate: function onAfterUpdate() {
  },
  onBeforeUpdate: function onBeforeUpdate() {
  },
  onCreate: function onCreate() {
  },
  onDestroy: function onDestroy() {
  },
  onHidden: function onHidden() {
  },
  onHide: function onHide() {
  },
  onMount: function onMount() {
  },
  onShow: function onShow() {
  },
  onShown: function onShown() {
  },
  onTrigger: function onTrigger() {
  },
  onUntrigger: function onUntrigger() {
  },
  onClickOutside: function onClickOutside() {
  },
  placement: "top",
  plugins: [],
  popperOptions: {},
  render: null,
  showOnCreate: false,
  touch: true,
  trigger: "mouseenter focus",
  triggerTarget: null
}, pluginProps, renderProps);
var defaultKeys = Object.keys(defaultProps);
var setDefaultProps = function setDefaultProps2(partialProps) {
  if (true) {
    validateProps(partialProps, []);
  }
  var keys = Object.keys(partialProps);
  keys.forEach(function(key) {
    defaultProps[key] = partialProps[key];
  });
};
function getExtendedPassedProps(passedProps) {
  var plugins = passedProps.plugins || [];
  var pluginProps2 = plugins.reduce(function(acc, plugin) {
    var name2 = plugin.name, defaultValue = plugin.defaultValue;
    if (name2) {
      var _name;
      acc[name2] = passedProps[name2] !== void 0 ? passedProps[name2] : (_name = defaultProps[name2]) != null ? _name : defaultValue;
    }
    return acc;
  }, {});
  return Object.assign({}, passedProps, pluginProps2);
}
function getDataAttributeProps(reference2, plugins) {
  var propKeys = plugins ? Object.keys(getExtendedPassedProps(Object.assign({}, defaultProps, {
    plugins
  }))) : defaultKeys;
  var props = propKeys.reduce(function(acc, key) {
    var valueAsString = (reference2.getAttribute("data-tippy-" + key) || "").trim();
    if (!valueAsString) {
      return acc;
    }
    if (key === "content") {
      acc[key] = valueAsString;
    } else {
      try {
        acc[key] = JSON.parse(valueAsString);
      } catch (e3) {
        acc[key] = valueAsString;
      }
    }
    return acc;
  }, {});
  return props;
}
function evaluateProps(reference2, props) {
  var out = Object.assign({}, props, {
    content: invokeWithArgsOrReturn(props.content, [reference2])
  }, props.ignoreAttributes ? {} : getDataAttributeProps(reference2, props.plugins));
  out.aria = Object.assign({}, defaultProps.aria, out.aria);
  out.aria = {
    expanded: out.aria.expanded === "auto" ? props.interactive : out.aria.expanded,
    content: out.aria.content === "auto" ? props.interactive ? null : "describedby" : out.aria.content
  };
  return out;
}
function validateProps(partialProps, plugins) {
  if (partialProps === void 0) {
    partialProps = {};
  }
  if (plugins === void 0) {
    plugins = [];
  }
  var keys = Object.keys(partialProps);
  keys.forEach(function(prop) {
    var nonPluginProps = removeProperties(defaultProps, Object.keys(pluginProps));
    var didPassUnknownProp = !hasOwnProperty(nonPluginProps, prop);
    if (didPassUnknownProp) {
      didPassUnknownProp = plugins.filter(function(plugin) {
        return plugin.name === prop;
      }).length === 0;
    }
    warnWhen(didPassUnknownProp, ["`" + prop + "`", "is not a valid prop. You may have spelled it incorrectly, or if it's", "a plugin, forgot to pass it in an array as props.plugins.", "\n\n", "All props: https://atomiks.github.io/tippyjs/v6/all-props/\n", "Plugins: https://atomiks.github.io/tippyjs/v6/plugins/"].join(" "));
  });
}
var innerHTML = function innerHTML2() {
  return "innerHTML";
};
function dangerouslySetInnerHTML(element, html2) {
  element[innerHTML()] = html2;
}
function createArrowElement(value) {
  var arrow2 = div();
  if (value === true) {
    arrow2.className = ARROW_CLASS;
  } else {
    arrow2.className = SVG_ARROW_CLASS;
    if (isElement2(value)) {
      arrow2.appendChild(value);
    } else {
      dangerouslySetInnerHTML(arrow2, value);
    }
  }
  return arrow2;
}
function setContent(content, props) {
  if (isElement2(props.content)) {
    dangerouslySetInnerHTML(content, "");
    content.appendChild(props.content);
  } else if (typeof props.content !== "function") {
    if (props.allowHTML) {
      dangerouslySetInnerHTML(content, props.content);
    } else {
      content.textContent = props.content;
    }
  }
}
function getChildren(popper2) {
  var box = popper2.firstElementChild;
  var boxChildren = arrayFrom(box.children);
  return {
    box,
    content: boxChildren.find(function(node) {
      return node.classList.contains(CONTENT_CLASS);
    }),
    arrow: boxChildren.find(function(node) {
      return node.classList.contains(ARROW_CLASS) || node.classList.contains(SVG_ARROW_CLASS);
    }),
    backdrop: boxChildren.find(function(node) {
      return node.classList.contains(BACKDROP_CLASS);
    })
  };
}
function render(instance) {
  var popper2 = div();
  var box = div();
  box.className = BOX_CLASS;
  box.setAttribute("data-state", "hidden");
  box.setAttribute("tabindex", "-1");
  var content = div();
  content.className = CONTENT_CLASS;
  content.setAttribute("data-state", "hidden");
  setContent(content, instance.props);
  popper2.appendChild(box);
  box.appendChild(content);
  onUpdate(instance.props, instance.props);
  function onUpdate(prevProps, nextProps) {
    var _getChildren = getChildren(popper2), box2 = _getChildren.box, content2 = _getChildren.content, arrow2 = _getChildren.arrow;
    if (nextProps.theme) {
      box2.setAttribute("data-theme", nextProps.theme);
    } else {
      box2.removeAttribute("data-theme");
    }
    if (typeof nextProps.animation === "string") {
      box2.setAttribute("data-animation", nextProps.animation);
    } else {
      box2.removeAttribute("data-animation");
    }
    if (nextProps.inertia) {
      box2.setAttribute("data-inertia", "");
    } else {
      box2.removeAttribute("data-inertia");
    }
    box2.style.maxWidth = typeof nextProps.maxWidth === "number" ? nextProps.maxWidth + "px" : nextProps.maxWidth;
    if (nextProps.role) {
      box2.setAttribute("role", nextProps.role);
    } else {
      box2.removeAttribute("role");
    }
    if (prevProps.content !== nextProps.content || prevProps.allowHTML !== nextProps.allowHTML) {
      setContent(content2, instance.props);
    }
    if (nextProps.arrow) {
      if (!arrow2) {
        box2.appendChild(createArrowElement(nextProps.arrow));
      } else if (prevProps.arrow !== nextProps.arrow) {
        box2.removeChild(arrow2);
        box2.appendChild(createArrowElement(nextProps.arrow));
      }
    } else if (arrow2) {
      box2.removeChild(arrow2);
    }
  }
  return {
    popper: popper2,
    onUpdate
  };
}
render.$$tippy = true;
var idCounter = 1;
var mouseMoveListeners = [];
var mountedInstances = [];
function createTippy(reference2, passedProps) {
  var props = evaluateProps(reference2, Object.assign({}, defaultProps, getExtendedPassedProps(removeUndefinedProps(passedProps))));
  var showTimeout;
  var hideTimeout;
  var scheduleHideAnimationFrame;
  var isVisibleFromClick = false;
  var didHideDueToDocumentMouseDown = false;
  var didTouchMove = false;
  var ignoreOnFirstUpdate = false;
  var lastTriggerEvent;
  var currentTransitionEndListener;
  var onFirstUpdate;
  var listeners = [];
  var debouncedOnMouseMove = debounce2(onMouseMove, props.interactiveDebounce);
  var currentTarget;
  var id2 = idCounter++;
  var popperInstance = null;
  var plugins = unique(props.plugins);
  var state = {
    // Is the instance currently enabled?
    isEnabled: true,
    // Is the tippy currently showing and not transitioning out?
    isVisible: false,
    // Has the instance been destroyed?
    isDestroyed: false,
    // Is the tippy currently mounted to the DOM?
    isMounted: false,
    // Has the tippy finished transitioning in?
    isShown: false
  };
  var instance = {
    // properties
    id: id2,
    reference: reference2,
    popper: div(),
    popperInstance,
    props,
    state,
    plugins,
    // methods
    clearDelayTimeouts,
    setProps,
    setContent: setContent2,
    show,
    hide: hide2,
    hideWithInteractivity,
    enable,
    disable,
    unmount,
    destroy
  };
  if (!props.render) {
    if (true) {
      errorWhen(true, "render() function has not been supplied.");
    }
    return instance;
  }
  var _props$render = props.render(instance), popper2 = _props$render.popper, onUpdate = _props$render.onUpdate;
  popper2.setAttribute("data-tippy-root", "");
  popper2.id = "tippy-" + instance.id;
  instance.popper = popper2;
  reference2._tippy = instance;
  popper2._tippy = instance;
  var pluginsHooks = plugins.map(function(plugin) {
    return plugin.fn(instance);
  });
  var hasAriaExpanded = reference2.hasAttribute("aria-expanded");
  addListeners();
  handleAriaExpandedAttribute();
  handleStyles();
  invokeHook("onCreate", [instance]);
  if (props.showOnCreate) {
    scheduleShow();
  }
  popper2.addEventListener("mouseenter", function() {
    if (instance.props.interactive && instance.state.isVisible) {
      instance.clearDelayTimeouts();
    }
  });
  popper2.addEventListener("mouseleave", function() {
    if (instance.props.interactive && instance.props.trigger.indexOf("mouseenter") >= 0) {
      getDocument().addEventListener("mousemove", debouncedOnMouseMove);
    }
  });
  return instance;
  function getNormalizedTouchSettings() {
    var touch = instance.props.touch;
    return Array.isArray(touch) ? touch : [touch, 0];
  }
  function getIsCustomTouchBehavior() {
    return getNormalizedTouchSettings()[0] === "hold";
  }
  function getIsDefaultRenderFn() {
    var _instance$props$rende;
    return !!((_instance$props$rende = instance.props.render) != null && _instance$props$rende.$$tippy);
  }
  function getCurrentTarget() {
    return currentTarget || reference2;
  }
  function getDocument() {
    var parent = getCurrentTarget().parentNode;
    return parent ? getOwnerDocument(parent) : document;
  }
  function getDefaultTemplateChildren() {
    return getChildren(popper2);
  }
  function getDelay(isShow) {
    if (instance.state.isMounted && !instance.state.isVisible || currentInput.isTouch || lastTriggerEvent && lastTriggerEvent.type === "focus") {
      return 0;
    }
    return getValueAtIndexOrReturn(instance.props.delay, isShow ? 0 : 1, defaultProps.delay);
  }
  function handleStyles(fromHide) {
    if (fromHide === void 0) {
      fromHide = false;
    }
    popper2.style.pointerEvents = instance.props.interactive && !fromHide ? "" : "none";
    popper2.style.zIndex = "" + instance.props.zIndex;
  }
  function invokeHook(hook, args, shouldInvokePropsHook) {
    if (shouldInvokePropsHook === void 0) {
      shouldInvokePropsHook = true;
    }
    pluginsHooks.forEach(function(pluginHooks) {
      if (pluginHooks[hook]) {
        pluginHooks[hook].apply(pluginHooks, args);
      }
    });
    if (shouldInvokePropsHook) {
      var _instance$props;
      (_instance$props = instance.props)[hook].apply(_instance$props, args);
    }
  }
  function handleAriaContentAttribute() {
    var aria = instance.props.aria;
    if (!aria.content) {
      return;
    }
    var attr = "aria-" + aria.content;
    var id3 = popper2.id;
    var nodes = normalizeToArray(instance.props.triggerTarget || reference2);
    nodes.forEach(function(node) {
      var currentValue = node.getAttribute(attr);
      if (instance.state.isVisible) {
        node.setAttribute(attr, currentValue ? currentValue + " " + id3 : id3);
      } else {
        var nextValue = currentValue && currentValue.replace(id3, "").trim();
        if (nextValue) {
          node.setAttribute(attr, nextValue);
        } else {
          node.removeAttribute(attr);
        }
      }
    });
  }
  function handleAriaExpandedAttribute() {
    if (hasAriaExpanded || !instance.props.aria.expanded) {
      return;
    }
    var nodes = normalizeToArray(instance.props.triggerTarget || reference2);
    nodes.forEach(function(node) {
      if (instance.props.interactive) {
        node.setAttribute("aria-expanded", instance.state.isVisible && node === getCurrentTarget() ? "true" : "false");
      } else {
        node.removeAttribute("aria-expanded");
      }
    });
  }
  function cleanupInteractiveMouseListeners() {
    getDocument().removeEventListener("mousemove", debouncedOnMouseMove);
    mouseMoveListeners = mouseMoveListeners.filter(function(listener) {
      return listener !== debouncedOnMouseMove;
    });
  }
  function onDocumentPress(event) {
    if (currentInput.isTouch) {
      if (didTouchMove || event.type === "mousedown") {
        return;
      }
    }
    var actualTarget = event.composedPath && event.composedPath()[0] || event.target;
    if (instance.props.interactive && actualContains(popper2, actualTarget)) {
      return;
    }
    if (normalizeToArray(instance.props.triggerTarget || reference2).some(function(el) {
      return actualContains(el, actualTarget);
    })) {
      if (currentInput.isTouch) {
        return;
      }
      if (instance.state.isVisible && instance.props.trigger.indexOf("click") >= 0) {
        return;
      }
    } else {
      invokeHook("onClickOutside", [instance, event]);
    }
    if (instance.props.hideOnClick === true) {
      instance.clearDelayTimeouts();
      instance.hide();
      didHideDueToDocumentMouseDown = true;
      setTimeout(function() {
        didHideDueToDocumentMouseDown = false;
      });
      if (!instance.state.isMounted) {
        removeDocumentPress();
      }
    }
  }
  function onTouchMove() {
    didTouchMove = true;
  }
  function onTouchStart() {
    didTouchMove = false;
  }
  function addDocumentPress() {
    var doc = getDocument();
    doc.addEventListener("mousedown", onDocumentPress, true);
    doc.addEventListener("touchend", onDocumentPress, TOUCH_OPTIONS);
    doc.addEventListener("touchstart", onTouchStart, TOUCH_OPTIONS);
    doc.addEventListener("touchmove", onTouchMove, TOUCH_OPTIONS);
  }
  function removeDocumentPress() {
    var doc = getDocument();
    doc.removeEventListener("mousedown", onDocumentPress, true);
    doc.removeEventListener("touchend", onDocumentPress, TOUCH_OPTIONS);
    doc.removeEventListener("touchstart", onTouchStart, TOUCH_OPTIONS);
    doc.removeEventListener("touchmove", onTouchMove, TOUCH_OPTIONS);
  }
  function onTransitionedOut(duration, callback) {
    onTransitionEnd(duration, function() {
      if (!instance.state.isVisible && popper2.parentNode && popper2.parentNode.contains(popper2)) {
        callback();
      }
    });
  }
  function onTransitionedIn(duration, callback) {
    onTransitionEnd(duration, callback);
  }
  function onTransitionEnd(duration, callback) {
    var box = getDefaultTemplateChildren().box;
    function listener(event) {
      if (event.target === box) {
        updateTransitionEndListener(box, "remove", listener);
        callback();
      }
    }
    if (duration === 0) {
      return callback();
    }
    updateTransitionEndListener(box, "remove", currentTransitionEndListener);
    updateTransitionEndListener(box, "add", listener);
    currentTransitionEndListener = listener;
  }
  function on(eventType, handler, options) {
    if (options === void 0) {
      options = false;
    }
    var nodes = normalizeToArray(instance.props.triggerTarget || reference2);
    nodes.forEach(function(node) {
      node.addEventListener(eventType, handler, options);
      listeners.push({
        node,
        eventType,
        handler,
        options
      });
    });
  }
  function addListeners() {
    if (getIsCustomTouchBehavior()) {
      on("touchstart", onTrigger2, {
        passive: true
      });
      on("touchend", onMouseLeave, {
        passive: true
      });
    }
    splitBySpaces(instance.props.trigger).forEach(function(eventType) {
      if (eventType === "manual") {
        return;
      }
      on(eventType, onTrigger2);
      switch (eventType) {
        case "mouseenter":
          on("mouseleave", onMouseLeave);
          break;
        case "focus":
          on(isIE11 ? "focusout" : "blur", onBlurOrFocusOut);
          break;
        case "focusin":
          on("focusout", onBlurOrFocusOut);
          break;
      }
    });
  }
  function removeListeners() {
    listeners.forEach(function(_ref) {
      var node = _ref.node, eventType = _ref.eventType, handler = _ref.handler, options = _ref.options;
      node.removeEventListener(eventType, handler, options);
    });
    listeners = [];
  }
  function onTrigger2(event) {
    var _lastTriggerEvent;
    var shouldScheduleClickHide = false;
    if (!instance.state.isEnabled || isEventListenerStopped(event) || didHideDueToDocumentMouseDown) {
      return;
    }
    var wasFocused = ((_lastTriggerEvent = lastTriggerEvent) == null ? void 0 : _lastTriggerEvent.type) === "focus";
    lastTriggerEvent = event;
    currentTarget = event.currentTarget;
    handleAriaExpandedAttribute();
    if (!instance.state.isVisible && isMouseEvent(event)) {
      mouseMoveListeners.forEach(function(listener) {
        return listener(event);
      });
    }
    if (event.type === "click" && (instance.props.trigger.indexOf("mouseenter") < 0 || isVisibleFromClick) && instance.props.hideOnClick !== false && instance.state.isVisible) {
      shouldScheduleClickHide = true;
    } else {
      scheduleShow(event);
    }
    if (event.type === "click") {
      isVisibleFromClick = !shouldScheduleClickHide;
    }
    if (shouldScheduleClickHide && !wasFocused) {
      scheduleHide(event);
    }
  }
  function onMouseMove(event) {
    var target = event.target;
    var isCursorOverReferenceOrPopper = getCurrentTarget().contains(target) || popper2.contains(target);
    if (event.type === "mousemove" && isCursorOverReferenceOrPopper) {
      return;
    }
    var popperTreeData = getNestedPopperTree().concat(popper2).map(function(popper3) {
      var _instance$popperInsta;
      var instance2 = popper3._tippy;
      var state2 = (_instance$popperInsta = instance2.popperInstance) == null ? void 0 : _instance$popperInsta.state;
      if (state2) {
        return {
          popperRect: popper3.getBoundingClientRect(),
          popperState: state2,
          props
        };
      }
      return null;
    }).filter(Boolean);
    if (isCursorOutsideInteractiveBorder(popperTreeData, event)) {
      cleanupInteractiveMouseListeners();
      scheduleHide(event);
    }
  }
  function onMouseLeave(event) {
    var shouldBail = isEventListenerStopped(event) || instance.props.trigger.indexOf("click") >= 0 && isVisibleFromClick;
    if (shouldBail) {
      return;
    }
    if (instance.props.interactive) {
      instance.hideWithInteractivity(event);
      return;
    }
    scheduleHide(event);
  }
  function onBlurOrFocusOut(event) {
    if (instance.props.trigger.indexOf("focusin") < 0 && event.target !== getCurrentTarget()) {
      return;
    }
    if (instance.props.interactive && event.relatedTarget && popper2.contains(event.relatedTarget)) {
      return;
    }
    scheduleHide(event);
  }
  function isEventListenerStopped(event) {
    return currentInput.isTouch ? getIsCustomTouchBehavior() !== event.type.indexOf("touch") >= 0 : false;
  }
  function createPopperInstance() {
    destroyPopperInstance();
    var _instance$props2 = instance.props, popperOptions = _instance$props2.popperOptions, placement = _instance$props2.placement, offset2 = _instance$props2.offset, getReferenceClientRect = _instance$props2.getReferenceClientRect, moveTransition = _instance$props2.moveTransition;
    var arrow2 = getIsDefaultRenderFn() ? getChildren(popper2).arrow : null;
    var computedReference = getReferenceClientRect ? {
      getBoundingClientRect: getReferenceClientRect,
      contextElement: getReferenceClientRect.contextElement || getCurrentTarget()
    } : reference2;
    var tippyModifier = {
      name: "$$tippy",
      enabled: true,
      phase: "beforeWrite",
      requires: ["computeStyles"],
      fn: function fn2(_ref2) {
        var state2 = _ref2.state;
        if (getIsDefaultRenderFn()) {
          var _getDefaultTemplateCh = getDefaultTemplateChildren(), box = _getDefaultTemplateCh.box;
          ["placement", "reference-hidden", "escaped"].forEach(function(attr) {
            if (attr === "placement") {
              box.setAttribute("data-placement", state2.placement);
            } else {
              if (state2.attributes.popper["data-popper-" + attr]) {
                box.setAttribute("data-" + attr, "");
              } else {
                box.removeAttribute("data-" + attr);
              }
            }
          });
          state2.attributes.popper = {};
        }
      }
    };
    var modifiers = [{
      name: "offset",
      options: {
        offset: offset2
      }
    }, {
      name: "preventOverflow",
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    }, {
      name: "flip",
      options: {
        padding: 5
      }
    }, {
      name: "computeStyles",
      options: {
        adaptive: !moveTransition
      }
    }, tippyModifier];
    if (getIsDefaultRenderFn() && arrow2) {
      modifiers.push({
        name: "arrow",
        options: {
          element: arrow2,
          padding: 3
        }
      });
    }
    modifiers.push.apply(modifiers, (popperOptions == null ? void 0 : popperOptions.modifiers) || []);
    instance.popperInstance = createPopper3(computedReference, popper2, Object.assign({}, popperOptions, {
      placement,
      onFirstUpdate,
      modifiers
    }));
  }
  function destroyPopperInstance() {
    if (instance.popperInstance) {
      instance.popperInstance.destroy();
      instance.popperInstance = null;
    }
  }
  function mount() {
    var appendTo = instance.props.appendTo;
    var parentNode;
    var node = getCurrentTarget();
    if (instance.props.interactive && appendTo === TIPPY_DEFAULT_APPEND_TO || appendTo === "parent") {
      parentNode = node.parentNode;
    } else {
      parentNode = invokeWithArgsOrReturn(appendTo, [node]);
    }
    if (!parentNode.contains(popper2)) {
      parentNode.appendChild(popper2);
    }
    instance.state.isMounted = true;
    createPopperInstance();
    if (true) {
      warnWhen(instance.props.interactive && appendTo === defaultProps.appendTo && node.nextElementSibling !== popper2, ["Interactive tippy element may not be accessible via keyboard", "navigation because it is not directly after the reference element", "in the DOM source order.", "\n\n", "Using a wrapper <div> or <span> tag around the reference element", "solves this by creating a new parentNode context.", "\n\n", "Specifying `appendTo: document.body` silences this warning, but it", "assumes you are using a focus management solution to handle", "keyboard navigation.", "\n\n", "See: https://atomiks.github.io/tippyjs/v6/accessibility/#interactivity"].join(" "));
    }
  }
  function getNestedPopperTree() {
    return arrayFrom(popper2.querySelectorAll("[data-tippy-root]"));
  }
  function scheduleShow(event) {
    instance.clearDelayTimeouts();
    if (event) {
      invokeHook("onTrigger", [instance, event]);
    }
    addDocumentPress();
    var delay = getDelay(true);
    var _getNormalizedTouchSe = getNormalizedTouchSettings(), touchValue = _getNormalizedTouchSe[0], touchDelay = _getNormalizedTouchSe[1];
    if (currentInput.isTouch && touchValue === "hold" && touchDelay) {
      delay = touchDelay;
    }
    if (delay) {
      showTimeout = setTimeout(function() {
        instance.show();
      }, delay);
    } else {
      instance.show();
    }
  }
  function scheduleHide(event) {
    instance.clearDelayTimeouts();
    invokeHook("onUntrigger", [instance, event]);
    if (!instance.state.isVisible) {
      removeDocumentPress();
      return;
    }
    if (instance.props.trigger.indexOf("mouseenter") >= 0 && instance.props.trigger.indexOf("click") >= 0 && ["mouseleave", "mousemove"].indexOf(event.type) >= 0 && isVisibleFromClick) {
      return;
    }
    var delay = getDelay(false);
    if (delay) {
      hideTimeout = setTimeout(function() {
        if (instance.state.isVisible) {
          instance.hide();
        }
      }, delay);
    } else {
      scheduleHideAnimationFrame = requestAnimationFrame(function() {
        instance.hide();
      });
    }
  }
  function enable() {
    instance.state.isEnabled = true;
  }
  function disable() {
    instance.hide();
    instance.state.isEnabled = false;
  }
  function clearDelayTimeouts() {
    clearTimeout(showTimeout);
    clearTimeout(hideTimeout);
    cancelAnimationFrame(scheduleHideAnimationFrame);
  }
  function setProps(partialProps) {
    if (true) {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning("setProps"));
    }
    if (instance.state.isDestroyed) {
      return;
    }
    invokeHook("onBeforeUpdate", [instance, partialProps]);
    removeListeners();
    var prevProps = instance.props;
    var nextProps = evaluateProps(reference2, Object.assign({}, prevProps, removeUndefinedProps(partialProps), {
      ignoreAttributes: true
    }));
    instance.props = nextProps;
    addListeners();
    if (prevProps.interactiveDebounce !== nextProps.interactiveDebounce) {
      cleanupInteractiveMouseListeners();
      debouncedOnMouseMove = debounce2(onMouseMove, nextProps.interactiveDebounce);
    }
    if (prevProps.triggerTarget && !nextProps.triggerTarget) {
      normalizeToArray(prevProps.triggerTarget).forEach(function(node) {
        node.removeAttribute("aria-expanded");
      });
    } else if (nextProps.triggerTarget) {
      reference2.removeAttribute("aria-expanded");
    }
    handleAriaExpandedAttribute();
    handleStyles();
    if (onUpdate) {
      onUpdate(prevProps, nextProps);
    }
    if (instance.popperInstance) {
      createPopperInstance();
      getNestedPopperTree().forEach(function(nestedPopper) {
        requestAnimationFrame(nestedPopper._tippy.popperInstance.forceUpdate);
      });
    }
    invokeHook("onAfterUpdate", [instance, partialProps]);
  }
  function setContent2(content) {
    instance.setProps({
      content
    });
  }
  function show() {
    if (true) {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning("show"));
    }
    var isAlreadyVisible = instance.state.isVisible;
    var isDestroyed = instance.state.isDestroyed;
    var isDisabled = !instance.state.isEnabled;
    var isTouchAndTouchDisabled = currentInput.isTouch && !instance.props.touch;
    var duration = getValueAtIndexOrReturn(instance.props.duration, 0, defaultProps.duration);
    if (isAlreadyVisible || isDestroyed || isDisabled || isTouchAndTouchDisabled) {
      return;
    }
    if (getCurrentTarget().hasAttribute("disabled")) {
      return;
    }
    invokeHook("onShow", [instance], false);
    if (instance.props.onShow(instance) === false) {
      return;
    }
    instance.state.isVisible = true;
    if (getIsDefaultRenderFn()) {
      popper2.style.visibility = "visible";
    }
    handleStyles();
    addDocumentPress();
    if (!instance.state.isMounted) {
      popper2.style.transition = "none";
    }
    if (getIsDefaultRenderFn()) {
      var _getDefaultTemplateCh2 = getDefaultTemplateChildren(), box = _getDefaultTemplateCh2.box, content = _getDefaultTemplateCh2.content;
      setTransitionDuration([box, content], 0);
    }
    onFirstUpdate = function onFirstUpdate2() {
      var _instance$popperInsta2;
      if (!instance.state.isVisible || ignoreOnFirstUpdate) {
        return;
      }
      ignoreOnFirstUpdate = true;
      void popper2.offsetHeight;
      popper2.style.transition = instance.props.moveTransition;
      if (getIsDefaultRenderFn() && instance.props.animation) {
        var _getDefaultTemplateCh3 = getDefaultTemplateChildren(), _box = _getDefaultTemplateCh3.box, _content = _getDefaultTemplateCh3.content;
        setTransitionDuration([_box, _content], duration);
        setVisibilityState([_box, _content], "visible");
      }
      handleAriaContentAttribute();
      handleAriaExpandedAttribute();
      pushIfUnique(mountedInstances, instance);
      (_instance$popperInsta2 = instance.popperInstance) == null ? void 0 : _instance$popperInsta2.forceUpdate();
      invokeHook("onMount", [instance]);
      if (instance.props.animation && getIsDefaultRenderFn()) {
        onTransitionedIn(duration, function() {
          instance.state.isShown = true;
          invokeHook("onShown", [instance]);
        });
      }
    };
    mount();
  }
  function hide2() {
    if (true) {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning("hide"));
    }
    var isAlreadyHidden = !instance.state.isVisible;
    var isDestroyed = instance.state.isDestroyed;
    var isDisabled = !instance.state.isEnabled;
    var duration = getValueAtIndexOrReturn(instance.props.duration, 1, defaultProps.duration);
    if (isAlreadyHidden || isDestroyed || isDisabled) {
      return;
    }
    invokeHook("onHide", [instance], false);
    if (instance.props.onHide(instance) === false) {
      return;
    }
    instance.state.isVisible = false;
    instance.state.isShown = false;
    ignoreOnFirstUpdate = false;
    isVisibleFromClick = false;
    if (getIsDefaultRenderFn()) {
      popper2.style.visibility = "hidden";
    }
    cleanupInteractiveMouseListeners();
    removeDocumentPress();
    handleStyles(true);
    if (getIsDefaultRenderFn()) {
      var _getDefaultTemplateCh4 = getDefaultTemplateChildren(), box = _getDefaultTemplateCh4.box, content = _getDefaultTemplateCh4.content;
      if (instance.props.animation) {
        setTransitionDuration([box, content], duration);
        setVisibilityState([box, content], "hidden");
      }
    }
    handleAriaContentAttribute();
    handleAriaExpandedAttribute();
    if (instance.props.animation) {
      if (getIsDefaultRenderFn()) {
        onTransitionedOut(duration, instance.unmount);
      }
    } else {
      instance.unmount();
    }
  }
  function hideWithInteractivity(event) {
    if (true) {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning("hideWithInteractivity"));
    }
    getDocument().addEventListener("mousemove", debouncedOnMouseMove);
    pushIfUnique(mouseMoveListeners, debouncedOnMouseMove);
    debouncedOnMouseMove(event);
  }
  function unmount() {
    if (true) {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning("unmount"));
    }
    if (instance.state.isVisible) {
      instance.hide();
    }
    if (!instance.state.isMounted) {
      return;
    }
    destroyPopperInstance();
    getNestedPopperTree().forEach(function(nestedPopper) {
      nestedPopper._tippy.unmount();
    });
    if (popper2.parentNode) {
      popper2.parentNode.removeChild(popper2);
    }
    mountedInstances = mountedInstances.filter(function(i) {
      return i !== instance;
    });
    instance.state.isMounted = false;
    invokeHook("onHidden", [instance]);
  }
  function destroy() {
    if (true) {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning("destroy"));
    }
    if (instance.state.isDestroyed) {
      return;
    }
    instance.clearDelayTimeouts();
    instance.unmount();
    removeListeners();
    delete reference2._tippy;
    instance.state.isDestroyed = true;
    invokeHook("onDestroy", [instance]);
  }
}
function tippy(targets, optionalProps) {
  if (optionalProps === void 0) {
    optionalProps = {};
  }
  var plugins = defaultProps.plugins.concat(optionalProps.plugins || []);
  if (true) {
    validateTargets(targets);
    validateProps(optionalProps, plugins);
  }
  bindGlobalEventListeners();
  var passedProps = Object.assign({}, optionalProps, {
    plugins
  });
  var elements = getArrayOfElements(targets);
  if (true) {
    var isSingleContentElement = isElement2(passedProps.content);
    var isMoreThanOneReferenceElement = elements.length > 1;
    warnWhen(isSingleContentElement && isMoreThanOneReferenceElement, ["tippy() was passed an Element as the `content` prop, but more than", "one tippy instance was created by this invocation. This means the", "content element will only be appended to the last tippy instance.", "\n\n", "Instead, pass the .innerHTML of the element, or use a function that", "returns a cloned version of the element instead.", "\n\n", "1) content: element.innerHTML\n", "2) content: () => element.cloneNode(true)"].join(" "));
  }
  var instances = elements.reduce(function(acc, reference2) {
    var instance = reference2 && createTippy(reference2, passedProps);
    if (instance) {
      acc.push(instance);
    }
    return acc;
  }, []);
  return isElement2(targets) ? instances[0] : instances;
}
tippy.defaultProps = defaultProps;
tippy.setDefaultProps = setDefaultProps;
tippy.currentInput = currentInput;
var applyStylesModifier = Object.assign({}, applyStyles_default, {
  effect: function effect4(_ref) {
    var state = _ref.state;
    var initialStyles = {
      popper: {
        position: state.options.strategy,
        left: "0",
        top: "0",
        margin: "0"
      },
      arrow: {
        position: "absolute"
      },
      reference: {}
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);
    state.styles = initialStyles;
    if (state.elements.arrow) {
      Object.assign(state.elements.arrow.style, initialStyles.arrow);
    }
  }
});
tippy.setDefaultProps({
  render
});
var tippy_esm_default = tippy;

// node_modules/ideogram/src/js/kit/tippy-styles.js
var tippyCss = `.tippy-box[data-animation=fade][data-state=hidden]{opacity:0}[data-tippy-root]{max-width:calc(100vw - 10px)}.tippy-box{position:relative;background-color:#333;color:#fff;border-radius:4px;font-size:14px;line-height:1.4;white-space:normal;outline:0;transition-property:transform,visibility,opacity}.tippy-box[data-placement^=top]>.tippy-arrow{bottom:0}.tippy-box[data-placement^=top]>.tippy-arrow:before{bottom:-7px;left:0;border-width:8px 8px 0;border-top-color:initial;transform-origin:center top}.tippy-box[data-placement^=bottom]>.tippy-arrow{top:0}.tippy-box[data-placement^=bottom]>.tippy-arrow:before{top:-7px;left:0;border-width:0 8px 8px;border-bottom-color:initial;transform-origin:center bottom}.tippy-box[data-placement^=left]>.tippy-arrow{right:0}.tippy-box[data-placement^=left]>.tippy-arrow:before{border-width:8px 0 8px 8px;border-left-color:initial;right:-7px;transform-origin:center left}.tippy-box[data-placement^=right]>.tippy-arrow{left:0}.tippy-box[data-placement^=right]>.tippy-arrow:before{left:-7px;border-width:8px 8px 8px 0;border-right-color:initial;transform-origin:center right}.tippy-box[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.tippy-arrow{width:16px;height:16px;color:#333}.tippy-arrow:before{content:"";position:absolute;border-color:transparent;border-style:solid}.tippy-content{position:relative;padding:5px 9px;z-index:1}`;

// node_modules/snarkdown/dist/snarkdown.es.js
var e = { "": ["<em>", "</em>"], _: ["<strong>", "</strong>"], "*": ["<strong>", "</strong>"], "~": ["<s>", "</s>"], "\n": ["<br />"], " ": ["<br />"], "-": ["<hr />"] };
function n(e3) {
  return e3.replace(RegExp("^" + (e3.match(/^(\t| )+/) || "")[0], "gm"), "");
}
function r(e3) {
  return (e3 + "").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function t(a, c) {
  var o, l, g, s, p, u = /((?:^|\n+)(?:\n---+|\* \*(?: \*)+)\n)|(?:^``` *(\w*)\n([\s\S]*?)\n```$)|((?:(?:^|\n+)(?:\t|  {2,}).+)+\n*)|((?:(?:^|\n)([>*+-]|\d+\.)\s+.*)+)|(?:!\[([^\]]*?)\]\(([^)]+?)\))|(\[)|(\](?:\(([^)]+?)\))?)|(?:(?:^|\n+)([^\s].*)\n(-{3,}|={3,})(?:\n+|$))|(?:(?:^|\n+)(#{1,6})\s*(.+)(?:\n+|$))|(?:`([^`].*?)`)|(  \n\n*|\n{2,}|__|\*\*|[_*]|~~)/gm, m = [], h3 = "", i = c || {}, d = 0;
  function f(n2) {
    var r2 = e[n2[1] || ""], t4 = m[m.length - 1] == n2;
    return r2 ? r2[1] ? (t4 ? m.pop() : m.push(n2), r2[0 | t4]) : r2[0] : n2;
  }
  function $() {
    for (var e3 = ""; m.length; ) e3 += f(m[m.length - 1]);
    return e3;
  }
  for (a = a.replace(/^\[(.+?)\]:\s*(.+)$/gm, function(e3, n2, r2) {
    return i[n2.toLowerCase()] = r2, "";
  }).replace(/^\n+|\n+$/g, ""); g = u.exec(a); ) l = a.substring(d, g.index), d = u.lastIndex, o = g[0], l.match(/[^\\](\\\\)*\\$/) || ((p = g[3] || g[4]) ? o = '<pre class="code ' + (g[4] ? "poetry" : g[2].toLowerCase()) + '"><code' + (g[2] ? ' class="language-' + g[2].toLowerCase() + '"' : "") + ">" + n(r(p).replace(/^\n+|\n+$/g, "")) + "</code></pre>" : (p = g[6]) ? (p.match(/\./) && (g[5] = g[5].replace(/^\d+/gm, "")), s = t(n(g[5].replace(/^\s*[>*+.-]/gm, ""))), ">" == p ? p = "blockquote" : (p = p.match(/\./) ? "ol" : "ul", s = s.replace(/^(.*)(\n|$)/gm, "<li>$1</li>")), o = "<" + p + ">" + s + "</" + p + ">") : g[8] ? o = '<img src="' + r(g[8]) + '" alt="' + r(g[7]) + '">' : g[10] ? (h3 = h3.replace("<a>", '<a href="' + r(g[11] || i[l.toLowerCase()]) + '">'), o = $() + "</a>") : g[9] ? o = "<a>" : g[12] || g[14] ? o = "<" + (p = "h" + (g[14] ? g[14].length : g[13] > "=" ? 1 : 2)) + ">" + t(g[12] || g[15], i) + "</" + p + ">" : g[16] ? o = "<code>" + r(g[16]) + "</code>" : (g[17] || g[1]) && (o = f(g[17] || "--"))), h3 += l, h3 += o;
  return (h3 + a.substring(d) + $()).replace(/^\n+|\n+$/g, "");
}

// node_modules/ideogram/src/js/kit/pathway-viewer.js
var PVJS_URL = "https://cdn.jsdelivr.net/npm/@wikipathways/pvjs@5.0.1/dist/pvjs.vanilla.js";
var CONTAINER_ID = "_ideogramPathwayContainer";
async function fetchPathwayViewerJson(pwId) {
  const origin = "https://raw.githubusercontent.com";
  const repoAndBranch = "/wikipathways/wikipathways-assets/main";
  const url = `${origin}${repoAndBranch}/pathways/${pwId}/${pwId}.json`;
  const response = await fetch(url);
  const pathwayJson = await response.json();
  Ideogram.pathwayJson = pathwayJson;
  return pathwayJson;
}
async function loadPvjsScript() {
  const pvjsScript = document.createElement("script");
  pvjsScript.setAttribute("src", PVJS_URL);
  document.querySelector("body").appendChild(pvjsScript);
}
function findEntitiesByText(text, pathwayJson) {
  const matchedEntities = Object.entries(pathwayJson.entitiesById).filter(([id2, entity]) => {
    var _a2;
    return (_a2 = entity.textContent) == null ? void 0 : _a2.split(" ").some((token) => token === text);
  });
  return matchedEntities;
}
function getEntityIds(text, pathwayJson) {
  const matchedEntities = findEntitiesByText(text, pathwayJson);
  const entityIds = matchedEntities.map((e3) => e3[0]);
  return entityIds;
}
function getHighlights(text, pathwayJson, color2) {
  const entityIds = getEntityIds(text, pathwayJson);
  const highlights = entityIds.map((entityId) => [null, entityId, color2]);
  return highlights;
}
function addHeader(pwId, pathwayJson, pathwayContainer, showClose = true) {
  const pathwayName = pathwayJson.pathway.name;
  const url = `https://wikipathways.org/pathways/${pwId}`;
  const linkAttrs = `href="${url}" target="_blank" style="margin-left: 4px;"`;
  const pathwayLink = `<a ${linkAttrs}>${pathwayName}</a>`;
  let closeButton;
  if (showClose) {
    const style2 = 'style="float: right; background-color: #aaa; border: none; color: white; font-weight: bold; font-size: 16px; padding: 0px 4px; border-radius: 3px; cursor: pointer;"';
    const buttonAttrs = `class="_ideoPathwayCloseButton" ${style2}`;
    closeButton = `<button ${buttonAttrs}}>x</button>`;
  } else {
    closeButton = "";
  }
  const headerBar = `<div class="_ideoPathwayHeader">${pathwayLink}${closeButton}</div>`;
  pathwayContainer.insertAdjacentHTML("afterBegin", headerBar);
  if (showClose) {
    const closeButtonDom = document.querySelector("._ideoPathwayCloseButton");
    closeButtonDom.addEventListener("click", function(event) {
      const pathwayContainer2 = document.querySelector(`#${CONTAINER_ID}`);
      pathwayContainer2.remove();
    });
  }
}
function removeCptacAssayPortalClause(inputText) {
  const regex = /Proteins on this pathway have targeted assays available via the \[https:\/\/assays\.cancer\.gov\/available_assays\?wp_id=WP\d+\s+CPTAC Assay Portal\]\./g;
  const regex2 = /Proteins on this pathway have targeted assays available via the \[CPTAC Assay Portal\]\(https:\/\/assays\.cancer\.gov\/available_assays\?wp_id=WP\d+\)\./g;
  return inputText.replace(regex, "").replace(regex2, "");
}
function removePhosphoSitePlusClause(inputText) {
  const regex = "Phosphorylation sites were added based on information from PhosphoSitePlus (R), www.phosphosite.org.";
  return inputText.replace(regex, "");
}
function convertMarkdownLinks(markdown) {
  const html2 = t(markdown);
  const htmlWithClassedLinks = html2.replace(
    /<a href="([^"]+)">/g,
    '<a href="$1" class="_ideoPathwayDescriptionLink" target="_blank">'
  );
  return htmlWithClassedLinks;
}
function formatDescription(rawText) {
  rawText = rawText.replaceAll("\r\n\r\n", "\r\n");
  rawText = rawText.replaceAll("\r\n", "<br/><br/>");
  const denoisedPhospho = removePhosphoSitePlusClause(rawText);
  const denoisedText = removeCptacAssayPortalClause(denoisedPhospho);
  const linkedText = convertMarkdownLinks(denoisedText);
  const trimmedText = linkedText.trim();
  return trimmedText;
}
function getDescription(pathwayJson) {
  const rawText = pathwayJson.pathway.comments.filter(
    (c) => c.source === "WikiPathways-description"
  )[0].content;
  const descriptionText = formatDescription(rawText);
  const style2 = `style="font-weight: bold"`;
  const description = `<div>` + // `<div class="ideoPathwayDescription" ${style}>Description</div>` +
  descriptionText + `</div>`;
  return description;
}
function parsePwAnnotations(entitiesById, keys, ontology) {
  const pwKeys = keys.filter((k) => entitiesById[k].ontology === ontology);
  const pwAnnotations = pwKeys.map((k) => entitiesById[k]);
  return pwAnnotations;
}
function getPathwayAnnotations(pathwayJson, selectedOntology) {
  const entitiesById = pathwayJson.entitiesById;
  const keys = Object.keys(entitiesById).filter((k) => k.startsWith("http://identifiers.org"));
  const sentenceCases = {
    "Cell Type": "Cell type"
  };
  const ontologies = [
    "Cell Type",
    "Disease"
    // 'Pathway Ontology' // maybe later
  ];
  let selectedOntologies = ontologies;
  if (selectedOntology) {
    selectedOntologies = [ontologies.find(
      (ontology) => ontology.toLowerCase() === selectedOntology.toLowerCase()
    )];
  }
  const pathwayAnnotationsList = selectedOntologies.map((ontology) => {
    const pwAnnotations = parsePwAnnotations(entitiesById, keys, ontology);
    const links = pwAnnotations.map((pwa) => {
      const id2 = pwa.xrefIdentifier.replace(":", "_");
      const url = `https://purl.obolibrary.org/obo/${id2}`;
      const cls2 = 'class="_ideoPathwayOntologyLink"';
      return `<a href="${url}" target="_blank" ${cls2}>${pwa.term}</a>`;
    }).join(", ");
    const refinedOntology = sentenceCases[ontology] ?? ontology;
    const safeOntology = ontology.replaceAll(" ", "_");
    const cls = `class="ideoPathwayOntology__${safeOntology}"`;
    if (links === "") return "";
    return `<div ${cls}>${refinedOntology}: ${links}</div>`;
  }).join("");
  if (pathwayAnnotationsList.length === 0) {
    return "";
  }
  const style2 = `style="font-weight: bold"`;
  const pathwayAnnotations = `<div>` + // `<div class="ideoPathwayAnnotations" ${style}>Pathway annotations</div>` +
  pathwayAnnotationsList + `</div>`;
  return pathwayAnnotations;
}
function getPathwayGenes() {
  const entities = Object.values(Ideogram.pathwayJson.entitiesById);
  const genes = entities.filter((entity) => {
    return ["GeneProduct", "RNA", "Protein"].includes(entity.wpType);
  }).map((e3) => e3.textContent);
  const uniqueGenes = Array.from(new Set(genes));
  return uniqueGenes;
}
function addFooter(pathwayJson, pathwayContainer, showOntologies) {
  const description = getDescription(pathwayJson);
  const pathwayAnnotations = showOntologies ? getPathwayAnnotations(pathwayJson) : "";
  const footer = `<br/><div class="_ideoPathwayFooter">` + description + `<br/>` + pathwayAnnotations + `</div>`;
  pathwayContainer.insertAdjacentHTML("beforeEnd", footer);
}
async function drawPathway(pwId, sourceGene, destGene, outerSelector = "#_ideogramOuterWrap", dimensions = { height: 440, width: 900 }, showClose = true, geneNodeHoverFn, pathwayNodeClickFn, showDescription, showOntologies, showDefaultTooltips, retryAttempt = 0) {
  const pvjsScript = document.querySelector(`script[src="${PVJS_URL}"]`);
  if (!pvjsScript) {
    loadPvjsScript();
  }
  const containerSelector = `#${CONTAINER_ID}`;
  if (typeof Pvjs === "undefined") {
    if (retryAttempt <= 40) {
      setTimeout(() => {
        drawPathway(
          pwId,
          sourceGene,
          destGene,
          outerSelector,
          dimensions,
          showClose,
          geneNodeHoverFn,
          pathwayNodeClickFn,
          showDescription,
          retryAttempt++
        );
      }, 250);
      return;
    } else {
      throw Error(
        "Pvjs is undefined.  Possible causes include unavailable network or CDN."
      );
    }
  }
  const pathwayJson = await fetchPathwayViewerJson(pwId);
  const sourceEntityId = getEntityIds(sourceGene, pathwayJson)[0];
  const destEntityId = getEntityIds(destGene, pathwayJson)[0];
  const sourceHighlights = getHighlights(sourceGene, pathwayJson, "red");
  const destHighlights = getHighlights(destGene, pathwayJson, "purple");
  const highlights = sourceHighlights.concat(destHighlights);
  const oldPathwayContainer = document.querySelector(containerSelector);
  const ideoContainerDom = document.querySelector(outerSelector);
  if (oldPathwayContainer) {
    oldPathwayContainer.remove();
  }
  const width = dimensions.width;
  const height = dimensions.height;
  const pvjsDimensions = `height: ${height}px; width: ${width - 2}px;`;
  const containerDimensions = `height: ${height + 20}px; width: ${width}px;`;
  const style2 = `border: 0.5px solid #DDD; border-radius: 3px; position: relative; margin: auto; background-color: #FFF; z-index: 99; ${containerDimensions} margin: auto;`;
  const pvjsContainerHtml = `<div id="_ideogramPvjsContainer" style="${pvjsDimensions}"></div>`;
  const containerAttrs = `id="${CONTAINER_ID}" style="${style2}" data-ideo-pathway-searched="${sourceGene}" data-ideo-pathway-interacting="${destGene}"`;
  const containerHtml = `<div ${containerAttrs}>${pvjsContainerHtml}</div>`;
  ideoContainerDom.insertAdjacentHTML("beforeEnd", containerHtml);
  const pathwayContainer = document.querySelector(containerSelector);
  const pvjsContainer = document.querySelector("#_ideogramPvjsContainer");
  const pvjsProps = {
    theme: "plain",
    opacities: [],
    highlights,
    panned: [sourceEntityId],
    // TODO: Pvjs documents this, but it's unsupported
    zoomed: [sourceEntityId],
    // TODO: Pvjs documents this, but it's unsupported
    pathway: pathwayJson.pathway,
    entitiesById: pathwayJson.entitiesById,
    detailPanelOpen: false,
    // showPanZoomControls: false,
    selected: null
  };
  const pathwayViewer = new Pvjs(pvjsContainer, pvjsProps);
  addHeader(pwId, pathwayJson, pathwayContainer, showClose);
  if (showDescription) {
    addFooter(pathwayJson, pathwayContainer, showOntologies);
  }
  const detail = {
    pathwayViewer,
    pwId,
    sourceGene,
    destGene,
    dimensions
  };
  const ideogramPathwayEvent = new CustomEvent("ideogramDrawPathway", { detail });
  document.dispatchEvent(ideogramPathwayEvent);
  pathwayContainer.querySelectorAll("g.GeneProduct").forEach((geneNode) => {
    const geneName = geneNode.getAttribute("name");
    let tooltipContent = geneName;
    geneNode.addEventListener("mouseover", (event) => {
      if (geneNodeHoverFn) {
        tooltipContent = geneNodeHoverFn(event, geneName);
        geneNode.setAttribute("data-tippy-content", tooltipContent);
      }
    });
    if (showDefaultTooltips) {
      geneNode.setAttribute(`data-tippy-content`, tooltipContent);
    }
  });
  if (showDefaultTooltips) {
    const tippyConfig2 = getTippyConfig();
    tippyConfig2.trigger = "mouseenter";
    tippy_esm_default("g.GeneProduct[data-tippy-content]", tippyConfig2);
  }
  if (pathwayNodeClickFn) {
    pathwayContainer.querySelectorAll("g.Pathway").forEach((pathwayNode) => {
      pathwayNode.addEventListener("click", (event) => {
        const domClasses = Array.from(pathwayNode.classList);
        const pathwayId = domClasses.find((c) => c.startsWith("WikiPathways_")).split("WikiPathways_")[1];
        pathwayNodeClickFn(event, pathwayId);
      });
      if (showDefaultTooltips) {
        const tooltipContent = "Click to show pathway";
        pathwayNode.setAttribute("data-tippy-content", tooltipContent);
      }
    });
    if (showDefaultTooltips) {
      tippy_esm_default("g.Pathway[data-tippy-content]", tippyConfig);
    }
  }
}

// node_modules/ideogram/src/js/kit/analyze-related-genes.js
function timeDiff(t03) {
  return Math.round(performance.now() - t03);
}
function initAnalyzeRelatedGenes(ideo) {
  ideo.time = {
    rg: {
      // times for related genes
      t0: performance.now()
    }
  };
  if ("_didRelatedGenesFirstPlot" in ideo) {
    delete ideo._didRelatedGenesFirstPlot;
  }
}
function getRelatedGenesByType() {
  const ideo = this;
  const relatedGenes = ideo.annotDescriptions.annots;
  const related = Object.values(relatedGenes).slice();
  const paralogous = related.filter((r2) => {
    return r2.type && r2.type.includes("paralogous");
  });
  const interacting = related.filter((r2) => {
    return r2.type && r2.type.includes("interacting gene");
  });
  const searched = Object.entries(relatedGenes).filter((entry) => {
    return entry[1].type && entry[1].type.includes("searched gene");
  })[0][0];
  return { related, paralogous, interacting, searched };
}
function getRelatedGenesTooltipAnalytics(annot) {
  const ideo = this;
  const timeSincePrevTooltip = performance.now() - ideo.time.prevTooltipOff;
  const prevAnnotDomId = ideo.time.prevTooltipAnnotDomId;
  if (timeSincePrevTooltip < 300 && annot.domId === prevAnnotDomId) {
    return null;
  }
  const tooltipGene = annot.name;
  const tooltipRelatedType = ideo.annotDescriptions.annots[annot.name].type.split(" ")[0];
  const countsByType = getCountsByType(ideo);
  const analytics = Object.assign(
    { tooltipGene, tooltipRelatedType },
    countsByType
  );
  return analytics;
}
function analyzePlotTimes(type2, ideo) {
  if (type2 === "pathway") {
    return;
  }
  const otherTypes = {
    paralogous: "interacting",
    interacting: "paralogous"
  };
  const related = ideo.getRelatedGenesByType();
  const otherType = otherTypes[type2];
  const numThisRelated = related[type2].length;
  const numOtherRelated = related[otherType] ? related[otherType].length : 0;
  if (!ideo._didRelatedGenesFirstPlot) {
    ideo._didRelatedGenesFirstPlot = true;
    ideo.time.rg.totalFirstPlot = timeDiff(ideo.time.rg.t0);
    if (numThisRelated > 0) {
      ideo.time.rg.timestampFirstPlot = performance.now();
      ideo._relatedGenesFirstPlotType = type2;
    }
  } else {
    if (numThisRelated > 0 && numOtherRelated > 0) {
      const timestampFirstPlot = ideo.time.rg.timestampFirstPlot;
      ideo.time.rg.totalLastPlotDiff = timeDiff(timestampFirstPlot);
    } else if (numThisRelated > 0 && numOtherRelated === 0) {
      ideo.time.rg.timestampFirstPlot = performance.now();
      ideo.time.rg.totalFirstPlot = timeDiff(ideo.time.rg.t0);
      ideo._relatedGenesFirstPlotType = type2;
      ideo.time.rg.totalLastPlotDiff = 0;
    } else if (numThisRelated === 0 && numOtherRelated > 0) {
      ideo.time.rg.totalLastPlotDiff = 0;
    } else {
      ideo._relatedGenesFirstPlotType = "searched";
      ideo.time.rg.totalLastPlotDiff = 0;
    }
  }
}
function getCountsByType(ideo) {
  const related = ideo.getRelatedGenesByType();
  const numRelatedGenes = related["related"].length;
  const numParalogs = related["paralogous"].length;
  const numInteractingGenes = related["interacting"].length;
  const searchedGene = related["searched"];
  return {
    numRelatedGenes,
    numParalogs,
    numInteractingGenes,
    searchedGene
  };
}
function analyzeRelatedGenes(ideo) {
  const countsByType = getCountsByType(ideo);
  const timeTotal = ideo.time.rg.total;
  const timeTotalFirstPlot = ideo.time.rg.totalFirstPlot;
  const timeTotalLastPlotDiff = ideo.time.rg.totalLastPlotDiff;
  const timeParalogs = ideo.time.rg.paralogs;
  const timeInteractingGenes = ideo.time.rg.interactions;
  const timeSearchedGene = ideo.time.rg.searchedGene;
  const firstPlotType = ideo._relatedGenesFirstPlotType;
  const analytics = Object.assign({
    firstPlotType,
    timeTotal,
    timeTotalFirstPlot,
    timeTotalLastPlotDiff,
    timeSearchedGene,
    timeInteractingGenes,
    timeParalogs
  }, countsByType);
  ideo.relatedGenesAnalytics = analytics;
}

// node_modules/ideogram/src/js/kit/protein-color.js
var grey = "#AAA";
var greyLine = "#555";
var lightGrey = "#D8D8D8";
var lightGreyLine = "#888";
var darkGrey = "#888";
var darkGreyLine = "#333";
var red = "#F55";
var redLine = "#A00";
var magenta = "#922D5E";
var magentaLines = "#D26D9E";
var faintRed = "#CAA";
var faintRedLine = "#866";
var redderFaintRed = "#E88";
var redderFaintRedLine = "#A55";
var pink = "#FFC0CB";
var pinkLine = "#CF909B";
var blue = "#99D";
var blueLine = "#22C";
var lightBlue = "#CCF";
var lightBlueLine = "#33D";
var veryLightBlue = "#EEF";
var veryLightBlueLine = "#AAF";
var darkBlue = "#66B";
var darkBlueLine = "#116";
var green = "#7D7";
var greenLine = "#393";
var darkGreen = "#3A3";
var darkGreenLine = "#060";
var seafoam = "#93E9BE";
var seafoamLine = "#53AC7E";
var darkPurple = "#51087E";
var darkPurpleLine = "#8138AE";
var purple = "#880ED4";
var purpleLine = "#5800A4";
var lightPurple = "#B24BF3";
var lightPurpleLine = "#520B83";
var veryLightPurple = "#D7A1F9";
var veryLightPurpleLine = "#A771C9";
var ultraLightPurple = "#EEDDFF";
var ultraLightPurpleLine = "#A771C9";
var darkBrown = "#964B00";
var darkBrownLine = "#660B00";
var brown = "#C87D32";
var brownLine = "#722810";
var lightBrown = "#DACDBA";
var lightBrownLine = "#A99A89";
var orange = "#FFA500";
var orangeLines = "#DD8000";
var darkOrange = "#DD8300";
var darkOrangeLines = "#883000";
var lightOrange = "#FFEA66";
var lightOrangeLine = "#FFB466";
var orangeBrown = "#EEBB00";
var orangeBrownLine = "#A99A89";
var yellow = "#FF3";
var yellowLine = "#AA0";
var lightYellow = "#FFFBCC";
var lightYellowLine = "#CCC89A";
var lightGreen = "#BCB";
var lightGreenLine = "#9A9";
var veryLightGreen = "#DFD";
var veryLightGreenLine = "#CDC";
function getColors(domainType) {
  if (domainType === "S") {
    return ["#FF2", "#F99"];
  } else if (domainType === "Extracellular") {
    return [veryLightBlue, veryLightBlueLine];
  } else if (domainType === "Cytoplasmic") {
    return [lightYellow, lightYellowLine];
  } else if (domainType === "Helical" || domainType.startsWith("Helical ---")) {
    return [lightBrown, lightBrownLine];
  } else if (domainType === "Lumenal") {
    return [lightOrange, lightOrangeLine];
  } else if (domainType === "Lumenal, melanosome") {
    return [orangeBrown, orangeBrownLine];
  } else if (domainType === "Mitochondrial matrix") {
    return [veryLightGreen, veryLightGreenLine];
  } else if (domainType === "Mitochondrial intermembrane") {
    return [lightGreen, lightGreenLine];
  } else if (domainType === "Perinuclear space") {
    return [ultraLightPurple, ultraLightPurpleLine];
  } else if (domainType === "Nuclear") {
    return [veryLightPurple, veryLightPurpleLine];
  } else if (domainType === "Beta stranded") {
    return [blue, blueLine];
  } else if (domainType.includes("conserved site") || // https://www.google.com/search?q=pymol+conserved+site+color&tbm=isch
  domainType.includes("conserved domain") || domainType === "WGR domain" || domainType === "R3H domain" || domainType.includes("QLQ") || domainType === "Sema domain" || domainType === "Proteasome component (PCI) domain" || domainType === "Sterol-sensing domain" || domainType === "Erythropoietin/thrombopoietin" || domainType === "SPRY domain" || domainType === "Anaphylatoxin/fibulin" || domainType === "Tetratricopeptide repeat" || domainType === "Doublecortin domain" || domainType.includes("Glycosyl transferase") || domainType.toLowerCase().includes("lethal") && domainType.toLowerCase().includes("c-terminal") || domainType.includes("PUB") || domainType.includes("Myogenic determination") || domainType === "Globin" || domainType === "GPS motif" || domainType.includes("D-like") || domainType.toLowerCase().includes("insertion domain") || // e.g. RPLP0
  domainType === "Macro domain") {
    return [magenta, magentaLines];
  } else if (
    // Enzymatic sites
    domainType.includes("active site") || domainType.includes("hydroxylation site") || domainType.includes("catalytic domain") || domainType.includes("Lipid transport") || domainType === "BRCA1, serine-rich domain" || domainType === "Tower domain" || // Important in BRCA2
    domainType.endsWith("attachment site") || domainType.endsWith("amyloid-beta peptide") || domainType === "Reverse transcriptase domain" || domainType === "Membrane attack complex component/perforin (MACPF) domain" || domainType === "Alpha-2-macroglobulin" || domainType === "Kinesin motor domain" || domainType === "Adenomatous polyposis coli tumour suppressor protein" || domainType.includes("endostatin")
  ) {
    return [red, redLine];
  } else if (
    // Enzymatic domains, C-terminal regions, and miscellaneous
    domainType === "Cyclin, C-terminal domain" || domainType.includes("OB C-terminal domain") || domainType === "Cationic amino acid transporter, C-terminal" || domainType === "High mobility group box domain" || domainType === "HMG-box domain" || domainType.includes("CUB domain") || domainType === "C-5 cytosine methyltransferase" || domainType.includes("(G-protein), alpha subunit") || domainType === "SCAN domain" || domainType === "Apolipoprotein A/E" || domainType.includes("Clusterin") || // a.k.a. apolipoprotein J, e.g. CLU
    domainType.includes("SMAD domain") || domainType === "PLAC" || domainType.endsWith("tripeptidyl peptidase II") || domainType === "Prohormone convertase enzyme" || domainType.includes("rod domain") || domainType === "Osteopontin" || domainType === "SPRY-associated" || domainType === "C1q domain" || domainType === "OAR domain" || domainType.includes("FTO, C-terminal") || domainType.includes("ATPase, C-terminal") || domainType.includes("Hint domain") || domainType === "Laminin IV" || domainType === "NACHT-associated domain" || domainType.includes("FANCD2") || domainType.startsWith("Acyl-CoA") && domainType.endsWith("C-terminal") || domainType === "Kinesin-like" || domainType === "GUCT" || domainType.includes("(APC) repeat") || // e.g. as in APC gene
    domainType.includes("IP3R")
  ) {
    return [faintRed, faintRedLine];
  } else if (domainType.includes("trypsin domain") || domainType.includes("scaffold dimerization") || domainType.includes("eIF-4 gamma, MA3") || // e.g. PDCD4
  domainType === "Troponin" || // e.g. TNNT1
  domainType === "SKI/SNO/DAC domain" || // SKIL gene
  domainType.toLowerCase().includes("large ribosom") || // RPLP0
  domainType.includes("KA1") || // e.g. MARK2
  domainType === "V(D)J recombination-activating protein 1" || // e.g. RAG1
  domainType.toLowerCase().includes("opiod") || // e.g. PDYN
  domainType === "Corticotropin-releasing factor" || // e.g. CRH
  domainType.includes("2Fe-2S ferredoxin") || // e.g. XDH
  domainType.includes("acidic domain")) {
    return [redderFaintRed, redderFaintRedLine];
  } else if (domainType === "EGF-like calcium-binding domain" || domainType.includes("PTX/LNS") || domainType === "HSR domain" || domainType.includes("MutS, clamp") || domainType.includes("S5 domain 2-like") || // e.g. MLH1 in ACMG
  domainType.endsWith("CC1/2") || // e.g. PRKDC
  domainType.includes("MUN") || // e.g. UNC13C
  domainType.includes("second molybdopterin")) {
    return [darkGreen, darkGreenLine];
  } else if (
    // Binding sites, and smaller binding regions
    domainType.includes("binding site") || domainType === "EF-hand domain" || domainType.includes("EF hand-like") || domainType === "Zinc finger, nuclear hormone receptor-type" || domainType.includes("Serpin domain") || domainType === "Peptidase C14,  p20 domain" || domainType === "PWWP domain" || domainType === "Peptidoglycan binding-like" || domainType === "MAD homology 1, Dwarfin-type" || domainType === "F-actin binding" || domainType.includes("Glycoside hydrolase") && domainType.endsWith("domain") || domainType === "p53 tumour suppressor family" || domainType === "Menin" || // tumor suppressor, e.g. MEN1 in ACMG
    domainType.includes("von Hippel") && domainType.includes("beta") || // VHLL
    domainType === "Pointed domain" || domainType.includes("DNA binding") || domainType === "Helix-hairpin-helix domain" || domainType === "Helix-hairpin-helix motif" || domainType === "MIR motif" || domainType === "Rad52 family" || domainType === "Oxidoreductase FAD/NAD(P)-binding" || domainType.endsWith("NAD-binding") || domainType.endsWith("NAD binding") || domainType.includes("Bromo adjacent") || domainType === "HARP domain" || domainType === "FATC domain" || domainType.startsWith("XRN2-binding") || domainType === "SRCR-like domain" || domainType.includes("SRCR") || domainType === "Gamma-carboxyglutamic acid-rich (GLA) domain" || domainType === "Pterin-binding domain" || domainType === "Receptor, ligand binding region" || domainType.includes("DHEX domain") || domainType === "SANT/Myb domain" || domainType.includes("Forkhead-associated") || domainType === "Rap/Ran-GAP domain" || domainType.endsWith("C2 domain") || domainType.includes("tri-helix bundle domain") || // e.g. MYBPC3
    domainType.includes("Cx50") || // e.g. GJA8
    domainType.includes("tyrosine-rich") || domainType === "Filaggrin"
  ) {
    return [blue, blueLine];
  } else if (domainType.includes("dehydrogenase, molybdopterin binding") || domainType === "Zinc finger CCHC HIVEP-type" || domainType === "Cyclin, N-terminal" || domainType === "MAD homology, MH1" || domainType === "Sodium ion transport-associated" || domainType === "Sodium ion transport-associated domain" || domainType.endsWith("head") || domainType.includes("Pleckstrin homology domain") || domainType === "PH domain" || domainType.endsWith("pleckstrin homology-like domain") || domainType === "DEP domain" || domainType === "Post-SET domain" || domainType.includes("Glycoside hydrolase") || domainType === "Pyridoxal phosphate-dependent decarboxylase" || domainType.includes("OB1") || domainType.includes("OB3") || domainType.includes("OB domain") || domainType === "Fork head domain" || domainType === "Histone deacetylase domain" || domainType.includes("MG1") || domainType === "Homocysteine-binding domain" || domainType.startsWith("Acyl-CoA") && domainType.endsWith("N-terminal") || domainType === "Clathrin light chain" || domainType === "Hexokinase, N-terminal") {
    return [lightBlue, lightBlueLine];
  } else if (
    // Larger binding regions and miscellaneous
    domainType.includes("zinc-binding") || domainType.includes("DNA-binding") || domainType === "RUNT domain" || // a DNA-binding / PPI domain, e.g. RUNX1
    domainType === "G protein-coupled receptor, rhodopsin-like" || domainType.includes("CXC domain") || domainType.includes("Homeobox domain") || domainType.includes("BRCT domain") || domainType.includes("EF-hand") || domainType === "Laminin G domain" || domainType === "Peptidase C14, caspase non-catalytic subunit p10" || domainType === "ADD domain" || domainType === "PDZ domain" || domainType === "Krueppel-associated box" || domainType === "Ets domain" || domainType === "P domain" || domainType.includes("bHLH") || domainType === "Ras-associating (RA) domain" || domainType === "Ras-associating domain" || domainType === "Calcium/calmodulin-dependent protein kinase II, association-domain" || domainType === "Bromodomain" || domainType === "Bromodomain associated domain" || domainType === "SLIDE domain" || domainType === "Peptidase M24" || domainType === "Pentraxin-related" || domainType.includes("Notch ligand") || domainType === "Anti-proliferative protein" || domainType.includes("transpeptidase") || domainType === "Tuberin-type domain" || domainType === "Ras-like guanine nucleotide exchange factor, N-terminal" || domainType.includes("factor-binding protein") || // as in IGFBP3
    domainType.includes("GPD") || // e.g. MUTYH in ACMG
    domainType === "ELM2 domain"
  ) {
    return [darkBlue, darkBlueLine];
  } else if (domainType === "SH2 domain" || domainType.includes("SH2-like domain") || domainType.includes("Furin-like") || domainType.includes("heparin-binding") || domainType === "SRCR domain" || domainType === "EGF-like domain" || domainType === "Basic leucine zipper domain, Maf-type" || domainType.startsWith("Leucine zipper") || domainType.includes("Interleukin") && domainType.includes("propeptide") || domainType === "Sirtuin family" || domainType === "Amino acid/polyamine transporter I" || domainType === "Peptidase M10, metallopeptidase" || domainType === "Metallothionein" || domainType === "DDHD domain" || domainType === "Zinc finger C2H2-type" || domainType === "Zinc finger, PARP-type" || domainType.endsWith("tail domain") || domainType === "SET domain" || domainType === "Hamartin" || // e.g. TSC2 in ACMG; interacts with tuberin
  domainType.includes("von Hippel") && domainType.includes("alpha") || // VHLL
  domainType.includes("transactivation domain 2") || domainType === "Phosphopantetheine binding ACP domain" || domainType === "Multicopper oxidase, second cupredoxin domain" || domainType === "Helicase, C-terminal" || domainType.includes("Carboxylesterase") || // e.g. ACHE
  domainType.includes("presequence") || // e.g. ALAS2
  domainType.endsWith("CC3")) {
    return [green, greenLine];
  } else if (domainType === "Insulin-like" || domainType === "Fibroblast growth factor family" || domainType === "Nerve growth factor-related" || domainType === "Transforming growth factor-beta, C-terminal" || domainType === "Telomere-length maintenance and DNA damage repair" || domainType === "PDGF/VEGF domain" || domainType.includes("SH3-RhoGEF") || domainType.includes("MG4") || domainType.includes("RING domain") || domainType.includes("RING-type") || domainType.startsWith("DEAD/DEAH") || domainType === "Laminin alpha, domain I" || domainType.toLowerCase().includes("nuclear/hormone receptor") || domainType === "P-type trefoil domain" || // e.g. GAA in ACMG
  domainType.includes("KHDRBS")) {
    return [darkGreen, darkGreenLine];
  } else if (domainType === "SH3 domain" || domainType === "Variant SH3 domain" || domainType.endsWith("SH3 domain") || domainType.includes("copper-binding") || domainType === "Sushi/SCR/CCP domain" || domainType.includes("Coagulation factor 5/8") || domainType === "Basic-leucine zipper domain" || domainType === "Basic region leucine zipper" || domainType === "Sirtuin family, catalytic core domain" || domainType === "Amine oxidase" || domainType.includes("peroxidase") || domainType.includes("lid domain") || domainType.includes("prodomain") || domainType === "Pre-SET domain" || domainType.includes("transactivation domain") || domainType.includes(" activation domain") || domainType.includes("activating region") || domainType === "Thioesterase" || domainType.toLowerCase().includes("thiored") || // e.g. TXNDC12
  domainType.includes("esterase") || domainType.endsWith("Claudin superfamily") || domainType === "Retinoblastoma-associated protein, A-box" || domainType.includes("Between PH and SH2") || domainType.includes("inter-SH2") || domainType === "Chromogranin A/B/C" || domainType.toLowerCase().includes("helicase") || domainType.endsWith("pro-domain") || domainType === "Brix domain" || domainType === "Coagulation Factor Xa inhibitory site" || domainType === "Trypsin Inhibitor-like, cysteine rich domain" || domainType === "WIF domain" || // Wnt1 inhibitory factor, e.g. WIF1
  domainType.toLowerCase().includes("cystatin") || domainType === "EGF domain" || domainType === "Axin beta-catenin binding" || domainType === "Peptidase M2, peptidyl-dipeptidase A" || domainType.endsWith("phosphatase domain") || domainType === "PIGA, GPI anchor biosynthesis" || domainType.startsWith("Acyl-CoA") && domainType.endsWith("middle domain") || domainType.includes("(COR)") || domainType === "K Homology domain, type 2" || domainType.includes("Phox") || domainType.includes("PB1") || domainType.includes("multifunctional domain") || domainType.includes("MutS, core") || domainType === "RAP domain" || // RNA-binding, e.g. FASTK
  domainType.endsWith("CC5") || // e.g. PRKDC
  domainType.includes("first molybdopterin")) {
    return [seafoam, seafoamLine];
  } else if (
    // Immunoglobulin domains are colored in the pink-purple spectrum
    domainType === "Immunoglobulin-like domain" || domainType.toLowerCase().endsWith("immunoglobulin-like domain") || domainType.endsWith("Ig domain") || domainType.endsWith("Ig-like domain") || domainType === "Major facilitator superfamily domain" || domainType.includes("interface") || domainType === "Class I myosin tail homology domain" || domainType === "Myosin tail" || domainType === "Acyl transferase" || domainType.endsWith("transferase") || domainType.startsWith("Acyl-CoA") || domainType === "JAK, FERM F2 lobe domain" || domainType === "Sodium/solute symporter" || domainType.includes("foci domain") || domainType.includes("Receptor L-domain") || domainType === "Wnt" || domainType === "R-spondin, Fu-CRD domain" || domainType.endsWith("merisation domain") || // e.g. di- / tetramerisation
    domainType.endsWith("merization domain") || domainType.endsWith("merisation motif") || // e.g. di- / tetramerisation
    domainType.endsWith("merization motif") || domainType.endsWith("BTB/POZ domain") || // homodimerization domain
    domainType.includes("CBS domain") || // these domains homo-dimerize
    domainType === "DZF domain" || // domain associated with zinc fingers; dimerisation domain
    domainType === "GS domain" || // in kinase superfamily
    domainType.includes("kinase domain") || domainType.includes("FAT") || domainType.startsWith("von Willebrand factor, type A") || domainType.includes("VWA") || domainType === "Reeler domain" || domainType === "BMP/retinoic acid-inducible neural-specific protein" || domainType === "Low-density lipoprotein (LDL) receptor class A repeat" || domainType === "TILa domain" || domainType.includes("chromosome condensation") || domainType === "Immunoglobulin I-set" || // e.g. MYBPC3
    domainType === "Kinesin-associated" || domainType === "SMCs flexible hinge" || // e.g. SMC1A
    domainType.includes("Cys-His rich domain")
  ) {
    return [pink, pinkLine];
  } else if (domainType === "Immunoglobulin" || domainType === "Immunoglobulin domain" || domainType === "CD20-like family" || domainType === "Calponin homology domain" || domainType.endsWith("Calponin-homology domain") || domainType.includes("ATPase") || domainType.includes("ATP coupling domain") || domainType.includes("globular domain") || domainType === "Mitochondrial substrate/solute carrier" || domainType === "Major facilitator,  sugar transporter-like" || domainType === "Major facilitator, sugar transporter-like" || domainType === "Sodium:neurotransmitter symporter" || domainType.toLowerCase().includes("methyltransferase") || domainType === "Rhodanese-like domain" || domainType.startsWith("Thyroglobulin") || domainType === "Retinoblastoma-associated protein, B-box" || domainType === "C-type lectin-like" || domainType === "Galectin, carbohydrate recognition domain" || domainType === "VWFC domain" || // von Willebrand
  domainType.includes("CFC domain") || domainType === "POLO box domain" || domainType.endsWith("domain 1") || domainType.endsWith("domain II") || // e.g. EEF2
  domainType === "Fibronectin, type I" || domainType === "Cadherin-like" || domainType === "G-protein gamma-like domain" || domainType === "GoLoco motif" || domainType === "MyTH4 domain" || domainType.endsWith("isomerase") || domainType === "BTB/Kelch-associated" || // associated with BTB/POZ
  domainType === "Stathmin family") {
    return [veryLightPurple, veryLightPurpleLine];
  } else if (domainType === "Immunoglobulin C1-set" || domainType.includes("GTPase") || domainType === "RGS domain" || domainType === "Major facilitator superfamily" || domainType === "Fibronectin type II domain" || domainType.includes("ectodomain") || domainType.endsWith("receptor domain") || domainType.endsWith("receptor domain 4") || domainType === "MAM domain" || domainType === "IPT domain" || domainType.endsWith("extracellular") || domainType === "Link domain" || domainType.includes("connector domain") || domainType === "WW domain" || domainType === "WHIM1 domain" || domainType === "TNFR/NGFR cysteine-rich region" || domainType === "Frizzled domain" || domainType === "Netrin module, non-TIMP type" || domainType === "CFTR regulator domain" || domainType.endsWith("domain 2") || domainType === "GNAT domain" || domainType === "NIDO domain" || domainType === "Myosin head, motor domain" || domainType === "von Willebrand domain, type D domain" || domainType === "Kinesin-like KIF1-type" || domainType.includes("Paxillin") || // e.g. PXN, an ACMG gene
  domainType === "Clathrin, heavy chain/VPS, 7-fold repeat" || domainType === "Collagen IV, non-collagenous") {
    return [lightPurple, lightPurpleLine];
  } else if (domainType === "Fibronectin type III" || domainType === "Tissue factor" || domainType === "Immunoglobulin C2-set" || domainType.includes("immunoglobulin C2-set") || domainType.includes("protein interaction") || domainType === "SWIRM domain" || domainType.includes("(DSL) protein") || domainType === "Dishevelled protein domain" || domainType.endsWith("domain 3") || domainType === "DnaJ domain" || domainType.toLowerCase().includes("nuclear receptor") || domainType === "Gonadal family") {
    return [purple, purpleLine];
  } else if (domainType === "Immunoglobulin V-set domain" || domainType.includes("V-set domain") || domainType.includes("V-like") || domainType === "Frizzled/Smoothened, 7TM" || domainType.endsWith("domain 4") || domainType === "Integrin alpha-2" || domainType === "Calcium-activated potassium channel BK, alpha subunit" || domainType.includes("Dbl homology (DH) domain") || domainType.includes("Glycine rich") || domainType.toLowerCase().includes("exonuclease") || domainType === "WHIM2 domain" || domainType.includes("Coactivator CBP") || // e.g. EP300
  domainType.includes("cryptic polo")) {
    return [darkPurple, darkPurpleLine];
  } else if (domainType === "Desmoplakin, spectrin-like domain" || domainType === "Spectrin repeat" || domainType.endsWith("TED domain") || domainType === "Polyadenylate-binding protein/Hyperplastic disc protein" || domainType.includes(" cap domain") || domainType.toLowerCase().includes("agenet") || domainType.includes("TATA") || domainType.includes("Citron") || domainType === "RIH domain" || domainType.toLowerCase().includes("sclerostin") || // e.g. SOSTDC1
  domainType === "ZU5 domain" || // e.g. TJP1
  domainType === "Piezo domain" || // e.g. PIEZO1
  domainType === "Histone H2A/H2B/H3") {
    return [yellow, yellowLine];
  } else if (
    // Repeats, iron, some transmembrane
    domainType === "Armadillo" || domainType.includes("Apple domain") || domainType === "Protocadherin" || // Cytoplasmic
    domainType === "DIX domain" || domainType === "Ferritin-like diiron domain" || domainType === "4Fe-4S dicluster domain" || domainType === "Transferrin-like domain" || // iron-related, e.g. MELTF
    domainType === "PAS domain" || domainType === "PAS fold" || domainType === "Polyketide synthase, dehydratase domain" || domainType === "Flavodoxin/nitric oxide synthase" || domainType === "Flavodoxin-like fold" || domainType === "G-patch domain" || domainType === "Chromo domain" || domainType.toLowerCase().includes("tudor") || domainType === "Cytochrome P450" || domainType === "Potassium channel domain" || domainType === "G2 nidogen/fibulin G2F" || domainType.includes("bait region") || domainType === "WWE domain" || domainType.endsWith("deiodinase") || domainType === "Cobalamin (vitamin B12)-binding domain" || domainType === "Laminin domain II" || domainType === "Troponin I residues 1-32" || // e.g. TNNI3 in ACMG
    domainType === "KI67R" || // KI67 / Chmadrin repeat
    domainType.includes("FAD-binding") || domainType.includes("Glucagon")
  ) {
    return [orange, orangeLines];
  } else if (domainType.includes("Kringle") || domainType.includes("Peptidase M12A") || domainType === "TGF-beta, propeptide" || domainType.includes("autopeptidase") || domainType.includes("GAIN") || domainType === "PIK-related kinase" || domainType.includes("(PIK) domain") || domainType === "LDLR class B repeat" || domainType === "Actin family" || domainType === "Ferritin/DPS protein domain" || domainType === "PAS fold-3" || domainType === "Polyketide synthase, ketoreductase domain" || domainType.startsWith("Heat shock protein") && domainType.endsWith("family") || domainType === "BAG domain" || // e.g. BAG3 in AGMC, a chaperone
  domainType === "MCM domain" || domainType.endsWith("reductase-like") || domainType === "Lipase" || domainType === "Phospholipase A2 domain" || domainType === "Notch domain" || domainType.includes("LCCL domain") || domainType.includes("SANT-like") || domainType === "VWF/SSPO/Zonadhesin-like, cysteine-rich domain" || // E.g. VWF
  domainType === "Kappa casein" || domainType === "Casein, alpha/beta" || domainType === "Natriuretic peptide" || domainType === "EMI domain" || domainType === "Neurohypophysial hormone" || domainType === "Synuclein" || domainType.includes("Hydroxymethylglutaryl-CoA reductase") || domainType.includes("Perilipin") || domainType.includes("lipase") || domainType.includes("CRAL") || // e.g. NF1
  domainType.includes("SAND") || domainType.toLowerCase().includes("hsp") || domainType.toLowerCase().includes("bombesin")) {
    return [lightBrown, lightBrownLine];
  } else if (domainType === "Notch, NOD domain" || domainType === "Cadherin, Y-type LIR-motif" || domainType === "Protein patched/dispatched" || domainType.includes("membrane-proximal") || domainType === "LicD family" || domainType.includes("MoaB/Mog")) {
    return [brown, brownLine];
  } else if (
    // Transmembrane, etc.
    domainType.includes("transmembrane domain") || domainType.includes("trans-membrane domain") || domainType.includes("Transmembrane protein") || domainType.includes("7TM") || // e.g. TMEM63A
    domainType === "Major intrinsic protein" || // e.g. AQP1
    domainType.includes("Triadin") || domainType.includes("Collectrin") || domainType.includes("membrane glycoprotein") || domainType === "SEA domain" || domainType === "CD36 family" || domainType.includes("CD34") || domainType === "Hypoxia-inducible factor, alpha subunit" || domainType === "Hypoxia-inducible factor, alpha subunit-like" || domainType === "PKD domain" || domainType.includes("regulatory domain") || domainType.endsWith("E2 domain") || domainType === "PLAT/LH2 domain" || domainType === "Notch, NODP domain" || domainType === "Syndecan/Neurexin domain" || domainType === "Zona pellucida domain" || domainType.includes("Ion transport domain") || domainType.endsWith("Membrane transport protein MMPL domain") || domainType.includes("Caveolin") || domainType === "Band 7 domain" || domainType.includes("Shisa") || domainType === "ABC-2 family transporter protein" || domainType === "Anoctamin" || domainType === "Sodium-dependent phosphate transport protein" || // SLC34A2
    domainType.includes("MHC II-interacting")
  ) {
    return [darkBrown, darkBrownLine];
  } else if (
    // Death, ubiquitination, apoptosis, etc.
    domainType === "DAPIN domain" || domainType === "Death effector domain" || domainType === "Death domain" || domainType.includes("death protein") || domainType.toLowerCase().includes("lethal") || domainType.includes("UBA domain") || domainType.includes("HECT domain") || domainType.toLowerCase().includes("ubiquitin") || domainType.includes("necrosis") || domainType.toLowerCase().includes("death") || domainType.includes("Bcl-2") || domainType.includes("CIDE-N") || domainType === "Disintegrin domain" || domainType.includes("TRAF") || domainType.includes("TIR") || domainType.toLowerCase().includes("caspase") || domainType === "Pellino family"
  ) {
    return [darkGrey, darkGreyLine];
  } else if (domainType.includes("unknown function") || domainType.toLowerCase().includes("unstructured") || domainType.startsWith("Uncharacterised")) {
    return [grey, greyLine];
  } else if (domainType.toLowerCase().includes("leucine rich repeat") || domainType.includes("HIN") || domainType.includes("calcium") || domainType.toLowerCase().includes("calreticulin") || domainType.includes("cytokine receptor") || domainType.includes("pore forming") || domainType.includes("RHIM") || domainType.includes("SWIB") || domainType === "Ryanodine receptor Ryr" || // Associated with repeats
  domainType.includes("Armadillo") || // e.g. APC
  domainType === "UME domain" || // overlaps Armadillo-type fold, e.g. ATR
  domainType.includes("WD40 domain") || domainType === "WSTF/Acf1/Cbp146" || // ATP-utilising chromatin assembly and remodeling factor
  domainType === "BCL7" || // e.g. BCL7A
  domainType.endsWith("repeat ring region") || // e.g. TRRAP
  domainType.includes("PANDER") || // e.g. FAM3C
  // GPCRs
  domainType === "GPCR, rhodopsin-like, 7TM" || domainType === "GPCR, family 2, secretin-like" || domainType === "GPCR, family 3, nine cysteines domain" || domainType === "G-protein coupled receptor" || domainType.toLowerCase().includes("orexin") || // e.g. HCRTR2
  domainType === "[2Fe-2S]-binding") {
    return [darkOrange, darkOrangeLines];
  } else if (domainType.includes("repeat") || domainType === "Vitellinogen, open beta-sheet" || domainType.includes("Interleukin") && domainType.includes("family") || /Interleukin-\d+$/.test(domainType) || domainType === "Chemokine interleukin-8-like domain" || domainType.includes("beta-ribbon") || domainType.includes("cytoplasmic domain") || domainType.toLowerCase().includes("interleukin") || domainType === "Citrate transporter-like domain" || domainType.toLowerCase().includes("calsequestrin")) {
    return [orange, orangeLines];
  } else if (domainType.includes("inhibit") || domainType.includes("central") || domainType.endsWith("tail") || domainType.endsWith("helical domain") || domainType.endsWith("helical domain HD2") || domainType.endsWith("coiled-coil domain") || domainType.endsWith("coiled-coil region") || domainType.includes("zinc ribbon fold") || domainType.includes("zinc-ribbon") || domainType.toLowerCase().includes("anhydrase") || // e.g. CA6
  domainType === "Macroglobulin domain" || domainType.includes("KH0") || domainType.includes("EGF") || domainType.toLowerCase().includes("olfact") || domainType.toLowerCase().includes("mucin")) {
    return [seafoam, seafoamLine];
  } else if (domainType.includes("Peptidase") || domainType.includes("Ras-binding") || domainType.includes("CRIB domain")) {
    return [blue, blueLine];
  } else if (domainType.toLowerCase().includes("zinc finger") || domainType.toLowerCase().includes("zinc-finger") || domainType.includes("RING finger") || domainType.toLowerCase().includes("transcription factor") || domainType === "Paired domain" || // found in eukaryotic transcription regulatory proteins involved in embryogenesis
  domainType === "JmjC domain" || domainType === "BRK domain" || domainType.includes("MG3") || domainType.toLowerCase().includes("polycomb") || domainType.toLowerCase().includes("metallopeptidase") || domainType.toLowerCase().includes("metallo-peptidase") || domainType.toLowerCase().includes("metalloenzyme") || domainType === "K Homology domain, type 1" || domainType.includes("winged helix") || domainType.toLowerCase().includes("dehydrogenase") || domainType.includes("BAR") || domainType.includes("metal") || domainType.includes("redoxin")) {
    return [green, greenLine];
  } else if (domainType.startsWith("Tyrosine-protein kinase receptor") || domainType === "PTB/PI domain" || domainType.endsWith("receptor") || domainType.includes("cysteine rich") || domainType.includes("cysteine-rich") || domainType === "AWS domain" || // cysteine-rich, e.g. NSD2
  domainType.toLowerCase().includes("somatomedin b") || domainType.includes("MHC class II") && !domainType.includes("C-terminal")) {
    return [lightPurple, lightPurpleLine];
  } else if (domainType.toLowerCase().includes("golgi") || domainType === "GOLD domain" || domainType.includes("deaminase") || domainType.includes("C-terminal core") || domainType.includes("nucleoside triphosphatase") || domainType.includes("globin") || domainType.includes("IspD/TarI") || domainType === "Telethonin" || domainType.includes("Sarcoglycan") || domainType.includes("toxin") || domainType.includes("ShKT") || domainType.includes("SAM") || domainType.includes("Sterile alpha motif") || domainType.includes("Unconventional myosin-X") || domainType === "CARD domain" || domainType.includes("endonuclease") || domainType.toLowerCase().includes("splicing factor") || domainType.toLowerCase().includes("interferon") || domainType === "Tropomyosin" || // e.g. TPM1
  domainType.includes("R1 domain")) {
    return [magenta, magentaLines];
  } else if (domainType.includes("TM") || // transmembrane, as in e.g. RYR1
  domainType.toLowerCase().includes("transmembrane") || domainType.toLowerCase().includes("trans-membrane")) {
    return [darkBrown, darkBrownLine];
  } else if (domainType.includes("binding domain") || domainType.includes("binding protein")) {
    return [darkBlue, darkBlueLine];
  } else if (domainType.includes("Ribosomal protein") || domainType.toLowerCase().includes("ribosomal subunit") || domainType.toLowerCase().includes("ribosom") || domainType.toLowerCase().includes("ribonuclease")) {
    return [darkGreen, darkGreenLine];
  } else if (domainType.includes("lectin") || domainType.includes("recognition") || domainType.toLowerCase().includes("solute carrier") || domainType.includes("isomerase") || domainType === "Clathrin-H-link") {
    return [veryLightPurple, veryLightPurpleLine];
  } else if (domainType.startsWith("von Willebrand factor") || domainType.endsWith("receptor-binding") || domainType.toLowerCase().includes("link") || domainType.includes("basic domain") || domainType.includes("interacting") || domainType.includes("domain IV") || // e.g. EEF2
  domainType.toLowerCase().includes("immunoglobulin domain")) {
    return [purple, purpleLine];
  } else if (domainType.includes("transferase") || domainType.includes("merisation")) {
    return [pink, pinkLine];
  } else if (domainType.includes("oxygenase")) {
    return [red, redLine];
  } else if (domainType.includes("phosphatase") || domainType.includes("RNA polymerase") || domainType.includes("catenin")) {
    return [seafoam, seafoamLine];
  } else if (domainType.includes("bind") || domainType.includes("EF")) {
    return [blue, blueLine];
  } else if (
    // C-terminal regions are typically colored red in e.g. PyMol rainbow
    domainType.includes("C-termin") || domainType.includes("C termin") || domainType.includes("kinase")
  ) {
    return [faintRed, faintRedLine];
  } else if (
    // N-terminal regions are typically colored blue in e.g. PyMol rainbow
    domainType.includes("N-termin") || domainType.includes("N-teminal") || // Typo in "CTNNB1 binding, N-teminal"
    domainType.includes("N termin") || domainType.toLowerCase().includes("decarboxylase") || domainType.toLowerCase().includes("hydrolase") || domainType.includes("PH domain") || domainType.includes("cytosolic") || domainType.toLowerCase().includes("homeobox")
  ) {
    return [lightBlue, lightBlueLine];
  }
  return [lightGrey, lightGreyLine];
}

// node_modules/ideogram/src/js/kit/protein.js
function getFeatureBorderLines(x, y2, width, baseHeight, lineColor, addTopBottom = false) {
  const height = y2 + baseHeight;
  const lineStroke = `stroke="${lineColor}"`;
  const leftLineAttrs = `x1="${x}" x2="${x}" y1="${y2}" y2="${height}" ${lineStroke}`;
  const x2 = x + width;
  const rightLineAttrs = `x1="${x2}" x2="${x2}" y1="${y2}" y2="${height}" ${lineStroke}`;
  const startBorder = `<line class="subpart-line" ${leftLineAttrs} />`;
  const endBorder = `<line class="subpart-line" ${rightLineAttrs} />`;
  let topBorder = "";
  let bottomBorder = "";
  if (addTopBottom) {
    const topLineAttrs = `x1="${x}" x2="${x2}" y1="${y2}" y2="${y2}" ${lineStroke}`;
    const bottomLineAttrs = `x1="${x}" x2="${x2}" y1="${height}" y2="${height}" ${lineStroke}`;
    topBorder = `<line class="subpart-line" ${topLineAttrs} />`;
    bottomBorder = `<line class="subpart-line" ${bottomLineAttrs} />`;
  }
  return startBorder + endBorder + topBorder + bottomBorder;
}
function getCdsCoordinates(subparts, isPositiveStrand) {
  if (!isPositiveStrand) subparts = subparts.slice().reverse();
  const startUtr = isPositiveStrand ? "5'-UTR" : "3'-UTR";
  const lastStartUtr = subparts.filter((s) => s[0] === startUtr).slice(-1)[0];
  let startPx, startBp;
  if (lastStartUtr) {
    startPx = lastStartUtr.slice(-1)[0].x + lastStartUtr.slice(-1)[0].width;
    startBp = lastStartUtr[1] + lastStartUtr[2];
  } else {
    startPx = 0;
    startBp = 0;
  }
  const endUtr = isPositiveStrand ? "3'-UTR" : "5'-UTR";
  const firstEndUtr = subparts.filter((s) => s[0] === endUtr).slice(-1)[0];
  let stopPx, stopBp;
  if (firstEndUtr) {
    stopPx = firstEndUtr.slice(-1)[0].x;
    stopBp = firstEndUtr[1];
  } else {
    const lastSubpart = subparts.slice(-1)[0];
    stopPx = lastSubpart.slice(-1)[0].x + lastSubpart.slice(-1)[0].width;
    stopBp = lastSubpart[1] + lastSubpart[2];
  }
  const lengthBp = stopBp - startBp;
  const lengthPx = stopPx - startPx;
  const cdsCoordinates = {
    px: { start: startPx, length: lengthPx },
    bp: { start: startBp, length: lengthBp }
  };
  return cdsCoordinates;
}
function isTopologyFeature(feature) {
  return feature[0][0] === "_";
}
function isSignalPeptideFeature(feature) {
  return feature[0] === "S";
}
var topologyFeatureMap = {
  "_H": "Helical",
  "_E": "Extracellular",
  "_C": "Cytoplasmic"
};
function decompressTopologyFeature(feature) {
  if (feature in topologyFeatureMap) {
    return topologyFeatureMap[feature];
  } else {
    return feature.slice(1);
  }
}
function getFeatureSvg(feature, cds, isPositiveStrand, hasTopology) {
  let featureType = feature[0];
  const featurePx = feature.slice(-1)[0];
  let x = cds.px.start + featurePx.x;
  let width = featurePx.width;
  if (!isPositiveStrand) {
    x = cds.px.length + cds.px.start - (featurePx.x + featurePx.width);
  }
  ;
  let y2 = 30;
  let height = 14;
  const isTopology = isTopologyFeature(feature);
  const isSignal = isSignalPeptideFeature(feature);
  let topoAttr = "";
  if (hasTopology) {
    y2 = 38;
    if (isTopology) {
      featureType = decompressTopologyFeature(feature[0]);
      y2 = 30;
      height = 30;
      const featureDigest = `${feature[0]} ${feature[1]} ${feature[2]}`;
      if (
        // E.g. EGF-206 alternative isoform, C-terminal cytoplasmic domain
        isPositiveStrand && featurePx.x + featurePx.width > cds.px.length + 3 || // E.g. SCARB1-201 canonical isoform, C-terminal cytoplasmic domain
        !isPositiveStrand && featurePx.x + featurePx.width > cds.px.length + 3
      ) {
        console.debug(`Truncate protein topology feature: ${featureDigest}`);
        width -= featurePx.x + featurePx.width - cds.px.length;
        if (!isPositiveStrand) {
          x += width;
        }
      }
      topoAttr = 'data-topology="true"';
      if (width < 0) {
        const issue = "Width < 0, omit protein topology feature";
        console.debug(`${issue}: ${featureDigest}`);
        return "";
      }
      ;
    }
  }
  const [color2, lineColor] = getColors(featureType);
  if (isSignal) {
    featureType = "Signal peptide";
    height = 8;
    y2 += 3;
  }
  if (isTopology) {
    if (featureType === "Helical") {
      featureType = "Transmembrane";
    } else if (featureType.startsWith("Helical --- Name=")) {
      featureType = featureType.replace("Helical --- Name=", "Transmembrane: ");
    }
  }
  const lengthAa = `${feature[2]}&nbsp;aa`;
  const title = `data-subpart="${featureType} ${pipe} ${lengthAa}"`;
  const data = title;
  const pos = `x="${x}" width="${width}" y="${y2}" height="${height}"`;
  const topoCls = isTopology ? " topology" : "";
  const cls = `class="subpart domain${topoCls}" `;
  const addTopBottom = !isTopology;
  const line = getFeatureBorderLines(x, y2, width, height, lineColor, addTopBottom);
  const domainSvg = `<rect ${cls} rx="1.5" fill="${color2}" ${pos} ${data} ${topoAttr}/>` + line;
  return domainSvg;
}
function isEligibleforProteinSvg(gene, ideo) {
  return ideo.config.showProteinInTooltip && !("proteinCache" in Ideogram === false || gene in Ideogram.proteinCache === false || ("spliceExons" in Ideogram === false || Ideogram.spliceExons === false));
}
function getProteinRect(cds, hasTopology) {
  const y2 = hasTopology ? "43" : "35";
  const fill = hasTopology ? "BBB" : "DDD";
  const stroke = hasTopology ? "555" : "777";
  const proteinRect = `<rect class="_ideoProteinLine"x="${cds.px.start}" width="${cds.px.length}" y="${y2}" height="4" fill="#${fill}" stroke="#${stroke}" />`;
  return proteinRect;
}
function getHasTopology(gene, ideo) {
  var _a2;
  const hasTopology = (_a2 = Ideogram.proteinCache[gene]) == null ? void 0 : _a2.some((entry) => {
    return entry.protein.some(
      (feature) => isTopologyFeature(feature)
    );
  });
  return hasTopology;
}
function getProtein(structureName, subparts, isPositiveStrand, hasTopology, ideo) {
  let features = [];
  const gene = getGeneFromStructureName(structureName, ideo);
  const isEligible = isEligibleforProteinSvg(gene, ideo);
  if (!isEligible) return ["<br/>", null];
  const entry = Ideogram.proteinCache[gene].find((d) => {
    return d.transcriptName === structureName;
  });
  if (!entry) return ["<br/>", null];
  const protein = entry.protein;
  const cds = getCdsCoordinates(subparts, isPositiveStrand);
  const proteinLengthAa = null;
  const domains = addPositions(subparts, protein);
  const topologies = [];
  for (let i = 0; i < domains.length; i++) {
    const domain = domains[i];
    const isTopology = isTopologyFeature(domain);
    const svg2 = getFeatureSvg(domain, cds, isPositiveStrand, hasTopology);
    if (isTopology) {
      topologies.push(svg2);
    } else {
      features.push(svg2);
    }
  }
  const proteinRect = getProteinRect(cds, hasTopology);
  topologies.push(proteinRect);
  features = topologies.concat(features);
  const proteinSvg = `<g id="_ideoProtein">${features.join("")}</g>`;
  return [proteinSvg, proteinLengthAa];
}

// node_modules/ideogram/src/js/kit/variant.js
function getReviewStars(reviewStatus, showEmptyStars = false) {
  const fullStar = '<span style="color: #C89306">&#9733;</span>';
  const emptyStar = '<span style="color: #C89306">&#9734;</span>';
  const reviewStatuses = [
    "criteria provided, multiple submitters, no conflicts",
    "reviewed by expert panel",
    "practice guideline"
  ];
  const numStars = reviewStatuses.indexOf(reviewStatus) + 2;
  let stars = fullStar.repeat(numStars);
  if (showEmptyStars) {
    stars += emptyStar.repeat(4 - numStars);
  }
  const cleanStatus = reviewStatus[0].toUpperCase() + reviewStatus.slice(1);
  const tippyContent = `data-tippy-content="${cleanStatus}"`;
  stars = `<span class="_ideoReviewStatus" ${tippyContent}>${stars}</span>`;
  return stars;
}
function getTippyConfig2(fallbackPlacements) {
  return {
    theme: "light-border",
    popperOptions: {
      // Docs: https://atomiks.github.io/tippyjs/v6/all-props/#popperoptions
      modifiers: [
        // Docs: https://popper.js.org/docs/v2/modifiers
        {
          name: "flip",
          options: {
            fallbackPlacements
            // Defined via argument to this function
          }
        }
      ]
    },
    onShow: function() {
      document.querySelectorAll("[data-tippy-root]").forEach((tippyNode) => tippyNode.remove());
    }
  };
}
function initTippy(ideo) {
  const toggle = getTippyConfig2(["top-start", "top"]);
  ideo.tippyVariant = tippy_esm_default("._ideoSpliceToggle[data-tippy-content]", toggle);
  const arrow2 = getTippyConfig2(["bottom"]);
  const updownTips = tippy_esm_default("._ideoReviewStatus[data-tippy-content]", arrow2);
  ideo.tippyVariant = ideo.tippyVariant.concat(updownTips);
}
function getVariantSummary(v, isFullDetail = false) {
  const numDiseases = isFullDetail ? v.diseases.length : 1;
  let diseases = v.diseases.slice(0, numDiseases).map((d) => {
    const id2 = d.id.replace(":", "_");
    const url = `https://purl.obolibrary.org/obo/${id2}`;
    const link = `<a href="${url}" target=_blank>${d.name}</a>`;
    if (d.name === void 0) {
      d.name = "Not provided";
    }
    const isLinked = isFullDetail && d.name !== "Not provided";
    const value = isLinked ? link : d.name;
    return `<div>-&nbsp;${value}</div>`;
  }).join("");
  if (!isFullDetail && v.diseases.length > 1) {
    const numRemaining = v.diseases.length - 1;
    let remaining = `- ${numRemaining} more condition`;
    if (numRemaining > 1) remaining += "s";
    diseases += `<div>${remaining}</div>`;
  }
  const positionalId = `${v.chromosome}-${v.position}-${v.refAllele}-${v.altAllele}`;
  let head = positionalId;
  if (v.dbSnpId) {
    head += ` ${pipe} ${v.dbSnpId}`;
  }
  ;
  const interestingOrigin = v.origin && v.origin !== "germline";
  if (v.rawReviewStatus !== 0 || interestingOrigin) {
    head += ` ${pipe} `;
    if (v.rawReviewStatus !== 0) {
      const stars = getReviewStars(v.reviewStatus);
      head += stars;
    }
    if (v.rawReviewStatus !== 0 && interestingOrigin) {
      head += " ";
    }
    if (interestingOrigin) {
      head += v.origin;
    }
  }
  const detailedStars = getReviewStars(v.reviewStatus, true);
  let extraHeight = 0;
  if (isFullDetail) {
    extraHeight += Math.min(v.diseases.length, 5) * 13;
    if (v.origin) extraHeight += 13;
    if (v.afExac) extraHeight += 13;
  }
  const height = (isFullDetail ? 110 : 87) + extraHeight;
  const style2 = `height: ${height}px; margin-top: 15px; `;
  let supplementaryDetails;
  if (!isFullDetail) {
    supplementaryDetails = "<div><i>Click variant for more details</i></div>";
  } else {
    supplementaryDetails = `<div>Variant type: ${v.variantType}</div><div>Review status: ${detailedStars}</div>` + (v.origin ? `<div>Origin: ${v.origin}</div>` : "") + (v.afExac ? `<div>Allele frequency (ExAC): ${v.afExac}</div>` : "") + `<div>ClinVar Variation ID: ${v.clinvarVariantId}</div><br/>`;
  }
  const diseaseStyle = "max-height: 70px; overflow-y: scroll; width: 275px; margin: auto;";
  let diseaseBar = "";
  if (isFullDetail && v.diseases.length >= 5) {
    const diseaseBarStyle = `width: 100px; height: 5px; position: relative; top: 6px; box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1); margin: auto;`;
    diseaseBar = `<div style="${diseaseBarStyle}"></div>`;
  }
  const variantSummary = `
    <div class="_ideoVariantSummary" style="${style2}">
      <div>${head}</div>
      <br/>
      <div>${v.clinicalSignificance} in:</div>
      <div style="${diseaseStyle}">
      ${diseases}
      </div>
      ${diseaseBar}
      <br/>
      ${supplementaryDetails}
    </div>`;
  return variantSummary;
}
function getContainers() {
  const head = document.querySelector("._ideoGeneStructureContainerHead");
  const tissuePlot = document.querySelector("._ideoTissueExpressionPlot");
  const tissueContainer = document.querySelector("._ideoTissuePlotContainer");
  return [head, tissuePlot, tissueContainer];
}
function writeVariantSummary(event, isFullDetail, ideo) {
  var _a2;
  const [head, tissuePlot, tissueContainer] = getContainers();
  const isG = event.target.tagName === "g";
  const thisVariant = isG ? event.target : event.target.parentElement;
  document.querySelectorAll("._ideoVariant").forEach((vd) => {
    vd.classList.remove("_ideoBackgroundVariant");
  });
  document.querySelectorAll("._ideoVariant").forEach((vd) => {
    if (vd.id !== thisVariant.id) {
      vd.classList.add("_ideoBackgroundVariant");
    }
  });
  (_a2 = document.querySelector("._ideoVariantSummary")) == null ? void 0 : _a2.remove();
  const target = event.target;
  const varId = isG ? target.id : target.parentElement.id;
  const variant = ideo.variants.find((v) => "v" + v.clinvarVariantId === varId);
  const variantSummary = getVariantSummary(variant, isFullDetail);
  tissuePlot.style.display = "none";
  head.style.display = "none";
  tissueContainer.insertAdjacentHTML("beforeend", variantSummary);
  initTippy(ideo);
}
function removeVariantSummary() {
  var _a2;
  const [head, tissuePlot, tissueContainer] = getContainers();
  document.querySelectorAll("._ideoVariant").forEach((vd) => {
    vd.classList.remove("_ideoBackgroundVariant");
  });
  (_a2 = document.querySelector("._ideoVariantSummary")) == null ? void 0 : _a2.remove();
  tissuePlot.style.display = "";
  tissueContainer.style.display = "";
  head.style.display = "";
}
function addVariantListeners(ideo) {
  document.querySelectorAll("._ideoVariant").forEach((variantDom) => {
    variantDom.addEventListener("mouseover", (event) => {
      const isFullDetail = false;
      writeVariantSummary(event, isFullDetail, ideo);
    });
    variantDom.addEventListener("click", (event) => {
      const isFullDetail = true;
      writeVariantSummary(event, isFullDetail, ideo);
      event.stopPropagation();
      variantDom.removeEventListener("mouseout", removeVariantSummary);
    });
    variantDom.addEventListener("mouseout", removeVariantSummary);
  });
}
function addSplicedPositions(subparts, rawVariants) {
  const features = [];
  const bpPerPx = getBpPerPx(subparts);
  rawVariants = rawVariants.map((v) => {
    for (let i = 0; i < subparts.length; i++) {
      const subpart = subparts[i];
      const [subpartBpLength, subpartBpStart, subpartPx] = subpart.slice(-3);
      const isRelative = subpart.length === 5;
      if (subpartBpStart <= v.positionRelative && subpartBpStart + subpartBpLength >= v.positionRelative) {
        const variantSubpartRelativePosition = v.positionRelative - subpartBpStart;
        let x = variantSubpartRelativePosition / bpPerPx;
        if (isRelative) x += subpartPx.x;
        const width = 0.5;
        const feature = [
          "",
          variantSubpartRelativePosition,
          1,
          {
            type: "",
            x,
            width
          }
        ];
        features.push(feature);
        break;
      }
    }
    return v;
  });
  return features;
}
function triageVariants(rawVariants, maxVariants) {
  const tier1Variants = rawVariants.filter((v) => v.dbSnpId !== "" && v.afExac !== null).sort((a, b) => b.afExac - a.afExac).slice(0, maxVariants);
  let selectedVariants = tier1Variants;
  let selectedIds = selectedVariants.map((v) => "v" + v.clinvarVariantId);
  if (selectedVariants.length < maxVariants) {
    const tier2Variants = rawVariants.filter((v) => {
      return (v.dbSnpId !== "" || v.afExac !== null) && !selectedIds.includes("v" + v.clinvarVariantId);
    }).sort((a, b) => b.rawOrigin - a.rawOrigin).sort((a, b) => b.rawClinicalSignifiance - a.rawClinicalSignifiance).sort((a, b) => b.rawReviewStatus - a.rawReviewStatus).sort((a, b) => b.afExac - a.afExac).slice(0, maxVariants - selectedVariants.length);
    selectedIds = selectedIds.concat(tier2Variants.map((v) => "v" + v.clinvarVariantId));
    selectedVariants = selectedVariants.concat(tier2Variants);
    if (selectedVariants.length < maxVariants) {
      const tier3Variants = rawVariants.filter((v) => !selectedIds.includes("v" + v.clinvarVariantId)).sort((a, b) => b.rawOrigin - a.rawOrigin).sort((a, b) => b.rawClinicalSignifiance - a.rawClinicalSignifiance).sort((a, b) => b.rawReviewStatus - a.rawReviewStatus).slice(0, maxVariants - selectedVariants.length);
      selectedVariants = selectedVariants.concat(tier3Variants);
    }
  }
  return selectedVariants;
}
async function getVariantsSvg(geneStructure, subparts, ideo) {
  const t03 = Date.now();
  const structureName = geneStructure.name;
  const startOffset = geneStructure.startOffset;
  const gene = getGeneFromStructureName(structureName, ideo);
  const cache = Ideogram.variantCache;
  if (!cache) {
    return null;
  }
  let rawVariants = await cache.getVariants(gene, ideo);
  if (rawVariants.length === 0) {
    return null;
  }
  const maxVariants = 10;
  if (rawVariants.length > maxVariants) {
    rawVariants = triageVariants(rawVariants, maxVariants);
  }
  console.log("updated rawVariants.length", rawVariants.length);
  rawVariants = rawVariants.map((v) => {
    v.positionRelative -= startOffset;
    return v;
  });
  const pxFeatures = addSplicedPositions(subparts, rawVariants);
  const variants = pxFeatures.map((f, i) => {
    const variant = rawVariants[i];
    variant.x = f.slice(-1)[0].x;
    variant.width = f.slice(-1)[0].width;
    return variant;
  });
  const diseases = {};
  variants.forEach((v) => {
    v.diseases.map((d) => {
      if (d.name in diseases == false) diseases[d.name] = 0;
      diseases[d.name] += 1;
    });
  });
  const lines = variants.reverse().map((v) => {
    let vClass = "_ideoPathogenic";
    let bottomV = 13;
    let topV = 1;
    if (v.clinicalSignificance === "Pathogenic/Likely pathogenic") {
      vClass = "_ideoPathogenicLikelyPathogenic";
      bottomV = 16;
      topV = 4;
    } else if (v.clinicalSignificance === "Likely pathogenic") {
      vClass = "_ideoLikelyPathogenic";
      bottomV = 19;
      topV = 7;
    }
    const triangle = {
      bottom: `${v.x},${bottomV}`,
      topLeft: `${v.x - 6.5},${topV}`,
      topRight: `${v.x + 6.5},${topV}`
    };
    const points = `${triangle.bottom} ${triangle.topLeft} ${triangle.topRight}`;
    const polygonStyle = 'style="cursor: pointer;"';
    return `
      <g class="_ideoVariant ${vClass}" id="v${v.clinvarVariantId}" ${polygonStyle}>
        <line x1="${v.x}" y1="10" x2="${v.x}" y2="25" />
        <polygon points="${points}" />
      </g>
    `;
  });
  const style2 = "<style>._ideoPathogenic {stroke: #D00; fill: #FBB;} ._ideoPathogenicLikelyPathogenic {stroke: #F55; fill: #FDD;} ._ideoLikelyPathogenic {stroke: #F99500; fill: #FEC;} ._ideoVariant._ideoBackgroundVariant {stroke: #BBB; fill: #EEE; opacity: 0.2;} </style>";
  const svg2 = style2 + lines.join("");
  ideo.variants = variants;
  return svg2;
}
function writeVariantsSvg(geneStructure, ideo) {
  getVariantsSvg(geneStructure, ideo).then((svg2) => {
    const container = document.querySelector("._ideoGeneStructure");
    container.insertAdjacentHTML("beforeend", svg2);
  });
}
window.getVariantsSvg = getVariantsSvg;
window.writeVariantsSvg = writeVariantsSvg;

// node_modules/ideogram/src/js/kit/gene-structure.js
var y = 5;
var pipe = `<span style='color: #CCC'>|</span>`;
var utr5 = "5'-UTR";
var utr3 = "3'-UTR";
var heights = {
  "5'-UTR": 20,
  "exon": 20,
  "intron": 20,
  "3'-UTR": 20
};
var colors = {
  "5'-UTR": "#155069",
  "exon": "#DAA521",
  "intron": "#FFFFFF00",
  "3'-UTR": "#357089"
};
var lineColors = {
  "5'-UTR": "#70A099",
  "exon": "#BA8501",
  "3'-UTR": "#90C0B9"
};
var subpartClasses = {
  "5'-UTR": "five-prime-utr",
  "exon": "exon",
  "3'-UTR": "three-prime-utr",
  "intron": "intron"
};
var css = `<style>
  ._ideoGeneStructureContainerName {
    position: relative;
    left: 45px;
    margin-right: 20px;
  }
  ._ideoGeneStructureContainerName.pre-mRNA {
    left: 70px;
    margin-right: 70px;
  }
  ._ideoGeneStructureContainer rect:hover + line {
    visibility: hidden;
  }
  ._ideoGeneStructureContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  ._ideoGeneStructureContainer:hover ._ideoSpliceToggle {
    visibility: visible;
  }
  ._ideoGeneStructureContainer ._ideoSpliceToggle {
    visibility: hidden;
  }
  ._ideoSpliceToggle {
    margin-left: 53px; background-color: #EEE;
  }
  ._ideoSpliceToggle.pre-mRNA {
    margin-left: 43px; background-color: #F8F8F8;
  }
  ._ideoHoveredSubpart {
    stroke: #D0D0DD !important; stroke-width: 3px;
  }
  #_ideoGeneStructureTip {
    font-style: italic;
  }

  ${tippyCss}

  .tippy-box {
    font-size: 12px;
  }

  .tippy-content {
    padding: 3px 7px;
  }
  </style>`;
var hoverTip = '<span id="_ideoGeneStructureTip">Hover for details</span>';
function getFooter() {
  return document.querySelector("._ideoGeneStructureFooter");
}
function writeFooter(container) {
  const footer = getFooter();
  const svgDOM = container.querySelector("svg");
  const transcriptSummary = svgDOM.getAttribute("data-ideo-footer");
  footer.innerHTML = `&nbsp;<br/>${transcriptSummary}`;
}
async function updateGeneStructure(ideo, offset2 = 0) {
  const [structure, selectedIndex] = getSelectedStructure(ideo, offset2);
  const isCanonical = selectedIndex === 0;
  const menu = document.querySelector("#_ideoGeneStructureMenu");
  menu.options[selectedIndex].selected = true;
  const svgResults = await getSvg2(structure, ideo, Ideogram.spliceExons);
  const svg2 = svgResults[0];
  const container = document.querySelector("._ideoGeneStructureSvgContainer");
  container.innerHTML = svg2;
  updateHeader(Ideogram.spliceExons, isCanonical);
  writeFooter(container);
  ideo.addedSubpartListeners = false;
  addHoverListeners(ideo);
  initTippy2(ideo);
}
function getGeneFromStructureName(structureName) {
  const gene = structureName.split("-").slice(0, -1).join("-");
  return gene;
}
function getSelectedStructure(ideo, offset2 = 0) {
  let selectedIndex, structureName;
  const menu = document.querySelector("#_ideoGeneStructureMenu");
  if (!menu) {
    const svg2 = document.querySelector("._ideoGeneStructure");
    if (!svg2) return null;
    structureName = svg2.getAttribute("data-ideo-gene-structure-name");
    selectedIndex = 0;
  } else {
    const numOptions = menu.options.length;
    const baseIndex = menu.selectedIndex;
    selectedIndex = baseIndex + offset2;
    if (selectedIndex >= numOptions) {
      selectedIndex = 0;
    } else if (selectedIndex < 0) {
      selectedIndex = numOptions - 1;
    }
    structureName = menu.options[selectedIndex].value;
  }
  const gene = getGeneFromStructureName(structureName);
  const geneStructure = Ideogram.geneStructureCache[gene].find((gs) => gs.name === structureName);
  return [geneStructure, selectedIndex];
}
function addMenuListeners(ideo) {
  const menuId = "_ideoGeneStructureMenu";
  const container = document.querySelector("._ideoGeneStructureContainer");
  container.addEventListener("click", async (event) => {
    if (event.target.id === menuId) {
      event.stopPropagation();
    }
    let svgMaybe = event.target;
    if (svgMaybe.parentElement.tagName === "svg") {
      svgMaybe = svgMaybe.parentElement;
    }
    ;
    if (Array.from(svgMaybe.classList).includes("_ideoMenuArrow")) {
      const menuArrow = svgMaybe;
      const direction = menuArrow.getAttribute("data-dir");
      const offset2 = direction === "down" ? 1 : -1;
      await updateGeneStructure(ideo, offset2);
      event.stopPropagation();
    }
  });
}
function toggleSpliceByKeyboard(event) {
  if (event.key === "s") {
    const spliceToggle = document.querySelector("._ideoSpliceToggle input");
    if (!spliceToggle) return;
    const subpartText = document.querySelector("#_ideoSubpartText");
    if (subpartText) subpartText.innerHTML = "&nbsp;";
    spliceToggle.dispatchEvent(new MouseEvent("click"));
  }
}
function addSpliceToggleListeners(ideo) {
  document.addEventListener("keydown", toggleSpliceByKeyboard);
  const container = document.querySelector("._ideoGeneStructureContainer");
  const toggler = document.querySelector("._ideoSpliceToggle");
  if (!container) return;
  toggler.addEventListener("change", async (event) => {
    toggleSplice(ideo);
    addHoverListeners(ideo);
    event.stopPropagation();
  });
}
function nextIsOutOfSubpartBounds(i, subparts, key) {
  const isLeft = key === "left";
  return i === 0 && isLeft || i === subparts.length - 1 && !isLeft;
}
function swapUTRsForward(subparts, isPositiveStrand) {
  const swappedSubparts = subparts.slice();
  const utr = isPositiveStrand ? utr3 : utr5;
  const hasUtr = subparts.some((subpart) => subpart[0] === utr);
  subparts.forEach((subpart, i) => {
    if (i === 0) return;
    const prevSubpart = subparts[i - 1];
    const prevIsUtr3 = prevSubpart[0] === utr3;
    const prevIsUtr5 = prevSubpart[0] === utr5;
    const isExon = subpart[0] === "exon";
    if (isExon && hasUtr && ((!isPositiveStrand && prevIsUtr3 || isPositiveStrand && prevIsUtr5) && // Account for splice toggle in multi-part UTRs, as in e.g.
    // canonicals for FAM111B and SCARB1, and alternative MAOA-204
    (subpart[1] !== prevSubpart[1] + prevSubpart[2] - 1 && prevSubpart[2] !== 2))) {
      swappedSubparts[i] = prevSubpart;
      swappedSubparts[i - 1] = subpart;
    }
  });
  return swappedSubparts;
}
window.swapUTRsForward = swapUTRsForward;
function is(element, cls) {
  return element.classList.contains(cls);
}
function shouldSwapBackDOM(subpart, nextSubpart, isPositiveStrand, hasUtr) {
  const utr52 = "five-prime-utr";
  const utr32 = "three-prime-utr";
  const nextIsUtr5 = is(nextSubpart, utr52);
  const nextIsUtr3 = is(nextSubpart, utr32);
  const isNotUtr3 = !is(subpart, utr32);
  const isNotUtr5 = !is(subpart, utr52);
  return hasUtr && (!isPositiveStrand && nextIsUtr3 && isNotUtr3 || isPositiveStrand && nextIsUtr5 && isNotUtr5);
}
function shouldSwapBackData(subpart, nextSubpart, isPositiveStrand, hasUtr) {
  const nextIsUtr5 = nextSubpart[0] === utr5;
  const nextIsUtr3 = nextSubpart[0] === utr3;
  const isNotUtr3 = subpart[0] !== utr3;
  const isNotUtr5 = subpart[0] !== utr5;
  return hasUtr && (!isPositiveStrand && nextIsUtr3 && isNotUtr3 || isPositiveStrand && nextIsUtr5 && isNotUtr5);
}
function swapUTRsBack(subparts, isPositiveStrand) {
  const swappedSubparts = subparts.slice();
  const isRaw = Array.isArray(subparts[0]);
  let hasUtr;
  if (isRaw) {
    const utr = isPositiveStrand ? utr3 : utr5;
    hasUtr = subparts.some((subpart) => subpart[0] === utr);
  } else {
    const utr52 = "five-prime-utr";
    const utr32 = "three-prime-utr";
    const utr = isPositiveStrand ? utr32 : utr52;
    hasUtr = subparts.some((subpart) => is(subpart, utr));
  }
  subparts.forEach((subpart, i) => {
    if (i === swappedSubparts.length - 1) return;
    const nextSubpart = subparts[i + 1];
    const shouldSwapBackFn = isRaw ? shouldSwapBackData : shouldSwapBackDOM;
    const shouldSwapBack = shouldSwapBackFn(subpart, nextSubpart, isPositiveStrand, hasUtr);
    if (shouldSwapBack) {
      swappedSubparts.splice(i, 1, nextSubpart);
      swappedSubparts.splice(i + 1, 1, subpart);
    }
  });
  return swappedSubparts;
}
function removeHighlights() {
  const cls = "_ideoHoveredSubpart";
  const hovereds = document.querySelectorAll(`.${cls}`);
  hovereds.forEach((el) => el.classList.remove(cls));
}
function navigateSubparts(event) {
  const domSubparts = Array.from(document.querySelectorAll("rect.subpart"));
  const structure = document.querySelector("._ideoGeneStructure");
  const strand = structure.getAttribute("data-ideo-strand");
  const isPositiveStrand = strand === "+";
  const subparts = swapUTRsBack(domSubparts, isPositiveStrand);
  if (subparts.length === 0) return;
  const cls = "_ideoHoveredSubpart";
  const subpart = document.querySelector(`.${cls}`);
  if (!subpart) {
    event.stopPropagation();
    event.preventDefault();
    return;
  }
  let i;
  subparts.forEach((el, index2) => {
    if (el.classList.contains(cls)) {
      i = index2;
    }
  });
  const options = { view: window, bubbles: false, cancelable: true };
  const mouseEnter = new MouseEvent("mouseenter", options);
  const mouseLeave = new MouseEvent("mouseleave", options);
  const left2 = isPositiveStrand ? "ArrowLeft" : "ArrowRight";
  const right2 = isPositiveStrand ? "ArrowRight" : "ArrowLeft";
  let key;
  if (event.key === left2) {
    key = "left";
  } else if (event.key === right2) {
    key = "right";
  }
  if (typeof key === "undefined" || nextIsOutOfSubpartBounds(i, subparts, key)) {
    event.stopPropagation();
    event.preventDefault();
    return;
  }
  removeHighlights();
  const alt = event.altKey;
  const meta = event.metaKey;
  if (event.key === left2) {
    subpart.dispatchEvent(mouseLeave);
    let index2 = i - 1;
    if (alt) index2 = i - 10 < 0 ? 0 : i - 10;
    if (meta) index2 = 0;
    const prevSubpart = subparts[index2];
    prevSubpart.dispatchEvent(mouseEnter);
  } else if (event.key === right2) {
    subpart.dispatchEvent(mouseLeave);
    const last = subparts.length - 1;
    let index2 = i + 1;
    if (alt) index2 = i + 10 > last ? last : i + 10;
    if (meta) index2 = last;
    const nextSubpart = subparts[index2];
    nextSubpart.dispatchEvent(mouseEnter);
  }
  event.stopPropagation();
  event.preventDefault();
}
function getMenuContainer() {
  return document.querySelector("#_ideoGeneStructureMenuContainer");
}
function updateFooter(content, ideo) {
  const footer = getFooter();
  footer.innerHTML = content;
  initTippy2(ideo);
}
function addSubpartHoverListener(subpartDOM, ideo) {
  const subpart = subpartDOM;
  subpart.addEventListener("mouseenter", (event) => {
    removeHighlights();
    event.target.classList.add("_ideoHoveredSubpart");
    const footer = getFooter();
    ideo.originalTooltipFooter = footer.innerHTML;
    const subpartText = subpart.getAttribute("data-subpart");
    const trimmedFoot = footer.innerHTML.replace("&nbsp;", "");
    const style2 = 'style="margin-bottom: -10px; max-width: 260px;"';
    const id2 = 'id="_ideoSubpartText"';
    const content = `<div ${id2} ${style2}">${subpartText}</div>${trimmedFoot}`;
    updateFooter(content, ideo);
    const menuContainer = getMenuContainer();
    if (menuContainer) menuContainer.style.marginTop = "";
  });
  subpart.addEventListener("mouseleave", (event) => {
    event.target.classList.remove("_ideoHoveredSubpart");
    updateFooter(ideo.originalTooltipFooter, ideo);
    const menuContainer = getMenuContainer();
    if (menuContainer) menuContainer.style.marginTop = "4px";
  });
}
function isMouseEventInTooltip(event) {
  const tooltip = document.querySelector("._ideogramTooltip");
  const box = tooltip.getBoundingClientRect();
  const x = event.screenX;
  const y2 = event.screenY;
  const inTooltip = x > box.left && x < box.right && y2 > box.top && y2 < box.bottom;
  return inTooltip;
}
function addHoverListeners(ideo) {
  const subparts = document.querySelectorAll("rect.subpart");
  if (subparts.length === 0) return;
  ideo.subparts = subparts;
  const container = document.querySelector("._ideoGeneStructureContainer");
  container.addEventListener("mouseenter", () => {
    document.addEventListener("keydown", navigateSubparts);
    if (ideo.addedMenuListeners) return;
    ideo.addedMenuListeners = true;
    writeFooter(container);
    const tooltip = document.querySelector("._ideogramTooltip");
    tooltip.addEventListener("change", async () => {
      await updateGeneStructure(ideo);
      ideo.oneTimeDelayTooltipHideMs = 2e3;
    });
    if (Ideogram.tissueCache) {
      const tooltipFooter = document.querySelector("._ideoTooltipFooter");
      tooltipFooter.style.display = "none";
    }
  });
  container.addEventListener("mouseleave", (event) => {
    ideo.oneTimeDelayTooltipHideMs = 2e3;
    if (Ideogram.tissueCache) {
      const tooltipFooter = document.querySelector("._ideoTooltipFooter");
      tooltipFooter.style.display = "";
    }
    const inTooltip = isMouseEventInTooltip(event);
    if (inTooltip === true) {
      updateFooter(hoverTip, ideo);
    }
    ideo.addedMenuListeners = false;
    document.removeEventListener("keydown", navigateSubparts);
  });
  if (ideo.addedSubpartListeners) return;
  ideo.addedSubpartListeners = true;
  subparts.forEach((subpart) => {
    addSubpartHoverListener(subpart, ideo);
  });
}
function writeStrandInFooter(ideo) {
  const strand = getSelectedStructure(ideo)[0].strand;
  if (strand === "+") return;
  const tooltipFooter = document.querySelector("._ideoTooltipFooter");
  tooltipFooter.innerText = tooltipFooter.innerText.replace(")", `, ${strand})`);
}
function getTippyConfig3(fallbackPlacements) {
  return {
    theme: "light-border",
    popperOptions: {
      // Docs: https://atomiks.github.io/tippyjs/v6/all-props/#popperoptions
      modifiers: [
        // Docs: https://popper.js.org/docs/v2/modifiers
        {
          name: "flip",
          options: {
            fallbackPlacements
            // Defined via argument to this function
          }
        }
      ]
    },
    onShow: function() {
      document.querySelectorAll("[data-tippy-root]").forEach((tippyNode) => tippyNode.remove());
    }
  };
}
function initTippy2(ideo) {
  const toggle = getTippyConfig3(["top-start", "top"]);
  ideo.tippy = tippy_esm_default("._ideoSpliceToggle[data-tippy-content]", toggle);
  const arrow2 = getTippyConfig3(["bottom"]);
  arrow2.popperOptions.modifiers.push({
    name: "offset",
    options: {
      offset: [-5, 20]
    }
  });
  const updownTips = tippy_esm_default("._ideoMenuArrow[data-tippy-content]", arrow2);
  ideo.tippy = ideo.tippy.concat(updownTips);
}
function addGeneStructureListeners(ideo) {
  const structure = getSelectedStructure(ideo);
  if (structure === null) return;
  addSpliceToggleListeners(ideo);
  addHoverListeners(ideo);
  addMenuListeners(ideo);
  writeStrandInFooter(ideo);
  initTippy2(ideo);
}
function getSpliceToggleHoverTitle(spliceExons) {
  return spliceExons ? "Unsplice exons (s)" : "Splice exons (s)";
}
function getSpliceToggle(ideo) {
  const spliceExons = Ideogram.spliceExons;
  const modifier = spliceExons ? "" : "pre-";
  const cls = `class="_ideoSpliceToggle ${modifier}mRNA"`;
  const checked = spliceExons ? "checked" : "";
  const text = getSpliceToggleHoverTitle(spliceExons);
  const tPlace = 'data-tippy-placement="right"';
  const title = `data-tippy-content="${text}" ${tPlace}`;
  const inputAttrs = `type="checkbox" ${checked} style="display: none;"`;
  const style2 = 'style="position: relative; top: -10px; user-select: none; float: right; cursor: pointer; font-size: 16px; padding: 2px 4px; border: 1px solid #CCC; border-radius: 3px;"';
  const attrs = `${cls} ${style2} ${title}`;
  const label = `<label ${attrs}><input ${inputAttrs} />&#x2702;</label>`;
  return label;
}
function spliceOut(subparts) {
  const splicedSubparts = [];
  let prevEnd = 0;
  let prevStart = 0;
  for (let i = 0; i < subparts.length; i++) {
    const subpart = subparts[i];
    const [subpartType, start3, length2] = subpart;
    const isSpliceOverlap = start3 === prevStart;
    let prevRawStart, prevRawLength;
    if (i > 0) {
      [, prevRawStart, prevRawLength] = subparts[i - 1];
    }
    const isOtherOverlap = i > 0 && start3 === prevRawStart;
    const isOther3UTROverlap = i > 0 && start3 <= prevRawStart + prevRawLength;
    let splicedStart;
    if (isSpliceOverlap) {
      splicedStart = start3;
    } else if (isOtherOverlap) {
      splicedStart = prevStart;
    } else if (isOther3UTROverlap) {
      splicedStart = prevStart + prevRawLength - length2;
    } else {
      splicedStart = prevEnd;
    }
    const splicedEnd = splicedStart + length2;
    const splicedSubpart = [
      subpartType,
      splicedStart,
      length2 + 1,
      start3
    ];
    splicedSubparts.push(splicedSubpart);
    prevEnd = splicedEnd;
    prevStart = splicedStart;
  }
  const splicedPositionedSubparts = addPositions(splicedSubparts);
  return splicedPositionedSubparts;
}
function spliceIn(subparts) {
  const splicedSubparts = [];
  let prevEnd = 0;
  for (let i = 0; i < subparts.length; i++) {
    const subpart = subparts[i];
    const [start3, length2] = subpart.slice(1);
    if (start3 > prevEnd) {
      const intronStart = prevEnd;
      const intronLength = start3 - prevEnd - 1;
      splicedSubparts.push(["intron", intronStart, intronLength]);
    }
    prevEnd = start3 + length2;
    splicedSubparts.push(subpart);
  }
  const splicedPositionedSubparts = addPositions(splicedSubparts);
  return splicedPositionedSubparts;
}
function getSpliceStateText(spliceExons, isCanonical = true) {
  let modifier = "";
  let suffix = " and protein";
  let titleMod = "without";
  if (!spliceExons) {
    modifier = "pre-";
    suffix = "";
    titleMod = "with";
  }
  const canonOrAlt = isCanonical ? "Canonical" : "Alternative";
  const title = `${canonOrAlt} transcript per Ensembl, ${titleMod} introns`;
  const name2 = `${canonOrAlt} ${modifier}mRNA ${suffix}`;
  return { title, name: name2 };
}
function drawIntrons(prelimSubparts, matureSubparts, ideo) {
  let numInserted = 0;
  const subpartEls = document.querySelectorAll(".subpart");
  prelimSubparts.forEach((prelimSubpart, i) => {
    const matureIndex = i - numInserted;
    const matureSubpart = matureSubparts[matureIndex];
    if (matureSubpart[0] !== prelimSubpart[0]) {
      const summary = prelimSubpart.slice(-1)[0].summary;
      const otherAttrs = `y="${y}" height="20" fill="#FFFFFF00" ${summary}`;
      const intronRect = `<rect class="subpart intron" ${otherAttrs} />`;
      subpartEls[matureIndex].insertAdjacentHTML("beforebegin", intronRect);
      numInserted += 1;
    }
  });
  document.querySelectorAll(".intron").forEach((subpartDOM) => {
    addSubpartHoverListener(subpartDOM, ideo);
  });
}
function updateHeader(spliceExons, isCanonical) {
  const nameDOM = document.querySelector("._ideoGeneStructureContainerName");
  const toggleDOM = document.querySelector("._ideoSpliceToggle");
  if (nameDOM && toggleDOM) {
    [nameDOM, toggleDOM].forEach((el) => el.classList.remove("pre-mRNA"));
    if (!spliceExons) {
      [nameDOM, toggleDOM].forEach((el) => el.classList.add("pre-mRNA"));
    }
    const { title, name: name2 } = getSpliceStateText(spliceExons, isCanonical);
    nameDOM.textContent = name2;
    nameDOM.title = title;
  }
}
async function toggleSplice(ideo) {
  Ideogram.spliceExons = !Ideogram.spliceExons;
  const spliceExons = Ideogram.spliceExons;
  const [geneStructure, selectedIndex] = getSelectedStructure(ideo);
  const isCanonical = selectedIndex === 0;
  const svgResult = await getSvg2(geneStructure, ideo, spliceExons);
  const [, prelimSubparts, matureSubparts] = svgResult;
  const proteinSvg = document.querySelector("#_ideoProtein");
  if (proteinSvg && !spliceExons) proteinSvg.style.display = "none";
  const addedIntrons = document.querySelectorAll(".intron").length > 0;
  if (!spliceExons && !addedIntrons) {
    drawIntrons(prelimSubparts, matureSubparts, ideo);
  } else {
    document.querySelectorAll(".intron").forEach((el) => el.remove());
  }
  document.querySelectorAll(".subpart-line.rna").forEach((el) => el.remove());
  const subparts = spliceExons ? matureSubparts : prelimSubparts;
  console.log("in toggleSplice, subparts", subparts);
  d3.select("._ideoGeneStructure").selectAll(".subpart").data(subparts).transition().duration(750).attr("x", (d, i) => subparts[i].slice(-1)[0].x).attr("width", (d, i) => subparts[i].slice(-1)[0].width).on("end", async (d, i) => {
    console.log("in end");
    if (i !== subparts.length - 1) return;
    if (proteinSvg && spliceExons) proteinSvg.style.display = "";
    const subpartDOMs = document.querySelectorAll(".subpart:not(.domain)");
    subpartDOMs.forEach((subpartDOM, i2) => {
      const subpart = subparts[i2];
      const line = getSubpartBorderLine(subpart);
      subpartDOM.insertAdjacentHTML("afterend", line);
    });
    updateHeader(spliceExons, isCanonical);
    const tlbpDOM = document.querySelector("#_ideoTranscriptLengthBp");
    if (!tlbpDOM) return;
    const transcriptLengthBp = getTranscriptLengthBp(subparts, spliceExons);
    const prettyLength = transcriptLengthBp.toLocaleString();
    tlbpDOM.innerText = `${prettyLength} bp`;
    const variantSvg = await getVariantsSvg(geneStructure, subparts, ideo);
    console.log("toggled variantSvg.length", variantSvg.length);
    document.querySelector(".variantsDiagrams").innerHTML = variantSvg;
    ideo.tippy[0].show();
  });
}
function getTranscriptLengthBp(subparts, spliceExons = false) {
  const exons = subparts.filter((sp) => sp[0] === "exon");
  if (spliceExons) subparts = exons;
  const lastSubpart = subparts.slice(-1)[0];
  const lastStart = lastSubpart[1];
  const lastLength = lastSubpart[2];
  const exonFill = spliceExons ? exons.length - 1 : 0;
  const transcriptLengthBp = lastStart + lastLength + exonFill;
  return transcriptLengthBp;
}
function getBpPerPx(subparts, projectedFeatures = null) {
  const transcriptLengthPx = 250;
  const totalLengthBp = getTranscriptLengthBp(subparts);
  const isProtein = projectedFeatures;
  const factor = isProtein ? 3 : 1;
  const bpPerPx = totalLengthBp / transcriptLengthPx / factor;
  return bpPerPx;
}
function addPositions(subparts, projectedFeatures = null) {
  const bpPerPx = getBpPerPx(subparts, projectedFeatures);
  const features = projectedFeatures ?? subparts;
  for (let i = 0; i < features.length; i++) {
    const feature = features[i];
    if (typeof feature.slice(-1)[0] === "object") continue;
    const lengthBp = feature[2];
    const x = feature[1] / bpPerPx;
    const width = lengthBp / bpPerPx;
    const type2 = feature[0];
    features[i].push({ type: type2, x, width });
  }
  return features;
}
function getSubpartSummary(subpartType, total, index2, strand, lengthBp) {
  if (strand === "-") index2 = total - index2 + 1;
  const numOfTotal = total > 1 ? `${index2} of ${total} ` : "";
  const prettyType = subpartType[0].toUpperCase() + subpartType.slice(1);
  const prettyLength = lengthBp.toLocaleString();
  const html2 = `${prettyType} ${numOfTotal}${pipe} ${prettyLength} bp`;
  const summary = `data-subpart="${html2}"`;
  return summary;
}
function getSubpartBorderLine(subpart) {
  const subpartType = subpart[0];
  const x = subpart.slice(-1)[0].x;
  const height = heights[subpartType];
  const lineHeight = y + height;
  const lineStroke = `stroke="${lineColors[subpartType]}"`;
  const lineAttrs = (
    // "";
    `x1="${x}" x2="${x}" y1="${y}" y2="${lineHeight}" ${lineStroke}`
  );
  return `<line class="subpart-line rna" ${lineAttrs} />`;
}
async function getSvg2(geneStructure, ideo, spliceExons = false) {
  const strand = geneStructure.strand;
  const rawSubparts = geneStructure.subparts;
  let subparts;
  let prelimSubparts = spliceIn(rawSubparts);
  let matureSubparts = spliceOut(rawSubparts);
  if (spliceExons) {
    subparts = matureSubparts;
  } else {
    subparts = prelimSubparts;
  }
  const spliceToggle = document.querySelector("._ideoSpliceToggle");
  if (spliceToggle) {
    const title = getSpliceToggleHoverTitle(spliceExons);
    spliceToggle.setAttribute("data-tippy-placement", "right");
    spliceToggle.setAttribute("data-tippy-content", title);
    initTippy2(ideo);
  }
  const featureLengthPx = 250 - 2;
  const intronHeight = 1;
  const intronColor = "black";
  const geneStructureArray = [];
  const intronPosAttrs = `x="0" width="${featureLengthPx}" y="${y + 10}" height="${intronHeight}"`;
  const intronRect = `<rect fill="black" ${intronPosAttrs}/>`;
  geneStructureArray.push(intronRect);
  const indexBySubpart = {
    "5'-UTR": 0,
    "exon": 0,
    "intron": 0,
    "3'-UTR": 0
  };
  const totalBySubpart = {
    "5'-UTR": 0,
    "exon": 0,
    "intron": 0,
    "3'-UTR": 0
  };
  const isPositiveStrand = strand === "+";
  subparts = swapUTRsForward(subparts, isPositiveStrand);
  prelimSubparts = swapUTRsForward(prelimSubparts, isPositiveStrand);
  matureSubparts = swapUTRsForward(matureSubparts, isPositiveStrand);
  for (let i = 0; i < subparts.length; i++) {
    const subpart = subparts[i];
    const subpartType = subpart[0];
    if (subpartType in totalBySubpart) {
      totalBySubpart[subpartType] += 1;
    }
  }
  const structureName = geneStructure.name;
  const gene = getGeneFromStructureName(structureName);
  for (let i = 0; i < subparts.length; i++) {
    const subpart = subparts[i];
    const subpartType = subpart[0];
    let color2 = intronColor;
    if (subpartType in colors) {
      color2 = colors[subpartType];
    }
    const height = heights[subpartType];
    const lengthBp = subpart[2];
    const x = subpart.slice(-1)[0].x;
    const width = subpart.slice(-1)[0].width;
    const pos = `x="${x}" width="${width}" y="${y}" height="${height}"`;
    const cls = `class="subpart ${subpartClasses[subpartType]}" `;
    const total = totalBySubpart[subpartType];
    indexBySubpart[subpartType] += 1;
    const subpartIndex = indexBySubpart[subpartType];
    const summary = getSubpartSummary(subpartType, total, subpartIndex, strand, lengthBp);
    if (!spliceExons) {
      prelimSubparts[i].slice(-1)[0].summary = summary;
    } else if (subpartType !== "intron") {
      matureSubparts[i].slice(-1)[0].summary = summary;
    }
    const subpartSvg = `<rect ${cls} rx="1.5" fill="${color2}" ${pos} ${summary}/>` + getSubpartBorderLine(subpart);
    geneStructureArray.push(subpartSvg);
  }
  const sharedStyle = "position: relative; width: 274px; margin: auto;";
  let transform = `style="${sharedStyle} left: 10px;"`;
  if (strand === "-") {
    transform = `transform="scale(-1 1)" style="${sharedStyle} left: -10px;"`;
  }
  const menu = getMenu(gene, ideo, structureName).replaceAll('"', "'");
  const hasTopology = getHasTopology(gene, ideo);
  const [proteinSvg, proteinLengthAa] = getProtein(structureName, subparts, isPositiveStrand, hasTopology, ideo);
  const variantSvg = await getVariantsSvg(geneStructure, subparts, ideo);
  const transcriptLengthBp = getTranscriptLengthBp(subparts, spliceExons);
  const prettyLength = transcriptLengthBp.toLocaleString();
  const footerDetails = [
    `${totalBySubpart["exon"]} exons`,
    `<span id='_ideoTranscriptLengthBp'>${prettyLength} bp</span> `
  ];
  if (proteinLengthAa) {
    const prettyLengthAa = proteinLengthAa.toLocaleString();
    footerDetails.push(
      `<span id='_ideoProteinLengthAa'>${prettyLengthAa} aa</span> `
    );
  }
  const biotypeText = geneStructure.biotype.replace(/_/g, " ");
  if (biotypeText !== "protein coding") {
    footerDetails.push(biotypeText);
  }
  const footerData = menu + footerDetails.join(` ${pipe} `);
  let svgHeight = proteinSvg === "" ? 30 : 50;
  if (hasTopology) svgHeight = 60;
  let translate = "";
  if (variantSvg) {
    const varHeight = 18;
    svgHeight += varHeight;
    translate = `transform="translate(0, ${varHeight})"`;
  }
  const geneStructureSvg = `<svg class="_ideoGeneStructure" data-ideo-gene-structure-name="${structureName}" data-ideo-strand="${strand}" data-ideo-footer="${footerData}" width="${featureLengthPx + 20}" height="${svgHeight}" ${transform}><g class="rnaProteinDiagrams" ${translate}>` + geneStructureArray.join("") + proteinSvg + `</g><g class="variantsDiagrams">` + variantSvg + `</g></svg>`;
  return [geneStructureSvg, prelimSubparts, matureSubparts];
}
function getMenuArrows() {
  const style2 = "width: 12px; height: 12px; cursor: pointer;user-select: none;";
  const downStyle = `style="${style2}; margin-left: 5px;"`;
  const upStyle = `style="${style2}; margin-left: 2px;"`;
  const cls = 'class="_ideoMenuArrow"';
  const tippyPlace = 'data-tippy-placement="bottom-start"';
  const downContent = "Next transcript";
  const downTippy = `data-tippy-content="${downContent}" ${tippyPlace}`;
  const upContent = "Previous transcript";
  const upTippy = `data-tippy-content="${upContent}" ${tippyPlace}`;
  const downAttrs = `${downStyle} ${cls} data-dir="down" ${downTippy}`;
  const upAttrs = `${upStyle} ${cls} data-dir="up" ${upTippy}`;
  const down = getIcon(
    { shape: "triangle", color: "#888" },
    { config: { orientation: "down" } }
  );
  const up = getIcon({ shape: "triangle", color: "#888" }, { config: "" });
  const downArrow = `<svg ${downAttrs}>${down}</svg>`;
  const upArrow = `<svg ${upAttrs}>${up}</svg>`;
  const menuArrows = downArrow + upArrow;
  return menuArrows;
}
function getMenu(gene, ideo, selectedName) {
  const containerId = "_ideoGeneStructureMenuContainer";
  const style2 = "margin-bottom: 4px; margin-top: 4px; clear: both;";
  const structures = Ideogram.geneStructureCache[gene];
  if (structures.length === 1) {
    const name2 = structures[0].name;
    const line = `<div id="${containerId}" style="${style2}">Transcript: ${name2}</div>`;
    return line;
  }
  const options = structures.map((structure) => {
    const name2 = structure.name;
    let selected = "";
    if (selectedName && selectedName === structure.name) {
      selected = " selected";
    }
    return `<option value="${name2}" ${selected}>${name2}</option>`;
  }).join("");
  const id2 = "_ideoGeneStructureMenu";
  const menuArrows = getMenuArrows();
  const menu = `<div id="${containerId}" style="${style2}"><label for="${id2}">Transcript:</label> <select id="${id2}" name="${id2}">${options}</select>` + menuArrows + `</div>`;
  return menu;
}
async function getGeneStructureHtml(annot, ideo, isParalogNeighborhood) {
  let geneStructureHtml = "";
  const gene = annot.name;
  if (ideo.config.showGeneStructureInTooltip && !isParalogNeighborhood && !("geneStructureCache" in Ideogram === false || gene in Ideogram.geneStructureCache === false)) {
    ideo.addedSubpartListeners = false;
    if ("spliceExons" in Ideogram === false) Ideogram.spliceExons = true;
    const spliceExons = Ideogram.spliceExons;
    const structure = Ideogram.geneStructureCache[gene][0];
    const svgResults = await getSvg2(structure, ideo, spliceExons);
    const geneStructureSvg = svgResults[0];
    const cls = 'class="_ideoGeneStructureContainer"';
    const toggle = getSpliceToggle(ideo);
    const rnaClass = spliceExons ? "" : " pre-mRNA";
    const spanClass = `class="_ideoGeneStructureContainerName${rnaClass}"`;
    const { name: name2, title } = getSpliceStateText(spliceExons);
    const spanAttrs = `${spanClass} title="${title}"`;
    const divAttrs = 'class="_ideoGeneStructureContainerHead"';
    const containerStyle = "";
    geneStructureHtml = css + `<div ${cls}><div ${divAttrs}><span ${spanAttrs}>${name2}</span>${toggle}</div><span class="_ideoGeneStructureSvgContainer" ${containerStyle}>` + geneStructureSvg + `</span><div class="_ideoGeneStructureFooter">` + hoverTip + `</div></div>`;
  }
  return geneStructureHtml;
}

// node_modules/ideogram/src/js/kit/wikipathways.js
var interactionArrowMap = {
  "Arrow": ["acts on", "acted on by"],
  "TBar": ["inhibits", "inhibited by"],
  "mim-binding": ["binds", "binds"],
  "mim-catalysis": ["catalyzes", "catalyzed by"],
  "mim-cleavage": ["cleaves", "cleaved by"],
  "mim-conversion": ["converts", "converted by"],
  // 'mim-covalent-bond': ['covalently binds',
  "mim-gap": ["interacts with", "interacts with"],
  "mim-inhibition": ["inhibits", "inhibited by"],
  "mim-modification": ["modifies", "modified by"],
  "mim-necessary-stimulation": ["necessarily stimulates", "necessarily stimulated by"],
  "mim-stimulation": ["stimulates", "stimulated by"],
  "mim-transcription-translation": ["transcribes / translates", "transcribed / translated by"]
};
function determineIxnsInPathwayAreSame(ixns, ixnTypeReference) {
  let isRefMatch = true;
  let thisIsSame = true;
  if (ixns.length === 0) return { isRefMatch, thisIsSame };
  const thisIxnTypeReference = ixns[0].ixnType.toLowerCase();
  ixns.forEach((ixn) => {
    const ixnType = ixn.ixnType.toLowerCase();
    if (ixnType !== ixnTypeReference) {
      isRefMatch = false;
    }
    if (ixnType !== thisIxnTypeReference) {
      thisIsSame = false;
    }
  });
  return { isRefMatch, thisIsSame };
}
function getIxnTypeReference(ixnsByPwid) {
  const ixnTypeReference = Object.values(ixnsByPwid).find((ixns) => {
    return ixns.length > 0 && "ixnType" in ixns[0];
  })[0].ixnType.toLowerCase();
  return ixnTypeReference;
}
function setIsSame(enrichedIxns) {
  let isSame = true;
  const ixnsByPwid = enrichedIxns.ixnsByPwid;
  const ixnTypeReference = getIxnTypeReference(ixnsByPwid);
  Object.entries(ixnsByPwid).map(([pwid, ixns]) => {
    const { isRefMatch, thisIsSame } = determineIxnsInPathwayAreSame(ixns, ixnTypeReference);
    if (!thisIsSame || !isRefMatch) {
      isSame = false;
    }
    enrichedIxns.isSameByPwid[pwid] = thisIsSame;
  });
  enrichedIxns.isSame = isSame;
  return enrichedIxns;
}
function summarizeByDirection(enrichedIxns) {
  let isDirectionSame = true;
  const leftTypes = [];
  const rightTypes = [];
  Object.values(interactionArrowMap).forEach((directedTypes) => {
    rightTypes.push(directedTypes[0]);
    leftTypes.push(directedTypes[1]);
  });
  const right2 = "Acts on";
  const left2 = "Acted on by";
  const ixnsByPwid = enrichedIxns.ixnsByPwid;
  const firstIxnType = getIxnTypeReference(ixnsByPwid);
  const isRight = rightTypes.includes(firstIxnType);
  const directionReference = isRight ? right2 : left2;
  Object.entries(ixnsByPwid).map(([pwid, ixns]) => {
    let isPwDirectionSame = true;
    if (ixns.length > 0) {
      const pwFirstIxnType = ixns[0].ixnType.toLowerCase();
      const pwIsRight = rightTypes.includes(pwFirstIxnType);
      const pwDirectionReference = pwIsRight ? right2 : left2;
      ixns.forEach((ixn) => {
        const ixnType = ixn.ixnType.toLowerCase();
        const thisIsRight = rightTypes.includes(ixnType);
        const direction = thisIsRight ? right2 : left2;
        enrichedIxns.directionsByPwid[pwid] = direction;
        if (direction !== directionReference) {
          isDirectionSame = false;
        }
        if (direction !== pwDirectionReference) {
          isPwDirectionSame = false;
        }
      });
    }
    enrichedIxns.isDirectionSameByPwid[pwid] = isPwDirectionSame;
  });
  enrichedIxns.isDirectionSame = isDirectionSame;
  if (isDirectionSame === true) {
    enrichedIxns.direction = directionReference;
  }
  return enrichedIxns;
}
function summarizeInteractions(gene, searchedGene, pathwayIds, gpmls) {
  let summary = null;
  if (!navigator.onLine) return "Interacts with";
  const ixnsByPwid = detailAllInteractions(gene, searchedGene, pathwayIds, gpmls);
  const ixns = ixnsByPwid[pathwayIds[0]];
  if (ixns.length > 0) {
    let enrichedIxns = {
      ixnsByPwid,
      isSameByPwid: {},
      // If pathway has all same interaction types
      isSame: null,
      // If above is true for all pathways
      isDirectionSameByPwid: {},
      // If pathway has same ixn direction
      isDirectionSame: null,
      // If above is true for all pathways
      directionsByPwid: {}
    };
    enrichedIxns = setIsSame(enrichedIxns);
    if (enrichedIxns.isSame) {
      const ixnType = ixns[0].ixnType;
      const newIxn = ixnType;
      summary = newIxn;
    } else {
      enrichedIxns = summarizeByDirection(enrichedIxns);
      if (enrichedIxns.isDirectionSame) {
        summary = enrichedIxns.direction;
      } else {
        summary = "Interacts with";
      }
    }
  }
  return summary;
}
function detailAllInteractions(gene, searchedGene, pathwayIds, gpmls) {
  const ixnsByPwid = {};
  pathwayIds.map((pathwayId) => {
    const gpml = gpmls[pathwayId];
    const ixns = detailInteractions(gene, searchedGene, gpml);
    ixnsByPwid[pathwayId] = ixns;
  });
  return ixnsByPwid;
}
function getMatches(gpml, label) {
  if (typeof gpml === "undefined" || gpml === "") return [[], []];
  const nodes = Array.from(gpml.querySelectorAll(
    `DataNode[TextLabel="${label}"]`
  ));
  const genes = nodes.map((node) => {
    return {
      type: "node",
      matchedLabel: label,
      textLabel: node.getAttribute("TextLabel"),
      graphId: node.getAttribute("GraphId"),
      groupRef: node.getAttribute("GroupRef")
    };
  });
  const geneGraphIds = genes.map((g) => g.graphId);
  const geneGroupRefs = genes.map((g) => g.groupRef);
  const groupSelectors = geneGroupRefs.map((ggr) => `Group[GroupId="${ggr}"]`).join(",");
  let geneGroups = [];
  if (groupSelectors !== "") {
    const groups2 = gpml.querySelectorAll(groupSelectors);
    geneGroups = Array.from(groups2).map((group2) => {
      return {
        type: "group",
        matchedLabel: label,
        graphId: group2.getAttribute("GraphId"),
        groupId: group2.getAttribute("GroupId")
      };
    });
  }
  const geneGroupGraphIds = geneGroups.map((g) => g.graphId);
  const matchingGraphIds = geneGraphIds.concat(geneGroupGraphIds);
  const elements = genes.concat(geneGroups);
  return [matchingGraphIds, elements];
}
async function fetchGpml(pathwayId) {
  if (!navigator.onLine) return "";
  const pathwayFile = `${pathwayId}.xml.gz`;
  const gpmlUrl = `https://cdn.jsdelivr.net/npm/ixn2/${pathwayFile}`;
  const response = await fetch(gpmlUrl);
  if (!response.ok) {
    console.log(`Gracefully degrading as request failed for: ${gpmlUrl}`);
    return "";
  }
  const blob = await response.blob();
  const uint8Array = new Uint8Array(await blob.arrayBuffer());
  const rawGpml = strFromU8(decompressSync(uint8Array));
  const gpml = new DOMParser().parseFromString(rawGpml, "text/xml");
  return gpml;
}
function fetchGpmls(ideo) {
  const pathwayIdsByInteractingGene = {};
  Object.entries(ideo.annotDescriptions.annots).forEach(([annotName, descObj]) => {
    if ("type" in descObj && descObj.type.includes("interacting gene")) {
      pathwayIdsByInteractingGene[annotName] = descObj.pathwayIds;
    }
  });
  const gpmlsByInteractingGene = {};
  Object.entries(pathwayIdsByInteractingGene).forEach(([ixnGene, pathwayIds]) => {
    gpmlsByInteractingGene[ixnGene] = {};
    pathwayIds.map(async (pathwayId) => {
      const gpml = await fetchGpml(pathwayId);
      gpmlsByInteractingGene[ixnGene][pathwayId] = gpml;
    });
  });
  ideo.gpmlsByInteractingGene = gpmlsByInteractingGene;
}
function parseInteractionGraphic(graphic, graphIds) {
  let interaction = null;
  const { searchedGeneGraphIds, matchingGraphIds } = graphIds;
  const endGraphRefs = [];
  let numMatchingPoints = 0;
  let isConnectedToSourceGene = false;
  let ixnType = null;
  let searchedGeneIndex = null;
  Array.from(graphic.children).forEach((child) => {
    if (child.nodeName !== "Point") return;
    const point2 = child;
    const graphRef = point2.getAttribute("GraphRef");
    if (graphRef === null) return;
    if (matchingGraphIds.includes(graphRef)) {
      numMatchingPoints += 1;
      endGraphRefs.push(graphRef);
      if (searchedGeneGraphIds.includes(graphRef)) {
        isConnectedToSourceGene = true;
      }
      if (point2.getAttribute("ArrowHead")) {
        const arrowHead = point2.getAttribute("ArrowHead");
        const isStart = searchedGeneGraphIds.includes(graphRef);
        if (searchedGeneIndex === null) {
          searchedGeneIndex = isStart ? 0 : 1;
        }
        try {
          ixnType = interactionArrowMap[arrowHead][isStart ? 0 : 1];
        } catch (e3) {
        }
      }
    }
  });
  if (numMatchingPoints >= 2 && isConnectedToSourceGene) {
    if (searchedGeneIndex === null || ixnType === null) {
      ixnType = "interacts with";
    }
    ixnType = ixnType[0].toUpperCase() + ixnType.slice(1);
    const interactionGraphId = graphic.parentNode.getAttribute("GraphId");
    interaction = {
      "interactionId": interactionGraphId,
      "endIds": endGraphRefs,
      ixnType
    };
  }
  return interaction;
}
function detailInteractions(interactingGene, searchedGene, gpml) {
  if (typeof gpml === "undefined" || gpml === "") {
    return [];
  }
  const [searchedGeneGraphIds, se] = getMatches(gpml, searchedGene);
  const [interactingGeneGraphIds, ie] = getMatches(gpml, interactingGene);
  const elements = {
    searchedGene: se,
    interactingGene: ie
  };
  const matchingGraphIds = searchedGeneGraphIds.concat(interactingGeneGraphIds);
  const graphIds = { searchedGeneGraphIds, matchingGraphIds };
  const interactions = [];
  const graphicsXml = gpml.querySelectorAll("Interaction Graphics");
  Array.from(graphicsXml).forEach((graphic) => {
    const interaction = parseInteractionGraphic(graphic, graphIds);
    if (interaction !== null) {
      interaction.elements = elements;
      interactions.push(interaction);
    }
  });
  return interactions;
}

// node_modules/fast-kde/src/accessor.js
function accessor(x, fallback) {
  return x == null ? fallback : typeof x === "function" ? x : (d) => d[x];
}

// node_modules/fast-kde/src/bin1d.js
function bin1d(data, x, weight, lo, hi, n2) {
  const grid = new Float64Array(n2);
  const delta = (n2 - 1) / (hi - lo);
  for (let i = 0; i < data.length; ++i) {
    const d = data[i];
    const xi = x(d, i, data);
    const wi = weight(d, i, data);
    if (!(Number.isFinite(xi) && Number.isFinite(wi))) {
      continue;
    }
    const p = (xi - lo) * delta;
    const u = Math.floor(p);
    const v = u + 1;
    if (0 <= u && v < n2) {
      grid[u] += (v - p) * wi;
      grid[v] += (p - u) * wi;
    } else if (u === -1) {
      grid[v] += (p - u) * wi;
    } else if (v === n2) {
      grid[u] += (v - p) * wi;
    }
  }
  return grid;
}

// node_modules/fast-kde/src/deriche.js
function dericheConfig(sigma, negative = false) {
  const a = new Float64Array(5);
  const bc = new Float64Array(4);
  dericheCausalCoeff(a, bc, sigma);
  const ba = Float64Array.of(
    0,
    bc[1] - a[1] * bc[0],
    bc[2] - a[2] * bc[0],
    bc[3] - a[3] * bc[0],
    -a[4] * bc[0]
  );
  const accum_denom = 1 + a[1] + a[2] + a[3] + a[4];
  const sum_causal = (bc[0] + bc[1] + bc[2] + bc[3]) / accum_denom;
  const sum_anticausal = (ba[1] + ba[2] + ba[3] + ba[4]) / accum_denom;
  return {
    sigma,
    negative,
    a,
    b_causal: bc,
    b_anticausal: ba,
    sum_causal,
    sum_anticausal
  };
}
function dericheCausalCoeff(a_out, b_out, sigma) {
  const K2 = 4;
  const alpha = Float64Array.of(
    0.84,
    1.8675,
    0.84,
    -1.8675,
    -0.34015,
    -0.1299,
    -0.34015,
    0.1299
  );
  const x1 = Math.exp(-1.783 / sigma);
  const x2 = Math.exp(-1.723 / sigma);
  const y1 = 0.6318 / sigma;
  const y2 = 1.997 / sigma;
  const beta = Float64Array.of(
    -x1 * Math.cos(y1),
    x1 * Math.sin(y1),
    -x1 * Math.cos(-y1),
    x1 * Math.sin(-y1),
    -x2 * Math.cos(y2),
    x2 * Math.sin(y2),
    -x2 * Math.cos(-y2),
    x2 * Math.sin(-y2)
  );
  const denom = sigma * 2.5066282746310007;
  const b = Float64Array.of(alpha[0], alpha[1], 0, 0, 0, 0, 0, 0);
  const a = Float64Array.of(1, 0, beta[0], beta[1], 0, 0, 0, 0, 0, 0);
  let j, k;
  for (k = 2; k < 8; k += 2) {
    b[k] = beta[k] * b[k - 2] - beta[k + 1] * b[k - 1];
    b[k + 1] = beta[k] * b[k - 1] + beta[k + 1] * b[k - 2];
    for (j = k - 2; j > 0; j -= 2) {
      b[j] += beta[k] * b[j - 2] - beta[k + 1] * b[j - 1];
      b[j + 1] += beta[k] * b[j - 1] + beta[k + 1] * b[j - 2];
    }
    for (j = 0; j <= k; j += 2) {
      b[j] += alpha[k] * a[j] - alpha[k + 1] * a[j + 1];
      b[j + 1] += alpha[k] * a[j + 1] + alpha[k + 1] * a[j];
    }
    a[k + 2] = beta[k] * a[k] - beta[k + 1] * a[k + 1];
    a[k + 3] = beta[k] * a[k + 1] + beta[k + 1] * a[k];
    for (j = k; j > 0; j -= 2) {
      a[j] += beta[k] * a[j - 2] - beta[k + 1] * a[j - 1];
      a[j + 1] += beta[k] * a[j - 1] + beta[k + 1] * a[j - 2];
    }
  }
  for (k = 0; k < K2; ++k) {
    j = k << 1;
    b_out[k] = b[j] / denom;
    a_out[k + 1] = a[j + 2];
  }
}
function dericheConv1d(c, src, N, stride = 1, y_causal = new Float64Array(N), y_anticausal = new Float64Array(N), h3 = new Float64Array(5), d = y_causal, init3 = dericheInitZeroPad) {
  const stride_2 = stride * 2;
  const stride_3 = stride * 3;
  const stride_4 = stride * 4;
  const stride_N = stride * N;
  let i, n2;
  init3(
    y_causal,
    src,
    N,
    stride,
    c.b_causal,
    3,
    c.a,
    4,
    c.sum_causal,
    h3,
    c.sigma
  );
  for (n2 = 4, i = stride_4; n2 < N; ++n2, i += stride) {
    y_causal[n2] = c.b_causal[0] * src[i] + c.b_causal[1] * src[i - stride] + c.b_causal[2] * src[i - stride_2] + c.b_causal[3] * src[i - stride_3] - c.a[1] * y_causal[n2 - 1] - c.a[2] * y_causal[n2 - 2] - c.a[3] * y_causal[n2 - 3] - c.a[4] * y_causal[n2 - 4];
  }
  init3(
    y_anticausal,
    src,
    N,
    -stride,
    c.b_anticausal,
    4,
    c.a,
    4,
    c.sum_anticausal,
    h3,
    c.sigma
  );
  for (n2 = 4, i = stride_N - stride * 5; n2 < N; ++n2, i -= stride) {
    y_anticausal[n2] = c.b_anticausal[1] * src[i + stride] + c.b_anticausal[2] * src[i + stride_2] + c.b_anticausal[3] * src[i + stride_3] + c.b_anticausal[4] * src[i + stride_4] - c.a[1] * y_anticausal[n2 - 1] - c.a[2] * y_anticausal[n2 - 2] - c.a[3] * y_anticausal[n2 - 3] - c.a[4] * y_anticausal[n2 - 4];
  }
  if (c.negative) {
    for (n2 = 0, i = 0; n2 < N; ++n2, i += stride) {
      d[i] = y_causal[n2] + y_anticausal[N - n2 - 1];
    }
  } else {
    for (n2 = 0, i = 0; n2 < N; ++n2, i += stride) {
      d[i] = Math.max(0, y_causal[n2] + y_anticausal[N - n2 - 1]);
    }
  }
  return d;
}
function dericheInitZeroPad(dest, src, N, stride, b, p, a, q, sum2, h3) {
  const stride_N = Math.abs(stride) * N;
  const off = stride < 0 ? stride_N + stride : 0;
  let i, n2, m;
  for (n2 = 0; n2 < q; ++n2) {
    h3[n2] = n2 <= p ? b[n2] : 0;
    for (m = 1; m <= q && m <= n2; ++m) {
      h3[n2] -= a[m] * h3[n2 - m];
    }
  }
  for (m = 0; m < q; ++m) {
    for (dest[m] = 0, n2 = 1; n2 <= m; ++n2) {
      i = off + stride * n2;
      if (i >= 0 && i < stride_N) {
        dest[m] += h3[m - n2] * src[i];
      }
    }
  }
  const cur = src[off];
  if (cur > 0) {
    for (m = 0; m < q; ++m) {
      dest[m] += h3[m] * cur;
    }
  }
  return;
}

// node_modules/fast-kde/src/extent.js
function extent(data, x, pad3 = 0) {
  const n2 = data.length;
  let lo;
  let hi;
  for (let i = 0; i < n2; ++i) {
    const v = x(data[i], i, data);
    if (v != null) {
      if (lo === void 0) {
        if (v >= v) lo = hi = v;
      } else {
        if (v < lo) lo = v;
        if (v > hi) hi = v;
      }
    }
  }
  return [lo - pad3, hi + pad3];
}

// node_modules/fast-kde/src/nrd.js
function nrd(data, x) {
  const values = data.map(x).filter((v2) => v2 != null && v2 >= v2);
  values.sort((a, b) => a - b);
  const sd = stdev(values);
  const q1 = quantile3(values, 0.25);
  const q3 = quantile3(values, 0.75);
  const n2 = values.length, h3 = (q3 - q1) / 1.34, v = Math.min(sd, h3) || sd || Math.abs(q1) || 1;
  return 1.06 * v * Math.pow(n2, -0.2);
}
function stdev(values) {
  const n2 = values.length;
  let count2 = 0;
  let delta;
  let mean2 = 0;
  let sum2 = 0;
  for (let i = 0; i < n2; ++i) {
    const value = values[i];
    delta = value - mean2;
    mean2 += delta / ++count2;
    sum2 += delta * (value - mean2);
  }
  return count2 > 1 ? Math.sqrt(sum2 / (count2 - 1)) : NaN;
}
function quantile3(values, p) {
  const n2 = values.length;
  if (!n2) return NaN;
  if ((p = +p) <= 0 || n2 < 2) return values[0];
  if (p >= 1) return values[n2 - 1];
  const i = (n2 - 1) * p;
  const i0 = Math.floor(i);
  const v0 = values[i0];
  return v0 + (values[i0 + 1] - v0) * (i - i0);
}

// node_modules/fast-kde/src/density1d.js
function density1d(data, options = {}) {
  const { adjust = 1, pad: pad3 = 3, bins = 512 } = options;
  const x = accessor(options.x, (x2) => x2);
  const w = accessor(options.weight, () => 1 / data.length);
  let bandwidth = options.bandwidth ?? adjust * nrd(data, x);
  const [lo, hi] = options.extent ?? extent(data, x, pad3 * bandwidth);
  const grid = bin1d(data, x, w, lo, hi, bins);
  const delta = (hi - lo) / (bins - 1);
  const neg = grid.some((v) => v < 0);
  let config2 = dericheConfig(bandwidth / delta, neg);
  let result;
  function* points(x2 = "x", y2 = "y") {
    const result2 = estimator.grid();
    const scale = 1 / delta;
    for (let i = 0; i < bins; ++i) {
      yield {
        [x2]: lo + i * delta,
        [y2]: result2[i] * scale
      };
    }
  }
  const estimator = {
    [Symbol.iterator]: points,
    points,
    grid: () => result || (result = dericheConv1d(config2, grid, bins)),
    extent: () => [lo, hi],
    bandwidth(_2) {
      if (arguments.length) {
        if (_2 !== bandwidth) {
          bandwidth = _2;
          result = null;
          config2 = dericheConfig(bandwidth / delta, neg);
        }
        return estimator;
      } else {
        return bandwidth;
      }
    }
  };
  return estimator;
}

// node_modules/ideogram/src/js/kit/tissue.js
var MINI_CURVE_HEIGHT = 12;
var MINI_CURVE_WIDTH = 48;
function refineTissueName(rawName) {
  let name2 = rawName.replace(/_/g, " ").toLowerCase();
  [
    "ba24",
    "ba9",
    "basal ganglia",
    "omentum",
    "suprapubic",
    "lower leg",
    "cervical c-1"
  ].forEach((term) => name2 = name2.replace(term, "(" + term + ")"));
  ["ba24", "ba9", "ebv"].forEach((term) => {
    name2 = name2.replace(term, term.toUpperCase());
  });
  [
    "adipose",
    "artery",
    "brain",
    "breast",
    "cells",
    "cervix",
    "colon",
    "heart",
    "kidney",
    "muscle",
    "nerve",
    "skin",
    "small intestine"
  ].forEach((term) => {
    name2 = name2.replace(term, term + " -");
  });
  name2 = name2.replace("basal ganglia", "BG");
  name2 = name2[0].toUpperCase() + name2.slice(1);
  return name2;
}
function getMaxExpression(tissueExpressions, refTissue) {
  let maxExpression = 0;
  for (let i = 0; i < tissueExpressions.length; i++) {
    const teObject = tissueExpressions[i];
    const thisMaxExp = teObject.expression.max;
    if (!refTissue) {
      if (thisMaxExp > maxExpression) {
        maxExpression = thisMaxExp;
      }
    } else {
      if (teObject.tissue === refTissue) {
        maxExpression = thisMaxExp;
        break;
      }
    }
  }
  return maxExpression;
}
function setPxOffset(tissueExpressions, maxPx, relative = true, leftPx = 0, refTissue = null) {
  const maxExpression = getMaxExpression(tissueExpressions, refTissue);
  let refMinExp = 0;
  if (refTissue) {
    const refTeObject = tissueExpressions.find((teObject) => teObject.tissue === refTissue);
    refMinExp = refTeObject.expression.min;
  }
  const metrics = ["max", "q3", "median", "q1", "min"];
  tissueExpressions.map((teObject) => {
    teObject.px = {};
    if (relative) {
      for (let i = 0; i < metrics.length; i++) {
        const metric = metrics[i];
        const exp = teObject.expression[metric];
        let px = maxPx * (exp - refMinExp) / (maxExpression - refMinExp) + leftPx;
        if (Math.round(px) > maxPx) {
          teObject.px[metric + "Raw"] = px;
          px += maxPx - px;
        }
        px += leftPx;
        teObject.px[metric] = px;
      }
    } else {
      const minExp = teObject.expression.min;
      const maxExp = teObject.expression.max;
      for (let i = 0; i < metrics.length; i++) {
        const metric = metrics[i];
        const exp = teObject.expression[metric];
        const px = maxPx * (exp - minExp) / (maxExp - minExp) + leftPx;
        teObject.px[metric] = px;
      }
    }
    return teObject;
  });
  return tissueExpressions;
}
function getFullDetail(gene) {
  const gtexUrl = `https://www.gtexportal.org/home/gene/${gene}`;
  const cls = 'class="_ideoGtexLink"';
  const gtexLink = `<a href="${gtexUrl}" ${cls} target="_blank">GTEx</a>`;
  const fullDetail = `<i>Full detail: ${gtexLink}</i>`;
  return fullDetail;
}
function getMoreOrLessToggle(gene, height, tissueExpressions, ideo) {
  const fullDetail = getFullDetail(gene);
  if (tissueExpressions.length <= 3) {
    return `<br/>${fullDetail}<br/><br/>`;
  }
  const pipeStyle = 'style="margin: 0 6px; color: #CCC;"';
  const details = `<span ${pipeStyle}>|</span>${fullDetail}`;
  const moreOrLess = !ideo.showTissuesMore ? `Less...` : "More...";
  const mlStyle = 'style="cursor: pointer;px;"';
  const left2 = `left: ${!ideo.showTissuesMore ? 1 : -50}px;`;
  const top2 = "top: -1px;";
  const mltStyle = `style="position: relative; ${left2} ${top2} font-size: ${height}px"`;
  const moreOrLessToggleHtml = `<div ${mltStyle}><a class="_ideoMoreOrLessTissue" ${mlStyle}>${moreOrLess}</a>${!ideo.showTissuesMore ? details : ""}</div>`;
  return moreOrLessToggleHtml;
}
function getMetricLineAttrs(offsets, metric, y2, height, isShifted = false) {
  let x = offsets[metric];
  let isTruncated = false;
  if (isShifted && x > MINI_CURVE_WIDTH) {
    x = MINI_CURVE_WIDTH + 1;
    isTruncated = true;
  }
  let metricHeight = !isTruncated ? offsets[metric + "Height"] : MINI_CURVE_HEIGHT;
  if (isNaN(metricHeight)) {
    metricHeight = MINI_CURVE_HEIGHT;
  }
  const top2 = height - metricHeight;
  const y1 = top2 + y2 + 0.5;
  const y22 = top2 + y2 + metricHeight;
  const isNarrow = offsets.max - offsets.min <= 8;
  const isMedian = metric === "median";
  const isNarrowMedian = isNarrow && isMedian;
  const style2 = isNarrowMedian ? "display: none" : "";
  const isTruncatedMedian = isTruncated && isMedian;
  const endStyle = isTruncatedMedian || isNarrowMedian ? "display: none;" : "";
  return { x, y1, y2: y22, style: style2, endStyle };
}
function getMetricLine(metric, offsets, color2, y2, height, dash = false) {
  const classMetric = metric[0].toUpperCase() + metric.slice(1);
  const { x, y1, y2: y22, style: style2 } = getMetricLineAttrs(offsets, metric, y2, height);
  const styleAttr = style2 === "" ? "" : `style="${style2}"`;
  const baseColor = adjustBrightness(color2, 0.55);
  const strokeColor = ensureContrast(baseColor, color2);
  const dasharray = dash ? 'stroke-dasharray="3" ' : "";
  const attrs = `x1="${x}" y1="${y1}" x2="${x}" y2="${y22}" ${styleAttr} ` + dasharray + `class="_ideoExpression${classMetric}" `;
  const metricLine = `<line stroke="${strokeColor}" ${attrs} />`;
  return metricLine;
}
function getMetricLines(offsets, y2, height, color2) {
  const medianLine = getMetricLine("median", offsets, color2, y2, height, false);
  const q1Line = getMetricLine("q1", offsets, color2, y2, height, true);
  const q3Line = getMetricLine("q3", offsets, color2, y2, height, true);
  return [medianLine, q1Line, q3Line];
}
function getCurveShape(teObject, y2, height, numKdeBins = 64, isShifted = false) {
  const quantiles = teObject.expression.quantiles;
  const offsets = teObject.px;
  const samples = teObject.samples;
  const spreadQuantiles = [];
  quantiles.map((quantileCount, j) => {
    for (let k = 0; k < quantileCount; k++) {
      spreadQuantiles.push(j);
    }
  });
  const sampleThreshold = 70;
  const bandwidth = samples >= sampleThreshold ? 0.7 : 1.5;
  const numBins = numKdeBins;
  const kde = density1d(
    spreadQuantiles,
    { bins: numBins, bandwidth }
  );
  const rawKdeArray = Array.from(kde);
  const kdeArray = rawKdeArray.filter((point2) => 0 <= point2.x && point2.x <= 10);
  if (kdeArray.length === 0) return "";
  const maxKernelY = Math.max(...kdeArray.map((p) => p.y));
  const minKernelX = kdeArray[0].x;
  const maxKernelX = kdeArray.slice(-1)[0].x;
  const kdeWidth = maxKernelX - minKernelX;
  const thisMax = "maxRaw" in offsets ? offsets.maxRaw : offsets.max;
  const offsetsWidth = thisMax - offsets.min;
  const pixelsPerKernel = offsetsWidth / kdeWidth;
  const bottom2 = height + y2;
  let prevPixelX = 0;
  const rawPoints = kdeArray.map((point2, i) => {
    let pixelX = (point2.x - minKernelX) * pixelsPerKernel + offsets.min;
    if (isShifted && pixelX > MINI_CURVE_WIDTH) {
      pixelX = MINI_CURVE_WIDTH;
    }
    const segmentHeight = height * (point2.y / maxKernelY);
    const pixelY = bottom2 - segmentHeight;
    if (i > 0) {
      ["q1", "median", "q3"].forEach((metric) => {
        const metricX = offsets[metric];
        if (prevPixelX < metricX && metricX <= pixelX) {
          offsets[metric + "Height"] = segmentHeight;
        }
      });
    }
    prevPixelX = pixelX;
    return `${pixelX},${pixelY}`;
  });
  let refinedMax = offsets.max;
  let refinedMin = offsets.min;
  if (isShifted) {
    if (offsets.max > MINI_CURVE_WIDTH) refinedMax = MINI_CURVE_WIDTH;
    if (offsets.min > MINI_CURVE_WIDTH) refinedMin = MINI_CURVE_WIDTH;
  }
  rawPoints.push(refinedMax + "," + bottom2);
  rawPoints.push(refinedMin + "," + bottom2);
  const originPoint = rawPoints[0];
  rawPoints.push(originPoint);
  const points = rawPoints.join(" ");
  return [points, offsets];
}
function getCurve(teObject, y2, height, color2, borderColor, numKdeBins = 64) {
  const [points, offsets] = getCurveShape(teObject, y2, height, numKdeBins);
  const curveAttrs = `fill="${color2}" stroke="${borderColor}" points="${points}" class="tissue-curve" data-tissue-curve="${teObject.tissue}"`;
  const curve = `<polyline ${curveAttrs} />`;
  return [curve, offsets];
}
function removeDetailedCurve() {
  const container = document.querySelector("._ideoDistributionContainer");
  if (!container) return;
  container.remove();
  const structureDom = document.querySelector("._ideoGeneStructureContainer");
  if (structureDom) {
    structureDom.style.display = "";
  }
  const footer = document.querySelector("._ideoTooltipFooter");
  footer.style.display = "";
}
function getMetricTicks(teObject, height) {
  const min4 = teObject.px.min;
  const minExp = teObject.expression.min;
  const max5 = teObject.px.max;
  const maxExp = teObject.expression.max;
  const median = teObject.px.median;
  const medianExp = teObject.expression.median;
  const mid = max5 / 2;
  const y2 = height + 5;
  const stroke = `stroke="#CCC" stroke-width="1px"`;
  const fontObject = {
    config: { weight: 400, annotLabelSize: 12 }
  };
  const textY = y2 + 16;
  const expTextY = y2 + 27;
  const tickY1 = y2 - 3;
  const tickY2 = y2 + 5;
  const maxRawText = "Max";
  const maxTextWidth = getTextSize(maxRawText, fontObject).width;
  const maxExpTextWidth = getTextSize(maxExp, fontObject).width;
  const maxTextX = max5 - maxTextWidth / 2;
  const maxExpTextX = max5 - maxExpTextWidth / 2;
  const maxTickAttrs = `x1="${max5}" x2="${max5}" y1="${tickY1}" y2="${tickY2}" ${stroke}`;
  const maxText = `<line ${maxTickAttrs} /><text x="${maxTextX}" y="${textY}">${maxRawText}.</text><text x="${maxExpTextX}" y="${expTextY}">${maxExp}</text>`;
  const minRawText = "Min";
  const minTextWidth = getTextSize(minRawText, fontObject).width;
  const minExpTextWidth = getTextSize(minExp, fontObject).width;
  let minTextX = min4 - minTextWidth / 2;
  let minExpTextX = min4 - minExpTextWidth / 2;
  const minTextEndX = min4 + minTextWidth;
  const minTickAttrs = `x1="${min4}" x2="${min4}" y1="${tickY1}" y2="${tickY2}" ${stroke}`;
  const medianRawText = "Median";
  const medianTextWidth = getTextSize(medianRawText, fontObject).width;
  const medianExpTextWidth = getTextSize(medianExp, fontObject).width;
  const medianTextX = median - medianTextWidth / 2;
  const medianExpTextX = median - medianExpTextWidth / 2;
  const medianTickAttrs = `x1="${median}" x2="${median}" y1="${tickY1}" y2="${tickY2}" ${stroke}`;
  let medianX = medianTextX;
  let medianExpX = medianExpTextX;
  const isMinMedSoftCollide = minTextEndX >= medianX;
  if (isMinMedSoftCollide) {
    medianX = median;
    medianExpX = median;
  }
  const isMinMedCollide = minTextEndX >= medianX;
  if (isMinMedCollide) {
    medianX += 1.5;
    medianExpX += 1.5;
    minTextX = min4 - minTextWidth - 1.5;
    minExpTextX = min4 - minExpTextWidth - 1.5;
  }
  const medianText = `<line ${medianTickAttrs} /><text x="${medianX}" y="${textY}">Median</text><text x="${medianExpX}" y="${expTextY}">${medianExp}</text>`;
  const minText = `<line ${minTickAttrs} /><text x="${minTextX}" y="${textY}" >${minRawText}.</text><text x="${minExpTextX}" y="${expTextY}" >${minExp}</text>`;
  const nameAttrs = `x="${mid - 40}" y="${y2 + 46}"`;
  const sampleAttrs = `x="${mid - 70}" y="${y2 + 59}"`;
  return `<g>` + minText + maxText + medianText + `<text ${nameAttrs}>Expression (TPM)</text><text ${sampleAttrs}>Samples: ${teObject.samples} | Source: GTEx</text></g>`;
}
function addDetailedCurve(traceDom, ideo) {
  const gene = traceDom.getAttribute("data-gene");
  const tissue = traceDom.getAttribute("data-tissue");
  const tissueExpressions = Ideogram.tissueExpressionsByGene[gene];
  let teObject = tissueExpressions.find((t4) => t4.tissue === tissue);
  const maxWidthPx = 225;
  const leftPx = 35;
  teObject = setPxOffset(
    [teObject],
    maxWidthPx,
    false,
    leftPx
  )[0];
  const y2 = 0;
  const height = 50;
  const color2 = `#${teObject.color}`;
  const borderColor = adjustBrightness(color2, 0.85);
  const numBins = 256;
  const [distributionCurve, offsetsWithHeight] = getCurve(
    teObject,
    y2 + 1,
    height,
    color2,
    borderColor,
    numBins
  );
  const [medianLine, q1Line, q3Line] = getMetricLines(
    offsetsWithHeight,
    y2,
    height,
    color2
  );
  const metricTicks = getMetricTicks(teObject, height);
  let ledgeDom;
  const structureDom = document.querySelector("._ideoGeneStructureContainer");
  const footer = document.querySelector("._ideoTooltipFooter");
  if (structureDom) {
    ledgeDom = structureDom;
    structureDom.style.display = "none";
    footer.style.display = "none";
  } else {
    ledgeDom = footer;
    const plotContainer = document.querySelector("._ideoTissuePlotContainer");
    plotContainer.setAttribute("style", "margin-bottom: 20px");
  }
  const svgHeight = 119.5;
  const style2 = `style="position: relative; height: ${svgHeight}px"`;
  const svgStyle = 'style="position: absolute; top: 2px; left: -5px;"';
  const container = `<div class="_ideoDistributionContainer" ${style2}><svg width="280px" height="${svgHeight}px" ${svgStyle}>` + metricTicks + distributionCurve + medianLine + q1Line + q3Line + `</svg></div>`;
  ledgeDom.insertAdjacentHTML("beforebegin", container);
}
function getMiniCurveY(i, height) {
  const y2 = 1 + i * (height + 2);
  return y2;
}
function getExpressionPlotHtml(gene, tissueExpressions, ideo) {
  const maxWidth = MINI_CURVE_WIDTH;
  tissueExpressions = setPxOffset(tissueExpressions, maxWidth, true, 0);
  const height = MINI_CURVE_HEIGHT;
  const moreOrLessToggleHtml = getMoreOrLessToggle(gene, height, tissueExpressions, ideo);
  const numTissues = !ideo.showTissuesMore ? 10 : 3;
  let y2;
  const rects = tissueExpressions.slice(0, numTissues).map((teObject, i) => {
    y2 = getMiniCurveY(i, height);
    const tissue = refineTissueName(teObject.tissue);
    const color2 = `#${teObject.color}`;
    const borderColor = adjustBrightness(color2, 0.85);
    const [distributionCurve, offsetsWithHeight] = getCurve(
      teObject,
      y2,
      height,
      color2,
      borderColor
    );
    const [medianLine] = getMetricLines(offsetsWithHeight, y2, height, color2);
    const dataTissue = `data-tissue="${teObject.tissue}"`;
    const containerAttrs = `height="${height + 2}" width="${maxWidth}px" fill="#FFF" opacity="0" x="0" y="${y2}" data-gene="${gene}" ` + dataTissue;
    const textAttrs = `y="${y2 + height}" style="font-size: ${height}px;" x="${maxWidth + 10}" ` + dataTissue;
    return `<g data-group-tissue="${teObject.tissue}"><text ${textAttrs}>${tissue}</text>` + distributionCurve + medianLine + `<rect ${containerAttrs} class="_ideoExpressionTrace" /></g>`;
  }).join("");
  let containerStyle = 'style="margin-bottom: 30px;"';
  const hasStructure = gene in Ideogram.geneStructureCache;
  if (!hasStructure) {
    containerStyle = 'style="margin-bottom: 10px;"';
  }
  const plotAttrs = `style="margin-top: 15px; margin-bottom: -15px;"`;
  const cls = 'class="_ideoTissuePlotTitle"';
  const titleAttrs = `${cls} style="margin-bottom: 4px;"`;
  const style2 = `style="position: relative; left: 10px"`;
  const plotHtml = `<div class="_ideoTissuePlotContainer" ${containerStyle}><div class="_ideoTissueExpressionPlot" ${plotAttrs}>
        <div ${titleAttrs}>Reference expression by tissue</div>
        <svg width="275" height="${y2 + height + 2}" ${style2}>${rects}</svg>
        ${moreOrLessToggleHtml}
      </div></div>`;
  return plotHtml;
}
function updateTissueExpressionPlot(ideo) {
  const plot = document.querySelector("._ideoTissueExpressionPlot");
  const plotParent = plot.parentElement;
  const gene = document.querySelector("#ideo-related-gene").innerText;
  const tissueExpressions = Ideogram.tissueExpressionsByGene[gene];
  const newPlotHtml = getExpressionPlotHtml(gene, tissueExpressions, ideo);
  plotParent.innerHTML = newPlotHtml;
  addTissueListeners(ideo);
}
function colorTissueText(traceDom, color2) {
  const tissue = traceDom.getAttribute("data-tissue");
  const tissueTextDom = document.querySelector(`text[data-tissue="${tissue}"]`);
  tissueTextDom.setAttribute("fill", color2);
}
function addTissueListeners(ideo) {
  const moreOrLess = document.querySelector("._ideoMoreOrLessTissue");
  if (moreOrLess) {
    moreOrLess.addEventListener("click", (event) => {
      event.stopPropagation();
      event.preventDefault();
      ideo.showTissuesMore = !ideo.showTissuesMore;
      updateTissueExpressionPlot(ideo);
    });
  }
  const traces = document.querySelectorAll("._ideoExpressionTrace");
  traces.forEach((trace) => {
    trace.addEventListener("mouseenter", () => {
      colorTissueText(trace, "#338");
      focusMiniCurve(trace, ideo);
      addDetailedCurve(trace, ideo);
    });
    trace.addEventListener("mouseleave", () => {
      colorTissueText(trace, "#000");
      focusMiniCurve(traces[0], ideo, true);
      removeDetailedCurve(trace, ideo);
    });
  });
}
function focusMiniCurve(traceDom, ideo, reset = false) {
  const gene = traceDom.getAttribute("data-gene");
  const refTissue = reset ? null : traceDom.getAttribute("data-tissue");
  const numTissues = !ideo.showTissuesMore ? 10 : 3;
  let tissueExpressions = Ideogram.tissueExpressionsByGene[gene];
  const maxPx = MINI_CURVE_WIDTH;
  const relative = true;
  const leftPx = 0;
  tissueExpressions = setPxOffset(tissueExpressions, maxPx, relative, leftPx, refTissue).slice(0, numTissues);
  const height = MINI_CURVE_HEIGHT;
  tissueExpressions.forEach((teObject, i) => {
    const thisTissue = teObject.tissue;
    const thisTeObject = tissueExpressions.find((te2) => te2.tissue === thisTissue);
    const y2 = getMiniCurveY(i, height);
    const isShifted = !reset;
    const [newPoints, newOffsets] = getCurveShape(thisTeObject, y2, height, 64, isShifted);
    tissueExpressions[i].points = newPoints;
    const medianLineAttrs = getMetricLineAttrs(newOffsets, "median", y2, height, isShifted);
    tissueExpressions[i].medianLine = medianLineAttrs;
  });
  d3.select("._ideoTissueExpressionPlot").selectAll("polyline").data(tissueExpressions).transition().duration(500).attr("points", (_2, i) => tissueExpressions[i].points);
  d3.select("._ideoTissueExpressionPlot").selectAll("._ideoExpressionMedian").data(tissueExpressions).attr("style", (_2, i) => tissueExpressions[i].medianLine.style).transition().duration(500).attr("x1", (_2, i) => tissueExpressions[i].medianLine.x).attr("x2", (_2, i) => tissueExpressions[i].medianLine.x).attr("y1", (_2, i) => tissueExpressions[i].medianLine.y1).attr("y2", (_2, i) => tissueExpressions[i].medianLine.y2).attr("style", (_2, i) => tissueExpressions[i].medianLine.endStyle);
}
function getTissueHtml(annot, ideo) {
  if (!Ideogram.tissueCache || !(annot.name in Ideogram.tissueCache.byteRangesByName)) {
    return "<br/>";
  }
  if (ideo.showTissuesMore === void 0) {
    ideo.showTissuesMore = true;
  }
  const gene = annot.name;
  const tissueExpressions = Ideogram.tissueExpressionsByGene[gene];
  if (!tissueExpressions) return;
  const tissueHtml = getExpressionPlotHtml(gene, tissueExpressions, ideo);
  return tissueHtml;
}

// node_modules/ideogram/src/js/kit/related-genes.js
function setRelatedAnnotDomIds(ideo) {
  const updated = [];
  const sortedChrNames = ideo.chromosomesArray.map((chr) => {
    return chr.name;
  });
  if ("relatedAnnots" in ideo) {
    ideo.relatedAnnots = applyAnnotsIncludeList(ideo.relatedAnnots, ideo);
    const seenNames = {};
    ideo.relatedAnnots = ideo.relatedAnnots.filter((annot) => {
      if (annot.name in seenNames) {
        return false;
      }
      seenNames[annot.name] = 1;
      return true;
    });
  }
  const annotsByChr = {};
  ideo.annots.forEach((annot) => {
    const relevanceSortedAnnots = annot.annots.sort((a, b) => {
      return -ideo.annotSortFunction(a, b);
    });
    annotsByChr[annot.chr] = relevanceSortedAnnots;
  });
  const updatedAnnots = {};
  Object.entries(annotsByChr).forEach(([chr, annots]) => {
    updatedAnnots[chr] = { chr, annots: [] };
    annots.forEach((annot, annotIndex) => {
      const chrIndex = sortedChrNames.indexOf(chr);
      annot.domId = getAnnotDomId(chrIndex, annotIndex);
      updatedAnnots[chr].annots.push(annot);
    });
    updated.push(updatedAnnots[chr]);
  });
  ideo.annots = updated;
}
function maybeGeneSymbol(ixn, gene) {
  return ixn !== "" && !ixn.includes(" ") && !ixn.includes("/") && // e.g. Akt/PKB
  ixn.toLowerCase() !== gene.name.toLowerCase();
}
function isInteractionRelevant(rawIxn, gene, nameId, seenNameIds, ideo) {
  let isGeneSymbol;
  if ("geneCache" in Ideogram && gene.name) {
    isGeneSymbol = rawIxn.toLowerCase() in Ideogram.geneCache.nameCaseMap;
  } else {
    isGeneSymbol = maybeGeneSymbol(rawIxn, gene);
  }
  const isNewNameId = !(nameId in seenNameIds);
  return isGeneSymbol && isNewNameId;
}
async function fetchInteractions(gene, ideo) {
  const ixns = {};
  const seenNameIds = {};
  const orgNameSimple = ideo.config.organism.replace(/-/g, " ");
  const upperGene = gene.name.toUpperCase();
  let data = { result: [] };
  if (Ideogram.interactionCache) {
    if (upperGene in Ideogram.interactionCache) {
      data = Ideogram.interactionCache[upperGene];
    }
  } else {
    const url = `https://cdn.jsdelivr.net/npm/ixn2/${upperGene}.json.gz`;
    const response = await fetch(url);
    if (response.ok) {
      const blob = await response.blob();
      const uint8Array = new Uint8Array(await blob.arrayBuffer());
      data = JSON.parse(strFromU8(decompressSync(uint8Array)));
    }
  }
  data.result.forEach((interaction) => {
    if (interaction.species.toLowerCase() === orgNameSimple) {
      const right2 = interaction.fields.right.values;
      const left2 = interaction.fields.left.values;
      const rawIxns = right2.concat(left2);
      const name2 = interaction.name;
      const id2 = interaction.id;
      const wrappedRawIxns = rawIxns.map((rawIxn) => {
        return { name: rawIxn, color: "" };
      });
      const sortedRawIxns = sortAnnotsByRank(wrappedRawIxns, ideo).map((i) => i.name);
      sortedRawIxns.forEach((rawIxn) => {
        const normRawIxn = rawIxn.toLowerCase();
        if (normRawIxn.includes(gene.name.toLowerCase())) return;
        const nameId = name2 + id2 + normRawIxn;
        const isRelevant = isInteractionRelevant(normRawIxn, gene, nameId, seenNameIds, ideo);
        if (isRelevant) {
          seenNameIds[nameId] = 1;
          const ixn = { name: name2, pathwayId: id2 };
          if (normRawIxn in ixns) {
            ixns[normRawIxn].push(ixn);
          } else {
            ixns[normRawIxn] = [ixn];
          }
        }
      });
    }
  });
  const limitIxns = 20;
  const ixnEntries = Object.entries(ixns);
  const numIxns = ixnEntries.length;
  let filteredIxns = {};
  if (numIxns > limitIxns) {
    const ranks = Ideogram.geneCache.interestingNames.map((g) => g.toLowerCase());
    const ixnGenes = Object.keys(ixns);
    const rankedIxnGenes = ixnGenes.map((gene2) => {
      let rank = 1e10;
      if (ranks.includes(gene2)) {
        rank = ranks.indexOf(gene2) + 1;
      }
      return [gene2, rank];
    }).filter(([gene2, _rank]) => gene2 in ixns).sort((a, b) => a[1] - b[1]);
    rankedIxnGenes.slice(0, limitIxns).forEach(([gene2, _rank]) => filteredIxns[gene2] = ixns[gene2]);
  } else {
    filteredIxns = ixns;
  }
  return filteredIxns;
}
async function fetchMyGeneInfo(queryString) {
  const myGeneBase = "https://mygene.info/v3/query";
  const response = await fetch(myGeneBase + queryString + "&size=400");
  const data = await response.json();
  return data;
}
function parseNameAndEnsemblIdFromMgiGene(gene) {
  const name2 = gene.name;
  const id2 = gene.genomic_pos.ensemblgene;
  let ensemblId = id2;
  if (typeof id2 === "undefined") {
    ensemblId = gene.genomic_pos.filter((pos) => !pos.chr.includes("_"))[0].ensemblgene;
  }
  return { name: name2, ensemblId };
}
function describeInteractions(gene, ixns, searchedGene) {
  const pathwayIds = [];
  const pathwayNames = [];
  let ixnsDescription = "";
  if (typeof ixns !== "undefined") {
    let links = ixns.map((ixn) => {
      const pathwaysBase = "https://classic.wikipathways.org/index.php/Pathway:";
      const url = `${pathwaysBase}${ixn.pathwayId}`;
      pathwayIds.push(ixn.pathwayId);
      pathwayNames.push(ixn.name);
      const attrs = `class="ideo-pathway-link" style="cursor: pointer" title="View pathway diagram from WikiPathways" data-pathway-id="${ixn.pathwayId}"`;
      return `<a ${attrs}>${ixn.name}</a>`;
    });
    links = links.join("<br/>");
    ixnsDescription = `Interacts with ${searchedGene.name} in:<br/>${links}`;
  }
  const { name: name2, ensemblId } = parseNameAndEnsemblIdFromMgiGene(gene);
  const type2 = "interacting gene";
  const descriptionObj = {
    description: ixnsDescription,
    ixnsDescription,
    ensemblId,
    name: name2,
    type: type2,
    pathwayIds,
    pathwayNames
  };
  return descriptionObj;
}
function throwGeneNotFound(geneSymbol, ideo) {
  const organism = ideo.organismScientificName;
  throw Error(`"${geneSymbol}" is not a known gene in ${organism}`);
}
function getGeneBySynonym(name2, ideo) {
  var _a2;
  if (!Ideogram.synonymCache) return null;
  const nameLc = name2.toLowerCase();
  if (!((_a2 = Ideogram.synonymCache) == null ? void 0 : _a2.nameCaseMap)) {
    const nameCaseMap2 = {};
    for (const gene in Ideogram.synonymCache.byGene) {
      const synonyms = Ideogram.synonymCache.byGene[gene];
      nameCaseMap2[gene.toLowerCase()] = synonyms.map((s) => s.toLowerCase());
    }
    Ideogram.synonymCache.nameCaseMap = nameCaseMap2;
  }
  const nameCaseMap = Ideogram.synonymCache.nameCaseMap;
  for (const geneLc in nameCaseMap) {
    const synonymsLc = nameCaseMap[geneLc];
    if (synonymsLc.includes(nameLc)) {
      return Ideogram.geneCache.nameCaseMap[geneLc];
    }
  }
  return null;
}
function fetchGenesFromCache(names, type2, ideo) {
  const cache = Ideogram.geneCache;
  const isSymbol = type2 === "symbol";
  const locusMap = isSymbol ? cache.lociByName : cache.lociById;
  const nameMap = isSymbol ? cache.idsByName : cache.namesById;
  const ensemblGeneIdRegex = /ENS[A-Z]{0,3}G\d{11}/;
  const hits = names.map((name2) => {
    let isSynonym = false;
    let synonym = null;
    if (ensemblGeneIdRegex.test(name2)) {
      name2 = name2.split(".")[0];
    }
    const isIdentifier = name2 in cache.namesById;
    if (isIdentifier && isSymbol) {
      name2 = cache.namesById[name2];
    } else {
      const nameLc = name2.toLowerCase();
      if (!locusMap[name2] && !cache.nameCaseMap[nameLc] && !getGeneBySynonym(name2, ideo)) {
        if (isSymbol) {
          throwGeneNotFound(name2, ideo);
        } else {
          return;
        }
      }
      if (isSymbol && !locusMap[name2]) {
        if (cache.nameCaseMap[nameLc]) {
          name2 = cache.nameCaseMap[nameLc];
        } else {
          synonym = name2;
          name2 = getGeneBySynonym(synonym, ideo);
          isSynonym = true;
        }
      }
    }
    const locus = locusMap[name2];
    const symbol = isSymbol ? name2 : nameMap[name2];
    const ensemblId = isSymbol ? nameMap[name2] : name2;
    const fullName = cache.fullNamesById[ensemblId];
    const hit = {
      symbol,
      name: fullName,
      source: "cache",
      genomic_pos: {
        chr: locus[0],
        start: locus[1],
        end: locus[2],
        ensemblgene: ensemblId
      },
      isSynonym,
      isIdentifier,
      synonym
    };
    return hit;
  });
  const hitsWithGenomicPos = hits.filter((hit) => hit !== void 0);
  return hitsWithGenomicPos;
}
function wait(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}
function exponentialBackoffWithJitter(numFailures, baseWaitMs) {
  const jitter = 10 * Math.random();
  return Math.round(baseWaitMs + jitter) * numFailures ** 2;
}
async function retryFetch(requestedThing, numLimit, fn2, args) {
  const numFailed = numFailedFetches[requestedThing];
  if (numFailed > numLimit) {
    const preamble = "Failed to fetch from Ideogram third-party service for: ";
    throw new TypeError(preamble + requestedThing);
  }
  numFailedFetches[requestedThing] += 1;
  const baseWaitMs = 500;
  const waitMilliseconds = exponentialBackoffWithJitter(numFailed, baseWaitMs);
  console.log(
    `Failed fetch for ${requestedThing} ${numFailed} times, retrying in ${waitMilliseconds} ms`
  );
  await wait(waitMilliseconds);
  return await fn2(...args);
}
var numFailedFetches = {
  genes: 0
};
async function fetchGenes(names, type2, ideo) {
  let data;
  if (typeof names === "string") names = [names];
  const qParam = names.map((name2) => `${type2}:${name2.trim()}`).join(" OR ");
  const taxid = ideo.config.taxid;
  const queryStringBase = `?q=${qParam}&species=${taxid}&fields=`;
  if (Ideogram.geneCache) {
    const hits = fetchGenesFromCache(names, type2, ideo);
    hits.forEach((hit) => {
      const symbol = hit.symbol;
      const fullName = hit.name;
      const isSynonym = hit.isSynonym;
      const synonym = hit.synonym;
      if (symbol in ideo.annotDescriptions.annots) {
        ideo.annotDescriptions.annots[symbol].name = fullName;
        ideo.annotDescriptions.annots[symbol].isSynonym = hit.isSynonym;
        ideo.annotDescriptions.annots[symbol].synonym = hit.synonym;
      } else {
        ideo.annotDescriptions.annots[symbol] = {
          name: fullName,
          isSynonym,
          synonym
        };
      }
    });
    data = { hits, fromGeneCache: true };
  } else {
    const queryString = `${queryStringBase}symbol,genomic_pos,name`;
    try {
      data = await fetchMyGeneInfo(queryString);
    } catch (error) {
      const isFailedFetch = error.message === "Failed to fetch";
      if (isFailedFetch && navigator.onLine) {
        data = await retryFetch("genes", 3, fetchGenes, [names, type2, ideo]);
      }
    }
  }
  return data;
}
async function fetchInteractionAnnots(interactions, searchedGene, ideo) {
  const annots = [];
  const symbols = Object.keys(interactions);
  if (symbols.length === 0) return annots;
  const data = await fetchGenes(symbols, "symbol", ideo);
  data.hits.forEach((gene) => {
    if ("genomic_pos" in gene === false || gene.symbol === searchedGene.name) {
      return;
    }
    const annot = parseAnnotFromMgiGene(gene, ideo, "purple");
    annots.push(annot);
    const ixns = interactions[gene.symbol.toLowerCase()];
    const descriptionObj = describeInteractions(gene, ixns, searchedGene);
    mergeDescriptions(annot, descriptionObj, ideo);
  });
  fetchGpmls(ideo);
  return annots;
}
async function fetchParalogPositionsFromMyGeneInfo(homologs, searchedGene, ideo) {
  const annots = [];
  const cached = homologs.length && typeof homologs[0] === "string";
  console.log("cached", cached);
  const ensemblIds = cached ? homologs : homologs.map((homolog) => homolog.id);
  const data = await fetchGenes(ensemblIds, "ensemblgene", ideo);
  data.hits.forEach((gene) => {
    if ("genomic_pos" in gene === false) return;
    if ("name" in gene === false) return;
    const annot = parseAnnotFromMgiGene(gene, ideo, "pink");
    annots.push(annot);
    const description = Ideogram.tissueCache ? "" : `Paralog of ${searchedGene.name}`;
    const { name: name2, ensemblId } = parseNameAndEnsemblIdFromMgiGene(gene);
    const type2 = "paralogous gene";
    const descriptionObj = { description, ensemblId, name: name2, type: type2 };
    mergeDescriptions(annot, descriptionObj, ideo);
  });
  return annots;
}
function drawNeighborhoods(neighborhoodAnnots, ideo) {
  neighborhoodAnnots = applyAnnotsIncludeList(neighborhoodAnnots, ideo);
  ideo.drawAnnots(neighborhoodAnnots, "overlay", true, true);
  moveLegend(ideo);
}
function plotParalogNeighborhoods(annots, ideo) {
  var _a2;
  if (!ideo.config.showParalogNeighborhoods) return;
  if (((_a2 = ideo.neighborhoodAnnots) == null ? void 0 : _a2.length) > 0) {
    ideo.neighborhoodAnnots.forEach((annot) => {
      ideo.annotDescriptions.annots[annot.name] = annot;
    });
    drawNeighborhoods(ideo.neighborhoodAnnots, ideo);
    return;
  }
  const searchedAnnot = ideo.relatedAnnots[0];
  annots = applyAnnotsIncludeList(annots, ideo);
  annots.unshift(searchedAnnot);
  if (annots.length < 2) return;
  const neighborhoods = {};
  neighborhoods[annots[0].chr] = {};
  neighborhoods[annots[0].chr][annots[0].start] = [annots[0]];
  const windowInt = 2e6;
  const windowProse = "2 Mbp";
  for (let i = 1; i < annots.length; i++) {
    const annot = annots[i];
    const chr = annot.chr;
    const start3 = annot.start;
    if (chr in neighborhoods) {
      const starts = Object.keys(neighborhoods[chr]);
      for (let j = 0; j < starts.length; j++) {
        const startJInt = parseInt(starts[j]);
        if (Math.abs(start3 - startJInt) < windowInt) {
          neighborhoods[chr][startJInt].push(annot);
        } else {
          neighborhoods[chr][start3] = [annot];
        }
      }
    } else {
      neighborhoods[chr] = {};
      neighborhoods[chr][start3] = [annot];
    }
  }
  const overlayAnnotLength = 15e6;
  const searchedGene = searchedAnnot.name;
  const neighborhoodAnnots = Object.entries(neighborhoods).map(([chr, neighborhood], index2) => {
    const start3 = parseInt(Object.keys(neighborhood)[0]);
    let paralogs = Object.values(neighborhood)[0];
    if (paralogs.length < 2) {
      return { paralogs };
    }
    let includesSearched = false;
    if (paralogs[0].name === searchedAnnot.name) {
      paralogs = paralogs.slice(1);
      includesSearched = true;
    }
    const paralogsText = pluralize("paralog", paralogs.length);
    const description = `${paralogs.length} nearby ${paralogsText} of ${searchedGene}`;
    const chrLength = ideo.chromosomes[ideo.config.taxid][chr].bpLength;
    let annotStart = start3 - overlayAnnotLength / 2;
    let annotStop = start3 + overlayAnnotLength / 2;
    if (annotStop > chrLength) {
      annotStart = start3 - overlayAnnotLength;
      annotStop = chrLength;
    } else if (annotStart < 1) {
      annotStart = 1;
      annotStop = overlayAnnotLength;
    }
    ;
    if ("geneCache" in Ideogram) {
      paralogs = paralogs.map((paralog) => {
        paralog.fullName = Ideogram.geneCache.fullNamesById[paralog.id];
        const ranks = Ideogram.geneCache.interestingNames;
        if (ranks.includes(paralog.name)) {
          paralog.rank = ranks.indexOf(paralog.name) + 1;
        } else {
          paralog.rank = 1e10;
        }
        return paralog;
      });
    }
    const key = "paralogNeighborhood-" + index2;
    const fStart = start3.toLocaleString();
    const displayCoordinates = `chr${chr}:${fStart} ± ${windowProse}`;
    const annot = {
      name: key,
      chr,
      start: annotStart,
      stop: annotStop,
      color: "pink",
      description,
      paralogs,
      type: "paralog neighborhood",
      displayCoordinates,
      includesSearched
    };
    ideo.annotDescriptions.annots[annot.name] = annot;
    return annot;
  }).filter((n2) => n2.paralogs.length > 1 || n2.includesSearched);
  ideo.neighborhoodAnnots = neighborhoodAnnots;
  if (neighborhoodAnnots.length > 0) {
    drawNeighborhoods(neighborhoodAnnots, ideo);
  }
}
async function fetchParalogs(annot, ideo) {
  const taxid = ideo.config.taxid;
  let homologs;
  if (Ideogram.paralogCache) {
    const paralogsByName = Ideogram.paralogCache.paralogsByName;
    const nameUc = annot.name.toUpperCase();
    const hasParalogs = nameUc in paralogsByName;
    homologs = hasParalogs ? paralogsByName[nameUc] : [];
  } else {
    const params = `&format=condensed&type=paralogues&target_taxon=${taxid}`;
    const organismUnderscore = ideo.config.organism.replace("-", "_");
    const path = `/homology/id/${organismUnderscore}/${annot.id}?${params}`;
    const ensemblHomologs = await Ideogram.fetchEnsembl(path);
    homologs = ensemblHomologs.data[0].homologies;
  }
  let annots = await fetchParalogPositionsFromMyGeneInfo(homologs, annot, ideo);
  annots = annots.filter((annot2) => {
    const isAccVer = annot2.name.match(/^AC[0-9.]+$/);
    return !isAccVer;
  });
  return annots;
}
function getGenomicPos(gene, ideo) {
  let genomicPos = null;
  if (Array.isArray(gene.genomic_pos)) {
    genomicPos = gene.genomic_pos.filter((pos) => {
      return pos.chr in ideo.chromosomes[ideo.config.taxid];
    })[0];
  } else {
    genomicPos = gene.genomic_pos;
  }
  return genomicPos;
}
function parseAnnotFromMgiGene(gene, ideo, color2 = "red") {
  const genomicPos = getGenomicPos(gene, ideo);
  const annot = {
    name: gene.symbol,
    chr: genomicPos.chr,
    start: genomicPos.start,
    stop: genomicPos.end,
    id: genomicPos.ensemblgene,
    color: color2
  };
  return annot;
}
function getLegendType(li) {
  const lcText = li.innerText.toLowerCase();
  let type2;
  if (lcText.includes("interacting")) type2 = "interacting";
  if (lcText.includes("paralogous")) type2 = "paralogous";
  if (lcText.includes("searched")) type2 = "searched";
  return type2;
}
function getLegendEntryColor(li) {
  const type2 = getLegendType(li);
  const colorMap2 = {
    "interacting": "purple",
    "paralogous": "pink",
    "searched": "red"
  };
  const color2 = colorMap2[type2];
  return color2;
}
function highlightByType(li, ideo) {
  li.classList += " active";
  const selectedColor = getLegendEntryColor(li);
  if (ideo.config.showAnnotLabels) {
    ideo.clearAnnotLabels();
    ideo.flattenAnnots().forEach((annot) => {
      if (annot.color !== selectedColor) {
        document.getElementById(annot.domId).style.display = "none";
      }
    });
    const sortedAnnots = ideo.flattenAnnots().sort((a, b) => {
      return ideo.annotSortFunction(a, b);
    }).filter((annot) => annot.color === selectedColor);
    const numLabels = Math.min(sortedAnnots.length, 20);
    ideo.fillAnnotLabels(sortedAnnots, numLabels);
  }
}
function dehighlightAll(ideo) {
  document.querySelectorAll("#_ideogramLegend li").forEach((li) => {
    li.classList.remove("active");
  });
  ideo.flattenAnnots().forEach((annot) => {
    document.getElementById(annot.domId).style.display = null;
  });
  if (ideo.config.showAnnotLabels) {
    const sortedAnnots = ideo.flattenAnnots().sort((a, b) => {
      return ideo.annotSortFunction(a, b);
    });
    ideo.fillAnnotLabels(sortedAnnots);
  }
}
function initInteractiveLegend(ideo) {
  function highlight2(event) {
    const li = event.target;
    highlightByType(li, ideo);
    if (ideo.onHoverLegendCallback) {
      ideo.onHoverLegendCallback();
    }
  }
  function dehighlight() {
    dehighlightAll(ideo);
  }
  const entrySelector = "#_ideogramLegend li._ideoLegendEntry";
  document.querySelectorAll(entrySelector).forEach((li) => {
    li.addEventListener("mouseenter", highlight2);
    li.addEventListener("mouseleave", dehighlight);
    const legendType = getLegendType(li);
    const tippyContentMap = {
      "interacting": "Adjacent to searched gene in a biochemical pathway, per WikiPathways",
      "paralogous": "Evolutionarily related to searched gene by a duplication event, per Ensembl"
    };
    const placement = "";
    const tippy2 = `data-tippy-content="${tippyContentMap[legendType]}" ${placement}`;
    const reset = "position: inherit; left: inherit";
    const style2 = `style="${reset}"`;
    const attrs = `class="_ideoLegendEntry" ${style2} ${tippy2}`;
    if (legendType === "paralogous") {
      li.innerHTML = `<span ${attrs}>Paralogous genes</span>`;
    } else if (legendType === "interacting") {
      li.innerHTML = `<span ${attrs}>Interacting genes</span>`;
    }
  });
  const css2 = `<style>
    ${tippyCss}

    .tippy-box {
      font-size: 12px;
    }

    .tippy-content {
      padding: 3px 7px;
    }

    #_ideogramLegend li {
      padding-left: 5px;
      border-radius: 2px;
    }

    #_ideogramLegend li.active {
      color: #00C;
      background-color: #EEF;
    }
    </style>`;
  const legendDom = document.querySelector("#_ideogramLegend");
  legendDom.insertAdjacentHTML("afterBegin", css2);
  const tippyConfig2 = getTippyConfig();
  tippyConfig2.maxWidth = 180;
  tippyConfig2.offset = [-30, 10];
  ideo.legendTippy = tippy_esm_default("._ideoLegendEntry[data-tippy-content]", tippyConfig2);
}
function moveLegend(ideo, extraPad = 0) {
  const ideoInnerDom = document.querySelector("#_ideogramInnerWrap");
  const decorPad = setRelatedDecorPad({}).legendPad;
  const left2 = decorPad + 20 + extraPad;
  const legendStyle2 = `position: absolute; top: 15px; left: ${left2}px`;
  const legend = document.querySelector("#_ideogramLegend");
  ideoInnerDom.prepend(legend);
  legend.style = legendStyle2;
  initInteractiveLegend(ideo);
}
function applyAnnotsIncludeList(annots, ideo) {
  if (ideo.config.annotsInList === "all") return annots;
  const includedAnnots = [];
  annots.forEach((annot) => {
    if (ideo.config.annotsInList.includes(annot.name.toLowerCase())) {
      includedAnnots.push(annot);
    }
  });
  return includedAnnots;
}
function processInteractions(annot, ideo) {
  return new Promise(async (resolve) => {
    const t03 = performance.now();
    const interactions = await fetchInteractions(annot, ideo);
    const annots = await fetchInteractionAnnots(interactions, annot, ideo);
    ideo.relatedAnnots.push(...annots);
    finishPlotRelatedGenes("interacting", ideo);
    ideo.time.rg.interactions = timeDiff(t03);
    plotParalogNeighborhoods(annots, ideo);
    resolve();
  });
}
function processParalogs(annot, ideo) {
  return new Promise(async (resolve) => {
    const t03 = performance.now();
    const annots = await fetchParalogs(annot, ideo);
    ideo.relatedAnnots.push(...annots);
    finishPlotRelatedGenes("paralogous", ideo);
    plotParalogNeighborhoods(annots, ideo);
    ideo.time.rg.paralogs = timeDiff(t03);
    resolve();
  });
}
function sortByRelatedType(a, b) {
  var aName, bName, aColor, bColor;
  if ("name" in a) {
    aName = a.name;
    bName = b.name;
    aColor = a.color;
    bColor = b.color;
  } else {
    [aName, aColor] = [a[0], a[3]];
    [bName, bColor] = [b[0], b[3]];
  }
  if ("initRank" in a === false) {
    if (aColor === "red") return -1;
    if (bColor === "red") return 1;
    if (aColor === "purple" && bColor === "pink") return -1;
    if (bColor === "purple" && aColor === "pink") return 1;
  }
  return a.rank - b.rank;
}
function mergeDescriptions(annot, desc, ideo) {
  let mergedDesc;
  const descriptions = ideo.annotDescriptions.annots;
  if (annot.name in descriptions) {
    const otherDesc = descriptions[annot.name];
    mergedDesc = desc;
    if (desc.type === otherDesc.type) return;
    Object.keys(otherDesc).forEach(function(key) {
      if (key in mergedDesc === false) {
        mergedDesc[key] = otherDesc[key];
      }
    });
    if ("type" in otherDesc && !Ideogram.tissueCache) {
      mergedDesc.type += ", " + otherDesc.type;
      mergedDesc.description += `<br/><br/>${otherDesc.description}`;
    }
  } else {
    mergedDesc = desc;
  }
  ideo.annotDescriptions.annots[annot.name] = mergedDesc;
}
function mergeAnnots(unmergedAnnots) {
  const seenAnnots = {};
  let mergedAnnots = [];
  unmergedAnnots.forEach((annot) => {
    if (annot.name in seenAnnots === false) {
      mergedAnnots.push(annot);
      seenAnnots[annot.name] = 1;
    } else {
      if (annot.color === "purple") {
        mergedAnnots = mergedAnnots.map((mergedAnnot) => {
          return annot.name === mergedAnnot.name ? annot : mergedAnnot;
        });
      }
    }
  });
  return mergedAnnots;
}
function hasTissueCache() {
  return Ideogram.tissueCache && Object.keys(Ideogram.tissueCache).length > 0;
}
function waitForTissueCache(geneNames, config2, n2) {
  setTimeout(() => {
    if (n2 < 40) {
      if (!hasTissueCache()) {
        waitForTissueCache(geneNames, config2, n2 + 1);
      } else {
        setTissueExpressions(geneNames, config2);
      }
    }
  }, 50);
}
async function setTissueExpressions(geneNames, config2) {
  if (!hasTissueCache()) {
    waitForTissueCache(geneNames, config2, 0);
    return;
  }
  const tissueExpressionsByGene = {};
  const cache = Ideogram.tissueCache;
  const promises = [];
  geneNames.forEach(async (gene) => {
    const promise = new Promise(async (resolve) => {
      const tissueExpressions = await cache.getTissueExpressions(gene, config2);
      tissueExpressionsByGene[gene] = tissueExpressions;
      resolve();
    });
    promises.push(promise);
  });
  await Promise.all(promises);
  Ideogram.tissueExpressionsByGene = tissueExpressionsByGene;
}
function onBeforeDrawAnnots() {
  var _a2;
  const ideo = this;
  setRelatedAnnotDomIds(ideo);
  const geneNames = [];
  const chrAnnots = ideo.annots;
  for (let i = 0; i < chrAnnots.length; i++) {
    const annots = chrAnnots[i].annots;
    for (let j = 0; j < annots.length; j++) {
      const annot = annots[j];
      geneNames.push(annot.name);
      if (ideo.config.colorMap && ((_a2 = annot.differentialExpression) == null ? void 0 : _a2.length)) {
        const colorMap2 = ideo.config.colorMap;
        const group2 = annot.differentialExpression[0].group;
        annot.color = colorMap2[group2];
        ideo.annots[i].annots[j] = annot;
      }
    }
  }
  setTissueExpressions(geneNames, ideo.config);
}
function filterAndDrawAnnots(annots, ideo) {
  annots = applyAnnotsIncludeList(annots, ideo);
  ideo.drawAnnots(annots);
}
function finishPlotRelatedGenes(type2, ideo) {
  let annots = ideo.relatedAnnots;
  if (annots.length > 1 && ideo.onFindGenesCallback) {
    ideo.onFindGenesCallback();
  }
  annots = mergeAnnots(annots);
  filterAndDrawAnnots(annots, ideo);
  if (ideo.config.showAnnotLabels) {
    const sortedAnnots = ideo.flattenAnnots().sort((a, b) => {
      return ideo.annotSortFunction(a, b);
    });
    ideo.fillAnnotLabels(sortedAnnots);
  }
  moveLegend(ideo);
  analyzePlotTimes(type2, ideo);
}
async function processSearchedGene(geneSymbol, ideo) {
  const t03 = performance.now();
  const data = await fetchGenes(geneSymbol, "symbol", ideo);
  if (data.hits.length === 0) {
    return;
  }
  const gene = data.hits.find((hit) => {
    const genomicPos = getGenomicPos(hit, ideo);
    return genomicPos && genomicPos.ensemblgene;
  });
  const ensemblId = gene.genomic_pos.ensemblgene;
  let desc = { description: "", ensemblId, type: "searched gene" };
  if (gene.symbol in ideo.annotDescriptions.annots) {
    const oldDesc = ideo.annotDescriptions.annots[gene.symbol];
    desc = Object.assign(oldDesc, desc);
  } else {
    desc.name = gene.name;
  }
  ideo.annotDescriptions.annots[gene.symbol] = desc;
  const annot = parseAnnotFromMgiGene(gene, ideo);
  ideo.relatedAnnots.push(annot);
  ideo.time.rg.searchedGene = timeDiff(t03);
  return annot;
}
function adjustPlaceAndVisibility(ideo) {
  var ideoContainerDom = document.querySelector(ideo.config.container);
  ideoContainerDom.style.visibility = "";
  ideoContainerDom.style.position = "absolute";
  ideoContainerDom.style.width = "100%";
  var ideoInnerDom = document.querySelector("#_ideogramInnerWrap");
  ideoInnerDom.style.position = "relative";
  ideoInnerDom.style.marginLeft = "auto";
  ideoInnerDom.style.marginRight = "auto";
  ideoInnerDom.style.overflowY = "hidden";
  document.querySelector("#_ideogramMiddleWrap").style.overflowY = "hidden";
  const legendPad = ideo.config.legendPad;
  if (typeof ideo.didAdjustIdeogramLegend === "undefined") {
    var ideoDom = document.querySelector("#_ideogram");
    const legendWidth = 160;
    ideoInnerDom.style.maxWidth = parseInt(ideoInnerDom.style.maxWidth) + legendWidth + legendPad + "px";
    ideoDom.style.minWidth = parseInt(ideoDom.style.minWidth) + legendPad + "px";
    ideoDom.style.maxWidth = parseInt(ideoDom.style.minWidth) + legendPad + "px";
    ideoDom.style.position = "relative";
    ideoDom.style.left = legendWidth + "px";
    ideo.didAdjustIdeogramLegend = true;
  }
}
function initAnnotDescriptions(ideo, headerTitle) {
  const organism = ideo.getScientificName(ideo.config.taxid);
  const version2 = Ideogram.version;
  const headers = [
    `# ${headerTitle}`,
    `# Organism: ${organism}`,
    `# Generated by Ideogram.js version ${version2}, https://github.com/eweitz/ideogram`,
    `# Generated at ${window.location.href}`
  ].join("\n");
  delete ideo.annotDescriptions;
  ideo.annotDescriptions = { headers, annots: {} };
}
async function plotRelatedGenes(geneSymbol = null) {
  const ideo = this;
  if (!geneSymbol) {
    return plotGeneHints(ideo);
  }
  ideo.clearAnnotLabels();
  const legend = document.querySelector("#_ideogramLegend");
  if (legend) legend.remove();
  ideo.config = setRelatedDecorPad(ideo.config);
  initAnnotDescriptions(ideo, `Related genes for ${geneSymbol}`);
  const ideoSel = ideo.selector;
  const annotSel = ideoSel + " .annot";
  document.querySelectorAll(annotSel).forEach((el) => el.remove());
  ideo.startHideAnnotTooltipTimeout();
  document.querySelectorAll(".chromosome").forEach((chromosome) => {
    chromosome.style.cursor = "";
  });
  adjustPlaceAndVisibility(ideo);
  ideo.relatedAnnots = [];
  ideo.neighborhoodAnnots = [];
  const annot = await processSearchedGene(geneSymbol, ideo);
  if (typeof annot === "undefined") throwGeneNotFound(geneSymbol, ideo);
  ideo.config.legend = relatedLegend;
  writeLegend(ideo);
  moveLegend(ideo);
  await Promise.all([
    processInteractions(annot, ideo),
    processParalogs(annot, ideo)
  ]);
  ideo.time.rg.total = timeDiff(ideo.time.rg.t0);
  analyzeRelatedGenes(ideo);
  if (ideo.onPlotFoundGenesCallback) ideo.onPlotFoundGenesCallback();
}
function getAnnotByName2(annotName, ideo) {
  var annotByName;
  ideo.annots.forEach((annotsByChr) => {
    annotsByChr.annots.forEach((annot) => {
      if (annotName === annot.name) {
        annotByName = annot;
      }
    });
  });
  if (annotByName === null) {
    annotByName = ideo.annotDescriptions.annots[annotName];
  }
  return annotByName;
}
function addPathwayListeners(ideo) {
  const pathways = document.querySelectorAll(".ideo-pathway-link");
  if (pathways.length > 0 && !ideo.addedPathwayClickHandler) {
    pathways.forEach((pathway) => {
      pathway.addEventListener("click", function(event) {
        const target = event.target;
        const pathwayId = target.getAttribute("data-pathway-id");
        const searchedGene = getSearchedFromDescriptions(ideo);
        const interactingGene = document.querySelector("#ideo-related-gene").textContent;
        function geneNodeHoverFn(event2, geneName) {
          console.log("in geneNodeHoverFn");
          return "<div>ok " + geneName + "</div><div>1234</div>";
        }
        function pathwayNodeClickFn(event2, pathwayId2) {
          const pathwayNode = event2.target;
          console.log("in pathwayNodeClickFn, pathwayNode", pathwayNode);
          console.log("in pathwayNodeClickFn, pathwayId", pathwayId2);
        }
        drawPathway(
          pathwayId,
          searchedGene,
          interactingGene,
          void 0,
          void 0,
          void 0,
          geneNodeHoverFn,
          pathwayNodeClickFn
        );
        event.stopPropagation();
      });
    });
  }
}
function centralizeTooltipPosition() {
  const tooltip = document.querySelector("._ideogramTooltip");
  const tooltipTop = tooltip.getBoundingClientRect().top;
  const ideoDom = document.querySelector("#_ideogram");
  const ideogramTop = ideoDom.getBoundingClientRect().top;
  if (tooltipTop > ideogramTop) {
    tooltip.style.top = ideogramTop + "px";
  }
}
function onDidShowAnnotTooltip2() {
  const ideo = this;
  if (Ideogram.tissueCache) {
    centralizeTooltipPosition();
  }
  handleTooltipClick(ideo);
  addGeneStructureListeners(ideo);
  addTissueListeners(ideo);
  addPathwayListeners(ideo);
  addVariantListeners(ideo);
  ideo.tissueTippy = tippy_esm_default("._ideoGeneTissues[data-tippy-content]", getTippyConfig());
}
function handleTooltipClick(ideo) {
  const tooltip = document.querySelector("._ideogramTooltip");
  if (!ideo.addedTooltipClickHandler) {
    tooltip.addEventListener("click", (event) => {
      if (["input", "label"].includes(event.target.localName)) {
        return;
      }
      let geneDom = document.querySelector("#ideo-related-gene");
      if (!geneDom) {
        geneDom = event.target;
      }
      const annotName = geneDom.textContent;
      const annot = getAnnotByName2(annotName, ideo);
      ideo.onClickAnnot(annot);
    });
    ideo.addedTooltipClickHandler = true;
  }
}
function getSearchedFromDescriptions(ideo) {
  return Object.entries(ideo.annotDescriptions.annots).find(([k, v]) => v.type === "searched gene")[0];
}
function decorateInteractingGene(annot, descObj, ideo) {
  if ("type" in descObj && descObj.type.includes("interacting gene")) {
    const pathwayIds = descObj.pathwayIds;
    const searchedGene = getSearchedFromDescriptions(ideo);
    const gpmls = ideo.gpmlsByInteractingGene[annot.name];
    const summary = summarizeInteractions(annot.name, searchedGene, pathwayIds, gpmls);
    if (summary !== null) {
      const oldSummary = "Interacts with";
      descObj.description = descObj.description.replace(oldSummary, summary);
    }
  }
  return descObj;
}
function decorateParalogNeighborhood(annot, descObj, style2) {
  const sortedParalogs = descObj.paralogs.sort((a, b) => a.rank - b.rank);
  const originalDisplay = "Paralog neighborhood<br/><br/>" + descObj.description + `:<br/>${sortedParalogs.map((paralog) => {
    let title = "";
    if (paralog.fullName) title = paralog.fullName;
    if (paralog.rank) {
      const rank = paralog.rank;
      title += ` &#013;Ranked ${rank} in general or scholarly interest`;
    }
    if (title !== "") title = `title="${title}"`;
    return `<span class="ideo-paralog-neighbor" ${title} style="${style2}"'>${paralog.name}</span>`;
  }).join("<br/>")}<br/>`;
  annot.displayCoordinates = descObj.displayCoordinates;
  return [annot, originalDisplay];
}
async function decorateAnnot(annot) {
  var _a2, _b2;
  const ideo = this;
  if (annot.name === ((_a2 = ideo.prevClickedAnnot) == null ? void 0 : _a2.name) && annot.name === ((_b2 = ideo.prevShownAnnot) == null ? void 0 : _b2.name) && !ideo.hasShownAnnotSinceClick && ideo.isTooltipCooling) {
    ideo.prevShownAnnot = annot;
    return null;
  }
  ideo.prevShownAnnot = annot;
  ideo.hasShownAnnotSinceClick = true;
  let descObj = ideo.annotDescriptions.annots[annot.name];
  if (ideo.config.relatedGenesMode === "related") {
    descObj = decorateInteractingGene(annot, descObj, ideo);
  }
  const description = descObj.description.length > 0 ? `<br/>${descObj.description}` : "";
  const fullName = descObj.name;
  const style2 = "color: #0366d6; cursor: pointer;";
  let fullNameAndRank = fullName;
  if ("rank" in annot) {
    const rank = "Ranked " + annot.rank + " in general or scholarly interest";
    fullNameAndRank = `<span title="${rank}">${fullName}</span>`;
  }
  let synonym = "";
  if (descObj == null ? void 0 : descObj.isSynonym) {
    const queriedSynonym = descObj.synonym;
    const synStyle = 'style="font-style: italic"';
    synonym = `<div ${synStyle}>Synonym: ${queriedSynonym}</div>`;
  }
  const isParalogNeighborhood = annot.name.includes("paralogNeighborhood");
  const geneStructureHtml = await getGeneStructureHtml(
    annot,
    ideo,
    isParalogNeighborhood
  );
  const tissueHtml = getTissueHtml(annot, ideo);
  const geneSymbolAndFullName = `<span id="_ideoGeneSymbolAndFullName">
      <span id="ideo-related-gene" style="${style2}">${annot.name}</span><br/>${fullNameAndRank}<br/>
    </span>`;
  let originalDisplay = geneSymbolAndFullName + synonym + description + tissueHtml + geneStructureHtml;
  if (isParalogNeighborhood) {
    [annot, originalDisplay] = decorateParalogNeighborhood(annot, descObj, style2);
  }
  annot.displayName = originalDisplay;
  return annot;
}
var shape = "triangle";
function getLegendName(nameText, legendContent = null) {
  const legendHeaderStyle = `font-size: 14px; font-weight: bold; font-color: #333;`;
  let content = `<div style="${legendHeaderStyle}">${nameText}</div>`;
  if (legendContent) content = legendContent;
  return `
    <div style="position: relative; left: 30px;">
      ${content}
      <i>Click gene to search</i>
    </div>
  `;
}
var relatedLegend = [{
  name: getLegendName("Related genes"),
  nameHeight: 50,
  rows: [
    { name: "Interacting gene", color: "purple", shape },
    { name: "Paralogous gene", color: "pink", shape },
    { name: "Searched gene", color: "red", shape }
  ]
}];
var pathwayLegend = [{
  name: getLegendName("Related genes"),
  nameHeight: 50,
  rows: [
    { name: "Pathway gene", color: "blue", shape },
    { name: "Searched gene", color: "red", shape }
  ]
}];
var citedLegend = [{
  name: getLegendName("Highly cited genes"),
  nameHeight: 30,
  rows: []
}];
function setRelatedDecorPad(kitConfig) {
  kitConfig.legendPad = kitConfig.showAnnotLabels ? 70 : 30;
  return kitConfig;
}
var globalKitDefaults = {
  chrWidth: 9,
  chrHeight: 100,
  chrLabelSize: 12,
  annotationHeight: 7,
  showFullyBanded: false,
  rotatable: false,
  legend: relatedLegend,
  chrBorderColor: "#333",
  chrLabelColor: "#333",
  onBeforeDrawAnnots,
  onWillShowAnnotTooltip: decorateAnnot,
  onDidShowAnnotTooltip: onDidShowAnnotTooltip2,
  showTools: true,
  showAnnotLabels: true,
  showGeneStructureInTooltip: true,
  showProteinInTooltip: true,
  showVariantInTooltip: false,
  chrFillColor: { centromere: "#DAAAAA" }
};
function plotGeneHints() {
  const ideo = this;
  if (!ideo || "annotDescriptions" in ideo) return;
  ideo.annotDescriptions = { annots: {} };
  ideo.flattenAnnots().map((annot) => {
    let description = [];
    if ("significance" in annot && annot.significance !== "n/a") {
      description.push(annot.significance);
    }
    if ("citations" in annot && annot.citations !== void 0) {
      description.push(annot.citations);
    }
    description = description.join("<br/><br/>");
    ideo.annotDescriptions.annots[annot.name] = {
      description,
      name: decodeURIComponent(annot.fullName)
    };
  });
  adjustPlaceAndVisibility(ideo);
  moveLegend(ideo, -60);
  const container = ideo.config.container;
  document.querySelector(container).style.visibility = "";
  if (ideo.config.showAnnotLabels) {
    const sortedAnnots = ideo.flattenAnnots().sort((a, b) => {
      return ideo.annotSortFunction(a, b);
    });
    ideo.fillAnnotLabels(sortedAnnots);
  }
}
function _initRelatedGenes(config2, annotsInList) {
  if (config2.relatedGenesMode === "leads") {
    delete config2.onDrawAnnots;
    delete config2.relatedGenesMode;
  }
  ;
  const kitDefaults = Object.assign({
    showParalogNeighborhoods: true,
    isLegendInteractive: true,
    relatedGenesMode: "related",
    useCache: true,
    awaitCache: true
  }, globalKitDefaults);
  return initSearchIdeogram(kitDefaults, config2, annotsInList);
}
function _initGeneLeads(config2, annotsInList) {
  delete config2.onPlotFoundGenes;
  if (config2.legendName) {
    if (config2.legendContent) {
      citedLegend[0].name = getLegendName(
        config2.legendName,
        config2.legendContent
      );
    } else if (config2.geneLeadsDE) {
      const content = `<span style="font-size: 14px; font-weight: bold; left: 0">Gene leads</span> from<br/><div style="margin-top: 10px; padding: 3px 6px; font-size: 14px; font-weight: bold; color: #3D629A;">${fileIcon} <span style="margin-left: 20px; position: relative; top: -1px;">Publication</span></div><div style="margin-top: 3px; margin-bottom: -10px; font-size: 14px; padding: 3px 6px;">${deltaIcon} <span style="margin-left: 20px;">Differential expression</span></div><br/>`;
      citedLegend[0].name = getLegendName(
        config2.legendName,
        content
      );
    } else {
      citedLegend[0].name = getLegendName(config2.legendName);
    }
  }
  config2.legend = citedLegend;
  let rawPath, mode;
  if (config2.geneLeadsDE) {
    mode = "leads";
    rawPath = "annotations/gene_leads.tsv";
  } else {
    mode = "hints";
    rawPath = "cache/homo-sapiens-top-genes.tsv";
  }
  const kitDefaults = Object.assign({
    relatedGenesMode: mode,
    chrMargin: -4,
    // annotationsPath: getDir('cache/homo-sapiens-top-genes.tsv'),
    annotationsPath: getDir(rawPath),
    onDrawAnnots: plotGeneHints,
    useCache: true
  }, globalKitDefaults);
  return initSearchIdeogram(kitDefaults, config2, annotsInList);
}
function initSearchIdeogram(kitDefaults, config2, annotsInList) {
  if (annotsInList !== "all") {
    annotsInList = annotsInList.map((name2) => name2.toLowerCase());
  }
  config2.annotsInList = annotsInList;
  kitDefaults.legendPad = kitDefaults.showAnnotLabels ? 80 : 30;
  if ("onWillShowAnnotTooltip" in config2) {
    const key = "onWillShowAnnotTooltip";
    const clientFn = config2[key];
    const defaultFunction = kitDefaults[key];
    const newFunction = function(annot) {
      annot = defaultFunction.bind(this)(annot);
      annot = clientFn.bind(this)(annot);
      return annot;
    };
    kitDefaults[key] = newFunction;
    delete config2[key];
  }
  if ("onDidShowAnnotTooltip" in config2) {
    const key = "onDidShowAnnotTooltip";
    const clientFn = config2[key];
    const defaultFunction = kitDefaults[key];
    const newFunction = function(annot) {
      annot = defaultFunction.bind(this)(annot);
      annot = clientFn.bind(this)(annot);
      return annot;
    };
    kitDefaults[key] = newFunction;
    delete config2[key];
  }
  if ("onBeforeDrawAnnots" in config2) {
    const key = "onBeforeDrawAnnots";
    const clientFn = config2[key];
    const defaultFn = kitDefaults[key];
    const newFunction = function() {
      if (defaultFn) defaultFn.bind(this)();
      clientFn.bind(this)();
    };
    kitDefaults[key] = newFunction;
    delete config2[key];
  }
  if ("onDrawAnnots" in config2) {
    const key = "onDrawAnnots";
    const clientFn = config2[key];
    const defaultFn = kitDefaults[key];
    const newFunction = function() {
      if (defaultFn) defaultFn.bind(this)();
      clientFn.bind(this)();
    };
    kitDefaults[key] = newFunction;
    delete config2[key];
  }
  const kitConfig = Object.assign(kitDefaults, config2);
  const ideogram = new Ideogram(kitConfig);
  if (config2.onFindGenes) {
    ideogram.onFindGenesCallback = config2.onFindGenes;
  }
  if (config2.onPlotFoundGenes) {
    ideogram.onPlotFoundGenesCallback = config2.onPlotFoundGenes;
  }
  if (config2.onHoverLegend) {
    ideogram.onHoverLegendCallback = config2.onHoverLegend;
  }
  ideogram.getTooltipAnalytics = getRelatedGenesTooltipAnalytics;
  ideogram.annotSortFunction = sortByRelatedType;
  initAnalyzeRelatedGenes(ideogram);
  return ideogram;
}

// node_modules/ideogram/src/js/ideogram.js
var Ideogram2 = class _Ideogram {
  constructor(config2) {
    this.configure = configure;
    this.initDrawChromosomes = initDrawChromosomes;
    this.onLoad = onLoad;
    this.handleRotateOnClick = handleRotateOnClick;
    this.init = init2;
    this.finishInit = finishInit;
    this.writeContainer = writeContainer;
    this.onLoadAnnots = onLoadAnnots;
    this.onDrawAnnots = onDrawAnnots;
    this.processAnnotData = processAnnotData;
    this.restoreDefaultTracks = restoreDefaultTracks;
    this.updateDisplayedTracks = updateDisplayedTracks;
    this.initAnnotSettings = initAnnotSettings;
    this.fetchAnnots = fetchAnnots;
    this.drawAnnots = drawAnnots;
    this.getHistogramBars = getHistogramBars;
    this.drawHeatmaps = drawHeatmaps;
    this.deserializeAnnotsForHeatmap = deserializeAnnotsForHeatmap;
    this.fillAnnots = fillAnnots;
    this.drawProcessedAnnots = drawProcessedAnnots;
    this.drawSynteny = drawSynteny;
    this.startHideAnnotTooltipTimeout = startHideAnnotTooltipTimeout;
    this.showAnnotTooltip = showAnnotTooltip;
    this.onWillShowAnnotTooltip = onWillShowAnnotTooltip;
    this.onDidShowAnnotTooltip = onDidShowAnnotTooltip;
    this.onClickAnnot = onClickAnnot;
    this.setOriginalTrackIndexes = setOriginalTrackIndexes;
    this.afterRawAnnots = afterRawAnnots;
    this.downloadAnnotations = downloadAnnotations;
    this.addAnnotLabel = addAnnotLabel;
    this.removeAnnotLabel = removeAnnotLabel;
    this.fillAnnotLabels = fillAnnotLabels;
    this.clearAnnotLabels = clearAnnotLabels;
    this.flattenAnnots = flattenAnnots;
    this.highlight = highlight;
    this.unhighlight = unhighlight;
    this.esearch = esearch;
    this.esummary = esummary;
    this.elink = elink;
    this.getOrganismFromEutils = getOrganismFromEutils;
    this.getTaxids = getTaxids;
    this.getAssemblyAndChromosomesFromEutils = getAssemblyAndChromosomesFromEutils;
    this.drawBandLabels = drawBandLabels;
    this.getBandColorGradients = getBandColorGradients;
    this.processBandData = processBandData;
    this.setBandsToShow = setBandsToShow;
    this.hideUnshownBandLabels = hideUnshownBandLabels;
    this.drawBandLabelText = drawBandLabelText;
    this.drawBandLabelStalk = drawBandLabelStalk;
    this.onBrushMove = onBrushMove;
    this.onBrushEnd = onBrushEnd;
    this.createBrush = createBrush;
    this.createClickCursor = createClickCursor;
    this.onCursorMove = onCursorMove;
    this.drawSexChromosomes = drawSexChromosomes;
    this.setSexChromosomes = setSexChromosomes;
    this.convertBpToPx = convertBpToPx;
    this.convertPxToBp = convertPxToBp;
    this.unpackAnnots = unpackAnnots;
    this.packAnnots = packAnnots;
    this.initCrossFilter = initCrossFilter;
    this.filterAnnots = filterAnnots;
    this.assemblyIsAccession = assemblyIsAccession;
    this.getDataDir = getDataDir;
    this.round = round;
    this.onDidRotate = onDidRotate;
    this.getSvg = getSvg;
    this.fetch = fetchWithAuth;
    this.getTaxid = getTaxid;
    this.getCommonName = getCommonName;
    this.getScientificName = getScientificName;
    this.getChromosomeModel = getChromosomeModel;
    this.getChromosomePixels = getChromosomePixels;
    this.drawChromosomeLabels = drawChromosomeLabels;
    this.rotateChromosomeLabels = rotateChromosomeLabels;
    this.appendHomolog = appendHomolog;
    this.drawChromosome = drawChromosome;
    this.rotateAndToggleDisplay = rotateAndToggleDisplay;
    this.setOverflowScroll = setOverflowScroll;
    this.plotRelatedGenes = plotRelatedGenes;
    this.getRelatedGenesByType = getRelatedGenesByType;
    this.configure(config2);
  }
  /**
   * Get the current version of Ideogram.js
   */
  static get version() {
    return version_default;
  }
  /**
  * Enable use of D3 in client apps, via "d3 = Ideogram.d3"
  */
  static get d3() {
    return d3;
  }
  /**
   * Request data from Ensembl REST API
   * Docs: https://rest.ensembl.org/
   *
   * @param {String} path URL path
   * @param {Object} body POST body
   * @param {String} method HTTP method; 'GET' (default) or 'POST'
   */
  static async fetchEnsembl(path, body = null, method = "GET") {
    const init3 = {
      method
    };
    if (body !== null) init3.body = JSON.stringify(body);
    if (method === "GET") {
      const delimiter = path.includes("&") ? "&" : "?";
      path += delimiter + "content-type=application/json";
    } else {
      init3.headers = { "Content-Type": "application/json" };
    }
    const response = await fetch(`https://rest.ensembl.org${path}`, init3);
    const json = await response.json();
    return json;
  }
  /**
   * Helper for sortChromosomes().
   * Gets names and biological types for diverse chromosome variables
   */
  static getChrSortNamesAndTypes(a, b) {
    var chrAName, chrBName, aIsCP, bIsCP, aIsMT, bIsMT, aIsAP, bIsAP, aIsNuclear, bIsNuclear;
    if (typeof a === "string" || "chr" in a && "annots" in a) {
      chrAName = typeof a === "string" ? a : a.chr;
      chrBName = typeof b === "string" ? b : b.chr;
      aIsCP = chrAName === "CP";
      bIsCP = chrBName === "CP";
      aIsMT = chrAName === "MT";
      bIsMT = chrBName === "MT";
      aIsAP = chrAName === "AP";
      bIsAP = chrBName === "AP";
      aIsNuclear = !aIsCP && !aIsMT && !aIsAP;
      bIsNuclear = !bIsCP && !bIsMT && !bIsAP;
    } else {
      chrAName = a.name;
      chrBName = b.name;
      aIsCP = a.type === "chloroplast";
      bIsCP = b.type === "chloroplast";
      aIsMT = a.type === "mitochondrion";
      bIsMT = b.type === "mitochondrion";
      aIsAP = a.type === "apicoplast";
      bIsAP = b.type === "apicoplast";
      aIsNuclear = a.type === "nuclear";
      bIsNuclear = b.type === "nuclear";
    }
    const chrTypes = {
      aIsNuclear,
      bIsNuclear,
      aIsCP,
      bIsCP,
      aIsMT,
      bIsMT,
      aIsAP,
      bIsAP
    };
    return [chrAName, chrBName, chrTypes];
  }
  /**
   * Sorts two chromosome objects by type and name
   * - Nuclear chromosomes come before non-nuclear chromosomes.
   * - Among nuclear chromosomes, use "natural sorting", e.g.
   *   numbers come before letters
   * - Among non-nuclear chromosomes, i.e. "MT" (mitochondrial DNA) and
   *   "CP" (chromoplast DNA), MT comes first
   *
   * @param a Chromosome string or object "A"
   * @param b Chromosome string or object "B"
   * @returns {Number} JavaScript sort order indicator
   */
  static sortChromosomes(a, b) {
    let [chrAName, chrBName, chrTypes] = _Ideogram.getChrSortNamesAndTypes(a, b);
    const {
      aIsNuclear,
      bIsNuclear,
      aIsCP,
      bIsCP,
      aIsMT,
      bIsMT,
      aIsAP,
      bIsAP
    } = chrTypes;
    if (aIsNuclear && bIsNuclear) {
      if (isRoman(chrAName) && isRoman(chrBName)) {
        chrAName = parseRoman(chrAName).toString();
        chrBName = parseRoman(chrBName).toString();
      }
      return chrAName.localeCompare(chrBName, "en", { numeric: true });
    } else if (!aIsNuclear && bIsNuclear) {
      return 1;
    } else if (aIsMT && bIsCP) {
      return 1;
    } else if (aIsCP && bIsMT) {
      return -1;
    } else if (!aIsAP && !aIsMT && !aIsCP && (bIsMT || bIsCP || bIsAP)) {
      return -1;
    }
  }
  /**
   * Wrapper for Ideogram constructor, with generic "Related genes" options
   *
   * @param {Object} config Ideogram configuration object
   */
  static initRelatedGenes(config2, annotsInList = "all") {
    return _initRelatedGenes(config2, annotsInList);
  }
  /**
   * Wrapper for Ideogram constructor, with generic "Gene leads" options
   *
   * @param {Object} config Ideogram configuration object
  */
  static initGeneLeads(config2, annotsInList = "all") {
    return _initGeneLeads(config2, annotsInList);
  }
  /**
   * Wrapper for drawing biological pathways using cached WikiPathways data
   *
   * @param {String} pwId WikiPathways ID, e.g. "WP5109"
   * @param {String} sourceGene Symbol of source gene, e.g. "LDLR"
   * @param {String} destGene Symbol of destination gene, e.g. "PCSK9"
   * @param {String} outerSelector DOM selector of container, e.g. "#my-diagram"
   * @param {Object} dimensions Height and width of pathway diagram
   * @param {Boolean} showClose Whether to show close button
   * @param {Function} geneNodeHoverFn Function to call upon hovering gene
   * @param {Function} pathwayNodeClickFn Function to call upon clicking pathway
   * @param {Boolean} showDescription Whether to display pathway description
   * @param {Boolean} showOntologies Whether to display ontology annotations
   * @param {Boolean} showDefaultTooltips Whether to display default tooltips
  */
  static drawPathway(pwId, sourceGene, destGene, outerSelector, dimensions = { height: 440, width: 900 }, showClose = true, geneNodeHoverFn = void 0, pathwayNodeClickFn = void 0, showDescription = true, showOntologies = true, showDefaultTooltips = true) {
    drawPathway(
      pwId,
      sourceGene,
      destGene,
      outerSelector,
      dimensions = dimensions,
      showClose = showClose,
      geneNodeHoverFn = geneNodeHoverFn,
      pathwayNodeClickFn = pathwayNodeClickFn,
      showDescription = showDescription,
      showOntologies = showOntologies,
      showDefaultTooltips = showDefaultTooltips
    );
  }
  /**
   * Wrapper for initializing cached data
   *
   * @param {Object} config Includes organism, useCache, etc.
  */
  static initCaches(config2 = {
    organism: "homo-sapiens",
    useCache: true,
    awaitCache: true,
    showGeneStructureInTooltip: true
  }) {
    initCaches(config2);
  }
  /**
   * Get list of gene names in pathway
   *
   * @param {Object} config Includes organism, useCache, etc.
  */
  static getPathwayGenes() {
    return getPathwayGenes();
  }
  static getPathwayOntologies(pathwayJson, selectedOntology) {
    return getPathwayAnnotations(pathwayJson, selectedOntology);
  }
};

// node_modules/ideogram/src/js/index.js
window.Ideogram = Ideogram2;
var js_default = Ideogram2;
export {
  js_default as default
};
//# sourceMappingURL=ideogram.js.map
