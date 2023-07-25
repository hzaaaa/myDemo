// // 如果序列 X_1, X_2, ..., X_n 满足下列条件，就说它是 斐波那契式 的：

// // n >= 3
// // 对于所有 i + 2 <= n，都有 X_i + X_{i+1} = X_{i+2}
// // 给定一个严格递增的正整数数组形成序列 arr ，找到 arr 中最长的斐波那契式的子序列的长度。如果一个不存在，返回  0 。

// // （回想一下，子序列是从原序列 arr 中派生出来的，它从 arr 中删掉任意数量的元素（也可以不删），而不改变其余元素的顺序。例如， [3, 5, 8] 是 [3, 4, 5, 6, 7, 8] 的一个子序列）

// //  

// // 示例 1：

// // 输入: arr = [1,2,3,4,5,6,7,8]
// // 输出: 5
// // 解释: 最长的斐波那契式子序列为 [1,2,3,5,8] 。
// // 示例 2：

// // 输入: arr = [1,3,7,11,12,14,18]
// // 输出: 3
// // 解释: 最长的斐波那契式子序列有 [1,11,12]、[3,11,14] 以及 [7,11,18] 。
// //  

// // 提示：

// // 3 <= arr.length <= 1000
// // 1 <= arr[i] < arr[i + 1] <= 10^9
// /**
//  * @param {number[]} arr
//  * @return {number}
//  */
// var lenLongestFibSubseq = function(arr) {
//     let bigArr = [];
//     let maxLength = 0;
//     for(let i =0 ;i<arr.length;i++){
//         // let tempSet = new Set();
//         for(let j=0;j<bigArr.length;j++){
//             // if(bigArr[j][2]===-1){
//             //     bigArr[j][2] = a[i]+bigArr[j][1];//期望数
//             //     bigArr[j][1] = arr[i] ;//末尾数
//             //     bigArr[j][0] ++ ;//当前长度
//             // }
//             if(arr[i] ===bigArr[j][2]||bigArr[j][2]===-1){
//                 bigArr[j][2] = arr[i]+bigArr[j][1];//期望数
//                 bigArr[j][1] = arr[i] ;//末尾数
//                 bigArr[j][0] ++ ;//当前长度
//                 maxLength=Math.max(maxLength,bigArr[j][0]);
//             }
            
//         }
//         for(let k=0;k<=i;k++){

//             bigArr.push([1,arr[k],-1]);
//         }
//     }
//     if(maxLength<3)return 0;
//     return maxLength;
// };

// // [2,4,7,8,9,10,14,15,18,23,32,50]
/**
 * @param {string[]} strs
 * @return {number}
 */
var minDeletionSize = function(strs) {
    
};

