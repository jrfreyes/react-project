export default function generateData(median, range, n, digits = 2) {
    let data = []
    for (let i=0; i<n; i++) {
        data.push(round(range*(gauss()-0.5) + median, digits))
    }
    return data
}

function round(n, exp=2) {
    return Math.round(n*10**exp)/10**exp
}

function gauss() {
    return (Math.random() + Math.random() + Math.random() + Math.random())/4
}

export function calculateBmi(weight, height) {
    return round(weight/(height/100)**2)
}

export function calculateLeanBodyMass(weight, height) {
    return round(1.07*weight - 148*(weight/height)**2)
}

function generateSampleTime(hour) {
    return generateData(hour, 3, 30).map((n) => (n%24))
}

export function generateSampleData() {
    const weights = generateData(60, 50, 30)
    const heights = generateData(160, 10, 30)
    const heartRates = generateData(75, 50, 30, 0)
    const systoles = generateData(110, 30, 30)
    const diastoles = generateData(70, 20, 30)
    const sleepTimeHours = generateSampleTime(22)
    const wakeTimeHours = generateSampleTime(7)
    

    return weights.map((weight, i) => ({
        name: !(i%14) && `${i + 1}`,
        weight: weight,
        height: heights[i],
        bmi: calculateBmi(weight, heights[i]),
        lbm: calculateLeanBodyMass(weight, heights[i]),
        heartRate: heartRates[i],
        systole: systoles[i],
        diastole: diastoles[i],
        sleepTimeHour: sleepTimeHours[i],
        wakeTimeHour: wakeTimeHours[i]
    }))
}

export function formatTime(value, name, props) {
    const hour = Math.floor(value);
    const min = Math.floor((value % 1)*60);
    const meridian = hour < 12 ? 'AM' : 'PM';
    let hour12 = (hour % 12);
    hour12 = hour12 || 12;

    return `${hour}:${min.toString().padStart(2,'0')}${meridian}`;
}