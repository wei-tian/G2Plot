import { Scatter } from '../../../../src';
import { data } from '../../../data/gender';
import { createDiv } from '../../../utils/dom';

describe('scatter', () => {
  it('style: object options', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'weight',
      yField: 'height',
      sizeField: 'weight',
      size: [5, 10],
      xAxis: {
        nice: true,
      },
      pointStyle: {
        fill: 'red',
        stroke: 'yellow',
        opacity: 0.8,
      },
    });

    scatter.render();

    const geometry = scatter.chart.geometries[0];
    const elements = geometry.elements;

    expect(elements[0].shape.attr('fill')).toBe('red');
    expect(elements[0].shape.attr('stroke')).toBe('yellow');
    expect(elements[0].shape.attr('opacity')).toBe(0.8);

    scatter.destroy();
  });

  it('style: callback options', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'weight',
      yField: 'height',
      sizeField: 'weight',
      size: [5, 10],
      colorField: 'gender',
      xAxis: {
        nice: true,
      },
      pointStyle: ({ gender }) => {
        if (gender === 'male') {
          return {
            fill: 'green',
            stroke: 'yellow',
            opacity: 0.8,
          };
        }
        return {
          fill: 'red',
          stroke: 'yellow',
          opacity: 0.8,
        };
      },
    });

    scatter.render();

    const geometry = scatter.chart.geometries[0];
    const elements = geometry.elements;
    const colorArr = [];
    elements.forEach((ele) => {
      colorArr.push(ele.shape.attr('fill'));
    });

    expect(colorArr).toContain('red');
    expect(colorArr).toContain('green');
    expect(elements[0].shape.attr('stroke')).toBe('yellow');
    expect(elements[0].shape.attr('opacity')).toBe(0.8);

    scatter.destroy();
  });

  it('style: all options', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'weight',
      yField: 'height',
      sizeField: 'weight',
      size: [5, 10],
      xAxis: {
        nice: true,
      },
      pointStyle: {
        fill: 'red',
        stroke: 'yellow',
        lineWidth: 4,
        lineDash: [2, 2],
        opacity: 0.5,
        fillOpacity: 0.5,
        strokeOpacity: 0.5,
      },
    });

    scatter.render();

    const geometry = scatter.chart.geometries[0];
    const elements = geometry.elements;

    expect(elements[0].shape.attr('fill')).toBe('red');
    expect(elements[0].shape.attr('stroke')).toBe('yellow');
    expect(elements[0].shape.attr('lineWidth')).toBe(4);
    expect(elements[0].shape.attr('lineDash')).toEqual([2, 2]);
    expect(elements[0].shape.attr('opacity')).toBe(0.5);
    expect(elements[0].shape.attr('fillOpacity')).toBe(0.5);
    expect(elements[0].shape.attr('strokeOpacity')).toBe(0.5);

    scatter.destroy();
  });
});
