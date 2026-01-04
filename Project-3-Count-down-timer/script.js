const hitungMundur = document.getElementById("countdown")
// Element
const HariE = document.getElementById("day")
const JamE = document.getElementById("hour")
const MenitE = document.getElementById("min")
const DetikE = document.getElementById("sec")

// Input
const JamI = document.getElementById("inputjam")
const MenitI = document.getElementById("inputmenit")
const DetikI = document.getElementById("inputdetik")
const tombol = document.getElementById("button")

let hitungM;

function startTimer(){
    let Jam = parseInt(JamI.value) || 0
    let Menit = parseInt(MenitI.value) || 0
    let Detik = parseInt(DetikI.value) || 0

    let konversiKeDetik = Jam * 3600 + Menit * 60 + Detik

    if (konversiKeDetik <= 0){
        alert("Masukan Angka yang benarr!!..")
        return
    }

    JamI.value = ''
    MenitI.value = ''
    DetikI.value = ''

    hitungM = setInterval(() => {
        const Hari = Math.floor((konversiKeDetik / 86400))
        const Jam = Math.floor((konversiKeDetik % 86400) / 3600)
        const Menit = Math.floor((konversiKeDetik % 3600) / 60)
        const Detik = Math.floor((konversiKeDetik % 60))

        HariE.textContent = Hari.toString().padStart(2, '0')
        JamE.textContent = Jam.toString().padStart(2, '0')
        MenitE.textContent = Menit.toString().padStart(2, '0')
        DetikE.textContent = Detik.toString().padStart(2, '0')

        konversiKeDetik--

        if (konversiKeDetik < 0){
            clearInterval(hitungM)
            alert("Hitung Mundur")
        }

    }, 1000 )
}

const panggil = tombol.addEventListener('click', () => {
    clearInterval(hitungM)
    startTimer()
})