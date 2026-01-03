document.getElementById("colorinput").addEventListener("input", function(event) {
    // memilih warna dari input
    let pilihwarna = event.target.value

    // update warna teks
    document.getElementById("colorcode").textContent = pilihwarna

    // update warna di display
    document.getElementById("colordisplay").style.backgroundColor = pilihwarna 


})