import { Component } from '../core/component';
import { memberState, memberStore } from '../store/memberStore';

interface Props {
  [key: string]: unknown;
  member: memberState;
}
export default class Member extends Component {
  public props!: Props;
  constructor(props: Props) {
    super({ props, tagName: 'a', attributes: { class: 'member' } });
  }
  template() {
    const { member } = this.props;
    this.componentRoot.setAttribute('href', `/#/detail?id=${member.id}`);
    return `
    <div class="row-member">  <div class='checkbox-container'>
    <input class='checkbox' type='checkbox'></input>
  </div>
  <p class='photo' style="background-image: url(${member.photoUrl})"></p>
  <p class="name-title">${member.name}</p>
  <p class="email-title">${member.email}</p></div>
    `;
  }

  setEvent() {
    const { member } = this.props;
    this.addEvent('change', '.checkbox', (event) => {
      const target = event.currentTarget as HTMLInputElement;
      if (target.checked) {
        memberStore.state.deleteMembers.push({
          id: member.id,
          photoUrl: member.photoUrl,
        });
      }
    });
  }
}
