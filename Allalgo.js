// Bubble sort
    // 1. Definition
        //Bubble Sort is a simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.
        //After each pass, the largest (or smallest) element “bubbles up” to its correct position.

    // Repeat (n - 1) times:
      // Compare adjacent elements.
      // Swap if they are in the wrong order.
      // If in one full pass no swaps occur→stop early(optimized version).

    // 7.Space Complexity
      // O(1)→In-place sorting (no extra memory used except temp variable).

    // 8.Stability

    // Stable Sort
        // → Equal elements retain their relative order after sorting.

    // 9. Pros and Cons
        // Advantages
            // Simple to understand and implement.
            // Works well for small datasets.
            // Can detect already sorted arrays (with optimization).
            
        // ❌ Disadvantages
            // Inefficient for large datasets (O(n²)).
            // More comparisons and swaps than needed.

    // 🧠 10. When to Use
        // Situation	Recommendation
        // Small arrays or nearly sorted arrays	✅ Good choice
        // Large arrays or performance-critical apps	❌ Avoid (use Merge Sort or Quick Sort)
        
// Basic Version:
    function bubblesort(arr){
        let n=arr.length;
        for(let i=0;i<n-1;i++){
            for(let j=0;j<n-i-1;j++){
                if(arr[j]>arr[j+1]){
                    let temp=arr[j];
                    arr[j]=arr[j+1];
                    arr[j+1]=temp;
                }
            }
        }
        return arr;
    }

    console.log(bubblesort([64, 34, 25, 12, 22, 11, 90]));

    // Optimized Version (Early Stop):

    function bubbleSortOptimized(arr){
        let n=arr.length;
        let swapped;
        for (let i=0;i<n-1;i++) {
            swapped=false;
            for (let j=0;j<n-i-1;j++) {
                if (arr[j]>arr[j+1]){
                    [arr[j],arr[j+1]]=[arr[j+1],arr[j]];
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
        return arr;
    }

    console.log(bubbleSortOptimized([5, 1, 4, 2, 8]));



    // selection sort :
        //Selection Sort is a comparison-based sorting algorithm that divides the array into two parts:
        // Sorted part (at the beginning)
        // Unsorted part (the rest of the array)
        // It repeatedly selects the smallest (or largest) element from the unsorted part and places it at the end of the sorted part.
    
    //2. Principle (Key Idea)
        // In every iteration, find the minimum element from the unsorted portion and swap it with the first unsorted element.
    
    //4. Algorithm Steps:
        // Loop from i = 0 to n - 2
        // Assume the smallest element is at index i
        // Loop from j = i + 1 to n - 1 to find the smallest element
        // Swap the smallest element found with the element at index i
        // Repeat until the array is sorted
    
    // 5. JavaScript Implementation
        function selectionSort(arr) {
            let n=arr.length;
            for (let i=0;i<n-1;i++) {
                let minIndex=i;
                for (let j=i+1;j<n;j++) {
                    if (arr[j]<arr[minIndex]) {
                        minIndex=j;
                    }
                }
                if (minIndex !==i) {
                let temp = arr[i];
                arr[i] = arr[minIndex];
                arr[minIndex] = temp;
                }
            }
            return arr;
        }
        console.log(selectionSort([64, 25, 12, 22, 11]));

    //6. Optimized Version (ES6 Swap Syntax)
        function selectionSort(arr) {
            for (let i = 0; i < arr.length - 1; i++) {
                let minIndex = i;
                for (let j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[minIndex]) minIndex = j;
                }
                [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]; // ES6 swap
            }
            return arr;
        }
        console.log(selectionSort([64, 25, 12, 22, 11]));

    // 7. Time Complexity
        // Case	Description	Time Complexity
        // Best Case	Already sorted	O(n²)
        // Average Case	Random order	O(n²)
        // Worst Case	Reverse order	O(n²)

        // 📘 Even if the array is sorted, Selection Sort still performs all comparisons — it never stops early.

    // 💾 8. Space Complexity
        // O(1)→In-place sorting(only a few extra variables used)

    // 📊 9. Stability
        // ❌ Not Stable
        // Because when you swap, it can change the relative order of equal elements.
        // Example: [4A, 4B, 3] → after sorting → [3, 4B, 4A] (order of 4A and 4B changed)

    // ⚖️ 10. Pros & Cons
        // ✅ Advantages
        // Very simple and easy to understand.
        // Performs minimal number of swaps (good when swapping is costly).
        // Works well for small lists.

    // ❌ Disadvantages
        // Inefficient for large datasets (O(n²) comparisons).
        // Doesn’t adapt to already sorted data.
        // Not stable.

    // 🧠 11. When to Use
        // Situation	Recommendation
        // Small array and swap operation costly	✅ Use Selection Sort
        // Large dataset	❌ Avoid (use Merge, Quick, or Heap Sort)
        // Need stable sort	❌ Avoid (use Bubble or Insertion Sort)
    
    // 🔍 12. Difference Between Bubble & Selection Sort
        // Feature	Bubble Sort	Selection Sort
        // Process	Repeatedly swaps adjacent elements	Selects minimum and swaps once per pass
        // Swaps	Many swaps	Fewer swaps
        // Best Case	O(n) with optimization	O(n²) always
        // Stable	✅ Yes	❌ No
        // When to Use	Nearly sorted arrays	Small arrays, few swaps needed

    // Insertion Sort :
        // Insertion Sort is a simple and efficient comparison-based sorting algorithm that builds a sorted array one element at a time by repeatedly taking the next element from the unsorted portion and inserting it into its correct position in the sorted portion.

    //2. Principle (Key Idea)
        // Like sorting playing cards in your hand — pick a card and insert it in the correct position among the already sorted cards.

    //4. Algorithm Steps
        // Start from the second element (index 1)
        // Compare it with elements in the sorted left side
        // Shift all elements greater than the current element one position to the right
        // Insert the current element in the correct position
        // Repeat for all elements

    // 5. JavaScript Implementation
        function insertionSort(arr) {
        for (let i = 1; i < arr.length; i++) {
            let key = arr[i];      // current element
            let j = i - 1;

            // shift elements of sorted part to the right
            while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
            }

            // insert key at correct position
            arr[j + 1] = key;
        }
        return arr;
        }

        console.log(insertionSort([5, 3, 4, 1, 2]));

    // 6. Optimized (Compact) Version
        const insertionSort = (arr) => {
        for (let i = 1; i < arr.length; i++) {
            let j = i;
            while (j > 0 && arr[j - 1] > arr[j]) {
            [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]]; // ES6 swap
            j--;
            }
        }
        return arr;
        };

        console.log(insertionSort([5, 3, 4, 1, 2]));

    //7. Time Complexity
        // Case	Description	Time Complexity
        // Best Case	Already sorted	O(n)
        // Average Case	Random order	O(n²)
        // Worst Case	Reverse order	O(n²)
        // ✅ Best case (O(n)) happens when the array is nearly sorted — it just checks once per element.

    // 💾 8. Space Complexity
        // O(1) — In-place sorting (no extra memory used)

    // 📊 9. Stability
    // ✅ Stable Sort
        // Because it doesn’t change the order of equal elements.

        // Example:
        // [4A, 4B, 3] → [3, 4A, 4B]
        // (order of 4A and 4B remains same)
        // ⚖️ 10. Pros & Cons
    // ✅ Advantages

        // Simple and easy to implement.
        // Very efficient for small or nearly sorted arrays.
        // Stable and in-place.
        // Adaptive — takes advantage of existing order.

    // ❌ Disadvantages
        // O(n²) in average and worst cases.
        // Inefficient for large arrays.

    // 🧠 11. When to Use
        // Situation	Recommendation
        // Small array or almost sorted data	✅ Excellent choice
        // Large, random datasets	❌ Avoid (use Merge or Quick Sort)
        // Need stable sorting	✅ Use Insertion Sort

    
// Merge Sort
    //1. Definition
        // Merge Sort is a divide and conquer algorithm that divides the array into halves, sorts each half recursively, and then merges the two sorted halves into one sorted array.
    
    // 2. Principle (Key Idea)
        // “Divide the array until each part has one element,
        // then merge them back in a sorted manner.”
    
    // 4. Algorithm Steps
          //Divide:
          //If the array has more than one element, split it into two halves.

          //Conquer:
          //Recursively sort both halves.

          //Combine:
          //Merge the two sorted halves into one sorted array.


    // 5. JavaScript Implementation
        function mergeSort(arr) {
        // Base case: if array has one or zero elements
        if (arr.length <= 1) return arr;

        // Split array into two halves
        const mid = Math.floor(arr.length / 2);
        const left = arr.slice(0, mid);
        const right = arr.slice(mid);

        // Recursively sort both halves and merge
        return merge(mergeSort(left), mergeSort(right));
        }

        // Helper function to merge two sorted arrays
        function merge(left, right) {
        let result = [];
        let i = 0, j = 0;

        // Compare and merge elements in sorted order
        while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
        }

        // Add remaining elements (if any)
        return result.concat(left.slice(i)).concat(right.slice(j));
        }

        console.log(mergeSort([38, 27, 43, 3, 9, 82, 10]));

    //6. Step-by-Step Flow (for [5, 2, 4, 6, 1, 3])
            // [5, 2, 4, 6, 1, 3]
            // → Divide → [5, 2, 4] and [6, 1, 3]
            // → Divide further → [5], [2, 4] and [6], [1, 3]
            // → Merge → [2, 4, 5] and [1, 3, 6]
            // → Merge both → [1, 2, 3, 4, 5, 6]

    //7. Time Complexity
        // Case	Description	Time Complexity
        // Best Case	Already sorted	O(n log n)
        // Average Case	Random order	O(n log n)
        // Worst Case	Reverse order	O(n log n)

    // ✅ Merge Sort always takes O(n log n) because it always divides and merges the same number of times, regardless of order.

    // 💾 8. Space Complexity
        // O(n) — due to creation of temporary arrays during merging.

    // 📊 9. Stability
        // ✅ Stable Sort
        // If two elements have equal value, their relative order remains the same after sorting.
        // Example:
        // [4A, 4B, 3] → [3, 4A, 4B]

    // ⚖️ 10. Pros & Cons
        // ✅ Advantages
        // O(n log n) for all cases (very consistent)
        // Stable sorting
        // Works well for large datasets
        // Suitable for linked lists

    // ❌ Disadvantages
        // Requires extra space (O(n))
        // Recursive calls add overhead
        // Not ideal for small arrays compared to Insertion Sort
    
    // 🧠 11. When to Use
        // Situation	Recommendation
        // Large datasets	✅ Excellent choice
        // Stable sort needed	✅ Yes
        // Memory limited	❌ Avoid (use Heap Sort)
        // Linked list sorting	✅ Very good (no extra space needed)

// Quick Sort
    //1. Definition
        // Quick Sort is a divide and conquer sorting algorithm that works by:
        // Selecting a pivot element, partitioning the array around the pivot so that
        // elements less than pivot go to its left,
        // elements greater than pivot go to its right,
        // then recursively sorting the left and right parts.

    // ⚙️ 2. Principle (Key Idea)
        // “Pick a pivot → place it in its correct position → recursively sort both sides.”
    
    // 4. Algorithm Steps
        // Pick a pivot element (commonly last, first, or random).
        // Partition the array — rearrange elements so that:
        // Left side < pivot
        // Right side > pivot
        // Recursively apply the same logic to left and right subarrays.
        // Combine (actually happens automatically via recursion).

    //5. JavaScript Implementation
        // ✅ Simple Version (using last element as pivot)
        function quickSort(arr) {
          if (arr.length <= 1) return arr; // base case

          const pivot = arr[arr.length - 1];
          const left = [];
          const right = [];

          for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] < pivot) left.push(arr[i]);
            else right.push(arr[i]);
          }

          // recursively sort and combine
          return [...quickSort(left), pivot, ...quickSort(right)];
        }

        console.log(quickSort([10, 7, 8, 9, 1, 5]));

    // 6. In-Place Optimized Version (No Extra Arrays)
        function quickSortInPlace(arr, low = 0, high = arr.length - 1) {
        if (low < high) {
            const pIndex = partition(arr, low, high);
            quickSortInPlace(arr, low, pIndex - 1);  // left part
            quickSortInPlace(arr, pIndex + 1, high); // right part
        }
        return arr;
        }

        function partition(arr, low, high) {
        const pivot = arr[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
            }
        }

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // move pivot to correct place
        return i + 1; // return pivot index
        }

        console.log(quickSortInPlace([10, 7, 8, 9, 1, 5]));

    
    //8. Time Complexity
        // Case	Description	Time Complexity
        // Best Case	Balanced partitions	O(n log n)
        // Average Case	Random data	O(n log n)
        // Worst Case	Already sorted (bad pivot)	O(n²)

        // Worst case happens if pivot selection is poor (like always choosing the smallest/largest element).

    //9. Space Complexity
        // Recursive QuickSort: O(log n) (stack frames)
        // Non-recursive version: O(1)

    // 📊 10. Stability
        // ❌ Not Stable
        // Equal elements might change relative order during swapping.
        // Example: [4A, 4B, 3] → [3, 4B, 4A]

        // ⚖️ 11. Pros & Cons
        // ✅ Advantages
        // Very fast for large datasets (average O(n log n))
        // In-place sorting (no extra array)
        // Used in many built-in sort functions
        // Performs well in practice

    // ❌ Disadvantages
        // Worst case O(n²) if pivot selection is poor
        // Not stable
        // Recursive (can cause stack overflow for very large arrays)

    // 🧠 12. When to Use
        // Situation	Recommendation
        // Large dataset	✅ Excellent
        // Memory limited	✅ In-place efficient
        // Need stable sorting	❌ Avoid
        // Nearly sorted data	❌ Bad (unless using random pivot)

// Heap Sort
        //Definition
            // Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure (commonly a max heap) to sort elements.
            // It first builds a heap from the input data and then repeatedly extracts the largest (root) element to build the sorted array.

      // Core Principle
        //     Heap Sort works on two main steps:
        //     Build Max Heap: Arrange the array elements to satisfy the max heap property (parent ≥ children).
        //     Extract Maximum Repeatedly: Swap the root (maximum) with the last element, reduce heap size, and re-heapify the root.

        // Step-by-Step Algorithm
        //     Build a max heap from the input array.
        //     Repeat until the heap size is 1:
        //     Swap the root (max element) with the last item in the heap.
        //     Reduce heap size by 1.
        //     Heapify the root to maintain heap property.

    // JavaScript Code
        function heapify(arr, n, i) {
        let largest = i; // Initialize largest as root
        let left = 2 * i + 1; // left child
        let right = 2 * i + 2; // right child

        // If left child is larger than root
        if (left < n && arr[left] > arr[largest]) largest = left;

        // If right child is larger than largest so far
        if (right < n && arr[right] > arr[largest]) largest = right;

        // If largest is not root
        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]]; // Swap
            heapify(arr, n, largest); // Recursively heapify affected sub-tree
        }
        }

        function heapSort(arr) {
        let n = arr.length;

        // Build max heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }

        // Extract elements one by one
        for (let i = n - 1; i > 0; i--) {
            [arr[0], arr[i]] = [arr[i], arr[0]]; // Move current root to end
            heapify(arr, i, 0); // Heapify reduced heap
        }

        return arr;
        }

        // Example:
        console.log(heapSort([4, 10, 3, 5, 1]));
        // Output: [1, 3, 4, 5, 10]

    //Advantages
        // Efficient for large datasets.
        // In-place algorithm (no extra array needed).
        // Consistent time complexity (O(n log n)) in all cases.

    // ❌ Disadvantages
        // Not stable (relative order of equal elements not preserved).
        // More complex to implement than simple sorts.
        // Cache performance is poorer due to random access patterns.

    // 📘 Use Cases
        // Systems where consistent O(n log n) performance is needed.
        // Priority queues, scheduling, and real-time systems.
        // When memory efficiency is critical (since it’s in-place).

    // Counting Sort
        // Definition
        //     Counting Sort is a non-comparison-based sorting algorithm that sorts integers (or data with integer keys) by counting the frequency of each element.
        //     It then uses these counts to calculate positions of elements in the output array.
        //     Unlike Bubble/Quick/Merge Sort — Counting Sort doesn’t compare elements directly.

    // Core Principle
        // Create a count array to store how many times each number appears.
        // Convert counts to cumulative counts (prefix sums) to determine positions.
        // Place each element in its correct sorted position in the output array.

    // JavaScript Implementation
function countingSort(arr) {
  if (arr.length === 0) return [];

  // Find min and max to handle non-zero-based values
  const min = Math.min(...arr);
  const max = Math.max(...arr);

  const count = new Array(max - min + 1).fill(0);

  // Step 1: Count frequency
  for (let num of arr) {
    count[num - min]++;
  }

  // Step 2: Cumulative count (prefix sum)
  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }

  // Step 3: Build output array (stable sort)
  const output = new Array(arr.length);
  for (let i = arr.length - 1; i >= 0; i--) {
    const num = arr[i];
    const index = count[num - min] - 1;
    output[index] = num;
    count[num - min]--;
  }

  return output;
}

// Example:
console.log(countingSort([4, 2, 2, 8, 3, 3, 1]));
// Output: [1, 2, 2, 3, 3, 4, 8]


// ✅ Advantages
    // Very fast for small ranges of integers.
    // Stable sorting (preserves order of equal elements).
    // Works well for integer keys, grades, ages, etc.
    // Non-comparison based — faster than O(n log n) sorts when range k is small.

// ❌ Disadvantages
    // Only works for integers or categorical data (not floats/strings).
    // Inefficient when the range k is large compared to n.
    // Requires extra memory for count array.

// 📘 Use Cases
    // Sorting exam scores, age data, or IDs within a limited range.
    // Preprocessing step in Radix Sort (used for each digit).
    // Efficient when values are repetitive and limited in range.

// 🧠 Summary Table
    // Property	Counting Sort
    // Type	Non-comparison-based
    // Stability	✅ Stable
    // Space Complexity	O(n + k)
    // Best Use Case	When range (k) is small
    // Example	Sorting student marks between 0–100


// Radix Sort
    // Definition
    //     Radix Sort is a non-comparison-based sorting algorithm that sorts numbers digit by digit, starting from the least significant digit (LSD) to the most significant digit (MSD) (or vice versa).
    //     It uses a stable subroutine sorting algorithm (usually Counting Sort) for each digit.

    // Core Principle
    //     Radix Sort sorts numbers based on place values (1s, 10s, 100s, etc.).
    //     For example, to sort [170, 45, 75, 90, 802, 24, 2, 66]:
    //     Sort by 1s place
    //     Then by 10s place
    //     Then by 100s place
    //     After the final pass, the array is completely sorted.

    // Step-by-Step Example
    //     Input: [170, 45, 75, 90, 802, 24, 2, 66]
    //     Step 1: Sort by 1s place (unit digit)
    //     → [170, 90, 802, 2, 24, 45, 75, 66]
    //     Step 2: Sort by 10s place
    //     → [802, 2, 24, 45, 66, 170, 75, 90]
    //     Step 3: Sort by 100s place
    //     → [2, 24, 45, 66, 75, 90, 170, 802]
    //     ✅ Final Sorted Array: [2, 24, 45, 66, 75, 90, 170, 802]

    // JavaScript Implementation
        // Helper: Counting Sort for a specific digit
        function countingSortForRadix(arr, exp) {
        const n = arr.length;
        const output = new Array(n).fill(0);
        const count = new Array(10).fill(0); // digits 0-9
        // Count occurrences of each digit
        for (let i = 0; i < n; i++) {
            const digit = Math.floor(arr[i] / exp) % 10;
            count[digit]++;
        }
        // Cumulative count
        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }
        // Build output (stable)
        for (let i = n - 1; i >= 0; i--) {
            const digit = Math.floor(arr[i] / exp) % 10;
            output[count[digit] - 1] = arr[i];
            count[digit]--;
        }
        // Copy output back to arr
        for (let i = 0; i < n; i++) arr[i] = output[i];
        }

        function radixSort(arr) {
        const max = Math.max(...arr);
        // Sort based on each digit's place (1, 10, 100, ...)
        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
            countingSortForRadix(arr, exp);
        }

        return arr;
        }

        // Example:
        console.log(radixSort([170, 45, 75, 90, 802, 24, 2, 66]));
// Output: [2, 24, 45, 66, 75, 90, 170, 802]

// ⏱️ Time & Space Complexity
    // Case	Complexity	Explanation
    // Best	O(nk)	k = number of digits
    // Average	O(nk)	Each pass uses Counting Sort
    // Worst	O(nk)	Even in worst arrangement
    // Space	O(n + k)	Extra array for counting sort
    // 🔸 n = number of elements
    // 🔸 k = number of digits in the largest number

//✅ Advantages
    // Faster than O(n log n) comparison sorts when digits (k) are small.
    // Stable sort — maintains the order of equal elements.
    // Works well for large lists of integers.
    // Can handle both positive and negative numbers (with small adjustments).

//❌ Disadvantages
    // Works only for integer or string data (not floats directly).
    // Requires extra memory for counting arrays.
    // Performance degrades if numbers have many digits (large k).

//📘 Use Cases
    // Sorting large datasets of integers or strings with limited digit length.
    // Used in phone directory, postal sorting, or account IDs.
    // Commonly used in digital systems and non-comparison sorting scenarios.

//🧠 Summary Table
    // Property	Radix Sort
    // Type	Non-comparison-based
    // Stable	✅ Yes
    // Time Complexity	O(nk)
    // Space Complexity	O(n + k)
    // Best For	Integer / String sorting
    // Subroutine Used	Counting Sort

// bucket sort
    //Definition
        // Bucket Sort is a non-comparison-based sorting algorithm that works by:
        // Distributing elements into multiple “buckets” (groups), sorting each bucket individually (using another sorting method), and then combining them to get the final sorted array.
        // It’s especially efficient for data that is uniformly distributed over a range (like decimal numbers between 0 and 1).


    // Core Principle
        // Divide the input into several buckets based on value range.
        // Sort each bucket individually (using Insertion Sort, Merge Sort, etc.).
        // Concatenate all buckets to get the final sorted array.



// JavaScript Implementation
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

function bucketSort(arr, bucketSize = 5) {
  if (arr.length === 0) return arr;

  // Find min and max
  const minValue = Math.min(...arr);
  const maxValue = Math.max(...arr);

  // Initialize buckets
  const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
  const buckets = Array.from({ length: bucketCount }, () => []);

  // Distribute elements into buckets
  for (let num of arr) {
    const idx = Math.floor((num - minValue) / bucketSize);
    buckets[idx].push(num);
  }

  // Sort each bucket and concatenate
  const sortedArray = [];
  for (let bucket of buckets) {
    insertionSort(bucket);
    sortedArray.push(...bucket);
  }

  return sortedArray;
}

// Example:
console.log(bucketSort([0.42, 0.32, 0.23, 0.52, 0.25, 0.47, 0.51]));
// Output: [0.23, 0.25, 0.32, 0.42, 0.47, 0.51, 0.52]

// ⏱️ Time & Space Complexity
    // Case	Complexity	Explanation
    // Best	O(n + k)	Uniformly distributed input
    // Average	O(n + k)	Each bucket has few elements
    // Worst	O(n²)	All elements go into one bucket
    // Space	O(n + k)	Buckets + sorting inside each
    // n = number of elements
    // k = number of buckets

//Advantages
    // Very fast for uniformly distributed data (like decimals between 0–1).
    // Parallelizable — each bucket can be sorted independently.
    // Good for floating-point numbers.

//Disadvantages
    // Inefficient for non-uniform or skewed data.
    // Choosing the right number of buckets is tricky.
    // Needs extra memory for buckets.
    // Not suitable for integer data with large range gaps.

//Use Cases
    // Sorting floating-point numbers in a specific range (e.g., 0–1).
    // Used in computer graphics, data visualization, and probability distributions.
    // When input is uniformly distributed and bucket boundaries are predictable.

//🧠Comparison Table
    // | Feature | Bucket Sort | Counting Sort | Radix Sort |
    // |----------|--------------|----------------|
    // | Type | Distribution-based | Counting-based | Digit-based |
    // | Data Type | Floats / decimals | Integers | Integers / strings |
    // | Stable | Depends on inner sort | Yes | Yes |
    // | Best Case | O(n + k) | O(n + k) | O(nk) |
    // | Worst Case | O(n²) | O(n + k) | O(nk) |

// 💡 Key Idea Summary

// 🪣 “Divide the range → Fill the buckets → Sort each bucket → Merge results.”


// linear seach
    //Definition
        // Linear Search (also known as Sequential Search) is the simplest searching algorithm that checks each element one by one in a list or array until the desired element is found or the list ends.

    //Core Principle
        // Start from the first element → Compare each element with the target →
        // If a match is found → Return its index → Otherwise, continue →
        // If not found till the end → Return -1.

// 🧮 Example
// Array: [10, 25, 30, 45, 50]
// Target: 45
// Step-by-step process:
// Compare 10 with 45 → ❌
// Compare 25 with 45 → ❌
// Compare 30 with 45 → ❌
// Compare 45 with 45 → ✅ Found at index 3
// Output → 3

// 💻 JavaScript Implementation
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Element found
    }
  }
  return -1; // Element not found
}

// Example:
const arr = [10, 25, 30, 45, 50];
const target = 45;

const result = linearSearch(arr, target);
if (result !== -1) {
  console.log(`Element found at index ${result}`);
} else {
  console.log("Element not found");
}


// ✅ Output:
// Element found at index 3

    // ⏱️ Time & Space Complexity
    // Case	Time Complexity	Explanation
    // Best Case	O(1)	Element found at the first position
    // Average Case	O(n/2) ≈ O(n)	Element found halfway
    // Worst Case	O(n)	Element found at the end or not found
    // Space Complexity	O(1)	No extra memory used
    // n = number of elements in the array

// ✅ Advantages
    // Very simple to implement.
    // Works for unsorted and unordered data.
    // No extra memory required.
    // Works for any data type (numbers, strings, objects, etc.).

// ❌ Disadvantages
    // Slow for large datasets (checks every element).
    // Inefficient when searching frequently in large arrays.
    // Not suitable for sorted data (better options like Binary Search exist).

// 📘 Use Cases
    // Small datasets or lists.
    // When data is unsorted and simple to scan.
    // Useful for linked lists where random access isn’t possible.

// 🧠 Comparison with Binary Search
    // Feature	Linear Search	Binary Search
    // Data Type	Unsorted / Sorted	Must be Sorted
    // Time Complexity	O(n)	O(log n)
    // Method	Sequential checking	Divide and conquer
    // Space	O(1)	O(1)
    // Best For	Small / unsorted arrays	Large / sorted arrays


// Binary Search
    //1. Definition
        // Binary Search is an efficient searching algorithm used to find the position of a target element in a sorted array (ascending or descending).
        // It repeatedly divides the search range in half until the target element is found or the range becomes empty.

// ⚙️ 2. Working Principle
    // Start with the entire sorted array.
    // Find the middle element.
    // Compare the target value with the middle element:
    // If equal → ✅ found.
    // If smaller → search in the left half.
    // If greater → search in the right half.
    // Repeat the process until the element is found or the search space is empty.

// 🧩 3. Step-by-Step Example
    // Example:
    // arr = [2, 4, 6, 8, 10, 12, 14]
    // target = 10


    // Step 1:
    // Start = 0, End = 6
    // Mid = (0 + 6) / 2 = 3 → arr[3] = 8
    // → 10 > 8 → search in right half

    // Step 2:
    // Start = 4, End = 6
    // Mid = (4 + 6) / 2 = 5 → arr[5] = 12
    // → 10 < 12 → search in left half

    // Step 3:
    // Start = 4, End = 4
    // Mid = 4 → arr[4] = 10 ✅ FOUND

// 💻 4. JavaScript Code
// ✅ Iterative Approach

function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) return mid; // found
    else if (arr[mid] < target) left = mid + 1; // right half
    else right = mid - 1; // left half
  }

  return -1; // not found
}

// let arr = ;
console.log(binarySearch([2, 4, 6, 8, 10, 12, 14], 10)); // Output: 4

// ✅ Recursive Approach
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) return -1;

  const mid = Math.floor((left + right) / 2);

  if (arr[mid] === target) return mid;
  else if (arr[mid] < target)
    return binarySearchRecursive(arr, target, mid + 1, right);
  else
    return binarySearchRecursive(arr, target, left, mid - 1);
}

console.log(binarySearchRecursive([2, 4, 6, 8, 10, 12, 14], 10)); // Output: 4

      // 🧮 5. Time and Space Complexity
        // Case	Time Complexity	Explanation
        // Best	O(1)	Found at first comparison
        // Average	O(log n)	Each step halves the search space
        // Worst	O(log n)	Target not found after all divisions
        // Space	O(1) (iterative) / O(log n) (recursive)	Stack calls for recursion

      // ⚖️ 6. Pros and Cons
        // ✅ Advantages	❌ Disadvantages
        // Much faster than linear search for large data	Works only on sorted arrays
        // Easy to implement	Difficult to use on linked lists (random access needed)
        // Time complexity O(log n)	Sorting needed before searching
      
      // 💡 7. Use Cases
        // Searching in sorted arrays (numbers, names, timestamps).

        // Used in:
        // Dictionary or word lookup
        // Database indexing
        // Binary search trees (BSTs)
        // Competitive programming


// Stack Data Structure

    //Definition
        // A Stack is a linear data structure that follows the LIFO (Last In, First Out) principle.
        // 👉 The last element added to the stack is the first one to be removed.
        
      // Example:
        // Think of a stack of plates — you put the last plate on top and remove from the top first.

      // ⚙️ 2. Working Principle (LIFO)
        // Push: Add (insert) an element to the top of the stack.
        // Pop: Remove an element from the top of the stack.
        // Peek/Top: View the topmost element without removing it.
        // isEmpty: Check if the stack is empty.
        // Size: Get the number of elements in the stack.

      // 🧩 3. Example Visualization
        // Initial Stack: [ ]
        // Push 10 → [10]
        // Push 20 → [10, 20]
        // Push 30 → [10, 20, 30]
        // Pop     → removes 30 → [10, 20]
        // Peek    → 20 (top element)

// 💻 4. JavaScript Implementation
// ✅ Using Array
class Stack {
  constructor() {
    this.items = [];
  }

  // Add element to stack
  push(element) {
    this.items.push(element);
  }

  // Remove top element
  pop() {
    if (this.isEmpty()) return "Stack is empty";
    return this.items.pop();
  }

  // View top element
  peek() {
    if (this.isEmpty()) return "Stack is empty";
    return this.items[this.items.length - 1];
  }

  // Check if empty
  isEmpty() {
    return this.items.length === 0;
  }

  // Size of stack
  size() {
    return this.items.length;
  }

  // Display stack
  print() {
    console.log(this.items.toString());
  }
}

// Example
const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);
stack.print();     // 10,20,30
console.log(stack.pop());  // 30
console.log(stack.peek()); // 20

    // 🧮 5. Time and Space Complexity
        // Operation	Time Complexity	Space Complexity
        // Push	O(1)	O(n)
        // Pop	O(1)	O(n)
        // Peek	O(1)	O(n)
        // isEmpty	O(1)	O(1)

    // ⚖️ 6. Pros and Cons
        // ✅ Advantages	❌ Disadvantages
        // Simple and efficient LIFO access	Limited access (only top element visible)
        // Helps in managing function calls and recursion	Not suitable for random access
        // Useful for reversing, parsing, and backtracking	Fixed size if implemented using arrays

    // 💡 7. Common Use Cases
        // Function call management → Call stack in JavaScript.
        // Undo/Redo operations → Text editors.
        // Backtracking → Maze solving, recursion.
        // Expression evaluation → Postfix/Prefix conversion.
        // Balanced parentheses checking.

// 🧠 8. Example Problem: Balanced Parentheses
function isBalanced(expression) {
  const stack = [];
  for (let char of expression) {
    if (char === '(') stack.push(char);
    else if (char === ')') {
      if (stack.length === 0) return false;
      stack.pop();
    }
  }
  return stack.length === 0;
}

console.log(isBalanced("(())"));  // true
console.log(isBalanced("(()"));   // false

// 🔍 9. Real-World Examples
  // Browser history navigation (Back button = pop, Forward = push)
  // Undo in MS Word / Photoshop
  // Compiler syntax checking
  // Recursive function calls in program stack



// Queue Data Structure
      // Definition
        // A Queue is a linear data structure that follows the FIFO (First In, First Out) principle.
        // 👉 The element that is inserted first is the one that gets removed first.

      // Example:
        // Think of a queue of people at a ticket counter — the person who comes first gets served first.

      // ⚙️ 2. Working Principle (FIFO)
        // Operation	Description
        // Enqueue	Add an element to the rear (end) of the queue
        // Dequeue	Remove an element from the front of the queue
        // Front / Peek	View the first element without removing it
        // isEmpty	Check if the queue is empty
        // Size	Get the number of elements in the queue

      // 🧩 3. Example Visualization
        // Initial Queue: [ ]
        // Enqueue 10 → [10]
        // Enqueue 20 → [10, 20]
        // Enqueue 30 → [10, 20, 30]
        // Dequeue    → removes 10 → [20, 30]
        // Front      → 20 (first element)

// 💻 4. JavaScript Implementation
// ✅ Using Array
class Queue {
  constructor() {
    this.items = [];
  }

  // Add element to rear
  enqueue(element) {
    this.items.push(element);
  }

  // Remove element from front
  dequeue() {
    if (this.isEmpty()) return "Queue is empty";
    return this.items.shift(); // removes first element
  }

  // View front element
  front() {
    if (this.isEmpty()) return "Queue is empty";
    return this.items[0];
  }

  // Check if empty
  isEmpty() {
    return this.items.length === 0;
  }

  // Size of queue
  size() {
    return this.items.length;
  }

  // Print queue
  print() {
    console.log(this.items.toString());
  }
}

// Example
const queue = new Queue();
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
queue.print();        // 10,20,30
console.log(queue.dequeue()); // 10
console.log(queue.front());   // 20

    // 🧮 5. Time and Space Complexity
      // Operation	Time Complexity	Space Complexity
      // Enqueue	O(1)	O(n)
      // Dequeue	O(n) (because of shift() in arrays)	
      // Front	O(1)	O(n)
      // isEmpty	O(1)	O(1)

      // ⚡ To achieve O(1) Dequeue, we can use Linked List or two-stack method.

// 🧱 6. Implementation Using Linked List (Efficient)
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.frontNode = null;
    this.rearNode = null;
    this.length = 0;
  }

  enqueue(value) {
    const newNode = new Node(value);
    if (!this.frontNode) {
      this.frontNode = this.rearNode = newNode;
    } else {
      this.rearNode.next = newNode;
      this.rearNode = newNode;
    }
    this.length++;
  }

  dequeue() {
    if (!this.frontNode) return "Queue is empty";
    const value = this.frontNode.value;
    this.frontNode = this.frontNode.next;
    if (!this.frontNode) this.rearNode = null;
    this.length--;
    return value;
  }

  front() {
    return this.frontNode ? this.frontNode.value : "Queue is empty";
  }

  isEmpty() {
    return this.length === 0;
  }

  size() {
    return this.length;
  }
}

// Example
const q = new Queue();
q.enqueue(10);
q.enqueue(20);
console.log(q.dequeue()); // 10
console.log(q.front());   // 20

    // ⚖️ 7. Pros and Cons
      // ✅ Advantages	❌ Disadvantages
      // Simple FIFO structure	Sequential access (no random access)
      // Useful for asynchronous data handling	Limited size if fixed-size array used
      // Efficient for real-world simulations	Slightly complex when using linked lists

    // 💡 8. Types of Queues
      // Type	Description
      // Simple Queue	Standard FIFO queue
      // Circular Queue	Last position connects to first → efficient space use
      // Priority Queue	Elements are dequeued based on priority, not order
      // Deque (Double Ended Queue)	Insert/remove from both ends
      // Input/Output Restricted Deque	One end is restricted for either insertion or deletion
      
    // 🧠 9. Real-World Use Cases
      // CPU scheduling (Round Robin, FCFS)
      // Printer queues
      // Order processing systems
      // Network data packet management
      // Call center request handling
      // BFS (Breadth-First Search) algorithm in graphs

// 🧩 10. Example: Printing Jobs (Simulation)
const printQueue = new Queue();

printQueue.enqueue("Document1");
printQueue.enqueue("Document2");
printQueue.enqueue("Document3");

while (!printQueue.isEmpty()) {
  console.log("Printing:", printQueue.dequeue());
}


// Output:

// Printing: Document1
// Printing: Document2
// Printing: Document3






// linked list data structure
      // 1. Definition:
        // A Linked List is a linear data structure where elements (called nodes) are connected using pointers.
        // Each node contains:
        // Data (value)
        // Next (a reference/pointer to the next node)
        // Unlike arrays, Linked Lists do not store data in contiguous memory locations.

      // ⚙️ 2. Structure of a Node
        // [ data | next ]  →  [ data | next ]  →  [ data | null ]
        // Example:
        // 10 → 20 → 30 → null
        // Each arrow (→) represents the pointer to the next node.

      // 🧩 3. Components of Linked List
        // Component	Description
        // Head	Points to the first node in the list
        // Tail	Last node that points to null
        // Node	Element containing data and a next pointer

      // 💡 4. Why Use Linked List?
        // Arrays	Linked Lists
        // Fixed size	Dynamic size (grow/shrink easily)
        // Insertion/deletion is costly (O(n))	Insertion/deletion is efficient (O(1))
        // Random access possible	Sequential access only
        // Contiguous memory	Non-contiguous memory.

      // 🔍 5. Types of Linked Lists
        // Type	Description
        // Singly Linked List	Each node points to next node only
        // Doubly Linked List	Each node points to both next and previous
        // Circular Linked List	Last node points back to head
        // Circular Doubly Linked List	Both directions circularly connected
        // 💻 6. Singly Linked List Implementation (JavaScript)
        // ✅ Node & Linked List Class
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  // Insert at the end
  append(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }

  // Insert at the beginning
  prepend(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }

  // Delete a node
  delete(data) {
    if (!this.head) return;
    if (this.head.data === data) {
      this.head = this.head.next;
      return;
    }
    let current = this.head;
    while (current.next && current.next.data !== data) {
      current = current.next;
    }
    if (current.next) {
      current.next = current.next.next;
    }
  }

  // Search for a node
  search(data) {
    let current = this.head;
    while (current) {
      if (current.data === data) return true;
      current = current.next;
    }
    return false;
  }

  // Print the list
  print() {
    let current = this.head;
    let result = "";
    while (current) {
      result += current.data + " → ";
      current = current.next;
    }
    console.log(result + "null");
  }
}

// Example
const list = new LinkedList();
list.append(10);
list.append(20);
list.prepend(5);
list.print();     // 5 → 10 → 20 → null
list.delete(10);
list.print();     // 5 → 20 → null
console.log(list.search(20)); // true

    // 🧮 7. Time & Space Complexity
        // Operation	Time Complexity	Space Complexity	Description
        // Traversal	O(n)	O(1)	Visit each node once
        // Insertion at beginning	O(1)	O(1)	Simple pointer change
        // Insertion at end	O(n)	O(1)	Traverse to last node
        // Deletion	O(n)	O(1)	Search and remove node
        // Search	O(n)	O(1)	Linear search through nodes

    // ⚖️ 8. Advantages & Disadvantages
        // ✅ Advantages	❌ Disadvantages
        // Dynamic size	No random access (must traverse)
        // Easy insertion/deletion	More memory (pointers)
        // Efficient for queues/stacks	Sequential access only
        // 🔁 9. Variations of Linked List
        // ➡️ Doubly Linked List
        // Each node has prev and next pointers.

        // class DNode {
        //   constructor(data) {
        //     this.data = data;
        //     this.prev = null;
        //     this.next = null;
        //   }
        // }

        // ✅ Faster deletion (no need to traverse backward).
        // ❌ Requires extra memory.
        // ➡️ Circular Linked List

        // Last node’s next points to head.
        // Used in round-robin scheduling or buffer management.

        // 10 → 20 → 30
        // ↑           ↓
        // ← ← ← ← ← ← ←

    // 💡 10. Real-World Use Cases
        // Implementing stacks, queues, graphs
        // Undo/Redo functionality in text editors
        // Browser history
        // Hash tables chaining
        // Music playlists (next and previous navigation)
        // CPU scheduling
        // 🧠 11. Interview Question Example
        // 🔸 Reverse a Linked List (Iterative)
function reverseLinkedList(head) {
  let prev = null;
  let current = head;
  let next = null;

  while (current) {
    next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev; // new head
}
// Time Complexity: O(n)
// Space Complexity: O(1)



// Two Pointer Technique
    // 🧠 1. Definition
      // The Two Pointer Technique is an algorithmic approach where two pointers (indexes) are used to traverse data structures like arrays or linked lists — usually from:
      // opposite ends, or
      // the same end at different speeds.
      // It helps solve problems involving searching, sorting, or pair-based conditions efficiently.

    // ⚙️ 2. Working Principle
      // Instead of using nested loops (O(n²)), we use two pointers that move strategically to achieve O(n) performance.
      // Depending on the problem, the pointers can:
      // Start from both ends (e.g., left = 0, right = n - 1)
      // Move in the same direction
      // Move at different speeds (slow & fast pointer)

    // 🧩 3. Common Patterns of Two Pointer
      // Pattern	Description	Common Use Case
      // Opposite Direction	One pointer at start, one at end	Pair sum problems, palindrome check
      // Same Direction (Forward)	Both move forward together	Merging sorted arrays, removing duplicates
      // Fast & Slow Pointer	One moves faster than the other	Detecting cycles in linked lists, finding middle element

    // 🧮 4. Time & Space Complexity
      // Metric	Complexity
      // Time	O(n) — each pointer traverses at most once
      // Space	O(1) — uses constant extra space

    // 💡 5. Why Use Two Pointer Technique?
      // ✅ Converts O(n²) brute-force solutions into O(n) optimized ones.
      // ✅ Ideal for sorted arrays, strings, and linked lists.
      // ✅ Saves time and space with simple logic.

// 🔍 6. Example Problems and Solutions
// 🧩 Example 1: Pair Sum in Sorted Array

// Problem:
// Given a sorted array, find if there exist two numbers that sum to a given target.

// 🔹 Brute Force (O(n²)):
// Check all pairs using nested loops.
// 🔹 Optimized (O(n)) — Two Pointers
function hasPairWithSum(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return true;
    else if (sum < target) left++;
    else right--;
  }
  return false;
}

console.log(hasPairWithSum([1, 2, 3, 4, 6, 8, 9], 10)); // true (2+8)


// ✅ Time Complexity: O(n)
// ✅ Space Complexity: O(1)

// 🧩 Example 2: Remove Duplicates from Sorted Array
function removeDuplicates(arr) {
  let i = 0;
  for (let j = 1; j < arr.length; j++) {
    if (arr[i] !== arr[j]) {
      i++;
      arr[i] = arr[j];
    }
  }
  return i + 1; // new length
}

console.log(removeDuplicates([1, 1, 2, 2, 3, 4, 4])); // 4 → [1,2,3,4]


// ✅ Used same-direction two pointers.
// ✅ Efficient in O(n).

// 🧩 Example 3: Palindrome Check
function isPalindrome(str) {
  let left = 0, right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  return true;
}

console.log(isPalindrome("madam")); // true
console.log(isPalindrome("hello")); // false


// ✅ Uses opposite direction pointers.
// ✅ O(n) time, O(1) space.

// 🧩 Example 4: Two Sum (Unsorted Array Using Sorting + Two Pointer)
function twoSum(arr, target) {
  arr.sort((a, b) => a - b);
  let left = 0, right = arr.length - 1;

  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return [arr[left], arr[right]];
    else if (sum < target) left++;
    else right--;
  }
  return [];
}

console.log(twoSum([7, 1, 3, 9, 5], 10)); // [1,9] or [3,7]

// 🧩 Example 5: Move Zeroes to End
function moveZeroes(nums) {
  let left = 0;

  for (let right = 0; right < nums.length; right++) {
    if (nums[right] !== 0) {
      [nums[left], nums[right]] = [nums[right], nums[left]];
      left++;
    }
  }
  return nums;
}

console.log(moveZeroes([0, 1, 0, 3, 12])); // [1, 3, 12, 0, 0]


// ✅ Two pointers moving in same direction.
// ✅ O(n) efficient solution.

// 🧩 Example 6: Fast & Slow Pointer — Find Middle of Linked List
function findMiddle(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow; // middle node
}


// ✅ Used fast & slow pointers.
// ✅ Common in linked list problems.

    // ⚖️ 7. Pros & Cons
  // ✅ Advantages	❌ Disadvantages
    // Reduces nested loops	Works best with sorted or sequential data
    // O(n) time efficiency	Harder to visualize for beginners
    // Constant space	Careful pointer movement needed to avoid errors

  // 🚀 8. Common Use Cases
    // Problem Type	Example
    // Pair-based problems	Two sum, pair difference
    // Palindrome	String/array palindrome check
    // Partitioning	Move negatives, even/odd, zeros
    // Sorting-based problems	Merge two sorted arrays
    // Linked lists	Cycle detection, middle node, intersection

  // 🧠 9. Quick Summary Table
    // Pattern	Pointer Movement	Common Problem
    // Left–Right	From both ends	Pair sum, palindrome
    // Same Direction	Both increasing	Removing duplicates
    // Fast–Slow	Different speeds	Cycle detection, middle node




// Sliding Window Technique
    // 🧩 Definition
      // The Sliding Window Technique is an optimization technique used to reduce the time complexity of problems involving arrays or strings, especially those that involve contiguous subarrays or substrings (e.g., sum, maximum, or minimum of a subarray).
      // Instead of recalculating results from scratch for every possible subarray, we “slide” a window (a range of elements) across the data, updating results efficiently.

    // 🎯 Use Case
      // Used in problems that require:
      // Finding a subarray or substring of a given size.
      // Finding the maximum/minimum/sum/count of elements in a window.
      // Problems involving consecutive elements (like finding the longest substring with unique characters).

    // ⚙️ How It Works
      // There are two main types of Sliding Windows:
      // 1️⃣ Fixed-size window
      // Used when the window size k is known in advance.

    // Steps:
      // Initialize two pointers: start and end.
      // Move end to expand the window until its size equals k.
      // Perform required operation (like sum, max, etc.).
      // Slide the window by incrementing start and end by 1 (remove old element, add new one).
      // Repeat until end reaches the end of the array.
      // 2️⃣ Variable-size window
      // Used when window size changes dynamically based on a condition (like sum < target, unique chars, etc.).

    // Steps:
      // Start with both pointers at the beginning.
      // Expand end to include new elements.
      // While the condition is violated, shrink the window by moving start.
      // Keep track of the best (max/min) window size that satisfies the condition.

// 💡 Example 1 — Fixed Window
// Problem: Find the maximum sum of any subarray of size k.

function maxSumSubarray(arr, k) {
  let maxSum = 0;
  let windowSum = 0;

  // First window
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  maxSum = windowSum;

  // Slide the window
  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k]; // Add new, remove old
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}

console.log(maxSumSubarray([2, 1, 5, 1, 3, 2], 3)); // Output: 9

// 💡 Example 2 — Variable Window

// Problem: Find the length of the longest substring without repeating characters.

function longestUniqueSubstring(s) {
  let start = 0;
  let maxLen = 0;
  let seen = new Set();
  for (let end = 0; end < s.length; end++) {
    while (seen.has(s[end])) {
      seen.delete(s[start]);
      start++;
    }
    seen.add(s[end]);
    maxLen = Math.max(maxLen, end - start + 1);
  }
  return maxLen;
}

console.log(longestUniqueSubstring("abcabcbb")); // Output: 3

    // ⏱️ Time & Space Complexity
      // Type	Time Complexity	Space Complexity
      // Fixed-size	O(n)	O(1)
      // Variable-size	O(n)	O(k) (depends on window elements stored)
      // ⚖️ Pros and Cons

    // ✅ Advantages:
      // Greatly reduces time complexity (O(n²) ➜ O(n)).
      // Simple and efficient for continuous sequence problems.
      // Works for both arrays and strings.

    // ❌ Disadvantages:
      // Only applicable when the problem involves contiguous elements.
      // Needs careful boundary handling.



// Binary Search Tree (BST)
    // 🌳 Definition
      // A Binary Search Tree (BST) is a binary tree where each node follows a specific ordering property:
      // The left child contains values less than the parent node.
      // The right child contains values greater than the parent node.
      // Both left and right subtrees are also BSTs.
      // This property allows fast searching, insertion, and deletion operations — similar to binary search on arrays.

    // 🧩 Structure Example
      //         8
      //        / \
      //       3   10
      //      / \    \
      //     1   6    14
      //        / \   /
      //       4   7 13


    // ✅ In this example:
      // Left subtree of 8 contains nodes < 8
      // Right subtree of 8 contains nodes > 8
      // Hence, it is a valid BST.

    // 🎯 Use Cases
      // Fast data lookup (search operations)
      // Implementing associative data structures (like Map / Set)
      // Sorting and range queries
      // Efficient min/max retrieval

    // ⚙️ Operations in BST
      // 1️⃣ Insertion
      // Compare the value to insert with the current node:
      // If smaller → go to the left child
      // If larger → go to the right child
      // Repeat until the correct leaf position is found.

// 🔹 Code Example:
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (true) {
      if (value === current.value) return undefined; // No duplicates
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }
}

// 2️⃣ Search
// Compare target with current node.
// If equal → found.
// If smaller → go left.
// If larger → go right.
// Repeat until found or null.
// Example:

search(value) {
  let current = this.root;
  while (current) {
    if (value === current.value) return true;
    if (value < current.value) current = current.left;
    else current = current.right;
  }
  return false;
}

// 3️⃣ Deletion
      // Deleting a node has 3 cases:
      // No child (leaf) → remove it directly.
      // One child → replace it with its child.
      // Two children → replace with in-order successor (smallest in right subtree).

  // 🧭 Tree Traversals
    // Type	Order	Example Output (for above tree)
    // In-order	Left → Root → Right	1, 3, 4, 6, 7, 8, 10, 13, 14 (sorted order ✅)
    // Pre-order	Root → Left → Right	8, 3, 1, 6, 4, 7, 10, 14, 13
    // Post-order	Left → Right → Root	1, 4, 7, 6, 3, 13, 14, 10, 8
    // Level-order	Level by level	8, 3, 10, 1, 6, 14, 4, 7, 13
    // ⚡ Time Complexity
    // Operation	Average Case	Worst Case
    // Search	O(log n)	O(n)
    // Insertion	O(log n)	O(n)
    // Deletion	O(log n)	O(n)

    // ⚠️ Worst case occurs when the BST becomes unbalanced, e.g., inserting sorted data forms a straight line (like a linked list).

// 🧮 Space Complexity
  // O(h) where h = height of the tree (O(log n) for balanced, O(n) for unbalanced).

// ⚖️ Pros & Cons
  // ✅ Advantages:
    // Faster search, insert, delete (logarithmic on average)
    // Automatically keeps data in sorted order
    // Efficient range and nearest-neighbor queries

  // ❌ Disadvantages:
    // Can become unbalanced (degrading performance to O(n))
    // Requires rebalancing (use AVL or Red-Black Tree for that)



// recursion
    // Definition
      // Recursion is a programming technique where a function calls itself directly or indirectly to solve a problem by breaking it into smaller subproblems.
      // “A recursive function solves a big problem by solving smaller versions of the same problem.”

      // 🧠 Key Idea (Divide and Conquer)
      // In recursion, we:
      // Divide the problem into smaller subproblems.
      // Conquer each subproblem recursively.
      // Combine their results to form the final answer.

// 🧱 Basic Structure of a Recursive Function
function recursiveFunction(parameters) {
  // 🛑 Base Case – stop recursion
  if (base_condition) return result;

  // 🔁 Recursive Case – call itself
  return recursiveFunction(smaller_input);
}

    // ⚙️ How It Works (Call Stack Concept)
      // When a recursive function is called:
      // The current function call is pushed onto the call stack.
      // The next recursive call is made.
      // When the base case is reached, the functions are popped off the stack one by one.
      // 📘 Call Stack is a LIFO (Last In, First Out) data structure used by recursion.
      // 💡 Example 1: Factorial
      // n! = n × (n-1) × (n-2) × ... × 1
      // Recursive Code:

function factorial(n) {
  if (n === 0 || n === 1) return 1; // Base case
  return n * factorial(n - 1); // Recursive call
}

console.log(factorial(5)); // Output: 120


// 🧠 Explanation:

// factorial(5)
// = 5 * factorial(4)
// = 5 * 4 * factorial(3)
// = 5 * 4 * 3 * factorial(2)
// = 5 * 4 * 3 * 2 * factorial(1)
// = 5 * 4 * 3 * 2 * 1
// = 120 ✅

// 💡 Example 2: Fibonacci Series

// F(n) = F(n-1) + F(n-2)
// F(0) = 0, F(1) = 1

// Code:

function fibonacci(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(6)); // Output: 8

  // 🧮 Types of Recursion
    // Type	Description	Example
    // Direct Recursion	Function calls itself directly	function f() { f(); }
    // Indirect Recursion	Function A calls B, and B calls A	function A() { B(); } function B() { A(); }
    // Tail Recursion	Recursive call is the last statement	Used for optimization
    // Non-Tail Recursion	Recursive call is not last	Needs stack to remember results
    // 🔁 Example of Tail Recursion
function factorialTail(n, result = 1) {
  if (n === 0) return result;
  return factorialTail(n - 1, n * result);
}

console.log(factorialTail(5)); // Output: 120


// Tail recursion is optimized by some compilers/interpreters to avoid extra stack frames (space-efficient).

    // ⏱️ Time and Space Complexity
        // Example	Time Complexity	Space Complexity
        // Factorial	O(n)	O(n) (stack space)
        // Fibonacci	O(2ⁿ)	O(n)
        // Optimized Fibonacci (with DP)	O(n)	O(n)
        // ⚖️ Pros and Cons

    // ✅ Advantages:

        // Elegant and concise code.
        // Easy to express complex divide-and-conquer logic.
        // Works well for tree, graph, and backtracking problems.

    // ❌ Disadvantages:
        // High memory usage due to call stack.
        // Risk of stack overflow if base case is missing or recursion is deep.
        // Slower than iteration for simple loops.

    // 📘 Common Recursive Problems in DSA
        // Problem Type	Examples
        // Mathematical	Factorial, Fibonacci, Power of a number
        // Array/String	Reverse an array, Palindrome check
        // Search/Sort	Binary Search, Merge Sort, Quick Sort
        // Tree	Inorder/Preorder/Postorder traversal
        // Backtracking	N-Queens, Rat in a Maze, Subsets, Permutations
        // 💡 Example 3: Sum of Array (Recursive)

function arraySum(arr, n) {
  if (n === 0) return 0;
  return arr[n - 1] + arraySum(arr, n - 1);
}

console.log(arraySum([1, 2, 3, 4, 5], 5)); // Output: 15

// ⚠️ Base Case Importance
// If you forget the base case:
// The function never stops calling itself
// Results in stack overflow error



// Backtracking

    // 🧩 Definition
      // Backtracking is an algorithmic technique used to solve constraint satisfaction problems (like mazes, puzzles, combinations, and permutations) by exploring all possible solutions and discarding invalid ones (backtrack) when a condition fails.
      // “Backtracking is a refined form of recursion where we build a solution step-by-step and undo (backtrack) a step if it leads to a dead end.”

    // 🧠 Core Idea
    // Choose – Make a choice for the current step.
    // Explore – Recursively explore further choices.
    // Unchoose – If the choice doesn’t work, undo it (backtrack) and try another option.

    // ⚙️ Algorithm Steps
      // function backtrack(current_state):
      //     if (solution_found):
      //         store_or_print_solution
      //         return

      //     for each possible choice:
      //         make the choice
      //         backtrack(next_state)
      //         undo the choice  ← (backtrack)

// 🧩 Example 1: Generating All Permutations of an Array
// Problem:
// Given [1, 2, 3], generate all possible permutations.

// Recursive Backtracking Code (JavaScript):
function permute(nums) {
  const result = [];

  function backtrack(path, used) {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;

      path.push(nums[i]);      // Choose
      used[i] = true;
      backtrack(path, used);   // Explore
      path.pop();              // Unchoose (Backtrack)
      used[i] = false;
    }
  }

  backtrack([], []);
  return result;
}

console.log(permute([1, 2, 3]));


// 🧾 Output:

// [
//  [1, 2, 3],
//  [1, 3, 2],
//  [2, 1, 3],
//  [2, 3, 1],
//  [3, 1, 2],
//  [3, 2, 1]
// ]

  // 💡 Example 2: N-Queens Problem
    // Problem:
    // Place N queens on an N×N chessboard so that no two queens attack each other.

    // Approach:
      // Try placing queens one by one in each row.
      // Check if placement is safe (no attack in row, column, diagonal).
      // If safe → place queen and move to next row.
      // If not → backtrack and move queen.

// Code:
function solveNQueens(n) {
  const board = Array.from({ length: n }, () => Array(n).fill('.'));
  const result = [];

  function isSafe(row, col) {
    // Check column
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') return false;
    }
    // Check left diagonal
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 'Q') return false;
    }
    // Check right diagonal
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === 'Q') return false;
    }
    return true;
  }

  function backtrack(row) {
    if (row === n) {
      result.push(board.map(r => r.join('')));
      return;
    }

    for (let col = 0; col < n; col++) {
      if (isSafe(row, col)) {
        board[row][col] = 'Q';
        backtrack(row + 1);
        board[row][col] = '.'; // Backtrack
      }
    }
  }

  backtrack(0);
  return result;
}

console.log(solveNQueens(4));


// 🧾 Output:

// [
//  [".Q..",
//   "...Q",
//   "Q...",
//   "..Q."],

//  ["..Q.",
//   "Q...",
//   "...Q",
//   ".Q.."]
// ]

      // 🔍 Other Classic Backtracking Problems
        // Problem	Description
        // Rat in a Maze	Find path from start to end in a grid maze
        // Sudoku Solver	Fill Sudoku board using rules
        // Subset Sum	Find subsets whose sum equals target
        // Combination Sum	Generate combinations that add up to target
        // Word Search	Find a word in a 2D grid
        // Generate Parentheses	Generate all valid parentheses strings
        // ⏱️ Time and Space Complexity
        // Problem Type	Time Complexity	Space Complexity
        // Permutations	O(n!)	O(n)
        // Subsets	O(2ⁿ)	O(n)
        // N-Queens	O(N!)	O(N²)
        // ⚖️ Pros and Cons

      // ✅ Advantages:
        // Simple to implement using recursion.
        // Systematically explores all possible solutions.
        // Very powerful for constraint-based problems.

      // ❌ Disadvantages:
        // Can be slow (exponential time complexity).
        // Requires pruning (cutting off impossible branches) to optimize.
        // Uses stack space proportional to recursion depth.

      // ⚡ Optimization Technique: Pruning
        // You can reduce time by stopping early when a partial solution cannot lead to a valid answer.
        // Example in N-Queens:
        // Skip placing a queen if it conflicts with an existing queen — this is pruning.

      // 🧠 Analogy
        // Imagine a maze:
        // You move forward (recursive call),
        // If you hit a dead end → you backtrack and try another path.
        // 📘 Pattern Recognition for Backtracking
        // Backtracking problems often follow this template:

function backtrack(path, choices) {
  if (goal_reached) {
    result.push([...path]);
    return;
  }

  for (let choice of choices) {
    if (invalid_choice(choice)) continue;
    make_choice(choice);
    backtrack(path, choices);
    undo_choice(choice);
  }
}


// 🧩 15. Greedy Algorithms

        //🔹Definition
            // A Greedy Algorithm is an algorithmic paradigm that builds up a solution piece by piece, always choosing the next piece that offers the most immediate benefit (locally optimal choice), without worrying about future consequences.
            // It does not reconsider previous decisions once made.

        //🔹Principle
          // “Make a choice that seems best at the moment and hope it leads to the globally optimal solution.”
          // Greedy algorithms work when the local optimum leads to a global optimum — meaning, choosing the best option at each step results in the overall best solution.

        // 🔹 Steps / Approach
          // Sort or organize data (if needed) according to some criteria.
          // Make a greedy choice — select the best available option.
          // Check feasibility — ensure the chosen option doesn’t violate any constraints.
          // Repeat until the entire problem is solved or no options remain.

        // 🔹 Examples of Problems Solved by Greedy Algorithms
          // Problem	Description
          // Activity Selection Problem	Choose maximum number of activities that don’t overlap.
          // Fractional Knapsack Problem	Take items to maximize profit without exceeding capacity (can take fractions).
          // Huffman Encoding	Create optimal prefix codes for data compression.
          // Dijkstra’s Algorithm	Find shortest path from a source node to all others in a weighted graph (non-negative weights).
          // Prim’s / Kruskal’s Algorithm	Find Minimum Spanning Tree (MST) in a weighted graph.
          // Job Sequencing with Deadlines	Schedule jobs to maximize profit before deadlines.
        
        //🔹Example: Activity Selection Problem
          // 🧠 Problem
          // Given n activities with start and finish times, select the maximum number of activities that can be performed by a single person, assuming a person can work on one activity at a time.

        // ✅ Approach
          // Sort activities by their finish time.
          // Select the first activity.
          // For each next activity, if its start time ≥ finish time of previously selected activity → select it.

          // 💻 JavaScript Code
function activitySelection(activities) {
  // Sort by finish time
  activities.sort((a, b) => a[1] - b[1]);

  let selected = [activities[0]];
  let lastFinish = activities[0][1];

  for (let i = 1; i < activities.length; i++) {
    if (activities[i][0] >= lastFinish) {
      selected.push(activities[i]);
      lastFinish = activities[i][1];
    }
  }

  return selected;
}

// [start, end]
const activities = [[1, 3], [2, 5], [4, 6], [6, 7], [5, 9], [8, 9]];
console.log(activitySelection(activities));
// Output: [ [1,3], [4,6], [6,7], [8,9] ]

      // 🔹 Time & Space Complexity
        // Step	Complexity
        // Sorting activities	O(n log n)
        // Selection loop	O(n)
        // Total Time Complexity	O(n log n)
        // Space Complexity	O(1) (in-place sorting)

      // 🔹 Advantages
        // ✅ Simple and easy to understand.
        // ✅ Often faster than dynamic programming.
        // ✅ Works well for problems with optimal substructure and greedy-choice property.

      // 🔹 Disadvantages
        // ❌ Doesn’t always yield the global optimum.
        // ❌ Not suitable when future consequences of choices matter.
        // ❌ Needs mathematical proof that greedy choice leads to global optimum.

      // 🔹 Real-World Use Cases
        // Network routing (Dijkstra’s algorithm)
        // File compression (Huffman coding)
        // Scheduling tasks (Activity Selection)
        // Resource allocation and load balancing
        // Minimum spanning trees (Prim’s/Kruskal’s algorithms)

      // 🧠Key Idea
        // Greedy ≠ Always Optimal
        // It’s optimal only when both conditions hold:
        // Greedy-choice property: Local choice leads to global solution.
        // Optimal substructure: Optimal solution of the problem contains optimal solutions to subproblems.



//16. Dynamic Programming (DP)
      // 🔹 Definition
        // Dynamic Programming (DP) is an algorithmic technique used to solve complex problems by breaking them down into simpler overlapping subproblems, solving each subproblem once, and storing their results to avoid redundant computation.

      // DP = Divide + Remember + Reuse
      // It is mainly used for optimization problems (e.g., finding minimum, maximum, longest, or number of ways).

      // 🔹 Key Concepts
        // Concept	Meaning
        // Overlapping Subproblems	The problem can be broken into smaller subproblems that repeat multiple times.
        // Optimal Substructure	The solution to the problem can be formed from solutions of its subproblems.
        // Memoization	Top-down DP: Recursion + Caching results.
        // Tabulation	Bottom-up DP: Iterative solution using tables.

      // 🔹 Approach / Steps
        // Define Subproblem — Express the problem in terms of smaller subproblems.
        // Identify Recurrence Relation — Find a formula that connects the subproblems.

      // Choose Method:
        // Top-Down (Memoization): Recursion + cache
        // Bottom-Up (Tabulation): Iterative + DP table
        // Compute final answer from stored results.

      // 🔹 Famous DP Problems
        // Problem	Type
        // Fibonacci Series	Basic example
        // 0/1 Knapsack	Optimization
        // Longest Common Subsequence	String matching
        // Matrix Chain Multiplication	Partition DP
        // Coin Change	Counting combinations
        // Edit Distance	String transformation
        // Longest Increasing Subsequence	Sequence optimization


// 🔹 Example 1: Fibonacci Series
// 🧠 Problem

// Find the nth Fibonacci number:

// F(n) = F(n-1) + F(n-2)
// F(0) = 0, F(1) = 1

// 🪜 1. Brute Force (Recursive)
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
console.log(fib(6)); // 8


// 🔻 Problem: Exponential time due to repeated calls.
// TC: O(2ⁿ), SC: O(n)

// 🪜 2. Top-Down (Memoization)
function fibMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}
console.log(fibMemo(6)); // 8


// ✅ TC: O(n)
// ✅ SC: O(n) (stack + memo)

// 🪜 3. Bottom-Up (Tabulation)
function fibTab(n) {
  if (n <= 1) return n;
  let dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}
console.log(fibTab(6)); // 8


// ✅ TC: O(n)
// ✅ SC: O(n)

// 🪜 4. Space Optimized DP
function fibOptimized(n) {
  if (n <= 1) return n;
  let prev2 = 0, prev1 = 1;
  for (let i = 2; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}
console.log(fibOptimized(6)); // 8


// ✅ TC: O(n)
// ✅ SC: O(1)

// 🔹 Example 2: 0/1 Knapsack Problem
// 🧠 Problem

// Given weights and values of n items, put these items in a knapsack of capacity W to get the maximum total value.

// 🔹 Recurrence Relation:
// dp[i][w] = max(
//   value[i-1] + dp[i-1][w - weight[i-1]],  // include item
//   dp[i-1][w]                              // exclude item
// )

// 💻 JS Code (Bottom-Up)
function knapSack(W, weights, values, n) {
  const dp = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= W; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(
          values[i - 1] + dp[i - 1][w - weights[i - 1]],
          dp[i - 1][w]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  return dp[n][W];
}

const values = [60, 100, 120];
const weights = [10, 20, 30];
const W = 50;
console.log(knapSack(W, weights, values, values.length)); // 220


      // ✅ TC: O(n × W)
      // ✅ SC: O(n × W)

    // 🔹 Advantages
      // ✅ Avoids recomputation (saves time).
      // ✅ Solves overlapping subproblems efficiently.
      // ✅ Can be converted from recursion easily.
      // ✅ Often gives polynomial-time solutions for exponential problems.

    // 🔹 Disadvantages
      // ❌ Requires identifying overlapping subproblems (not always obvious).
      // ❌ Needs extra memory for tables.
      // ❌ Harder to design if recurrence relation isn’t clear.

    // 🔹 Real-World Use Cases
      // Text correction (Edit Distance)
      // Route optimization (Bellman-Ford, Floyd-Warshall)
      // Financial modeling (stock trading max profit)
      // Bioinformatics (gene sequence matching)
      // Resource scheduling (Knapsack variants)




// 🧩 22. Bit Manipulation

    //🔹Definition

        // Bit Manipulation is a technique used to perform operations directly on binary digits (bits) of numbers.
        // Since computers operate in binary, manipulating bits is fast, memory-efficient, and powerful for solving optimization and mathematical problems.
        // A bit is the smallest unit of data in computing — it can be 0 or 1.

    // 🔹 Why Bit Manipulation?
        // Faster than arithmetic operations.
        // Reduces space (works directly on bits).
        // Simplifies problems involving sets, parity, powers of 2, or unique numbers.

    //🔹Common Bitwise Operators
        // Operator	Symbol	Meaning	Example (Binary of 5 = 0101, 3 = 0011)	Result (Binary)	Decimal
        // AND	&	1 if both bits are 1	5 & 3	0001	1
        // OR	`	`	1 if either bit is 1	5 | 3	0111
        // XOR	^	1 if bits differ	5 ^ 3	0110	6
        // NOT	~	Flip all bits	~5	...1010	-6
        // Left Shift	<<	Shift bits left (×2)	5 << 1	1010	10
        // Right Shift	>>	Shift bits right (÷2)	5 >> 1	0010	2
    
    // 🔹 Basic Bit Tricks
        // Operation	Expression	Explanation
        // Check if number is even/odd	n & 1	If last bit = 1 → odd, else even
        // Get i-th bit	(n >> i) & 1	Shift right i bits, mask with 1
        // Set i-th bit	`n	(1 << i)`
        // Clear i-th bit	n & ~(1 << i)	Turn off bit at position i
        // Toggle i-th bit	n ^ (1 << i)	Flip bit at position i
        // Count set bits (1s)	loop or built-in	Number of bits that are 1
        // Check power of 2	(n & (n - 1)) == 0	True if only one bit is set
    
    // 🔹 Example 1: Check if number is power of 2
        // 🧠 Idea

    // Power of 2 has only one bit set in binary.
    // For example:

    // 1 -> 0001
    // 2 -> 0010
    // 4 -> 0100
    // 8 -> 1000


    // For such numbers: n & (n - 1) == 0

// 💻 Code (JS)
function isPowerOfTwo(n) {
  if (n <= 0) return false;
  return (n & (n - 1)) === 0;
}

console.log(isPowerOfTwo(8));  // true
console.log(isPowerOfTwo(10)); // false


// ✅ TC: O(1)
// ✅ SC: O(1)
// 🔹 Example 2: Count number of 1 bits
// 🧠 Idea
// Use Brian Kernighan’s Algorithm — repeatedly turn off the rightmost 1 bit using n = n & (n - 1).

// 💻 Code
function countSetBits(n) {
  let count = 0;
  while (n > 0) {
    n = n & (n - 1);
    count++;
  }
  return count;
}

console.log(countSetBits(13)); // 3 (1101)

// ✅ TC: O(k) where k = number of set bits
// ✅ SC: O(1)
// 🔹 Example 3: Find the Single Non-Repeated Number
// 🧠 Problem
// Given an array where every element appears twice except one, find the unique element.
// 💡 Logic
// XOR of two same numbers is 0 (a ^ a = 0)
// XOR with 0 gives same number (a ^ 0 = a)
// Hence, XORing all numbers gives the unique one.

// 💻 Code
function singleNumber(nums) {
  let result = 0;
  for (let num of nums) {
    result ^= num;
  }
  return result;
}

console.log(singleNumber([2, 3, 5, 4, 5, 3, 4])); // 2


// ✅ TC: O(n)
// ✅ SC: O(1)

// 🔹 Example 4: Swap Two Numbers without Temp Variable
// let a = 5, b = 7;
// a = a ^ b;
// b = a ^ b;
// a = a ^ b;
// console.log(a, b); // 7, 5

// 🔹 Example 5: Turn Off Rightmost Set Bit
function removeRightmostSetBit(n) {
  return n & (n - 1);
}
console.log(removeRightmostSetBit(12)); // 8 (1100 → 1000)

    // 🔹 Time & Space Complexity
        // Operation	Time	Space
        // Bitwise operations	O(1)	O(1)
        // Loop-based (count bits)	O(k)	O(1)
    // 🔹 Advantages
        // ✅ Extremely fast (constant time).
        // ✅ Reduces space usage.
        // ✅ Ideal for low-level programming and optimization.
        // ✅ Enables compact representation (bitmasking).

    // 🔹 Disadvantages
        // ❌ Harder to read/debug.
        // ❌ Not always intuitive.
        // ❌ Limited to integer operations.

    // 🔹 Real-World Use Cases
        // Cryptography (bitwise XOR encryption)
        // Compression algorithms
        // Network programming (IP masks)
        // Graphics & image processing
        // Competitive programming (subset generation using bitmasking)
        // Permissions & access control systems