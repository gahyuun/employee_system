import Header from '../components/Header';
import { Component } from '../core/component';
import { navigate } from '../core/router';
import { uploadData, uploadImage } from '../store/memberStore';
import { v4 as uuidv4 } from 'uuid';
import { existFile, validateEmail } from '../utils/validate';

export default class Write extends Component {
  template() {
    return `
    <section class="write-title">
    직원을 등록해주세요
    </section>
    <form class="write-container" id='form'>
    <input class="write-name" placeholder="이름을 입력해주세요" name="name" required/>
    <input class="write-email" placeholder="이메일을 입력해주세요" name="email" required/>
    <div class="image-container">
    <input class="write-image" value='' placeholder="이미지를 첨부해주세요 ( 권장 사이즈 400*480 )" disabled>
    <label for="file" class="file-label">파일 선택</label> 
    <input type="file" name="file" id="file" accept=".jpg, .png" class="file-input">
    </div>
    <button class="add-member" type="submit">등록</button>
    </form>
        ;`;
  }
  async getImageUrl(fileData: File) {
    return await uploadImage(fileData, uuidv4());
  }
  async handleSubmit(event: Event) {
    event.preventDefault();
    if (!(event.currentTarget instanceof HTMLFormElement)) return;
    const formData = new FormData(event.currentTarget);

    const name = formData.get('name');
    const email = formData.get('email');
    const file = formData.get('file');
    if (typeof name !== 'string' || typeof email !== 'string') return;

    if (!existFile(file, true)) return;
    if (!validateEmail(email)) return;
    const photoUrl = await this.getImageUrl(file as File); //existFile로 file 존재 유무 확인

    const data = {
      name: name,
      email: email,
      photoUrl: photoUrl,
    };
    uploadData(data);

    navigate();
  }

  setEvent() {
    this.addEvent('change', '.file-input', (event) => {
      const writeImage = this.componentRoot.querySelector('.write-image');
      const target = event.currentTarget;
      if (
        target instanceof HTMLInputElement &&
        writeImage instanceof HTMLInputElement
      )
        writeImage.value = target.value;
    });
    this.addEvent('submit', '.write-container', (event) => {
      this.handleSubmit(event);
    });
  }
  render() {
    this.componentRoot.innerHTML = this.template();
    this.componentRoot.prepend(new Header().componentRoot);
  }
}
