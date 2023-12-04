async function test() {
  return new Promise(function (resolve, reject) {
    resolve("data");
  }, 4000);
}

async function main() {
  console.log("main...");
  const res = await test();
  console.log("res=>", res);
}
console.log("A...");
main();
console.log("B...");
