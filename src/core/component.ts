import { DocumentData } from 'firebase/firestore';
import { memberState } from '../store/memberStore';

interface componentPayload {
  tagName?: string;
  props?: { [key: string]: unknown };
  state?: { [key: string]: unknown };
  attributes?: { [key: string]: string };
}

interface eventCallBack {
  (event: Event): void;
}
interface attributes {
  [key: string]: string;
}
export class Component {
  public componentRoot;
  public props;
  public state;
  constructor(payload: componentPayload = {}) {
    const {
      tagName = 'div',
      props = {},
      state = {},
      attributes = {},
    } = payload;
    this.componentRoot = document.createElement(tagName);
    this.props = props;
    this.state = state;
    this.setAttributes(attributes);
    this.render();
    this.setEvent();
  }
  render() {
    //tagName 기본 값이 div이기에 무조건 element를 생성함 null이없음
    this.componentRoot.innerHTML = this.template();
    this.mounted();
  }

  setAttributes(attributes: attributes) {
    for (const key of Object.keys(attributes)) {
      if (key === 'class') {
        this.componentRoot.classList.add(attributes[key]);
        continue;
      }
      this.componentRoot.setAttribute(key, attributes[key]);
    }
  }

  template(member?: DocumentData): string {
    return ``;
  }

  setEvent(member?: DocumentData) {}

  addEvent(eventType: string, selector: string, callback: eventCallBack) {
    const element = this.componentRoot.querySelector(selector);
    element?.addEventListener(eventType, (event) => {
      callback(event);
    });
  }

  mounted() {}
}
