import SockJS from 'sockjs-client';
import Stomp from "@utils/stomp";
import {WS} from '@utils/context';

class WebSocketWrap {
  private sock = null;
  private client = null;
  private subscription = null;
  private callback = null;
  private topic = null;
  private timer = null;
  private login = null;
  constructor(private url) {
  }
  subscribe(topic, login={}, callback: (res) => void) {
    if (!this.sock) {
      this.sock = new SockJS(this.url + (login && login.login ? topic : ''));
    }
    this.login = login;
    if (!this.client) {
      this.client = Stomp.over(this.sock);
      this.callback = callback;
      if (login && login.login) {
        this.topic = '/bigscreen/topic/reply';
      } else {
        this.topic = topic;
      }
      this.client.connect(login, () => {
        if (login && login.login) {
          this.client.send(`/app/${topic}`, {}, JSON.stringify({
            interfaceName: login.interfaceName,
            text: login.login, schoolCode: login.login}));
        }
        this.sub();
      });
    } else {
      this.sub();
    }
  }
  private sub() {
    this.downtime();
    this.subscription = this.client.subscribe(this.topic, response => {
      const json = JSON.parse(response.body);
      if (json.data) {
        this.callback(json.data);
      } else {
        this.callback(json);
      }
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.downtime();
    })
  }
  private downtime() {
    this.timer = setTimeout(() => {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      this.sock = null;
      this.subscription = null;
      this.client = null;
      this.subscribe(this.topic, this.login, this.callback)
    }, 10000);
  }
}


export default function create (url = WS) {
  const ws = new WebSocketWrap(url);
  return ws;
};
