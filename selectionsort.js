const script1 = {
    //script1.selectionSort(array);
    //script1.bubbleSort(array);          
    //script1.mergeSort(array);
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