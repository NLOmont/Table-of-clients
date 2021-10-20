(() => {
  const body = document.querySelector('body');
  const tableBody = document.querySelector('tbody');
  tableBody.style.position = 'relative';

  loadTable();

  document.querySelector('.section-table__btn-add').addEventListener('click', () => {
    createModal('Новый клиент', 'Отмена');
  })

  async function loadTable() {
    tableBody.style.height = '200px';
    let preloaderWrapper = document.createElement('div');
    preloaderWrapper.classList.add('preloader__wrapper');
    tableBody.append(preloaderWrapper);
    let preloader = document.createElement('div');
    preloader.classList.add('preloader');
    preloader.innerHTML =  `
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.00025 40.0005C4.00025 59.8825 20.1182 76.0005 40.0002 76.0005C59.8822 76.0005 76.0002 
    59.8825 76.0002 40.0005C76.0002 20.1185 59.8823 4.00049 40.0003 4.00049C35.3513 4.00048 30.9082 
    4.88148 26.8282 6.48648" stroke="#9873FF" stroke-width="8" stroke-miterlimit="10" stroke-linecap="round"/>
    </svg>`;
    preloaderWrapper.append(preloader);
    const response = await fetch(`http://localhost:3000/api/clients`);
    const listClients = await response.json();
    for (let client of listClients) {
      const row = document.createElement('tr');
      row.classList.add('section-table__client');
      tableBody.append(row);
      let dateCreating = new Date(client.createdAt);
      let yearCreating = dateCreating.getFullYear();
      let monthCreating = dateCreating.getMonth() + 1;
      if (monthCreating < 10) {
        monthCreating = '0' + monthCreating;
      }
      let dayCreating = dateCreating.getDate();
      if (dayCreating < 10) {
        dayCreating = '0' + dayCreating;
      }
      let hoursCreating = dateCreating.getHours();
      if (hoursCreating < 10) {
        hoursCreating = '0' + hoursCreating;
      }
      let minutesCreating = dateCreating.getMinutes();
      if (minutesCreating < 10) {
        minutesCreating = '0' + minutesCreating;
      }

      let dateUpdating = new Date(client.updatedAt);
      let yearUpdating = dateUpdating.getFullYear();
      let monthUpdating = dateUpdating.getMonth() + 1;
      if (monthUpdating < 10) {
        monthUpdating = '0' + monthUpdating;
      }
      let dayUpdating = dateUpdating.getDate();
      if (dayUpdating < 10) {
        dayUpdating = '0' + dayUpdating;
      }
      let hoursUpdating = dateUpdating.getHours();
      if (hoursUpdating < 10) {
        hoursUpdating = '0' + hoursUpdating;
      }
      let minutesUpdating = dateUpdating.getMinutes();
      if (minutesUpdating < 10) {
        minutesUpdating = '0' + minutesUpdating;
      }

      let idTd = document.createElement('td');
      idTd.classList.add('section-table__client-td', 'section-table__client-id');
      idTd.textContent = client.id;
      row.append(idTd);

      let nameTd = document.createElement('td');
      nameTd.classList.add('section-table__client-td', 'section-table__client-name');
      nameTd.textContent = `${client.surname} ${client.name} ${client.lastName}`;
      row.append(nameTd);

      let creatingTd = document.createElement('td');
      creatingTd.classList.add('section-table__client-td', 'section-table__client-creating');
      creatingTd.textContent = `${dayCreating}.${monthCreating}.${yearCreating}`
      row.append(creatingTd);
      let timeCreating = document.createElement('span');
      timeCreating.classList.add('section-table__client-time');
      timeCreating.textContent = `${hoursCreating}:${minutesCreating}`;
      creatingTd.append(timeCreating);

      let updatingTd = document.createElement('td');
      updatingTd.classList.add('section-table__client-td', 'section-table__client-updating');
      updatingTd.textContent = `${dayUpdating}.${monthUpdating}.${yearUpdating}`
      row.append(updatingTd);
      let timeUpdating = document.createElement('span');
      timeUpdating.classList.add('section-table__client-time');
      timeUpdating.textContent = `${hoursUpdating}:${minutesUpdating}`;
      updatingTd.append(timeUpdating);

      let contactsTd = document.createElement('td');
      contactsTd.classList.add('section-table__client-td', 'section-table__client-contacts');
      row.append(contactsTd);

      let extraContacts;
      let i = 0;
      for (let contact of client.contacts) {  
        let iconWrapper = document.createElement('div');
        iconWrapper.classList.add('section-table__client-contact-icon-wrapper');

        if (contact.type === 'Телефон') {
          iconWrapper.innerHTML =  `
          <svg class="section-table__client-contact-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.7">
              <circle cx="8" cy="8" r="8" fill="#9873FF"/>
              <path d="M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 
              9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 
              6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 
              6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 
              9.70222 11.8 9.50222 11.56 9.50222Z" fill="white"/>
            </g>
          </svg>`;
        }
        if (contact.type === 'Facebook') {
          iconWrapper.innerHTML =  `
          <svg class="section-table__client-contact-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.7">
              <path d="M7.99999 0C3.6 0 0 3.60643 0 8.04819C0 12.0643 2.928 15.3976 6.75199 16V10.3775H4.71999V8.04819H6.75199V6.27309C6.75199 4.25703 7.94399 3.14859 9.77599 3.14859C10.648 3.14859 11.56 3.30121 11.56 3.30121V5.28514H10.552C9.55999 5.28514 9.24799 5.90362 9.24799 6.53815V8.04819H11.472L11.112 10.3775H9.24799V16C11.1331 15.7011 12.8497 14.7354 14.0879 13.2772C15.3261 11.819 16.0043 9.96437 16 8.04819C16 3.60643 12.4 0 7.99999 0Z" fill="#9873FF"/>
            </g>
          </svg>`;
        }
        if (contact.type === 'Доп. телефон') {
          iconWrapper.innerHTML =  `
          <svg class="section-table__client-contact-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 
            16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM3 8C3 5.24 
            5.24 3 8 3C10.76 3 13 5.24 13 8C13 10.76 10.76 13 8 13C5.24 13 3 10.76 3 8ZM9.5 6C9.5 5.17 8.83
             4.5 8 4.5C7.17 4.5 6.5 5.17 6.5 6C6.5 6.83 7.17 7.5 8 7.5C8.83 7.5 9.5 6.83 9.5 6ZM5 9.99C5.645 
             10.96 6.75 11.6 8 11.6C9.25 11.6 10.355 10.96 11 9.99C10.985 8.995 8.995 8.45 8 8.45C7 8.45 5.015 8.995 5 9.99Z" fill="#9873FF"/>
          </svg>`;
        }
        if (contact.type === 'Vk') {
          iconWrapper.innerHTML =  `
          <svg class="section-table__client-contact-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.7">
              <path d="M8 0C3.58187 0 0 3.58171 0 8C0 12.4183 3.58187 16 8 16C12.4181 16 16 12.4183 16 8C16 
              3.58171 12.4181 0 8 0ZM12.058 8.86523C12.4309 9.22942 12.8254 9.57217 13.1601 9.97402C13.3084 
              10.1518 13.4482 10.3356 13.5546 10.5423C13.7065 10.8371 13.5693 11.1604 13.3055 11.1779L11.6665 
              11.1776C11.2432 11.2126 10.9064 11.0419 10.6224 10.7525C10.3957 10.5219 10.1853 10.2755 9.96698 
              10.037C9.87777 9.93915 9.78382 9.847 9.67186 9.77449C9.44843 9.62914 9.2543 9.67366 9.1263 
              9.90707C8.99585 10.1446 8.96606 10.4078 8.95362 10.6721C8.93577 11.0586 8.81923 11.1596 8.43147 
              11.1777C7.60291 11.2165 6.81674 11.0908 6.08606 10.6731C5.44147 10.3047 4.94257 9.78463 4.50783 
              9.19587C3.66126 8.04812 3.01291 6.78842 2.43036 5.49254C2.29925 5.2007 2.39517 5.04454 2.71714 
              5.03849C3.25205 5.02817 3.78697 5.02948 4.32188 5.03799C4.53958 5.04143 4.68362 5.166 4.76726 
              5.37142C5.05633 6.08262 5.4107 6.75928 5.85477 7.38684C5.97311 7.55396 6.09391 7.72059 6.26594 
              7.83861C6.45582 7.9689 6.60051 7.92585 6.69005 7.71388C6.74734 7.57917 6.77205 7.43513 6.78449 
              7.29076C6.82705 6.79628 6.83212 6.30195 6.75847 5.80943C6.71263 5.50122 6.53929 5.30218 6.23206 
              5.24391C6.07558 5.21428 6.0985 5.15634 6.17461 5.06697C6.3067 4.91245 6.43045 4.81686 6.67777 
              4.81686L8.52951 4.81653C8.82136 4.87382 8.88683 5.00477 8.92645 5.29874L8.92808 7.35656C8.92464 
              7.47032 8.98521 7.80751 9.18948 7.88198C9.35317 7.936 9.4612 7.80473 9.55908 7.70112C10.0032 
              7.22987 10.3195 6.67368 10.6029 6.09801C10.7279 5.84413 10.8358 5.58142 10.9406 5.31822C11.0185 
              5.1236 11.1396 5.02785 11.3593 5.03112L13.1424 5.03325C13.195 5.03325 13.2483 5.03374 13.3004 
              5.04274C13.6009 5.09414 13.6832 5.22345 13.5903 5.5166C13.4439 5.97721 13.1596 6.36088 12.8817 
              6.74553C12.5838 7.15736 12.2661 7.55478 11.9711 7.96841C11.7001 8.34652 11.7215 8.53688 12.058 8.86523Z" fill="#9873FF"/>
            </g>
          </svg>`;
        }
        if (contact.type === 'Email') {
          iconWrapper.innerHTML =  `
          <svg class="section-table__client-contact-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 
            8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 5.75C4 5.3375 
            4.36 5 4.8 5H11.2C11.64 5 12 5.3375 12 5.75V10.25C12 10.6625 11.64 11 11.2 11H4.8C4.36 11 4 
            10.6625 4 10.25V5.75ZM8.424 8.1275L11.04 6.59375C11.14 6.53375 11.2 6.4325 11.2 6.32375C11.2 
            6.0725 10.908 5.9225 10.68 6.05375L8 7.625L5.32 6.05375C5.092 5.9225 4.8 6.0725 4.8 6.32375C4.8 
            6.4325 4.86 6.53375 4.96 6.59375L7.576 8.1275C7.836 8.28125 8.164 8.28125 8.424 8.1275Z" fill="#9873FF"/>
          </svg>`;
        }

        let prompt = document.createElement('div');
        prompt.classList.add('section-table__client-contact-prompt');
        prompt.style.display = 'none'
        prompt.innerHTML = `${contact.type} : <b>${contact.value}</b>`
        iconWrapper.prepend(prompt);
        let fifthIcon;
        i++;
        if (i > 5) {
          extraContacts.append(iconWrapper);
          extraContacts.style.display= 'none';
        } else {
          if (i === 5) {
            fifthIcon = iconWrapper;
            fifthIcon.style.display = 'none';
            contactsTd.append(fifthIcon);
          }
          contactsTd.append(iconWrapper);
        }

        if (i === 5) {
          const btnContactsIcon = document.createElement('button');
          btnContactsIcon.classList.add('section-table__client-contact-btn');
          btnContactsIcon.textContent = `+${client.contacts.length - 4}`;
          contactsTd.append(btnContactsIcon);
          
          extraContacts = document.createElement('div');
          extraContacts.classList.add('section-table__client-contacts-extra');
          contactsTd.append(extraContacts);
          
          btnContactsIcon.addEventListener('click', () => {
            fifthIcon.style.display = 'block';
            extraContacts.style.display = 'flex';
            btnContactsIcon.remove();
          })
        }

        iconWrapper.addEventListener('mouseover', () => {
          prompt.style.display = 'block';
        })

        iconWrapper.addEventListener('mouseout', () => {
          prompt.style.display = 'none';
        })
      }
      
      let btnsTd = document.createElement('td');
      btnsTd.classList.add('section-table__client-td', 'section-table__client-td-btns');
      row.append(btnsTd);
      let btnUpdate = document.createElement('button');
      btnUpdate.classList.add('section-table__client-btn', 'section-table__client-btn-update');
      btnUpdate.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.7">
          <path d="M2 11.5V14H4.5L11.8733 6.62662L9.37333 4.12662L2 11.5ZM13.8067 4.69329C14.0667 
          4.43329 14.0667 4.01329 13.8067 3.75329L12.2467 2.19329C11.9867 1.93329 11.5667 1.93329 
          11.3067 2.19329L10.0867 3.41329L12.5867 5.91329L13.8067 4.69329Z" fill="#9873FF"/>
        </g>
      </svg>
      Изменить`;
      btnsTd.append(btnUpdate);

      btnUpdate.addEventListener('click', () => {
        btnUpdate.innerHTML = `
        <svg class="preloader-btn" width="12" height="12" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.00008 6.03996C1.00008 8.82344 3.2566 11.08 6.04008 11.08C8.82356 11.08 11.0801 8.82344 11.0801 6.03996C11.0801 3.25648 8.82356 0.999956 6.04008 0.999956C5.38922 0.999956 4.7672 1.1233 4.196 1.348" stroke="#9873FF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
        </svg>
        Изменить`;
        setTimeout(() => {
          createModal('Изменить данные', 'Удалить', client.id);
          let inputs = document.querySelectorAll('.modal__input');
          let labels = document.querySelectorAll('.modal__label');
          inputs[0].value = `${client.surname}`;
          labels[0].classList.add('modal__label_active');
          inputs[1].value = `${client.name}`;
          labels[1].classList.add('modal__label_active');
          inputs[2].value = `${client.lastName}`;
          if (inputs[2].value !== '') labels[2].classList.add('modal__label_active');
          
          for (let contact of client.contacts) {
            addContact(contact.type, contact.value)
          }

          window.location.hash = `${client.id}`;
            btnUpdate.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.7">
                <path d="M2 11.5V14H4.5L11.8733 6.62662L9.37333 4.12662L2 11.5ZM13.8067 4.69329C14.0667 
                4.43329 14.0667 4.01329 13.8067 3.75329L12.2467 2.19329C11.9867 1.93329 11.5667 1.93329 
                11.3067 2.19329L10.0867 3.41329L12.5867 5.91329L13.8067 4.69329Z" fill="#9873FF"/>
              </g>
            </svg>
            Изменить`;
        }, 700);
      })

      let btnDelete = document.createElement('button');
      btnDelete.classList.add('section-table__client-btn', 'section-table__client-btn-delete');
      btnDelete.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> 
        <g opacity="0.7"> 
          <path d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 
          12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 
          7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z" fill="#F06A4D"/>
        </g>
      </svg>
      Удалить`;
      btnsTd.append(btnDelete);

      btnDelete.addEventListener('click', () => {
        modalDelete(client.id);
      })
    }
      preloaderWrapper.remove();
      tableBody.style.height = 'auto';
  }

  function createModal(heading, btn, id = '') {
    const modalWrapper = document.createElement('div');
    modalWrapper.classList.add('modal__wrapper');
    body.append(modalWrapper);

    modalWrapper.addEventListener('click', () => {
      modalWrapper.remove();
    })

    const modalForm = document.createElement('form');
    modalForm.classList.add('modal__form');
    modalWrapper.append(modalForm);

    modalForm.addEventListener('click', e => {
      e.stopPropagation();
    })

    const btnClose = document.createElement('button');
    btnClose.classList.add('modal__btn-close');
    modalForm.append(btnClose);
    
    btnClose.addEventListener('click', e => {
      e.preventDefault();
      modalWrapper.remove();
      window.location.hash = '';
    })

    const modalFormContent = document.createElement('div');
    modalFormContent.classList.add('modal__form-content');
    modalForm.append(modalFormContent);

    const modalHeading = document.createElement('h3');
    modalHeading.classList.add('modal__form-heading');
    modalHeading.textContent = heading;
    modalFormContent.append(modalHeading);

    const modalId = document.createElement('span');
    modalId.classList.add('modal__id');
    (id != '') ? modalId.textContent = `ID: ${id}` : modalId.textContent = id;
    modalHeading.append(modalId);

    for (let i = 0; i < 3; i++) {
      const modalInputWrapper = document.createElement('div');
      modalInputWrapper.classList.add('modal__input-wrapper');
      modalFormContent.append(modalInputWrapper);

      const modalLabel = document.createElement('label');
      modalLabel.classList.add('modal__label');
      modalInputWrapper.append(modalLabel);
      
      const modalInput = document.createElement('input');
      modalInput.classList.add('modal__input');
      modalInputWrapper.append(modalInput);

      modalInput.addEventListener('input', () => {
        if (modalInput.value === '') {
          modalLabel.classList.remove('modal__label_active');
        } else {
          modalLabel.classList.add('modal__label_active');
          modalInput.classList.remove('modal__input_error');
        }
      })
    }

    const modalLabels = document.querySelectorAll('.modal__label');
    modalLabels[0].innerHTML = `Фамилия<span>*</span>`;
    modalLabels[1].innerHTML = `Имя<span>*</span>`;
    modalLabels[2].innerHTML = 'Отчество';

    const modalContactsWrapper = document.createElement('div');
    modalContactsWrapper.classList.add('modal__contacts-wrapper');
    modalForm.append(modalContactsWrapper);

    const modalContactsBtn = document.createElement('button');
    modalContactsBtn.classList.add('modal__contacts-btn');
    modalContactsBtn.innerHTML = `
    <svg class="modal__contacts-btn-icon" width="16" height="16">
      <circle class="icon-circle" r="6" cx="8" cy="8" fill="transparent" stroke="#9873FF" stroke-width="1"/>
      <g fill="#9873FF">
        <rect width="1.6" height="6" x="7.2" y="5"/>
        <rect width="6" height="1.6" x="5" y="7.2"/>
        <circle r=".8" cx="8" cy="5"/>
        <circle r=".8" cx="8" cy="11"/>
        <circle r=".8" cx="11" cy="8"/>
        <circle r=".8" cx="5" cy="8"/>
      </g>
    </svg>
    Добавить контакт`;
    modalContactsWrapper.append(modalContactsBtn);
    modalContactsBtn.addEventListener('click', e => {
      e.preventDefault();
      addContact();
    })

    const errors = document.createElement('div');
    errors.classList.add('modal__errors');
    modalForm.append(errors);

    const modalBtnSave = document.createElement('button');
    modalBtnSave.classList.add('modal__btn');
    modalBtnSave.textContent = 'Сохранить';
    modalForm.append(modalBtnSave);

    modalBtnSave.addEventListener('click', async e => {
      e.preventDefault();
      let arrayContacts = [];
      errors.innerHTML = '';
      let types = document.querySelectorAll('.modal__contact-selected-option');
      let inputsContact = document.querySelectorAll('.modal__contact-input');
      let inputs = document.querySelectorAll('.modal__input');
      let errorContact = false;
      let errorName = false;

      for (let i = 0; i < inputsContact.length; i++) {
        if (inputsContact[i].value === '') {
          inputsContact[i].classList.add('modal__input-contact_error');
          errorContact = true;
        }
      }

      for (let i = 0; i < 2; i++) {
        if (inputs[i].value === '') {
          inputs[i].classList.add('modal__input_error');
          errorName = true;
        }
      }

      if (errorName === true || errorContact === true) {
        if (errorName === true) {
          let error = document.createElement('div');
          error.classList.add('modal__error');
          error.textContent = 'Ошибка: имя и фамилия обязательны для заполнения!';
          errors.append(error);
        }

        if (errorContact === true) {
          let error = document.createElement('div');
          error.classList.add('modal__error');
          error.textContent = 'Ошибка: каждый добавленный контакт должен быть полностью заполнен!';
          errors.append(error);
        }

      } else {

        for (let i = 0; i < types.length; i++) {
          arrayContacts[i] = {type: types[i].textContent, value: inputsContact[i].value};
        }

        for (let input of inputs) {
          input.disabled = true;
        }

        window.location.hash = '';

        if (id === '') {
          await fetch('http://localhost:3000/api/clients', {
            method: 'POST',
            body: JSON.stringify({
              surname: inputs[0].value.trim(),
              name: inputs[1].value.trim(),
              lastName: inputs[2].value.trim(),
              contacts: arrayContacts,
            }),
            headers: {
              'Content-Type': 'application/json',
            }
          }) 
        } else {
          await fetch(`http://localhost:3000/api/clients/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
              surname: inputs[0].value.trim(),
              name: inputs[1].value.trim(),
              lastName: inputs[2].value.trim(),
              contacts: arrayContacts,
            }),
            headers: {
              'Content-Type': 'application/json',
            }
          }) 
        }
        modalWrapper.remove();
      }
    })
    
    const modalBtnCancel = document.createElement('button');
    modalBtnCancel.classList.add('modal__btn-cancel');
    modalBtnCancel.textContent = btn;
    modalForm.append(modalBtnCancel);

    if (btn === 'Отмена') {
      modalBtnCancel.addEventListener('click', e => {
        e.preventDefault();
        modalWrapper.remove();
      }) 
    } else {
      modalBtnCancel.addEventListener('click', e => {
        e.preventDefault();
        modalWrapper.remove();
        modalDelete(id);
      }) 
    }

    const listContacts = document.createElement('div');
    listContacts.classList.add('modal__contacts-list');
    modalContactsWrapper.prepend(listContacts); 
  }

  function addContact(defaultOption = 'Телефон', defaultValue = '') {
    const сontactWrapper = document.createElement('div');
    сontactWrapper.classList.add('modal__contact-wrapper');
    document.querySelector('.modal__contacts-list').append(сontactWrapper);

    const customSelect = document.createElement('div');
    customSelect.classList.add('modal__contact-select');
    сontactWrapper.append(customSelect);

    const optionSelected = document.createElement('div');
    optionSelected.classList.add('modal__contact-selected-option');
    optionSelected.textContent = defaultOption;
    customSelect.append(optionSelected);

    const listOptions = document.createElement('ul');
    listOptions.classList.add('modal__contact-list', 'modal__contact-list_hidden');
    customSelect.append(listOptions)

    for(let i = 1; i < 5; i++) {
      const option = document.createElement('li');
      option.classList.add('modal__contact-option');
      if (i === 1) {
        (defaultOption != 'Доп. телефон') ? option.textContent = 'Доп. телефон' : option.textContent = 'Телефон';
      }
      if (i === 2) {
        (defaultOption != 'Email') ? option.textContent = 'Email' : option.textContent = 'Телефон';
      }
      if (i === 3) {
        (defaultOption != 'Vk') ? option.textContent = 'Vk' : option.textContent = 'Телефон';
      }
      if (i === 4) {
        (defaultOption != 'Facebook') ? option.textContent = 'Facebook' : option.textContent = 'Телефон';
      }
      listOptions.append(option);

      option.addEventListener('click', function() {
        let currentOption = optionSelected.textContent;
        optionSelected.textContent = this.textContent;
        this.textContent = currentOption;
        toggleListOptions();
      })
    }

    const input = document.createElement('input');
    input.classList.add('modal__contact-input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Введите данные контакта');
    input.value = defaultValue;
    сontactWrapper.append(input);

    input.addEventListener('input', () => {
      if (input.value !== '') {
        input.classList.remove('modal__input-contact_error');
      }
    })
    
    const btnDelete = document.createElement('button');
    btnDelete.classList.add('modal__contact-btn-delete');
    btnDelete.innerHTML =  `
    <svg width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 
      12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 
      7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z" fill="#B0B0B0"/>
    </svg>`
    сontactWrapper.append(btnDelete);

    const promptBtnDelete = document.createElement('div');
    promptBtnDelete.classList.add('section-table__client-contact-prompt');
    promptBtnDelete.style.bottom = '100%';
    promptBtnDelete.textContent = 'Удалить контакт';
    btnDelete.prepend(promptBtnDelete);

    document.querySelector('.modal__form').addEventListener('click', () => {
      if (!listOptions.classList.contains('modal__contact-list_hidden')) {
        listOptions.classList.add('modal__contact-list_hidden');
      }
    })

    optionSelected.addEventListener('click', e => {
      toggleListOptions();
      e.stopPropagation();
    })

    btnDelete.addEventListener('click', e => {
      e.preventDefault();
      сontactWrapper.parentNode.removeChild(сontactWrapper);
    })

    function toggleListOptions() {
      listOptions.classList.toggle('modal__contact-list_hidden');
      optionSelected.classList.toggle('modal__contact-selected-option_active');
    }
  }

  function modalDelete(id) {
    const modalWrapper = document.createElement('div');
    modalWrapper.classList.add('modal__wrapper');
    body.append(modalWrapper);

    modalWrapper.addEventListener('click', () => {
      modalWrapper.remove();
    })

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal__content');
    modalWrapper.append(modalContent);
    
    modalContent.addEventListener('click', e => {
      e.stopPropagation();
    })

    const modalClose = document.createElement('button');
    modalClose.classList.add('modal__btn-close');
    modalContent.append(modalClose);
   
    modalClose.addEventListener('click', () => {
      modalWrapper.remove();
    })

    const modalHeading = document.createElement('h3');
    modalHeading.classList.add('modal__form-heading', 'modal-delete__heading');
    modalHeading.textContent = 'Удалить клиента';
    modalContent.append(modalHeading);

    const modalConfirm = document.createElement('div');
    modalConfirm.classList.add('modal__confirm');
    modalConfirm.textContent = 'Вы действительно хотите удалить данного клиента?';
    modalContent.append(modalConfirm);

    const modalBtnDelete = document.createElement('button');
    modalBtnDelete.classList.add('modal__btn');
    modalBtnDelete.textContent = 'Удалить';
    modalContent.append(modalBtnDelete);

    modalBtnDelete.addEventListener('click', () => {
      fetch(`http://localhost:3000/api/clients/${id}`,{
        method: 'DELETE',
      })
      modalWrapper.remove();
      window.location.hash = '';
    })

    const modalBtnCancel = document.createElement('button');
    modalBtnCancel.classList.add('modal__btn-cancel');
    modalBtnCancel.textContent = 'Отмена';
    modalContent.append(modalBtnCancel);
    
    modalBtnCancel.addEventListener('click', () => {
      modalWrapper.remove();
      window.location.hash = '';
    })
  }

  document.querySelectorAll('.section-table__subject')[0].addEventListener('click', function () {
    let tableRows = document.querySelectorAll('tr');
    let letters = document.querySelector('.section-table__subject-letters');
    letters.textContent = 'А-Я';
    let subjects = document.querySelectorAll('.section-table__subject');
    for (let subject of subjects) {
      subject.classList.remove('section-table__subject_active');
    }
    this.classList.add('section-table__subject_active');
    let currentArrow = this.getElementsByTagName('svg')[0];
    if (currentArrow.classList.contains('section-table__subject-icon_active')) {
      currentArrow.classList.remove('section-table__subject-icon_active');
    let sortedRows = Array.from(tableRows)
    .slice(1)
    .sort((rowA, rowB) => rowA.cells[0].textContent >= rowB.cells[0].textContent ? -1 : 1);

    tableBody.append(...sortedRows);
    } else {
      let allArrows = document.querySelectorAll('.section-table__subject-icon');
      for (let arrow of allArrows) {
        arrow.classList.remove('section-table__subject-icon_active');
      }
      currentArrow.classList.add('section-table__subject-icon_active');
      let sortedRows = Array.from(tableRows)
      .slice(1)
      .sort((rowA, rowB) => rowA.cells[0].textContent >= rowB.cells[0].textContent ? 1 : -1);

      tableBody.append(...sortedRows);
    }
  })

  document.querySelectorAll('.section-table__subject')[1].addEventListener('click', function () {
    let tableRows = document.querySelectorAll('tr');
    let subjects = document.querySelectorAll('.section-table__subject');
    for (let subject of subjects) {
      subject.classList.remove('section-table__subject_active');
    }
    this.classList.add('section-table__subject_active');
    let currentArrow = this.getElementsByTagName('svg')[0];
    let letters = this.getElementsByTagName('span')[0];
    if (currentArrow.classList.contains('section-table__subject-icon_active')) {
      currentArrow.classList.remove('section-table__subject-icon_active');
      letters.textContent = 'А-Я';
      let sortedRows = Array.from(tableRows)
      .slice(1)
      .sort((rowA, rowB) => rowA.cells[1].textContent >= rowB.cells[1].textContent ? -1 : 1);

      tableBody.append(...sortedRows);
    } else {
      let allArrows = document.querySelectorAll('.section-table__subject-icon');
      letters.textContent = 'Я-А';
      for (let arrow of allArrows) {
        arrow.classList.remove('section-table__subject-icon_active');
      }
      currentArrow.classList.add('section-table__subject-icon_active');
      let sortedRows = Array.from(tableRows)
      .slice(1)
      .sort((rowA, rowB) => rowA.cells[1].textContent >= rowB.cells[1].textContent ? 1 : -1);

      tableBody.append(...sortedRows);
    }
  })

  document.querySelectorAll('.section-table__subject')[2].addEventListener('click', function () {
    let tableRows = document.querySelectorAll('tr');
    let letters = document.querySelector('.section-table__subject-letters');
    letters.textContent = 'А-Я';
    let subjects = document.querySelectorAll('.section-table__subject');
    for (let subject of subjects) {
      subject.classList.remove('section-table__subject_active');
    }
    this.classList.add('section-table__subject_active');
    let currentArrow = this.getElementsByTagName('svg')[0];
    if (currentArrow.classList.contains('section-table__subject-icon_active')) {
      currentArrow.classList.remove('section-table__subject-icon_active');
      let sortedRows = Array.from(tableRows)
      .slice(1)
      .sort((rowA, rowB) => new Date(Number(rowA.cells[2].textContent.substring(6,10)), Number(rowA.cells[2].textContent.substring(3, 5)), Number(rowA.cells[2].textContent.substring(0, 2)),
      Number(rowA.cells[2].getElementsByTagName('span')[0].textContent.substring(0, 2)), Number(rowA.cells[2].getElementsByTagName('span')[0].textContent.substring(3, 5))) 
      >=
      new Date(Number(rowB.cells[2].textContent.substring(6, 10)), Number(rowB.cells[2].textContent.substring(3, 5)), Number(rowB.cells[2].textContent.substring(0, 2)),
      Number(rowB.cells[2].getElementsByTagName('span')[0].textContent.substring(0, 2)), Number(rowB.cells[2].getElementsByTagName('span')[0].textContent.substring(3, 5)))
      ? -1 : 1);

      tableBody.append(...sortedRows);
    } else {
      let allArrows = document.querySelectorAll('.section-table__subject-icon');
      for (let arrow of allArrows) {
        arrow.classList.remove('section-table__subject-icon_active');
      }
      currentArrow.classList.add('section-table__subject-icon_active');
      let sortedRows = Array.from(tableRows)
      .slice(1)
      .sort((rowA, rowB) => new Date(Number(rowA.cells[2].textContent.substring(6,10)), Number(rowA.cells[2].textContent.substring(3, 5)), Number(rowA.cells[2].textContent.substring(0, 2)),
      Number(rowA.cells[2].getElementsByTagName('span')[0].textContent.substring(0, 2)), Number(rowA.cells[2].getElementsByTagName('span')[0].textContent.substring(3, 5))) 
      >=
      new Date(Number(rowB.cells[2].textContent.substring(6, 10)), Number(rowB.cells[2].textContent.substring(3, 5)), Number(rowB.cells[2].textContent.substring(0, 2)),
      Number(rowB.cells[2].getElementsByTagName('span')[0].textContent.substring(0, 2)), Number(rowB.cells[2].getElementsByTagName('span')[0].textContent.substring(3, 5)))
      ? 1 : -1);

      tableBody.append(...sortedRows);
    }
  })

  document.querySelectorAll('.section-table__subject')[3].addEventListener('click', function () {
    let tableRows = document.querySelectorAll('tr');
    let letters = document.querySelector('.section-table__subject-letters');
    letters.textContent = 'А-Я';
    let subjects = document.querySelectorAll('.section-table__subject');
    for (let subject of subjects) {
      subject.classList.remove('section-table__subject_active');
    }
    this.classList.add('section-table__subject_active');
    let currentArrow = this.getElementsByTagName('svg')[0];
    if (currentArrow.classList.contains('section-table__subject-icon_active')) {
      currentArrow.classList.remove('section-table__subject-icon_active');
      let sortedRows = Array.from(tableRows)
      .slice(1)
      .sort((rowA, rowB) => new Date(Number(rowA.cells[3].textContent.substring(6,10)), Number(rowA.cells[3].textContent.substring(3, 5)), Number(rowA.cells[3].textContent.substring(0, 2)),
      Number(rowA.cells[3].getElementsByTagName('span')[0].textContent.substring(0, 2)), Number(rowA.cells[3].getElementsByTagName('span')[0].textContent.substring(3, 5))) 
      >=
      new Date(Number(rowB.cells[3].textContent.substring(6, 10)), Number(rowB.cells[3].textContent.substring(3, 5)), Number(rowB.cells[3].textContent.substring(0, 2)),
      Number(rowB.cells[3].getElementsByTagName('span')[0].textContent.substring(0, 2)), Number(rowB.cells[3].getElementsByTagName('span')[0].textContent.substring(3, 5)))
      ? -1 : 1);

      tableBody.append(...sortedRows);
    } else {
      let allArrows = document.querySelectorAll('.section-table__subject-icon');
      for (let arrow of allArrows) {
        arrow.classList.remove('section-table__subject-icon_active');
      }
      currentArrow.classList.add('section-table__subject-icon_active');
      let sortedRows = Array.from(tableRows)
      .slice(1)
      .sort((rowA, rowB) => new Date(Number(rowA.cells[3].textContent.substring(6,10)), Number(rowA.cells[3].textContent.substring(3, 5)), Number(rowA.cells[3].textContent.substring(0, 2)),
      Number(rowA.cells[3].getElementsByTagName('span')[0].textContent.substring(0, 2)), Number(rowA.cells[3].getElementsByTagName('span')[0].textContent.substring(3, 5))) 
      >=
      new Date(Number(rowB.cells[3].textContent.substring(6, 10)), Number(rowB.cells[3].textContent.substring(3, 5)), Number(rowB.cells[3].textContent.substring(0, 2)),
      Number(rowB.cells[3].getElementsByTagName('span')[0].textContent.substring(0, 2)), Number(rowB.cells[3].getElementsByTagName('span')[0].textContent.substring(3, 5)))
      ? 1 : -1);
  
      tableBody.append(...sortedRows);
    }
  })

  let timeout;
  const inputSearch = document.querySelector('.header__input');
  inputSearch.addEventListener('input', function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      let tableRows = document.querySelectorAll('tr');
      for (let i = 1; i < tableRows.length; i++) {
        tableRows[i].style.display = '';
        if (tableRows[i].cells[0].textContent.indexOf(inputSearch.value) == -1 
        && tableRows[i].cells[1].textContent.indexOf(inputSearch.value) == -1
        && tableRows[i].cells[2].textContent.indexOf(inputSearch.value) == -1  
        && tableRows[i].cells[2].getElementsByTagName('span')[0].textContent.indexOf(inputSearch.value) == -1  
        && tableRows[i].cells[3].textContent.indexOf(inputSearch.value) == -1
        && tableRows[i].cells[3].getElementsByTagName('span')[0].textContent.indexOf(inputSearch.value) == -1)  {
          tableRows[i].style.display = 'none';
        } 
      }
    }, 300)
  })

  if (window.location.hash !== '') {
    openDefaultModal();
  }
  
  async function openDefaultModal() {
    const response = await fetch(`http://localhost:3000/api/clients/${window.location.hash.replace(/#/, '')}`);
    if (response.status === 404) {
    body.innerHTML = '<div class="error">Клиента с таким id не существует...</div>';
    } else {
      const client = await response.json();
      createModal('Изменить данные', 'Удалить', client.id);
      let inputs = document.querySelectorAll('.modal__input');
      let labels = document.querySelectorAll('.modal__label');
      inputs[0].value = `${client.surname}`;
      labels[0].classList.add('modal__label_active');
      inputs[1].value = `${client.name}`;
      labels[1].classList.add('modal__label_active');
      inputs[2].value = `${client.lastName}`;
      if (inputs[2].value !== '') labels[2].classList.add('modal__label_active');

      for (let contact of client.contacts) {
        addContact(contact.type, contact.value)
      }
    }
  }
})()

