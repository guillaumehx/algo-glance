SPEED = 500;
    
function generateRandomArray(size, range) {
    let numbers = new Set();
    while (numbers.size < size) {
        const randomNum = Math.floor(Math.random() * range) + 1;
        numbers.add(randomNum);
    }
    return Array.from(numbers).map(num => ({ num: num, touched: false }));
}

window.onload = function () {
    let array = generateRandomArray(100, 100);
    let arrayCopy = structuredClone(array);

    script1.render(array);
    script2.render(arrayCopy);

    let slider = document.getElementById('slider');
    slider.addEventListener('mousemove', () => { SPEED = 1000 - slider.value; });

    let start = document.getElementById('start');
    let isStarted = false;
    start.addEventListener('click', () => {
        if (!isStarted) {
            script1.selectionSort(array);
            script2.quickSort(arrayCopy);
        }
    });         
};