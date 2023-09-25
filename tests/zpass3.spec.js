const { checkComplexity, encodeBytes } = require("./libs/zpass3");

test("has number", () => {
    expect(checkComplexity('^n3msCR#7sWD!w')).toBe(true);
});
test("has number", () => {
    expect(checkComplexity('^nmsCR#sWD!w')).toBe(false);
});

test("has upper case", () => {
    expect(checkComplexity('^n3msCR#7sWD!w')).toBe(true);
});

test("has upper case", () => {
expect(checkComplexity('^n3ms#7s!w')).toBe(false);
});
test("has lower case", () => {
    expect(checkComplexity('^n3msCR#7sWD!w')).toBe(true);
});
test("has lower case", () => {
    expect(checkComplexity('^3CR#7WD!')).toBe(false);
});

test("has symbol", () => {
    expect(checkComplexity('^n3msCR#7sWD!w')).toBe(true);
});
test("has symbol", () => {
    expect(checkComplexity('n3msCR7sWDw')).toBe(false);
});


// Test encoding a blank array
test('encode empty array', () => {
    const input = [];
    const expected = '';
    expect(encodeBytes(input)).toBe(expected);
});

// Test encoding a sample array
test('encode sample array', () => {
    const input = [0x41, 0x42, 0xff];
    const expected = 'AB??FF';
    expect(encodeBytes(input)).toBe(expected);
});

// Test decoding encoded string back to original bytes
// test('decode to original bytes', () => {
//     const encoded = 'AB??FF';
//     const expected = [0x41, 0x42, 0xff];
//     expect(decodeBytes(encoded   )).toEqual(expected);
// });

// Test handling max byte value
// test('handle max byte', () => {
//     const input = [0xff];
//     const expected = '?G';
//     expect(encodeBytes(input)).toBe(expected);
// });
//
// // Test handling min byte value
// test('handle min byte', () => {
//     const input = [0x00];
//     const expected = 'aG';
//     expect(encodeBytes(input)).toBe(expected);
// });
//
// // Test invalid input
// test('invalid input', () => {
//     expect(() => encodeBytes('invalid')).toThrow();
// });