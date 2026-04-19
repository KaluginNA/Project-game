// function findLongestWord(sentence) {
//     let words = sentence.split(' ')
//     let LongestWord = ''
//     let maxLength = 0
//     for(let i = 0; i < words.length; i++){
//         let currentWord = words[i]
//         let currentLength = currentWord.length
//         if(currentLength > maxLength){
//             maxLength = currentLength
//             LongestWord = currentWord
//         }
//     }
//     return LongestWord;


// }
// console.log(findLongestWord("JavaScript это крутой язык"))

// function countVowels(str){
//     let vowels = 'уеыаоэяию'
//     let count = 0
//     for(let i = 0; i < str.length; i++){
//         let currentChar = str[i]
//         if(vowels.includes(currentChar)){
//             count++
//         }
//     }
//     return count 
// }
// console.log(countVowels('Привет'))

// const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// function doubleEvenNumbers(arr){
//     let result = []
//     for(let i = 0; i < arr.length; i++){
//         let currentNumber = arr[i]
//         if(currentNumber  % 2 === 0){
//             result.push(currentNumber * 2)
//         }
//         else{
//             result.push(currentNumber)
//         }
//     }
//     return result
// }
// console.log(doubleEvenNumbers(numbers))
// let HeroHp = 150
// let EnemyHp = 100
// let HeroStrength = 15

function fight(){
    console.log('Бой начался')
    while (HeroHp > 0 && EnemyHp > 0){

        let damage = Math.floor(Math.random() * HeroStrength)

        if(damage % 2 === 0){
            damage = damage * 2
            console.log('Вы нанесли критический удар!')
        }
        EnemyHp -= damage
        console.log(`Вы нанесли ${damage}, у врага осталось ${EnemyHp} HP`)

        if(EnemyHp <= 0){
            console.log('Вы победили!')
            break
        }

        let enemyDamage = Math.floor(Math.random() * 10)
        HeroHp -= enemyDamage
        console.log(`Враг нанёс вам ${enemyDamage}, у вас осталось ${HeroHp} HP`)

    }

}
fight()


function choosePath(choice){
    if(choice === 'Лес'){
        console.log('Вы встретили волка!')
        fight()
    }
    else if(choice === 'Пещера'){
        console.log('Вы нашли сундук с сокровищами')
        inevntory.push('Золото')
    }
    
}
choosePath()


