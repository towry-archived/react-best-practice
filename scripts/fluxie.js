
var Dispatcher = (function () {
  var KEYWORDS = ['register', 'dispatcher', 'waitFor', 'callbacks', 'pending', '_pendingPayload', '_prefix', 'lastId', '_handled', 'isDispatching'];
  var _isFunc = function (a) { return typeof a === 'function' }

  function Dispatcher (spec) {
    if (! this instanceof Dispatcher) {
      return new Dispatcher(spec);
    }

    if (spec && typeof spec !== 'object') {
      throw new Error("must provide a spec object");
    } else if (typeof spec === 'object') {
      KEYWORDS.forEach(function (k) {
        if (spec[k]) {
          throw new Error("Reserved key `" + k + "` found in the definition");
        }
      })

      for (key in spec) {
        if (_isFunc(spec[key])) {
          this[key] = spec[key].bind(this);
        } else {
          this[key] = spec[key];
        }
      }
    }

    this.callbacks = {};
    this.pending = {};
    this._prefix = 'ID_';
    this.lastId = 0;
    this.isDispatching = false;
    this._handled = {};
  }

  Dispatcher.prototype.register = function (cb, context) {
    if (context) {
      if (typeof cb.bind == 'function') {
        cb = cb.bind(context);
      } else {
        var _cb = cb;
        cb = function (a, b) {
          return function (p) {
            a.call(b, p);
          }
        }.call(this, _cb, context);
      }
    }

    var id = this._prefix + this.lastId++;
    this.callbacks[id] = cb;
    return id;
  }

  Dispatcher.prototype.waitFor = function (ids) {
    if (!this.isDispatching) {
      throw new Error("Can not call waitFor before the start of dispatching");
    }

    if (ids.length === 0) {
      ids = !ids ? [] : [ids];
    }

    for (var i = 0, id; i < ids.length; i++) {
      id = ids[i];
      if (this.pending[id]) {
        if (!this._handled[id]) {
          throw new Error("`" + id + "` is in pending state, but not handled yet, something wrong?");
        } else {
          continue;
        }
      } else {
        if (! id in this.callbacks) {
          typeof console !== 'undefined' && console.warn && console.warn("`" + id + "` not found in the callbacks");
          continue;
        } else {
          this.pending[id] = true;
          this.callbacks[id](this._pendingPayload);
          this._handled[id] = true;
        }
      }
    }
  }

  Dispatcher.prototype.dispatch = function (payload) {
    if (this.isDispatching) {
      throw new Error("Can not dispatch when the Dispatcher is dispatching :(");
    }

    this._pendingPayload = payload;
    this._handled = {};
    this.pending = {};
    this.isDispatching = true;

    var result;

    try {
      for (var i in this.callbacks) {
        if (this.pending[i]) {
          continue;
        }

        this.pending[i] = true;
        result = this.callbacks[i](this._pendingPayload);
        this._handled[i] = true;
      }
    } finally {
      this._pendingPayload = null;
      this.isDispatching = false;
    }

    return result;
  }

  return function (spec) {
    return new Dispatcher(spec);
  }
}());


// exports
exports.create_dispatcher = Dispatcher;
