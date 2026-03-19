import Razorpay from 'razorpay';

const rzp = new Razorpay({
  key_id: 'rzp_live_SHHmRMqeg5U0Ci',
  key_secret: 'qfjEBKB0hiRtuI0BOY2OiZeI'
});

async function run() {
  try {
    const plan = await rzp.plans.create({
      period: 'monthly',
      interval: 1,
      item: {
        name: 'Rapids Membership Recurring',
        amount: 1000, 
        currency: 'INR',
        description: 'Automated 10rs monthly deduction'
      }
    });
    console.log("SUCCESS_PLAN_ID=" + plan.id);
  } catch (e) {
    console.error("ERROR CREATING PLAN", e);
  }
}
run();
