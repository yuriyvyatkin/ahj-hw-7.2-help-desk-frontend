import TemplateEngine from './TemplateEngine';

export default class Modal extends TemplateEngine {
  constructor(
    modal,
    modalForm,
    modalHeader,
    modalFormControls,
    modalFormDescription,
    cancelBtn,
    ticketsList,
    negotiator,
  ) {
    super();
    this.modal = modal;
    this.modalForm = modalForm;
    this.modalHeader = modalHeader;
    this.modalFormControls = modalFormControls;
    this.modalFormDescription = modalFormDescription;
    this.cancelBtn = cancelBtn;
    this.ticketsList = ticketsList;
    this.negotiator = negotiator;
  }

  assignCommonHandler() {
    this.modalForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const { ticketId } = event.currentTarget.dataset;
      let ticket;
      if (ticketId) {
        ticket = this.ticketsList.querySelector(`#${ticketId}`);
      }

      if (this.modalHeader.innerText === 'Добавить тикет') {
        this.negotiator.createRequest({
          method: 'POST',
          url: '?method=createTicket',
          data: {
            form: event.currentTarget.elements,
            status: false,
          },
          callback: (response) => {
            const receivedData = JSON.parse(response);
            const ticketHTML = this.constructor.getTicketHTML(receivedData);
            this.ticketsList.insertAdjacentHTML('beforeend', ticketHTML);
            this.modalFormControls.classList.remove('active');
            console.log('Новый тикет был добавлен.');
          },
        });
      } else if (this.modalHeader.innerText === 'Изменить тикет') {
        const ticketName = ticket.querySelector('.ticket__name');
        const ticketDescription = ticket.querySelector('.ticket__description');
        this.negotiator.createRequest({
          method: 'PUT',
          url: `?method=editTicket&id=${ticketId}`,
          data: {
            form: event.currentTarget.elements,
          },
          callback: (response) => {
            const receivedData = JSON.parse(response);
            if (Object.prototype.hasOwnProperty.call(receivedData, 'name')) {
              ticketName.firstChild.replaceWith(receivedData.name);
            }
            if (Object.prototype.hasOwnProperty.call(receivedData, 'description')) {
              ticketDescription.innerText = receivedData.description;
            }
            this.modalFormControls.classList.remove('active');
            console.log('Измененные значения сохранены.');
          },
        });
      } else if (this.modalHeader.innerText === 'Удалить тикет') {
        this.negotiator.createRequest({
          method: 'DELETE',
          url: `?method=deleteTicket&id=${ticketId}`,
          callback: () => {
            ticket.remove();
            this.modalFormDescription.classList.remove('active');
            console.log(`Тикет с id #${ticketId} был удален.`);
          },
        });
      }
      this.modalForm.reset();
      this.modal.classList.remove('active');
    });
  }

  assignCancelBtnHandler() {
    this.cancelBtn.onclick = (event) => {
      this.modalForm.reset();
      this.modalFormControls.classList.remove('active');
      this.modalFormDescription.classList.remove('active');
      event.currentTarget.closest('.modal').classList.remove('active');
    };
  }
}
