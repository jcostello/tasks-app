const sum = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 1000);
  });
};

// const nested = () => {
//   return new Promise((resolve, reject) => {
//     resolve(new Promise((res, rej) => {
//       res('Nested');
//     }))
//   })
// }

// const doWork = async () => {
//   console.log(await nested())
// }

// doWork()

const doWork = async () => {
  const a = async () => 1;
  const b = async () => await a;

  return b()
}
doWork().then(console.log)

// const numbers = [1, 2, 3, 4, 5];

// const total = numbers.reduce(async (prev, num) => {
//   return sum(await prev, num);
// }, 0);

// total.then((a) => {
//   console.log(a)
// })

console.log('End');