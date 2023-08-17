import Header from '../components/Header';
import { Component } from '../core/component';
import { getUrlParam, navigate } from '../core/router';
import { getMemberDetail, setData, uploadImage } from '../store/memberStore';

export default class Edit extends Component {
  async render() {
    const member = await getMemberDetail(getUrlParam()); //id를 가지고 수정할 member의 상세 데이터를 가져옴
    this.el.innerHTML = `
  <form class="detail">
    <label for="file" class="photo-edit" style="background-image: url(https://api.iconify.design/mdi-light/image.svg?color=%23a0aec0)"></label> 
    <input type="file" name="file" id="file" accept=".jpg, .png" class="file-input"/>
    <section class='information-container edit-container'>
      <section class='information-title'>
      정보를 수정해주세요
      </section>
      <p class='information'>
        <span class='detail-category'>NAME</span>
        <input class="detail-value edit-name" placeholder="${member.name}" name="name" />
      </p>
      <p class='information'>
        <span class='detail-category'>EMAIL</span>
        <input class="detail-value edit-email" placeholder="${member.email}" name="email"/>
      </p>
      <button class="editButton" type="submit">완료</button>
    </section>
  </form> 
    `;
    this.el.prepend(new Header().el); // 공통 헤더 추가

    let photoUrl = member.photoUrl; // 현재 member의 photo url

    const previewImage = async (event) => {
      const photoEdit = this.el.querySelector('.photo-edit');
      let reader = new FileReader();
      reader.onload = (event) => {
        photoEdit.style.backgroundImage = `url(${event.currentTarget.result})`;
      };
      reader.readAsDataURL(event.currentTarget.files[0]);

      photoEdit.style.backgroundImage = `url(${photoUrl})`; // 미리보기
    };
    // 미리보기 함수

    const handleSubmit = async (event) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);

      const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

      if (
        formData.get('email') !== '' &&
        !emailRegex.test(formData.get('email'))
      ) {
        alert('이메일 형식을 지켜주세요');
        return;
      } // 이메일 변경시 이메일 유효성 검사

      if (formData.get('file').name !== '') {
        photoUrl = await uploadImage(formData.get('file'), member.photoUrl);
      } // 사진 변경 시 uploadImage 함수 실행

      const data = {
        name: formData.get('name') === '' ? member.name : formData.get('name'),
        email:
          formData.get('email') === '' ? member.email : formData.get('email'),
        photoUrl: photoUrl,
      };

      setData(data, member.id);

      navigate();
    };
    // 제출 함수

    const imageFile = this.el.querySelector('.file-input');
    const form = this.el.querySelector('.detail');

    imageFile.addEventListener('change', previewImage);
    form.addEventListener('submit', handleSubmit);
  }
}
