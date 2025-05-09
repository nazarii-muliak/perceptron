console.log('test');

const createElement = (type, attributes = {}, classes = [], innerHTML = '') => {
  const element = document.createElement(type);
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  classes.forEach(cls => element.classList.add(cls));
  if (innerHTML) element.innerHTML = innerHTML;
  return element;
};

const generateSwitchArray = () => {
  const parent = document.getElementById('switchCase');
  if (!parent) return;

  for (let i = 0; i <= 3; i++) {
    for (let j = 0; j <= 3; j++) {
      const perSwitch = createElement('input', {
        type: 'checkbox',
        id: `switch-${i}-${j}`,
        'data-src': './images/switch_offon.png',
        'data-diameter': '60',
      }, ['input-switch']);

      const switchIndicator = createElement('span', { id: `sIndicator-${i}-${j}` }, ['indicator', '--error']);
      const switchContainer = createElement('div', {}, ['switch-container']);

      perSwitch.addEventListener('change', (e) => {
        changeIndicator(e);
        calculateValue();
      });

      switchContainer.append(perSwitch, switchIndicator);
      parent.appendChild(switchContainer);
    }
  }
};

const generateKnobsArray = () => {
  const parent = document.getElementById('knobCase');
  if (!parent) return;

  for (let i = 0; i <= 3; i++) {
    for (let j = 0; j <= 3; j++) {
      const knob = createElement('input', {
        type: 'range',
        id: `knob-${i}-${j}`,
        'data-src': './images/knob70.png',
        'data-diameter': '60',
        'data-sprites': '100',
        min: '0',
        max: '30',
        value: '0',
      }, ['input-knob']);

      const knobIndicator = createElement('span', { id: `kIndicator-${i}-${j}` }, ['knob-indicator'], '0');
      const container = createElement('div', {}, ['switch-container']);

      knob.addEventListener('input', (e) => {
        changeKnobIndicator(e);
        calculateValue();
      });

      container.append(knob, knobIndicator);
      parent.appendChild(container);
    }
  }
};

const changeKnobIndicator = (e) => {
  const [_, i, j] = e.target.id.split('-');
  const indicator = document.getElementById(`kIndicator-${i}-${j}`);
  if (indicator) indicator.innerHTML = e.target.value;
};

const changeIndicator = (e) => {
  const [_, i, j] = e.target.id.split('-');
  const indicator = document.getElementById(`sIndicator-${i}-${j}`);
  if (indicator) {
    indicator.className = e.target.checked ? 'indicator --succes' : 'indicator --error';
  }
};

const calculateValue = () => {
  const switchArray = document.querySelectorAll('.input-switch');
  const knobArray = document.querySelectorAll('.input-knob');

  let value = 0;
  switchArray.forEach((sw, i) => {
    if (sw.checked) value += parseInt(knobArray[i].value || 0);
  });

  const valueElement = document.getElementById('value');
  if (valueElement) valueElement.innerHTML = value;

  if (window.gauge) window.gauge.set(value);
};

const opts = {
  angle: 0.1,
  lineWidth: 0.3,
  radiusScale: 0.6,
  pointer: {
    length: 0.6,
    strokeWidth: 0.049,
    color: '#000000',
  },
  limitMax: false,
  limitMin: false,
  colorStart: '#6F6EA0',
  colorStop: '#C0C0DB',
  strokeColor: '#EEEEEE',
  generateGradient: true,
  highDpiSupport: true,
  renderTicks: {
    divisions: 6,
    divWidth: 0.7,
    divLength: 0.47,
    divColor: '#784682',
    subDivisions: 3,
    subLength: 0.5,
    subWidth: 0.6,
    subColor: '#662E1E',
  },
};

setTimeout(() => {
  generateSwitchArray();
  generateKnobsArray();

  const target = document.getElementById('gauge');
  if (target) {
    const gauge = new Gauge(target).setOptions(opts);
    gauge.maxValue = 500;
    window.gauge = gauge;

    gauge.setMinValue(0);
    gauge.animationSpeed = 53;
    gauge.set(0);
  }
}, 100);
