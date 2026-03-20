const fs = require('fs');
const b64 = fs.readFileSync('b64.txt', 'utf8').trim();
const logoStr = 'const LOGO_BASE64 = "data:image/png;base64,' + b64 + '";\n';

let formPath = 'src/pages/lead-form-page.tsx';
let formContent = fs.readFileSync(formPath, 'utf8');
if (!formContent.includes('const LOGO_BASE64')) {
    formContent = formContent.replace('const options = {', logoStr + '            const options = {');
    formContent = formContent.replace('image: "https://rapids.in/rapids-logo.png"', 'image: LOGO_BASE64');
    fs.writeFileSync(formPath, formContent);
}

let checkoutPath = 'public/razorpay-checkout.html';
let checkoutContent = fs.readFileSync(checkoutPath, 'utf8');
if (!checkoutContent.includes('const LOGO_BASE64')) {
    checkoutContent = checkoutContent.replace('const options = {', logoStr + '            const options = {');
    checkoutContent = checkoutContent.replace('"image": "https://rapids.in/rapids-logo.png"', '"image": LOGO_BASE64');
    fs.writeFileSync(checkoutPath, checkoutContent);
}
console.log('Finished updating files.');
