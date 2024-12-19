const script2 = {
    init: function (array) {

        script2.render(array);
    
        let slider = document.getElementById('slider');
        slider.addEventListener('mousemove', () => { SPEED = 1000 - slider.value; });
    
        let start = document.getElementById('start');
        let isStarted = false;
        start.addEventListener('click', () => {
            if (!isStarted) {
                isStarted = true;
                script2.quickSort(array);
            }
        });
    },

    setRed: function(i) {
        document.querySelectorAll('#main2 .bar').forEach(bar => {
            if (parseInt(bar.id) === i) {
                bar.style.backgroundColor = "red";
            }
        });
    },
    
    setBlue: function(i) {
        document.querySelectorAll('#main2 .bar').forEach(bar => {
            if (parseInt(bar.id) === i) {
                bar.style.backgroundColor = "#3498db";
            }
        });
    },
    
    setGreen: function(i) {
        document.querySelectorAll('#main2 .bar').forEach(bar => {
            if (parseInt(bar.id) === i) {
                bar.style.backgroundColor = "green";
            } else {
                bar.style.backgroundColor = "#3498db";
            }
        });
    },
    render: function(array) {
        let main = document.getElementById('main2');
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
    
        script2.setHeight();
    },
    
    setHeight: function() {
        document.querySelectorAll('#main2 .bar').forEach(bar => {
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
            .querySelectorAll('#main2 .bar')
            .forEach(bar => bar.style.backgroundColor = "#1A75B1");
    },

    quickSort: async function(arr, left = 0, right = arr.length - 1) {
        // Partition function: Rearranges elements and returns the pivot index
        async function partition(arr, left, right) {
            let pivot = arr[right].num;  // Use arr[right].num for the pivot value
            script2.setGreen(arr[right].num);   // Highlight pivot in green
            await script2.pause(SPEED);
    
            let i = left - 1;  // Pointer for the smaller element
    
            for (let j = left; j < right; j++) {
                script2.setRed(arr[j].num);      // Highlight the current element being compared
                await script2.pause(SPEED);
                script2.setBlue(arr[j].num);     // Reset the color after comparison
    
                if (arr[j].num < pivot) {
                    i++;
                    // Swap arr[i] and arr[j]
                    let temp = arr[i].num;
                    arr[i].num = arr[j].num;
                    arr[j].num = temp;
    
                    script2.setGreen(arr[i].num);  // Highlight the swapped element
                    script2.setGreen(arr[j].num);
                    await script2.pause(SPEED);
                    script2.render(arr);          // Render the array after the swap
                }
            }
    
            // Place the pivot in its correct position
            let temp = arr[i + 1].num;
            arr[i + 1].num = arr[right].num;
            arr[right].num = temp;
    
            script2.setGreen(arr[i + 1].num);    // Highlight the new pivot position
            script2.render(arr);                 // Render the array after placing the pivot
            await script2.pause(SPEED);
    
            return i + 1;  // Return the pivot index
        }
    
        if (left < right) {
            // Partition the array and get the pivot index
            let pivotIndex = await partition(arr, left, right);
    
            // Recursively sort the elements before and after the pivot
            await script2.quickSort(arr, left, pivotIndex - 1);
            await script2.quickSort(arr, pivotIndex + 1, right);
        }
        if (left === 0 && right === arr.length - 1) {
            script2.setBlueForAllBars();  // Reset all bars to blue after the sort is complete
        }
    }
};