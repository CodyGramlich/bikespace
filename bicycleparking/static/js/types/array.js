import Input from './input';

export default class ArrayInput extends Input {
  constructor() {
    super(...arguments);
    this.values = [];
  }

  get value() {
    return this.values;
  }

  onSelect(event) {
    if (event.target.checked) {
      this.values.push(event.target.value);
    } else {
      this.values.splice(this.values.indexOf(event.target.value), 1);
    }
  }

  bind() {
    [...document.querySelectorAll('input')].forEach(el => {
      el.onchange = this.onSelect.bind(this);
    })
  }

  get template() {
    const skipButton = this.props.required ? '' : `<button id="skip">skip</button>`;
    const options = this.props.values.reduce((memo, value) => {
      memo += `<p><label><input type="checkbox" value="${value.key}" name="problem" />${value.text}</label></p>`;
      return memo;
    }, '');
    return (`
      <div className="question">
        <label class="Step__text">${this.props.text}</label>
        ${options}
      </div>
      `
    )
  }
}