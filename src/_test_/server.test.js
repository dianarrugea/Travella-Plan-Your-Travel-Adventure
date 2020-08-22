import { getTripDate } from "../server/index.js";
  
//   // console.log(getTripDate)
//   describe("Check if performAction is a function.", () => {
//       test('Test if performAction is a function or not.', () => {
//           expect(typeof getTripDate).toBeUndefined();
//       });
//   })
  
  describe("Function to get the number of days till the trip", () => {
    it("The response should be the number of days until departure", () => {
      expect(getTripDate("2020-08-24")).toBe(2);
    });
  });