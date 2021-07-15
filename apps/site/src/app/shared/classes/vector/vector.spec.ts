import { Vector } from './vector';

describe('[CLASS]: Vector', () => {
  it('should be defined', () => {
    expect(Vector).toBeDefined();
  });

  describe('[METHOD]: add', () => {
    it('should be defined', () => {
      expect(Vector.add).toBeDefined();
    });

    it('should return an instance of a vector', () => {
      const vector = new Vector(1, 2);
      const result = Vector.add(vector, vector);
      expect(result).toBeInstanceOf(Vector);
    });

    test.each([
      {
        args: [new Vector(0, 0), new Vector(1, 1)],
        expectedResult: { x: 1, y: 1 }
      },
      {
        args: [new Vector(0, 0), new Vector(0, 0)],
        expectedResult: { x: 0, y: 0 }
      },
      {
        args: [
          new Vector(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER),
          new Vector(-Number.MAX_SAFE_INTEGER, -Number.MAX_SAFE_INTEGER)
        ],
        expectedResult: { x: 0, y: 0 }
      },
      {
        args: [new Vector(0.1, 0.1), new Vector(0.2, 0.2)],
        expectedResult: { x: 0.3, y: 0.3 }
      }
    ])('should return the correct value for test case: %o', (testCase) => {
      // Using `toBeCloseTo` here to avoid floating point errors
      const result = testCase.args[0].add(testCase.args[1]);
      expect(result.x).toBeCloseTo(testCase.expectedResult.x);
      expect(result.y).toBeCloseTo(testCase.expectedResult.y);
    });
  });
});
