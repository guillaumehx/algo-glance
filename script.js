const script1 = {
    init: function (array) {

        //let array = script1.generateRandomArray(100, 100);
        script1.render(array);
    
        let slider = document.getElementById('slider');
        slider.addEventListener('mousemove', () => { SPEED = 1000 - slider.value; });
    
        let start = document.getElementById('start');
        let isStarted = false;
        start.addEventListener('click', () => {
            if (!isStarted) {
                isStarted = true;
                script1.selectionSort(array);
                //script1.bubbleSort(array);          
                //script1.mergeSort(array);
            }
        });
    },


    setRed: function(i) {
        document.querySelectorAll('#main .bar').forEach(bar => {
            if (parseInt(bar.id) === i) {
                bar.style.backgroundColor = "red";
            }
        });
    },
    
    setBlue: function(i) {
        document.querySelectorAll('#main .bar').forEach(bar => {
            if (parseInt(bar.id) === i) {
                bar.style.backgroundColor = "#3498db";
            }
        });
    },
    
    setGreen: function(i) {
        document.querySelectorAll('#main .bar').forEach(bar => {
            if (parseInt(bar.id) === i) {
                bar.style.backgroundColor = "green";
            } else {
                bar.style.backgroundColor = "#3498db";
            }
        });
    },
    render: function(array) {
        let main = document.getElementById('main');
        main.innerHTML = '';
        for (let index = 0; index < array.length; index++) {
            let span = document.createElement('span');
            span.id = array[index].num;
            span.classList.add('bar');
            if (array[index].touched) {
                span.classList.add('touched');
            }
            main.appendChild(span);
        }
    
        script1.setHeight();
    },
    
    setHeight: function() {
        document.querySelectorAll('#main .bar').forEach(bar => {
            let value = parseInt(bar.id);
            let height = value * 3;
            bar.style.height = `${height}px`;
        });
    },

    pause: function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    },

    setBlueForAllBars: function() {
        document
            .querySelectorAll('#main .bar')
            .forEach(bar => bar.style.backgroundColor = "#1A75B1");
    },

    selectionSort: async function (array) {
        let n = array.length;
        for (let i = 0; i < n - 1; i++) {
            let minIndex = i;
            script1.setRed(array[minIndex].num);
            await script1.pause(SPEED);
            script1.setGreen(array[minIndex].num);
            for (let j = i + 1; j < n; j++) {
                script1.setRed(array[j].num);
                await script1.pause(SPEED);
                script1.setBlue(array[j].num);
                if (array[j].num < array[minIndex].num) {
                    minIndex = j;
                    script1.setGreen(array[j].num);
                }
            }
            array[i].touched = true;
            if (minIndex !== i) {
                let temp = array[i].num;
                array[i].num = array[minIndex].num;
                array[minIndex].num = temp;
                await script1.pause(SPEED);
                script1.render(array);
            }
        }
        script1.setBlueForAllBars();
    },

    bubbleSort: async function(arr) {
        let n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            let swapped = false;
            for (let j = 0; j < n - 1 - i; j++) {
                script1.setRed(arr[j].num);
                script1.setRed(arr[j + 1].num);
                await script1.pause(SPEED);  
                script1.setBlue(arr[j].num);
                script1.setBlue(arr[j + 1].num);
                if (arr[j].num > arr[j + 1].num) {
                    let temp = arr[j].num;
                    arr[j].num = arr[j + 1].num;
                    arr[j + 1].num = temp;
                    swapped = true;
                    script1.setGreen(arr[j].num);
                    script1.setGreen(arr[j + 1].num);
                    await script1.pause(SPEED);
                    script1.render(arr);
                }
            }
            if (!swapped) {
                break;
            }
        }
    },
    mergeSort: async function(arr, left = 0, right = arr.length - 1) {
        // Helper function to merge two subarrays
        async function merge(arr, left, mid, right) {
            let n1 = mid - left + 1; // Length of the left subarray
            let n2 = right - mid;    // Length of the right subarray
    
            // Create temporary arrays to hold the left and right subarrays
            let leftArr = [];
            let rightArr = [];
    
            for (let i = 0; i < n1; i++) {
                leftArr.push({ num: arr[left + i].num });
                script1.setRed(arr[left + i].num); // Highlight left subarray
                await script1.pause(SPEED);
            }
    
            for (let j = 0; j < n2; j++) {
                rightArr.push({ num: arr[mid + 1 + j].num });
                script1.setRed(arr[mid + 1 + j].num); // Highlight right subarray
                await script1.pause(SPEED);
            }
    
            let i = 0, j = 0, k = left; // Initial indexes for left, right, and merged subarrays
    
            // Merge the temporary arrays back into the original array
            while (i < n1 && j < n2) {
                if (leftArr[i].num <= rightArr[j].num) {
                    arr[k].num = leftArr[i].num;
                    script1.setGreen(arr[k].num); // Highlight merged element
                    i++;
                } else {
                    arr[k].num = rightArr[j].num;
                    script1.setGreen(arr[k].num); // Highlight merged element
                    j++;
                }
                script1.render(arr); // Render the array after each merge step
                await script1.pause(SPEED);
                k++;
            }
    
            // Copy any remaining elements of the left subarray
            while (i < n1) {
                arr[k].num = leftArr[i].num;
                script1.setGreen(arr[k].num); // Highlight remaining left element
                script1.render(arr);
                await script1.pause(SPEED);
                i++;
                k++;
            }
    
            // Copy any remaining elements of the right subarray
            while (j < n2) {
                arr[k].num = rightArr[j].num;
                script1.setGreen(arr[k].num); // Highlight remaining right element
                script1.render(arr);
                await script1.pause(SPEED);
                j++;
                k++;
            }
    
            // Reset colors for the merged range
            for (let x = left; x <= right; x++) {
                script1.setBlue(arr[x].num);
            }
        }
    
        if (left < right) {
            let mid = Math.floor((left + right) / 2);
    
            // Recursively sort the left and right halves
            await script1.mergeSort(arr, left, mid);
            await script1.mergeSort(arr, mid + 1, right);
    
            // Merge the sorted halves
            await merge(arr, left, mid, right);
        }
    
        // Reset all bars to blue after the full sort is complete
        if (left === 0 && right === arr.length - 1) {
            script1.setBlueForAllBars();
        }
    }
};




//(function () {
//    function init() {
//
//        let array = generateRandomArray(100, 100);
//        render(array);
//    
//        let slider = document.getElementById('slider');
//        slider.addEventListener('mousemove', () => { SPEED = 1000 - slider.value; });
//    
//        let start = document.getElementById('start');
//        let isStarted = false;
//        start.addEventListener('click', () => {
//            if (!isStarted) {
//                isStarted = true;
//                //selectionSort(array);            
//                mergeSort(array);
//            }
//        });
//    }
//    
//    function generateRandomArray(size, range) {
//        let numbers = new Set();
//        while (numbers.size < size) {
//            const randomNum = Math.floor(Math.random() * range) + 1;
//            numbers.add(randomNum);
//        }
//        return Array.from(numbers).map(num => ({ num: num, touched: false }));
//    }
//    
//    const pause = (ms) => new Promise(resolve => setTimeout(resolve, ms));
//    
//    const setBlueForAllBars = () => {
//        document
//            .querySelectorAll('#main .bar')
//            .forEach(bar => bar.style.backgroundColor = "#1A75B1");
//    };
//    
//    
//    
//    async function quickSort(arr, left = 0, right = arr.length - 1) {
//        // Partition function: Rearranges elements and returns the pivot index
//        async function partition(arr, left, right) {
//            let pivot = arr[right].num;  // Use arr[right].num for the pivot value
//            setGreen(arr[right].num);   // Highlight pivot in green
//            await pause(SPEED);
//    
//            let i = left - 1;  // Pointer for the smaller element
//    
//            for (let j = left; j < right; j++) {
//                setRed(arr[j].num);      // Highlight the current element being compared
//                await pause(SPEED);
//                setBlue(arr[j].num);     // Reset the color after comparison
//    
//                if (arr[j].num < pivot) {
//                    i++;
//                    // Swap arr[i] and arr[j]
//                    let temp = arr[i].num;
//                    arr[i].num = arr[j].num;
//                    arr[j].num = temp;
//    
//                    setGreen(arr[i].num);  // Highlight the swapped element
//                    setGreen(arr[j].num);
//                    await pause(SPEED);
//                    render(arr);          // Render the array after the swap
//                }
//            }
//    
//            // Place the pivot in its correct position
//            let temp = arr[i + 1].num;
//            arr[i + 1].num = arr[right].num;
//            arr[right].num = temp;
//    
//            setGreen(arr[i + 1].num);    // Highlight the new pivot position
//            render(arr);                 // Render the array after placing the pivot
//            await pause(SPEED);
//    
//            return i + 1;  // Return the pivot index
//        }
//    
//        if (left < right) {
//            // Partition the array and get the pivot index
//            let pivotIndex = await partition(arr, left, right);
//    
//            // Recursively sort the elements before and after the pivot
//            await quickSort(arr, left, pivotIndex - 1);
//            await quickSort(arr, pivotIndex + 1, right);
//        }
//        if (left === 0 && right === arr.length - 1) {
//            setBlueForAllBars();  // Reset all bars to blue after the sort is complete
//        }
//    }
//    
//    
//    
//    
//    
//    function setRed(i) {
//        document.querySelectorAll('#main .bar').forEach(bar => {
//            if (parseInt(bar.id) === i) {
//                bar.style.backgroundColor = "red";
//            }
//        });
//    }
//    
//    function setBlue(i) {
//        document.querySelectorAll('#main .bar').forEach(bar => {
//            if (parseInt(bar.id) === i) {
//                bar.style.backgroundColor = "#3498db";
//            }
//        });
//    }
//    
//    function setGreen(i) {
//        document.querySelectorAll('#main .bar').forEach(bar => {
//            if (parseInt(bar.id) === i) {
//                bar.style.backgroundColor = "green";
//            } else {
//                bar.style.backgroundColor = "#3498db";
//            }
//        });
//    }
//    
//    function render(array) {
//        let main = document.getElementById('main');
//        main.innerHTML = '';
//        for (let index = 0; index < array.length; index++) {
//            let span = document.createElement('span');
//            span.id = array[index].num;
//            span.classList.add('bar');
//            if (array[index].touched) {
//                span.classList.add('touched');
//            }
//            main.appendChild(span);
//        }
//    
//        setHeight();
//    }
//    
//    const setHeight = () => {
//        document.querySelectorAll('#main .bar').forEach(bar => {
//            let value = parseInt(bar.id);
//            let height = value * 3;
//            bar.style.height = `${height}px`;
//        });
//    }
//
//    window.addEventListener('load', init);
//})();




//window.onload = init;