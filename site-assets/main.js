function _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime3Cmd6Effect(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP419moonbit_2dcommunity7rabbita8internal7runtime3Cmd6Effect.prototype.$tag = 0;
function _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime3Cmd7Message(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP419moonbit_2dcommunity7rabbita8internal7runtime3Cmd7Message.prototype.$tag = 1;
function _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime3Cmd5Batch(param0) {
  this._0 = param0;
}
_M0DTP419moonbit_2dcommunity7rabbita8internal7runtime3Cmd5Batch.prototype.$tag = 2;
function _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime3Cmd5Empty() {}
_M0DTP419moonbit_2dcommunity7rabbita8internal7runtime3Cmd5Empty.prototype.$tag = 3;
const _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime3Cmd5Empty__ = new _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime3Cmd5Empty();
function _M0DTP319moonbit_2dcommunity7rabbita3url8Protocol4Http() {}
_M0DTP319moonbit_2dcommunity7rabbita3url8Protocol4Http.prototype.$tag = 0;
const _M0DTP319moonbit_2dcommunity7rabbita3url8Protocol4Http__ = new _M0DTP319moonbit_2dcommunity7rabbita3url8Protocol4Http();
function _M0DTP319moonbit_2dcommunity7rabbita3url8Protocol5Https() {}
_M0DTP319moonbit_2dcommunity7rabbita3url8Protocol5Https.prototype.$tag = 1;
const _M0DTP319moonbit_2dcommunity7rabbita3url8Protocol5Https__ = new _M0DTP319moonbit_2dcommunity7rabbita3url8Protocol5Https();
function _M0DTP319moonbit_2dcommunity7rabbita3url8Protocol5Other(param0) {
  this._0 = param0;
}
_M0DTP319moonbit_2dcommunity7rabbita3url8Protocol5Other.prototype.$tag = 2;
function _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime5VNode4Elem(param0, param1, param2, param3) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
  this._3 = param3;
}
_M0DTP419moonbit_2dcommunity7rabbita8internal7runtime5VNode4Elem.prototype.$tag = 0;
function _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime5VNode4Text(param0) {
  this._0 = param0;
}
_M0DTP419moonbit_2dcommunity7rabbita8internal7runtime5VNode4Text.prototype.$tag = 1;
function _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime5VNode4Frag(param0) {
  this._0 = param0;
}
_M0DTP419moonbit_2dcommunity7rabbita8internal7runtime5VNode4Frag.prototype.$tag = 2;
function _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime5VNode4Slot(param0) {
  this._0 = param0;
}
_M0DTP419moonbit_2dcommunity7rabbita8internal7runtime5VNode4Slot.prototype.$tag = 3;
function _M0TP38zongen0116mgpic2026_2dsite4main7NavItem(param0, param1) {
  this.label = param0;
  this.href = param1;
}
class $PanicError extends Error {}
function $panic() {
  throw new $PanicError();
}
function _M0TPB13StringBuilder(param0) {
  this.val = param0;
}
function $compare_int(a, b) {
  return (a >= b) - (a <= b);
}
const _M0FPB12random__seed = () => {
  if (globalThis.crypto?.getRandomValues) {
    const array = new Uint32Array(1);
    globalThis.crypto.getRandomValues(array);
    return array[0] | 0; // Convert to signed 32
  } else {
    return Math.floor(Math.random() * 0x100000000) | 0; // Fallback to Math.random
  }
};
function _M0TPB6Hasher(param0) {
  this.acc = param0;
}
const _M0FPB19int__to__string__js = (x, radix) => {
  return x.toString(radix);
};
function _M0DTPC16result6ResultGURP319moonbit_2dcommunity7rabbita3url8ProtocolRPC16string10StringViewERPB7FailureE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGURP319moonbit_2dcommunity7rabbita3url8ProtocolRPC16string10StringViewERPB7FailureE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGURP319moonbit_2dcommunity7rabbita3url8ProtocolRPC16string10StringViewERPB7FailureE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGURP319moonbit_2dcommunity7rabbita3url8ProtocolRPC16string10StringViewERPB7FailureE2Ok.prototype.$tag = 1;
function _M0DTPC15error5Error58moonbitlang_2fcore_2fstrconv_2eStrConvError_2eStrConvError(param0) {
  this._0 = param0;
}
_M0DTPC15error5Error58moonbitlang_2fcore_2fstrconv_2eStrConvError_2eStrConvError.prototype.$tag = 1;
function _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure(param0) {
  this._0 = param0;
}
_M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure.prototype.$tag = 0;
function _M0TPB4IterGRPC16string10StringViewE(param0, param1) {
  this.f = param0;
  this.size_hint = param1;
}
function _M0TPB4IterGcE(param0, param1) {
  this.f = param0;
  this.size_hint = param1;
}
function _M0TPC16string10StringView(param0, param1, param2) {
  this.str = param0;
  this.start = param1;
  this.end = param2;
}
function $bound_check(arr, index) {
  if (index < 0 || index >= arr.length) throw new Error("Index out of bounds");
}
function _M0TPB8MutLocalGiE(param0) {
  this.val = param0;
}
function $make_array_len_and_init(a, b) {
  const arr = new Array(a);
  arr.fill(b);
  return arr;
}
const _M0MPB7JSArray4push = (arr, val) => { arr.push(val); };
function _M0TPB4IterGsE(param0, param1) {
  this.f = param0;
  this.size_hint = param1;
}
function _M0TPB8MutLocalGORPC16string10StringViewE(param0) {
  this.val = param0;
}
function _M0TPB9ArrayViewGRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function _M0DTPC16option6OptionGRP319moonbit_2dcommunity7rabbita2js5ValueE4None() {}
_M0DTPC16option6OptionGRP319moonbit_2dcommunity7rabbita2js5ValueE4None.prototype.$tag = 0;
const _M0DTPC16option6OptionGRP319moonbit_2dcommunity7rabbita2js5ValueE4None__ = new _M0DTPC16option6OptionGRP319moonbit_2dcommunity7rabbita2js5ValueE4None();
function _M0DTPC16option6OptionGRP319moonbit_2dcommunity7rabbita2js5ValueE4Some(param0) {
  this._0 = param0;
}
_M0DTPC16option6OptionGRP319moonbit_2dcommunity7rabbita2js5ValueE4Some.prototype.$tag = 1;
function _M0TPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(param0, param1, param2, param3, param4, param5, param6) {
  this.entries = param0;
  this.size = param1;
  this.capacity = param2;
  this.capacity_mask = param3;
  this.grow_at = param4;
  this.head = param5;
  this.tail = param6;
}
function _M0TPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(param0, param1, param2, param3, param4, param5, param6) {
  this.entries = param0;
  this.size = param1;
  this.capacity = param2;
  this.capacity_mask = param3;
  this.grow_at = param4;
  this.head = param5;
  this.tail = param6;
}
function _M0TPB3MapGsRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(param0, param1, param2, param3, param4, param5, param6) {
  this.entries = param0;
  this.size = param1;
  this.capacity = param2;
  this.capacity_mask = param3;
  this.grow_at = param4;
  this.head = param5;
  this.tail = param6;
}
function _M0TPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(param0, param1, param2, param3, param4, param5, param6) {
  this.entries = param0;
  this.size = param1;
  this.capacity = param2;
  this.capacity_mask = param3;
  this.grow_at = param4;
  this.head = param5;
  this.tail = param6;
}
function _M0TPB5EntryGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(param0, param1, param2, param3, param4, param5) {
  this.prev = param0;
  this.next = param1;
  this.psl = param2;
  this.hash = param3;
  this.key = param4;
  this.value = param5;
}
function _M0TPB5EntryGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(param0, param1, param2, param3, param4, param5) {
  this.prev = param0;
  this.next = param1;
  this.psl = param2;
  this.hash = param3;
  this.key = param4;
  this.value = param5;
}
function _M0TPB5EntryGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(param0, param1, param2, param3, param4, param5) {
  this.prev = param0;
  this.next = param1;
  this.psl = param2;
  this.hash = param3;
  this.key = param4;
  this.value = param5;
}
function _M0TPB5EntryGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(param0, param1, param2, param3, param4, param5) {
  this.prev = param0;
  this.next = param1;
  this.psl = param2;
  this.hash = param3;
  this.key = param4;
  this.value = param5;
}
function _M0TPB5EntryGsRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(param0, param1, param2, param3, param4, param5) {
  this.prev = param0;
  this.next = param1;
  this.psl = param2;
  this.hash = param3;
  this.key = param4;
  this.value = param5;
}
function _M0TPB5EntryGssE(param0, param1, param2, param3, param4, param5) {
  this.prev = param0;
  this.next = param1;
  this.psl = param2;
  this.hash = param3;
  this.key = param4;
  this.value = param5;
}
function _M0TPB5EntryGsRP319moonbit_2dcommunity7rabbita7variant7VariantE(param0, param1, param2, param3, param4, param5) {
  this.prev = param0;
  this.next = param1;
  this.psl = param2;
  this.hash = param3;
  this.key = param4;
  this.value = param5;
}
function _M0TPB5EntryGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(param0, param1, param2, param3, param4, param5) {
  this.prev = param0;
  this.next = param1;
  this.psl = param2;
  this.hash = param3;
  this.key = param4;
  this.value = param5;
}
function _M0TPB8MutLocalGORPB5EntryGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEE(param0) {
  this.val = param0;
}
function _M0TPB8MutLocalGORPB5EntryGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkEE(param0) {
  this.val = param0;
}
function _M0TPB8MutLocalGORPB5EntryGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(param0) {
  this.val = param0;
}
function _M0TPB8MutLocalGORPB5EntryGsRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeEE(param0) {
  this.val = param0;
}
function _M0TPB9ArrayViewGRPC16string10StringViewE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
const _M0MPB7JSArray3pop = (arr) => arr.pop();
function _M0TPB9ArrayViewGsE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function _M0TPC13set3SetGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(param0, param1, param2, param3, param4, param5, param6) {
  this.entries = param0;
  this.size = param1;
  this.capacity = param2;
  this.capacity_mask = param3;
  this.grow_at = param4;
  this.head = param5;
  this.tail = param6;
}
function _M0TPC13set5EntryGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(param0, param1, param2, param3, param4) {
  this.prev = param0;
  this.next = param1;
  this.psl = param2;
  this.hash = param3;
  this.key = param4;
}
function _M0TPC13ref3RefGRP38zongen0116mgpic2026_2dsite4main5ModelE(param0) {
  this.val = param0;
}
function _M0TPC13ref3RefGiE(param0) {
  this.val = param0;
}
function _M0TPC15queue5QueueGRP38zongen0116mgpic2026_2dsite4main3MsgE(param0, param1, param2) {
  this.length = param0;
  this.first = param1;
  this.last = param2;
}
function _M0TPC15queue5QueueGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(param0, param1, param2) {
  this.length = param0;
  this.first = param1;
  this.last = param2;
}
function _M0TPC15queue5QueueGWRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(param0, param1, param2) {
  this.length = param0;
  this.first = param1;
  this.last = param2;
}
function _M0TPC15queue4ConsGRP38zongen0116mgpic2026_2dsite4main3MsgE(param0, param1) {
  this.content = param0;
  this.next = param1;
}
function _M0TPC15queue4ConsGWRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(param0, param1) {
  this.content = param0;
  this.next = param1;
}
function _M0TPC15queue4ConsGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(param0, param1) {
  this.content = param0;
  this.next = param1;
}
function _M0DTPC16result6ResultGUiRPC16string10StringViewbERPC17strconv12StrConvErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGUiRPC16string10StringViewbERPC17strconv12StrConvErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGUiRPC16string10StringViewbERPC17strconv12StrConvErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGUiRPC16string10StringViewbERPC17strconv12StrConvErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGuRPC17strconv12StrConvErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGuRPC17strconv12StrConvErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGuRPC17strconv12StrConvErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGuRPC17strconv12StrConvErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGiRPC17strconv12StrConvErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGiRPC17strconv12StrConvErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGiRPC17strconv12StrConvErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGiRPC17strconv12StrConvErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGlRPC17strconv12StrConvErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGlRPC17strconv12StrConvErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGlRPC17strconv12StrConvErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGlRPC17strconv12StrConvErrorE2Ok.prototype.$tag = 1;
const _M0MP319moonbit_2dcommunity7rabbita2js5Value4null = () => null;
const _M0MP319moonbit_2dcommunity7rabbita2js5Value8is__null = (n) => Object.is(n, null);
const _M0MP319moonbit_2dcommunity7rabbita2js5Value13is__undefined = (n) => Object.is(n, undefined);
function _M0DTPC16option6OptionGRP319moonbit_2dcommunity7rabbita3dom10MouseEventE4None() {}
_M0DTPC16option6OptionGRP319moonbit_2dcommunity7rabbita3dom10MouseEventE4None.prototype.$tag = 0;
const _M0DTPC16option6OptionGRP319moonbit_2dcommunity7rabbita3dom10MouseEventE4None__ = new _M0DTPC16option6OptionGRP319moonbit_2dcommunity7rabbita3dom10MouseEventE4None();
function _M0DTPC16option6OptionGRP319moonbit_2dcommunity7rabbita3dom10MouseEventE4Some(param0) {
  this._0 = param0;
}
_M0DTPC16option6OptionGRP319moonbit_2dcommunity7rabbita3dom10MouseEventE4Some.prototype.$tag = 1;
const _M0MP319moonbit_2dcommunity7rabbita3dom6Window12current__url = (self) => { return self.location.href; };
const _M0MP319moonbit_2dcommunity7rabbita3dom6Window25request__animation__frame = (self,f) => self.requestAnimationFrame(f);
const _M0FP319moonbit_2dcommunity7rabbita3dom6window = () => window;
const _M0FP319moonbit_2dcommunity7rabbita3dom18ffi__to__ui__event = (x) => x instanceof UIEvent ? x : null;
const _M0FP319moonbit_2dcommunity7rabbita3dom21ffi__to__svg__element = (x) => x instanceof SVGElement ? x : null;
const _M0FP319moonbit_2dcommunity7rabbita3dom10get__style = (self) => self.style;
const _M0FP319moonbit_2dcommunity7rabbita3dom21ffi__set__node__value = (x,v) => x.nodeValue = v;
const _M0FP319moonbit_2dcommunity7rabbita3dom18ffi__next__sibling = (x) => x.nextSibling;
const _M0FP319moonbit_2dcommunity7rabbita3dom22ffi__previous__sibling = (x) => x.previousSibling;
const _M0FP319moonbit_2dcommunity7rabbita3dom17ffi__parent__node = (x) => x.parentNode;
const _M0FP319moonbit_2dcommunity7rabbita3dom18ffi__append__child = (p,c) => p.appendChild(c);
const _M0FP319moonbit_2dcommunity7rabbita3dom18ffi__remove__child = (p,c) => p.removeChild(c);
const _M0FP319moonbit_2dcommunity7rabbita3dom14insert__before = (p,value,before) => p.insertBefore(value,before);
const _M0FP319moonbit_2dcommunity7rabbita3dom19ffi__is__same__node = (x, other) => x === other;
const _M0FP319moonbit_2dcommunity7rabbita3dom21ffi__to__mouse__event = (e) => e instanceof MouseEvent ? e : null;
const _M0FP319moonbit_2dcommunity7rabbita3dom28ffi__mouse__event__ctrl__key = (e) => e.ctrlKey;
const _M0FP319moonbit_2dcommunity7rabbita3dom28ffi__mouse__event__meta__key = (e) => e.metaKey;
const _M0FP319moonbit_2dcommunity7rabbita3dom24ffi__to__keyboard__event = (e) => e instanceof KeyboardEvent ? e : null;
const _M0FP319moonbit_2dcommunity7rabbita3dom22ffi__to__html__element = (x) => x instanceof HTMLElement ? x : null;
const _M0FP319moonbit_2dcommunity7rabbita3dom30ffi__html__element__get__style = (s) => s.style;
const _M0FP319moonbit_2dcommunity7rabbita3dom12console__log = (x) => console.log(x);
const _M0FP319moonbit_2dcommunity7rabbita3dom25ffi__add__event__listener = (target, type, listener) => target.addEventListener(type, listener);
const _M0FP319moonbit_2dcommunity7rabbita3dom16ffi__to__element = (x) => x.nodeType===1 ? x : null;
const _M0FP319moonbit_2dcommunity7rabbita3dom18ffi__event__target = (self) => self.target;
const _M0FP319moonbit_2dcommunity7rabbita3dom27ffi__event__current__target = (self) => self.currentTarget;
const _M0FP319moonbit_2dcommunity7rabbita3dom28ffi__event__prevent__default = (self) => self.preventDefault();
const _M0FP319moonbit_2dcommunity7rabbita3dom28ffi__element__set__attribute = (self,attr,value) => self.setAttribute(attr, value);
const _M0FP319moonbit_2dcommunity7rabbita3dom31ffi__element__remove__attribute = (self,attr) => self.removeAttribute(attr);
const _M0FP319moonbit_2dcommunity7rabbita3dom27ffi__element__set__property = (self,prop,value) => self[prop] = value;
const _M0FP319moonbit_2dcommunity7rabbita3dom27ffi__element__get__property = (self,prop) => self[prop];
const _M0FP319moonbit_2dcommunity7rabbita3dom30ffi__element__remove__property = (self,prop) => delete self[prop];
const _M0FP319moonbit_2dcommunity7rabbita3dom30ffi__element__set__inner__html = (self,html) => self.innerHTML = html;
const _M0MP319moonbit_2dcommunity7rabbita3dom19CSSStyleDeclaration13set__property = (self, property, value) => self.setProperty(property, value);
const _M0MP319moonbit_2dcommunity7rabbita3dom19CSSStyleDeclaration16remove__property = (self, property) => self.removeProperty(property);
const _M0FP319moonbit_2dcommunity7rabbita3dom8document = () => document;
const _M0MP319moonbit_2dcommunity7rabbita3dom8Document15create__element = (doc,tag) => doc.createElement(tag);
const _M0MP319moonbit_2dcommunity7rabbita3dom8Document27create__element__ns_2einner = (doc,namespace,qualifiedName) => doc.createElementNS(namespace, qualifiedName);
const _M0MP319moonbit_2dcommunity7rabbita3dom8Document18create__text__node = (doc,str) => doc.createTextNode(str);
const _M0MP319moonbit_2dcommunity7rabbita3dom8Document15create__comment = (doc,str) => doc.createComment(str);
const _M0MP319moonbit_2dcommunity7rabbita3dom8Document26create__document__fragment = (doc) => doc.createDocumentFragment();
const _M0MP319moonbit_2dcommunity7rabbita3dom8Document20get__element__by__id = (doc,id) => doc.getElementById(id);
function _M0DTPC16result6ResultGRP319moonbit_2dcommunity7rabbita3url3UrlRPC15error5ErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP319moonbit_2dcommunity7rabbita3url3UrlRPC15error5ErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP319moonbit_2dcommunity7rabbita3url3UrlRPC15error5ErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP319moonbit_2dcommunity7rabbita3url3UrlRPC15error5ErrorE2Ok.prototype.$tag = 1;
function _M0TP319moonbit_2dcommunity7rabbita3url3Url(param0, param1, param2, param3, param4, param5) {
  this.protocol = param0;
  this.host = param1;
  this.port = param2;
  this.path = param3;
  this.query = param4;
  this.fragment = param5;
}
function _M0TP419moonbit_2dcommunity7rabbita8internal7runtime8Instance(param0, param1, param2, param3, param4, param5) {
  this.cell = param0;
  this.inode = param1;
  this.link = param2;
  this.old_childs = param3;
  this.new_childs = param4;
  this.id = param5;
}
function _M0TP419moonbit_2dcommunity7rabbita8internal7runtime4Link(param0) {
  this.val = param0;
}
function _M0TPB9ArrayViewGURP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkEE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function _M0DTPC16option6OptionGRP319moonbit_2dcommunity7rabbita3dom4NodeE4None() {}
_M0DTPC16option6OptionGRP319moonbit_2dcommunity7rabbita3dom4NodeE4None.prototype.$tag = 0;
function _M0DTPC16option6OptionGRP319moonbit_2dcommunity7rabbita3dom4NodeE4Some(param0) {
  this._0 = param0;
}
_M0DTPC16option6OptionGRP319moonbit_2dcommunity7rabbita3dom4NodeE4Some.prototype.$tag = 1;
function _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime5INode4Elem(param0, param1, param2, param3, param4) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
  this._3 = param3;
  this._4 = param4;
}
_M0DTP419moonbit_2dcommunity7rabbita8internal7runtime5INode4Elem.prototype.$tag = 0;
function _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime5INode4Text(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP419moonbit_2dcommunity7rabbita8internal7runtime5INode4Text.prototype.$tag = 1;
function _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime5INode4Frag(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
_M0DTP419moonbit_2dcommunity7rabbita8internal7runtime5INode4Frag.prototype.$tag = 2;
function _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime5INode4Slot(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
_M0DTP419moonbit_2dcommunity7rabbita8internal7runtime5INode4Slot.prototype.$tag = 3;
function _M0TPB9ArrayViewGURP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime8ChildrenGRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE5Array(param0) {
  this._0 = param0;
}
_M0DTP419moonbit_2dcommunity7rabbita8internal7runtime8ChildrenGRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE5Array.prototype.$tag = 0;
function _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime8ChildrenGRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE3Map(param0) {
  this._0 = param0;
}
_M0DTP419moonbit_2dcommunity7rabbita8internal7runtime8ChildrenGRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE3Map.prototype.$tag = 1;
function _M0TPB9ArrayViewGUsRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeEE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function _M0TPB9ArrayViewGUsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEEE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function _M0TP419moonbit_2dcommunity7rabbita8internal7runtime5Props(param0, param1, param2, param3, param4) {
  this.slots = param0;
  this.handlers = param1;
  this.attrs = param2;
  this.props = param3;
  this.styles = param4;
}
function _M0TPB9ArrayViewGUsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function _M0TPB9ArrayViewGUssEE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function _M0TPB9ArrayViewGUsRP319moonbit_2dcommunity7rabbita7variant7VariantEE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime8ChildrenGRP419moonbit_2dcommunity7rabbita8internal7runtime5VNodeE5Array(param0) {
  this._0 = param0;
}
_M0DTP419moonbit_2dcommunity7rabbita8internal7runtime8ChildrenGRP419moonbit_2dcommunity7rabbita8internal7runtime5VNodeE5Array.prototype.$tag = 0;
function _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime8ChildrenGRP419moonbit_2dcommunity7rabbita8internal7runtime5VNodeE3Map(param0) {
  this._0 = param0;
}
_M0DTP419moonbit_2dcommunity7rabbita8internal7runtime8ChildrenGRP419moonbit_2dcommunity7rabbita8internal7runtime5VNodeE3Map.prototype.$tag = 1;
function _M0TPB8MutLocalGORP419moonbit_2dcommunity7rabbita8internal7runtime7SandboxE(param0) {
  this.val = param0;
}
function _M0DTP319moonbit_2dcommunity7rabbita3url10UrlRequest8Internal(param0) {
  this._0 = param0;
}
_M0DTP319moonbit_2dcommunity7rabbita3url10UrlRequest8Internal.prototype.$tag = 0;
function _M0DTP319moonbit_2dcommunity7rabbita3url10UrlRequest8External(param0) {
  this._0 = param0;
}
_M0DTP319moonbit_2dcommunity7rabbita3url10UrlRequest8External.prototype.$tag = 1;
function _M0TPB9ArrayViewGURP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEEE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function _M0TP419moonbit_2dcommunity7rabbita8internal7runtime7Sandbox(param0, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10) {
  this.live_map = param0;
  this.msg_queue = param1;
  this.after_render_queue = param2;
  this.drain_scheduled = param3;
  this.dirty_set = param4;
  this.paint_scheduled = param5;
  this.root = param6;
  this.captured_link_listener = param7;
  this.mount = param8;
  this.on_url_changed = param9;
  this.on_url_request = param10;
}
function _M0TP419moonbit_2dcommunity7rabbita8internal7runtime5Flags(param0, param1, param2) {
  this.id = param0;
  this.dirty = param1;
  this.attach_count = param2;
}
function _M0DTP319moonbit_2dcommunity7rabbita7variant7Variant7Boolean(param0) {
  this._0 = param0;
}
_M0DTP319moonbit_2dcommunity7rabbita7variant7Variant7Boolean.prototype.$tag = 0;
function _M0DTP319moonbit_2dcommunity7rabbita7variant7Variant7Integer(param0) {
  this._0 = param0;
}
_M0DTP319moonbit_2dcommunity7rabbita7variant7Variant7Integer.prototype.$tag = 1;
function _M0DTP319moonbit_2dcommunity7rabbita7variant7Variant8Floating(param0) {
  this._0 = param0;
}
_M0DTP319moonbit_2dcommunity7rabbita7variant7Variant8Floating.prototype.$tag = 2;
function _M0DTP319moonbit_2dcommunity7rabbita7variant7Variant6String(param0) {
  this._0 = param0;
}
_M0DTP319moonbit_2dcommunity7rabbita7variant7Variant6String.prototype.$tag = 3;
function _M0TP219moonbit_2dcommunity7rabbita3App(param0, param1) {
  this.sandbox = param0;
  this.init_cmd = param1;
}
function _M0TP219moonbit_2dcommunity7rabbita10DispatcherGRP38zongen0116mgpic2026_2dsite4main3MsgE(param0, param1) {
  this.id = param0;
  this.inbox = param1;
}
function _M0TP219moonbit_2dcommunity7rabbita9TypedCellGRP38zongen0116mgpic2026_2dsite4main5ModelRP38zongen0116mgpic2026_2dsite4main3MsgE(param0, param1, param2, param3, param4, param5) {
  this.model = param0;
  this.dispatcher = param1;
  this.dispatch = param2;
  this.update = param3;
  this.view = param4;
  this.flags = param5;
}
const _M0FP38zongen0116mgpic2026_2dsite4main20get__initial__locale = () => new URLSearchParams(window.location.search).get("lang") === "en" ? 1 : 0;
const _M0FP38zongen0116mgpic2026_2dsite4main18is__progress__page = () => window.location.pathname.endsWith("/progress.html");
const _M0FP38zongen0116mgpic2026_2dsite4main18is__showcase__page = () => window.location.pathname.endsWith("/showcase.html");
const _M0FP38zongen0116mgpic2026_2dsite4main18is__register__page = () => window.location.pathname.endsWith("/register.html");
const _M0FP38zongen0116mgpic2026_2dsite4main19prefers__dark__mode = () => window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
function _M0TP38zongen0116mgpic2026_2dsite4main5Model(param0, param1) {
  this.locale = param0;
  this.theme = param1;
}
function _M0TP38zongen0116mgpic2026_2dsite4main8InfoCard(param0, param1, param2) {
  this.badge = param0;
  this.title = param1;
  this.desc = param2;
}
function _M0TP38zongen0116mgpic2026_2dsite4main11ProcessItem(param0, param1, param2) {
  this.time = param0;
  this.title = param1;
  this.desc = param2;
}
function _M0TP38zongen0116mgpic2026_2dsite4main8ListCard(param0, param1, param2) {
  this.title = param0;
  this.desc = param1;
  this.items = param2;
}
function _M0TP38zongen0116mgpic2026_2dsite4main14ShowcaseSignal(param0, param1) {
  this.value = param0;
  this.label = param1;
}
function _M0TP38zongen0116mgpic2026_2dsite4main15ShowcaseProject(param0, param1, param2, param3, param4, param5, param6, param7) {
  this.status = param0;
  this.category = param1;
  this.title = param2;
  this.subtitle = param3;
  this.desc = param4;
  this.highlights = param5;
  this.tags = param6;
  this.links = param7;
}
function _M0TP38zongen0116mgpic2026_2dsite4main12ShowcaseLink(param0, param1) {
  this.label = param0;
  this.href = param1;
}
function _M0TP38zongen0116mgpic2026_2dsite4main9PrizeItem(param0, param1, param2) {
  this.award = param0;
  this.prize = param1;
  this.count = param2;
}
function _M0TP38zongen0116mgpic2026_2dsite4main7FaqItem(param0, param1, param2) {
  this.question = param0;
  this.answer = param1;
  this.opened = param2;
}
function _M0DTPC16option6OptionGRPB5ArrayGsEE4None() {}
_M0DTPC16option6OptionGRPB5ArrayGsEE4None.prototype.$tag = 0;
const _M0DTPC16option6OptionGRPB5ArrayGsEE4None__ = new _M0DTPC16option6OptionGRPB5ArrayGsEE4None();
function _M0DTPC16option6OptionGRPB5ArrayGsEE4Some(param0) {
  this._0 = param0;
}
_M0DTPC16option6OptionGRPB5ArrayGsEE4Some.prototype.$tag = 1;
const _M0FP0205moonbit_2dcommunity_2frabbita_2fTypedCell_5bzongen01_2fmgpic2026_2dsite_2fmain_2fModel_2c_20zongen01_2fmgpic2026_2dsite_2fmain_2fMsg_5d_24as_24_40moonbit_2dcommunity_2frabbita_2finternal_2fruntime_2eIsCell = { method_0: _M0IP219moonbit_2dcommunity7rabbita9TypedCellP419moonbit_2dcommunity7rabbita8internal7runtime6IsCell4stepGRP38zongen0116mgpic2026_2dsite4main5ModelRP38zongen0116mgpic2026_2dsite4main3MsgE, method_1: _M0IP219moonbit_2dcommunity7rabbita9TypedCellP419moonbit_2dcommunity7rabbita8internal7runtime6IsCell4viewGRP38zongen0116mgpic2026_2dsite4main5ModelRP38zongen0116mgpic2026_2dsite4main3MsgE, method_2: _M0IP219moonbit_2dcommunity7rabbita9TypedCellP419moonbit_2dcommunity7rabbita8internal7runtime6IsCell5flagsGRP38zongen0116mgpic2026_2dsite4main5ModelRP38zongen0116mgpic2026_2dsite4main3MsgE };
const _M0FP0133moonbit_2dcommunity_2frabbita_2finternal_2fruntime_2fSandbox_24as_24_40moonbit_2dcommunity_2frabbita_2finternal_2fruntime_2eScheduler = { method_0: _M0IP419moonbit_2dcommunity7rabbita8internal7runtime7SandboxP419moonbit_2dcommunity7rabbita8internal7runtime9Scheduler3add, method_1: _M0IP419moonbit_2dcommunity7rabbita8internal7runtime7SandboxP419moonbit_2dcommunity7rabbita8internal7runtime9Scheduler17add__url__changed, method_2: _M0IP419moonbit_2dcommunity7rabbita8internal7runtime7SandboxP419moonbit_2dcommunity7rabbita8internal7runtime9Scheduler17add__url__request };
const _M0MPB4Iter4nextN6constrS8630GURP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEE = 0;
const _M0MPB4Iter4nextN6constrS8631GURP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEE = 0;
const _M0MPB4Iter4nextN6constrS8630GcE = 0;
const _M0MPB4Iter4nextN6constrS8631GcE = 0;
const _M0MPB4Iter3newN6constrS8638GRPC16string10StringViewE = 0;
const _M0MPB4Iter3newN6constrS8638GcE = 0;
const _M0FPC17strconv14base__err__str = "invalid base";
const _M0FPC17strconv15range__err__str = "value out of range";
const _M0FPC17strconv16syntax__err__str = "invalid syntax";
const _M0FPC17strconv20parse__int64_2einnerN7_2abindS538 = "";
const _M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS311 = "://";
const _M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS310 = "Invalid protocol";
const _M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS297 = "?";
const _M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS295 = "";
const _M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS296 = "Invalid host";
const _M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS282 = "#";
const _M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS281 = "Invalid fragment";
const _M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS268 = "/";
const _M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS266 = "/";
const _M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS267 = "Invalid host";
const _M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS253 = ":";
const _M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS252 = "Invalid host";
const _M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS232 = "#";
const _M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS231 = "Invalid query";
const _M0MP419moonbit_2dcommunity7rabbita8internal7runtime7Sandbox3newN7_2abindS1309 = "";
const _M0FP419moonbit_2dcommunity7rabbita8internal7runtime4none = _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime3Cmd5Empty__;
const _M0FP319moonbit_2dcommunity7rabbita4html11push__styleN7_2abindS1975 = ";";
const _M0FP419moonbit_2dcommunity7rabbita8internal7runtime17global__id__count = _M0FPC13ref3newGiE(0);
const _M0FP319moonbit_2dcommunity7rabbita3cmd4none = _M0FP419moonbit_2dcommunity7rabbita8internal7runtime4none;
const _M0FPB4seed = _M0FPB12random__seed();
const _M0FPB18brute__force__findN6constrS8641 = 0;
const _M0FPB28boyer__moore__horspool__findN6constrS8640 = 0;
const _M0FP319moonbit_2dcommunity7rabbita3url5parseN6constrS346 = new _M0DTP319moonbit_2dcommunity7rabbita3url8Protocol5Other("");
const _M0FP38zongen0116mgpic2026_2dsite4main12view__footerN6constrS243 = "site-footer";
const _M0FP38zongen0116mgpic2026_2dsite4main12view__footerN6constrS244 = "container footer-inner";
const _M0FP38zongen0116mgpic2026_2dsite4main12view__footerN6constrS245 = "footer-copy";
const _M0FP38zongen0116mgpic2026_2dsite4main12view__footerN6constrS246 = "footer-links";
const _M0FP38zongen0116mgpic2026_2dsite4main12view__footerN6constrS247 = 1;
const _M0FP38zongen0116mgpic2026_2dsite4main12view__footerN6constrS248 = "noreferrer";
const _M0FP38zongen0116mgpic2026_2dsite4main12view__footerN6constrS249 = 1;
const _M0FP38zongen0116mgpic2026_2dsite4main12view__footerN6constrS250 = "noreferrer";
const _M0FP38zongen0116mgpic2026_2dsite4main12view__footerN6constrS251 = 1;
const _M0FP38zongen0116mgpic2026_2dsite4main12view__footerN6constrS252 = "noreferrer";
const _p = [];
const _M0FP319moonbit_2dcommunity7rabbita4html7nothing = new _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime5VNode4Frag(_p);
const _M0FP38zongen0116mgpic2026_2dsite4main14section__introN6constrS100 = "section-head";
const _M0FP38zongen0116mgpic2026_2dsite4main14section__introN6constrS101 = "eyebrow";
const _M0FP38zongen0116mgpic2026_2dsite4main15view__faq__itemN6constrS161 = "faq-item";
const _M0FP38zongen0116mgpic2026_2dsite4main9view__faqN6constrS239 = "faq";
const _M0FP38zongen0116mgpic2026_2dsite4main9view__faqN6constrS240 = "section section--alt";
const _M0FP38zongen0116mgpic2026_2dsite4main9view__faqN6constrS241 = "container";
const _M0FP38zongen0116mgpic2026_2dsite4main9view__faqN6constrS242 = "faq-list";
const _M0FP38zongen0116mgpic2026_2dsite4main27view__referral__prize__cardN6constrS143 = "prize-table-card referral-prize-card";
const _M0FP38zongen0116mgpic2026_2dsite4main27view__referral__prize__cardN6constrS144 = "referral-prize-head";
const _M0FP38zongen0116mgpic2026_2dsite4main27view__referral__prize__cardN6constrS145 = "referral-prize-amount";
const _M0FP38zongen0116mgpic2026_2dsite4main27view__referral__prize__cardN6constrS146 = "referral-prize-note-head";
const _M0FP38zongen0116mgpic2026_2dsite4main27view__referral__prize__cardN6constrS147 = "referral-prize-list";
const _M0FP38zongen0116mgpic2026_2dsite4main16view__prize__rowN6constrS138 = "prize-table-award";
const _M0FP38zongen0116mgpic2026_2dsite4main16view__prize__rowN6constrS139 = "prize-table-money";
const _M0FP38zongen0116mgpic2026_2dsite4main16view__prize__rowN6constrS140 = "prize-table-count";
const _M0FP38zongen0116mgpic2026_2dsite4main18view__prize__tableN6constrS141 = "prize-table-card";
const _M0FP38zongen0116mgpic2026_2dsite4main18view__prize__tableN6constrS142 = "prize-table";
const _M0FP38zongen0116mgpic2026_2dsite4main12view__awardsN6constrS201 = "awards";
const _M0FP38zongen0116mgpic2026_2dsite4main12view__awardsN6constrS202 = "section section--prize";
const _M0FP38zongen0116mgpic2026_2dsite4main12view__awardsN6constrS203 = "container";
const _M0FP38zongen0116mgpic2026_2dsite4main12view__awardsN6constrS204 = "prize-spotlight";
const _M0FP38zongen0116mgpic2026_2dsite4main12view__awardsN6constrS205 = "prize-copy";
const _M0FP38zongen0116mgpic2026_2dsite4main12view__awardsN6constrS206 = "eyebrow";
const _M0FP38zongen0116mgpic2026_2dsite4main12view__awardsN6constrS207 = "prize-pills";
const _M0FP38zongen0116mgpic2026_2dsite4main12view__awardsN6constrS208 = "prize-total-card";
const _M0FP38zongen0116mgpic2026_2dsite4main12view__awardsN6constrS209 = "button primary";
const _M0FP38zongen0116mgpic2026_2dsite4main12view__awardsN6constrS210 = "prize-table-grid";
const _M0FP38zongen0116mgpic2026_2dsite4main10nav__itemsN6recordS99 = new _M0TP38zongen0116mgpic2026_2dsite4main7NavItem("FAQ", "#faq");
const _M0FP38zongen0116mgpic2026_2dsite4main12view__headerN6constrS104 = "site-header";
const _M0FP38zongen0116mgpic2026_2dsite4main12view__headerN6constrS105 = "container nav-shell";
const _M0FP38zongen0116mgpic2026_2dsite4main12view__headerN6constrS106 = "brand";
const _M0FP38zongen0116mgpic2026_2dsite4main12view__headerN6constrS107 = "brand-logo";
const _M0FP38zongen0116mgpic2026_2dsite4main12view__headerN6constrS108 = "site-assets/moonbit-logo.png?v=20260428-progress-system";
const _M0FP38zongen0116mgpic2026_2dsite4main12view__headerN6constrS109 = "brand-copy";
const _M0FP38zongen0116mgpic2026_2dsite4main12view__headerN6constrS110 = "brand-subtitle";
const _M0FP38zongen0116mgpic2026_2dsite4main12view__headerN6constrS111 = "nav-links";
const _M0FP38zongen0116mgpic2026_2dsite4main12view__headerN6constrS112 = "toolbar";
const _M0FP38zongen0116mgpic2026_2dsite4main12view__headerN6constrS113 = "nav-action nav-action--signup";
const _M0FP38zongen0116mgpic2026_2dsite4main12view__headerN6constrS114 = "toolbar-btn";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS162 = "progress";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS163 = "section section--progress progress-page-section";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS164 = "container";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS165 = "progress-portal progress-page-portal";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS166 = "progress-copy";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS167 = "eyebrow";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS168 = "progress-page-actions";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS169 = "button primary";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS170 = "button secondary";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS171 = "button secondary";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS172 = "progress-login";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS173 = "github-login-card progress-login-card";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS174 = "button primary github-login-button";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS175 = "progress-plans";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS176 = "progress-plan-grid";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS177 = "path-card progress-plan-card";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS178 = "tag";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS179 = "path-card progress-plan-card";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS180 = "tag";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS181 = "progress-dashboard progress-dashboard--preview";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS182 = "progress-alert";
const _M0FP38zongen0116mgpic2026_2dsite4main20section__intro__wideN6constrS102 = "section-head section-head--wide";
const _M0FP38zongen0116mgpic2026_2dsite4main20section__intro__wideN6constrS103 = "eyebrow";
const _M0FP38zongen0116mgpic2026_2dsite4main16view__info__cardN6constrS131 = "info-card";
const _M0FP38zongen0116mgpic2026_2dsite4main16view__info__cardN6constrS132 = "tag";
const _M0FP38zongen0116mgpic2026_2dsite4main11view__aboutN6constrS196 = "about";
const _M0FP38zongen0116mgpic2026_2dsite4main11view__aboutN6constrS197 = "section";
const _M0FP38zongen0116mgpic2026_2dsite4main11view__aboutN6constrS198 = "container";
const _M0FP38zongen0116mgpic2026_2dsite4main11view__aboutN6constrS199 = "summary-grid position-summary-grid";
const _M0FP38zongen0116mgpic2026_2dsite4main11view__aboutN6constrS200 = "card-grid";
const _M0FP38zongen0116mgpic2026_2dsite4main16view__list__cardN6constrS133 = "showcase-card direction-card";
const _M0FP38zongen0116mgpic2026_2dsite4main16view__list__cardN6constrS134 = "path-points";
const _M0FP38zongen0116mgpic2026_2dsite4main16view__directionsN6constrS225 = "directions";
const _M0FP38zongen0116mgpic2026_2dsite4main16view__directionsN6constrS226 = "section";
const _M0FP38zongen0116mgpic2026_2dsite4main16view__directionsN6constrS227 = "container";
const _M0FP38zongen0116mgpic2026_2dsite4main16view__directionsN6constrS228 = "showcase-grid direction-grid";
const _M0FP38zongen0116mgpic2026_2dsite4main22view__showcase__signalN6constrS148 = "showcase-signal-card";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__showcase__linkN6constrS149 = "showcase-project-link";
const _M0FP38zongen0116mgpic2026_2dsite4main23view__showcase__projectN6constrS150 = "showcase-project-card";
const _M0FP38zongen0116mgpic2026_2dsite4main23view__showcase__projectN6constrS151 = "showcase-project-body";
const _M0FP38zongen0116mgpic2026_2dsite4main23view__showcase__projectN6constrS152 = "showcase-project-meta";
const _M0FP38zongen0116mgpic2026_2dsite4main23view__showcase__projectN6constrS153 = "showcase-project-title";
const _M0FP38zongen0116mgpic2026_2dsite4main23view__showcase__projectN6constrS154 = "showcase-project-subtitle";
const _M0FP38zongen0116mgpic2026_2dsite4main23view__showcase__projectN6constrS155 = "showcase-project-desc";
const _M0FP38zongen0116mgpic2026_2dsite4main23view__showcase__projectN6constrS156 = "showcase-project-highlights";
const _M0FP38zongen0116mgpic2026_2dsite4main23view__showcase__projectN6constrS157 = "showcase-project-highlight";
const _M0FP38zongen0116mgpic2026_2dsite4main23view__showcase__projectN6constrS158 = "showcase-project-tags";
const _M0FP38zongen0116mgpic2026_2dsite4main23view__showcase__projectN6constrS159 = "showcase-project-tag";
const _M0FP38zongen0116mgpic2026_2dsite4main23view__showcase__projectN6constrS160 = "showcase-project-links";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__showcase__wallN6constrS211 = "showcase";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__showcase__wallN6constrS212 = "section section--showcase-wall";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__showcase__wallN6constrS213 = "container";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__showcase__wallN6constrS214 = "showcase-wall-panel";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__showcase__wallN6constrS215 = "showcase-wall-head";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__showcase__wallN6constrS216 = "button secondary";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__showcase__wallN6constrS217 = "showcase-signal-grid";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__showcase__wallN6constrS218 = "showcase-wall-list-head";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__showcase__wallN6constrS219 = "showcase-wall-grid";
const _M0FP38zongen0116mgpic2026_2dsite4main18view__requirementsN6constrS229 = "requirements";
const _M0FP38zongen0116mgpic2026_2dsite4main18view__requirementsN6constrS230 = "section";
const _M0FP38zongen0116mgpic2026_2dsite4main18view__requirementsN6constrS231 = "container";
const _M0FP38zongen0116mgpic2026_2dsite4main18view__requirementsN6constrS232 = "requirements-layout";
const _M0FP38zongen0116mgpic2026_2dsite4main18view__requirementsN6constrS233 = "path-card checklist-card";
const _M0FP38zongen0116mgpic2026_2dsite4main18view__requirementsN6constrS234 = "tag";
const _M0FP38zongen0116mgpic2026_2dsite4main18view__requirementsN6constrS235 = "path-points";
const _M0FP38zongen0116mgpic2026_2dsite4main18view__requirementsN6constrS236 = "checklist-actions";
const _M0FP38zongen0116mgpic2026_2dsite4main18view__requirementsN6constrS237 = "button primary";
const _M0FP38zongen0116mgpic2026_2dsite4main18view__requirementsN6constrS238 = "button secondary";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__register__pageN6constrS183 = "register-system";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__register__pageN6constrS184 = "section section--progress progress-page-section";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__register__pageN6constrS185 = "container";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__register__pageN6constrS186 = "register-shell register-shell--stacked";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__register__pageN6constrS187 = "register-copy register-copy--top";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__register__pageN6constrS188 = "eyebrow";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__register__pageN6constrS189 = "progress-page-actions";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__register__pageN6constrS190 = "button primary";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__register__pageN6constrS191 = "button secondary";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__register__pageN6constrS192 = "button secondary";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__register__pageN6constrS193 = "register-form";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__register__pageN6constrS194 = "register-form-card";
const _M0FP38zongen0116mgpic2026_2dsite4main20view__register__pageN6constrS195 = "progress-alert";
const _M0FP38zongen0116mgpic2026_2dsite4main18view__process__rowN6constrS135 = "process-table-time";
const _M0FP38zongen0116mgpic2026_2dsite4main18view__process__rowN6constrS136 = "process-table-title";
const _M0FP38zongen0116mgpic2026_2dsite4main18view__process__rowN6constrS137 = "process-table-desc";
const _M0FP38zongen0116mgpic2026_2dsite4main13view__processN6constrS220 = "process";
const _M0FP38zongen0116mgpic2026_2dsite4main13view__processN6constrS221 = "section section--alt";
const _M0FP38zongen0116mgpic2026_2dsite4main13view__processN6constrS222 = "container";
const _M0FP38zongen0116mgpic2026_2dsite4main13view__processN6constrS223 = "process-table-wrap";
const _M0FP38zongen0116mgpic2026_2dsite4main13view__processN6constrS224 = "process-table";
const _M0FP38zongen0116mgpic2026_2dsite4main10view__heroN6constrS115 = "top";
const _M0FP38zongen0116mgpic2026_2dsite4main10view__heroN6constrS116 = "hero hero--clean";
const _M0FP38zongen0116mgpic2026_2dsite4main10view__heroN6constrS117 = "container";
const _M0FP38zongen0116mgpic2026_2dsite4main10view__heroN6constrS118 = "hero-banner hero-banner--kv";
const _M0FP38zongen0116mgpic2026_2dsite4main10view__heroN6constrS119 = "hero-kv-image";
const _M0FP38zongen0116mgpic2026_2dsite4main10view__heroN6constrS120 = "site-assets/main-kv.png?v=20260428-progress-system";
const _M0FP38zongen0116mgpic2026_2dsite4main10view__heroN6constrS121 = "hero-cta-row";
const _M0FP38zongen0116mgpic2026_2dsite4main10view__heroN6constrS122 = "hero-cta-copy";
const _M0FP38zongen0116mgpic2026_2dsite4main10view__heroN6constrS123 = "hero-cta-actions";
const _M0FP38zongen0116mgpic2026_2dsite4main10view__heroN6constrS124 = "button primary hero-cta-button";
const _M0FP38zongen0116mgpic2026_2dsite4main10view__heroN6constrS125 = "button secondary hero-cta-button";
const _M0FP38zongen0116mgpic2026_2dsite4main10view__heroN6constrS126 = "button secondary hero-cta-button";
const _M0FP38zongen0116mgpic2026_2dsite4main10view__heroN6constrS127 = "button secondary hero-cta-button";
const _M0FP38zongen0116mgpic2026_2dsite4main10view__heroN6constrS128 = 1;
const _M0FP38zongen0116mgpic2026_2dsite4main10view__heroN6constrS129 = "noreferrer";
const _M0FP38zongen0116mgpic2026_2dsite4main10view__heroN6constrS130 = "button secondary hero-cta-button";
const _M0FP38zongen0116mgpic2026_2dsite4main4viewN6constrS253 = "page-main";
const _M0FP38zongen0116mgpic2026_2dsite4main4viewN6constrS254 = "page-main";
const _M0FP38zongen0116mgpic2026_2dsite4main4viewN6constrS255 = "page-main";
const _M0FP38zongen0116mgpic2026_2dsite4main4viewN6constrS256 = "page-main";
function _M0FPC15abort5abortGuE(msg) {
  $panic();
}
function _M0FPC15abort5abortGRPB9ArrayViewGRPC16string10StringViewEE(msg) {
  return $panic();
}
function _M0FPC15abort5abortGOiE(msg) {
  return $panic();
}
function _M0MPB6Hasher8consume4(self, input) {
  const _p$2 = (self.acc >>> 0) + ((Math.imul(input, -1028477379) | 0) >>> 0) | 0;
  const _p$3 = 17;
  self.acc = Math.imul(_p$2 << _p$3 | (_p$2 >>> (32 - _p$3 | 0) | 0), 668265263) | 0;
}
function _M0MPB6Hasher13combine__uint(self, value) {
  self.acc = (self.acc >>> 0) + (4 >>> 0) | 0;
  _M0MPB6Hasher8consume4(self, value);
}
function _M0MPB13StringBuilder11new_2einner(size_hint) {
  return new _M0TPB13StringBuilder("");
}
function _M0MPC16uint166UInt1622is__leading__surrogate(self) {
  return _M0IP016_24default__implPB7Compare6op__geGkE(self, 55296) && _M0IP016_24default__implPB7Compare6op__leGkE(self, 56319);
}
function _M0MPC16uint166UInt1623is__trailing__surrogate(self) {
  return _M0IP016_24default__implPB7Compare6op__geGkE(self, 56320) && _M0IP016_24default__implPB7Compare6op__leGkE(self, 57343);
}
function _M0FPB32code__point__of__surrogate__pair(leading, trailing) {
  return (((Math.imul(leading - 55296 | 0, 1024) | 0) + trailing | 0) - 56320 | 0) + 65536 | 0;
}
function _M0MPC16string6String16unsafe__char__at(self, index) {
  const c1 = self.charCodeAt(index);
  if (_M0MPC16uint166UInt1622is__leading__surrogate(c1)) {
    const c2 = self.charCodeAt(index + 1 | 0);
    return _M0FPB32code__point__of__surrogate__pair(c1, c2);
  } else {
    return c1;
  }
}
function _M0IPB13StringBuilderPB6Logger13write__string(self, str) {
  self.val = `${self.val}${str}`;
}
function _M0MPB6Hasher12combine__int(self, value) {
  _M0MPB6Hasher13combine__uint(self, value);
}
function _M0MPB6Hasher7combineGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(self, value) {
  _M0IP419moonbit_2dcommunity7rabbita8internal7runtime2IdPB4Hash13hash__combine(value, self);
}
function _M0MPB6Hasher7combineGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdE(self, value) {
  _M0IP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdPB4Hash13hash__combine(value, self);
}
function _M0MPB6Hasher7combineGsE(self, value) {
  _M0IPC16string6StringPB4Hash13hash__combine(value, self);
}
function _M0IP016_24default__implPB2Eq10not__equalGOsE(x, y) {
  return !_M0IPC16option6OptionPB2Eq5equalGsE(x, y);
}
function _M0IP016_24default__implPB2Eq10not__equalGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(x, y) {
  return !(x === y);
}
function _M0IP016_24default__implPB2Eq10not__equalGRP319moonbit_2dcommunity7rabbita7variant7VariantE(x, y) {
  return !_M0IP319moonbit_2dcommunity7rabbita7variant7VariantPB2Eq5equal(x, y);
}
function _M0IP016_24default__implPB2Eq10not__equalGRPC16string10StringViewE(x, y) {
  return !_M0IPC16string10StringViewPB2Eq5equal(x, y);
}
function _M0IP016_24default__implPB7Compare6op__leGkE(x, y) {
  return $compare_int(x, y) <= 0;
}
function _M0IP016_24default__implPB7Compare6op__geGkE(x, y) {
  return $compare_int(x, y) >= 0;
}
function _M0MPB6Hasher9avalanche(self) {
  let acc = self.acc;
  acc = acc ^ (acc >>> 15 | 0);
  acc = Math.imul(acc, -2048144777) | 0;
  acc = acc ^ (acc >>> 13 | 0);
  acc = Math.imul(acc, -1028477379) | 0;
  acc = acc ^ (acc >>> 16 | 0);
  return acc;
}
function _M0MPB6Hasher8finalize(self) {
  return _M0MPB6Hasher9avalanche(self);
}
function _M0MPB6Hasher11new_2einner(seed) {
  return new _M0TPB6Hasher((seed >>> 0) + (374761393 >>> 0) | 0);
}
function _M0MPB6Hasher3new(seed$46$opt) {
  let seed;
  if (seed$46$opt === undefined) {
    seed = _M0FPB4seed;
  } else {
    const _Some = seed$46$opt;
    seed = _Some;
  }
  return _M0MPB6Hasher11new_2einner(seed);
}
function _M0IP016_24default__implPB4Hash4hashGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(self) {
  const h = _M0MPB6Hasher3new(undefined);
  _M0MPB6Hasher7combineGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(h, self);
  return _M0MPB6Hasher8finalize(h);
}
function _M0IP016_24default__implPB4Hash4hashGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdE(self) {
  const h = _M0MPB6Hasher3new(undefined);
  _M0MPB6Hasher7combineGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdE(h, self);
  return _M0MPB6Hasher8finalize(h);
}
function _M0IP016_24default__implPB4Hash4hashGsE(self) {
  const h = _M0MPB6Hasher3new(undefined);
  _M0MPB6Hasher7combineGsE(h, self);
  return _M0MPB6Hasher8finalize(h);
}
function _M0MPB4Iter4nextGURP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEE(self) {
  const _func = self.f;
  const result = _func();
  const _bind = self.size_hint;
  if (result === undefined) {
    self.size_hint = _M0MPB4Iter4nextN6constrS8631GURP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEE;
  } else {
    if (_bind === undefined) {
    } else {
      const _Some = _bind;
      const _n = _Some;
      self.size_hint = _n > 0 ? _n - 1 | 0 : _M0MPB4Iter4nextN6constrS8630GURP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEE;
    }
  }
  return result;
}
function _M0MPB4Iter4nextGcE(self) {
  const _func = self.f;
  const result = _func();
  const _bind = self.size_hint;
  if (result === -1) {
    self.size_hint = _M0MPB4Iter4nextN6constrS8631GcE;
  } else {
    if (_bind === undefined) {
    } else {
      const _Some = _bind;
      const _n = _Some;
      self.size_hint = _n > 0 ? _n - 1 | 0 : _M0MPB4Iter4nextN6constrS8630GcE;
    }
  }
  return result;
}
function _M0MPC13int3Int18to__string_2einner(self, radix) {
  return _M0FPB19int__to__string__js(self, radix);
}
function _M0FPB4failGURP319moonbit_2dcommunity7rabbita3url8ProtocolRPC16string10StringViewEE(msg, loc) {
  return new _M0DTPC16result6ResultGURP319moonbit_2dcommunity7rabbita3url8ProtocolRPC16string10StringViewERPB7FailureE3Err(new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure(`${loc} FAILED: ${_M0IPC16string10StringViewPB4Show10to__string(msg)}`));
}
function _M0MPB4Iter3newGRPC16string10StringViewE(f, size_hint) {
  let size_hint$2;
  if (size_hint === undefined) {
    size_hint$2 = undefined;
  } else {
    const _Some = size_hint;
    const _n = _Some;
    size_hint$2 = _n > 0 ? _n : _M0MPB4Iter3newN6constrS8638GRPC16string10StringViewE;
  }
  return new _M0TPB4IterGRPC16string10StringViewE(f, size_hint$2);
}
function _M0MPB4Iter3newGcE(f, size_hint) {
  let size_hint$2;
  if (size_hint === undefined) {
    size_hint$2 = undefined;
  } else {
    const _Some = size_hint;
    const _n = _Some;
    size_hint$2 = _n > 0 ? _n : _M0MPB4Iter3newN6constrS8638GcE;
  }
  return new _M0TPB4IterGcE(f, size_hint$2);
}
function _M0MPC16string10StringView12view_2einner(self, start_offset, end_offset) {
  let end_offset$2;
  if (end_offset === undefined) {
    end_offset$2 = self.end - self.start | 0;
  } else {
    const _Some = end_offset;
    end_offset$2 = _Some;
  }
  return start_offset >= 0 && (start_offset <= end_offset$2 && end_offset$2 <= (self.end - self.start | 0)) ? new _M0TPC16string10StringView(self.str, self.start + start_offset | 0, self.start + end_offset$2 | 0) : _M0FPC15abort5abortGRPB9ArrayViewGRPC16string10StringViewEE("Invalid index for View");
}
function _M0MPC16string10StringView9to__owned(self) {
  return self.str.substring(self.start, self.end);
}
function _M0IPC16string10StringViewPB4Show10to__string(self) {
  return _M0MPC16string10StringView9to__owned(self);
}
function _M0MPC16string10StringView4iter(self) {
  const start = self.start;
  const end = self.end;
  const index = new _M0TPB8MutLocalGiE(start);
  return _M0MPB4Iter3newGcE(() => {
    if (index.val < end) {
      const c1 = self.str.charCodeAt(index.val);
      if (_M0MPC16uint166UInt1622is__leading__surrogate(c1) && (index.val + 1 | 0) < self.end) {
        const c2 = self.str.charCodeAt(index.val + 1 | 0);
        if (_M0MPC16uint166UInt1623is__trailing__surrogate(c2)) {
          index.val = index.val + 2 | 0;
          return _M0FPB32code__point__of__surrogate__pair(c1, c2);
        }
      }
      index.val = index.val + 1 | 0;
      return c1;
    } else {
      return -1;
    }
  }, undefined);
}
function _M0IPC16string10StringViewPB2Eq5equal(self, other) {
  const len = self.end - self.start | 0;
  if (len === (other.end - other.start | 0)) {
    if (self.str === other.str && self.start === other.start) {
      return true;
    }
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < len) {
        const _p$2 = self.str.charCodeAt(self.start + i | 0);
        const _p$3 = other.str.charCodeAt(other.start + i | 0);
        if (_p$2 === _p$3) {
        } else {
          return false;
        }
        _tmp = i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return true;
  } else {
    return false;
  }
}
function _M0MPC16string6String12view_2einner(self, start_offset, end_offset) {
  let end_offset$2;
  if (end_offset === undefined) {
    end_offset$2 = self.length;
  } else {
    const _Some = end_offset;
    end_offset$2 = _Some;
  }
  return start_offset >= 0 && (start_offset <= end_offset$2 && end_offset$2 <= self.length) ? new _M0TPC16string10StringView(self, start_offset, end_offset$2) : _M0FPC15abort5abortGRPB9ArrayViewGRPC16string10StringViewEE("Invalid index for View");
}
function _M0MPC16string6String24char__length__eq_2einner(self, len, start_offset, end_offset) {
  let end_offset$2;
  if (end_offset === undefined) {
    end_offset$2 = self.length;
  } else {
    const _Some = end_offset;
    end_offset$2 = _Some;
  }
  let _tmp = start_offset;
  let _tmp$2 = 0;
  while (true) {
    const index = _tmp;
    const count = _tmp$2;
    if (index < end_offset$2 && count < len) {
      const c1 = self.charCodeAt(index);
      if (_M0MPC16uint166UInt1622is__leading__surrogate(c1) && (index + 1 | 0) < end_offset$2) {
        const c2 = self.charCodeAt(index + 1 | 0);
        if (_M0MPC16uint166UInt1623is__trailing__surrogate(c2)) {
          _tmp = index + 2 | 0;
          _tmp$2 = count + 1 | 0;
          continue;
        } else {
          _M0FPC15abort5abortGuE("invalid surrogate pair");
        }
      }
      _tmp = index + 1 | 0;
      _tmp$2 = count + 1 | 0;
      continue;
    } else {
      return count === len && index === end_offset$2;
    }
  }
}
function _M0MPC16string6String24char__length__ge_2einner(self, len, start_offset, end_offset) {
  let end_offset$2;
  if (end_offset === undefined) {
    end_offset$2 = self.length;
  } else {
    const _Some = end_offset;
    end_offset$2 = _Some;
  }
  let _tmp = start_offset;
  let _tmp$2 = 0;
  while (true) {
    const index = _tmp;
    const count = _tmp$2;
    if (index < end_offset$2 && count < len) {
      const c1 = self.charCodeAt(index);
      if (_M0MPC16uint166UInt1622is__leading__surrogate(c1) && (index + 1 | 0) < end_offset$2) {
        const c2 = self.charCodeAt(index + 1 | 0);
        if (_M0MPC16uint166UInt1623is__trailing__surrogate(c2)) {
          _tmp = index + 2 | 0;
          _tmp$2 = count + 1 | 0;
          continue;
        } else {
          _M0FPC15abort5abortGuE("invalid surrogate pair");
        }
      }
      _tmp = index + 1 | 0;
      _tmp$2 = count + 1 | 0;
      continue;
    } else {
      return count >= len;
    }
  }
}
function _M0MPC16string6String31offset__of__nth__char__backward(self, n, start_offset, end_offset) {
  let _tmp = end_offset;
  let _tmp$2 = 0;
  while (true) {
    const utf16_offset = _tmp;
    const char_count = _tmp$2;
    if ((utf16_offset - 1 | 0) >= start_offset && char_count < n) {
      const c = self.charCodeAt(utf16_offset - 1 | 0);
      if (_M0MPC16uint166UInt1623is__trailing__surrogate(c)) {
        _tmp = utf16_offset - 2 | 0;
        _tmp$2 = char_count + 1 | 0;
        continue;
      } else {
        _tmp = utf16_offset - 1 | 0;
        _tmp$2 = char_count + 1 | 0;
        continue;
      }
    } else {
      return char_count < n || utf16_offset < start_offset ? undefined : utf16_offset;
    }
  }
}
function _M0MPC16string6String30offset__of__nth__char__forward(self, n, start_offset, end_offset) {
  if (start_offset >= 0 && start_offset <= end_offset) {
    let _tmp = start_offset;
    let _tmp$2 = 0;
    while (true) {
      const utf16_offset = _tmp;
      const char_count = _tmp$2;
      if (utf16_offset < end_offset && char_count < n) {
        const c = self.charCodeAt(utf16_offset);
        if (_M0MPC16uint166UInt1622is__leading__surrogate(c)) {
          _tmp = utf16_offset + 2 | 0;
          _tmp$2 = char_count + 1 | 0;
          continue;
        } else {
          _tmp = utf16_offset + 1 | 0;
          _tmp$2 = char_count + 1 | 0;
          continue;
        }
      } else {
        return char_count < n || utf16_offset >= end_offset ? undefined : utf16_offset;
      }
    }
  } else {
    return _M0FPC15abort5abortGOiE("Invalid start index");
  }
}
function _M0MPC16string6String29offset__of__nth__char_2einner(self, i, start_offset, end_offset) {
  let end_offset$2;
  if (end_offset === undefined) {
    end_offset$2 = self.length;
  } else {
    const _Some = end_offset;
    end_offset$2 = _Some;
  }
  return i >= 0 ? _M0MPC16string6String30offset__of__nth__char__forward(self, i, start_offset, end_offset$2) : _M0MPC16string6String31offset__of__nth__char__backward(self, -i | 0, start_offset, end_offset$2);
}
function _M0IPB13StringBuilderPB6Logger11write__view(self, str) {
  self.val = `${self.val}${_M0MPC16string10StringView9to__owned(str)}`;
}
function _M0FPB28boyer__moore__horspool__find(haystack, needle) {
  const haystack_len = haystack.end - haystack.start | 0;
  const needle_len = needle.end - needle.start | 0;
  if (needle_len > 0) {
    if (haystack_len >= needle_len) {
      const skip_table = $make_array_len_and_init(256, needle_len);
      const _bind = needle_len - 1 | 0;
      let _tmp = 0;
      while (true) {
        const i = _tmp;
        if (i < _bind) {
          const _tmp$2 = needle.str.charCodeAt(needle.start + i | 0) & 255;
          $bound_check(skip_table, _tmp$2);
          skip_table[_tmp$2] = (needle_len - 1 | 0) - i | 0;
          _tmp = i + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      let _tmp$2 = 0;
      while (true) {
        const i = _tmp$2;
        if (i <= (haystack_len - needle_len | 0)) {
          const _bind$2 = needle_len - 1 | 0;
          let _tmp$3 = 0;
          while (true) {
            const j = _tmp$3;
            if (j <= _bind$2) {
              const _p$2 = i + j | 0;
              const _p$3 = haystack.str.charCodeAt(haystack.start + _p$2 | 0);
              const _p$4 = needle.str.charCodeAt(needle.start + j | 0);
              if (_p$3 !== _p$4) {
                break;
              }
              _tmp$3 = j + 1 | 0;
              continue;
            } else {
              return i;
            }
          }
          const _p$2 = (i + needle_len | 0) - 1 | 0;
          const _tmp$4 = haystack.str.charCodeAt(haystack.start + _p$2 | 0) & 255;
          $bound_check(skip_table, _tmp$4);
          _tmp$2 = i + skip_table[_tmp$4] | 0;
          continue;
        } else {
          break;
        }
      }
      return undefined;
    } else {
      return undefined;
    }
  } else {
    return _M0FPB28boyer__moore__horspool__findN6constrS8640;
  }
}
function _M0FPB18brute__force__find(haystack, needle) {
  const haystack_len = haystack.end - haystack.start | 0;
  const needle_len = needle.end - needle.start | 0;
  if (needle_len > 0) {
    if (haystack_len >= needle_len) {
      const _p$2 = 0;
      const needle_first = needle.str.charCodeAt(needle.start + _p$2 | 0);
      const forward_len = haystack_len - needle_len | 0;
      let _tmp = 0;
      while (true) {
        const i = _tmp;
        if (i <= forward_len) {
          const _p$3 = haystack.str.charCodeAt(haystack.start + i | 0);
          if (_p$3 !== needle_first) {
            _tmp = i + 1 | 0;
            continue;
          }
          let _tmp$2 = 1;
          while (true) {
            const j = _tmp$2;
            if (j < needle_len) {
              const _p$4 = i + j | 0;
              const _p$5 = haystack.str.charCodeAt(haystack.start + _p$4 | 0);
              const _p$6 = needle.str.charCodeAt(needle.start + j | 0);
              if (_p$5 !== _p$6) {
                break;
              }
              _tmp$2 = j + 1 | 0;
              continue;
            } else {
              return i;
            }
          }
          _tmp = i + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      return undefined;
    } else {
      return undefined;
    }
  } else {
    return _M0FPB18brute__force__findN6constrS8641;
  }
}
function _M0MPC16string10StringView4find(self, str) {
  return (str.end - str.start | 0) <= 4 ? _M0FPB18brute__force__find(self, str) : _M0FPB28boyer__moore__horspool__find(self, str);
}
function _M0MPC15array5Array11new_2einnerGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(capacity) {
  return [];
}
function _M0MPC15array5Array11new_2einnerGRPC16string10StringViewE(capacity) {
  return [];
}
function _M0MPC15array5Array4pushGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(self, value) {
  _M0MPB7JSArray4push(self, value);
}
function _M0MPC15array5Array4pushGRPC16string10StringViewE(self, value) {
  _M0MPB7JSArray4push(self, value);
}
function _M0MPC16string10StringView9is__empty(self) {
  return (self.end - self.start | 0) === 0;
}
function _M0MPB4Iter3mapGRPC16string10StringViewsE(self, f) {
  return new _M0TPB4IterGsE(() => {
    const _bind = _M0MPB4Iter4nextGURP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEE(self);
    if (_bind === undefined) {
      return undefined;
    } else {
      const _Some = _bind;
      const _x = _Some;
      return f(_x);
    }
  }, self.size_hint);
}
function _M0MPB4Iter3mapGcRPC16string10StringViewE(self, f) {
  return new _M0TPB4IterGRPC16string10StringViewE(() => {
    const _bind = _M0MPB4Iter4nextGcE(self);
    if (_bind === -1) {
      return undefined;
    } else {
      const _Some = _bind;
      const _x = _Some;
      return f(_x);
    }
  }, self.size_hint);
}
function _M0IPC14char4CharPB4Show10to__string(self) {
  return String.fromCodePoint(self);
}
function _M0MPC16string10StringView5split(self, sep) {
  const sep_len = sep.end - sep.start | 0;
  if (sep_len === 0) {
    return _M0MPB4Iter3mapGcRPC16string10StringViewE(_M0MPC16string10StringView4iter(self), (c) => _M0MPC16string6String12view_2einner(_M0IPC14char4CharPB4Show10to__string(c), 0, undefined));
  }
  const remaining = new _M0TPB8MutLocalGORPC16string10StringViewE(self);
  return _M0MPB4Iter3newGRPC16string10StringViewE(() => {
    const _bind = remaining.val;
    if (_bind === undefined) {
      return undefined;
    } else {
      const _Some = _bind;
      const _view = _Some;
      const _bind$2 = _M0MPC16string10StringView4find(_view, sep);
      if (_bind$2 === undefined) {
        remaining.val = undefined;
        return _view;
      } else {
        const _Some$2 = _bind$2;
        const _end = _Some$2;
        remaining.val = _M0MPC16string10StringView12view_2einner(_view, _end + sep_len | 0, undefined);
        return _M0MPC16string10StringView12view_2einner(_view, 0, _end);
      }
    }
  }, undefined);
}
function _M0MPC16string6String5split(self, sep) {
  return _M0MPC16string10StringView5split(new _M0TPC16string10StringView(self, 0, self.length), sep);
}
function _M0MPB4Iter9to__arrayGRPC16string10StringViewE(self) {
  const _bind = self.size_hint;
  let result;
  if (_bind === undefined) {
    result = [];
  } else {
    const _Some = _bind;
    const _n = _Some;
    result = _M0MPC15array5Array11new_2einnerGRPC16string10StringViewE(_n);
  }
  while (true) {
    const _bind$2 = _M0MPB4Iter4nextGURP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEE(self);
    if (_bind$2 === undefined) {
      break;
    } else {
      const _Some = _bind$2;
      const _x = _Some;
      _M0MPC15array5Array4pushGRPC16string10StringViewE(result, _x);
      continue;
    }
  }
  return result;
}
function _M0IPC16string6StringPB12ToStringView16to__string__view(self) {
  return new _M0TPC16string10StringView(self, 0, self.length);
}
function _M0MPC15array9ArrayView4iterGRPC16string10StringViewE(self) {
  const i = new _M0TPB8MutLocalGiE(0);
  const len = self.end - self.start | 0;
  return _M0MPB4Iter3newGRPC16string10StringViewE(() => {
    if (i.val < len) {
      const elem = self.buf[self.start + i.val | 0];
      i.val = i.val + 1 | 0;
      return elem;
    } else {
      return undefined;
    }
  }, len);
}
function _M0MPC15array5Array4iterGRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(self) {
  return _M0MPC15array9ArrayView4iterGRPC16string10StringViewE(new _M0TPB9ArrayViewGRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(self, 0, self.length));
}
function _M0IPC16option6OptionPB2Eq5equalGiE(self, other) {
  if (self === undefined) {
    return other === undefined;
  } else {
    const _Some = self;
    const _x = _Some;
    if (other === undefined) {
      return false;
    } else {
      const _Some$2 = other;
      const _y = _Some$2;
      return _x === _y;
    }
  }
}
function _M0IPC16option6OptionPB2Eq5equalGsE(self, other) {
  if (self === undefined) {
    return other === undefined;
  } else {
    const _Some = self;
    const _x = _Some;
    if (other === undefined) {
      return false;
    } else {
      const _Some$2 = other;
      const _y = _Some$2;
      return _x === _y;
    }
  }
}
function _M0MPC16option6Option6unwrapGRP319moonbit_2dcommunity7rabbita3dom7ElementE(self) {
  if (self.$tag === 0) {
    return $panic();
  } else {
    const _Some = self;
    return _Some._0;
  }
}
function _M0MPC16option6Option16unwrap__or__elseGRP319moonbit_2dcommunity7rabbita2js5ValueE(self, default_) {
  if (self.$tag === 0) {
    return default_();
  } else {
    const _Some = self;
    const _t = _Some._0;
    return _t;
  }
}
function _M0MPC16option6Option3mapGsRP319moonbit_2dcommunity7rabbita2js5ValueE(self, f) {
  if (self === undefined) {
    return _M0DTPC16option6OptionGRP319moonbit_2dcommunity7rabbita2js5ValueE4None__;
  } else {
    const _Some = self;
    const _t = _Some;
    return new _M0DTPC16option6OptionGRP319moonbit_2dcommunity7rabbita2js5ValueE4Some(f(_t));
  }
}
function _M0MPC16option6Option3mapGRP319moonbit_2dcommunity7rabbita3dom4NodeRP319moonbit_2dcommunity7rabbita2js5ValueE(self, f) {
  if (self.$tag === 1) {
    const _Some = self;
    const _t = _Some._0;
    return new _M0DTPC16option6OptionGRP319moonbit_2dcommunity7rabbita2js5ValueE4Some(f(_t));
  } else {
    return _M0DTPC16option6OptionGRP319moonbit_2dcommunity7rabbita2js5ValueE4None__;
  }
}
function _M0MPC13int3Int20next__power__of__two(self) {
  if (self >= 0) {
    if (self <= 1) {
      return 1;
    }
    if (self > 1073741824) {
      return 1073741824;
    }
    return (2147483647 >> (Math.clz32(self - 1 | 0) - 1 | 0)) + 1 | 0;
  } else {
    return $panic();
  }
}
function _M0FPB8new__mapGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(capacity) {
  const capacity$2 = _M0MPC13int3Int20next__power__of__two(capacity);
  const _bind = capacity$2 - 1 | 0;
  const _bind$2 = (Math.imul(capacity$2, 13) | 0) / 16 | 0;
  const _bind$3 = $make_array_len_and_init(capacity$2, undefined);
  const _bind$4 = undefined;
  return new _M0TPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(_bind$3, 0, capacity$2, _bind, _bind$2, _bind$4, -1);
}
function _M0FPB8new__mapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(capacity) {
  const capacity$2 = _M0MPC13int3Int20next__power__of__two(capacity);
  const _bind = capacity$2 - 1 | 0;
  const _bind$2 = (Math.imul(capacity$2, 13) | 0) / 16 | 0;
  const _bind$3 = $make_array_len_and_init(capacity$2, undefined);
  const _bind$4 = undefined;
  return new _M0TPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(_bind$3, 0, capacity$2, _bind, _bind$2, _bind$4, -1);
}
function _M0FPB8new__mapGsRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(capacity) {
  const capacity$2 = _M0MPC13int3Int20next__power__of__two(capacity);
  const _bind = capacity$2 - 1 | 0;
  const _bind$2 = (Math.imul(capacity$2, 13) | 0) / 16 | 0;
  const _bind$3 = $make_array_len_and_init(capacity$2, undefined);
  const _bind$4 = undefined;
  return new _M0TPB3MapGsRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(_bind$3, 0, capacity$2, _bind, _bind$2, _bind$4, -1);
}
function _M0FPB8new__mapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(capacity) {
  const capacity$2 = _M0MPC13int3Int20next__power__of__two(capacity);
  const _bind = capacity$2 - 1 | 0;
  const _bind$2 = (Math.imul(capacity$2, 13) | 0) / 16 | 0;
  const _bind$3 = $make_array_len_and_init(capacity$2, undefined);
  const _bind$4 = undefined;
  return new _M0TPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(_bind$3, 0, capacity$2, _bind, _bind$2, _bind$4, -1);
}
function _M0FPB21capacity__for__length(length) {
  let capacity = _M0MPC13int3Int20next__power__of__two(length);
  const _p$2 = capacity;
  if (length > ((Math.imul(_p$2, 13) | 0) / 16 | 0)) {
    capacity = Math.imul(capacity, 2) | 0;
  }
  return capacity;
}
function _M0MPB3Map20add__entry__to__tailGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(self, idx, entry) {
  const _bind = self.tail;
  if (_bind === -1) {
    self.head = entry;
  } else {
    const _tmp = self.entries;
    $bound_check(_tmp, _bind);
    const _p$2 = _tmp[_bind];
    let _tmp$2;
    if (_p$2 === undefined) {
      _tmp$2 = $panic();
    } else {
      const _p$3 = _p$2;
      _tmp$2 = _p$3;
    }
    _tmp$2.next = entry;
  }
  self.tail = idx;
  const _tmp = self.entries;
  $bound_check(_tmp, idx);
  _tmp[idx] = entry;
  self.size = self.size + 1 | 0;
}
function _M0MPB3Map20add__entry__to__tailGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(self, idx, entry) {
  const _bind = self.tail;
  if (_bind === -1) {
    self.head = entry;
  } else {
    const _tmp = self.entries;
    $bound_check(_tmp, _bind);
    const _p$2 = _tmp[_bind];
    let _tmp$2;
    if (_p$2 === undefined) {
      _tmp$2 = $panic();
    } else {
      const _p$3 = _p$2;
      _tmp$2 = _p$3;
    }
    _tmp$2.next = entry;
  }
  self.tail = idx;
  const _tmp = self.entries;
  $bound_check(_tmp, idx);
  _tmp[idx] = entry;
  self.size = self.size + 1 | 0;
}
function _M0MPB3Map20add__entry__to__tailGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(self, idx, entry) {
  const _bind = self.tail;
  if (_bind === -1) {
    self.head = entry;
  } else {
    const _tmp = self.entries;
    $bound_check(_tmp, _bind);
    const _p$2 = _tmp[_bind];
    let _tmp$2;
    if (_p$2 === undefined) {
      _tmp$2 = $panic();
    } else {
      const _p$3 = _p$2;
      _tmp$2 = _p$3;
    }
    _tmp$2.next = entry;
  }
  self.tail = idx;
  const _tmp = self.entries;
  $bound_check(_tmp, idx);
  _tmp[idx] = entry;
  self.size = self.size + 1 | 0;
}
function _M0MPB3Map20add__entry__to__tailGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(self, idx, entry) {
  const _bind = self.tail;
  if (_bind === -1) {
    self.head = entry;
  } else {
    const _tmp = self.entries;
    $bound_check(_tmp, _bind);
    const _p$2 = _tmp[_bind];
    let _tmp$2;
    if (_p$2 === undefined) {
      _tmp$2 = $panic();
    } else {
      const _p$3 = _p$2;
      _tmp$2 = _p$3;
    }
    _tmp$2.next = entry;
  }
  self.tail = idx;
  const _tmp = self.entries;
  $bound_check(_tmp, idx);
  _tmp[idx] = entry;
  self.size = self.size + 1 | 0;
}
function _M0MPB3Map10set__entryGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(self, entry, new_idx) {
  const _tmp = self.entries;
  $bound_check(_tmp, new_idx);
  _tmp[new_idx] = entry;
  const _bind = entry.next;
  if (_bind === undefined) {
    self.tail = new_idx;
    return;
  } else {
    const _Some = _bind;
    const _next = _Some;
    _next.prev = new_idx;
    return;
  }
}
function _M0MPB3Map10set__entryGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(self, entry, new_idx) {
  const _tmp = self.entries;
  $bound_check(_tmp, new_idx);
  _tmp[new_idx] = entry;
  const _bind = entry.next;
  if (_bind === undefined) {
    self.tail = new_idx;
    return;
  } else {
    const _Some = _bind;
    const _next = _Some;
    _next.prev = new_idx;
    return;
  }
}
function _M0MPB3Map10set__entryGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(self, entry, new_idx) {
  const _tmp = self.entries;
  $bound_check(_tmp, new_idx);
  _tmp[new_idx] = entry;
  const _bind = entry.next;
  if (_bind === undefined) {
    self.tail = new_idx;
    return;
  } else {
    const _Some = _bind;
    const _next = _Some;
    _next.prev = new_idx;
    return;
  }
}
function _M0MPB3Map10set__entryGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(self, entry, new_idx) {
  const _tmp = self.entries;
  $bound_check(_tmp, new_idx);
  _tmp[new_idx] = entry;
  const _bind = entry.next;
  if (_bind === undefined) {
    self.tail = new_idx;
    return;
  } else {
    const _Some = _bind;
    const _next = _Some;
    _next.prev = new_idx;
    return;
  }
}
function _M0MPB3Map10push__awayGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(self, idx, entry) {
  let _tmp = entry.psl + 1 | 0;
  let _tmp$2 = idx + 1 & self.capacity_mask;
  let _tmp$3 = entry;
  while (true) {
    const psl = _tmp;
    const idx$2 = _tmp$2;
    const entry$2 = _tmp$3;
    const _tmp$4 = self.entries;
    $bound_check(_tmp$4, idx$2);
    const _bind = _tmp$4[idx$2];
    if (_bind === undefined) {
      entry$2.psl = psl;
      _M0MPB3Map10set__entryGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(self, entry$2, idx$2);
      return;
    } else {
      const _Some = _bind;
      const _curr_entry = _Some;
      if (psl > _curr_entry.psl) {
        entry$2.psl = psl;
        _M0MPB3Map10set__entryGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(self, entry$2, idx$2);
        _tmp = _curr_entry.psl + 1 | 0;
        _tmp$2 = idx$2 + 1 & self.capacity_mask;
        _tmp$3 = _curr_entry;
        continue;
      } else {
        _tmp = psl + 1 | 0;
        _tmp$2 = idx$2 + 1 & self.capacity_mask;
        continue;
      }
    }
  }
}
function _M0MPB3Map10push__awayGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(self, idx, entry) {
  let _tmp = entry.psl + 1 | 0;
  let _tmp$2 = idx + 1 & self.capacity_mask;
  let _tmp$3 = entry;
  while (true) {
    const psl = _tmp;
    const idx$2 = _tmp$2;
    const entry$2 = _tmp$3;
    const _tmp$4 = self.entries;
    $bound_check(_tmp$4, idx$2);
    const _bind = _tmp$4[idx$2];
    if (_bind === undefined) {
      entry$2.psl = psl;
      _M0MPB3Map10set__entryGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(self, entry$2, idx$2);
      return;
    } else {
      const _Some = _bind;
      const _curr_entry = _Some;
      if (psl > _curr_entry.psl) {
        entry$2.psl = psl;
        _M0MPB3Map10set__entryGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(self, entry$2, idx$2);
        _tmp = _curr_entry.psl + 1 | 0;
        _tmp$2 = idx$2 + 1 & self.capacity_mask;
        _tmp$3 = _curr_entry;
        continue;
      } else {
        _tmp = psl + 1 | 0;
        _tmp$2 = idx$2 + 1 & self.capacity_mask;
        continue;
      }
    }
  }
}
function _M0MPB3Map10push__awayGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(self, idx, entry) {
  let _tmp = entry.psl + 1 | 0;
  let _tmp$2 = idx + 1 & self.capacity_mask;
  let _tmp$3 = entry;
  while (true) {
    const psl = _tmp;
    const idx$2 = _tmp$2;
    const entry$2 = _tmp$3;
    const _tmp$4 = self.entries;
    $bound_check(_tmp$4, idx$2);
    const _bind = _tmp$4[idx$2];
    if (_bind === undefined) {
      entry$2.psl = psl;
      _M0MPB3Map10set__entryGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(self, entry$2, idx$2);
      return;
    } else {
      const _Some = _bind;
      const _curr_entry = _Some;
      if (psl > _curr_entry.psl) {
        entry$2.psl = psl;
        _M0MPB3Map10set__entryGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(self, entry$2, idx$2);
        _tmp = _curr_entry.psl + 1 | 0;
        _tmp$2 = idx$2 + 1 & self.capacity_mask;
        _tmp$3 = _curr_entry;
        continue;
      } else {
        _tmp = psl + 1 | 0;
        _tmp$2 = idx$2 + 1 & self.capacity_mask;
        continue;
      }
    }
  }
}
function _M0MPB3Map10push__awayGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(self, idx, entry) {
  let _tmp = entry.psl + 1 | 0;
  let _tmp$2 = idx + 1 & self.capacity_mask;
  let _tmp$3 = entry;
  while (true) {
    const psl = _tmp;
    const idx$2 = _tmp$2;
    const entry$2 = _tmp$3;
    const _tmp$4 = self.entries;
    $bound_check(_tmp$4, idx$2);
    const _bind = _tmp$4[idx$2];
    if (_bind === undefined) {
      entry$2.psl = psl;
      _M0MPB3Map10set__entryGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(self, entry$2, idx$2);
      return;
    } else {
      const _Some = _bind;
      const _curr_entry = _Some;
      if (psl > _curr_entry.psl) {
        entry$2.psl = psl;
        _M0MPB3Map10set__entryGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(self, entry$2, idx$2);
        _tmp = _curr_entry.psl + 1 | 0;
        _tmp$2 = idx$2 + 1 & self.capacity_mask;
        _tmp$3 = _curr_entry;
        continue;
      } else {
        _tmp = psl + 1 | 0;
        _tmp$2 = idx$2 + 1 & self.capacity_mask;
        continue;
      }
    }
  }
}
function _M0MPB3Map15set__with__hashGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(self, key, value, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind = _tmp$3[idx];
    if (_bind === undefined) {
      if (self.size >= self.grow_at) {
        _M0MPB3Map4growGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(self);
        _tmp = 0;
        _tmp$2 = hash & self.capacity_mask;
        continue;
      }
      const _bind$2 = self.tail;
      const _bind$3 = undefined;
      const entry = new _M0TPB5EntryGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(_bind$2, _bind$3, psl, hash, key, value);
      _M0MPB3Map20add__entry__to__tailGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(self, idx, entry);
      return undefined;
    } else {
      const _Some = _bind;
      const _curr_entry = _Some;
      let _tmp$4;
      if (_curr_entry.hash === hash) {
        const _p$2 = _curr_entry.key;
        _tmp$4 = _p$2 === key;
      } else {
        _tmp$4 = false;
      }
      if (_tmp$4) {
        _curr_entry.value = value;
        return undefined;
      }
      if (psl > _curr_entry.psl) {
        if (self.size >= self.grow_at) {
          _M0MPB3Map4growGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(self);
          _tmp = 0;
          _tmp$2 = hash & self.capacity_mask;
          continue;
        }
        _M0MPB3Map10push__awayGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(self, idx, _curr_entry);
        const _bind$2 = self.tail;
        const _bind$3 = undefined;
        const entry = new _M0TPB5EntryGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(_bind$2, _bind$3, psl, hash, key, value);
        _M0MPB3Map20add__entry__to__tailGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(self, idx, entry);
        return undefined;
      }
      _tmp = psl + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map15set__with__hashGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(self, key, value, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind = _tmp$3[idx];
    if (_bind === undefined) {
      if (self.size >= self.grow_at) {
        _M0MPB3Map4growGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(self);
        _tmp = 0;
        _tmp$2 = hash & self.capacity_mask;
        continue;
      }
      const _bind$2 = self.tail;
      const _bind$3 = undefined;
      const entry = new _M0TPB5EntryGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(_bind$2, _bind$3, psl, hash, key, value);
      _M0MPB3Map20add__entry__to__tailGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(self, idx, entry);
      return undefined;
    } else {
      const _Some = _bind;
      const _curr_entry = _Some;
      let _tmp$4;
      if (_curr_entry.hash === hash) {
        const _p$2 = _curr_entry.key;
        _tmp$4 = _p$2 === key;
      } else {
        _tmp$4 = false;
      }
      if (_tmp$4) {
        _curr_entry.value = value;
        return undefined;
      }
      if (psl > _curr_entry.psl) {
        if (self.size >= self.grow_at) {
          _M0MPB3Map4growGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(self);
          _tmp = 0;
          _tmp$2 = hash & self.capacity_mask;
          continue;
        }
        _M0MPB3Map10push__awayGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(self, idx, _curr_entry);
        const _bind$2 = self.tail;
        const _bind$3 = undefined;
        const entry = new _M0TPB5EntryGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(_bind$2, _bind$3, psl, hash, key, value);
        _M0MPB3Map20add__entry__to__tailGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(self, idx, entry);
        return undefined;
      }
      _tmp = psl + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map15set__with__hashGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(self, key, value, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind = _tmp$3[idx];
    if (_bind === undefined) {
      if (self.size >= self.grow_at) {
        _M0MPB3Map4growGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(self);
        _tmp = 0;
        _tmp$2 = hash & self.capacity_mask;
        continue;
      }
      const _bind$2 = self.tail;
      const _bind$3 = undefined;
      const entry = new _M0TPB5EntryGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(_bind$2, _bind$3, psl, hash, key, value);
      _M0MPB3Map20add__entry__to__tailGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(self, idx, entry);
      return undefined;
    } else {
      const _Some = _bind;
      const _curr_entry = _Some;
      let _tmp$4;
      if (_curr_entry.hash === hash) {
        const _p$2 = _curr_entry.key;
        _tmp$4 = _p$2 === key;
      } else {
        _tmp$4 = false;
      }
      if (_tmp$4) {
        _curr_entry.value = value;
        return undefined;
      }
      if (psl > _curr_entry.psl) {
        if (self.size >= self.grow_at) {
          _M0MPB3Map4growGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(self);
          _tmp = 0;
          _tmp$2 = hash & self.capacity_mask;
          continue;
        }
        _M0MPB3Map10push__awayGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(self, idx, _curr_entry);
        const _bind$2 = self.tail;
        const _bind$3 = undefined;
        const entry = new _M0TPB5EntryGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(_bind$2, _bind$3, psl, hash, key, value);
        _M0MPB3Map20add__entry__to__tailGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(self, idx, entry);
        return undefined;
      }
      _tmp = psl + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map15set__with__hashGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(self, key, value, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind = _tmp$3[idx];
    if (_bind === undefined) {
      if (self.size >= self.grow_at) {
        _M0MPB3Map4growGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(self);
        _tmp = 0;
        _tmp$2 = hash & self.capacity_mask;
        continue;
      }
      const _bind$2 = self.tail;
      const _bind$3 = undefined;
      const entry = new _M0TPB5EntryGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(_bind$2, _bind$3, psl, hash, key, value);
      _M0MPB3Map20add__entry__to__tailGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(self, idx, entry);
      return undefined;
    } else {
      const _Some = _bind;
      const _curr_entry = _Some;
      if (_curr_entry.hash === hash && _curr_entry.key === key) {
        _curr_entry.value = value;
        return undefined;
      }
      if (psl > _curr_entry.psl) {
        if (self.size >= self.grow_at) {
          _M0MPB3Map4growGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(self);
          _tmp = 0;
          _tmp$2 = hash & self.capacity_mask;
          continue;
        }
        _M0MPB3Map10push__awayGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(self, idx, _curr_entry);
        const _bind$2 = self.tail;
        const _bind$3 = undefined;
        const entry = new _M0TPB5EntryGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(_bind$2, _bind$3, psl, hash, key, value);
        _M0MPB3Map20add__entry__to__tailGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(self, idx, entry);
        return undefined;
      }
      _tmp = psl + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map15set__with__hashGsRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(self, key, value, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind = _tmp$3[idx];
    if (_bind === undefined) {
      if (self.size >= self.grow_at) {
        _M0MPB3Map4growGsRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(self);
        _tmp = 0;
        _tmp$2 = hash & self.capacity_mask;
        continue;
      }
      const _bind$2 = self.tail;
      const _bind$3 = undefined;
      const entry = new _M0TPB5EntryGsRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(_bind$2, _bind$3, psl, hash, key, value);
      _M0MPB3Map20add__entry__to__tailGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(self, idx, entry);
      return undefined;
    } else {
      const _Some = _bind;
      const _curr_entry = _Some;
      if (_curr_entry.hash === hash && _curr_entry.key === key) {
        _curr_entry.value = value;
        return undefined;
      }
      if (psl > _curr_entry.psl) {
        if (self.size >= self.grow_at) {
          _M0MPB3Map4growGsRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(self);
          _tmp = 0;
          _tmp$2 = hash & self.capacity_mask;
          continue;
        }
        _M0MPB3Map10push__awayGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(self, idx, _curr_entry);
        const _bind$2 = self.tail;
        const _bind$3 = undefined;
        const entry = new _M0TPB5EntryGsRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(_bind$2, _bind$3, psl, hash, key, value);
        _M0MPB3Map20add__entry__to__tailGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(self, idx, entry);
        return undefined;
      }
      _tmp = psl + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map15set__with__hashGssE(self, key, value, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind = _tmp$3[idx];
    if (_bind === undefined) {
      if (self.size >= self.grow_at) {
        _M0MPB3Map4growGssE(self);
        _tmp = 0;
        _tmp$2 = hash & self.capacity_mask;
        continue;
      }
      const _bind$2 = self.tail;
      const _bind$3 = undefined;
      const entry = new _M0TPB5EntryGssE(_bind$2, _bind$3, psl, hash, key, value);
      _M0MPB3Map20add__entry__to__tailGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(self, idx, entry);
      return undefined;
    } else {
      const _Some = _bind;
      const _curr_entry = _Some;
      if (_curr_entry.hash === hash && _curr_entry.key === key) {
        _curr_entry.value = value;
        return undefined;
      }
      if (psl > _curr_entry.psl) {
        if (self.size >= self.grow_at) {
          _M0MPB3Map4growGssE(self);
          _tmp = 0;
          _tmp$2 = hash & self.capacity_mask;
          continue;
        }
        _M0MPB3Map10push__awayGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(self, idx, _curr_entry);
        const _bind$2 = self.tail;
        const _bind$3 = undefined;
        const entry = new _M0TPB5EntryGssE(_bind$2, _bind$3, psl, hash, key, value);
        _M0MPB3Map20add__entry__to__tailGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(self, idx, entry);
        return undefined;
      }
      _tmp = psl + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map15set__with__hashGsRP319moonbit_2dcommunity7rabbita7variant7VariantE(self, key, value, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind = _tmp$3[idx];
    if (_bind === undefined) {
      if (self.size >= self.grow_at) {
        _M0MPB3Map4growGsRP319moonbit_2dcommunity7rabbita7variant7VariantE(self);
        _tmp = 0;
        _tmp$2 = hash & self.capacity_mask;
        continue;
      }
      const _bind$2 = self.tail;
      const _bind$3 = undefined;
      const entry = new _M0TPB5EntryGsRP319moonbit_2dcommunity7rabbita7variant7VariantE(_bind$2, _bind$3, psl, hash, key, value);
      _M0MPB3Map20add__entry__to__tailGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(self, idx, entry);
      return undefined;
    } else {
      const _Some = _bind;
      const _curr_entry = _Some;
      if (_curr_entry.hash === hash && _curr_entry.key === key) {
        _curr_entry.value = value;
        return undefined;
      }
      if (psl > _curr_entry.psl) {
        if (self.size >= self.grow_at) {
          _M0MPB3Map4growGsRP319moonbit_2dcommunity7rabbita7variant7VariantE(self);
          _tmp = 0;
          _tmp$2 = hash & self.capacity_mask;
          continue;
        }
        _M0MPB3Map10push__awayGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(self, idx, _curr_entry);
        const _bind$2 = self.tail;
        const _bind$3 = undefined;
        const entry = new _M0TPB5EntryGsRP319moonbit_2dcommunity7rabbita7variant7VariantE(_bind$2, _bind$3, psl, hash, key, value);
        _M0MPB3Map20add__entry__to__tailGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(self, idx, entry);
        return undefined;
      }
      _tmp = psl + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map15set__with__hashGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(self, key, value, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind = _tmp$3[idx];
    if (_bind === undefined) {
      if (self.size >= self.grow_at) {
        _M0MPB3Map4growGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(self);
        _tmp = 0;
        _tmp$2 = hash & self.capacity_mask;
        continue;
      }
      const _bind$2 = self.tail;
      const _bind$3 = undefined;
      const entry = new _M0TPB5EntryGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(_bind$2, _bind$3, psl, hash, key, value);
      _M0MPB3Map20add__entry__to__tailGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(self, idx, entry);
      return undefined;
    } else {
      const _Some = _bind;
      const _curr_entry = _Some;
      if (_curr_entry.hash === hash && _curr_entry.key === key) {
        _curr_entry.value = value;
        return undefined;
      }
      if (psl > _curr_entry.psl) {
        if (self.size >= self.grow_at) {
          _M0MPB3Map4growGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(self);
          _tmp = 0;
          _tmp$2 = hash & self.capacity_mask;
          continue;
        }
        _M0MPB3Map10push__awayGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(self, idx, _curr_entry);
        const _bind$2 = self.tail;
        const _bind$3 = undefined;
        const entry = new _M0TPB5EntryGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(_bind$2, _bind$3, psl, hash, key, value);
        _M0MPB3Map20add__entry__to__tailGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(self, idx, entry);
        return undefined;
      }
      _tmp = psl + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map4growGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(self) {
  const old_head = self.head;
  const new_capacity = self.capacity << 1;
  self.entries = $make_array_len_and_init(new_capacity, undefined);
  self.capacity = new_capacity;
  self.capacity_mask = new_capacity - 1 | 0;
  const _p$2 = self.capacity;
  self.grow_at = (Math.imul(_p$2, 13) | 0) / 16 | 0;
  self.size = 0;
  self.head = undefined;
  self.tail = -1;
  let _tmp = old_head;
  while (true) {
    const x = _tmp;
    if (x === undefined) {
      return;
    } else {
      const _Some = x;
      const _x = _Some;
      const _next = _x.next;
      const _key = _x.key;
      const _value = _x.value;
      const _hash = _x.hash;
      _M0MPB3Map15set__with__hashGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(self, _key, _value, _hash);
      _tmp = _next;
      continue;
    }
  }
}
function _M0MPB3Map4growGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(self) {
  const old_head = self.head;
  const new_capacity = self.capacity << 1;
  self.entries = $make_array_len_and_init(new_capacity, undefined);
  self.capacity = new_capacity;
  self.capacity_mask = new_capacity - 1 | 0;
  const _p$2 = self.capacity;
  self.grow_at = (Math.imul(_p$2, 13) | 0) / 16 | 0;
  self.size = 0;
  self.head = undefined;
  self.tail = -1;
  let _tmp = old_head;
  while (true) {
    const x = _tmp;
    if (x === undefined) {
      return;
    } else {
      const _Some = x;
      const _x = _Some;
      const _next = _x.next;
      const _key = _x.key;
      const _value = _x.value;
      const _hash = _x.hash;
      _M0MPB3Map15set__with__hashGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(self, _key, _value, _hash);
      _tmp = _next;
      continue;
    }
  }
}
function _M0MPB3Map4growGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(self) {
  const old_head = self.head;
  const new_capacity = self.capacity << 1;
  self.entries = $make_array_len_and_init(new_capacity, undefined);
  self.capacity = new_capacity;
  self.capacity_mask = new_capacity - 1 | 0;
  const _p$2 = self.capacity;
  self.grow_at = (Math.imul(_p$2, 13) | 0) / 16 | 0;
  self.size = 0;
  self.head = undefined;
  self.tail = -1;
  let _tmp = old_head;
  while (true) {
    const x = _tmp;
    if (x === undefined) {
      return;
    } else {
      const _Some = x;
      const _x = _Some;
      const _next = _x.next;
      const _key = _x.key;
      const _value = _x.value;
      const _hash = _x.hash;
      _M0MPB3Map15set__with__hashGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(self, _key, _value, _hash);
      _tmp = _next;
      continue;
    }
  }
}
function _M0MPB3Map4growGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(self) {
  const old_head = self.head;
  const new_capacity = self.capacity << 1;
  self.entries = $make_array_len_and_init(new_capacity, undefined);
  self.capacity = new_capacity;
  self.capacity_mask = new_capacity - 1 | 0;
  const _p$2 = self.capacity;
  self.grow_at = (Math.imul(_p$2, 13) | 0) / 16 | 0;
  self.size = 0;
  self.head = undefined;
  self.tail = -1;
  let _tmp = old_head;
  while (true) {
    const x = _tmp;
    if (x === undefined) {
      return;
    } else {
      const _Some = x;
      const _x = _Some;
      const _next = _x.next;
      const _key = _x.key;
      const _value = _x.value;
      const _hash = _x.hash;
      _M0MPB3Map15set__with__hashGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(self, _key, _value, _hash);
      _tmp = _next;
      continue;
    }
  }
}
function _M0MPB3Map4growGsRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(self) {
  const old_head = self.head;
  const new_capacity = self.capacity << 1;
  self.entries = $make_array_len_and_init(new_capacity, undefined);
  self.capacity = new_capacity;
  self.capacity_mask = new_capacity - 1 | 0;
  const _p$2 = self.capacity;
  self.grow_at = (Math.imul(_p$2, 13) | 0) / 16 | 0;
  self.size = 0;
  self.head = undefined;
  self.tail = -1;
  let _tmp = old_head;
  while (true) {
    const x = _tmp;
    if (x === undefined) {
      return;
    } else {
      const _Some = x;
      const _x = _Some;
      const _next = _x.next;
      const _key = _x.key;
      const _value = _x.value;
      const _hash = _x.hash;
      _M0MPB3Map15set__with__hashGsRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(self, _key, _value, _hash);
      _tmp = _next;
      continue;
    }
  }
}
function _M0MPB3Map4growGssE(self) {
  const old_head = self.head;
  const new_capacity = self.capacity << 1;
  self.entries = $make_array_len_and_init(new_capacity, undefined);
  self.capacity = new_capacity;
  self.capacity_mask = new_capacity - 1 | 0;
  const _p$2 = self.capacity;
  self.grow_at = (Math.imul(_p$2, 13) | 0) / 16 | 0;
  self.size = 0;
  self.head = undefined;
  self.tail = -1;
  let _tmp = old_head;
  while (true) {
    const x = _tmp;
    if (x === undefined) {
      return;
    } else {
      const _Some = x;
      const _x = _Some;
      const _next = _x.next;
      const _key = _x.key;
      const _value = _x.value;
      const _hash = _x.hash;
      _M0MPB3Map15set__with__hashGssE(self, _key, _value, _hash);
      _tmp = _next;
      continue;
    }
  }
}
function _M0MPB3Map4growGsRP319moonbit_2dcommunity7rabbita7variant7VariantE(self) {
  const old_head = self.head;
  const new_capacity = self.capacity << 1;
  self.entries = $make_array_len_and_init(new_capacity, undefined);
  self.capacity = new_capacity;
  self.capacity_mask = new_capacity - 1 | 0;
  const _p$2 = self.capacity;
  self.grow_at = (Math.imul(_p$2, 13) | 0) / 16 | 0;
  self.size = 0;
  self.head = undefined;
  self.tail = -1;
  let _tmp = old_head;
  while (true) {
    const x = _tmp;
    if (x === undefined) {
      return;
    } else {
      const _Some = x;
      const _x = _Some;
      const _next = _x.next;
      const _key = _x.key;
      const _value = _x.value;
      const _hash = _x.hash;
      _M0MPB3Map15set__with__hashGsRP319moonbit_2dcommunity7rabbita7variant7VariantE(self, _key, _value, _hash);
      _tmp = _next;
      continue;
    }
  }
}
function _M0MPB3Map4growGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(self) {
  const old_head = self.head;
  const new_capacity = self.capacity << 1;
  self.entries = $make_array_len_and_init(new_capacity, undefined);
  self.capacity = new_capacity;
  self.capacity_mask = new_capacity - 1 | 0;
  const _p$2 = self.capacity;
  self.grow_at = (Math.imul(_p$2, 13) | 0) / 16 | 0;
  self.size = 0;
  self.head = undefined;
  self.tail = -1;
  let _tmp = old_head;
  while (true) {
    const x = _tmp;
    if (x === undefined) {
      return;
    } else {
      const _Some = x;
      const _x = _Some;
      const _next = _x.next;
      const _key = _x.key;
      const _value = _x.value;
      const _hash = _x.hash;
      _M0MPB3Map15set__with__hashGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(self, _key, _value, _hash);
      _tmp = _next;
      continue;
    }
  }
}
function _M0MPB3Map3setGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(self, key, value) {
  _M0MPB3Map15set__with__hashGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(self, key, value, _M0IP016_24default__implPB4Hash4hashGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdE(key));
}
function _M0MPB3Map3setGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(self, key, value) {
  _M0MPB3Map15set__with__hashGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(self, key, value, _M0IP016_24default__implPB4Hash4hashGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(key));
}
function _M0MPB3Map3setGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(self, key, value) {
  _M0MPB3Map15set__with__hashGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(self, key, value, _M0IP016_24default__implPB4Hash4hashGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdE(key));
}
function _M0MPB3Map3setGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(self, key, value) {
  _M0MPB3Map15set__with__hashGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(self, key, value, _M0IP016_24default__implPB4Hash4hashGsE(key));
}
function _M0MPB3Map3setGsRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(self, key, value) {
  _M0MPB3Map15set__with__hashGsRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(self, key, value, _M0IP016_24default__implPB4Hash4hashGsE(key));
}
function _M0MPB3Map3setGssE(self, key, value) {
  _M0MPB3Map15set__with__hashGssE(self, key, value, _M0IP016_24default__implPB4Hash4hashGsE(key));
}
function _M0MPB3Map3setGsRP319moonbit_2dcommunity7rabbita7variant7VariantE(self, key, value) {
  _M0MPB3Map15set__with__hashGsRP319moonbit_2dcommunity7rabbita7variant7VariantE(self, key, value, _M0IP016_24default__implPB4Hash4hashGsE(key));
}
function _M0MPB3Map3setGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(self, key, value) {
  _M0MPB3Map15set__with__hashGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(self, key, value, _M0IP016_24default__implPB4Hash4hashGsE(key));
}
function _M0MPB3Map3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(arr, capacity) {
  const length = arr.end - arr.start | 0;
  let capacity$2;
  if (capacity === undefined) {
    capacity$2 = length === 0 ? 8 : _M0FPB21capacity__for__length(length);
  } else {
    const _Some = capacity;
    const _capacity = _Some;
    const _p$2 = _M0FPB21capacity__for__length(length);
    capacity$2 = _capacity > _p$2 ? _capacity : _p$2;
  }
  const m = _M0FPB8new__mapGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(capacity$2);
  const _bind = arr.end - arr.start | 0;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const e = arr.buf[arr.start + _ | 0];
      _M0MPB3Map3setGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(m, e._0, e._1);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return m;
}
function _M0MPB3Map3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(arr, capacity) {
  const length = arr.end - arr.start | 0;
  let capacity$2;
  if (capacity === undefined) {
    capacity$2 = length === 0 ? 8 : _M0FPB21capacity__for__length(length);
  } else {
    const _Some = capacity;
    const _capacity = _Some;
    const _p$2 = _M0FPB21capacity__for__length(length);
    capacity$2 = _capacity > _p$2 ? _capacity : _p$2;
  }
  const m = _M0FPB8new__mapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(capacity$2);
  const _bind = arr.end - arr.start | 0;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const e = arr.buf[arr.start + _ | 0];
      _M0MPB3Map3setGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(m, e._0, e._1);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return m;
}
function _M0MPB3Map3MapGsRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(arr, capacity) {
  const length = arr.end - arr.start | 0;
  let capacity$2;
  if (capacity === undefined) {
    capacity$2 = length === 0 ? 8 : _M0FPB21capacity__for__length(length);
  } else {
    const _Some = capacity;
    const _capacity = _Some;
    const _p$2 = _M0FPB21capacity__for__length(length);
    capacity$2 = _capacity > _p$2 ? _capacity : _p$2;
  }
  const m = _M0FPB8new__mapGsRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(capacity$2);
  const _bind = arr.end - arr.start | 0;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const e = arr.buf[arr.start + _ | 0];
      _M0MPB3Map3setGsRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(m, e._0, e._1);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return m;
}
function _M0MPB3Map3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(arr, capacity) {
  const length = arr.end - arr.start | 0;
  let capacity$2;
  if (capacity === undefined) {
    capacity$2 = length === 0 ? 8 : _M0FPB21capacity__for__length(length);
  } else {
    const _Some = capacity;
    const _capacity = _Some;
    const _p$2 = _M0FPB21capacity__for__length(length);
    capacity$2 = _capacity > _p$2 ? _capacity : _p$2;
  }
  const m = _M0FPB8new__mapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(capacity$2);
  const _bind = arr.end - arr.start | 0;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const e = arr.buf[arr.start + _ | 0];
      _M0MPB3Map3setGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(m, e._0, e._1);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return m;
}
function _M0MPB3Map3MapGssE(arr, capacity) {
  const length = arr.end - arr.start | 0;
  let capacity$2;
  if (capacity === undefined) {
    capacity$2 = length === 0 ? 8 : _M0FPB21capacity__for__length(length);
  } else {
    const _Some = capacity;
    const _capacity = _Some;
    const _p$2 = _M0FPB21capacity__for__length(length);
    capacity$2 = _capacity > _p$2 ? _capacity : _p$2;
  }
  const m = _M0FPB8new__mapGsRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(capacity$2);
  const _bind = arr.end - arr.start | 0;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const e = arr.buf[arr.start + _ | 0];
      _M0MPB3Map3setGssE(m, e._0, e._1);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return m;
}
function _M0MPB3Map3MapGsRP319moonbit_2dcommunity7rabbita7variant7VariantE(arr, capacity) {
  const length = arr.end - arr.start | 0;
  let capacity$2;
  if (capacity === undefined) {
    capacity$2 = length === 0 ? 8 : _M0FPB21capacity__for__length(length);
  } else {
    const _Some = capacity;
    const _capacity = _Some;
    const _p$2 = _M0FPB21capacity__for__length(length);
    capacity$2 = _capacity > _p$2 ? _capacity : _p$2;
  }
  const m = _M0FPB8new__mapGsRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(capacity$2);
  const _bind = arr.end - arr.start | 0;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const e = arr.buf[arr.start + _ | 0];
      _M0MPB3Map3setGsRP319moonbit_2dcommunity7rabbita7variant7VariantE(m, e._0, e._1);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return m;
}
function _M0MPB3Map3MapGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(arr, capacity) {
  const length = arr.end - arr.start | 0;
  let capacity$2;
  if (capacity === undefined) {
    capacity$2 = length === 0 ? 8 : _M0FPB21capacity__for__length(length);
  } else {
    const _Some = capacity;
    const _capacity = _Some;
    const _p$2 = _M0FPB21capacity__for__length(length);
    capacity$2 = _capacity > _p$2 ? _capacity : _p$2;
  }
  const m = _M0FPB8new__mapGsRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(capacity$2);
  const _bind = arr.end - arr.start | 0;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const e = arr.buf[arr.start + _ | 0];
      _M0MPB3Map3setGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(m, e._0, e._1);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return m;
}
function _M0MPB3Map3MapGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(arr, capacity) {
  const length = arr.end - arr.start | 0;
  let capacity$2;
  if (capacity === undefined) {
    capacity$2 = length === 0 ? 8 : _M0FPB21capacity__for__length(length);
  } else {
    const _Some = capacity;
    const _capacity = _Some;
    const _p$2 = _M0FPB21capacity__for__length(length);
    capacity$2 = _capacity > _p$2 ? _capacity : _p$2;
  }
  const m = _M0FPB8new__mapGsRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(capacity$2);
  const _bind = arr.end - arr.start | 0;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const e = arr.buf[arr.start + _ | 0];
      _M0MPB3Map3setGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(m, e._0, e._1);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return m;
}
function _M0MPB3Map3getGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(self, key) {
  const hash = _M0IP016_24default__implPB4Hash4hashGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind = _tmp$3[idx];
    if (_bind === undefined) {
      return undefined;
    } else {
      const _Some = _bind;
      const _entry = _Some;
      let _tmp$4;
      if (_entry.hash === hash) {
        const _p$2 = _entry.key;
        _tmp$4 = _p$2 === key;
      } else {
        _tmp$4 = false;
      }
      if (_tmp$4) {
        return _entry.value;
      }
      if (i > _entry.psl) {
        return undefined;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map3getGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(self, key) {
  const hash = _M0IP016_24default__implPB4Hash4hashGsE(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind = _tmp$3[idx];
    if (_bind === undefined) {
      return undefined;
    } else {
      const _Some = _bind;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return _entry.value;
      }
      if (i > _entry.psl) {
        return undefined;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map3getGssE(self, key) {
  const hash = _M0IP016_24default__implPB4Hash4hashGsE(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind = _tmp$3[idx];
    if (_bind === undefined) {
      return undefined;
    } else {
      const _Some = _bind;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return _entry.value;
      }
      if (i > _entry.psl) {
        return undefined;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map3getGsRP319moonbit_2dcommunity7rabbita7variant7VariantE(self, key) {
  const hash = _M0IP016_24default__implPB4Hash4hashGsE(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind = _tmp$3[idx];
    if (_bind === undefined) {
      return undefined;
    } else {
      const _Some = _bind;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return _entry.value;
      }
      if (i > _entry.psl) {
        return undefined;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map3getGsRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(self, key) {
  const hash = _M0IP016_24default__implPB4Hash4hashGsE(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind = _tmp$3[idx];
    if (_bind === undefined) {
      return undefined;
    } else {
      const _Some = _bind;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return _entry.value;
      }
      if (i > _entry.psl) {
        return undefined;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map8containsGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(self, key) {
  const hash = _M0IP016_24default__implPB4Hash4hashGsE(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind = _tmp$3[idx];
    if (_bind === undefined) {
      return false;
    } else {
      const _Some = _bind;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return true;
      }
      if (i > _entry.psl) {
        return false;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map8containsGssE(self, key) {
  const hash = _M0IP016_24default__implPB4Hash4hashGsE(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind = _tmp$3[idx];
    if (_bind === undefined) {
      return false;
    } else {
      const _Some = _bind;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return true;
      }
      if (i > _entry.psl) {
        return false;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map8containsGsRP319moonbit_2dcommunity7rabbita7variant7VariantE(self, key) {
  const hash = _M0IP016_24default__implPB4Hash4hashGsE(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind = _tmp$3[idx];
    if (_bind === undefined) {
      return false;
    } else {
      const _Some = _bind;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return true;
      }
      if (i > _entry.psl) {
        return false;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map8containsGsRP419moonbit_2dcommunity7rabbita8internal7runtime5VNodeE(self, key) {
  const hash = _M0IP016_24default__implPB4Hash4hashGsE(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind = _tmp$3[idx];
    if (_bind === undefined) {
      return false;
    } else {
      const _Some = _bind;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return true;
      }
      if (i > _entry.psl) {
        return false;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map13remove__entryGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(self, entry) {
  const _bind = entry.prev;
  if (_bind === -1) {
    self.head = entry.next;
  } else {
    const _tmp = self.entries;
    $bound_check(_tmp, _bind);
    const _p$2 = _tmp[_bind];
    let _tmp$2;
    if (_p$2 === undefined) {
      _tmp$2 = $panic();
    } else {
      const _p$3 = _p$2;
      _tmp$2 = _p$3;
    }
    _tmp$2.next = entry.next;
  }
  const _bind$2 = entry.next;
  if (_bind$2 === undefined) {
    self.tail = entry.prev;
    return;
  } else {
    const _Some = _bind$2;
    const _next = _Some;
    _next.prev = entry.prev;
    return;
  }
}
function _M0MPB3Map13remove__entryGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(self, entry) {
  const _bind = entry.prev;
  if (_bind === -1) {
    self.head = entry.next;
  } else {
    const _tmp = self.entries;
    $bound_check(_tmp, _bind);
    const _p$2 = _tmp[_bind];
    let _tmp$2;
    if (_p$2 === undefined) {
      _tmp$2 = $panic();
    } else {
      const _p$3 = _p$2;
      _tmp$2 = _p$3;
    }
    _tmp$2.next = entry.next;
  }
  const _bind$2 = entry.next;
  if (_bind$2 === undefined) {
    self.tail = entry.prev;
    return;
  } else {
    const _Some = _bind$2;
    const _next = _Some;
    _next.prev = entry.prev;
    return;
  }
}
function _M0MPB3Map11shift__backGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(self, idx) {
  let _tmp = idx;
  while (true) {
    const cur = _tmp;
    const next = cur + 1 & self.capacity_mask;
    _L: {
      const _tmp$2 = self.entries;
      $bound_check(_tmp$2, next);
      const _bind = _tmp$2[next];
      if (_bind === undefined) {
        break _L;
      } else {
        const _Some = _bind;
        const _x = _Some;
        const _x$2 = _x.psl;
        if (_x$2 === 0) {
          break _L;
        } else {
          _x.psl = _x.psl - 1 | 0;
          _M0MPB3Map10set__entryGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(self, _x, cur);
          _tmp = next;
          continue;
        }
      }
    }
    const _tmp$2 = self.entries;
    $bound_check(_tmp$2, cur);
    _tmp$2[cur] = undefined;
    return;
  }
}
function _M0MPB3Map11shift__backGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(self, idx) {
  let _tmp = idx;
  while (true) {
    const cur = _tmp;
    const next = cur + 1 & self.capacity_mask;
    _L: {
      const _tmp$2 = self.entries;
      $bound_check(_tmp$2, next);
      const _bind = _tmp$2[next];
      if (_bind === undefined) {
        break _L;
      } else {
        const _Some = _bind;
        const _x = _Some;
        const _x$2 = _x.psl;
        if (_x$2 === 0) {
          break _L;
        } else {
          _x.psl = _x.psl - 1 | 0;
          _M0MPB3Map10set__entryGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(self, _x, cur);
          _tmp = next;
          continue;
        }
      }
    }
    const _tmp$2 = self.entries;
    $bound_check(_tmp$2, cur);
    _tmp$2[cur] = undefined;
    return;
  }
}
function _M0MPB3Map18remove__with__hashGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(self, key, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind = _tmp$3[idx];
    if (_bind === undefined) {
      return;
    } else {
      const _Some = _bind;
      const _entry = _Some;
      let _tmp$4;
      if (_entry.hash === hash) {
        const _p$2 = _entry.key;
        _tmp$4 = _p$2 === key;
      } else {
        _tmp$4 = false;
      }
      if (_tmp$4) {
        _M0MPB3Map13remove__entryGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(self, _entry);
        _M0MPB3Map11shift__backGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(self, idx);
        self.size = self.size - 1 | 0;
        return;
      }
      if (i > _entry.psl) {
        return;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map18remove__with__hashGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(self, key, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind = _tmp$3[idx];
    if (_bind === undefined) {
      return;
    } else {
      const _Some = _bind;
      const _entry = _Some;
      let _tmp$4;
      if (_entry.hash === hash) {
        const _p$2 = _entry.key;
        _tmp$4 = _p$2 === key;
      } else {
        _tmp$4 = false;
      }
      if (_tmp$4) {
        _M0MPB3Map13remove__entryGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(self, _entry);
        _M0MPB3Map11shift__backGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(self, idx);
        self.size = self.size - 1 | 0;
        return;
      }
      if (i > _entry.psl) {
        return;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map6removeGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(self, key) {
  _M0MPB3Map18remove__with__hashGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(self, key, _M0IP016_24default__implPB4Hash4hashGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdE(key));
}
function _M0MPB3Map6removeGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(self, key) {
  _M0MPB3Map18remove__with__hashGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(self, key, _M0IP016_24default__implPB4Hash4hashGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(key));
}
function _M0MPC15array10FixedArray12fill_2einnerGORPC13set5EntryGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdEE(self, value, start, end) {
  const array_length = self.length;
  if (array_length > 0) {
    if (start >= 0 && start < array_length) {
      let length;
      if (end === undefined) {
        length = array_length - start | 0;
      } else {
        const _Some = end;
        const _e = _Some;
        length = _e >= start && _e <= array_length ? _e - start | 0 : $panic();
      }
      self.fill(value, start, start + length);
      return;
    } else {
      $panic();
      return;
    }
  } else {
    return;
  }
}
function _M0MPB3Map4iterGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(self) {
  const curr_entry = new _M0TPB8MutLocalGORPB5EntryGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEE(self.head);
  const len = self.size;
  const remaining = new _M0TPB8MutLocalGiE(len);
  return _M0MPB4Iter3newGRPC16string10StringViewE(() => {
    _L: {
      if (remaining.val > 0) {
        const _bind = curr_entry.val;
        if (_bind === undefined) {
          break _L;
        } else {
          const _Some = _bind;
          const _x = _Some;
          const _key = _x.key;
          const _value = _x.value;
          const _next = _x.next;
          curr_entry.val = _next;
          remaining.val = remaining.val - 1 | 0;
          return { _0: _key, _1: _value };
        }
      } else {
        break _L;
      }
    }
    return undefined;
  }, len);
}
function _M0MPB3Map4iterGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(self) {
  const curr_entry = new _M0TPB8MutLocalGORPB5EntryGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkEE(self.head);
  const len = self.size;
  const remaining = new _M0TPB8MutLocalGiE(len);
  return _M0MPB4Iter3newGRPC16string10StringViewE(() => {
    _L: {
      if (remaining.val > 0) {
        const _bind = curr_entry.val;
        if (_bind === undefined) {
          break _L;
        } else {
          const _Some = _bind;
          const _x = _Some;
          const _key = _x.key;
          const _value = _x.value;
          const _next = _x.next;
          curr_entry.val = _next;
          remaining.val = remaining.val - 1 | 0;
          return { _0: _key, _1: _value };
        }
      } else {
        break _L;
      }
    }
    return undefined;
  }, len);
}
function _M0MPB3Map4iterGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(self) {
  const curr_entry = new _M0TPB8MutLocalGORPB5EntryGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(self.head);
  const len = self.size;
  const remaining = new _M0TPB8MutLocalGiE(len);
  return _M0MPB4Iter3newGRPC16string10StringViewE(() => {
    _L: {
      if (remaining.val > 0) {
        const _bind = curr_entry.val;
        if (_bind === undefined) {
          break _L;
        } else {
          const _Some = _bind;
          const _x = _Some;
          const _key = _x.key;
          const _value = _x.value;
          const _next = _x.next;
          curr_entry.val = _next;
          remaining.val = remaining.val - 1 | 0;
          return { _0: _key, _1: _value };
        }
      } else {
        break _L;
      }
    }
    return undefined;
  }, len);
}
function _M0MPB3Map5iter2GRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(self) {
  return _M0MPB3Map4iterGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(self);
}
function _M0MPB3Map5iter2GRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(self) {
  return _M0MPB3Map4iterGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(self);
}
function _M0MPB3Map5iter2GsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(self) {
  return _M0MPB3Map4iterGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(self);
}
function _M0MPB3Map6valuesGsRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(self) {
  const curr_entry = new _M0TPB8MutLocalGORPB5EntryGsRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeEE(self.head);
  const len = self.size;
  const remaining = new _M0TPB8MutLocalGiE(len);
  return _M0MPB4Iter3newGRPC16string10StringViewE(() => {
    _L: {
      if (remaining.val > 0) {
        const _bind = curr_entry.val;
        if (_bind === undefined) {
          break _L;
        } else {
          const _Some = _bind;
          const _x = _Some;
          const _value = _x.value;
          const _next = _x.next;
          curr_entry.val = _next;
          remaining.val = remaining.val - 1 | 0;
          return _value;
        }
      } else {
        break _L;
      }
    }
    return undefined;
  }, len);
}
function _M0MPB3Map9to__arrayGsRP419moonbit_2dcommunity7rabbita8internal7runtime5VNodeE(self) {
  const arr = new Array(self.size);
  let i = 0;
  let _tmp = self.head;
  while (true) {
    const x = _tmp;
    if (x === undefined) {
      break;
    } else {
      const _Some = x;
      const _x = _Some;
      const _key = _x.key;
      const _value = _x.value;
      const _next = _x.next;
      arr[i] = { _0: _key, _1: _value };
      i = i + 1 | 0;
      _tmp = _next;
      continue;
    }
  }
  return arr;
}
function _M0MPB3Map3mapGsRP419moonbit_2dcommunity7rabbita8internal7runtime5VNodeRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(self, f) {
  const _bind = self.capacity;
  const _bind$2 = $make_array_len_and_init(self.capacity, undefined);
  const _bind$3 = self.size;
  const _bind$4 = self.capacity_mask;
  const _bind$5 = self.grow_at;
  const _bind$6 = undefined;
  const _bind$7 = self.tail;
  const other = new _M0TPB3MapGsRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(_bind$2, _bind$3, _bind, _bind$4, _bind$5, _bind$6, _bind$7);
  if (self.size === 0) {
    return other;
  }
  const _tmp = self.entries;
  const _tmp$2 = self.tail;
  $bound_check(_tmp, _tmp$2);
  const _bind$8 = _tmp[_tmp$2];
  if (_bind$8 === undefined) {
    return $panic();
  } else {
    const _Some = _bind$8;
    const _last = _Some;
    let _tmp$3 = _last;
    let _tmp$4 = self.tail;
    let _tmp$5 = undefined;
    while (true) {
      const entry = _tmp$3;
      const idx = _tmp$4;
      const next = _tmp$5;
      const _prev = entry.prev;
      const _psl = entry.psl;
      const _hash = entry.hash;
      const _key = entry.key;
      const _value = entry.value;
      const new_value = f(_key, _value);
      const new_entry = new _M0TPB5EntryGsRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(_prev, next, _psl, _hash, _key, new_value);
      const _tmp$6 = other.entries;
      $bound_check(_tmp$6, idx);
      _tmp$6[idx] = new_entry;
      if (_prev !== -1) {
        const _tmp$7 = self.entries;
        $bound_check(_tmp$7, _prev);
        const _p$2 = _tmp$7[_prev];
        if (_p$2 === undefined) {
          _tmp$3 = $panic();
        } else {
          const _p$3 = _p$2;
          _tmp$3 = _p$3;
        }
        _tmp$4 = _prev;
        _tmp$5 = new_entry;
        continue;
      } else {
        other.head = new_entry;
        break;
      }
    }
    return other;
  }
}
function _M0MPB4Iter4join(self, sep) {
  const result = _M0MPB13StringBuilder11new_2einner(0);
  const _bind = _M0MPB4Iter4nextGURP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEE(self);
  if (_bind === undefined) {
  } else {
    const _Some = _bind;
    const _x = _Some;
    _M0IPB13StringBuilderPB6Logger13write__string(result, _x);
    while (true) {
      const _bind$2 = _M0MPB4Iter4nextGURP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEE(self);
      if (_bind$2 === undefined) {
        break;
      } else {
        const _Some$2 = _bind$2;
        const _x$2 = _Some$2;
        _M0IPB13StringBuilderPB6Logger11write__view(result, sep);
        _M0IPB13StringBuilderPB6Logger13write__string(result, _x$2);
        continue;
      }
    }
  }
  return result.val;
}
function _M0MPB5Iter24nextGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(self) {
  return _M0MPB4Iter4nextGURP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEE(self);
}
function _M0MPB5Iter24nextGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(self) {
  return _M0MPB4Iter4nextGURP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEE(self);
}
function _M0MPB5Iter24nextGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(self) {
  return _M0MPB4Iter4nextGURP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEE(self);
}
function _M0MPB6Hasher15combine__string(self, value) {
  const _bind = value.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      _M0MPB6Hasher13combine__uint(self, value.charCodeAt(i));
      _tmp = i + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function _M0IPC16string6StringPB4Hash13hash__combine(self, hasher) {
  _M0MPB6Hasher15combine__string(hasher, self);
}
function _M0IPC13int3IntPB4Hash13hash__combine(self, hasher) {
  _M0MPB6Hasher12combine__int(hasher, self);
}
function _M0MPB3Map11new_2einnerGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(capacity) {
  return _M0FPB8new__mapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(capacity);
}
function _M0MPB3Map3newGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(capacity$46$opt) {
  let capacity;
  if (capacity$46$opt === undefined) {
    capacity = 8;
  } else {
    const _Some = capacity$46$opt;
    capacity = _Some;
  }
  return _M0MPB3Map11new_2einnerGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(capacity);
}
function _M0MPC15array5Array12view_2einnerGRPC16string10StringViewE(self, start, end) {
  const len = self.length;
  let end$2;
  if (end === undefined) {
    end$2 = len;
  } else {
    const _Some = end;
    const _end = _Some;
    end$2 = _end < 0 ? len + _end | 0 : _end;
  }
  const start$2 = start < 0 ? len + start | 0 : start;
  if (start$2 >= 0 && (start$2 <= end$2 && end$2 <= len)) {
    const _bind = self;
    const _bind$2 = end$2 - start$2 | 0;
    return new _M0TPB9ArrayViewGRPC16string10StringViewE(_bind, start$2, start$2 + _bind$2 | 0);
  } else {
    return _M0FPC15abort5abortGRPB9ArrayViewGRPC16string10StringViewEE("View index out of bounds");
  }
}
function _M0MPC15array9ArrayView4joinGsE(self, separator) {
  if ((self.end - self.start | 0) === 0) {
    return "";
  } else {
    const _hd = self.buf[self.start];
    const _x_buf = self.buf;
    const _x_start = 1 + self.start | 0;
    const _x_end = self.end;
    const hd = _M0IPC16string6StringPB12ToStringView16to__string__view(_hd);
    const _bind = _x_end - _x_start | 0;
    let size_hint;
    let _tmp = 0;
    let _tmp$2 = hd.end - hd.start | 0;
    while (true) {
      const _ = _tmp;
      const size_hint$2 = _tmp$2;
      if (_ < _bind) {
        const s = _x_buf[_x_start + _ | 0];
        _tmp = _ + 1 | 0;
        const _p$2 = _M0IPC16string6StringPB12ToStringView16to__string__view(s);
        _tmp$2 = (size_hint$2 + (_p$2.end - _p$2.start | 0) | 0) + (separator.end - separator.start | 0) | 0;
        continue;
      } else {
        size_hint = size_hint$2;
        break;
      }
    }
    const size_hint$2 = size_hint << 1;
    const buf = _M0MPB13StringBuilder11new_2einner(size_hint$2);
    _M0IPB13StringBuilderPB6Logger11write__view(buf, hd);
    if (_M0MPC16string6String24char__length__eq_2einner(separator.str, 0, separator.start, separator.end)) {
      const _bind$2 = _x_end - _x_start | 0;
      let _tmp$3 = 0;
      while (true) {
        const _ = _tmp$3;
        if (_ < _bind$2) {
          const s = _x_buf[_x_start + _ | 0];
          const s$2 = _M0IPC16string6StringPB12ToStringView16to__string__view(s);
          _M0IPB13StringBuilderPB6Logger11write__view(buf, s$2);
          _tmp$3 = _ + 1 | 0;
          continue;
        } else {
          break;
        }
      }
    } else {
      const _bind$2 = _x_end - _x_start | 0;
      let _tmp$3 = 0;
      while (true) {
        const _ = _tmp$3;
        if (_ < _bind$2) {
          const s = _x_buf[_x_start + _ | 0];
          const s$2 = _M0IPC16string6StringPB12ToStringView16to__string__view(s);
          _M0IPB13StringBuilderPB6Logger11write__view(buf, separator);
          _M0IPB13StringBuilderPB6Logger11write__view(buf, s$2);
          _tmp$3 = _ + 1 | 0;
          continue;
        } else {
          break;
        }
      }
    }
    return buf.val;
  }
}
function _M0MPC15array5Array17reserve__capacityGRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(self, capacity) {}
function _M0MPC15array5Array11unsafe__popGRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(self) {
  return _M0MPB7JSArray3pop(self);
}
function _M0MPC15array5Array3popGRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(self) {
  if (self.length === 0) {
    return undefined;
  } else {
    const v = _M0MPC15array5Array11unsafe__popGRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(self);
    return v;
  }
}
function _M0MPC15array5Array2atGRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(self, index) {
  const len = self.length;
  if (index >= 0 && index < len) {
    $bound_check(self, index);
    return self[index];
  } else {
    return $panic();
  }
}
function _M0MPC15array5Array3revGRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(self) {
  const len = self.length;
  const arr = new Array(len);
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < len) {
      arr[i] = self[(len - i | 0) - 1 | 0];
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return arr;
}
function _M0MPC15array5Array10push__iterGRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(self, iter) {
  const _bind = iter.size_hint;
  if (_bind === undefined) {
  } else {
    const _Some = _bind;
    const _n = _Some;
    _M0MPC15array5Array17reserve__capacityGRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(self, self.length + _n | 0);
  }
  while (true) {
    const _bind$2 = _M0MPB4Iter4nextGURP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEE(iter);
    if (_bind$2 === undefined) {
      return;
    } else {
      const _Some = _bind$2;
      const _x = _Some;
      _M0MPC15array5Array4pushGRPC16string10StringViewE(self, _x);
      continue;
    }
  }
}
function _M0MPC15array5Array4joinGsE(self, separator) {
  return _M0MPC15array9ArrayView4joinGsE(new _M0TPB9ArrayViewGsE(self, 0, self.length), separator);
}
function _M0FPC13set8new__setGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(capacity) {
  const capacity$2 = _M0MPC13int3Int20next__power__of__two(capacity);
  const _bind = capacity$2 - 1 | 0;
  const _bind$2 = (Math.imul(capacity$2, 13) | 0) / 16 | 0;
  const _bind$3 = $make_array_len_and_init(capacity$2, undefined);
  const _bind$4 = undefined;
  return new _M0TPC13set3SetGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(_bind$3, 0, capacity$2, _bind, _bind$2, _bind$4, -1);
}
function _M0MPC13set3Set20add__entry__to__tailGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(self, idx, entry) {
  const _bind = self.tail;
  if (_bind === -1) {
    self.head = entry;
  } else {
    const _tmp = self.entries;
    $bound_check(_tmp, _bind);
    const _p$2 = _tmp[_bind];
    let _tmp$2;
    if (_p$2 === undefined) {
      _tmp$2 = $panic();
    } else {
      const _p$3 = _p$2;
      _tmp$2 = _p$3;
    }
    _tmp$2.next = entry;
  }
  self.tail = idx;
  const _tmp = self.entries;
  $bound_check(_tmp, idx);
  _tmp[idx] = entry;
  self.size = self.size + 1 | 0;
}
function _M0MPC13set3Set10set__entryGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(self, entry, new_idx) {
  const _tmp = self.entries;
  $bound_check(_tmp, new_idx);
  _tmp[new_idx] = entry;
  const _bind = entry.next;
  if (_bind === undefined) {
    self.tail = new_idx;
    return;
  } else {
    const _Some = _bind;
    const _next = _Some;
    _next.prev = new_idx;
    return;
  }
}
function _M0MPC13set3Set10push__awayGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(self, idx, entry) {
  let _tmp = entry.psl + 1 | 0;
  let _tmp$2 = idx + 1 & self.capacity_mask;
  let _tmp$3 = entry;
  while (true) {
    const psl = _tmp;
    const idx$2 = _tmp$2;
    const entry$2 = _tmp$3;
    const _tmp$4 = self.entries;
    $bound_check(_tmp$4, idx$2);
    const _bind = _tmp$4[idx$2];
    if (_bind === undefined) {
      entry$2.psl = psl;
      _M0MPC13set3Set10set__entryGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(self, entry$2, idx$2);
      return;
    } else {
      const _Some = _bind;
      const _curr_entry = _Some;
      if (psl > _curr_entry.psl) {
        entry$2.psl = psl;
        _M0MPC13set3Set10set__entryGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(self, entry$2, idx$2);
        _tmp = _curr_entry.psl + 1 | 0;
        _tmp$2 = idx$2 + 1 & self.capacity_mask;
        _tmp$3 = _curr_entry;
        continue;
      } else {
        _tmp = psl + 1 | 0;
        _tmp$2 = idx$2 + 1 & self.capacity_mask;
        continue;
      }
    }
  }
}
function _M0MPC13set3Set15add__with__hashGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(self, key, hash) {
  if (self.size >= self.grow_at) {
    _M0MPC13set3Set4growGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(self);
  }
  let idx;
  let psl;
  _L: {
    let _tmp = 0;
    let _tmp$2 = hash & self.capacity_mask;
    while (true) {
      const psl$2 = _tmp;
      const idx$2 = _tmp$2;
      const _tmp$3 = self.entries;
      $bound_check(_tmp$3, idx$2);
      const _bind = _tmp$3[idx$2];
      if (_bind === undefined) {
        idx = idx$2;
        psl = psl$2;
        break _L;
      } else {
        const _Some = _bind;
        const _curr_entry = _Some;
        let _tmp$4;
        if (_curr_entry.hash === hash) {
          const _p$2 = _curr_entry.key;
          _tmp$4 = _p$2 === key;
        } else {
          _tmp$4 = false;
        }
        if (_tmp$4) {
          return undefined;
        }
        if (psl$2 > _curr_entry.psl) {
          _M0MPC13set3Set10push__awayGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(self, idx$2, _curr_entry);
          idx = idx$2;
          psl = psl$2;
          break _L;
        }
        _tmp = psl$2 + 1 | 0;
        _tmp$2 = idx$2 + 1 & self.capacity_mask;
        continue;
      }
    }
  }
  const _bind = self.tail;
  const _bind$2 = undefined;
  const entry = new _M0TPC13set5EntryGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(_bind, _bind$2, psl, hash, key);
  _M0MPC13set3Set20add__entry__to__tailGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(self, idx, entry);
}
function _M0MPC13set3Set4growGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(self) {
  const old_head = self.head;
  const new_capacity = self.capacity << 1;
  self.entries = $make_array_len_and_init(new_capacity, undefined);
  self.capacity = new_capacity;
  self.capacity_mask = new_capacity - 1 | 0;
  const _p$2 = self.capacity;
  self.grow_at = (Math.imul(_p$2, 13) | 0) / 16 | 0;
  self.size = 0;
  self.head = undefined;
  self.tail = -1;
  let _tmp = old_head;
  while (true) {
    const x = _tmp;
    if (x === undefined) {
      return;
    } else {
      const _Some = x;
      const _x = _Some;
      const _next = _x.next;
      const _key = _x.key;
      const _hash = _x.hash;
      _M0MPC13set3Set15add__with__hashGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(self, _key, _hash);
      _tmp = _next;
      continue;
    }
  }
}
function _M0MPC13set3Set3addGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(self, key) {
  _M0MPC13set3Set15add__with__hashGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(self, key, _M0IP016_24default__implPB4Hash4hashGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(key));
}
function _M0MPC13set3Set13remove__entryGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(self, entry) {
  const _bind = entry.prev;
  if (_bind === -1) {
    self.head = entry.next;
  } else {
    const _tmp = self.entries;
    $bound_check(_tmp, _bind);
    const _p$2 = _tmp[_bind];
    let _tmp$2;
    if (_p$2 === undefined) {
      _tmp$2 = $panic();
    } else {
      const _p$3 = _p$2;
      _tmp$2 = _p$3;
    }
    _tmp$2.next = entry.next;
  }
  const _bind$2 = entry.next;
  if (_bind$2 === undefined) {
    self.tail = entry.prev;
    return;
  } else {
    const _Some = _bind$2;
    const _next = _Some;
    _next.prev = entry.prev;
    return;
  }
}
function _M0MPC13set3Set11shift__backGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(self, idx) {
  let _tmp = idx;
  while (true) {
    const cur = _tmp;
    const next = cur + 1 & self.capacity_mask;
    _L: {
      const _tmp$2 = self.entries;
      $bound_check(_tmp$2, next);
      const _bind = _tmp$2[next];
      if (_bind === undefined) {
        break _L;
      } else {
        const _Some = _bind;
        const _x = _Some;
        const _x$2 = _x.psl;
        if (_x$2 === 0) {
          break _L;
        } else {
          _x.psl = _x.psl - 1 | 0;
          _M0MPC13set3Set10set__entryGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(self, _x, cur);
          _tmp = next;
          continue;
        }
      }
    }
    const _tmp$2 = self.entries;
    $bound_check(_tmp$2, cur);
    _tmp$2[cur] = undefined;
    return;
  }
}
function _M0MPC13set3Set6removeGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(self, key) {
  const hash = _M0IP016_24default__implPB4Hash4hashGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind = _tmp$3[idx];
    if (_bind === undefined) {
      return;
    } else {
      const _Some = _bind;
      const _entry = _Some;
      let _tmp$4;
      if (_entry.hash === hash) {
        const _p$2 = _entry.key;
        _tmp$4 = _p$2 === key;
      } else {
        _tmp$4 = false;
      }
      if (_tmp$4) {
        _M0MPC13set3Set13remove__entryGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(self, _entry);
        _M0MPC13set3Set11shift__backGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(self, idx);
        self.size = self.size - 1 | 0;
        return;
      }
      if (i > _entry.psl) {
        return;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPC13set3Set5clearGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(self) {
  _M0MPC15array10FixedArray12fill_2einnerGORPC13set5EntryGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdEE(self.entries, undefined, 0, undefined);
  self.size = 0;
  self.head = undefined;
  self.tail = -1;
}
function _M0MPC13set3Set9to__arrayGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(self) {
  const arr = _M0MPC15array5Array11new_2einnerGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(self.size);
  let _tmp = self.head;
  while (true) {
    const x = _tmp;
    if (x === undefined) {
      break;
    } else {
      const _Some = x;
      const _x = _Some;
      const _key = _x.key;
      const _next = _x.next;
      _M0MPC15array5Array4pushGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(arr, _key);
      _tmp = _next;
      continue;
    }
  }
  return arr;
}
function _M0MPC13set3Set11new_2einnerGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(capacity) {
  return _M0FPC13set8new__setGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(capacity);
}
function _M0MPC13set3Set3newGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(capacity$46$opt) {
  let capacity;
  if (capacity$46$opt === undefined) {
    capacity = 8;
  } else {
    const _Some = capacity$46$opt;
    capacity = _Some;
  }
  return _M0MPC13set3Set11new_2einnerGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(capacity);
}
function _M0FPC13ref3newGRP38zongen0116mgpic2026_2dsite4main5ModelE(x) {
  return new _M0TPC13ref3RefGRP38zongen0116mgpic2026_2dsite4main5ModelE(x);
}
function _M0FPC13ref3newGiE(x) {
  return new _M0TPC13ref3RefGiE(x);
}
function _M0FPC15queue10new__queueGRP38zongen0116mgpic2026_2dsite4main3MsgE() {
  return new _M0TPC15queue5QueueGRP38zongen0116mgpic2026_2dsite4main3MsgE(0, undefined, undefined);
}
function _M0FPC15queue10new__queueGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE() {
  return new _M0TPC15queue5QueueGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(0, undefined, undefined);
}
function _M0FPC15queue10new__queueGWRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE() {
  return new _M0TPC15queue5QueueGWRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(0, undefined, undefined);
}
function _M0MPC15queue5Queue5clearGRP38zongen0116mgpic2026_2dsite4main3MsgE(self) {
  self.length = 0;
  self.first = undefined;
  self.last = undefined;
}
function _M0MPC15queue5Queue5clearGWRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(self) {
  self.length = 0;
  self.first = undefined;
  self.last = undefined;
}
function _M0MPC15queue5Queue5clearGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(self) {
  self.length = 0;
  self.first = undefined;
  self.last = undefined;
}
function _M0MPC15queue5Queue4pushGRP38zongen0116mgpic2026_2dsite4main3MsgE(self, x) {
  const cell = new _M0TPC15queue4ConsGRP38zongen0116mgpic2026_2dsite4main3MsgE(x, undefined);
  const _bind = self.last;
  if (_bind === undefined) {
    self.length = 1;
    self.first = cell;
    self.last = cell;
    return;
  } else {
    const _Some = _bind;
    const _last = _Some;
    _last.next = cell;
    self.length = self.length + 1 | 0;
    self.last = cell;
    return;
  }
}
function _M0MPC15queue5Queue4pushGWRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(self, x) {
  const cell = new _M0TPC15queue4ConsGWRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(x, undefined);
  const _bind = self.last;
  if (_bind === undefined) {
    self.length = 1;
    self.first = cell;
    self.last = cell;
    return;
  } else {
    const _Some = _bind;
    const _last = _Some;
    _last.next = cell;
    self.length = self.length + 1 | 0;
    self.last = cell;
    return;
  }
}
function _M0MPC15queue5Queue4pushGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(self, x) {
  const cell = new _M0TPC15queue4ConsGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(x, undefined);
  const _bind = self.last;
  if (_bind === undefined) {
    self.length = 1;
    self.first = cell;
    self.last = cell;
    return;
  } else {
    const _Some = _bind;
    const _last = _Some;
    _last.next = cell;
    self.length = self.length + 1 | 0;
    self.last = cell;
    return;
  }
}
function _M0MPC15queue5Queue3popGRP38zongen0116mgpic2026_2dsite4main3MsgE(self) {
  const _bind = self.first;
  if (_bind === undefined) {
    return undefined;
  } else {
    const _Some = _bind;
    const _x = _Some;
    const _content = _x.content;
    const _x$2 = _x.next;
    if (_x$2 === undefined) {
      _M0MPC15queue5Queue5clearGRP38zongen0116mgpic2026_2dsite4main3MsgE(self);
      return _content;
    } else {
      self.length = self.length - 1 | 0;
      self.first = _x$2;
      return _content;
    }
  }
}
function _M0MPC15queue5Queue3popGWRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(self) {
  const _bind = self.first;
  if (_bind === undefined) {
    return undefined;
  } else {
    const _Some = _bind;
    const _x = _Some;
    const _content = _x.content;
    const _x$2 = _x.next;
    if (_x$2 === undefined) {
      _M0MPC15queue5Queue5clearGWRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(self);
      return _content;
    } else {
      self.length = self.length - 1 | 0;
      self.first = _x$2;
      return _content;
    }
  }
}
function _M0MPC15queue5Queue3popGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(self) {
  const _bind = self.first;
  if (_bind === undefined) {
    return undefined;
  } else {
    const _Some = _bind;
    const _x = _Some;
    const _content = _x.content;
    const _x$2 = _x.next;
    if (_x$2 === undefined) {
      _M0MPC15queue5Queue5clearGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(self);
      return _content;
    } else {
      self.length = self.length - 1 | 0;
      self.first = _x$2;
      return _content;
    }
  }
}
function _M0MPC15queue5Queue3newGRP38zongen0116mgpic2026_2dsite4main3MsgE() {
  return _M0FPC15queue10new__queueGRP38zongen0116mgpic2026_2dsite4main3MsgE();
}
function _M0MPC15queue5Queue3newGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE() {
  return _M0FPC15queue10new__queueGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE();
}
function _M0MPC15queue5Queue3newGWRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE() {
  return _M0FPC15queue10new__queueGWRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE();
}
function _M0FPC17strconv9base__errGUiRPC16string10StringViewbEE() {
  return new _M0DTPC16result6ResultGUiRPC16string10StringViewbERPC17strconv12StrConvErrorE3Err(new _M0DTPC15error5Error58moonbitlang_2fcore_2fstrconv_2eStrConvError_2eStrConvError(_M0FPC17strconv14base__err__str));
}
function _M0FPC17strconv25check__and__consume__base(view, base) {
  if (base === 0) {
    _L: {
      let rest;
      _L$2: {
        let rest$2;
        _L$3: {
          let rest$3;
          _L$4: {
            if (_M0MPC16string6String24char__length__ge_2einner(view.str, 2, view.start, view.end)) {
              const _x = _M0MPC16string6String16unsafe__char__at(view.str, _M0MPC16string6String29offset__of__nth__char_2einner(view.str, 0, view.start, view.end));
              if (_x === 48) {
                const _x$2 = _M0MPC16string6String16unsafe__char__at(view.str, _M0MPC16string6String29offset__of__nth__char_2einner(view.str, 1, view.start, view.end));
                switch (_x$2) {
                  case 120: {
                    const _tmp = view.str;
                    const _bind = _M0MPC16string6String29offset__of__nth__char_2einner(view.str, 2, view.start, view.end);
                    let _tmp$2;
                    if (_bind === undefined) {
                      _tmp$2 = view.end;
                    } else {
                      const _Some = _bind;
                      _tmp$2 = _Some;
                    }
                    const _x$3 = new _M0TPC16string10StringView(_tmp, _tmp$2, view.end);
                    rest$3 = _x$3;
                    break _L$4;
                  }
                  case 88: {
                    const _tmp$3 = view.str;
                    const _bind$2 = _M0MPC16string6String29offset__of__nth__char_2einner(view.str, 2, view.start, view.end);
                    let _tmp$4;
                    if (_bind$2 === undefined) {
                      _tmp$4 = view.end;
                    } else {
                      const _Some = _bind$2;
                      _tmp$4 = _Some;
                    }
                    const _x$4 = new _M0TPC16string10StringView(_tmp$3, _tmp$4, view.end);
                    rest$3 = _x$4;
                    break _L$4;
                  }
                  case 111: {
                    const _tmp$5 = view.str;
                    const _bind$3 = _M0MPC16string6String29offset__of__nth__char_2einner(view.str, 2, view.start, view.end);
                    let _tmp$6;
                    if (_bind$3 === undefined) {
                      _tmp$6 = view.end;
                    } else {
                      const _Some = _bind$3;
                      _tmp$6 = _Some;
                    }
                    const _x$5 = new _M0TPC16string10StringView(_tmp$5, _tmp$6, view.end);
                    rest$2 = _x$5;
                    break _L$3;
                  }
                  case 79: {
                    const _tmp$7 = view.str;
                    const _bind$4 = _M0MPC16string6String29offset__of__nth__char_2einner(view.str, 2, view.start, view.end);
                    let _tmp$8;
                    if (_bind$4 === undefined) {
                      _tmp$8 = view.end;
                    } else {
                      const _Some = _bind$4;
                      _tmp$8 = _Some;
                    }
                    const _x$6 = new _M0TPC16string10StringView(_tmp$7, _tmp$8, view.end);
                    rest$2 = _x$6;
                    break _L$3;
                  }
                  case 98: {
                    const _tmp$9 = view.str;
                    const _bind$5 = _M0MPC16string6String29offset__of__nth__char_2einner(view.str, 2, view.start, view.end);
                    let _tmp$10;
                    if (_bind$5 === undefined) {
                      _tmp$10 = view.end;
                    } else {
                      const _Some = _bind$5;
                      _tmp$10 = _Some;
                    }
                    const _x$7 = new _M0TPC16string10StringView(_tmp$9, _tmp$10, view.end);
                    rest = _x$7;
                    break _L$2;
                  }
                  case 66: {
                    const _tmp$11 = view.str;
                    const _bind$6 = _M0MPC16string6String29offset__of__nth__char_2einner(view.str, 2, view.start, view.end);
                    let _tmp$12;
                    if (_bind$6 === undefined) {
                      _tmp$12 = view.end;
                    } else {
                      const _Some = _bind$6;
                      _tmp$12 = _Some;
                    }
                    const _x$8 = new _M0TPC16string10StringView(_tmp$11, _tmp$12, view.end);
                    rest = _x$8;
                    break _L$2;
                  }
                  default: {
                    break _L;
                  }
                }
              } else {
                break _L;
              }
            } else {
              break _L;
            }
          }
          return new _M0DTPC16result6ResultGUiRPC16string10StringViewbERPC17strconv12StrConvErrorE2Ok({ _0: 16, _1: rest$3, _2: true });
        }
        return new _M0DTPC16result6ResultGUiRPC16string10StringViewbERPC17strconv12StrConvErrorE2Ok({ _0: 8, _1: rest$2, _2: true });
      }
      return new _M0DTPC16result6ResultGUiRPC16string10StringViewbERPC17strconv12StrConvErrorE2Ok({ _0: 2, _1: rest, _2: true });
    }
    return new _M0DTPC16result6ResultGUiRPC16string10StringViewbERPC17strconv12StrConvErrorE2Ok({ _0: 10, _1: view, _2: false });
  } else {
    _L: {
      let rest;
      _L$2: {
        let rest$2;
        _L$3: {
          let rest$3;
          _L$4: {
            if (_M0MPC16string6String24char__length__ge_2einner(view.str, 2, view.start, view.end)) {
              const _x = _M0MPC16string6String16unsafe__char__at(view.str, _M0MPC16string6String29offset__of__nth__char_2einner(view.str, 0, view.start, view.end));
              if (_x === 48) {
                const _x$2 = _M0MPC16string6String16unsafe__char__at(view.str, _M0MPC16string6String29offset__of__nth__char_2einner(view.str, 1, view.start, view.end));
                switch (_x$2) {
                  case 120: {
                    const _tmp = view.str;
                    const _bind = _M0MPC16string6String29offset__of__nth__char_2einner(view.str, 2, view.start, view.end);
                    let _tmp$2;
                    if (_bind === undefined) {
                      _tmp$2 = view.end;
                    } else {
                      const _Some = _bind;
                      _tmp$2 = _Some;
                    }
                    const _x$3 = new _M0TPC16string10StringView(_tmp, _tmp$2, view.end);
                    if (base === 16) {
                      rest$3 = _x$3;
                      break _L$4;
                    } else {
                      break _L;
                    }
                  }
                  case 88: {
                    const _tmp$3 = view.str;
                    const _bind$2 = _M0MPC16string6String29offset__of__nth__char_2einner(view.str, 2, view.start, view.end);
                    let _tmp$4;
                    if (_bind$2 === undefined) {
                      _tmp$4 = view.end;
                    } else {
                      const _Some = _bind$2;
                      _tmp$4 = _Some;
                    }
                    const _x$4 = new _M0TPC16string10StringView(_tmp$3, _tmp$4, view.end);
                    if (base === 16) {
                      rest$3 = _x$4;
                      break _L$4;
                    } else {
                      break _L;
                    }
                  }
                  case 111: {
                    const _tmp$5 = view.str;
                    const _bind$3 = _M0MPC16string6String29offset__of__nth__char_2einner(view.str, 2, view.start, view.end);
                    let _tmp$6;
                    if (_bind$3 === undefined) {
                      _tmp$6 = view.end;
                    } else {
                      const _Some = _bind$3;
                      _tmp$6 = _Some;
                    }
                    const _x$5 = new _M0TPC16string10StringView(_tmp$5, _tmp$6, view.end);
                    if (base === 8) {
                      rest$2 = _x$5;
                      break _L$3;
                    } else {
                      break _L;
                    }
                  }
                  case 79: {
                    const _tmp$7 = view.str;
                    const _bind$4 = _M0MPC16string6String29offset__of__nth__char_2einner(view.str, 2, view.start, view.end);
                    let _tmp$8;
                    if (_bind$4 === undefined) {
                      _tmp$8 = view.end;
                    } else {
                      const _Some = _bind$4;
                      _tmp$8 = _Some;
                    }
                    const _x$6 = new _M0TPC16string10StringView(_tmp$7, _tmp$8, view.end);
                    if (base === 8) {
                      rest$2 = _x$6;
                      break _L$3;
                    } else {
                      break _L;
                    }
                  }
                  case 98: {
                    const _tmp$9 = view.str;
                    const _bind$5 = _M0MPC16string6String29offset__of__nth__char_2einner(view.str, 2, view.start, view.end);
                    let _tmp$10;
                    if (_bind$5 === undefined) {
                      _tmp$10 = view.end;
                    } else {
                      const _Some = _bind$5;
                      _tmp$10 = _Some;
                    }
                    const _x$7 = new _M0TPC16string10StringView(_tmp$9, _tmp$10, view.end);
                    if (base === 2) {
                      rest = _x$7;
                      break _L$2;
                    } else {
                      break _L;
                    }
                  }
                  case 66: {
                    const _tmp$11 = view.str;
                    const _bind$6 = _M0MPC16string6String29offset__of__nth__char_2einner(view.str, 2, view.start, view.end);
                    let _tmp$12;
                    if (_bind$6 === undefined) {
                      _tmp$12 = view.end;
                    } else {
                      const _Some = _bind$6;
                      _tmp$12 = _Some;
                    }
                    const _x$8 = new _M0TPC16string10StringView(_tmp$11, _tmp$12, view.end);
                    if (base === 2) {
                      rest = _x$8;
                      break _L$2;
                    } else {
                      break _L;
                    }
                  }
                  default: {
                    break _L;
                  }
                }
              } else {
                break _L;
              }
            } else {
              break _L;
            }
          }
          return new _M0DTPC16result6ResultGUiRPC16string10StringViewbERPC17strconv12StrConvErrorE2Ok({ _0: 16, _1: rest$3, _2: true });
        }
        return new _M0DTPC16result6ResultGUiRPC16string10StringViewbERPC17strconv12StrConvErrorE2Ok({ _0: 8, _1: rest$2, _2: true });
      }
      return new _M0DTPC16result6ResultGUiRPC16string10StringViewbERPC17strconv12StrConvErrorE2Ok({ _0: 2, _1: rest, _2: true });
    }
    return base >= 2 && base <= 36 ? new _M0DTPC16result6ResultGUiRPC16string10StringViewbERPC17strconv12StrConvErrorE2Ok({ _0: base, _1: view, _2: false }) : _M0FPC17strconv9base__errGUiRPC16string10StringViewbEE();
  }
}
function _M0FPC17strconv10range__errGuE() {
  return new _M0DTPC16result6ResultGuRPC17strconv12StrConvErrorE3Err(new _M0DTPC15error5Error58moonbitlang_2fcore_2fstrconv_2eStrConvError_2eStrConvError(_M0FPC17strconv15range__err__str));
}
function _M0FPC17strconv11syntax__errGiE() {
  return new _M0DTPC16result6ResultGiRPC17strconv12StrConvErrorE3Err(new _M0DTPC15error5Error58moonbitlang_2fcore_2fstrconv_2eStrConvError_2eStrConvError(_M0FPC17strconv16syntax__err__str));
}
function _M0FPC17strconv11syntax__errGuE() {
  return new _M0DTPC16result6ResultGuRPC17strconv12StrConvErrorE3Err(new _M0DTPC15error5Error58moonbitlang_2fcore_2fstrconv_2eStrConvError_2eStrConvError(_M0FPC17strconv16syntax__err__str));
}
function _M0FPC17strconv11syntax__errGlE() {
  return new _M0DTPC16result6ResultGlRPC17strconv12StrConvErrorE3Err(new _M0DTPC15error5Error58moonbitlang_2fcore_2fstrconv_2eStrConvError_2eStrConvError(_M0FPC17strconv16syntax__err__str));
}
function _M0FPC17strconv19overflow__threshold(base, neg) {
  if (!neg) {
    if (base === 10) {
      return 922337203685477581n;
    } else {
      if (base === 16) {
        return 576460752303423488n;
      } else {
        const _tmp = BigInt.asUintN(64, BigInt(base));
        if (_tmp === 0n) {
          $panic();
        }
        return BigInt.asUintN(64, BigInt.asUintN(64, BigInt.asIntN(64, 9223372036854775807n) / BigInt.asIntN(64, _tmp)) + 1n);
      }
    }
  } else {
    if (base === 10) {
      return 17524406870024074036n;
    } else {
      if (base === 16) {
        return 17870283321406128128n;
      } else {
        const _tmp = BigInt.asUintN(64, BigInt(base));
        if (_tmp === 0n) {
          $panic();
        }
        return BigInt.asUintN(64, BigInt.asIntN(64, 9223372036854775808n) / BigInt.asIntN(64, _tmp));
      }
    }
  }
}
function _M0FPC17strconv20parse__int64_2einner(str, base) {
  if (_M0IP016_24default__implPB2Eq10not__equalGRPC16string10StringViewE(str, new _M0TPC16string10StringView(_M0FPC17strconv20parse__int64_2einnerN7_2abindS538, 0, _M0FPC17strconv20parse__int64_2einnerN7_2abindS538.length))) {
    let neg;
    let rest;
    _L: {
      let rest$2;
      _L$2: {
        const _bind = _M0MPC16string10StringView12view_2einner(str, 0, undefined);
        if (_M0MPC16string6String24char__length__ge_2einner(_bind.str, 1, _bind.start, _bind.end)) {
          const _x = _M0MPC16string6String16unsafe__char__at(_bind.str, _M0MPC16string6String29offset__of__nth__char_2einner(_bind.str, 0, _bind.start, _bind.end));
          switch (_x) {
            case 43: {
              const _tmp = _bind.str;
              const _bind$2 = _M0MPC16string6String29offset__of__nth__char_2einner(_bind.str, 1, _bind.start, _bind.end);
              let _tmp$2;
              if (_bind$2 === undefined) {
                _tmp$2 = _bind.end;
              } else {
                const _Some = _bind$2;
                _tmp$2 = _Some;
              }
              const _x$2 = new _M0TPC16string10StringView(_tmp, _tmp$2, _bind.end);
              neg = false;
              rest = _x$2;
              break _L;
            }
            case 45: {
              const _tmp$3 = _bind.str;
              const _bind$3 = _M0MPC16string6String29offset__of__nth__char_2einner(_bind.str, 1, _bind.start, _bind.end);
              let _tmp$4;
              if (_bind$3 === undefined) {
                _tmp$4 = _bind.end;
              } else {
                const _Some = _bind$3;
                _tmp$4 = _Some;
              }
              const _x$3 = new _M0TPC16string10StringView(_tmp$3, _tmp$4, _bind.end);
              neg = true;
              rest = _x$3;
              break _L;
            }
            default: {
              rest$2 = _bind;
              break _L$2;
            }
          }
        } else {
          rest$2 = _bind;
          break _L$2;
        }
      }
      neg = false;
      rest = rest$2;
      break _L;
    }
    const _bind = _M0FPC17strconv25check__and__consume__base(rest, base);
    let _bind$2;
    if (_bind.$tag === 1) {
      const _ok = _bind;
      _bind$2 = _ok._0;
    } else {
      return _bind;
    }
    const _num_base = _bind$2._0;
    const _rest = _bind$2._1;
    const _allow_underscore = _bind$2._2;
    const overflow_threshold = _M0FPC17strconv19overflow__threshold(_num_base, neg);
    let has_digit;
    if (_M0MPC16string6String24char__length__ge_2einner(_rest.str, 1, _rest.start, _rest.end)) {
      const _x = _M0MPC16string6String16unsafe__char__at(_rest.str, _M0MPC16string6String29offset__of__nth__char_2einner(_rest.str, 0, _rest.start, _rest.end));
      if (_x >= 48 && _x <= 57) {
        has_digit = true;
      } else {
        if (_x >= 97 && _x <= 122) {
          has_digit = true;
        } else {
          if (_x >= 65 && _x <= 90) {
            has_digit = true;
          } else {
            if (_M0MPC16string6String24char__length__ge_2einner(_rest.str, 2, _rest.start, _rest.end)) {
              if (_x === 95) {
                const _x$2 = _M0MPC16string6String16unsafe__char__at(_rest.str, _M0MPC16string6String29offset__of__nth__char_2einner(_rest.str, 1, _rest.start, _rest.end));
                has_digit = _x$2 >= 48 && _x$2 <= 57 ? true : _x$2 >= 97 && _x$2 <= 122 ? true : _x$2 >= 65 && _x$2 <= 90;
              } else {
                has_digit = false;
              }
            } else {
              has_digit = false;
            }
          }
        }
      }
    } else {
      has_digit = false;
    }
    if (has_digit) {
      let _tmp;
      let _tmp$2 = _rest;
      let _tmp$3 = 0n;
      let _tmp$4 = _allow_underscore;
      while (true) {
        const s = _tmp$2;
        const acc = _tmp$3;
        const au = _tmp$4;
        let acc$2;
        let rest$2;
        let c;
        _L$2: {
          _L$3: {
            if (_M0MPC16string6String24char__length__eq_2einner(s.str, 1, s.start, s.end)) {
              const _x = _M0MPC16string6String16unsafe__char__at(s.str, _M0MPC16string6String29offset__of__nth__char_2einner(s.str, 0, s.start, s.end));
              if (_x === 95) {
                const _bind$3 = _M0FPC17strconv11syntax__errGuE();
                if (_bind$3.$tag === 1) {
                  const _ok = _bind$3;
                  _ok._0;
                } else {
                  return _bind$3;
                }
              } else {
                const _tmp$5 = s.str;
                const _bind$3 = _M0MPC16string6String29offset__of__nth__char_2einner(s.str, 1, s.start, s.end);
                let _tmp$6;
                if (_bind$3 === undefined) {
                  _tmp$6 = s.end;
                } else {
                  const _Some = _bind$3;
                  _tmp$6 = _Some;
                }
                const _x$2 = new _M0TPC16string10StringView(_tmp$5, _tmp$6, s.end);
                acc$2 = acc;
                rest$2 = _x$2;
                c = _x;
                break _L$3;
              }
            } else {
              if (_M0MPC16string6String24char__length__ge_2einner(s.str, 1, s.start, s.end)) {
                const _x = _M0MPC16string6String16unsafe__char__at(s.str, _M0MPC16string6String29offset__of__nth__char_2einner(s.str, 0, s.start, s.end));
                if (_x === 95) {
                  if (au === false) {
                    const _bind$3 = _M0FPC17strconv11syntax__errGuE();
                    if (_bind$3.$tag === 1) {
                      const _ok = _bind$3;
                      _ok._0;
                    } else {
                      return _bind$3;
                    }
                  } else {
                    const _tmp$5 = s.str;
                    const _bind$3 = _M0MPC16string6String29offset__of__nth__char_2einner(s.str, 1, s.start, s.end);
                    let _tmp$6;
                    if (_bind$3 === undefined) {
                      _tmp$6 = s.end;
                    } else {
                      const _Some = _bind$3;
                      _tmp$6 = _Some;
                    }
                    const _x$2 = new _M0TPC16string10StringView(_tmp$5, _tmp$6, s.end);
                    _tmp$2 = _x$2;
                    _tmp$4 = false;
                    continue;
                  }
                } else {
                  const _tmp$5 = s.str;
                  const _bind$3 = _M0MPC16string6String29offset__of__nth__char_2einner(s.str, 1, s.start, s.end);
                  let _tmp$6;
                  if (_bind$3 === undefined) {
                    _tmp$6 = s.end;
                  } else {
                    const _Some = _bind$3;
                    _tmp$6 = _Some;
                  }
                  const _x$2 = new _M0TPC16string10StringView(_tmp$5, _tmp$6, s.end);
                  acc$2 = acc;
                  rest$2 = _x$2;
                  c = _x;
                  break _L$3;
                }
              } else {
                _tmp = acc;
                break;
              }
            }
            break _L$2;
          }
          const c$2 = c;
          let d;
          if (c$2 >= 48 && c$2 <= 57) {
            d = c$2 - 48 | 0;
          } else {
            if (c$2 >= 97 && c$2 <= 122) {
              d = c$2 + -87 | 0;
            } else {
              if (c$2 >= 65 && c$2 <= 90) {
                d = c$2 + -55 | 0;
              } else {
                const _bind$3 = _M0FPC17strconv11syntax__errGiE();
                if (_bind$3.$tag === 1) {
                  const _ok = _bind$3;
                  d = _ok._0;
                } else {
                  return _bind$3;
                }
              }
            }
          }
          if (d < _num_base) {
            if (neg) {
              if (BigInt.asIntN(64, acc$2) >= BigInt.asIntN(64, overflow_threshold)) {
                const next_acc = BigInt.asUintN(64, BigInt.asUintN(64, acc$2 * BigInt.asUintN(64, BigInt(_num_base))) - BigInt.asUintN(64, BigInt(d)));
                if (BigInt.asIntN(64, next_acc) <= BigInt.asIntN(64, acc$2)) {
                  _tmp$2 = rest$2;
                  _tmp$3 = next_acc;
                  _tmp$4 = true;
                  continue;
                } else {
                  const _bind$3 = _M0FPC17strconv10range__errGuE();
                  if (_bind$3.$tag === 1) {
                    const _ok = _bind$3;
                    _ok._0;
                  } else {
                    return _bind$3;
                  }
                }
              } else {
                const _bind$3 = _M0FPC17strconv10range__errGuE();
                if (_bind$3.$tag === 1) {
                  const _ok = _bind$3;
                  _ok._0;
                } else {
                  return _bind$3;
                }
              }
            } else {
              if (BigInt.asIntN(64, acc$2) < BigInt.asIntN(64, overflow_threshold)) {
                const next_acc = BigInt.asUintN(64, BigInt.asUintN(64, acc$2 * BigInt.asUintN(64, BigInt(_num_base))) + BigInt.asUintN(64, BigInt(d)));
                if (BigInt.asIntN(64, next_acc) >= BigInt.asIntN(64, acc$2)) {
                  _tmp$2 = rest$2;
                  _tmp$3 = next_acc;
                  _tmp$4 = true;
                  continue;
                } else {
                  const _bind$3 = _M0FPC17strconv10range__errGuE();
                  if (_bind$3.$tag === 1) {
                    const _ok = _bind$3;
                    _ok._0;
                  } else {
                    return _bind$3;
                  }
                }
              } else {
                const _bind$3 = _M0FPC17strconv10range__errGuE();
                if (_bind$3.$tag === 1) {
                  const _ok = _bind$3;
                  _ok._0;
                } else {
                  return _bind$3;
                }
              }
            }
          } else {
            const _bind$3 = _M0FPC17strconv11syntax__errGuE();
            if (_bind$3.$tag === 1) {
              const _ok = _bind$3;
              _ok._0;
            } else {
              return _bind$3;
            }
          }
        }
        continue;
      }
      return new _M0DTPC16result6ResultGlRPC17strconv12StrConvErrorE2Ok(_tmp);
    } else {
      return _M0FPC17strconv11syntax__errGlE();
    }
  } else {
    return _M0FPC17strconv11syntax__errGlE();
  }
}
function _M0FPC17strconv18parse__int_2einner(str, base) {
  const _bind = _M0FPC17strconv20parse__int64_2einner(str, base);
  let n;
  if (_bind.$tag === 1) {
    const _ok = _bind;
    n = _ok._0;
  } else {
    return _bind;
  }
  if (BigInt.asIntN(64, n) < BigInt.asIntN(64, 18446744071562067968n) || BigInt.asIntN(64, n) > BigInt.asIntN(64, 2147483647n)) {
    const _bind$2 = _M0FPC17strconv10range__errGuE();
    if (_bind$2.$tag === 1) {
      const _ok = _bind$2;
      _ok._0;
    } else {
      return _bind$2;
    }
  }
  return new _M0DTPC16result6ResultGiRPC17strconv12StrConvErrorE2Ok(Number(BigInt.asIntN(32, n)) | 0);
}
function _M0MP319moonbit_2dcommunity7rabbita2js5Value10cast__fromGsE(value) {
  return value;
}
function _M0MP319moonbit_2dcommunity7rabbita2js5Value10cast__fromGRP319moonbit_2dcommunity7rabbita3dom4NodeE(value) {
  return value;
}
function _M0MP319moonbit_2dcommunity7rabbita2js8Optional13is__undefinedGsE(self) {
  return _M0MP319moonbit_2dcommunity7rabbita2js5Value13is__undefined(self);
}
function _M0MP319moonbit_2dcommunity7rabbita2js8Optional6unwrapGsE(self) {
  if (_M0MP319moonbit_2dcommunity7rabbita2js8Optional13is__undefinedGsE(self)) {
    _M0FPC15abort5abortGuE("Cannot unwrap an undefined value");
  }
  return self;
}
function _M0MP319moonbit_2dcommunity7rabbita2js8Nullable8is__nullGRP319moonbit_2dcommunity7rabbita3dom7ElementE(self) {
  return _M0MP319moonbit_2dcommunity7rabbita2js5Value8is__null(self);
}
function _M0MP319moonbit_2dcommunity7rabbita2js8Nullable6unwrapGRP319moonbit_2dcommunity7rabbita3dom7ElementE(self) {
  if (_M0MP319moonbit_2dcommunity7rabbita2js8Nullable8is__nullGRP319moonbit_2dcommunity7rabbita3dom7ElementE(self)) {
    _M0FPC15abort5abortGuE("Cannot unwrap a null value");
  }
  return self;
}
function _M0MP319moonbit_2dcommunity7rabbita2js8Nullable10to__optionGRP319moonbit_2dcommunity7rabbita3dom10MouseEventE(self) {
  return !_M0MP319moonbit_2dcommunity7rabbita2js5Value8is__null(self) ? new _M0DTPC16option6OptionGRP319moonbit_2dcommunity7rabbita3dom10MouseEventE4Some(_M0MP319moonbit_2dcommunity7rabbita2js8Nullable6unwrapGRP319moonbit_2dcommunity7rabbita3dom7ElementE(self)) : _M0DTPC16option6OptionGRP319moonbit_2dcommunity7rabbita3dom10MouseEventE4None__;
}
function _M0MP319moonbit_2dcommunity7rabbita2js8Nullable4nullGRP319moonbit_2dcommunity7rabbita3dom4NodeE() {
  return _M0MP319moonbit_2dcommunity7rabbita2js5Value4null();
}
function _M0MP319moonbit_2dcommunity7rabbita2js8Nullable12from__optionGsE(value) {
  return _M0MPC16option6Option16unwrap__or__elseGRP319moonbit_2dcommunity7rabbita2js5ValueE(_M0MPC16option6Option3mapGsRP319moonbit_2dcommunity7rabbita2js5ValueE(value, _M0MP319moonbit_2dcommunity7rabbita2js5Value10cast__fromGsE), _M0MP319moonbit_2dcommunity7rabbita2js5Value4null);
}
function _M0MP319moonbit_2dcommunity7rabbita2js8Nullable12from__optionGRP319moonbit_2dcommunity7rabbita3dom4NodeE(value) {
  return _M0MPC16option6Option16unwrap__or__elseGRP319moonbit_2dcommunity7rabbita2js5ValueE(_M0MPC16option6Option3mapGRP319moonbit_2dcommunity7rabbita3dom4NodeRP319moonbit_2dcommunity7rabbita2js5ValueE(value, _M0MP319moonbit_2dcommunity7rabbita2js5Value10cast__fromGRP319moonbit_2dcommunity7rabbita3dom4NodeE), _M0MP319moonbit_2dcommunity7rabbita2js5Value4null);
}
function _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom12IsSVGElement10get__styleGRP319moonbit_2dcommunity7rabbita3dom10SVGElementE(s) {
  return _M0FP319moonbit_2dcommunity7rabbita3dom10get__style(s);
}
function _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode16set__node__valueGRP319moonbit_2dcommunity7rabbita3dom7ElementE(s, v) {
  _M0FP319moonbit_2dcommunity7rabbita3dom21ffi__set__node__value(s, v);
}
function _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode8as__nodeGRP319moonbit_2dcommunity7rabbita3dom7ElementE(s) {
  return s;
}
function _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode8as__nodeGRP319moonbit_2dcommunity7rabbita3dom7CommentE(s) {
  return s;
}
function _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode8as__nodeGRP319moonbit_2dcommunity7rabbita3dom16DocumentFragmentE(s) {
  return s;
}
function _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode8as__nodeGRP319moonbit_2dcommunity7rabbita3dom4NodeE(s) {
  return s;
}
function _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode18get__next__siblingGRP319moonbit_2dcommunity7rabbita3dom4NodeE(s) {
  return _M0FP319moonbit_2dcommunity7rabbita3dom18ffi__next__sibling(s);
}
function _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode22get__previous__siblingGRP319moonbit_2dcommunity7rabbita3dom4NodeE(s) {
  return _M0FP319moonbit_2dcommunity7rabbita3dom22ffi__previous__sibling(s);
}
function _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode17get__parent__nodeGRP319moonbit_2dcommunity7rabbita3dom4NodeE(s) {
  return _M0FP319moonbit_2dcommunity7rabbita3dom17ffi__parent__node(s);
}
function _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode17get__parent__nodeGRP319moonbit_2dcommunity7rabbita3dom7CommentE(s) {
  return _M0FP319moonbit_2dcommunity7rabbita3dom17ffi__parent__node(s);
}
function _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode13append__childGRP319moonbit_2dcommunity7rabbita3dom16DocumentFragmentE(s, child) {
  _M0FP319moonbit_2dcommunity7rabbita3dom18ffi__append__child(s, child);
}
function _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode13remove__childGRP319moonbit_2dcommunity7rabbita3dom4NodeE(s, child) {
  _M0FP319moonbit_2dcommunity7rabbita3dom18ffi__remove__child(s, child);
}
function _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode14insert__beforeGRP319moonbit_2dcommunity7rabbita3dom4NodeE(s, value, before) {
  _M0FP319moonbit_2dcommunity7rabbita3dom14insert__before(s, value, before);
}
function _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode14insert__beforeGRP319moonbit_2dcommunity7rabbita3dom16DocumentFragmentE(s, value, before) {
  _M0FP319moonbit_2dcommunity7rabbita3dom14insert__before(s, value, before);
}
function _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode14is__same__nodeGRP319moonbit_2dcommunity7rabbita3dom4NodeE(s, other) {
  return _M0FP319moonbit_2dcommunity7rabbita3dom19ffi__is__same__node(s, other);
}
function _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom12IsMouseEvent14get__ctrl__keyGRP319moonbit_2dcommunity7rabbita3dom10MouseEventE(s) {
  return _M0FP319moonbit_2dcommunity7rabbita3dom28ffi__mouse__event__ctrl__key(s);
}
function _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom12IsMouseEvent14get__meta__keyGRP319moonbit_2dcommunity7rabbita3dom10MouseEventE(s) {
  return _M0FP319moonbit_2dcommunity7rabbita3dom28ffi__mouse__event__meta__key(s);
}
function _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom13IsHtmlElement17as__html__elementGRP319moonbit_2dcommunity7rabbita3dom11HTMLElementE(s) {
  return s;
}
function _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom13IsHtmlElement10get__styleGRP319moonbit_2dcommunity7rabbita3dom11HTMLElementE(s) {
  return _M0FP319moonbit_2dcommunity7rabbita3dom30ffi__html__element__get__style(_M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom13IsHtmlElement17as__html__elementGRP319moonbit_2dcommunity7rabbita3dom11HTMLElementE(s));
}
function _M0FP319moonbit_2dcommunity7rabbita3dom27default__exception__handlerGRP319moonbit_2dcommunity7rabbita3dom12DOMExceptionRP319moonbit_2dcommunity7rabbita3dom7ElementE(exception) {
  _M0FP319moonbit_2dcommunity7rabbita3dom12console__log(exception);
  return $panic();
}
function _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom13IsEventTarget20add__event__listenerGRP319moonbit_2dcommunity7rabbita3dom7ElementE(s, type_, callback) {
  _M0FP319moonbit_2dcommunity7rabbita3dom25ffi__add__event__listener(s, type_, callback);
}
function _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom13IsEventTarget11to__elementGRP319moonbit_2dcommunity7rabbita3dom11EventTargetE(s) {
  const _lhs = _M0FP319moonbit_2dcommunity7rabbita3dom16ffi__to__element(s);
  return _M0MP319moonbit_2dcommunity7rabbita2js8Nullable10to__optionGRP319moonbit_2dcommunity7rabbita3dom10MouseEventE(_lhs);
}
function _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom13IsEventTarget17to__html__elementGRP319moonbit_2dcommunity7rabbita3dom7ElementE(s) {
  const _lhs = _M0FP319moonbit_2dcommunity7rabbita3dom22ffi__to__html__element(s);
  return _M0MP319moonbit_2dcommunity7rabbita2js8Nullable10to__optionGRP319moonbit_2dcommunity7rabbita3dom10MouseEventE(_lhs);
}
function _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom13IsEventTarget16to__svg__elementGRP319moonbit_2dcommunity7rabbita3dom7ElementE(s) {
  const _lhs = _M0FP319moonbit_2dcommunity7rabbita3dom21ffi__to__svg__element(s);
  return _M0MP319moonbit_2dcommunity7rabbita2js8Nullable10to__optionGRP319moonbit_2dcommunity7rabbita3dom10MouseEventE(_lhs);
}
function _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom7IsEvent6targetGRP319moonbit_2dcommunity7rabbita3dom7UIEventE(s) {
  return _M0FP319moonbit_2dcommunity7rabbita3dom18ffi__event__target(s);
}
function _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom7IsEvent15current__targetGRP319moonbit_2dcommunity7rabbita3dom5EventE(s) {
  return _M0FP319moonbit_2dcommunity7rabbita3dom27ffi__event__current__target(s);
}
function _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom7IsEvent16prevent__defaultGRP319moonbit_2dcommunity7rabbita3dom5EventE(s) {
  _M0FP319moonbit_2dcommunity7rabbita3dom28ffi__event__prevent__default(_M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom7IsEvent9as__eventGRP319moonbit_2dcommunity7rabbita3dom5EventE(s));
}
function _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom7IsEvent9as__eventGRP319moonbit_2dcommunity7rabbita3dom5EventE(s) {
  return s;
}
function _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom7IsEvent13to__ui__eventGRP319moonbit_2dcommunity7rabbita3dom5EventE(s) {
  const _lhs = _M0FP319moonbit_2dcommunity7rabbita3dom18ffi__to__ui__event(s);
  return _M0MP319moonbit_2dcommunity7rabbita2js8Nullable10to__optionGRP319moonbit_2dcommunity7rabbita3dom10MouseEventE(_lhs);
}
function _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom7IsEvent16to__mouse__eventGRP319moonbit_2dcommunity7rabbita3dom5EventE(s) {
  const _lhs = _M0FP319moonbit_2dcommunity7rabbita3dom21ffi__to__mouse__event(s);
  return _M0MP319moonbit_2dcommunity7rabbita2js8Nullable10to__optionGRP319moonbit_2dcommunity7rabbita3dom10MouseEventE(_lhs);
}
function _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom7IsEvent19to__keyboard__eventGRP319moonbit_2dcommunity7rabbita3dom5EventE(s) {
  const _lhs = _M0FP319moonbit_2dcommunity7rabbita3dom24ffi__to__keyboard__event(s);
  return _M0MP319moonbit_2dcommunity7rabbita2js8Nullable10to__optionGRP319moonbit_2dcommunity7rabbita3dom10MouseEventE(_lhs);
}
function _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom9IsElement14set__attributeGRP319moonbit_2dcommunity7rabbita3dom7ElementE(s, attr, value) {
  _M0FP319moonbit_2dcommunity7rabbita3dom28ffi__element__set__attribute(s, attr, value);
}
function _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom9IsElement17remove__attributeGRP319moonbit_2dcommunity7rabbita3dom7ElementE(s, attr) {
  _M0FP319moonbit_2dcommunity7rabbita3dom31ffi__element__remove__attribute(s, attr);
}
function _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom9IsElement13set__propertyGRP319moonbit_2dcommunity7rabbita3dom7ElementE(s, prop, value) {
  _M0FP319moonbit_2dcommunity7rabbita3dom27ffi__element__set__property(s, prop, value);
}
function _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom9IsElement13get__propertyGRP319moonbit_2dcommunity7rabbita3dom7ElementE(s, prop) {
  return _M0FP319moonbit_2dcommunity7rabbita3dom27ffi__element__get__property(s, prop);
}
function _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom9IsElement16remove__propertyGRP319moonbit_2dcommunity7rabbita3dom7ElementE(s, prop) {
  _M0FP319moonbit_2dcommunity7rabbita3dom30ffi__element__remove__property(s, prop);
}
function _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom9IsElement16set__inner__htmlGRP319moonbit_2dcommunity7rabbita3dom7ElementE(s, html) {
  _M0FP319moonbit_2dcommunity7rabbita3dom30ffi__element__set__inner__html(s, html);
}
function _M0MP319moonbit_2dcommunity7rabbita3dom8Document19create__element__ns(self, namespace_uri, qualified_name, on_namespace_error$46$opt, on_invalid_character_error$46$opt) {
  let on_namespace_error;
  if (on_namespace_error$46$opt === undefined) {
    on_namespace_error = _M0FP319moonbit_2dcommunity7rabbita3dom27default__exception__handlerGRP319moonbit_2dcommunity7rabbita3dom12DOMExceptionRP319moonbit_2dcommunity7rabbita3dom7ElementE;
  } else {
    const _Some = on_namespace_error$46$opt;
    on_namespace_error = _Some;
  }
  let on_invalid_character_error;
  if (on_invalid_character_error$46$opt === undefined) {
    on_invalid_character_error = _M0FP319moonbit_2dcommunity7rabbita3dom27default__exception__handlerGRP319moonbit_2dcommunity7rabbita3dom12DOMExceptionRP319moonbit_2dcommunity7rabbita3dom7ElementE;
  } else {
    const _Some = on_invalid_character_error$46$opt;
    on_invalid_character_error = _Some;
  }
  return _M0MP319moonbit_2dcommunity7rabbita3dom8Document27create__element__ns_2einner(self, namespace_uri, qualified_name, on_namespace_error, on_invalid_character_error);
}
function _M0IP319moonbit_2dcommunity7rabbita3url8ProtocolPB2Eq5equal(_x_111, _x_112) {
  switch (_x_111.$tag) {
    case 0: {
      if (_x_112.$tag === 0) {
        return true;
      } else {
        return false;
      }
    }
    case 1: {
      if (_x_112.$tag === 1) {
        return true;
      } else {
        return false;
      }
    }
    default: {
      const _Other = _x_111;
      const _$42$x0_113 = _Other._0;
      if (_x_112.$tag === 2) {
        const _Other$2 = _x_112;
        const _$42$y0_114 = _Other$2._0;
        return _$42$x0_113 === _$42$y0_114;
      } else {
        return false;
      }
    }
  }
}
function _M0FP319moonbit_2dcommunity7rabbita3url5parse(url) {
  let _bind;
  let x;
  let remain;
  _L: {
    _L$2: {
      const _bind$2 = _M0MPB4Iter9to__arrayGRPC16string10StringViewE(_M0MPC16string6String5split(url, new _M0TPC16string10StringView(_M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS311, 0, _M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS311.length)));
      if (_bind$2.length === 2) {
        const _x = _bind$2[0];
        if (_M0MPC16string6String24char__length__eq_2einner(_x.str, 4, _x.start, _x.end)) {
          const _x$2 = _M0MPC16string6String16unsafe__char__at(_x.str, _M0MPC16string6String29offset__of__nth__char_2einner(_x.str, 0, _x.start, _x.end));
          if (_x$2 === 104) {
            const _x$3 = _M0MPC16string6String16unsafe__char__at(_x.str, _M0MPC16string6String29offset__of__nth__char_2einner(_x.str, 1, _x.start, _x.end));
            if (_x$3 === 116) {
              const _x$4 = _M0MPC16string6String16unsafe__char__at(_x.str, _M0MPC16string6String29offset__of__nth__char_2einner(_x.str, 2, _x.start, _x.end));
              if (_x$4 === 116) {
                const _x$5 = _M0MPC16string6String16unsafe__char__at(_x.str, _M0MPC16string6String29offset__of__nth__char_2einner(_x.str, 3, _x.start, _x.end));
                if (_x$5 === 112) {
                  const _remain = _bind$2[1];
                  _bind = { _0: _M0DTP319moonbit_2dcommunity7rabbita3url8Protocol4Http__, _1: _remain };
                } else {
                  const _remain = _bind$2[1];
                  x = _x;
                  remain = _remain;
                  break _L$2;
                }
              } else {
                const _remain = _bind$2[1];
                x = _x;
                remain = _remain;
                break _L$2;
              }
            } else {
              const _remain = _bind$2[1];
              x = _x;
              remain = _remain;
              break _L$2;
            }
          } else {
            const _remain = _bind$2[1];
            x = _x;
            remain = _remain;
            break _L$2;
          }
        } else {
          if (_M0MPC16string6String24char__length__eq_2einner(_x.str, 5, _x.start, _x.end)) {
            const _x$2 = _M0MPC16string6String16unsafe__char__at(_x.str, _M0MPC16string6String29offset__of__nth__char_2einner(_x.str, 0, _x.start, _x.end));
            if (_x$2 === 104) {
              const _x$3 = _M0MPC16string6String16unsafe__char__at(_x.str, _M0MPC16string6String29offset__of__nth__char_2einner(_x.str, 1, _x.start, _x.end));
              if (_x$3 === 116) {
                const _x$4 = _M0MPC16string6String16unsafe__char__at(_x.str, _M0MPC16string6String29offset__of__nth__char_2einner(_x.str, 2, _x.start, _x.end));
                if (_x$4 === 116) {
                  const _x$5 = _M0MPC16string6String16unsafe__char__at(_x.str, _M0MPC16string6String29offset__of__nth__char_2einner(_x.str, 3, _x.start, _x.end));
                  if (_x$5 === 112) {
                    const _x$6 = _M0MPC16string6String16unsafe__char__at(_x.str, _M0MPC16string6String29offset__of__nth__char_2einner(_x.str, 4, _x.start, _x.end));
                    if (_x$6 === 115) {
                      const _remain = _bind$2[1];
                      _bind = { _0: _M0DTP319moonbit_2dcommunity7rabbita3url8Protocol5Https__, _1: _remain };
                    } else {
                      const _remain = _bind$2[1];
                      x = _x;
                      remain = _remain;
                      break _L$2;
                    }
                  } else {
                    const _remain = _bind$2[1];
                    x = _x;
                    remain = _remain;
                    break _L$2;
                  }
                } else {
                  const _remain = _bind$2[1];
                  x = _x;
                  remain = _remain;
                  break _L$2;
                }
              } else {
                const _remain = _bind$2[1];
                x = _x;
                remain = _remain;
                break _L$2;
              }
            } else {
              const _remain = _bind$2[1];
              x = _x;
              remain = _remain;
              break _L$2;
            }
          } else {
            const _remain = _bind$2[1];
            x = _x;
            remain = _remain;
            break _L$2;
          }
        }
      } else {
        if (_bind$2.length === 1) {
          const _remain = _bind$2[0];
          _bind = { _0: _M0FP319moonbit_2dcommunity7rabbita3url5parseN6constrS346, _1: _remain };
        } else {
          const _bind$3 = _M0FPB4failGURP319moonbit_2dcommunity7rabbita3url8ProtocolRPC16string10StringViewEE(new _M0TPC16string10StringView(_M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS310, 0, _M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS310.length), "url/url.mbt:66:10-66:34@moonbit-community/rabbita");
          if (_bind$3.$tag === 1) {
            const _ok = _bind$3;
            _bind = _ok._0;
          } else {
            return _bind$3;
          }
        }
      }
      break _L;
    }
    _bind = { _0: new _M0DTP319moonbit_2dcommunity7rabbita3url8Protocol5Other(_M0MPC16string10StringView9to__owned(x)), _1: remain };
  }
  const _protocol = _bind._0;
  const _remain = _bind._1;
  const _bind$2 = _M0MPB4Iter9to__arrayGRPC16string10StringViewE(_M0MPC16string10StringView5split(_remain, new _M0TPC16string10StringView(_M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS297, 0, _M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS297.length)));
  let _bind$3;
  if (_bind$2.length === 2) {
    const _mid = _bind$2[0];
    const _remain$2 = _bind$2[1];
    _bind$3 = { _0: _mid, _1: _remain$2 };
  } else {
    if (_bind$2.length === 1) {
      const _mid = _bind$2[0];
      _bind$3 = { _0: _mid, _1: new _M0TPC16string10StringView(_M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS295, 0, _M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS295.length) };
    } else {
      const _bind$4 = _M0FPB4failGURP319moonbit_2dcommunity7rabbita3url8ProtocolRPC16string10StringViewEE(new _M0TPC16string10StringView(_M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS296, 0, _M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS296.length), "url/url.mbt:71:10-71:30@moonbit-community/rabbita");
      if (_bind$4.$tag === 1) {
        const _ok = _bind$4;
        _bind$3 = _ok._0;
      } else {
        return _bind$4;
      }
    }
  }
  const _mid = _bind$3._0;
  const _query_and_fragment = _bind$3._1;
  const _bind$4 = _M0MPB4Iter9to__arrayGRPC16string10StringViewE(_M0MPC16string10StringView5split(_mid, new _M0TPC16string10StringView(_M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS282, 0, _M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS282.length)));
  let _bind$5;
  if (_bind$4.length === 2) {
    const _mid$2 = _bind$4[0];
    const _fragment = _bind$4[1];
    _bind$5 = { _0: _mid$2, _1: _fragment };
  } else {
    if (_bind$4.length === 1) {
      const _mid$2 = _bind$4[0];
      _bind$5 = { _0: _mid$2, _1: undefined };
    } else {
      const _bind$6 = _M0FPB4failGURP319moonbit_2dcommunity7rabbita3url8ProtocolRPC16string10StringViewEE(new _M0TPC16string10StringView(_M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS281, 0, _M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS281.length), "url/url.mbt:76:10-76:34@moonbit-community/rabbita");
      if (_bind$6.$tag === 1) {
        const _ok = _bind$6;
        _bind$5 = _ok._0;
      } else {
        return _bind$6;
      }
    }
  }
  const _mid_part = _bind$5._0;
  const _fragment1 = _bind$5._1;
  const _bind$6 = _M0MPB4Iter9to__arrayGRPC16string10StringViewE(_M0MPC16string10StringView5split(_mid_part, new _M0TPC16string10StringView(_M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS268, 0, _M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS268.length)));
  let _bind$7;
  if (_bind$6.length === 1) {
    const _mid$2 = _bind$6[0];
    _bind$7 = { _0: _mid$2, _1: "" };
  } else {
    if (_bind$6.length >= 1) {
      const _mid$2 = _bind$6[0];
      const _x = _M0MPC15array5Array12view_2einnerGRPC16string10StringViewE(_bind$6, 1, _bind$6.length);
      _bind$7 = { _0: _mid$2, _1: _M0MPB4Iter4join(_M0MPB4Iter3mapGRPC16string10StringViewsE(_M0MPC15array9ArrayView4iterGRPC16string10StringViewE(_x), _M0MPC16string10StringView9to__owned), new _M0TPC16string10StringView(_M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS266, 0, _M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS266.length)) };
    } else {
      const _bind$8 = _M0FPB4failGURP319moonbit_2dcommunity7rabbita3url8ProtocolRPC16string10StringViewEE(new _M0TPC16string10StringView(_M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS267, 0, _M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS267.length), "url/url.mbt:81:10-81:30@moonbit-community/rabbita");
      if (_bind$8.$tag === 1) {
        const _ok = _bind$8;
        _bind$7 = _ok._0;
      } else {
        return _bind$8;
      }
    }
  }
  const _mid$2 = _bind$7._0;
  const _path = _bind$7._1;
  const _bind$8 = _M0MPB4Iter9to__arrayGRPC16string10StringViewE(_M0MPC16string10StringView5split(_mid$2, new _M0TPC16string10StringView(_M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS253, 0, _M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS253.length)));
  let _bind$9;
  if (_bind$8.length === 2) {
    const _host = _bind$8[0];
    const _port = _bind$8[1];
    let port;
    let _try_err;
    _L$2: {
      _L$3: {
        const _bind$10 = _M0MPC16string10StringView9to__owned(_port);
        const _bind$11 = _M0FPC17strconv18parse__int_2einner(new _M0TPC16string10StringView(_bind$10, 0, _bind$10.length), 0);
        let _bind$12;
        if (_bind$11.$tag === 1) {
          const _ok = _bind$11;
          _bind$12 = _ok._0;
        } else {
          const _err = _bind$11;
          _try_err = _err._0;
          break _L$3;
        }
        port = _bind$12;
        break _L$2;
      }
      port = undefined;
    }
    _bind$9 = { _0: _M0MPC16string10StringView9to__owned(_host), _1: port };
  } else {
    if (_bind$8.length === 1) {
      const _host = _bind$8[0];
      _bind$9 = { _0: _M0MPC16string10StringView9to__owned(_host), _1: undefined };
    } else {
      const _bind$10 = _M0FPB4failGURP319moonbit_2dcommunity7rabbita3url8ProtocolRPC16string10StringViewEE(new _M0TPC16string10StringView(_M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS252, 0, _M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS252.length), "url/url.mbt:93:10-93:30@moonbit-community/rabbita");
      if (_bind$10.$tag === 1) {
        const _ok = _bind$10;
        _bind$9 = _ok._0;
      } else {
        return _bind$10;
      }
    }
  }
  const _host = _bind$9._0;
  const _port = _bind$9._1;
  const _bind$10 = _M0MPB4Iter9to__arrayGRPC16string10StringViewE(_M0MPC16string10StringView5split(_query_and_fragment, new _M0TPC16string10StringView(_M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS232, 0, _M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS232.length)));
  let _bind$11;
  if (_bind$10.length === 2) {
    const _query = _bind$10[0];
    const _fragment = _bind$10[1];
    _bind$11 = { _0: _M0MPC16string10StringView9to__owned(_query), _1: _fragment };
  } else {
    if (_bind$10.length === 1) {
      const _query = _bind$10[0];
      _bind$11 = _M0MPC16string10StringView9is__empty(_query) ? { _0: undefined, _1: undefined } : { _0: _M0MPC16string10StringView9to__owned(_query), _1: undefined };
    } else {
      if (_bind$10.length === 0) {
        _bind$11 = { _0: undefined, _1: undefined };
      } else {
        const _bind$12 = _M0FPB4failGURP319moonbit_2dcommunity7rabbita3url8ProtocolRPC16string10StringViewEE(new _M0TPC16string10StringView(_M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS231, 0, _M0FP319moonbit_2dcommunity7rabbita3url5parseN7_2abindS231.length), "url/url.mbt:104:10-104:31@moonbit-community/rabbita");
        if (_bind$12.$tag === 1) {
          const _ok = _bind$12;
          _bind$11 = _ok._0;
        } else {
          return _bind$12;
        }
      }
    }
  }
  const _query = _bind$11._0;
  const _fragment2 = _bind$11._1;
  let fragment;
  if (_fragment1 === undefined) {
    if (_fragment2 === undefined) {
      fragment = undefined;
    } else {
      const _Some = _fragment2;
      const _f = _Some;
      fragment = _M0MPC16string10StringView9to__owned(_f);
    }
  } else {
    const _Some = _fragment1;
    const _f1 = _Some;
    if (_fragment2 === undefined) {
      fragment = _M0MPC16string10StringView9to__owned(_f1);
    } else {
      const _Some$2 = _fragment2;
      const _f2 = _Some$2;
      fragment = `${_M0IPC16string10StringViewPB4Show10to__string(_f1)}#${_M0IPC16string10StringViewPB4Show10to__string(_f2)}`;
    }
  }
  return new _M0DTPC16result6ResultGRP319moonbit_2dcommunity7rabbita3url3UrlRPC15error5ErrorE2Ok(new _M0TP319moonbit_2dcommunity7rabbita3url3Url(_protocol, _host, _port, _path, _query, fragment));
}
function _M0IP319moonbit_2dcommunity7rabbita7variant7VariantPB2Eq5equal(_x_33, _x_34) {
  switch (_x_33.$tag) {
    case 0: {
      const _Boolean = _x_33;
      const _$42$x0_35 = _Boolean._0;
      if (_x_34.$tag === 0) {
        const _Boolean$2 = _x_34;
        const _$42$y0_36 = _Boolean$2._0;
        return _$42$x0_35 === _$42$y0_36;
      } else {
        return false;
      }
    }
    case 1: {
      const _Integer = _x_33;
      const _$42$x0_37 = _Integer._0;
      if (_x_34.$tag === 1) {
        const _Integer$2 = _x_34;
        const _$42$y0_38 = _Integer$2._0;
        return _$42$x0_37 === _$42$y0_38;
      } else {
        return false;
      }
    }
    case 2: {
      const _Floating = _x_33;
      const _$42$x0_39 = _Floating._0;
      if (_x_34.$tag === 2) {
        const _Floating$2 = _x_34;
        const _$42$y0_40 = _Floating$2._0;
        return _$42$x0_39 === _$42$y0_40;
      } else {
        return false;
      }
    }
    default: {
      const _String = _x_33;
      const _$42$x0_41 = _String._0;
      if (_x_34.$tag === 3) {
        const _String$2 = _x_34;
        const _$42$y0_42 = _String$2._0;
        return _$42$x0_41 === _$42$y0_42;
      } else {
        return false;
      }
    }
  }
}
function _M0IP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdPB4Hash13hash__combine(_x_384, _x_385) {
  _M0IPC13int3IntPB4Hash13hash__combine(_x_384, _x_385);
}
function _M0IP419moonbit_2dcommunity7rabbita8internal7runtime2IdPB4Hash13hash__combine(_x_366, _x_367) {
  _M0IPC13int3IntPB4Hash13hash__combine(_x_366, _x_367);
}
function _M0FP419moonbit_2dcommunity7rabbita8internal7runtime8next__id() {
  const id = _M0FP419moonbit_2dcommunity7rabbita8internal7runtime17global__id__count.val;
  _M0FP419moonbit_2dcommunity7rabbita8internal7runtime17global__id__count.val = _M0FP419moonbit_2dcommunity7rabbita8internal7runtime17global__id__count.val + 1 | 0;
  return id;
}
function _M0MP419moonbit_2dcommunity7rabbita8internal7runtime6InstId3new() {
  return _M0FP419moonbit_2dcommunity7rabbita8internal7runtime8next__id();
}
function _M0MP419moonbit_2dcommunity7rabbita8internal7runtime8Instance3new(cell) {
  const _tmp = new _M0TP419moonbit_2dcommunity7rabbita8internal7runtime4Link(undefined);
  const _bind = [];
  const _tmp$2 = _M0MPB3Map3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(new _M0TPB9ArrayViewGURP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkEE(_bind, 0, 0), undefined);
  const _bind$2 = [];
  return new _M0TP419moonbit_2dcommunity7rabbita8internal7runtime8Instance(cell, undefined, _tmp, _tmp$2, _M0MPB3Map3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(new _M0TPB9ArrayViewGURP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkEE(_bind$2, 0, 0), undefined), _M0MP419moonbit_2dcommunity7rabbita8internal7runtime6InstId3new());
}
function _M0MP419moonbit_2dcommunity7rabbita8internal7runtime5INode20scan__direct__childs(s) {
  const tmp = [s];
  const result = [];
  while (true) {
    const _bind = _M0MPC15array5Array3popGRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(tmp);
    if (_bind === undefined) {
      break;
    } else {
      const _Some = _bind;
      const _inode = _Some;
      switch (_inode.$tag) {
        case 1: {
          break;
        }
        case 0: {
          const _Elem = _inode;
          const _cs = _Elem._2;
          if (_cs.$tag === 1) {
            const _Map = _cs;
            const _mp = _Map._0;
            _M0MPC15array5Array10push__iterGRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(tmp, _M0MPB3Map6valuesGsRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(_mp));
          } else {
            const _Array = _cs;
            const _arr = _Array._0;
            _M0MPC15array5Array10push__iterGRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(tmp, _M0MPC15array5Array4iterGRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(_arr));
          }
          break;
        }
        case 2: {
          const _Frag = _inode;
          const _xs = _Frag._0;
          _M0MPC15array5Array10push__iterGRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(tmp, _M0MPC15array5Array4iterGRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(_xs));
          break;
        }
        default: {
          const _Slot = _inode;
          const _inst = _Slot._0;
          _M0MPC15array5Array4pushGRPC16string10StringViewE(result, _inst.link);
        }
      }
      continue;
    }
  }
  return result;
}
function _M0MP419moonbit_2dcommunity7rabbita8internal7runtime5INode5start(s) {
  let s$2;
  _L: {
    let e;
    _L$2: {
      switch (s.$tag) {
        case 0: {
          const _Elem = s;
          const _e = _Elem._4;
          e = _e;
          break _L$2;
        }
        case 1: {
          const _Text = s;
          const _e$2 = _Text._1;
          e = _e$2;
          break _L$2;
        }
        case 2: {
          const _Frag = s;
          const _s = _Frag._1;
          s$2 = _s;
          break _L;
        }
        default: {
          const _Slot = s;
          const _s$2 = _Slot._1;
          s$2 = _s$2;
          break _L;
        }
      }
    }
    return _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode8as__nodeGRP319moonbit_2dcommunity7rabbita3dom7ElementE(e);
  }
  return _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode8as__nodeGRP319moonbit_2dcommunity7rabbita3dom7CommentE(s$2);
}
function _M0MP419moonbit_2dcommunity7rabbita8internal7runtime5INode3end(s) {
  let e;
  _L: {
    let e$2;
    _L$2: {
      switch (s.$tag) {
        case 0: {
          const _Elem = s;
          const _e = _Elem._4;
          e$2 = _e;
          break _L$2;
        }
        case 1: {
          const _Text = s;
          const _e$2 = _Text._1;
          e$2 = _e$2;
          break _L$2;
        }
        case 2: {
          const _Frag = s;
          const _e$3 = _Frag._2;
          e = _e$3;
          break _L;
        }
        default: {
          const _Slot = s;
          const _e$4 = _Slot._2;
          e = _e$4;
          break _L;
        }
      }
    }
    return _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode8as__nodeGRP319moonbit_2dcommunity7rabbita3dom7ElementE(e$2);
  }
  return _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode8as__nodeGRP319moonbit_2dcommunity7rabbita3dom7CommentE(e);
}
function _M0MP419moonbit_2dcommunity7rabbita8internal7runtime4Link6detach(s) {
  s.val = undefined;
}
function _M0MP419moonbit_2dcommunity7rabbita8internal7runtime7Sandbox19drop__live__subtree(self, root) {
  const stack = [root];
  while (true) {
    const _bind = _M0MPC15array5Array3popGRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(stack);
    if (_bind === undefined) {
      return;
    } else {
      const _Some = _bind;
      const _inst = _Some;
      const _tmp = _inst.cell;
      const flags = _tmp.method_table.method_2(_tmp.self);
      flags.attach_count = flags.attach_count - 1 | 0;
      const _bind$2 = _M0MPB3Map3getGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(self.live_map, flags.id);
      if (_bind$2 === undefined) {
      } else {
        const _Some$2 = _bind$2;
        const _x = _Some$2;
        const _insts = _x._1;
        _M0MPB3Map6removeGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(_insts, _inst.id);
        if (_insts.size === 0) {
          _M0MPB3Map6removeGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(self.live_map, flags.id);
          _M0MPC13set3Set6removeGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(self.dirty_set, flags.id);
        }
      }
      const _it = _M0MPB3Map5iter2GRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(_inst.old_childs);
      while (true) {
        const _bind$3 = _M0MPB5Iter24nextGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(_it);
        if (_bind$3 === undefined) {
          break;
        } else {
          const _Some$2 = _bind$3;
          const _x = _Some$2;
          const _link = _x._1;
          const _bind$4 = _link.val;
          if (_bind$4 === undefined) {
          } else {
            const _Some$3 = _bind$4;
            const _c = _Some$3;
            _M0MPC15array5Array4pushGRPC16string10StringViewE(stack, _c);
          }
          continue;
        }
      }
      const _it$2 = _M0MPB3Map5iter2GRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(_inst.new_childs);
      while (true) {
        const _bind$3 = _M0MPB5Iter24nextGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(_it$2);
        if (_bind$3 === undefined) {
          break;
        } else {
          const _Some$2 = _bind$3;
          const _x = _Some$2;
          const _link = _x._1;
          const _bind$4 = _link.val;
          if (_bind$4 === undefined) {
          } else {
            const _Some$3 = _bind$4;
            const _c = _Some$3;
            _M0MPC15array5Array4pushGRPC16string10StringViewE(stack, _c);
          }
          continue;
        }
      }
      continue;
    }
  }
}
function _M0MP419moonbit_2dcommunity7rabbita8internal7runtime5INode6remove(self, sandbox, parent) {
  const _bind = _M0MP419moonbit_2dcommunity7rabbita8internal7runtime5INode20scan__direct__childs(self);
  const _bind$2 = _bind.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const link = _bind[_];
      const _bind$3 = link.val;
      if (_bind$3 === undefined) {
      } else {
        const _Some = _bind$3;
        const _inst = _Some;
        _M0MP419moonbit_2dcommunity7rabbita8internal7runtime7Sandbox19drop__live__subtree(sandbox, _inst);
      }
      _M0MP419moonbit_2dcommunity7rabbita8internal7runtime4Link6detach(link);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  let e;
  let s;
  _L: {
    let e$2;
    _L$2: {
      switch (self.$tag) {
        case 0: {
          const _Elem = self;
          const _e = _Elem._4;
          e$2 = _e;
          break _L$2;
        }
        case 1: {
          const _Text = self;
          const _e$2 = _Text._1;
          e$2 = _e$2;
          break _L$2;
        }
        case 2: {
          const _Frag = self;
          const _s = _Frag._1;
          const _e$3 = _Frag._2;
          e = _e$3;
          s = _s;
          break _L;
        }
        default: {
          const _Slot = self;
          const _s$2 = _Slot._1;
          const _e$4 = _Slot._2;
          e = _e$4;
          s = _s$2;
          break _L;
        }
      }
    }
    _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode13remove__childGRP319moonbit_2dcommunity7rabbita3dom4NodeE(parent, _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode8as__nodeGRP319moonbit_2dcommunity7rabbita3dom7ElementE(e$2));
    return;
  }
  const s$2 = _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode8as__nodeGRP319moonbit_2dcommunity7rabbita3dom7CommentE(s);
  const e$2 = _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode8as__nodeGRP319moonbit_2dcommunity7rabbita3dom7CommentE(e);
  while (true) {
    const _bind$3 = _M0MP319moonbit_2dcommunity7rabbita2js8Nullable10to__optionGRP319moonbit_2dcommunity7rabbita3dom10MouseEventE(_M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode18get__next__siblingGRP319moonbit_2dcommunity7rabbita3dom4NodeE(s$2));
    if (_bind$3.$tag === 1) {
      const _Some = _bind$3;
      const _n = _Some._0;
      if (!_M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode14is__same__nodeGRP319moonbit_2dcommunity7rabbita3dom4NodeE(_n, e$2)) {
        _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode13remove__childGRP319moonbit_2dcommunity7rabbita3dom4NodeE(parent, _n);
        continue;
      } else {
        break;
      }
    } else {
      break;
    }
  }
  _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode13remove__childGRP319moonbit_2dcommunity7rabbita3dom4NodeE(parent, s$2);
  _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode13remove__childGRP319moonbit_2dcommunity7rabbita3dom4NodeE(parent, e$2);
}
function _M0FP419moonbit_2dcommunity7rabbita8internal7runtime8nullableGRP319moonbit_2dcommunity7rabbita3dom4NodeE(x) {
  return _M0MP319moonbit_2dcommunity7rabbita2js8Nullable12from__optionGRP319moonbit_2dcommunity7rabbita3dom4NodeE(new _M0DTPC16option6OptionGRP319moonbit_2dcommunity7rabbita3dom4NodeE4Some(x));
}
function _M0MP419moonbit_2dcommunity7rabbita8internal7runtime5INode8relocate(self, parent, before) {
  let e;
  let s;
  _L: {
    let e$2;
    _L$2: {
      switch (self.$tag) {
        case 0: {
          const _Elem = self;
          const _e = _Elem._4;
          e$2 = _e;
          break _L$2;
        }
        case 1: {
          const _Text = self;
          const _e$2 = _Text._1;
          e$2 = _e$2;
          break _L$2;
        }
        case 2: {
          const _Frag = self;
          const _s = _Frag._1;
          const _e$3 = _Frag._2;
          e = _e$3;
          s = _s;
          break _L;
        }
        default: {
          const _Slot = self;
          const _s$2 = _Slot._1;
          const _e$4 = _Slot._2;
          e = _e$4;
          s = _s$2;
          break _L;
        }
      }
    }
    _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode14insert__beforeGRP319moonbit_2dcommunity7rabbita3dom4NodeE(parent, _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode8as__nodeGRP319moonbit_2dcommunity7rabbita3dom7ElementE(e$2), before);
    return;
  }
  const _bind = _M0MP319moonbit_2dcommunity7rabbita2js8Nullable10to__optionGRP319moonbit_2dcommunity7rabbita3dom10MouseEventE(_M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode17get__parent__nodeGRP319moonbit_2dcommunity7rabbita3dom7CommentE(s));
  if (_bind.$tag === 1) {
    const _Some = _bind;
    const _a = _Some._0;
    const _bind$2 = _M0MP319moonbit_2dcommunity7rabbita2js8Nullable10to__optionGRP319moonbit_2dcommunity7rabbita3dom10MouseEventE(_M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode17get__parent__nodeGRP319moonbit_2dcommunity7rabbita3dom7CommentE(e));
    if (_bind$2.$tag === 1) {
      const _Some$2 = _bind$2;
      const _b = _Some$2._0;
      if (_M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode14is__same__nodeGRP319moonbit_2dcommunity7rabbita3dom4NodeE(_a, _b)) {
      } else {
        $panic();
      }
    } else {
      $panic();
    }
  } else {
    $panic();
  }
  const s$2 = _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode8as__nodeGRP319moonbit_2dcommunity7rabbita3dom7CommentE(s);
  const e$2 = _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode8as__nodeGRP319moonbit_2dcommunity7rabbita3dom7CommentE(e);
  let anchor = before;
  while (true) {
    const _bind$2 = _M0MP319moonbit_2dcommunity7rabbita2js8Nullable10to__optionGRP319moonbit_2dcommunity7rabbita3dom10MouseEventE(_M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode22get__previous__siblingGRP319moonbit_2dcommunity7rabbita3dom4NodeE(e$2));
    if (_bind$2.$tag === 1) {
      const _Some = _bind$2;
      const _n = _Some._0;
      if (!_M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode14is__same__nodeGRP319moonbit_2dcommunity7rabbita3dom4NodeE(_n, s$2)) {
        _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode14insert__beforeGRP319moonbit_2dcommunity7rabbita3dom4NodeE(parent, _n, anchor);
        anchor = _M0FP419moonbit_2dcommunity7rabbita8internal7runtime8nullableGRP319moonbit_2dcommunity7rabbita3dom4NodeE(_n);
        continue;
      } else {
        break;
      }
    } else {
      break;
    }
  }
  _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode14insert__beforeGRP319moonbit_2dcommunity7rabbita3dom4NodeE(parent, e$2, before);
  _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode14insert__beforeGRP319moonbit_2dcommunity7rabbita3dom4NodeE(parent, s$2, anchor);
}
function _M0FP419moonbit_2dcommunity7rabbita8internal7runtime4nullGRP319moonbit_2dcommunity7rabbita3dom4NodeE() {
  return _M0MP319moonbit_2dcommunity7rabbita2js8Nullable4nullGRP319moonbit_2dcommunity7rabbita3dom4NodeE();
}
function _M0FP419moonbit_2dcommunity7rabbita8internal7runtime22variant__to__js__value(value) {
  switch (value.$tag) {
    case 3: {
      const _String = value;
      const _value = _String._0;
      return _value;
    }
    case 2: {
      const _Floating = value;
      const _value$2 = _Floating._0;
      return _value$2;
    }
    case 1: {
      const _Integer = value;
      const _value$3 = _Integer._0;
      return _value$3;
    }
    default: {
      const _Boolean = value;
      const _value$4 = _Boolean._0;
      return _value$4;
    }
  }
}
function _M0MP419moonbit_2dcommunity7rabbita8internal7runtime5VNode6insert(self, sandbox, parent_inst, parent, before) {
  switch (self.$tag) {
    case 1: {
      const _Text = self;
      const _s = _Text._0;
      const e = _M0MP319moonbit_2dcommunity7rabbita3dom8Document18create__text__node(_M0FP319moonbit_2dcommunity7rabbita3dom8document(), _s);
      _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode14insert__beforeGRP319moonbit_2dcommunity7rabbita3dom4NodeE(parent, _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode8as__nodeGRP319moonbit_2dcommunity7rabbita3dom7ElementE(e), before);
      return new _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime5INode4Text(_s, e);
    }
    case 3: {
      const _Slot = self;
      const _cell = _Slot._0;
      const flags = _cell.method_table.method_2(_cell.self);
      flags.attach_count = flags.attach_count + 1 | 0;
      const start = _M0MP319moonbit_2dcommunity7rabbita3dom8Document15create__comment(_M0FP319moonbit_2dcommunity7rabbita3dom8document(), "");
      const end = _M0MP319moonbit_2dcommunity7rabbita3dom8Document15create__comment(_M0FP319moonbit_2dcommunity7rabbita3dom8document(), "");
      const fragment = _M0MP319moonbit_2dcommunity7rabbita3dom8Document26create__document__fragment(_M0FP319moonbit_2dcommunity7rabbita3dom8document());
      _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode14insert__beforeGRP319moonbit_2dcommunity7rabbita3dom16DocumentFragmentE(fragment, _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode8as__nodeGRP319moonbit_2dcommunity7rabbita3dom7CommentE(start), _M0FP419moonbit_2dcommunity7rabbita8internal7runtime4nullGRP319moonbit_2dcommunity7rabbita3dom4NodeE());
      const inst = _M0MP419moonbit_2dcommunity7rabbita8internal7runtime8Instance3new(_cell);
      const inode = _M0MP419moonbit_2dcommunity7rabbita8internal7runtime5VNode6insert(_cell.method_table.method_1(_cell.self), sandbox, inst, _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode8as__nodeGRP319moonbit_2dcommunity7rabbita3dom16DocumentFragmentE(fragment), _M0FP419moonbit_2dcommunity7rabbita8internal7runtime4nullGRP319moonbit_2dcommunity7rabbita3dom4NodeE());
      inst.inode = inode;
      const _bind = _M0MPB3Map3getGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(sandbox.live_map, flags.id);
      if (_bind === undefined) {
        const _tmp = sandbox.live_map;
        const _tmp$2 = flags.id;
        const _tmp$3 = inst.cell;
        const _bind$2 = [{ _0: inst.id, _1: inst }];
        _M0MPB3Map3setGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(_tmp, _tmp$2, { _0: _tmp$3, _1: _M0MPB3Map3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(new _M0TPB9ArrayViewGURP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEE(_bind$2, 0, 1), undefined) });
      } else {
        const _Some = _bind;
        const _x = _Some;
        const _map = _x._1;
        _M0MPB3Map3setGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(_map, inst.id, inst);
      }
      inst.link.val = inst;
      _M0MPB3Map3setGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(parent_inst.new_childs, inst.id, inst.link);
      _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode14insert__beforeGRP319moonbit_2dcommunity7rabbita3dom16DocumentFragmentE(fragment, _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode8as__nodeGRP319moonbit_2dcommunity7rabbita3dom7CommentE(end), _M0FP419moonbit_2dcommunity7rabbita8internal7runtime4nullGRP319moonbit_2dcommunity7rabbita3dom4NodeE());
      _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode14insert__beforeGRP319moonbit_2dcommunity7rabbita3dom4NodeE(parent, _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode8as__nodeGRP319moonbit_2dcommunity7rabbita3dom16DocumentFragmentE(fragment), before);
      return new _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime5INode4Slot(inst, start, end);
    }
    case 2: {
      const _Frag = self;
      const _childs = _Frag._0;
      const doc = _M0FP319moonbit_2dcommunity7rabbita3dom8document();
      const fragment$2 = _M0MP319moonbit_2dcommunity7rabbita3dom8Document26create__document__fragment(doc);
      const start$2 = _M0MP319moonbit_2dcommunity7rabbita3dom8Document15create__comment(doc, "start");
      const end$2 = _M0MP319moonbit_2dcommunity7rabbita3dom8Document15create__comment(doc, "end");
      _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode13append__childGRP319moonbit_2dcommunity7rabbita3dom16DocumentFragmentE(fragment$2, _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode8as__nodeGRP319moonbit_2dcommunity7rabbita3dom7CommentE(start$2));
      const _p$2 = new Array(_childs.length);
      const _p$3 = _childs.length;
      let _tmp = 0;
      while (true) {
        const _p$4 = _tmp;
        if (_p$4 < _p$3) {
          const _p$5 = _childs[_p$4];
          _p$2[_p$4] = _M0MP419moonbit_2dcommunity7rabbita8internal7runtime5VNode6insert(_p$5, sandbox, parent_inst, _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode8as__nodeGRP319moonbit_2dcommunity7rabbita3dom16DocumentFragmentE(fragment$2), _M0FP419moonbit_2dcommunity7rabbita8internal7runtime4nullGRP319moonbit_2dcommunity7rabbita3dom4NodeE());
          _tmp = _p$4 + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      const childs = _p$2;
      _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode13append__childGRP319moonbit_2dcommunity7rabbita3dom16DocumentFragmentE(fragment$2, _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode8as__nodeGRP319moonbit_2dcommunity7rabbita3dom7CommentE(end$2));
      _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode14insert__beforeGRP319moonbit_2dcommunity7rabbita3dom4NodeE(parent, _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode8as__nodeGRP319moonbit_2dcommunity7rabbita3dom16DocumentFragmentE(fragment$2), before);
      return new _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime5INode4Frag(childs, start$2, end$2);
    }
    default: {
      const _Elem = self;
      const _tag = _Elem._0;
      const _properties = _Elem._1;
      const _childs$2 = _Elem._2;
      const _namespace_uri = _Elem._3;
      const s = _tag === "RABBITA_CAPTURED_LINK" ? "a" : _tag;
      const doc$2 = _M0FP319moonbit_2dcommunity7rabbita3dom8document();
      let element;
      if (_namespace_uri === undefined) {
        element = _M0MP319moonbit_2dcommunity7rabbita3dom8Document15create__element(doc$2, s);
      } else {
        const _Some = _namespace_uri;
        const _ns = _Some;
        element = _M0MP319moonbit_2dcommunity7rabbita3dom8Document19create__element__ns(doc$2, _ns, s, undefined, undefined);
      }
      const _slots = _properties.slots;
      const _handlers = _properties.handlers;
      const _attrs = _properties.attrs;
      const _props = _properties.props;
      const _styles = _properties.styles;
      const _it = _M0MPB3Map5iter2GsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(_handlers);
      while (true) {
        const _bind$2 = _M0MPB5Iter24nextGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(_it);
        if (_bind$2 === undefined) {
          break;
        } else {
          const _Some = _bind$2;
          const _x = _Some;
          const _e = _x._0;
          const _h = _x._1;
          const slot = _M0FPC13ref3newGRP38zongen0116mgpic2026_2dsite4main5ModelE(_h);
          _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom13IsEventTarget20add__event__listenerGRP319moonbit_2dcommunity7rabbita3dom7ElementE(element, _e, (x) => {
            const _func = slot.val;
            _func(x, { self: sandbox, method_table: _M0FP0133moonbit_2dcommunity_2frabbita_2finternal_2fruntime_2fSandbox_24as_24_40moonbit_2dcommunity_2frabbita_2finternal_2fruntime_2eScheduler });
          });
          _M0MPB3Map3setGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(_slots, _e, slot);
          continue;
        }
      }
      if (_tag === "RABBITA_CAPTURED_LINK") {
        _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom13IsEventTarget20add__event__listenerGRP319moonbit_2dcommunity7rabbita3dom7ElementE(element, "click", sandbox.captured_link_listener);
      }
      const _it$2 = _M0MPB3Map5iter2GsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(_attrs);
      while (true) {
        const _bind$2 = _M0MPB5Iter24nextGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(_it$2);
        if (_bind$2 === undefined) {
          break;
        } else {
          const _Some = _bind$2;
          const _x = _Some;
          const _n = _x._0;
          const _val = _x._1;
          _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom9IsElement14set__attributeGRP319moonbit_2dcommunity7rabbita3dom7ElementE(element, _n, _val);
          continue;
        }
      }
      const _it$3 = _M0MPB3Map5iter2GsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(_props);
      while (true) {
        const _bind$2 = _M0MPB5Iter24nextGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(_it$3);
        if (_bind$2 === undefined) {
          break;
        } else {
          const _Some = _bind$2;
          const _x = _Some;
          const _n = _x._0;
          const _val = _x._1;
          _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom9IsElement13set__propertyGRP319moonbit_2dcommunity7rabbita3dom7ElementE(element, _n, _M0FP419moonbit_2dcommunity7rabbita8internal7runtime22variant__to__js__value(_val));
          continue;
        }
      }
      const _bind$2 = _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom13IsEventTarget17to__html__elementGRP319moonbit_2dcommunity7rabbita3dom7ElementE(element);
      let sheet;
      if (_bind$2.$tag === 1) {
        const _Some = _bind$2;
        const _html = _Some._0;
        sheet = _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom13IsHtmlElement10get__styleGRP319moonbit_2dcommunity7rabbita3dom11HTMLElementE(_html);
      } else {
        const _bind$3 = _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom13IsEventTarget16to__svg__elementGRP319moonbit_2dcommunity7rabbita3dom7ElementE(element);
        if (_bind$3.$tag === 1) {
          const _Some = _bind$3;
          const _svg = _Some._0;
          sheet = _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom12IsSVGElement10get__styleGRP319moonbit_2dcommunity7rabbita3dom10SVGElementE(_svg);
        } else {
          sheet = $panic();
        }
      }
      const _it$4 = _M0MPB3Map5iter2GsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(_styles);
      while (true) {
        const _bind$3 = _M0MPB5Iter24nextGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(_it$4);
        if (_bind$3 === undefined) {
          break;
        } else {
          const _Some = _bind$3;
          const _x = _Some;
          const _n = _x._0;
          const _val = _x._1;
          _M0MP319moonbit_2dcommunity7rabbita3dom19CSSStyleDeclaration13set__property(sheet, _n, _val);
          continue;
        }
      }
      const n = _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode8as__nodeGRP319moonbit_2dcommunity7rabbita3dom7ElementE(element);
      let childs$2;
      if (_childs$2.$tag === 0) {
        const _Array = _childs$2;
        const _xs = _Array._0;
        const _p$4 = new Array(_xs.length);
        const _p$5 = _xs.length;
        let _tmp$2 = 0;
        while (true) {
          const _p$6 = _tmp$2;
          if (_p$6 < _p$5) {
            const _p$7 = _xs[_p$6];
            _p$4[_p$6] = _M0MP419moonbit_2dcommunity7rabbita8internal7runtime5VNode6insert(_p$7, sandbox, parent_inst, n, _M0FP419moonbit_2dcommunity7rabbita8internal7runtime4nullGRP319moonbit_2dcommunity7rabbita3dom4NodeE());
            _tmp$2 = _p$6 + 1 | 0;
            continue;
          } else {
            break;
          }
        }
        childs$2 = new _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime8ChildrenGRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE5Array(_p$4);
      } else {
        const _Map = _childs$2;
        const _mp = _Map._0;
        const _bind$3 = [];
        const imp = _M0MPB3Map3MapGsRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(new _M0TPB9ArrayViewGUsRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeEE(_bind$3, 0, 0), undefined);
        const _it$5 = _M0MPB3Map5iter2GsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(_mp);
        while (true) {
          const _bind$4 = _M0MPB5Iter24nextGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(_it$5);
          if (_bind$4 === undefined) {
            break;
          } else {
            const _Some = _bind$4;
            const _x = _Some;
            const _k = _x._0;
            const _v = _x._1;
            _M0MPB3Map3setGsRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(imp, _k, _M0MP419moonbit_2dcommunity7rabbita8internal7runtime5VNode6insert(_v, sandbox, parent_inst, n, _M0FP419moonbit_2dcommunity7rabbita8internal7runtime4nullGRP319moonbit_2dcommunity7rabbita3dom4NodeE()));
            continue;
          }
        }
        childs$2 = new _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime8ChildrenGRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE3Map(imp);
      }
      _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode14insert__beforeGRP319moonbit_2dcommunity7rabbita3dom4NodeE(parent, n, before);
      return new _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime5INode4Elem(_tag, _properties, childs$2, _namespace_uri, element);
    }
  }
}
function _M0MP419moonbit_2dcommunity7rabbita8internal7runtime5VNode12link_2einner(props, children, escape) {
  const tag = escape ? "a" : "RABBITA_CAPTURED_LINK";
  const _p$2 = undefined;
  return new _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime5VNode4Elem(tag, props, children, _p$2);
}
function _M0MP419moonbit_2dcommunity7rabbita8internal7runtime5Props3new(attrs, props, styles, handlers) {
  const _bind = [];
  const _bind$2 = _M0MPB3Map3MapGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(new _M0TPB9ArrayViewGUsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEEE(_bind, 0, 0), undefined);
  return new _M0TP419moonbit_2dcommunity7rabbita8internal7runtime5Props(_bind$2, handlers, attrs, props, styles);
}
function _M0FP419moonbit_2dcommunity7rabbita8internal7runtime9copy__mapGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(src) {
  const _bind = [];
  const dst = _M0MPB3Map3MapGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(new _M0TPB9ArrayViewGUsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEEE(_bind, 0, 0), undefined);
  const _it = _M0MPB3Map5iter2GsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(src);
  while (true) {
    const _bind$2 = _M0MPB5Iter24nextGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(_it);
    if (_bind$2 === undefined) {
      break;
    } else {
      const _Some = _bind$2;
      const _x = _Some;
      const _k = _x._0;
      const _v = _x._1;
      _M0MPB3Map3setGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(dst, _k, _v);
      continue;
    }
  }
  return dst;
}
function _M0FP419moonbit_2dcommunity7rabbita8internal7runtime9copy__mapGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(src) {
  const _bind = [];
  const dst = _M0MPB3Map3MapGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(new _M0TPB9ArrayViewGUsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(_bind, 0, 0), undefined);
  const _it = _M0MPB3Map5iter2GsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(src);
  while (true) {
    const _bind$2 = _M0MPB5Iter24nextGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(_it);
    if (_bind$2 === undefined) {
      break;
    } else {
      const _Some = _bind$2;
      const _x = _Some;
      const _k = _x._0;
      const _v = _x._1;
      _M0MPB3Map3setGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(dst, _k, _v);
      continue;
    }
  }
  return dst;
}
function _M0FP419moonbit_2dcommunity7rabbita8internal7runtime9copy__mapGssE(src) {
  const _bind = [];
  const dst = _M0MPB3Map3MapGssE(new _M0TPB9ArrayViewGUssEE(_bind, 0, 0), undefined);
  const _it = _M0MPB3Map5iter2GsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(src);
  while (true) {
    const _bind$2 = _M0MPB5Iter24nextGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(_it);
    if (_bind$2 === undefined) {
      break;
    } else {
      const _Some = _bind$2;
      const _x = _Some;
      const _k = _x._0;
      const _v = _x._1;
      _M0MPB3Map3setGssE(dst, _k, _v);
      continue;
    }
  }
  return dst;
}
function _M0FP419moonbit_2dcommunity7rabbita8internal7runtime9copy__mapGsRP319moonbit_2dcommunity7rabbita7variant7VariantE(src) {
  const _bind = [];
  const dst = _M0MPB3Map3MapGsRP319moonbit_2dcommunity7rabbita7variant7VariantE(new _M0TPB9ArrayViewGUsRP319moonbit_2dcommunity7rabbita7variant7VariantEE(_bind, 0, 0), undefined);
  const _it = _M0MPB3Map5iter2GsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(src);
  while (true) {
    const _bind$2 = _M0MPB5Iter24nextGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(_it);
    if (_bind$2 === undefined) {
      break;
    } else {
      const _Some = _bind$2;
      const _x = _Some;
      const _k = _x._0;
      const _v = _x._1;
      _M0MPB3Map3setGsRP319moonbit_2dcommunity7rabbita7variant7VariantE(dst, _k, _v);
      continue;
    }
  }
  return dst;
}
function _M0MP419moonbit_2dcommunity7rabbita8internal7runtime5Props4copy(self) {
  return new _M0TP419moonbit_2dcommunity7rabbita8internal7runtime5Props(_M0FP419moonbit_2dcommunity7rabbita8internal7runtime9copy__mapGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(self.slots), _M0FP419moonbit_2dcommunity7rabbita8internal7runtime9copy__mapGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(self.handlers), _M0FP419moonbit_2dcommunity7rabbita8internal7runtime9copy__mapGssE(self.attrs), _M0FP419moonbit_2dcommunity7rabbita8internal7runtime9copy__mapGsRP319moonbit_2dcommunity7rabbita7variant7VariantE(self.props), _M0FP419moonbit_2dcommunity7rabbita8internal7runtime9copy__mapGssE(self.styles));
}
function _M0MP419moonbit_2dcommunity7rabbita8internal7runtime8Children3mapGRP419moonbit_2dcommunity7rabbita8internal7runtime5VNodeRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(c, f) {
  if (c.$tag === 0) {
    const _Array = c;
    const _arr = _Array._0;
    const _p$2 = new Array(_arr.length);
    const _p$3 = _arr.length;
    let _tmp = 0;
    while (true) {
      const _p$4 = _tmp;
      if (_p$4 < _p$3) {
        const _p$5 = _arr[_p$4];
        _p$2[_p$4] = f(_p$5);
        _tmp = _p$4 + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return new _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime8ChildrenGRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE5Array(_p$2);
  } else {
    const _Map = c;
    const _mp = _Map._0;
    return new _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime8ChildrenGRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE3Map(_M0MPB3Map3mapGsRP419moonbit_2dcommunity7rabbita8internal7runtime5VNodeRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(_mp, (_discard_, v) => f(v)));
  }
}
function _M0FP419moonbit_2dcommunity7rabbita8internal7runtime11diff__props(old, new_, sandbox, parent) {
  const slots = old.slots;
  const _it = _M0MPB3Map5iter2GsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(slots);
  while (true) {
    const _bind = _M0MPB5Iter24nextGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(_it);
    if (_bind === undefined) {
      break;
    } else {
      const _Some = _bind;
      const _x = _Some;
      const _event = _x._0;
      const _slot = _x._1;
      if (!_M0MPB3Map8containsGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(new_.handlers, _event)) {
        _slot.val = (_discard_, _discard_$2) => {
        };
      }
      continue;
    }
  }
  const _it$2 = _M0MPB3Map5iter2GsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(new_.handlers);
  while (true) {
    const _bind = _M0MPB5Iter24nextGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(_it$2);
    if (_bind === undefined) {
      break;
    } else {
      const _Some = _bind;
      const _x = _Some;
      const _event = _x._0;
      const _handler = _x._1;
      const _bind$2 = _M0MPB3Map3getGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(slots, _event);
      if (_bind$2 === undefined) {
        const slot = _M0FPC13ref3newGRP38zongen0116mgpic2026_2dsite4main5ModelE(_handler);
        _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom13IsEventTarget20add__event__listenerGRP319moonbit_2dcommunity7rabbita3dom7ElementE(parent, _event, (e) => {
          const _func = slot.val;
          _func(e, { self: sandbox, method_table: _M0FP0133moonbit_2dcommunity_2frabbita_2finternal_2fruntime_2fSandbox_24as_24_40moonbit_2dcommunity_2frabbita_2finternal_2fruntime_2eScheduler });
        });
        _M0MPB3Map3setGsRPC13ref3RefGWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(slots, _event, slot);
      } else {
        const _Some$2 = _bind$2;
        const _slot = _Some$2;
        _slot.val = _handler;
      }
      continue;
    }
  }
  new_.slots = slots;
  const _it$3 = _M0MPB3Map5iter2GsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(old.attrs);
  while (true) {
    const _bind = _M0MPB5Iter24nextGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(_it$3);
    if (_bind === undefined) {
      break;
    } else {
      const _Some = _bind;
      const _x = _Some;
      const _k = _x._0;
      if (!_M0MPB3Map8containsGssE(new_.attrs, _k)) {
        _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom9IsElement17remove__attributeGRP319moonbit_2dcommunity7rabbita3dom7ElementE(parent, _k);
      }
      continue;
    }
  }
  const _it$4 = _M0MPB3Map5iter2GsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(new_.attrs);
  while (true) {
    const _bind = _M0MPB5Iter24nextGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(_it$4);
    if (_bind === undefined) {
      break;
    } else {
      const _Some = _bind;
      const _x = _Some;
      const _k = _x._0;
      const _v2 = _x._1;
      const _bind$2 = _M0MPB3Map3getGssE(old.attrs, _k);
      if (_bind$2 === undefined) {
        _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom9IsElement14set__attributeGRP319moonbit_2dcommunity7rabbita3dom7ElementE(parent, _k, _v2);
      } else {
        const _Some$2 = _bind$2;
        const _v1 = _Some$2;
        if (!(_v1 === _v2)) {
          _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom9IsElement14set__attributeGRP319moonbit_2dcommunity7rabbita3dom7ElementE(parent, _k, _v2);
        }
      }
      continue;
    }
  }
  const _it$5 = _M0MPB3Map5iter2GsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(old.props);
  while (true) {
    const _bind = _M0MPB5Iter24nextGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(_it$5);
    if (_bind === undefined) {
      break;
    } else {
      const _Some = _bind;
      const _x = _Some;
      const _k = _x._0;
      if (!_M0MPB3Map8containsGsRP319moonbit_2dcommunity7rabbita7variant7VariantE(new_.props, _k)) {
        _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom9IsElement16remove__propertyGRP319moonbit_2dcommunity7rabbita3dom7ElementE(parent, _k);
      }
      continue;
    }
  }
  const _it$6 = _M0MPB3Map5iter2GsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(new_.props);
  while (true) {
    const _bind = _M0MPB5Iter24nextGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(_it$6);
    if (_bind === undefined) {
      break;
    } else {
      const _Some = _bind;
      const _x = _Some;
      const _k = _x._0;
      const _v2 = _x._1;
      const _bind$2 = _M0MPB3Map3getGsRP319moonbit_2dcommunity7rabbita7variant7VariantE(old.props, _k);
      if (_bind$2 === undefined) {
        _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom9IsElement13set__propertyGRP319moonbit_2dcommunity7rabbita3dom7ElementE(parent, _k, _M0FP419moonbit_2dcommunity7rabbita8internal7runtime22variant__to__js__value(_v2));
      } else {
        const _Some$2 = _bind$2;
        const _v1 = _Some$2;
        if (_M0IP016_24default__implPB2Eq10not__equalGRP319moonbit_2dcommunity7rabbita7variant7VariantE(_v1, _v2)) {
          _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom9IsElement13set__propertyGRP319moonbit_2dcommunity7rabbita3dom7ElementE(parent, _k, _M0FP419moonbit_2dcommunity7rabbita8internal7runtime22variant__to__js__value(_v2));
        }
      }
      continue;
    }
  }
  const _bind = _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom13IsEventTarget17to__html__elementGRP319moonbit_2dcommunity7rabbita3dom7ElementE(parent);
  let stylesheet;
  if (_bind.$tag === 1) {
    const _Some = _bind;
    const _html = _Some._0;
    stylesheet = _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom13IsHtmlElement10get__styleGRP319moonbit_2dcommunity7rabbita3dom11HTMLElementE(_html);
  } else {
    const _bind$2 = _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom13IsEventTarget16to__svg__elementGRP319moonbit_2dcommunity7rabbita3dom7ElementE(parent);
    if (_bind$2.$tag === 1) {
      const _Some = _bind$2;
      const _svg = _Some._0;
      stylesheet = _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom12IsSVGElement10get__styleGRP319moonbit_2dcommunity7rabbita3dom10SVGElementE(_svg);
    } else {
      stylesheet = $panic();
    }
  }
  const _it$7 = _M0MPB3Map5iter2GsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(old.styles);
  while (true) {
    const _bind$2 = _M0MPB5Iter24nextGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(_it$7);
    if (_bind$2 === undefined) {
      break;
    } else {
      const _Some = _bind$2;
      const _x = _Some;
      const _k = _x._0;
      if (!_M0MPB3Map8containsGssE(new_.styles, _k)) {
        _M0MP319moonbit_2dcommunity7rabbita3dom19CSSStyleDeclaration16remove__property(stylesheet, _k);
      }
      continue;
    }
  }
  const _it$8 = _M0MPB3Map5iter2GsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(new_.styles);
  while (true) {
    const _bind$2 = _M0MPB5Iter24nextGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(_it$8);
    if (_bind$2 === undefined) {
      return;
    } else {
      const _Some = _bind$2;
      const _x = _Some;
      const _k = _x._0;
      const _v2 = _x._1;
      const _bind$3 = _M0MPB3Map3getGssE(old.styles, _k);
      if (_bind$3 === undefined) {
        _M0MP319moonbit_2dcommunity7rabbita3dom19CSSStyleDeclaration13set__property(stylesheet, _k, _v2);
      } else {
        const _Some$2 = _bind$3;
        const _v1 = _Some$2;
        if (!(_v1 === _v2)) {
          _M0MP319moonbit_2dcommunity7rabbita3dom19CSSStyleDeclaration13set__property(stylesheet, _k, _v2);
        }
      }
      continue;
    }
  }
}
function _M0FP419moonbit_2dcommunity7rabbita8internal7runtime10diff__node(old, new_, sandbox, parent, anchor, parent_inst) {
  _L: {
    switch (old.$tag) {
      case 0: {
        const _Elem = old;
        const _tag1 = _Elem._0;
        const _props1 = _Elem._1;
        const _childs1 = _Elem._2;
        const _ns1 = _Elem._3;
        const _e = _Elem._4;
        if (new_.$tag === 0) {
          const _Elem$2 = new_;
          const _tag2 = _Elem$2._0;
          const _props2 = _Elem$2._1;
          const _childs2 = _Elem$2._2;
          const _ns2 = _Elem$2._3;
          if (!(_tag1 === _tag2) || _M0IP016_24default__implPB2Eq10not__equalGOsE(_ns1, _ns2)) {
            _M0MP419moonbit_2dcommunity7rabbita8internal7runtime5INode6remove(old, sandbox, _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode8as__nodeGRP319moonbit_2dcommunity7rabbita3dom4NodeE(parent));
            return _M0MP419moonbit_2dcommunity7rabbita8internal7runtime5VNode6insert(new_, sandbox, parent_inst, _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode8as__nodeGRP319moonbit_2dcommunity7rabbita3dom4NodeE(parent), anchor);
          } else {
            _M0FP419moonbit_2dcommunity7rabbita8internal7runtime11diff__props(_props1, _props2, sandbox, _e);
            const childs = _M0FP419moonbit_2dcommunity7rabbita8internal7runtime14diff__children(_childs1, _childs2, sandbox, _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode8as__nodeGRP319moonbit_2dcommunity7rabbita3dom7ElementE(_e), _M0FP419moonbit_2dcommunity7rabbita8internal7runtime4nullGRP319moonbit_2dcommunity7rabbita3dom4NodeE(), parent_inst);
            return new _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime5INode4Elem(_tag2, _props2, childs, _ns2, _e);
          }
        } else {
          break _L;
        }
      }
      case 1: {
        const _Text = old;
        const _s1 = _Text._0;
        const _e$2 = _Text._1;
        if (new_.$tag === 1) {
          const _Text$2 = new_;
          const _s2 = _Text$2._0;
          if (!(_s1 === _s2)) {
            _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode16set__node__valueGRP319moonbit_2dcommunity7rabbita3dom7ElementE(_e$2, _M0MP319moonbit_2dcommunity7rabbita2js8Nullable12from__optionGsE(_s2));
          }
          return new _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime5INode4Text(_s2, _e$2);
        } else {
          break _L;
        }
      }
      case 2: {
        const _Frag = old;
        const _childs1$2 = _Frag._0;
        const _s = _Frag._1;
        const _e$3 = _Frag._2;
        if (new_.$tag === 2) {
          const _Frag$2 = new_;
          const _childs2 = _Frag$2._0;
          const childs = _M0FP419moonbit_2dcommunity7rabbita8internal7runtime14diff__children(new _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime8ChildrenGRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE5Array(_childs1$2), new _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime8ChildrenGRP419moonbit_2dcommunity7rabbita8internal7runtime5VNodeE5Array(_childs2), sandbox, _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode8as__nodeGRP319moonbit_2dcommunity7rabbita3dom4NodeE(parent), _M0FP419moonbit_2dcommunity7rabbita8internal7runtime8nullableGRP319moonbit_2dcommunity7rabbita3dom4NodeE(_M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode8as__nodeGRP319moonbit_2dcommunity7rabbita3dom7CommentE(_e$3)), parent_inst);
          if (childs.$tag === 0) {
            const _Array = childs;
            const _childs = _Array._0;
            return new _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime5INode4Frag(_childs, _s, _e$3);
          } else {
            return $panic();
          }
        } else {
          break _L;
        }
      }
      default: {
        const _Slot = old;
        const _inst = _Slot._0;
        if (new_.$tag === 3) {
          const _Slot$2 = new_;
          const _c2 = _Slot$2._0;
          const _tmp = _inst.cell;
          if (_M0IP016_24default__implPB2Eq10not__equalGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(_tmp.method_table.method_2(_tmp.self).id, _c2.method_table.method_2(_c2.self).id)) {
            _M0MP419moonbit_2dcommunity7rabbita8internal7runtime5INode6remove(old, sandbox, _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode8as__nodeGRP319moonbit_2dcommunity7rabbita3dom4NodeE(parent));
            return _M0MP419moonbit_2dcommunity7rabbita8internal7runtime5VNode6insert(new_, sandbox, parent_inst, _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode8as__nodeGRP319moonbit_2dcommunity7rabbita3dom4NodeE(parent), anchor);
          } else {
            return old;
          }
        } else {
          break _L;
        }
      }
    }
  }
  _M0MP419moonbit_2dcommunity7rabbita8internal7runtime5INode6remove(old, sandbox, _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode8as__nodeGRP319moonbit_2dcommunity7rabbita3dom4NodeE(parent));
  return _M0MP419moonbit_2dcommunity7rabbita8internal7runtime5VNode6insert(new_, sandbox, parent_inst, _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode8as__nodeGRP319moonbit_2dcommunity7rabbita3dom4NodeE(parent), anchor);
}
function _M0FP419moonbit_2dcommunity7rabbita8internal7runtime14diff__children(old, new_, sandbox, parent, anchor, parent_inst) {
  _L: {
    if (old.$tag === 0) {
      const _Array = old;
      const _old = _Array._0;
      if (new_.$tag === 0) {
        const _Array$2 = new_;
        const _new = _Array$2._0;
        const len1 = _old.length;
        const len2 = _new.length;
        let before = anchor;
        const acc = [];
        let len;
        if (len1 > len2) {
          let _tmp = len1 - 1 | 0;
          while (true) {
            const i = _tmp;
            if (i >= len2) {
              _M0MP419moonbit_2dcommunity7rabbita8internal7runtime5INode6remove(_M0MPC15array5Array2atGRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(_old, i), sandbox, parent);
              _tmp = i - 1 | 0;
              continue;
            } else {
              break;
            }
          }
          len = len2;
        } else {
          let _tmp = len2 - 1 | 0;
          while (true) {
            const i = _tmp;
            if (i >= len1) {
              const inode = _M0MP419moonbit_2dcommunity7rabbita8internal7runtime5VNode6insert(_M0MPC15array5Array2atGRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(_new, i), sandbox, parent_inst, parent, before);
              _M0MPC15array5Array4pushGRPC16string10StringViewE(acc, inode);
              before = _M0FP419moonbit_2dcommunity7rabbita8internal7runtime8nullableGRP319moonbit_2dcommunity7rabbita3dom4NodeE(_M0MP419moonbit_2dcommunity7rabbita8internal7runtime5INode5start(inode));
              _tmp = i - 1 | 0;
              continue;
            } else {
              break;
            }
          }
          len = len1;
        }
        let _tmp = len - 1 | 0;
        while (true) {
          const i = _tmp;
          if (i >= 0) {
            const inode = _M0FP419moonbit_2dcommunity7rabbita8internal7runtime10diff__node(_M0MPC15array5Array2atGRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(_old, i), _M0MPC15array5Array2atGRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(_new, i), sandbox, parent, before, parent_inst);
            _M0MPC15array5Array4pushGRPC16string10StringViewE(acc, inode);
            before = _M0FP419moonbit_2dcommunity7rabbita8internal7runtime8nullableGRP319moonbit_2dcommunity7rabbita3dom4NodeE(_M0MP419moonbit_2dcommunity7rabbita8internal7runtime5INode5start(inode));
            _tmp = i - 1 | 0;
            continue;
          } else {
            break;
          }
        }
        return new _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime8ChildrenGRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE5Array(_M0MPC15array5Array3revGRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(acc));
      } else {
        break _L;
      }
    } else {
      const _Map = old;
      const _old = _Map._0;
      if (new_.$tag === 1) {
        const _Map$2 = new_;
        const _new = _Map$2._0;
        const _it = _M0MPB3Map5iter2GsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(_old);
        while (true) {
          const _bind = _M0MPB5Iter24nextGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(_it);
          if (_bind === undefined) {
            break;
          } else {
            const _Some = _bind;
            const _x = _Some;
            const _k = _x._0;
            const _v1 = _x._1;
            if (!_M0MPB3Map8containsGsRP419moonbit_2dcommunity7rabbita8internal7runtime5VNodeE(_new, _k)) {
              _M0MP419moonbit_2dcommunity7rabbita8internal7runtime5INode6remove(_v1, sandbox, parent);
            }
            continue;
          }
        }
        const order = _M0MPB3Map9to__arrayGsRP419moonbit_2dcommunity7rabbita8internal7runtime5VNodeE(_new);
        let before = _M0FP419moonbit_2dcommunity7rabbita8internal7runtime4nullGRP319moonbit_2dcommunity7rabbita3dom4NodeE();
        const reversed = [];
        const _bind = order.length;
        let _tmp = _bind - 1 | 0;
        while (true) {
          const i = _tmp;
          if (i >= 0) {
            const _bind$2 = _M0MPC15array5Array2atGRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(order, i);
            const _k = _bind$2._0;
            const _v2 = _bind$2._1;
            const _bind$3 = _M0MPB3Map3getGsRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(_old, _k);
            let inode;
            if (_bind$3 === undefined) {
              inode = _M0MP419moonbit_2dcommunity7rabbita8internal7runtime5VNode6insert(_v2, sandbox, parent_inst, parent, before);
            } else {
              const _Some = _bind$3;
              const _v1 = _Some;
              const inode$2 = _M0FP419moonbit_2dcommunity7rabbita8internal7runtime10diff__node(_v1, _v2, sandbox, parent, before, parent_inst);
              _M0MP419moonbit_2dcommunity7rabbita8internal7runtime5INode8relocate(inode$2, parent, before);
              inode = inode$2;
            }
            _M0MPC15array5Array4pushGRPC16string10StringViewE(reversed, { _0: _k, _1: inode });
            before = _M0FP419moonbit_2dcommunity7rabbita8internal7runtime8nullableGRP319moonbit_2dcommunity7rabbita3dom4NodeE(_M0MP419moonbit_2dcommunity7rabbita8internal7runtime5INode5start(inode));
            _tmp = i - 1 | 0;
            continue;
          } else {
            break;
          }
        }
        return new _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime8ChildrenGRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE3Map(_M0MPB3Map3MapGsRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(new _M0TPB9ArrayViewGUsRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeEE(reversed, 0, reversed.length), undefined));
      } else {
        break _L;
      }
    }
  }
  if (old.$tag === 1) {
    const _Map = old;
    const _xs = _Map._0;
    let _tmp = _xs.head;
    while (true) {
      const _p$2 = _tmp;
      if (_p$2 === undefined) {
        break;
      } else {
        const _p$3 = _p$2;
        const _p$4 = _p$3;
        const _p$5 = _p$4.value;
        const _p$6 = _p$4.next;
        _M0MP419moonbit_2dcommunity7rabbita8internal7runtime5INode6remove(_p$5, sandbox, parent);
        _tmp = _p$6;
        continue;
      }
    }
  } else {
    const _Array = old;
    const _xs = _Array._0;
    const _p$2 = _xs.length;
    let _tmp = 0;
    while (true) {
      const _p$3 = _tmp;
      if (_p$3 < _p$2) {
        const _p$4 = _xs[_p$3];
        _M0MP419moonbit_2dcommunity7rabbita8internal7runtime5INode6remove(_p$4, sandbox, parent);
        _tmp = _p$3 + 1 | 0;
        continue;
      } else {
        break;
      }
    }
  }
  return _M0MP419moonbit_2dcommunity7rabbita8internal7runtime8Children3mapGRP419moonbit_2dcommunity7rabbita8internal7runtime5VNodeRP419moonbit_2dcommunity7rabbita8internal7runtime5INodeE(new_, (y) => _M0MP419moonbit_2dcommunity7rabbita8internal7runtime5VNode6insert(y, sandbox, parent_inst, parent, _M0FP419moonbit_2dcommunity7rabbita8internal7runtime4nullGRP319moonbit_2dcommunity7rabbita3dom4NodeE()));
}
function _M0MP419moonbit_2dcommunity7rabbita8internal7runtime7Sandbox5flush(self) {
  if (!self.paint_scheduled) {
    self.paint_scheduled = true;
    _M0MP319moonbit_2dcommunity7rabbita3dom6Window25request__animation__frame(_M0FP319moonbit_2dcommunity7rabbita3dom6window(), (_discard_) => {
      const dirty = _M0MPC13set3Set9to__arrayGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(self.dirty_set);
      const _bind = dirty.length;
      let _tmp = 0;
      while (true) {
        const _ = _tmp;
        if (_ < _bind) {
          const id = dirty[_];
          _L: {
            const _bind$2 = _M0MPB3Map3getGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(self.live_map, id);
            if (_bind$2 === undefined) {
              break _L;
            } else {
              const _Some = _bind$2;
              const _x = _Some;
              const _cell = _x._0;
              const _insts = _x._1;
              if (_cell.method_table.method_2(_cell.self).dirty) {
                const flags = _cell.method_table.method_2(_cell.self);
                const _it = _M0MPB3Map5iter2GRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(_insts);
                while (true) {
                  const _bind$3 = _M0MPB5Iter24nextGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(_it);
                  if (_bind$3 === undefined) {
                    break;
                  } else {
                    const _Some$2 = _bind$3;
                    const _x$2 = _Some$2;
                    const _inst = _x$2._1;
                    const _tmp$2 = _inst.cell;
                    const vnode = _tmp$2.method_table.method_1(_tmp$2.self);
                    const _bind$4 = _inst.inode;
                    if (_bind$4 === undefined) {
                      $panic();
                    } else {
                      const _Some$3 = _bind$4;
                      const _inode = _Some$3;
                      const end = _M0MP419moonbit_2dcommunity7rabbita8internal7runtime5INode3end(_inode);
                      const parent = _M0MP319moonbit_2dcommunity7rabbita2js8Nullable6unwrapGRP319moonbit_2dcommunity7rabbita3dom7ElementE(_M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode17get__parent__nodeGRP319moonbit_2dcommunity7rabbita3dom4NodeE(end));
                      const next_sibling = _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode18get__next__siblingGRP319moonbit_2dcommunity7rabbita3dom4NodeE(end);
                      const inode = _M0FP419moonbit_2dcommunity7rabbita8internal7runtime10diff__node(_inode, vnode, self, parent, next_sibling, _inst);
                      _inst.inode = inode;
                      const _it$2 = _M0MPB3Map5iter2GRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(_inst.old_childs);
                      while (true) {
                        const _bind$5 = _M0MPB5Iter24nextGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(_it$2);
                        if (_bind$5 === undefined) {
                          break;
                        } else {
                          const _Some$4 = _bind$5;
                          const _x$3 = _Some$4;
                          const _id = _x$3._0;
                          const _link = _x$3._1;
                          const _bind$6 = _link.val;
                          if (_bind$6 === undefined) {
                          } else {
                            _M0MPB3Map3setGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(_inst.new_childs, _id, _link);
                          }
                          continue;
                        }
                      }
                      _inst.old_childs = _inst.new_childs;
                      _inst.new_childs = _M0MPB3Map3newGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime4LinkE(undefined);
                    }
                    continue;
                  }
                }
                flags.dirty = false;
              } else {
                break _L;
              }
            }
            break _L;
          }
          _tmp = _ + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _M0MPC13set3Set5clearGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(self.dirty_set);
      self.paint_scheduled = false;
      while (true) {
        const _bind$2 = _M0MPC15queue5Queue3popGWRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(self.after_render_queue);
        if (_bind$2 === undefined) {
          return;
        } else {
          const _Some = _bind$2;
          const _effect = _Some;
          _effect({ self: self, method_table: _M0FP0133moonbit_2dcommunity_2frabbita_2finternal_2fruntime_2fSandbox_24as_24_40moonbit_2dcommunity_2frabbita_2finternal_2fruntime_2eScheduler });
          continue;
        }
      }
    });
    return;
  } else {
    return;
  }
}
function _M0MP419moonbit_2dcommunity7rabbita8internal7runtime7Sandbox5drain(self) {
  if (!self.drain_scheduled) {
    self.drain_scheduled = true;
    while (true) {
      const _bind = _M0MPC15queue5Queue3popGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(self.msg_queue);
      if (_bind === undefined) {
        break;
      } else {
        const _Some = _bind;
        const _id = _Some;
        const _bind$2 = _M0MPB3Map3getGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(self.live_map, _id);
        if (_bind$2 === undefined) {
        } else {
          const _Some$2 = _bind$2;
          const _x = _Some$2;
          const _cell = _x._0;
          _cell.method_table.method_0(_cell.self, { self: self, method_table: _M0FP0133moonbit_2dcommunity_2frabbita_2finternal_2fruntime_2fSandbox_24as_24_40moonbit_2dcommunity_2frabbita_2finternal_2fruntime_2eScheduler });
          _M0MPC13set3Set3addGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(self.dirty_set, _id);
        }
        continue;
      }
    }
    self.drain_scheduled = false;
    _M0MP419moonbit_2dcommunity7rabbita8internal7runtime7Sandbox5flush(self);
    return;
  } else {
    return;
  }
}
function _M0IP419moonbit_2dcommunity7rabbita8internal7runtime7SandboxP419moonbit_2dcommunity7rabbita8internal7runtime9Scheduler3add(self, cmd) {
  switch (cmd.$tag) {
    case 3: {
      break;
    }
    case 2: {
      const _Batch = cmd;
      const _xs = _Batch._0;
      const _p$2 = _xs.length;
      let _tmp = 0;
      while (true) {
        const _p$3 = _tmp;
        if (_p$3 < _p$2) {
          const _p$4 = _xs[_p$3];
          _M0IP419moonbit_2dcommunity7rabbita8internal7runtime7SandboxP419moonbit_2dcommunity7rabbita8internal7runtime9Scheduler3add(self, _p$4);
          _tmp = _p$3 + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      break;
    }
    case 0: {
      const _Effect = cmd;
      const _effect = _Effect._0;
      const _x = _Effect._1;
      if (_x === 0) {
        _effect({ self: self, method_table: _M0FP0133moonbit_2dcommunity_2frabbita_2finternal_2fruntime_2fSandbox_24as_24_40moonbit_2dcommunity_2frabbita_2finternal_2fruntime_2eScheduler });
      } else {
        _M0MPC15queue5Queue4pushGWRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(self.after_render_queue, _effect);
      }
      break;
    }
    default: {
      const _Message = cmd;
      const _id = _Message._0;
      const _send_message = _Message._1;
      _send_message();
      _M0MPC15queue5Queue4pushGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(self.msg_queue, _id);
    }
  }
  _M0MP419moonbit_2dcommunity7rabbita8internal7runtime7Sandbox5drain(self);
}
function _M0IP419moonbit_2dcommunity7rabbita8internal7runtime7SandboxP419moonbit_2dcommunity7rabbita8internal7runtime9Scheduler17add__url__request(self, request) {
  const _bind = self.on_url_request;
  if (_bind === undefined) {
    return;
  } else {
    const _Some = _bind;
    const _f = _Some;
    _M0IP419moonbit_2dcommunity7rabbita8internal7runtime7SandboxP419moonbit_2dcommunity7rabbita8internal7runtime9Scheduler3add(self, _f(request));
    return;
  }
}
function _M0MP419moonbit_2dcommunity7rabbita8internal7runtime7Sandbox3new(root) {
  const root$2 = _M0MP419moonbit_2dcommunity7rabbita8internal7runtime8Instance3new(root);
  const sandbox = new _M0TPB8MutLocalGORP419moonbit_2dcommunity7rabbita8internal7runtime7SandboxE(undefined);
  const captured_link_listener = (event) => {
    const _bind = _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom7IsEvent16to__mouse__eventGRP319moonbit_2dcommunity7rabbita3dom5EventE(event);
    if (_bind.$tag === 1) {
      const _Some = _bind;
      const _mouse_event = _Some._0;
      const _bind$2 = sandbox.val;
      if (_bind$2 === undefined) {
        return;
      } else {
        const _Some$2 = _bind$2;
        const _sandbox = _Some$2;
        const _bind$3 = _sandbox.on_url_request;
        if (_bind$3 === undefined) {
          return;
        } else {
          if (!(_M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom12IsMouseEvent14get__meta__keyGRP319moonbit_2dcommunity7rabbita3dom10MouseEventE(_mouse_event) || _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom12IsMouseEvent14get__ctrl__keyGRP319moonbit_2dcommunity7rabbita3dom10MouseEventE(_mouse_event))) {
            _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom7IsEvent16prevent__defaultGRP319moonbit_2dcommunity7rabbita3dom5EventE(event);
            const href = _M0MP319moonbit_2dcommunity7rabbita2js8Optional6unwrapGsE(_M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom9IsElement13get__propertyGRP319moonbit_2dcommunity7rabbita3dom7ElementE(_M0MPC16option6Option6unwrapGRP319moonbit_2dcommunity7rabbita3dom7ElementE(_M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom13IsEventTarget11to__elementGRP319moonbit_2dcommunity7rabbita3dom11EventTargetE(_M0MP319moonbit_2dcommunity7rabbita2js8Nullable6unwrapGRP319moonbit_2dcommunity7rabbita3dom7ElementE(_M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom7IsEvent15current__targetGRP319moonbit_2dcommunity7rabbita3dom5EventE(event)))), "href"));
            let curr;
            let _try_err;
            _L: {
              _L$2: {
                const _bind$4 = _M0FP319moonbit_2dcommunity7rabbita3url5parse(_M0MP319moonbit_2dcommunity7rabbita3dom6Window12current__url(_M0FP319moonbit_2dcommunity7rabbita3dom6window()));
                if (_bind$4.$tag === 1) {
                  const _ok = _bind$4;
                  curr = _ok._0;
                } else {
                  const _err = _bind$4;
                  _try_err = _err._0;
                  break _L$2;
                }
                break _L;
              }
              curr = $panic();
            }
            let next;
            let _try_err$2;
            _L$2: {
              _L$3: {
                const _bind$4 = _M0FP319moonbit_2dcommunity7rabbita3url5parse(href);
                if (_bind$4.$tag === 1) {
                  const _ok = _bind$4;
                  next = _ok._0;
                } else {
                  const _err = _bind$4;
                  _try_err$2 = _err._0;
                  break _L$3;
                }
                break _L$2;
              }
              next = $panic();
            }
            const request = _M0IP319moonbit_2dcommunity7rabbita3url8ProtocolPB2Eq5equal(curr.protocol, next.protocol) && (curr.host === next.host && _M0IPC16option6OptionPB2Eq5equalGiE(curr.port, next.port)) ? new _M0DTP319moonbit_2dcommunity7rabbita3url10UrlRequest8Internal(next) : new _M0DTP319moonbit_2dcommunity7rabbita3url10UrlRequest8External(href);
            _M0IP419moonbit_2dcommunity7rabbita8internal7runtime7SandboxP419moonbit_2dcommunity7rabbita8internal7runtime9Scheduler17add__url__request(_sandbox, request);
            return;
          } else {
            return;
          }
        }
      }
    } else {
      return;
    }
  };
  const _tmp = root$2.cell;
  const _tmp$2 = _tmp.method_table.method_2(_tmp.self).id;
  const _tmp$3 = root$2.cell;
  const _bind = [{ _0: root$2.id, _1: root$2 }];
  const _bind$2 = [{ _0: _tmp$2, _1: { _0: _tmp$3, _1: _M0MPB3Map3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceE(new _M0TPB9ArrayViewGURP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEE(_bind, 0, 1), undefined) } }];
  const live_map = _M0MPB3Map3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEE(new _M0TPB9ArrayViewGURP419moonbit_2dcommunity7rabbita8internal7runtime2IdURP419moonbit_2dcommunity7rabbita8internal7runtime6IsCellRPB3MapGRP419moonbit_2dcommunity7rabbita8internal7runtime6InstIdRP419moonbit_2dcommunity7rabbita8internal7runtime8InstanceEEEE(_bind$2, 0, 1), undefined);
  const _bind$3 = _M0MPC15queue5Queue3newGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE();
  const _bind$4 = _M0MPC13set3Set3newGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(undefined);
  const _bind$5 = undefined;
  const _bind$6 = undefined;
  const _bind$7 = _M0MPC15queue5Queue3newGWRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE();
  sandbox.val = new _M0TP419moonbit_2dcommunity7rabbita8internal7runtime7Sandbox(live_map, _bind$3, _bind$7, false, _bind$4, false, root$2, captured_link_listener, _M0MP419moonbit_2dcommunity7rabbita8internal7runtime7Sandbox3newN7_2abindS1309, _bind$5, _bind$6);
  const _p$2 = sandbox.val;
  if (_p$2 === undefined) {
    return $panic();
  } else {
    const _p$3 = _p$2;
    return _p$3;
  }
}
function _M0MP419moonbit_2dcommunity7rabbita8internal7runtime7Sandbox10initialize(self) {
  const root = self.root;
  const element = _M0MP319moonbit_2dcommunity7rabbita2js8Nullable6unwrapGRP319moonbit_2dcommunity7rabbita3dom7ElementE(_M0MP319moonbit_2dcommunity7rabbita3dom8Document20get__element__by__id(_M0FP319moonbit_2dcommunity7rabbita3dom8document(), self.mount));
  const _tmp = self.dirty_set;
  const _tmp$2 = root.cell;
  _M0MPC13set3Set3addGRP419moonbit_2dcommunity7rabbita8internal7runtime2IdE(_tmp, _tmp$2.method_table.method_2(_tmp$2.self).id);
  const _tmp$3 = root.cell;
  const vnode = _tmp$3.method_table.method_1(_tmp$3.self);
  const inode = _M0MP419moonbit_2dcommunity7rabbita8internal7runtime5VNode6insert(vnode, self, root, _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom6IsNode8as__nodeGRP319moonbit_2dcommunity7rabbita3dom7ElementE(element), _M0FP419moonbit_2dcommunity7rabbita8internal7runtime4nullGRP319moonbit_2dcommunity7rabbita3dom4NodeE());
  self.root.inode = inode;
}
function _M0IP419moonbit_2dcommunity7rabbita8internal7runtime7SandboxP419moonbit_2dcommunity7rabbita8internal7runtime9Scheduler17add__url__changed(self, url) {
  const _bind = self.on_url_changed;
  if (_bind === undefined) {
    return;
  } else {
    const _Some = _bind;
    const _f = _Some;
    _M0IP419moonbit_2dcommunity7rabbita8internal7runtime7SandboxP419moonbit_2dcommunity7rabbita8internal7runtime9Scheduler3add(self, _f(url));
    return;
  }
}
function _M0MP419moonbit_2dcommunity7rabbita8internal7runtime2Id3new() {
  return _M0FP419moonbit_2dcommunity7rabbita8internal7runtime8next__id();
}
function _M0MP419moonbit_2dcommunity7rabbita8internal7runtime5Flags3new() {
  return new _M0TP419moonbit_2dcommunity7rabbita8internal7runtime5Flags(_M0MP419moonbit_2dcommunity7rabbita8internal7runtime2Id3new(), false, 0);
}
function _M0MP419moonbit_2dcommunity7rabbita8internal7runtime5Flags11mark__dirty(s) {
  s.dirty = true;
}
function _M0MP319moonbit_2dcommunity7rabbita4html5Attrs9attribute(self, key, value) {
  _M0MPB3Map3setGssE(self.attrs, key, value);
  return self;
}
function _M0FP319moonbit_2dcommunity7rabbita4html11push__style(style, attrs) {
  if (style.length > 0) {
    _M0MP319moonbit_2dcommunity7rabbita4html5Attrs9attribute(attrs, "style", _M0MPC15array5Array4joinGsE(style, new _M0TPC16string10StringView(_M0FP319moonbit_2dcommunity7rabbita4html11push__styleN7_2abindS1975, 0, _M0FP319moonbit_2dcommunity7rabbita4html11push__styleN7_2abindS1975.length)));
    return;
  } else {
    return;
  }
}
function _M0FP319moonbit_2dcommunity7rabbita4html8push__id(value, attrs) {
  if (value === undefined) {
    return;
  } else {
    const _Some = value;
    const _v = _Some;
    _M0MP319moonbit_2dcommunity7rabbita4html5Attrs9attribute(attrs, "id", _v);
    return;
  }
}
function _M0FP319moonbit_2dcommunity7rabbita4html11push__class(value, attrs) {
  if (value === undefined) {
    return;
  } else {
    const _Some = value;
    const _v = _Some;
    _M0MP319moonbit_2dcommunity7rabbita4html5Attrs9attribute(attrs, "class", _v);
    return;
  }
}
function _M0MP319moonbit_2dcommunity7rabbita4html5Attrs7handler(self, key, value) {
  _M0MPB3Map3setGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(self.handlers, key, value);
  return self;
}
function _M0MP319moonbit_2dcommunity7rabbita4html5Attrs16on__mouse__event(self, event, msg) {
  return _M0MP319moonbit_2dcommunity7rabbita4html5Attrs7handler(self, event, (event$2, scheduler) => {
    scheduler.method_table.method_0(scheduler.self, msg(_M0MPC16option6Option6unwrapGRP319moonbit_2dcommunity7rabbita3dom7ElementE(_M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom7IsEvent16to__mouse__eventGRP319moonbit_2dcommunity7rabbita3dom5EventE(event$2))));
  });
}
function _M0MP319moonbit_2dcommunity7rabbita4html5Attrs9on__click(self, msg) {
  return _M0MP319moonbit_2dcommunity7rabbita4html5Attrs16on__mouse__event(self, "click", msg);
}
function _M0FP319moonbit_2dcommunity7rabbita4html11push__click(value, attrs) {
  if (value === undefined) {
    return;
  } else {
    const _Some = value;
    const _v = _Some;
    _M0MP319moonbit_2dcommunity7rabbita4html5Attrs9on__click(attrs, (_discard_) => _v);
    return;
  }
}
function _M0MP319moonbit_2dcommunity7rabbita4html5Attrs13on__mousedown(self, msg) {
  return _M0MP319moonbit_2dcommunity7rabbita4html5Attrs16on__mouse__event(self, "mousedown", msg);
}
function _M0FP319moonbit_2dcommunity7rabbita4html15push__mousedown(value, attrs) {
  if (value === undefined) {
    return;
  } else {
    const _Some = value;
    const _v = _Some;
    _M0MP319moonbit_2dcommunity7rabbita4html5Attrs13on__mousedown(attrs, (event) => _v(event));
    return;
  }
}
function _M0MP319moonbit_2dcommunity7rabbita4html5Attrs11on__mouseup(self, msg) {
  return _M0MP319moonbit_2dcommunity7rabbita4html5Attrs16on__mouse__event(self, "mouseup", msg);
}
function _M0FP319moonbit_2dcommunity7rabbita4html13push__mouseup(value, attrs) {
  if (value === undefined) {
    return;
  } else {
    const _Some = value;
    const _v = _Some;
    _M0MP319moonbit_2dcommunity7rabbita4html5Attrs11on__mouseup(attrs, (event) => _v(event));
    return;
  }
}
function _M0MP319moonbit_2dcommunity7rabbita4html5Attrs10on__scroll(self, msg) {
  return _M0MP319moonbit_2dcommunity7rabbita4html5Attrs7handler(self, "scroll", (event, scheduler) => {
    scheduler.method_table.method_0(scheduler.self, msg(_M0MPC16option6Option6unwrapGRP319moonbit_2dcommunity7rabbita3dom7ElementE(_M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom7IsEvent13to__ui__eventGRP319moonbit_2dcommunity7rabbita3dom5EventE(event))));
  });
}
function _M0FP319moonbit_2dcommunity7rabbita4html12push__scroll(value, attrs) {
  if (value === undefined) {
    return;
  } else {
    const _Some = value;
    const _v = _Some;
    _M0MP319moonbit_2dcommunity7rabbita4html5Attrs10on__scroll(attrs, (event) => {
      const element = _M0MPC16option6Option6unwrapGRP319moonbit_2dcommunity7rabbita3dom7ElementE(_M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom13IsEventTarget11to__elementGRP319moonbit_2dcommunity7rabbita3dom11EventTargetE(_M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom7IsEvent6targetGRP319moonbit_2dcommunity7rabbita3dom7UIEventE(event)));
      return _v(element);
    });
    return;
  }
}
function _M0MP319moonbit_2dcommunity7rabbita4html5Attrs19on__keyboard__event(self, event, msg) {
  return _M0MP319moonbit_2dcommunity7rabbita4html5Attrs7handler(self, event, (event$2, scheduler) => {
    scheduler.method_table.method_0(scheduler.self, msg(_M0MPC16option6Option6unwrapGRP319moonbit_2dcommunity7rabbita3dom7ElementE(_M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom7IsEvent19to__keyboard__eventGRP319moonbit_2dcommunity7rabbita3dom5EventE(event$2))));
  });
}
function _M0MP319moonbit_2dcommunity7rabbita4html5Attrs11on__keydown(self, msg) {
  return _M0MP319moonbit_2dcommunity7rabbita4html5Attrs19on__keyboard__event(self, "keydown", msg);
}
function _M0FP319moonbit_2dcommunity7rabbita4html13push__keydown(value, attrs) {
  if (value === undefined) {
    return;
  } else {
    const _Some = value;
    const _v = _Some;
    _M0MP319moonbit_2dcommunity7rabbita4html5Attrs11on__keydown(attrs, (event) => _v(event));
    return;
  }
}
function _M0MP319moonbit_2dcommunity7rabbita4html5Attrs9on__keyup(self, msg) {
  return _M0MP319moonbit_2dcommunity7rabbita4html5Attrs19on__keyboard__event(self, "keyup", msg);
}
function _M0FP319moonbit_2dcommunity7rabbita4html11push__keyup(value, attrs) {
  if (value === undefined) {
    return;
  } else {
    const _Some = value;
    const _v = _Some;
    _M0MP319moonbit_2dcommunity7rabbita4html5Attrs9on__keyup(attrs, (event) => _v(event));
    return;
  }
}
function _M0MP319moonbit_2dcommunity7rabbita4html5Attrs8property(self, key, value) {
  _M0MPB3Map3setGsRP319moonbit_2dcommunity7rabbita7variant7VariantE(self.props, key, value);
  return self;
}
function _M0FP319moonbit_2dcommunity7rabbita4html10push__open(value, attrs) {
  if (value === -1) {
    return;
  } else {
    const _Some = value;
    const _v = _Some;
    _M0MP319moonbit_2dcommunity7rabbita4html5Attrs8property(attrs, "open", new _M0DTP319moonbit_2dcommunity7rabbita7variant7Variant7Boolean(_v));
    return;
  }
}
function _M0FP319moonbit_2dcommunity7rabbita4html22push__value__attr__int(value, attrs) {
  if (value === undefined) {
    return;
  } else {
    const _Some = value;
    const _v = _Some;
    _M0MP319moonbit_2dcommunity7rabbita4html5Attrs9attribute(attrs, "value", _M0MPC13int3Int18to__string_2einner(_v, 10));
    return;
  }
}
function _M0FP319moonbit_2dcommunity7rabbita4html25push__value__attr__string(value, attrs) {
  if (value === undefined) {
    return;
  } else {
    const _Some = value;
    const _v = _Some;
    _M0MP319moonbit_2dcommunity7rabbita4html5Attrs9attribute(attrs, "value", _v);
    return;
  }
}
function _M0FP319moonbit_2dcommunity7rabbita4html9push__src(value, attrs) {
  if (value === undefined) {
    return;
  } else {
    const _Some = value;
    const _v = _Some;
    _M0MP319moonbit_2dcommunity7rabbita4html5Attrs9attribute(attrs, "src", _v);
    return;
  }
}
function _M0FP319moonbit_2dcommunity7rabbita4html9push__alt(value, attrs) {
  if (value === undefined) {
    return;
  } else {
    const _Some = value;
    const _v = _Some;
    _M0MP319moonbit_2dcommunity7rabbita4html5Attrs9attribute(attrs, "alt", _v);
    return;
  }
}
function _M0FP319moonbit_2dcommunity7rabbita4html11push__title(value, attrs) {
  if (value === undefined) {
    return;
  } else {
    const _Some = value;
    const _v = _Some;
    _M0MP319moonbit_2dcommunity7rabbita4html5Attrs9attribute(attrs, "title", _v);
    return;
  }
}
function _M0FP319moonbit_2dcommunity7rabbita4html11push__width(value, attrs) {
  if (value === undefined) {
    return;
  } else {
    const _Some = value;
    const _v = _Some;
    _M0MP319moonbit_2dcommunity7rabbita4html5Attrs9attribute(attrs, "width", _M0MPC13int3Int18to__string_2einner(_v, 10));
    return;
  }
}
function _M0FP319moonbit_2dcommunity7rabbita4html12push__height(value, attrs) {
  if (value === undefined) {
    return;
  } else {
    const _Some = value;
    const _v = _Some;
    _M0MP319moonbit_2dcommunity7rabbita4html5Attrs9attribute(attrs, "height", _M0MPC13int3Int18to__string_2einner(_v, 10));
    return;
  }
}
function _M0FP319moonbit_2dcommunity7rabbita4html10push__name(value, attrs) {
  if (value === undefined) {
    return;
  } else {
    const _Some = value;
    const _v = _Some;
    _M0MP319moonbit_2dcommunity7rabbita4html5Attrs9attribute(attrs, "name", _v);
    return;
  }
}
function _M0FP319moonbit_2dcommunity7rabbita4html14push__disabled(value, attrs) {
  if (value === -1) {
    return;
  } else {
    const _Some = value;
    const _v = _Some;
    _M0MP319moonbit_2dcommunity7rabbita4html5Attrs8property(attrs, "disabled", new _M0DTP319moonbit_2dcommunity7rabbita7variant7Variant7Boolean(_v));
    return;
  }
}
function _M0FP319moonbit_2dcommunity7rabbita4html13push__colspan(value, attrs) {
  if (value === undefined) {
    return;
  } else {
    const _Some = value;
    const _v = _Some;
    _M0MP319moonbit_2dcommunity7rabbita4html5Attrs9attribute(attrs, "colspan", _M0MPC13int3Int18to__string_2einner(_v, 10));
    return;
  }
}
function _M0FP319moonbit_2dcommunity7rabbita4html13push__rowspan(value, attrs) {
  if (value === undefined) {
    return;
  } else {
    const _Some = value;
    const _v = _Some;
    _M0MP319moonbit_2dcommunity7rabbita4html5Attrs9attribute(attrs, "rowspan", _M0MPC13int3Int18to__string_2einner(_v, 10));
    return;
  }
}
function _M0FP319moonbit_2dcommunity7rabbita4html13push__headers(value, attrs) {
  if (value === undefined) {
    return;
  } else {
    const _Some = value;
    const _v = _Some;
    _M0MP319moonbit_2dcommunity7rabbita4html5Attrs9attribute(attrs, "headers", _v);
    return;
  }
}
function _M0FP319moonbit_2dcommunity7rabbita4html10push__abbr(value, attrs) {
  if (value === undefined) {
    return;
  } else {
    const _Some = value;
    const _v = _Some;
    _M0MP319moonbit_2dcommunity7rabbita4html5Attrs9attribute(attrs, "abbr", _v);
    return;
  }
}
function _M0FP319moonbit_2dcommunity7rabbita4html11push__scope(value, attrs) {
  if (value === undefined) {
    return;
  } else {
    const _Some = value;
    const _scope = _Some;
    let s;
    switch (_scope) {
      case 0: {
        s = "row";
        break;
      }
      case 1: {
        s = "col";
        break;
      }
      case 2: {
        s = "rowgroup";
        break;
      }
      default: {
        s = "colgroup";
      }
    }
    _M0MP319moonbit_2dcommunity7rabbita4html5Attrs9attribute(attrs, "scope", s);
    return;
  }
}
function _M0FP319moonbit_2dcommunity7rabbita4html12push__hidden(value, attrs) {
  if (value === -1) {
    return;
  } else {
    const _Some = value;
    const _v = _Some;
    _M0MP319moonbit_2dcommunity7rabbita4html5Attrs8property(attrs, "hidden", new _M0DTP319moonbit_2dcommunity7rabbita7variant7Variant7Boolean(_v));
    return;
  }
}
function _M0FP319moonbit_2dcommunity7rabbita4html9push__rel(value, attrs) {
  if (value === undefined) {
    return;
  } else {
    const _Some = value;
    const _v = _Some;
    _M0MP319moonbit_2dcommunity7rabbita4html5Attrs9attribute(attrs, "rel", _v);
    return;
  }
}
function _M0FP319moonbit_2dcommunity7rabbita4html14push__download(value, attrs) {
  if (value === undefined) {
    return;
  } else {
    const _Some = value;
    const _v = _Some;
    _M0MP319moonbit_2dcommunity7rabbita4html5Attrs9attribute(attrs, "download", _v);
    return;
  }
}
function _M0FP319moonbit_2dcommunity7rabbita4html11push__sizes(value, attrs) {
  if (value === undefined) {
    return;
  } else {
    const _Some = value;
    const _v = _Some;
    _M0MP319moonbit_2dcommunity7rabbita4html5Attrs9attribute(attrs, "sizes", _v);
    return;
  }
}
function _M0FP319moonbit_2dcommunity7rabbita4html10push__type(value, attrs) {
  if (value === undefined) {
    return;
  } else {
    const _Some = value;
    const _v = _Some;
    _M0MP319moonbit_2dcommunity7rabbita4html5Attrs9attribute(attrs, "type", _v);
    return;
  }
}
function _M0FP319moonbit_2dcommunity7rabbita4html15push__autofocus(value, attrs) {
  if (value === -1) {
    return;
  } else {
    const _Some = value;
    const _v = _Some;
    _M0MP319moonbit_2dcommunity7rabbita4html5Attrs8property(attrs, "autofocus", new _M0DTP319moonbit_2dcommunity7rabbita7variant7Variant7Boolean(_v));
    return;
  }
}
function _M0FP319moonbit_2dcommunity7rabbita4html12push__srcset(value, attrs) {
  if (value === undefined) {
    return;
  } else {
    const _Some = value;
    const _v = _Some;
    _M0MP319moonbit_2dcommunity7rabbita4html5Attrs9attribute(attrs, "srcset", _v);
    return;
  }
}
function _M0FP319moonbit_2dcommunity7rabbita4html13push__loading(value, attrs) {
  if (value === undefined) {
    return;
  } else {
    const _Some = value;
    const _v = _Some;
    _M0MP319moonbit_2dcommunity7rabbita4html5Attrs9attribute(attrs, "loading", _v);
    return;
  }
}
function _M0FP319moonbit_2dcommunity7rabbita4html14push__decoding(value, attrs) {
  if (value === undefined) {
    return;
  } else {
    const _Some = value;
    const _v = _Some;
    _M0MP319moonbit_2dcommunity7rabbita4html5Attrs9attribute(attrs, "decoding", _v);
    return;
  }
}
function _M0FP319moonbit_2dcommunity7rabbita4html4nodeGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(tag, attrs, children) {
  const props = attrs;
  const _p$2 = _M0IPC15array5ArrayP319moonbit_2dcommunity7rabbita4html10IsChildren12to__children(children);
  const _p$3 = undefined;
  return new _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime5VNode4Elem(tag, props, _p$2, _p$3);
}
function _M0FP319moonbit_2dcommunity7rabbita4html4nodeGRP319moonbit_2dcommunity7rabbita4html4HtmlE(tag, attrs, children) {
  const props = attrs;
  const _p$2 = new _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime8ChildrenGRP419moonbit_2dcommunity7rabbita8internal7runtime5VNodeE5Array([children]);
  const _p$3 = undefined;
  return new _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime5VNode4Elem(tag, props, _p$2, _p$3);
}
function _M0FP319moonbit_2dcommunity7rabbita4html4nodeGsE(tag, attrs, children) {
  const props = attrs;
  const _p$2 = _M0IPC16string6StringP319moonbit_2dcommunity7rabbita4html10IsChildren12to__children(children);
  const _p$3 = undefined;
  return new _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime5VNode4Elem(tag, props, _p$2, _p$3);
}
function _M0MP319moonbit_2dcommunity7rabbita4html5Attrs5build() {
  const _bind = [];
  const _tmp = _M0MPB3Map3MapGssE(new _M0TPB9ArrayViewGUssEE(_bind, 0, 0), undefined);
  const _bind$2 = [];
  const _tmp$2 = _M0MPB3Map3MapGsRP319moonbit_2dcommunity7rabbita7variant7VariantE(new _M0TPB9ArrayViewGUsRP319moonbit_2dcommunity7rabbita7variant7VariantEE(_bind$2, 0, 0), undefined);
  const _bind$3 = [];
  const _tmp$3 = _M0MPB3Map3MapGssE(new _M0TPB9ArrayViewGUssEE(_bind$3, 0, 0), undefined);
  const _bind$4 = [];
  return _M0MP419moonbit_2dcommunity7rabbita8internal7runtime5Props3new(_tmp, _tmp$2, _tmp$3, _M0MPB3Map3MapGsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuE(new _M0TPB9ArrayViewGUsWRP319moonbit_2dcommunity7rabbita3dom5EventRP419moonbit_2dcommunity7rabbita8internal7runtime9SchedulerEuEE(_bind$4, 0, 0), undefined));
}
function _M0MP319moonbit_2dcommunity7rabbita4html5Attrs4copy(self) {
  return _M0MP419moonbit_2dcommunity7rabbita8internal7runtime5Props4copy(self);
}
function _M0FP319moonbit_2dcommunity7rabbita4html14resolve__attrs(attrs) {
  if (attrs === undefined) {
    return _M0MP319moonbit_2dcommunity7rabbita4html5Attrs5build();
  } else {
    const _Some = attrs;
    const _a = _Some;
    return _M0MP319moonbit_2dcommunity7rabbita4html5Attrs4copy(_a);
  }
}
function _M0FP319moonbit_2dcommunity7rabbita4html14button_2einnerGsE(style, id, class_, title, hidden, type_, disabled, name, value, autofocus, on_click, attrs, children) {
  const attrs$2 = _M0FP319moonbit_2dcommunity7rabbita4html14resolve__attrs(attrs);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__title(title, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html12push__hidden(hidden, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html10push__type(type_, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html14push__disabled(disabled, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html10push__name(name, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html25push__value__attr__string(value, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html15push__autofocus(autofocus, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__click(on_click, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__style(style, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__class(class_, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html8push__id(id, attrs$2);
  return _M0FP319moonbit_2dcommunity7rabbita4html4nodeGsE("button", attrs$2, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html6buttonGsE(style$46$opt, id, class_, title, hidden, type_, disabled, name, value, autofocus, on_click, attrs, children) {
  let style;
  if (style$46$opt.$tag === 1) {
    const _Some = style$46$opt;
    style = _Some._0;
  } else {
    style = [];
  }
  return _M0FP319moonbit_2dcommunity7rabbita4html14button_2einnerGsE(style, id, class_, title, hidden, type_, disabled, name, value, autofocus, on_click, attrs, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html10h2_2einnerGsE(style, id, class_, title, hidden, attrs, children) {
  const attrs$2 = _M0FP319moonbit_2dcommunity7rabbita4html14resolve__attrs(attrs);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__title(title, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html12push__hidden(hidden, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__style(style, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__class(class_, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html8push__id(id, attrs$2);
  return _M0FP319moonbit_2dcommunity7rabbita4html4nodeGsE("h2", attrs$2, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html2h2GsE(style$46$opt, id, class_, title, hidden, attrs, children) {
  let style;
  if (style$46$opt.$tag === 1) {
    const _Some = style$46$opt;
    style = _Some._0;
  } else {
    style = [];
  }
  return _M0FP319moonbit_2dcommunity7rabbita4html10h2_2einnerGsE(style, id, class_, title, hidden, attrs, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html10h3_2einnerGsE(style, id, class_, title, hidden, attrs, children) {
  const attrs$2 = _M0FP319moonbit_2dcommunity7rabbita4html14resolve__attrs(attrs);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__title(title, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html12push__hidden(hidden, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__style(style, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__class(class_, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html8push__id(id, attrs$2);
  return _M0FP319moonbit_2dcommunity7rabbita4html4nodeGsE("h3", attrs$2, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html2h3GsE(style$46$opt, id, class_, title, hidden, attrs, children) {
  let style;
  if (style$46$opt.$tag === 1) {
    const _Some = style$46$opt;
    style = _Some._0;
  } else {
    style = [];
  }
  return _M0FP319moonbit_2dcommunity7rabbita4html10h3_2einnerGsE(style, id, class_, title, hidden, attrs, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html11div_2einnerGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style, id, class_, title, hidden, on_click, on_mousedown, on_mouseup, on_scroll, on_keydown, on_keyup, attrs, children) {
  const attrs$2 = _M0FP319moonbit_2dcommunity7rabbita4html14resolve__attrs(attrs);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__title(title, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html12push__hidden(hidden, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__click(on_click, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html15push__mousedown(on_mousedown, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html13push__mouseup(on_mouseup, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html12push__scroll(on_scroll, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html13push__keydown(on_keydown, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__keyup(on_keyup, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__style(style, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__class(class_, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html8push__id(id, attrs$2);
  return _M0FP319moonbit_2dcommunity7rabbita4html4nodeGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE("div", attrs$2, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html11div_2einnerGsE(style, id, class_, title, hidden, on_click, on_mousedown, on_mouseup, on_scroll, on_keydown, on_keyup, attrs, children) {
  const attrs$2 = _M0FP319moonbit_2dcommunity7rabbita4html14resolve__attrs(attrs);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__title(title, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html12push__hidden(hidden, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__click(on_click, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html15push__mousedown(on_mousedown, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html13push__mouseup(on_mouseup, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html12push__scroll(on_scroll, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html13push__keydown(on_keydown, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__keyup(on_keyup, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__style(style, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__class(class_, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html8push__id(id, attrs$2);
  return _M0FP319moonbit_2dcommunity7rabbita4html4nodeGsE("div", attrs$2, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style$46$opt, id, class_, title, hidden, on_click, on_mousedown, on_mouseup, on_scroll, on_keydown, on_keyup, attrs, children) {
  let style;
  if (style$46$opt.$tag === 1) {
    const _Some = style$46$opt;
    style = _Some._0;
  } else {
    style = [];
  }
  return _M0FP319moonbit_2dcommunity7rabbita4html11div_2einnerGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style, id, class_, title, hidden, on_click, on_mousedown, on_mouseup, on_scroll, on_keydown, on_keyup, attrs, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html3divGsE(style$46$opt, id, class_, title, hidden, on_click, on_mousedown, on_mouseup, on_scroll, on_keydown, on_keyup, attrs, children) {
  let style;
  if (style$46$opt.$tag === 1) {
    const _Some = style$46$opt;
    style = _Some._0;
  } else {
    style = [];
  }
  return _M0FP319moonbit_2dcommunity7rabbita4html11div_2einnerGsE(style, id, class_, title, hidden, on_click, on_mousedown, on_mouseup, on_scroll, on_keydown, on_keyup, attrs, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html9p_2einnerGsE(style, id, class_, title, hidden, attrs, children) {
  const attrs$2 = _M0FP319moonbit_2dcommunity7rabbita4html14resolve__attrs(attrs);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__title(title, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html12push__hidden(hidden, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__style(style, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__class(class_, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html8push__id(id, attrs$2);
  return _M0FP319moonbit_2dcommunity7rabbita4html4nodeGsE("p", attrs$2, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html1pGsE(style$46$opt, id, class_, title, hidden, attrs, children) {
  let style;
  if (style$46$opt.$tag === 1) {
    const _Some = style$46$opt;
    style = _Some._0;
  } else {
    style = [];
  }
  return _M0FP319moonbit_2dcommunity7rabbita4html9p_2einnerGsE(style, id, class_, title, hidden, attrs, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html15section_2einnerGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style, id, class_, title, hidden, attrs, children) {
  const attrs$2 = _M0FP319moonbit_2dcommunity7rabbita4html14resolve__attrs(attrs);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__title(title, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html12push__hidden(hidden, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__style(style, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__class(class_, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html8push__id(id, attrs$2);
  return _M0FP319moonbit_2dcommunity7rabbita4html4nodeGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE("section", attrs$2, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html7sectionGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style$46$opt, id, class_, title, hidden, attrs, children) {
  let style;
  if (style$46$opt.$tag === 1) {
    const _Some = style$46$opt;
    style = _Some._0;
  } else {
    style = [];
  }
  return _M0FP319moonbit_2dcommunity7rabbita4html15section_2einnerGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style, id, class_, title, hidden, attrs, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html14header_2einnerGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style, id, class_, title, hidden, attrs, children) {
  const attrs$2 = _M0FP319moonbit_2dcommunity7rabbita4html14resolve__attrs(attrs);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__title(title, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html12push__hidden(hidden, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__style(style, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__class(class_, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html8push__id(id, attrs$2);
  return _M0FP319moonbit_2dcommunity7rabbita4html4nodeGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE("header", attrs$2, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html6headerGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style$46$opt, id, class_, title, hidden, attrs, children) {
  let style;
  if (style$46$opt.$tag === 1) {
    const _Some = style$46$opt;
    style = _Some._0;
  } else {
    style = [];
  }
  return _M0FP319moonbit_2dcommunity7rabbita4html14header_2einnerGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style, id, class_, title, hidden, attrs, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html14footer_2einnerGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style, id, class_, title, hidden, attrs, children) {
  const attrs$2 = _M0FP319moonbit_2dcommunity7rabbita4html14resolve__attrs(attrs);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__title(title, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html12push__hidden(hidden, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__style(style, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__class(class_, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html8push__id(id, attrs$2);
  return _M0FP319moonbit_2dcommunity7rabbita4html4nodeGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE("footer", attrs$2, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html6footerGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style$46$opt, id, class_, title, hidden, attrs, children) {
  let style;
  if (style$46$opt.$tag === 1) {
    const _Some = style$46$opt;
    style = _Some._0;
  } else {
    style = [];
  }
  return _M0FP319moonbit_2dcommunity7rabbita4html14footer_2einnerGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style, id, class_, title, hidden, attrs, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html11nav_2einnerGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style, id, class_, title, hidden, attrs, children) {
  const attrs$2 = _M0FP319moonbit_2dcommunity7rabbita4html14resolve__attrs(attrs);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__title(title, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html12push__hidden(hidden, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__style(style, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__class(class_, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html8push__id(id, attrs$2);
  return _M0FP319moonbit_2dcommunity7rabbita4html4nodeGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE("nav", attrs$2, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html3navGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style$46$opt, id, class_, title, hidden, attrs, children) {
  let style;
  if (style$46$opt.$tag === 1) {
    const _Some = style$46$opt;
    style = _Some._0;
  } else {
    style = [];
  }
  return _M0FP319moonbit_2dcommunity7rabbita4html11nav_2einnerGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style, id, class_, title, hidden, attrs, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html14main___2einnerGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style, id, class_, title, hidden, attrs, children) {
  const attrs$2 = _M0FP319moonbit_2dcommunity7rabbita4html14resolve__attrs(attrs);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__title(title, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html12push__hidden(hidden, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__style(style, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__class(class_, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html8push__id(id, attrs$2);
  return _M0FP319moonbit_2dcommunity7rabbita4html4nodeGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE("main", attrs$2, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html6main__GRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style$46$opt, id, class_, title, hidden, attrs, children) {
  let style;
  if (style$46$opt.$tag === 1) {
    const _Some = style$46$opt;
    style = _Some._0;
  } else {
    style = [];
  }
  return _M0FP319moonbit_2dcommunity7rabbita4html14main___2einnerGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style, id, class_, title, hidden, attrs, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html15article_2einnerGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style, id, class_, title, hidden, attrs, children) {
  const attrs$2 = _M0FP319moonbit_2dcommunity7rabbita4html14resolve__attrs(attrs);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__title(title, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html12push__hidden(hidden, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__style(style, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__class(class_, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html8push__id(id, attrs$2);
  return _M0FP319moonbit_2dcommunity7rabbita4html4nodeGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE("article", attrs$2, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html7articleGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style$46$opt, id, class_, title, hidden, attrs, children) {
  let style;
  if (style$46$opt.$tag === 1) {
    const _Some = style$46$opt;
    style = _Some._0;
  } else {
    style = [];
  }
  return _M0FP319moonbit_2dcommunity7rabbita4html15article_2einnerGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style, id, class_, title, hidden, attrs, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html15details_2einnerGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style, id, class_, title, hidden, open, attrs, children) {
  const attrs$2 = _M0FP319moonbit_2dcommunity7rabbita4html14resolve__attrs(attrs);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__title(title, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html12push__hidden(hidden, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html10push__open(open, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__style(style, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__class(class_, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html8push__id(id, attrs$2);
  return _M0FP319moonbit_2dcommunity7rabbita4html4nodeGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE("details", attrs$2, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html7detailsGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style$46$opt, id, class_, title, hidden, open, attrs, children) {
  let style;
  if (style$46$opt.$tag === 1) {
    const _Some = style$46$opt;
    style = _Some._0;
  } else {
    style = [];
  }
  return _M0FP319moonbit_2dcommunity7rabbita4html15details_2einnerGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style, id, class_, title, hidden, open, attrs, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html15summary_2einnerGsE(style, id, class_, title, hidden, attrs, children) {
  const attrs$2 = _M0FP319moonbit_2dcommunity7rabbita4html14resolve__attrs(attrs);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__title(title, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html12push__hidden(hidden, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__style(style, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__class(class_, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html8push__id(id, attrs$2);
  return _M0FP319moonbit_2dcommunity7rabbita4html4nodeGsE("summary", attrs$2, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html7summaryGsE(style$46$opt, id, class_, title, hidden, attrs, children) {
  let style;
  if (style$46$opt.$tag === 1) {
    const _Some = style$46$opt;
    style = _Some._0;
  } else {
    style = [];
  }
  return _M0FP319moonbit_2dcommunity7rabbita4html15summary_2einnerGsE(style, id, class_, title, hidden, attrs, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html12span_2einnerGsE(style, id, class_, title, hidden, attrs, children) {
  const attrs$2 = _M0FP319moonbit_2dcommunity7rabbita4html14resolve__attrs(attrs);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__title(title, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html12push__hidden(hidden, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__style(style, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__class(class_, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html8push__id(id, attrs$2);
  return _M0FP319moonbit_2dcommunity7rabbita4html4nodeGsE("span", attrs$2, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html4spanGsE(style$46$opt, id, class_, title, hidden, attrs, children) {
  let style;
  if (style$46$opt.$tag === 1) {
    const _Some = style$46$opt;
    style = _Some._0;
  } else {
    style = [];
  }
  return _M0FP319moonbit_2dcommunity7rabbita4html12span_2einnerGsE(style, id, class_, title, hidden, attrs, children);
}
function _M0MP319moonbit_2dcommunity7rabbita4html6Target10to__string(self) {
  if (self === 0) {
    return "_self";
  } else {
    return "_blank";
  }
}
function _M0MP319moonbit_2dcommunity7rabbita4html5Attrs6target(self, value) {
  return _M0MP319moonbit_2dcommunity7rabbita4html5Attrs9attribute(self, "target", _M0MP319moonbit_2dcommunity7rabbita4html6Target10to__string(value));
}
function _M0FP319moonbit_2dcommunity7rabbita4html9a_2einnerGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style, id, class_, title, hidden, href, target, rel, download, attrs, children, escape) {
  const attrs$2 = _M0FP319moonbit_2dcommunity7rabbita4html14resolve__attrs(attrs);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__title(title, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html12push__hidden(hidden, attrs$2);
  _M0MP319moonbit_2dcommunity7rabbita4html5Attrs9attribute(attrs$2, "href", href);
  _M0MP319moonbit_2dcommunity7rabbita4html5Attrs6target(attrs$2, target);
  _M0FP319moonbit_2dcommunity7rabbita4html9push__rel(rel, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html14push__download(download, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__style(style, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__class(class_, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html8push__id(id, attrs$2);
  return _M0MP419moonbit_2dcommunity7rabbita8internal7runtime5VNode12link_2einner(attrs$2, _M0IPC15array5ArrayP319moonbit_2dcommunity7rabbita4html10IsChildren12to__children(children), escape);
}
function _M0FP319moonbit_2dcommunity7rabbita4html9a_2einnerGsE(style, id, class_, title, hidden, href, target, rel, download, attrs, children, escape) {
  const attrs$2 = _M0FP319moonbit_2dcommunity7rabbita4html14resolve__attrs(attrs);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__title(title, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html12push__hidden(hidden, attrs$2);
  _M0MP319moonbit_2dcommunity7rabbita4html5Attrs9attribute(attrs$2, "href", href);
  _M0MP319moonbit_2dcommunity7rabbita4html5Attrs6target(attrs$2, target);
  _M0FP319moonbit_2dcommunity7rabbita4html9push__rel(rel, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html14push__download(download, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__style(style, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__class(class_, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html8push__id(id, attrs$2);
  return _M0MP419moonbit_2dcommunity7rabbita8internal7runtime5VNode12link_2einner(attrs$2, _M0IPC16string6StringP319moonbit_2dcommunity7rabbita4html10IsChildren12to__children(children), escape);
}
function _M0FP319moonbit_2dcommunity7rabbita4html1aGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style$46$opt, id, class_, title, hidden, href, target$46$opt, rel, download, attrs, children, escape$46$opt) {
  let style;
  if (style$46$opt.$tag === 1) {
    const _Some = style$46$opt;
    style = _Some._0;
  } else {
    style = [];
  }
  let target;
  if (target$46$opt === undefined) {
    target = 0;
  } else {
    const _Some = target$46$opt;
    target = _Some;
  }
  const escape = escape$46$opt === -1 ? false : escape$46$opt;
  return _M0FP319moonbit_2dcommunity7rabbita4html9a_2einnerGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style, id, class_, title, hidden, href, target, rel, download, attrs, children, escape);
}
function _M0FP319moonbit_2dcommunity7rabbita4html1aGsE(style$46$opt, id, class_, title, hidden, href, target$46$opt, rel, download, attrs, children, escape$46$opt) {
  let style;
  if (style$46$opt.$tag === 1) {
    const _Some = style$46$opt;
    style = _Some._0;
  } else {
    style = [];
  }
  let target;
  if (target$46$opt === undefined) {
    target = 0;
  } else {
    const _Some = target$46$opt;
    target = _Some;
  }
  const escape = escape$46$opt === -1 ? false : escape$46$opt;
  return _M0FP319moonbit_2dcommunity7rabbita4html9a_2einnerGsE(style, id, class_, title, hidden, href, target, rel, download, attrs, children, escape);
}
function _M0FP319moonbit_2dcommunity7rabbita4html14strong_2einnerGsE(style, id, class_, title, hidden, attrs, children) {
  const attrs$2 = _M0FP319moonbit_2dcommunity7rabbita4html14resolve__attrs(attrs);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__title(title, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html12push__hidden(hidden, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__style(style, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__class(class_, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html8push__id(id, attrs$2);
  return _M0FP319moonbit_2dcommunity7rabbita4html4nodeGsE("strong", attrs$2, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html6strongGsE(style$46$opt, id, class_, title, hidden, attrs, children) {
  let style;
  if (style$46$opt.$tag === 1) {
    const _Some = style$46$opt;
    style = _Some._0;
  } else {
    style = [];
  }
  return _M0FP319moonbit_2dcommunity7rabbita4html14strong_2einnerGsE(style, id, class_, title, hidden, attrs, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html4text(str) {
  return new _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime5VNode4Text(str);
}
function _M0FP319moonbit_2dcommunity7rabbita4html10ul_2einnerGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style, id, class_, title, hidden, on_click, attrs, children) {
  const attrs$2 = _M0FP319moonbit_2dcommunity7rabbita4html14resolve__attrs(attrs);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__title(title, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html12push__hidden(hidden, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__click(on_click, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__style(style, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__class(class_, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html8push__id(id, attrs$2);
  return _M0FP319moonbit_2dcommunity7rabbita4html4nodeGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE("ul", attrs$2, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html2ulGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style$46$opt, id, class_, title, hidden, on_click, attrs, children) {
  let style;
  if (style$46$opt.$tag === 1) {
    const _Some = style$46$opt;
    style = _Some._0;
  } else {
    style = [];
  }
  return _M0FP319moonbit_2dcommunity7rabbita4html10ul_2einnerGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style, id, class_, title, hidden, on_click, attrs, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html10li_2einnerGsE(style, value, id, class_, title, hidden, on_click, attrs, children) {
  const attrs$2 = _M0FP319moonbit_2dcommunity7rabbita4html14resolve__attrs(attrs);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__title(title, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html12push__hidden(hidden, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__click(on_click, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html22push__value__attr__int(value, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__style(style, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__class(class_, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html8push__id(id, attrs$2);
  return _M0FP319moonbit_2dcommunity7rabbita4html4nodeGsE("li", attrs$2, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html2liGsE(style$46$opt, value, id, class_, title, hidden, on_click, attrs, children) {
  let style;
  if (style$46$opt.$tag === 1) {
    const _Some = style$46$opt;
    style = _Some._0;
  } else {
    style = [];
  }
  return _M0FP319moonbit_2dcommunity7rabbita4html10li_2einnerGsE(style, value, id, class_, title, hidden, on_click, attrs, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html11img_2einnerGRP319moonbit_2dcommunity7rabbita4html4HtmlE(style, id, class_, hidden, src, alt, title, width, height, srcset, sizes, loading, decoding, attrs, children) {
  const attrs$2 = _M0FP319moonbit_2dcommunity7rabbita4html14resolve__attrs(attrs);
  _M0FP319moonbit_2dcommunity7rabbita4html12push__hidden(hidden, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html9push__src(src, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html9push__alt(alt, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__title(title, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__width(width, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html12push__height(height, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html12push__srcset(srcset, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__sizes(sizes, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html13push__loading(loading, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html14push__decoding(decoding, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__style(style, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__class(class_, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html8push__id(id, attrs$2);
  return _M0FP319moonbit_2dcommunity7rabbita4html4nodeGRP319moonbit_2dcommunity7rabbita4html4HtmlE("img", attrs$2, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html3imgGRP319moonbit_2dcommunity7rabbita4html4HtmlE(style$46$opt, id, class_, hidden, src, alt, title, width, height, srcset, sizes, loading, decoding, attrs, children) {
  let style;
  if (style$46$opt.$tag === 1) {
    const _Some = style$46$opt;
    style = _Some._0;
  } else {
    style = [];
  }
  return _M0FP319moonbit_2dcommunity7rabbita4html11img_2einnerGRP319moonbit_2dcommunity7rabbita4html4HtmlE(style, id, class_, hidden, src, alt, title, width, height, srcset, sizes, loading, decoding, attrs, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html13table_2einnerGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style, id, class_, title, hidden, attrs, children) {
  const attrs$2 = _M0FP319moonbit_2dcommunity7rabbita4html14resolve__attrs(attrs);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__title(title, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html12push__hidden(hidden, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__style(style, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__class(class_, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html8push__id(id, attrs$2);
  return _M0FP319moonbit_2dcommunity7rabbita4html4nodeGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE("table", attrs$2, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html5tableGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style$46$opt, id, class_, title, hidden, attrs, children) {
  let style;
  if (style$46$opt.$tag === 1) {
    const _Some = style$46$opt;
    style = _Some._0;
  } else {
    style = [];
  }
  return _M0FP319moonbit_2dcommunity7rabbita4html13table_2einnerGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style, id, class_, title, hidden, attrs, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html13thead_2einnerGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style, id, class_, title, hidden, attrs, children) {
  const attrs$2 = _M0FP319moonbit_2dcommunity7rabbita4html14resolve__attrs(attrs);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__title(title, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html12push__hidden(hidden, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__style(style, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__class(class_, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html8push__id(id, attrs$2);
  return _M0FP319moonbit_2dcommunity7rabbita4html4nodeGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE("thead", attrs$2, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html5theadGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style$46$opt, id, class_, title, hidden, attrs, children) {
  let style;
  if (style$46$opt.$tag === 1) {
    const _Some = style$46$opt;
    style = _Some._0;
  } else {
    style = [];
  }
  return _M0FP319moonbit_2dcommunity7rabbita4html13thead_2einnerGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style, id, class_, title, hidden, attrs, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html13tbody_2einnerGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style, id, class_, title, hidden, attrs, children) {
  const attrs$2 = _M0FP319moonbit_2dcommunity7rabbita4html14resolve__attrs(attrs);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__title(title, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html12push__hidden(hidden, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__style(style, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__class(class_, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html8push__id(id, attrs$2);
  return _M0FP319moonbit_2dcommunity7rabbita4html4nodeGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE("tbody", attrs$2, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html5tbodyGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style$46$opt, id, class_, title, hidden, attrs, children) {
  let style;
  if (style$46$opt.$tag === 1) {
    const _Some = style$46$opt;
    style = _Some._0;
  } else {
    style = [];
  }
  return _M0FP319moonbit_2dcommunity7rabbita4html13tbody_2einnerGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style, id, class_, title, hidden, attrs, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html10tr_2einnerGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style, id, class_, title, hidden, attrs, children) {
  const attrs$2 = _M0FP319moonbit_2dcommunity7rabbita4html14resolve__attrs(attrs);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__title(title, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html12push__hidden(hidden, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__style(style, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__class(class_, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html8push__id(id, attrs$2);
  return _M0FP319moonbit_2dcommunity7rabbita4html4nodeGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE("tr", attrs$2, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html2trGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style$46$opt, id, class_, title, hidden, attrs, children) {
  let style;
  if (style$46$opt.$tag === 1) {
    const _Some = style$46$opt;
    style = _Some._0;
  } else {
    style = [];
  }
  return _M0FP319moonbit_2dcommunity7rabbita4html10tr_2einnerGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(style, id, class_, title, hidden, attrs, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html10td_2einnerGsE(style, id, colspan, rowspan, headers, class_, title, hidden, attrs, children) {
  const attrs$2 = _M0FP319moonbit_2dcommunity7rabbita4html14resolve__attrs(attrs);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__title(title, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html12push__hidden(hidden, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html13push__colspan(colspan, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html13push__rowspan(rowspan, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html13push__headers(headers, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__style(style, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__class(class_, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html8push__id(id, attrs$2);
  return _M0FP319moonbit_2dcommunity7rabbita4html4nodeGsE("td", attrs$2, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html2tdGsE(style$46$opt, id, colspan, rowspan, headers, class_, title, hidden, attrs, children) {
  let style;
  if (style$46$opt.$tag === 1) {
    const _Some = style$46$opt;
    style = _Some._0;
  } else {
    style = [];
  }
  return _M0FP319moonbit_2dcommunity7rabbita4html10td_2einnerGsE(style, id, colspan, rowspan, headers, class_, title, hidden, attrs, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html10th_2einnerGsE(style, id, abbr, colspan, rowspan, headers, scope, class_, title, hidden, attrs, children) {
  const attrs$2 = _M0FP319moonbit_2dcommunity7rabbita4html14resolve__attrs(attrs);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__title(title, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html12push__hidden(hidden, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html13push__colspan(colspan, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html13push__rowspan(rowspan, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html13push__headers(headers, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html10push__abbr(abbr, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__scope(scope, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__style(style, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html11push__class(class_, attrs$2);
  _M0FP319moonbit_2dcommunity7rabbita4html8push__id(id, attrs$2);
  return _M0FP319moonbit_2dcommunity7rabbita4html4nodeGsE("th", attrs$2, children);
}
function _M0FP319moonbit_2dcommunity7rabbita4html2thGsE(style$46$opt, id, abbr, colspan, rowspan, headers, scope, class_, title, hidden, attrs, children) {
  let style;
  if (style$46$opt.$tag === 1) {
    const _Some = style$46$opt;
    style = _Some._0;
  } else {
    style = [];
  }
  return _M0FP319moonbit_2dcommunity7rabbita4html10th_2einnerGsE(style, id, abbr, colspan, rowspan, headers, scope, class_, title, hidden, attrs, children);
}
function _M0IPC16string6StringP319moonbit_2dcommunity7rabbita4html10IsChildren12to__children(str) {
  return new _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime8ChildrenGRP419moonbit_2dcommunity7rabbita8internal7runtime5VNodeE5Array([_M0FP319moonbit_2dcommunity7rabbita4html4text(str)]);
}
function _M0IPC15array5ArrayP319moonbit_2dcommunity7rabbita4html10IsChildren12to__children(self) {
  const _p$2 = new Array(self.length);
  const _p$3 = self.length;
  let _tmp = 0;
  while (true) {
    const _p$4 = _tmp;
    if (_p$4 < _p$3) {
      const _p$5 = self[_p$4];
      _p$2[_p$4] = _p$5;
      _tmp = _p$4 + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime8ChildrenGRP419moonbit_2dcommunity7rabbita8internal7runtime5VNodeE5Array(_p$2);
}
function _M0FP219moonbit_2dcommunity7rabbita3new(root) {
  const sandbox = _M0MP419moonbit_2dcommunity7rabbita8internal7runtime7Sandbox3new(root);
  return new _M0TP219moonbit_2dcommunity7rabbita3App(sandbox, undefined);
}
function _M0MP219moonbit_2dcommunity7rabbita3App30trigger__initial__url__changed(self) {
  const _bind = self.sandbox.on_url_changed;
  if (_bind === undefined) {
    return;
  } else {
    let _bind$2;
    let _try_err;
    _L: {
      _L$2: {
        const _bind$3 = _M0FP319moonbit_2dcommunity7rabbita3url5parse(_M0MP319moonbit_2dcommunity7rabbita3dom6Window12current__url(_M0FP319moonbit_2dcommunity7rabbita3dom6window()));
        let _tmp;
        if (_bind$3.$tag === 1) {
          const _ok = _bind$3;
          _tmp = _ok._0;
        } else {
          const _err = _bind$3;
          _try_err = _err._0;
          break _L$2;
        }
        _bind$2 = new _M0DTPC16result6ResultGRP319moonbit_2dcommunity7rabbita3url3UrlRPC15error5ErrorE2Ok(_tmp);
        break _L;
      }
      _bind$2 = new _M0DTPC16result6ResultGRP319moonbit_2dcommunity7rabbita3url3UrlRPC15error5ErrorE3Err(_try_err);
    }
    if (_bind$2.$tag === 1) {
      const _Ok = _bind$2;
      const _url = _Ok._0;
      _M0IP419moonbit_2dcommunity7rabbita8internal7runtime7SandboxP419moonbit_2dcommunity7rabbita8internal7runtime9Scheduler17add__url__changed(self.sandbox, _url);
      return;
    } else {
      $panic();
      return;
    }
  }
}
function _M0MP219moonbit_2dcommunity7rabbita3App5mount(self, element_id) {
  self.sandbox.mount = element_id;
  _M0MP219moonbit_2dcommunity7rabbita3App30trigger__initial__url__changed(self);
  _M0IP016_24default__implP319moonbit_2dcommunity7rabbita3dom9IsElement16set__inner__htmlGRP319moonbit_2dcommunity7rabbita3dom7ElementE(_M0MP319moonbit_2dcommunity7rabbita2js8Nullable6unwrapGRP319moonbit_2dcommunity7rabbita3dom7ElementE(_M0MP319moonbit_2dcommunity7rabbita3dom8Document20get__element__by__id(_M0FP319moonbit_2dcommunity7rabbita3dom8document(), element_id)), "<div></div>");
  const _bind = self.init_cmd;
  if (_bind === undefined) {
  } else {
    const _Some = _bind;
    const _cmd = _Some;
    _M0IP419moonbit_2dcommunity7rabbita8internal7runtime7SandboxP419moonbit_2dcommunity7rabbita8internal7runtime9Scheduler3add(self.sandbox, _cmd);
    self.init_cmd = undefined;
  }
  _M0MP419moonbit_2dcommunity7rabbita8internal7runtime7Sandbox10initialize(self.sandbox);
  _M0MP419moonbit_2dcommunity7rabbita8internal7runtime7Sandbox5flush(self.sandbox);
}
function _M0IP219moonbit_2dcommunity7rabbita9TypedCellP419moonbit_2dcommunity7rabbita8internal7runtime6IsCell4stepGRP38zongen0116mgpic2026_2dsite4main5ModelRP38zongen0116mgpic2026_2dsite4main3MsgE(self, scheduler) {
  const _bind = _M0MPC15queue5Queue3popGRP38zongen0116mgpic2026_2dsite4main3MsgE(self.dispatcher.inbox);
  if (_bind === undefined) {
    return;
  } else {
    const _Some = _bind;
    const _msg = _Some;
    const _func = self.update;
    const _bind$2 = _func(self.dispatch, _msg, self.model.val);
    const _cmd = _bind$2._0;
    const _model = _bind$2._1;
    self.model.val = _model;
    scheduler.method_table.method_0(scheduler.self, _cmd);
    _M0MP419moonbit_2dcommunity7rabbita8internal7runtime5Flags11mark__dirty(self.flags);
    return;
  }
}
function _M0IP219moonbit_2dcommunity7rabbita9TypedCellP419moonbit_2dcommunity7rabbita8internal7runtime6IsCell4viewGRP38zongen0116mgpic2026_2dsite4main5ModelRP38zongen0116mgpic2026_2dsite4main3MsgE(self) {
  const _func = self.view;
  return _func(self.dispatch, self.model.val);
}
function _M0IP219moonbit_2dcommunity7rabbita9TypedCellP419moonbit_2dcommunity7rabbita8internal7runtime6IsCell5flagsGRP38zongen0116mgpic2026_2dsite4main5ModelRP38zongen0116mgpic2026_2dsite4main3MsgE(self) {
  return self.flags;
}
function _M0MP219moonbit_2dcommunity7rabbita10Dispatcher7messageGRP38zongen0116mgpic2026_2dsite4main3MsgE(self, msg) {
  const _p$2 = self.id;
  const _p$3 = () => {
    _M0MPC15queue5Queue4pushGRP38zongen0116mgpic2026_2dsite4main3MsgE(self.inbox, msg);
  };
  return new _M0DTP419moonbit_2dcommunity7rabbita8internal7runtime3Cmd7Message(_p$2, _p$3);
}
function _M0FP219moonbit_2dcommunity7rabbita20cell__with__dispatchGRP38zongen0116mgpic2026_2dsite4main5ModelRP38zongen0116mgpic2026_2dsite4main3MsgE(model, update, view) {
  const flags = _M0MP419moonbit_2dcommunity7rabbita8internal7runtime5Flags3new();
  const dispatcher = new _M0TP219moonbit_2dcommunity7rabbita10DispatcherGRP38zongen0116mgpic2026_2dsite4main3MsgE(flags.id, _M0MPC15queue5Queue3newGRP38zongen0116mgpic2026_2dsite4main3MsgE());
  const dispatch = (m) => _M0MP219moonbit_2dcommunity7rabbita10Dispatcher7messageGRP38zongen0116mgpic2026_2dsite4main3MsgE(dispatcher, m);
  const model$2 = _M0FPC13ref3newGRP38zongen0116mgpic2026_2dsite4main5ModelE(model);
  return { _0: dispatch, _1: { self: new _M0TP219moonbit_2dcommunity7rabbita9TypedCellGRP38zongen0116mgpic2026_2dsite4main5ModelRP38zongen0116mgpic2026_2dsite4main3MsgE(model$2, dispatcher, dispatch, update, view, flags), method_table: _M0FP0205moonbit_2dcommunity_2frabbita_2fTypedCell_5bzongen01_2fmgpic2026_2dsite_2fmain_2fModel_2c_20zongen01_2fmgpic2026_2dsite_2fmain_2fMsg_5d_24as_24_40moonbit_2dcommunity_2frabbita_2finternal_2fruntime_2eIsCell } };
}
function _M0FP38zongen0116mgpic2026_2dsite4main14initial__model() {
  return new _M0TP38zongen0116mgpic2026_2dsite4main5Model(_M0FP38zongen0116mgpic2026_2dsite4main20get__initial__locale(), _M0FP38zongen0116mgpic2026_2dsite4main19prefers__dark__mode() ? 1 : 0);
}
function _M0FP38zongen0116mgpic2026_2dsite4main6update(dispatch, msg, model) {
  const _tmp = model.locale;
  const _bind = model.theme;
  let _tmp$2;
  if (_bind === 0) {
    _tmp$2 = 1;
  } else {
    _tmp$2 = 0;
  }
  return { _0: _M0FP319moonbit_2dcommunity7rabbita3cmd4none, _1: new _M0TP38zongen0116mgpic2026_2dsite4main5Model(_tmp, _tmp$2) };
}
function _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, zh, en) {
  if (locale === 0) {
    return zh;
  } else {
    return en;
  }
}
function _M0FP38zongen0116mgpic2026_2dsite4main11site__class(theme, has_qr_float) {
  if (has_qr_float) {
    if (theme === 0) {
      return "site site--light site--with-qr";
    } else {
      return "site site--dark site--with-qr";
    }
  } else {
    if (theme === 0) {
      return "site site--light";
    } else {
      return "site site--dark";
    }
  }
}
function _M0FP38zongen0116mgpic2026_2dsite4main20theme__toggle__label(model) {
  const _bind = model.theme;
  if (_bind === 0) {
    return _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "夜间", "Dark");
  } else {
    return _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "日间", "Light");
  }
}
function _M0FP38zongen0116mgpic2026_2dsite4main20is__standalone__page() {
  return _M0FP38zongen0116mgpic2026_2dsite4main18is__progress__page() ? true : _M0FP38zongen0116mgpic2026_2dsite4main18is__showcase__page() ? true : _M0FP38zongen0116mgpic2026_2dsite4main18is__register__page();
}
function _M0FP38zongen0116mgpic2026_2dsite4main10page__href(anchor) {
  if (anchor === "showcase.html") {
    return "showcase.html";
  } else {
    if (_M0FP38zongen0116mgpic2026_2dsite4main20is__standalone__page()) {
      switch (anchor) {
        case "#top": {
          return "index.html#top";
        }
        case "#about": {
          return "index.html#about";
        }
        case "#process": {
          return "index.html#process";
        }
        case "#directions": {
          return "index.html#directions";
        }
        case "#awards": {
          return "index.html#awards";
        }
        case "#showcase": {
          return "showcase.html";
        }
        case "#requirements": {
          return "index.html#requirements";
        }
        case "#faq": {
          return "index.html#faq";
        }
        default: {
          return anchor;
        }
      }
    } else {
      return anchor;
    }
  }
}
function _M0FP38zongen0116mgpic2026_2dsite4main10nav__items(locale) {
  return [new _M0TP38zongen0116mgpic2026_2dsite4main7NavItem(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "定位", "About"), "#about"), new _M0TP38zongen0116mgpic2026_2dsite4main7NavItem(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "流程", "Process"), "#process"), new _M0TP38zongen0116mgpic2026_2dsite4main7NavItem(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "方向", "Directions"), "#directions"), new _M0TP38zongen0116mgpic2026_2dsite4main7NavItem(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "奖励", "Awards"), "#awards"), new _M0TP38zongen0116mgpic2026_2dsite4main7NavItem(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "作品墙", "Showcase"), "showcase.html"), new _M0TP38zongen0116mgpic2026_2dsite4main7NavItem(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "注意事项", "Notes"), "#requirements"), _M0FP38zongen0116mgpic2026_2dsite4main10nav__itemsN6recordS99];
}
function _M0FP38zongen0116mgpic2026_2dsite4main13hero__kv__alt(locale) {
  return _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "MoonBit 国产基础软件生态开源大赛主视觉", "MoonBit Open Source Competition key visual");
}
function _M0FP38zongen0116mgpic2026_2dsite4main14summary__cards(locale) {
  return [new _M0TP38zongen0116mgpic2026_2dsite4main8InfoCard(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "参赛对象", "Participants"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "全体开发者", "All developers"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "面向所有对 MoonBit、AI 编程、开源生态和基础软件感兴趣的开发者（不限学生或社会人士）。", "Open to all developers interested in MoonBit, AI programming, open source, and infrastructure software, including students and professionals.")), new _M0TP38zongen0116mgpic2026_2dsite4main8InfoCard(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "项目规模", "Scope"), "4~10k LOC", _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "参考有效 MoonBit 代码行数，重质量、边界和可维护性。", "A reference range for effective MoonBit code, with quality first.")), new _M0TP38zongen0116mgpic2026_2dsite4main8InfoCard(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "基础激励", "Base support"), "150 + 350 元", _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "立项启动支持 + 验收完成支持，优秀作品奖励另计。", "Kickoff support plus completion support; awards are separate."))];
}
function _M0FP38zongen0116mgpic2026_2dsite4main12about__cards(locale) {
  return [new _M0TP38zongen0116mgpic2026_2dsite4main8InfoCard(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "AI 辅助", "AI-assisted"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "用 AI 提效，但成果要可解释", "Use AI, keep accountability"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "AI 可用于代码生成、接口设计、测试补全和文档撰写；最终项目目标、技术路径、质量边界和开源合规由参赛者把控。", "AI may help with code generation, API design, tests, and documentation. Participants remain responsible for goals, technical direction, quality boundaries, and open-source compliance.")), new _M0TP38zongen0116mgpic2026_2dsite4main8InfoCard(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "生态包", "Packages"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "聚焦开源生态库建设", "Focus on ecosystem libraries"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "项目可以是原创库、成熟生态库的 MoonBit 移植，也可以是围绕实际需求的开发工具或示例项目。", "Projects can be original libraries, MoonBit ports of mature ecosystem libraries, developer tools, or example projects.")), new _M0TP38zongen0116mgpic2026_2dsite4main8InfoCard(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "可验收", "Acceptable"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "真实可用、可测试、可维护", "Usable, tested, maintainable"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "关键规则：边界清晰、文档完整、测试可运行、长期可维护，细则以赛事公告和最终章程为准。", "Key rules: clear scope, complete docs, runnable tests, and long-term maintainability. Details follow official announcements and final rules."))];
}
function _M0FP38zongen0116mgpic2026_2dsite4main14process__items(locale) {
  return [new _M0TP38zongen0116mgpic2026_2dsite4main11ProcessItem(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "4 月 29 日 - 7 月 10 日", "Apr 29 - Jul 10"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "项目申报", "Project proposal"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "通过官方表单提交参赛信息、GitHub 仓库和一页 PDF 项目申报书；仓库需包含 10-20 个有效 commits。通过申报审核可获得 150 元启动支持。", "Submit participant info, GitHub repository, and a one-page PDF proposal through the official form. The repository should contain 10-20 valid commits. Approved proposals may receive RMB 150 kickoff support.")), new _M0TP38zongen0116mgpic2026_2dsite4main11ProcessItem(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "4 月 29 日 - 7 月 10 日", "Apr 29 - Jul 10"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "项目开发与社区活动", "Development and community"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "围绕公开仓库持续开发，保持提交记录、工单、合并请求和更新日志可追踪；赛事组提供指南、模板、答疑、宣讲和阶段展示。", "Build in public with traceable commits, issues, pull requests, and changelogs. Organizers provide guides, templates, Q&A, talks, and stage showcases.")), new _M0TP38zongen0116mgpic2026_2dsite4main11ProcessItem(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "7 月 11 日 - 7 月 17 日", "Jul 11 - Jul 17"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "项目验收", "Project acceptance"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "项目完成后通过验收表提交申请。通过验收可获得 350 元完成支持，启动支持与完成支持合计 500 元 / 项目。", "After completion, submit the acceptance form. Accepted projects may receive RMB 350 completion support, for RMB 500 total base support per project.")), new _M0TP38zongen0116mgpic2026_2dsite4main11ProcessItem(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "8 月 4 日 - 8 月 14 日", "Aug 4 - Aug 14"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "优秀项目评选", "Final selection"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "赛事组根据完成度、MoonBit 生态贡献、工程质量和展示表现综合评估。", "Organizers evaluate completion, MoonBit ecosystem contribution, engineering quality, and presentation.")), new _M0TP38zongen0116mgpic2026_2dsite4main11ProcessItem(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "8 月 16 日", "Aug 16"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "线下作品展示与颁奖", "Offline showcase and awards ceremony"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "入选优秀项目参加线下作品展示与颁奖，具体地点和流程后续公布。", "Selected outstanding projects join the offline showcase and awards ceremony. The exact venue and process will be announced later."))];
}
function _M0FP38zongen0116mgpic2026_2dsite4main16direction__cards(locale) {
  return [new _M0TP38zongen0116mgpic2026_2dsite4main8ListCard(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "基础数据结构与算法", "Data structures and algorithms"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "适合沉淀可复用的基础算法能力。", "Reusable foundations for common algorithmic needs."), [_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "常用数据结构，例如 indexmap、bitmask", "Common data structures such as indexmap and bitmask"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "Graph 相关算法库", "Graph algorithm libraries"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "Pathfinding 工具库", "Pathfinding libraries"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "moon prove 验证的通用算法库", "General algorithm libraries verified with moon prove")]), new _M0TP38zongen0116mgpic2026_2dsite4main8ListCard(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "工程基础设施与工具链", "Engineering infrastructure"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "补齐 MoonBit 工程化开发常用工具。", "Common tools for MoonBit engineering workflows."), [_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "日志库 + tracing 工具（基于 moonbitlang/async）", "Logging + tracing tools based on moonbitlang/async"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "构建工具，类似 n2 / ninja", "Build tools similar to n2 / ninja"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "模板渲染器", "Template renderer"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "Stopwatch / benchmark 小工具", "Stopwatch / benchmark helpers")]), new _M0TP38zongen0116mgpic2026_2dsite4main8ListCard(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "系统能力与运行时框架", "Runtime and systems"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "面向更底层的运行时、并发和格式处理能力。", "Lower-level runtime, concurrency, and format-processing capabilities."), [_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "Deterministic simulation 框架", "Deterministic simulation framework"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "编译器底层基础设施，例如寄存器分配库", "Compiler infrastructure such as register allocation libraries"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "面向特定格式的（反）序列化工具，类似 protobuf", "Format-specific serialization / deserialization tools similar to protobuf"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "基于 moonbitlang/async 做的并发框架，比如 actor 框架", "Concurrency frameworks based on moonbitlang/async, such as actor frameworks")]), new _M0TP38zongen0116mgpic2026_2dsite4main8ListCard(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "应用生态", "Application ecosystem"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "适合做可展示、可复用的生态项目。", "Presentable and reusable ecosystem projects."), [_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "Markdown to HTML 工具", "Markdown to HTML tools"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "简易图表数据生成和预览", "Simple chart data generation and preview"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "流行游戏引擎的 MoonBit 绑定", "MoonBit bindings for popular game engines"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "流行数据库的 MoonBit 绑定", "MoonBit bindings for popular databases")])];
}
function _M0FP38zongen0116mgpic2026_2dsite4main17showcase__signals(locale) {
  return [new _M0TP38zongen0116mgpic2026_2dsite4main14ShowcaseSignal(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "待收录", "Coming soon"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "通过申报、公开开发并达到展示标准后上墙。", "Projects are listed after proposal review, public development, and showcase readiness.")), new _M0TP38zongen0116mgpic2026_2dsite4main14ShowcaseSignal(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "公开仓库", "Public repo"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "卡片会直接展示 GitHub、Mooncakes 和相关链接。", "Cards will expose GitHub, Mooncakes, and related links.")), new _M0TP38zongen0116mgpic2026_2dsite4main14ShowcaseSignal(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "持续更新", "Updated"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "项目介绍、亮点、文档和相关链接可随开发进展补充。", "Profiles, highlights, docs, and related links can be added as projects evolve.")), new _M0TP38zongen0116mgpic2026_2dsite4main14ShowcaseSignal(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "展示推荐", "Promotion"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "优秀项目可获得官网、社区和持续生态维护推荐。", "Standout projects may receive site, community, and ecosystem-maintenance promotion."))];
}
function _M0FP38zongen0116mgpic2026_2dsite4main18showcase__projects(locale) {
  return [new _M0TP38zongen0116mgpic2026_2dsite4main15ShowcaseProject(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "待上墙", "Pending"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "生态库", "Library"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "项目名称待公布", "Project name TBD"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "通过验收后展示公开仓库、Mooncakes 包和相关链接", "Public repo, Mooncakes package, and related links after acceptance"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "用于展示真实可用的 MoonBit 开源库：项目目标、核心 API、使用示例、测试和文档都会在卡片中清楚呈现。", "For usable MoonBit open-source libraries. Goals, core APIs, examples, tests, and documentation will be shown clearly in the card."), [_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "公开 README、源码、提交记录和许可证", "Public README, source, commits, and license"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "突出核心功能、适用场景和生态价值", "Highlight core features, use cases, and ecosystem value"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "保留 GitHub / Mooncakes / 项目链接入口", "Reserve GitHub / Mooncakes / project entry points")], ["MoonBit", "GitHub", "Mooncakes"], [new _M0TP38zongen0116mgpic2026_2dsite4main12ShowcaseLink(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "项目申报", "Submit project"), "https://www.gitlink.org.cn/competitions/track1_2026MoonBit")]), new _M0TP38zongen0116mgpic2026_2dsite4main15ShowcaseProject(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "待上墙", "Pending"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "开发工具", "Tooling"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "工具项目待公布", "Tooling project TBD"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "适合展示 CLI、解析器、构建工具或 AI 辅助开发工具", "For CLI, parsers, build tools, or AI-assisted development tools"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "工具类项目会重点展示使用方式、最小示例、工程结构和可复现流程，让其他 MoonBit 开发者能直接参考。", "Tooling projects will emphasize usage, minimal examples, engineering structure, and reproducible workflows for MoonBit developers."), [_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "展示安装、运行和最小使用样例", "Show installation, running, and minimal examples"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "展示 CI、测试和文档完成度", "Show CI, tests, and documentation completeness"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "可补充技术文章或使用视频链接", "Can include technical articles or usage videos")], ["MoonBit", _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "工具链", "Tooling"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "示例", "Examples")], [new _M0TP38zongen0116mgpic2026_2dsite4main12ShowcaseLink(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "验收入口", "Acceptance form"), "https://bxup9uklfcb.feishu.cn/share/base/form/shrcnlOdTfQUDNW5raWrQDqVTQg")]), new _M0TP38zongen0116mgpic2026_2dsite4main15ShowcaseProject(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "待上墙", "Pending"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "高校实践", "Campus"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "高校项目待公布", "Campus project TBD"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "适合展示课程、社团、训练营或实验室产出的代表项目", "For representative projects from courses, clubs, bootcamps, or labs"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "高校实践项目会突出共建场景、学习材料、可复用成果和持续维护计划，便于更多学生继续参与 MoonBit 生态。", "Campus projects will highlight collaboration context, learning material, reusable output, and maintenance plans so more students can join the MoonBit ecosystem."), [_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "展示作者、学校 / 社团和项目方向", "Show author, campus/community, and project direction"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "展示课程实践或开源训练成果", "Show course practice or open-source training output"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "优秀内容可进入社区传播和访谈", "Strong projects may enter community promotion and interviews")], ["MoonBit", _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "高校", "Campus"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "开源实践", "Open Source")], [new _M0TP38zongen0116mgpic2026_2dsite4main12ShowcaseLink(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "报名争取上墙", "Register to be featured"), "https://www.gitlink.org.cn/competitions/track1_2026MoonBit")])];
}
function _M0FP38zongen0116mgpic2026_2dsite4main12prize__items(locale) {
  return [new _M0TP38zongen0116mgpic2026_2dsite4main9PrizeItem(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "一等奖", "First Prize"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "18,000 元 + 获奖证书", "RMB 18,000 + certificate"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "1 名", "1 winner")), new _M0TP38zongen0116mgpic2026_2dsite4main9PrizeItem(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "二等奖", "Second Prize"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "10,000 元 + 获奖证书", "RMB 10,000 + certificate"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "3 名", "3 winners")), new _M0TP38zongen0116mgpic2026_2dsite4main9PrizeItem(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "三等奖", "Third Prize"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "5,000 元 + 获奖证书", "RMB 5,000 + certificate"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "9 名", "9 winners"))];
}
function _M0FP38zongen0116mgpic2026_2dsite4main19bonus__prize__items(locale) {
  return [new _M0TP38zongen0116mgpic2026_2dsite4main9PrizeItem(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "专项鼓励奖", "Special Encouragement"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "金额及数量视实际情况确定", "Amount and count TBD"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "若干名", "Several"))];
}
function _M0FP38zongen0116mgpic2026_2dsite4main16attention__items(locale) {
  return [_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "项目申报截止到 7 月 10 日，需提交 GitHub 仓库和一页左右 PDF 申报书；仓库应包含 10-20 个有效 commits。", "Proposal submission closes on July 10. Submit a GitHub repository and a roughly one-page PDF proposal; the repository should contain 10-20 valid commits."), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "4 月 29 日前已存在或已发布的库可以继续维护参赛，但有效工作量只统计 4 月 29 日后新增的 commits、功能、测试、文档和发布改进。", "Existing or previously published libraries can join as continued-maintenance projects, but only commits, features, tests, docs, and release improvements after April 29 count."), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "验收项目需以 MoonBit 为主要实现语言，仓库公开可访问，并提供清晰 README、可运行示例、CI、测试和 mooncakes.io 发布。", "For acceptance, MoonBit should be the primary language, the repository must be public, and the project should provide a clear README, runnable example, CI, tests, and mooncakes.io publication."), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "原创、移植或参考已有开源项目都可以；移植项目必须说明原项目、链接、许可证和本次移植范围。", "Original projects, ports, or projects referencing existing open source are all allowed; ports must document the upstream project, link, license, and porting scope."), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "项目必须采用 OSI 认可的开源许可证，不得提交未经授权的私有代码、闭源代码、商业代码或来源不明的生成内容。", "Projects must use an OSI-approved open-source license and must not include unauthorized private, closed-source, commercial, or unclear-origin generated content."), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "基础激励为 150 元启动支持 + 350 元完成支持；优秀项目奖金池单独评选，不与基础激励冲突。", "Base support is RMB 150 kickoff plus RMB 350 completion support; outstanding-project awards are selected separately and do not conflict with base support.")];
}
function _M0FP38zongen0116mgpic2026_2dsite4main10faq__items(locale) {
  return [new _M0TP38zongen0116mgpic2026_2dsite4main7FaqItem(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "报名后如何获得反馈？", "What happens after registration?"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "提交项目申报表后，赛方会通过邮件通知是否通过申报审核。通过项目可获得启动支持，并进入开发与验收流程；未通过时邮件会说明原因，参赛者可以调整项目内容后继续申报。", "After submitting the proposal form, organizers will notify participants by email about review results. Approved projects may receive kickoff support and continue into development and acceptance. If not approved, the email will explain why, and participants may revise and resubmit."), true), new _M0TP38zongen0116mgpic2026_2dsite4main7FaqItem(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "之前已经发布或维护过的库还能参赛吗？", "Can existing or previously published libraries join?"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "可以。2026 年 4 月 29 日前已经存在、已经发布或已经有一定代码基础的库，可以按“继续维护”的方式参与；本次赛事只计算 2026 年 4 月 29 日之后产生的有效新增 commits、新功能、测试、文档和发布改进。申报时请说明项目已有基础、本次计划新增内容和新增贡献范围，避免把旧工作量重复计入本次成果。", "Yes. Libraries that existed, were published, or already had code before April 29, 2026 can join as continued maintenance projects. The contest only counts effective new commits, features, tests, documentation, and release improvements made after April 29, 2026. Please describe the existing baseline, planned new work, and contribution scope in the proposal, so previous work is not counted again as contest output."), false), new _M0TP38zongen0116mgpic2026_2dsite4main7FaqItem(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "可以移植其他语言生态里的库吗？", "Can I port libraries from other ecosystems?"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "可以。鼓励参考 Rust、Go、TypeScript、Python、OCaml、Scala、Java 等生态中的成熟库，但必须注明原项目、链接、许可证和移植范围。", "Yes. Mature libraries from Rust, Go, TypeScript, Python, OCaml, Scala, Java, and other ecosystems are welcome, with upstream project, link, license, and scope documented."), false), new _M0TP38zongen0116mgpic2026_2dsite4main7FaqItem(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "AI 生成代码是否允许？", "Is AI-generated code allowed?"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "允许合理使用 AI 辅助代码、测试、文档和移植分析，但不得提交未经授权的私有代码、闭源代码或商业代码。", "Responsible AI assistance is allowed for code, tests, docs, and porting analysis, but unauthorized private, closed-source, or commercial code must not be submitted."), false), new _M0TP38zongen0116mgpic2026_2dsite4main7FaqItem(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "项目规模一定要到 4~10k 行吗？", "Must the project reach 4-10k LOC?"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "这是参考范围。验收更看重项目真实可用、边界清晰、文档完整、测试可运行和后续可维护。", "It is a reference range. Acceptance focuses more on usability, clear scope, complete docs, runnable tests, and maintainability."), false), new _M0TP38zongen0116mgpic2026_2dsite4main7FaqItem(_M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "验收什么时候开放？", "When does acceptance open?"), _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "验收申请计划于 7 月 11 日至 7 月 17 日开放。项目完成后可通过验收表提交申请，通过验收的项目可获得 350 元 / 项目的完成支持，并继续参与优秀项目评选。", "Acceptance is planned from July 11 to July 17. Completed projects can submit the acceptance form. Accepted projects may receive RMB 350 completion support and continue into the final selection."), false)];
}
function _M0FP38zongen0116mgpic2026_2dsite4main14section__intro(eyebrow, title, desc) {
  return _M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main14section__introN6constrS100, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html1pGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main14section__introN6constrS101, undefined, -1, undefined, eyebrow), _M0FP319moonbit_2dcommunity7rabbita4html2h2GsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, title), desc === "" ? _M0FP319moonbit_2dcommunity7rabbita4html7nothing : _M0FP319moonbit_2dcommunity7rabbita4html1pGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, desc)]);
}
function _M0FP38zongen0116mgpic2026_2dsite4main20section__intro__wide(eyebrow, title, desc) {
  return _M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main20section__intro__wideN6constrS102, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html1pGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main20section__intro__wideN6constrS103, undefined, -1, undefined, eyebrow), _M0FP319moonbit_2dcommunity7rabbita4html2h2GsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, title), desc === "" ? _M0FP319moonbit_2dcommunity7rabbita4html7nothing : _M0FP319moonbit_2dcommunity7rabbita4html1pGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, desc)]);
}
function _M0FP38zongen0116mgpic2026_2dsite4main12view__header(dispatch, model) {
  const _tmp = _M0FP319moonbit_2dcommunity7rabbita4html1aGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main12view__headerN6constrS106, undefined, -1, _M0FP38zongen0116mgpic2026_2dsite4main10page__href("#top"), undefined, undefined, undefined, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html3imgGRP319moonbit_2dcommunity7rabbita4html4HtmlE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main12view__headerN6constrS107, -1, _M0FP38zongen0116mgpic2026_2dsite4main12view__headerN6constrS108, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "MoonBit Logo", "MoonBit logo"), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _M0FP319moonbit_2dcommunity7rabbita4html7nothing), _M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main12view__headerN6constrS109, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html6strongGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "MoonBit 国产基础软件生态开源大赛", "MoonBit Open Source Contest")), _M0FP319moonbit_2dcommunity7rabbita4html1pGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main12view__headerN6constrS110, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "2026 官方网站", "2026 Official Website"))])], -1);
  const _p$2 = _M0FP38zongen0116mgpic2026_2dsite4main10nav__items(model.locale);
  const _p$3 = new Array(_p$2.length);
  const _p$4 = _p$2.length;
  let _tmp$2 = 0;
  while (true) {
    const _p$5 = _tmp$2;
    if (_p$5 < _p$4) {
      const _p$6 = _p$2[_p$5];
      _p$3[_p$5] = _M0FP319moonbit_2dcommunity7rabbita4html1aGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, _M0FP38zongen0116mgpic2026_2dsite4main10page__href(_p$6.href), undefined, undefined, undefined, undefined, _p$6.label, -1);
      _tmp$2 = _p$5 + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return _M0FP319moonbit_2dcommunity7rabbita4html6headerGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main12view__headerN6constrS104, undefined, -1, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main12view__headerN6constrS105, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_tmp, _M0FP319moonbit_2dcommunity7rabbita4html3navGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main12view__headerN6constrS111, undefined, -1, undefined, _p$3), _M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main12view__headerN6constrS112, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html1aGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main12view__headerN6constrS113, undefined, -1, "https://www.gitlink.org.cn/competitions/track1_2026MoonBit", undefined, undefined, undefined, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "项目申报", "Submit"), -1), _M0FP319moonbit_2dcommunity7rabbita4html6buttonGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main12view__headerN6constrS114, undefined, -1, undefined, -1, undefined, undefined, -1, dispatch(0), undefined, _M0FP38zongen0116mgpic2026_2dsite4main20theme__toggle__label(model))])])]);
}
function _M0FP38zongen0116mgpic2026_2dsite4main10view__hero(model) {
  return _M0FP319moonbit_2dcommunity7rabbita4html7sectionGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, _M0FP38zongen0116mgpic2026_2dsite4main10view__heroN6constrS115, _M0FP38zongen0116mgpic2026_2dsite4main10view__heroN6constrS116, undefined, -1, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main10view__heroN6constrS117, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main10view__heroN6constrS118, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html3imgGRP319moonbit_2dcommunity7rabbita4html4HtmlE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main10view__heroN6constrS119, -1, _M0FP38zongen0116mgpic2026_2dsite4main10view__heroN6constrS120, _M0FP38zongen0116mgpic2026_2dsite4main13hero__kv__alt(model.locale), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _M0FP319moonbit_2dcommunity7rabbita4html7nothing)]), _M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main10view__heroN6constrS121, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main10view__heroN6constrS122, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html6strongGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "项目申报已开放", "Proposal submission is open")), _M0FP319moonbit_2dcommunity7rabbita4html1pGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "4 月 29 日至 7 月 10 日，提交 GitHub 仓库和一页 PDF 申报书。", "Submit your GitHub repository and one-page PDF proposal from Apr 29 to Jul 10."))]), _M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main10view__heroN6constrS123, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html1aGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main10view__heroN6constrS124, undefined, -1, "https://www.gitlink.org.cn/competitions/track1_2026MoonBit", undefined, undefined, undefined, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "立即报名", "Register now"), -1), _M0FP319moonbit_2dcommunity7rabbita4html1aGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main10view__heroN6constrS125, undefined, -1, "#process", undefined, undefined, undefined, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "查看流程", "View process"), -1), _M0FP319moonbit_2dcommunity7rabbita4html1aGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main10view__heroN6constrS126, undefined, -1, "#requirements", undefined, undefined, undefined, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "注意事项", "Notes"), -1), _M0FP319moonbit_2dcommunity7rabbita4html1aGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main10view__heroN6constrS127, undefined, -1, "https://bxup9uklfcb.feishu.cn/wiki/Cv5owfd9xiT9Z5k6d8scJlV0n1a", _M0FP38zongen0116mgpic2026_2dsite4main10view__heroN6constrS128, _M0FP38zongen0116mgpic2026_2dsite4main10view__heroN6constrS129, undefined, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "完整章程", "Full rules"), -1), _M0FP319moonbit_2dcommunity7rabbita4html1aGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main10view__heroN6constrS130, undefined, -1, "showcase.html", undefined, undefined, undefined, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "作品墙", "Showcase"), -1)])])])]);
}
function _M0FP38zongen0116mgpic2026_2dsite4main16view__info__card(card) {
  return _M0FP319moonbit_2dcommunity7rabbita4html7articleGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main16view__info__cardN6constrS131, undefined, -1, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html4spanGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main16view__info__cardN6constrS132, undefined, -1, undefined, card.badge), _M0FP319moonbit_2dcommunity7rabbita4html2h3GsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, card.title), _M0FP319moonbit_2dcommunity7rabbita4html1pGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, card.desc)]);
}
function _M0FP38zongen0116mgpic2026_2dsite4main16view__list__card(card) {
  const _tmp = _M0FP319moonbit_2dcommunity7rabbita4html2h3GsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, card.title);
  const _tmp$2 = _M0FP319moonbit_2dcommunity7rabbita4html1pGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, card.desc);
  const _p$2 = card.items;
  const _p$3 = new Array(_p$2.length);
  const _p$4 = _p$2.length;
  let _tmp$3 = 0;
  while (true) {
    const _p$5 = _tmp$3;
    if (_p$5 < _p$4) {
      const _p$6 = _p$2[_p$5];
      _p$3[_p$5] = _M0FP319moonbit_2dcommunity7rabbita4html2liGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, undefined, -1, undefined, undefined, _p$6);
      _tmp$3 = _p$5 + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return _M0FP319moonbit_2dcommunity7rabbita4html7articleGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main16view__list__cardN6constrS133, undefined, -1, undefined, [_tmp, _tmp$2, _M0FP319moonbit_2dcommunity7rabbita4html2ulGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main16view__list__cardN6constrS134, undefined, -1, undefined, undefined, _p$3)]);
}
function _M0FP38zongen0116mgpic2026_2dsite4main18view__process__row(item) {
  return _M0FP319moonbit_2dcommunity7rabbita4html2trGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html2tdGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, undefined, _M0FP38zongen0116mgpic2026_2dsite4main18view__process__rowN6constrS135, undefined, -1, undefined, item.time), _M0FP319moonbit_2dcommunity7rabbita4html2tdGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, undefined, _M0FP38zongen0116mgpic2026_2dsite4main18view__process__rowN6constrS136, undefined, -1, undefined, item.title), _M0FP319moonbit_2dcommunity7rabbita4html2tdGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, undefined, _M0FP38zongen0116mgpic2026_2dsite4main18view__process__rowN6constrS137, undefined, -1, undefined, item.desc)]);
}
function _M0FP38zongen0116mgpic2026_2dsite4main16view__prize__row(item) {
  return _M0FP319moonbit_2dcommunity7rabbita4html2trGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html2tdGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, undefined, _M0FP38zongen0116mgpic2026_2dsite4main16view__prize__rowN6constrS138, undefined, -1, undefined, item.award), _M0FP319moonbit_2dcommunity7rabbita4html2tdGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, undefined, _M0FP38zongen0116mgpic2026_2dsite4main16view__prize__rowN6constrS139, undefined, -1, undefined, item.prize), _M0FP319moonbit_2dcommunity7rabbita4html2tdGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, undefined, _M0FP38zongen0116mgpic2026_2dsite4main16view__prize__rowN6constrS140, undefined, -1, undefined, item.count)]);
}
function _M0FP38zongen0116mgpic2026_2dsite4main18view__prize__table(title, locale, items) {
  const _tmp = _M0FP319moonbit_2dcommunity7rabbita4html2h3GsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, title);
  const _tmp$2 = _M0FP319moonbit_2dcommunity7rabbita4html5theadGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html2trGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html2thGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "奖项", "Award")), _M0FP319moonbit_2dcommunity7rabbita4html2thGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "奖金", "Prize")), _M0FP319moonbit_2dcommunity7rabbita4html2thGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "数量", "Count"))])]);
  const _p$2 = new Array(items.length);
  const _p$3 = items.length;
  let _tmp$3 = 0;
  while (true) {
    const _p$4 = _tmp$3;
    if (_p$4 < _p$3) {
      const _p$5 = items[_p$4];
      _p$2[_p$4] = _M0FP38zongen0116mgpic2026_2dsite4main16view__prize__row(_p$5);
      _tmp$3 = _p$4 + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return _M0FP319moonbit_2dcommunity7rabbita4html7articleGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main18view__prize__tableN6constrS141, undefined, -1, undefined, [_tmp, _M0FP319moonbit_2dcommunity7rabbita4html5tableGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main18view__prize__tableN6constrS142, undefined, -1, undefined, [_tmp$2, _M0FP319moonbit_2dcommunity7rabbita4html5tbodyGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, _p$2)])]);
}
function _M0FP38zongen0116mgpic2026_2dsite4main27view__referral__prize__card(locale) {
  return _M0FP319moonbit_2dcommunity7rabbita4html7articleGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main27view__referral__prize__cardN6constrS143, undefined, -1, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main27view__referral__prize__cardN6constrS144, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html2h3GsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "转推荐奖励", "Referral Reward")), _M0FP319moonbit_2dcommunity7rabbita4html4spanGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main27view__referral__prize__cardN6constrS145, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "50 元 / 人", "RMB 50 / person"))]), _M0FP319moonbit_2dcommunity7rabbita4html3divGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main27view__referral__prize__cardN6constrS146, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "说明", "Notes")), _M0FP319moonbit_2dcommunity7rabbita4html2ulGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main27view__referral__prize__cardN6constrS147, undefined, -1, undefined, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html2liGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, undefined, -1, undefined, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "已成功报名的参赛者（推荐人），可邀请新参赛者（被推荐人）报名参赛；", "Successfully registered participants (referrers) may invite new participants (referees) to register;")), _M0FP319moonbit_2dcommunity7rabbita4html2liGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, undefined, -1, undefined, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "被推荐人在提交项目申报问卷时，需在“推荐人”字段准确填写推荐人的 GitHub ID；", "When submitting the project proposal form, the referee must accurately fill in the referrer's GitHub ID in the Referrer field;")), _M0FP319moonbit_2dcommunity7rabbita4html2liGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, undefined, -1, undefined, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "推荐关系认定规则：一位被推荐人只能绑定一位推荐人。若被推荐人由多人先后邀请，以报名问卷中首次有效提交的推荐人信息为准。", "Referral recognition: one referee can only be linked to one referrer. If multiple people invited the same referee, the first valid referrer information submitted in the registration form prevails.")), _M0FP319moonbit_2dcommunity7rabbita4html2liGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, undefined, -1, undefined, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "推荐关系一经赛事组审核确认，不予变更。推荐人与被推荐人不得相互推荐、重复推荐或通过虚假账号套取奖励，一经发现，取消比赛双方比赛资格。", "Once confirmed by the organizers, the referral relationship cannot be changed. Referrers and referees may not refer each other, duplicate referrals, or claim rewards through fake accounts; violations will disqualify both parties.")), _M0FP319moonbit_2dcommunity7rabbita4html2liGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, undefined, -1, undefined, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(locale, "赛事组审核确认被推荐人报名成功后，推荐人可获得 50 元 / 人的现金奖励，上限 30 人。", "After organizers confirm that the referee has registered successfully, the referrer may receive RMB 50 per person in cash rewards, up to 30 people."))])]);
}
function _M0FP38zongen0116mgpic2026_2dsite4main22view__showcase__signal(signal) {
  return _M0FP319moonbit_2dcommunity7rabbita4html7articleGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main22view__showcase__signalN6constrS148, undefined, -1, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html6strongGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, signal.value), _M0FP319moonbit_2dcommunity7rabbita4html4spanGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, signal.label)]);
}
function _M0FP38zongen0116mgpic2026_2dsite4main20view__showcase__link(link) {
  return _M0FP319moonbit_2dcommunity7rabbita4html1aGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main20view__showcase__linkN6constrS149, undefined, -1, link.href, undefined, undefined, undefined, undefined, link.label, -1);
}
function _M0FP38zongen0116mgpic2026_2dsite4main23view__showcase__project(card) {
  const _tmp = _M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main23view__showcase__projectN6constrS152, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html4spanGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, card.status), _M0FP319moonbit_2dcommunity7rabbita4html4spanGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, card.category)]);
  const _tmp$2 = _M0FP319moonbit_2dcommunity7rabbita4html2h3GsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main23view__showcase__projectN6constrS153, undefined, -1, undefined, card.title);
  const _tmp$3 = _M0FP319moonbit_2dcommunity7rabbita4html1pGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main23view__showcase__projectN6constrS154, undefined, -1, undefined, card.subtitle);
  const _tmp$4 = _M0FP319moonbit_2dcommunity7rabbita4html1pGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main23view__showcase__projectN6constrS155, undefined, -1, undefined, card.desc);
  const _p$2 = card.highlights;
  const _p$3 = new Array(_p$2.length);
  const _p$4 = _p$2.length;
  let _tmp$5 = 0;
  while (true) {
    const _p$5 = _tmp$5;
    if (_p$5 < _p$4) {
      const _p$6 = _p$2[_p$5];
      _p$3[_p$5] = _M0FP319moonbit_2dcommunity7rabbita4html3divGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main23view__showcase__projectN6constrS157, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _p$6);
      _tmp$5 = _p$5 + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const _tmp$6 = _M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main23view__showcase__projectN6constrS156, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _p$3);
  const _p$5 = card.tags;
  const _p$6 = new Array(_p$5.length);
  const _p$7 = _p$5.length;
  let _tmp$7 = 0;
  while (true) {
    const _p$8 = _tmp$7;
    if (_p$8 < _p$7) {
      const _p$9 = _p$5[_p$8];
      _p$6[_p$8] = _M0FP319moonbit_2dcommunity7rabbita4html4spanGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main23view__showcase__projectN6constrS159, undefined, -1, undefined, _p$9);
      _tmp$7 = _p$8 + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const _tmp$8 = _M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main23view__showcase__projectN6constrS158, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _p$6);
  const _p$8 = card.links;
  const _p$9 = new Array(_p$8.length);
  const _p$10 = _p$8.length;
  let _tmp$9 = 0;
  while (true) {
    const _p$11 = _tmp$9;
    if (_p$11 < _p$10) {
      const _p$12 = _p$8[_p$11];
      _p$9[_p$11] = _M0FP38zongen0116mgpic2026_2dsite4main20view__showcase__link(_p$12);
      _tmp$9 = _p$11 + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return _M0FP319moonbit_2dcommunity7rabbita4html7articleGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main23view__showcase__projectN6constrS150, undefined, -1, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main23view__showcase__projectN6constrS151, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_tmp, _tmp$2, _tmp$3, _tmp$4, _tmp$6, _tmp$8, _M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main23view__showcase__projectN6constrS160, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _p$9)])]);
}
function _M0FP38zongen0116mgpic2026_2dsite4main15view__faq__item(item) {
  return _M0FP319moonbit_2dcommunity7rabbita4html7detailsGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main15view__faq__itemN6constrS161, undefined, -1, item.opened, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html7summaryGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, item.question), _M0FP319moonbit_2dcommunity7rabbita4html1pGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, item.answer)]);
}
function _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__page(model) {
  return _M0FP319moonbit_2dcommunity7rabbita4html7sectionGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS162, _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS163, undefined, -1, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS164, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS165, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS166, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html1pGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS167, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "比赛进度", "Contest progress")), _M0FP319moonbit_2dcommunity7rabbita4html2h2GsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "查看比赛进度与仓库状态", "Track contest progress and repository status")), _M0FP319moonbit_2dcommunity7rabbita4html1pGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "这里用于查看项目申报、GitHub 仓库检查、验收提交和作品展示状态。正式申报请通过官方渠道提交，并以官方表单记录为准。", "Use this page to track project submission, GitHub repository checks, acceptance submission, and showcase status. Official submissions must go through the official form and follow its records.")), _M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS168, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html1aGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS169, undefined, -1, "#progress-login", undefined, undefined, undefined, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "使用 GitHub 登录", "Sign in with GitHub"), -1), _M0FP319moonbit_2dcommunity7rabbita4html1aGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS170, undefined, -1, "register.html", undefined, undefined, undefined, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "官方渠道申报", "Official submission"), -1), _M0FP319moonbit_2dcommunity7rabbita4html1aGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS171, undefined, -1, "index.html#top", undefined, undefined, undefined, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "返回赛事首页", "Back to home"), -1)])]), _M0FP319moonbit_2dcommunity7rabbita4html7articleGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS172, _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS173, undefined, -1, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html2h3GsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "使用 GitHub 一键登录", "One-click GitHub sign-in")), _M0FP319moonbit_2dcommunity7rabbita4html1pGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "点击后通过 Render 后端跳转到 GitHub 官方授权页；权限只申请公开资料和邮箱，不申请私有仓库权限。", "Click to start GitHub OAuth through the Render backend. Only public profile and email scopes are requested, not private repository access.")), _M0FP319moonbit_2dcommunity7rabbita4html1aGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS174, undefined, -1, "https://mgpic2026.onrender.com/api/auth/github/start?return_to=%2Fprogress.html", undefined, undefined, undefined, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "使用 GitHub 登录", "Sign in with GitHub"), -1)])]), _M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS175, _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS176, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html7articleGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS177, undefined, -1, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html4spanGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS178, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "官方渠道申报", "Official submission")), _M0FP319moonbit_2dcommunity7rabbita4html2h3GsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "先通过官方渠道提交", "Submit through the official channel first")), _M0FP319moonbit_2dcommunity7rabbita4html1pGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "通过官方渠道提交 GitHub 仓库和一页 PDF 申报书，赛方会通过邮件反馈申报审核结果。", "Submit your GitHub repository and one-page PDF proposal through the official channel. The organizers will send review results by email."))]), _M0FP319moonbit_2dcommunity7rabbita4html7articleGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS179, undefined, -1, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html4spanGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS180, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "仓库检查", "Repository check")), _M0FP319moonbit_2dcommunity7rabbita4html2h3GsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "检查公开 GitHub 仓库", "Check public GitHub repository")), _M0FP319moonbit_2dcommunity7rabbita4html1pGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "系统会检查公开仓库、README、CI、测试、许可证和提交记录，不需要私有仓库权限。", "The system checks public repository data, README, CI, tests, license, and commit history without private repository permissions."))])]), _M0FP319moonbit_2dcommunity7rabbita4html7articleGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS181, undefined, -1, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html3divGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main20view__progress__pageN6constrS182, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "正在加载比赛进度看板预览...", "Loading progress dashboard preview..."))])])]);
}
function _M0FP38zongen0116mgpic2026_2dsite4main20view__register__page(model) {
  return _M0FP319moonbit_2dcommunity7rabbita4html7sectionGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, _M0FP38zongen0116mgpic2026_2dsite4main20view__register__pageN6constrS183, _M0FP38zongen0116mgpic2026_2dsite4main20view__register__pageN6constrS184, undefined, -1, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main20view__register__pageN6constrS185, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main20view__register__pageN6constrS186, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main20view__register__pageN6constrS187, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html1pGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main20view__register__pageN6constrS188, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "比赛介绍", "Contest intro")), _M0FP319moonbit_2dcommunity7rabbita4html2h2GsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "MoonBit 国产基础软件生态开源大赛", "MoonBit open-source contest")), _M0FP319moonbit_2dcommunity7rabbita4html1pGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "这是官网报名页面，用于提交项目信息、申报书和必要的身份材料。提交后进入赛方审核流程。", "This website registration page is used to submit project information, proposal documents, and required identity materials. Submitted projects enter organizer review.")), _M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main20view__register__pageN6constrS189, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html1aGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main20view__register__pageN6constrS190, undefined, -1, "#register-form", undefined, undefined, undefined, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "填写报名表单", "Fill registration form"), -1), _M0FP319moonbit_2dcommunity7rabbita4html1aGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main20view__register__pageN6constrS191, undefined, -1, "progress.html", undefined, undefined, undefined, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "返回比赛进度", "Back to progress"), -1), _M0FP319moonbit_2dcommunity7rabbita4html1aGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main20view__register__pageN6constrS192, undefined, -1, "https://www.gitlink.org.cn/competitions/track1_2026MoonBit", undefined, undefined, undefined, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "GitLink 报名", "GitLink registration"), -1)])]), _M0FP319moonbit_2dcommunity7rabbita4html7articleGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, _M0FP38zongen0116mgpic2026_2dsite4main20view__register__pageN6constrS193, _M0FP38zongen0116mgpic2026_2dsite4main20view__register__pageN6constrS194, undefined, -1, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html3divGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main20view__register__pageN6constrS195, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "正在加载官网报名预览...", "Loading website registration preview..."))])])])]);
}
function _M0FP38zongen0116mgpic2026_2dsite4main11view__about(model) {
  const _tmp = _M0FP38zongen0116mgpic2026_2dsite4main20section__intro__wide(_M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "赛事定位", "Positioning"), _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "用 MoonBit，一起建设国产开源生态", "Build an open-source ecosystem with MoonBit"), _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "以 MoonBit 编程语言及其工具链为基础，面向全体开发者（不限学生或社会人士），鼓励参赛者利用 AI 工具完成开源生态库、开发工具和示例工程的设计、移植、实现与完善。", "Based on MoonBit and its toolchain, the contest is open to all developers, including students and professionals, and encourages AI-assisted design, porting, implementation, and improvement of ecosystem libraries, developer tools, and example projects."));
  const _p$2 = _M0FP38zongen0116mgpic2026_2dsite4main14summary__cards(model.locale);
  const _p$3 = new Array(_p$2.length);
  const _p$4 = _p$2.length;
  let _tmp$2 = 0;
  while (true) {
    const _p$5 = _tmp$2;
    if (_p$5 < _p$4) {
      const _p$6 = _p$2[_p$5];
      _p$3[_p$5] = _M0FP38zongen0116mgpic2026_2dsite4main16view__info__card(_p$6);
      _tmp$2 = _p$5 + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const _tmp$3 = _M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main11view__aboutN6constrS199, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _p$3);
  const _p$5 = _M0FP38zongen0116mgpic2026_2dsite4main12about__cards(model.locale);
  const _p$6 = new Array(_p$5.length);
  const _p$7 = _p$5.length;
  let _tmp$4 = 0;
  while (true) {
    const _p$8 = _tmp$4;
    if (_p$8 < _p$7) {
      const _p$9 = _p$5[_p$8];
      _p$6[_p$8] = _M0FP38zongen0116mgpic2026_2dsite4main16view__info__card(_p$9);
      _tmp$4 = _p$8 + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return _M0FP319moonbit_2dcommunity7rabbita4html7sectionGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, _M0FP38zongen0116mgpic2026_2dsite4main11view__aboutN6constrS196, _M0FP38zongen0116mgpic2026_2dsite4main11view__aboutN6constrS197, undefined, -1, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main11view__aboutN6constrS198, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_tmp, _tmp$3, _M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main11view__aboutN6constrS200, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _p$6)])]);
}
function _M0FP38zongen0116mgpic2026_2dsite4main12view__awards(model) {
  return _M0FP319moonbit_2dcommunity7rabbita4html7sectionGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, _M0FP38zongen0116mgpic2026_2dsite4main12view__awardsN6constrS201, _M0FP38zongen0116mgpic2026_2dsite4main12view__awardsN6constrS202, undefined, -1, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main12view__awardsN6constrS203, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main12view__awardsN6constrS204, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main12view__awardsN6constrS205, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html1pGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main12view__awardsN6constrS206, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "奖金激励", "Awards")), _M0FP319moonbit_2dcommunity7rabbita4html2h2GsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "优秀项目奖金池 15 万元", "RMB 150,000 award pool")), _M0FP319moonbit_2dcommunity7rabbita4html1pGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "通过验收的项目可继续参与优秀项目评选。基础共建激励不计入优秀项目奖金，完成一个可用 MoonBit 包也能获得基础支持。", "Accepted projects can continue into the outstanding-project selection. Base support is separate from the award pool, so usable MoonBit packages can receive support too.")), _M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main12view__awardsN6constrS207, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html4spanGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "基础激励 500 元 / 项目", "RMB 500 base support / project")), _M0FP319moonbit_2dcommunity7rabbita4html4spanGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "一等奖 18,000 元 + 获奖证书", "First Prize RMB 18,000 + certificate")), _M0FP319moonbit_2dcommunity7rabbita4html4spanGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "专项鼓励奖视实际情况确定", "Special Encouragement TBD")), _M0FP319moonbit_2dcommunity7rabbita4html4spanGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "推荐他人成功参赛 50 元 / 人", "Referral reward RMB 50 / person"))])]), _M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main12view__awardsN6constrS208, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html4spanGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "总奖金池", "Award Pool")), _M0FP319moonbit_2dcommunity7rabbita4html6strongGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, "150,000"), _M0FP319moonbit_2dcommunity7rabbita4html1pGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "元人民币", "RMB")), _M0FP319moonbit_2dcommunity7rabbita4html1aGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main12view__awardsN6constrS209, undefined, -1, "https://www.gitlink.org.cn/competitions/track1_2026MoonBit", undefined, undefined, undefined, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "立即报名", "Register now"), -1)])]), _M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main12view__awardsN6constrS210, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_M0FP38zongen0116mgpic2026_2dsite4main18view__prize__table(_M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "优秀项目奖励", "Outstanding Project Awards"), model.locale, _M0FP38zongen0116mgpic2026_2dsite4main12prize__items(model.locale)), _M0FP38zongen0116mgpic2026_2dsite4main18view__prize__table(_M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "专项奖励", "Special Awards"), model.locale, _M0FP38zongen0116mgpic2026_2dsite4main19bonus__prize__items(model.locale)), _M0FP38zongen0116mgpic2026_2dsite4main27view__referral__prize__card(model.locale)])])]);
}
function _M0FP38zongen0116mgpic2026_2dsite4main20view__showcase__wall(model) {
  const _tmp = _M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main20view__showcase__wallN6constrS215, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_M0FP38zongen0116mgpic2026_2dsite4main14section__intro(_M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "优秀作品展示墙", "Showcase Wall"), _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "项目通过申报、公开开发和验收后，会按作品卡片集中展示", "Projects are featured as cards after proposal review, public development, and acceptance"), _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "参考 MoonBit 展示墙的信息结构：公开仓库、项目简介、核心亮点、标签和相关链接都放在同一张卡片里。", "Following the MoonBit showcase pattern, each card groups the public repository, project summary, highlights, tags, and related links together.")), _M0FP319moonbit_2dcommunity7rabbita4html1aGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main20view__showcase__wallN6constrS216, undefined, -1, "https://www.gitlink.org.cn/competitions/track1_2026MoonBit", undefined, undefined, undefined, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "报名争取上墙", "Register to be featured"), -1)]);
  const _p$2 = _M0FP38zongen0116mgpic2026_2dsite4main17showcase__signals(model.locale);
  const _p$3 = new Array(_p$2.length);
  const _p$4 = _p$2.length;
  let _tmp$2 = 0;
  while (true) {
    const _p$5 = _tmp$2;
    if (_p$5 < _p$4) {
      const _p$6 = _p$2[_p$5];
      _p$3[_p$5] = _M0FP38zongen0116mgpic2026_2dsite4main22view__showcase__signal(_p$6);
      _tmp$2 = _p$5 + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const _tmp$3 = _M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main20view__showcase__wallN6constrS214, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_tmp, _M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main20view__showcase__wallN6constrS217, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _p$3)]);
  const _tmp$4 = _M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main20view__showcase__wallN6constrS218, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html1pGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "展示位预留", "Reserved slots")), _M0FP319moonbit_2dcommunity7rabbita4html2h3GsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "通过验收的优秀项目会按下面格式更新", "Accepted projects will be updated in this format"))]);
  const _p$5 = _M0FP38zongen0116mgpic2026_2dsite4main18showcase__projects(model.locale);
  const _p$6 = new Array(_p$5.length);
  const _p$7 = _p$5.length;
  let _tmp$5 = 0;
  while (true) {
    const _p$8 = _tmp$5;
    if (_p$8 < _p$7) {
      const _p$9 = _p$5[_p$8];
      _p$6[_p$8] = _M0FP38zongen0116mgpic2026_2dsite4main23view__showcase__project(_p$9);
      _tmp$5 = _p$8 + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return _M0FP319moonbit_2dcommunity7rabbita4html7sectionGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, _M0FP38zongen0116mgpic2026_2dsite4main20view__showcase__wallN6constrS211, _M0FP38zongen0116mgpic2026_2dsite4main20view__showcase__wallN6constrS212, undefined, -1, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main20view__showcase__wallN6constrS213, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_tmp$3, _tmp$4, _M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main20view__showcase__wallN6constrS219, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _p$6)])]);
}
function _M0FP38zongen0116mgpic2026_2dsite4main13view__process(model) {
  const _tmp = _M0FP38zongen0116mgpic2026_2dsite4main14section__intro(_M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "比赛流程", "Process"), _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "项目申报、开发、验收、评选展示", "Proposal, development, acceptance, final showcase"), "");
  const _tmp$2 = _M0FP319moonbit_2dcommunity7rabbita4html5theadGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html2trGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html2thGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "时间", "Time")), _M0FP319moonbit_2dcommunity7rabbita4html2thGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "流程", "Stage")), _M0FP319moonbit_2dcommunity7rabbita4html2thGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "说明", "Details"))])]);
  const _p$2 = _M0FP38zongen0116mgpic2026_2dsite4main14process__items(model.locale);
  const _p$3 = new Array(_p$2.length);
  const _p$4 = _p$2.length;
  let _tmp$3 = 0;
  while (true) {
    const _p$5 = _tmp$3;
    if (_p$5 < _p$4) {
      const _p$6 = _p$2[_p$5];
      _p$3[_p$5] = _M0FP38zongen0116mgpic2026_2dsite4main18view__process__row(_p$6);
      _tmp$3 = _p$5 + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return _M0FP319moonbit_2dcommunity7rabbita4html7sectionGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, _M0FP38zongen0116mgpic2026_2dsite4main13view__processN6constrS220, _M0FP38zongen0116mgpic2026_2dsite4main13view__processN6constrS221, undefined, -1, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main13view__processN6constrS222, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_tmp, _M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main13view__processN6constrS223, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html5tableGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main13view__processN6constrS224, undefined, -1, undefined, [_tmp$2, _M0FP319moonbit_2dcommunity7rabbita4html5tbodyGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, _p$3)])])])]);
}
function _M0FP38zongen0116mgpic2026_2dsite4main16view__directions(model) {
  const _tmp = _M0FP38zongen0116mgpic2026_2dsite4main14section__intro(_M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "项目方向", "Directions"), _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "从一个可发布的 MoonBit 包开始", "Start with one publishable MoonBit package"), _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "项目可以原创，也可以移植成熟生态里的开源库；避免直接重复 MoonBit 生态中已有且功能高度重合的成熟项目。", "Projects can be original or ports of mature open-source libraries, while avoiding mature MoonBit projects with highly overlapping functionality."));
  const _p$2 = _M0FP38zongen0116mgpic2026_2dsite4main16direction__cards(model.locale);
  const _p$3 = new Array(_p$2.length);
  const _p$4 = _p$2.length;
  let _tmp$2 = 0;
  while (true) {
    const _p$5 = _tmp$2;
    if (_p$5 < _p$4) {
      const _p$6 = _p$2[_p$5];
      _p$3[_p$5] = _M0FP38zongen0116mgpic2026_2dsite4main16view__list__card(_p$6);
      _tmp$2 = _p$5 + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return _M0FP319moonbit_2dcommunity7rabbita4html7sectionGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, _M0FP38zongen0116mgpic2026_2dsite4main16view__directionsN6constrS225, _M0FP38zongen0116mgpic2026_2dsite4main16view__directionsN6constrS226, undefined, -1, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main16view__directionsN6constrS227, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_tmp, _M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main16view__directionsN6constrS228, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _p$3)])]);
}
function _M0FP38zongen0116mgpic2026_2dsite4main18view__requirements(model) {
  const _tmp = _M0FP38zongen0116mgpic2026_2dsite4main14section__intro(_M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "注意事项", "Notes"), _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "报名、开发、验收前先确认这些关键信息", "Confirm these key points before registration, development, and acceptance"), _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "这里合并放置参赛过程中最容易漏掉的信息，包含报名材料、有效工作量、验收底线、开源合规和奖励说明。", "This section collects the most commonly missed information, including proposal materials, valid work scope, acceptance baseline, open-source compliance, and rewards."));
  const _tmp$2 = _M0FP319moonbit_2dcommunity7rabbita4html4spanGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main18view__requirementsN6constrS234, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "参赛必读", "Must read"));
  const _tmp$3 = _M0FP319moonbit_2dcommunity7rabbita4html2h3GsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "重要信息清单", "Key information checklist"));
  const _p$2 = _M0FP38zongen0116mgpic2026_2dsite4main16attention__items(model.locale);
  const _p$3 = new Array(_p$2.length);
  const _p$4 = _p$2.length;
  let _tmp$4 = 0;
  while (true) {
    const _p$5 = _tmp$4;
    if (_p$5 < _p$4) {
      const _p$6 = _p$2[_p$5];
      _p$3[_p$5] = _M0FP319moonbit_2dcommunity7rabbita4html2liGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, undefined, -1, undefined, undefined, _p$6);
      _tmp$4 = _p$5 + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return _M0FP319moonbit_2dcommunity7rabbita4html7sectionGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, _M0FP38zongen0116mgpic2026_2dsite4main18view__requirementsN6constrS229, _M0FP38zongen0116mgpic2026_2dsite4main18view__requirementsN6constrS230, undefined, -1, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main18view__requirementsN6constrS231, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_tmp, _M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main18view__requirementsN6constrS232, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html7articleGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main18view__requirementsN6constrS233, undefined, -1, undefined, [_tmp$2, _tmp$3, _M0FP319moonbit_2dcommunity7rabbita4html2ulGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main18view__requirementsN6constrS235, undefined, -1, undefined, undefined, _p$3), _M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main18view__requirementsN6constrS236, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html1aGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main18view__requirementsN6constrS237, undefined, -1, "https://www.gitlink.org.cn/competitions/track1_2026MoonBit", undefined, undefined, undefined, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "项目申报", "Submit proposal"), -1), _M0FP319moonbit_2dcommunity7rabbita4html1aGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main18view__requirementsN6constrS238, undefined, -1, "https://bxup9uklfcb.feishu.cn/share/base/form/shrcnlOdTfQUDNW5raWrQDqVTQg", undefined, undefined, undefined, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "验收入口", "Acceptance form"), -1)])])])])]);
}
function _M0FP38zongen0116mgpic2026_2dsite4main9view__faq(model) {
  const _tmp = _M0FP38zongen0116mgpic2026_2dsite4main14section__intro("FAQ", _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "常见问题", "Frequently asked questions"), "");
  const _p$2 = _M0FP38zongen0116mgpic2026_2dsite4main10faq__items(model.locale);
  const _p$3 = new Array(_p$2.length);
  const _p$4 = _p$2.length;
  let _tmp$2 = 0;
  while (true) {
    const _p$5 = _tmp$2;
    if (_p$5 < _p$4) {
      const _p$6 = _p$2[_p$5];
      _p$3[_p$5] = _M0FP38zongen0116mgpic2026_2dsite4main15view__faq__item(_p$6);
      _tmp$2 = _p$5 + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return _M0FP319moonbit_2dcommunity7rabbita4html7sectionGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, _M0FP38zongen0116mgpic2026_2dsite4main9view__faqN6constrS239, _M0FP38zongen0116mgpic2026_2dsite4main9view__faqN6constrS240, undefined, -1, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main9view__faqN6constrS241, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_tmp, _M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main9view__faqN6constrS242, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _p$3)])]);
}
function _M0FP38zongen0116mgpic2026_2dsite4main12view__footer(model) {
  return _M0FP319moonbit_2dcommunity7rabbita4html6footerGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main12view__footerN6constrS243, undefined, -1, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main12view__footerN6constrS244, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main12view__footerN6constrS245, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html6strongGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "MoonBit 国产基础软件生态开源大赛", "MoonBit Open Source Contest")), _M0FP319moonbit_2dcommunity7rabbita4html1pGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "2026 官方网站", "2026 MoonBit Open Source Ecosystem Competition"))]), _M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main12view__footerN6constrS246, undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_M0FP319moonbit_2dcommunity7rabbita4html1aGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, "https://www.moonbitlang.cn/", _M0FP38zongen0116mgpic2026_2dsite4main12view__footerN6constrS247, _M0FP38zongen0116mgpic2026_2dsite4main12view__footerN6constrS248, undefined, undefined, _M0FP38zongen0116mgpic2026_2dsite4main1t(model.locale, "MoonBit 中文官网", "MoonBit website"), -1), _M0FP319moonbit_2dcommunity7rabbita4html1aGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, "https://mooncakes.io/", _M0FP38zongen0116mgpic2026_2dsite4main12view__footerN6constrS249, _M0FP38zongen0116mgpic2026_2dsite4main12view__footerN6constrS250, undefined, undefined, "Mooncakes", -1), _M0FP319moonbit_2dcommunity7rabbita4html1aGsE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, undefined, undefined, -1, "https://github.com/zongen01/MGPIC2026", _M0FP38zongen0116mgpic2026_2dsite4main12view__footerN6constrS251, _M0FP38zongen0116mgpic2026_2dsite4main12view__footerN6constrS252, undefined, undefined, "GitHub", -1)])])]);
}
function _M0FP38zongen0116mgpic2026_2dsite4main4view(dispatch, model) {
  return _M0FP319moonbit_2dcommunity7rabbita4html3divGRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main11site__class(model.theme, false), undefined, -1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [_M0FP38zongen0116mgpic2026_2dsite4main12view__header(dispatch, model), _M0FP38zongen0116mgpic2026_2dsite4main18is__progress__page() ? _M0FP319moonbit_2dcommunity7rabbita4html6main__GRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main4viewN6constrS253, undefined, -1, undefined, [_M0FP38zongen0116mgpic2026_2dsite4main20view__progress__page(model)]) : _M0FP38zongen0116mgpic2026_2dsite4main18is__showcase__page() ? _M0FP319moonbit_2dcommunity7rabbita4html6main__GRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main4viewN6constrS254, undefined, -1, undefined, [_M0FP38zongen0116mgpic2026_2dsite4main20view__showcase__wall(model)]) : _M0FP38zongen0116mgpic2026_2dsite4main18is__register__page() ? _M0FP319moonbit_2dcommunity7rabbita4html6main__GRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main4viewN6constrS255, undefined, -1, undefined, [_M0FP38zongen0116mgpic2026_2dsite4main20view__register__page(model)]) : _M0FP319moonbit_2dcommunity7rabbita4html6main__GRPB5ArrayGRP319moonbit_2dcommunity7rabbita4html4HtmlEE(_M0DTPC16option6OptionGRPB5ArrayGsEE4None__, undefined, _M0FP38zongen0116mgpic2026_2dsite4main4viewN6constrS256, undefined, -1, undefined, [_M0FP38zongen0116mgpic2026_2dsite4main10view__hero(model), _M0FP38zongen0116mgpic2026_2dsite4main11view__about(model), _M0FP38zongen0116mgpic2026_2dsite4main12view__awards(model), _M0FP38zongen0116mgpic2026_2dsite4main13view__process(model), _M0FP38zongen0116mgpic2026_2dsite4main16view__directions(model), _M0FP38zongen0116mgpic2026_2dsite4main18view__requirements(model), _M0FP38zongen0116mgpic2026_2dsite4main9view__faq(model)]), _M0FP38zongen0116mgpic2026_2dsite4main12view__footer(model)]);
}
(() => {
  const _bind = _M0FP219moonbit_2dcommunity7rabbita20cell__with__dispatchGRP38zongen0116mgpic2026_2dsite4main5ModelRP38zongen0116mgpic2026_2dsite4main3MsgE(_M0FP38zongen0116mgpic2026_2dsite4main14initial__model(), _M0FP38zongen0116mgpic2026_2dsite4main6update, _M0FP38zongen0116mgpic2026_2dsite4main4view);
  const _app = _bind._1;
  _M0MP219moonbit_2dcommunity7rabbita3App5mount(_M0FP219moonbit_2dcommunity7rabbita3new(_app), "mgpic-app");
})();
