function calculateStats() {
    let input = document.getElementById("numbers").value;

    // Convert input to numbers
    let nums = input.split(",")
        .map(n => parseFloat(n.trim()))
        .filter(n => !isNaN(n));

    if (nums.length === 0) {
        document.getElementById("result").innerHTML = "<p>Please enter valid numbers.</p>";
        return;
    }

    nums.sort((a, b) => a - b);

    // Mean
    let mean = nums.reduce((a, b) => a + b, 0) / nums.length;
    mean = mean.toFixed(2);

    // Median (Q2)
    let median;
    if (nums.length % 2 === 0) {
        median = (nums[nums.length / 2 - 1] + nums[nums.length / 2]) / 2;
    } else {
        median = nums[Math.floor(nums.length / 2)];
    }

    // Quartiles
    function medianOf(arr) {
        let len = arr.length;
        if (len % 2 === 0) {
            return (arr[len / 2 - 1] + arr[len / 2]) / 2;
        } else {
            return arr[Math.floor(len / 2)];
        }
    }

    let lowerHalf, upperHalf;

    if (nums.length % 2 === 0) {
        // Even count
        lowerHalf = nums.slice(0, nums.length / 2);
        upperHalf = nums.slice(nums.length / 2);
    } else {
        // Odd count (exclude median)
        lowerHalf = nums.slice(0, Math.floor(nums.length / 2));
        upperHalf = nums.slice(Math.floor(nums.length / 2) + 1);
    }

    let q1 = medianOf(lowerHalf);
    let q3 = medianOf(upperHalf);

    // Mode
    let freq = {};
    nums.forEach(n => freq[n] = (freq[n] || 0) + 1);

    let maxFreq = Math.max(...Object.values(freq));
    let mode = Object.keys(freq).filter(key => freq[key] == maxFreq);

    if (maxFreq === 1) {
        mode = ["No mode"];
    }

    // Range
    let range = nums[nums.length - 1] - nums[0];

    document.getElementById("result").innerHTML = `
        <p><strong>Sorted Numbers:</strong> ${nums.join(", ")}</p>
        <p><strong>Mean:</strong> ${mean}</p>
        <p><strong>Median (Q2):</strong> ${median}</p>
        <p><strong>Q1:</strong> ${q1}</p>
        <p><strong>Q3:</strong> ${q3}</p>
        <p><strong>Mode:</strong> ${mode.join(", ")}</p>
        <p><strong>Range:</strong> ${range}</p>
    `;
}

document.getElementById("themeToggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        this.textContent = "Light Mode";
    } else {
        this.textContent = "Dark Mode";
    }
});
