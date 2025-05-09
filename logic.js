console.log('test')

const generateSwitchArray = () => {
  for (let i = 0; i <= 3; i++) {
    for (let j = 0; j <= 3; j++) {
      let perSwitch = document.createElement('input');
      let switchIndicator = document.createElement('span');
      let switchContainer = document.createElement('div');


      perSwitch.type = 'checkbox';
      perSwitch.id = `switch-${i}-${j}`;
      perSwitch.checked = false;
      switchIndicator.id = `sIndicator-${i}-${j}`;

      perSwitch.addEventListener('change', (e) => {
        changeIndicator(e)
        calculateValue()
      });

      perSwitch.setAttribute('data-src', `./images/switch_offon.png`);
      perSwitch.setAttribute('data-diameter', `60`);

      perSwitch.className = "input-switch"
      switchIndicator.className = "indicator --error"
      switchContainer.className = "switch-container"

      switchContainer.appendChild(perSwitch);
      switchContainer.appendChild(switchIndicator);

      const parent = document.getElementById('switchCase');

      if (!parent) return;

      parent.appendChild(switchContainer);
    }
  }
}

const generateKnobsArray = () => {
  for (let i = 0; i <= 3; i++) {
    for (let j = 0; j <= 3; j++) {
      let knob = document.createElement('input');
      let container = document.createElement('div');
      let knobIndicator = document.createElement('span');

      knob.type = 'range';

      knob.setAttribute('data-src', `./images/knob70.png`);
      knob.setAttribute('data-diameter', `60`);
      knob.setAttribute('data-sprites', `100`);
      knob.min = 0;
      knob.value = 0;
      knob.max = 30;
      knob.id = `knob-${i}-${j}`;
      knob.className = "input-knob"

      knob.addEventListener('input', (e) => {
        changeKnobIndicator(e)
        calculateValue()
      });

      knobIndicator.id = `kIndicator-${i}-${j}`;
      knobIndicator.className = "knob-indicator"
      knobIndicator.innerHTML = "0";

      container.className = "switch-container"

      const parent = document.getElementById('knobCase');

      if (!parent) return;

      container.appendChild(knob);
      container.appendChild(knobIndicator);
      parent.appendChild(container);
    }
  }
}

const changeKnobIndicator = (e) => {
  console.log(e.target.id)

  const knobId = e.target.id.split('-');
  const i = knobId[1];
  const j = knobId[2];

  const indicator = document.getElementById(`kIndicator-${i}-${j}`);
  indicator.innerHTML = e.target.value;
}

const changeIndicator = (e) => {
  const switchId = e.target.id.split('-');
  const i = switchId[1];
  const j = switchId[2];

  const indicator = document.getElementById(`sIndicator-${i}-${j}`);

  if (!e.target.checked) {
    indicator.className = "indicator --error"
  } else {
    indicator.className = "indicator --succes"
  }
}

const opts = {
  angle: 0.1, // The span of the gauge arc
  lineWidth: 0.3, // The line thickness
  radiusScale: 0.6, // Relative radius
  pointer: {
    length: 0.6, // // Relative to gauge radius
    strokeWidth: 0.049, // The thickness
    color: '#000000' // Fill color
  },
  limitMax: false,     // If false, max value increases automatically if value > maxValue
  limitMin: false,     // If true, the min value of the gauge will be fixed
  colorStart: '#6F6EA0',   // Colors
  colorStop: '#C0C0DB',    // just experiment with them
  strokeColor: '#EEEEEE',  // to see which ones work best for you
  generateGradient: true,
  highDpiSupport: true,     // High resolution support
  // renderTicks is Optional
  renderTicks: {
    divisions: 6,
    divWidth: 0.7,
    divLength: 0.47,
    divColor: '#784682',
    subDivisions: 3,
    subLength: 0.5,
    subWidth: 0.6,
    subColor: '#662E1E'
  }
};

const calculateValue = () => {
  const switchArray = document.querySelectorAll('.input-switch');
  const knobArray = document.querySelectorAll('.input-knob');

  let value = 0;

  switchArray.forEach((sw, i) => {
    if (sw.checked) {
      value += parseInt(knobArray[i].value);
    }
  });

  if (!gauge) return;

  document.getElementById('value').innerHTML = value;

  window.gauge.set(value);
}

setTimeout(() => {
  generateSwitchArray()
  generateKnobsArray()

  const target = document.getElementById('gauge');
  const gauge = new Gauge(target).setOptions(opts);
  gauge.maxValue = 500;
  window.gauge = gauge;

  gauge.setMinValue(0);
  gauge.animationSpeed = 53;
  gauge.set(0);
}, 100)
