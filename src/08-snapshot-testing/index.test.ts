import { generateLinkedList } from './index';

const elements = ['element-one', 2, , { fourthElement: 4 }];
const llinkedList = {
  value: 'element-one',
  next: {
    value: 2,
    next: {
      value: null,
      next: {
        value: { fourthElement: 4 },
        next: {
          value: null,
          next: null,
        },
      },
    },
  },
};

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(elements)).toStrictEqual(llinkedList);
  });

  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(elements)).toMatchSnapshot();
  });
});
