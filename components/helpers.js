export const countWords = (str) => {
    const strLength = str.length
    let count = 0
    let startWord = false
    let endWord = true;
    for (let i = 0; i < strLength; i++) {
        const element = str[i];
        if (element != " ") {
            if (endWord) {
                count++
                startWord = true
                endWord = false
            }
        } else if (element == " ") {
            startWord = true
            endWord = true
        }
    }
    return count
}
