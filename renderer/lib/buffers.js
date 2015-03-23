import Logs from './logs';

export default class Buffers {
  constructor(rootChannelName) {
    this._buffers = [{name: rootChannelName, current: true, logs: new Logs()}];
  }

  map(func) {
    return this._buffers.map(func);
  }

  _bufferOps(target) {
    return {
      send: function (nick, text) {
        target.logs.append(nick, text);
        return this;
      }.bind(this)
    }
  }

  to(name) {
    let target = this._buffers.filter(c => (c.name === name))[0];
    if (!target) {
      target = {
        name,
        current: false,
      };
      this._buffers.push(target);
    }

    return this._bufferOps(target);
  }
}