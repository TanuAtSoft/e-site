export const countDuplicates = (array) => {
  const sortedObject = array.reduce((acc, obj) => {
    const key = obj["_id"];
    const curGroup = acc[key] ?? [];

    return { ...acc, [key]: [...curGroup, obj] };
  }, {});
  const sortedArr = [];
  for (const key in sortedObject) {
    const objTest = {
      product: sortedObject[key][0],
      count: sortedObject[key].length,
    };
    // console.log("objTest",objTest);
    sortedArr.push(objTest);
  }
  // console.log("temp",temp)
  return sortedArr;
};
