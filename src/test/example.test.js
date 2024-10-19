import { expect } from "chai";

describe("Math operations", () => {
  // trong đây sẽ chứa tất cả test case của bộ test này
  it("should add two integer", () => {
    const result = 10 + 10;

    // sử dụng chai để mock kết quả trả về từ function hoặc biến gì đó
    expect(result).to.equal(20);
  });

  it("Testing with array", () => {
    const arr = [1, 2, 3];

    expect(arr).to.include(2);
  });
});
