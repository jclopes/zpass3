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
