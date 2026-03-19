const { execSync } = require('child_process');

const vars = {
  "VITE_SUPABASE_URL": "https://bovrapqqwxwemjfpqkqr.supabase.co",
  "VITE_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvdnJhcHFxd3h3ZW1qZnBxa3FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3Nzg1MDcsImV4cCI6MjA4NjM1NDUwN30.oULjVx0M8nvSPGJGghovPsTS-04zz_Fgl-qY-Rub4jk",
  "VITE_RAZORPAY_KEY_ID": "rzp_live_SHHmRMqeg5U0Ci",
  "RAZORPAY_KEY_SECRET": "qfjEBKB0hiRtuI0BOY2OiZeI",
  "RAZORPAY_PLAN_ID": "plan_STAlVsMEU6VYbD"
};

for (const [key, value] of Object.entries(vars)) {
  console.log(`Adding ${key}...`);
  try {
    // Attempt to remove first in case it exists, hide output
    try {
      execSync(`npx vercel env rm ${key} production -y`, { stdio: 'ignore' });
    } catch(e) {}
    
    // Add the variable using shell input
    execSync(`npx vercel env add ${key} production`, { input: value, stdio: 'pipe' });
    console.log(`Successfully added ${key}`);
  } catch (error) {
    console.error(`Failed to add ${key}: `, error.message);
  }
}
