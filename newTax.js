document.getElementById('calculate-btn').addEventListener('click', function() {
    const income = Number(document.getElementById('income-input').value);
    let tax = 0;

if (income <= 300000) {
    tax = 0;
} else if (income <= 700000) {
    tax = (income - 300000) * 0.05;
} else if (income <= 1000000) {
    tax = (400000 * 0.05) + ((income - 700000) * 0.1);
} else if (income <= 1200000) {
    tax = (400000 * 0.05) + (300000 * 0.1) + ((income - 1000000) * 0.15);
} else if (income <= 1500000) {
    tax = (400000 * 0.05) + (300000 * 0.1) + (200000 * 0.15) + ((income - 1200000) * 0.2);
} else if (income > 1500000) {
    tax = (400000 * 0.05) + (300000 * 0.1) + (200000 * 0.15) + (300000 * 0.2) + ((income - 1500000) * 0.3);
} 

    document.getElementById('tax-output').textContent = `You need to pay: ₹${tax.toFixed(2)} in taxes.`;

    const payNowBtn = document.getElementById('pay-now-btn') || document.createElement('button');
    payNowBtn.textContent = 'Pay Now';
    payNowBtn.id = 'pay-now-btn';
    document.getElementById('pay-now-container').appendChild(payNowBtn);

    payNowBtn.addEventListener('click', function() {
        const upiID = "yadavlakshya@fam";
        const amount = tax.toFixed(2);
        const name = "Name";
        const note = "Tax Payment";

        const upiString = `upi://pay?pa=${upiID}&pn=${name}&am=${amount}&cu=INR&tn=${note}`;

        // Remove any existing QR code
        const existingQRCode = document.getElementById('qrcode');
        if (existingQRCode) {
            existingQRCode.remove();
        }

        const qrcodeDiv = document.createElement('div');
        qrcodeDiv.id = 'qrcode';
        document.getElementById('qrcode-container').appendChild(qrcodeDiv);

        new QRCode(document.getElementById("qrcode"), { text: upiString, width: 128, height: 128 });
    });
});
