export default function generateData(median, range, n, digits = 2) {
    if (n === 1) {
        return round(range*(gauss()-0.5) + median, digits)
    }
    
    let data = []
    for (let i=0; i<n; i++) {
        data.push(round(range*(gauss()-0.5) + median, digits))
    }
    return data
}

function round(n, exp=2) {
    return Math.round(n*10**exp)/10**exp
}

export function gauss() {
    return (Math.random() + Math.random() + Math.random() + Math.random())/4
}

export function calculateBmi(weight, height) {
    return round(weight/(height/100)**2)
}

export function calculateLeanBodyMass(weight, height) {
    return round(1.07*weight - 148*(weight/height)**2)
}

function generateSampleTime(hour, n=30) {
    if (n === 1) {
        return generateData(hour, 3, 1) % 24
    }
    return generateData(hour, 3, 30).map((n) => (n%24))
}

export function generateSampleData(n=30, name) {
    const weights = generateData(60, 50, n)
    const heights = generateData(160, 10, n)
    const heartRates = generateData(75, 50, n, 0)
    const systoles = generateData(110, 30, n)
    const diastoles = generateData(70, 20, n)
    const sleepTimeHours = generateSampleTime(22, n)
    const wakeTimeHours = generateSampleTime(7, n)
    
    if (n === 1) {
        return {
            name: name,
            weight: weights,
            height: heights,
            bmi: calculateBmi(weights, heights),
            lbm: calculateLeanBodyMass(weights, heights),
            heartRate: heartRates,
            systole: systoles,
            diastole: diastoles,
            sleepTime:  round(24 + wakeTimeHours - sleepTimeHours, 2)
        }
    } else {
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
}

export function formatTime(value, name, props) {
    const hour = Math.floor(value);
    const min = Math.floor((value % 1)*60);
    const meridian = hour < 12 ? 'AM' : 'PM';
    let hour12 = (hour % 12) || 12;

    return `${hour12}:${min.toString().padStart(2,'0')}${meridian}`;
}