import Razorpay from 'razorpay';

const key_id = 'rzp_live_SHHmRMqeg5U0Ci';

const possible_secrets = [
  "qfjEBKB0hiRtuI0BOY2OiZel",
  "qfjEBKB0hiRtul0BOY2OiZel",
  "qfjEBKB0hiRtuI0BOY2OlZel",
  "qfjEBKB0hiRtul0BOY2OlZel",
  "qfjEBKB0hiRtu10BOY2OiZel",
  "qfjEBKB0hiRtuI0B0Y2OiZel",
  "qfjEBKB0hiRtuI0BOY2OiZeI",
  "qfjEBKBOhiRtuI0BOY2OiZel", 
  "qfjEBKB0hiRtul0BOY2OiZe1"
];

async function run() {
  for (let secret of possible_secrets) {
    const rzp = new Razorpay({ key_id, key_secret: secret });
    try {
      await rzp.plans.all();
      console.log("SUCCESS!!! Secret is: " + secret);
      return;
    } catch (e) {
      // ignore
    }
  }
  console.log("All permutations failed.");
}
run();
