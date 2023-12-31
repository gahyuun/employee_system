import { Component } from '../core/component';
import { navigate } from '../core/router';

export default class NotFound extends Component {
  constructor() {
    super({ attributes: { class: 'not-found' } });
  }
  template() {
    return `
    요청하신 페이지를 찾을 수 없습니다<button class="not-found-button">홈으로 돌아가기 </button>
    `;
  }
  setEvent() {
    this.addEvent('click', '.not-found-button', () => {
      navigate();
    });
  }
}
