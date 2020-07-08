export default class ColumnChart {
  element = null;
  chartHeight = 50;

  constructor ({
    data = [],
    label = '',
    link = '',
    value = 0
  } = {}) {
    this.data = data;
    this.label = label;
    this.link = link;
    this.value = value;

    this.render();
  }

  update({bodyData = []} = {}) {
    this.data = bodyData;
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = `
      <div class="column-chart" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">
          Total ${this.label};
          <a class="column-chart__link" href="${this.link}">View all</a>
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">
            ${this.value}
          </div>
          <div data-element="body" class="column-chart__chart">
            ${this.renderData()}
          </div>
        </div>
      </div>
    `;

    if (!this.data.length) {
      element.firstElementChild.className = 'column-chart_loading';
    }

    this.element = element.firstElementChild;
  }

  renderData() {
    return this.getColumnProps(this.data).reduce((acc, obj) => {
      return acc + `<div style="--value:${obj.value}" data-tooltip="${obj.percent}"></div>`;
    }, '');
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }

  getColumnProps(data) {
    const maxValue = Math.max(...data);
    const scale = this.chartHeight / maxValue;

    return data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + `%`,
        value: String(Math.floor(item * scale))
      };
    });
  }
}
