const kalkulator = {
    tampilanNilai: '0',
    operandPertama: null,
    menungguOperandKedua: false,
    operator:null,
}

function perbaruiTampilan() {
    const tampilan = document.querySelector('.kalkulator-display');
    tampilan.value = kalkulator.tampilanNilai;
}

function masukanAngka(angka) {
    const {tampilanNilai, menungguOperandKedua} = kalkulator;

    if (menungguOperandKedua === true) {
        kalkulator.tampilanNilai = angka;
        kalkulator.menungguOperandKedua = false;
    } else {
        kalkulator.tampilanNilai = tampilanNilai === '0' ? angka : tampilanNilai + angka;
    }
    perbaruiTampilan();
}

function masukanDesimal(dot) {
    if (!kalkulator.tampilanNilai.includes(dot)) {
        kalkulator.tampilanNilai += dot;
    }
    perbaruiTampilan();
}

function menanganiOperator(operatorSelanjutnya) {
    const {operandPertama, tampilanNilai, operator} = kalkulator;
    const masukanNilai = parseFloat(tampilanNilai);

    if ( operator && kalkulator.menungguOperandKedua ) {
        kalkulator.operator = operatorSelanjutnya;
        return;
    }

    if(operandPertama == null && !isNaN(masukanNilai)) {
        kalkulator.operandPertama = masukanNilai;
    } else if (operator) {
        const hasil = kalkulasi(operandPertama, masukanNilai, operator);
        kalkulator.tampilanNilai = `${parseFloat(hasil.toFixed(7))}`;
        kalkulator.operandPertama = hasil;
    }
    
    kalkulator.menungguOperandKedua = true;
    kalkulator.operator = operatorSelanjutnya;

    perbaruiTampilan();
}

function kalkulasi(operandPertama, operandKedua, operator) {
    if (operator === '+') {
        return operandPertama + operandKedua;
    } else if (operator === '-') {
        return operandPertama - operandKedua;
    } else if (operator === '*') {
        return operandPertama * operandKedua;
    } else if (operator === '/') {
        return operandPertama / operandKedua;
    } else if (operator === '√') {
        return Math.sqrt(operandPertama);
    } else if (operator === '%') {
        return operandPertama / 100;
    };

    return operandKedua;
}

function resetKalkulator(){
    kalkulator.tampilanNilai = '0';
    kalkulator.operandPertama = null;
    kalkulator.menungguOperandKedua = false;
    kalkulator.operator = null;
    perbaruiTampilan()
}

function handleEqual(){
    const {operandPertama, tampilanNilai, operator} =  kalkulator;
    const masukanNilai = parseFloat(tampilanNilai);

    if ( operator && !kalkulator.menungguOperandKedua){
        const hasil = kalkulasi(operandPertama, masukanNilai, operator);
        kalkulator.tampilanNilai = `${parseFloat(hasil.toFixed(7))}`;
        kalkulator.operandPertama = null;
        kalkulator.operator = null;
        kalkulator.menungguOperandKedua = false;
        perbaruiTampilan()
    }
}

document.querySelector('.kalkulator-kunci').addEventListener('click', (event) => {
    const {target} = event;

    if(!target.matches('button')) {
        return;
    }

    if (target.value === '%') {
    kalkulator.tampilanNilai =
        `${parseFloat(kalkulator.tampilanNilai) / 100}`;
        perbaruiTampilan();
        return;
    }

    if (target.value === '√') {
    kalkulator.tampilanNilai =
        `${Math.sqrt(parseFloat(kalkulator.tampilanNilai))}`;
        perbaruiTampilan();
        return;
    }

    if ( target.classList.contains('operators')) {
        menanganiOperator(target.value);
        return;
    }
    
    if ( target.classList.contains('desimal')) {
        masukanDesimal(target.value);
        return;
    }
    
    if ( target.classList.contains('hapus-semua')) {
        resetKalkulator()
        return;
    }
    
    if ( target.classList.contains('sama-dengan')) {
        handleEqual();
        return;
    }
    
    masukanAngka(target.value);

})